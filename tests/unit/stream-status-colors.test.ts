import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-stream-status-colors-"));

const { createStreamController } = await import("../../open-sse/utils/streamHandler.ts");
const { formatStreamStatus, shouldColorStreamStatus } =
  await import("../../open-sse/utils/streamStatusColor.ts");
const { COLORS } = await import("../../open-sse/utils/usageTracking.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

// streamHandler imports usageDb, whose migrations can open the SQLite singleton.
test.after(() => {
  resetDbInstance();
});

/** Run `fn` with APP_LOG_COLORS / NO_COLOR / stdout.isTTY pinned, then restore them. */
function withColorEnv(
  settings: { colors?: string; noColor?: string; isTTY?: boolean },
  fn: () => void
) {
  const saved = { colors: process.env.APP_LOG_COLORS, noColor: process.env.NO_COLOR };
  const ttyDescriptor = Object.getOwnPropertyDescriptor(process.stdout, "isTTY");
  const assign = (key: string, value: string | undefined) => {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  };
  assign("APP_LOG_COLORS", settings.colors);
  assign("NO_COLOR", settings.noColor);
  Object.defineProperty(process.stdout, "isTTY", {
    value: settings.isTTY,
    configurable: true,
    writable: true,
  });
  try {
    fn();
  } finally {
    assign("APP_LOG_COLORS", saved.colors);
    assign("NO_COLOR", saved.noColor);
    if (ttyDescriptor) Object.defineProperty(process.stdout, "isTTY", ttyDescriptor);
    else delete (process.stdout as { isTTY?: boolean }).isTTY;
  }
}

for (const [status, color] of [
  ["complete", COLORS.green],
  ["client_disconnect", COLORS.yellow],
  ["client_disconnect (post-abort)", COLORS.yellow],
  ["aborted", COLORS.yellow],
  ["error: upstream failed", COLORS.red],
  ["error: unknown", COLORS.red],
]) {
  test(`stream status ${status} has the expected terminal color and reset`, () => {
    assert.equal(formatStreamStatus(status, true), `${color}${status}${COLORS.reset}`);
  });
  test(`stream status ${status} stays plain text when coloring is off`, () => {
    assert.equal(formatStreamStatus(status, false), status);
  });
}

test("unclassified stream statuses remain unchanged", () => {
  for (const status of ["disconnect: client_closed", "", "incomplete", "errorless"]) {
    assert.equal(formatStreamStatus(status, true), status);
  }
});

for (const [name, env, tty, expected] of [
  ["non-TTY stdout (Docker, journald, collectors) by default", {}, false, false],
  ["unknown isTTY by default", {}, undefined, false],
  ["a TTY stdout", {}, true, true],
  ["a TTY stdout with NO_COLOR set", { NO_COLOR: "1" }, true, false],
  ["a TTY stdout with an empty NO_COLOR", { NO_COLOR: "" }, true, false],
  ["APP_LOG_COLORS=true on a non-TTY stdout", { APP_LOG_COLORS: "true" }, false, true],
  ["APP_LOG_COLORS=1 even with NO_COLOR", { APP_LOG_COLORS: " 1 ", NO_COLOR: "1" }, false, true],
  ["APP_LOG_COLORS=false on a TTY stdout", { APP_LOG_COLORS: "false" }, true, false],
  ["APP_LOG_COLORS=off on a TTY stdout", { APP_LOG_COLORS: "OFF" }, true, false],
  ["an unrecognized APP_LOG_COLORS on a non-TTY stdout", { APP_LOG_COLORS: "maybe" }, false, false],
  ["an unrecognized APP_LOG_COLORS on a TTY stdout", { APP_LOG_COLORS: "maybe" }, true, true],
] as const) {
  test(`coloring is ${expected ? "on" : "off"} for ${name}`, () => {
    assert.equal(shouldColorStreamStatus(env, tty), expected);
  });
}

test("controller output on a non-TTY stdout is byte-identical to the uncolored line", (t) => {
  withColorEnv({ isTTY: false }, () => {
    const lines: string[] = [];
    t.mock.method(console, "log", (line: string) => lines.push(line));
    const controller = createStreamController();
    controller.handleError(new Error("upstream failed"));
    controller.handleComplete();
    controller.handleError(new Error("late error"));
    assert.equal(lines.length, 3);
    for (const line of lines) assert.ok(!line.includes("\x1b"), `unexpected ANSI in ${line}`);
    assert.match(lines[0], /\[STREAM\] UNKNOWN \| unknown \| \d+ms \| error: upstream failed$/);
    assert.ok(lines[1].endsWith("ms | complete"));
    assert.ok(lines[2].endsWith("ms | client_disconnect (post-abort)"));
  });
});

test("controller with APP_LOG_COLORS=true colors only the status, keeping lifecycle callbacks", (t) => {
  withColorEnv({ colors: "true", isTTY: false }, () => {
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
});
