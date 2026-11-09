// The kimi-web and deepseek-web "Test connection" probes used to call fetch() with no
// deadline: a stalled/black-holed upstream (or a proxy that swallows the request) left
// the dashboard Test button spinning and the socket open forever. Both probes must now
// carry an AbortSignal and settle as a sanitized timeout failure once the deadline hits.
import { test, mock, afterEach } from "node:test";
import assert from "node:assert/strict";

const A = await import("../../src/lib/providers/validation/webProvidersA.ts");

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  mock.timers.reset();
});

type ProbeResult = { valid: boolean; error: string | null; timeout?: boolean };

// A fetch that never answers: it only settles when the caller's signal aborts.
function installHangingFetch(seen: { signal?: AbortSignal | null; url?: string }) {
  globalThis.fetch = ((url: string | URL | Request, init: RequestInit = {}) => {
    seen.url = String(url);
    seen.signal = init.signal;
    return new Promise<Response>((_resolve, reject) => {
      const signal = init.signal;
      if (!signal) return; // no deadline → hangs forever (the bug)
      if (signal.aborted) {
        reject(Object.assign(new Error("This operation was aborted"), { name: "AbortError" }));
        return;
      }
      signal.addEventListener(
        "abort",
        () =>
          reject(Object.assign(new Error("This operation was aborted"), { name: "AbortError" })),
        { once: true }
      );
    });
  }) as typeof fetch;
}

async function settleWithin<T>(promise: Promise<T>, label: string): Promise<T | "PENDING"> {
  const sentinel = Symbol("pending");
  const raced = await Promise.race([
    promise,
    new Promise<symbol>((resolve) => setImmediate(() => setImmediate(() => resolve(sentinel)))),
  ]);
  if (raced === sentinel) {
    assert.fail(`${label} probe never settled — no deadline on the upstream fetch`);
  }
  return raced as T;
}

async function runHangingProbe(
  label: string,
  urlFragment: string,
  call: () => Promise<ProbeResult>
): Promise<ProbeResult> {
  mock.timers.enable({ apis: ["setTimeout"] });
  const seen: { signal?: AbortSignal | null; url?: string } = {};
  installHangingFetch(seen);

  const pending = call();
  // Let the validator reach its fetch() call before advancing the fake clock.
  await new Promise((resolve) => setImmediate(resolve));
  assert.ok(seen.url?.includes(urlFragment), `${label} probe hit ${seen.url}`);
  assert.ok(seen.signal instanceof AbortSignal, `${label} probe passes an AbortSignal`);

  mock.timers.tick(60_000);
  const result = await settleWithin(pending, label);
  return result as ProbeResult;
}

function assertTimeoutFailure(result: ProbeResult, label: string) {
  assert.equal(result.valid, false, `${label} must fail on timeout`);
  assert.equal(result.timeout, true, `${label} result is classified as a timeout`);
  assert.equal(typeof result.error, "string");
  assert.match(String(result.error), /timed out/i);
  assert.ok(!String(result.error).includes("at /"), `${label} error leaks no stack trace`);
}

test("kimi-web validation probe times out instead of hanging on a stalled upstream", async () => {
  const result = await runHangingProbe("kimi-web", "www.kimi.ai/api/user", () =>
    A.validateKimiWebProvider({ apiKey: "kimi-session-token" })
  );
  assertTimeoutFailure(result, "kimi-web");
});

test("deepseek-web validation probe times out instead of hanging on a stalled upstream", async () => {
  const result = await runHangingProbe(
    "deepseek-web",
    "chat.deepseek.com/api/v0/users/current",
    () => A.validateDeepSeekWebProvider({ apiKey: "deepseek-user-token" })
  );
  assertTimeoutFailure(result, "deepseek-web");
});

test("probe deadline is not tripped by a healthy upstream (timer cleared)", async () => {
  globalThis.fetch = (async (_url: string | URL | Request, init: RequestInit = {}) => {
    assert.ok(init.signal instanceof AbortSignal);
    return Response.json({ id: "user-1" });
  }) as typeof fetch;
  const result = (await A.validateKimiWebProvider({ apiKey: "kimi-session-token" })) as ProbeResult;
  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});
