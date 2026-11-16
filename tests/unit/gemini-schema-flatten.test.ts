// Gemini request-translation fixes: a forced tool_choice must name the tool as
// declared (sanitized / namespace-stripped); anyOf/oneOf flattening must merge the
// parent's `properties`/`required` instead of overwriting them; and protobuf field
// predicates (`items` on non-array, `properties`/`required` on non-object nodes) are
// dropped. The Antigravity `reason` placeholder is upstream behaviour and stays as is.
import test from "node:test";
import assert from "node:assert/strict";

const g = await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { cleanJSONSchemaForAntigravity } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");

type Schema = {
  type?: string;
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema;
  enum?: unknown[];
};
type GeminiOut = {
  tools?: Array<{ functionDeclarations?: Array<{ name: string; parameters?: Schema }> }>;
  toolConfig?: { functionCallingConfig: { allowedFunctionNames?: string[] } };
  generationConfig: { responseSchema?: Schema };
};
type EnvelopeOut = { request: GeminiOut };

function tool(name: string, parameters?: Record<string, unknown>) {
  return {
    type: "function",
    function: { name, parameters: parameters ?? { type: "object", properties: {} } },
  };
}

function toGemini(body: Record<string, unknown>): GeminiOut {
  return g.openaiToGeminiRequest(
    "gemini-2.5-pro",
    { messages: [{ role: "user", content: "hi" }], ...body },
    false
  ) as unknown as GeminiOut;
}

function toEnvelope(body: Record<string, unknown>): EnvelopeOut {
  return g.openaiToAntigravityRequest(
    "gemini-3-pro",
    { messages: [{ role: "user", content: "hi" }], ...body },
    false,
    { projectId: "p" }
  ) as unknown as EnvelopeOut;
}

function cleanSchema(schema: unknown): Schema {
  return cleanJSONSchemaForAntigravity(schema) as unknown as Schema;
}

test("forced tool_choice name must match the sanitized declaration name", () => {
  const out = toGemini({
    tools: [tool("get-weather", { type: "object", properties: { a: { type: "string" } } })],
    tool_choice: { type: "function", function: { name: "get-weather" } },
  });
  const decl = out.tools![0].functionDeclarations![0].name;
  const allowed = out.toolConfig!.functionCallingConfig.allowedFunctionNames![0];
  assert.equal(allowed, decl, `allowed=${allowed} decl=${decl}`);
});

test("forced tool_choice name must match the namespace-stripped declaration (Cloud Code)", () => {
  const env = toEnvelope({
    tools: [tool("mcp:search", { type: "object", properties: { q: { type: "string" } } })],
    tool_choice: { type: "function", function: { name: "mcp:search" } },
  });
  const decl = env.request.tools![0].functionDeclarations![0].name;
  const allowed = env.request.toolConfig!.functionCallingConfig.allowedFunctionNames![0];
  assert.equal(allowed, decl, `allowed=${allowed} decl=${decl}`);
});

test("anyOf branch required must not clobber the parent's required", () => {
  const out = cleanSchema({
    type: "object",
    properties: {
      name: { type: "string" },
      mode: { type: "string" },
      extra: { type: "string" },
    },
    required: ["name", "extra"],
    anyOf: [{ required: ["mode"] }, { required: ["name"] }],
  });
  for (const field of ["name", "extra", "mode"]) {
    assert.ok(out.required?.includes(field), `required=${JSON.stringify(out.required)}`);
  }
});

test("oneOf branch properties must not replace the parent's properties", () => {
  const out = cleanSchema({
    type: "object",
    properties: { kind: { type: "string" }, a: { type: "string" } },
    oneOf: [{ properties: { b: { type: "string" } } }, { properties: { c: { type: "string" } } }],
  });
  for (const field of ["kind", "a", "b"]) {
    assert.ok(out.properties?.[field], JSON.stringify(out.properties));
  }
});

test("items only on array nodes; properties/required only on object nodes", () => {
  const out = cleanSchema({
    type: "object",
    properties: {
      a: { type: "string", items: { type: "string" } },
      b: { type: "string", properties: { x: { type: "string" } }, required: ["x"] },
      c: { type: ["string", "null"], items: { type: "string" } },
    },
  });
  const p = out.properties!;
  assert.equal(p.a.items, undefined, "a " + JSON.stringify(p.a));
  assert.equal(p.b.properties, undefined, "b " + JSON.stringify(p.b));
  assert.equal(p.b.required, undefined, "b " + JSON.stringify(p.b));
  assert.equal(p.c.items, undefined, "c " + JSON.stringify(p.c));
});

test("root tool parameters keep the Antigravity `reason` placeholder (guard)", () => {
  const out = toGemini({ tools: [tool("t")] });
  const params = out.tools![0].functionDeclarations![0].parameters!;
  assert.equal(params.properties?.reason?.type, "string", JSON.stringify(params));
});
