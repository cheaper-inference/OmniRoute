import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pending-throw-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { getPendingRequests, getPendingById, clearPendingRequests } =
  await import("../../src/lib/usage/usageHistory.ts");

const noopLog = { debug() {}, info() {}, warn() {}, error() {} };

test.before(async () => {
  await core.ensureDbInitialized();
});

test.afterEach(() => {
  clearPendingRequests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function openRows(connectionId: string): number {
  const byModel = getPendingRequests().byAccount[connectionId] ?? {};
  return Object.values(byModel).reduce((sum, count) => sum + count, 0);
}

// "gemini-cli" is a retired provider: resolving its executor throws (code PROVIDER_RETIRED)
// AFTER handleChatCore has registered the pending-request row. The throw must not leave the row.
test("an exception after the pending row is registered does not leave the row", async () => {
  const connectionId = "conn-pending-throw";
  const body = {
    model: "gemini-cli/x",
    stream: false,
    messages: [{ role: "user", content: "hi" }],
  };
  await assert.rejects(
    () =>
      handleChatCore({
        body: structuredClone(body),
        modelInfo: { provider: "gemini-cli", model: "x", extendedContext: false },
        credentials: { apiKey: "unit-test-key", providerSpecificData: {} },
        log: noopLog,
        clientRawRequest: {
          endpoint: "/v1/chat/completions",
          body: structuredClone(body),
          headers: new Headers({ accept: "application/json" }),
        },
        connectionId,
        userAgent: "unit-test",
      } as never),
    (error: unknown) => (error as { code?: string }).code === "PROVIDER_RETIRED"
  );
  assert.equal(openRows(connectionId), 0, "the counter must be back to zero");
  const stillListed = [...getPendingById().values()].filter((d) => d.connectionId === connectionId);
  assert.equal(stillListed.length, 0, "no detail row may stay on the dashboard");
});

test("the original error is rethrown unchanged", async () => {
  const body = {
    model: "gemini-cli/x",
    stream: false,
    messages: [{ role: "user", content: "hi" }],
  };
  let caught: { code?: string; status?: number } | null = null;
  try {
    await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider: "gemini-cli", model: "x", extendedContext: false },
      credentials: { apiKey: "unit-test-key", providerSpecificData: {} },
      log: noopLog,
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId: "conn-pending-throw-2",
      userAgent: "unit-test",
    } as never);
  } catch (error) {
    caught = error as { code?: string; status?: number };
  }
  assert.equal(caught?.code, "PROVIDER_RETIRED");
  assert.equal(caught?.status, 410);
});
