/** Real public Decisions + System One routes, temporary DB and synthetic fetch only. */
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "decisions-route-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "decisions-route-fixture-secret";
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const providers = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/v1/decisions/route.ts");
const nativeRoute = await import("../../src/app/api/v1/systemone/route.ts");
const { createDecisionsPostHandler } = await import("../../src/app/api/v1/decisions/handler.ts");
const originalFetch = globalThis.fetch;
const originalRequired = process.env.REQUIRE_API_KEY;
let fetches = 0;
before(() => {
  process.env.REQUIRE_API_KEY = "true";
  globalThis.fetch = (async () => {
    fetches++;
    throw new Error("Unexpected test network request");
  }) as typeof fetch;
});
after(() => {
  globalThis.fetch = originalFetch;
  if (originalRequired === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = originalRequired;
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

const INPUT = "Synthetic secret-free lamp evidence";
function body() {
  return {
    model: "openai/gpt-6-luna",
    input: INPUT,
    questions: [
      { type: "predicate", name: "lamp", instructions: "Is it on?" },
      {
        type: "choice",
        name: "color",
        instructions: "Which color?",
        choices: [{ value: "red" }, { value: "blue" }],
      },
      {
        type: "score",
        name: "amount",
        instructions: "How much?",
        levels: [
          { label: "Low", description: "A small synthetic amount" },
          { label: "High", description: "A large synthetic amount" },
        ],
      },
    ],
  };
}
function response() {
  return {
    model: "gpt-6-luna",
    answers: [
      { name: "lamp", type: "predicate", probability: 0.98 },
      {
        name: "color",
        type: "choice",
        choice: "red",
        confidence: 1,
        probabilities: [
          { value: "red", probability: 1 },
          { value: "blue", probability: 0 },
        ],
      },
      {
        name: "amount",
        type: "score",
        score: 0.5,
        confidence: 0,
        probabilities: [
          { value: 0, label: "Low", probability: 0.5 },
          { value: 1, label: "High", probability: 0.5 },
        ],
      },
    ],
    usage: { input_tokens: 31, output_tokens: 4 },
  };
}
function request(value: unknown, key?: string, signal?: AbortSignal) {
  return new Request("http://localhost:20128/v1/decisions", {
    method: "POST",
    signal,
    body: JSON.stringify(value),
    headers: {
      "content-type": "application/json",
      ...(key ? { authorization: `Bearer ${key}` } : {}),
    },
  });
}
async function fixture() {
  const connection = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "fixture-only-openai-token",
    name: "Synthetic Decisions route connection",
    isActive: true,
  });
  const key = await keys.createApiKey("decisions client", "synthetic-machine", [], {
    allowedConnections: [String(connection.id)],
  });
  await keys.updateApiKeyPermissions(String(key.id), { allowedEndpoints: ["systemone"] });
  keys.clearApiKeyCaches();
  return { connection, key };
}

test("public route authenticates before malformed-body parsing, with zero external calls", async () => {
  const count = fetches;
  const result = await route.POST(
    new Request("http://localhost/v1/decisions", { method: "POST", body: "not JSON" })
  );
  assert.equal(result.status, 401);
  assert.equal(fetches, count);
  assert.equal(route.dynamic, "force-dynamic");
  assert.match((await route.OPTIONS()).headers.get("Access-Control-Allow-Methods") ?? "", /POST/);
});

test("shared System One category policy is enforced by the real delegated route", async () => {
  const key = await keys.createApiKey("decisions chat-only", "synthetic-machine", []);
  await keys.updateApiKeyPermissions(key.id, { allowedEndpoints: ["chat"] });
  keys.clearApiKeyCaches();
  const count = fetches;
  const result = await route.POST(request(body(), key.key));
  assert.equal(result.status, 403);
  assert.equal(fetches, count);
});

test("actual public + native routes make one synthetic OpenAI call and persist one unknown-cost usage row", async () => {
  const { key, connection } = await fixture();
  const saved = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async (url, init) => {
    calls++;
    assert.equal(calls, 1);
    assert.equal(String(url), "https://api.openai.com/v1/decisions");
    assert.equal(
      new Headers(init?.headers).get("authorization"),
      "Bearer fixture-only-openai-token"
    );
    assert.deepEqual(JSON.parse(String(init?.body)), { ...body(), model: "gpt-6-luna" });
    return Response.json(response());
  }) as typeof fetch;
  try {
    const result = await route.POST(request(body(), key.key));
    assert.equal(result.status, 200, await result.clone().text());
    assert.equal(calls, 1);
    const answer = await result.json();
    assert.equal(answer.model, "openai/gpt-6-luna");
    assert.equal(answer.answers[0].type, "predicate");
    assert.equal(answer.answers[2].score, 0.5);
    assert.equal(answer.answers[2].confidence, 0);
    assert.deepEqual(answer.answers[2].probabilities, [
      { value: 0, label: "Low", probability: 0.5 },
      { value: 1, label: "High", probability: 0.5 },
    ]);
    assert.equal(result.headers.get("x-omniroute-model"), "openai/gpt-6-luna");
    assert.equal(result.headers.get("x-omniroute-cost-status"), "unknown");
    assert.equal(result.headers.get("x-omniroute-response-cost"), null);
    const rows = core
      .getDbInstance()
      .prepare(
        "SELECT provider, model, tokens_input, tokens_output, provider_cost_usd FROM usage_history WHERE api_key_id = ?"
      )
      .all(key.id);
    assert.deepEqual(rows, [
      {
        provider: "openai",
        model: "gpt-6-luna",
        tokens_input: 31,
        tokens_output: 4,
        provider_cost_usd: null,
      },
    ]);
  } finally {
    globalThis.fetch = saved;
    await providers.deleteProviderConnection(String(connection.id));
  }
});

