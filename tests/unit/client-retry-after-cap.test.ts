// Opt-in cap (CLIENT_RETRY_AFTER_MAX_SECONDS) on the Retry-After header sent to clients.
// The account rest is computed from the upstream header inside the handler, so it stays
// full length; only the copy that leaves the gateway is capped.
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("client-retry-after-cap");
const providersDb = await import("../../src/lib/db/providers.ts");
const originalFetch = globalThis.fetch;
const FLAG = "CLIENT_RETRY_AFTER_MAX_SECONDS";

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env[FLAG];
});
test.after(() => h.cleanup());

let lastConnectionId = "";

/** One non-streaming request whose upstream answers 429 with the given Retry-After value. */
async function upstream429(retryAfter: string) {
  await h.resetStorage();
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: { message: "slow down", type: "rate_limit_error" } }), {
      status: 429,
      headers: { "content-type": "application/json", "retry-after": retryAfter },
    })) as typeof fetch;
  const connection = await h.seedConnection("openai", { name: "retry-after-cap" });
  lastConnectionId = String((connection as { id: string }).id);
  const res = await h.handleChat(
    h.buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  await res.text();
  return res;
}

test("flag unset: a long upstream Retry-After reaches the client unchanged", async () => {
  const res = await upstream429("7200");
  assert.equal(res.status, 429);
  assert.ok(Number(res.headers.get("retry-after")) > 900, `got ${res.headers.get("retry-after")}`);
});

test("flag set: a seconds Retry-After above the cap is lowered to the cap", async () => {
  process.env[FLAG] = "900";
  const res = await upstream429("7200");
  assert.equal(res.status, 429);
  assert.equal(res.headers.get("retry-after"), "900");
});

test("flag set: the account still rests for the full upstream window", async () => {
  process.env[FLAG] = "900";
  await upstream429("7200");
  const row = (await providersDb.getProviderConnectionById(lastConnectionId)) as {
    rateLimitedUntil: string;
  };
  const restSeconds = (new Date(row.rateLimitedUntil).getTime() - Date.now()) / 1000;
  assert.ok(restSeconds > 7000, `account rest was cut to ${restSeconds} s`);
});

test("flag set: an HTTP-date Retry-After above the cap is lowered to the cap", async () => {
  process.env[FLAG] = "900";
  const res = await upstream429(new Date(Date.now() + 2 * 3600 * 1000).toUTCString());
  assert.equal(res.status, 429);
  assert.equal(res.headers.get("retry-after"), "900");
});

test("flag set: a Retry-After below the cap is left alone", async () => {
  process.env[FLAG] = "900";
  const res = await upstream429("1");
  assert.equal(res.status, 429);
  assert.equal(res.headers.get("retry-after"), "1");
});
