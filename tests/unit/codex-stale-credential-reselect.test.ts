import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("codex-stale-credential-reselect");
const providers = await import("../../src/lib/db/providers.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "bridge-secret";
const { POST: prepareResponsesWs } =
  await import("../../src/app/api/internal/codex-responses-ws/route.ts");
const originalFetch = globalThis.fetch;

type Db = ReturnType<typeof getDbInstance>;
const FENCE_READ = "JOIN codex_connection_fences";

function success() {
  return Response.json({
    id: "resp_reselect",
    object: "response",
    status: "completed",
    model: "gpt-5.6-sol",
    output: [
      {
        id: "msg_reselect",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "ok", annotations: [] }],
      },
    ],
    usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
  });
}

function streamSuccess() {
  return new Response(
    [
      'event: response.created\ndata: {"type":"response.created","response":{"id":"resp_reselect","model":"gpt-5.6-sol"}}\n\n',
      'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"ok"}\n\n',
      'event: response.completed\ndata: {"type":"response.completed","response":{"id":"resp_reselect","model":"gpt-5.6-sol","status":"completed","output":[],"usage":{"input_tokens":4,"output_tokens":2,"total_tokens":6}}}\n\n',
    ].join(""),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

async function seed() {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    testStatus: "active",
    isActive: true,
    accessToken: "synthetic-a",
    email: "a@example.invalid",
    providerSpecificData: { workspaceId: "workspace-a", autoFetchModels: false },
  });
}

function invoke(id: string, stream = false) {
  return harness.handleChat(
    harness.buildRequest({
      url: "http://localhost/v1/responses",
      headers: { "x-omniroute-connection-id": id },
      body: { model: "codex/gpt-5.6-sol", input: "offline stale selection", stream },
    })
  );
}

/** Dispatches stay offline; every bearer token that reached the mocked upstream is recorded. */
function recordDispatches(respond: (attempt: number) => Response | Promise<Response> = success) {
  const tokens: string[] = [];
  globalThis.fetch = async (url, init) => {
    assert.ok(String(url).includes("/codex/responses"), "only the mocked generation is authorized");
    tokens.push(new Headers(init?.headers).get("authorization") ?? "");
    return respond(tokens.length);
  };
  return tokens;
}

/**
 * Runs `mutate` immediately before a fence read issued from `frame`, which is the only way to land
 * a concurrent write inside the window between two awaits of the real request path.
 */
function beforeFenceRead(frame: RegExp | null, mutate: (db: Db) => void, once = true) {
  const db = getDbInstance();
  const prepare = db.prepare;
  let fired = false;
  db.prepare = function patched(this: Db, sql: string) {
    if (String(sql).includes(FENCE_READ) && !(once && fired)) {
      if (!frame || frame.test(new Error().stack ?? "")) {
        fired = true;
        db.prepare = prepare;
        mutate(db);
        if (!once) db.prepare = patched as typeof db.prepare;
      }
    }
    return prepare.call(this, sql);
  } as typeof db.prepare;
  return () => {
    db.prepare = prepare;
    return fired;
  };
}

const rotate = (id: string, token: string) => (db: Db) => {
  db.prepare("UPDATE provider_connections SET access_token = ? WHERE id = ?").run(token, id);
  invalidateDbCache("connections");
};

async function assertAccountUntouched(id: string) {
  const after = await providers.getProviderConnectionById(id);
  assert.equal(after?.testStatus, "active");
  assert.equal(after?.rateLimitedUntil ?? null, null);
  assert.equal(after?.lastError ?? null, null);
  assert.equal(after?.backoffLevel ?? 0, 0);
}

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    hideAutoCombos: true,
    blockedProviders: ["aihorde"],
  });
});
test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await harness.callLogsDb.waitForCallLogSaves(10_000);
  await harness.resetStorage();
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await harness.cleanup();
});

test("a same-account retry after a same-owner rotation dispatches the current token", async () => {
  const connection = await seed();
  const tokens = recordDispatches(async (attempt) => {
    if (attempt > 1) return success();
    await providers.updateProviderConnection(connection.id, { accessToken: "synthetic-a2" });
    return Response.json({ error: { message: "upstream connect error" } }, { status: 502 });
  });
  const response = await invoke(connection.id);
  assert.equal(response.status, 200);
  await response.text();
  assert.deepEqual(tokens, ["Bearer synthetic-a", "Bearer synthetic-a2"]);
  await assertAccountUntouched(connection.id);
});

for (const [stage, frame] of [
  ["proactive refresh", /checkAndRefreshToken/],
  ["handleChatCore admission", /handleChatCore/],
  ["the attempt dispatch", /executeProviderRequest/],
] as const) {
  for (const stream of [false, true]) {
    const mode = stream ? "streaming" : "non-streaming";
    test(`rotation during ${stage} reselects instead of failing a ${mode} client`, async () => {
      const connection = await seed();
      const tokens = recordDispatches(stream ? streamSuccess : success);
      const restore = beforeFenceRead(frame, rotate(connection.id, "synthetic-a2"));
      const response = await invoke(connection.id, stream);
      assert.equal(restore(), true, "the concurrent rotation must have landed");
      assert.equal(response.status, 200);
      await response.text();
      assert.deepEqual(tokens, ["Bearer synthetic-a2"]);
      await assertAccountUntouched(connection.id);
    });
  }
}

test("a replaced owner never receives the old account's token or a cooldown", async () => {
  const connection = await seed();
  const tokens = recordDispatches();
  const restore = beforeFenceRead(/handleChatCore/, (db) => {
    db.prepare("UPDATE provider_connections SET access_token = ?, email = ? WHERE id = ?").run(
      "synthetic-b",
      "b@example.invalid",
      connection.id
    );
    invalidateDbCache("connections");
  });
  const response = await invoke(connection.id);
  assert.equal(restore(), true);
  assert.equal(response.status, 200);
  await response.text();
  assert.deepEqual(tokens, ["Bearer synthetic-b"]);
  await assertAccountUntouched(connection.id);
});

test("reselection is bounded: a selection that stays stale surfaces 409 and no cooldown", async () => {
  const connection = await seed();
  const tokens = recordDispatches();
  let generation = 0;
  const restore = beforeFenceRead(
    /checkAndRefreshToken/,
    (db) => rotate(connection.id, `synthetic-rotated-${++generation}`)(db),
    false
  );
  const response = await invoke(connection.id);
  restore();
  assert.equal(response.status, 409);
  const body = (await response.json()) as { error: { message: string } };
  assert.match(body.error.message, /Codex connection changed/);
  assert.equal(generation >= 2, true, "the second selection must also have gone stale");
  assert.deepEqual(tokens, []);
  await assertAccountUntouched(connection.id);
});

test("the responses websocket bridge also reselects a selection that went stale", async () => {
  const connection = await seed();
  const restore = beforeFenceRead(/checkAndRefreshToken/, rotate(connection.id, "synthetic-a2"));
  const response = await prepareResponsesWs(
    new Request("http://omniroute.local/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-ws-bridge-secret": "bridge-secret",
      },
      body: JSON.stringify({
        action: "prepare",
        requestUrl: "http://omniroute.local/v1/responses",
        headers: {},
        response: { model: "codex/gpt-5.5", input: "offline stale selection" },
      }),
    })
  );
  const body = (await response.json()) as { headers?: Record<string, string> };
  assert.equal(restore(), true);
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.headers?.authorization ?? body.headers?.Authorization, "Bearer synthetic-a2");
  await assertAccountUntouched(connection.id);
});
