import test from "node:test";
import assert from "node:assert/strict";

const {
  buildCustomJsonHeaders,
  buildCustomJsonRequest,
  customJsonConfigSchema,
  extractCustomJsonText,
  isCustomJsonProviderData,
  normalizeCustomJsonConfig,
  readJsonPath,
} = await import("../../open-sse/utils/customJson.ts");

const endpoint = "https://api.example.com/api/run?version=2";
const body = {
  messages: [{ role: "user", content: 'Example "input"\n基础' }],
  project_id: "demo-project",
};
const config = (overrides: Record<string, unknown> = {}) => ({
  method: "POST",
  authType: "bearer",
  authHeader: "X-API-Key",
  requestTemplate: {
    project_id: "{{prompt}}",
    history: "{{messages}}",
    model: "{{model}}",
    stream: "{{stream}}",
  },
  responsePath: "data.answers[0].text",
  ...overrides,
});

test("defaults: an empty config sends model + messages and reads the OpenAI reply path", () => {
  const normalized = normalizeCustomJsonConfig({}, endpoint);
  assert.deepEqual(normalized, {
    method: "POST",
    authType: "bearer",
    authHeader: "X-API-Key",
    requestTemplate: { model: "{{model}}", messages: "{{messages}}" },
    responsePath: "choices[0].message.content",
  });
  assert.deepEqual(buildCustomJsonRequest(normalized, "m1", body), {
    model: "m1",
    messages: body.messages,
  });
});

test("placeholders: exact match keeps the JSON type, embedded ones are stringified safely", () => {
  const normalized = normalizeCustomJsonConfig(
    config({
      requestTemplate: {
        ...config().requestTemplate,
        name: "{{request.project_id}}",
        greeting: "Input: {{prompt}}",
        nested: { list: ["{{model}}", 3, true, null] },
        enabled: true,
        limit: 3,
      },
    }),
    endpoint
  );
  const result = buildCustomJsonRequest(normalized, "assistant", body);
  assert.deepEqual(result, {
    project_id: body.messages[0].content,
    history: body.messages,
    model: "assistant",
    stream: false,
    name: "demo-project",
    greeting: `Input: ${body.messages[0].content}`,
    nested: { list: ["assistant", 3, true, null] },
    enabled: true,
    limit: 3,
  });
  assert.ok(Array.isArray(result.history), "{{messages}} must stay an array");
  assert.deepEqual(JSON.parse(JSON.stringify(result)), result);
});

test("prompt is the latest user turn, joining its text parts", () => {
  const result = buildCustomJsonRequest(normalizeCustomJsonConfig(config(), endpoint), "x", {
    messages: [
      { role: "user", content: "old" },
      {
        role: "user",
        content: [
          { type: "text", text: "hello" },
          { type: "image_url", image_url: {} },
          { type: "text", text: "world" },
        ],
      },
      { role: "assistant", content: "reply" },
    ],
  });
  assert.equal(result.project_id, "hello\nworld");
});

test("a placeholder that resolves to nothing is an error, never silently dropped", () => {
  const normalized = normalizeCustomJsonConfig(
    config({ requestTemplate: { project_id: "{{request.missing}}" } }),
    endpoint
  );
  assert.throws(() => buildCustomJsonRequest(normalized, "x", body), /Missing template value/);
});

const invalidConfigs: Array<[string, Record<string, unknown>]> = [
  ["array template", { requestTemplate: [] }],
  ["unknown variable", { requestTemplate: { x: "{{secret}}" } }],
  ["whole-scope placeholder", { requestTemplate: { x: "{{$}}" } }],
  ["prototype path", { requestTemplate: { x: "{{request.__proto__}}" } }],
  ["constructor path", { requestTemplate: { x: "{{request.constructor}}" } }],
  ["prototype key", { requestTemplate: JSON.parse('{"__proto__":{"polluted":true}}') }],
  ["nested prototype key", { requestTemplate: JSON.parse('{"a":{"constructor":1}}') }],
  ["unbalanced placeholder", { requestTemplate: { x: "{{prompt}" } }],
  ["code-looking placeholder", { requestTemplate: { x: "{{process.exit()}}" } }],
  ["wildcard response path", { responsePath: "data.*" }],
  ["prototype response path", { responsePath: "constructor" }],
  ["unknown method", { method: "TRACE" }],
  ["unknown auth type", { authType: "unknown" }],
  ["auth header Host", { authType: "api-key", authHeader: "Host" }],
  ["auth header Cookie", { authType: "api-key", authHeader: "cookie" }],
  ["auth header hop-by-hop", { authType: "api-key", authHeader: "Transfer-Encoding" }],
  ["auth header with CRLF", { authType: "api-key", authHeader: "X-Key\r\nX-Evil" }],
  ["unknown field", { headers: { "X-App": "x" } }],
];

