// OpenCode Zen/Go reject `Authorization: Bearer <api key>` on /v1/models with
// 401 {code: api_key_expired} while the same key authenticates the chat endpoint
// and returns the full catalog under `x-api-key`. Live probes 2026-10-23 on three
// accounts: bearer 401, x-api-key 200 (85 zen models / 36 go models), and sending
// BOTH headers still 401 because the bearer branch wins. Model discovery must
// therefore send the key as `x-api-key` and must not send Authorization.
import test from "node:test";
import assert from "node:assert/strict";

const { PROVIDER_MODELS_CONFIG } =
  await import("../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts");

function buildHeaders(vendor: "opencode-zen" | "opencode-go"): Record<string, string> {
  const entry = PROVIDER_MODELS_CONFIG[vendor];
  assert.ok(entry, `${vendor} discovery entry must exist`);
  assert.equal(typeof entry.buildHeaders, "function", `${vendor} must build its own headers`);
  return entry.buildHeaders("zen-api-key-value", { id: "connection-1" });
}

for (const vendor of ["opencode-zen", "opencode-go"] as const) {
  test(`${vendor} model discovery authenticates with x-api-key`, () => {
    const headers = buildHeaders(vendor);

    assert.equal(headers["x-api-key"], "zen-api-key-value");
    // Case-insensitive on purpose: an injected lowercase `authorization` header
    // must fail here, because the bearer branch wins even when both are present.
    const bearerKeys = Object.keys(headers).filter((key) => key.toLowerCase() === "authorization");
    assert.deepEqual(
      bearerKeys,
      [],
      "a bearer header on the models endpoint is answered with 401 api_key_expired"
    );
  });

  test(`${vendor} model discovery keeps the OpenCode client identity headers`, () => {
    const headers = buildHeaders(vendor);
    const lower = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])
    );

    assert.equal(lower["user-agent"], "opencode");
    assert.ok(lower["x-opencode-session"], "session identity header must survive");
  });
}
