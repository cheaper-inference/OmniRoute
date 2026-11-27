/**
 * #18838 (salvage) — the native decision routes reuse the #20852 credential resolver.
 *
 * `resolveDecisionConnectionCredentials` keeps its rules (a referenced connection only inside
 * the allowlist, the scoped provider selection otherwise) and never reads the environment key;
 * `resolveDecisionApiKey` keeps its environment fallback for the auto-router.
 */
import test from "node:test";
import assert from "node:assert/strict";

const credentials = await import("../../open-sse/services/decision/credentials.ts");
const { resolveEndpointCategory } =
  await import("../../src/shared/constants/endpointCategories.ts");

const ENV = { OMNIROUTE_DECISION_API_KEY: "env-operator-key" };

test("resolveDecisionConnectionCredentials returns the scoped record and never the env key", async () => {
  assert.equal(typeof credentials.resolveDecisionConnectionCredentials, "function");
  const seen: Array<[string, string[] | null]> = [];
  const record = { apiKey: "sk-a", connectionId: "a", providerSpecificData: { baseUrl: "x" } };
  const got = await credentials.resolveDecisionConnectionCredentials(
    { provider: "openai", apiKeyAllowedConnections: ["a"] },
    {
      env: ENV,
      getCredentials: async (provider, allowlist) => {
        seen.push([provider, allowlist]);
        return record;
      },
    }
  );
  assert.equal(got, record, "the whole record, connection id and provider data included");
  assert.deepEqual(seen, [["openai", ["a"]]]);

  const none = await credentials.resolveDecisionConnectionCredentials(
    { provider: "openai" },
    { env: ENV, getCredentials: async () => null }
  );
  assert.equal(none, null, "no stored connection -> nothing, never the environment key");
});

test("resolveDecisionConnectionCredentials keeps a referenced connection inside the allowlist", async () => {
  let called = false;
  const outside = await credentials.resolveDecisionConnectionCredentials(
    { provider: "openai", connectionId: "b", apiKeyAllowedConnections: ["a"] },
    {
      getCredentials: async () => {
        called = true;
        return { apiKey: "sk-b" };
      },
    }
  );
  assert.equal(outside, null);
  assert.equal(called, false, "no credential read outside the allowlist");
});

test("resolveDecisionApiKey still falls back to the env key only without a connection reference", async () => {
  assert.equal(
    await credentials.resolveDecisionApiKey(
      { provider: "typesafe" },
      { env: ENV, getCredentials: async () => null }
    ),
    "env-operator-key"
  );
  assert.equal(
    await credentials.resolveDecisionApiKey(
      { provider: "typesafe", connectionId: "c" },
      { env: ENV, getCredentials: async () => null }
    ),
    null
  );
  assert.equal(
    await credentials.resolveDecisionApiKey(
      { provider: "typesafe" },
      { env: ENV, getCredentials: async () => ({ apiKey: " sk-stored " }) }
    ),
    "sk-stored"
  );
});

test("key endpoint allowlists cover POST /v1/decisions through the decisions category", () => {
  assert.equal(resolveEndpointCategory("/v1/decisions"), "decisions");
});
