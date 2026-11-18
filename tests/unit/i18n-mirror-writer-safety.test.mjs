import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  assertUnpublished,
  baseBranch,
  branch,
  checking,
  failedMirror,
  fixture,
  ownedPr,
  publication,
  report,
  steps,
} from "../_helpers/mirrorRefreshWorkflowFixture.mjs";

test("freeze lookup failure cannot authorize the refresh", (t) => {
  const f = fixture(t);
  f.configure({ freezeExit: 42 });
  const result = f.run("target");
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.outputs, /skip=false/);
});

test("the applicable freeze beyond the default issue-list limit is not omitted", (t) => {
  const f = fixture(t);
  const unrelated = Array.from({ length: 100 }, (_, number) => ({
    number: number + 1,
    title: "release-freeze: v3.8.54 in progress",
  }));
  f.configure({
    freezes: [...unrelated, { number: 101, title: "release-freeze: v3.8.55 in progress" }],
  });
  const result = f.run("target");
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.outputs, /skip=true/);
});

test("a failed later freeze page cannot be accepted as a complete empty index", (t) => {
  const f = fixture(t);
  f.configure({ laterFreezePageExit: 42 });
  const result = f.run("target");
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.outputs, /skip=false/);
});

test("applicable and global freezes still skip; another release does not", (t) => {
  const f = fixture(t);
  for (const [title, frozen] of [
    ["release-freeze: v3.8.55 in progress", true],
    ["global release-freeze", true],
    ["release-freeze: v3.8.54 in progress", false],
  ]) {
    f.configure({ freezes: [{ number: 1, title }] });
    const result = f.run("target");
    assert.equal(result.status, 0, result.stderr);
    const decisions = result.outputs.split("\n").filter((line) => line.startsWith("skip="));
    assert.equal(decisions.at(-1), `skip=${frozen}`);
  }
});

test("the selected target SHA is emitted and used by checkout", (t) => {
  const f = fixture(t);
  const result = f.run("target");
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.outputs, new RegExp(`base_sha=${f.base}`));
  const checkout = steps.find((step) => step.uses?.startsWith("actions/checkout@"));
  assert.equal(checkout.with.ref, "${{ steps.target.outputs.base_sha }}");
});

test("missing report coverage cannot be reported as no mirror work", (t) => {
  const f = fixture(t);
  f.configure({ report: { ok: false, reason: "missing-state" } });
  const result = f.run("drift");
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.outputs, /refresh=false/);
});

test("checkout identity is checked before selecting the work order", (t) => {
  const f = fixture(t);
  const result = f.run("drift", { BASE_SHA: "a".repeat(40) });
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.outputs, /refresh=false/);
});

test("the current pr-mode docs check and llm-only refresh remain available", (t) => {
  const f = fixture(t);
  const checked = f.run(checking);
  assert.equal(checked.status, 0, checked.stderr);
  const npm = checked.calls.find((call) => call.tool === "npm");
  assert.equal(npm.gateMode, "pr");
  f.write("docs/i18n/de/llm.txt", "# de\n\n---\n\nOld instructions.\n");
  const drift = f.run("drift");
  assert.equal(drift.status, 0, drift.stderr);
  assert.match(drift.outputs, /llm=true/);
  assert.match(drift.outputs, /refresh=true/);
  assert.equal(
    steps.find((step) => step.name === checking).if,
    "steps.drift.outputs.refresh == 'true'"
  );
});

for (const scenario of ["new freeze", "freeze API unavailable", "base moved", "checkout moved"]) {
  test(`${scenario} blocks publication before the branch or PR changes`, (t) => {
    const f = fixture(t);
    if (scenario === "new freeze")
      f.configure({ freezes: [{ number: 1, title: "release-freeze: v3.8.55 in progress" }] });
    if (scenario === "freeze API unavailable") f.configure({ freezeExit: 42 });
    if (scenario === "base moved") {
      const moved = f.competingCommit();
      f.git("--git-dir", f.remote, "update-ref", `refs/heads/${baseBranch}`, moved);
    }
    if (scenario === "checkout moved") {
      f.git("add", "docs/i18n/de/README.md", ".i18n-state.json");
      f.git("commit", "--quiet", "-m", "test: checkout moved");
      f.write("docs/i18n/de/README.md", "another candidate change\n");
    }
    assertUnpublished(f.run(publication));
  });
}

