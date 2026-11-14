// tests/unit/merge-queue/helpers/fake-github.mjs — in-process fake of the GitHub REST API used by
// scripts/merge-queue/github.mjs. Shared by the omni-queue unit and integration tests.
//
// ── API ────────────────────────────────────────────────────────────────────────────────────────
//   const fake = await startFakeGitHub({ owner = "acme", repo = "widget", token = "test-token",
//                                        actor = "diegosouzapw", maxPerPage = 100,
//                                        now = () => new Date().toISOString() });
//   fake.url            "http://127.0.0.1:<port>" — pass as `apiUrl` to createGitHubClient
//   fake.repository     "acme/widget"
//   fake.token          bearer token the server requires (401 without it; null = no auth check)
//   fake.actor          login recorded as actor/creator/author of every write (mutable)
//   fake.maxPerPage     page size cap (set to 1–2 to exercise Link pagination)
//   fake.now            ISO clock used for created_at of writes (mutable)
//   fake.requests       [{method, path, query, body, headers}] — every request, in order
//                       (path is relative to /repos/<owner>/<repo>, e.g. "/pulls/7")
//   fake.inject({method?, path, status, body?, headers?, times = 1, apply = false, delayMs = 0})
//                       answer the next `times` matching requests with this response instead of
//                       routing them (path: exact relative path or RegExp; method default any).
//                       apply:true routes the request normally FIRST (its side effects happen,
//                       e.g. a merge lands) and then answers with the injected response — the
//                       "GitHub did it but returned 502" case. delayMs holds the response that
//                       long (timeouts; the server drops it when the client aborts).
//   fake.close()        stop the server (await it in t.after / finally)
//
// Programmable state (plain Maps/arrays of RAW GitHub payloads; mutate freely):
//   fake.repoInfo                        GET /repos/o/r payload ({default_branch: "main", ...})
//   fake.addPull({number?, title, user?, base?, head?, labels?, draft?, ...}) → raw pull
//   fake.pulls       Map<number, rawPull>      (labels: [{name}] — shared with the issue endpoints)
//   fake.files       Map<number, [{filename, previous_filename?, status}]>
//   fake.timeline    Map<number, rawEvent[]>   (labels POST/DELETE append labeled/unlabeled)
//   fake.addIssue({number?, title, body?, labels?, state?}) → raw issue
//   fake.issues      Map<number, rawIssue>
//   fake.comments    Map<number, rawComment[]>
//   fake.statuses    Map<sha, rawStatus[]>     newest first (POST /statuses/:sha unshifts)
//   fake.checkRuns   Map<sha, rawCheckRun[]>   (GET wraps them in {total_count, check_runs})
//   fake.checkSuites Map<sha, rawCheckSuite[]> (GET wraps them in {total_count, check_suites})
//   fake.addCheckRun(sha, {name, conclusion = "success", status?, headBranch?, suiteId?,
//                    appSlug = "github-actions", startedAt?, completedAt?, output?, htmlUrl?})
//                       → raw check run linked to a check suite (`check_run.check_suite.id`);
//                       a new suite {id, head_branch, head_sha, app} is created unless `suiteId`
//                       names an existing one (headBranch null = suite without a branch)
//   fake.annotations Map<runId, rawAnnotation[]>
//   fake.workflowRuns rawRun[]                 (filters: branch, head_sha, event; the
//                       per-workflow listing also matches `path` .github/workflows/<file>)
//   fake.dispatches  [{workflow, ref, inputs}] recorded workflow_dispatch calls
//   fake.merges      [{number, body}]          recorded PUT /pulls/:n/merge calls
//   fake.mergeResponses Map<number, {status, body}>  override the default merge behavior
//   fake.rulesets    Map<id, ruleset>
//   Git object store (real git blob hashing; tree/commit ids are fake but deterministic):
//   fake.blobs Map<sha, Buffer>, fake.trees Map<sha, entry[]>, fake.commits Map<sha, commit>,
//   fake.refs Map<"heads/<branch>", sha>
//   fake.externalRefs  null | {get(key) → sha|null, list(prefix) → [key, sha][], delete(key) →
//                       boolean} — refs NOT in fake.refs (keys "heads/<branch>") are served by
//                       this backend: integration tests plug a real bare repository in, so the
//                       branches the queue pushes with git and reads/deletes over the API agree
//   fake.commitFiles({branch?, files: {path: content}, message?, parents?}) → commit sha
//                       creates blobs/tree/commit (tree = parent tree + files) and moves the
//                       branch when given
//   fake.readFile(branch, path) → string | null
//
// Default behaviors that mimic GitHub:
//   - list endpoints paginate with `per_page`/`page` and a Link header (rel="next"/"last");
//   - Contents API: GET → {type:"file", encoding:"base64", content (60-col wrapped), sha};
//     PUT on an existing path without `sha` → 422 "\"sha\" wasn't supplied."; with a stale
//     `sha` → 409; unknown branch → 404; returns {content: {sha}, commit: {sha}};
//   - POST /git/refs on an existing ref → 422 "Reference already exists";
//   - DELETE /issues/:n/labels/:name on an absent label → 404;
//   - PUT /pulls/:n/merge: closed/merged → 405, `sha` ≠ head → 409, else merges (200) and sets
//     merged/merged_at/merge_commit_sha on the pull;
//   - DELETE /issues/comments/:id removes a comment (404 when absent);
//   - GET /contents/<dir> lists the direct children [{type: "file"|"dir", name, path, sha}].

