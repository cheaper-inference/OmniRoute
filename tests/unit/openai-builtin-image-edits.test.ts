import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openai-edits-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET ||= "openai-edits-test-key-secret";

const { POST } = await import("../../src/app/api/v1/images/edits/route.ts");
const { createApiKey, resetApiKeyState, updateApiKeyPermissions } =
  await import("../../src/lib/db/apiKeys.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { createProviderConnection, updateProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { getDbInstance, resetDbInstance, shutdownDbInstance } =
  await import("../../src/lib/db/core.ts");
const { closeCallLogSaves, getCallLogs, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");

const { createProxy, assignProxyToScope } = await import("../../src/lib/db/proxies.ts");
const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");
const { getImageModelEntry } = await import("../../open-sse/config/imageRegistry.ts");

const MODEL = "openai/gpt-image-2.6-flare";
const ENDPOINT = "https://api.openai.com/v1/images/edits";
const API_KEY = "openai-edits-fixture";
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);
const MASK_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
  "base64"
);
const JPEG = Buffer.from([0xff, 0xd8, 0xff, 0xd9]);
const UPSTREAM_RESPONSE = { created: 1234, data: [{ b64_json: "aW1hZ2U=" }] };

function seedConnection(overrides: Record<string, unknown> = {}) {
  return createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-edits-test",
    apiKey: API_KEY,
    isActive: true,
    testStatus: "active",
    ...overrides,
  });
}

function mockUpstream(t: TestContext) {
  const calls: Array<{
    url: string;
    method?: string;
    auth: string | null;
    proxyUrl: string | null;
    form: FormData;
  }> = [];
  t.mock.method(globalThis, "fetch", async (url: URL | string, init: RequestInit = {}) => {
    assert.ok(Buffer.isBuffer(init.body), "multipart uses an explicit-boundary Buffer");
    calls.push({
      url: String(url),
      method: init.method,
      auth: new Headers(init.headers).get("authorization"),
      proxyUrl: resolveProxyForRequest(String(url)).proxyUrl,
      form: await new Response(init.body, { headers: init.headers }).formData(),
    });
    return Response.json(UPSTREAM_RESPONSE);
  });
  return calls;
}

