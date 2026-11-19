// `connectGuard` asks the direct route of the patched fetch to validate the lookup the connection
// itself makes. A guarded request must never reach the native fetch fallback: it resolves the name
// again with no guard, so a transport failure would otherwise become a way around the check.
import test from "node:test";
import assert from "node:assert/strict";

const { default: proxyFetch } = await import("../../open-sse/utils/proxyFetch.ts");
const { CONNECT_GUARD_BLOCKED_CODE, getGuardedDispatcher } =
  await import("../../open-sse/utils/connectGuardDispatcher.ts");

type Init = Record<string, unknown>;
const URL_UNDER_TEST = "https://guarded.example.test/v1/models";

function connectionFailure(): TypeError {
  return Object.assign(new TypeError("fetch failed"), {
    cause: Object.assign(new Error("connect ECONNREFUSED"), { code: "ECONNREFUSED" }),
  });
}

function guardRefusal(): TypeError {
  return Object.assign(new TypeError("fetch failed"), {
    cause: Object.assign(new Error("blocked"), { code: CONNECT_GUARD_BLOCKED_CODE }),
  });
}

function recorder(undiciError: Error | null) {
  const undiciCalls: Init[] = [];
  let nativeCalls = 0;
  const deps = {
    undiciFetch: async (_input: unknown, init: Init) => {
      undiciCalls.push(init);
      if (undiciError) throw undiciError;
      return new Response("ok");
    },
    nativeFetch: async () => {
      nativeCalls += 1;
      return new Response("native");
    },
  };
  return { deps, undiciCalls, native: () => nativeCalls };
}

test("a guarded request uses the guarded dispatcher and hides the option from undici", async () => {
  const { deps, undiciCalls } = recorder(null);
  const response = await proxyFetch(URL_UNDER_TEST, { connectGuard: "block-metadata" }, deps);
  assert.equal(await response.text(), "ok");
  assert.equal(undiciCalls[0].dispatcher, getGuardedDispatcher("block-metadata"));
  assert.equal("connectGuard" in undiciCalls[0], false);
});

test("a guard refusal ends the request: no retry and no native fallback", async () => {
  const { deps, undiciCalls, native } = recorder(guardRefusal());
  await assert.rejects(() => proxyFetch(URL_UNDER_TEST, { connectGuard: "block-metadata" }, deps));
  assert.equal(undiciCalls.length, 1);
  assert.equal(native(), 0);
});

test("a guarded request keeps its retry but never falls back to native fetch", async () => {
  const { deps, undiciCalls, native } = recorder(connectionFailure());
  await assert.rejects(() => proxyFetch(URL_UNDER_TEST, { connectGuard: "block-metadata" }, deps));
  assert.equal(undiciCalls.length, 2);
  assert.equal(undiciCalls[1].dispatcher, getGuardedDispatcher("block-metadata"));
  assert.equal(native(), 0);
});

test("a guarded request never leaves through the proxy auto-select fallback", async (t) => {
  const previous = process.env.PROXY_AUTO_SELECT_ENABLED;
  t.after(() => {
    if (previous === undefined) delete process.env.PROXY_AUTO_SELECT_ENABLED;
    else process.env.PROXY_AUTO_SELECT_ENABLED = previous;
  });
  process.env.PROXY_AUTO_SELECT_ENABLED = "true";
  const { deps, undiciCalls, native } = recorder(connectionFailure());
  let looked = 0;
  const findWorkingProxy = async () => {
    looked += 1;
    return "http://127.0.0.1:9";
  };
  await assert.rejects(() =>
    proxyFetch(URL_UNDER_TEST, { connectGuard: "block-metadata" }, { ...deps, findWorkingProxy })
  );
  assert.equal(looked, 0);
  assert.equal(undiciCalls.length, 2);
  assert.equal(native(), 0);

  // Control: the same failure without the guard does reach the fallback.
  await proxyFetch(URL_UNDER_TEST, {}, { ...deps, findWorkingProxy }).catch(() => undefined);
  assert.equal(looked, 1);
});

test("an unguarded request keeps its native fallback", async () => {
  const { deps, undiciCalls, native } = recorder(connectionFailure());
  const response = await proxyFetch(URL_UNDER_TEST, {}, deps);
  assert.equal(await response.text(), "native");
  assert.equal(undiciCalls.length, 2);
  assert.notEqual(undiciCalls[0].dispatcher, getGuardedDispatcher("block-metadata"));
  assert.equal(native(), 1);
});

for (const fails of [false, true]) {
  test(`a guarded paid image ${fails ? "failure" : "success"} keeps guard precedence and one attempt`, async () => {
    const { deps, undiciCalls, native } = recorder(fails ? connectionFailure() : null);
    let looked = 0;
    const request = proxyFetch(
      "https://chatgpt.com/backend-api/codex/images/generations",
      { method: "POST", body: "{}", connectGuard: "block-metadata" },
      {
        ...deps,
        findWorkingProxy: async () => {
          looked++;
          return "http://127.0.0.1:9";
        },
      }
    );
    if (fails) await assert.rejects(request);
    else assert.equal(await (await request).text(), "ok");
    assert.equal(undiciCalls.length, 1);
    assert.equal(undiciCalls[0].dispatcher, getGuardedDispatcher("block-metadata"));
    assert.equal("connectGuard" in undiciCalls[0], false);
    assert.equal(native(), 0);
    assert.equal(looked, 0);
  });
}
