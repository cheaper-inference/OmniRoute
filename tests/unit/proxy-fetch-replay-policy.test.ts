import assert from "node:assert/strict";
import net from "node:net";
import test from "node:test";
import { proxyFetch, runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import { clearDispatcherCache } from "../../open-sse/utils/proxyDispatcher.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// Complete asynchronous setup before registering any tests: the native runner
// can otherwise skip later tests when --test-force-exit is enabled in CI.
// A real listener lets proxy reachability pass before the mocked dispatch fails.
const proxyListener = net.createServer((socket) => socket.destroy());
await new Promise<void>((resolve) => proxyListener.listen(0, "127.0.0.1", resolve));
const proxied = `http://127.0.0.1:${(proxyListener.address() as net.AddressInfo).port}`;

// Mock the dispatch boundary: no external sockets or provider credentials.
test.after(() => {
  clearDispatcherCache();
  resetDbInstance();
});
const target = "https://replay-policy.invalid/v1/responses";
const relay = {
  type: "vercel" as const,
  host: "replay-fixture.vercel.app",
  relayAuth: "synthetic-test-only-relay-auth",
};
const STRICT_FLAG = "PROXY_STRICT_POST_REPLAY_ENABLED";
function scrubEnv(t: { after(fn: () => void): void }, strict = true) {
  const names = [
    "HTTP_PROXY",
    "HTTPS_PROXY",
    "ALL_PROXY",
    "ENABLE_TLS_FINGERPRINT",
    "PROXY_AUTO_SELECT_ENABLED",
    STRICT_FLAG,
  ];
  const original = names.map((name) => [name, process.env[name]] as const);
  for (const name of names) delete process.env[name];
  if (strict) process.env[STRICT_FLAG] = "true";
  t.after(() => {
    for (const [name, value] of original) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });
}
for (const route of ["direct", "relay"] as const) {
  for (const method of ["POST", "PUT", "PATCH", "DELETE"] as const) {
    test(`${route} does not replay ${method} after an ambiguous transport failure`, async (t) => {
      scrubEnv(t);
      let dispatches = 0;
      let nativeCalls = 0;
      const failure = Object.assign(new Error("fetch failed"), { code: "UND_ERR_SOCKET" });
      const perform = () =>
        proxyFetch(
          target,
          { method, body: "accepted input" },
          {
            undiciFetch: async () => {
              dispatches++;
              throw failure;
            },
            nativeFetch: async () => {
              nativeCalls++;
              return new Response("must not retry elsewhere");
            },
          }
        );
      await assert.rejects(route === "relay" ? runWithProxyContext(relay, perform) : perform());
      assert.equal(dispatches, 1);
      assert.equal(nativeCalls, 0, "native fallback is another delivery attempt too");
    });
  }
  for (const method of ["GET", "HEAD", "OPTIONS"] as const) {
    test(`${route} retains one fresh-socket retry for safe ${method}`, async (t) => {
      scrubEnv(t);
      let dispatches = 0;
      const perform = () =>
        proxyFetch(
          target,
          { method },
          {
            undiciFetch: async () => {
              if (++dispatches === 1)
                throw Object.assign(new Error("fetch failed"), { code: "UND_ERR_SOCKET" });
              return new Response("recovered");
            },
            nativeFetch: async () => {
              throw new Error("unexpected native fallback");
            },
          }
        );
      const response = await (route === "relay" ? runWithProxyContext(relay, perform) : perform());
      assert.equal(await response.text(), "recovered");
      assert.equal(dispatches, 2);
    });
  }
}

test("a numeric transport code is preserved without replaying an ambiguous POST", async (t) => {
  scrubEnv(t);
  let dispatches = 0;
  let nativeCalls = 0;
  const failure = Object.assign(new Error("UND_ERR_SOCKET: other side closed"), { code: -111 });
  await assert.rejects(
    proxyFetch(
      target,
      { method: "POST", body: "accepted input" },
      {
        undiciFetch: async () => {
          dispatches++;
          throw failure;
        },
        nativeFetch: async () => {
          nativeCalls++;
          return new Response("must not resend");
        },
      }
    ),
    (error: unknown) => {
      assert.equal(error, failure, "keep the transport error, not a startsWith TypeError");
      assert.equal(failure.code, -111);
      return true;
    }
  );
  assert.equal(dispatches, 1);
  assert.equal(nativeCalls, 0);
});

test.after(() => new Promise<void>((resolve) => proxyListener.close(() => resolve())));
const PRE_SEND_CODES = [
  "ECONNREFUSED",
  "ENOTFOUND",
  "EAI_AGAIN",
  "ENETUNREACH",
  "UND_ERR_CONNECT_TIMEOUT",
] as const;

function failOnceThenServe(failure: Error, calls: { dispatches: number; native: number }) {
  return {
    undiciFetch: async () => {
      if (++calls.dispatches === 1) throw failure;
      return new Response("recovered");
    },
    nativeFetch: async () => {
      calls.native++;
      return new Response("native");
    },
  };
}

const transportError = (code: string) => Object.assign(new Error("fetch failed"), { code });

for (const code of PRE_SEND_CODES) {
  for (const route of ["direct", "relay", "proxy"] as const) {
    test(`strict: ${route} POST retries after pre-send ${code}`, async (t) => {
      scrubEnv(t);
      const calls = { dispatches: 0, native: 0 };
      const perform = () =>
        proxyFetch(
          target,
          { method: "POST", body: "never left this host" },
          failOnceThenServe(transportError(code), calls)
        );
      const context = route === "relay" ? relay : route === "proxy" ? proxied : null;
      const response = await (context ? runWithProxyContext(context, perform) : perform());
      assert.equal(await response.text(), "recovered");
      assert.equal(calls.dispatches, 2);
      assert.equal(calls.native, 0);
    });
  }
}

test("strict: a pre-send code nested in the fetch failed cause still counts", async (t) => {
  scrubEnv(t);
  const calls = { dispatches: 0, native: 0 };
  const failure = Object.assign(new TypeError("fetch failed"), {
    cause: Object.assign(new Error("connect ECONNREFUSED"), { code: "ECONNREFUSED" }),
  });
  const response = await proxyFetch(
    target,
    { method: "POST", body: "x" },
    failOnceThenServe(failure, calls)
  );
  assert.equal(await response.text(), "recovered");
  assert.equal(calls.dispatches, 2);
});

test("strict: a pre-send failure on both attempts reaches the native fallback", async (t) => {
  scrubEnv(t);
  let dispatches = 0;
  let native = 0;
  const response = await proxyFetch(
    target,
    { method: "POST", body: "x" },
    {
      undiciFetch: async () => {
        dispatches++;
        throw transportError("ECONNREFUSED");
      },
      nativeFetch: async () => {
        native++;
        return new Response("native");
      },
    }
  );
  assert.equal(await response.text(), "native");
  assert.equal(dispatches, 2);
  assert.equal(native, 1);
});

test("strict: pre-send POST still reaches the PROXY_AUTO_SELECT fallback", async (t) => {
  scrubEnv(t);
  process.env.PROXY_AUTO_SELECT_ENABLED = "true";
  let dispatches = 0;
  let looked = 0;
  const response = await proxyFetch(
    target,
    { method: "POST", body: "x" },
    {
      undiciFetch: async () => {
        if (++dispatches <= 2) throw transportError("ENOTFOUND");
        return new Response("through fallback proxy");
      },
      nativeFetch: async () => new Response("native"),
      findWorkingProxy: async () => {
        looked++;
        return "http://127.0.0.1:9";
      },
    }
  );
  assert.equal(await response.text(), "through fallback proxy");
  assert.equal(looked, 1);
});

test("strict: an ambiguous POST never reaches the PROXY_AUTO_SELECT fallback", async (t) => {
  scrubEnv(t);
  process.env.PROXY_AUTO_SELECT_ENABLED = "true";
  let looked = 0;
  await assert.rejects(
    proxyFetch(
      target,
      { method: "POST", body: "x" },
      {
        undiciFetch: async () => {
          throw transportError("UND_ERR_SOCKET");
        },
        nativeFetch: async () => new Response("native"),
        findWorkingProxy: async () => {
          looked++;
          return "http://127.0.0.1:9";
        },
      }
    )
  );
  assert.equal(looked, 0);
});

test("strict: ETIMEDOUT stays ambiguous, it can fire after the write", async (t) => {
  scrubEnv(t);
  const calls = { dispatches: 0, native: 0 };
  await assert.rejects(
    proxyFetch(
      target,
      { method: "POST", body: "x" },
      failOnceThenServe(transportError("ETIMEDOUT"), calls)
    )
  );
  assert.equal(calls.dispatches, 1);
});

test("strict: a consumed stream body is never resent, even for a pre-send error", async (t) => {
  scrubEnv(t);
  const calls = { dispatches: 0, native: 0 };
  await assert.rejects(
    proxyFetch(
      target,
      { method: "POST", body: new ReadableStream(), duplex: "half" } as RequestInit,
      failOnceThenServe(transportError("ECONNREFUSED"), calls)
    )
  );
  assert.equal(calls.dispatches, 1);
  assert.equal(calls.native, 0);
});

// Flag off (default): the release behaviour, including the stale pooled socket case (#4252).
for (const code of ["UND_ERR_SOCKET", "ECONNREFUSED", "ETIMEDOUT"]) {
  for (const route of ["direct", "relay", "proxy"] as const) {
    test(`default: ${route} POST with a replayable body retries once after ${code}`, async (t) => {
      scrubEnv(t, false);
      const calls = { dispatches: 0, native: 0 };
      const perform = () =>
        proxyFetch(
          target,
          { method: "POST", body: "replayable" },
          failOnceThenServe(transportError(code), calls)
        );
      const context = route === "relay" ? relay : route === "proxy" ? proxied : null;
      const run = context ? runWithProxyContext(context, perform) : perform();
      assert.equal(await (await run).text(), "recovered");
      assert.equal(calls.dispatches, 2);
    });
  }
}

test("default: a transport failure on both attempts falls back to native fetch", async (t) => {
  scrubEnv(t, false);
  let dispatches = 0;
  let native = 0;
  const response = await proxyFetch(
    target,
    { method: "POST", body: "x" },
    {
      undiciFetch: async () => {
        dispatches++;
        throw transportError("UND_ERR_SOCKET");
      },
      nativeFetch: async () => {
        native++;
        return new Response("native");
      },
    }
  );
  assert.equal(await response.text(), "native");
  assert.equal(dispatches, 2);
  assert.equal(native, 1);
});
