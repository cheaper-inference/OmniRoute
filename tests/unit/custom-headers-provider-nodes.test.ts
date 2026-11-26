import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-headers-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const providerNodesIdRoute = await import("../../src/app/api/provider-nodes/[id]/route.ts");
const providerConnectionRoute = await import("../../src/app/api/providers/[id]/route.ts");
const { OPENAI_COMPATIBLE_PREFIX } = await import("../../src/shared/constants/providers.ts");
const { createProviderNodeSchema, updateProviderNodeSchema } =
  await import("../../src/shared/validation/schemas.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/provider-nodes", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function makeUpdateRequest(id: string, body: Record<string, unknown>) {
  return new Request(`http://localhost/api/provider-nodes/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("createProviderNodeSchema accepts valid customHeaders as record of strings", () => {
  const validInputs = [
    { name: "Test", prefix: "test", apiType: "chat", customHeaders: { "X-Custom-1": "value1" } },
    {
      name: "Test",
      prefix: "test",
      apiType: "chat",
      customHeaders: { "X-Header": "value", "X-Another": "value2" },
    },
    { name: "Test", prefix: "test", apiType: "chat", customHeaders: {} },
    { name: "Test", prefix: "test", apiType: "chat" },
  ];

  for (const input of validInputs) {
    const result = createProviderNodeSchema.safeParse(input);
    assert.equal(result.success, true, `Should accept: ${JSON.stringify(input)}`);
  }
});

test("createProviderNodeSchema rejects customHeaders with non-string values", () => {
  const invalidInputs = [
    { customHeaders: { "X-Custom": 123 } },
    { customHeaders: { "X-Custom": null } },
    { customHeaders: { "X-Custom": true } },
    { customHeaders: { "X-Custom": ["array"] } },
    { customHeaders: { "X-Custom": { nested: "object" } } },
  ];

  for (const input of invalidInputs) {
    const result = createProviderNodeSchema.safeParse(input);
    assert.equal(result.success, false, `Should reject: ${JSON.stringify(input)}`);
  }
});

test("createProviderNodeSchema rejects forbidden hop-by-hop headers", () => {
  const forbiddenHeaders = [
    "host",
    "connection",
    "content-length",
    "keep-alive",
    "proxy-connection",
    "transfer-encoding",
    "te",
    "trailer",
    "upgrade",
  ];

  for (const header of forbiddenHeaders) {
    const result = createProviderNodeSchema.safeParse({
      customHeaders: { [header]: "value" },
    });
    assert.equal(result.success, false, `Should reject forbidden header: ${header}`);
  }

  const result = createProviderNodeSchema.safeParse({
    customHeaders: { HOST: "evil", "Content-Length": "999" },
  });
  assert.equal(result.success, false, "Should reject case-insensitive forbidden headers");
});

test("updateProviderNodeSchema accepts valid customHeaders", () => {
  const validInputs = [
    { customHeaders: { "X-Updated": "new-value" } },
    { customHeaders: { "X-A": "v1", "X-B": "v2" } },
    { customHeaders: null },
    {},
  ];

  for (const input of validInputs) {
    const result = updateProviderNodeSchema.safeParse({
      name: "Test",
      prefix: "test",
      baseUrl: "https://test.com",
      ...input,
    });
    assert.equal(result.success, true, `Should accept: ${JSON.stringify(input)}`);
  }
});

test("updateProviderNodeSchema rejects forbidden headers", () => {
  const result = updateProviderNodeSchema.safeParse({
    name: "Test",
    prefix: "test",
    baseUrl: "https://test.com",
    customHeaders: { host: "evil.com" },
  });
  assert.equal(result.success, false);
});

test("provider nodes route creates OpenAI-compatible nodes with customHeaders", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "Custom Headers Node",
      prefix: "custom-headers",
      apiType: "chat",
      baseUrl: "https://custom.example.com/v1",
      customHeaders: {
        "X-Custom-Auth": "auth-token-123",
        "X-Request-ID": "req-abc",
      },
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 201);
  assert.match(body.node.id, new RegExp(`^${OPENAI_COMPATIBLE_PREFIX}chat-`));
  assert.deepEqual(body.node.customHeaders, {
    "X-Custom-Auth": "auth-token-123",
    "X-Request-ID": "req-abc",
  });
});

test("provider nodes route creates nodes without customHeaders (null)", async () => {
  const response = await providerNodesRoute.POST(
    makeRequest({
      name: "No Custom Headers",
      prefix: "no-custom",
      apiType: "chat",
      baseUrl: "https://nocustom.example.com/v1",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 201);
  assert.equal(body.node.customHeaders, null);
});

test("provider nodes route update modifies customHeaders", async () => {
  const createResponse = await providerNodesRoute.POST(
    makeRequest({
      name: "Original Node",
      prefix: "original",
      apiType: "chat",
      baseUrl: "https://original.example.com/v1",
      customHeaders: { "X-Original": "original-value" },
    })
  );
  const created = (await createResponse.json()) as any;
  const nodeId = created.node.id;

  const updateBody = {
    name: "Updated Node",
    prefix: "updated",
    apiType: "chat",
    baseUrl: "https://updated.example.com/v1",
    customHeaders: { "X-Updated": "updated-value", "X-New": "new-header" },
  };
  const updateResponse = await providerNodesIdRoute.PUT(makeUpdateRequest(nodeId, updateBody), {
    params: Promise.resolve({ id: nodeId }),
  });
  const updated = (await updateResponse.json()) as any;

  assert.equal(updateResponse.status, 200);
  assert.deepEqual(updated.node.customHeaders, {
    "X-Updated": "updated-value",
    "X-New": "new-header",
  });
});

test("provider nodes route update can clear customHeaders by passing null", async () => {
  const createResponse = await providerNodesRoute.POST(
    makeRequest({
      name: "Node With Headers",
      prefix: "with-headers",
      apiType: "chat",
      baseUrl: "https://withheaders.example.com/v1",
      customHeaders: { "X-Keep": "keep-value" },
    })
  );
  const created = (await createResponse.json()) as any;
  const nodeId = created.node.id;

  const clearBody = {
    name: "Node Without Headers",
    prefix: "no-headers",
    apiType: "chat",
    baseUrl: "https://noclear.example.com/v1",
    customHeaders: null,
  };
  const updateResponse = await providerNodesIdRoute.PUT(makeUpdateRequest(nodeId, clearBody), {
    params: Promise.resolve({ id: nodeId }),
  });
  const updated = (await updateResponse.json()) as any;

  assert.equal(updateResponse.status, 200);
  assert.equal(updated.node.customHeaders, null);
});

async function connectionHeaders(connectionId: string) {
  const connection = (await providersDb.getProviderConnectionById(connectionId)) as {
    providerSpecificData: { customHeaders?: Record<string, string> };
  };
  return connection.providerSpecificData.customHeaders;
}

type HeaderMap = Record<string, string>;
type NodePayload = { node: { id: string; customHeaders: HeaderMap | null } };

// #21227: the dashboard Edit node modal has no header editor, so its payload omits customHeaders.
const EDIT_MODAL_BODY = {
  name: "Gateway",
  prefix: "gw21227",
  baseUrl: "https://gw.example.com/v1",
};

test("a node save without customHeaders keeps the node's and its connections' headers", async () => {
  const id = "anthropic-compatible-headers21227a";
  await providersDb.createProviderNode({
    id,
    type: "anthropic-compatible",
    ...EDIT_MODAL_BODY,
    customHeaders: { "X-Node": "node-value" },
  });
  const connection = await providersDb.createProviderConnection({
    provider: id,
    authType: "apikey",
    name: "conn",
    apiKey: "sk-1",
    providerSpecificData: { customHeaders: { "X-Node": "node-value" } },
  });

  const response = await providerNodesIdRoute.PUT(makeUpdateRequest(id, EDIT_MODAL_BODY), {
    params: Promise.resolve({ id }),
  });
  const body = (await response.json()) as { node: { customHeaders: unknown } };

  assert.equal(response.status, 200);
  assert.deepEqual(body.node.customHeaders, { "X-Node": "node-value" });
  assert.deepEqual(await connectionHeaders(connection.id), { "X-Node": "node-value" });
});

test("a node save without customHeaders keeps connection-level headers", async () => {
  const id = "anthropic-compatible-headers21227b";
  await providersDb.createProviderNode({ id, type: "anthropic-compatible", ...EDIT_MODAL_BODY });
  const connection = await providersDb.createProviderConnection({
    provider: id,
    authType: "apikey",
    name: "conn",
    apiKey: "sk-1",
    providerSpecificData: { customHeaders: { "x-test": "1" } },
  });
  const put = (body: Record<string, unknown>) =>
    providerNodesIdRoute.PUT(makeUpdateRequest(id, body), { params: Promise.resolve({ id }) });

  assert.equal((await put(EDIT_MODAL_BODY)).status, 200);
  assert.deepEqual(await connectionHeaders(connection.id), { "x-test": "1" });

  // A legacy key absent from the previous node map remains a connection override.
  assert.equal((await put({ ...EDIT_MODAL_BODY, customHeaders: { "X-Test": "1" } })).status, 200);
  assert.deepEqual(await connectionHeaders(connection.id), { "x-test": "1" });
  assert.equal((await put({ ...EDIT_MODAL_BODY, customHeaders: null })).status, 200);
  assert.deepEqual(await connectionHeaders(connection.id), { "x-test": "1" });
});

test("an OpenAI-compatible node save without customHeaders keeps inherited and own headers", async () => {
  const editBody = { ...EDIT_MODAL_BODY, apiType: "chat" };
  const nodeHeaders = { "X-Node-Header": "node-val" };
  const createResponse = await providerNodesRoute.POST(
    makeRequest({ ...editBody, customHeaders: nodeHeaders })
  );
  assert.equal(createResponse.status, 201);
  const { node } = (await createResponse.json()) as NodePayload;
  const headers = { ...nodeHeaders, "X-Conn-Header": "conn-val" };
  const connection = await createHeaderConnection(node.id, "own", headers);

  const updated = await editNodeHeaders(node.id, { ...editBody, name: "Node Renamed" });
  assert.deepEqual(updated.customHeaders, nodeHeaders);
  assert.deepEqual(await connectionHeaders(connection.id), headers);
});

function createHeaderConnection(provider: string, name: string, customHeaders: HeaderMap) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `fixture-key-${name}`,
    providerSpecificData: { customHeaders },
  });
}

async function editNodeHeaders(id: string, body: Record<string, unknown>) {
  const response = await providerNodesIdRoute.PUT(makeUpdateRequest(id, body), {
    params: Promise.resolve({ id }),
  });
  assert.equal(response.status, 200);
  return ((await response.json()) as NodePayload).node;
}

async function createHeaderEditFixture(type: "openai-compatible" | "anthropic-compatible") {
  const body = {
    ...EDIT_MODAL_BODY,
    type,
    ...(type === "openai-compatible" && { apiType: "chat" }),
  };
  const initialHeaders = {
    "X-21227-Changed": "before",
    "X-21227-Removed": "old",
    "X-21227-Shared": "node",
    "X-21227-Same": "same",
  };
  const response = await providerNodesRoute.POST(
    makeRequest({ ...body, customHeaders: initialHeaders })
  );
  assert.equal(response.status, 201);
  const { node } = (await response.json()) as NodePayload;

  // Legacy copies with the same value are inherited even when the casing differs.
  const legacyHeaders = { ...initialHeaders, "x-21227-changed": "before" };
  const inherited = await createHeaderConnection(node.id, "inherited", legacyHeaders);
  const overridden = await createHeaderConnection(node.id, "overridden", {
    "x-21227-changed": "before",
    "X-21227-Removed": "old",
  });
  assert.notEqual(inherited.id, overridden.id);
  const overrideHeaders = {
    "x-21227-shared": "connection",
    "x-21227-same": "same",
    "X-21227-Own": "own",
  };
  const write = await providerConnectionRoute.PUT(
    await makeManagementSessionRequest(`http://localhost/api/providers/${overridden.id}`, {
      method: "PUT",
      body: {
        providerSpecificData: {
          customHeaders: {
            "x-21227-changed": "before",
            "X-21227-Removed": "old",
            ...overrideHeaders,
          },
        },
      },
    }),
    { params: Promise.resolve({ id: overridden.id }) }
  );
  assert.equal(write.status, 200, await write.text());

  return {
    node,
    body,
    inherited,
    overridden,
    overrideHeaders,
  };
}

