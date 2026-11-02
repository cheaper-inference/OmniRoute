/**
 * Our own graceful shutdown must not leave provider state behind (#shutdown-drain).
 *
 * Live incident class (server-100 router, 2026-10-25): a graceful restart tears the
 * provider transports down while requests are still in flight. The local-backend
 * executors answered a 5xx for that self-inflicted failure, and the runtime reads a
 * 5xx as provider ill health: `markAccountUnavailable` writes `testStatus:
 * "unavailable"` + `rateLimitedUntil` into `provider_connections` (DB state that
 * OUTLIVES the restart), plus a model lockout, a provider circuit-breaker failure and
 * a provider cooldown.
 *
 * The fix (one shared helper, open-sse/utils/drainStatus.ts): while the instance is
 * draining, a transport failure that OUR OWN shutdown caused is answered 499
 * (client_disconnected) instead of 502. 499 is in neither the model-lockout
 * error-code list nor the provider-breaker failure statuses (408/500/502/503/504).
 *
 * Covered here:
 *   - open-sse/executors/codex-app-server.ts  (local Codex app-server child process)
 *   - open-sse/executors/chatgpt-web-codex.ts (runtime stopped BY our own cleanup())
 *   - open-sse/executors/devin-cli-agentic.ts (local Devin CLI child process)
 *
 * The drain flag is driven directly through `globalThis.__omnirouteShutdown` — the
 * state `src/lib/gracefulShutdown.ts` owns and `drainAwareFailureStatus()` reads —
 * instead of sending real signals.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const isolatedRoot = mkdtempSync(join(tmpdir(), "omniroute-local-backends-drain-"));
// The Devin bridge refuses a HOME that is not inside a `.sandbox` segment.
const devinHome = join(process.cwd(), ".sandbox", "local-backends-drain", "home");
process.env.HOME = devinHome;
process.env.DATA_DIR = join(isolatedRoot, "data");
process.env.SQLITE_FILE = join(isolatedRoot, "data", "storage.sqlite");
process.env.DEVIN_AGENTIC_HOME = devinHome;
fs.mkdirSync(devinHome, { recursive: true });
fs.mkdirSync(process.env.DATA_DIR, { recursive: true });

const { CodexAppServerExecutor } = await import("../../open-sse/executors/codex-app-server.ts");
const { ChatGptWebCodexExecutor } = await import("../../open-sse/executors/chatgpt-web-codex.ts");
const { encodeChatGptWebCodexSecrets } =
  await import("../../open-sse/executors/chatgpt-web-codex/credentials.ts");
const { DevinCliAgenticExecutor } = await import("../../open-sse/executors/devin-cli-agentic.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { normalizeStreamFailurePayload } = await import("../../open-sse/utils/streamErrorFormat.ts");

/** The exact shape gracefulShutdown.ts writes and open-sse/utils/drainStatus.ts reads. */
function setDraining(shuttingDown: boolean) {
  globalThis.__omnirouteShutdown = { init: false, shuttingDown, activeRequests: 0 };
}

test.beforeEach(() => setDraining(false));

test.after(() => {
  delete globalThis.__omnirouteShutdown;
  fs.rmSync(isolatedRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** An executor result is either a bare Response or the capture object. */
function responseOf(result: unknown): Response {
  if (result instanceof Response) return result;
  const captured = (result as { response?: Response }).response;
  assert.ok(captured, "the executor must resolve to a response");
  return captured;
}

/** The status the runtime derives from an upstream failure payload. */
function runtimeVisibleStatus(body: unknown): number {
  const failure = normalizeStreamFailurePayload({ response: body });
  assert.ok(failure, "the runtime must read a failure out of the payload");
  return failure.status;
}

/** The Responses object of a `response.failed` frame, as the runtime reads it. */
function sseFailurePayload(sseText: string): unknown {
  const lines = sseText.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index]?.trim() !== "event: response.failed") continue;
    const dataLine = lines.slice(index + 1).find((line) => line.startsWith("data:"));
    assert.ok(dataLine, "response.failed must carry a data frame");
    const frame = JSON.parse(dataLine.slice("data:".length)) as { response?: unknown };
    assert.ok(frame.response, "response.failed must carry the response object");
    return frame.response;
  }
  return null;
}

