import assert from "node:assert/strict";
import test from "node:test";

import { providerAllowsOptionalApiKey } from "@/shared/constants/providers.ts";
import { listNoCredentialProviders } from "@/shared/utils/providerCredentialRequirement.ts";

test("providers usable without a credential from the registry allow a keyless connection", () => {
  // These entries declare optional auth: anonymous access works and a key is accepted.
  assert.equal(providerAllowsOptionalApiKey("ovhcloud"), true);
  // The catalog alias must resolve to the same canonical id.
  assert.equal(providerAllowsOptionalApiKey("ovh"), true);
  assert.equal(providerAllowsOptionalApiKey("kilo-gateway"), true);
  assert.equal(providerAllowsOptionalApiKey("pollinations"), true);
});

test("providers that require a credential still refuse a keyless connection", () => {
  assert.equal(providerAllowsOptionalApiKey("groq"), false);
  // Signing in is still a barrier: OAuth providers must not become keyless.
  assert.equal(providerAllowsOptionalApiKey("agy"), false);
});

test("providers outside the registry keep their declared keyless behavior", () => {
  assert.equal(providerAllowsOptionalApiKey("searxng-search"), true);
});

test("non-string and unknown input is refused", () => {
  assert.equal(providerAllowsOptionalApiKey(null), false);
  assert.equal(providerAllowsOptionalApiKey(42), false);
  assert.equal(providerAllowsOptionalApiKey(""), false);
  assert.equal(providerAllowsOptionalApiKey("definitely-not-a-provider"), false);
});

test("every provider listed as usable without a credential passes the connect gate", () => {
  const ids = listNoCredentialProviders();
  assert.ok(ids.length > 0);
  for (const id of ids) {
    assert.equal(
      providerAllowsOptionalApiKey(id),
      true,
      `${id} is listed as usable without a credential but the connect gate refuses it`
    );
  }
});
