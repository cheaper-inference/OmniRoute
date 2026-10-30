import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
// @ts-expect-error — plain .mjs operational helper.
import {
  assertUiCandidateUnchanged,
  resolveUiDiffBase,
} from "../../scripts/i18n/resolve-ui-diff-base.mjs";
// @ts-expect-error — plain .mjs operational helper.
import { readUiCatalogAtRef } from "../../scripts/i18n/read-ui-catalog.mjs";

function fixture(t) {
  const cwd = mkdtempSync(path.join(os.tmpdir(), "omniroute-i18n-context-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  git("init", "--quiet", "--initial-branch=main");
  git("config", "user.name", "Test Fixture");
  git("config", "user.email", "fixture@example.invalid");
  git("config", "commit.gpgsign", "false");
  const commit = (text) => {
    writeFileSync(path.join(cwd, "value.txt"), text);
    git("add", ".");
    git("commit", "--quiet", "-m", "fixture " + text);
    return git("rev-parse", "HEAD");
  };
  const base = commit("base");
  git("switch", "--quiet", "-c", "fix/candidate");
  const middle = commit("first change");
  const head = commit("second change");
  git("switch", "--quiet", "main");
  const advanced = commit("advanced base");
  git("switch", "--quiet", "fix/candidate");
  const eventPath = path.join(cwd, "event.json");
  const resolve = (name, event = {}, extra = {}, pulls = []) => {
    writeFileSync(eventPath, JSON.stringify(event));
    return resolveUiDiffBase({
      cwd,
      env: {
        GITHUB_EVENT_NAME: name,
        GITHUB_EVENT_PATH: eventPath,
        GITHUB_SHA: head,
        GITHUB_REF: "refs/heads/fix/candidate",
        GITHUB_REPOSITORY: "owner/repo",
        ...extra,
      },
      lookupPullRequests: () => pulls,
    });
  };
  const pull = {
    number: 42,
    state: "open",
    head: { sha: head, ref: "fix/candidate", repo: { full_name: "owner/repo" } },
    base: { sha: advanced, ref: "main", repo: { full_name: "owner/repo" } },
  };
  return { cwd, base, middle, head, advanced, resolve, pull, git };
}

test("PR and base retarget use the current event base, across the full candidate range", (t) => {
  const f = fixture(t);
  const main = f.resolve("pull_request", { pull_request: f.pull });
  assert.equal(main.baseSha, f.base);
  assert.equal(main.baseTipSha, f.advanced);
  assert.equal(main.scope, "candidate");
  const release = f.resolve("pull_request", {
    action: "edited",
    changes: { base: {} },
    pull_request: { ...f.pull, base: { ...f.pull.base, sha: f.middle, ref: "release/v3.8.52" } },
  });
  assert.equal(release.baseSha, f.middle);
  assert.notEqual(main.baseSha, release.baseSha);
});

test("push compares event.before directly, even across a force-push", (t) => {
  const f = fixture(t);
  const result = f.resolve("push", { before: f.advanced, after: f.head });
  assert.equal(result.baseSha, f.advanced);
  assert.equal(result.scope, "push-range");
});

test("merge-group uses the immutable event base and verifies its candidate", (t) => {
  const f = fixture(t);
  const result = f.resolve("merge_group", { merge_group: { base_sha: f.base, head_sha: f.head } });
  assert.equal(result.baseSha, f.base);
  assert.throws(
    () =>
      f.resolve("merge_group", {
        merge_group: { base_sha: f.base, head_sha: f.middle },
      }),
    /mismatch/
  );
});

test("dispatch exact open PR compares all candidate commits, not merely the last one", (t) => {
  const f = fixture(t);
  const result = f.resolve("workflow_dispatch", {}, {}, [f.pull]);
  assert.equal(result.baseSha, f.base);
  assert.notEqual(result.baseSha, f.middle);
  assert.equal(result.baseTipSha, f.advanced);
  assert.equal(result.pullRequest, 42);
  assert.equal(result.source, "workflow_dispatch:pull_request");
});

test("dispatch accepts an explicit immutable base without an API lookup", (t) => {
  const f = fixture(t);
  const result = f.resolve("workflow_dispatch", { inputs: { i18n_base_sha: f.advanced } });
  assert.equal(result.baseSha, f.base);
  assert.equal(result.baseTipSha, f.advanced);
  assert.equal(result.source, "workflow_dispatch:explicit-base");
});

test("direct main and release dispatch label their scope as last-commit", (t) => {
  const f = fixture(t);
  for (const branch of ["main", "release/v3.8.52"]) {
    const result = f.resolve("workflow_dispatch", {}, { GITHUB_REF: "refs/heads/" + branch });
    assert.equal(result.baseSha, f.middle);
    assert.equal(result.scope, "last-commit");
    assert.equal(result.source, "workflow_dispatch:first-parent");
  }
});

test("dispatch cannot infer a target from closed, stale-head, wrong-repo or ambiguous PRs", (t) => {
  const f = fixture(t);
  const invalid = [
    [],
    [{ ...f.pull, state: "closed" }],
    [{ ...f.pull, head: { ...f.pull.head, sha: f.middle } }],
    [{ ...f.pull, head: { ...f.pull.head, ref: "other-branch" } }],
    [{ ...f.pull, base: { ...f.pull.base, repo: { full_name: "other/repo" } } }],
    [f.pull, { ...f.pull, number: 43 }],
  ];
  for (const pulls of invalid) {
    assert.throws(() => f.resolve("workflow_dispatch", {}, {}, pulls), /one exact open PR/);
  }
});

test("missing, mutable, self and zero comparison bases never become success", (t) => {
  const f = fixture(t);
  for (const sha of ["origin/main", f.head, "0".repeat(40), "d".repeat(40)]) {
    assert.throws(() => f.resolve("workflow_dispatch", { inputs: { i18n_base_sha: sha } }));
  }
  assert.throws(() => f.resolve("push", { after: f.head }), /Missing immutable/);
});

test("all hosted comparison modes verify checkout identity", (t) => {
  const f = fixture(t);
  for (const name of ["pull_request", "push", "workflow_dispatch", "schedule"]) {
    assert.throws(() => f.resolve(name, {}, { GITHUB_SHA: f.middle }), /does not match checkout/);
  }
  assert.throws(
    () =>
      f.resolve(
        "workflow_dispatch",
        {},
        {
          I18N_BASE_SHA: f.base,
          I18N_CANDIDATE_SHA: f.middle,
        }
      ),
    /does not match checkout/
  );
});

test("local explicit base resolves a merge-base and never requires a network lookup", (t) => {
  const f = fixture(t);
  const result = resolveUiDiffBase({ cwd: f.cwd, env: { BASE_REF: f.advanced } });
  assert.equal(result.baseSha, f.base);
  assert.equal(result.source, "local-merge-base");
});

test("any supplied pinned context requires a complete immutable pair without local or event fallback", (t) => {
  const f = fixture(t);
  const fields = [
    "I18N_BASE_SHA",
    "I18N_CANDIDATE_SHA",
    "I18N_BASE_TIP_SHA",
    "I18N_COMPARISON_SOURCE",
    "I18N_COMPARISON_SCOPE",
  ];
  const partial = [
    { I18N_CANDIDATE_SHA: f.middle },
    { I18N_CANDIDATE_SHA: f.head },
    { I18N_BASE_SHA: f.base },
    { I18N_BASE_TIP_SHA: f.base },
    { I18N_COMPARISON_SOURCE: "explicit-pinned-pair" },
    { I18N_COMPARISON_SCOPE: "candidate" },
    ...fields.map((field) => ({ [field]: "" })),
  ];
  for (const extra of partial) {
    assert.throws(
      () => resolveUiDiffBase({ cwd: f.cwd, env: { BASE_REF: f.base, ...extra } }),
      /immutable|does not match checkout/
    );
    assert.throws(
      () => f.resolve("push", { before: f.base, after: f.head }, extra),
      /immutable|does not match checkout/
    );
  }
  const complete = resolveUiDiffBase({
    cwd: f.cwd,
    env: { BASE_REF: f.middle, I18N_BASE_SHA: f.base, I18N_CANDIDATE_SHA: f.head },
  });
  assert.equal(complete.baseSha, f.base);
  assert.equal(complete.baseTipSha, f.base);
  assert.equal(complete.candidateSha, f.head);
  assert.equal(complete.source, "explicit-pinned-pair");
});

test("only an absent path in an existing tree is a legitimate missing locale", (t) => {
  const f = fixture(t);
  assert.equal(
    readUiCatalogAtRef(f.cwd, f.base, "src/i18n/messages/new.json", { optional: true }),
    null
  );
  assert.throws(() => readUiCatalogAtRef(f.cwd, f.base, "src/i18n/messages/en.json"), /absent/);
  assert.throws(
    () =>
      readUiCatalogAtRef(f.cwd, "d".repeat(40), "src/i18n/messages/new.json", { optional: true }),
    /Cannot read/
  );
});

test("unknown event types and non-branch dispatches cannot use a release guess", (t) => {
  const f = fixture(t);
  assert.throws(() => f.resolve("unknown", {}, { BASE_REF: f.base }), /Unsupported/);
  assert.throws(
    () => f.resolve("workflow_dispatch", {}, { GITHUB_REF: "refs/tags/v3.8.52" }),
    /branch or explicit/
  );
});

test("local invocation without an explicit base fails without inferring package version", (t) => {
  const f = fixture(t);
  assert.throws(() => resolveUiDiffBase({ cwd: f.cwd, env: {} }), /Missing local base/);
});

test("checkout movement during PR lookup invalidates the comparison before it is returned", (t) => {
  const f = fixture(t);
  const eventPath = path.join(f.cwd, "race-event.json");
  writeFileSync(eventPath, "{}");
  assert.throws(
    () =>
      resolveUiDiffBase({
        cwd: f.cwd,
        env: {
          GITHUB_EVENT_NAME: "workflow_dispatch",
          GITHUB_EVENT_PATH: eventPath,
          GITHUB_SHA: f.head,
          GITHUB_REF: "refs/heads/fix/candidate",
          GITHUB_REPOSITORY: "owner/repo",
        },
        lookupPullRequests: () => {
          f.git("switch", "--quiet", "main");
          return [f.pull];
        },
      }),
    /candidate changed during comparison/
  );
});

test("the final gate guard rejects checkout movement after comparison resolution", (t) => {
  const f = fixture(t);
  const result = resolveUiDiffBase({ cwd: f.cwd, env: { BASE_REF: f.base } });
  f.git("switch", "--quiet", "main");
  assert.throws(() => assertUiCandidateUnchanged(f.cwd, result.candidateSha), /candidate changed/);
});
