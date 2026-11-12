import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import Ajv from "ajv";
import { parse } from "yaml";

const require = createRequire(import.meta.url);
const {
  maybeHandleDisallowedMethod,
  wrapRequestListenerWithMethodGuard,
} = require("../../scripts/dev/http-method-guard.cjs");

test("raw HTTP guard rejects high-risk unsupported methods before Next.js handles them", () => {
  const cases: Array<{
    label: string;
    method: string;
    url: string;
    allow: string;
  }> = [
    { label: "login TRACE", method: "TRACE", url: "/api/auth/login", allow: "POST" },
    { label: "login QUERY", method: "QUERY", url: "/api/auth/login", allow: "POST" },
    { label: "logout QUERY", method: "QUERY", url: "/api/auth/logout", allow: "POST" },
    { label: "keys QUERY", method: "QUERY", url: "/api/keys", allow: "GET, POST" },
    {
      // dast-smoke 2026-07-06: schemathesis's unsupported-methods check demands
      // 405 (method-first) for QUERY /api/keys/{id}/devices — the auth layer was
      // answering 401 first because the path had no HIGH_RISK rule.
      label: "key devices QUERY",
      method: "QUERY",
      url: "/api/keys/0/devices",
      allow: "GET",
    },
    {
      // POST /api/keys/import must not be swallowed by the /api/keys/{id} rule.
      label: "key import QUERY",
      method: "QUERY",
      url: "/api/keys/import",
      allow: "POST",
    },
    {
      label: "key import PATCH",
      method: "PATCH",
      url: "/api/keys/import",
      allow: "POST",
    },
    {
      label: "key detail QUERY",
      method: "QUERY",
      url: "/api/keys/0",
      allow: "GET, PATCH, DELETE",
    },
  ];

  for (const testCase of cases) {
    let body = "";
    const headers = new Map<string, string>();
    const response = {
      statusCode: 200,
      setHeader(name: string, value: string) {
        headers.set(name.toLowerCase(), value);
      },
      end(chunk: string) {
        body += chunk;
      },
    };

    const handled = maybeHandleDisallowedMethod(
      { method: testCase.method, url: testCase.url },
      response
    );
    assert.equal(handled, true, testCase.label);
    assert.equal(response.statusCode, 405, testCase.label);
    assert.equal(headers.get("allow"), testCase.allow, testCase.label);
    assert.match(body, /METHOD_NOT_ALLOWED/, testCase.label);
  }
});

test("raw HTTP guard allows documented methods through", () => {
  const response = {
    setHeader() {
      throw new Error("allowed methods should not write headers");
    },
    end() {
      throw new Error("allowed methods should not end the response");
    },
  };

  assert.equal(
    maybeHandleDisallowedMethod({ method: "POST", url: "/api/auth/login" }, response),
    false
  );
  assert.equal(maybeHandleDisallowedMethod({ method: "GET", url: "/api/keys" }, response), false);
  assert.equal(
    maybeHandleDisallowedMethod({ method: "POST", url: "/api/keys/import" }, response),
    false
  );
  assert.equal(
    maybeHandleDisallowedMethod({ method: "OPTIONS", url: "/api/keys" }, response),
    false
  );
  assert.equal(
    maybeHandleDisallowedMethod({ method: "QUERY", url: "/api/health/ping" }, response),
    false
  );
});

test("raw HTTP guard rejects undici-unsupported methods (TRACE/TRACK/CONNECT) on ANY path", () => {
  // Regression guard (release v3.8.44 dast-smoke): TRACE reached Next's
  // middleware adapter, which throws `TypeError: 'TRACE' HTTP method is
  // unsupported.` while constructing the fetch Request — an unhandled 500 on
  // EVERY route. The guard must answer a clean 405 before Next sees it.
  for (const method of ["TRACE", "TRACK", "CONNECT"]) {
    for (const url of ["/api/keys/0/devices", "/dashboard", "/v1/chat/completions"]) {
      const headers: Record<string, string> = {};
      const response = {
        statusCode: 0,
        setHeader(name: string, value: string) {
          headers[name] = value;
        },
        body: "",
        end(payload?: string) {
          this.body = payload || "";
        },
      };
      const handled = maybeHandleDisallowedMethod({ method, url }, response);
      assert.equal(handled, true, `${method} ${url} must be handled by the guard`);
      assert.equal(response.statusCode, 405, `${method} ${url} must yield 405`);
      assert.ok(headers.Allow, `${method} ${url} must set an Allow header`);
      assert.match(response.body, /METHOD_NOT_ALLOWED/);
    }
  }
});

