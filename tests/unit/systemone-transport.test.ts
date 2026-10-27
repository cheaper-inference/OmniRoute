/**
 * System One transport: endpoint resolution and request headers.
 *
 * A decision call must only ever leave for the provider's own allowlisted
 * host(s). The endpoint is configurable per connection so an operator can
 * follow a vendor's path change without a release, but a host outside the
 * allowlist, a plaintext scheme, embedded credentials or a cloud-metadata
 * address are all rejected before any credential is attached.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  SystemOneEndpointError,
  systemOneHeaders,
  systemOneUrl,
} from "../../open-sse/handlers/systemOneTransport.ts";

function captureError(fn: () => unknown): SystemOneEndpointError {
  try {
    fn();
  } catch (error) {
    assert.ok(error instanceof SystemOneEndpointError, `unexpected error: ${String(error)}`);
    return error as SystemOneEndpointError;
  }
  throw new Error("expected the call to throw");
}

test("each backend resolves its documented decision endpoint by default", () => {
  assert.equal(
    systemOneUrl("opencode-zen", {}),
    "https://opencode.ai/inference/systemone/v1/systemone"
  );
  assert.equal(
    systemOneUrl("vercel-ai-gateway", {}),
    "https://ai-gateway.vercel.sh/typesafe/v1/systemone"
  );
  assert.equal(systemOneUrl("openrouter", {}), "https://openrouter.ai/api/v1/systemone");
  assert.equal(systemOneUrl("typesafe", {}), "https://api.typesafe.ai/v1/systemone");
});

test("each backend resolves its documented catalog endpoint by default", () => {
  assert.equal(
    systemOneUrl("opencode-zen", {}, "models"),
    "https://opencode.ai/inference/v1/models"
  );
  assert.equal(
    systemOneUrl("vercel-ai-gateway", {}, "models"),
    "https://ai-gateway.vercel.sh/typesafe/v1/models"
  );
  assert.equal(
    systemOneUrl("openrouter", {}, "models"),
    "https://openrouter.ai/api/v1/models?output_modalities=decisions"
  );
  assert.equal(systemOneUrl("typesafe", {}, "models"), "https://api.typesafe.ai/v1/models");
});

test("a per-connection endpoint override on an allowlisted host is honored", () => {
  assert.equal(
    systemOneUrl("opencode-zen", {
      providerSpecificData: { systemOneUrl: "https://opencode.ai/zen/v1/systemone" },
    }),
    "https://opencode.ai/zen/v1/systemone"
  );
  // A subdomain of the allowlisted host is accepted; vendors move APIs there.
  assert.equal(
    systemOneUrl("openrouter", {
      providerSpecificData: { systemOneUrl: "https://api.openrouter.ai/api/v2/systemone" },
    }),
    "https://api.openrouter.ai/api/v2/systemone"
  );
  assert.equal(
    systemOneUrl(
      "opencode-zen",
      { providerSpecificData: { systemOneModelsUrl: "https://opencode.ai/zen/v2/models" } },
      "models"
    ),
    "https://opencode.ai/zen/v2/models"
  );
});

test("the decision override does not leak into the catalog read, or the reverse", () => {
  const connection = {
    providerSpecificData: { systemOneUrl: "https://opencode.ai/zen/v1/systemone" },
  };
  assert.equal(
    systemOneUrl("opencode-zen", connection, "models"),
    "https://opencode.ai/inference/v1/models"
  );
  const catalogOnly = {
    providerSpecificData: { systemOneModelsUrl: "https://opencode.ai/zen/v2/models" },
  };
  assert.equal(
    systemOneUrl("opencode-zen", catalogOnly),
    "https://opencode.ai/inference/systemone/v1/systemone"
  );
});

test("an override outside the provider's allowlisted hosts is rejected", () => {
  for (const url of [
    "https://evil.example.com/inference/v1/systemone",
    // Suffix-confusion: `notopencode.ai` is not a subdomain of `opencode.ai`.
    "https://notopencode.ai/inference/v1/systemone",
    "https://opencode.ai.evil.example/inference/v1/systemone",
    // Another registered backend's host is still not this provider's host.
    "https://openrouter.ai/api/v1/systemone",
  ]) {
    const error = captureError(() =>
      systemOneUrl("opencode-zen", { providerSpecificData: { systemOneUrl: url } })
    );
    assert.equal(error.status, 400);
    assert.match(error.message, /allowlist/i);
  }
});

test("the direct TypeSafe key cannot be redirected to a gateway host", () => {
  for (const url of [
    "https://openrouter.ai/api/v1/systemone",
    "https://ai-gateway.vercel.sh/typesafe/v1/systemone",
    "https://api.typesafe.ai.evil.example/v1/systemone",
  ]) {
    assert.throws(
      () => systemOneUrl("typesafe", { providerSpecificData: { systemOneUrl: url } }),
      SystemOneEndpointError
    );
  }
});

test("a plaintext, credentialed or malformed override is rejected", () => {
  for (const url of [
    "http://opencode.ai/inference/v1/systemone",
    "https://user:secret@opencode.ai/inference/v1/systemone",
    "ftp://opencode.ai/systemone",
    "not a url",
  ]) {
    const error = captureError(() =>
      systemOneUrl("opencode-zen", { providerSpecificData: { systemOneUrl: url } })
    );
    assert.equal(error.status, 400);
    // The rejection must not quote the credential it just refused.
    assert.doesNotMatch(error.message, /secret/);
  }
});

test("a blank override is treated as unset, not as an error", () => {
  for (const blank of ["", "   "]) {
    assert.equal(
      systemOneUrl("opencode-zen", { providerSpecificData: { systemOneUrl: blank } }),
      "https://opencode.ai/inference/systemone/v1/systemone"
    );
  }
});

test("a cloud-metadata or private address override is rejected even if spelled as the host", () => {
  for (const url of ["https://169.254.169.254/systemone", "http://127.0.0.1/systemone"]) {
    const error = captureError(() =>
      systemOneUrl("openrouter", { providerSpecificData: { systemOneUrl: url } })
    );
    assert.equal(error.status, 400);
  }
});

test("an unregistered provider cannot produce a URL", () => {
  assert.throws(() => systemOneUrl("anthropic", {}));
});

test("headers carry the connection bearer token and JSON content types", () => {
  const headers = systemOneHeaders("openrouter", { apiKey: "sk-test-key" });
  assert.equal(headers.Authorization, "Bearer sk-test-key");
  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers.Accept, "application/json");
});

test("native providers identify the actual application with one fixed User-Agent", () => {
  for (const provider of ["opencode-zen", "openrouter", "vercel-ai-gateway", "typesafe"]) {
    const headers = systemOneHeaders(provider, { apiKey: "synthetic-native-key" });
    assert.equal(headers["User-Agent"], "OmniRoute-SystemOne/1.0");
    assert.deepEqual(Object.keys(headers).sort(), [
      "Accept",
      "Authorization",
      "Content-Type",
      "User-Agent",
    ]);
  }
});

test("native application identity cannot be replaced by connection-supplied headers", () => {
  const headers = systemOneHeaders("opencode-zen", {
    apiKey: "synthetic-native-key",
    providerSpecificData: {
      headers: { "User-Agent": "Mozilla/5.0", "X-Client-Identity": "opencode" },
      userAgent: "opencode/1.0",
    },
  });
  assert.equal(headers["User-Agent"], "OmniRoute-SystemOne/1.0");
  assert.equal("X-Client-Identity" in headers, false);
});

test("an OAuth access token is used when no API key is stored", () => {
  assert.equal(
    systemOneHeaders("openrouter", { accessToken: "oauth-token" }).Authorization,
    "Bearer oauth-token"
  );
});

test("OpenCode uses its configured Zen key as a bearer credential", () => {
  const credential = ["fixture", "zen"].join("-");
  const headers = systemOneHeaders("opencode-zen", { apiKey: credential, accessToken: null });
  assert.equal(headers.Authorization, `Bearer ${credential}`);
  assert.equal(headers.Accept, "application/json");
});

test("client-supplied headers cannot be injected through providerSpecificData", () => {
  const headers = systemOneHeaders("openrouter", {
    apiKey: "sk-test-key",
    providerSpecificData: { headers: { Authorization: "Bearer attacker", "X-Evil": "1" } },
  });
  assert.equal(headers.Authorization, "Bearer sk-test-key");
  assert.equal("X-Evil" in headers, false);
});
