import assert from "node:assert/strict";
import test from "node:test";
import { proxyFetch, runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import { clearDispatcherCache } from "../../open-sse/utils/proxyDispatcher.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

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
function scrubEnv(t: { after(fn: () => void): void }) {
  const names = ["HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY", "ENABLE_TLS_FINGERPRINT"];
  const original = names.map((name) => [name, process.env[name]] as const);
  for (const name of names) delete process.env[name];
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
