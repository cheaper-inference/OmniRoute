import test from "node:test";
import assert from "node:assert/strict";
import {
  INTERNAL_UPSTREAM_START_TIMEOUT_HEADER,
  resolveInternalUpstreamStartTimeoutMs,
} from "../../src/sse/services/internalUpstreamStartTimeout.ts";

const oldKey = process.env.OMNIROUTE_API_KEY;
process.env.OMNIROUTE_API_KEY = "trusted-internal-test-key";

test.after(() => {
  if (oldKey === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = oldKey;
});

function req(value: string, bearer = "trusted-internal-test-key", bypass = "internal") {
  return new Request("http://127.0.0.1:20128/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${bearer}`,
      "x-omniroute-admission-bypass": bypass,
      [INTERNAL_UPSTREAM_START_TIMEOUT_HEADER]: value,
    },
  });
}

test("trusted internal caller may set a bounded upstream-start cap", () => {
  assert.equal(resolveInternalUpstreamStartTimeoutMs(req("5000")), 5000);
  assert.equal(resolveInternalUpstreamStartTimeoutMs(req("200")), 1000);
  assert.equal(resolveInternalUpstreamStartTimeoutMs(req("99999")), 15000);
});

test("ordinary or forged callers cannot set the internal upstream-start cap", () => {
  assert.equal(resolveInternalUpstreamStartTimeoutMs(req("5000", "wrong-key")), undefined);
  assert.equal(
    resolveInternalUpstreamStartTimeoutMs(req("5000", "trusted-internal-test-key", "no")),
    undefined
  );
});

test("invalid timeout hints are ignored", () => {
  assert.equal(resolveInternalUpstreamStartTimeoutMs(req("5s")), undefined);
  assert.equal(resolveInternalUpstreamStartTimeoutMs(req("0")), undefined);
  assert.equal(resolveInternalUpstreamStartTimeoutMs(req("-1")), undefined);
});

test("trusted request cap is honored without lengthening provider/connection deadlines", async () => {
  const { executeWithUpstreamStartTimeout } =
    await import("../../open-sse/handlers/chatCore/upstreamTimeouts.ts");
  const hint = resolveInternalUpstreamStartTimeoutMs(req("20"));
  assert.equal(hint, 1000);
  const exec = (signal: AbortSignal) =>
    new Promise<never>((_resolve, reject) => {
      if (signal.aborted) {
        reject(signal.reason);
        return;
      }
      signal.addEventListener("abort", () => reject(signal.reason), { once: true });
    });
  for (const { configuredMs, capMs, expectedMs } of [
    { configuredMs: 25, capMs: hint, expectedMs: 25 },
    { configuredMs: 1500, capMs: 15, expectedMs: 15 },
  ]) {
    await assert.rejects(
      executeWithUpstreamStartTimeout({
        executor: { getTimeoutMs: () => configuredMs },
        provider: "openai",
        model: "test-model",
        connectionTimeoutMs: configuredMs,
        requestTimeoutMs: capMs,
        signal: new AbortController().signal,
        execute: exec,
      }),
      (error: unknown) =>
        error instanceof Error &&
        error.name === "TimeoutError" &&
        error.message.includes("after " + expectedMs + "ms")
    );
  }
});

test("short request cap carries local-only error code, not an account-health timeout", async () => {
  const { executeWithUpstreamStartTimeout } =
    await import("../../open-sse/handlers/chatCore/upstreamTimeouts.ts");
  const pending = (signal: AbortSignal) =>
    new Promise<never>((_resolve, reject) => {
      if (signal.aborted) {
        reject(signal.reason);
        return;
      }
      signal.addEventListener("abort", () => reject(signal.reason), { once: true });
    });
  const run = (capMs: number | undefined, configuredMs: number) =>
    executeWithUpstreamStartTimeout({
      executor: { getTimeoutMs: () => configuredMs },
      provider: "antigravity",
      model: "gemini-test",
      connectionTimeoutMs: configuredMs,
      requestTimeoutMs: capMs,
      signal: new AbortController().signal,
      execute: pending,
    });
  await assert.rejects(
    run(15, 100),
    (error: unknown) =>
      error instanceof Error &&
      (error as Error & { code?: string }).code === "REQUEST_SCOPED_UPSTREAM_TIMEOUT"
  );
  await assert.rejects(
    run(100, 15),
    (error: unknown) =>
      error instanceof Error &&
      (error as Error & { code?: string }).code === "ANTIGRAVITY_PRE_RESPONSE_TIMEOUT"
  );
});
