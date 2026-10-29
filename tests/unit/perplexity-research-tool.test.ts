// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

process.env.DATA_DIR = (await import("node:fs")).mkdtempSync(
  (await import("node:path")).join((await import("node:os")).tmpdir(), "omr-pplx-research-")
);
delete process.env.OMNIROUTE_MCP_ENFORCE_SCOPES;
delete process.env.OMNIROUTE_MCP_SCOPES;

const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/perplexityTlsClient.ts");

let fetches = 0;
let lastTimeoutMs = null;
async function successFetch(url, opts) {
  fetches += 1;
  lastTimeoutMs = opts?.timeoutMs ?? null;
  if (String(url).includes("rate-limit")) {
    return { status: 200, headers: new Headers(), text: '{"remaining_research":5}', body: null };
  }
  const body =
    'data: {"status":"COMPLETED","final_sse_message":true,"artifact_entries":[{"assets":[{"asset_type":"RESEARCH_REPORT","research_report":{"final":true,"source_content":"done"}}]}]}\n\n';
  return { status: 200, headers: new Headers(), text: body, body: null };
}

function stubSuccess() {
  __setTlsFetchOverrideForTesting(successFetch);
}

stubSuccess();

const { createMcpServer } = await import("../../open-sse/mcp-server/server.ts");

// The tool only runs against an existing, active perplexity-web connection.
// Unless a test installs its own store, every connection id below resolves to
// one; the cooldown write is a no-op, like a write to a missing row.
const STORE_KEY = Symbol.for("omniroute.providerConnectionStore");
function pplxConnection(id) {
  return { id, provider: "perplexity-web", isActive: true, accessToken: "pplx-session" };
}
globalThis[STORE_KEY] = {
  getProviderConnectionById: async (id) => pplxConnection(id),
  mergeConnectionProviderSpecificData: async () => {},
};

function handlerOf(server, name) {
  const registry = server._registeredTools;
  const tool = registry?.[name];
  assert.ok(tool, `${name} must be registered`);
  return tool.handler;
}

const successFrame = { authInfo: { clientId: "owner", scopes: ["manage"] } };

test("the tool is absent unless the switch is on at startup", () => {
  delete process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED;
  const server = createMcpServer();
  assert.equal(server._registeredTools?.omniroute_perplexity_research, undefined);
});

test("flipping the switch off after startup rejects the call before any fetch", async () => {
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  const server = createMcpServer();
  delete process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED;
  fetches = 0;
  const result = await handlerOf(server, "omniroute_perplexity_research")(
    { query: "q", connectionId: "c1" },
    successFrame
  );
  const body = JSON.parse(result.content[0].text);
  assert.equal(body.error.code, "research_disabled");
  assert.equal(fetches, 0);
});

test("a finished report returns ok and the timeout budget reaches the fetch", async () => {
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  const server = createMcpServer();
  fetches = 0;
  const result = await handlerOf(server, "omniroute_perplexity_research")(
    { query: "q", connectionId: "c-ok", maxTotalMinutes: 6 },
    successFrame
  );
  const body = JSON.parse(
    result.structuredContent ? JSON.stringify(result.structuredContent) : result.content[0].text
  );
  assert.equal(body.ok, true);
  assert.equal(fetches, 2);
  assert.equal(lastTimeoutMs, 6 * 60_000);
});

test("a second call on the same connection is busy", async () => {
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  const server = createMcpServer();
  const handler = handlerOf(server, "omniroute_perplexity_research");
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  __setTlsFetchOverrideForTesting(async () => {
    await gate;
    return { status: 200, headers: new Headers(), text: "", body: null };
  });
  const first = handler({ query: "q", connectionId: "c-busy" }, successFrame);
  const second = await handler({ query: "q", connectionId: "c-busy" }, successFrame);
  release();
  await first;
  const body = JSON.parse(second.content[0].text);
  assert.equal(body.error.code, "research_busy");
});

test("mcp:connect alone cannot run it, admin can", async () => {
  stubSuccess();
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  const server = createMcpServer();
  const handler = handlerOf(server, "omniroute_perplexity_research");
  fetches = 0;
  const narrow = await handler(
    { query: "q", connectionId: "c-scope" },
    { authInfo: { clientId: "n", scopes: ["mcp:connect"] } }
  );
  assert.equal(narrow.isError, true);
  assert.match(narrow.content[0].text, /Insufficient MCP scopes/);
  assert.equal(fetches, 0);
  const admin = await handler(
    { query: "q", connectionId: "c-scope" },
    { authInfo: { clientId: "a", scopes: ["admin"] } }
  );
  const body = JSON.parse(
    admin.structuredContent ? JSON.stringify(admin.structuredContent) : admin.content[0].text
  );
  assert.equal(body.ok, true);
});

