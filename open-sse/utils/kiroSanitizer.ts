/**
 * Kiro tool-schema sanitizer.
 *
 * Kiro / AWS CodeWhisperer rejects requests with HTTP 400 "Improperly formed
 * request" when a tool's `inputSchema.json` contains JSON-Schema keywords it
 * does not understand (`additionalProperties`, `anyOf`/`oneOf`/`allOf`/`not`,
 * `$ref`/`$defs`/`definitions`, `if`/`then`/`else`, etc.) or an empty
 * `required` array. It also rejects tool names longer than 64 characters.
 *
 * This pure helper flattens root `oneOf`/`anyOf`/`allOf` unions into a single
 * object schema (Kiro rejects them at the top level), strips the unsupported
 * keys recursively — never touching property NAMES inside `properties` /
 * `patternProperties`, which are user data — forces a top-level
 * `type: "object"` + `properties`, filters the top-level `required` to declared
 * properties and ensures it is present, and hash-truncates over-long names —
 * returning a `nameMap` (truncated → original) so the streamed tool-call name
 * can be mapped back for the client. See chatCore.ts (request wiring) and
 * translator/response/kiro-to-openai.ts (response reverse-mapping).
 */
import { createHash } from "node:crypto";

/** Max tool-name length Kiro accepts before it rejects the request. */
const MAX_TOOL_NAME_LENGTH = 64;

/** JSON-Schema keywords Kiro rejects anywhere in a tool schema. */
const STRIP_KEYS = new Set<string>([
  "additionalProperties",
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  "$schema",
  "$id",
  "$ref",
  "$defs",
  "definitions",
  "if",
  "then",
  "else",
  "unevaluatedProperties",
  "unevaluatedItems",
  "contentEncoding",
  "contentMediaType",
]);

/** Keys whose value is a map of user-chosen names → sub-schemas. */
const NAME_MAP_KEYS = new Set<string>(["properties", "patternProperties"]);

/** Root union keywords flattened into one object schema (in this order). */
const ROOT_UNION_KEYS = ["allOf", "oneOf", "anyOf"] as const;

type SchemaObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is SchemaObject {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Recursively drop unsupported JSON-Schema keys and empty `required` arrays.
 * Entries of `properties` / `patternProperties` maps keep their names (a
 * property literally called `if` or `$ref` is data, not a keyword); only their
 * sub-schemas are cleaned. Non-object/array values are returned untouched.
 */
function stripKeys(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(stripKeys);

  const cleaned: SchemaObject = {};
  for (const [key, val] of Object.entries(value as SchemaObject)) {
    if (NAME_MAP_KEYS.has(key) && isPlainObject(val)) {
      const entries: SchemaObject = {};
      for (const [name, subSchema] of Object.entries(val)) {
        entries[name] = stripKeys(subSchema);
      }
      cleaned[key] = entries;
      continue;
    }
    if (STRIP_KEYS.has(key)) continue;
    if (key === "required" && Array.isArray(val) && val.length === 0) continue;
    cleaned[key] = stripKeys(val);
  }
  return cleaned;
}

/**
 * Normalize a tool's root schema for Kiro.
 *
 * Root `allOf`/`oneOf`/`anyOf` are flattened before stripping (otherwise the
 * whole union would be discarded and the tool would expose no parameters):
 * branch `properties` are merged (first definition wins on conflict), `allOf`
 * contributes the union of branch `required`, `oneOf`/`anyOf` the intersection.
 * The result always has `type: "object"` and a `properties` object, and its
 * `required` only names declared properties (deduplicated). Nested unions below
 * the root are stripped by `stripKeys`, not flattened.
 */
function normalizeRootSchema(schema: SchemaObject): SchemaObject {
  const cleaned = flattenRootSchema(schema);
  const properties = cleaned.properties as SchemaObject;
  cleaned.required = [...new Set(cleaned.required as unknown[])].filter(
    (name): name is string => typeof name === "string" && Object.hasOwn(properties, name)
  );
  return cleaned;
}

/**
 * Flatten root unions (recursively into each branch) without filtering
 * `required`: a branch may require a name declared only by the root or a
 * sibling branch (`{ properties: { a }, allOf: [{ required: ["a"] }] }`), so
 * filtering happens once, on the fully merged schema, in normalizeRootSchema.
 */
function flattenRootSchema(schema: SchemaObject): SchemaObject {
  const source: SchemaObject = { ...schema };
  const rootBranches = new Map<string, unknown[]>();
  for (const keyword of ROOT_UNION_KEYS) {
    const branches = source[keyword];
    rootBranches.set(keyword, Array.isArray(branches) ? branches : []);
    delete source[keyword];
  }

  const cleaned = stripKeys(source) as SchemaObject;
  cleaned.type = "object";
  if (!isPlainObject(cleaned.properties)) {
    cleaned.properties = {};
  }
  const properties = cleaned.properties as SchemaObject;

  const required = new Set<unknown>(Array.isArray(cleaned.required) ? cleaned.required : []);
  for (const keyword of ROOT_UNION_KEYS) {
    const branches = (rootBranches.get(keyword) ?? []).map((branch) =>
      flattenRootSchema(isPlainObject(branch) ? branch : {})
    );
    if (branches.length === 0) continue;

    for (const branch of branches) {
      for (const [name, property] of Object.entries(branch.properties as SchemaObject)) {
        if (!Object.hasOwn(properties, name)) properties[name] = property;
      }
    }

    const branchRequired = branches.map(
      (branch) => (Array.isArray(branch.required) ? branch.required : []) as unknown[]
    );
    if (keyword === "allOf") {
      for (const names of branchRequired) names.forEach((name) => required.add(name));
    } else {
      const [first, ...rest] = branchRequired;
      for (const name of first) {
        if (rest.every((names) => names.includes(name))) required.add(name);
      }
    }
  }

  cleaned.required = [...required];
  return cleaned;
}

/** A single Kiro tool entry (loose shape — upstream payloads vary). */
type KiroTool = {
  toolSpecification?: {
    name?: string;
    inputSchema?: { json?: unknown };
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export interface SanitizeKiroToolsResult<T = unknown> {
  tools: T;
  /** Map of truncated tool name → original name, for response reverse-mapping. */
  nameMap: Map<string, string>;
}

/**
 * Sanitize a Kiro `tools` array in place-safely (returns new objects).
 *
 * - Flattens root `allOf`/`oneOf`/`anyOf` into one object schema.
 * - Strips JSON-Schema keys Kiro rejects from each `inputSchema.json`, keeping
 *   property names that happen to equal those keywords.
 * - Ensures the top-level schema carries `type: "object"`, `properties`, and a
 *   `required` array filtered to declared properties (`[]` when empty — Kiro
 *   requires the key).
 * - Hash-truncates tool names > 64 chars and records the mapping in `nameMap`.
 *
 * Inputs that are not arrays are returned untouched with an empty `nameMap`,
 * so this is safe to call unconditionally on the Kiro tools slot.
 */
export function sanitizeKiroTools<T>(tools: T): SanitizeKiroToolsResult<T> {
  const nameMap = new Map<string, string>();

  if (!tools || !Array.isArray(tools)) {
    return { tools, nameMap };
  }

  const sanitized = (tools as KiroTool[]).map((tool) => {
    const spec = tool?.toolSpecification;
    if (!spec) return tool;

    const originalName = spec.name;
    let name = originalName;
    if (typeof name === "string" && name.length > MAX_TOOL_NAME_LENGTH) {
      const hash = createHash("sha256").update(name).digest("hex").slice(0, 7);
      name = `${name.slice(0, 56)}_${hash}`;
      nameMap.set(name, originalName as string);
    }

    const schema = spec.inputSchema?.json;
    if (schema && typeof schema === "object" && !Array.isArray(schema)) {
      // normalizeRootSchema always emits a (possibly empty) top-level
      // `required` array — Kiro requires the key at the root.
      const cleaned = normalizeRootSchema(schema as SchemaObject);
      return {
        ...tool,
        toolSpecification: {
          ...spec,
          name,
          inputSchema: { json: cleaned },
        },
      };
    }

    return {
      ...tool,
      toolSpecification: { ...spec, name },
    };
  });

  return { tools: sanitized as T, nameMap };
}
