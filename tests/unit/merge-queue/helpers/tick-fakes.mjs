// In-memory fakes for the omni-queue tick tests: a GitHub client that records every write, and
// fake eligibility/checks/classify/compose/land/dashboard modules driven by a small "world"
// (which PRs are culprits, whether the base is broken, which PRs conflict). The real
// state store (state.mjs) and bisection (bisect.mjs) run on top of these fakes.
import { createHash } from "node:crypto";
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
 * `gh.writes`; with `readOnly` every write throws (and is still recorded).
 */
export function createFakeGitHub({ readOnly = false } = {}) {
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
    checkRuns: new Map(),
    annotations: new Map(),
    issues: [],
    comments: new Map(),
    contents: new Map(),
    writes: [],
    reads: [],
    /** test hook: runs before a putFileContent is applied (simulate a concurrent writer) */
    beforePut: null,
  };

  const write = (method, args) => {
    gh.writes.push({ method, args });
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
      };
    },
    async listPullFiles(n) {
      read("listPullFiles", [n]);
      return copy(gh.files.get(n) ?? []);
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
    async listCheckRunAnnotations(id) {
      read("listCheckRunAnnotations", [id]);
      return copy(gh.annotations.get(id) ?? []);
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
 */
export function createFakeGit({ gh = null, world = null, cwd = "/fake/compose.git" } = {}) {
  const runs = [];
  const objects = new Set();
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
    eligibilityActions: () => [],
    pushes: [],
    lands: [],
    composeCalls: [],
    prepareCalls: 0,
    renders: [],
    upserts: [],
    squashResult: null,
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
      const frozen = ctx.freezeIssues.some((i) =>
        new RegExp(`(^|\\s)${pr.baseRef.replace(/[.]/g, "\\.")}($|\\s)`).test(
          `${i.title} ${i.body}`
        )
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
    classifyRed({ signatures, baseSha, baseCheck, baseRedIssueOpen }) {
      const out = (kind) => ({ kind, detail: `fake:${kind}`, matched: [], unmatched: [] });
      if (signatures.length && signatures.every((s) => s.infra)) return out("infra");
      const finished =
        baseCheck && baseCheck.baseSha === baseSha && ["green", "red"].includes(baseCheck.status);
      if (finished && baseCheck.status === "green") return out("pr-red");
      if (finished && baseCheck.status === "red") {
        const all = signatures
          .filter((s) => !s.infra)
          .every((s) =>
            baseCheck.signatures.some(
              (b) => b.check === s.check && (!b.key || !s.key || b.key === s.key)
            )
          );
        return out(all ? "base-red" : "pr-red");
      }
      if (baseRedIssueOpen) return out("needs-base-check");
      return out("pr-red");
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
      world.compositions.set(candidateSha, { baseSha, prs: included.map((p) => p.n) });
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
    landMergeFf({ git, base, candidateSha, expectedBaseSha, prs }) {
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
    async landSquashApi({ base, prs, expectedBaseSha, candidateTreeSha }) {
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

/**
 * A ready-to-tick queue: fake gh with the base branch, fake modules, the real state store.
 * @param {{mode?: "shadow"|"live", landing?: "merge-ff"|"squash-api", readOnly?: boolean,
 *          infraRetries?: number}} [options]
 */
export function createHarness({ mode = "live", landing = "merge-ff", infraRetries = 1 } = {}) {
  const clock = createClock();
  const gh = createFakeGitHub();
  const world = createWorld(gh, clock);
  const modules = createFakeModules(world);
  const base = loadConfig();
  const config = { ...base, mode, landing: { mode: landing }, infraRetries };
  const git = createFakeGit({ gh, world });
  const store = createStateStore({ gh, now: clock.now });
  const logs = [];
  const baseSha = fakeSha("base-0");
  gh.branches.set(BASE, baseSha);
  const deps = {
    config,
    gh,
    store,
    gitFor: () => git,
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
    /**
     * Report CI on `sha`: red (a "Gate / CI" failure) when the composition contains a culprit, a
     * full interaction pair (counting the PRs it was stacked on) or sits on a broken base SHA;
     * `infra` reports a startup_failure; `kind` "base-check" tests the bare base SHA. `at` pins
     * the run time; `headBranch` tags the runs with the ref that triggered them.
     */
    runCi(sha, { infra = false, kind = "batch", at: pinned = null, headBranch } = {}) {
      clock.advance(1);
      const at = pinned ?? clock.now();
      let red;
      if (kind === "base-check") red = world.brokenBases.has(sha);
      else {
        const composition = world.compositions.get(sha);
        const prs = h.prsIn(sha);
        red =
          composition.prs.some((n) => world.culprits.has(n)) ||
          world.interactions.some((pair) => pair.every((n) => prs.has(n))) ||
          world.brokenBases.has(composition.baseSha);
      }
      const runs = config.requiredChecks.map((name) => {
        const id = world.runSeq++;
        const failing = name === "Gate / CI" && (red || infra);
        if (failing && !infra) {
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
          ...(headBranch ? { headBranch } : {}),
        };
      });
      gh.checkRuns.set(sha, [...(gh.checkRuns.get(sha) ?? []), ...runs]);
      clock.advance(1);
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
