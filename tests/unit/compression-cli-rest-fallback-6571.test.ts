import test from "node:test";
import assert from "node:assert/strict";

// Repro for #6571 — REST-fallback path of `omniroute compression` (hit only when
// the MCP surface is not mounted, i.e. mcpCall()'s 404/501 branch) uses the
// nonexistent `engine` field instead of the canonical `defaultMode` field, and
// the table renderer prints "[object Object]" for nested object cells.
//
// #10960 moved the MCP transport from the never-mounted `/api/mcp/tools/call`
// to the real Streamable HTTP endpoint `/api/mcp/stream` (mcpClient.mjs ->
// mcpCallTool()). The REST-fallback trigger in these mocks must match
// that endpoint, not the retired one, or mcpCallTool() throws on an
// unmocked fetch instead of exercising the fallback path this test targets.

type MockResponse = Pick<Response, "ok" | "status" | "headers" | "json" | "text">;

function makeResp(data: unknown, status = 200): MockResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(),
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  };
}

interface CommanderLikeCmd {
  optsWithGlobals: () => { output: string; quiet: boolean };
}

function makeCmd(output = "json"): CommanderLikeCmd {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = ((c: string | Uint8Array) => {
    if (typeof c === "string") chunks.push(c);
    return true;
  }) as typeof process.stdout.write;
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

test("restCompressionStatus (via runCompressionStatus REST fallback) should surface settings.defaultMode as `strategy`, not a nonexistent `engine` field", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url);
    if (u.includes("/api/mcp/stream")) return makeResp({ error: "not mounted" }, 404);
    if (u.includes("/api/settings/compression")) {
      // Canonical server payload — NOTE: field is `defaultMode`, there is no `engine` key.
      // src/lib/db/compression.ts COMPRESSION_MODES / GET route just returns getCompressionSettings().
      return makeResp({ enabled: true, defaultMode: "stacked" });
    }
    if (u.includes("/api/context/combos")) return makeResp({ combos: [] });
    if (u.includes("/api/context/analytics")) return makeResp({ totalRequests: 0 });
    throw new Error(`unexpected fetch: ${u}`);
  }) as typeof fetch;

  try {
    const { runCompressionStatus } = await import("../../bin/cli/commands/compression.mjs");
    const out = await captureStdout(() =>
      runCompressionStatus(
        {},
        makeCmd("json") as unknown as Parameters<typeof runCompressionStatus>[1]
      )
    );
    const parsed = JSON.parse(out);

    // The server's actual field is `defaultMode: "stacked"`. The CLI's REST fallback
    // must surface that as `strategy` (matching the MCP tool's contract in
    // open-sse/mcp-server/tools/compressionTools.ts::handleCompressionStatus, which
    // returns `strategy: settings.defaultMode || "standard"`), not a nonexistent
    // `engine` field that is always null.
    assert.equal(
      parsed.strategy,
      "stacked",
      `expected REST fallback to expose settings.defaultMode as "strategy" (got: ${JSON.stringify(parsed)})`
    );
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("restSetEngine (via runCompressionEngineSet REST fallback) should PUT `defaultMode`, not the nonexistent `engine` field, and translate caveman->standard", async () => {
  const origFetch = globalThis.fetch;
  const putBodies: Record<string, unknown>[] = [];
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url);
    if (u.includes("/api/mcp/stream")) return makeResp({ error: "not mounted" }, 404);
    if (u.includes("/api/settings/compression") && init?.method === "PUT") {
      const body = init?.body ? JSON.parse(String(init.body)) : {};
      putBodies.push(body);
      return makeResp({ enabled: true, defaultMode: body.defaultMode ?? body.engine });
    }
    throw new Error(`unexpected fetch: ${u} ${init?.method}`);
  }) as typeof fetch;

  try {
    const { runCompressionEngineSet } = await import("../../bin/cli/commands/compression.mjs");
    await runCompressionEngineSet(
      "caveman",
      {},
      makeCmd("json") as unknown as Parameters<typeof runCompressionEngineSet>[2]
    );

    assert.equal(putBodies.length, 1, "expected exactly one PUT to /api/settings/compression");
    const body = putBodies[0];

    // Bug 1: CLI currently PUTs `{ engine: "standard" }`. The server's Zod schema
    // (compressionSettingsUpdateSchema in src/shared/validation/compressionConfigSchemas.ts)
    // is `.strict()` and has no `engine` key — only `defaultMode` — so this key is not
    // even silently dropped, it fails validation server-side. The fix must send
    // `defaultMode`, translating caveman->standard exactly like
    // open-sse/mcp-server/tools/compressionTools.ts::handleSetCompressionEngine does
    // (`args.engine === "caveman" ? "standard" : args.engine`).
    assert.equal(
      body.defaultMode,
      "standard",
      `expected PUT body to contain defaultMode:"standard" (caveman translated), got: ${JSON.stringify(body)}`
    );
    assert.equal(
      body.engine,
      undefined,
      `PUT body must not contain a nonexistent "engine" key, got: ${JSON.stringify(body)}`
    );
  } finally {
    globalThis.fetch = origFetch;
  }
});

