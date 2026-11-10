import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { createStreamController } from "../../open-sse/utils/streamHandler.ts";
import { logUsage } from "../../open-sse/utils/usageTracking.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const logDirectory = mkdtempSync(join(tmpdir(), "omniroute-clock-prefix-"));
const logPath = join(logDirectory, "app.log");
const previousLogPath = process.env.APP_LOG_FILE_PATH;
const previousLogToFile = process.env.APP_LOG_TO_FILE;
process.env.APP_LOG_FILE_PATH = logPath;
process.env.APP_LOG_TO_FILE = "true";
const { initConsoleInterceptor, __consoleInterceptorInternals } =
  await import("../../src/lib/consoleInterceptor.ts");
if (previousLogPath === undefined) delete process.env.APP_LOG_FILE_PATH;
else process.env.APP_LOG_FILE_PATH = previousLogPath;
if (previousLogToFile === undefined) delete process.env.APP_LOG_TO_FILE;
else process.env.APP_LOG_TO_FILE = previousLogToFile;

test.after(() => {
  __consoleInterceptorInternals.reset();
  resetDbInstance();
  rmSync(logDirectory, { recursive: true, force: true });
});

// The clock prefix is parsed structurally by src/lib/consoleInterceptor.ts
// (CLOCK_TOKEN_RE = /^\d{2}:\d{2}:\d{2}$/) to strip it from captured log lines.
// getTimeString() builds it with padStart instead of toLocaleTimeString(), so
// pin the exact shape the interceptor and log readers depend on.
test("logUsage prefixes the usage line with a strict HH:MM:SS clock", () => {
  const lines: string[] = [];
  const original = console.log;
  console.log = (...args: unknown[]) => {
    lines.push(args.map(String).join(" "));
  };
  try {
    logUsage("openai", { prompt_tokens: 10, completion_tokens: 5 }, "gpt-4", "conn-1234567890");
  } finally {
    console.log = original;
  }

  assert.equal(lines.length, 1, "logUsage must emit exactly one line");
  const match = /^\[(\d{2}:\d{2}:\d{2})\]/.exec(lines[0]);
  assert.ok(match, `usage line must start with a strict clock, got: ${lines[0]}`);
  assert.match(match[1], /^\d{2}:\d{2}:\d{2}$/);

  // Hours are zero-padded, never rendered as "24" or as a locale variant.
  const [hh, mm, ss] = match[1].split(":").map(Number);
  assert.ok(hh >= 0 && hh <= 23, `hour out of range: ${hh}`);
  assert.ok(mm >= 0 && mm <= 59, `minute out of range: ${mm}`);
  assert.ok(ss >= 0 && ss <= 59, `second out of range: ${ss}`);
});

// Literal local-clock expectations: no recomputation with the formatter under test.
// Both emitters intentionally use 00–23, including midnight. Older ICU hour cycles
// can render midnight as 24; that historical token remains parseable below.
const clockCases = [
  ["UTC", "2024-01-01T00:00:00Z", "00:00:00"],
  ["UTC", "2024-02-29T01:02:03Z", "01:02:03"],
  ["UTC", "2024-12-31T23:59:59Z", "23:59:59"],
  ["UTC", "2025-01-01T00:00:00Z", "00:00:00"],
  ["America/Sao_Paulo", "2024-01-01T03:04:05Z", "00:04:05"],
  ["Asia/Kathmandu", "2024-01-01T18:15:00Z", "00:00:00"],
  ["Asia/Kathmandu", "2024-01-01T00:00:00Z", "05:45:00"],
  ["America/New_York", "2024-03-10T06:59:59Z", "01:59:59"],
  ["America/New_York", "2024-03-10T07:00:00Z", "03:00:00"],
  ["America/New_York", "2024-11-03T05:59:59Z", "01:59:59"],
  ["America/New_York", "2024-11-03T06:00:00Z", "01:00:00"],
  ["Australia/Lord_Howe", "2024-10-05T15:29:59Z", "01:59:59"],
  ["Australia/Lord_Howe", "2024-10-05T15:30:00Z", "02:30:00"],
];

for (const [timezone, instant, expected] of clockCases) {
  test(`both loggers and the interceptor preserve ${expected} in ${timezone} at ${instant}`, (t) => {
    const previousTimezone = process.env.TZ;
    const lines: string[] = [];
    process.env.TZ = timezone;
    t.mock.timers.enable({ apis: ["Date"], now: Date.parse(instant) });
    t.mock.method(console, "log", (...args: unknown[]) => {
      lines.push(args.map(String).join(" "));
    });
    try {
      initConsoleInterceptor();
      logUsage("openai", { prompt_tokens: 10, completion_tokens: 5 });
      createStreamController({ provider: "openai", model: "clock-fixture" }).handleComplete();
      __consoleInterceptorInternals.reset();

      assert.equal(lines.length, 2);
      for (const line of lines) {
        assert.equal(line.slice(0, 10), `[${expected}]`);
      }
      assert.ok(lines[0].includes("[USAGE] OPENAI | in=10 | out=5"));
      assert.ok(lines[1].endsWith("[STREAM] OPENAI | clock-fixture | 0ms | complete"));

      const entries = readFileSync(logPath, "utf8")
        .trim()
        .split("\n")
        .slice(-2)
        .map((line) => JSON.parse(line) as { component: string; message: string });
      assert.deepEqual(
        entries.map((entry) => entry.component),
        ["USAGE", "STREAM"]
      );
      for (const entry of entries) {
        assert.equal(entry.message.slice(0, 10), `[${expected}]`);
        assert.ok(!entry.message.includes("\x1b"), "stored message must strip ANSI decoration");
      }
    } finally {
      __consoleInterceptorInternals.reset();
      t.mock.timers.reset();
      if (previousTimezone === undefined) delete process.env.TZ;
      else process.env.TZ = previousTimezone;
    }
  });
}

for (const emitter of ["usage", "stream"]) {
  test(`${emitter} logging does not invoke a locale time formatter per line`, (t) => {
    t.mock.method(console, "log", () => {});
    const formatter = t.mock.method(Date.prototype, "toLocaleTimeString");
    if (emitter === "usage") {
      logUsage("openai", { prompt_tokens: 10, completion_tokens: 5 });
    } else {
      createStreamController({ provider: "openai", model: "clock-fixture" }).handleComplete();
    }
    assert.equal(formatter.mock.callCount(), 0);
  });
}

test("the interceptor also recognizes a historical ICU 24:00:00 clock token", (t) => {
  t.mock.method(console, "log", () => {});
  try {
    initConsoleInterceptor();
    console.log("[24:00:00] [USAGE] historical clock");
    console.log("[24:00:00] [STREAM] historical clock");
    __consoleInterceptorInternals.reset();
    const entries = readFileSync(logPath, "utf8")
      .trim()
      .split("\n")
      .slice(-2)
      .map((line) => JSON.parse(line) as { component: string; message: string });
    assert.deepEqual(
      entries.map((entry) => entry.component),
      ["USAGE", "STREAM"]
    );
    assert.deepEqual(
      entries.map((entry) => entry.message),
      ["[24:00:00] [USAGE] historical clock", "[24:00:00] [STREAM] historical clock"]
    );
  } finally {
    __consoleInterceptorInternals.reset();
  }
});
