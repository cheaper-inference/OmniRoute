/**
 * Coerce tool-schema value *shapes* that are legal (or tolerated) JSON Schema
 * but are not Schema objects, which Gemini's Schema proto and the Codex /
 * OpenAI Responses validator both reject. MCP tool servers and skill
 * generators emit them routinely, and one offending tool fails the whole
 * request on every account:
 *
 *   properties: { value: "object" }       bare type name where a Schema belongs
 *   properties: ["a", { name: "b", … }]   list instead of a name -> schema map
 *   items: "string" / anyOf: ["integer"]  shorthand string sub-schemas
 *   items: [{…}, {…}]                     tuple validation; `items` must be one Schema
 *
 * Copy-on-write: returns the original reference when nothing changed, and
 * never mutates its input. Data-valued keywords (`default`, `enum`, …) and
 * vendor extensions are never walked, so their contents are left alone.
 */

type JsonRecord = Record<string, unknown>;

export interface SchemaValueShapeOptions {
  /**
   * Keep `true` / `false` boolean schemas. OpenAI/Codex accept them; Gemini's
   * proto does not, so there a boolean property degrades to a string schema
   * and a boolean `items` (or other single slot) is dropped. Default: true.
   */
  allowBooleanSchemas?: boolean;
  /**
   * Keep an unrecognised bare type name (`"int32"`, `"dict"`) as `{ type }`
   * for a later pass to map. Default: false — it degrades to `"string"`.
   */
  keepUnknownTypeNames?: boolean;
}

type ShapeOptions = Required<SchemaValueShapeOptions>;

const DROP = Symbol("drop");

const JSON_SCHEMA_TYPE_NAMES = new Set([
  "string",
  "number",
  "integer",
  "boolean",
  "array",
  "object",
  "null",
]);

// Keywords whose value is data, not a schema — never walked.
const DATA_KEYWORDS = new Set(["default", "enum", "const", "examples", "example", "required"]);

// Keys whose value is a map of name -> schema (the keys are names, not keywords).
const SCHEMA_MAP_KEYWORDS = new Set([
  "$defs",
  "definitions",
  "patternProperties",
  "dependentSchemas",
]);

const SCHEMA_LIST_KEYWORDS = new Set(["anyOf", "oneOf", "allOf", "prefixItems"]);

const SINGLE_SCHEMA_KEYWORDS = new Set([
  "additionalProperties",
  "unevaluatedProperties",
  "propertyNames",
  "contains",
  "not",
  "if",
  "then",
  "else",
  "additionalItems",
  "unevaluatedItems",
  "contentSchema",
]);

