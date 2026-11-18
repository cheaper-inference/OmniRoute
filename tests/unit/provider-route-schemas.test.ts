import test from "node:test";
import assert from "node:assert/strict";

const { createProviderSchema, providersBatchTestSchema } =
  await import("../../src/shared/validation/schemas.ts");
const { providerAllowsOptionalApiKey } = await import("../../src/shared/constants/providers.ts");

// The registry declares optional auth for Pollinations, so a connection without
// a pasted key is valid and a key, when supplied, is still honoured.
test("Pollinations allows an optional API key", () => {
  assert.equal(providerAllowsOptionalApiKey("pollinations"), true);
});

test("createProviderSchema accepts Pollinations without apiKey", () => {
  const result = createProviderSchema.safeParse({
    provider: "pollinations",
    name: "Pollinations",
  });

  assert.equal(result.success, true);
});

test("providersBatchTestSchema accepts cloud-agent batch mode", () => {
  const result = providersBatchTestSchema.safeParse({
    mode: "cloud-agent",
  });

  assert.equal(result.success, true);
});
