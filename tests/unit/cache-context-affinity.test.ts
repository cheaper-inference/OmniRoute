import assert from "node:assert/strict";
import { after, test } from "node:test";
import { prepareUpstreamBody } from "../../open-sse/handlers/chatCore/upstreamBody.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

after(() => resetDbInstance());
const messages = [
  { role: "system", content: "Stable instructions" },
  { role: "user", content: "Hello" },
];
async function prepare(
  session: string,
  principal = "tenant-a",
  extra: Record<string, unknown> = {}
) {
  return prepareUpstreamBody({
    translatedBody: { messages },
    modelToCall: "gpt-5.5",
    provider: "openai",
    targetFormat: "openai",
    credentials: { connectionId: "account-a" },
    rawBody: { messages },
    clientRawRequest: { headers: new Headers({ "X-Claude-Code-Session-Id": session }) },
    cachePrincipalId: principal,
    ...extra,
  });
}
test("real preparation scopes opaque cache keys to session and authenticated tenant before prefix fallback", async () => {
  const a = await prepare("session-a");
  assert.equal(a.prompt_cache_key, (await prepare("session-a")).prompt_cache_key);
  assert.notEqual(a.prompt_cache_key, (await prepare("session-b")).prompt_cache_key);
  assert.notEqual(a.prompt_cache_key, (await prepare("session-a", "tenant-b")).prompt_cache_key);
  assert.match(String(a.prompt_cache_key), /^omni-session-[a-f0-9]{64}$/);
  assert.equal(String(a.prompt_cache_key).includes("tenant-a"), false);
  assert.deepEqual(messages, [
    { role: "system", content: "Stable instructions" },
    { role: "user", content: "Hello" },
  ]);
});
test("metadata-only sessions survive translation; explicit caller keys retain precedence", async () => {
  const headers = { headers: {} };
  const opts = {
    clientRawRequest: headers,
    rawBody: { metadata: { user_id: JSON.stringify({ session_id: "metadata-a" }) } },
  };
  const a = await prepare("unused", "tenant-a", opts);
  const b = await prepare("unused", "tenant-a", { ...opts, rawBody: { session_id: "metadata-b" } });
  assert.notEqual(a.prompt_cache_key, b.prompt_cache_key);
  assert.equal(
    (
      await prepare("s", "tenant-a", {
        translatedBody: { messages, prompt_cache_key: "client-key" },
      })
    ).prompt_cache_key,
    "client-key"
  );
});
test("account, provider and model boundaries remain distinct across OpenAI and Codex", async () => {
  const base = (await prepare("session-a")).prompt_cache_key;
  for (const extra of [
    { credentials: { connectionId: "account-b" } },
    { modelToCall: "gpt-5.4" },
    { provider: "codex", targetFormat: "codex" },
  ]) {
    const out = await prepare("session-a", "tenant-a", extra);
    assert.match(String(out.prompt_cache_key), /^omni-session-[a-f0-9]{64}$/);
    assert.notEqual(out.prompt_cache_key, base);
  }
  const rawKey = await prepare("s", "tenant-a", {
    rawBody: { prompt_cache_key: "explicit-original" },
    translatedBody: { messages, prompt_cache_key: "" },
  });
  assert.equal(rawKey.prompt_cache_key, "explicit-original");
  for (const user_id of [
    "{",
    "[]",
    JSON.stringify({ session_id: "bad/session" }),
    "x".repeat(8193),
  ]) {
    const out = await prepare("s", "tenant-a", {
      clientRawRequest: { headers: {} },
      rawBody: { metadata: { user_id } },
    });
    assert.equal(String(out.prompt_cache_key || "").startsWith("omni-session-"), false);
  }
});
test("unsupported formats, missing trusted principals and cache opt-out never synthesize session keys", async () => {
  for (const extra of [
    { targetFormat: "claude" },
    { provider: "anthropic" },
    { cachePrincipalId: null },
    { credentials: { providerSpecificData: { cache: { supportsPromptCaching: false } } } },
  ]) {
    const out = await prepare("session-a", "tenant-a", extra);
    assert.equal(String(out.prompt_cache_key || "").startsWith("omni-session-"), false);
  }
  for (const session of ["bad space", "a".repeat(129), "bad/session"]) {
    assert.equal(
      String((await prepare(session)).prompt_cache_key || "").startsWith("omni-session-"),
      false
    );
  }
});
