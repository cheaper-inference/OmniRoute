/**
 * A graceful shutdown must not poison the MiniMax Code account.
 *
 * Live incident (server-100 router, 2026-10-25): our own SIGTERM tore the
 * managed-gateway transport down while requests were still in flight. The
 * executor answered a bare 502, the chat handler read that 502 as provider ill
 * health (`Account … unavailable (502), trying fallback`) and called
 * `markAccountUnavailable`, which — because a 502 is not exempt from
 * `shouldSkipConnDisable` — wrote `testStatus: "unavailable"` plus a
 * `rateLimitedUntil` into the `provider_connections` table. That state
 * survives the restart: the account stays poisoned after the operator asked
 * for a clean restart.
 *
 * While the instance is draining the executor answers 499 instead, exactly
 * like `open-sse/executors/zcode.ts` does: 499 carries `client_disconnected`,
 * which `shouldSkipConnDisable` already exempts, so the account is not
 * poisoned — and 499 is in neither the model-lockout nor the provider-breaker
 * status list.
 *
 * The drain flag is driven directly through `globalThis.__omnirouteShutdown` —
 * the state `isDraining()` reads — instead of sending real signals.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("omniroute-minimax-drain-");
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "minimax-drain-secret";

const { MinimaxCodeExecutor } = await import("../../open-sse/executors/minimax-code.ts");
const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");

function requestBody() {
  return {
    messages: [
      { role: "system", content: "You are a coding assistant." },
      { role: "user", content: "Reply with a short status." },
    ],
  };
}

/** The exact shape `isDraining()` reads (src/lib/gracefulShutdown.ts). */
function setDraining(shuttingDown: boolean) {
  globalThis.__omnirouteShutdown = { init: false, shuttingDown, activeRequests: 0 };
}

async function writeAuthProfile(records: Record<string, unknown>): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), "mmcode-drain-"));
  const authFile = join(dir, "auth.json");
  await writeFile(authFile, JSON.stringify({ schemaVersion: 1, records }));
  return authFile;
}

function liveRecord(accessToken: string) {
  return {
    accessToken,
    refreshToken: "refresh-token",
    clientId: "mcode-public",
    scopes: ["agent.default"],
    audience: "agent-backend",
    expiresAtMs: Date.now() + 3_600_000,
    generation: 7,
  };
}

/** A gateway transport that dies the way a teardown kills it. */
function unreachableGatewayExecutor(authFile: string) {
  return new MinimaxCodeExecutor({
    authFile,
    fetchImpl: async () => {
      throw new Error("fetch failed");
    },
  });
}

/**
 * A gateway that ANSWERS with a 5xx.
 *
 * It is a different case from the unreachable one: the gateway answered, so
 * the local CLI is not its fallback — the answer is the status of the
 * gateway. The 5xx is what the runtime would read as provider ill health.
 */
function gatewayAnsweringExecutor(authFile: string, status: number) {
  return new MinimaxCodeExecutor({
    authFile,
    fetchImpl: async () =>
      new Response("upstream failure", { status, headers: { "content-type": "text/plain" } }),
  });
}

async function runGateway(executor: InstanceType<typeof MinimaxCodeExecutor>) {
  const result = await executor.execute({
    model: "MiniMax-M3.1-Flash",
    body: requestBody(),
    stream: false,
    credentials: {},
  });
  const response = "response" in result ? result.response : result;
  return response;
}

test.beforeEach(() => {
  setDraining(false);
});

test.after(async () => {
  delete globalThis.__omnirouteShutdown;
  await cleanup();
});

test("MiniMax Code answers 499 while the instance is draining", async () => {
  const authFile = await writeAuthProfile({ live: liveRecord("access-token") });
  setDraining(true);
  const response = await runGateway(unreachableGatewayExecutor(authFile));

  // Our own shutdown is not evidence about the provider's health: the answer
  // is 499 (client_disconnected), like an aborted caller gets.
  assert.equal(response.status, 499);
  const body = await response.json();
  assert.equal(body.error?.type, "client_disconnected");
  assert.equal(body.error?.code, "client_disconnected");
});

test("the 499 answer is exempt from the connection cooldown, the 502 was not", async () => {
  const authFile = await writeAuthProfile({ live: liveRecord("access-token") });

  setDraining(true);
  const drained = await runGateway(unreachableGatewayExecutor(authFile));
  const drainedBody = await drained.json();
  assert.equal(drained.status, 499);
  assert.equal(
    shouldSkipConnDisable(
      {
        status: drained.status,
        errorCode: drainedBody?.error?.code ?? null,
        errorType: drainedBody?.error?.type ?? null,
      },
      false,
      false,
      "minimax"
    ),
    true,
    "the 499 answer must not cool the account down — the DB state would outlive the restart"
  );

  setDraining(false);
  const live = await runGateway(gatewayAnsweringExecutor(authFile, 502));
  assert.equal(live.status, 502);
  assert.equal(
    shouldSkipConnDisable({ status: live.status }, false, false, "minimax"),
    false,
    "the 502 is exactly the status that poisoned the account — this is the bug"
  );
});

test("an unreachable gateway outside a drain is a 502 — the model is unavailable", async () => {
  const authFile = await writeAuthProfile({ live: liveRecord("access-token") });
  setDraining(false);
  const response = await runGateway(unreachableGatewayExecutor(authFile));

  // Outside a drain the transport failure is a genuine outage of the upstream:
  // the answer is the 502 of the transport, and it stays in the model lockout.
  assert.equal(response.status, 502);
});

test("a gateway that answers 502 keeps its 502 outside a drain", async () => {
  const authFile = await writeAuthProfile({ live: liveRecord("access-token") });
  setDraining(false);
  const response = await runGateway(gatewayAnsweringExecutor(authFile, 502));

  // Outside a drain the failure is a genuine upstream outage and keeps its
  // status: the drain gate must not disable the upstream verdict.
  assert.equal(response.status, 502);
});

test("the drain verdict is not latched — the 502 comes back once draining ends", async () => {
  const authFile = await writeAuthProfile({ live: liveRecord("access-token") });

  setDraining(true);
  const drained = await runGateway(gatewayAnsweringExecutor(authFile, 502));
  assert.equal(drained.status, 499);

  setDraining(false);
  const live = await runGateway(gatewayAnsweringExecutor(authFile, 502));
  assert.equal(live.status, 502);
});

test("a refusal that belongs to the request keeps its own status while draining", async () => {
  const authFile = await writeAuthProfile({ live: liveRecord("access-token") });
  setDraining(true);
  const executor = new MinimaxCodeExecutor({
    authFile,
    // The gateway answers a refusal with the error shape.
    fetchImpl: async () =>
      new Response(
        JSON.stringify({
          type: "error",
          error: { type: "invalid_request_error", message: "invalid params" },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      ),
  });
  const response = await runGateway(executor);

  // A 4xx is a property of the request, not of the shutdown: it keeps its own
  // status, so a real refusal is never hidden behind a disconnect.
  assert.equal(response.status, 400);
});