test("OpenAPI documents high-risk route auth and setup responses", () => {
  const spec = readFileSync("docs/openapi.yaml", "utf8");
  const apiKeyDetailStart = spec.indexOf("  /api/keys/{id}:");
  const apiKeyDetailEnd = spec.indexOf("\n  /api/combos:", apiKeyDetailStart);
  const apiKeyDetail = spec.slice(apiKeyDetailStart, apiKeyDetailEnd);

  assert.match(apiKeyDetail, /\n    get:/);
  assert.match(apiKeyDetail, /\n    patch:/);
  assert.match(apiKeyDetail, /\n    delete:/);
  assert.match(apiKeyDetail, /"401":\n\s+description: Authentication required/);
  assert.match(apiKeyDetail, /"404":\n\s+description: Key not found/);

  const loginStart = spec.indexOf("  /api/auth/login:");
  const loginEnd = spec.indexOf("\n  /api/auth/logout:", loginStart);
  const login = spec.slice(loginStart, loginEnd);
  assert.match(login, /"400":\n\s+description: Invalid login request/);
  assert.match(login, /"401":\n\s+description: Invalid password/);
  assert.match(login, /"403":\n\s+description: Password setup required/);
  assert.match(login, /"429":\n\s+description: Too many failed attempts/);
});

function responseRecorder() {
  return {
    statusCode: 200,
    headers: new Map<string, string>(),
    body: "",
    setHeader(name: string, value: string) {
      this.headers.set(name.toLowerCase(), value);
    },
    end(payload = "") {
      this.body += payload;
    },
  };
}

test("group collection POST reaches the next handler instead of the key-id method rule", () => {
  for (const url of ["/api/keys/groups", "/api/keys/groups/", "/api/keys/groups?view=all"]) {
    const response = responseRecorder();
    let calls = 0;
    const listener = wrapRequestListenerWithMethodGuard(
      (_request: unknown, result: ReturnType<typeof responseRecorder>) => {
        calls += 1;
        result.statusCode = 201;
        result.end();
      }
    );
    listener({ method: "POST", url }, response);
    assert.equal(calls, 1, url);
    assert.equal(response.statusCode, 201, url);
    assert.equal(response.headers.has("allow"), false, url);
  }
  for (const method of ["GET", "PUT", "DELETE"]) {
    assert.equal(
      maybeHandleDisallowedMethod({ method, url: "/api/keys/groups/qg-group" }, responseRecorder()),
      false,
      method
    );
  }
  assert.equal(
    maybeHandleDisallowedMethod({ method: "POST", url: "/api/keys/qg-key" }, responseRecorder()),
    true,
    "ordinary key detail still rejects POST"
  );
});

test("group QUERY returns 405 and Allow before authentication or body validation", () => {
  for (const downstreamStatus of [400, 401]) {
    for (const url of [
      "/api/keys/groups/qg-group",
      "/api/keys/groups/qg-group/",
      "/api/keys/groups/qg-group?view=all",
    ]) {
      const response = responseRecorder();
      let calls = 0;
      const listener = wrapRequestListenerWithMethodGuard(
        (_request: unknown, result: ReturnType<typeof responseRecorder>) => {
          calls += 1;
          result.statusCode = downstreamStatus;
          result.end();
        }
      );
      listener(
        {
          method: "QUERY",
          url,
          get headers() {
            throw new Error("method rejection must precede authentication");
          },
          on() {
            throw new Error("method rejection must precede request body consumption");
          },
        },
        response
      );
      assert.equal(calls, 0, url);
      assert.equal(response.statusCode, 405, url);
      assert.equal(response.headers.get("allow"), "GET, PUT, DELETE", url);
      assert.match(response.body, /METHOD_NOT_ALLOWED/, url);
    }
  }
});

test("affected management operations document authentication without allowing arbitrary failures", () => {
  const spec = parse(readFileSync("docs/openapi.yaml", "utf8"));
  const targets = [
    "/api/auth/csrf",
    "/api/keys/{id}/regenerate",
    "/api/keys/{id}/reveal",
    "/api/keys/{id}/usage-limits",
    "/api/keys/groups",
    "/api/keys/groups/{id}",
    "/api/keys/groups/{id}/keys",
    "/api/keys/groups/{id}/permissions",
  ];
  for (const path of targets) {
    const item = spec.paths[path];
    for (const method of ["get", "post", "put", "delete"]) {
      const operation = item[method];
      if (!operation) continue;
      assert.ok(
        operation.responses["401"],
        `${method} ${path}: authentication is a declared error`
      );
      assert.equal(
        operation.responses.default,
        undefined,
        `${method} ${path}: no catch-all response`
      );
      assert.equal(
        operation.responses["4XX"],
        undefined,
        `${method} ${path}: no blanket client error`
      );
      assert.equal(
        operation.responses["405"],
        undefined,
        `${method} ${path}: valid methods cannot be rejected`
      );
      assert.deepEqual(operation.security, [{ BearerAuth: [] }, { ManagementSessionAuth: [] }]);
      if (path.includes("{id}")) {
        const parameters = [...(item.parameters ?? []), ...(operation.parameters ?? [])];
        assert.ok(
          parameters.some((parameter) => parameter.$ref === "#/components/parameters/ResourceId")
        );
      }
    }
  }
  for (const path of [
    "/api/keys/groups",
    "/api/keys/groups/{id}/keys",
    "/api/keys/groups/{id}/permissions",
  ]) {
    assert.ok(spec.paths[path].post.responses["201"], `creation status for ${path}`);
    assert.equal(
      spec.paths[path].post.responses["200"],
      undefined,
      `no invented creation status for ${path}`
    );
  }
});

