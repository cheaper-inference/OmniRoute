import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  grokBotSendAction,
  grokBotCardAction,
} from "../../../src/app/api/providers/[id]/grok-bot/actions.ts";
import { grokBotAgentAccess } from "../../../src/app/api/providers/[id]/grok-bot/access.ts";

const connection = { id: "c-1", provider: "grok-bot", accessToken: "stored" };
const calls: Array<{ method: string; payload: Record<string, unknown> }> = [];
let sendAnswer: unknown = { delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_ACCEPTED_BOX" };
let statusAnswer: unknown = { status: "UNKNOWN_DURABILITY" };
let actionAnswer: unknown = { accepted: true };
let throwMethod = "";
let throwValue: unknown = null;

async function token() {
  return { accessToken: "fresh" };
}

async function read(input: { method: string; payload: Record<string, unknown> }) {
  calls.push({ method: input.method, payload: input.payload });
  if (input.method === throwMethod) throw throwValue;
  if (input.method === "ListGrokBotAgents") {
    return { agents: [{ agentId: "a-1", name: "bot" }] };
  }
  if (input.method === "SendGrokBotUserMessage") return sendAnswer;
  if (input.method === "GetGrokBotSendStatus") return statusAnswer;
  if (input.method === "ResolveGrokBotLocalToolPermission") return actionAnswer;
  if (
    [
      "RespondGrokBotWidget",
      "DismissGrokBotWidget",
      "ResolveGrokBotConnectorGrant",
      "SubmitGrokBotSecret",
      "DiscardGrokBotDraft",
    ].includes(input.method)
  )
    return actionAnswer;
  throw new Error(`unexpected method: ${input.method}`);
}

function deps() {
  return {
    read,
    access: (conn: typeof connection, agentId: string) =>
      grokBotAgentAccess(conn, agentId, { token, read }),
  };
}

test("a valid bot is listed before the send is dispatched", async () => {
  calls.length = 0;
  sendAnswer = { delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_ACCEPTED_BOX" };
  const response = await grokBotSendAction(
    connection,
    { agentId: "a-1", text: "hello", messageId: "m-1" },
    deps()
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "submitted" });
  assert.deepEqual(
    calls.map((call) => call.method),
    ["ListGrokBotAgents", "SendGrokBotUserMessage"]
  );
});

test("a delivery refusal is not reported as submitted", async () => {
  calls.length = 0;
  sendAnswer = {
    delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_REFUSED",
    refusal: { failureCode: "send/agent-unavailable", message: "upstream said no" },
  };
  const response = await grokBotSendAction(
    connection,
    { agentId: "a-1", text: "hello", messageId: "m-2" },
    deps()
  );
  assert.notEqual(response.status, 200);
  const body = (await response.json()) as {
    status?: string;
    refusal?: { failureCode?: string; message?: string };
  };
  assert.equal(body.status, "refused");
  assert.equal(body.refusal?.failureCode, "send/agent-unavailable");
  assert.equal("message" in (body.refusal ?? {}), false);
  assert.equal(JSON.stringify(body).includes("upstream said no"), false);
});

test("an uncertain send becomes submitted only after an accepted status", async () => {
  calls.length = 0;
  sendAnswer = { delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_UNKNOWN_DURABILITY" };
  statusAnswer = { status: "ACCEPTED" };
  const response = await grokBotSendAction(
    connection,
    { agentId: "a-1", text: "hello", messageId: "m-status" },
    deps()
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "submitted" });
  assert.deepEqual(
    calls.map((call) => call.method),
    ["ListGrokBotAgents", "SendGrokBotUserMessage", "GetGrokBotSendStatus"]
  );
  calls.length = 0;
  statusAnswer = { status: "UNKNOWN_DURABILITY" };
  const pending = await grokBotSendAction(
    connection,
    { agentId: "a-1", text: "hello", messageId: "m-status" },
    deps()
  );
  assert.equal(pending.status, 502);
  assert.equal((await pending.json()).status, "unknown");
  calls.length = 0;
  sendAnswer = { delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_REFUSED" };
  statusAnswer = { status: "ACCEPTED" };
  const refused = await grokBotSendAction(
    connection,
    { agentId: "a-1", text: "hello", messageId: "m-status" },
    deps()
  );
  assert.equal(refused.status, 502);
  assert.equal((await refused.json()).status, "refused");
  assert.deepEqual(
    calls.map((call) => call.method),
    ["ListGrokBotAgents", "SendGrokBotUserMessage"]
  );
});

test("an agent outside the connection roster is rejected before Send", async () => {
  calls.length = 0;
  sendAnswer = { delivery: "GROK_BOT_USER_MESSAGE_DELIVERY_ACCEPTED_BOX" };
  const response = await grokBotSendAction(
    connection,
    { agentId: "someone-elses-bot", text: "hello", messageId: "m-3" },
    deps()
  );
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "agent_not_found" });
  assert.deepEqual(
    calls.map((call) => call.method),
    ["ListGrokBotAgents"]
  );
});

