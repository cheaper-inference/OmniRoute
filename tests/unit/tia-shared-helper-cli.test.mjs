import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  changedFilesFromNameStatus,
  selectImpacted,
} from "../../scripts/quality/select-impacted-tests.mjs";

const sourceRoot = path.resolve(import.meta.dirname, "../..");
const helper = "tests/_helpers/shared.mjs";
const consumer = "tests/unit/consumer.test.mjs";

for (const file of [helper, "tests/_setup/isolateDataDir.ts"]) {
  test(`shared infrastructure cannot be narrowed by a partial map: ${file}`, () => {
    assert.deepEqual(
      selectImpacted({
        changed: [file],
        map: { sources: {}, artifacts: { [file]: [consumer] } },
      }),
      ["__RUN_ALL__"]
    );
  });
}

test("a helper lookalike remains an ordinary unmapped artifact", () => {
  assert.deepEqual(
    selectImpacted({
      changed: ["tests/_helpers-other/shared.mjs"],
      map: { sources: {} },
    }),
    []
  );
});

test("name/status retains deleted sources and both source rename paths, not removed tests", () => {
  assert.deepEqual(
    changedFilesFromNameStatus(
      [
        "D\tsrc/deleted.ts",
        "D\ttests/unit/deleted.test.ts",
        "R100\tsrc/old.ts\tsrc/new.ts",
        "R095\ttests/unit/old.test.mjs\ttests/unit/new.test.mjs",
      ].join("\n")
    ),
    ["src/deleted.ts", "src/old.ts", "src/new.ts", "tests/unit/new.test.mjs"]
  );
});

for (const line of [
  'D\t"tests/_helpers/quoted\\tname.mjs"',
  "U\ttests/_helpers/unmerged.mjs",
  "R100\tmissing-destination",
  "M\t../outside.ts",
  "M\tsrc/a.ts\tunexpected.ts",
]) {
  test(`ambiguous name/status requests the complete suite: ${JSON.stringify(line)}`, () => {
    assert.deepEqual(
      selectImpacted({ changed: changedFilesFromNameStatus(line), map: { sources: {} } }),
      ["__RUN_ALL__"]
    );
  });
}

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-tia-helper-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (file, bytes) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), bytes);
  };
  for (const file of [
    "scripts/quality/select-impacted-tests.mjs",
    "scripts/quality/test-scoped.sh",
    "scripts/quality/build-test-impact-map.mjs",
    "scripts/quality/lib/pathLiteralEdges.mjs",
  ])
    write(file, fs.readFileSync(path.join(sourceRoot, file)));
  // Dependency resolution only in a temporary fixture, never in a build worktree.
  fs.symlinkSync(path.join(sourceRoot, "node_modules"), path.join(root, "node_modules"), "dir");
  write(helper, "export const value = 1;\n");
  write("src/value.mjs", "export const value = 1;\n");
  write(consumer, 'import { value } from "../_helpers/shared.mjs";\n');
  write("README.md", "Fixture\n");
  write(
    "config/quality/test-impact-map.json",
    JSON.stringify({
      sources: { "src/value.mjs": [consumer] },
    })
  );
  const env = {
    ...process.env,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GITHUB_BASE_REF: "",
    GITHUB_BASE_SHA: "",
    PATH: `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ""}`,
  };
  const git = (...args) =>
    execFileSync("git", args, { cwd: root, env, encoding: "utf8", timeout: 10_000 });
  git("init", "-q");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.invalid");
  git("add", ".");
  git("commit", "-qm", "fixture base");
  const base = git("rev-parse", "HEAD").trim();
  const select = () => {
    const result = spawnSync(process.execPath, ["scripts/quality/select-impacted-tests.mjs"], {
      cwd: root,
      env: { ...env, GITHUB_BASE_SHA: base },
      encoding: "utf8",
      timeout: 15_000,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    assert.equal(result.status, 0, result.stdout + result.stderr);
    return result.stdout.trim().split("\n").filter(Boolean);
  };
  const commit = () => {
    git("add", "-A");
    git("commit", "-qm", "fixture change");
  };
  return { root, write, git, env, select, commit };
}

for (const change of ["modified", "deleted", "renamed-out", "renamed-in"]) {
  test(`real Git ${change} helper reaches the full-suite selection`, (t) => {
    const f = fixture(t);
    if (change === "modified") f.write(helper, "export const value = 2;\n");
    if (change === "deleted") fs.unlinkSync(path.join(f.root, helper));
    if (change === "renamed-out") {
      fs.mkdirSync(path.join(f.root, "scripts/ad-hoc"), { recursive: true });
      f.git("mv", helper, "scripts/ad-hoc/shared.mjs");
    }
    if (change === "renamed-in") f.git("mv", "src/value.mjs", "tests/_helpers/added.mjs");
    f.commit();
    assert.deepEqual(f.select(), ["__RUN_ALL__"]);
  });
}

test("staged helper deletion cannot become a successful empty local run", (t) => {
  const f = fixture(t);
  f.git("rm", "-q", helper);
  const result = spawnSync("bash", ["scripts/quality/test-scoped.sh", "--staged"], {
    cwd: f.root,
    env: f.env,
    encoding: "utf8",
    timeout: 15_000,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.match(result.stdout, /run the full suite: npm run test:unit/);
  assert.doesNotMatch(result.stdout, /No (changed files|impacted unit tests)/);
});

test("deleted production source still selects its surviving consumers", (t) => {
  const f = fixture(t);
  f.git("rm", "-q", "src/value.mjs");
  f.commit();
  assert.deepEqual(f.select(), [consumer]);
});

test("a deleted ordinary test is not handed to the test runner", (t) => {
  const f = fixture(t);
  f.git("rm", "-q", consumer);
  f.commit();
  assert.deepEqual(f.select(), []);
});

test("an invalid comparison base cannot become a successful empty selection", (t) => {
  const f = fixture(t);
  const result = spawnSync(process.execPath, ["scripts/quality/select-impacted-tests.mjs"], {
    cwd: f.root,
    env: { ...f.env, GITHUB_BASE_SHA: "f".repeat(40) },
    encoding: "utf8",
    timeout: 15_000,
  });
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /git diff|bad object|Invalid revision|no merge base/);
  assert.equal(result.stdout.trim(), "");
});

test("renaming an ordinary test only selects the surviving destination", (t) => {
  const f = fixture(t);
  f.git("mv", consumer, "tests/unit/moved.test.mjs");
  f.commit();
  assert.deepEqual(f.select(), ["tests/unit/moved.test.mjs"]);
});

test("a docs-only commit retains its existing empty selection", (t) => {
  const f = fixture(t);
  f.write("README.md", "Changed fixture\n");
  f.commit();
  assert.deepEqual(f.select(), []);
});
