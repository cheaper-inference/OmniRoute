// In-memory fakes for the omni-queue tick tests: a GitHub client that records every write, and
// fake eligibility/checks/classify/compose/land/dashboard modules driven by a small "world"
// (which PRs are culprits, whether the base is broken, which PRs conflict). The real
// state store (state.mjs) and bisection (bisect.mjs) run on top of these fakes.
import { createHash } from "node:crypto";
import { hangSignatures as realHangSignatures } from "../../../../scripts/merge-queue/classify.mjs";
import { assertRefNamesSha } from "../../../../scripts/merge-queue/compose.mjs";
import { loadConfig } from "../../../../scripts/merge-queue/config.mjs";
import {
  APPROVAL_CONTEXTS,
  CANDIDATE_PREFIX,
  STATE_BRANCH,
  commentMarker,
} from "../../../../scripts/merge-queue/contracts.mjs";
import { createStateStore, gitBlobSha } from "../../../../scripts/merge-queue/state.mjs";
import { runTick } from "../../../../scripts/merge-queue/tick.mjs";

export const BASE = "release/v9.9.9";
export const REPOSITORY = "acme/widgets";

export function fakeSha(seed) {
  return createHash("sha1").update(String(seed)).digest("hex");
}

/** Controllable ISO clock. */
export function createClock(start = "2026-11-13T12:00:00.000Z") {
  let ms = Date.parse(start);
  return {
    now: () => new Date(ms).toISOString(),
    advance(minutes) {
      ms += minutes * 60_000;
    },
  };
}

const WRITE_METHODS = [
  "addLabels",
  "removeLabel",
  "createIssueComment",
  "commentOnce",
  "createIssue",
  "updateIssue",
  "createCommitStatus",
  "mergePull",
  "putFileContent",
  "createOrphanBranch",
  "deleteBranch",
  "dispatchWorkflow",
];

/**
 * In-memory GitHub client following the github.mjs contract. Every write is appended to
 * `gh.writes`; with `readOnly` every write throws (and is still recorded). With `calls` (an array
 * shared with the fake land module) every write is also appended there as {name, args, client},
 * so a test can read the order of status writes and landings and which client made each write.
 */
