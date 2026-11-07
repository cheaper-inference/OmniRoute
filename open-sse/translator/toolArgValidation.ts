/**
 * JSON-schema validation for emulated tool calls.
 *
 * Web-UI providers (DeepSeek Web, Cloudflare Playground, ...) have no native
 * function calling, so a tool call is whatever the model prints in its reply —
 * nothing upstream checks that the arguments match the schema the client
 * declared. Validating before the call reaches the client is what stops a
 * hallucinated parameter name (or a replayed envelope from an earlier turn)
 * from being executed against the user's machine.
 *
 * Extracted from `deepseekWebToolBinding.ts`, which re-exports the same names so
 * its public surface is unchanged.
 */
import Ajv2020, { type ValidateFunction } from "ajv/dist/2020.js";

/** OpenAI tool definition (subset we care about). */
export interface OpenAIToolDef {
  type?: string;
  function?: { name?: string; description?: string; parameters?: unknown };
}

const ajv = new Ajv2020({ strict: false, allErrors: false, validateFormats: false });
const toolValidatorCache = new WeakMap<object, Map<string, ValidateFunction | null>>();

export function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function requestedToolDefinition(requestedTools: unknown, name: string): OpenAIToolDef | null {
  if (!Array.isArray(requestedTools)) return null;
  return (requestedTools as OpenAIToolDef[]).find((tool) => tool?.function?.name === name) ?? null;
}

/**
 * Validate `args` against the JSON schema declared for tool `name`.
 *
 * Returns `false` when the tool is not in the request, when its schema cannot be
 * compiled, or when the arguments do not satisfy it. A tool with no declared
 * parameters accepts anything.
 *
 * Compiled validators are cached per request (WeakMap on the tools array) — the
 * same `tools` object flows from serialization to parsing, so a session compiles
 * each tool schema once.
 */
export function validateToolArguments(
  requestedTools: unknown,
  name: string,
  args: Record<string, unknown>
): boolean {
  const definition = requestedToolDefinition(requestedTools, name);
  if (!definition) return false;
  const schema = definition.function?.parameters;
  if (schema === undefined) return true;
  if ((typeof schema !== "object" || schema === null) && typeof schema !== "boolean") return false;

  let validators = toolValidatorCache.get(requestedTools as object);
  if (!validators) {
    validators = new Map();
    toolValidatorCache.set(requestedTools as object, validators);
  }
  let validate = validators.get(name);
  if (validate === undefined) {
    try {
      validate = ajv.compile(schema as object | boolean);
    } catch {
      validate = null;
    }
    validators.set(name, validate);
  }
  return validate ? validate(args) === true : false;
}