// ── Codex app-server (local child process) ──────────────────────────────────

const APP_SERVER_PSD = {
  codexTransport: "app-server",
  codexAppServerUrl: "ws://ts-egress:1456",
  codexAppServerToken: "deadbeef",
  codexAppServerCwd: "/tmp",
};

/** A transport whose connect fails the way our own teardown makes it fail. */
const failingAppServerTransport = async () => {
  throw new Error("Codex app-server socket closed while the instance was draining");
};

async function runAppServerTurn(stream: boolean) {
  const executor = new CodexAppServerExecutor({ websocketFn: failingAppServerTransport });
  return executor.execute({
    model: "gpt-5.5",
    body: { input: "hello there" },
    stream,
    credentials: { providerSpecificData: { ...APP_SERVER_PSD } },
  } as never);
}

test("codex app-server: a failure outside a drain keeps its own 502", async () => {
  setDraining(false);
  const response = responseOf(await runAppServerTurn(false));
  assert.equal(response.status, 200, await response.clone().text());
  const body = JSON.parse(await response.text());
  assert.equal(body.status, "failed");
  assert.equal(body.error.code, "codex_app_server_turn_failed");
  // The runtime reads this as a 5xx — the state-writing path we are closing.
  assert.equal(runtimeVisibleStatus(body), 502);
});

test("codex app-server: while draining the failed turn is answered 499", async () => {
  setDraining(true);
  const response = responseOf(await runAppServerTurn(false));
  assert.equal(response.status, 499, await response.clone().text());
  const body = JSON.parse(await response.text());
  assert.equal(body.error.type, "client_disconnected");
  assert.equal(body.error.code, "client_disconnected");
});

test("codex app-server: the drain flag is read live, never latched", async () => {
  const first = responseOf(await runAppServerTurn(false));
  assert.equal(runtimeVisibleStatus(JSON.parse(await first.text())), 502);
  setDraining(true);
  const second = responseOf(await runAppServerTurn(false));
  assert.equal(second.status, 499, await second.clone().text());
  setDraining(false);
  const third = responseOf(await runAppServerTurn(false));
  assert.equal(runtimeVisibleStatus(JSON.parse(await third.text())), 502);
});

test("codex app-server: a drained streaming turn is not reported as a 5xx", async () => {
  setDraining(true);
  const response = responseOf(await runAppServerTurn(true));
  assert.equal(response.status, 200);
  const sseText = await response.text();
  const payload = sseFailurePayload(sseText);
  assert.ok(payload, "the stream must carry a response.failed frame");
  const status = runtimeVisibleStatus(payload);
  assert.ok(status < 500, `the runtime must not read a 5xx from our own teardown (got ${status})`);
});

// ── ChatGPT Web (Codex) — the runtime our own cleanup() stops ───────────────

/** A "chrome" that exits immediately: the browser can never come up. */
function writeFailingChrome(dir: string): string {
  const scriptFile = path.join(dir, "failing-chrome.cjs");
  writeFileSync(scriptFile, "#!/usr/bin/env node\nprocess.exit(3);\n", { mode: 0o755 });
  return scriptFile;
}

async function runChatGptWebTurn(stream: boolean) {
  const chromeExecutablePath = writeFailingChrome(isolatedRoot);
  // Only an operator-configured browser is launched (#18358): a stored
  // chromeExecutablePath is honoured only when it matches CHATGPT_WEB_CODEX_CHROME_PATH.
  const oldChromePath = process.env.CHATGPT_WEB_CODEX_CHROME_PATH;
  process.env.CHATGPT_WEB_CODEX_CHROME_PATH = chromeExecutablePath;
  try {
    return await runChatGptWebTurnWith(chromeExecutablePath, stream);
  } finally {
    if (oldChromePath === undefined) delete process.env.CHATGPT_WEB_CODEX_CHROME_PATH;
    else process.env.CHATGPT_WEB_CODEX_CHROME_PATH = oldChromePath;
  }
}

