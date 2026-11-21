import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { runOpenapiRoutesCheck } from "../../scripts/check/check-openapi-routes.mjs";

function inspect(t, pathname, method = "get", route = "v1/vscode/combos/[token]/[[...slug]]") {
  const root = mkdtempSync(join(tmpdir(), "omni-optional-routing-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const file = join(root, "src/app/api", route, "route.ts");
  mkdirSync(dirname(file), { recursive: true });
  mkdirSync(join(root, "docs"));
  writeFileSync(file, "export async function GET() {}\nexport async function POST() {}\n");
  writeFileSync(
    join(root, "docs/openapi.yaml"),
    JSON.stringify({
      openapi: "3.1.0",
      info: { title: "Concrete optional route fixture", version: "1.0.0" },
      paths: {
        [pathname]: {
          parameters: [{ name: "token", in: "path", required: true, schema: { type: "string" } }],
          [method]: { responses: { 200: { description: "OK" } } },
        },
      },
    })
  );
  return runOpenapiRoutesCheck({ root });
}

for (const [suffix, method] of [
  ["", "get"],
  ["/api/version", "get"],
  ["/api/tags", "get"],
  ["/api/show", "post"],
]) {
  test(
    "the real optional route file binds its concrete " +
      method.toUpperCase() +
      " " +
      (suffix || "catalog") +
      " path",
    (t) => {
      const result = inspect(t, "/api/v1/vscode/combos/{token}" + suffix, method);
      assert.equal(result.ok, true, result.message);
      assert.equal(result.exitCode, 0);
    }
  );
}

test("an optional route file cannot prove a concrete endpoint outside its prefix", (t) => {
  const result = inspect(t, "/api/v1/fiction/{token}/api/show", "post");
  assert.equal(result.ok, false);
  assert.equal(result.exitCode, 1);
  assert.match(result.message, /fiction/);
});

test("a global required catch-all does not substitute for the missing concrete optional route file", (t) => {
  const result = inspect(t, "/api/v1/vscode/combos/{token}", "get", "[...omnirouteApiCatchAll]");
  assert.equal(result.ok, false);
  assert.equal(result.exitCode, 1);
  assert.match(result.message, /vscode/);
});
