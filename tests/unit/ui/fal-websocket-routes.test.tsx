// @vitest-environment node
import { afterAll, expect, test, vi } from "vitest";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { FalRecord } from "../../../open-sse/handlers/fal/schema";

const peer = vi.hoisted(() => ({
  sends: vi.fn<(input: FalRecord) => void>(),
  close: vi.fn(),
  controllers: [] as ReadableStreamDefaultController<Uint8Array>[],
}));
vi.mock("@omniroute/open-sse/handlers/fal/httpWebsocket", () => ({
  connectFalHttpWebsocket: vi.fn(async (args: { onClose: (uncertain: boolean) => void }) => ({
    output: new ReadableStream<Uint8Array>({
      start(c) {
        peer.controllers.push(c);
      },
    }),
    send: peer.sends,
    close() {
      peer.close();
      peer.controllers.at(-1)?.close();
      args.onClose(false);
    },
  })),
}));
vi.mock("@omniroute/open-sse/handlers/fal/realtime", async (original) => ({
  ...(await original<object>()),
  connectFalRealtime: vi.fn(async (args: { onClose: () => void }) => ({
    output: new ReadableStream<Uint8Array>({
      start(c) {
        peer.controllers.push(c);
      },
    }),
    send: peer.sends,
    close() {
      peer.close();
      peer.controllers.at(-1)?.close();
      args.onClose();
    },
  })),
}));

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "fal-socket-routes-"));
process.env.API_KEY_SECRET = "fal-socket-test-only-secret";
process.env.FAL_NATIVE_ENABLED = "true";
const run = await import("../../../src/app/api/v1/fal/run/route");
const jobs = await import("../../../src/app/api/v1/fal/jobs/[id]/route");
const db = await import("../../../src/lib/db/fal");
const providers = await import("../../../src/lib/db/providers");
const keys = await import("../../../src/lib/db/apiKeys");
const accounting = await import("../../../src/lib/fal/accounting");
const costs = await import("../../../src/domain/costRules");
const httpSocket = await import("../../../open-sse/handlers/fal/httpWebsocket");
const { FalError } = await import("../../../open-sse/handlers/fal/client");
const { storeFalArtifact } = await import("../../../src/lib/fal/realtime");
const core = await import("../../../src/lib/db/core");
const { waitForCallLogSaves } = await import("../../../src/lib/usage/callLogs");
const definition = JSON.parse(
  readFileSync(join(process.cwd(), "tests/fixtures/fal/fal-ai_fast-lcm-diffusion.json"), "utf8")
);
const connection = await providers.createProviderConnection({
  provider: "fal-ai",
  authType: "apikey",
  apiKey: "mock-socket-key",
  isActive: true,
  testStatus: "active",
  name: "socket route test",
});
const connectionId = String(connection.id);
const key = await keys.createApiKey("fal-sockets", "fal-sockets", [], {
  allowedConnections: [connectionId],
});
const otherKey = await keys.createApiKey("fal-outsider", "fal-outsider", [], {
  allowedConnections: [connectionId],
});
const wrongConnection = await keys.createApiKey("fal-wrong-account", "fal-wrong-account", [], {
  allowedConnections: ["unavailable-connection"],
});
db.saveFalDefinition(connectionId, definition, true);

