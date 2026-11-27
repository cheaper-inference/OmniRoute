import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../", import.meta.url));
const prefix = "/api/v1/vscode/combos/{token}";
const optional = "v1/vscode/combos/[token]/[[...slug]]";

function inspect(t, routes, paths = [], apply = true) {
  const dir = mkdtempSync(join(tmpdir(), "omni-openapi-generator-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  // Execute the real generator and route collector, copied byte-for-byte so
  // their import.meta.url root points at this disposable fixture, never the WT.
  for (const relative of [
    "scripts/ad-hoc/gen-openapi-missing-paths.mjs",
    "scripts/check/lib/apiRoutes.mjs",
  ]) {
    const file = join(dir, relative);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, readFileSync(join(root, relative)));
  }
  writeFileSync(join(dir, "package.json"), '{"type":"module"}\n');
  const guard = join(dir, "src/server/authz/routeGuard.ts");
  mkdirSync(dirname(guard), { recursive: true });
  // Auth classification is a protocol boundary here, not the subject under test.
  // This prevents importing a running app or repository aliases into the fixture.
  writeFileSync(
    guard,
    [
      'export const ALWAYS_PROTECTED_API_PATHS = ["/api/protected"];',
      'export function isLocalOnlyPath(path) { return path.startsWith("/api/local/"); }',
    ].join("\n")
  );
  for (const [route, methods] of routes) {
    const file = join(dir, "src/app/api", route, "route.ts");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(
      file,
      methods.map((method) => "export async function " + method + "() {}").join("\n")
    );
  }
  const spec = join(dir, "docs/openapi.yaml");
  mkdirSync(dirname(spec), { recursive: true });
  const before = [
    "openapi: 3.1.0",
    "info: { title: Generator fixture, version: 1.0.0 }",
    "tags:",
    "  - name: Fixture",
    "paths:",
    ...paths.flatMap((path) => [
      "  " + path + ":",
      "    get:",
      "      tags: [Fixture]",
      '      responses: { "200": { description: OK } }',
    ]),
    "components:",
    "  schemas: {}",
    "",
  ].join("\n");
  writeFileSync(spec, before);
  const result = spawnSync(
    process.execPath,
    [join(dir, "scripts/ad-hoc/gen-openapi-missing-paths.mjs"), ...(apply ? ["--apply"] : [])],
    { cwd: dir, env: process.env, encoding: "utf8", timeout: 10000 }
  );
  assert.equal(result.error, undefined, "the real generator fixture must finish normally");
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const after = readFileSync(spec, "utf8");
  return { before, after, output: result.stdout + result.stderr, document: load(after) };
}

test("four concrete optional contracts do not regenerate an extra generic template", (t) => {
  const paths = [prefix, prefix + "/api/version", prefix + "/api/tags", prefix + "/api/show"];
  const result = inspect(t, [[optional, ["GET", "POST"]]], paths);
  assert.match(result.output, /real routes: 1/);
  assert.deepEqual(Object.keys(result.document.paths).sort(), paths.sort());
});

test("a genuinely undocumented route still generates its exported methods and classification", (t) => {
  const result = inspect(t, [
    ["local/probe/[id]", ["GET", "POST"]],
    ["protected", ["GET"]],
  ]);
  const item = result.document.paths["/api/local/probe/{id}"];
  assert.ok(item?.get && item?.post);
  assert.equal(item.get["x-loopback-only"], true);
  assert.equal(item.post["x-loopback-only"], true);
  assert.equal(result.document.paths["/api/protected"].get["x-always-protected"], true);
  assert.match(result.output, /real routes: 2/);
});

test("new dynamic entries declare the required path parameter instead of recreating DAST debt", (t) => {
  const result = inspect(t, [["local/probe/[id]", ["GET", "POST"]]]);
  const item = result.document.paths["/api/local/probe/{id}"];
  const parameter = item.parameters?.find((entry) => entry.name === "id" && entry.in === "path");
  assert.ok(parameter, "the generated Path Item must declare id for both operations");
  assert.equal(parameter.required, true);
  assert.equal(parameter.schema?.type, "string");
});

test("an unrelated concrete path does not hide a genuinely undocumented optional file", (t) => {
  const result = inspect(t, [[optional, ["GET"]]], ["/api/v1/fiction/{token}/api/tags"]);
  assert.ok(result.document.paths[prefix + "/{slug}"]);
  assert.ok(result.document.paths["/api/v1/fiction/{token}/api/tags"]);
});

test("dry-run retains the original specification and reports missing routes", (t) => {
  const result = inspect(t, [["fresh/[id]", ["GET"]]], [], false);
  assert.equal(result.after, result.before);
  assert.match(result.output, /missing with methods: 1/);
  assert.match(result.output, /\(dry-run\)/);
});
