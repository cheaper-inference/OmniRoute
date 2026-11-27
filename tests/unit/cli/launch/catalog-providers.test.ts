// fetchConnectedProviders and fetchCatalog against a fake fetch: every fallback reason, the
// request shape (headers, timeout signal) and the prefix union.
import { test } from "node:test";
import assert from "node:assert/strict";

import { fetchCatalog, fetchConnectedProviders } from "../../../../bin/cli/launch/core/catalog.mjs";

type Call = { url: string; init: { headers: Record<string, string>; signal: AbortSignal } };

function fakeFetch(respond: () => Response | Promise<Response>) {
  const calls: Call[] = [];
  const fetch = async (url: string, init: Call["init"]) => {
    calls.push({ url, init });
    return respond();
  };
  return { fetch, calls };
}

function json(body: object | string, status = 200) {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  return new Response(text, { status, headers: { "content-type": "application/json" } });
}

const ROOT = "http://gw.test";

test("fetchConnectedProviders sends accept, bearer token and a timeout signal", async () => {
  const { fetch, calls } = fakeFetch(() => json({ prefixes: ["b", "a"] }));
  const result = await fetchConnectedProviders({ rootUrl: ROOT, token: "tok", fetch });
  assert.deepEqual(result, { ok: true, prefixes: ["a", "b"] });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, `${ROOT}/api/launch/providers`);
  assert.deepEqual(calls[0].init.headers, {
    accept: "application/json",
    authorization: "Bearer tok",
  });
  assert.ok(calls[0].init.signal instanceof AbortSignal);
});

test("fetchConnectedProviders omits authorization without a token", async () => {
  const { fetch, calls } = fakeFetch(() => json({ prefixes: [] }));
  const result = await fetchConnectedProviders({ rootUrl: ROOT, fetch, timeoutMs: 50 });
  assert.deepEqual(result, { ok: true, prefixes: [] });
  assert.deepEqual(calls[0].init.headers, { accept: "application/json" });
});

for (const status of [404, 405, 501]) {
  test(`fetchConnectedProviders: HTTP ${status} means the route is unsupported`, async () => {
    const { fetch } = fakeFetch(() => json({ error: "nope" }, status));
    assert.deepEqual(await fetchConnectedProviders({ rootUrl: ROOT, fetch }), {
      ok: false,
      reason: "this gateway does not report connected providers",
    });
  });
}

test("fetchConnectedProviders: other non-ok statuses carry the status", async () => {
  const { fetch } = fakeFetch(() => json({ error: "boom" }, 500));
  assert.deepEqual(await fetchConnectedProviders({ rootUrl: ROOT, fetch }), {
    ok: false,
    reason: "connected providers: HTTP 500",
  });
});

test("fetchConnectedProviders: a non-ok response without a body still falls back", async () => {
  const { fetch } = fakeFetch(() => ({ status: 503, ok: false, body: null }) as never);
  assert.deepEqual(await fetchConnectedProviders({ rootUrl: ROOT, fetch }), {
    ok: false,
    reason: "connected providers: HTTP 503",
  });
});

test("fetchConnectedProviders: fetch throwing means not reachable", async () => {
  const { fetch } = fakeFetch(() => {
    throw new Error("ECONNREFUSED");
  });
  assert.deepEqual(await fetchConnectedProviders({ rootUrl: ROOT, fetch }), {
    ok: false,
    reason: "gateway not reachable",
  });
});

test("fetchConnectedProviders: invalid JSON", async () => {
  const { fetch } = fakeFetch(() => json("{not json"));
  assert.deepEqual(await fetchConnectedProviders({ rootUrl: ROOT, fetch }), {
    ok: false,
    reason: "connected providers: invalid JSON",
  });
});

for (const body of [{}, { prefixes: "a" }, null, [], { providers: {} }]) {
  test(`fetchConnectedProviders: unexpected body ${JSON.stringify(body)}`, async () => {
    const { fetch } = fakeFetch(() => json(JSON.stringify(body)));
    assert.deepEqual(await fetchConnectedProviders({ rootUrl: ROOT, fetch }), {
      ok: false,
      reason: "connected providers: unexpected response",
    });
  });
}

test("fetchConnectedProviders: union of prefixes, provider ids and nested prefixes", async () => {
  const body = {
    prefixes: ["zeta", "", 7, "alpha"],
    providers: [
      { id: "openai", prefixes: ["oa", "openai", ""] },
      { id: "cheaperinference", prefixes: ["cinf"] },
      { id: "", prefixes: "not-a-list" },
      null,
      { prefixes: ["gemini"] },
    ],
  };
  const { fetch } = fakeFetch(() => json(body));
  assert.deepEqual(await fetchConnectedProviders({ rootUrl: ROOT, fetch }), {
    ok: true,
    prefixes: ["alpha", "cheaperinference", "cinf", "gemini", "oa", "openai", "zeta"],
  });
});

test("fetchConnectedProviders: providers alone (no top-level prefixes) is accepted", async () => {
  const { fetch } = fakeFetch(() => json({ providers: [{ id: "b" }, { id: "a" }] }));
  assert.deepEqual(await fetchConnectedProviders({ rootUrl: ROOT, fetch }), {
    ok: true,
    prefixes: ["a", "b"],
  });
});

test("fetchCatalog normalizes rows and sends the same request shape", async () => {
  const { fetch, calls } = fakeFetch(() => json({ data: [{ id: "m1" }, { id: "" }] }));
  const rows = await fetchCatalog({ rootUrl: ROOT, token: "tok", fetch });
  assert.deepEqual(rows, [{ id: "m1", capabilities: [], kind: "model" }]);
  assert.equal(calls[0].url, `${ROOT}/v1/models`);
  assert.deepEqual(calls[0].init.headers, {
    accept: "application/json",
    authorization: "Bearer tok",
  });
  assert.ok(calls[0].init.signal instanceof AbortSignal);
});

test("fetchCatalog: fetch throwing is GatewayUnreachable naming the root URL", async () => {
  const cause = new Error("ECONNREFUSED");
  const { fetch } = fakeFetch(() => {
    throw cause;
  });
  await assert.rejects(
    fetchCatalog({ rootUrl: ROOT, fetch }),
    (
      error: Error & {
        code: string;
        cause: Error;
      }
    ) => {
      assert.equal(error.code, "GatewayUnreachable");
      assert.equal(error.message, `model catalog: gateway not reachable at ${ROOT}`);
      assert.equal(error.cause, cause);
      return true;
    }
  );
});

test("fetchCatalog: invalid JSON is GatewayUnreachable", async () => {
  const { fetch } = fakeFetch(() => json("{oops"));
  await assert.rejects(
    fetchCatalog({ rootUrl: ROOT, fetch }),
    (
      error: Error & {
        code: string;
      }
    ) => {
      assert.equal(error.code, "GatewayUnreachable");
      assert.equal(error.message, "model catalog: gateway sent invalid JSON");
      return true;
    }
  );
});

test("fetchCatalog: an HTTP error status throws the mapped LaunchError", async () => {
  const { fetch } = fakeFetch(() => json({ error: "no" }, 401));
  await assert.rejects(
    fetchCatalog({ rootUrl: ROOT, fetch }),
    (
      error: Error & {
        code: string;
      }
    ) => {
      assert.equal(typeof error.code, "string");
      assert.match(error.message, /model catalog/);
      return true;
    }
  );
});