export function createFakeGitHub({ readOnly = false, calls = null, client = "app" } = {}) {
  let issueSeq = 1000;
  let commentSeq = 1;
  const gh = {
    owner: "acme",
    repo: "widgets",
    readOnly,
    branches: new Map(),
    pulls: new Map(),
    files: new Map(),
    timelines: new Map(),
    statuses: new Map(),
    /** commit SHAs the repository holds (getCommit answers 404 for any other) */
    commits: new Set(),
    checkRuns: new Map(),
    /** workflow runs (normalized, github.listWorkflowRuns): the check suite of each push / PR run */
    workflowRuns: [],
    annotations: new Map(),
    issues: [],
    comments: new Map(),
    contents: new Map(),
    writes: [],
    reads: [],
    /** test hook: runs before a putFileContent is applied (simulate a concurrent writer) */
    beforePut: null,
    /** test hook: (method, args) => Error|null; a returned Error is thrown, the write not applied */
    writeError: null,
  };

  const write = (method, args) => {
    // test hook: an Error returned here is thrown instead of applying the write (GitHub refused it)
    const refused = gh.writeError?.(method, args);
    if (refused) throw refused;
    gh.writes.push({ method, args });
    calls?.push({ name: method, args, client });
    if (gh.readOnly) throw new Error(`fake gh is read-only: ${method}`);
  };
  const read = (method, args) => gh.reads.push({ method, args });
  const copy = (value) => structuredClone(value);
  const summary = (p) => ({
    number: p.number,
    draft: p.draft,
    baseRef: p.baseRef,
    headSha: p.headSha,
    headRef: `feature/${p.number}`,
    headRepoFullName: REPOSITORY,
    title: p.title,
    author: p.author,
    labels: [...p.labels],
    createdAt: p.createdAt,
    updatedAt: p.createdAt,
  });

  Object.assign(gh, {
    async listOpenPulls({ base } = {}) {
      read("listOpenPulls", [base]);
      return [...gh.pulls.values()]
        .filter((p) => p.state === "open" && (!base || p.baseRef === base))
        .map(summary);
    },
    async getPull(n) {
      read("getPull", [n]);
      const p = gh.pulls.get(n);
      if (!p) throw new Error(`GET /pulls/${n} → 404`);
      return {
        ...summary(p),
        state: p.state,
        merged: p.merged,
        mergeable: p.mergeable,
        mergeableState: "clean",
        body: "",
        changedFiles: (gh.files.get(n) ?? []).length,
      };
    },
    async listPullFiles(n) {
      read("listPullFiles", [n]);
      return copy(gh.files.get(n) ?? []);
    },
    async listPullFileManifest(n) {
      read("listPullFileManifest", [n]);
      const files = copy(gh.files.get(n) ?? []);
      return { files, listed: files.length };
    },
    async listIssueTimeline(n) {
      read("listIssueTimeline", [n]);
      return copy(gh.timelines.get(n) ?? []);
    },
    async addLabels(n, labels) {
      write("addLabels", [n, labels]);
      gh.pulls.get(n)?.labels.push(...labels);
    },
    async removeLabel(n, label) {
      write("removeLabel", [n, label]);
      const p = gh.pulls.get(n);
      if (p) p.labels = p.labels.filter((l) => l !== label);
    },
    async listIssueComments(n) {
      read("listIssueComments", [n]);
      return copy(gh.comments.get(n) ?? []);
    },
    async createIssueComment(n, body) {
      write("createIssueComment", [n, body]);
      const list = gh.comments.get(n) ?? [];
      const id = commentSeq++;
      list.push({ id, body, author: "omni-queue[bot]", createdAt: "2026-11-13T00:00:00Z" });
      gh.comments.set(n, list);
      return { id };
    },
    async commentOnce(n, key, body) {
      write("commentOnce", [n, key, body]);
      const marker = commentMarker(key);
      const list = gh.comments.get(n) ?? [];
      if (list.some((c) => c.body.includes(marker))) return { posted: false };
      list.push({ id: commentSeq++, body: `${body}\n\n${marker}`, key });
      gh.comments.set(n, list);
      return { posted: true };
    },
    async listIssues({ labels = [], state = "open" } = {}) {
      read("listIssues", [labels, state]);
      return copy(
        gh.issues.filter(
          (i) => (state === "all" || i.state === state) && labels.every((l) => i.labels.includes(l))
        )
      );
    },
    async createIssue({ title, body, labels = [] }) {
      write("createIssue", [{ title, body, labels }]);
      const number = issueSeq++;
      gh.issues.push({ number, title, body, labels, state: "open", updatedAt: "" });
      return { number };
    },
    async updateIssue(n, patch) {
      write("updateIssue", [n, patch]);
      Object.assign(gh.issues.find((i) => i.number === n) ?? {}, patch);
    },
    async getBranchSha(branch) {
      read("getBranchSha", [branch]);
      return gh.branches.get(branch) ?? null;
    },
    async listCheckRuns(sha) {
      read("listCheckRuns", [sha]);
      return copy(gh.checkRuns.get(sha) ?? []);
    },
    async listWorkflowRuns({ branch, headSha, event } = {}) {
      read("listWorkflowRuns", [{ branch, headSha, event }]);
      return copy(
        gh.workflowRuns.filter(
          (run) =>
            (!branch || run.headBranch === branch) &&
            (!headSha || run.headSha === headSha) &&
            (!event || run.event === event)
        )
      );
    },
    async listCheckRunAnnotations(id) {
      read("listCheckRunAnnotations", [id]);
      return copy(gh.annotations.get(id) ?? []);
    },
    async getCommit(sha) {
      read("getCommit", [sha]);
      if (!gh.commits.has(sha)) {
        throw Object.assign(new Error(`GET /git/commits/${sha} → 404: Not Found`), {
          name: "GitHubError",
          status: 404,
        });
      }
      return { sha, treeSha: fakeSha(`tree:${sha}`), parents: [], message: "commit" };
    },
    async listCommitStatuses(sha) {
      read("listCommitStatuses", [sha]);
      return copy(gh.statuses.get(sha) ?? []);
    },
    async createCommitStatus(sha, status) {
      write("createCommitStatus", [sha, status]);
    },
    async mergePull(n, opts) {
      write("mergePull", [n, opts]);
      return { merged: false, sha: null, status: 405, message: "not used by these tests" };
    },
    async getFileContent(path, ref) {
      read("getFileContent", [path, ref]);
      const file = gh.contents.get(`${ref}:${path}`);
      return file ? { ...file } : null;
    },
    async putFileContent(path, { branch, message, content, sha }) {
      write("putFileContent", [path, { branch, message, sha }]);
      if (gh.beforePut) {
        const hook = gh.beforePut;
        gh.beforePut = null;
        await hook();
      }
      if (!gh.branches.has(branch)) throw new Error(`PUT contents on missing branch ${branch}`);
      const key = `${branch}:${path}`;
      const current = gh.contents.get(key);
      if (current ? current.sha !== sha : sha) return { ok: false, conflict: true };
      const blob = gitBlobSha(content);
      gh.contents.set(key, { content, sha: blob });
      return { ok: true, sha: blob };
    },
    async createOrphanBranch(branch, files, message) {
      write("createOrphanBranch", [branch, files.map((f) => f.path), message]);
      if (gh.branches.has(branch)) return null;
      const commit = fakeSha(`orphan:${branch}:${message}`);
      gh.branches.set(branch, commit);
      for (const file of files) {
        gh.contents.set(`${branch}:${file.path}`, {
          content: file.content,
          sha: gitBlobSha(file.content),
        });
      }
      return commit;
    },
    async listMatchingBranches(prefix) {
      read("listMatchingBranches", [prefix]);
      return [...gh.branches.entries()]
        .filter(([name]) => name.startsWith(prefix))
        .map(([ref, sha]) => ({ ref, sha }));
    },
    async deleteBranch(branch) {
      write("deleteBranch", [branch]);
      if (!branch.startsWith(CANDIDATE_PREFIX)) throw new Error(`refusing to delete ${branch}`);
      gh.branches.delete(branch);
    },
    async dispatchWorkflow(...args) {
      write("dispatchWorkflow", args);
    },
  });
  return gh;
}

