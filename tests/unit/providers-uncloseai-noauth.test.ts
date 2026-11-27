import { test } from "node:test";
import assert from "node:assert/strict";
import {
  APIKEY_PROVIDERS,
  NOAUTH_PROVIDERS,
  providerAllowsOptionalApiKey,
} from "@/shared/constants/providers";

test("UncloseAI requires an existing API key after the public beta closed (#19385)", () => {
  assert.equal(Object.hasOwn(NOAUTH_PROVIDERS, "uncloseai"), false);
  assert.equal(providerAllowsOptionalApiKey("uncloseai"), false);
  assert.equal(APIKEY_PROVIDERS.uncloseai.hasFree, false);
  assert.equal(APIKEY_PROVIDERS.uncloseai.alias, "unc");
});
