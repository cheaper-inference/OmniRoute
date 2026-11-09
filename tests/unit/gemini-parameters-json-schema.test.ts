// Gemini `FunctionDeclaration` can carry its argument schema as `parametersJsonSchema`
// (plain JSON Schema) instead of `parameters` (OpenAPI-subset Schema). Antigravity CLI sends
// only `parametersJsonSchema`. Every Gemini -> OpenAI-shaped request translator read only
// `parameters`, so such a tool reached the model with an empty `{type:"object",properties:{}}`
// schema and the model invented the arguments (e.g. `get_weather` got `reason` instead of
// `city`). Same split exists for `generationConfig.responseSchema` / `responseJsonSchema`.
import test from "node:test";
import assert from "node:assert/strict";

const { geminiToOpenAIRequest } =
  await import("../../open-sse/translator/request/gemini-to-openai.ts");
const { convertGeminiToInternal } =
  await import("../../src/app/api/v1beta/models/[...path]/convertGeminiToInternal.ts");
const { antigravityToOpenAIRequest } =
  await import("../../open-sse/translator/request/antigravity-to-openai.ts");
const { filterToOpenAIFormat } = await import("../../open-sse/translator/helpers/openaiHelper.ts");
const { geminiRequestToXaiResponses } =
  await import("../../src/lib/providers/xai/translators/gemini.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Tool = { type: string; function: { name: string; parameters: unknown } };

const EMPTY_SCHEMA = { type: "object", properties: {} };

const WEATHER_JSON_SCHEMA = {
  type: "object",
  properties: { city: { type: "string", description: "City name" } },
  required: ["city"],
};

const COMPLEX_JSON_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  $defs: {
    unit: { type: "string", enum: ["celsius", "fahrenheit"] },
  },
  properties: {
    city: { type: "string" },
    unit: { $ref: "#/$defs/unit" },
    when: { anyOf: [{ type: "string", format: "date" }, { type: "null" }] },
  },
  required: ["city"],
  additionalProperties: false,
};

// OpenAPI-subset form, as sent in `parameters` (upper-case types are legal there).
const WEATHER_GEMINI_SCHEMA = {
  type: "OBJECT",
  properties: { location: { type: "STRING" } },
  required: ["location"],
};

function body(declaration: Record<string, unknown>) {
  return {
    contents: [{ role: "user", parts: [{ text: "weather in Paris?" }] }],
    tools: [{ functionDeclarations: [{ name: "get_weather", description: "", ...declaration }] }],
  };
}

const clone = <T>(v: T): T => structuredClone(v);

// Gemini request → OpenAI tools, for every translator that does this conversion.
const TRANSLATORS: Array<[string, (b: ReturnType<typeof body>) => Tool[]]> = [
  [
    "gemini-to-openai (translator registry GEMINI -> OPENAI)",
    (b) => geminiToOpenAIRequest("gemini-2.5-flash", b, false).tools as Tool[],
  ],
  [
    "convertGeminiToInternal (/v1beta/models/{m}:generateContent route)",
    (b) => convertGeminiToInternal(b as never, "gemini/gemini-2.5-flash", false).tools as Tool[],
  ],
  [
    "filterToOpenAIFormat (Gemini-shaped tools on an OpenAI body)",
    (b) => filterToOpenAIFormat({ model: "m", messages: [], tools: b.tools }).tools as Tool[],
  ],
];

for (const [name, toTools] of TRANSLATORS) {
  test(`${name}: parametersJsonSchema-only declaration keeps its schema`, () => {
    const input = body({ parametersJsonSchema: clone(WEATHER_JSON_SCHEMA) });
    const snapshot = clone(input);
    const tools = toTools(input);
    assert.equal(tools.length, 1);
    assert.deepEqual(tools[0].function.parameters, WEATHER_JSON_SCHEMA);
    assert.deepEqual(input, snapshot, "input must not be mutated");
  });

  test(`${name}: parameters wins when both fields are present`, () => {
    const tools = toTools(
      body({
        parameters: clone(WEATHER_GEMINI_SCHEMA),
        parametersJsonSchema: clone(WEATHER_JSON_SCHEMA),
      })
    );
    assert.deepEqual(tools[0].function.parameters, WEATHER_GEMINI_SCHEMA);
  });

  test(`${name}: neither field -> empty object schema`, () => {
    const tools = toTools(body({}));
    assert.deepEqual(tools[0].function.parameters, EMPTY_SCHEMA);
  });

  test(`${name}: $defs / $ref / anyOf / additionalProperties survive unchanged`, () => {
    const input = body({ parametersJsonSchema: clone(COMPLEX_JSON_SCHEMA) });
    const snapshot = clone(input);
    const tools = toTools(input);
    assert.deepEqual(tools[0].function.parameters, COMPLEX_JSON_SCHEMA);
    assert.deepEqual(input, snapshot, "input must not be mutated");
  });
}

