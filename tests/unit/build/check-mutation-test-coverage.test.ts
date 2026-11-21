import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  moduleFragment,
  testImportsModule,
  findCoverageDrift,
  loadStrykerConfig,
  STRYKER_CONFIG_FILE,
} from "../../../scripts/check/check-mutation-test-coverage.mjs";
import {
  listUnitTestFiles,
  selectCoveringTests,
} from "../../../scripts/quality/mutation-test-files.mjs";

type ResolvedConfig = { mutate: string[]; tap: { testFiles: string[] } };
const repoRoot = path.resolve(import.meta.dirname, "../../..");
// Loading the config computes tap.testFiles (it scans tests/unit) — do it once.
let resolvedConfig: Promise<ResolvedConfig> | undefined;
const loadResolvedConfig = () =>
  (resolvedConfig ??= loadStrykerConfig(
    path.join(repoRoot, STRYKER_CONFIG_FILE)
  ) as Promise<ResolvedConfig>);

test("moduleFragment returns the 3-segment suffix without extension", () => {
  assert.equal(
    moduleFragment("open-sse/handlers/chatCore/headers.ts"),
    "handlers/chatCore/headers"
  );
  assert.equal(moduleFragment("src/sse/services/auth.ts"), "sse/services/auth");
  // shallow paths just use what is available
  assert.equal(moduleFragment("a/b.ts"), "a/b");
});

test("testImportsModule matches static, dynamic and require imports of the module path", () => {
  const frag = "handlers/chatCore/headers";
  // static import-from
  assert.equal(
    testImportsModule(`import { x } from "@omniroute/open-sse/handlers/chatCore/headers";`, frag),
    true
  );
  // dynamic await import, even split across lines
  assert.equal(
    testImportsModule(
      `const { y } = await import(\n  "../../open-sse/handlers/chatCore/headers.ts"\n);`,
      frag
    ),
    true
  );
  // require()
  assert.equal(
    testImportsModule(`const z = require("../../open-sse/handlers/chatCore/headers.ts");`, frag),
    true
  );
  // unrelated module is not matched
  assert.equal(
    testImportsModule(
      `import { a } from "@omniroute/open-sse/handlers/chatCore/idempotency";`,
      frag
    ),
    false
  );
  // the fragment appearing only in a comment (not an import string) is NOT a match
  assert.equal(
    testImportsModule(`// see handlers/chatCore/headers for details\nconst a = 1;`, frag),
    false
  );
});

test("findCoverageDrift flags covering unit tests absent from tap.testFiles", () => {
  const mutate = [
    "open-sse/handlers/chatCore/headers.ts",
    "open-sse/handlers/chatCore/idempotency.ts",
    "_a_comment_entry",
  ];
  const tapTestFiles = ["tests/unit/chatcore-headers.test.ts"];
  const unitTests = [
    // covers headers, already in tap -> not drift
    {
      path: "tests/unit/chatcore-headers.test.ts",
      content: `await import("../../open-sse/handlers/chatCore/headers.ts");`,
    },
    // covers headers, NOT in tap -> drift
    {
      path: "tests/unit/no-memory-header.test.ts",
      content: `const { isNoMemoryRequested } = await import("../../open-sse/handlers/chatCore/headers.ts");`,
    },
    // covers idempotency, NOT in tap -> drift
    {
      path: "tests/unit/idempo.test.ts",
      content: `import { x } from "@omniroute/open-sse/handlers/chatCore/idempotency";`,
    },
    // covers nothing mutated -> ignored
    { path: "tests/unit/unrelated.test.ts", content: `import { z } from "@/lib/foo";` },
  ];
  const drift = findCoverageDrift({ mutate, tapTestFiles, unitTests });
  assert.deepEqual(drift["open-sse/handlers/chatCore/headers.ts"], [
    "tests/unit/no-memory-header.test.ts",
  ]);
  assert.deepEqual(drift["open-sse/handlers/chatCore/idempotency.ts"], [
    "tests/unit/idempo.test.ts",
  ]);
  // comment-only mutate entries are skipped
  assert.equal("_a_comment_entry" in drift, false);
});

test("every tap.testFiles entry names a file that still exists", async () => {
  // The existing drift check runs one way: a test that covers a mutated module
  // but is missing from tap.testFiles. The other way is silent — an entry left
  // behind after its test file is deleted or renamed. Stryker resolves the list
  // into its sandbox, so a dangling path costs coverage without failing loudly.
  // The computed part of the list cannot dangle; the pinned extras in
  // stryker.conf.mjs can.
  const conf = await loadResolvedConfig();
  const entries = conf.tap?.testFiles ?? [];
  assert.ok(entries.length > 0, `${STRYKER_CONFIG_FILE} resolves no tap.testFiles`);

  const missing = entries
    .filter((entry) => !entry.includes("*"))
    .filter((entry) => !fs.existsSync(path.join(repoRoot, entry)));
  assert.deepEqual(missing, [], `tap.testFiles names ${missing.length} file(s) that do not exist`);
});

test("the resolved tap.testFiles holds every covering unit test, once each", async () => {
  const conf = await loadResolvedConfig();
  const entries = conf.tap.testFiles;
  assert.equal(new Set(entries).size, entries.length, "tap.testFiles has duplicate entries");
  const covering = selectCoveringTests({
    mutate: conf.mutate,
    unitTests: listUnitTestFiles(repoRoot),
  });
  assert.ok(covering.length > 100, "the import rule should select the covering unit tests");
  const listed = new Set(entries);
  assert.deepEqual(
    covering.filter((t: string) => !listed.has(t)),
    [],
    "every unit test that imports a mutated module must be in tap.testFiles"
  );
});

test("the gate reports drift if the resolved list ever loses a covering test", async () => {
  // The config computes the list, so the real tree has no drift by construction. Prove the
  // gate is not vacuous: drop one covering test from the resolved list and it must be flagged.
  const conf = await loadResolvedConfig();
  const unitTests = listUnitTestFiles(repoRoot);
  const covering = selectCoveringTests({ mutate: conf.mutate, unitTests });
  const victim = covering[0];
  const incomplete = conf.tap.testFiles.filter((t: string) => t !== victim);

  assert.deepEqual(
    findCoverageDrift({ mutate: conf.mutate, tapTestFiles: conf.tap.testFiles, unitTests }),
    {}
  );
  const drift = findCoverageDrift({ mutate: conf.mutate, tapTestFiles: incomplete, unitTests });
  const flagged = Object.values(drift).flat();
  assert.ok(flagged.includes(victim), `dropping ${victim} must be reported as drift`);
});