function request(path: string, method: string, body?: unknown, apiKey = key.key) {
  return new Request(`http://localhost/api/v1/fal/${path}`, {
    method,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}
afterAll(async () => {
  await waitForCallLogSaves(10_000);
  keys.resetApiKeyState();
  core.resetDbInstance();
});

for (const transport of ["realtime", "http-websocket"]) {
  test(`${transport} authorizes and accounts every initial/later invocation, rejects invalid input and closes`, async () => {
    const record = vi.spyOn(accounting, "recordFalDispatch");
    peer.sends.mockClear();
    peer.close.mockClear();
    const input = {
      prompt: "a cube",
      seed: 0,
      ...(transport === "realtime"
        ? {
            image_url: `data:image/png;base64,${readFileSync(join(process.cwd(), "tests/fixtures/fal/realtime-1px.png")).toString("base64")}`,
            sync_mode: true,
          }
        : {}),
    };
    const response = await run.POST(
      request("run", "POST", {
        endpoint_id: definition.endpoint_id,
        connection_id: connectionId,
        input,
        transport,
      })
    );
    expect(response.status).toBe(200);
    const id = response.headers.get("X-Request-ID")!;
    const route = { params: Promise.resolve({ id }) };
    expect(peer.sends).toHaveBeenCalledExactlyOnceWith(input);
    expect(record).toHaveBeenCalledTimes(1);
    const later = await jobs.POST(
      request(`jobs/${id}`, "POST", { input: { ...input, prompt: "next" } }),
      route
    );
    expect(later.status).toBe(200);
    expect(peer.sends).toHaveBeenCalledTimes(2);
    expect(record).toHaveBeenCalledTimes(2);
    expect(record.mock.calls[0][0].id).not.toBe(record.mock.calls[1][0].id);
    for (const invalid of [
      { ...input, unsupported: true },
      { ...input, prompt: false },
    ]) {
      const denied = await jobs.POST(request(`jobs/${id}`, "POST", { input: invalid }), route);
      expect(denied.status).toBe(400);
    }
    expect(
      (await jobs.POST(request(`jobs/${id}`, "POST", { input }, otherKey.key), route)).status
    ).toBe(404);
    expect(
      (await jobs.POST(request(`jobs/${id}`, "POST", { input }, wrongConnection.key), route)).status
    ).toBe(403);
    expect(peer.sends).toHaveBeenCalledTimes(2);
    expect(record).toHaveBeenCalledTimes(2);
    const url = storeFalArtifact(id, Uint8Array.of(0, 255, 1), "image/png", "image.png");
    const file = await jobs.GET(request(url.replace("/api/v1/fal/", ""), "GET"), route);
    expect(file.headers.get("content-type")).toBe("image/png");
    expect(new Uint8Array(await file.arrayBuffer())).toEqual(Uint8Array.of(0, 255, 1));
    expect(
      (
        await jobs.GET(
          request(url.replace("/api/v1/fal/", ""), "GET", undefined, otherKey.key),
          route
        )
      ).status
    ).toBe(404);
    expect((await jobs.DELETE(request(`jobs/${id}`, "DELETE"), route)).status).toBe(200);
    expect(peer.close).toHaveBeenCalledTimes(1);
    expect((await jobs.POST(request(`jobs/${id}`, "POST", { input }), route)).status).toBe(410);
    expect(record).toHaveBeenCalledTimes(2);
    record.mockRestore();
    await response.body?.cancel();
  });
}

test("HTTP WebSockets accept the documented native /stream operation through the real route", async () => {
  const endpoint = "fal-ai/any-llm/stream";
  db.saveFalDefinition(
    connectionId,
    {
      endpoint_id: endpoint,
      openapi: {
        openapi: "3.0.0",
        paths: {
          [`/${endpoint}`]: {
            post: {
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: { prompt: { type: "string" } },
                      required: ["prompt"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    true
  );
  peer.sends.mockClear();
  const response = await run.POST(
    request("run", "POST", {
      endpoint_id: endpoint,
      connection_id: connectionId,
      transport: "http-websocket",
      input: { prompt: "test" },
    })
  );
  expect(response.status).toBe(200);
  expect(peer.sends).toHaveBeenCalledExactlyOnceWith({ prompt: "test" });
  expect(vi.mocked(httpSocket.connectFalHttpWebsocket).mock.calls.at(-1)?.[0].endpoint).toBe(
    endpoint
  );
  const id = response.headers.get("X-Request-ID")!;
  await jobs.DELETE(request(`jobs/${id}`, "DELETE"), { params: Promise.resolve({ id }) });
  await response.body?.cancel();
});

test("a failed WebSocket handshake sends no invocation and records no spend", async () => {
  const record = vi.spyOn(accounting, "recordFalDispatch");
  peer.sends.mockClear();
  vi.mocked(httpSocket.connectFalHttpWebsocket).mockRejectedValueOnce(
    new FalError("Handshake failed", 502)
  );
  const response = await run.POST(
    request("run", "POST", {
      endpoint_id: definition.endpoint_id,
      connection_id: connectionId,
      transport: "http-websocket",
      input: { prompt: "test" },
    })
  );
  expect(response.status).toBe(502);
  expect(peer.sends).not.toHaveBeenCalled();
  expect(record).not.toHaveBeenCalled();
  const receipt = db.loadFalJob(response.headers.get("X-Request-ID")!);
  expect(receipt?.status).toBe("FAILED");
  expect(receipt?.accounted).toBe(false);
  record.mockRestore();
});

for (const transport of ["realtime", "http-websocket"]) {
  test(`${transport} rechecks the spent budget before later inputs and still permits retrieval`, async () => {
    costs.setBudget(key.id, { dailyLimitUsd: 1, resetInterval: "daily" });
    const record = vi.spyOn(accounting, "recordFalDispatch");
    peer.sends.mockClear();
    try {
      const input = { prompt: "test", seed: 0 };
      const response = await run.POST(
        request("run", "POST", {
          endpoint_id: definition.endpoint_id,
          connection_id: connectionId,
          transport,
          input,
        })
      );
      expect(response.status).toBe(200);
      const id = response.headers.get("X-Request-ID")!;
      const context = { params: Promise.resolve({ id }) };
      expect(costs.checkBudget(key.id).allowed).toBe(false);
      expect((await jobs.POST(request(`jobs/${id}`, "POST", { input }), context)).status).toBe(429);
      expect(peer.sends).toHaveBeenCalledTimes(1);
      expect(record).toHaveBeenCalledTimes(1);
      expect((await jobs.GET(request(`jobs/${id}`, "GET"), context)).status).toBe(200);
      await jobs.DELETE(request(`jobs/${id}`, "DELETE"), context);
      expect(db.loadFalJob(id)?.accounted).toBe(true);
      await response.body?.cancel();
    } finally {
      costs.resetCostData();
      record.mockRestore();
    }
  });
}
