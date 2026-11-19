// #18972: the Antigravity -> OpenAI tool-schema cleaner strips JSON Schema meta keywords
// (`title`, `const`, `definitions`, `x-*`, ...) at every object level. It also stripped the
// KEYS of a `properties` map, so a tool parameter literally named `title` (create_issue,
// create_page, calendar tools) disappeared, and `preserveRequired` then dropped it from
// `required`. Property names are parameter names, not keywords: they must survive, while
// each child schema is still cleaned.
import test from "node:test";
import assert from "node:assert/strict";

const { antigravityToOpenAIRequest } =
  await import("../../open-sse/translator/request/antigravity-to-openai.ts");

type Schema = {
  type?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  required?: string[];
  [keyword: string]: unknown;
};

/**
 * Translate a one-tool Antigravity request and return the cleaned OpenAI `parameters`.
 * @param parameters - Antigravity `functionDeclarations[0].parameters` schema.
 * @returns The schema the OpenAI-format request carries for that tool.
 */
function cleanedParameters(parameters: Record<string, unknown>): Schema {
  const result = antigravityToOpenAIRequest(
    "gpt-4o",
    { request: { tools: [{ functionDeclarations: [{ name: "tool", parameters }] }] } },
    false
  );
  return (result.tools[0].function as { parameters: Schema }).parameters;
}

test("a tool parameter named title survives the schema clean and stays required", () => {
  const params = cleanedParameters({
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "CreateIssueArgs",
    additionalProperties: false,
    type: "OBJECT",
    properties: {
      title: { type: "STRING", description: "Issue title" },
      body: { type: "STRING" },
    },
    required: ["title"],
  });

  assert.deepEqual(Object.keys(params.properties ?? {}), ["title", "body"]);
  assert.deepEqual(params.properties?.title, { type: "string", description: "Issue title" });
  assert.deepEqual(params.required, ["title"]);
  // Meta keywords on the schema node itself are still stripped.
  assert.equal(params.$schema, undefined);
  assert.equal(params.title, undefined);
  assert.equal(params.additionalProperties, undefined);
});

test("parameters named const, definitions and x-* survive and stay required", () => {
  const params = cleanedParameters({
    type: "OBJECT",
    properties: {
      const: { type: "STRING" },
      definitions: { type: "ARRAY", items: { type: "STRING" } },
      "x-request-id": { type: "STRING" },
    },
    required: ["const", "definitions", "x-request-id"],
  });

  assert.deepEqual(Object.keys(params.properties ?? {}), ["const", "definitions", "x-request-id"]);
  assert.deepEqual(params.required, ["const", "definitions", "x-request-id"]);
  assert.equal(params.properties?.definitions?.items?.type, "string");
});

test("child schemas under properties are still cleaned of meta keywords", () => {
  const params = cleanedParameters({
    type: "OBJECT",
    properties: {
      title: {
        type: "STRING",
        title: "Title",
        "x-ui-widget": "text",
        $comment: "shown in the form header",
      },
      labels: {
        type: "OBJECT",
        title: "Labels",
        additionalProperties: { type: "STRING" },
        properties: { name: { type: "STRING", const: "bug" } },
      },
    },
  });

  assert.deepEqual(params.properties?.title, { type: "string" });
  assert.deepEqual(params.properties?.labels, {
    type: "object",
    properties: { name: { type: "string" } },
  });
});

test("nested properties maps and array items keep parameters named like keywords", () => {
  const params = cleanedParameters({
    type: "OBJECT",
    properties: {
      meta: {
        type: "OBJECT",
        properties: { title: { type: "STRING" }, $ref: { type: "STRING" } },
        required: ["title", "$ref"],
      },
      pages: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          title: "Page",
          properties: { title: { type: "STRING" }, const: { type: "NUMBER" } },
          required: ["title"],
        },
      },
    },
    required: ["meta"],
  });

  assert.deepEqual(Object.keys(params.properties?.meta?.properties ?? {}), ["title", "$ref"]);
  assert.deepEqual(params.properties?.meta?.required, ["title", "$ref"]);
  assert.deepEqual(params.properties?.pages?.items, {
    type: "object",
    properties: { title: { type: "string" }, const: { type: "number" } },
    required: ["title"],
  });
  assert.deepEqual(params.required, ["meta"]);
});