const SHA40 = /^[0-9a-f]{40}$/;

/**
 * Fake git runner over a fake object store (`objects`, emptied by the fake prepareRepo like the
 * fresh scratch repository of every real tick). Records argv. Without `gh` every command
 * succeeds; with `gh`:
 *  - `fetch origin +refs/heads/<b>:<dst>` fails (like gitexec: throws unless allowFail) when the
 *    branch is absent on the fake origin, else brings its commit and ancestry;
 *  - `fetch origin +<sha>:<dst>` succeeds only for a SHA reachable from an origin branch or listed
 *    in `world.fetchableShas` (GitHub may still serve an unreferenced object);
 *  - `cat-file -e <sha>^{commit}` succeeds only when the object is local.
 * Ancestry: a composed candidate's parent is the base it was composed on (world.compositions).
 * `objects` shares the object store with another fake git (two runners on one scratch directory,
 * like the App's git and the owner's landing git).
 */
export function createFakeGit({
  gh = null,
  world = null,
  cwd = "/fake/compose.git",
  objects = new Set(),
} = {}) {
  const runs = [];
  const parentsOf = (sha) => {
    const composition = world?.compositions.get(sha);
    return composition ? [composition.baseSha] : [];
  };
  const ancestry = (sha) => {
    const out = new Set();
    const stack = [sha];
    while (stack.length) {
      const next = stack.pop();
      if (!next || out.has(next)) continue;
      out.add(next);
      stack.push(...parentsOf(next));
    }
    return out;
  };
  const reachable = (sha) =>
    Boolean(world?.fetchableShas?.has(sha)) ||
    [...gh.branches.values()].some((tip) => ancestry(tip).has(sha));
  const fail = (args, allowFail, stderr) => {
    if (allowFail) return { code: 128, stdout: "", stderr };
    throw new Error(`git ${args.join(" ")} failed (128): ${stderr}`);
  };
  const git = {
    cwd,
    runs,
    objects,
    addWithAncestry(sha) {
      for (const s of ancestry(sha)) objects.add(s);
    },
    run(args, { allowFail = false } = {}) {
      runs.push(args);
      if (gh && args[0] === "fetch") {
        const source = String(args.at(-1)).replace(/^\+/, "").split(":")[0];
        if (source.startsWith("refs/heads/")) {
          const sha = gh.branches.get(source.slice("refs/heads/".length));
          if (!sha) return fail(args, allowFail, `fatal: couldn't find remote ref ${source}`);
          git.addWithAncestry(sha);
        } else if (SHA40.test(source)) {
          if (!reachable(source)) return fail(args, allowFail, `fatal: not our ref ${source}`);
          git.addWithAncestry(source);
        }
      } else if (gh && args[0] === "cat-file") {
        const sha = String(args.at(-1)).replace(/\^\{commit\}$/, "");
        if (!objects.has(sha)) return fail(args, allowFail, "");
      }
      return { code: 0, stdout: "", stderr: "" };
    },
    out(args) {
      runs.push(args);
      return "";
    },
  };
  return git;
}

/**
 * The world behind the fake modules: compositions (candidate SHA → base + PRs), culprit PRs,
 * broken base SHAs, conflicts, and logs of pushes / landings / dashboard upserts.
 */
