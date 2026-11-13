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
  commentMarker,
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
const ZERO = "0".repeat(40);

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
 * @param {{mode?: "live"|"shadow", start?: string, config?: object}} [options]
 */
export async function createQueueWorld(t, options = {}) {
  const { mode = "live", start = "2026-11-13T12:00:00.000Z", config: overrides = {} } = options;
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

  const config = { ...loadConfig(), mode, ...overrides };
  const configPath = join(sb.root, "omni-queue.config.json");
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

  const env = {
    OMNI_QUEUE_TOKEN: TOKEN,
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_API_URL: fake.url,
    OMNI_QUEUE_CONFIG: configPath,
    OMNI_QUEUE_REMOTE_URL: sb.originDir,
    GITHUB_RUN_ID: "4242",
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
     * push of its ref (one check suite whose head_branch is the candidate ref). `red` decides
     * whether "Gate / CI" fails; by default a candidate is red when it contains the head of one of
     * `world.culprits`.
     */
    runCi(sha, ref, { red = world.containsCulprit(sha) } = {}) {
      clock.advance(1);
      let suiteId;
      for (const name of config.requiredChecks) {
        const failing = red && name === "Gate / CI";
        const run = fake.addCheckRun(sha, {
          name,
          conclusion: failing ? "failure" : "success",
          headBranch: ref,
          suiteId,
          output: failing
            ? { title: "1 failing test", summary: "tests/unit/widget.test.ts", text: null }
            : { title: null, summary: null, text: null },
        });
        suiteId = run.check_suite.id;
      }
      clock.advance(1);
    },

    /** PR numbers whose head makes a candidate red (CI fails when the candidate contains it). */
    culprits: new Set(),

    containsCulprit(sha) {
      return [...world.culprits].some((n) => world.isAncestor(world.headOf(n), sha));
    },

    /** CI on whatever is in flight (no-op when idle); returns the in-flight record. */
    ciInFlight() {
      const f = world.state()?.inFlight ?? null;
      if (f) world.runCi(f.candidateSha, f.candidateRef);
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
  };
  return world;
}

/** Requests that write (anything but GET) among `requests`. */
export const writesIn = (requests) => requests.filter((r) => r.method !== "GET");
