import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { runOpenapiRoutesCheck } from "../../scripts/check/check-openapi-routes.mjs";

const route = "/api/fixture/{id}";
const parameter = { name: "id", in: "path", required: true, schema: { type: "string" } };
const operation = { responses: { 200: { description: "OK" } } };

// JSON is valid YAML. The existing public gate reads a complete document from a
// fresh fixture root; no future validator helper or real application is imported.
function inspect(t, item, components = {}, options = {}) {
  const root = mkdtempSync(join(tmpdir(), "omni-openapi-parameters-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "docs"));
  mkdirSync(join(root, "src/app/api"), { recursive: true });
  const path = options.path ?? route;
  writeFileSync(
    join(root, "docs/openapi.yaml"),
    JSON.stringify({
      openapi: "3.1.0",
      info: { title: "Path parameter fixture", version: "1.0.0" },
      paths: { [path]: item },
      components,
    })
  );
  return runOpenapiRoutesCheck({ root, implPaths: options.implPaths ?? [path] });
}

function rejected(result) {
  assert.equal(result.ok, false, "invalid path-parameter evidence cannot pass the route gate");
  assert.equal(result.exitCode, 1);
  assert.match(result.message, /fixture/);
}

test("path parameters are inherited by each operation", (t) => {
  assert.equal(inspect(t, { parameters: [parameter], get: operation, delete: operation }).ok, true);
});

test("each operation can declare its own path parameter", (t) => {
  assert.equal(
    inspect(t, {
      get: { ...operation, parameters: [parameter] },
      post: { ...operation, parameters: [parameter] },
    }).ok,
    true
  );
});

test("query and path parameters with the same name are distinct", (t) => {
  assert.equal(
    inspect(t, {
      parameters: [parameter],
      get: { ...operation, parameters: [{ name: "id", in: "query", schema: { type: "string" } }] },
    }).ok,
    true
  );
});

test("a valid operation override is keyed by location and name", (t) => {
  assert.equal(
    inspect(t, {
      parameters: [parameter],
      get: { ...operation, parameters: [{ ...parameter, schema: { type: "integer" } }] },
    }).ok,
    true
  );
});

test("local parameter references resolve before checking their fields", (t) => {
  assert.equal(
    inspect(
      t,
      {
        parameters: [{ $ref: "#/components/parameters/Id" }],
        get: operation,
      },
      { parameters: { Id: parameter } }
    ).ok,
    true
  );
});

test("local reference chains resolve without mistaking reuse for a cycle", (t) => {
  const reference = { $ref: "#/components/parameters/Alias" };
  assert.equal(
    inspect(
      t,
      {
        get: { ...operation, parameters: [reference] },
        put: { ...operation, parameters: [reference] },
      },
      { parameters: { Alias: { $ref: "#/components/parameters/Id" }, Id: parameter } }
    ).ok,
    true
  );
});

test("local JSON Pointer references decode escaped slash and tilde", (t) => {
  assert.equal(
    inspect(
      t,
      {
        parameters: [{ $ref: "#/components/parameters/id~1alias~0" }],
        get: operation,
      },
      { parameters: { "id/alias~": parameter } }
    ).ok,
    true
  );
});

test("a local Path Item reference preserves inherited parameter declarations", (t) => {
  assert.equal(
    inspect(
      t,
      { $ref: "#/components/pathItems/Fixture" },
      {
        pathItems: { Fixture: { parameters: [parameter], get: operation } },
      }
    ).ok,
    true
  );
});

test("a static route needs no fabricated path parameter", (t) => {
  assert.equal(inspect(t, { get: operation }, {}, { path: "/api/fixture" }).ok, true);
});

test("the existing orphan-path check remains blocking", (t) => {
  rejected(inspect(t, { parameters: [parameter], get: operation }, {}, { implPaths: [] }));
});

for (const [label, declaration] of [
  ["missing", []],
  ["wrong case", [{ ...parameter, name: "ID" }]],
  ["query instead of path", [{ ...parameter, in: "query" }]],
  ["not required", [{ ...parameter, required: false }]],
  ["missing required", [{ name: "id", in: "path", schema: { type: "string" } }]],
  ["string required", [{ ...parameter, required: "true" }]],
  ["extra undeclared path name", [parameter, { ...parameter, name: "other" }]],
  ["duplicate same-level declaration", [parameter, { ...parameter }]],
]) {
  test("rejects a " + label + " path declaration", (t) => {
    rejected(inspect(t, { parameters: declaration, get: operation }));
  });
}

test("an operation override cannot hide required=false behind valid inheritance", (t) => {
  rejected(
    inspect(t, {
      parameters: [parameter],
      get: operation,
      put: { ...operation, parameters: [{ ...parameter, required: false }] },
    })
  );
});

test("one valid operation does not cover another operation's missing parameter", (t) => {
  rejected(inspect(t, { get: { ...operation, parameters: [parameter] }, post: operation }));
});

test("route filename normalization cannot repair a wrong OpenAPI parameter name", (t) => {
  rejected(
    inspect(
      t,
      {
        get: { ...operation, parameters: [{ ...parameter, name: "providerId" }] },
      },
      {},
      { implPaths: ["/api/fixture/{providerId}"] }
    )
  );
});

for (const [label, reference, components] of [
  ["unresolved parameter reference", "#/components/parameters/Missing", {}],
  [
    "cyclic parameter reference",
    "#/components/parameters/A",
    {
      parameters: {
        A: { $ref: "#/components/parameters/B" },
        B: { $ref: "#/components/parameters/A" },
      },
    },
  ],
  ["external parameter reference", "https://fixture.invalid/parameter.json", {}],
]) {
  test("rejects an " + label + " without fetching or throwing", (t) => {
    rejected(inspect(t, { parameters: [{ $ref: reference }], get: operation }, components));
  });
}

test("an unresolved Path Item cannot silently remove the operations under test", (t) => {
  rejected(inspect(t, { $ref: "#/components/pathItems/Missing" }));
});

test("cyclic Path Item references fail closed rather than becoming an empty path", (t) => {
  rejected(
    inspect(
      t,
      { $ref: "#/components/pathItems/A" },
      {
        pathItems: {
          A: { $ref: "#/components/pathItems/B" },
          B: { $ref: "#/components/pathItems/A" },
        },
      }
    )
  );
});