export function createWorld(gh, clock) {
  return {
    gh,
    clock,
    compositions: new Map(),
    culprits: new Set(),
    brokenBases: new Set(),
    baseConflicts: new Set(),
    batchConflicts: new Set(),
    /** PRs whose head is already reachable from the bare base (ComposeResult.alreadyInBase) */
    alreadyInBase: new Set(),
    /** PRs stacked on an earlier PR of the batch (ComposeResult.alreadyContained) */
    stacked: new Set(),
    /** pairs of PRs that only fail together (an interaction across bisection segments) */
    interactions: [],
    /** PRs whose diff touches a protected surface (need the protected approval label) */
    protectedPrs: new Set(),
    /** unreferenced SHAs GitHub still serves to `git fetch origin <sha>` */
    fetchableShas: new Set(),
    failureKey: "tests/unit/widget.test.ts",
    /** PRs whose composition makes the `hangRuns` jobs end without a verdict (a hanging test) */
    hangs: new Set(),
    /** base SHAs on which the `hangRuns` jobs end the same way (bare base and batches on it) */
    hangingBases: new Set(),
    /**
     * The jobs reported for a hanging composition, next to the "Gate / CI" failure they cause:
     * by default the real shape of a job that hit its time limit. A test can swap in runner
     * loss, a startup failure or a plain cancel to check that those are not taken for a hang.
     */
    hangRuns: [{ name: "Unit Tests (3/8)", conclusion: "timed_out", annotations: [] }],
    eligibilityActions: () => [],
    pushes: [],
    lands: [],
    composeCalls: [],
    /** land.verifyComposition calls ({expectedBaseSha, candidateSha, prs: numbers, treeSha}) */
    verifications: [],
    prepareCalls: 0,
    renders: [],
    upserts: [],
    squashResult: null,
    /** thrown by the fake landings when set (a push or merge that gives no verdict) */
    landError: null,
    /** GitHub writes and landings in call order ({name, args, client}); see createFakeGitHub */
    calls: [],
    runSeq: 1,
  };
}

const SUCCESS_STATES = new Set(["completed"]);
const RED = new Set(["failure", "cancelled", "timed_out", "action_required", "startup_failure"]);

