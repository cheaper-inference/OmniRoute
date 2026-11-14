// In-process tests for core/trace.mjs: the flag is read once at module load.
import { test } from "node:test";
import assert from "node:assert/strict";

import { trace, traceEnabled } from "../../../../bin/cli/launch/core/trace.mjs";

test("traceEnabled mirrors OMNIROUTE_LAUNCH_TRACE=1 at load time", () => {
  assert.equal(traceEnabled(), process.env.OMNIROUTE_LAUNCH_TRACE === "1");
});

test("trace writes nothing to stderr while disabled", (t) => {
  if (traceEnabled()) {
    t.skip("trace is enabled in this environment");
    return;
  }
  const writes: string[] = [];
  const original = process.stderr.write.bind(process.stderr);
  process.stderr.write = ((chunk: string | Uint8Array) => {
    writes.push(String(chunk));
    return true;
  }) as typeof process.stderr.write;
  try {
    trace("step");
  } finally {
    process.stderr.write = original;
  }
  assert.deepEqual(writes, []);
});
