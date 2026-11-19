import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  computeMutationTestFiles,
  isUnitTestCandidate,
  listUnitTestFiles,
  mutatedModules,
  selectCoveringTests,
} from "../../../scripts/quality/mutation-test-files.mjs";

const MUTATE = [
  "open-sse/handlers/chatCore/headers.ts",
  "src/sse/services/auth.ts",
  "open-sse/services/accountFallback.ts:1-200",
  "_a_comment_entry",
];

function writeFixtureRepo(files: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mutation-test-files-"));
  for (const [rel, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), content);
  }
  return root;
}

test("mutatedModules keeps only real .ts module entries", () => {
  assert.deepEqual(mutatedModules(MUTATE), [
    "open-sse/handlers/chatCore/headers.ts",
    "src/sse/services/auth.ts",
  ]);
  assert.deepEqual(mutatedModules(undefined), []);
});

test("isUnitTestCandidate selects tests/unit *.test.ts outside tests/unit/build/", () => {
  assert.equal(isUnitTestCandidate("tests/unit/a.test.ts"), true);
  assert.equal(isUnitTestCandidate("tests/unit/nested/dir/b.test.ts"), true);
  assert.equal(isUnitTestCandidate("tests/unit/build/c.test.ts"), false);
  assert.equal(isUnitTestCandidate("tests/unit/d.test.mjs"), false);
  assert.equal(isUnitTestCandidate("tests/unit/helpers.ts"), false);
  assert.equal(isUnitTestCandidate("tests/integration/e.test.ts"), false);
});

test("computeMutationTestFiles selects importers, adds pinned extras, dedupes and sorts", () => {
  const root = writeFixtureRepo({
    // direct importers (static, alias, dynamic split across lines, require)
    "tests/unit/z-static.test.ts": `import { a } from "../../open-sse/handlers/chatCore/headers.ts";`,
    "tests/unit/nested/alias.test.ts": `import { b } from "@omniroute/open-sse/handlers/chatCore/headers";`,
    "tests/unit/dynamic.test.ts": `const m = await import(\n  "../../src/sse/services/auth.ts"\n);`,
    "tests/unit/req.test.ts": `const r = require("../../src/sse/services/auth.ts");`,
    // not importers
    "tests/unit/comment-only.test.ts": `// covers handlers/chatCore/headers indirectly\nconst x = 1;`,
    "tests/unit/range-entry.test.ts": `import { c } from "../../open-sse/services/accountFallback.ts";`,
    "tests/unit/unrelated.test.ts": `import { d } from "@/lib/foo";`,
    // excluded by location / name even though they import a mutated module
    "tests/unit/build/tooling.test.ts": `import { e } from "../../../src/sse/services/auth.ts";`,
    "tests/unit/helper.ts": `import { f } from "../../src/sse/services/auth.ts";`,
    "tests/integration/int.test.ts": `import { g } from "../../src/sse/services/auth.ts";`,
  });
  try {
    const listed = listUnitTestFiles(root).map((t: { path: string }) => t.path);
    assert.deepEqual(listed, [
      "tests/unit/comment-only.test.ts",
      "tests/unit/dynamic.test.ts",
      "tests/unit/nested/alias.test.ts",
      "tests/unit/range-entry.test.ts",
      "tests/unit/req.test.ts",
      "tests/unit/unrelated.test.ts",
      "tests/unit/z-static.test.ts",
    ]);

    const files = computeMutationTestFiles({
      repoRoot: root,
      mutate: MUTATE,
      pinned: ["tests/unit/unrelated.test.ts", "tests/unit/dynamic.test.ts"],
    });
    assert.deepEqual(files, [
      "tests/unit/dynamic.test.ts",
      "tests/unit/nested/alias.test.ts",
      "tests/unit/req.test.ts",
      "tests/unit/unrelated.test.ts",
      "tests/unit/z-static.test.ts",
    ]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("selectCoveringTests ignores non-candidate paths handed to it", () => {
  const unitTests = [
    { path: "tests/unit/ok.test.ts", content: `import x from "../../src/sse/services/auth.ts";` },
    {
      path: "tests/unit/build/no.test.ts",
      content: `import x from "../../../src/sse/services/auth.ts";`,
    },
  ];
  assert.deepEqual(selectCoveringTests({ mutate: MUTATE, unitTests }), ["tests/unit/ok.test.ts"]);
});

test("listUnitTestFiles returns nothing when tests/unit is absent", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mutation-test-files-empty-"));
  try {
    assert.deepEqual(listUnitTestFiles(root), []);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
