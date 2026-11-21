import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const checker = fileURLToPath(
  new URL("../../scripts/check/check-openapi-coverage.mjs", import.meta.url)
);
const optionalRoute = "v1/vscode/combos/[token]/[[...slug]]";
const prefix = "/api/v1/vscode/combos/{token}";

function inspect(t, routes, paths) {
  const root = mkdtempSync(join(tmpdir(), "omni-optional-coverage-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "docs"));
  for (const route of routes) {
    const file = join(root, "src/app/api", route, "route.ts");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, "export async function GET() {}\n");
  }
  writeFileSync(
    join(root, "docs/openapi.yaml"),
    JSON.stringify({
      openapi: "3.1.0",
      info: { title: "Route coverage fixture", version: "1.0.0" },
      paths: Object.fromEntries(
        paths.map((path) => [
          path,
          {
            parameters: [...path.matchAll(/\{([^{}]+)\}/g)].map((match) => ({
              name: match[1],
              in: "path",
              required: true,
              schema: { type: "string" },
            })),
            get: { responses: { 200: { description: "OK" } } },
          },
        ])
      ),
    })
  );
  const result = spawnSync(process.execPath, [checker], {
    cwd: root,
    env: process.env,
    encoding: "utf8",
    timeout: 10000,
  });
  assert.equal(result.error, undefined, "the real coverage CLI must finish normally");
  return { status: result.status, output: result.stdout + result.stderr };
}

test("an exact ordinary dynamic route remains covered", (t) => {
  const result = inspect(t, ["keys/[id]"], ["/api/keys/{id}"]);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /100\.0% \(1\/1 routes documented\)/);
});

test("four concrete optional paths count as one documented route file", (t) => {
  const result = inspect(
    t,
    [optionalRoute],
    [prefix, prefix + "/api/version", prefix + "/api/tags", prefix + "/api/show"]
  );
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /100\.0% \(1\/1 routes documented\)/);
});

test("a documented concrete suffix covers its optional route without an invented generic template", (t) => {
  const result = inspect(t, [optionalRoute, "keys/[id]"], [prefix + "/api/tags", "/api/keys/{id}"]);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /100\.0% \(2\/2 routes documented\)/);
});

test("an unrelated concrete path does not cover an optional route", (t) => {
  const result = inspect(t, [optionalRoute], ["/api/v1/fiction/{token}/api/tags"]);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /0\.0%/);
});

test("a global required fallback does not count invented concrete paths as documented", (t) => {
  const result = inspect(t, ["[...omnirouteApiCatchAll]"], ["/api/fiction/{id}"]);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /0\.0%/);
});

for (const [covered, expectedStatus] of [
  [3, 0],
  [2, 1],
]) {
  test("the existing 30 percent floor is preserved with " + covered + " of ten routes", (t) => {
    const routes = Array.from({ length: 10 }, (_, index) => "fixture-" + index);
    const result = inspect(
      t,
      routes,
      routes.slice(0, covered).map((route) => "/api/" + route)
    );
    assert.equal(result.status, expectedStatus, result.output);
    assert.match(result.output, new RegExp(String(covered * 10) + "\\.0%"));
  });
}