const groupBodyCases = [
  {
    method: "post",
    path: "/api/keys/groups",
    valid: [{ name: "research" }, { name: " research ", description: "" }],
    invalid: [
      {},
      { name: "" },
      { name: "   " },
      { name: 1 },
      { name: "research", description: null },
    ],
  },
  {
    method: "put",
    path: "/api/keys/groups/{id}",
    valid: [{ isActive: false }, { description: "" }, { name: "research" }],
    invalid: [{}, { unknown: true }, { name: "   " }, { isActive: "false" }],
  },
  {
    method: "post",
    path: "/api/keys/groups/{id}/keys",
    valid: [{ keyId: "qg-key" }],
    invalid: [{}, { keyId: "" }, { keyId: "\t" }, { keyId: 1 }],
  },
  {
    method: "post",
    path: "/api/keys/groups/{id}/permissions",
    valid: [
      { modelPattern: "*", accessType: "allow" },
      { modelPattern: "model-*", accessType: "deny", provider: "openai" },
    ],
    invalid: [
      {},
      { modelPattern: "*" },
      { modelPattern: " ", accessType: "allow" },
      { modelPattern: "*", accessType: "other" },
    ],
  },
];

for (const { method, path, valid, invalid } of groupBodyCases) {
  test(`OpenAPI request examples follow the handler validation for ${method.toUpperCase()} ${path}`, () => {
    const spec = parse(readFileSync("docs/openapi.yaml", "utf8"));
    const body = spec.paths[path][method].requestBody;
    assert.equal(body?.required, true, "a body is required by the handler");
    const validate = new Ajv({ strict: true, strictRequired: false }).compile(
      body.content["application/json"].schema
    );
    for (const data of valid) assert.equal(validate(data), true, JSON.stringify(data));
    for (const data of invalid) assert.equal(validate(data), false, JSON.stringify(data));
  });
}

test("status and key-access QUERY return 405 and Allow before authentication or body handling", () => {
  for (const [path, allow] of [
    ["/api/auth/status", "GET, HEAD"],
    ["/api/keys/qg-key/access", "POST"],
  ]) {
    for (const suffix of ["", "/", "?view=all"]) {
      for (const downstreamStatus of [400, 401]) {
        const url = path + suffix;
        const response = responseRecorder();
        let calls = 0;
        const listener = wrapRequestListenerWithMethodGuard(
          (_request: unknown, result: ReturnType<typeof responseRecorder>) => {
            calls += 1;
            result.statusCode = downstreamStatus;
            result.end();
          }
        );
        listener(
          {
            method: "QUERY",
            url,
            get headers() {
              throw new Error("method rejection must precede authentication");
            },
            on() {
              throw new Error("method rejection must precede request body consumption");
            },
          },
          response
        );
        assert.equal(calls, 0, url);
        assert.equal(response.statusCode, 405, url);
        assert.equal(response.headers.get("allow"), allow, url);
        assert.equal(response.headers.get("cache-control"), "no-store", url);
        assert.equal(JSON.parse(response.body).error.code, "METHOD_NOT_ALLOWED", url);
      }
    }
  }
});

test("status and key-access retain their implemented and automatic methods", () => {
  for (const [url, methods] of [
    ["/api/auth/status", ["GET", "HEAD", "OPTIONS"]],
    ["/api/keys/qg-key/access", ["POST", "OPTIONS"]],
  ] as const) {
    for (const method of methods) {
      const response = responseRecorder();
      let calls = 0;
      const listener = wrapRequestListenerWithMethodGuard(
        (_request: unknown, result: ReturnType<typeof responseRecorder>) => {
          calls += 1;
          result.statusCode = 204;
          result.end();
        }
      );
      listener({ method, url }, response);
      assert.equal(calls, 1, `${method} ${url}`);
      assert.equal(response.statusCode, 204, `${method} ${url}`);
      assert.equal(response.headers.has("allow"), false, `${method} ${url}`);
    }
  }
  for (const url of ["/api/auth/status/extra", "/api/keys/qg-key/access/extra"]) {
    assert.equal(
      maybeHandleDisallowedMethod({ method: "QUERY", url }, responseRecorder()),
      false,
      `the finite rules must not capture unrelated descendants: ${url}`
    );
  }
});
