import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(
  new URL("../../scripts/check/check-test-masking.mjs", import.meta.url)
);
const testPath = "tests/unit/sample.test.ts";

function fixture(t) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "test-masking-merge-base-"));
  const env = {
    ...process.env,
    HOME: cwd,
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_ALLOW_PROTOCOL: "",
    GIT_NO_LAZY_FETCH: "1",
    GIT_AUTHOR_NAME: "Fixture",
    GIT_AUTHOR_EMAIL: "fixture@example.invalid",
    GIT_COMMITTER_NAME: "Fixture",
    GIT_COMMITTER_EMAIL: "fixture@example.invalid",
    GIT_AUTHOR_DATE: "2026-01-01T00:00:00Z",
    GIT_COMMITTER_DATE: "2026-01-01T00:00:00Z",
  };
  delete env.GITHUB_BASE_SHA;
  delete env.GITHUB_BASE_REF;
  const git = (args) => execFileSync("git", args, { cwd, env, encoding: "utf8" }).trim();
  git(["init", "--quiet"]);
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const commit = (files, parents = []) => {
    git(["read-tree", "--empty"]);
    for (const [name, content] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(cwd, name)), { recursive: true });
      fs.writeFileSync(path.join(cwd, name), content);
    }
    git(["add", "--", ...Object.keys(files)]);
    const tree = git(["write-tree"]);
    return git([
      "commit-tree",
      tree,
      ...parents.flatMap((parent) => ["-p", parent]),
      "-m",
      "Fixture",
    ]);
  };
  const run = (head, base, useRef = false) => {
    git(["update-ref", "HEAD", head]);
    const runEnv = { ...env };
    if (useRef) {
      git(["update-ref", "refs/remotes/origin/main", base]);
      runEnv.GITHUB_BASE_REF = "main";
    } else if (base !== null) runEnv.GITHUB_BASE_SHA = base;
    try {
      execFileSync(process.execPath, [checker], {
        cwd,
        env: runEnv,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 5000,
      });
      return 0;
    } catch (error) {
      return Number.isInteger(error.status) ? error.status : -1;
    }
  };
  return { commit, run };
}

function source(assertions, { skip = false, tautology = false } = {}) {
  return [
    'import assert from "node:assert/strict";',
    'import test from "node:test";',
    "function double(value) { return value * 2; }",
    ...Array.from({ length: 24 }, (_, index) => `// Stable context line ${index}.`),
    `test${skip ? ".skip" : ""}("doubles input", () => {`,
    ...Array.from(
      { length: assertions },
      (_, index) => `  assert.equal(double(${index + 1}), ${(index + 1) * 2});`
    ),
    ...(tautology ? ["  assert.ok(true);"] : []),
    "});",
    "",
  ].join("\n");
}

function divergent(
  t,
  {
    base = 2,
    main = 4,
    candidate = 3,
    candidatePath = testPath,
    candidateOptions = {},
    mainOptions = {},
  } = {}
) {
  const repo = fixture(t);
  const fork = repo.commit({ [testPath]: source(base) });
  const mainTip = repo.commit({ [testPath]: source(main, mainOptions) }, [fork]);
  const head = repo.commit({ [candidatePath]: source(candidate, candidateOptions) }, [fork]);
  return { ...repo, fork, mainTip, head };
}

test("main-only assertions do not reject a legitimate divergent candidate", (t) => {
  const repo = divergent(t);
  assert.equal(repo.run(repo.head, repo.mainTip), 0);
});

test("a real assertion removal from the common ancestor remains blocked", (t) => {
  const repo = divergent(t, { base: 3, main: 5, candidate: 2 });
  assert.equal(repo.run(repo.head, repo.mainTip), 1);
});

test("main removing more assertions cannot hide the candidate removal", (t) => {
  const repo = divergent(t, { base: 4, main: 2, candidate: 3 });
  assert.equal(repo.run(repo.head, repo.mainTip), 1);
});

test("relocation compares the same ancestor used for rename detection", (t) => {
  const repo = divergent(t, { candidatePath: "tests/unit/relocated.test.ts" });
  assert.equal(repo.run(repo.head, repo.mainTip), 0);
});

test("relocation cannot hide a real assertion removal", (t) => {
  const repo = divergent(t, {
    base: 4,
    main: 2,
    candidate: 3,
    candidatePath: "tests/unit/relocated.test.ts",
  });
  assert.equal(repo.run(repo.head, repo.mainTip), 1);
});

test("main-only skips cannot hide a newly skipped candidate test", (t) => {
  const repo = divergent(t, {
    base: 2,
    main: 2,
    candidate: 3,
    mainOptions: { skip: true },
    candidateOptions: { skip: true },
  });
  assert.equal(repo.run(repo.head, repo.mainTip), 1);
});

test("main-only tautologies cannot hide a new candidate tautology", (t) => {
  const repo = divergent(t, {
    base: 2,
    main: 2,
    candidate: 3,
    mainOptions: { tautology: true },
    candidateOptions: { tautology: true },
  });
  assert.equal(repo.run(repo.head, repo.mainTip), 1);
});

test("deleting a test remains blocked after the base advances", (t) => {
  const repo = fixture(t);
  const fork = repo.commit({ [testPath]: source(2) });
  const mainTip = repo.commit({ [testPath]: source(4) }, [fork]);
  const head = repo.commit({ "notes.md": "Candidate documentation.\n" }, [fork]);
  assert.equal(repo.run(head, mainTip), 1);
});

test("a nonexistent explicit comparison base fails closed", (t) => {
  const repo = divergent(t);
  assert.equal(repo.run(repo.head, "1".repeat(40)), 1);
});

test("unrelated histories fail closed", (t) => {
  const repo = fixture(t);
  const mainTip = repo.commit({ [testPath]: source(4) });
  const head = repo.commit({ [testPath]: source(2) });
  assert.equal(repo.run(head, mainTip), 1);
});

test("multiple best merge bases fail closed instead of selecting one", (t) => {
  const repo = fixture(t);
  const fork = repo.commit({ [testPath]: source(2) });
  const left = repo.commit({ [testPath]: source(3) }, [fork]);
  const right = repo.commit({ [testPath]: source(4) }, [fork]);
  const mainTip = repo.commit({ [testPath]: source(5) }, [left, right]);
  const head = repo.commit({ [testPath]: source(6) }, [right, left]);
  assert.equal(repo.run(head, mainTip), 1);
});

test("a base ref resolves to the same effective ancestor as its SHA", (t) => {
  const repo = divergent(t);
  assert.equal(repo.run(repo.head, repo.mainTip, true), 0);
});

test("an ancestor base retains the existing positive path", (t) => {
  const repo = divergent(t);
  assert.equal(repo.run(repo.head, repo.fork), 0);
});

test("without a comparison context the absolute scan still runs", (t) => {
  const repo = divergent(t);
  assert.equal(repo.run(repo.head, null), 0);
});

test("an untouched candidate test does not inherit main-only assertions", (t) => {
  const repo = fixture(t);
  const fork = repo.commit({ [testPath]: source(2) });
  const mainTip = repo.commit({ [testPath]: source(4) }, [fork]);
  const head = repo.commit({ [testPath]: source(2), "notes.md": "Candidate note.\n" }, [fork]);
  assert.equal(repo.run(head, mainTip), 0);
});