test("a permission refusal is not reported as dispatched", async () => {
  calls.length = 0;
  actionAnswer = {
    accepted: false,
    refusal: { failureCode: "local-tool-permission/stale", message: "stale" },
  };
  const response = await grokBotCardAction(
    connection,
    {
      method: "ResolveGrokBotLocalToolPermission",
      payload: { agentId: "a-1", entryId: "e-1", requestId: "r-1", resolution: 2 },
      success: "dispatched",
    },
    deps()
  );
  assert.notEqual(response.status, 200);
  const body = (await response.json()) as { status?: string };
  assert.equal(body.status, "refused");
});

test("a null error during roster lookup becomes an upstream error, not a route crash", async () => {
  calls.length = 0;
  throwMethod = "ListGrokBotAgents";
  throwValue = null;
  const response = await grokBotSendAction(
    connection,
    { agentId: "a-1", text: "hello", messageId: "m-null" },
    deps()
  );
  throwMethod = "";
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { error: "upstream_unavailable" });
});

test("a primitive error during a card action becomes an unknown outcome", async () => {
  calls.length = 0;
  throwMethod = "ResolveGrokBotLocalToolPermission";
  throwValue = "boom";
  const response = await grokBotCardAction(
    connection,
    {
      method: "ResolveGrokBotLocalToolPermission",
      payload: { agentId: "a-1", entryId: "e-1", requestId: "r-1", resolution: 2 },
      success: "dispatched",
    },
    deps()
  );
  throwMethod = "";
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { status: "unknown" });
});

test("empty card routes reject an empty upstream answer", () => {
  for (const name of ["permission", "secret", "draft", "widget", "connector"]) {
    const source = readFileSync(
      new URL(`../../../src/app/api/providers/[id]/grok-bot/${name}/route.ts`, import.meta.url),
      "utf8"
    );
    assert.match(source, /allowEmpty:\s*false/);
  }
});

const cardRoutes = [
  {
    name: "permission",
    method: "ResolveGrokBotLocalToolPermission",
    payload: { agentId: "a-1", entryId: "e-1", requestId: "r-1", resolution: 2 },
    allowEmpty: false,
  },
  {
    name: "widget",
    method: "RespondGrokBotWidget",
    payload: { agentId: "a-1", entryId: "e-1", value: "choice" },
    allowEmpty: false,
  },
  {
    name: "connector",
    method: "ResolveGrokBotConnectorGrant",
    payload: { agentId: "a-1", entryId: "e-1", requestId: "r-1", resolution: 1 },
    allowEmpty: false,
  },
  {
    name: "secret",
    method: "SubmitGrokBotSecret",
    payload: { agentId: "a-1", entryId: "e-1", value: "not-a-real-secret" },
    allowEmpty: false,
  },
  {
    name: "draft",
    method: "DiscardGrokBotDraft",
    payload: { agentId: "a-1", entryId: "e-1" },
    allowEmpty: false,
  },
] as const;

for (const route of cardRoutes) {
  test(`${route.name} refusal is surfaced instead of success`, async () => {
    calls.length = 0;
    actionAnswer = { accepted: false, refusal: { failureCode: `${route.name}/stale` } };
    const response = await grokBotCardAction(
      connection,
      {
        method: route.method,
        payload: route.payload,
        success: route.name === "widget" || route.name === "connector" ? "dispatched" : "submitted",
        allowEmpty: route.allowEmpty,
      },
      deps()
    );
    assert.notEqual(response.status, 200);
    const body = (await response.json()) as { status?: string };
    assert.equal(body.status, "refused");
  });

  test(`${route.name} acceptance keeps its successful result`, async () => {
    calls.length = 0;
    actionAnswer = { dispatched: true };
    const response = await grokBotCardAction(
      connection,
      {
        method: route.method,
        payload: route.payload,
        success: route.name === "widget" || route.name === "connector" ? "dispatched" : "submitted",
        allowEmpty: route.allowEmpty,
      },
      deps()
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as { status?: string };
    assert.ok(body.status === "submitted" || body.status === "dispatched");
  });
}
