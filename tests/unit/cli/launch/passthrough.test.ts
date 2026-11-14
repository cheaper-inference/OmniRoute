import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { applyPassthrough, readJsonValue } from "../../../../bin/cli/launch/core/passthrough.mjs";

type ErrLike = { code?: string; message?: string; hint?: string; exitCode?: number; name?: string };

const dir = mkdtempSync(join(tmpdir(), "olx-pass-"));
test.after(() => rmSync(dir, { recursive: true, force: true }));

const RULES = [
  { flag: "--settings", action: "mergeJson" as const },
  { flag: "--bare", action: "warn" as const, takesValue: false },
  { flag: "--dangerous", action: "reject" as const, message: "no" },
  { flag: "-c", action: "owned" as const, valuePrefixes: ["model_provider="] },
  { flag: "--model", aliases: ["-m"], action: "warn" as const },
];

test("mergeJson: inline and file values are parsed, merged in order and removed from argv", () => {
  const file = join(dir, "s.json");
  writeFileSync(file, JSON.stringify({ a: 1, nested: { x: 1 } }));
  const out = applyPassthrough(
    ["--settings", file, "--keep", '--settings={"nested":{"y":2}}'],
    RULES,
    { cwd: dir }
  );
  assert.deepEqual(out.args, ["--keep"]);
  assert.deepEqual(out.json["--settings"], { a: 1, nested: { x: 1, y: 2 } });
  assert.equal(readJsonValue("s.json", "--settings", { cwd: dir }).a, 1);
  assert.throws(
    () => applyPassthrough(["--settings", "{bad"], RULES),
    (e: ErrLike) => e.code === "UsageError"
  );
  assert.throws(
    () => applyPassthrough(["--settings", "missing.json"], RULES, { cwd: dir }),
    (e: ErrLike) => e.code === "UsageError"
  );
});

test("warn keeps the args and reports; aliases and boolean flags", () => {
  const out = applyPassthrough(["--bare", "-m", "gpt", "--model=x", "rest"], RULES);
  assert.deepEqual(out.args, ["--bare", "-m", "gpt", "--model=x", "rest"]);
  assert.equal(out.warnings.length, 3);
});

test("reject -> UsageError; owned honours valuePrefixes -> ConfigConflict", () => {
  assert.throws(
    () => applyPassthrough(["--dangerous", "1"], RULES),
    (e: ErrLike) => e.code === "UsageError" && e.message === "no"
  );
  assert.throws(
    () => applyPassthrough(["-c", "model_provider=x"], RULES),
    (e: ErrLike) => e.code === "ConfigConflict"
  );
  assert.deepEqual(applyPassthrough(["-c", "theme=dark"], RULES).args, ["-c", "theme=dark"]);
});

test("everything after a bare -- is the tool's own business", () => {
  const out = applyPassthrough(["a", "--", "--dangerous", "--settings", "{}"], RULES);
  assert.deepEqual(out.args, ["a", "--", "--dangerous", "--settings", "{}"]);
  assert.deepEqual(out.json, {});
});
