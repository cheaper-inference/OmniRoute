import test, { describe } from "node:test";
import assert from "node:assert/strict";

import {
  quotaPath,
  requestSelfService,
  sendSelfService,
  usagePath,
  type ResponseSchema,
  type SelfServiceResult,
} from "../../src/app/quota/[provider]/lib/selfServiceClient.ts";
import { selfQuotaResponseSchema } from "../../src/shared/schemas/selfQuota.ts";
import { selfUsageResponseSchema } from "../../src/shared/schemas/selfUsage.ts";

const KEY = "sk-live-1234567890";

type Call = { url: string; init: RequestInit };

const OK: ResponseSchema<{ pools: unknown[] }> = {
  safeParse: (v: unknown) =>
    v && typeof v === "object" && Array.isArray((v as { pools?: unknown }).pools)
      ? { success: true, data: v as { pools: unknown[] } }
      : { success: false },
};

/** Records each call and answers with the given response, error, or a request that never settles. */
function fetchStub(answer: (() => Response) | Error | "hang") {
  const calls: Call[] = [];
  const impl = (async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    if (answer instanceof Error) throw answer;
    if (answer === "hang") {
      return new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener("abort", () =>
          reject(new DOMException("The operation was aborted.", "AbortError"))
        );
      });
    }
    return answer();
  }) as unknown as typeof fetch;
  return { calls, impl };
}

function json(body: unknown, status = 200) {
  return () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
}

function text(body: string, status = 200) {
  return () => new Response(body, { status, headers: { "Content-Type": "text/html" } });
}

async function call<T>(
  stub: ReturnType<typeof fetchStub>,
  schema: ResponseSchema<T> = OK as unknown as ResponseSchema<T>,
  signal: AbortSignal = new AbortController().signal
): Promise<SelfServiceResult<T>> {
  return requestSelfService({
    path: quotaPath("claude"),
    apiKey: KEY,
    schema,
    signal,
    fetchImpl: stub.impl,
  });
}

/** A response that parses in the real quota contract. */
const QUOTA_FIXTURE = {
  provider: "claude",
  generatedAt: "2026-11-20T12:00:00.000Z",
  pools: [
    {
      ref: "qpr_a",
      name: "Pool A",
      provider: "claude",
      borrowMode: "saturation",
      policy: "hard",
      weight: 50,
      cap: null,
      accountVisible: true,
      dimensions: [],
      accounts: [],
    },
  ],
  availableModels: ["claude-sonnet-4-5"],
  expiresAt: null,
  apiBaseUrl: null,
  blocks: { schedules: [], modelCaps: [] },
};

/** Every case of this file, so the logging test can run them again under spies. */
const CASES: Array<{ name: string; run: () => Promise<void> }> = [];
function scenario(name: string, run: () => Promise<void>) {
  CASES.push({ name, run });
  test(name, run);
}

describe("requestSelfService", () => {
  scenario("the key travels only in the Authorization header", async () => {
    const stub = fetchStub(json({ pools: [] }));
    const result = await call(stub);
    assert.deepEqual(result, { ok: true, data: { pools: [] } });
    assert.equal(stub.calls.length, 1);
    const [{ url, init }] = stub.calls;
    assert.equal(url, "/api/v1/me/quota/claude");
    assert.equal((init.headers as Record<string, string>).Authorization, `Bearer ${KEY}`);
    assert.equal((init.headers as Record<string, string>).Accept, "application/json");
    assert.equal(init.method, "GET");
    assert.equal(init.cache, "no-store");
    assert.equal(init.credentials, "omit");
    assert.equal(init.redirect, "error");
    assert.ok(!url.includes(KEY));
  });

  scenario("paths are built from encoded parts", async () => {
    assert.equal(quotaPath("a b"), "/api/v1/me/quota/a%20b");
    assert.equal(quotaPath("../x"), "/api/v1/me/quota/..%2Fx");
    assert.equal(usagePath("7d"), "/api/v1/me/usage?range=7d");
    assert.equal(usagePath("7d&x=1"), "/api/v1/me/usage?range=7d%26x%3D1");
  });

  scenario("each refusal has its own outcome", async () => {
    assert.deepEqual(await call(fetchStub(json({}, 401))), { ok: false, failure: "invalid-key" });
    assert.deepEqual(await call(fetchStub(json({}, 403))), {
      ok: false,
      failure: "missing-scope",
    });
    for (const status of [400, 404, 429, 500, 503]) {
      assert.deepEqual(
        await call(fetchStub(json({}, status))),
        { ok: false, failure: "server" },
        String(status)
      );
    }
  });

  scenario("an answer outside the contract is a failure, never data", async () => {
    for (const answer of [
      json({ pools: "nope" }),
      text("<html><body>Login</body></html>"),
      text(""),
    ]) {
      assert.deepEqual(await call(fetchStub(answer)), { ok: false, failure: "invalid-response" });
    }
  });

  scenario("the real response contracts decide what counts as data", async () => {
    const good = await call(fetchStub(json(QUOTA_FIXTURE)), selfQuotaResponseSchema);
    assert.equal(good.ok, true);
    assert.equal(good.ok && good.data.pools[0].name, "Pool A");

    const broken = { ...QUOTA_FIXTURE, pools: [{ ...QUOTA_FIXTURE.pools[0], weight: "50" }] };
    assert.deepEqual(await call(fetchStub(json(broken)), selfQuotaResponseSchema), {
      ok: false,
      failure: "invalid-response",
    });
    assert.deepEqual(await call(fetchStub(json(QUOTA_FIXTURE)), selfUsageResponseSchema), {
      ok: false,
      failure: "invalid-response",
    });
  });

  scenario("a server message is never surfaced", async () => {
    const result = await call(fetchStub(json({ error: { message: "SQLITE at /srv/x.ts" } }, 500)));
    assert.deepEqual(result, { ok: false, failure: "server" });
  });

  scenario("network errors and aborts are told apart", async () => {
    assert.deepEqual(await call(fetchStub(new TypeError("Failed to fetch"))), {
      ok: false,
      failure: "network",
    });
    const controller = new AbortController();
    const pending = call(fetchStub("hang"), OK, controller.signal);
    controller.abort();
    assert.deepEqual(await pending, { ok: false, failure: "aborted" });
  });

  scenario("no outcome carries the key or the error", async () => {
    const answers = [
      json({ pools: [] }),
      json({ message: KEY }, 401),
      json({ message: KEY }, 500),
      text(KEY),
      new TypeError(`Failed to fetch with ${KEY}`),
    ];
    for (const answer of answers) {
      const result = await call(fetchStub(answer));
      assert.ok(!JSON.stringify(result).includes(KEY));
      assert.ok(!(result instanceof Error));
    }
  });
});

