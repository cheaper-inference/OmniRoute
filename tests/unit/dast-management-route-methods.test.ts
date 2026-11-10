import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const {
  maybeHandleDisallowedMethod,
  wrapRequestListenerWithMethodGuard,
} = require("../../scripts/dev/http-method-guard.cjs");

const routes = [
  { path: "/api/auth/mfa/setup", methods: ["POST"] },
  { path: "/api/auth/mfa/enable", methods: ["POST"] },
  { path: "/api/auth/mfa/disable", methods: ["POST"] },
  { path: "/api/auth/mfa/verify", methods: ["POST"] },
  // Next automatically supplies HEAD for handlers that implement GET.
  { path: "/api/auth/mfa/status", methods: ["GET", "HEAD"] },
  { path: "/api/keys/qg-fixture/self-service", methods: ["GET", "HEAD", "PUT"] },
];

function responseRecorder() {
  return {
    statusCode: 200,
    headers: new Map<string, string>(),
    body: "",
    setHeader(name: string, value: string) {
      this.headers.set(name.toLowerCase(), value);
    },
    end(body = "") {
      this.body += body;
    },
  };
}

for (const route of routes) {
  test(`${route.path} rejects QUERY before authentication or body admission`, () => {
    for (const suffix of ["", "/", "?view=all"]) {
      const response = responseRecorder();
      let downstreamCalls = 0;
      const handler = wrapRequestListenerWithMethodGuard(() => {
        downstreamCalls += 1;
      });
      handler(
        {
          method: "QUERY",
          url: route.path + suffix,
          get headers() {
            throw new Error("unsupported method must not read authentication headers");
          },
          on() {
            throw new Error("unsupported method must not consume request data");
          },
        },
        response
      );
      assert.equal(downstreamCalls, 0);
      assert.equal(response.statusCode, 405);
      assert.equal(response.headers.get("allow"), route.methods.join(", "));
      assert.equal(JSON.parse(response.body).error.code, "METHOD_NOT_ALLOWED");
    }
  });

  test(`${route.path} keeps implemented methods and preflight available`, () => {
    for (const method of [...route.methods, "OPTIONS"]) {
      const response = responseRecorder();
      assert.equal(maybeHandleDisallowedMethod({ method, url: route.path }, response), false);
      assert.equal(response.body, "");
      assert.equal(response.headers.size, 0);
    }
  });
}

test("new method rules do not claim neighboring route segments", () => {
  for (const url of [
    "/api/auth/mfa/status/extra",
    "/api/auth/mfa/setup-extra",
    "/api/auth/mfa/other",
    "/api/keys/qg-fixture/self-service/extra",
    "/api/keys/qg-fixture/self-service-extra",
  ]) {
    assert.equal(maybeHandleDisallowedMethod({ method: "QUERY", url }, responseRecorder()), false);
  }
});