async function assertConnectionHeaders(
  provider: string,
  connectionId: string,
  expected: HeaderMap
) {
  const stored = await connectionHeaders(connectionId);
  assert.deepEqual(stored, Object.keys(expected).length ? expected : undefined);
  const executor = new DefaultExecutor(provider);
  const headers = executor.buildHeaders(
    { apiKey: "fixture-key", providerSpecificData: { customHeaders: stored } },
    true
  );
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(headers).filter(([name]) => name.toLowerCase().startsWith("x-21227-"))
    ),
    expected
  );
}

for (const type of ["openai-compatible", "anthropic-compatible"] as const) {
  test(`${type}: consecutive explicit header edits update only inherited values`, async () => {
    const { node, body, inherited, overridden, overrideHeaders } =
      await createHeaderEditFixture(type);
    const first = {
      "X-21227-Changed": "second",
      "X-21227-Shared": "connection",
      "X-21227-Same": "first node edit",
    };
    const second = { "x-21227-changed": "third", "X-21227-Shared": "third node value" };

    assert.deepEqual(
      (await editNodeHeaders(node.id, { ...body, customHeaders: first })).customHeaders,
      first
    );
    await assertConnectionHeaders(node.id, inherited.id, first);
    await assertConnectionHeaders(node.id, overridden.id, {
      "X-21227-Changed": "second",
      ...overrideHeaders,
    });

    assert.deepEqual(
      (await editNodeHeaders(node.id, { ...body, customHeaders: second })).customHeaders,
      second
    );
    await assertConnectionHeaders(node.id, inherited.id, second);
    await assertConnectionHeaders(node.id, overridden.id, {
      "x-21227-changed": "third",
      ...overrideHeaders,
    });
  });

  for (const clear of [null, {}]) {
    test(`${type}: clearing headers with ${JSON.stringify(clear)} keeps connection overrides`, async () => {
      const { node, body, inherited, overridden, overrideHeaders } =
        await createHeaderEditFixture(type);
      const updated = await editNodeHeaders(node.id, { ...body, customHeaders: clear });
      assert.deepEqual(updated.customHeaders, clear);
      await assertConnectionHeaders(node.id, inherited.id, {});
      await assertConnectionHeaders(node.id, overridden.id, overrideHeaders);
    });
  }
}

