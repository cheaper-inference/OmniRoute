import assert from "node:assert/strict";
import { test } from "node:test";

import { normalizeCodexTools } from "../../open-sse/executors/codex/tools.ts";
import {
  coerceSchemaNumericFields,
  coerceToolSchemas,
} from "../../open-sse/translator/helpers/schemaCoercion.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(resetDbInstance);

function toolParameters() {
  return {
    type: "object",
    properties: {
      groups: {
        type: "array",
        contains: {
          type: "array",
          contains: { type: "integer" },
          minContains: " 0 ",
          maxContains: "3",
        },
        minContains: "1",
        maxContains: "2",
      },
      limit: { type: "integer", default: "1" },
    },
  };
}

const normalizedGroups = {
  type: "array",
  contains: {
    type: "array",
    contains: { type: "integer" },
    minContains: 0,
    maxContains: 3,
  },
  minContains: 1,
  maxContains: 2,
};

test("translated Codex tools coerce contains counts and strip defaults", () => {
  const tools = coerceToolSchemas([
    { type: "function", name: "list_resources", parameters: toolParameters() },
  ]) as Array<{ parameters: { properties: unknown } }>;

  assert.deepEqual(tools[0].parameters.properties, {
    groups: normalizedGroups,
    limit: { type: "integer" },
  });
});

test("native Codex tools coerce contains counts and retain defaults", () => {
  const body: Record<string, unknown> = {
    tools: [{ type: "function", name: "list_resources", parameters: toolParameters() }],
  };
  normalizeCodexTools(body);

  const [tool] = body.tools as Array<{ parameters: { properties: unknown } }>;
  assert.deepEqual(tool.parameters.properties, {
    groups: normalizedGroups,
    limit: { type: "integer", default: "1" },
  });
});

test("contains counts only coerce non-negative safe integer strings", () => {
  for (const value of ["-1", "1.5", "1.00000000000000001", "9007199254740992", "", "NaN", 0, 2]) {
    const schema = { type: "array", contains: true, minContains: value, maxContains: value };
    assert.deepEqual(coerceSchemaNumericFields(schema), schema);
  }

  const schema = { type: "array", contains: true, maxContains: String(Number.MAX_SAFE_INTEGER) };
  assert.deepEqual(coerceSchemaNumericFields(schema), {
    ...schema,
    maxContains: Number.MAX_SAFE_INTEGER,
  });
});