test("translateRequest GEMINI -> OPENAI: parametersJsonSchema survives the full pipeline", () => {
  const out = translateRequest(
    FORMATS.GEMINI,
    FORMATS.OPENAI,
    "gemini-2.5-flash",
    body({ parametersJsonSchema: clone(COMPLEX_JSON_SCHEMA) }),
    false
  );
  const tool = (out.tools as Tool[]).find((t) => t.function.name === "get_weather");
  assert.ok(tool, "get_weather tool must be present");
  const params = tool.function.parameters as Record<string, unknown>;
  assert.deepEqual(params.required, ["city"]);
  assert.deepEqual(Object.keys(params.properties as object).sort(), ["city", "unit", "when"]);
  assert.notDeepEqual(params, EMPTY_SCHEMA);
});

test("antigravity-to-openai: parametersJsonSchema-only declaration keeps its properties", () => {
  // This translator deliberately runs every schema through cleanSchemaPreservingRequired
  // (strips $defs/additionalProperties/... for the Antigravity upstream); a
  // parametersJsonSchema now goes through the same cleaning instead of becoming empty.
  const input = { request: body({ parametersJsonSchema: clone(WEATHER_JSON_SCHEMA) }) };
  const snapshot = clone(input);
  const out = antigravityToOpenAIRequest("gemini-2.5-flash", input, false);
  const tools = out.tools as Tool[];
  assert.deepEqual(tools[0].function.parameters, WEATHER_JSON_SCHEMA);
  assert.deepEqual(input, snapshot, "input must not be mutated");
});

test("antigravity-to-openai: parameters wins when both are present", () => {
  const out = antigravityToOpenAIRequest(
    "gemini-2.5-flash",
    {
      request: body({
        parameters: clone(WEATHER_GEMINI_SCHEMA),
        parametersJsonSchema: clone(WEATHER_JSON_SCHEMA),
      }),
    },
    false
  );
  const params = (out.tools as Tool[])[0].function.parameters as Record<string, unknown>;
  assert.deepEqual(params.required, ["location"]);
});

test("geminiRequestToXaiResponses: parametersJsonSchema-only declaration keeps its schema", () => {
  const out = geminiRequestToXaiResponses(
    body({ parametersJsonSchema: clone(COMPLEX_JSON_SCHEMA) }) as never
  );
  const tools = out.tools as unknown as Tool[];
  assert.deepEqual(tools[0].function.parameters, COMPLEX_JSON_SCHEMA);
});

test("geminiRequestToXaiResponses: parameters wins when both are present", () => {
  const out = geminiRequestToXaiResponses(
    body({
      parameters: clone(WEATHER_GEMINI_SCHEMA),
      parametersJsonSchema: clone(WEATHER_JSON_SCHEMA),
    }) as never
  );
  const tools = out.tools as unknown as Tool[];
  assert.deepEqual(tools[0].function.parameters, WEATHER_GEMINI_SCHEMA);
});

test("geminiRequestToXaiResponses: responseJsonSchema maps to json_schema text format", () => {
  const out = geminiRequestToXaiResponses({
    contents: [],
    generationConfig: { responseJsonSchema: clone(COMPLEX_JSON_SCHEMA) },
  } as never);
  assert.deepEqual(out.text, { format: { type: "json_schema", schema: COMPLEX_JSON_SCHEMA } });
});

test("geminiRequestToXaiResponses: responseSchema wins over responseJsonSchema", () => {
  const out = geminiRequestToXaiResponses({
    contents: [],
    generationConfig: {
      responseSchema: clone(WEATHER_GEMINI_SCHEMA),
      responseJsonSchema: clone(WEATHER_JSON_SCHEMA),
    },
  } as never);
  assert.deepEqual(out.text, { format: { type: "json_schema", schema: WEATHER_GEMINI_SCHEMA } });
});
