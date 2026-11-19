import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../", import.meta.url));
const specification = load(readFileSync(join(root, "docs/openapi.yaml"), "utf8"));
const require = createRequire(import.meta.url);
const { maybeHandleDisallowedMethod } = require("../../scripts/dev/http-method-guard.cjs");

// Resolve the existing local component references. No new validator export is needed
// for the RED: the failed assertions describe the checked-in contract itself.
function resolve(value) {
  const visited = new Set();
  while (value?.$ref) {
    const reference = value.$ref;
    assert.ok(reference.startsWith("#/"), "the fixture uses local OpenAPI references");
    assert.ok(!visited.has(reference), "OpenAPI reference cycle");
    visited.add(reference);
    value = reference
      .slice(2)
      .split("/")
      .reduce((node, key) => node?.[key.replace(/~1/g, "/").replace(/~0/g, "~")], specification);
    assert.ok(value, "unresolved OpenAPI reference " + reference);
  }
  return value;
}

function verifyIdContract(path, method) {
  const item = resolve(specification.paths[path]);
  const operation = item?.[method];
  assert.ok(operation, method.toUpperCase() + " " + path + " must stay documented");
  const parameters = new Map(
    [...(item.parameters ?? []), ...(operation.parameters ?? [])]
      .map(resolve)
      .map((parameter) => [parameter.in + ":" + parameter.name, parameter])
  );
  const id = parameters.get("path:id");
  assert.ok(id, method.toUpperCase() + " " + path + " must declare the path id");
  assert.equal(id.required, true);
  assert.equal(resolve(id.schema)?.type, "string");
  assert.ok(operation.responses?.["401"], "management authentication rejection is documented");
}

const affected = [
  ["/api/keys/groups/{id}", ["delete", "get", "put"]],
  ["/api/keys/groups/{id}/keys", ["delete", "get", "post"]],
  ["/api/keys/groups/{id}/permissions", ["delete", "get", "post"]],
  ["/api/keys/{id}/regenerate", ["post"]],
  ["/api/keys/{id}/reveal", ["get"]],
  ["/api/keys/{id}/usage-limits", ["get"]],
];

for (const [path, methods] of affected) {
  for (const method of methods) {
    test(method.toUpperCase() + " " + path + " has a usable authenticated path contract", () => {
      verifyIdContract(path, method);
    });
  }
}

test("the existing self-service contract remains a positive reference control", () => {
  verifyIdContract("/api/keys/{id}/self-service", "get");
});

test("group creation describes the implemented body and 201 outcome", () => {
  const operation = specification.paths["/api/keys/groups"].post;
  assert.ok(operation.responses?.["201"], "the real create handler returns 201");
  const body = resolve(operation.requestBody);
  assert.equal(body?.required, true);
  const schema = resolve(body.content?.["application/json"]?.schema);
  assert.ok(schema?.required?.includes("name"));
  const name = resolve(schema.properties?.name);
  assert.equal(name?.type, "string");
  assert.ok(name.minLength >= 1);
  assert.equal(
    new RegExp(name.pattern).test("   "),
    false,
    "the handler rejects a blank trimmed name"
  );
});

function inspect(method, url) {
  const headers = {};
  let body = "";
  const response = {
    statusCode: 0,
    setHeader(name, value) {
      headers[name.toLowerCase()] = value;
    },
    end(value) {
      body += value ?? "";
    },
  };
  return {
    handled: maybeHandleDisallowedMethod({ method, url }, response),
    status: response.statusCode,
    headers,
    get body() {
      return body;
    },
  };
}

test("the static groups POST reaches the existing route without weakening auth", () => {
  const route = readFileSync(join(root, "src/app/api/keys/groups/route.ts"), "utf8");
  assert.match(route, /export async function POST\(/);
  for (const path of ["/api/keys/groups", "/api/keys/groups/"]) {
    const result = inspect("POST", path);
    assert.equal(result.handled, false, "groups must not match the generic key-id method rule");
    assert.equal(result.status, 0);
    assert.equal(result.body, "");
  }
});

test("groups rejects the generic key-id PATCH with its own Allow methods", () => {
  const result = inspect("PATCH", "/api/keys/groups");
  assert.equal(result.handled, true);
  assert.equal(result.status, 405);
  assert.equal(result.headers.allow, "GET, POST");
});

test("the existing key-id PATCH still reaches its protected route", () => {
  assert.equal(inspect("PATCH", "/api/keys/fixture-key").handled, false);
});

test("CORS preflight remains delegated to the existing route pipeline", () => {
  assert.equal(inspect("OPTIONS", "/api/keys/groups").handled, false);
});