test("DefaultExecutor.buildHeaders applies customHeaders from providerSpecificData", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  const headers = executor.buildHeaders(
    {
      apiKey: "test-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: {
          "X-Custom-Auth": "custom-auth-value",
          "X-Request-ID": "request-123",
          "X-Custom-Header": "extra-value",
        },
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers["X-Custom-Auth"], "custom-auth-value");
  assert.equal(headers["X-Request-ID"], "request-123");
  assert.equal(headers["X-Custom-Header"], "extra-value");
  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers["Authorization"], "Bearer test-key");
});

test("DefaultExecutor.buildHeaders does NOT override auth headers with customHeaders", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  const headers = executor.buildHeaders(
    {
      apiKey: "real-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: {
          Authorization: "Bearer fake-token",
          "x-api-key": "fake-key",
          "X-Custom": "custom-value",
        },
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers.Authorization, "Bearer real-key");
  assert.equal(headers["x-api-key"], undefined);
  assert.equal(headers["X-Custom"], "custom-value");
});

test("DefaultExecutor.buildHeaders blocks forbidden hop-by-hop headers from customHeaders", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  const headers = executor.buildHeaders(
    {
      apiKey: "test-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: {
          host: "evil.com",
          "content-length": "999",
          connection: "close",
          "X-Legitimate": "good-header",
        },
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers.host, undefined);
  assert.equal(headers["content-length"], undefined);
  assert.equal(headers.connection, undefined);
  assert.equal(headers["X-Legitimate"], "good-header");
});

