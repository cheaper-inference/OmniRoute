import assert from "node:assert/strict";
import test from "node:test";
import { unexpectedCatalogNetworkRequests } from "./catalogNetworkGuard13389.ts";

// Import this helper dynamically after selecting the test's DATA_DIR, before
// application modules. Catalog content regressions do not need anonymous image
// discovery over the internet. Keep the real catalog timeout and cache behavior.
const guardedFetch = globalThis.fetch;
const { aiHordeImageCatalog } = await import("../../open-sse/services/aihordeImageCatalog.ts");
aiHordeImageCatalog.setFetch(async () => Response.json([]));

// Importing the image transport also installs the proxy fetch interceptor. Restore
// a controlled boundary after that side effect. These listing tests treat the
// optional Codex quota reading as unavailable; every other unmocked URL still fails.
globalThis.fetch = async (input, init) => {
  const url = input instanceof Request ? input.url : String(input);
  const method = init?.method ?? (input instanceof Request ? input.method : "GET");
  if (url === "https://chatgpt.com/backend-api/wham/usage" && method === "GET") {
    return Response.json({ error: "quota unavailable in catalog fixture" }, { status: 503 });
  }
  return guardedFetch(input, init);
};

test.after(() => {
  assert.deepEqual(
    unexpectedCatalogNetworkRequests,
    [],
    "catalog fixtures must not use live network"
  );
});
