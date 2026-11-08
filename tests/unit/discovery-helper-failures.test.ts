import assert from "node:assert/strict";
import test from "node:test";

import {
  fetchCodexDiscoveryModels,
  fetchCodexGithubCatalogModels,
  clearCodexGithubCatalogCacheForTests,
} from "../../src/app/api/providers/[id]/models/discovery/codex";
import { fromCopilotDiscoveryFailure } from "../../src/shared/discovery/degradedCause";
import { fetchAntigravityDiscoveryModelsCached } from "../../src/app/api/providers/[id]/models/discovery/normalizers";
import {
  fetchGitHubCopilotModels,
  fetchGheCopilotModels,
} from "../../open-sse/services/githubCopilotModels";
import { fetchKiroAvailableModels, clearKiroModelCache } from "../../open-sse/services/kiroModels";
import { resolveClineModels } from "../../open-sse/services/clinepassModels";

/**
 * A model discovery that falls back to a built-in catalog must tell WHY it
 * fell back. The helpers used to swallow the observed failure: they returned
 * an empty list, a `null` or a static catalog, and the reason never left the
 * server log.
 *
 * The reason they hand back is a closed vocabulary — a code or an HTTP status
 * — never a message, a body or an URL.
 */

const NO_CREDENTIAL = { code: "NO_CREDENTIAL" };
const NO_ENDPOINT = { code: "NO_ENDPOINT" };
const EMPTY_CATALOG = { code: "EMPTY_CATALOG" };
const UPSTREAM_ERROR = {};

function assertCarriesNoUpstreamText(failure: unknown) {
  const serialized = JSON.stringify(failure ?? {});
  assert.ok(
    !serialized.includes("sk-") &&
      !serialized.includes("token") &&
      !serialized.includes("http") &&
      !serialized.includes("body"),
    `the failure must not carry upstream text: ${serialized}`
  );
}

test.beforeEach(() => {
  clearCodexGithubCatalogCacheForTests();
  clearKiroModelCache();
});

test("the copilot discovery reports why it fell back to the static catalog", async () => {
  // The Copilot result keeps its structured diagnostics (#17984); the closed
  // vocabulary is derived from them by fromCopilotDiscoveryFailure.
  const withoutToken = await fetchGitHubCopilotModels({
    token: null,
    fetchImpl: async () => {
      assert.fail("no token must not fetch");
    },
  });
  assert.deepEqual(withoutToken.failure, { kind: "missing_token" });
  assert.deepEqual(fromCopilotDiscoveryFailure(withoutToken.failure), NO_CREDENTIAL);
  assert.equal(withoutToken.source, "fallback");

  const unauthorized = await fetchGitHubCopilotModels({
    token: "tok",
    fetchImpl: async () => new Response("nope", { status: 401 }),
  });
  assert.equal(unauthorized.failure?.kind, "http_status");
  assert.deepEqual(fromCopilotDiscoveryFailure(unauthorized.failure), { status: 401 });

  const emptyCatalog = await fetchGitHubCopilotModels({
    token: "tok",
    fetchImpl: async () => Response.json({ data: [] }),
  });
  assert.equal(emptyCatalog.failure?.kind, "empty_catalog");
  assert.deepEqual(fromCopilotDiscoveryFailure(emptyCatalog.failure), EMPTY_CATALOG);

  const notJson = await fetchGitHubCopilotModels({
    token: "tok",
    fetchImpl: async () => new Response("<html>nope</html>", { status: 200 }),
  });
  assert.equal(notJson.failure?.kind, "invalid_json");
  assert.deepEqual(fromCopilotDiscoveryFailure(notJson.failure), { code: "INVALID_RESPONSE" });

  const broken = await fetchGitHubCopilotModels({
    token: "tok",
    fetchImpl: async () => {
      throw new Error('{"key":"sk-abc"} network down');
    },
  });
  assert.equal(broken.failure?.kind, "network");
  assert.deepEqual(fromCopilotDiscoveryFailure(broken.failure), { code: "NETWORK_ERROR" });
  assertCarriesNoUpstreamText(fromCopilotDiscoveryFailure(broken.failure));

  const live = await fetchGitHubCopilotModels({
    token: "tok",
    fetchImpl: async () => Response.json({ data: [{ id: "gpt-5.1", name: "GPT 5.1" }] }),
  });
  assert.equal(live.source, "api");
  assert.equal(live.failure, undefined);
});