test("DefaultExecutor.buildHeaders handles string customHeaders (JSON parsed)", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  const headers = executor.buildHeaders(
    {
      apiKey: "test-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: JSON.stringify({ "X-From-String": "parsed-value" }),
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers["X-From-String"], "parsed-value");
});

test("DefaultExecutor.buildHeaders handles invalid JSON in string customHeaders gracefully", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  const headers = executor.buildHeaders(
    {
      apiKey: "test-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: "not valid json {",
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers["X-From-String"], undefined);
  assert.equal(headers.Authorization, "Bearer test-key");
});

test("DefaultExecutor.buildHeaders handles array customHeaders gracefully", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  const headers = executor.buildHeaders(
    {
      apiKey: "test-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: ["array", "not", "valid"],
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers["X-From-String"], undefined);
  assert.equal(headers.Authorization, "Bearer test-key");
});

test("DefaultExecutor.buildHeaders handles null/undefined/empty customHeaders", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  const nullHeaders = executor.buildHeaders(
    { apiKey: "key", providerSpecificData: { customHeaders: null } },
    true
  ) as Record<string, string>;
  const undefinedHeaders = executor.buildHeaders(
    { apiKey: "key", providerSpecificData: {} },
    true
  ) as Record<string, string>;
  const emptyHeaders = executor.buildHeaders(
    { apiKey: "key", providerSpecificData: { customHeaders: {} } },
    true
  ) as Record<string, string>;

  for (const headers of [nullHeaders, undefinedHeaders, emptyHeaders]) {
    assert.equal(headers["X-Anything"], undefined);
    assert.equal(headers.Authorization, "Bearer key");
  }
});