export function createFakeModules(world) {
  const { gh } = world;
  const eligibility = {
    evaluateEligibility(pr, ctx) {
      const { label } = ctx.config;
      const labeled = pr.timeline.filter((e) => e.event === "labeled" && e.label === label);
      const labeledAt = labeled.length ? labeled[labeled.length - 1].createdAt : null;
      const inFlight = ctx.state?.inFlight?.prs?.some((p) => p.n === pr.number) ?? false;
      const processed = ctx.state?.shadow?.processed?.[String(pr.number)] === pr.headSha;
      // newest status of the approval context on the head (approve.mjs writes `failure` when the
      // label is removed; a re-label by a non-approver writes nothing)
      const approval = pr.headStatuses.find((st) => st.context === APPROVAL_CONTEXTS.queue);
      // the base named as a whole whitespace-delimited token (no pattern built from the ref)
      const frozen = ctx.freezeIssues.some((i) =>
        `${i.title} ${i.body}`.split(/\s+/).includes(pr.baseRef)
      );
      const reasons = [];
      if (!pr.labels.includes(label)) reasons.push({ code: "no-label", detail: "" });
      if (pr.labels.some((l) => ctx.config.blockLabels.includes(l))) {
        reasons.push({ code: "blocked-label", detail: "" });
      }
      if (frozen) reasons.push({ code: "base-frozen", detail: `freeze on ${pr.baseRef}` });
      if (!labeledAt || (approval && approval.state !== "success")) {
        reasons.push({ code: "approval-missing", detail: "" });
      }
      if (
        world.protectedPrs.has(pr.number) &&
        !pr.labels.includes(ctx.config.protectedApprovalLabel)
      ) {
        reasons.push({ code: "protected-approval-missing", detail: "" });
      }
      if (inFlight) reasons.push({ code: "in-flight", detail: "" });
      if (processed) reasons.push({ code: "shadow-processed", detail: "" });
      return {
        eligible: reasons.length === 0,
        reasons,
        actions: world.eligibilityActions(pr) ?? [],
        approval: { valid: !!labeledAt, actor: "owner", labeledAt, reason: null },
        protectedSurface: false,
      };
    },
    selectBatch(candidates, ctx) {
      const batch = [...candidates]
        .sort((a, b) =>
          a.eligibility.approval.labeledAt.localeCompare(b.eligibility.approval.labeledAt)
        )
        .slice(0, ctx.config.batch.maxSize)
        .map(({ pr, eligibility: el }) => ({
          n: pr.number,
          head: pr.headSha,
          title: pr.title,
          author: pr.author,
          labeledAt: el.approval.labeledAt,
        }));
      return { batch, waiting: false, reason: batch.length ? "ok" : "empty" };
    },
  };

  const checks = {
    evaluateChecks({ checkRuns, config, startedAt, now }) {
      const latest = new Map();
      for (const run of checkRuns) {
        if (!latest.has(run.name) || latest.get(run.name).id < run.id) latest.set(run.name, run);
      }
      const runs = [...latest.values()];
      const failures = runs.filter((r) => SUCCESS_STATES.has(r.status) && RED.has(r.conclusion));
      const base = { required: {}, advisoryFailures: [], pending: [] };
      if (failures.length) return { ...base, verdict: "red", failures };
      const green = config.requiredChecks.every(
        (name) =>
          latest.get(name)?.status === "completed" && latest.get(name)?.conclusion === "success"
      );
      if (green) return { ...base, verdict: "green", failures: [] };
      const elapsed = (Date.parse(now) - Date.parse(startedAt)) / 60_000;
      if (elapsed > config.checksTimeoutMinutes)
        return { ...base, verdict: "timeout", failures: [] };
      return { ...base, verdict: "pending", failures: [] };
    },
  };

  const classify = {
    extractSignatures(failures, annotationsByRunId) {
      return failures.map((run) => ({
        check: run.name,
        key: annotationsByRunId[run.id]?.[0]?.title ?? "",
        infra: run.conclusion === "startup_failure",
      }));
    },
    // the real rule: which runs have the shape of a job that hit its time limit
    hangSignatures: realHangSignatures,
    classifyRed({ signatures, baseSha, baseCheck }) {
      const out = (kind) => ({ kind, detail: `fake:${kind}`, matched: [], unmatched: [] });
      // the real precedence: infra, then the verdict of a base check on the SAME base SHA —
      // green → pr-red; red → base-red when every failure matches; timeout → pr-red (a timed-out
      // base check is never redone); pending or none → needs-base-check
      if (signatures.length && signatures.every((s) => s.infra)) return out("infra");
      const status = baseCheck && baseCheck.baseSha === baseSha ? baseCheck.status : null;
      if (status === "green" || status === "timeout") return out("pr-red");
      if (status === "red") {
        const all = signatures
          .filter((s) => !s.infra)
          .every((s) =>
            baseCheck.signatures.some(
              (b) =>
                b.check === s.check &&
                (!b.hang || s.hang) && // a hang on the base explains only a hang
                (!b.key || !s.key || b.key === s.key)
            )
          );
        return out(all ? "base-red" : "pr-red");
      }
      return out("needs-base-check");
    },
  };

  const compose = {
    prepareRepo({ git, remoteUrl }) {
      world.prepareCalls += 1;
      git.objects?.clear(); // every tick starts from an empty scratch repository
      void remoteUrl;
    },
    fetchInputs({ git, base, prs }) {
      const heads = {};
      for (const pr of prs) heads[pr.n] = gh.pulls.get(pr.n)?.headSha ?? null;
      const baseSha = gh.branches.get(base);
      git.addWithAncestry?.(baseSha);
      return { baseSha, heads };
    },
    composeCandidate({ git, base, baseSha, prs, batchId, heads }) {
      if (git.objects && !git.objects.has(baseSha)) {
        throw new Error(`compose: base ${baseSha} is not in the scratch repository`);
      }
      world.composeCalls.push({ base, baseSha, prs: prs.map((p) => p.n), batchId });
      const included = [];
      const excludedBatchConflict = [];
      const excludedBaseConflict = [];
      const excludedHeadMoved = [];
      const alreadyInBase = [];
      const alreadyContained = [];
      for (const pr of prs) {
        if (heads[pr.n] !== pr.head) excludedHeadMoved.push(pr);
        else if (world.alreadyInBase.has(pr.n)) alreadyInBase.push(pr);
        else if (world.stacked.has(pr.n) && included.length) {
          included.push(pr);
          alreadyContained.push(pr);
        } else if (world.baseConflicts.has(pr.n)) excludedBaseConflict.push(pr);
        else if (world.batchConflicts.has(pr.n) && included.length) excludedBatchConflict.push(pr);
        else included.push(pr);
      }
      if (!included.length) {
        return {
          candidateSha: null,
          treeSha: null,
          baseSha,
          included,
          excludedBatchConflict,
          excludedBaseConflict,
          excludedHeadMoved,
          alreadyContained,
          alreadyInBase,
        };
      }
      const candidateSha = fakeSha(`${baseSha}|${batchId}|${included.map((p) => p.head)}`);
      world.compositions.set(candidateSha, {
        baseSha,
        prs: included.map((p) => p.n),
        heads: included.map((p) => p.head),
      });
      git.objects?.add(candidateSha);
      return {
        candidateSha,
        treeSha: fakeSha(`tree:${candidateSha}`),
        baseSha,
        included,
        excludedBatchConflict,
        excludedBaseConflict,
        excludedHeadMoved,
        alreadyContained,
        alreadyInBase,
      };
    },
    pushCandidate({ git, sha, ref }) {
      if (!ref.startsWith(CANDIDATE_PREFIX)) throw new Error(`push outside prefix: ${ref}`);
      assertRefNamesSha(ref, sha); // the real naming rule of compose.pushCandidate
      if (git.objects && !git.objects.has(sha)) throw new Error(`push: ${sha} is not local`);
      if (gh.branches.has(ref)) throw new Error(`push: ${ref} exists (would need a force)`);
      world.pushes.push({ ref, sha });
      gh.branches.set(ref, sha);
    },
    deleteCandidate({ ref }) {
      gh.branches.delete(ref);
    },
  };

  function mergeComposition(base, candidateSha) {
    const composition = world.compositions.get(candidateSha);
    gh.branches.set(base, candidateSha);
    for (const n of composition?.prs ?? []) {
      const pull = gh.pulls.get(n);
      pull.merged = true;
      pull.state = "closed";
    }
    return composition?.prs ?? [];
  }

  const land = {
    // The real rule over the fake object store: the candidate is the composition of exactly
    // these PRs at these heads on this base (and of this tree when one is given).
    verifyComposition({ git, expectedBaseSha, candidateSha, prs, treeSha }) {
      world.verifications.push({
        expectedBaseSha,
        candidateSha,
        prs: (prs ?? []).map((p) => p.n),
        treeSha,
      });
      const fail = (detail) => ({ ok: false, detail });
      if (!prs?.length) return fail("the batch names no pull request");
      if (git.objects && !git.objects.has(candidateSha)) return fail("candidate not local");
      const composition = world.compositions.get(candidateSha);
      if (!composition) return fail("not a composition");
      if (composition.baseSha !== expectedBaseSha) return fail("composed on another base");
      const named = prs.map((p) => `${p.n}@${p.head}`).join(",");
      const merged = composition.prs.map((n, i) => `${n}@${composition.heads[i]}`).join(",");
      if (named !== merged) return fail(`the candidate merges ${merged}, the batch says ${named}`);
      if (treeSha !== undefined && treeSha !== fakeSha(`tree:${candidateSha}`)) {
        return fail("another tree");
      }
      return { ok: true };
    },
    landMergeFf(input) {
      const { git, base, candidateSha, expectedBaseSha, prs } = input;
      world.calls.push({ name: "landMergeFf", args: [input] });
      if (world.landError) throw world.landError;
      if (git.objects && !git.objects.has(candidateSha)) {
        throw new Error(`land: ${candidateSha} is not in the scratch repository`);
      }
      world.lands.push({
        mode: "merge-ff",
        base,
        candidateSha,
        expectedBaseSha,
        prs: prs === undefined ? undefined : prs.map((p) => p.n),
      });
      const tip = gh.branches.get(base);
      if (tip !== expectedBaseSha) return { ok: false, reason: "base-moved", newBaseSha: tip };
      const merged = mergeComposition(base, candidateSha);
      return { ok: true, newBaseSha: candidateSha, merged };
    },
    async landSquashApi(input) {
      const { base, prs, expectedBaseSha, candidateTreeSha } = input;
      world.calls.push({ name: "landSquashApi", args: [input] });
      if (world.landError) throw world.landError;
      world.lands.push({
        mode: "squash-api",
        base,
        prs: prs.map((p) => p.n),
        expectedBaseSha,
        candidateTreeSha,
      });
      if (world.squashResult) {
        for (const n of world.squashResult.merged ?? []) {
          Object.assign(gh.pulls.get(n), { merged: true, state: "closed" });
        }
        return world.squashResult;
      }
      if (gh.branches.get(base) !== expectedBaseSha) return { ok: false, reason: "base-moved" };
      return {
        ok: true,
        merged: prs.map((p) => p.n),
        newBaseSha: fakeSha(`squash:${expectedBaseSha}`),
      };
    },
  };

  const dashboard = {
    renderDashboard(input) {
      world.renders.push(structuredClone(input));
      return `dashboard ${input.base}`;
    },
    async upsertDashboard({ gh: client, base, body }) {
      if (client.readOnly) throw new Error("upsertDashboard in read-only mode");
      world.upserts.push({ base, body });
      return 1;
    },
  };

  return { eligibility, checks, classify, compose, land, dashboard };
}

