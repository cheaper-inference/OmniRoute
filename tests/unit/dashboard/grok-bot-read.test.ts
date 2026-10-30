import test from "node:test";
import assert from "node:assert/strict";

const { grokBotRead } = await import("../../../src/app/(dashboard)/dashboard/grok-bot/read.ts");

test("read posts the method and bearer without returning the token", async () => {
  const calls: Array<{ url: string; auth: string; body: string }> = [];
  const result = await grokBotRead({
    accessToken: "secret-token",
    method: "ListGrokBotAgents",
    payload: {},
    fetch: async (url, init) => {
      const headers = new Headers(init?.headers);
      calls.push({
        url: String(url),
        auth: headers.get("authorization") ?? "",
        body: String(init?.body ?? ""),
      });
      return new Response(JSON.stringify({ agents: [] }), { status: 200 });
    },
  });

  assert.deepEqual(result, { agents: [] });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api2.cursor.sh/aiserver.v1.GrokBotService/ListGrokBotAgents");
  assert.equal(calls[0].auth.endsWith("secret-token"), true);
  assert.equal(JSON.stringify(result).includes("secret-token"), false);
});

test("read marks an unauthorized response with its status", async () => {
  await assert.rejects(
    grokBotRead({
      accessToken: "secret-token",
      method: "ListGrokBotAgents",
      payload: {},
      fetch: async () => new Response("{}", { status: 401 }),
    }),
    (error: unknown) => (error as { status?: number }).status === 401
  );
});

test("read rejects a body that is not json", async () => {
  await assert.rejects(
    grokBotRead({
      accessToken: "secret-token",
      method: "ListGrokBotAgents",
      payload: {},
      fetch: async () => new Response("not-json", { status: 200 }),
    }),
    /invalid_json/
  );
});
