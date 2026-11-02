import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import * as yaml from "js-yaml";
import { parseOpenapi } from "../../src/lib/agentSkills/openapiParser.ts";
import { buildApiOperationExample } from "../../src/lib/agentSkills/apiOperationExample.ts";
import { POST as setAutoStart } from "../../src/app/api/services/singbox/auto-start/route.ts";
import { POST as setAutoRestart } from "../../src/app/api/services/singbox/auto-restart-adopted/route.ts";

function requestPayload(lines: string[]): Record<string, unknown> {
  const line = lines.find((entry) => entry.startsWith("  -d '"));
  assert.ok(line?.endsWith("'"), "expected a single-quoted JSON body argument");
  return JSON.parse(line.slice(6, -1).replaceAll("'\\''", "'"));
}

const source = yaml.load(fs.readFileSync("docs/openapi.yaml", "utf8")) as {
  paths: Record<
    string,
    {
      post: {
        requestBody: {
          content: Record<
            string,
            {
              schema: { required: string[]; properties: { enabled: { type: string } } };
            }
          >;
        };
      };
    }
  >;
};

for (const [action, handler] of [
  ["auto-start", setAutoStart],
  ["auto-restart-adopted", setAutoRestart],
] as const) {
  test(`sing-box ${action} generated request obeys the source schema and real route`, async () => {
    const path = `/api/services/singbox/${action}`;
    const schema = source.paths[path].post.requestBody.content["application/json"].schema;
    assert.ok(schema.required.includes("enabled"));
    assert.equal(schema.properties.enabled.type, "boolean");
    const operation = parseOpenapi().paths.get(`POST ${path}`);
    assert.ok(operation);
    const payload = requestPayload(buildApiOperationExample(operation, false));
    assert.equal(typeof payload.enabled, "boolean");
    const request = (body: unknown) =>
      new Request(`http://localhost:20128${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    assert.equal((await handler(request(payload))).status, 204);
    assert.equal((await handler(request({}))).status, 400);
    assert.equal((await handler(request({ enabled: "false" }))).status, 400);
  });
}

test("request examples quote apostrophes while retaining dashboard and bearer authentication", () => {
  const payload = { enabled: false, note: "don't $(touch never) `literal`" };
  const operation = { path: "/api/settings/example", method: "POST", requestBodyExample: payload };
  for (const dashboard of [false, true]) {
    const lines = buildApiOperationExample(operation, dashboard);
    assert.deepEqual(requestPayload(lines), payload);
    assert.ok(lines.some((line) => line.includes("don'\\''t")));
    assert.ok(
      lines.some((line) =>
        line.includes(dashboard ? "x-omniroute-csrf" : "Bearer $OMNIROUTE_TOKEN")
      )
    );
  }
});

test("operations without an explicit request example preserve the placeholder and GET stays bodyless", () => {
  assert.deepEqual(
    requestPayload(
      buildApiOperationExample({ path: "/api/settings/example", method: "POST" }, false)
    ),
    {}
  );
  const read = {
    path: "/api/settings/example",
    method: "GET",
    requestBodyExample: { enabled: true },
  };
  assert.ok(!buildApiOperationExample(read, false).some((line) => line.includes("-d ")));
});