test("the enterprise copilot discovery reports why it found no model", async () => {
  const withoutEndpoint = await fetchGheCopilotModels({
    apiUrl: null,
    token: "tok",
    fetchImpl: async () => {
      assert.fail("no endpoint must not fetch");
    },
  });
  assert.deepEqual(withoutEndpoint.failure, NO_ENDPOINT);

  const withoutToken = await fetchGheCopilotModels({
    apiUrl: "https://ghe.example.com",
    token: null,
    fetchImpl: async () => {
      assert.fail("no token must not fetch");
    },
  });
  assert.deepEqual(withoutToken.failure, NO_CREDENTIAL);

  const unauthorized = await fetchGheCopilotModels({
    apiUrl: "https://ghe.example.com",
    token: "tok",
    fetchImpl: async () => new Response("nope", { status: 403 }),
  });
  assert.deepEqual(unauthorized.failure, { status: 403 });
  assert.deepEqual(unauthorized.models, []);

  const emptyCatalog = await fetchGheCopilotModels({
    apiUrl: "https://ghe.example.com",
    token: "tok",
    fetchImpl: async () => Response.json({ data: [] }),
  });
  assert.deepEqual(emptyCatalog.failure, EMPTY_CATALOG);

  const broken = await fetchGheCopilotModels({
    apiUrl: "https://ghe.example.com",
    token: "tok",
    fetchImpl: async () => {
      throw new Error("network down");
    },
  });
  assert.deepEqual(broken.failure, UPSTREAM_ERROR);
});

test("the kiro discovery reports why it fell back to the static catalog", async () => {
  const withoutToken = await fetchKiroAvailableModels({
    accessToken: null,
    fetchImpl: async () => {
      assert.fail("no token must not fetch");
    },
  });
  assert.deepEqual(withoutToken.failure, NO_CREDENTIAL);
  assert.equal(withoutToken.source, "fallback");

  const unauthorized = await fetchKiroAvailableModels({
    accessToken: "tok",
    fetchImpl: async () => new Response("nope", { status: 401 }),
  });
  assert.deepEqual(unauthorized.failure, { status: 401 });

  const emptyCatalog = await fetchKiroAvailableModels({
    accessToken: "tok",
    fetchImpl: async () => Response.json({ models: [] }),
  });
  assert.deepEqual(emptyCatalog.failure, EMPTY_CATALOG);

  const broken = await fetchKiroAvailableModels({
    accessToken: "tok",
    fetchImpl: async () => {
      throw new Error("network down");
    },
  });
  assert.deepEqual(broken.failure, UPSTREAM_ERROR);

  const live = await fetchKiroAvailableModels({
    accessToken: "tok",
    fetchImpl: async () => Response.json({ models: [{ id: "kiro-model" }] }),
  });
  assert.equal(live.source, "api");
  assert.equal(live.failure, undefined);
});

test("the cline discovery reports why the catalog could not be resolved", async () => {
  const unauthorized = await resolveClineModels(async () => new Response("nope", { status: 502 }));
  assert.deepEqual(unauthorized.failure, { status: 502 });
  assert.deepEqual(unauthorized.models, []);

  const unusable = await resolveClineModels(async () => Response.json({ unexpected: true }));
  assert.deepEqual(unusable.failure, UPSTREAM_ERROR);

  const broken = await resolveClineModels(async () => {
    throw new Error("network down");
  });
  assert.deepEqual(broken.failure, UPSTREAM_ERROR);
});

test("the codex live discovery reports why it found no model", async () => {
  const withoutToken = await fetchCodexDiscoveryModels({
    accessToken: null,
    fetchImpl: async () => {
      assert.fail("no token must not fetch");
    },
  });
  assert.deepEqual(withoutToken.failure, NO_CREDENTIAL);
  assert.deepEqual(withoutToken.models, []);

  const unauthorized = await fetchCodexDiscoveryModels({
    accessToken: "tok",
    fetchImpl: async () => new Response("nope", { status: 401 }),
  });
  assert.deepEqual(unauthorized.failure, { status: 401 });

  const emptyCatalog = await fetchCodexDiscoveryModels({
    accessToken: "tok",
    fetchImpl: async () => Response.json({ data: [] }),
  });
  assert.deepEqual(emptyCatalog.failure, EMPTY_CATALOG);

  const broken = await fetchCodexDiscoveryModels({
    accessToken: "tok",
    fetchImpl: async () => {
      throw new Error("network down");
    },
  });
  assert.deepEqual(broken.failure, UPSTREAM_ERROR);
});

test("the codex public catalog discovery reports why it could not be read", async () => {
  const unauthorized = await fetchCodexGithubCatalogModels({
    fetchImpl: async () => new Response("nope", { status: 500 }),
  });
  assert.deepEqual(unauthorized.failure, { status: 500 });
  assert.deepEqual(unauthorized.models, []);

  const emptyCatalog = await fetchCodexGithubCatalogModels({
    fetchImpl: async () => Response.json({ models: [] }),
  });
  assert.deepEqual(emptyCatalog.failure, EMPTY_CATALOG);

  const broken = await fetchCodexGithubCatalogModels({
    fetchImpl: async () => {
      throw new Error("network down");
    },
  });
  assert.deepEqual(broken.failure, UPSTREAM_ERROR);
});

test("the antigravity discovery reports why it found no model", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response("upstream down", { status: 503 })) as unknown as typeof fetch;
  try {
    const discovery = await fetchAntigravityDiscoveryModelsCached(
      "test-access-token",
      "conn-1",
      null,
      {},
      "antigravity"
    );
    assert.deepEqual(discovery.models, []);
    assert.deepEqual(discovery.failure, { status: 503 });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
