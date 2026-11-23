import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Copilot ships Responses-only GPT ids (gpt-6-luna, gpt-6.1-sol, gpt-5.5, ...) before the
// static seed knows them and before a live /models sync has run. Without a format hint the
// request goes out as a Chat Completions body to /chat/completions and Copilot answers 400
// ("... use /v1/responses"). Explicit sources (custom > compat > synced > static) must still win.

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-copilot-unsynced-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET ||= "copilot-unsynced-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { persistDiscoveredModels } = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { parseGitHubCopilotModels } = await import("../../open-sse/services/githubCopilotModels.ts");
const { resolveChatCoreTargetFormat } =
  await import("../../open-sse/handlers/chatCore/targetFormat.ts");
const { resolveExecutionCredentials } =
  await import("../../open-sse/handlers/chatCore/executionCredentials.ts");
const { GithubExecutor } = await import("../../open-sse/executors/github.ts");

const RESPONSES_URL = "https://api.githubcopilot.com/responses";
const CHAT_URL = "https://api.githubcopilot.com/chat/completions";
const executor = new GithubExecutor();

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function resolveRouting(model: string) {
  const info = await getModelInfo(`gh/${model}`);
  assert.equal(info.provider, "github");
  assert.equal(info.model, model);
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: info.provider,
    resolvedModel: info.model,
    apiFormat: info.apiFormat,
    sourceFormat: "openai",
    customModelTargetFormat: info.targetFormat,
    providerSpecificData: {},
  });
  const credentials = resolveExecutionCredentials({
    credentials: { providerSpecificData: {} },
    provider: info.provider,
    targetFormat,
    nativeCodexPassthrough: false,
    endpointPath: "/v1/chat/completions",
    ccSessionId: null,
  });
  return {
    infoTargetFormat: info.targetFormat,
    targetFormat,
    url: executor.buildUrl(info.model, false, 0, credentials),
  };
}

test("unsynced Responses-only GPT ids route to /responses with a Responses body", async () => {
  for (const model of ["gpt-6-luna", "gpt-6-sol", "gpt-6.1-sol", "gpt-5.5", "gpt-7-nova"]) {
    assert.deepEqual(
      await resolveRouting(model),
      {
        infoTargetFormat: "openai-responses",
        targetFormat: "openai-responses",
        url: RESPONSES_URL,
      },
      model
    );
  }
});

test("older GPT ids outside the heuristic keep Chat Completions", async () => {
  for (const model of ["gpt-5.4-mini", "gpt-5.1", "gpt-4.1"]) {
    const routing = await resolveRouting(model);
    assert.equal(routing.infoTargetFormat, undefined, model);
    assert.equal(routing.targetFormat, "openai", model);
    assert.equal(routing.url, CHAT_URL, model);
  }
});

test("Claude and Gemini ids are never inferred as openai-responses", async () => {
  for (const model of ["claude-opus-5", "claude-gpt-6-bridge"]) {
    const routing = await resolveRouting(model);
    assert.notEqual(routing.infoTargetFormat, "openai-responses", model);
    assert.equal(routing.targetFormat, "claude", model);
    assert.equal(routing.url, "https://api.githubcopilot.com/v1/messages", model);
  }
  for (const model of ["gemini-3.8-flash", "gpt-6-gemini-mix"]) {
    const routing = await resolveRouting(model);
    assert.notEqual(routing.infoTargetFormat, "openai-responses", model);
    assert.equal(routing.url, CHAT_URL, model);
  }
});

test("the heuristic is scoped to github and does not touch other providers", async () => {
  const info = await getModelInfo("openrouter/gpt-6-luna");
  assert.notEqual(info.targetFormat, "openai-responses");
});

test("an explicit custom-model targetFormat wins over the heuristic", async () => {
  await modelsDb.addCustomModel(
    "github",
    "gpt-6-custom-chat",
    "GPT-6 custom chat",
    "manual",
    "chat-completions",
    ["chat"],
    "openai"
  );
  const routing = await resolveRouting("gpt-6-custom-chat");
  assert.equal(routing.infoTargetFormat, "openai");
  assert.equal(routing.targetFormat, "openai");
  assert.equal(routing.url, CHAT_URL);
});

test("a synced chat-capable row wins over the heuristic", async () => {
  const connection = await providers.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "unsynced-heuristic-test",
    isActive: true,
    testStatus: "active",
  });
  const rows = parseGitHubCopilotModels({
    data: [
      { id: "gpt-6-luna", supported_endpoints: ["/chat/completions"] },
      { id: "gpt-6.1-sol", supported_endpoints: ["/responses"] },
    ],
  });
  await persistDiscoveredModels("github", connection.id, rows);

  const chatRow = await resolveRouting("gpt-6-luna");
  assert.equal(chatRow.infoTargetFormat, undefined);
  assert.equal(chatRow.targetFormat, "openai");
  assert.equal(chatRow.url, CHAT_URL);

  assert.deepEqual(await resolveRouting("gpt-6.1-sol"), {
    infoTargetFormat: "openai-responses",
    targetFormat: "openai-responses",
    url: RESPONSES_URL,
  });
});

test("GithubExecutor.buildUrl sends gpt-6-luna to /responses once the format is resolved", () => {
  const credentials = resolveExecutionCredentials({
    credentials: { providerSpecificData: {} },
    provider: "github",
    targetFormat: "openai-responses",
    nativeCodexPassthrough: false,
    endpointPath: "/v1/chat/completions",
    ccSessionId: null,
  });
  assert.equal(executor.buildUrl("gpt-6-luna", false, 0, credentials), RESPONSES_URL);
});
