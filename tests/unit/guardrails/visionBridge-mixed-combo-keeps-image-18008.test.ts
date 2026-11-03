import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-probe-18008b-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const combos = await import("../../../src/lib/db/combos.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { getComboVisionBridgeDecision, VisionBridgeGuardrail } =
  await import("../../../src/lib/guardrails/visionBridge.ts");

const PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function run(name: string, describe: "fail" | "ok") {
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({}),
      callVisionModel: async () => {
        if (describe === "fail") throw new Error("bridge model has no credentials");
        return "a single red pixel";
      },
      hasUsableCredentials: async () => true,
    },
  });
  const body = {
    model: name,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What color is this image? One word." },
          { type: "image_url", image_url: { url: PNG } },
        ],
      },
    ],
  };
  const result = await guardrail.preCall(body, { model: name });
  const out = (result.modifiedPayload ?? body) as typeof body;
  return JSON.stringify(out.messages[0].content);
}

test("mixed combo (vision head + text-only tail), describe fails", async () => {
  await combos.createCombo({
    name: "mixed-18008",
    strategy: "priority",
    models: [
      { providerId: "command-code", model: "gpt-5.5", weight: 1 },
      { providerId: "mistral", model: "mistral-large-latest", weight: 1 },
    ],
  });
  const decision = await getComboVisionBridgeDecision("mixed-18008");
  const content = await run("mixed-18008", "fail");
  console.log(`[probe] mixed decision=${decision} content=${content.slice(0, 260)}`);
  assert.equal(decision, "process");
  assert.ok(content.includes("image_url"), "vision-capable head target lost the raw image");
});

test("mixed combo (vision head + text-only tail), describe OK", async () => {
  const content = await run("mixed-18008", "ok");
  console.log(`[probe] mixed(ok) content=${content.slice(0, 260)}`);
  assert.ok(content.includes("image_url"), "vision-capable head target got text instead of image");
});

test("direct vision model, describe fails", async () => {
  const content = await run("command-code/gpt-5.5", "fail");
  console.log(`[probe] direct content=${content.slice(0, 200)}`);
  assert.ok(content.includes("image_url"));
});

test("combo dispatch already filters text-only targets for a raw image body (why the bridge blanket-replace is redundant)", async () => {
  const attempted: string[] = [];
  const log = { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
  const result = await handleComboChat({
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "color?" },
            { type: "image_url", image_url: { url: PNG } },
          ],
        },
      ],
    },
    combo: {
      name: "mixed-18008",
      strategy: "priority",
      models: ["command-code/gpt-5.5", "mistral/mistral-large-latest"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_b: unknown, modelStr: string) => {
      attempted.push(modelStr);
      return new Response(JSON.stringify({ choices: [{ message: { content: "Red" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  } as never);
  console.log(`[probe] dispatch attempted=${JSON.stringify(attempted)} status=${result.status}`);
  assert.deepEqual(attempted, ["command-code/gpt-5.5"]);
});
