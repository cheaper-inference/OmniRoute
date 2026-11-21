import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("muse-multi-account-plain-history");
const providersDb = await import("../../src/lib/db/providers.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { handleChat, resetStorage } = harness;

const MODEL = "muse-code/muse-spark-1.3-contributor";

function request(session: string, extra: Record<string, unknown> = {}) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", "x-session-id": session },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      messages: [
        { role: "user", content: "Read the fixture." },
        {
          role: "assistant",
          tool_calls: [
            { id: "foreign-call", type: "function", function: { name: "read", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "foreign-call", content: "fixture contents" },
        { role: "user", content: "Continue." },
      ],
      ...extra,
    }),
  });
}

async function seedAccounts() {
  for (const name of ["a", "b"]) {
    await providersDb.createProviderConnection({
      provider: "muse-code",
      authType: "oauth",
      name: `fixture-${name}`,
      accessToken: `fixture-key-${name}`,
      refreshToken: `dca:fixture-${name}`,
      isActive: true,
      testStatus: "active",
    });
  }
}

function stubUpstream() {
  const calls: string[] = [];
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    assert.match(String(url), /\/responses$/, "only the inference request should reach transport");
    calls.push(new Headers(init?.headers).get("authorization") || "");
    return Response.json({
      id: `resp_fixture_${calls.length}`,
      object: "response",
      status: "completed",
      output: [
        { type: "message", role: "assistant", content: [{ type: "output_text", text: "OK" }] },
      ],
      usage: { input_tokens: 5, output_tokens: 1, total_tokens: 6 },
    });
  }) as typeof fetch;
  return calls;
}

test.beforeEach(async () => {
  await resetStorage();
  clearAllModelLockouts();
});

test.after(async () => {
  clearAllModelLockouts();
  await harness.cleanup();
});

test("imported chat tool history rotates fresh sessions, then keeps their chosen account", async () => {
  await seedAccounts();
  const calls = stubUpstream();
  for (const session of ["fresh-a", "fresh-b", "fresh-a"]) {
    const response = await handleChat(request(session));
    const text = await response.text();
    assert.equal(response.status, 200, text);
    assert.match(text, /OK/);
  }
  assert.equal(calls.length, 3);
  assert.notEqual(calls[0], calls[1], "fresh sessions should use the existing rotation");
  assert.equal(calls[2], calls[0], "continuing a session must not change its owner");
});

test("a foreign response id never reaches either OAuth account", async () => {
  await seedAccounts();
  const calls = stubUpstream();
  const response = await handleChat(
    request("foreign-response", { previous_response_id: "resp_unknown" })
  );
  assert.equal(response.status, 409, await response.text());
  assert.equal(calls.length, 0);
});