test("DefaultExecutor.buildHeaders customHeaders are case-sensitive for header names", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  const headers = executor.buildHeaders(
    {
      apiKey: "test-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: {
          "x-lower": "lower-value",
          "X-Upper": "upper-value",
          "X-Mixed": "mixed-value",
        },
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers["x-lower"], "lower-value");
  assert.equal(headers["X-Upper"], "upper-value");
  assert.equal(headers["X-Mixed"], "mixed-value");
});

test("DefaultExecutor.buildHeaders for non-openai-compatible providers ignores customHeaders", () => {
  const executor = new DefaultExecutor("openai");

  const headers = executor.buildHeaders(
    {
      apiKey: "test-key",
      providerSpecificData: {
        customHeaders: {
          "X-Custom": "should-be-ignored",
        },
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers["X-Custom"], undefined);
  assert.equal(headers.Authorization, "Bearer test-key");
});

test("DefaultExecutor.execute sends customHeaders in the actual HTTP request", async () => {
  const executor = new DefaultExecutor("openai-compatible-test");
  const originalFetch = globalThis.fetch;
  let capturedHeaders: Record<string, string> = {};

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedHeaders = (init.headers as Record<string, string>) || {};
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-4.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey: "test-key",
        providerSpecificData: {
          baseUrl: "https://test.proxy.com/v1",
          customHeaders: {
            "X-Request-ID": "test-req-123",
            "X-Trace-Id": "trace-abc",
          },
        },
      },
    });

    assert.equal(capturedHeaders["X-Request-ID"], "test-req-123");
    assert.equal(capturedHeaders["X-Trace-Id"], "trace-abc");
    assert.equal(capturedHeaders["Authorization"], "Bearer test-key");
    assert.equal(capturedHeaders["Content-Type"], "application/json");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("DefaultExecutor.execute does NOT send forbidden headers from customHeaders in HTTP request", async () => {
  const executor = new DefaultExecutor("openai-compatible-test");
  const originalFetch = globalThis.fetch;
  let capturedHeaders: Record<string, string> = {};

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedHeaders = (init.headers as Record<string, string>) || {};
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-4.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey: "test-key",
        providerSpecificData: {
          baseUrl: "https://test.proxy.com/v1",
          customHeaders: {
            host: "evil.com",
            "content-length": "9999",
            "X-Legitimate": "good",
          },
        },
      },
    });

    assert.equal(capturedHeaders.host, undefined);
    assert.equal(capturedHeaders["content-length"], undefined);
    assert.equal(capturedHeaders["X-Legitimate"], "good");
    assert.equal(capturedHeaders.Authorization, "Bearer test-key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("DefaultExecutor.execute does NOT allow customHeaders to override Authorization", async () => {
  const executor = new DefaultExecutor("openai-compatible-test");
  const originalFetch = globalThis.fetch;
  let capturedHeaders: Record<string, string> = {};

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedHeaders = (init.headers as Record<string, string>) || {};
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-4.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey: "real-key",
        providerSpecificData: {
          baseUrl: "https://test.proxy.com/v1",
          customHeaders: {
            Authorization: "Bearer forged-key",
          },
        },
      },
    });

    assert.equal(capturedHeaders.Authorization, "Bearer real-key");
    assert.notEqual(capturedHeaders.Authorization, "Bearer forged-key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("db: createProviderNode and getProviderNodeById handle customHeaders as JSON", async () => {
  const node = await providersDb.createProviderNode({
    id: "openai-compatible-chat-custom-headers-db",
    type: "openai-compatible",
    name: "DB Custom Headers Test",
    prefix: "db-custom",
    apiType: "chat",
    baseUrl: "https://db.example.com/v1",
    customHeaders: { "X-DB-Header": "db-value", "X-Another": "another" },
  });

  assert.deepEqual(node.customHeaders, { "X-DB-Header": "db-value", "X-Another": "another" });

  const retrieved = await providersDb.getProviderNodeById(
    "openai-compatible-chat-custom-headers-db"
  );
  assert.deepEqual(retrieved.customHeaders, { "X-DB-Header": "db-value", "X-Another": "another" });
});

