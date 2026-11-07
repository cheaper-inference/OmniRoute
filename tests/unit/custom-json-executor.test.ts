import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-json-executor-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { buildProviderUrl, getTargetFormat } = await import("../../open-sse/services/provider.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const endpoint = "https://api.example.com/api/run?version=2";
const provider = "openai-compatible-custom-json-test";
const body = {
  model: "custom-model",
  messages: [{ role: "user", content: 'Example "input"\n基础' }],
  project_id: "demo-project",
};
type Json = Record<string, unknown>;
const config = (overrides: Json = {}) => ({
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
const providerData = (customJson: Json = config(), extra: Json = {}) => ({
  apiType: "custom-json",
  baseUrl: endpoint,
  customJson,
  customHeaders: { "X-App": "omniroute" },
  ...extra,
});

type FetchCall = { url: string; init: RequestInit };
let calls: FetchCall[] = [];
function stubFetch(responder: (call: FetchCall) => Response | Promise<Response>) {
  calls = [];
  mock.method(globalThis, "fetch", async (url: string | URL, init: RequestInit = {}) => {
    const call = { url: String(url), init };
    calls.push(call);
    return responder(call);
  });
}

type ExecResult = { response: Response; url?: string; headers?: Record<string, string> };
async function run(
  options: { stream?: boolean; psd?: Json; apiKey?: string; id?: string; signal?: AbortSignal } = {}
): Promise<ExecResult> {
  const executor = await getExecutor(options.id ?? provider);
  return (await executor.execute({
    model: "custom-model",
    body: structuredClone(body),
    stream: options.stream === true,
    signal: options.signal,
    credentials: {
      apiKey: options.apiKey ?? "test-secret",
      providerSpecificData: options.psd ?? providerData(),
    },
  })) as ExecResult;
}

test.afterEach(() => {
  mock.restoreAll();
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("custom-json node resolves to the openai target format and keeps the full endpoint URL", async () => {
  assert.ok((await getExecutor(provider)) instanceof DefaultExecutor);
  assert.equal(getTargetFormat(provider, providerData()), "openai");
  assert.equal(
    buildProviderUrl(provider, "m", false, { providerSpecificData: providerData() }),
    endpoint
  );
});

test("sends the filled template with the configured method/auth and returns an OpenAI completion", async () => {
  stubFetch(() => Response.json({ data: { answers: [{ text: "示例回复" }] } }));
  const result = await run({
    psd: providerData(
      config({ method: "PATCH", authType: "api-key", authHeader: "X-Service-Key" })
    ),
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, endpoint);
  assert.equal(calls[0].init.method, "PATCH");
  const sent = calls[0].init.headers as Record<string, string>;
  assert.equal(sent["X-Service-Key"], "test-secret");
  assert.equal(sent["X-App"], "omniroute");
  assert.equal(sent.Accept, "application/json");
  assert.equal(sent.Authorization, undefined);
  assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
    project_id: body.messages[0].content,
    history: body.messages,
    model: "custom-model",
    stream: false,
  });

  assert.equal(result.headers?.["X-Service-Key"], "[REDACTED]");
  assert.equal(result.url, endpoint);
  const completion = (await result.response.json()) as Json & {
    choices: Array<{ message: { content: string } }>;
  };
  assert.equal(completion.object, "chat.completion");
  assert.equal(completion.choices[0].message.content, "示例回复");
});

test("bearer auth is redacted in the returned (logged) headers", async () => {
  stubFetch(() => Response.json({ data: { answers: [{ text: "OK" }] } }));
  const result = await run();
  assert.equal(
    (calls[0].init.headers as Record<string, string>).Authorization,
    "Bearer test-secret"
  );
  assert.equal(result.headers?.Authorization, "[REDACTED]");
});

test("streaming callers get a complete two-chunk SSE stream while upstream stays JSON", async () => {
  stubFetch(() => Response.json({ data: { answers: [{ text: "hello\nworld" }] } }));
  const { response } = await run({ stream: true });
  assert.equal(response.headers.get("content-type"), "text/event-stream");
  const frames = (await response.text()).trim().split("\n\n");
  assert.equal(JSON.parse(frames[0].slice(6)).choices[0].delta.content, "hello\nworld");
  assert.equal(JSON.parse(frames[1].slice(6)).choices[0].finish_reason, "stop");
  assert.equal(frames[2], "data: [DONE]");
  assert.equal(JSON.parse(String(calls[0].init.body)).stream, false);
});

test("a node edited from chat to custom-json is honored despite its immutable id", async () => {
  stubFetch(() => Response.json({ data: { answers: [{ text: "OK" }] } }));
  const { response } = await run({ id: "openai-compatible-chat-legacy" });
  assert.equal(calls[0].url, endpoint);
  const completion = (await response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };
  assert.equal(completion.choices[0].message.content, "OK");
});

test("authType none sends no credential and needs no key", async () => {
  stubFetch(() => Response.json({ answer: "OK" }));
  const { response } = await run({
    apiKey: "",
    psd: providerData(config({ authType: "none", responsePath: "answer" })),
  });
  assert.equal(response.status, 200);
  assert.equal((calls[0].init.headers as Record<string, string>).Authorization, undefined);
});

test("a missing key fails locally with 401 and never calls the endpoint", async () => {
  stubFetch(() => Response.json({}));
  const { response } = await run({ apiKey: "" });
  assert.equal(response.status, 401);
  assert.equal(calls.length, 0);
});

for (const status of [429, 500, 502, 503, 504]) {
  test(`upstream ${status} is passed through and never retried`, async () => {
    stubFetch(() => Response.json({ error: "business error" }, { status }));
    const { response } = await run();
    assert.equal(response.status, status);
    assert.equal(calls.length, 1);
  });
}

test("a network failure surfaces as a sanitized 502 after exactly one attempt", async () => {
  stubFetch(() => {
    throw new Error("socket hang up at 10.0.0.5:8443");
  });
  const { response } = await run();
  assert.equal(response.status, 502);
  assert.equal(calls.length, 1);
  const text = await response.text();
  assert.ok(!text.includes("10.0.0.5"), "network detail must not leak");
});

for (const [label, make] of [
  ["non-JSON body", () => new Response("<html>not JSON</html>")],
  ["missing response field", () => Response.json({ unexpected: true })],
] as const) {
  test(`${label} is reported as 502`, async () => {
    stubFetch(make);
    const { response } = await run();
    assert.equal(response.status, 502);
    const parsed = (await response.json()) as { error: { message: string } };
    assert.match(parsed.error.message, /Custom JSON response/);
  });
}

test("the outbound URL guard runs on every call (cloud metadata is refused)", async () => {
  stubFetch(() => Response.json({}));
  const { response } = await run({
    psd: providerData(config(), { baseUrl: "http://169.254.169.254/latest/meta-data" }),
  });
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);
});

test("an invalid stored template fails with 400 before any request", async () => {
  stubFetch(() => Response.json({}));
  const { response } = await run({
    psd: providerData(config({ requestTemplate: { x: "{{request.__proto__}}" } })),
  });
  assert.equal(response.status, 400);
  assert.equal(calls.length, 0);
});

test("client cancellation propagates instead of becoming an error response", async () => {
  const controller = new AbortController();
  stubFetch(
    ({ init }) =>
      new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener("abort", () => reject(new Error("aborted")), { once: true });
        controller.abort(new DOMException("cancelled", "AbortError"));
      })
  );
  await assert.rejects(run({ signal: controller.signal }), /cancelled/);
});
