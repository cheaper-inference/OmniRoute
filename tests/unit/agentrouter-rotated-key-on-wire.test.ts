/**
 * agentrouter uses the Claude Code wire image with `x-api-key` auth. The key on the
 * wire must be the key the extra-keys rotator selected (the one key health is
 * charged to), not always the primary key. An empty primary key with extra keys
 * (#8467) must not send an empty `x-api-key`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const realFetch = globalThis.fetch;
const KEY_BY_ID: Record<string, string> = {
  primary: "KEY-PRIMARY",
  extra_0: "KEY-EXTRA-1",
  extra_1: "KEY-EXTRA-2",
};

function stubFetch(): string[] {
  const sent: string[] = [];
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    if (!init?.body) return new Response("{}", { status: 200 });
    const headers = (init.headers ?? {}) as Record<string, string>;
    sent.push(String(Object.entries(headers).find(([n]) => n.toLowerCase() === "x-api-key")?.[1]));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return sent;
}

async function send(connectionId: string, apiKey: string) {
  const credentials = {
    apiKey,
    connectionId,
    providerSpecificData: { extraApiKeys: ["KEY-EXTRA-1", "KEY-EXTRA-2"] } as Record<
      string,
      unknown
    >,
  };
  await new DefaultExecutor("agentrouter").execute({
    model: "claude-sonnet-4-5",
    body: {
      model: "claude-sonnet-4-5",
      max_tokens: 8,
      messages: [{ role: "user", content: "hi" }],
    },
    stream: false,
    credentials,
  } as never);
  return credentials.providerSpecificData.selectedKeyId as string;
}

test.afterEach(() => {
  globalThis.fetch = realFetch;
});

test("the x-api-key on the wire is the rotated key, request after request", async () => {
  const sent = stubFetch();
  const selected: string[] = [];
  for (let i = 0; i < 3; i++) selected.push(await send("agentrouter-rot-1", "KEY-PRIMARY"));
  assert.equal(new Set(selected).size, 3, `rotation must visit every key: ${selected}`);
  assert.deepEqual(
    sent,
    selected.map((id) => KEY_BY_ID[id])
  );
});

test("an empty primary key with extra keys never sends an empty x-api-key", async () => {
  const sent = stubFetch();
  for (let i = 0; i < 2; i++) await send("agentrouter-rot-2", "");
  assert.equal(sent.length, 2, "both requests must reach the fetch stub");
  for (const key of sent) assert.match(key, /^KEY-EXTRA-/);
});
