// Unit tests for the opt-in launch trace (core/trace.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const TRACE = pathToFileURL(join(process.cwd(), "bin", "cli", "launch", "core", "trace.mjs")).href;
const SCRIPT = `import { trace, traceEnabled } from ${JSON.stringify(TRACE)};
trace("x");
process.stdout.write(String(traceEnabled()));`;

function run(value?: string) {
  const env: Record<string, string> = { ...(process.env as Record<string, string>) };
  delete env.OMNIROUTE_LAUNCH_TRACE;
  if (value !== undefined) env.OMNIROUTE_LAUNCH_TRACE = value;
  return spawnSync(process.execPath, ["--input-type=module", "-e", SCRIPT], {
    env,
    encoding: "utf8",
  });
}

test("OMNIROUTE_LAUNCH_TRACE=1 prints exactly one trace line", () => {
  const res = run("1");
  assert.equal(res.status, 0);
  assert.equal(res.stdout, "true");
  const lines = res.stderr.split("\n").filter(Boolean);
  assert.equal(lines.length, 1);
  assert.match(lines[0], /^omnirouter: trace \d+\.\dms x$/);
});

test("unset and =0 keep stderr empty", () => {
  for (const value of [undefined, "0"]) {
    const res = run(value);
    assert.equal(res.status, 0);
    assert.equal(res.stdout, "false");
    assert.equal(res.stderr, "");
  }
});