for (const [label, overrides] of invalidConfigs) {
  test(`rejects invalid config: ${label}`, () => {
    assert.throws(() => normalizeCustomJsonConfig(config(overrides), endpoint), {
      name: "CustomJsonError",
    });
    assert.equal(customJsonConfigSchema.safeParse(config(overrides)).success, false);
  });
}

test("rejects a template deeper than 32 levels or larger than 64 KB", () => {
  let deep: unknown = "{{prompt}}";
  for (let i = 0; i < 33; i++) deep = { d: deep };
  assert.throws(
    () => normalizeCustomJsonConfig(config({ requestTemplate: deep as object }), endpoint),
    /nested too deeply/
  );
  assert.throws(
    () =>
      normalizeCustomJsonConfig(config({ requestTemplate: { big: "x".repeat(65_537) } }), endpoint),
    /exceeds 64 KB/
  );
});

for (const url of [
  "file:///etc/passwd",
  "https://user:secret@example.com/run",
  "javascript:alert(1)",
  "https://example.com/run#fragment",
  "",
  "not a url",
]) {
  test(`rejects endpoint ${JSON.stringify(url)}`, () => {
    assert.throws(() => normalizeCustomJsonConfig(config(), url), { name: "CustomJsonError" });
  });
}

test("a long unclosed placeholder is rejected quickly (no regex backtracking)", () => {
  const started = Date.now();
  assert.throws(() =>
    normalizeCustomJsonConfig(
      config({ requestTemplate: { x: `{{${" ".repeat(60_000)}` } }),
      endpoint
    )
  );
  assert.ok(Date.now() - started < 1000);
});

test("readJsonPath reads own properties only and supports $ for the whole value", () => {
  assert.equal(readJsonPath({ a: [{ b: "ok" }] }, "a[0].b"), "ok");
  assert.equal(readJsonPath({ a: { b: 1 } }, "$.a.b"), 1);
  assert.deepEqual(readJsonPath({ a: 1 }, "$"), { a: 1 });
  assert.equal(readJsonPath({}, "toString"), undefined);
  assert.equal(readJsonPath("text", "length"), undefined);
});

test("extractCustomJsonText serializes non-string values, including false and 0", () => {
  assert.equal(
    extractCustomJsonText(
      { responsePath: "data.answers[0].text" },
      {
        data: { answers: [{ text: "OK" }] },
      }
    ),
    "OK"
  );
  for (const value of [false, 0, { project: "demo-project" }, [1, 2]]) {
    assert.equal(extractCustomJsonText({ responsePath: "$" }, value), JSON.stringify(value));
  }
  assert.throws(() => extractCustomJsonText({ responsePath: "data.x" }, {}), /not found/);
  assert.throws(() => extractCustomJsonText({ responsePath: "data" }, { data: null }), /not found/);
});

test("auth headers: bearer, named api-key header, none; a key is required unless none", () => {
  const bearer = buildCustomJsonHeaders(normalizeCustomJsonConfig(config(), endpoint), "k1");
  assert.deepEqual(bearer.auth, { Authorization: "Bearer k1" });
  assert.equal(bearer.base["Content-Type"], "application/json");

  const apiKey = buildCustomJsonHeaders(
    normalizeCustomJsonConfig(
      config({ authType: "api-key", authHeader: "X-Service-Key" }),
      endpoint
    ),
    "k2"
  );
  assert.deepEqual(apiKey.auth, { "X-Service-Key": "k2" });

  const none = buildCustomJsonHeaders(
    normalizeCustomJsonConfig(config({ authType: "none" }), endpoint),
    ""
  );
  assert.deepEqual(none.auth, {});

  assert.throws(
    () => buildCustomJsonHeaders(normalizeCustomJsonConfig(config(), endpoint), " "),
    /API key is required/
  );
});

test("isCustomJsonProviderData only matches the custom-json apiType", () => {
  assert.equal(isCustomJsonProviderData({ apiType: "custom-json" }), true);
  assert.equal(isCustomJsonProviderData({ apiType: "chat" }), false);
  assert.equal(isCustomJsonProviderData(null), false);
  assert.equal(isCustomJsonProviderData("custom-json"), false);
});
