import test from "node:test";
import assert from "node:assert/strict";
import { providerAllowsOptionalApiKey } from "../../src/shared/constants/providers.js";

test("pollinations allows an optional API key and accepts a keyless connection", () => {
  assert.equal(
    providerAllowsOptionalApiKey("pollinations"),
    true,
    "pollinations serves free models without a credential and accepts a key when one is provided"
  );
});