test("an http call with no caller identity is refused, a stdio call is not", async () => {
  stubSuccess();
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  const server = createMcpServer();
  const handler = handlerOf(server, "omniroute_perplexity_research");
  const { withMcpHttpAuthContext } = await import("../../open-sse/mcp-server/httpAuthContext.ts");
  fetches = 0;
  const http = await withMcpHttpAuthContext(new Request("http://127.0.0.1/mcp"), () =>
    handler({ query: "q", connectionId: "c-anon" }, { sessionId: "sess-1" })
  );
  const httpBody = JSON.parse(http.content[0].text);
  assert.equal(httpBody.error.code, "auth_required");
  assert.equal(fetches, 0);
  const stdio = await handler({ query: "q", connectionId: "c-stdio" }, {});
  const stdioBody = JSON.parse(
    stdio.structuredContent ? JSON.stringify(stdio.structuredContent) : stdio.content[0].text
  );
  assert.equal(stdioBody.ok, true);
});

test("an upstream error does not start the cooldown", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 500,
    headers: new Headers(),
    text: "",
    body: null,
  }));
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  const server = createMcpServer();
  const handler = handlerOf(server, "omniroute_perplexity_research");
  const first = await handler({ query: "q", connectionId: "c-err" }, successFrame);
  assert.equal(JSON.parse(first.content[0].text).error.code, "incomplete_result");
  stubSuccess();
  const second = await handler({ query: "q", connectionId: "c-err" }, successFrame);
  assert.equal(bodyOf(second).ok, true, "no cooldown and no lock after an HTTP error");
  const other = await handler({ query: "q", connectionId: "c-err-other" }, successFrame);
  const body = JSON.parse(
    other.structuredContent ? JSON.stringify(other.structuredContent) : other.content[0].text
  );
  assert.equal(body.ok, true);
});

test("no research run starts when the account has no research runs left", async () => {
  __setTlsFetchOverrideForTesting(async (url) => {
    fetches += 1;
    const text = String(url).includes("rate-limit") ? '{"remaining_research":0}' : "sent";
    return { status: 200, headers: new Headers(), text, body: null };
  });
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  const server = createMcpServer();
  fetches = 0;
  const result = await handlerOf(server, "omniroute_perplexity_research")(
    { query: "q", connectionId: "c-empty" },
    successFrame
  );
  const body = JSON.parse(result.content[0].text);
  assert.equal(body.error.code, "research_quota_exhausted");
  assert.equal(fetches, 1);
});

// ── How each outcome leaves the per-connection lock ──────────────────────────

const { sweepResearchLock } =
  await import("../../open-sse/mcp-server/tools/perplexityResearchLock.ts");
function bodyOf(result) {
  assert.ok(result, "the handler must return an envelope");
  return result.structuredContent ?? JSON.parse(result.content[0].text);
}

function researchHandler() {
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  return handlerOf(createMcpServer(), "omniroute_perplexity_research");
}

async function withStore(store, fn) {
  const original = globalThis[STORE_KEY];
  globalThis[STORE_KEY] = store;
  try {
    return await fn();
  } finally {
    globalThis[STORE_KEY] = original;
  }
}

async function captureWarnings(fn) {
  const original = console.warn;
  const warnings = [];
  console.warn = (...args) => warnings.push(args.join(" "));
  try {
    return { result: await fn(), warnings };
  } finally {
    console.warn = original;
  }
}

test("a finished report survives a failed cooldown write and frees the lock", async () => {
  stubSuccess();
  const handler = researchHandler();
  const store = {
    getProviderConnectionById: async (id) => pplxConnection(id),
    mergeConnectionProviderSpecificData: async () => {
      throw new Error("forced write failure");
    },
  };
  const { result, warnings } = await captureWarnings(() =>
    withStore(store, () => handler({ query: "q", connectionId: "c-dbfail" }, successFrame))
  );
  const body = bodyOf(result);
  assert.equal(body.ok, true);
  assert.equal(body.data.report, "done");
  assert.ok(warnings.some((w) => w.includes("could not store the cooldown")));
  assert.equal(sweepResearchLock("c-dbfail", Date.now()), "absent");
  const retry = bodyOf(await handler({ query: "q", connectionId: "c-dbfail" }, successFrame));
  assert.equal(retry.error.code, "research_cooldown", "the in-memory cooldown still applies");
});

