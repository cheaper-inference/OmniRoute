import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";

import { OPENAPI_ENDPOINTS, OPENAPI_VERSION } from "../../src/app/docs/lib/openapi.generated";

type Operation = { security?: unknown[]; summary?: string };
type Spec = {
  info: { version: string };
  paths: Record<string, Record<string, Operation>>;
};
const spec = load(
  readFileSync(new URL("../../docs/openapi.yaml", import.meta.url), "utf8")
) as Spec;
const methods = new Set(["get", "post", "put", "delete", "patch", "options", "head"]);

test("the committed API Explorer identifies the documented release version", () => {
  assert.equal(OPENAPI_VERSION, spec.info.version);
});

test("the committed API Explorer includes every documented public operation", () => {
  const expected: string[] = [];
  for (const [path, item] of Object.entries(spec.paths)) {
    // The public family includes /api/v1 itself and the Gemini /api/v1beta routes.
    if (path.startsWith("/api/") && !path.startsWith("/api/v1")) continue;
    for (const method of Object.keys(item)) {
      if (methods.has(method)) expected.push(`${method.toUpperCase()} ${path}`);
    }
  }
  assert.deepEqual(
    OPENAPI_ENDPOINTS.map((endpoint) => `${endpoint.method} ${endpoint.path}`).sort(),
    expected.sort()
  );
});

test("the API Explorer preserves each operation's explicit authentication requirement", () => {
  for (const endpoint of OPENAPI_ENDPOINTS) {
    const operation = spec.paths[endpoint.path]?.[endpoint.method.toLowerCase()];
    assert.ok(operation, `${endpoint.method} ${endpoint.path} must still exist`);
    assert.equal(
      endpoint.requiresAuth,
      Array.isArray(operation.security) && operation.security.length > 0,
      `${endpoint.method} ${endpoint.path}`
    );
  }
});