import { createHash } from "node:crypto";
import { createServer } from "node:http";

const json = (status, body, headers = {}) => ({ status, body, headers });
const notFound = () => json(404, { message: "Not Found" });
const gitBlobSha = (buf) =>
  createHash("sha1")
    .update(Buffer.concat([Buffer.from(`blob ${buf.length}\0`), buf]))
    .digest("hex");
const fakeSha = (value) => createHash("sha1").update(JSON.stringify(value)).digest("hex");
const wrap60 = (b64) => b64.replace(/(.{60})/g, "$1\n");

export async function startFakeGitHub(options = {}) {
  const {
    owner = "acme",
    repo = "widget",
    token = "test-token",
    actor = "diegosouzapw",
    maxPerPage = 100,
    now = () => new Date().toISOString(),
  } = options;

  let nextNumber = 1;
  let nextId = 1000;
  const fake = {
    repository: `${owner}/${repo}`,
    token,
    actor,
    maxPerPage,
    now,
    requests: [],
    injections: [],
    repoInfo: { full_name: `${owner}/${repo}`, default_branch: "main", private: false },
    pulls: new Map(),
    files: new Map(),
    timeline: new Map(),
    issues: new Map(),
    comments: new Map(),
    statuses: new Map(),
    checkRuns: new Map(),
    checkSuites: new Map(),
    externalRefs: null,
    annotations: new Map(),
    workflowRuns: [],
    dispatches: [],
    merges: [],
    mergeResponses: new Map(),
    rulesets: new Map(),
    blobs: new Map(),
    trees: new Map(),
    commits: new Map(),
    refs: new Map(),
  };

  const user = (login = fake.actor) => ({ login, type: /\[bot\]$/.test(login) ? "Bot" : "User" });

  fake.inject = ({
    method,
    path,
    status,
    body = {},
    headers = {},
    times = 1,
    apply = false,
    delayMs = 0,
  }) => {
    fake.injections.push({ method, path, status, body, headers, times, apply, delayMs });
  };

  fake.addPull = (input) => {
    const number = input.number ?? nextNumber;
    nextNumber = Math.max(nextNumber, number + 1);
    const headSha = input.head?.sha ?? fakeSha({ pr: number, t: "head" });
    const pull = {
      number,
      state: "open",
      draft: false,
      merged: false,
      merged_at: null,
      mergeable: true,
      mergeable_state: "clean",
      title: `PR ${number}`,
      body: "",
      user: user(input.user?.login ?? "contributor"),
      created_at: "2026-11-01T00:00:00Z",
      updated_at: "2026-11-01T00:00:00Z",
      ...input,
      labels: (input.labels ?? []).map((l) => (typeof l === "string" ? { name: l } : l)),
      base: { ref: "release/v3.8.54", ...(input.base ?? {}) },
      head: {
        ref: `feature-${number}`,
        repo: { full_name: `${owner}/${repo}` },
        ...(input.head ?? {}),
        sha: headSha,
      },
    };
    fake.pulls.set(number, pull);
    return pull;
  };

  fake.addCheckRun = (sha, input) => {
    const {
      name,
      conclusion = "success",
      status = conclusion === null ? "in_progress" : "completed",
      headBranch = null,
      suiteId,
      appSlug = "github-actions",
      startedAt = fake.now(),
      completedAt = status === "completed" ? fake.now() : null,
      output = { title: null, summary: null, text: null },
      htmlUrl,
    } = input;
    if (!fake.checkSuites.has(sha)) fake.checkSuites.set(sha, []);
    const suites = fake.checkSuites.get(sha);
    let suite = suiteId === undefined ? null : suites.find((x) => x.id === suiteId);
    if (!suite) {
      suite = {
        id: suiteId ?? nextId++,
        head_branch: headBranch,
        head_sha: sha,
        status: "completed",
        app: { slug: appSlug },
      };
      suites.push(suite);
    }
    const id = nextId++;
    const run = {
      id,
      name,
      head_sha: sha,
      status,
      conclusion,
      started_at: startedAt,
      completed_at: completedAt,
      html_url: htmlUrl ?? `https://github.com/${owner}/${repo}/actions/runs/1/job/${id}`,
      app: { slug: appSlug },
      check_suite: { id: suite.id },
      output,
    };
    if (!fake.checkRuns.has(sha)) fake.checkRuns.set(sha, []);
    fake.checkRuns.get(sha).push(run);
    return run;
  };

  fake.addIssue = (input) => {
    const number = input.number ?? nextNumber;
    nextNumber = Math.max(nextNumber, number + 1);
    const issue = {
      number,
      state: "open",
      title: `Issue ${number}`,
      body: "",
      user: user(),
      updated_at: fake.now(),
      ...input,
      labels: (input.labels ?? []).map((l) => (typeof l === "string" ? { name: l } : l)),
    };
    fake.issues.set(number, issue);
    return issue;
  };

  function putBlob(content) {
    const buf = Buffer.isBuffer(content) ? content : Buffer.from(String(content), "utf8");
    const sha = gitBlobSha(buf);
    fake.blobs.set(sha, buf);
    return sha;
  }

  function putTree(entries) {
    const sorted = [...entries].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    const sha = fakeSha({ tree: sorted });
    fake.trees.set(sha, sorted);
    return sha;
  }

  function putCommit({ tree, parents, message }) {
    const sha = fakeSha({ tree, parents, message, n: fake.commits.size });
    fake.commits.set(sha, { sha, tree, parents, message });
    return sha;
  }

  /** Resolve a branch name or commit sha to a commit sha. */
  function resolveRef(ref) {
    if (fake.refs.has(`heads/${ref}`)) return fake.refs.get(`heads/${ref}`);
    if (fake.commits.has(ref)) return ref;
    return null;
  }

  fake.commitFiles = ({ branch, files, message = "commit", parents }) => {
    const parentList =
      parents ??
      (branch && fake.refs.has(`heads/${branch}`) ? [fake.refs.get(`heads/${branch}`)] : []);
    const baseEntries = parentList.length
      ? fake.trees.get(fake.commits.get(parentList[0]).tree)
      : [];
    const map = new Map(baseEntries.map((e) => [e.path, e]));
    for (const [path, content] of Object.entries(files)) {
      map.set(path, { path, mode: "100644", type: "blob", sha: putBlob(content) });
    }
    const sha = putCommit({ tree: putTree([...map.values()]), parents: parentList, message });
    if (branch) fake.refs.set(`heads/${branch}`, sha);
    return sha;
  };

  fake.readFile = (ref, path) => {
    const commitSha = resolveRef(ref);
    if (!commitSha) return null;
    const entry = fake.trees.get(fake.commits.get(commitSha).tree).find((e) => e.path === path);
    return entry ? fake.blobs.get(entry.sha).toString("utf8") : null;
  };

  function issueLike(n) {
    return fake.pulls.get(n) ?? fake.issues.get(n) ?? null;
  }

  function paginated(req, items, envelopeKey) {
    const perPage = Math.min(Number(req.query.per_page ?? 30) || 30, fake.maxPerPage);
    const page = Math.max(1, Number(req.query.page ?? 1) || 1);
    const slice = items.slice((page - 1) * perPage, page * perPage);
    const lastPage = Math.max(1, Math.ceil(items.length / perPage));
    const headers = {};
    const link = (p) => {
      const url = new URL(`${fake.url}${req.rawPath}`);
      for (const [k, v] of Object.entries(req.query)) url.searchParams.set(k, v);
      url.searchParams.set("page", String(p));
      url.searchParams.set("per_page", String(perPage));
      return url.href;
    };
    if (page < lastPage) {
      headers.link = `<${link(page + 1)}>; rel="next", <${link(lastPage)}>; rel="last"`;
    }
    const body = envelopeKey ? { total_count: items.length, [envelopeKey]: slice } : slice;
    return json(200, body, headers);
  }

  function addTimeline(n, event) {
    if (!fake.timeline.has(n)) fake.timeline.set(n, []);
    fake.timeline.get(n).push({ id: nextId++, created_at: fake.now(), actor: user(), ...event });
  }

  // ─────────────── routes: [method, RegExp on the repo-relative path, handler] ───────────────
  const routes = [
    ["GET", /^$/, () => json(200, fake.repoInfo)],

    [
      "GET",
      /^\/pulls$/,
      (req) => {
        const list = [...fake.pulls.values()]
          .filter(
            (p) => (req.query.state ?? "open") === "all" || p.state === (req.query.state ?? "open")
          )
          .filter((p) => !req.query.base || p.base.ref === req.query.base)
          .sort((a, b) => b.number - a.number);
        return paginated(req, list);
      },
    ],
    [
      "GET",
      /^\/pulls\/(\d+)$/,
      (_req, [n]) => (fake.pulls.has(+n) ? json(200, fake.pulls.get(+n)) : notFound()),
    ],
    [
      "GET",
      /^\/pulls\/(\d+)\/files$/,
      (req, [n]) => (fake.pulls.has(+n) ? paginated(req, fake.files.get(+n) ?? []) : notFound()),
    ],
    [
      "PUT",
      /^\/pulls\/(\d+)\/merge$/,
      (req, [n]) => {
        const number = +n;
        fake.merges.push({ number, body: req.body });
        if (fake.mergeResponses.has(number)) {
          const { status, body } = fake.mergeResponses.get(number);
          return json(status, body);
        }
        const pull = fake.pulls.get(number);
        if (!pull) return notFound();
        if (pull.state !== "open" || pull.merged) {
          return json(405, { message: "Pull Request is not mergeable" });
        }
        if (req.body?.sha && req.body.sha !== pull.head.sha) {
          return json(409, {
            message: "Head branch was modified. Review and try the merge again.",
          });
        }
        const sha = fakeSha({ merge: number, method: req.body?.merge_method });
        Object.assign(pull, {
          state: "closed",
          merged: true,
          merged_at: fake.now(),
          merge_commit_sha: sha,
        });
        return json(200, { sha, merged: true, message: "Pull Request successfully merged" });
      },
    ],

    [
      "GET",
      /^\/issues$/,
      (req) => {
        const state = req.query.state ?? "open";
        const wanted = req.query.labels ? String(req.query.labels).split(",") : [];
        const list = [
          ...[...fake.issues.values()],
          ...[...fake.pulls.values()].map((p) => ({ ...p, pull_request: { url: "x" } })),
        ]
          .filter((i) => state === "all" || i.state === state)
          .filter((i) => wanted.every((w) => i.labels.some((l) => l.name === w)))
          .sort((a, b) => b.number - a.number);
        return paginated(req, list);
      },
    ],
    [
      "POST",
      /^\/issues$/,
      (req) => {
        if (!req.body?.title) return json(422, { message: "Validation Failed" });
        const issue = fake.addIssue({
          title: req.body.title,
          body: req.body.body ?? "",
          labels: req.body.labels ?? [],
          user: user(),
        });
        return json(201, issue);
      },
    ],
    [
      "GET",
      /^\/issues\/(\d+)$/,
      (_req, [n]) => (issueLike(+n) ? json(200, issueLike(+n)) : notFound()),
    ],
    [
      "PATCH",
      /^\/issues\/(\d+)$/,
      (req, [n]) => {
        const target = issueLike(+n);
        if (!target) return notFound();
        for (const key of ["title", "body", "state"]) {
          if (req.body?.[key] !== undefined) target[key] = req.body[key];
        }
        target.updated_at = fake.now();
        return json(200, target);
      },
    ],
    [
      "GET",
      /^\/issues\/(\d+)\/timeline$/,
      (req, [n]) => (issueLike(+n) ? paginated(req, fake.timeline.get(+n) ?? []) : notFound()),
    ],
    [
      "POST",
      /^\/issues\/(\d+)\/labels$/,
      (req, [n]) => {
        const target = issueLike(+n);
        if (!target) return notFound();
        for (const name of req.body?.labels ?? []) {
          if (!target.labels.some((l) => l.name === name)) {
            target.labels.push({ name });
            addTimeline(+n, { event: "labeled", label: { name } });
          }
        }
        return json(200, target.labels);
      },
    ],
    [
      "DELETE",
      /^\/issues\/(\d+)\/labels\/(.+)$/,
      (_req, [n, rawName]) => {
        const target = issueLike(+n);
        if (!target) return notFound();
        const name = decodeURIComponent(rawName);
        const index = target.labels.findIndex((l) => l.name === name);
        if (index < 0) return json(404, { message: "Label does not exist" });
        target.labels.splice(index, 1);
        addTimeline(+n, { event: "unlabeled", label: { name } });
        return json(200, target.labels);
      },
    ],
    [
      "GET",
      /^\/issues\/(\d+)\/comments$/,
      (req, [n]) => (issueLike(+n) ? paginated(req, fake.comments.get(+n) ?? []) : notFound()),
    ],
    [
      "POST",
      /^\/issues\/(\d+)\/comments$/,
      (req, [n]) => {
        if (!issueLike(+n)) return notFound();
        const comment = {
          id: nextId++,
          body: req.body?.body ?? "",
          user: user(),
          created_at: fake.now(),
        };
        if (!fake.comments.has(+n)) fake.comments.set(+n, []);
        fake.comments.get(+n).push(comment);
        return json(201, comment);
      },
    ],
    [
      "DELETE",
      /^\/issues\/comments\/(\d+)$/,
      (_req, [id]) => {
        for (const list of fake.comments.values()) {
          const index = list.findIndex((c) => c.id === +id);
          if (index >= 0) {
            list.splice(index, 1);
            return json(204, null);
          }
        }
        return notFound();
      },
    ],

    [
      "GET",
      /^\/commits\/([0-9a-f]{40})\/check-runs$/,
      (req, [sha]) => paginated(req, fake.checkRuns.get(sha) ?? [], "check_runs"),
    ],
    [
      "GET",
      /^\/commits\/([0-9a-f]{40})\/check-suites$/,
      (req, [sha]) => paginated(req, fake.checkSuites.get(sha) ?? [], "check_suites"),
    ],
    [
      "GET",
      /^\/check-runs\/(\d+)\/annotations$/,
      (req, [id]) => paginated(req, fake.annotations.get(+id) ?? []),
    ],
    [
      "GET",
      /^\/commits\/([0-9a-f]{40})\/statuses$/,
      (req, [sha]) => paginated(req, fake.statuses.get(sha) ?? []),
    ],
    [
      "POST",
      /^\/statuses\/([0-9a-f]{40})$/,
      (req, [sha]) => {
        const status = {
          id: nextId++,
          state: req.body?.state,
          context: req.body?.context ?? "default",
          description: req.body?.description ?? null,
          target_url: req.body?.target_url ?? null,
          creator: user(),
          created_at: fake.now(),
          updated_at: fake.now(),
        };
        if (!fake.statuses.has(sha)) fake.statuses.set(sha, []);
        fake.statuses.get(sha).unshift(status);
        return json(201, status);
      },
    ],

    [
      "GET",
      /^\/contents\/(.+)$/,
      (req, [rawPath]) => {
        const path = decodeURIComponent(rawPath);
        const ref = req.query.ref ?? fake.repoInfo.default_branch;
        const commitSha = resolveRef(ref);
        if (!commitSha) return json(404, { message: `No commit found for the ref ${ref}` });
        const entries = fake.trees.get(fake.commits.get(commitSha).tree);
        const entry = entries.find((e) => e.path === path);
        if (!entry) {
          const dir = `${path.replace(/\/+$/, "")}/`;
          const children = new Map();
          for (const e of entries) {
            if (!e.path.startsWith(dir)) continue;
            const [name, ...rest] = e.path.slice(dir.length).split("/");
            const type = rest.length ? "dir" : "file";
            children.set(name, {
              type,
              name,
              path: `${dir}${name}`,
              sha: rest.length ? "" : e.sha,
            });
          }
          if (!children.size) return notFound();
          return json(
            200,
            [...children.values()].sort((a, b) => a.name.localeCompare(b.name))
          );
        }
        const content = wrap60(fake.blobs.get(entry.sha).toString("base64"));
        return json(200, { type: "file", encoding: "base64", path, sha: entry.sha, content });
      },
    ],
    [
      "PUT",
      /^\/contents\/(.+)$/,
      (req, [rawPath]) => {
        const path = decodeURIComponent(rawPath);
        const branch = req.body?.branch ?? fake.repoInfo.default_branch;
        const head = fake.refs.get(`heads/${branch}`);
        if (!head) return json(404, { message: `Branch ${branch} not found` });
        const current = fake.trees.get(fake.commits.get(head).tree).find((e) => e.path === path);
        if (current && !req.body?.sha) {
          return json(422, { message: 'Invalid request.\n\n"sha" wasn\'t supplied.' });
        }
        if (current && req.body.sha !== current.sha) {
          return json(409, { message: `${path} does not match ${req.body.sha}` });
        }
        const content = Buffer.from(String(req.body?.content ?? ""), "base64");
        const commitSha = fake.commitFiles({
          branch,
          files: { [path]: content },
          message: req.body?.message ?? "update",
        });
        const blobSha = gitBlobSha(content);
        return json(current ? 200 : 201, {
          content: { path, sha: blobSha },
          commit: { sha: commitSha },
        });
      },
    ],

    [
      "POST",
      /^\/git\/blobs$/,
      (req) => {
        const enc = req.body?.encoding ?? "utf-8";
        const buf = Buffer.from(
          String(req.body?.content ?? ""),
          enc === "base64" ? "base64" : "utf8"
        );
        return json(201, { sha: putBlob(buf) });
      },
    ],
    [
      "GET",
      /^\/git\/blobs\/([0-9a-f]{40})$/,
      (_req, [sha]) =>
        fake.blobs.has(sha)
          ? json(200, {
              sha,
              encoding: "base64",
              content: wrap60(fake.blobs.get(sha).toString("base64")),
            })
          : notFound(),
    ],
    [
      "POST",
      /^\/git\/trees$/,
      (req) => {
        const base = req.body?.base_tree ? (fake.trees.get(req.body.base_tree) ?? []) : [];
        const map = new Map(base.map((e) => [e.path, e]));
        for (const e of req.body?.tree ?? []) {
          if (!fake.blobs.has(e.sha)) return json(422, { message: `Invalid tree info: ${e.sha}` });
          map.set(e.path, { path: e.path, mode: e.mode, type: e.type, sha: e.sha });
        }
        return json(201, { sha: putTree([...map.values()]) });
      },
    ],
    [
      "POST",
      /^\/git\/commits$/,
      (req) => {
        if (!fake.trees.has(req.body?.tree))
          return json(422, { message: "Tree SHA does not exist" });
        const sha = putCommit({
          tree: req.body.tree,
          parents: req.body.parents ?? [],
          message: req.body.message ?? "",
        });
        return json(201, {
          sha,
          tree: { sha: req.body.tree },
          parents: (req.body.parents ?? []).map((p) => ({ sha: p })),
        });
      },
    ],
    [
      "GET",
      /^\/git\/commits\/([0-9a-f]{40})$/,
      (_req, [sha]) => {
        const c = fake.commits.get(sha);
        if (!c) return notFound();
        return json(200, {
          sha,
          message: c.message,
          tree: { sha: c.tree },
          parents: c.parents.map((p) => ({ sha: p })),
        });
      },
    ],
    [
      "POST",
      /^\/git\/refs$/,
      (req) => {
        const ref = String(req.body?.ref ?? "");
        if (!ref.startsWith("refs/")) return json(422, { message: "Reference name is invalid" });
        const key = ref.replace(/^refs\//, "");
        if (fake.refs.has(key) || fake.externalRefs?.get(key)) {
          return json(422, { message: "Reference already exists" });
        }
        if (!fake.commits.has(req.body?.sha))
          return json(422, { message: "Object does not exist" });
        fake.refs.set(key, req.body.sha);
        return json(201, { ref, object: { sha: req.body.sha, type: "commit" } });
      },
    ],
    [
      "GET",
      /^\/git\/ref\/(heads\/.+)$/,
      (_req, [raw]) => {
        const key = decodeURIComponent(raw);
        const sha = fake.refs.get(key) ?? fake.externalRefs?.get(key) ?? null;
        return sha
          ? json(200, { ref: `refs/${key}`, object: { sha, type: "commit" } })
          : notFound();
      },
    ],
    [
      "GET",
      /^\/git\/matching-refs\/(heads\/.*)$/,
      (req, [raw]) => {
        const prefix = decodeURIComponent(raw);
        const all = new Map(fake.externalRefs?.list(prefix) ?? []);
        for (const [key, value] of fake.refs) all.set(key, value);
        const list = [...all.entries()]
          .filter(([key]) => key.startsWith(prefix))
          .sort(([a], [b]) => (a < b ? -1 : 1))
          .map(([key, sha]) => ({ ref: `refs/${key}`, object: { sha, type: "commit" } }));
        return paginated(req, list);
      },
    ],
    [
      "DELETE",
      /^\/git\/refs\/(heads\/.+)$/,
      (_req, [raw]) => {
        const key = decodeURIComponent(raw);
        if (fake.refs.has(key)) {
          fake.refs.delete(key);
          return json(204, null);
        }
        if (fake.externalRefs?.delete(key)) return json(204, null);
        return json(422, { message: "Reference does not exist" });
      },
    ],

    [
      "GET",
      /^\/actions\/runs$/,
      (req) => {
        const list = fake.workflowRuns
          .filter((r) => !req.query.branch || r.head_branch === req.query.branch)
          .filter((r) => !req.query.head_sha || r.head_sha === req.query.head_sha)
          .filter((r) => !req.query.event || r.event === req.query.event);
        return paginated(req, list, "workflow_runs");
      },
    ],
    [
      "GET",
      /^\/actions\/workflows\/([^/]+)\/runs$/,
      (req, [file]) => {
        const path = `.github/workflows/${decodeURIComponent(file)}`;
        const list = fake.workflowRuns
          .filter((r) => r.path === path)
          .filter((r) => !req.query.branch || r.head_branch === req.query.branch)
          .filter((r) => !req.query.event || r.event === req.query.event);
        return paginated(req, list, "workflow_runs");
      },
    ],
    [
      "POST",
      /^\/actions\/workflows\/([^/]+)\/dispatches$/,
      (req, [file]) => {
        if (!req.body?.ref) return json(422, { message: "ref is required" });
        fake.dispatches.push({
          workflow: decodeURIComponent(file),
          ref: req.body.ref,
          inputs: req.body.inputs ?? {},
        });
        return json(204, null);
      },
    ],

    ["GET", /^\/rulesets$/, (req) => paginated(req, [...fake.rulesets.values()])],
    [
      "GET",
      /^\/rulesets\/(\d+)$/,
      (_req, [id]) => (fake.rulesets.has(+id) ? json(200, fake.rulesets.get(+id)) : notFound()),
    ],
    [
      "POST",
      /^\/rulesets$/,
      (req) => {
        const ruleset = { ...req.body, id: nextId++ };
        fake.rulesets.set(ruleset.id, ruleset);
        return json(201, ruleset);
      },
    ],
    [
      "PUT",
      /^\/rulesets\/(\d+)$/,
      (req, [id]) => {
        if (!fake.rulesets.has(+id)) return notFound();
        const ruleset = { ...fake.rulesets.get(+id), ...req.body, id: +id };
        fake.rulesets.set(+id, ruleset);
        return json(200, ruleset);
      },
    ],
  ];

  function route(req) {
    const index = fake.injections.findIndex(
      (inj) =>
        (!inj.method || inj.method === req.method) &&
        (inj.path instanceof RegExp ? inj.path.test(req.path) : inj.path === req.path)
    );
    if (index >= 0) {
      const inj = fake.injections[index];
      inj.times -= 1;
      if (inj.times <= 0) fake.injections.splice(index, 1);
      if (inj.apply) routeNormally(req);
      return { ...json(inj.status, inj.body, inj.headers), delayMs: inj.delayMs };
    }
    return routeNormally(req);
  }

  function routeNormally(req) {
    for (const [method, re, handler] of routes) {
      if (method !== req.method) continue;
      const m = re.exec(req.path);
      if (m) return handler(req, m.slice(1));
    }
    return notFound();
  }

  const prefix = `/repos/${owner}/${repo}`;
  const server = createServer((incoming, res) => {
    const chunks = [];
    incoming.on("data", (c) => chunks.push(c));
    incoming.on("end", () => {
      const url = new URL(incoming.url, "http://127.0.0.1");
      const text = Buffer.concat(chunks).toString("utf8");
      let body = null;
      try {
        body = text ? JSON.parse(text) : null;
      } catch {
        body = text;
      }
      const query = Object.fromEntries(url.searchParams.entries());
      const rawPath = url.pathname;
      const path = rawPath.startsWith(prefix) ? rawPath.slice(prefix.length) : `!${rawPath}`;
      const req = {
        method: incoming.method,
        path,
        rawPath,
        query,
        body,
        headers: incoming.headers,
      };
      fake.requests.push({ method: req.method, path, query, body, headers: incoming.headers });
      let result;
      if (fake.token && incoming.headers.authorization !== `Bearer ${fake.token}`) {
        result = json(401, { message: "Bad credentials" });
      } else {
        try {
          result = route(req);
        } catch (error) {
          result = json(500, { message: `fake-github: ${error.message}` });
        }
      }
      const headers = { "content-type": "application/json; charset=utf-8", ...result.headers };
      const send = () => {
        if (res.destroyed) return;
        res.writeHead(result.status, headers);
        res.end(result.body === null || result.status === 204 ? "" : JSON.stringify(result.body));
      };
      if (result.delayMs > 0) {
        const timer = setTimeout(send, result.delayMs);
        res.on("close", () => clearTimeout(timer));
      } else {
        send();
      }
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  fake.url = `http://127.0.0.1:${server.address().port}`;
  fake.close = () =>
    new Promise((resolve) => {
      server.closeAllConnections?.();
      server.close(() => resolve());
    });
  return fake;
}

/** Deterministic 40-hex SHA for fixtures: sha("a") → sha1 of "a". */
export function sha(seed) {
  return createHash("sha1").update(String(seed)).digest("hex");
}
