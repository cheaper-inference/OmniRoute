/**
 * The Codex Responses-WebSocket bridge must forward the same per-model upstream headers
 * (`upstreamHeaders`, `compatByProtocol["openai-responses"].upstreamHeaders`) and connection-level
 * custom headers / custom User-Agent that the HTTP/SSE path (chatCore → buildUpstreamHeadersForExecute)
 * merges into every request.
 *
 * Before this fix the bridge built its upstream WS headers from `executor.buildHeaders()` alone, so
 * a per-model `Version` override that unlocks a model on HTTP never reached the WS upgrade: with a
 * low global CODEX_CLIENT_VERSION pin, HTTP succeeded while WS was refused upstream with
 * `model_not_found` ("The '<model>' model is not supported when using Codex with a ChatGPT account").
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-codex-ws-upstream-headers-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "bridge-secret";
// A deliberately old global pin: the per-model override below must win on the WS bridge too.
process.env.CODEX_CLIENT_VERSION = "0.100.0";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { POST } = await import("../../src/app/api/internal/codex-responses-ws/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetDb);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.CODEX_CLIENT_VERSION;
});

async function prepare(model: string) {
  const response = await POST(
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
        response: { model, input: "hello" },
      }),
    })
  );
  const body = await response.json();
  assert.equal(response.status, 200, JSON.stringify(body));
  return body as { headers: Record<string, string> };
}

function header(headers: Record<string, string>, name: string): string | undefined {
  const key = Object.keys(headers).find((k) => k.toLowerCase() === name.toLowerCase());
  return key === undefined ? undefined : headers[key];
}

async function codexConnection(providerSpecificData: Record<string, unknown> = {}) {
  await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex WS headers",
    accessToken: "oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData,
  });
}

test("per-model upstreamHeaders override the global Codex client version on the WS bridge", async () => {
  await codexConnection();
  await modelsDb.addCustomModel("codex", "gpt-5.5", "GPT 5.5");
  await modelsDb.updateCustomModel("codex", "gpt-5.5", {
    upstreamHeaders: { Version: "0.159.2", "X-Model-Scoped": "on" },
  });

  const { headers } = await prepare("codex/gpt-5.5");

  assert.equal(header(headers, "version"), "0.159.2");
  assert.equal(header(headers, "x-model-scoped"), "on");
  // Exactly one Version header reaches the wire (no case-variant duplicate).
  assert.equal(Object.keys(headers).filter((k) => k.toLowerCase() === "version").length, 1);
});

test("openai-responses protocol upstreamHeaders apply on the WS bridge and win over top-level", async () => {
  await codexConnection();
  await modelsDb.addCustomModel("codex", "gpt-5.5", "GPT 5.5");
  await modelsDb.updateCustomModel("codex", "gpt-5.5", {
    upstreamHeaders: { "X-Layer": "model" },
    compatByProtocol: { "openai-responses": { upstreamHeaders: { "X-Layer": "responses" } } },
  });

  const { headers } = await prepare("codex/gpt-5.5");

  assert.equal(header(headers, "x-layer"), "responses");
});

test("connection custom headers apply on the WS bridge; model-level wins on the same name", async () => {
  await codexConnection({ customHeaders: { "X-Conn": "conn", "X-Shared": "conn" } });
  await modelsDb.addCustomModel("codex", "gpt-5.5", "GPT 5.5");
  await modelsDb.updateCustomModel("codex", "gpt-5.5", {
    upstreamHeaders: { "X-Shared": "model" },
  });

  const { headers } = await prepare("codex/gpt-5.5");

  assert.equal(header(headers, "x-conn"), "conn");
  assert.equal(header(headers, "x-shared"), "model");
});

test("control: without any override the WS bridge keeps the executor's own Version", async () => {
  await codexConnection();

  const { headers } = await prepare("codex/gpt-5.5");

  assert.equal(header(headers, "version"), "0.100.0");
  assert.equal(header(headers, "x-model-scoped"), undefined);
});