test("db: updateProviderNode modifies customHeaders", async () => {
  const node = await providersDb.createProviderNode({
    id: "openai-compatible-chat-update-custom",
    type: "openai-compatible",
    name: "Update Custom Test",
    prefix: "update-custom",
    apiType: "chat",
    baseUrl: "https://update.example.com/v1",
    customHeaders: { "X-Initial": "initial-value" },
  });

  assert.deepEqual(node.customHeaders, { "X-Initial": "initial-value" });

  const updated = await providersDb.updateProviderNode("openai-compatible-chat-update-custom", {
    customHeaders: { "X-Updated": "updated-value", "X-New-Header": "new" },
  });

  assert.deepEqual(updated.customHeaders, { "X-Updated": "updated-value", "X-New-Header": "new" });

  const retrieved = await providersDb.getProviderNodeById("openai-compatible-chat-update-custom");
  assert.deepEqual(retrieved.customHeaders, {
    "X-Updated": "updated-value",
    "X-New-Header": "new",
  });
});

test("db: updateProviderNode can clear customHeaders by passing null", async () => {
  const node = await providersDb.createProviderNode({
    id: "openai-compatible-chat-clear-custom",
    type: "openai-compatible",
    name: "Clear Custom Test",
    prefix: "clear-custom",
    apiType: "chat",
    baseUrl: "https://clear.example.com/v1",
    customHeaders: { "X-ToClear": "clear-me" },
  });

  assert.deepEqual(node.customHeaders, { "X-ToClear": "clear-me" });

  const updated = await providersDb.updateProviderNode("openai-compatible-chat-clear-custom", {
    customHeaders: null,
  });

  assert.equal(updated.customHeaders, null);
});