function request(body: FormData | Record<string, unknown>, clientKey?: string) {
  const headers = new Headers();
  if (clientKey) headers.set("authorization", "Bearer " + clientKey);
  if (!(body instanceof FormData)) headers.set("content-type", "application/json");
  return new Request("http://localhost/api/v1/images/edits", {
    method: "POST",
    headers,
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
}

function dataUrl(bytes = PNG) {
  return "data:image/png;base64," + bytes.toString("base64");
}

function jsonBody(overrides: Record<string, unknown> = {}) {
  return { model: MODEL, prompt: "add a red hat", image: dataUrl(), ...overrides };
}

async function expectImage(body: FormData | Record<string, unknown>, clientKey?: string) {
  const response = await POST(request(body, clientKey));
  const result = await response.json();
  assert.equal(response.status, 200, JSON.stringify(result));
  assert.deepEqual(result, UPSTREAM_RESPONSE);
}

async function expectFile(
  part: FormDataEntryValue | null,
  name: string,
  mime: string,
  bytes: Buffer
) {
  assert.ok(part instanceof File);
  assert.match(part.name, new RegExp(name + "$"));
  assert.equal(part.type, mime);
  assert.deepEqual(Buffer.from(await part.arrayBuffer()), bytes);
}

test.beforeEach(async () => {
  assert.equal(await waitForCallLogSaves(2000), true);
  resetApiKeyState();
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});

test.after(async () => {
  await closeCallLogSaves();
  await shutdownDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("direct JSON edits send a single binary image with the selected OpenAI credential", async (t) => {
  await seedConnection();
  const calls = mockUpstream(t);
  await expectImage(jsonBody({ response_format: "url", size: "1024x1024" }));

  assert.equal(calls.length, 1);
  const { url, method, auth, form } = calls[0];
  assert.equal(url, ENDPOINT);
  assert.equal(method, "POST");
  assert.equal(auth, "Bearer " + API_KEY);
  assert.equal(form.get("model"), "gpt-image-2.6-flare");
  assert.equal(form.get("prompt"), "add a red hat");
  assert.equal(form.get("size"), "1024x1024");
  assert.equal(form.get("n"), "1");
  assert.equal(form.has("response_format"), false);
  assert.equal(form.has("image[]"), false);
  await expectFile(form.get("image"), "\\.png", "image/png", PNG);
});

test("multipart edits preserve both reference files and an uploaded mask", async (t) => {
  await seedConnection();
  const calls = mockUpstream(t);
  const body = new FormData();
  body.set("model", MODEL);
  body.set("prompt", "add a red hat");
  body.set("response_format", "url");
  body.append("image[]", new Blob([PNG], { type: "image/png" }), "reference.png");
  body.append("image[]", new Blob([JPEG], { type: "image/jpeg" }), "reference.jpg");
  body.set("mask", new Blob([MASK_PNG], { type: "image/png" }), "mask.png");
  await expectImage(body);

  assert.equal(calls.length, 1);
  const { url, auth, form } = calls[0];
  assert.equal(url, ENDPOINT);
  assert.equal(auth, "Bearer " + API_KEY);
  assert.equal(form.has("response_format"), false);
  assert.equal(form.has("image"), false);
  const references = form.getAll("image[]");
  assert.equal(references.length, 2);
  await expectFile(references[0], "\\.png", "image/png", PNG);
  await expectFile(references[1], "\\.jpg", "image/jpeg", JPEG);
  await expectFile(form.get("mask"), "mask\\.png", "image/png", MASK_PNG);
});

test("DALL-E 2 retains response_format and honors the connection's endpoint override", async (t) => {
  await seedConnection({
    providerSpecificData: { baseUrl: "https://openai-proxy.example/v1/images/generations/" },
  });
  const calls = mockUpstream(t);
  await expectImage(jsonBody({ model: "openai/dall-e-2", response_format: "b64_json" }));
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://openai-proxy.example/v1/images/edits");
  assert.equal(calls[0].form.get("model"), "dall-e-2");
  assert.equal(calls[0].form.get("response_format"), "b64_json");
});

test("sixteen references keep their order and a seventeenth is rejected", async (t) => {
  await seedConnection();
  const calls = mockUpstream(t);
  const references = Array.from({ length: 16 }, (_, i) => Buffer.concat([PNG, Buffer.of(i)]));
  const images = references.map(dataUrl);
  await expectImage(jsonBody({ image: undefined, images }));
  assert.equal(calls.length, 1);
  const parts = calls[0].form.getAll("image[]");
  assert.equal(parts.length, references.length);
  for (const [i, bytes] of references.entries()) {
    await expectFile(parts[i], "\\.png", "image/png", bytes);
  }

  const response = await POST(request(jsonBody({ images })));
  assert.equal(response.status, 400);
  assert.equal(
    (await response.json()).error.message,
    "OpenAI image edit supports at most 16 reference images"
  );
  assert.equal(calls.length, 1);
});

test("GIF frame controls and native edit options are sent without compression", async (t) => {
  await seedConnection();
  const calls = mockUpstream(t);
  const controls = {
    output_format: "gif",
    frame_count: 4,
    frame_duration_ms: 200,
    quality: "high",
    background: "transparent",
    input_fidelity: "high",
    complexity: "low",
    moderation: "auto",
    n: 2,
  };
  await expectImage(jsonBody({ ...controls, output_compression: 70, extra_field: "omit" }));
  assert.equal(calls.length, 1);
  for (const [name, value] of Object.entries(controls)) {
    assert.equal(calls[0].form.get(name), String(value), name);
  }
  assert.equal(calls[0].form.has("output_compression"), false);
  assert.equal(calls[0].form.has("extra_field"), false);
});

test("only JPEG and WebP retain explicit zero compression", async (t) => {
  await seedConnection();
  const calls = mockUpstream(t);
  for (const format of ["jpeg", "webp", "png", "svg", undefined]) {
    await expectImage(jsonBody({ output_format: format, output_compression: 0, n: 1.5 }));
    const form = calls.at(-1)!.form;
    assert.equal(
      form.get("output_compression"),
      format === "jpeg" || format === "webp" ? "0" : null
    );
    assert.equal(form.get("n"), "1");
  }
});

test("image edit Combos forward native controls and enforce the OpenAI reference limit", async (t) => {
  await seedConnection();
  await createCombo({ name: "openai-edits", strategy: "priority", models: [MODEL] });
  const calls = mockUpstream(t);
  await expectImage(
    jsonBody({
      model: "openai-edits",
      quality: "low",
      background: "opaque",
      mask: dataUrl(MASK_PNG),
    })
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, ENDPOINT);
  assert.equal(calls[0].auth, "Bearer " + API_KEY);
  assert.equal(calls[0].form.get("quality"), "low");
  assert.equal(calls[0].form.get("background"), "opaque");
  await expectFile(calls[0].form.get("mask"), "mask\\.png", "image/png", MASK_PNG);

  const response = await POST(
    request(
      jsonBody({
        model: "openai-edits",
        images: Array.from({ length: 16 }, () => dataUrl()),
      })
    )
  );
  assert.equal(response.status, 400);
  assert.equal(
    (await response.json()).error.message,
    "OpenAI image edit supports at most 16 reference images"
  );
  assert.equal(calls.length, 1);
});

test("missing and rate-limited OpenAI accounts do not contact the upstream", async (t) => {
  const calls = mockUpstream(t);
  const missing = await POST(request(jsonBody()));
  assert.equal(missing.status, 401);
  assert.match((await missing.json()).error.message, /No credentials for provider: openai/);
  await seedConnection({ rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() });
  const limited = await POST(request(jsonBody()));
  assert.equal(limited.status, 429);
  assert.match((await limited.json()).error.message, /All accounts rate limited/);
  assert.equal(calls.length, 0);
});

test("direct edits honor the caller key's account scope and log the selected account", async (t) => {
  await seedConnection({ name: "other OpenAI account", apiKey: "other-account-fixture" });
  const allowed = await seedConnection();
  const caller = await createApiKey("image edit caller", "test-machine", [], {
    allowedConnections: [allowed.id],
  });
  const blocked = await createApiKey("blocked edit caller", "test-machine", [], {
    allowedConnections: ["unrelated-connection"],
  });
  const calls = mockUpstream(t);
  const rejected = await POST(request(jsonBody(), blocked.key));
  assert.equal(rejected.status, 403);
  assert.equal(calls.length, 0);

  await expectImage(jsonBody(), caller.key);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].auth, "Bearer " + API_KEY);

  assert.equal(await waitForCallLogSaves(2000), true);
  const logs = await getCallLogs({ apiKey: caller.id, limit: 5 });
  assert.ok(
    logs.some(
      (log) =>
        log.path === "/v1/images/edits" && log.connectionId === allowed.id && log.status === 200
    )
  );
});

test("OpenAI chat and generation-only models cannot reach the edit endpoint", async (t) => {
  await seedConnection();
  const calls = mockUpstream(t);
  for (const model of ["openai/gpt-4o", "openai/dall-e-3"]) {
    const response = await POST(request(jsonBody({ model })));
    assert.equal(response.status, 400);
    assert.match((await response.json()).error.message, /Unsupported OpenAI image edit model/);
  }
  assert.equal(calls.length, 0);
});

test("all built-in GPT Image edit models advertise image input", () => {
  for (const model of ["gpt-image-2", "gpt-image-1.5", "gpt-image-1-mini"]) {
    assert.deepEqual(getImageModelEntry("openai/" + model)?.inputModalities, ["text", "image"]);
  }
});

test("DALL-E 2 rejects a second reference in direct requests and DALL-E-only Combos", async (t) => {
  await seedConnection();
  await createCombo({ name: "dalle-edits", strategy: "priority", models: ["openai/dall-e-2"] });
  const calls = mockUpstream(t);

  for (const model of ["openai/dall-e-2", "dalle-edits"]) {
    const response = await POST(request(jsonBody({ model, images: [dataUrl()] })));
    assert.equal(response.status, 400);
    assert.match((await response.json()).error.message, /DALL-E 2.*one reference image/);
  }
  assert.equal(calls.length, 0);
});

test("a Combo skips DALL-E 2 and uses the next GPT Image target for two references", async (t) => {
  await seedConnection();
  await createCombo({
    name: "mixed-openai-edits",
    strategy: "priority",
    models: ["openai/dall-e-2", MODEL],
  });
  const calls = mockUpstream(t);

  await expectImage(jsonBody({ model: "mixed-openai-edits", images: [dataUrl()] }));
  assert.equal(calls.length, 1);
  assert.equal(calls[0].form.get("model"), "gpt-image-2.6-flare");
  assert.equal(calls[0].form.getAll("image[]").length, 2);
});

test("direct and Combo edits apply the caller key's proxy and preserve the unkeyed account proxy", async (t) => {
  const connection = await seedConnection();
  await updateProviderConnection(connection.id, { proxyEnabled: true, perKeyProxyEnabled: true });
  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'perKeyProxyEnabled', 'true')"
    )
    .run();
  const accountProxy = await createProxy({
    name: "Account relay",
    type: "vercel",
    host: "account-relay.test",
    port: 443,
  });
  const keyProxy = await createProxy({
    name: "Key relay",
    type: "vercel",
    host: "key-relay.test",
    port: 443,
  });
  assert.ok(accountProxy && keyProxy);
  await assignProxyToScope("account", connection.id, accountProxy.id);
  const caller = await createApiKey("proxy caller", "proxy-test-machine");
  await updateApiKeyPermissions(caller.id, { proxyId: keyProxy.id });
  await createCombo({ name: "proxy-edits", strategy: "priority", models: [MODEL] });
  const calls = mockUpstream(t);

  for (const model of [MODEL, "proxy-edits"]) {
    await expectImage(jsonBody({ model }), caller.key);
    await expectImage(jsonBody({ model }));
  }
  assert.deepEqual(
    calls.map(({ proxyUrl }) => proxyUrl),
    [
      "https://key-relay.test",
      "https://account-relay.test",
      "https://key-relay.test",
      "https://account-relay.test",
    ]
  );
});

