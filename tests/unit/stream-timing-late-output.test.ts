// A long reasoning prelude can push the first visible output past the early probe
// window. With STREAM_LATE_OUTPUT_PROBE_ENABLED on, `streamEmittedOutput()` must still
// report it: a failure after that point is final for the request, so the failure path must
// not record a model-only lockout for an already delivered stream (#16927). With the flag
// off (default) the release 64-chunk window is kept unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// One write = one forwarded observation on the passthrough sink (see sseOutputSink.ts).
delete process.env.SSE_FRAME_COALESCE_MS;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-late-output-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const FLAG = "STREAM_LATE_OUTPUT_PROBE_ENABLED";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const streak = await import("../../open-sse/services/accountFallback/postOutputFailureStreak.ts");
const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { createStreamTiming, streamEmittedOutput } =
  await import("../../open-sse/utils/streamTiming.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function withFlag<T>(value: "true" | "false", fn: () => Promise<T>): Promise<T> {
  const previous = process.env[FLAG];
  process.env[FLAG] = value;
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previous;
  }
}

const silentFrame = (i: number) =>
  `data: {"id":"c${i}","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant"}}]}\n\n`;
const contentFrame = (i: number) =>
  `data: {"id":"c${i}","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"x"}}]}\n\n`;

const silentFrames = (from: number, to: number) => {
  const frames: string[] = [];
  for (let i = from; i < to; i++) frames.push(silentFrame(i));
  return frames;
};

/** Output starts at chunk 199 (past the 64-chunk window) and keeps coming. */
const lateOutputChunks = () => {
  const chunks = [...silentFrames(0, 199)];
  for (let i = 199; i < 209; i++) chunks.push(contentFrame(i));
  return chunks;
};

/** Forward every chunk, then read {@link streamEmittedOutput} while the stream is live. */
async function emittedWhileLive(chunks: string[]): Promise<boolean> {
  const transform = createPassthroughStreamWithLogger("grok-cli", null, null, "grok-4.6");
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  for (const chunk of chunks) {
    await writer.write(new TextEncoder().encode(chunk));
    // Read one forwarded chunk per write so every observation happened before the live read.
    await reader.read();
  }
  const emitted = streamEmittedOutput(transform);
  // Close + drain so the transform's idle watchdog is cleared and the runner exits.
  await writer.close().catch(() => {});
  while (!(await reader.read().catch(() => ({ done: true }))).done);
  return emitted;
}

// ── flag on ──

test("flag on: output that starts after the first 64 forwarded chunks is reported once a later chunk is probed", async () => {
  assert.equal(await withFlag("true", () => emittedWhileLive(lateOutputChunks())), true);
});

test("flag on: a silent stream of more than 64 chunks reports no output", async () => {
  assert.equal(await withFlag("true", () => emittedWhileLive(silentFrames(0, 209))), false);
});

test("flag on: output within the first 64 forwarded chunks is reported immediately", async () => {
  const chunks = [silentFrame(0), silentFrame(1), contentFrame(2)];
  assert.equal(await withFlag("true", () => emittedWhileLive(chunks)), true);
});

test("flag on: a single late chunk before the next probe stays unreported", async () => {
  const chunks = [...silentFrames(0, 199), contentFrame(199)];
  assert.equal(await withFlag("true", () => emittedWhileLive(chunks)), false);
});

// ── flag off: the release 64-chunk window ──

test("flag off: output that starts after the first 64 forwarded chunks keeps reading false", async () => {
  assert.equal(await withFlag("false", () => emittedWhileLive(lateOutputChunks())), false);
});

test("flag off: output within the first 64 forwarded chunks is still reported", async () => {
  const chunks = [silentFrame(0), silentFrame(1), contentFrame(2)];
  assert.equal(await withFlag("false", () => emittedWhileLive(chunks)), true);
});

// ── firstOutputMs: the true first output, not the probed chunk ──

function withFakeClock<T>(fn: (advance: (ms: number) => void) => T): T {
  const realNow = performance.now.bind(performance);
  let now = 1_000;
  performance.now = () => now;
  try {
    return fn((ms) => {
      now += ms;
    });
  } finally {
    performance.now = realNow;
  }
}

const bytes = (frame: string) => new TextEncoder().encode(frame);

test("probeLateOutput back-fills firstOutputMs to the first output chunk of the sampling gap", () => {
  withFakeClock((advance) => {
    const timing = createStreamTiming({ probeLateOutput: true });
    // Chunks 0..199 silent, output from chunk 199 on; one forwarded chunk per 10 ms.
    for (let i = 0; i < 209; i++) {
      advance(10);
      timing.observeOutput(bytes(i < 199 ? silentFrame(i) : contentFrame(i)));
    }
    // Chunk 199 is forwarded at 1000 + 200 * 10 = 3000 ms; the first probed chunk past it
    // is 208 (a multiple of 16), forwarded 90 ms later. firstOutputMs must be the former.
    assert.equal(timing.firstOutputMs(), 2_000);
  });
});

test("probeLateOutput times output that paused across a negative probe at the gap where it was found", () => {
  withFakeClock((advance) => {
    const timing = createStreamTiming({ probeLateOutput: true });
    // Output at chunk 100 only (between probes 96 and 112), silent afterwards until 130+.
    for (let i = 0; i < 140; i++) {
      advance(10);
      const output = i === 100 || i >= 130;
      timing.observeOutput(bytes(output ? contentFrame(i) : silentFrame(i)));
    }
    // Probe 112 was negative, so chunk 100 is not seen; the first output found is chunk 130
    // (gap 128..144 → probe 144 has not run yet) — nothing reported yet.
    assert.equal(timing.firstOutputMs(), null);
    for (let i = 140; i <= 144; i++) {
      advance(10);
      timing.observeOutput(bytes(contentFrame(i)));
    }
    // Back-filled to chunk 130 (forwarded at 1000 + 131 * 10), an upper bound of the true
    // first output (chunk 100) — documented as approximate for paused output.
    assert.equal(timing.firstOutputMs(), 1_310);
  });
});

test("without probeLateOutput the timing keeps the release 64-chunk window", () => {
  withFakeClock((advance) => {
    const timing = createStreamTiming();
    for (let i = 0; i < 209; i++) {
      advance(10);
      timing.observeOutput(bytes(i < 199 ? silentFrame(i) : contentFrame(i)));
    }
    assert.equal(timing.firstOutputMs(), null);
  });
});

// ── the reported failure: a lone post-output 5xx must not lock the model ──

async function lateOutputFailureLocksModel(flag: "true" | "false"): Promise<boolean> {
  streak.resetPostOutputFailureStreaks();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  const conn = await providersDb.createProviderConnection({
    provider: "grok-cli",
    authType: "apikey",
    apiKey: "grok-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { passthroughModels: true },
  });
  const emitted = await withFlag(flag, () => emittedWhileLive(lateOutputChunks()));
  await auth.markAccountUnavailable(
    conn.id,
    502,
    "Internal error during token generation",
    "grok-cli",
    "grok-4.6",
    null,
    { streamOutputEmitted: emitted }
  );
  return accountFallback.getModelLockoutInfo("grok-cli", conn.id, "grok-4.6") !== null;
}

test("flag on: a lone 5xx after late output stays request-scoped (no model lockout)", async () => {
  assert.equal(await lateOutputFailureLocksModel("true"), false);
});

test("flag off: a lone 5xx after late output keeps the release model lockout", async () => {
  assert.equal(await lateOutputFailureLocksModel("false"), true);
});
