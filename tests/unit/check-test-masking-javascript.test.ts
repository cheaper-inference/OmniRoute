import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(
  new URL("../../scripts/check/check-test-masking.mjs", import.meta.url)
);

function fixture(t: TestContext) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "test-masking-javascript-"));
  const env: Record<string, string | undefined> = {
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
  const git = (args: string[]) => execFileSync("git", args, { cwd, env, encoding: "utf8" }).trim();
  git(["init", "--quiet"]);
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const commit = (files: Record<string, string>, parents: string[] = []) => {
    git(["read-tree", "--empty"]);
    for (const [name, content] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(cwd, name)), { recursive: true });
      fs.writeFileSync(path.join(cwd, name), content);
    }
    git(["add", "--", ...Object.keys(files)]);
    return git([
      "commit-tree",
      git(["write-tree"]),
      ...parents.flatMap((parent) => ["-p", parent]),
      "-m",
      "Fixture",
    ]);
  };
  const run = (head: string, base: string | null) => {
    git(["update-ref", "HEAD", head]);
    return spawnSync(process.execPath, [checker], {
      cwd,
      env: base === null ? env : { ...env, GITHUB_BASE_SHA: base },
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 5000,
      maxBuffer: 512 * 1024,
    });
  };
  return { commit, run };
}

type GateResult = ReturnType<ReturnType<typeof fixture>["run"]>;

function expectGate(result: GateResult, status: number, affectedPath?: string) {
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.equal(result.status, status);
  const output = result.stdout + result.stderr;
  assert.ok(output.includes("[test-masking]"));
  if (affectedPath) assert.ok(output.includes(affectedPath));
}

function source(assertions: number, skip = false) {
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
    "});",
    "",
  ].join("\n");
}

for (const extension of ["js", "mjs"]) {
  const filename = `tests/unit/sample.test.${extension}`;

  test(`${extension}: the real gate blocks assertion removal and newly skipped tests`, (t) => {
    const repo = fixture(t);
    const base = repo.commit({ [filename]: source(3) });
    const reduced = repo.commit({ [filename]: source(2) }, [base]);
    expectGate(repo.run(reduced, base), 1, filename);
    const skipped = repo.commit({ [filename]: source(3, true) }, [base]);
    expectGate(repo.run(skipped, base), 1, filename);
    const strengthened = repo.commit({ [filename]: source(4) }, [base]);
    expectGate(repo.run(strengthened, base), 0);
  });

  test(`${extension}: deleted tests and assertion loss during relocation remain blocked`, (t) => {
    const repo = fixture(t);
    const base = repo.commit({ [filename]: source(3) });
    const removed = repo.commit({ "notes.md": "Candidate note.\n" }, [base]);
    expectGate(repo.run(removed, base), 1, filename);
    const destination = `tests/integration/relocated.spec.${extension}`;
    const reduced = repo.commit({ [destination]: source(2) }, [base]);
    expectGate(repo.run(reduced, base), 1, destination);
    const preserved = repo.commit({ [destination]: source(3) }, [base]);
    expectGate(repo.run(preserved, base), 0);
  });

  test(`${extension}: the absolute scan rejects bare tautologies but preserves its own fixture family`, (t) => {
    const repo = fixture(t);
    const tautology = 'import assert from "node:assert/strict";\nassert.equal(1, 1);\n';
    const bad = repo.commit({ [filename]: tautology });
    expectGate(repo.run(bad, null), 1, filename);
    const selfFixture = `tests/unit/check-test-masking-example.test.${extension}`;
    const legitimate = repo.commit({ [selfFixture]: tautology });
    expectGate(repo.run(legitimate, null), 0);
  });

  test(`${extension}: a justified reduction allowlist never waives skip or tautology detection`, (t) => {
    const repo = fixture(t);
    const allowlist = "config/quality/test-masking-allowlist.json";
    const reason = JSON.stringify({ [filename]: "Fixture: reviewed consolidation" });
    const base = repo.commit({ [filename]: source(3), [allowlist]: reason });
    const reduced = repo.commit({ [filename]: source(2), [allowlist]: reason }, [base]);
    expectGate(repo.run(reduced, base), 0);
    const skipped = repo.commit({ [filename]: source(2, true), [allowlist]: reason }, [base]);
    expectGate(repo.run(skipped, base), 1, filename);
    const tautology = repo.commit(
      { [filename]: source(2) + "assert.ok(true);\n", [allowlist]: reason },
      [base]
    );
    expectGate(repo.run(tautology, base), 1, filename);
  });

  test(`${extension}: a replacement allowlist requires a real replacement test`, (t) => {
    const repo = fixture(t);
    const allowlist = "config/quality/test-masking-allowlist.json";
    const replacement = `tests/unit/replacement.spec.${extension}`;
    const reason = JSON.stringify({
      _deletedWithReplacement: {
        [filename]: { replacement, reason: "Fixture: reviewed replacement" },
      },
    });
    const base = repo.commit({ [filename]: source(2) });
    // Different content prevents this deliberate replacement from being a Git rename.
    const replaced = repo.commit(
      {
        [replacement]: 'import assert from "node:assert/strict";\nassert.equal(6 * 7, 42);\n',
        [allowlist]: reason,
      },
      [base]
    );
    expectGate(repo.run(replaced, base), 0);
    const missingRepo = fixture(t);
    const missingBase = missingRepo.commit({ [filename]: source(2) });
    const missing = missingRepo.commit({ [allowlist]: reason }, [missingBase]);
    expectGate(missingRepo.run(missing, missingBase), 1, filename);
  });
}