async function runChatGptWebTurnWith(chromeExecutablePath: string, stream: boolean) {
  const executor = new ChatGptWebCodexExecutor();
  return executor.execute({
    model: "luna",
    body: {
      _nativeCodexPassthrough: true,
      model: "gpt-5.6-luna",
      input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
      client_metadata: { "x-codex-turn-metadata": { thread_id: "thr_1", turn_id: "turn_1" } },
    },
    stream,
    credentials: {
      connectionId: "conn_drain_probe",
      apiKey: encodeChatGptWebCodexSecrets({
        storageState: { cookies: [], origins: [] },
        runtimeKey: "k",
      }),
      providerSpecificData: { chromeExecutablePath, solAvailable: false },
    },
    clientHeaders: { "user-agent": "codex_cli_rs/1.0" },
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
  } as never);
}

test("chatgpt web codex: a failure outside a drain keeps its own 502", async () => {
  setDraining(false);
  const response = responseOf(await runChatGptWebTurn(false));
  assert.equal(response.status, 200, await response.clone().text());
  const body = JSON.parse(await response.text());
  assert.equal(body.status, "failed");
  assert.equal(runtimeVisibleStatus(body), 502);
});

test("chatgpt web codex: while draining the failed turn is answered 499", async () => {
  setDraining(true);
  const response = responseOf(await runChatGptWebTurn(false));
  assert.equal(response.status, 499, await response.clone().text());
  const body = JSON.parse(await response.text());
  assert.equal(body.error.type, "client_disconnected");
  assert.equal(body.error.code, "client_disconnected");
});

// ── Devin CLI agentic (local child process) ─────────────────────────────────

/** A Devin CLI that dies before answering: the shape of a shutdown-killed bridge. */
function writeFailingDevin(dir: string): string {
  const scriptFile = path.join(dir, "mock-devin.cjs");
  writeFileSync(
    scriptFile,
    `#!/usr/bin/env node
const readline = require("readline");
readline.createInterface({ input: process.stdin }).on("line", () => process.exit(7));
`,
    { mode: 0o755 }
  );
  return scriptFile;
}

async function runDevinTurn(model = "swe-1-7") {
  const scriptFile = writeFailingDevin(isolatedRoot);
  const oldBin = process.env.CLI_DEVIN_AGENTIC_BIN;
  process.env.CLI_DEVIN_AGENTIC_BIN = scriptFile;
  try {
    return await new DevinCliAgenticExecutor().execute({
      model,
      stream: false,
      credentials: {},
      body: { messages: [{ role: "user", content: "Say hello" }] },
    });
  } finally {
    if (oldBin === undefined) delete process.env.CLI_DEVIN_AGENTIC_BIN;
    else process.env.CLI_DEVIN_AGENTIC_BIN = oldBin;
  }
}

test("devin cli agentic: a failure outside a drain keeps its own 502", async () => {
  setDraining(false);
  const response = responseOf(await runDevinTurn());
  assert.equal(response.status, 502, await response.clone().text());
  const body = JSON.parse(await response.text());
  assert.equal(body.error.code, "acp_early_exit");
});

test("devin cli agentic: while draining the failed turn is answered 499", async () => {
  setDraining(true);
  const response = responseOf(await runDevinTurn());
  assert.equal(response.status, 499, await response.clone().text());
  const body = JSON.parse(await response.text());
  assert.equal(body.error.type, "client_disconnected");
  assert.equal(body.error.code, "client_disconnected");
});

test("devin cli agentic: a 4xx of the request keeps its own status while draining", async () => {
  setDraining(true);
  const response = responseOf(await runDevinTurn("not-a-devin-model"));
  assert.equal(response.status, 400, await response.clone().text());
  const body = JSON.parse(await response.text());
  assert.equal(body.error.code, "unknown_devin_model");
});