test("an exhausted quota sends no research request and frees the lock", async () => {
  __setTlsFetchOverrideForTesting(async (url) => {
    fetches += 1;
    const text = String(url).includes("rate-limit") ? '{"remaining_research":0}' : "sent";
    return { status: 200, headers: new Headers(), text, body: null };
  });
  const handler = researchHandler();
  const first = bodyOf(await handler({ query: "q", connectionId: "c-quota" }, successFrame));
  assert.equal(first.error.code, "research_quota_exhausted");
  assert.equal(sweepResearchLock("c-quota", Date.now()), "absent");
  stubSuccess();
  const retry = bodyOf(await handler({ query: "q", connectionId: "c-quota" }, successFrame));
  assert.equal(retry.ok, true);
});

test("a quota lookup that throws does not block the run", async () => {
  __setTlsFetchOverrideForTesting(async (url, opts) => {
    if (String(url).includes("rate-limit")) throw new Error("tls handshake failed");
    return successFetch(url, opts);
  });
  const handler = researchHandler();
  const body = bodyOf(await handler({ query: "q", connectionId: "c-quota-throw" }, successFrame));
  assert.equal(body.ok, true);
  assert.equal(sweepResearchLock("c-quota-throw", Date.now()), "absent");
});

test("an aborted call returns research_aborted, sends nothing and frees the lock", async () => {
  stubSuccess();
  const handler = researchHandler();
  const controller = new AbortController();
  controller.abort();
  fetches = 0;
  const body = bodyOf(
    await handler(
      { query: "q", connectionId: "c-aborted" },
      { ...successFrame, signal: controller.signal }
    )
  );
  assert.equal(body.ok, false);
  assert.equal(body.error.code, "research_aborted");
  assert.equal(fetches, 0);
  assert.equal(sweepResearchLock("c-aborted", Date.now()), "absent");
  const retry = bodyOf(await handler({ query: "q", connectionId: "c-aborted" }, successFrame));
  assert.equal(retry.ok, true);
});

function stubAsk(answer) {
  __setTlsFetchOverrideForTesting(async (url, opts) => {
    if (String(url).includes("rate-limit")) {
      return { status: 200, headers: new Headers(), text: '{"remaining_research":5}', body: null };
    }
    return answer(opts);
  });
}

for (const status of [401, 403, 500]) {
  test(`an HTTP ${status} answer frees the lock, logs the status, and a retry works`, async () => {
    const connectionId = `c-http-${status}`;
    stubAsk(async () => ({ status, headers: new Headers(), text: "denied", body: null }));
    const handler = researchHandler();
    const { result, warnings } = await captureWarnings(() =>
      handler({ query: "q", connectionId }, successFrame)
    );
    assert.equal(bodyOf(result).error.code, "incomplete_result");
    assert.ok(warnings.some((w) => w.includes(`HTTP ${status}`)));
    assert.equal(sweepResearchLock(connectionId, Date.now()), "absent");
    stubSuccess();
    assert.equal(bodyOf(await handler({ query: "q", connectionId }, successFrame)).ok, true);
  });
}

test("a stream that ends with its end marker but no report frees the lock", async () => {
  stubAsk(async () => ({
    status: 200,
    headers: new Headers(),
    text: 'data: {"status":"COMPLETED","final_sse_message":true}\n\n',
    body: null,
  }));
  const handler = researchHandler();
  const body = bodyOf(await handler({ query: "q", connectionId: "c-marker" }, successFrame));
  assert.equal(body.error.code, "report_unconfirmed");
  assert.equal(sweepResearchLock("c-marker", Date.now()), "absent");
});

test("a stream that stops without its end marker stays busy until deadline and grace", async () => {
  stubAsk(async () => ({
    status: 200,
    headers: new Headers(),
    text: 'data: {"status":"PENDING"}\n\n',
    body: null,
  }));
  const handler = researchHandler();
  const started = Date.now();
  const first = bodyOf(
    await handler({ query: "q", connectionId: "c-cut", maxTotalMinutes: 5 }, successFrame)
  );
  assert.equal(first.error.code, "incomplete_result");
  assert.equal(sweepResearchLock("c-cut", Date.now()), "upstream_unconfirmed");
  // Deadline is the 5 minute budget plus one minute; the grace is one more minute.
  assert.equal(sweepResearchLock("c-cut", started + 6 * 60_000), "upstream_unconfirmed");
  assert.equal(sweepResearchLock("c-cut", Date.now() + 7 * 60_000), "expired");
});

