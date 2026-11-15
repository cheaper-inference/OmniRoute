import test from "node:test";
import assert from "node:assert/strict";
import { createStreamController, formatStreamStatus } from "../../open-sse/utils/streamHandler.ts";
import { COLORS } from "../../open-sse/utils/usageTracking.ts";

for (const [status, color] of [
  ["complete", COLORS.green],
  ["client_disconnect", COLORS.yellow],
  ["client_disconnect (post-abort)", COLORS.yellow],
  ["aborted", COLORS.yellow],
  ["error: upstream failed", COLORS.red],
  ["error: unknown", COLORS.red],
]) {
  test(`stream status ${status} has the expected terminal color and reset`, () => {
    assert.equal(formatStreamStatus(status), `${color}${status}${COLORS.reset}`);
  });
}

test("unclassified stream statuses remain unchanged", () => {
  for (const status of ["disconnect: client_closed", "", "incomplete", "errorless"]) {
    assert.equal(formatStreamStatus(status), status);
  }
});

test("controller colors only the status without changing lifecycle callbacks", (t) => {
  const lines: string[] = [];
  t.mock.method(console, "log", (line: string) => lines.push(line));
  let errorCalls = 0;
  const controller = createStreamController({
    onError: () => {
      errorCalls++;
    },
  });
  controller.handleError(new Error("upstream failed"));
  assert.equal(errorCalls, 1);
  assert.match(lines[0], /\[STREAM\] UNKNOWN \| unknown \| \d+ms \| \x1b\[31merror: .*\x1b\[0m$/);
  assert.equal(lines[0].indexOf("\x1b"), lines[0].lastIndexOf(" | ") + 3);
  controller.handleComplete();
  assert.ok(lines[1].endsWith(`${COLORS.green}complete${COLORS.reset}`));
  controller.handleError(new Error("late error"));
  assert.ok(lines[2].endsWith(`${COLORS.yellow}client_disconnect (post-abort)${COLORS.reset}`));
  assert.equal(errorCalls, 1);

  const aborted = createStreamController();
  aborted.handleError(new DOMException("cancelled", "AbortError"));
  assert.ok(lines[3].endsWith(`${COLORS.yellow}client_disconnect${COLORS.reset}`));
});
