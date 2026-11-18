import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or-gemini-numeric-bounds-"));

const { cleanJSONSchemaForAntigravity } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");
const { buildGeminiTools } =
  await import("../../open-sse/translator/helpers/geminiToolsSanitizer.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Props = Record<string, Record<string, unknown>>;

// Tool schemas from IDEs and SDKs sometimes encode bounds as strings. The Antigravity
// envelope keeps its tools outside `result.tools`, so the shared tool-schema coercion
// never runs there. The Gemini cleaner is the one step every path shares.
test("cleaner turns string bounds into numbers", () => {
  const out = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      n: { type: "number", minimum: "0", maximum: " 10 " },
      o: {
        type: "object",
        minProperties: "1",
        maxProperties: "5",
        properties: { a: { type: "string" } },
      },
    },
  }) as { properties: Props };
  assert.equal(out.properties.n.minimum, 0);
  assert.equal(out.properties.n.maximum, 10);
  assert.equal(out.properties.o.minProperties, 1);
  assert.equal(out.properties.o.maxProperties, 5);
});

test("buildGeminiTools sends numeric bounds as numbers on a nested schema", () => {
  const tools = buildGeminiTools([
    {
      type: "function",
      function: {
        name: "t",
        description: "d",
        parameters: {
          type: "object",
          properties: {
            list: {
              type: "array",
              items: {
                type: "object",
                minProperties: "2",
                properties: { v: { type: "integer", minimum: "3" } },
              },
            },
          },
        },
      },
    },
  ]) as Array<{ functionDeclarations: Array<{ parameters: { properties: Props } }> }>;
  const item = tools[0].functionDeclarations[0].parameters.properties.list.items as {
    minProperties: unknown;
    properties: Props;
  };
  assert.equal(item.minProperties, 2);
  assert.equal(item.properties.v.minimum, 3);
});

test("numbers, non-numeric strings and property names stay unchanged", () => {
  const out = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      n: { type: "number", minimum: 7, maximum: "abc" },
      minimum: { type: "string" },
      maxProperties: { type: "string", description: "5" },
    },
  }) as { properties: Props };
  assert.equal(out.properties.n.minimum, 7);
  assert.equal(out.properties.n.maximum, "abc");
  assert.deepEqual(out.properties.minimum, { type: "string" });
  assert.equal(out.properties.maxProperties.description, "5");
});

test("openai to antigravity request carries numeric bounds as numbers", () => {
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.ANTIGRAVITY,
    "gemini-2.5-pro",
    {
      model: "gemini-2.5-pro",
      messages: [{ role: "user", content: "hi" }],
      tools: [
        {
          type: "function",
          function: {
            name: "t",
            description: "d",
            parameters: {
              type: "object",
              properties: { n: { type: "number", minimum: "0", maximum: "10" } },
            },
          },
        },
      ],
    },
    false,
    null,
    "antigravity"
  ) as {
    request: {
      tools: Array<{ functionDeclarations: Array<{ parameters: { properties: Props } }> }>;
    };
  };
  const n = translated.request.tools[0].functionDeclarations[0].parameters.properties.n;
  assert.equal(n.minimum, 0);
  assert.equal(n.maximum, 10);
});