test("multipart PNG masks declared as binary are forwarded with image/png", async (t) => {
  await seedConnection();
  const calls = mockUpstream(t);
  const body = new FormData();
  body.set("model", MODEL);
  body.set("prompt", "add a red hat");
  body.set("image", new Blob([PNG], { type: "image/png" }), "reference.png");
  body.set("mask", new Blob([MASK_PNG], { type: "application/octet-stream" }), "mask.dat");

  await expectImage(body);
  assert.equal(calls.length, 1);
  await expectFile(calls[0].form.get("mask"), "mask\\.png", "image/png", MASK_PNG);
});

test("malformed or unsupported supplied masks cannot produce unmasked OpenAI edits", async (t) => {
  await seedConnection();
  await createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-edits-test",
    apiKey: "openrouter-edits-fixture",
    isActive: true,
    testStatus: "active",
  });
  await createCombo({
    name: "masked-openai-edits",
    strategy: "priority",
    models: [MODEL, "openrouter/openai/gpt-5.4-image-2"],
  });
  const calls = mockUpstream(t);

  for (const [model, options] of [
    [MODEL, { mask: dataUrl(JPEG) }],
    [MODEL, { mask: "data:image/png;base64,not-base64" }],
    ["masked-openai-edits", { mask_url: "https://example.test/mask.png" }],
  ] as const) {
    const response = await POST(request(jsonBody({ model, ...options })));
    assert.equal(response.status, 400);
    assert.match((await response.json()).error.message, /mask.*PNG/);
  }
  assert.equal(calls.length, 0);
});