test("an abort after the request went out returns research_aborted and stays unconfirmed", async () => {
  const controller = new AbortController();
  stubAsk(
    (opts) =>
      new Promise((_resolve, reject) => {
        controller.abort();
        opts.signal.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
        if (opts.signal.aborted) reject(new Error("aborted"));
      })
  );
  const handler = researchHandler();
  const { result } = await captureWarnings(() =>
    handler(
      { query: "q", connectionId: "c-late-abort" },
      { ...successFrame, signal: controller.signal }
    )
  );
  assert.equal(bodyOf(result).error.code, "research_aborted");
  assert.equal(sweepResearchLock("c-late-abort", Date.now()), "upstream_unconfirmed");
});

test("an aborted request that still answers with an HTTP status stays unconfirmed", async () => {
  const controller = new AbortController();
  stubAsk(async () => {
    controller.abort();
    return { status: 500, headers: new Headers(), text: "", body: null };
  });
  const handler = researchHandler();
  const body = bodyOf(
    await handler(
      { query: "q", connectionId: "c-late-abort-500" },
      { ...successFrame, signal: controller.signal }
    )
  );
  assert.equal(body.error.code, "research_aborted");
  assert.equal(sweepResearchLock("c-late-abort-500", Date.now()), "upstream_unconfirmed");
});

test("a research request that throws comes back as a failure envelope", async () => {
  __setTlsFetchOverrideForTesting(async (url) => {
    if (String(url).includes("rate-limit")) {
      return { status: 200, headers: new Headers(), text: '{"remaining_research":5}', body: null };
    }
    throw new Error("socket hang up");
  });
  const handler = researchHandler();
  const { result, warnings } = await captureWarnings(() =>
    handler({ query: "q", connectionId: "c-throw" }, successFrame)
  );
  const body = bodyOf(result);
  assert.equal(body.ok, false);
  assert.equal(body.error.code, "research_failed");
  assert.ok(body.error.correlationId);
  assert.ok(warnings.some((w) => w.includes("run failed")));
  assert.equal(sweepResearchLock("c-throw", Date.now()), "upstream_unconfirmed");
});

test("with no connection store registered the call returns research_unavailable and warns", async () => {
  stubSuccess();
  const handler = researchHandler();
  fetches = 0;
  const { result, warnings } = await captureWarnings(() =>
    withStore(undefined, () => handler({ query: "q", connectionId: "c-nostore" }, successFrame))
  );
  const body = bodyOf(result);
  assert.equal(body.error.code, "research_unavailable");
  assert.equal(fetches, 0);
  assert.ok(warnings.some((w) => w.includes("has no connection store")));
});

// ── Which connection the tool may use ───────────────────────────────────────

function storeWith(connection) {
  return {
    getProviderConnectionById: async () => connection,
    mergeConnectionProviderSpecificData: async () => {},
  };
}

const refusedConnections = [
  [
    "a connection of another provider",
    { id: "c-openai", provider: "openai", isActive: true, apiKey: "sk-other-provider" },
  ],
  [
    "an inactive perplexity-web connection",
    { id: "c-off", provider: "perplexity-web", isActive: false, accessToken: "pplx-session" },
  ],
  ["an unknown connection id", null],
];

for (const [label, connection] of refusedConnections) {
  test(`${label} is refused before any fetch and leaves no lock`, async () => {
    let sentHeaders = null;
    __setTlsFetchOverrideForTesting(async (url, opts) => {
      sentHeaders = opts?.headers ?? null;
      return successFetch(url, opts);
    });
    const handler = researchHandler();
    const connectionId = connection?.id ?? "c-missing-row";
    fetches = 0;
    const body = bodyOf(
      await withStore(storeWith(connection), () =>
        handler({ query: "q", connectionId }, successFrame)
      )
    );
    assert.equal(body.ok, false);
    assert.equal(body.error.code, "research_unavailable");
    assert.equal(fetches, 0);
    assert.equal(sentHeaders, null, "no credential of the connection may leave the process");
    assert.equal(sweepResearchLock(connectionId, Date.now()), "absent");
  });
}

test("a call without a connectionId is refused before any fetch", async () => {
  stubSuccess();
  const handler = researchHandler();
  fetches = 0;
  const body = bodyOf(await handler({ query: "q" }, successFrame));
  assert.equal(body.ok, false);
  assert.equal(body.error.code, "research_invalid_input");
  assert.equal(fetches, 0);
  assert.equal(sweepResearchLock("default", Date.now()), "absent");
});

test("the published input schema requires a connectionId", () => {
  process.env.OMNIROUTE_PPLX_RESEARCH_ENABLED = "1";
  const schema = createMcpServer()._registeredTools.omniroute_perplexity_research.inputSchema;
  assert.equal(schema.safeParse({ query: "q" }).success, false);
  assert.equal(schema.safeParse({ query: "q", connectionId: "c1" }).success, true);
});
