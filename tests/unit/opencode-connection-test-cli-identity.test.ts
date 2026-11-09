/**
 * Regression test — the connection Test button for opencode-zen / opencode-go.
 *
 * Model discovery already reaches opencode.ai with the OpenCode CLI identity
 * (`buildOpencodeBackgroundHeaders()`: User-Agent + x-opencode-session/request/
 * client/project) and authenticates the catalog with `x-api-key`. The connection
 * test went through the generic OpenAI-like probe instead: a bare `/models` GET
 * with a bearer and no CLI identity, and when that failed it POSTed a chat
 * request for the registry's first model (`big-pickle`, a free-tier model) to the
 * keyed `/zen/v1` lane, which refuses the request shape with 403 FreeTierError —
 * and that 403 was reported as "Invalid API key".
 *
 * Under test (all through `validateProviderApiKey`, the function the Test button
 * calls, with `globalThis.fetch` mocked — no network):
 *   1. the probe carries the same identity headers as discovery;
 *   2. a 403 free-tier / fingerprint refusal is not labelled "Invalid API key";
 *   3. the free lane is never probed with a chat request after `/models` fails.
 */
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";

import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import {
  isValidOpencodeSessionValue,
  OPENCODE_REQUEST_PATTERN,
} from "../../open-sse/utils/opencodeHeaders.ts";

type Call = { url: string; method: string; headers: Record<string, string> };

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function toHeaderRecord(headers: HeadersInit | undefined): Record<string, string> {
  const record: Record<string, string> = {};
  new Headers(headers).forEach((value, key) => {
    record[key.toLowerCase()] = value;
  });
  return record;
}

function mockFetch(respond: (call: Call) => Response): Call[] {
  const calls: Call[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const call = {
      url,
      method: (init?.method || "GET").toUpperCase(),
      headers: toHeaderRecord(init?.headers),
    };
    calls.push(call);
    return respond(call);
  }) as typeof fetch;
  return calls;
}

const FREE_TIER_403_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message: "The free tier can only be used from the OpenCode client.",
  },
});

for (const provider of ["opencode-zen", "opencode-go"] as const) {
  test(`${provider}: the connection test sends the discovery CLI identity headers`, async () => {
    const calls = mockFetch(() => new Response(JSON.stringify({ data: [] }), { status: 200 }));

    const result = await validateProviderApiKey({
      provider,
      apiKey: "oc-test-key",
      providerSpecificData: { opencodeGoWorkspaceId: "wrk_01ABC" },
    });

    assert.equal(result.valid, true, JSON.stringify(result));
    assert.equal(calls.length, 1, "a 200 catalog answer settles the test in one request");
    const [probe] = calls;
    assert.equal(probe.url, "https://opencode.ai/zen/v1/models");

    // Same identity and auth shape as the discovery entry for this provider.
    const discovery = toHeaderRecord(
      PROVIDER_MODELS_CONFIG[provider].buildHeaders!("oc-test-key", {
        providerSpecificData: { opencodeGoWorkspaceId: "wrk_01ABC" },
      })
    );
    for (const key of [
      "user-agent",
      "x-opencode-client",
      "x-opencode-project",
      "x-opencode-session",
      "x-api-key",
    ]) {
      assert.equal(probe.headers[key], discovery[key], `${key} must match discovery`);
    }
    assert.equal(
      isValidOpencodeSessionValue(probe.headers["x-opencode-session"]),
      probe.headers["x-opencode-session"]
    );
    assert.match(probe.headers["x-opencode-request"] ?? "", OPENCODE_REQUEST_PATTERN);
    assert.equal(probe.headers.authorization, undefined, "discovery sends no bearer on /models");
  });

  test(`${provider}: a 403 free-tier refusal is not reported as an invalid key and no chat probe follows`, async () => {
    const calls = mockFetch(() => new Response(FREE_TIER_403_BODY, { status: 403 }));

    const result = await validateProviderApiKey({
      provider,
      apiKey: "oc-test-key",
      providerSpecificData: {},
    });

    assert.equal(result.valid, false);
    assert.notEqual(result.error, "Invalid API key");
    assert.match(String(result.error), /OpenCode/);
    assert.equal(calls.length, 1, "the free lane must not be probed after /models fails");
    assert.ok(
      calls.every((call) => call.method === "GET" && !call.url.includes("/chat/completions")),
      "no chat request may be sent"
    );
  });
}

test("opencode-zen: a /models failure never falls through to a big-pickle chat probe", async () => {
  const calls = mockFetch((call) =>
    call.url.endsWith("/models")
      ? new Response("not found", { status: 404 })
      : new Response(FREE_TIER_403_BODY, { status: 403 })
  );

  const result = await validateProviderApiKey({
    provider: "opencode-zen",
    apiKey: "oc-test-key",
    providerSpecificData: {},
  });

  assert.equal(calls.length, 1, `expected only the /models probe, got ${JSON.stringify(calls)}`);
  assert.equal(result.valid, false);
  assert.notEqual(result.error, "Invalid API key");
});

test("opencode-zen: a 401 on the catalog is still an invalid key", async () => {
  const calls = mockFetch(
    () => new Response(JSON.stringify({ code: "api_key_expired" }), { status: 401 })
  );

  const result = await validateProviderApiKey({
    provider: "opencode-zen",
    apiKey: "oc-bad-key",
    providerSpecificData: {},
  });

  assert.equal(calls.length, 1);
  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("opencode-zen: a 403 without a free-tier or fingerprint marker is still an invalid key", async () => {
  mockFetch(() => new Response(JSON.stringify({ error: "forbidden" }), { status: 403 }));

  const result = await validateProviderApiKey({
    provider: "opencode-zen",
    apiKey: "oc-bad-key",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("opencode-zen: a 429 on the catalog keeps the key valid with a rate-limit warning", async () => {
  const calls = mockFetch(() => new Response("Too Many Requests", { status: 429 }));

  const result = (await validateProviderApiKey({
    provider: "opencode-zen",
    apiKey: "oc-test-key",
    providerSpecificData: {},
  })) as { valid: boolean; error: string | null; warning?: string };

  assert.equal(calls.length, 1);
  assert.equal(result.valid, true);
  assert.equal(result.error, null);
  assert.match(String(result.warning), /rate limit/i);
});