for (const owner of ["unknown", "other body", "fork", "mismatched head", "hand-edited owned PR"]) {
  test(`${owner} ownership cannot authorize replacing the fixed branch`, (t) => {
    const f = fixture(t);
    f.git("push", "--quiet", "origin", `${f.base}:refs/heads/${branch}`);
    const pr = ownedPr(f.base);
    if (owner === "other body") pr.body = "A contributor's unrelated work";
    if (owner === "fork") {
      pr.headRepository.nameWithOwner = "contributor/fork";
      pr.isCrossRepository = true;
    }
    if (owner === "mismatched head") pr.headRefOid = "a".repeat(40);
    if (owner === "hand-edited owned PR") pr.body = ownedPr("a".repeat(40)).body;
    f.configure({ prs: owner === "unknown" ? [] : [pr] });
    assertUnpublished(f.run(publication, { REFRESH_SHA: f.base }));
    assert.equal(f.remoteHead(), f.base);
  });
}

for (const existing of [false, true]) {
  test(`${existing ? "stale" : "empty"} head lease preserves a competing remote writer`, (t) => {
    const f = fixture(t);
    if (existing) {
      f.git("push", "--quiet", "origin", `${f.base}:refs/heads/${branch}`);
      f.configure({ prs: [ownedPr(f.base)] });
    }
    const competitor = f.competingCommit();
    f.configure({ raceSha: competitor });
    const result = f.run(publication, { REFRESH_SHA: existing ? f.base : "" });
    assert.ok(
      result.calls.some((call) => call.raceApplied === competitor),
      "race injected immediately before the real push"
    );
    assert.notEqual(result.status, 0);
    assert.equal(f.remoteHead(), competitor);
    assert.equal(
      result.calls.filter(
        (call) => call.tool === "gh" && ["create", "edit", "comment"].includes(call.args[1])
      ).length,
      0
    );
  });
}

test("a complete new candidate is proposed as a draft bound to its final commit", (t) => {
  const f = fixture(t);
  const result = f.run(publication);
  assert.equal(result.status, 0, result.stderr);
  const candidate = f.git("rev-parse", "HEAD");
  assert.equal(f.remoteHead(), candidate);
  const create = result.calls.find((call) => call.tool === "gh" && call.args[1] === "create");
  assert.ok(create.args.includes("--draft"));
  assert.match(result.body, new RegExp(f.base));
  assert.match(result.body, new RegExp(candidate));
});

test("an owned draft still accepts a legitimate refresh", (t) => {
  const f = fixture(t);
  f.git("push", "--quiet", "origin", `${f.base}:refs/heads/${branch}`);
  f.configure({ prs: [ownedPr(f.base)] });
  const result = f.run(publication, { REFRESH_SHA: f.base });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.remoteHead(), f.git("rev-parse", "HEAD"));
});

test("an owned ready PR becomes a draft before its reviewed head changes", (t) => {
  const f = fixture(t);
  f.git("push", "--quiet", "origin", `${f.base}:refs/heads/${branch}`);
  f.configure({ prs: [ownedPr(f.base, { isDraft: false })] });
  const result = f.run(publication, { REFRESH_SHA: f.base });
  assert.equal(result.status, 0, result.stderr);
  const draft = result.calls.findIndex(
    (call) => call.tool === "gh" && call.args[1] === "ready" && call.args.includes("--undo")
  );
  const push = result.calls.findIndex((call) => call.tool === "git" && call.args.includes("push"));
  assert.ok(draft >= 0 && draft < push, "review state is reset before replacing the candidate");
});

for (const phase of ["before hooks", "after hooks"]) {
  test(`a changed failed mirror ${phase} cannot use the partial exception`, (t) => {
    const f = fixture(t, { partial: true });
    const mutation = `import { writeFileSync } from "node:fs";\nimport { execFileSync } from "node:child_process";\nwriteFileSync(${JSON.stringify(failedMirror)}, "changed failed unit\\n");\nexecFileSync("git", ["add", "--", ${JSON.stringify(failedMirror)}]);\n`;
    if (phase === "before hooks") {
      f.write(failedMirror, "changed failed unit\n");
      const result = f.run(checking);
      assert.notEqual(result.status, 0, result.stdout + result.stderr);
    } else {
      f.hook(mutation);
      const result = f.run(publication);
      assertUnpublished(result);
      assert.equal(readFileSync(join(f.work, failedMirror), "utf8"), "changed failed unit\n");
    }
  });
}

