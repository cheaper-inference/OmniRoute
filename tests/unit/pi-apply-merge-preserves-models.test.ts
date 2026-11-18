/**
 * Pi Apply must merge into the existing omniroute provider models, not replace
 * them (G1 e0018 + e0019, ported from 9router).
 *
 * The dashboard card sends a single `model` id and has no per-model controls,
 * but the user can hand-edit `~/.pi/agent/models.json` to add models or set a
 * display name, `contextWindow` or `maxTokens`. Every Apply used to replace the
 * whole `models` array with `{ id, name: id }`, silently dropping those edits.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const { applyOmniRoutePiProvider, readOmniRoutePiProvider, readPiModelsJson } =
  await import("../../src/shared/services/piConfig.ts");

const TMP_ROOT = path.join(os.tmpdir(), "omniroute-pi-apply-merge-test");

async function makeEnv(seed?: Record<string, unknown>): Promise<NodeJS.ProcessEnv> {
  await fs.mkdir(TMP_ROOT, { recursive: true });
  const dir = await fs.mkdtemp(path.join(TMP_ROOT, "pi-"));
  const env: NodeJS.ProcessEnv = { ...process.env, PI_CODING_AGENT_DIR: dir };
  if (seed) {
    await fs.writeFile(path.join(dir, "models.json"), JSON.stringify(seed, null, 2), "utf-8");
  }
  return env;
}

/** An owned omniroute provider with one fully-specified model and one extra. */
function seededProviderEnv() {
  return makeEnv({
    providers: {
      omniroute: {
        baseUrl: "http://127.0.0.1:20128/v1",
        apiKey: "sk-old",
        api: "openai-completions",
        omnirouteManaged: true,
        models: [
          {
            id: "cx/gpt-6-sol",
            name: "My Label",
            contextWindow: 123456,
            maxTokens: 9999,
          },
          { id: "other/model", contextWindow: 5 },
        ],
      },
    },
  });
}

const APPLY = { baseUrl: "http://127.0.0.1:20128", apiKey: "sk-new" };

test("apply merges into the existing model entry and keeps other models", async () => {
  const env = await seededProviderEnv();

  await applyOmniRoutePiProvider({ ...APPLY, model: "cx/gpt-6-sol" }, env);

  const { config, error } = await readPiModelsJson(env);
  assert.equal(error, null);
  const provider = readOmniRoutePiProvider(config);
  assert.deepEqual(provider?.models, [
    // Same model id re-applied: the hand-set label and caps survive.
    { id: "cx/gpt-6-sol", name: "My Label", contextWindow: 123456, maxTokens: 9999 },
    // A model the user added by hand survives too.
    { id: "other/model", contextWindow: 5 },
  ]);
});

test("apply on a fresh agent dir still writes name = id", async () => {
  const env = await makeEnv();

  await applyOmniRoutePiProvider({ ...APPLY, model: "auto/best-coding" }, env);

  const { config } = await readPiModelsJson(env);
  assert.deepEqual(readOmniRoutePiProvider(config)?.models, [
    { id: "auto/best-coding", name: "auto/best-coding" },
  ]);
});

test("apply of a different model keeps the previous entry untouched", async () => {
  const env = await seededProviderEnv();

  await applyOmniRoutePiProvider({ ...APPLY, model: "cx/new-model" }, env);

  const { config } = await readPiModelsJson(env);
  assert.deepEqual(readOmniRoutePiProvider(config)?.models, [
    { id: "cx/new-model", name: "cx/new-model" },
    { id: "cx/gpt-6-sol", name: "My Label", contextWindow: 123456, maxTokens: 9999 },
    { id: "other/model", contextWindow: 5 },
  ]);
});

test("an explicit modelName different from the id still wins", async () => {
  const env = await seededProviderEnv();

  await applyOmniRoutePiProvider({ ...APPLY, model: "cx/gpt-6-sol", modelName: "Renamed" }, env);

  const { config } = await readPiModelsJson(env);
  const models = readOmniRoutePiProvider(config)?.models as Array<{ id: string; name: string }>;
  assert.equal(models[0].id, "cx/gpt-6-sol");
  assert.equal(models[0].name, "Renamed");
});

test("apply drops a model-level baseUrl/api so the applied model uses OmniRoute", async () => {
  const env = await makeEnv({
    providers: {
      omniroute: {
        baseUrl: "http://127.0.0.1:20128/v1",
        apiKey: "sk-old",
        api: "openai-completions",
        omnirouteManaged: true,
        models: [
          {
            id: "cx/gpt-6-sol",
            name: "My Label",
            contextWindow: 123456,
            baseUrl: "https://elsewhere.example/v1",
            api: "anthropic-messages",
          },
          { id: "other/model", baseUrl: "https://kept.example/v1", api: "openai-responses" },
        ],
      },
    },
  });

  await applyOmniRoutePiProvider({ ...APPLY, model: "cx/gpt-6-sol" }, env);

  const { config } = await readPiModelsJson(env);
  const provider = readOmniRoutePiProvider(config);
  assert.equal(provider?.baseUrl, "http://127.0.0.1:20128/v1");
  assert.equal(provider?.api, "openai-completions");
  assert.deepEqual(provider?.models, [
    // Pi reads `definition.baseUrl ?? provider.baseUrl`, so these would win over
    // the provider values Apply just wrote. Everything else on the entry stays.
    { id: "cx/gpt-6-sol", name: "My Label", contextWindow: 123456 },
    // A model that was not applied is left exactly as the user wrote it.
    { id: "other/model", baseUrl: "https://kept.example/v1", api: "openai-responses" },
  ]);
});
