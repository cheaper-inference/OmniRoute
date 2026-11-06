/**
 * The output-limit advisory is the only supported way to keep combo targets whose
 * known output ceiling sits below the request's max_tokens. The combo resolver has
 * read it from three places for a while -- the per-combo config, the round-robin
 * config, and the global settings row -- but only the per-combo copy could be set
 * from the dashboard, so an operator with a dozen combos had to edit every one.
 *
 * It lives in settings now, which means it needs a schema entry or the settings API
 * strips it, and a declared default or the resolver sees undefined.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-output-limit-advisory-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");

test.after(() => {
  clearModelsDevCapabilities();
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

function capabilityEntry(limitOutput: number) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: 128_000,
    limit_input: 128_000,
    limit_output: limitOutput,
    interleaved_field: null,
  };
}

test("outputLimitAdvisory is off unless an operator turns it on", async () => {
  const settings = await getSettings();
  assert.equal(settings.outputLimitAdvisory, false);
});

test("the schema accepts outputLimitAdvisory as a boolean and keeps its neighbours", () => {
  const parsed = updateSettingsSchema.parse({ outputLimitAdvisory: true, theme: "dark" });
  assert.equal(parsed.outputLimitAdvisory, true);
  assert.equal(parsed.theme, "dark");
});

test("the schema rejects a non-boolean advisory instead of coercing it", () => {
  assert.equal(updateSettingsSchema.safeParse({ outputLimitAdvisory: "yes" }).success, false);
});

test("turning it on through updateSettings is visible to the combo resolver", async () => {
  await updateSettings({ outputLimitAdvisory: true });
  const settings = await getSettings();
  assert.equal(settings.outputLimitAdvisory, true);

  await updateSettings({ outputLimitAdvisory: false });
  const restored = await getSettings();
  assert.equal(restored.outputLimitAdvisory, false);
});

test("a combo with no advisory in its own config honours the global setting", async () => {
  saveModelsDevCapabilities({
    // Separate providers: a 503 from one provider must not skip the other.
    "unit-global-advisory-a": { insufficient: capabilityEntry(128) },
    "unit-global-advisory-b": { sufficient: capabilityEntry(4_096) },
  });
  const run = async () => {
    const calls: string[] = [];
    const response = await handleComboChat({
      body: { messages: [{ role: "user", content: "hello" }], max_tokens: 512 },
      combo: {
        name: "global-output-limit-advisory",
        strategy: "priority",
        models: ["unit-global-advisory-a/insufficient", "unit-global-advisory-b/sufficient"],
      },
      // Same source the chat handler passes to handleComboChat.
      settings: await getSettings(),
      handleSingleModel: async (_body: Record<string, unknown>, modelStr: string) => {
        calls.push(modelStr);
        const ok = modelStr.endsWith("/insufficient");
        return new Response(
          JSON.stringify(ok ? { choices: [{ message: { content: "ok" } }] } : { error: "down" }),
          { status: ok ? 200 : 503, headers: { "Content-Type": "application/json" } }
        );
      },
      log: noopLog,
    });
    return { status: response.status, calls };
  };

  await updateSettings({ outputLimitAdvisory: false });
  const strict = await run();
  assert.notEqual(strict.status, 200);
  assert.ok(!strict.calls.includes("unit-global-advisory-a/insufficient"));

  await updateSettings({ outputLimitAdvisory: true });
  try {
    const advisory = await run();
    assert.equal(advisory.status, 200);
    assert.deepEqual(advisory.calls, ["unit-global-advisory-a/insufficient"]);
  } finally {
    await updateSettings({ outputLimitAdvisory: false });
  }
});
