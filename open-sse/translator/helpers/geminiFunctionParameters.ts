// Gemini `FunctionDeclaration` carries its argument schema in one of two fields:
//   - `parameters`           — the OpenAPI-subset `Schema` object (original field)
//   - `parametersJsonSchema` — plain JSON Schema (newer field; sent e.g. by Antigravity CLI)
// The API treats them as mutually exclusive. Translators that only read `parameters` turn a
// `parametersJsonSchema`-only declaration into an empty schema, so the model never sees the
// arguments and fills them wrongly.
//
// When both are present `parameters` wins: it is what these translators always used, so
// existing clients keep exactly the same output. `parametersJsonSchema` is returned as-is
// (same reference, never mutated) — it is already standard JSON Schema, which is what OpenAI
// function `parameters` expect, so `$defs`, `anyOf`, `additionalProperties` etc. survive.
//
// https://ai.google.dev/api/caching#FunctionDeclaration
export function geminiFunctionParameters(declaration: unknown): unknown {
  if (!declaration || typeof declaration !== "object") return undefined;
  const { parameters, parametersJsonSchema } = declaration as {
    parameters?: unknown;
    parametersJsonSchema?: unknown;
  };
  return parameters ?? parametersJsonSchema ?? undefined;
}

// Same split for structured output: `generationConfig.responseSchema` (OpenAPI-subset) vs
// `generationConfig.responseJsonSchema` (plain JSON Schema). Same precedence and reasoning.
//
// https://ai.google.dev/api/generate-content#generationconfig
export function geminiResponseSchema(generationConfig: unknown): unknown {
  if (!generationConfig || typeof generationConfig !== "object") return undefined;
  const { responseSchema, responseJsonSchema } = generationConfig as {
    responseSchema?: unknown;
    responseJsonSchema?: unknown;
  };
  return responseSchema ?? responseJsonSchema ?? undefined;
}
