// End-to-end world for omni-queue: the REAL modules (tick, eligibility, checks, classify, compose,
// land, bisect, state, dashboard, github, approve) against
//   - a fake GitHub over local HTTP (../../helpers/fake-github.mjs), and
//   - a bare git repository playing the GitHub remote (./git-sandbox.mjs).
//
// The two agree on every ref: the fake serves the branches of the bare repository through its
// `externalRefs` backend (GET /git/ref, matching-refs, DELETE), so the base tip the tick reads
// over the API is the tip it fetches and pushes with git, and a candidate branch the tick deletes
// over the API disappears from the bare repository. PR heads are published by the sandbox as
// refs/pull/<n>/head and mirrored into the fake pull (head.sha). Only the state branch
// (omni-queue-state) lives in the fake's own object store, written through the Contents API.
// The queue refs are protected by default (fake.branchRules: the queue-refs ruleset's rules on
// omni-queue-state and every omni-queue/… name); world.unprotect(ref, rule) drops one.
//
// Ticks are built the way main() builds them (createTickDeps from the environment), with the clock
// injected and git isolated from the user's configuration.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { handleLabelEvent } from "../../../../../scripts/merge-queue/approve.mjs";
import { loadConfig } from "../../../../../scripts/merge-queue/config.mjs";
import {
  CANDIDATE_PREFIX,
  STATE_BRANCH,
  candidateRef,
  commentMarker,
  initialState,
  stateFilePath,
} from "../../../../../scripts/merge-queue/contracts.mjs";
import { createGitHubClient } from "../../../../../scripts/merge-queue/github.mjs";
import { createTickDeps, runTick } from "../../../../../scripts/merge-queue/tick.mjs";
import { startFakeGitHub } from "../../helpers/fake-github.mjs";
import { createSandbox, inheritedGitEnvCleared } from "./git-sandbox.mjs";

export const QBASE = "release/v1.0.0";
export const APPROVER = "diegosouzapw";
export const BOT_LOGIN = "omni-queue[bot]";
const TOKEN = "ghs_e2eInstallationToken";
/** The repository owner's token (OMNI_QUEUE_LAND_TOKEN): only the landing uses it. */
export const LAND_TOKEN = "ghp_e2eOwnerLandToken";
const ZERO = "0".repeat(40);

const EMPTY_OUTPUT = Object.freeze({ title: null, summary: null, text: null });
/** Output of a failing required check in the shape scenarios 1–10 were written against. */
const REPORTER_OUTPUT = Object.freeze({
  title: "1 failing test",
  summary: "tests/unit/widget.test.ts",
  text: null,
});
/**
 * The only annotation GitHub Actions writes on a job whose step exits non-zero. It names no test
 * (node:test / vitest emit no failure annotation in this repository), so the classifier can match
 * such a failure by check name only.
 */
const EXIT_CODE_ANNOTATION = Object.freeze({
  path: ".github",
  start_line: 1,
  end_line: 1,
  annotation_level: "failure",
  title: null,
  message: "Process completed with exit code 1.",
});
/** What GitHub writes on a job it cancels at its `timeout-minutes` (conclusion `cancelled`). */
const MAX_EXECUTION_TIME_ANNOTATION = Object.freeze({
  path: ".github",
  start_line: 1,
  end_line: 1,
  annotation_level: "failure",
  title: null,
  message:
    "The job running on runner GitHub Actions 7 has exceeded the maximum execution time of 30 minutes.",
});

