/**
 * POST /v1/systemone when the backend is configured but cannot serve the request right now.
 *
 * Reported on #14667 (live Ollama 0.35.1, 2026-10-05): after a model returned 404
 * model_not_found, or after the host became unreachable, the next call answered
 * 400 "No credentials for provider: ollama-local". The connection exists, so a 400 that
 * reads like a missing key sends the operator to the wrong fix. A temporary block must be
 * 429 with Retry-After; a model the host does not have must say so (404); only a backend
 * with no usable connection at all keeps the 400 "No credentials" error.
 */
import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-unavailable-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "systemone-unavailable-test-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { setRateLimiterTestMode } = await import("../../src/shared/utils/rateLimiter.ts");
const { POST } = await import("../../src/app/api/v1/systemone/route.ts");
const originalFetch = globalThis.fetch;
setRateLimiterTestMode(true);

const QUESTIONS = {
  refund: { type: "noul", instructions: "Is the customer asking for money back?" },
};
const REPLY = { model: "nimble", answers: { refund: { type: "noul", noul: 0.9 } } };

let calls = 0;
function stub(reply: () => Response) {
  calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return reply();
  }) as typeof fetch;
}
function post(model: string) {
  return new Request("http://localhost/v1/systemone", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, state: "I was charged twice.", questions: QUESTIONS }),
  });
}
async function errorOf(response: Response) {
  return ((await response.json()) as { error: { message: string } }).error.message;
}

let connectionId = "";
test.before(async () => {
  await core.ensureDbInitialized();
  connectionId = String(
    (
      await providers.createProviderConnection({
        provider: "ollama-local",
        name: "LAN host",
        isActive: true,
        providerSpecificData: { baseUrl: "http://127.0.0.1:11434/v1" },
      })
    ).id
  );
});
test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await providers.updateProviderConnection(connectionId, {
    isActive: true,
    rateLimitedUntil: null,
    testStatus: "active",
  });
});
test.after(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("a model the host reported missing answers 404 on the next call, without reaching the host", async () => {
  stub(() =>
    Response.json({ error: { message: 'model "clef-flash" not found' } }, { status: 404 })
  );
  assert.equal((await POST(post("ollama-local/clef-flash"))).status, 404);

  const again = await POST(post("ollama-local/clef-flash"));

  assert.equal(again.status, 404);
  assert.doesNotMatch(await errorOf(again), /No credentials/);
  assert.equal(calls, 1, "the locked model is not sent upstream again");

  // The lockout is per model: the same host keeps serving the others.
  stub(() => Response.json(REPLY));
  assert.equal((await POST(post("ollama-local/nimble"))).status, 200);
});

test("an unreachable host cools the connection down: the next call is 429 with Retry-After", async () => {
  stub(() => {
    throw new Error("connect ECONNREFUSED 127.0.0.1:11434");
  });
  assert.equal((await POST(post("ollama-local/nimble"))).status, 502);

  const again = await POST(post("ollama-local/nimble"));

  assert.equal(again.status, 429);
  assert.ok(Number(again.headers.get("Retry-After")) > 0, "Retry-After is set");
  assert.doesNotMatch(await errorOf(again), /No credentials/);
  assert.equal(calls, 1);
});

test("a backend with no active connection keeps the 400 'No credentials' error", async () => {
  await providers.updateProviderConnection(connectionId, { isActive: false });
  stub(() => Response.json(REPLY));

  const response = await POST(post("ollama-local/nimble"));

  assert.equal(response.status, 400);
  assert.match(await errorOf(response), /No credentials for provider: ollama-local/);
  assert.equal(calls, 0);
});