test("output.mjs emit() table renderer must not print [object Object] for nested-object fields", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");

  const chunks: string[] = [];
  const origIsTTY = process.stdout.isTTY;
  const origWrite = process.stdout.write.bind(process.stdout);
  process.stdout.isTTY = true; // force table format
  process.stdout.write = ((c: string | Uint8Array) => {
    if (typeof c === "string") chunks.push(c);
    return true;
  }) as typeof process.stdout.write;

  try {
    emit([{ name: "combo-a", settings: { depth: 2, mode: "stacked" } }], { output: "table" });
  } finally {
    process.stdout.write = origWrite;
    process.stdout.isTTY = origIsTTY;
  }

  const rendered = chunks.join("");
  assert.ok(
    !rendered.includes("[object Object]"),
    `table rendering must JSON-stringify nested object cells instead of printing "[object Object]"; got:\n${rendered}`
  );
});

test("REST fallback still fires when initialize returns HTTP 404 (sessionless continue must not swallow it)", async () => {
  // mcpCallTool no longer throws on a missing Mcp-Session-Id after a
  // successful initialize. The compression REST fallback keys off err.status
  // === 404/501 from the HTTP layer. A 404 on initialize must still surface
  // as err.status === 404 so mcpCall() takes the REST path — not a synthetic
  // "no Mcp-Session-Id" 500 that would bypass the fallback.
  const origFetch = globalThis.fetch;
  let streamHits = 0;
  let restHits = 0;
  globalThis.fetch = (async (url: string | URL | Request) => {
    const u = String(url);
    if (u.includes("/api/mcp/stream")) {
      streamHits += 1;
      return makeResp({ error: "not mounted" }, 404);
    }
    if (u.includes("/api/settings/compression")) {
      restHits += 1;
      return makeResp({ enabled: true, defaultMode: "stacked" });
    }
    if (u.includes("/api/context/combos")) return makeResp({ combos: [] });
    if (u.includes("/api/context/analytics")) return makeResp({ totalRequests: 0 });
    throw new Error(`unexpected fetch: ${u}`);
  }) as typeof fetch;

  try {
    const { runCompressionStatus } = await import("../../bin/cli/commands/compression.mjs");
    const out = await captureStdout(() =>
      runCompressionStatus(
        {},
        makeCmd("json") as unknown as Parameters<typeof runCompressionStatus>[1]
      )
    );
    const parsed = JSON.parse(out);
    assert.equal(parsed.strategy, "stacked");
    assert.ok(streamHits >= 1, "initialize must hit /api/mcp/stream");
    assert.ok(restHits >= 1, "REST fallback must hit /api/settings/compression");
    // Critically: we must NOT have progressed to notifications/initialized or
    // tools/call after a 404 initialize — only the one failing initialize.
    assert.equal(streamHits, 1, "404 initialize must abort before further MCP RPCs");
  } finally {
    globalThis.fetch = origFetch;
  }
});
