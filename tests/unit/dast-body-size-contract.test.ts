import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import test from "node:test";
import Ajv from "ajv";
import { NextRequest } from "next/server";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { parse } from "yaml";

const root = new URL("../../", import.meta.url);
const route = "/api/keys/qg-body-limit/access";
const limit = 10 * 1024 * 1024;
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dast-body-limit-"));
const environmentKeys = [
  "DATA_DIR",
  "NODE_ENV",
  "API_KEY_SECRET",
  "JWT_SECRET",
  "INITIAL_PASSWORD",
  "REQUIRE_API_KEY",
  "MAX_BODY_SIZE_BYTES",
  "OMNIROUTE_HEADLESS",
];
const previousEnvironment = new Map(environmentKeys.map((key) => [key, process.env[key]]));
process.env.DATA_DIR = directory;
process.env.NODE_ENV = "test";
process.env.API_KEY_SECRET = "test-dast-body-limit-only";
process.env.JWT_SECRET = "test-dast-body-limit-session-only";
process.env.INITIAL_PASSWORD = "test-dast-body-limit-password-only";
process.env.REQUIRE_API_KEY = "true";
delete process.env.MAX_BODY_SIZE_BYTES;
delete process.env.OMNIROUTE_HEADLESS;
const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { checkBodySize, getBodySizeLimit, MAX_BODY_BYTES } =
  await import("../../src/shared/middleware/bodySizeGuard.ts");
const { proxy, config } = await import("../../src/proxy.ts");
const require = createRequire(import.meta.url);
const {
  maybeHandleDisallowedMethod,
  wrapRequestListenerWithMethodGuard,
} = require("../../scripts/dev/http-method-guard.cjs");
const evidence: Array<Record<string, string | number | boolean | null>> = [];

test.before(async () => {
  await updateSettings({ requireLogin: true, maxBodySizeMb: 10 });
  assert.equal(MAX_BODY_BYTES, limit);
  assert.equal(getBodySizeLimit(route, { maxBodySizeMb: 10 }), limit);
  assert.equal(
    unstable_doesMiddlewareMatch({
      config,
      url: `http://localhost:20128${route}`,
      nextConfig: { basePath: "" },
    }),
    true
  );
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
  for (const [key, value] of previousEnvironment) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  const output = process.env.QG_DAST_BODY_SIZE_EVIDENCE;
  if (output) {
    assert.ok(path.isAbsolute(output));
    fs.writeFileSync(
      output,
      JSON.stringify(
        {
          schemaVersion: 1,
          kind: "IN_PROCESS_REAL_PROXY_BODY_LIMIT",
          fixedLimitBytes: limit,
          providerRequests: 0,
          rows: evidence,
          historicalHostedRequestSizeKnown: false,
          historicalHostedGuardAttributed: false,
        },
        null,
        2
      ) + "\n",
      { flag: "wx", mode: 0o600 }
    );
  }
});

function jsonBody(bytes: number): string {
  const empty = JSON.stringify({ add: { models: [""] } });
  const body = JSON.stringify({ add: { models: ["x".repeat(bytes - Buffer.byteLength(empty))] } });
  assert.equal(Buffer.byteLength(body), bytes);
  return body;
}

function request(
  body: string,
  declaredLength: string | null = String(Buffer.byteLength(body))
): NextRequest {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (declaredLength !== null) headers["content-length"] = declaredLength;
  return new NextRequest(`http://localhost:20128${route}`, { method: "POST", body, headers });
}