/** Landing identity of the repository owner in the fixtures (config.landing.identity). */
export const OWNER_IDENTITY = Object.freeze({
  name: "owner",
  email: "1+owner@users.noreply.github.com",
});

/**
 * A ready-to-tick queue: fake gh with the base branch, fake modules, the real state store.
 * `actor` is config.landing.actor. With "owner" the landing runs with a second fake client
 * (`h.landGh`, writes recorded with client "owner") and a second fake git on the same object
 * store (`h.landGit`), as createTickDeps builds them from OMNI_QUEUE_LAND_TOKEN; `landToken:
 * false` leaves both null (the token is missing). With "app" they are the App's own gh and git.
 * @param {{mode?: "shadow"|"live", landing?: "merge-ff"|"squash-api", readOnly?: boolean,
 *          infraRetries?: number, actor?: "app"|"owner", landToken?: boolean}} [options]
 */
export function createHarness({
  mode = "live",
  landing = "merge-ff",
  infraRetries = 1,
  actor = "app",
  landToken = true,
} = {}) {
  const clock = createClock();
  const calls = [];
  const gh = createFakeGitHub({ calls });
  const world = createWorld(gh, clock);
  world.calls = calls;
  const modules = createFakeModules(world);
  const base = loadConfig();
  const config = {
    ...base,
    mode,
    landing: {
      mode: landing,
      actor,
      ...(actor === "owner" ? { identity: { ...OWNER_IDENTITY } } : {}),
      statusContext: "omni-queue/land",
    },
    infraRetries,
  };
  const git = createFakeGit({ gh, world });
  const owner = actor === "owner";
  const landGit = owner ? createFakeGit({ gh, world, objects: git.objects }) : git;
  const landGh = owner ? createFakeGitHub({ calls, client: "owner" }) : gh;
  const store = createStateStore({ gh, now: clock.now });
  const logs = [];
  const baseSha = fakeSha("base-0");
  gh.branches.set(BASE, baseSha);
  const deps = {
    config,
    gh,
    store,
    gitFor: () => git,
    landGitFor: !owner ? () => git : landToken ? () => landGit : null,
    landGh: !owner || landToken ? landGh : null,
    repoDir: "/fake/compose.git",
    remoteUrl: `https://github.com/${REPOSITORY}.git`,
    identity: { name: "omni-queue[bot]", email: "omni-queue[bot]@users.noreply.github.com" },
    now: clock.now,
    log: (line) => logs.push(line),
    runUrl: `https://github.com/${REPOSITORY}/actions/runs/77`,
    repository: REPOSITORY,
    modules,
  };

  const h = {
    clock,
    gh,
    world,
    modules,
    config,
    git,
    landGit,
    landGh,
    calls,
    store,
    deps,
    logs,
    /** Open PR #n on BASE carrying the queue label (labeled `minute` minutes after start). */
    addPr(n, { labeled = true, minute = n, base: prBase = BASE } = {}) {
      const head = fakeSha(`head-${n}`);
      gh.pulls.set(n, {
        number: n,
        state: "open",
        merged: false,
        draft: false,
        baseRef: prBase,
        headSha: head,
        title: `PR number ${n}`,
        author: `dev${n}`,
        labels: labeled ? [config.label] : [],
        mergeable: true,
        createdAt: "2026-11-13T10:00:00.000Z",
      });
      gh.timelines.set(
        n,
        labeled
          ? [
              {
                event: "labeled",
                actor: "diegosouzapw",
                label: config.label,
                createdAt: new Date(
                  Date.parse("2026-11-13T11:00:00.000Z") + minute * 60_000
                ).toISOString(),
              },
            ]
          : []
      );
      return head;
    },
    async state() {
      return (await store.load(BASE)).state;
    },
    tick(options = {}) {
      return runTick(deps, { base: BASE, action: "tick", ...options });
    },
    /** PRs contained in `sha`: its composition plus every composition it was stacked on. */
    prsIn(sha) {
      const prs = new Set();
      for (let c = world.compositions.get(sha); c; c = world.compositions.get(c.baseSha)) {
        for (const n of c.prs) prs.add(n);
      }
      return prs;
    },
    /** Newest candidate branch of the fake origin that points at `sha` (null when none does). */
    candidateRefAt(sha) {
      const refs = [...gh.branches.entries()].filter(
        ([name, tip]) => name.startsWith(CANDIDATE_PREFIX) && tip === sha
      );
      return refs.length ? refs.at(-1)[0] : null;
    },
    /**
     * A workflow run on `sha` as GitHub Actions lists it: `event` "push" on branch `headBranch`
     * (the candidate's own CI) or "pull_request" (a PR whose head is that commit; `headBranch` is
     * then the PR's head branch name). Returns the id of its check suite, to put on its check runs
     * as `checkSuiteId`.
     */
    workflowRun(sha, { headBranch, event = "push" } = {}) {
      const checkSuiteId = 5000 + world.runSeq++;
      gh.workflowRuns.push({
        id: world.runSeq++,
        name: "CI",
        status: "completed",
        conclusion: null,
        htmlUrl: `https://github.com/${REPOSITORY}/actions/runs/${checkSuiteId}`,
        headSha: sha,
        headBranch: headBranch ?? null,
        event,
        checkSuiteId,
      });
      return checkSuiteId;
    },
    /**
     * Report CI on `sha`: red (a "Gate / CI" failure) when the composition contains a culprit, a
     * full interaction pair (counting the PRs it was stacked on) or sits on a broken base SHA;
     * `infra` reports a startup_failure; `kind` "base-check" tests the bare base SHA. A
     * composition holding a `world.hangs` PR, or a base in `world.hangingBases`, also reports the
     * `world.hangRuns` jobs, and "Gate / CI" fails without a failure annotation (an aggregate gate
     * whose needed job did not succeed). `at` pins the run time. The runs belong to the check
     * suite of a push workflow run on `headBranch` (default: the newest candidate ref pointing at
     * `sha`, as the push of that ref starts CI).
     */
    runCi(sha, { infra = false, kind = "batch", at: pinned = null, headBranch } = {}) {
      clock.advance(1);
      const at = pinned ?? clock.now();
      const branch = headBranch ?? h.candidateRefAt(sha);
      const checkSuiteId = h.workflowRun(sha, { headBranch: branch, event: "push" });
      let red;
      let hangs;
      if (kind === "base-check") {
        red = world.brokenBases.has(sha);
        hangs = world.hangingBases.has(sha);
      } else {
        const composition = world.compositions.get(sha);
        const prs = h.prsIn(sha);
        red =
          composition.prs.some((n) => world.culprits.has(n)) ||
          world.interactions.some((pair) => pair.every((n) => prs.has(n))) ||
          world.brokenBases.has(composition.baseSha);
        hangs =
          composition.prs.some((n) => world.hangs.has(n)) ||
          world.hangingBases.has(composition.baseSha);
      }
      const hangRuns = (hangs ? world.hangRuns : []).map(({ name, conclusion, annotations }) => {
        const id = world.runSeq++;
        if (annotations.length) gh.annotations.set(id, structuredClone(annotations));
        return {
          id,
          name,
          status: "completed",
          conclusion,
          startedAt: at,
          completedAt: at,
          htmlUrl: `https://github.com/${REPOSITORY}/actions/runs/1/job/${id}`,
          appSlug: "github-actions",
          output: { title: null, summary: null, text: null },
          checkSuiteId,
          ...(headBranch ? { headBranch } : {}),
        };
      });
      const requiredRuns = config.requiredChecks.map((name) => {
        const id = world.runSeq++;
        const failing = name === "Gate / CI" && (red || infra || hangs);
        if (failing && !infra && red) {
          gh.annotations.set(id, [
            { path: world.failureKey, title: world.failureKey, message: "boom", level: "failure" },
          ]);
        }
        return {
          id,
          name,
          status: "completed",
          conclusion: failing ? (infra ? "startup_failure" : "failure") : "success",
          startedAt: at,
          completedAt: at,
          htmlUrl: `https://github.com/${REPOSITORY}/actions/runs/1/job/${id}`,
          appSlug: "github-actions",
          output: { title: null, summary: null, text: null },
          checkSuiteId,
          ...(headBranch ? { headBranch } : {}),
        };
      });
      gh.checkRuns.set(sha, [...(gh.checkRuns.get(sha) ?? []), ...requiredRuns, ...hangRuns]);
      clock.advance(1);
    },
    /**
     * Check runs that a pull_request workflow run reports on `sha` (somebody opened a PR whose
     * head is that commit): one run per `names` entry with `conclusion`, in a suite of its own.
     * `headBranch` null = a fork PR (GitHub reports no head_branch for its suite); a string = a
     * PR opened from a branch of this repository.
     */
    runPrCi(
      sha,
      { headBranch = null, conclusion = "success", names = config.requiredChecks } = {}
    ) {
      clock.advance(1);
      const at = clock.now();
      const checkSuiteId = h.workflowRun(sha, {
        headBranch: headBranch ?? "fork-branch",
        event: "pull_request",
      });
      const runs = names.map((name) => ({
        id: world.runSeq++,
        name,
        status: "completed",
        conclusion,
        startedAt: at,
        completedAt: at,
        htmlUrl: null,
        appSlug: "github-actions",
        output: { title: null, summary: null, text: null },
        checkSuiteId,
        headBranch,
      }));
      gh.checkRuns.set(sha, [...(gh.checkRuns.get(sha) ?? []), ...runs]);
      clock.advance(1);
      return runs;
    },
    /** Run CI for whatever is in flight, then tick; repeat until the queue is idle. */
    async drain({ maxTicks = 40 } = {}) {
      for (let i = 0; i < maxTicks; i++) {
        const before = await h.state();
        if (before.inFlight) {
          h.runCi(before.inFlight.candidateSha, { kind: before.inFlight.kind });
        }
        await h.tick();
        const after = await h.state();
        if (!after.inFlight) return after;
      }
      throw new Error("queue did not drain");
    },
    writesOf(method) {
      return gh.writes.filter((w) => w.method === method);
    },
  };
  return h;
}

export { STATE_BRANCH, WRITE_METHODS };
