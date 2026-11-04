import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  changedFilesFromNameStatus,
  changedFilesFromStdin,
  selectImpacted,
} from "../../scripts/quality/select-impacted-tests.mjs";

const HELPER = "tests/_helpers/shared.mjs";
const TEST = "tests/unit/consumer.test.mjs";

for (const [label, status] of [
  ["modified", `M\t${HELPER}\n`],
  ["deleted", `D\t${HELPER}\n`],
  ["type changed", `T\t${HELPER}\n`],
  ["renamed outside helpers", `R100\t${HELPER}\tscripts/ad-hoc/shared.mjs\n`],
  ["renamed into helpers", `R100\tscripts/ad-hoc/shared.mjs\t${HELPER}\n`],
  ["copied", `C100\t${HELPER}\ttests/_helpers/copied.mjs\n`],
]) {
  test(`git status preserves the full-suite requirement when a helper is ${label}`, () => {
    assert.deepEqual(
      selectImpacted({ changed: changedFilesFromNameStatus(status), map: { sources: {} } }),
      ["__RUN_ALL__"]
    );
  });
}

test("deleted ordinary tests are not passed as missing runner paths", () => {
  assert.deepEqual(changedFilesFromNameStatus(`D\t${TEST}\nM\ttests/unit/kept.test.mjs\n`), [
    "tests/unit/kept.test.mjs",
  ]);
});

test("ordinary test renames select the surviving test path", () => {
  assert.deepEqual(changedFilesFromNameStatus(`R100\t${TEST}\ttests/unit/moved.test.mjs\n`), [
    "tests/unit/moved.test.mjs",
  ]);
});

for (const [label, status] of [
  ["unknown status", `U\t${HELPER}\n`],
  ["missing path", "M\n"],
  ["quoted path", 'M\t"tests/_helpers/space\\tname.mjs"\n'],
  ["missing rename destination", `R100\t${HELPER}\n`],
]) {
  test(`ambiguous name-status input fails closed: ${label}`, () => {
    assert.deepEqual(changedFilesFromNameStatus(status), ["__RUN_ALL__"]);
  });
}

test("plain stdin remains supported and helper lookalikes do not broaden scope", () => {
  assert.deepEqual(changedFilesFromStdin(` ${HELPER}\r\n\n`), [HELPER]);
  assert.deepEqual(
    selectImpacted({ changed: ["tests/_helpers-other/shared.mjs"], map: { sources: {} } }),
    []
  );
});

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "tia-helper-diff-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const sourceRoot = path.resolve(import.meta.dirname, "../..");
  for (const file of [
    "scripts/quality/select-impacted-tests.mjs",
    "scripts/quality/test-scoped.sh",
  ]) {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.copyFileSync(path.join(sourceRoot, file), path.join(root, file));
  }
  const write = (file, content) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), content);
  };
  write(HELPER, "export const value = 1;\n");
  write(TEST, 'import { value } from "../_helpers/shared.mjs";\n');
  write("config/quality/test-impact-map.json", '{"sources":{}}\n');
  const git = (...args) =>
    execFileSync("git", ["-c", "core.hooksPath=/dev/null", "-c", "commit.gpgSign=false", ...args], {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: "/dev/null" },
    });
  git("init", "-q");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.invalid");
  git("add", ".");
  git("commit", "-qm", "fixture base");
  return { root, git, write, base: git("rev-parse", "HEAD").trim() };
}

for (const change of ["modified", "deleted", "renamed"]) {
  test(`real Git committed ${change} helper reaches the CLI fallback`, (t) => {
    const f = fixture(t);
    if (change === "modified") f.write(HELPER, "export const value = 2;\n");
    if (change === "deleted") fs.unlinkSync(path.join(f.root, HELPER));
    if (change === "renamed") {
      fs.mkdirSync(path.join(f.root, "scripts/ad-hoc"), { recursive: true });
      f.git("mv", HELPER, "scripts/ad-hoc/shared.mjs");
    }
    f.git("add", "-A");
    f.git("commit", "-qm", "fixture change");
    const out = execFileSync(process.execPath, ["scripts/quality/select-impacted-tests.mjs"], {
      cwd: f.root,
      encoding: "utf8",
      env: { ...process.env, GITHUB_BASE_SHA: f.base },
    });
    assert.equal(out.trim(), "__RUN_ALL__");
  });
}

test("real Git staged helper deletion makes test:scoped require full coverage", (t) => {
  const f = fixture(t);
  f.git("rm", "-q", HELPER);
  const result = spawnSync("bash", ["scripts/quality/test-scoped.sh", "--staged"], {
    cwd: f.root,
    encoding: "utf8",
    env: {
      ...process.env,
      PATH: `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH || ""}`,
    },
  });
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.equal(result.status, 1);
  assert.match(result.stdout, /run the full suite: npm run test:unit/);
  assert.doesNotMatch(result.stdout, /No impacted unit tests/);
});
