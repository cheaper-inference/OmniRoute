import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { filterScope, globToRegExp, resolveScope } from "../../../scripts/quality/launch-scope.mjs";

const ROOT = path.resolve(import.meta.dirname, "../../..");
const cfg = JSON.parse(
  fs.readFileSync(path.join(ROOT, "config/quality/launch-gates.json"), "utf8")
);

test("glob: ** spans any depth, * stays in one segment, braces expand", () => {
  const re = globToRegExp("bin/cli/launch/**/*.{mjs,ts}");
  assert.ok(re.test("bin/cli/launch/command.mjs"));
  assert.ok(re.test("bin/cli/launch/contract/schema/deep/x.ts"));
  assert.ok(re.test("bin/cli/launch/contract.d.ts"));
  assert.ok(!re.test("bin/cli/launch/README.md"));
  assert.ok(!re.test("bin/cli/launchx/a.mjs"));
  assert.ok(
    globToRegExp("src/app/api/launch/**/*.ts").test("src/app/api/launch/sessions/[id]/route.ts")
  );
  assert.ok(globToRegExp("bin/omnirouter.mjs").test("bin/omnirouter.mjs"));
  assert.ok(!globToRegExp("bin/omnirouter.mjs").test("bin/omnirouterXmjs"));
});

test("filterScope: excludes assets and every test file, keeps new split modules", () => {
  const files = filterScope(
    [
      "bin/cli/launch/command.mjs",
      "bin/cli/launch/command/run.mjs",
      "bin/cli/launch/core/pipeline/steps/spawn.mjs",
      "bin/cli/launch/assets/claude/settings.mjs",
      "bin/cli/launch/core/plan.test.mjs",
      "bin/cli/launch/__tests__/x.ts",
      "bin/cli/launch/core/x.spec.ts",
      "src/shared/launch/viewSelect.ts",
      "src/shared/other.ts",
      "tests/unit/cli/launch/pipeline.test.ts",
    ],
    cfg.scope
  );
  assert.deepEqual(files, [
    "bin/cli/launch/command.mjs",
    "bin/cli/launch/command/run.mjs",
    "bin/cli/launch/core/pipeline/steps/spawn.mjs",
    "src/shared/launch/viewSelect.ts",
  ]);
});

test("resolveScope: picks up an untracked file created after the config was written", () => {
  const probe = "bin/cli/launch/core/zz-scope-probe-test.mjs";
  const abs = path.join(ROOT, probe);
  fs.writeFileSync(abs, "export const probe = 1;\n");
  try {
    const files = resolveScope(cfg, ROOT);
    assert.ok(files.includes(probe));
    assert.ok(files.includes("bin/omnirouter.mjs"));
    assert.ok(files.includes("src/lib/db/launchSessions.ts"));
    assert.ok(!files.some((f) => f.startsWith("bin/cli/launch/assets/")));
  } finally {
    fs.rmSync(abs, { force: true });
  }
  assert.ok(!resolveScope(cfg, ROOT).includes(probe));
});

test("resolveScope: rejects the old fixed-list form", () => {
  assert.throws(() => resolveScope({ scope: ["bin/omnirouter.mjs"] }, ROOT), /include, exclude/);
});