test("a failed locale record changed by a normal commit hook blocks publication", (t) => {
  const f = fixture(t, { partial: true });
  f.hook(
    'import fs from "node:fs";\nimport { execFileSync } from "node:child_process";\nconst state = JSON.parse(fs.readFileSync(".i18n-state.json"));\nstate.sources["README.md"].locales.fr.updated_at = "changed by hook";\nfs.writeFileSync(".i18n-state.json", JSON.stringify(state));\nexecFileSync("git", ["add", "--", ".i18n-state.json"]);\n'
  );
  assertUnpublished(f.run(publication));
});

test("a changed failed locale record is rejected before hooks as well", (t) => {
  const f = fixture(t, { partial: true });
  const changed = structuredClone(f.after);
  changed.sources["README.md"].locales.fr.updated_at = "changed before checks";
  f.write(".i18n-state.json", JSON.stringify(changed));
  const result = f.run(checking);
  assert.notEqual(result.status, 0, result.stdout + result.stderr);
});

test("a post-hook drift failure blocks the exact committed candidate", (t) => {
  const f = fixture(t);
  f.hook(
    'import fs from "node:fs";\nimport { execFileSync } from "node:child_process";\nfs.writeFileSync("docs/i18n/de/README.md", "hook rewrote the checked mirror\\n");\nexecFileSync("git", ["add", "--", "docs/i18n/de/README.md"]);\n'
  );
  f.configure({
    committedReport: report({ ok: false, driftedTargets: [{ rel: "README.md", locale: "de" }] }),
  });
  assertUnpublished(f.run(publication));
});

test("an unchanged partial failure remains publishable for review", (t) => {
  const f = fixture(t, { partial: true });
  f.configure({ report: report({ staleTargets: [{ rel: "README.md", locale: "fr" }] }) });
  const check = f.run(checking);
  assert.equal(check.status, 0, check.stderr);
  const result = f.run(publication);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.remoteHead(), f.git("rev-parse", "HEAD"));
  const state = JSON.parse(readFileSync(join(f.work, ".i18n-state.json"), "utf8"));
  assert.deepEqual(state.sources["README.md"].locales.fr, f.before.sources["README.md"].locales.fr);
});

test("a failed-unit preimage above the default Git buffer remains readable", (t) => {
  // The real state is already larger than 1 MiB; buffer overflow must not become
  // a missing/empty preimage or make a legitimate partial refresh impossible.
  const f = fixture(t, { partial: true, statePaddingBytes: 2 * 1024 * 1024 });
  const checked = f.run(checking);
  assert.equal(checked.status, 0, checked.stderr);
  const result = f.run(publication);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(f.remoteHead(), f.git("rev-parse", "HEAD"));
});

test("a hook cannot rewrite the list of failed units after the preimage check", (t) => {
  const f = fixture(t, { partial: true });
  f.hook(
    'import fs from "node:fs";\nimport path from "node:path";\nconst filename = path.join(process.env.RUNNER_TEMP, "translate-failures.json");\nconst summary = JSON.parse(fs.readFileSync(filename));\nsummary.failures[0].locale = "ja";\nfs.writeFileSync(filename, JSON.stringify(summary));\n'
  );
  const result = f.run(publication);
  assertUnpublished(result);
  assert.match(result.stderr, /translation summary changed after checks/);
});

for (const phase of ["staged before commit", "added by commit hook"]) {
  test(`an out-of-scope path ${phase} cannot enter the refresh candidate`, (t) => {
    const f = fixture(t);
    if (phase === "staged before commit") {
      f.write("unrelated.txt", "unrelated work\n");
      f.git("add", "unrelated.txt");
    } else {
      f.hook(
        'import fs from "node:fs";\nimport { execFileSync } from "node:child_process";\nfs.writeFileSync("unrelated.txt", "hook changed scope\\n");\nexecFileSync("git", ["add", "--", "unrelated.txt"]);\n'
      );
    }
    assertUnpublished(f.run(publication));
  });
}

test("a protected instruction mirror is identified in the review body", (t) => {
  const f = fixture(t);
  f.write("docs/i18n/de/llm.txt", "# de\n\n---\n\nUpdated instructions.\n");
  const result = f.run(publication, { LLM: "true" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.body, /protected_surface: true/);
  assert.match(result.body, /owner approval|operator approval/i);
});
