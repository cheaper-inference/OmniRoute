import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

import { config } from "../../../src/proxy.ts";
import { classifyRoute } from "../../../src/server/authz/classify.ts";
import { clientApiPolicy } from "../../../src/server/authz/policies/clientApi.ts";
import { authenticateA2ARequest } from "../../../src/lib/a2a/authenticate.ts";

const require = createRequire(import.meta.url);
const { tryToParsePath } = require("next/dist/lib/try-to-parse-path.js");

function compiledMatcherRegexes(): RegExp[] {
  return (config.matcher as string[]).map((entry) => {
    const parsed = tryToParsePath(entry);
    return new RegExp(parsed.regexStr as string);
  });
}

function isMatchedByProxy(path: string): boolean {
  return compiledMatcherRegexes().some((re) => re.test(path));
}

test("proxy matcher covers /a2a and /connect routes (issue #19832)", () => {
  const routes = [
    "/a2a",
    "/a2a/",
    "/a2a/tasks",
    "/a2a/tasks/123",
    "/connect",
    "/connect/",
    "/connect/token-123",
    "/connect/codex/device-auth",
    "/A2A",
    "/A2A/tasks",
    "/Connect",
    "/CONNECT/token-123",
  ];

  for (const r of routes) {
    assert.equal(isMatchedByProxy(r), true, `proxy matcher must match ${r}`);
  }
});

test("classifyRoute categorizes /a2a as CLIENT_API and /connect as PUBLIC (issue #19832)", () => {
  const a2aResult = classifyRoute("/a2a", "POST");
  assert.equal(a2aResult.routeClass, "CLIENT_API");
  assert.equal(a2aResult.reason, "client_api_alias");
  assert.equal(a2aResult.normalizedPath, "/a2a");

  const a2aSubResult = classifyRoute("/a2a/tasks", "POST");
  assert.equal(a2aSubResult.routeClass, "CLIENT_API");
  assert.equal(a2aSubResult.reason, "client_api_alias");
  assert.equal(a2aSubResult.normalizedPath, "/a2a/tasks");

  const a2aUpper = classifyRoute("/A2A", "POST");
  assert.equal(a2aUpper.routeClass, "CLIENT_API");
  assert.equal(a2aUpper.reason, "client_api_alias");
  assert.equal(a2aUpper.normalizedPath, "/a2a");

  const connectResult = classifyRoute("/connect", "GET");
  assert.equal(connectResult.routeClass, "PUBLIC");
  assert.equal(connectResult.reason, "public_connect_page");
  assert.equal(connectResult.normalizedPath, "/connect");

  const connectTokenResult = classifyRoute("/connect/token-xyz", "GET");
  assert.equal(connectTokenResult.routeClass, "PUBLIC");
  assert.equal(connectTokenResult.reason, "public_connect_page");
  assert.equal(connectTokenResult.normalizedPath, "/connect/token-xyz");

  const connectUpper = classifyRoute("/CONNECT/token-xyz", "GET");
  assert.equal(connectUpper.routeClass, "PUBLIC");
  assert.equal(connectUpper.reason, "public_connect_page");
  assert.equal(connectUpper.normalizedPath, "/connect/token-xyz");
});

test("authenticateA2ARequest rejects API key presented only in URL query string (issue #19832)", async () => {
  const origEnv = process.env.OMNIROUTE_API_KEY;
  const origReq = process.env.REQUIRE_API_KEY;
  try {
    process.env.OMNIROUTE_API_KEY = "test-secret-a2a-key";
    process.env.REQUIRE_API_KEY = "true";

    // 1. Valid header -> accepted
    const headerReq = {
      headers: new Headers({ authorization: "Bearer test-secret-a2a-key" }),
      url: "http://localhost:20128/a2a",
      nextUrl: { searchParams: new URLSearchParams() },
    };
    assert.equal(await authenticateA2ARequest(headerReq as never), true);

    // 2. Query string key with no header -> rejected (allowUrl: false)
    const urlReq = {
      headers: new Headers(),
      url: "http://localhost:20128/a2a?api_key=test-secret-a2a-key",
      nextUrl: new URL("http://localhost:20128/a2a?api_key=test-secret-a2a-key"),
    };
    assert.equal(await authenticateA2ARequest(urlReq as never), false);
  } finally {
    if (origEnv === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = origEnv;
    if (origReq === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = origReq;
  }
});

test("clientApiPolicy rejects /a2a when API key is only in URL query string (issue #19832)", async () => {
  const origEnv = process.env.OMNIROUTE_API_KEY;
  const origReq = process.env.REQUIRE_API_KEY;
  try {
    process.env.OMNIROUTE_API_KEY = "test-secret-a2a-key";
    process.env.REQUIRE_API_KEY = "true";

    const validHeaderCtx = {
      request: {
        method: "POST",
        headers: new Headers({ authorization: "Bearer test-secret-a2a-key" }),
        url: "http://localhost:20128/a2a",
      },
      classification: {
        routeClass: "CLIENT_API" as const,
        reason: "client_api_alias" as const,
        normalizedPath: "/a2a",
      },
      requestId: "req_header",
    };
    const headerOutcome = await clientApiPolicy.evaluate(validHeaderCtx as never);
    assert.equal(headerOutcome.allow, true);

    const queryKeyCtx = {
      request: {
        method: "POST",
        headers: new Headers(),
        url: "http://localhost:20128/a2a?api_key=test-secret-a2a-key",
      },
      classification: {
        routeClass: "CLIENT_API" as const,
        reason: "client_api_alias" as const,
        normalizedPath: "/a2a",
      },
      requestId: "req_query",
    };
    const queryOutcome = await clientApiPolicy.evaluate(queryKeyCtx as never);
    assert.equal(queryOutcome.allow, false);
    if (!queryOutcome.allow) {
      assert.equal(queryOutcome.status, 401);
    }
  } finally {
    if (origEnv === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = origEnv;
    if (origReq === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = origReq;
  }
});
