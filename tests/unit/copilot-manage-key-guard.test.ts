// The copilot chat creates API keys from the user's free text. A key holding a management
// scope (`manage` / `admin`) opens every management route, so the copilot must demand the
// same credential POST /api/keys demands — even with login disabled — and fail closed when it
// cannot check one. The chat reply is persisted and fed back to models, so it never carries a
// key's secret. The CLI approval gate decides "read-only" from the command words, never from
// the arguments.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = process.env.DATA_DIR!;
assert.ok(TEST_DATA_DIR, "DATA_DIR must be isolated for this test");
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_PATH = process.env.PATH;

process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-copilot-manage-key-secret";
process.env.INITIAL_PASSWORD = "copilot-manage-key-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const copilotRoute = await import("../../src/app/api/copilot/chat/route.ts");
const { processCopilotChat } = await import("../../src/lib/copilot/engine.ts");
const { getCopilotTool } = await import("../../src/lib/copilot/tools.ts");
const { classifyCommand } = await import("../../src/lib/copilot/commandClassification.ts");

const CHAT_URL = "http://localhost/api/copilot/chat";
const MANAGE_KEY_PROMPT = "create api key named evil with scopes: manage";

type ChatBody = { message: string; toolCalls?: Array<{ result: string }> };

function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetStorage();
  // setupComplete: with INITIAL_PASSWORD set, an unfinished setup forces requireLogin back on.
  await settingsDb.updateSettings({ setupComplete: true, requireLogin: false });
  assert.equal((await settingsDb.getSettings()).requireLogin, false, "open mode must stick");
});

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  process.env.PATH = ORIGINAL_PATH;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

function chatBody(content: string) {
  return { messages: [{ role: "user", content }] };
}

function anonymousChat(content: string) {
  return new Request(CHAT_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(chatBody(content)),
  });
}

async function postChat(request: Request): Promise<{ status: number; text: string }> {
  const response = await copilotRoute.POST(request);
  return { status: response.status, text: await response.text() };
}

async function storedKeys() {
  return (await apiKeysDb.getApiKeys()) as Array<{ id: string; key: string; scopes?: string[] }>;
}

for (const prompt of [
  MANAGE_KEY_PROMPT,
  "create api key named evil with scopes: admin",
  "create api key named evil with scopes: read,MANAGE",
]) {
  test(`with login disabled, an anonymous copilot chat cannot mint a management key (${prompt})`, async () => {
    const { status, text } = await postChat(anonymousChat(prompt));
    assert.equal(status, 200, text);
    const body = JSON.parse(text) as ChatBody;
    assert.match(body.message, /cannot be created from the copilot/);
    assert.equal(body.toolCalls, undefined, "no tool call may run");
    assert.deepEqual(await storedKeys(), [], "no key may be persisted");
  });
}

test("the engine refuses a management key when it has no HTTP request to check (fail closed)", async () => {
  const response = await processCopilotChat({
    messages: [{ role: "user", content: MANAGE_KEY_PROMPT }],
  });
  assert.match(response.message, /cannot be created from the copilot/);
  assert.deepEqual(await storedKeys(), []);
});

test("the createApiKey tool refuses a management scope without an engine-verified credential", async () => {
  const tool = getCopilotTool("createApiKey");
  assert.ok(tool);
  const result = await tool.handler({ name: "direct", machineId: "copilot", scopes: "manage" });
  assert.match(result, /cannot be created from the copilot/);
  assert.deepEqual(await storedKeys(), []);
});

test("a dashboard session still creates a management key, and the reply never carries the secret", async () => {
  const { status, text } = await postChat(
    await makeManagementSessionRequest(CHAT_URL, {
      method: "POST",
      body: chatBody(MANAGE_KEY_PROMPT),
    })
  );
  assert.equal(status, 200, text);

  const keys = await storedKeys();
  assert.equal(keys.length, 1);
  assert.deepEqual(keys[0].scopes, ["manage"]);
  assert.ok(keys[0].key.length > 12, "stored key must be the real secret");
  assert.ok(!text.includes(keys[0].key), "the plaintext key must not appear in the chat reply");
  const body = JSON.parse(text) as ChatBody;
  assert.ok(body.message.includes(keys[0].id), "the reply identifies the key by id");
  assert.ok(body.message.includes(keys[0].key.slice(0, 8)), "the reply shows the masked prefix");
});

test("with login disabled, an inference-only key is still created but its secret stays out of the reply", async () => {
  const { status, text } = await postChat(anonymousChat("create api key named dev"));
  assert.equal(status, 200, text);

  const keys = await storedKeys();
  assert.equal(keys.length, 1);
  assert.ok(!(keys[0].scopes ?? []).includes("manage"));
  assert.ok(!text.includes(keys[0].key), "the plaintext key must not appear in the chat reply");
});

test("CLI approval: a mutating command is never read-only because of its arguments", () => {
  for (const argv of [
    ["switch-combo", "my-model-list"],
    ["switch-combo", "list"],
    ["combo", "switch", "my-model-list"],
    ["models", "edit", "openai", "gpt-4o"],
    ["providers", "rotate", "status"],
  ]) {
    assert.notEqual(classifyCommand(argv)?.category, "read-only", argv.join(" "));
  }
});

test("CLI approval: read-only command words stay read-only", () => {
  for (const argv of [
    ["status"],
    ["health", "--json"],
    ["models"],
    ["config", "list"],
    ["combo", "list"],
    ["keys", "list"],
    ["providers", "status"],
  ]) {
    assert.equal(classifyCommand(argv)?.category, "read-only", argv.join(" "));
  }
});

test("CLI approval: the copilot does not execute a mutating command hidden behind read-only words", async () => {
  // A stand-in `omniroute` that records every invocation, so the test can see what ran.
  const binDir = path.join(TEST_DATA_DIR, "fake-bin");
  const marker = path.join(TEST_DATA_DIR, "cli-invocations.log");
  fs.mkdirSync(binDir, { recursive: true });
  const fakeCli = path.join(binDir, "omniroute");
  fs.writeFileSync(fakeCli, `#!/bin/sh\necho "$*" >> "${marker}"\necho ok\n`, { mode: 0o755 });
  process.env.PATH = `${binDir}:${ORIGINAL_PATH}`;
  try {
    const tool = getCopilotTool("runOmniRouteCli");
    assert.ok(tool);

    const blocked = await tool.handler({ command: "combo switch my-model-list" });
    assert.ok(!fs.existsSync(marker), `mutating command must not run: ${blocked}`);

    // Control: a read-only command does reach the CLI.
    await tool.handler({ command: "status" });
    assert.equal(fs.readFileSync(marker, "utf8").trim(), "status");
  } finally {
    process.env.PATH = ORIGINAL_PATH;
  }
});
