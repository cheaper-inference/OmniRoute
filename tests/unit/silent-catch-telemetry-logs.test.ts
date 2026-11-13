import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-silent-catch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { recordContextEditingTelemetryHook } =
  await import("../../open-sse/handlers/chatCore/contextEditingTelemetry.ts");
const { emitCompressionStepEvent } =
  await import("../../open-sse/handlers/chatCore/compressionLiveEvents.ts");

test.before(async () => {
  await core.ensureDbInitialized();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function makeLog() {
  const lines: string[] = [];
  return { log: { debug: (tag: string, msg: string) => lines.push(`${tag} ${msg}`) }, lines };
}

// Resolves when the hook (a fire-and-forget async block) has logged, or after the event loop
// has drained a bounded number of turns (no fixed sleep).
async function settle(lines: string[]): Promise<void> {
  for (let i = 0; i < 200 && lines.length === 0; i++) {
    await new Promise((resolve) => setImmediate(resolve));
  }
}

test("a failing context-editing write is logged, not swallowed", async () => {
  const db = core.getDbInstance() as unknown as { exec: (sql: string) => void };
  db.exec("ALTER TABLE compression_analytics RENAME TO compression_analytics_hidden");
  const { log, lines } = makeLog();
  try {
    recordContextEditingTelemetryHook({
      contextEditingEnabled: true,
      provider: "claude",
      responseBody: {
        context_management: {
          applied_edits: [{ cleared_input_tokens: 120, cleared_tool_uses: 1 }],
        },
      },
      skillRequestId: "req-silent-1",
      log,
    });
    await settle(lines);
  } finally {
    db.exec("ALTER TABLE compression_analytics_hidden RENAME TO compression_analytics");
  }
  assert.equal(lines.length, 1, `one debug line expected, got ${JSON.stringify(lines)}`);
  assert.match(lines[0], /^CONTEXT_EDITING /);
});

test("a throwing event bus in a compression step event is logged, not swallowed", () => {
  const { log, lines } = makeLog();
  const emit = (() => {
    throw new Error("bus down");
  }) as never;
  emitCompressionStepEvent(
    emit,
    "trace-1",
    "stacked",
    {
      stepIndex: 0,
      totalSteps: 1,
      engine: "caveman",
      state: "done",
      originalTokens: 10,
      compressedTokens: 5,
      savingsPercent: 50,
    } as never,
    log
  );
  assert.equal(lines.length, 1);
  assert.match(lines[0], /^COMPRESSION .*bus down/);
});

test("without a logger the step event still never throws", () => {
  assert.doesNotThrow(() =>
    emitCompressionStepEvent(
      (() => {
        throw new Error("bus down");
      }) as never,
      "trace-2",
      "stacked",
      { stepIndex: 0, totalSteps: 1, engine: "x", state: "done" } as never
    )
  );
});
