import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { inspectNewUiReferences } from "../../scripts/i18n/check-new-ui-references.mjs";

const source = (key) =>
  `import { useTranslations } from "next-intl"; export function Page() { const t = useTranslations("common"); return t("${key}"); }\n`;

function fixture(t, { from, to, key = "missing", catalog = {}, typeChange = false }) {
  const cwd = mkdtempSync(path.join(os.tmpdir(), "omniroute-ui-reference-scope-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const env = {
    ...process.env,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: path.join(cwd, "absent-global-config"),
    GIT_CONFIG_COUNT: "0",
  };
  const git = (...args) => execFileSync("git", args, { cwd, env, encoding: "utf8" }).trim();
  const put = (name, text) => {
    mkdirSync(path.dirname(path.join(cwd, name)), { recursive: true });
    writeFileSync(path.join(cwd, name), text);
  };
  git("init", "-q");
  put("src/i18n/messages/en.json", JSON.stringify(catalog));
  put(from, source(key));
  git("add", "--all");
  const base = git("write-tree");
  if (typeChange) {
    // Construct a symlink tree entry without requiring host symlink privileges.
    const blob = execFileSync("git", ["hash-object", "-w", "--stdin"], {
      cwd,
      env,
      encoding: "utf8",
      input: "target.tsx",
    }).trim();
    git("update-index", "--cacheinfo", `120000,${blob},${from}`);
  } else {
    mkdirSync(path.dirname(path.join(cwd, to)), { recursive: true });
    renameSync(path.join(cwd, from), path.join(cwd, to));
    git("add", "--all");
  }
  return { cwd, snapshot: { base, candidate: git("write-tree") } };
}

test("moving a test from src into tests removes its source references", (t) => {
  const result = inspectNewUiReferences(
    fixture(t, {
      from: "src/components/__tests__/example.test.tsx",
      to: "tests/unit/example.test.tsx",
    })
  );
  assert.equal(result.status, "PASS");
  assert.equal(result.sourceChangeCount, 1);
  assert.deepEqual(result.newReferences, []);
  assert.ok(result.inventory.some((row) => row.status === "R"));
  assert.ok(result.blobReceipts.every((row) => row.path.startsWith("src/")));
});

test("archiving a source outside src does not read or validate the archived body", (t) => {
  const result = inspectNewUiReferences(
    fixture(t, {
      from: "src/old.tsx",
      to: "docs/archive/old-source.txt",
    })
  );
  assert.equal(result.status, "PASS");
  assert.deepEqual(result.newReferences, []);
  assert.ok(result.blobReceipts.every((row) => row.path === "src/old.tsx"));
});

test("moving code into src validates its references as new production uses", (t) => {
  const result = inspectNewUiReferences(
    fixture(t, {
      from: "tests/fixtures/page.tsx",
      to: "src/page.tsx",
      key: "done",
      catalog: { common: { done: "Done" } },
    })
  );
  assert.equal(result.status, "PASS");
  assert.deepEqual(
    result.newReferences.map((row) => row.key),
    ["common.done"]
  );
  assert.ok(result.blobReceipts.every((row) => row.path === "src/page.tsx"));
});

test("a missing key moved into src cannot inherit a fixture exemption", (t) => {
  const result = inspectNewUiReferences(
    fixture(t, {
      from: "tests/fixtures/page.tsx",
      to: "src/page.tsx",
    })
  );
  assert.equal(result.status, "FAIL");
  assert.deepEqual(
    result.violations.map(({ key, reason }) => ({ key, reason })),
    [{ key: "common.missing", reason: "MISSING_EN_MESSAGE" }]
  );
});

test("a rename within src preserves the logical reference baseline", (t) => {
  const result = inspectNewUiReferences(
    fixture(t, {
      from: "src/old.tsx",
      to: "src/new.tsx",
    })
  );
  assert.equal(result.status, "PASS");
  assert.deepEqual(result.newReferences, []);
});

test("a rename wholly outside src stays outside source analysis", (t) => {
  const result = inspectNewUiReferences(
    fixture(t, {
      from: "tests/fixtures/old.tsx",
      to: "tests/fixtures/new.tsx",
    })
  );
  assert.equal(result.status, "PASS");
  assert.equal(result.sourceChangeCount, 0);
  assert.deepEqual(result.blobReceipts, []);
});

test("changing source to a symlink remains incomplete", (t) => {
  const result = inspectNewUiReferences(
    fixture(t, {
      from: "src/page.tsx",
      typeChange: true,
    })
  );
  assert.equal(result.status, "INCOMPLETE");
  assert.deepEqual(result.incompleteDetails, [{ reason: "UNSUPPORTED_SOURCE_CHANGE" }]);
});