function isPlainObject(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// A bare type name used where a Schema is expected means "any value of this type".
function schemaFromTypeName(value: string, options: ShapeOptions): JsonRecord {
  const hint = value.trim();
  const lower = hint.toLowerCase();
  if (JSON_SCHEMA_TYPE_NAMES.has(lower)) return { type: lower };
  return { type: options.keepUnknownTypeNames && hint ? hint : "string" };
}

// Same scoring as the Gemini anyOf/oneOf flattener: prefer object > array > typed.
function selectMostInformative(variants: JsonRecord[]): JsonRecord {
  let best = variants[0];
  let bestScore = -1;
  for (const variant of variants) {
    let score = 0;
    if (variant.type === "object" || variant.properties) score = 3;
    else if (variant.type === "array" || variant.items) score = 2;
    else if (variant.type && variant.type !== "null") score = 1;
    if (score > bestScore) {
      bestScore = score;
      best = variant;
    }
  }
  return best;
}

/**
 * Coerce one value sitting in a schema position. In a map (`properties`,
 * `$defs`, …) an unusable value degrades to a string schema so the entry stays
 * usable; in a single slot it is dropped.
 */
function coerceSchemaPosition(value: unknown, options: ShapeOptions, inMap: boolean): unknown {
  if (isPlainObject(value)) return coerceSchemaNode(value, options);
  if (typeof value === "string") return schemaFromTypeName(value, options);
  if (typeof value === "boolean" && options.allowBooleanSchemas) return value;
  return inMap ? { type: "string" } : DROP;
}

function coerceSchemaMap(map: JsonRecord, options: ShapeOptions): JsonRecord {
  let next: JsonRecord | null = null;
  for (const [name, value] of Object.entries(map)) {
    const coerced = coerceSchemaPosition(value, options, true);
    if (coerced === value) continue;
    next ??= { ...map };
    next[name] = coerced;
  }
  return next ?? map;
}

// `["a", { name: "b", type: "integer" }]` -> `{ a: { type: "string" }, b: { type: "integer" } }`
function propertiesListToMap(list: unknown[]): JsonRecord {
  const map: JsonRecord = {};
  for (const entry of list) {
    if (typeof entry === "string" && entry.trim()) {
      map[entry.trim()] = { type: "string" };
    } else if (isPlainObject(entry) && typeof entry.name === "string" && entry.name.trim()) {
      const { name, ...schema } = entry;
      map[(name as string).trim()] = schema;
    }
  }
  return map;
}

function coerceProperties(value: unknown, options: ShapeOptions): unknown {
  if (Array.isArray(value)) return coerceSchemaMap(propertiesListToMap(value), options);
  return isPlainObject(value) ? coerceSchemaMap(value, options) : value;
}

function coerceItems(value: unknown, options: ShapeOptions): unknown {
  if (!Array.isArray(value)) return coerceSchemaPosition(value, options, false);
  // Tuple validation: neither Gemini nor Codex can express positional items.
  const variants = value
    .map((entry) => (typeof entry === "string" ? schemaFromTypeName(entry, options) : entry))
    .filter(isPlainObject);
  if (variants.length === 0) return DROP;
  return coerceSchemaNode(selectMostInformative(variants), options);
}

function coerceSchemaList(list: unknown[], options: ShapeOptions): unknown[] {
  let changed = false;
  const next = list.map((entry) => {
    let coerced: unknown = entry;
    if (typeof entry === "string") coerced = schemaFromTypeName(entry, options);
    else if (isPlainObject(entry)) coerced = coerceSchemaNode(entry, options);
    if (coerced !== entry) changed = true;
    return coerced;
  });
  return changed ? next : list;
}

function coerceEntry(key: string, value: unknown, options: ShapeOptions): unknown {
  if (DATA_KEYWORDS.has(key) || key.startsWith("x-")) return value;
  if (key === "properties") return coerceProperties(value, options);
  if (key === "items") return coerceItems(value, options);
  if (SCHEMA_MAP_KEYWORDS.has(key)) {
    return isPlainObject(value) ? coerceSchemaMap(value, options) : value;
  }
  if (SCHEMA_LIST_KEYWORDS.has(key)) {
    return Array.isArray(value) ? coerceSchemaList(value, options) : value;
  }
  if (SINGLE_SCHEMA_KEYWORDS.has(key)) return coerceSchemaPosition(value, options, false);
  return value;
}

function coerceSchemaNode(node: JsonRecord, options: ShapeOptions): JsonRecord {
  let next: JsonRecord | null = null;
  for (const [key, value] of Object.entries(node)) {
    const coerced = coerceEntry(key, value, options);
    if (coerced === value) continue;
    next ??= { ...node };
    if (coerced === DROP) delete next[key];
    else next[key] = coerced;
  }
  return next ?? node;
}

/**
 * Coerce non-object schema shapes in a tool `parameters` schema. Returns the
 * same reference when the schema is already compatible.
 */
export function coerceSchemaValueShapes(
  schema: unknown,
  options: SchemaValueShapeOptions = {}
): unknown {
  if (!isPlainObject(schema)) return schema;
  return coerceSchemaNode(schema, {
    allowBooleanSchemas: options.allowBooleanSchemas ?? true,
    keepUnknownTypeNames: options.keepUnknownTypeNames ?? false,
  });
}