/** fake-github `externalRefs` backend over the bare repository (keys "heads/<branch>"). */
export function gitRefsBackend(sb) {
  const refOf = (key) => (String(key).startsWith("heads/") ? `refs/${key}` : null);
  const get = (key) => {
    const ref = refOf(key);
    if (!ref) return null;
    const res = sb.origin(["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], {
      allowFail: true,
    });
    return res.code === 0 ? res.stdout : null;
  };
  return {
    get,
    list(prefix) {
      const out = sb.origin([
        "for-each-ref",
        "--format=%(refname) %(objectname)",
        "refs/heads",
      ]).stdout;
      return out
        .split("\n")
        .filter(Boolean)
        .map((line) => line.split(" "))
        .map(([ref, sha]) => [ref.replace(/^refs\//, ""), sha])
        .filter(([key]) => key.startsWith(prefix));
    },
    delete(key) {
      if (!get(key)) return false;
      sb.origin(["update-ref", "-d", refOf(key)]);
      return true;
    },
  };
}

/**
 * @param {import("node:test").TestContext} t
 * @param {{mode?: "live"|"shadow", start?: string, config?: object, landToken?: string|null}}
 *   [options]  landToken: OMNI_QUEUE_LAND_TOKEN of the ticks (null = not set); the fake GitHub
 *   accepts it as the owner (APPROVER). `config.flakyReruns` is 0 unless a scenario sets it (the
 *   shipped config says 1): the scenarios written before the re-run test what follows it.
 */
export async function createQueueWorld(t, options = {}) {
  const {
    mode = "live",
    start = "2026-11-13T12:00:00.000Z",
    config: overrides = {},
    landToken = LAND_TOKEN,
  } = options;
  let clockMs = Date.parse(start);
  const clock = {
    now: () => new Date(clockMs).toISOString(),
    advance(minutes) {
      clockMs += minutes * 60_000;
    },
  };

  const sb = createSandbox({ base: QBASE });
  t.after(() => sb.cleanup());
  const pushLog = join(sb.root, "pushes.log");
  writeFileSync(pushLog, "");
  // Every ref update received by origin (old new ref), to count the candidate pushes.
  sb.installOriginHook("post-receive", `#!/bin/sh\ncat >> "${pushLog}"\n`);

  const fake = await startFakeGitHub({
    owner: "acme",
    repo: "widget",
    token: TOKEN,
    actor: BOT_LOGIN,
    now: clock.now,
  });
  t.after(() => fake.close());
  fake.externalRefs = gitRefsBackend(sb);
  fake.tokenActors.set(LAND_TOKEN, APPROVER);

  const config = { ...loadConfig(), mode, flakyReruns: 0, ...overrides };
  const configPath = join(sb.root, "omni-queue.config.json");
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

  const env = {
    OMNI_QUEUE_TOKEN: TOKEN,
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_API_URL: fake.url,
    OMNI_QUEUE_CONFIG: configPath,
    OMNI_QUEUE_REMOTE_URL: sb.originDir,
    GITHUB_RUN_ID: "4242",
    ...(landToken ? { OMNI_QUEUE_LAND_TOKEN: landToken } : {}),
  };
  const gitEnv = { ...inheritedGitEnvCleared({ keepAuth: true }), ...sb.isolationEnv };
  // approve.main builds the same client: App token, markers of the App only.
  const botGh = createGitHubClient({
    token: TOKEN,
    repository: fake.repository,
    apiUrl: fake.url,
    botLogin: BOT_LOGIN,
  });
  // A maintainer acting in the UI (label clicks), with their own identity.
  const humanGh = createGitHubClient({
    token: TOKEN,
    repository: fake.repository,
    apiUrl: fake.url,
  });

  const logs = [];
  let tickCount = 0;
  let runnerSeq = 0;

  const world = {
    t,
    sb,
    fake,
    clock,
    config,
    env,
    logs,
    get ticks() {
      return tickCount;
    },

    /** Open PR #n on QBASE with `files` committed on `from` (default: the base tip). */
    openPr(n, files, { from, title, author } = {}) {
      const head = sb.publishPr(n, files, { from });
      fake.addPull({
        number: n,
        title: title ?? `PR ${n}`,
        user: { login: author ?? `dev${n}`, type: "User" },
        base: { ref: QBASE },
        head: { sha: head, ref: `feature-${n}` },
      });
      fake.files.set(
        n,
        Object.keys(files).map((filename) => ({ filename, status: "added" }))
      );
      return head;
    },

    /** The contributor pushes a new commit to PR #n (new head SHA). */
    pushToPr(n, files) {
      const pull = fake.pulls.get(n);
      const head = sb.publishPr(n, files, { from: pull.head.sha, message: `pr ${n} again` });
      pull.head.sha = head;
      const known = new Set((fake.files.get(n) ?? []).map((f) => f.filename));
      for (const filename of Object.keys(files)) {
        if (!known.has(filename)) fake.files.get(n).push({ filename, status: "added" });
      }
      return head;
    },

    headOf(n) {
      return fake.pulls.get(n).head.sha;
    },

    /**
     * `actor` applies `label` in the UI, then the approval job of omni-queue.yml runs
     * approve.handleLabelEvent with the App token on that event payload.
     */
    async label(n, { label = config.label, actor = APPROVER } = {}) {
      fake.actor = actor;
      try {
        await humanGh.addLabels(n, [label]);
      } finally {
        fake.actor = BOT_LOGIN;
      }
      return handleLabelEvent({
        gh: botGh,
        config,
        event: {
          action: "labeled",
          label: { name: label },
          sender: { login: actor },
          pull_request: structuredClone(fake.pulls.get(n)),
        },
        eventName: "pull_request_target",
      });
    },

    /**
     * `actor` removes `label` in the UI, then the approval job handles the `unlabeled` event
     * (approve.handleLabelEvent with the App token).
     */
    async unlabel(n, { label = config.label, actor = APPROVER } = {}) {
      fake.actor = actor;
      try {
        await humanGh.removeLabel(n, label);
      } finally {
        fake.actor = BOT_LOGIN;
      }
      return handleLabelEvent({
        gh: botGh,
        config,
        event: {
          action: "unlabeled",
          label: { name: label },
          sender: { login: actor },
          pull_request: structuredClone(fake.pulls.get(n)),
        },
        eventName: "pull_request_target",
      });
    },

    /** One tick, built like main() (fresh runner directory every time). */
    async tick({ action = "tick" } = {}) {
      tickCount += 1;
      const runnerTemp = sb.newDir(`runner-${++runnerSeq}`);
      const deps = createTickDeps(
        { ...env, RUNNER_TEMP: runnerTemp },
        { now: clock.now, gitEnv, log: (line) => logs.push(line) }
      );
      const from = fake.requests.length;
      const result = await runTick(deps, { base: QBASE, action });
      return { result, requests: fake.requests.slice(from) };
    },

    /** Queue state as saved on the state branch (null before the first save). */
    state() {
      const text = fake.readFile(STATE_BRANCH, stateFilePath(QBASE));
      return text === null ? null : JSON.parse(text);
    },

    /**
     * Store a green base verdict for `sha` (default: the base tip) on the state branch, the state
     * after the queue landed that tip itself: a red batch on it is blamed on its PRs at once.
     */
    seedGreenBase(sha = world.baseTip()) {
      const state = world.state() ?? initialState(QBASE, clock.now());
      state.baseChecks = [
        {
          baseSha: sha,
          ref: candidateRef(QBASE, "b0", sha),
          status: "green",
          startedAt: clock.now(),
          signatures: [],
        },
        ...state.baseChecks.filter((b) => b.baseSha !== sha),
      ];
      fake.commitFiles({
        branch: STATE_BRANCH,
        files: { [stateFilePath(QBASE)]: `${JSON.stringify(state, null, 2)}\n` },
        message: "seed: base green",
      });
    },

    /** True when commit `a` is an ancestor of (or equal to) `b` in origin. */
    isAncestor(a, b) {
      return sb.origin(["merge-base", "--is-ancestor", a, b], { allowFail: true }).code === 0;
    },

    baseTip() {
      return sb.baseSha();
    },

    /** Branches of origin under the candidate prefix: [{ref, sha}]. */
    candidateRefs() {
      return fake.externalRefs
        .list(`heads/${CANDIDATE_PREFIX}`)
        .map(([key, sha]) => ({ ref: key.replace(/^heads\//, ""), sha }));
    },

    /** Candidate refs CREATED on origin by a push so far (from the post-receive log). */
    candidatePushes() {
      return readFileSync(pushLog, "utf8")
        .split("\n")
        .filter(Boolean)
        .map((line) => line.split(" "))
        .filter(
          ([, next, ref]) => ref?.startsWith(`refs/heads/${CANDIDATE_PREFIX}`) && next !== ZERO
        )
        .map(([, sha, ref]) => ({ sha, ref: ref.replace(/^refs\/heads\//, "") }));
    },

    /**
     * Report the three required checks of the in-flight candidate as GitHub Actions does on a
     * push of its ref: one push workflow run on the candidate ref and its check suite (whose
     * head_branch is that ref). `red` = a test fails; by default a candidate is red when it
     * contains the head of one of `world.culprits`. `hang` = a job hangs until GitHub cancels it
     * at its time limit; by default when the candidate contains the head of one of `world.hangs`.
     *
     * Green, or red with `world.failingJob` unset: the shape scenarios 1–10 use, "Gate / CI"
     * alone fails, with a reporter title. Otherwise the failing jobs are reported the way GitHub
     * Actions reports them in this repository: the test job `world.failingJob` concludes
     * `failure` with only the step's exit-code annotation, the hanging job `world.hangJob`
     * concludes `cancelled` with GitHub's "exceeded the maximum execution time" annotation, and
     * the aggregate "Gate / CI" fails with them (its own exit-code annotation, no title).
     * `runStatus` "in_progress" keeps the workflow run open (see reportChecks).
     */
    runCi(
      sha,
      ref,
      {
        red = world.containsCulprit(sha),
        hang = world.containsHang(sha),
        runStatus = "completed",
      } = {}
    ) {
      if (!hang && (!red || world.failingJob === null)) {
        world.reportChecks(sha, {
          headBranch: ref,
          conclusions: { "Gate / CI": red ? "failure" : "success" },
          runStatus,
        });
        return;
      }
      const extraRuns = [];
      if (red) {
        if (world.failingJob === null) {
          throw new Error("runCi: a red candidate that also hangs needs world.failingJob");
        }
        extraRuns.push({
          name: world.failingJob,
          conclusion: "failure",
          annotations: [EXIT_CODE_ANNOTATION],
        });
      }
      if (hang) {
        extraRuns.push({
          name: world.hangJob,
          conclusion: "cancelled",
          annotations: [MAX_EXECUTION_TIME_ANNOTATION],
        });
      }
      world.reportChecks(sha, {
        headBranch: ref,
        conclusions: { "Gate / CI": "failure" },
        failureOutput: EMPTY_OUTPUT,
        annotations: { "Gate / CI": [EXIT_CODE_ANNOTATION] },
        extraRuns,
        runStatus,
      });
    },

    /**
     * One workflow run on `sha` with the three required checks in a check suite of its own.
     * `event` "pull_request" = the CI of a PR whose head is that commit; `suiteBranch` is the
     * head_branch GitHub reports for the suite (null for a fork PR). `conclusion` applies to
     * every check unless `conclusions` names one. A failing required check carries
     * `failureOutput` (default: a reporter title); `annotations` maps a required check name to
     * the raw annotations GitHub serves for its run. `extraRuns` are more jobs of the same
     * workflow run (same check suite), after the required ones: [{name, conclusion,
     * annotations?, output?}]. The workflow run concludes `failure` when a job did not succeed,
     * else `success`; with `runStatus` "in_progress" it stays open with no conclusion while its
     * check runs are completed (a job failed first, the others still run), until
     * world.concludeRuns.
     */
    reportChecks(sha, options = {}) {
      const {
        headBranch,
        suiteBranch = headBranch,
        event = "push",
        conclusion = "success",
        conclusions = {},
        failureOutput = REPORTER_OUTPUT,
        annotations = {},
        extraRuns = [],
        runStatus = "completed",
      } = options;
      clock.advance(1);
      let suiteId;
      const jobs = [
        ...config.requiredChecks.map((name) => {
          const result = conclusions[name] ?? conclusion;
          return {
            name,
            conclusion: result,
            output: result === "failure" ? failureOutput : EMPTY_OUTPUT,
            annotations: annotations[name] ?? [],
          };
        }),
        ...extraRuns.map((job) => ({ output: EMPTY_OUTPUT, annotations: [], ...job })),
      ];
      for (const job of jobs) {
        const run = fake.addCheckRun(sha, {
          name: job.name,
          conclusion: job.conclusion,
          headBranch: suiteBranch,
          suiteId,
          output: { ...job.output },
        });
        if (job.annotations.length) {
          fake.annotations.set(
            run.id,
            job.annotations.map((a) => ({ ...a }))
          );
        }
        suiteId = run.check_suite.id;
      }
      const failed = jobs.some((job) => job.conclusion !== "success");
      const open = runStatus !== "completed";
      fake.addWorkflowRun({
        headSha: sha,
        headBranch,
        event,
        checkSuiteId: suiteId,
        status: runStatus,
        conclusion: open ? null : failed ? "failure" : "success",
      });
      clock.advance(1);
    },

    /**
     * Every push workflow run on `sha` still open at its first attempt concludes: `failure` when a
     * check run of its suite did not succeed, else `success`.
     */
    concludeRuns(sha) {
      clock.advance(1);
      for (const run of fake.workflowRuns) {
        if (run.head_sha !== sha || run.event !== "push" || run.status === "completed") continue;
        if (run.run_attempt !== 1) continue;
        const failed = (fake.checkRuns.get(sha) ?? []).some(
          (check) =>
            check.check_suite.id === run.check_suite_id &&
            !["success", "skipped", "neutral"].includes(check.conclusion)
        );
        Object.assign(run, { status: "completed", conclusion: failed ? "failure" : "success" });
      }
      clock.advance(1);
    },

    /** The queued re-run attempts of the push runs on `sha` start: status `in_progress`. */
    startRerun(sha) {
      for (const run of fake.workflowRuns) {
        if (run.head_sha === sha && run.event === "push" && run.status === "queued") {
          run.status = "in_progress";
        }
      }
    },

    /**
     * The re-run GitHub Actions runs after POST /actions/runs/:id/rerun-failed-jobs: for every
     * push workflow run on `sha` whose re-run attempt (run_attempt above 1, queued or in progress)
     * is not completed, each failed check run of its suite gets a new check run of the same name
     * in the same suite, started after the old one completed, that passes (`pass`) or fails the
     * same way; then the attempt concludes.
     */
    reportRerun(sha, { pass }) {
      clock.advance(1);
      const waiting = fake.workflowRuns.filter(
        (run) =>
          run.head_sha === sha &&
          run.event === "push" &&
          run.run_attempt > 1 &&
          run.status !== "completed"
      );
      for (const run of waiting) {
        const failed = (fake.checkRuns.get(sha) ?? []).filter(
          (check) =>
            check.check_suite.id === run.check_suite_id &&
            !["success", "skipped", "neutral"].includes(check.conclusion)
        );
        for (const old of failed) {
          const rerun = fake.addCheckRun(sha, {
            name: old.name,
            conclusion: pass ? "success" : old.conclusion,
            suiteId: run.check_suite_id,
            output: { ...old.output },
          });
          if (!pass && fake.annotations.has(old.id)) {
            fake.annotations.set(
              rerun.id,
              fake.annotations.get(old.id).map((a) => ({ ...a }))
            );
          }
        }
        Object.assign(run, { status: "completed", conclusion: pass ? "success" : "failure" });
      }
      clock.advance(1);
    },

    /** PR numbers whose head makes a candidate red (CI fails when the candidate contains it). */
    culprits: new Set(),

    /**
     * PR numbers whose head makes a job hang (GitHub cancels `world.hangJob` at its time limit
     * on every candidate that contains it).
     */
    hangs: new Set(),

    /**
     * Base SHAs that fail `world.failingJob` themselves: a base check of that exact SHA is red,
     * and so is every batch composed on it. A commit pushed on top (a repair) is not broken.
     */
    brokenBases: new Set(),

    /**
     * The job a test failure fails ("Unit Tests (2/8)", say). null keeps the shape of scenarios
     * 1–10: "Gate / CI" fails alone, with a reporter title (see runCi).
     */
    failingJob: null,

    /** The job a PR of `world.hangs` makes hang. */
    hangJob: "Unit Tests (3/8)",

    containsCulprit(sha) {
      return [...world.culprits].some((n) => world.isAncestor(world.headOf(n), sha));
    },

    containsHang(sha) {
      return [...world.hangs].some((n) => world.isAncestor(world.headOf(n), sha));
    },

    /**
     * CI on whatever is in flight (no-op when idle); returns the in-flight record. A base check
     * (f.kind "base-check") runs on the bare base: red only when that SHA is in
     * `world.brokenBases`. A batch is red when it contains a culprit or is composed on a broken
     * base, and hangs when it contains a PR of `world.hangs`.
     */
    ciInFlight() {
      const f = world.state()?.inFlight ?? null;
      if (!f) return f;
      if (f.kind === "base-check") {
        world.runCi(f.candidateSha, f.candidateRef, {
          red: world.brokenBases.has(f.candidateSha),
          hang: false,
        });
      } else {
        world.runCi(f.candidateSha, f.candidateRef, {
          red: world.containsCulprit(f.candidateSha) || world.brokenBases.has(f.baseSha),
        });
      }
      return f;
    },

    /** Comments on #n that carry the hidden marker of `key`. */
    commentsWithKey(n, key) {
      return (fake.comments.get(n) ?? []).filter((c) => c.body.includes(commentMarker(key)));
    },

    labelsOf(n) {
      return fake.pulls.get(n).labels.map((l) => l.name);
    },

    events(type) {
      return (world.state()?.history ?? []).filter((e) => e.type === type);
    },

    /** GitHub no longer enforces rule type `rule` (creation, update, deletion) on `ref`. */
    unprotect(ref, rule) {
      fake.unprotect(ref, rule);
    },
  };
  return world;
}

/** Requests that write (anything but GET) among `requests`. */
export const writesIn = (requests) => requests.filter((r) => r.method !== "GET");
