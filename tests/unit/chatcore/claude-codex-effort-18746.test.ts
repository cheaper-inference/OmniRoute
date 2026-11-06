import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { z } from "zod";

const environmentKeys = [
  "DATA_DIR",
  "DISABLE_SQLITE_AUTO_BACKUP",
  "REQUIRE_API_KEY",
  "API_KEY_SECRET",
  "OMNIROUTE_RELAY_BACKEND",
  "ENABLE_TLS_FINGERPRINT",
];
const originalEnvironment = new Map<string, string | undefined>(
  environmentKeys.map((key) => [key, process.env[key]])
);
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "claude-codex-effort-18746-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = "test-only-claude-codex-effort-18746";
process.env.OMNIROUTE_RELAY_BACKEND = "ts";
process.env.ENABLE_TLS_FINGERPRINT = "false";

const wireSchema = z.object({
  model: z.string(),
  reasoning: z.object({ effort: z.string(), summary: z.string().optional() }),
});
const captured: Array<z.infer<typeof wireSchema>> = [];
const originalFetch = globalThis.fetch;
const mockFetch: typeof globalThis.fetch = async (url, init) => {
  // Never delegate to real fetch, including unexpected startup/provider requests.
  assert.equal(String(url), "https://chatgpt.com/backend-api/codex/responses");
  assert.equal(init?.method, "POST");
  assert.equal(typeof init?.body, "string");
  const parsed: unknown = JSON.parse(String(init.body));
  captured.push(wireSchema.parse(parsed));
  const response = {
    id: "resp_18746",
    object: "response",
    status: "completed",
    model: "gpt-5.6-sol",
    output: [
      {
        type: "message",
        id: "msg_18746",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text: "OK", annotations: [] }],
      },
    ],
    usage: { input_tokens: 5, output_tokens: 1, total_tokens: 6 },
  };
  const events = [
    { type: "response.output_text.delta", delta: "OK", output_index: 0, content_index: 0 },
    { type: "response.completed", response },
  ];
  return new Response(events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(""), {
    headers: { "Content-Type": "text/event-stream" },
  });
};
globalThis.fetch = mockFetch;

const { resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
const { updateSettings } = await import("../../../src/lib/db/settings.ts");
const { waitForCallLogSaves } = await import("../../../src/lib/usage/callLogs.ts");
const { normalizeCodexModelsResponse } =
  await import("../../../src/app/api/providers/[id]/models/discovery/codex.ts");
const { persistDiscoveredModels } =
  await import("../../../src/lib/providerModels/modelDiscovery.ts");
const { getThinkingBudgetConfig, setThinkingBudgetConfig, ThinkingMode } =
  await import("../../../open-sse/services/thinkingBudget.ts");
const { POST } = await import("../../../src/app/api/v1/messages/route.ts");
const originalThinkingConfig = getThinkingBudgetConfig();

test.before(async () => {
  // proxyFetch installs a global wrapper during imports; replace it at the I/O seam.
  globalThis.fetch = mockFetch;
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  await updateSettings({ semanticCacheEnabled: false });
  const connection = await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "claude-codex-effort-18746",
    accessToken: "test-only-codex-token",
    isActive: true,
    providerSpecificData: { requestDefaults: { reasoningEffort: "low" } },
  });
  await persistDiscoveredModels(
    "codex",
    connection.id,
    normalizeCodexModelsResponse({
      models: [
        {
          slug: "gpt-5.6-sol",
          supported_reasoning_levels: ["low", "medium", "high", "xhigh"],
          default_reasoning_level: "high",
        },
      ],
    })
  );
});

test.after(async () => {
  assert.ok(await waitForCallLogSaves(5_000), "call-log writes must finish before DB cleanup");
  globalThis.fetch = originalFetch;
  setThinkingBudgetConfig(originalThinkingConfig);
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  for (const [key, value] of originalEnvironment) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("Messages route sends Claude medium effort to Codex despite connection default low (#18746)", async () => {
  const result = await POST(
    new Request("http://localhost/api/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "cx/gpt-5.6-sol",
        max_tokens: 1024,
        stream: true,
        messages: [{ role: "user", content: "Reply briefly." }],
        thinking: { type: "adaptive" },
        output_config: { effort: "medium" },
      }),
    })
  );
  const responseText = await result.text();
  assert.equal(result.status, 200, responseText);
  assert.equal(captured.length, 1, "the real pipeline must dispatch exactly one Codex request");
  assert.equal(captured[0].model, "gpt-5.6-sol");
  assert.equal(captured[0].reasoning.effort, "medium");
  assert.equal(captured[0].reasoning.summary, "auto");
});

test("Messages route preserves nested high effort when the Claude carrier is empty (#18746)", async () => {
  const before = captured.length;
  const result = await POST(
    new Request("http://localhost/api/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "cx/gpt-5.6-sol",
        max_tokens: 1024,
        stream: true,
        messages: [{ role: "user", content: "Reply briefly to the mixed-carrier request." }],
        thinking: { type: "adaptive" },
        output_config: { effort: "" },
        reasoning: { effort: "high" },
      }),
    })
  );
  const responseText = await result.text();
  assert.equal(result.status, 200, responseText);
  assert.equal(captured.length, before + 1, "the mixed-carrier request must reach Codex once");
  const wire = captured.at(-1);
  assert.ok(wire);
  assert.equal(wire.model, "gpt-5.6-sol");
  assert.equal(wire.reasoning.effort, "high");
  assert.equal(wire.reasoning.summary, "auto");
});
