import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { applyPassthrough } from "../../../../bin/cli/launch/core/passthrough.mjs";

type ErrLike = { code?: string; message?: string; hint?: string };

const dir = mkdtempSync(join(tmpdir(), "olx-pass-flags-"));
test.after(() => rmSync(dir, { recursive: true, force: true }));

test("short flags: separate, attached and alias values are matched", () => {
  const rules = [{ flag: "--model", aliases: ["-m"], action: "warn" as const }];
  const out = applyPassthrough(["-m", "a", "-mb", "--model=c", "--model", "d", "-x"], rules, {
    tool: "codex",
  });
  assert.deepEqual(out.args, ["-m", "a", "-mb", "--model=c", "--model", "d", "-x"]);
  assert.deepEqual(out.warnings, [
    "-m is passed through to codex unchanged; it may override the launch setup",
    "-m is passed through to codex unchanged; it may override the launch setup",
    "--model is passed through to codex unchanged; it may override the launch setup",
    "--model is passed through to codex unchanged; it may override the launch setup",
  ]);
});

test("takesValue false: only an exact match, never an attached value", () => {
  const rules = [{ flag: "--bare", aliases: ["-b"], action: "warn" as const, takesValue: false }];
  const out = applyPassthrough(["--bare", "x", "--bare=1", "-bz"], rules);
  assert.deepEqual(out.args, ["--bare", "x", "--bare=1", "-bz"]);
  assert.equal(out.warnings.length, 1);
  assert.match(out.warnings[0], /the tool/);
});

test("non-short single-dash names do not match attached values; --name= gives empty value", () => {
  const rules = [{ flag: "-long", action: "reject" as const }];
  assert.deepEqual(applyPassthrough(["-longer"], rules).args, ["-longer"]);
  assert.throws(
    () =>
      applyPassthrough(["--settings="], [{ flag: "--settings", action: "mergeJson" }], {
        cwd: dir,
      }),
    (e: ErrLike) =>
      e.code === "UsageError" && e.message === "--settings needs a JSON value or a JSON file path"
  );
});

test("reject and owned default messages; owned shows flag and value", () => {
  assert.throws(
    () => applyPassthrough(["--x"], [{ flag: "--x", action: "reject" }], { tool: "claude" }),
    (e: ErrLike) =>
      e.code === "UsageError" && e.message === "--x is not supported with omnirouter launch claude"
  );
  assert.throws(
    () => applyPassthrough(["-cmodel=y"], [{ flag: "-c", action: "owned" }], { tool: "codex" }),
    (e: ErrLike) =>
      e.code === "ConfigConflict" &&
      e.message === "-c model=y conflicts with the launcher, which sets it for codex" &&
      e.hint === "use the omnirouter option instead (for example --model before `--`)"
  );
  assert.throws(
    () =>
      applyPassthrough(["--own"], [{ flag: "--own", action: "owned", takesValue: false }], {
        tool: "codex",
      }),
    (e: ErrLike) => e.message === "--own conflicts with the launcher, which sets it for codex"
  );
});

test("prefix mismatch falls through to the next rule; `--` stops processing", () => {
  const rules = [
    { flag: "-c", action: "owned" as const, valuePrefixes: ["model="] },
    { flag: "-c", action: "warn" as const, message: "kept" },
    { flag: "--j", action: "mergeJson" as const },
  ];
  const out = applyPassthrough(
    ["-c", "other=1", "--j", '{"a":{"b":1}}', "--j", '{"a":{"c":2}}', "--", "-c", "model=x"],
    rules,
    { cwd: dir }
  );
  assert.deepEqual(out.args, ["-c", "other=1", "--", "-c", "model=x"]);
  assert.deepEqual(out.warnings, ["kept"]);
  assert.deepEqual(out.json, { "--j": { a: { b: 1, c: 2 } } });
  assert.deepEqual(applyPassthrough(undefined), { args: [], json: {}, warnings: [] });
});
