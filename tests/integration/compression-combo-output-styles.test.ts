import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const harness = await createChatPipelineHarness("compression-combo-output-styles");
const compressionDb = await import("../../src/lib/db/compression.ts");
const compressionCombosDb = await import("../../src/lib/db/compressionCombos.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { OUTPUT_STYLE_MARKER } =
  await import("../../open-sse/services/compression/outputStyles/apply.ts");
const { buildOpenAIResponse, buildRequest, combosDb, handleChat, seedConnection, waitFor } =
  harness;

const STYLE_LEVEL_TEXT = /Act like a lazy senior dev/;

test.afterEach(async () => {
  await harness.resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("a compression combo's own output styles reach the upstream body and the call log", async () => {
  // Global styles deliberately empty: everything below must come from the COMBO row.
  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
    outputStyles: [],
    cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: false },
  });
  await seedConnection("openai", { apiKey: "sk-style-combo" });
  const routingCombo = await combosDb.createCombo({
    name: "style-combo",
    strategy: "priority",
    models: ["openai/gpt-4o-mini"],
  });
  const compressionCombo = compressionCombosDb.createCompressionCombo({
    name: "Style combo",
    pipeline: [{ engine: "lite" }],
    outputStyles: [{ id: "less-code", level: "full" }],
  });
  assert.equal(
    compressionCombosDb.assignRoutingCombo(compressionCombo.id, routingCombo.id as string),
    true
  );

  const upstreamBodies: unknown[] = [];
  globalThis.fetch = async (_url, init = {}) => {
    if (init?.body) upstreamBodies.push(JSON.parse(String(init.body)));
    return buildOpenAIResponse("styled reply");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "style-combo",
        stream: false,
        messages: [
          { role: "system", content: "You are a test system prompt." },
          { role: "user", content: "hello" },
        ],
      },
    })
  );
  assert.equal(response.status, 200);
  assert.ok(upstreamBodies.length >= 1, "at least one upstream request");

  const upstreamText = JSON.stringify(upstreamBodies.at(-1));
  assert.ok(upstreamText.includes(OUTPUT_STYLE_MARKER), "upstream body carries the style marker");
  assert.match(upstreamText, STYLE_LEVEL_TEXT);

  // Acceptance criterion: the injected system prompt is visible in the persisted request log.
  const row = await waitFor(async () => {
    const rows = await callLogs.getCallLogs({ limit: 5 });
    const match = rows.find((entry) => entry.comboName === "style-combo");
    if (!match) return null;
    const detail = await callLogs.getCallLogById(match.id);
    return (detail as { detailState?: string } | null)?.detailState === "ready" ? detail : null;
  }, CALL_LOG_SETTLE_TIMEOUT_MS);
  assert.ok(row, "the combo call-log row's detail artifact becomes ready");
  const logged = JSON.stringify(row.requestBody ?? null);
  assert.ok(
    logged.includes(OUTPUT_STYLE_MARKER),
    "persisted request body carries the style marker"
  );
  assert.match(logged, STYLE_LEVEL_TEXT);
  assert.ok(logged.includes("You are a test system prompt."), "client system prompt is preserved");
});
