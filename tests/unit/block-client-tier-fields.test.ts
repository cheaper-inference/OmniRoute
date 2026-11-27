/**
 * Per-connection opt-in `providerSpecificData.blockClientTierFields` (default off):
 * the client-supplied service_tier, safety_identifier, inference_geo, speed and
 * include_obfuscation fields are removed from the upstream body, so an unapproved
 * premium tier or caller identity reaches the provider zero times.
 * With the flag off or absent the body is exactly as before.
 */
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-block-tier-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const { setPayloadRulesConfig, resetPayloadRulesConfigForTests } =
  await import("../../open-sse/services/payloadRules.ts");
const { createProviderSchema, updateProviderConnectionSchema } =
  await import("../../src/shared/validation/schemas.ts");

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const BLOCKED = [
  "service_tier",
  "safety_identifier",
  "inference_geo",
  "speed",
  "include_obfuscation",
] as const;

function clientBody() {
  return {
    messages: [{ role: "user", content: "hi" }],
    service_tier: "priority",
    safety_identifier: "user-1",
    inference_geo: "us",
    speed: "fast",
    include_obfuscation: true,
  };
}

async function prepare(
  providerSpecificData: Record<string, unknown> | undefined,
  source = clientBody()
) {
  return prepareUpstreamBody({
    translatedBody: source,
    modelToCall: "gpt-4o",
    provider: "openai",
    targetFormat: "openai",
    credentials: { apiKey: ["k", "e", "y"].join("-"), providerSpecificData },
  });
}

test("flag on: the five client tier and identity fields never reach the upstream body", async () => {
  const out = await prepare({ blockClientTierFields: true });
  for (const field of BLOCKED) assert.equal(field in out, false, `${field} must be removed`);
  assert.deepEqual(out.messages, [{ role: "user", content: "hi" }]);
  assert.equal(out.model, "gpt-4o");
});

test("flag on: the source body is not mutated", async () => {
  const source = clientBody();
  await prepare({ blockClientTierFields: true }, source);
  assert.deepEqual(source, clientBody());
});

test("flag off, false or absent: every field is forwarded as before", async () => {
  for (const psd of [undefined, {}, { blockClientTierFields: false }]) {
    const out = await prepare(psd);
    for (const field of BLOCKED)
      assert.ok(field in out, `${field} must stay (${JSON.stringify(psd)})`);
  }
});

test("flag on: an operator payload rule can still set the tier after the client value is dropped", async () => {
  setPayloadRulesConfig({
    default: [],
    override: [{ models: [{ name: "*" }], params: { service_tier: "default" } }],
    filter: [],
  });
  try {
    const out = await prepare({ blockClientTierFields: true });
    assert.equal(out.service_tier, "default");
    assert.equal("safety_identifier" in out, false);
  } finally {
    resetPayloadRulesConfigForTests();
  }
});

test("only the literal boolean true turns the block on", async () => {
  const out = await prepare({ blockClientTierFields: "true" });
  assert.ok("service_tier" in out);
});

test("provider schemas accept a boolean and refuse other values", () => {
  const base = { provider: "openai", apiKey: ["k", "e", "y"].join("-"), name: "OpenAI" };
  const ok = createProviderSchema.safeParse({
    ...base,
    providerSpecificData: { blockClientTierFields: true },
  });
  const bad = createProviderSchema.safeParse({
    ...base,
    providerSpecificData: { blockClientTierFields: "yes" },
  });
  const badPatch = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { blockClientTierFields: 1 },
  });
  assert.equal(ok.success, true);
  assert.equal(bad.success, false);
  assert.equal(badPatch.success, false);
});
