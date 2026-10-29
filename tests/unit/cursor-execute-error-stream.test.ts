import assert from "node:assert/strict";
import test from "node:test";
import { EventEmitter } from "node:events";
import { gzipSync } from "node:zlib";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

process.env.CURSOR_AGENT_CLI_VERSION = "2026.05.07-42ddaca";
const harness = await createChatPipelineHarness("cursor-execute-error-stream");
// Load all modules before installing the strictly scoped configuration fetch mock.
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { encodeBytes, encodeString } =
  await import("../../open-sse/utils/cursorAgentProtobuf/wire.ts");
const { connectEndStreamError, driveCursorH2 } =
  await import("../../open-sse/executors/cursor/streamDriver.ts");
const { projectCursorError } = await import("../../open-sse/executors/cursor/errorProjection.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
const executor = (await getExecutor(
  "cursor"
)) as import("../../open-sse/executors/cursor.ts").CursorExecutor;
type Transport = {
  buildRequest: (...args: unknown[]) => Promise<{ body: Buffer; blobStore: Map<string, Buffer> }>;
  openH2: (...args: unknown[]) => Promise<unknown>;
};
const transport = executor as unknown as Transport;
const original = {
  buildRequest: transport.buildRequest,
  openH2: transport.openH2,
  fetch: globalThis.fetch,
};
const title = "Fable 5 is not included in your weekly usage";
const detail = "Buy credits or switch to a Grok model to continue.";
const typed = {
  type: "aiserver.v1.ErrorDetails",
  value: encodeBytes(2, Buffer.concat([encodeString(1, title), encodeString(2, detail)])).toString(
    "base64"
  ),
};
const errorPayload = (code: string, message: string, details: unknown[] = []) =>
  Buffer.from(JSON.stringify({ error: { code, message, details } }));
const entitlement = errorPayload("unknown", "Error", [typed]);
const entitlementFixtures = [
  ["typed value", entitlement],
  [
    "known-type debug-only",
    errorPayload("unknown", "Error", [
      { type: "aiserver.v1.ErrorDetails", debug: { details: { title, detail } } },
    ]),
  ],
] as const;
function frame(payload: Buffer, flag = 2) {
  const header = Buffer.alloc(5);
  header[0] = flag;
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}
function fakeH2(initialBytes: Buffer) {
  return {
    status: 200,
    req: Object.assign(new EventEmitter(), { close() {}, pause() {}, resume() {} }),
    client: Object.assign(new EventEmitter(), { close() {} }),
    initialBytes,
  };
}
type Delivery = "complete" | "header" | "payload" | "events" | "compressed" | "prefixed";
const deliveries: Delivery[] = [
  "complete",
  "header",
  "payload",
  "events",
  "compressed",
  "prefixed",
];
let delivery: Delivery = "complete";
function deliveredH2(wire: Buffer) {
  if (delivery === "compressed") {
    wire = frame(gzipSync(wire.subarray(5)), wire[0] | 1);
  } else if (delivery === "prefixed") {
    wire = Buffer.concat([frame(encodeBytes(1, Buffer.alloc(0)), 0), wire]);
  }
  const cuts =
    delivery === "header"
      ? [2]
      : delivery === "payload"
        ? [7]
        : delivery === "events"
          ? [1, 4, 8, 19]
          : [];
  const h2 = fakeH2(wire.subarray(0, cuts[0] ?? wire.length));
  const send = (index: number) => {
    if (index >= cuts.length) return;
    setImmediate(() => {
      h2.req.emit("data", wire.subarray(cuts[index], cuts[index + 1] ?? wire.length));
      send(index + 1);
    });
  };
  send(0);
  return h2;
}
let bytes = frame(entitlement);
let requestedModel = "";
let pipeline = false;
let transportFault = false;
const attempts: { model: string; first: boolean }[] = [];
transport.buildRequest = async (model) => {
  requestedModel = String(model);
  return { body: Buffer.alloc(0), blobStore: new Map() };
};
transport.openH2 = async (_url, headers) => {
  if (transportFault) {
    const h2 = fakeH2(Buffer.alloc(0));
    setImmediate(() => h2.req.emit("error", new Error("ECONNRESET synthetic transport fault")));
    return h2;
  }
  if (!pipeline) return deliveredH2(bytes);
  const first = (headers as Record<string, string>).authorization === "Bearer synthetic-cursor-one";
  attempts.push({ model: requestedModel, first });
  if (first && requestedModel === "fable-5") return deliveredH2(bytes);
  return fakeH2(
    Buffer.concat([
      frame(encodeBytes(1, encodeBytes(1, encodeString(1, "synthetic healthy reply"))), 0),
      frame(encodeBytes(1, encodeBytes(14, Buffer.alloc(0))), 0),
    ])
  );
};
globalThis.fetch = async (input) => {
  assert.equal(
    String(input),
    "https://api2.cursor.sh/aiserver.v1.ServerConfigService/GetServerConfig"
  );
  return new Response(
    Uint8Array.from(
      encodeBytes(
        27,
        Buffer.concat([
          encodeString(1, "https://api5.cursor.sh"),
          encodeString(2, "https://api5.cursor.sh"),
        ])
      )
    ).buffer
  );
};
test.after(async () => {
  transport.buildRequest = original.buildRequest;
  transport.openH2 = original.openH2;
  globalThis.fetch = original.fetch;
  fallback.clearAllModelLockouts();
  fallback.clearProviderFailure("cursor");
  flushProxyLogsSync();
  await harness.cleanup();
});
const execute = (stream: boolean) =>
  executor.execute({
    model: "fable-5",
    body: { messages: [{ role: "user", content: "synthetic" }] },
    stream,
    credentials: { accessToken: "synthetic-direct-token" },
    signal: undefined,
    upstreamExtraHeaders: undefined,
    clientHeaders: undefined,
  });
for (const stream of [false, true]) {
  test(`real execute immediate typed trailer preserves title/detail (${stream ? "SSE" : "HTTP"})`, async () => {
    bytes = frame(entitlement);
    const out = await execute(stream);
    if (!stream) assert.equal(out.response.status, 404);
    const wire = await out.response.text();
    if (stream) assert.match(wire, /"status":404/);
    assert.ok(wire.includes(title));
    assert.ok(wire.includes(detail));
    assert.match(wire, /invalid_request_error/);
    if (stream) {
      assert.match(wire, /"finish_reason":"error"/);
      assert.equal(wire.match(/data: \[DONE\]/g)?.length, 1);
    }
  });
}
for (const [code, message, type] of [
  ["resource_exhausted", "too many requests per minute", "rate_limit_error"],
  ["resource_exhausted", "quota exhausted", "rate_limit_error"],
  ["unauthenticated", "expired token", "authentication_error"],
  ["resource_exhausted", "request body exceeds maximum size", "invalid_request_error"],
  ["unknown", "synthetic ordinary fault", "api_error"],
] as const) {
  test(`real execute SSE negative control: ${message}`, async () => {
    bytes = frame(errorPayload(code, message));
    const wire = await (await execute(true)).response.text();
    assert.ok(wire.includes(type));
    assert.doesNotMatch(wire, /Cursor model not found|weekly usage/);
    assert.match(wire, /data: \[DONE\]/);
  });
}
test("real execute ordinary transport rejection uses error SSE without entitlement", async () => {
  transportFault = true;
  try {
    const wire = await (await execute(true)).response.text();
    assert.match(wire, /"status":502/);
    assert.match(wire, /api_error/);
    assert.match(wire, /data: \[DONE\]/);
    assert.doesNotMatch(wire, /weekly usage|model not found/);
  } finally {
    transportFault = false;
  }
});
test("real execute immediate JSON error uses the same classified SSE contract", async () => {
  bytes = frame(entitlement, 0);
  const out = await execute(true);
  const wire = await out.response.text();
  assert.match(wire, /"status":404/);
  assert.ok(wire.includes(title));
  assert.ok(wire.includes(detail));
  assert.match(wire, /invalid_request_error/);
});
test("real execute preserves partial-output trailer rejection", async () => {
  bytes = Buffer.concat([
    frame(encodeBytes(1, encodeBytes(1, encodeString(1, "partial answer"))), 0),
    frame(entitlement),
  ]);
  const out = await execute(true);
  await assert.rejects(out.response.text(), /weekly usage/);
});
for (const prefix of [" ", "\n", "\t", "\r", " \t\r\n"]) {
  test(`ASCII JSON whitespace is accepted by projection and real driver: ${JSON.stringify(prefix)}`, async () => {
    const payload = Buffer.concat([
      Buffer.from(prefix),
      errorPayload("unauthenticated", "expired token"),
    ]);
    assert.match(projectCursorError(payload) || "", /unauthenticated/);
    assert.match(connectEndStreamError(payload) || "", /unauthenticated/);
    const h2 = fakeH2(frame(payload));
    const task = driveCursorH2(
      h2 as never,
      { endReason: null, leftoverBytes: Buffer.alloc(0), unknownExecField: null },
      {
        debugEnabled: false,
        debugLog() {},
        onFrame() {
          assert.fail("JSON trailer is not protobuf");
        },
      }
    );
    setImmediate(() => h2.req.emit("end"));
    await assert.rejects(task, /unauthenticated/);
  });
}
test("whitespace scan remains bounded; non-JSON and malformed JSON retain fallback", () => {
  for (const input of [" \n{}", "\v{}", "\u00a0{}", " \t{broken", " \nprotobuf"])
    assert.equal(projectCursorError(Buffer.from(input)), null);
  assert.match(
    projectCursorError(
      Buffer.from(" \n" + JSON.stringify({ error: { message: "x".repeat(140_000) } }))
    ) || "",
    /too large/
  );
  assert.match(projectCursorError(Buffer.from(" ".repeat(140_000) + "{}")) || "", /too large/);
});
for (const [fixture, payload] of entitlementFixtures) {
  for (const mode of deliveries) {
    for (const flag of [0, 2]) {
      for (const stream of [false, true]) {
        test(`pre-output entitlement ${fixture} ${mode} flag=${flag} stream=${stream}`, async () => {
          delivery = mode;
          bytes = frame(payload, flag);
          try {
            const out = await execute(stream);
            const wire = await out.response.text();
            if (!stream) assert.equal(out.response.status, 404);
            assert.ok(wire.includes(title));
            assert.ok(wire.includes(detail));
            assert.match(wire, /invalid_request_error/);
            if (stream) assert.match(wire, /"status":404/);
          } finally {
            delivery = "complete";
          }
        });
      }
    }
  }
}
test("classified pre-output rejection is not eligible for readiness-stall retry", async () => {
  const { ensureStreamReadiness } = await import("../../open-sse/utils/streamReadiness.ts");
  const { runReadinessFallback } =
    await import("../../open-sse/handlers/chatCore/streamReadinessFallback.ts");
  bytes = frame(entitlement);
  const out = await execute(true);
  const failedReadiness = await ensureStreamReadiness(out.response, {
    timeoutMs: 1000,
    provider: "cursor",
  });
  assert.equal(failedReadiness.ok, false);
  const result = await runReadinessFallback({
    failedReadiness,
    failedConnectionId: "synthetic",
    failedBody: out.response,
    currentModel: "fable-5",
    provider: "cursor",
    model: "fable-5",
    streamReadinessPolicy: { timeoutMs: 1000, maxTimeoutMs: 1000 },
    reqLogger: { logTargetRequest() {} },
    providerUrl: "https://example.invalid",
    providerHeaders: {},
    finalBody: {},
    translatedBody: {},
    providerRequestCapture: { body() {} },
    async executeProviderRequest() {
      assert.fail("a classified rejection is not a stream stall");
    },
  });
  assert.equal(result.ok, false);
  assert.equal(result.response.status, 404);
  assert.ok((await result.response.text()).includes(detail));
});
test("real streaming pipeline locks only current connection/model; sibling and second connection work", async (t) => {
  await harness.settingsDb.updateSettings({
    excludeTosAvoid: false,
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });
  const first = await providers.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "synthetic first",
    accessToken: "synthetic-cursor-one",
    isActive: true,
    testStatus: "active",
    priority: 1,
  });
  const second = await providers.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "synthetic second",
    accessToken: "synthetic-cursor-two",
    isActive: true,
    testStatus: "active",
    priority: 2,
  });
  const firstId = String(first.id),
    secondId = String(second.id);
  const before = await providers.getProviderConnectionById(firstId);
  const request = (model: string, pin?: string) =>
    harness.buildRequest({
      headers: pin ? { "x-omniroute-connection": pin } : {},
      body: {
        model: `cursor/${model}`,
        stream: true,
        messages: [{ role: "user", content: "synthetic" }],
      },
    });
  pipeline = true;
  try {
    for (const [fixture, payload] of entitlementFixtures)
      for (const mode of deliveries)
        for (const flag of [0, 2])
          await t.test(`${fixture} ${mode} flag=${flag}`, async () => {
            fallback.clearAllModelLockouts();
            delivery = mode;
            bytes = frame(payload, flag);
            const failed = await harness.handleChat(request("fable-5", firstId));
            const wire = await failed.text();
            assert.equal(failed.status, 404, wire);
            assert.match(wire, /"type":"invalid_request_error"/);
            assert.doesNotMatch(wire, /STREAM_READINESS_TIMEOUT/);
            assert.ok(wire.includes(title));
            assert.ok(wire.includes(detail));
            assert.equal(fallback.isModelLocked("cursor", firstId, "fable-5"), true);
            assert.equal(fallback.isModelLocked("cursor", firstId, "composer-2.5"), false);
            assert.equal(fallback.isModelLocked("cursor", secondId, "fable-5"), false);
            for (const id of [firstId, secondId])
              assert.equal(fallback.isProviderInCooldown("cursor", id), false);
            assert.equal(fallback.getProviderBreakerState("cursor")?.failureCount, 0);
            const after = await providers.getProviderConnectionById(firstId);
            for (const field of ["testStatus", "rateLimitedUntil", "isActive"] as const)
              assert.equal(after[field], before[field], field);
            attempts.length = 0;
            const sibling = await harness.handleChat(request("composer-2.5", firstId));
            assert.equal(sibling.status, 200);
            assert.match(await sibling.text(), /synthetic healthy reply/);
            assert.ok(attempts.some((attempt) => attempt.first));
            attempts.length = 0;
            const other = await harness.handleChat(request("fable-5"));
            assert.equal(other.status, 200);
            assert.match(await other.text(), /synthetic healthy reply/);
            assert.ok(attempts.length > 0);
            assert.ok(attempts.every((attempt) => !attempt.first));
            // Neither success may clear the rejected connection/model's failure.
            assert.equal(fallback.isModelLocked("cursor", firstId, "fable-5"), true);
          });
  } finally {
    delivery = "complete";
    pipeline = false;
  }
});
for (const stream of [false, true]) {
  test(`generic ActionRequired typed details retain quota policy in real pipeline stream=${stream}`, async () => {
    const quotaTitle = "Usage limit reached";
    const guidance = "Upgrade your plan to continue.";
    bytes = frame(
      errorPayload("unknown", "ActionRequiredError: increase limits", [
        {
          type: "aiserver.v1.ErrorDetails",
          value: encodeBytes(
            2,
            Buffer.concat([
              encodeString(1, quotaTitle),
              encodeString(2, guidance),
              encodeString(6, "INFO_POISON"),
            ])
          ).toString("base64"),
          debug: { details: { title: "DEBUG_POISON" }, metadata: "METADATA_POISON" },
        },
      ])
    );
    fallback.clearAllModelLockouts();
    fallback.clearProviderFailure("cursor");
    const id = String(
      (
        await providers.createProviderConnection({
          provider: "cursor",
          authType: "oauth",
          name: "synthetic quota control",
          accessToken: "synthetic-cursor-one",
          isActive: true,
          testStatus: "active",
        })
      ).id
    );
    pipeline = true;
    try {
      const response = await harness.handleChat(
        harness.buildRequest({
          headers: { "x-omniroute-connection": id },
          body: {
            model: "cursor/fable-5",
            stream,
            messages: [{ role: "user", content: "synthetic" }],
          },
        })
      );
      const wire = await response.text();
      assert.equal(response.status, 429, wire);
      assert.match(wire, /rate_limit_error/);
      assert.ok(wire.includes(quotaTitle), wire);
      assert.ok(wire.includes(guidance), wire);
      assert.doesNotMatch(wire, /POISON|weekly usage|Cursor model not found/);
      // Generic quota must not acquire the weekly entitlement's single-model lock.
      assert.equal(fallback.isModelLocked("cursor", id, "fable-5"), false);
      assert.equal(fallback.isModelLocked("cursor", id, "composer-2.5"), false);
    } finally {
      pipeline = false;
      fallback.clearAllModelLockouts();
      fallback.clearProviderFailure("cursor");
      await providers.deleteProviderConnection(id);
    }
  });
}
for (const [code, message, status] of [
  ["resource_exhausted", "too many requests per minute", 429],
  ["resource_exhausted", "quota exhausted", 429],
  ["unauthenticated", "expired token", 401],
  ["resource_exhausted", "request body exceeds maximum size", 400],
  ["unknown", "synthetic ordinary fault", 502],
] as const) {
  test(`streaming pipeline negative control preserves HTTP failure policy: ${message}`, async () => {
    const snapshots: unknown[] = [];
    for (const stream of [false, true]) {
      delivery = "events";
      pipeline = true;
      bytes = frame(errorPayload(code, message));
      fallback.clearAllModelLockouts();
      fallback.clearProviderFailure("cursor");
      const id = String(
        (
          await providers.createProviderConnection({
            provider: "cursor",
            authType: "oauth",
            name: "synthetic control",
            accessToken: "synthetic-cursor-one",
            isActive: true,
            testStatus: "active",
          })
        ).id
      );
      try {
        const response = await harness.handleChat(
          harness.buildRequest({
            headers: { "x-omniroute-connection": id },
            body: {
              model: "cursor/fable-5",
              stream,
              messages: [{ role: "user", content: "synthetic" }],
            },
          })
        );
        const wire = await response.text();
        assert.equal(response.status, status, wire);
        assert.doesNotMatch(wire, /weekly usage|Cursor model not found/);
        const connection = await providers.getProviderConnectionById(id);
        snapshots.push({
          locked: fallback.isModelLocked("cursor", id, "fable-5"),
          siblingLocked: fallback.isModelLocked("cursor", id, "composer-2.5"),
          cooldown: fallback.isProviderInCooldown("cursor", id),
          status: connection.testStatus,
          active: connection.isActive,
          hasCooldown: Boolean(connection.rateLimitedUntil),
        });
        if (status === 400) {
          assert.equal(fallback.isModelLocked("cursor", id, "fable-5"), false);
          assert.equal(fallback.isProviderInCooldown("cursor", id), false);
          assert.equal((await providers.getProviderConnectionById(id)).testStatus, "active");
        }
      } finally {
        delivery = "complete";
        pipeline = false;
        fallback.clearAllModelLockouts();
        fallback.clearProviderFailure("cursor");
        await providers.deleteProviderConnection(id);
      }
    }
    assert.deepEqual(snapshots[1], snapshots[0]);
  });
}
