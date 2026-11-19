import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { collectApiRouteUrlPaths, toApiUrlPath } from "../../scripts/check/lib/apiRoutes.mjs";
import {
  findSpecPathsWithoutRoute,
  runOpenapiRoutesCheck,
} from "../../scripts/check/check-openapi-routes.mjs";

function fixture(t, route = "v1/vscode/combos/[token]/[[...slug]]") {
  const root = mkdtempSync(join(tmpdir(), "omni-optional-route-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const api = join(root, "src/app/api");
  const file = join(api, route, "route.ts");
  mkdirSync(dirname(file), { recursive: true });
  mkdirSync(join(root, "docs"));
  writeFileSync(file, "export async function GET() {}\n");
  return { root, api };
}

test("ordinary and required catch-all segments retain their existing canonical names", () => {
  const api = join(tmpdir(), "omni-api-fixture");
  assert.equal(toApiUrlPath(join(api, "keys", "[id]"), api), "/api/keys/{id}");
  assert.equal(toApiUrlPath(join(api, "files", "[...path]"), api), "/api/files/{path}");
});

test("optional catch-all inventory uses one brace pair for its segment", () => {
  const api = join(tmpdir(), "omni-api-fixture");
  assert.equal(
    toApiUrlPath(join(api, "v1/vscode/combos/[token]/[[...slug]]"), api),
    "/api/v1/vscode/combos/{token}/{slug}"
  );
});

test("a root optional catch-all is not converted into a nested template", () => {
  const api = join(tmpdir(), "omni-api-fixture");
  assert.equal(toApiUrlPath(join(api, "[[...path]]"), api), "/api/{path}");
});

test("filesystem collection preserves one canonical entry per optional route file", (t) => {
  const { root } = fixture(t);
  assert.deepEqual(collectApiRouteUrlPaths(root), ["/api/v1/vscode/combos/{token}/{slug}"]);
});

test("a generic fallback route does not prove that an invented endpoint is documented correctly", () => {
  assert.deepEqual(findSpecPathsWithoutRoute(["/api/fixture/invented"], ["/api/{fallback}"]), [
    "/api/fixture/invented",
  ]);
});

test("a nested path template cannot be rescued by declaring the malformed parameter name", (t) => {
  const { root } = fixture(t, "fixture/[slug]");
  const path = "/api/fixture/{{slug}}";
  writeFileSync(
    join(root, "docs/openapi.yaml"),
    JSON.stringify({
      openapi: "3.1.0",
      info: { title: "Malformed template fixture", version: "1.0.0" },
      paths: {
        [path]: {
          parameters: [{ name: "{slug", in: "path", required: true, schema: { type: "string" } }],
          get: { responses: { 200: { description: "OK" } } },
        },
      },
    })
  );
  const result = runOpenapiRoutesCheck({ root, implPaths: [path] });
  assert.equal(result.ok, false, "declaring {slug is not a valid repair for {{slug}}");
  assert.equal(result.exitCode, 1);
  assert.match(result.message, /fixture/);
});
