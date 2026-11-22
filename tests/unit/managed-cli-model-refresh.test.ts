import assert from "node:assert/strict";
import test from "node:test";
import { refreshManagedCliProviderModels } from "../../src/shared/services/managedCliModelRefresh.ts";

test("refresh uses existing discovery only for matching active provider connections", async () => {
  const calls: string[] = [];
  const fetchMock: typeof fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    if (url === "/api/providers") {
      return Response.json({
        connections: [
          { id: "codex-active", provider: "codex", isActive: true },
          { id: "codex-disabled", provider: "codex", isActive: false },
          { id: "claude-active", provider: "claude", isActive: true },
        ],
      });
    }
    return Response.json({ models: [{ id: "new-model" }], source: "api" });
  };
  assert.deepEqual(await refreshManagedCliProviderModels("codex", fetchMock), {
    attempted: 1,
    refreshed: 1,
    failed: 0,
  });
  assert.deepEqual(calls, ["/api/providers", "/api/providers/codex-active/models?refresh=true"]);
});

test("failed and degraded model discovery cannot be reported as refreshed", async () => {
  let index = 0;
  const fetchMock: typeof fetch = async () => {
    index += 1;
    if (index === 1)
      return Response.json({
        connections: [
          { id: "a", provider: "claude" },
          { id: "b", provider: "claude" },
          { id: "c", provider: "claude" },
          { id: "d", provider: "claude" },
        ],
      });
    if (index === 2) return Response.json({ error: "Unavailable" }, { status: 503 });
    if (index === 3) return Response.json({ models: [], source: "fallback" });
    if (index === 4)
      return Response.json({ models: [{ id: "old" }], failure: { reason: "timeout" } });
    return Response.json({ models: [{ id: "new" }], source: "api" });
  };
  assert.deepEqual(await refreshManagedCliProviderModels("claude", fetchMock), {
    attempted: 4,
    refreshed: 1,
    failed: 3,
  });
});

test("Codex discovery with a degraded client version does not count as refreshed", async () => {
  const fetchMock: typeof fetch = async (input) => {
    if (input === "/api/providers") {
      return Response.json({ connections: [{ id: "codex-active", provider: "codex" }] });
    }
    return Response.json({
      source: "api",
      models: [{ id: "new-model" }],
      discovery: { clientVersion: { degraded: true } },
    });
  };
  assert.deepEqual(await refreshManagedCliProviderModels("codex", fetchMock), {
    attempted: 1,
    refreshed: 0,
    failed: 1,
  });
});

test("tools without live model discovery do not request provider data", async () => {
  let calls = 0;
  const fetchMock: typeof fetch = async () => {
    calls += 1;
    throw new Error("Unexpected fetch");
  };
  for (const toolId of ["unsupported", "qoder", "droid", "openclaw"]) {
    assert.deepEqual(await refreshManagedCliProviderModels(toolId, fetchMock), {
      attempted: 0,
      refreshed: 0,
      failed: 0,
    });
  }
  assert.equal(calls, 0);
});

test("abort stops subsequent discovery and provider-list failures remain visible", async () => {
  const controller = new AbortController();
  controller.abort();
  const fetchMock: typeof fetch = async () => {
    throw new Error("Must not run");
  };
  await assert.rejects(
    refreshManagedCliProviderModels("codex", fetchMock, { signal: controller.signal }),
    {
      name: "AbortError",
    }
  );
  await assert.rejects(
    refreshManagedCliProviderModels("codex", async () => new Response("", { status: 401 })),
    /Unable to load provider connections/
  );
});

test("connection identifiers are escaped and duplicate discovery is avoided", async () => {
  const calls: string[] = [];
  const fetchMock: typeof fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    return url === "/api/providers"
      ? Response.json({
          connections: [
            { id: "a/b?c", provider: "codex" },
            { id: "a/b?c", provider: "codex" },
          ],
        })
      : Response.json({ models: [{ id: "new" }] });
  };
  await refreshManagedCliProviderModels("codex", fetchMock);
  assert.deepEqual(calls, ["/api/providers", "/api/providers/a%2Fb%3Fc/models?refresh=true"]);
});