test("real delegated refusal and access-denial paths do not cause hidden calls", async () => {
  for (const status of [200, 401, 403, 429]) {
    const { key, connection } = await fixture();
    const saved = globalThis.fetch;
    let calls = 0;
    globalThis.fetch = (async () => {
      calls++;
      const raw = response();
      return Response.json(
        status === 200
          ? {
              ...raw,
              answers: raw.answers.map((answer) => ({ type: "refusal", name: answer.name })),
            }
          : { error: { message: "Synthetic restriction" } },
        { status }
      );
    }) as typeof fetch;
    try {
      const result = await route.POST(request(body(), key.key));
      assert.equal(result.status, status);
      assert.equal(calls, 1);
      if (status === 200)
        assert.deepEqual(
          (await result.json()).answers.map((answer: { type: string }) => answer.type),
          ["refusal", "refusal", "refusal"]
        );
      assert.equal(
        core
          .getDbInstance()
          .prepare("SELECT COUNT(*) AS total FROM usage_history WHERE api_key_id = ?")
          .get(key.id).total,
        1
      );
    } finally {
      globalThis.fetch = saved;
      await providers.deleteProviderConnection(String(connection.id));
    }
  }
});

test("factory protocol seam preserves caller headers and cancellation without HTTP loopback", async () => {
  const controller = new AbortController();
  let delegations = 0;
  const handler = createDecisionsPostHandler({
    authenticate: async () => null,
    systemOnePost: async (native) => {
      delegations++;
      assert.equal(new URL(native.url).pathname, "/v1/systemone");
      assert.equal(native.headers.get("authorization"), "Bearer fixture-client");
      assert.equal(native.headers.get("x-correlation-id"), "fixture-correlation");
      assert.equal(native.headers.get("content-length"), null);
      controller.abort();
      assert.equal(native.signal.aborted, true);
      return Response.json({}, { headers: { "x-omniroute-cost-status": "unknown" } });
    },
  });
  const req = request(body(), "fixture-client", controller.signal);
  req.headers.set("x-correlation-id", "fixture-correlation");
  req.headers.set("content-length", String(JSON.stringify(body()).length));
  const result = await handler(req);
  assert.equal(result.status, 499);
  assert.equal(result.headers.get("x-omniroute-cost-status"), "unknown");
  assert.equal(delegations, 1);
});

test("unsupported input, excessive bytes and pre-cancellation never delegate", async () => {
  let delegations = 0;
  const handler = createDecisionsPostHandler({
    authenticate: async () => null,
    systemOnePost: async () => {
      delegations++;
      return Response.json({});
    },
  });
  assert.equal((await handler(request({ ...body(), model: "gpt-6-luna" }))).status, 400);
  assert.equal((await handler(request({ ...body(), input: "x".repeat(1_048_577) }))).status, 413);
  const controller = new AbortController();
  controller.abort();
  assert.equal((await handler(request(body(), undefined, controller.signal))).status, 499);
  assert.equal(delegations, 0);
});

test("response translation errors preserve known billed cost while returning one protocol failure", async () => {
  let delegations = 0;
  const handler = createDecisionsPostHandler({
    authenticate: async () => null,
    systemOnePost: async () => {
      delegations++;
      return Response.json(
        { model: "gpt-6-luna", answers: {} },
        {
          headers: { "x-omniroute-cost-status": "known", "x-omniroute-response-cost": "0.00001" },
        }
      );
    },
  });
  const result = await handler(request(body()));
  assert.equal(result.status, 502);
  assert.equal(result.headers.get("x-omniroute-cost-status"), "known");
  assert.equal(result.headers.get("x-omniroute-response-cost"), "0.00001");
  assert.equal(delegations, 1);
});

test("both real native routes abort stalled upload bodies without provider dispatch or stuck cleanup", async () => {
  const key = await keys.createApiKey("cancelled upload client", "synthetic-machine", []);
  const initialFetches = fetches;
  for (const [pathname, handler] of [
    ["/v1/decisions", route.POST],
    ["/v1/systemone", nativeRoute.POST],
  ] as const) {
    const controller = new AbortController();
    let cancellations = 0;
    const stream = new ReadableStream<Uint8Array>({
      cancel() {
        cancellations++;
        return new Promise<void>(() => {});
      },
    });
    const req = new Request(`http://localhost:20128${pathname}`, {
      method: "POST",
      signal: controller.signal,
      body: stream,
      duplex: "half",
      headers: { authorization: `Bearer ${key.key}` },
    } as RequestInit & { duplex: "half" });
    const pending = handler(req);
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(stream.locked, true, "the handler is waiting for upload bytes");
    controller.abort();
    let timer: ReturnType<typeof setTimeout>;
    try {
      const result = await Promise.race([
        pending,
        new Promise<"test-timeout">((resolve) => {
          timer = setTimeout(() => resolve("test-timeout"), 200);
        }),
      ]);
      assert.notEqual(result, "test-timeout");
      if (result === "test-timeout") continue;
      assert.equal(result.status, 499);
      assert.equal(cancellations, 1);
      assert.equal(stream.locked, false);
    } finally {
      clearTimeout(timer!);
    }
  }
  assert.equal(fetches, initialFetches);
});