describe("sendSelfService", () => {
  const PATCH_BODY = {
    pool: "qpr_0123456789abcdef0123456789abcdef",
    lendingPercent: 25,
    lendingUntil: null,
  };
  function send(stub: ReturnType<typeof fetchStub>, signal = new AbortController().signal) {
    return sendSelfService({
      path: quotaPath("claude"),
      apiKey: KEY,
      body: PATCH_BODY,
      schema: OK,
      signal,
      fetchImpl: stub.impl,
    });
  }

  scenario("a write sends PATCH with a JSON body and the key only in the header", async () => {
    const stub = fetchStub(json({ pools: [] }));
    assert.deepEqual(await send(stub), { ok: true, data: { pools: [] } });
    const { url, init } = stub.calls[0];
    const headers = new Headers(init.headers);
    assert.equal(url, "/api/v1/me/quota/claude");
    assert.equal(init.method, "PATCH");
    assert.equal(headers.get("Authorization"), `Bearer ${KEY}`);
    assert.equal(headers.get("Content-Type"), "application/json");
    assert.deepEqual(JSON.parse(String(init.body)), PATCH_BODY);
    assert.ok(!url.includes(KEY) && !String(init.body).includes(KEY));
    assert.deepEqual([init.cache, init.credentials, init.redirect], ["no-store", "omit", "error"]);
  });

  scenario(
    "a write outcome follows the status and carries nothing from the error body",
    async () => {
      const expected: Array<[number, string]> = [
        [401, "unauthorized"],
        [403, "forbidden"],
        [404, "not-found"],
        [400, "rejected"],
        [413, "rejected"],
        [415, "rejected"],
        [408, "server"],
        [429, "rate-limited"],
        [500, "server"],
        [502, "server"],
        [504, "server"],
      ];
      for (const [status, failure] of expected) {
        const result = await send(fetchStub(json({ error: { message: `detail ${KEY}` } }, status)));
        assert.deepEqual(result, { ok: false, failure, retryAfterSeconds: null }, String(status));
      }
    }
  );

  scenario("a 429 reports Retry-After only as whole seconds", async () => {
    const cases: Array<[string | null, number | null]> = [
      ["7", 7],
      ["60", 60],
      [null, null],
      ["0", null],
      ["-1", null],
      ["1.5", null],
      ["Wed, 21 Oct 2026 07:28:00 GMT", null],
    ];
    for (const [value, seconds] of cases) {
      const headers: Record<string, string> = value === null ? {} : { "Retry-After": value };
      const result = await send(fetchStub(() => new Response("{}", { status: 429, headers })));
      assert.deepEqual(
        result,
        { ok: false, failure: "rate-limited", retryAfterSeconds: seconds },
        String(value)
      );
    }
  });

  scenario(
    "a write reports a network failure, an abort and an answer outside the contract",
    async () => {
      assert.deepEqual(await send(fetchStub(new TypeError("offline"))), {
        ok: false,
        failure: "network",
        retryAfterSeconds: null,
      });
      assert.deepEqual(await send(fetchStub(json({ nope: true }))), {
        ok: false,
        failure: "invalid-response",
        retryAfterSeconds: null,
      });
      const controller = new AbortController();
      const pending = send(fetchStub("hang"), controller.signal);
      controller.abort();
      assert.deepEqual(await pending, { ok: false, failure: "aborted", retryAfterSeconds: null });
    }
  );
});

test("nothing is logged", async () => {
  const methods = ["log", "info", "warn", "error", "debug"] as const;
  const originals = methods.map((name) => console[name]);
  let calls = 0;
  for (const name of methods) {
    console[name] = () => {
      calls += 1;
    };
  }
  try {
    for (const { run } of CASES) await run();
  } finally {
    methods.forEach((name, index) => {
      console[name] = originals[index];
    });
  }
  assert.equal(calls, 0);
});
