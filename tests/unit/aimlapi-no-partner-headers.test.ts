// AI/ML API (aimlapi) — the provider sends no partner attribution.
//
// The discovery/seed/null-param repair (#13667) lands without the
// `X-AIMLAPI-Partner-ID` / `X-AIMLAPI-Source` headers that tagged every
// operator's aimlapi traffic with a commercial partner id (owner decision on
// #13668). This guard keeps them from coming back through the registry entry or
// the executor's built headers.
import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "@omniroute/open-sse/config/providers/index.ts";
import { aimlapiProvider } from "@omniroute/open-sse/config/providers/registry/aimlapi/index.ts";
import { getDefaultExecutor } from "@omniroute/open-sse/executors/defaultResolver.ts";
import { APIKEY_PROVIDERS } from "@/shared/constants/providers/apikey/index";

const isAimlapiAttribution = (key: string) => key.toLowerCase().startsWith("x-aimlapi-");

test("no registry entry declares an X-AIMLAPI-* header", () => {
  const carriers = Object.entries(REGISTRY)
    .filter(([, entry]) =>
      Object.keys({ ...(entry.headers ?? {}), ...(entry.extraHeaders ?? {}) }).some(
        isAimlapiAttribution
      )
    )
    .map(([id]) => id);
  assert.deepEqual(carriers, []);
});

test("the aimlapi executor builds only auth and content headers", () => {
  const headers = getDefaultExecutor("aimlapi").buildHeaders(
    { apiKey: "test-key" } as never,
    false
  );
  assert.equal(headers.Authorization, "Bearer test-key");
  assert.deepEqual(Object.keys(headers).filter(isAimlapiAttribution), []);
  assert.equal(aimlapiProvider.headers, undefined);
});

test("the provider keeps the label OmniRoute already shipped", () => {
  assert.equal(APIKEY_PROVIDERS.aimlapi.name, "AI/ML API");
  assert.equal(APIKEY_PROVIDERS.aimlapi.id, "aimlapi");
  assert.equal(APIKEY_PROVIDERS.aimlapi.alias, "aiml");
});