function recorder() {
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

test("key access above the measured body limit returns the real admission 413 before auth", async () => {
  for (const [body, label] of [
    [jsonBody(limit + 1), "ABOVE_LIMIT"],
    ["{}", "DECLARED_ONLY_ABOVE_LIMIT"],
  ]) {
    const req = request(body, String(limit + 1));
    assert.equal(maybeHandleDisallowedMethod({ method: "POST", url: route }, recorder()), false);
    const direct = checkBodySize(req, getBodySizeLimit(route, { maxBodySizeMb: 10 }));
    assert.ok(direct);
    const directBody = await direct.json();
    const response = await proxy(req);
    assert.equal(response.status, 413);
    assert.equal(response.headers.get("x-omniroute-route-class"), "MANAGEMENT");
    assert.equal(response.headers.get("content-type"), "application/json");
    assert.deepEqual(await response.json(), directBody);
    assert.equal(directBody.error.code, "PAYLOAD_TOO_LARGE");
    assert.equal(directBody.error.type, "payload_too_large");
    assert.equal(req.bodyUsed, false);
    evidence.push({
      case: label,
      method: "POST",
      requestBytes: Buffer.byteLength(body),
      declaredBytes: Number(req.headers.get("content-length")),
      limitBytes: limit,
      httpStatus: response.status,
      realProxy: true,
      matchesBodySizeGuard: true,
      bodyConsumed: req.bodyUsed,
    });
  }
});

test("key access at or below the body limit still requires auth for valid and malformed JSON", async () => {
  const inputs = [
    { body: jsonBody(limit - 1), length: String(limit - 1), label: "AT_OR_BELOW_LIMIT" },
    { body: jsonBody(limit), length: String(limit), label: "AT_OR_BELOW_LIMIT" },
    { body: "{malformed", length: "10", label: "MALFORMED_BELOW_LIMIT" },
    { body: jsonBody(limit + 1), length: null, label: "ABSENT_LENGTH_HEADER" },
    { body: "{}", length: "invalid", label: "MALFORMED_LENGTH_HEADER" },
  ];
  for (const input of inputs) {
    const req = request(input.body, input.length);
    assert.equal(checkBodySize(req, limit), null);
    const response = await proxy(req);
    assert.equal(response.status, 401);
    assert.equal((await response.json()).error.code, "AUTH_001");
    assert.equal(req.bodyUsed, false);
    const declared = Number.parseInt(req.headers.get("content-length") ?? "", 10);
    evidence.push({
      case: input.label,
      method: "POST",
      requestBytes: Buffer.byteLength(input.body),
      declaredBytes: Number.isFinite(declared) ? declared : null,
      limitBytes: limit,
      httpStatus: response.status,
      realProxy: true,
      matchesBodySizeGuard: false,
      bodyConsumed: req.bodyUsed,
    });
  }
});

test("status and key-access QUERY retain 405 before headers and body admission", () => {
  for (const [url, allow] of [
    ["/api/auth/status", "GET, HEAD"],
    [route, "POST"],
  ]) {
    const response = recorder();
    let calls = 0;
    const listener = wrapRequestListenerWithMethodGuard(() => {
      calls += 1;
    });
    listener(
      {
        method: "QUERY",
        url,
        get headers() {
          throw new Error("method guard must precede body-size and auth headers");
        },
        on() {
          throw new Error("method guard must precede body consumption");
        },
      },
      response
    );
    assert.equal(calls, 0);
    assert.equal(response.statusCode, 405);
    assert.equal(response.headers.get("allow"), allow);
    assert.equal(JSON.parse(response.body).error.code, "METHOD_NOT_ALLOWED");
    evidence.push({
      case: "QUERY_CONTROL",
      method: "QUERY",
      requestBytes: null,
      declaredBytes: null,
      limitBytes: limit,
      httpStatus: response.statusCode,
      realProxy: false,
      methodGuard: true,
      downstreamCalls: calls,
    });
  }
});

test("key-access OpenAPI declares the actual 413 envelope and rejects malformed error bodies", async () => {
  const schema = parse(fs.readFileSync(new URL("docs/openapi.yaml", root), "utf8"));
  const response = schema.paths["/api/keys/{id}/access"].post.responses["413"];
  assert.ok(
    response,
    "the real pre-auth body limit response must be documented for POST key access"
  );
  const responseSchema = response.content?.["application/json"]?.schema;
  assert.ok(responseSchema);
  const ajv = new Ajv({ strict: true, allErrors: true });
  const validate = ajv.compile(responseSchema);
  const actual = checkBodySize(request(jsonBody(limit + 1)), limit);
  assert.ok(actual);
  const body = await actual.json();
  assert.equal(validate(body), true);
  for (const invalid of [
    { error: "too large" },
    { error: { message: "too large", type: "other", code: "PAYLOAD_TOO_LARGE" } },
    { error: { message: "too large", type: "payload_too_large", code: "OTHER" } },
    { error: { type: "payload_too_large", code: "PAYLOAD_TOO_LARGE" } },
    { error: { ...body.error, stack: "must not be accepted" } },
    { ...body, accepted: true },
  ])
    assert.equal(validate(invalid), false);
});
