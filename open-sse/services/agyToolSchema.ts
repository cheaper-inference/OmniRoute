/**
 * agyToolSchema.ts — JSON Schema normalization for the `agy acp` transport.
 *
 * agy validates every tool parameter schema against the JSON Schema 2020-12
 * metaschema using Go's `regexp` (RE2), and its ACP -> CloudCode translator
 * silently drops several constructs. A schema it cannot compile aborts the
 * whole turn ("building toolbox") before any model call ever happens.
 *
 * Three ports from magpie-community/plugins packages/agy-cli live here, in the
 * order agy itself runs them:
 *
 *   1. expandToolSchema   (tool-schema.mjs) — inline `$ref` into `$defs` /
 *      `definitions`, `allOf`, the object/primitive `anyOf`/`oneOf` unions,
 *      `const` discriminators, `additionalProperties` dictionaries and boolean
 *      schemas, with recursion/depth/budget guards.
 *   2. sanitizePatternFields (re2-pattern.mjs) — translate the Unicode escapes
 *      RE2 can express, then drop any pattern whose RE2 meaning differs from
 *      ECMA-262 into a description hint instead of failing the turn.
 *   3. ensureGeminiArrayItems (array-items.mjs) — fill a sibling `items` on
 *      every array schema, which Gemini rejects with `items: missing field`.
 *
 * fitTools (tool-budget.mjs) is separate: agy holds every tool it loads in one
 * 20,000-token customization budget and drops whole tools past it, so the
 * descriptions are trimmed instead and every tool survives.
 */

const NUMBER_BOUNDS = [
  "minimum",
  "maximum",
  "minLength",
  "maxLength",
  "minItems",
  "maxItems",
  "minProperties",
  "maxProperties",
] as const;
const CONTAINER_MAPS = ["properties", "patternProperties", "dependentSchemas"] as const;
const BOOLEAN_OR_SCHEMA_CHILDREN = [
  "additionalProperties",
  "unevaluatedProperties",
  "unevaluatedItems",
] as const;
const SCHEMA_ONLY_CHILDREN = ["propertyNames", "contains", "if", "then", "else", "not"] as const;
const VISITED_OBJECT_KEYS = new Set<string>([
  ...CONTAINER_MAPS,
  ...BOOLEAN_OR_SCHEMA_CHILDREN,
  ...SCHEMA_ONLY_CHILDREN,
  "prefixItems",
  "items",
  "anyOf",
  "oneOf",
]);
const POINTER_MAP_KEYWORDS = new Set([
  "properties",
  "patternProperties",
  "dependentSchemas",
  "$defs",
  "definitions",
]);

const MAX_INLINED_NODES = 8192;
const MAX_INLINED_BYTES = 256 * 1024;
const MAX_DEPTH = 64;
const MAX_VARIANT_HINT_CHARS = 1600;
const MAX_VARIANT_SUMMARY_CHARS = 240;
const MAX_VARIANT_DESCRIPTION_CHARS = 80;

const ANY_VALUE_HINT = "Accepts any JSON value.";
const NO_VALUE_HINT = "No value is allowed by the original schema.";
const NULL_HINT = "Must be null.";
const RECURSIVE_HINT = "Recursive schema; follow the tool's original argument contract.";
const LIMIT_HINT = "Schema expansion limit reached; follow the tool's original argument contract.";

type JsonSchema = Record<string, unknown>;

const isObject = (value: unknown): value is JsonSchema =>
  value !== null && typeof value === "object" && !Array.isArray(value);

function appendHint(node: JsonSchema, hint: string | null | undefined): void {
  if (!hint) return;
  if (typeof node.description === "string" && node.description.trim()) {
    if (!node.description.includes(hint)) node.description = `${node.description} (${hint})`;
  } else {
    node.description = hint;
  }
}

function clip(text: string, max: number): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 3).trimEnd()}...` : flat;
}

function scalarBytes(value: unknown): number {
  if (typeof value === "string") return Buffer.byteLength(value) + 2;
  if (typeof value === "number" || typeof value === "boolean") return String(value).length;
  return 4;
}

function ownBytes(out: JsonSchema): number {
  let bytes = 2;
  for (const [key, value] of Object.entries(out)) {
    if (value === undefined) continue;
    bytes += Buffer.byteLength(key) + 4;
    if (value === null || typeof value !== "object") {
      bytes += scalarBytes(value);
    } else if (key === "properties" || key === "patternProperties" || key === "dependentSchemas") {
      bytes += 2;
      for (const mapKey of Object.keys(value as object)) bytes += Buffer.byteLength(mapKey) + 4;
    } else if (VISITED_OBJECT_KEYS.has(key)) {
      bytes += 2;
    } else if (
      Array.isArray(value) &&
      value.every((item) => item === null || typeof item !== "object")
    ) {
      bytes += 2;
      for (const item of value) bytes += scalarBytes(item) + 1;
    } else {
      bytes += Buffer.byteLength(JSON.stringify(value));
    }
  }
  return bytes;
}

function resolvePointer(root: JsonSchema, ref: string): unknown {
  if (ref === "#") return root;
  if (!ref.startsWith("#/")) return undefined;
  let parts: string[];
  try {
    parts = decodeURIComponent(ref.slice(2)).split("/");
  } catch {
    return undefined;
  }
  let target: unknown = root;
  let inMap = false;
  for (const part of parts) {
    const key = part.replace(/~1/g, "/").replace(/~0/g, "~");
    if ((!isObject(target) && !Array.isArray(target)) || !Object.hasOwn(target, key))
      return undefined;
    const entersMap = !inMap && isObject(target) && POINTER_MAP_KEYWORDS.has(key);
    target = (target as Record<string, unknown>)[key];
    inMap = entersMap;
  }
  if (inMap) return undefined;
  return isObject(target) || typeof target === "boolean" ? target : undefined;
}

function isNullType(type: unknown): boolean {
  return type === "null" || (Array.isArray(type) && type.length === 1 && type[0] === "null");
}

/** Whether a node's `type` list admits null. */
function isNullableType(schema: unknown): boolean {
  if (!isObject(schema)) return false;
  return Array.isArray(schema.type) && schema.type.includes("null");
}

function isNullSchema(schema: unknown): boolean {
  if (!isObject(schema)) return false;
  if (isNullType(schema.type)) return true;
  return (
    schema.type === undefined &&
    typeof schema.description === "string" &&
    schema.description.includes(NULL_HINT) &&
    schema.properties === undefined &&
    schema.items === undefined &&
    schema.enum === undefined &&
    schema.const === undefined &&
    schema.anyOf === undefined &&
    schema.oneOf === undefined
  );
}

function declaresArray(schema: unknown): boolean {
  if (!isObject(schema)) return false;
  return schema.type === "array" || (Array.isArray(schema.type) && schema.type.includes("array"));
}

function isObjectBranch(schema: unknown): boolean {
  if (!isObject(schema)) return false;
  if (schema.type === "object") return true;
  if (
    Array.isArray(schema.type) &&
    schema.type.includes("object") &&
    schema.type.every((t) => t === "object" || t === "null")
  ) {
    return true;
  }
  if (schema.type !== undefined) return false;
  return (
    isObject(schema.properties) ||
    Array.isArray(schema.required) ||
    schema.additionalProperties !== undefined ||
    isObject(schema.patternProperties)
  );
}

function primitiveTypeOf(schema: unknown): string | null {
  if (!isObject(schema)) return null;
  const raw =
    typeof schema.type === "string"
      ? [schema.type]
      : Array.isArray(schema.type)
        ? schema.type.filter((t) => t !== "null")
        : [];
  if (raw.length !== 1) return null;
  const t = raw[0];
  return t === "string" || t === "number" || t === "integer" || t === "boolean" ? t : null;
}

function structuralFallback(schema: unknown, hint: string): JsonSchema {
  const nullable = isObject(schema) && Array.isArray(schema.type) && schema.type.includes("null");
  const withNull = (t: string): string | string[] => (nullable ? [t, "null"] : t);
  if (isObjectBranch(schema)) return { type: withNull("object"), description: hint };
  if (declaresArray(schema)) return { type: withNull("array"), description: hint };
  const prim = primitiveTypeOf(schema);
  if (prim) return { type: withNull(prim), description: hint };
  return { description: hint };
}

function summarizeSchema(schema: unknown, depth = 0): string {
  if (!isObject(schema)) return schema === false ? "never" : "any";
  if (Array.isArray(schema.enum) && schema.enum.length) {
    const shown = schema.enum
      .slice(0, 12)
      .map((v) => JSON.stringify(v))
      .join(" | ");
    return schema.enum.length > 12 ? `${shown} | ...` : shown;
  }
  if (schema.const !== undefined) return JSON.stringify(schema.const);
  const types = Array.isArray(schema.type)
    ? schema.type
    : typeof schema.type === "string"
      ? [schema.type]
      : [];
  const rawType = types.length ? types.join("|") : undefined;
  const nullable = types.includes("null");
  const nonNullTypes = types.filter((t) => t !== "null");
  if (
    (!rawType || (nonNullTypes.length === 1 && nonNullTypes[0] === "object")) &&
    isObject(schema.properties)
  ) {
    if (depth >= 2) return rawType || "object";
    const req = new Set(Array.isArray(schema.required) ? schema.required : []);
    const entries = Object.entries(schema.properties);
    const shown = entries
      .slice(0, 8)
      .map(([k, v]) => `${k}${req.has(k) ? "" : "?"}: ${summarizeSchema(v, depth + 1)}`);
    if (entries.length > 8) shown.push("...");
    const body = `{ ${shown.join(", ")} }`;
    return nullable ? `${body} | null` : body;
  }
  if (
    (!rawType || rawType === "object") &&
    Array.isArray(schema.required) &&
    schema.required.length
  ) {
    return `{ required: [${schema.required.join(", ")}] }`;
  }
  if (
    (nonNullTypes.length === 1 && nonNullTypes[0] === "array") ||
    (!rawType && isObject(schema.items))
  ) {
    if (depth >= 2 || !isObject(schema.items)) return rawType || "array";
    const body = `array<${summarizeSchema(schema.items, depth + 1)}>`;
    return nullable ? `${body} | null` : body;
  }
  const combo = Array.isArray(schema.anyOf)
    ? schema.anyOf
    : Array.isArray(schema.oneOf)
      ? schema.oneOf
      : null;
  if (combo && combo.length) {
    if (depth >= 2) return "union";
    const shown = combo
      .slice(0, 6)
      .map((b) => summarizeSchema(b, depth + 1))
      .join(" | ");
    return combo.length > 6 ? `${shown} | ...` : shown;
  }
  return rawType || "any";
}

function typeList(type: unknown): string[] | null {
  if (typeof type === "string") return [type];
  if (Array.isArray(type)) return type.filter((t): t is string => typeof t === "string");
  return null;
}

function intersectTypes(a: unknown, b: unknown): { type: unknown; conflict?: boolean } {
  const left = typeList(a);
  const right = typeList(b);
  if (!left || !left.length) return { type: b };
  if (!right || !right.length) return { type: a };
  const common = new Set<string>();
  for (const t of left) {
    if (right.includes(t)) common.add(t);
    else if (
      (t === "number" && right.includes("integer")) ||
      (t === "integer" && right.includes("number"))
    ) {
      common.add("integer");
    }
  }
  if (!common.size) return { type: a, conflict: true };
  const nonNull = [...common].filter((t) => t !== "null");
  const list = common.has("null") ? [...nonNull, "null"] : nonNull;
  return { type: list.length === 1 ? list[0] : list };
}

function intersectSchemas(schemas: unknown[]): JsonSchema {
  const meaningful = schemas.filter(
    (schema): schema is JsonSchema => isObject(schema) && Object.keys(schema).length > 0
  );
  if (!meaningful.length) return {};
  if (meaningful.length === 1) return { ...meaningful[0] };
  const out: JsonSchema = { ...meaningful[0] };
  const conflicts: string[] = [];
  for (const schema of meaningful.slice(1)) {
    appendHint(out, typeof schema.description === "string" ? schema.description : undefined);
    for (const [key, value] of Object.entries(schema)) {
      if (
        key === "description" ||
        key === "properties" ||
        key === "required" ||
        key === "items" ||
        key === "enum" ||
        key === "type" ||
        (NUMBER_BOUNDS as readonly string[]).includes(key)
      ) {
        continue;
      }
      if (out[key] === undefined) out[key] = value;
    }
    if (schema.type !== undefined) {
      const merged = intersectTypes(out.type, schema.type);
      if (merged.conflict) {
        conflicts.push(
          `${(typeList(out.type) ?? []).join("|")} vs ${(typeList(schema.type) ?? []).join("|")}`
        );
      }
      out.type = merged.type;
    }
  }
  for (const conflict of conflicts)
    appendHint(out, `Conflicting type constraints in allOf: ${conflict}.`);
  const objects = meaningful.filter((schema) => isObject(schema.properties));
  if (objects.length) {
    const keys = [
      ...new Set(objects.flatMap((schema) => Object.keys(schema.properties as object))),
    ];
    out.properties = Object.fromEntries(
      keys.map((key) => [
        key,
        intersectSchemas(
          objects
            .filter((schema) => Object.hasOwn(schema.properties as object, key))
            .map((schema) => (schema.properties as JsonSchema)[key])
        ),
      ])
    );
    out.type ??= "object";
  }
  const reqKeys = [
    ...new Set(
      meaningful.flatMap((schema) =>
        Array.isArray(schema.required) ? (schema.required as string[]) : []
      )
    ),
  ];
  if (reqKeys.length) {
    out.required = reqKeys;
    out.type ??= "object";
  }
  const arrays = meaningful.filter((schema) => isObject(schema.items));
  if (arrays.length) {
    out.items = intersectSchemas(arrays.map((schema) => schema.items));
    out.type ??= "array";
  }
  for (const key of NUMBER_BOUNDS) {
    const values = meaningful
      .map((schema) => schema[key])
      .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
    if (!values.length) continue;
    const lower = key === "minimum" || key.startsWith("min");
    out[key] = (lower ? Math.max : Math.min)(...values);
  }
  const enums = meaningful.filter((schema) => Array.isArray(schema.enum));
  if (enums.length) {
    const first = enums[0].enum as unknown[];
    const common = first.filter((value) =>
      enums.every((schema) => (schema.enum as unknown[]).includes(value))
    );
    if (common.length) {
      out.enum = [...new Set(common)];
    } else {
      delete out.enum;
      appendHint(out, "Conflicting enum constraints in allOf.");
    }
  }
  return out;
}

function primitiveFamily(nonNull: JsonSchema[]): string | null {
  const types = new Set<string>();
  for (const branch of nonNull) {
    const t = primitiveTypeOf(branch);
    if (!t) return null;
    types.add(t);
  }
  if (types.size === 1) return [...types][0];
  if (types.size === 2 && types.has("number") && types.has("integer")) return "number";
  return null;
}

function branchLiterals(branch: JsonSchema): unknown[] | null {
  if (Array.isArray(branch.enum) && branch.enum.length > 0) return branch.enum;
  if (branch.const !== undefined && branch.const !== null) return [branch.const];
  return null;
}

function unionPrimitiveBranches(
  nonNull: JsonSchema[],
  family: string,
  hasNull: boolean
): JsonSchema {
  const out: JsonSchema = { type: hasNull ? [family, "null"] : family };
  const descriptions = [
    ...new Set(
      nonNull
        .map((b) => (typeof b.description === "string" ? b.description.trim() : ""))
        .filter(Boolean)
    ),
  ];
  if (descriptions.length) out.description = descriptions.slice(0, 3).join("; ");

  const literals = nonNull.map(branchLiterals);
  if (literals.every(Boolean)) {
    const values = [...new Set((literals as unknown[][]).flat().filter((v) => v !== null))];
    out.enum = hasNull ? [...values, null] : values;
  } else if (literals.some(Boolean)) {
    const known = [...new Set((literals.filter(Boolean) as unknown[][]).flat())]
      .slice(0, 12)
      .map((v) => JSON.stringify(v))
      .join(", ");
    appendHint(out, `Known values include: ${known}`);
  }

  for (const key of NUMBER_BOUNDS) {
    if (!nonNull.every((b) => typeof b[key] === "number" && Number.isFinite(b[key]))) continue;
    const values = nonNull.map((b) => b[key] as number);
    const lower = key === "minimum" || key.startsWith("min");
    out[key] = (lower ? Math.min : Math.max)(...values);
  }
  const formats = [
    ...new Set(nonNull.map((b) => b.format).filter((f) => typeof f === "string" && f)),
  ];
  if (formats.length === 1 && nonNull.every((b) => b.format === formats[0]))
    out.format = formats[0];
  const patterns = [
    ...new Set(nonNull.map((b) => b.pattern).filter((p) => typeof p === "string" && p)),
  ];
  if (patterns.length === 1 && nonNull.every((b) => b.pattern === patterns[0]))
    out.pattern = patterns[0];

  return out;
}

function unionPropertySchemas(schemas: unknown[]): JsonSchema {
  const meaningful = schemas.filter(isObject);
  if (!meaningful.length) return {};
  if (meaningful.length === 1) return { ...meaningful[0] };
  const nonNull = meaningful.filter((b) => !isNullSchema(b));
  const hasNull =
    nonNull.length < meaningful.length ||
    meaningful.some((b) => Array.isArray(b.type) && b.type.includes("null"));
  if (!nonNull.length) return { description: NULL_HINT };
  if (nonNull.every(isObjectBranch)) return unionObjectBranches(nonNull, hasNull);
  const family = primitiveFamily(nonNull);
  if (family) return unionPrimitiveBranches(nonNull, family, hasNull);
  return {
    anyOf: meaningful,
    description: `Accepts anyOf: ${meaningful.map((b) => summarizeSchema(b)).join(" | ")}`,
  };
}

function variantsHint(branches: JsonSchema[]): string {
  const parts: string[] = [];
  let length = 0;
  for (let i = 0; i < branches.length; i++) {
    const branch = branches[i];
    let part = clip(summarizeSchema(branch, 1), MAX_VARIANT_SUMMARY_CHARS);
    if (typeof branch.description === "string" && branch.description.trim()) {
      part += ` (${clip(branch.description, MAX_VARIANT_DESCRIPTION_CHARS)})`;
    }
    if (parts.length && length + part.length + 3 > MAX_VARIANT_HINT_CHARS) {
      parts.push(`... (+${branches.length - i} more)`);
      break;
    }
    parts.push(part);
    length += part.length + 3;
  }
  return `Variants: ${parts.join(" | ")}`;
}

function unionObjectBranches(nonNull: JsonSchema[], hasNull: boolean): JsonSchema {
  const out: JsonSchema = { type: hasNull ? ["object", "null"] : "object" };
  if (
    nonNull.length === 1 &&
    typeof nonNull[0].description === "string" &&
    nonNull[0].description.trim()
  ) {
    out.description = nonNull[0].description;
  }
  const propKeys = [
    ...new Set(nonNull.flatMap((b) => (isObject(b.properties) ? Object.keys(b.properties) : []))),
  ];
  if (propKeys.length) {
    out.properties = Object.fromEntries(
      propKeys.map((key) => [
        key,
        unionPropertySchemas(
          nonNull
            .filter((b) => isObject(b.properties) && Object.hasOwn(b.properties, key))
            .map((b) => (b.properties as JsonSchema)[key])
        ),
      ])
    );
  }
  const reqSets = nonNull.map(
    (b) => new Set(Array.isArray(b.required) ? (b.required as string[]) : [])
  );
  const commonReq = [...reqSets[0]].filter((key) => reqSets.every((set) => set.has(key)));
  if (commonReq.length) out.required = commonReq;

  if (nonNull.some((b) => b.additionalProperties === true)) {
    out.additionalProperties = true;
  } else if (nonNull.some((b) => isObject(b.additionalProperties))) {
    out.additionalProperties = unionPropertySchemas(
      nonNull.filter((b) => isObject(b.additionalProperties)).map((b) => b.additionalProperties)
    );
  } else if (nonNull.every((b) => b.additionalProperties === false)) {
    out.additionalProperties = false;
  }

  if (nonNull.length > 1) appendHint(out, variantsHint(nonNull));
  return out;
}

function lowerUnionKey(out: JsonSchema, key: "oneOf" | "anyOf"): JsonSchema {
  const branches = out[key];
  if (!Array.isArray(branches)) return out;
  if (!branches.length) {
    delete out[key];
    return out;
  }
  const nonNull = branches.filter((b) => !isNullSchema(b));
  const hasNull = nonNull.length < branches.length || branches.some((b) => isNullableType(b));

  if (!nonNull.length) {
    delete out[key];
    if (isNullType(out.type)) delete out.type;
    appendHint(out, NULL_HINT);
    return out;
  }

  if (declaresArray(out) || nonNull.some(declaresArray)) {
    if (key === "oneOf") {
      out.anyOf = Array.isArray(out.anyOf) ? [...(out.anyOf as unknown[]), ...branches] : branches;
      delete out.oneOf;
    }
    if (!declaresArray(out)) {
      appendHint(out, `Accepts anyOf: ${branches.map((b) => summarizeSchema(b)).join(" | ")}`);
    }
    return out;
  }

  if (nonNull.every(isObjectBranch)) {
    const rest = { ...out };
    delete rest[key];
    return intersectSchemas([rest, unionObjectBranches(nonNull, hasNull)]);
  }

  const family = primitiveFamily(nonNull);
  if (family) {
    const rest = { ...out };
    delete rest[key];
    return intersectSchemas([rest, unionPrimitiveBranches(nonNull, family, hasNull)]);
  }

  if (key === "oneOf") {
    out.anyOf = Array.isArray(out.anyOf) ? [...(out.anyOf as unknown[]), ...branches] : branches;
    delete out.oneOf;
  }
  appendHint(out, `Accepts anyOf: ${branches.map((b) => summarizeSchema(b)).join(" | ")}`);
  return out;
}

function constConflict(out: JsonSchema): void {
  if (!Array.isArray(out.enum)) return;
  if (!out.enum.includes(out.const)) {
    appendHint(
      out,
      `Conflicting const and enum constraints; const is ${JSON.stringify(out.const)}.`
    );
  }
  delete out.enum;
}

function lowerConst(out: JsonSchema): void {
  const value = out.const;
  if (value === null) {
    delete out.const;
    if (isNullType(out.type)) delete out.type;
    appendHint(out, NULL_HINT);
    return;
  }
  if (typeof value === "string") {
    const types = typeList(out.type);
    if (types && !types.every((t) => t === "string" || t === "null")) return;
    out.type = "string";
    if (!value.length) {
      constConflict(out);
      return;
    }
    if (Array.isArray(out.enum) && !out.enum.includes(value)) {
      appendHint(out, `Conflicting const and enum constraints; const is ${JSON.stringify(value)}.`);
    }
    out.enum = [value];
    delete out.const;
    return;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    out.type ??= Number.isInteger(value) ? "integer" : "number";
    constConflict(out);
  } else if (typeof value === "boolean") {
    out.type ??= "boolean";
    constConflict(out);
  } else if (Array.isArray(value)) {
    out.type ??= "array";
  } else if (isObject(value)) {
    out.type ??= "object";
  }
}

export function expandToolSchema(root: unknown): unknown {
  if (!isObject(root)) return root;
  // Captured after the narrowing: TypeScript does not keep a narrowed
  // parameter type inside the closures below.
  const rootSchema: JsonSchema = root;

  const cache = new Map<
    object,
    { schema: unknown; weight: number; bytes: number; height: number }
  >();
  let produced = 0;
  let producedBytes = 0;
  let inlined = 0;
  let inlinedBytes = 0;
  let limits = 0;
  let deepest = 0;

  function limit(schema: unknown, hint: string): JsonSchema {
    const out = structuralFallback(schema, hint);
    limits++;
    produced++;
    producedBytes += ownBytes(out);
    return out;
  }

  function measure<T extends JsonSchema>(
    inlineDepth: number,
    fn: () => T
  ): {
    schema: T;
    weight: number;
    bytes: number;
    nested: number;
    nestedBytes: number;
    limited: boolean;
    height: number;
  } {
    const start = { produced, producedBytes, inlined, inlinedBytes, limits, deepest };
    deepest = inlineDepth;
    const schema = fn();
    const result = {
      schema,
      weight: produced - start.produced,
      bytes: producedBytes - start.producedBytes,
      nested: inlined - start.inlined,
      nestedBytes: inlinedBytes - start.inlinedBytes,
      limited: limits !== start.limits,
      height: deepest - inlineDepth,
    };
    deepest = Math.max(start.deepest, deepest);
    inlined += Math.max(0, result.weight - result.nested);
    inlinedBytes += Math.max(0, result.bytes - result.nestedBytes);
    return result;
  }

  function expandRef(target: unknown, inlineDepth: number, active: Set<object>): JsonSchema {
    if (typeof target === "boolean") return visit(target, inlineDepth, active);
    const key = isObject(target) ? target : null;
    if (inlined >= MAX_INLINED_NODES || inlinedBytes >= MAX_INLINED_BYTES)
      return limit(target, LIMIT_HINT);
    const hit = key ? cache.get(key) : undefined;
    if (hit && inlineDepth + hit.height <= MAX_DEPTH) {
      if (
        inlined + hit.weight > MAX_INLINED_NODES ||
        inlinedBytes + hit.bytes > MAX_INLINED_BYTES
      ) {
        return limit(target, LIMIT_HINT);
      }
      produced += hit.weight;
      inlined += hit.weight;
      producedBytes += hit.bytes;
      inlinedBytes += hit.bytes;
      deepest = Math.max(deepest, inlineDepth + hit.height);
      return structuredClone(hit.schema) as JsonSchema;
    }
    const result = measure(inlineDepth, () => visit(target, inlineDepth, active));
    if (!result.limited && key) {
      cache.set(key, {
        schema: structuredClone(result.schema),
        weight: result.weight,
        bytes: result.bytes,
        height: result.height,
      });
    }
    return result.schema;
  }

  function visit(schema: unknown, inlineDepth: number, active: Set<object>): JsonSchema {
    deepest = Math.max(deepest, inlineDepth);
    if (!isObject(schema)) {
      const out: JsonSchema = { description: schema === false ? NO_VALUE_HINT : ANY_VALUE_HINT };
      produced++;
      producedBytes += ownBytes(out);
      return out;
    }
    if (active.has(schema)) return limit(schema, RECURSIVE_HINT);
    if (inlineDepth > MAX_DEPTH) return limit(schema, LIMIT_HINT);
    produced++;
    const nextActive = new Set(active).add(schema);
    const child = (value: unknown): JsonSchema => visit(value, inlineDepth, nextActive);

    let out: JsonSchema = {};
    for (const [key, value] of Object.entries(schema)) {
      if (
        key === "$defs" ||
        key === "definitions" ||
        key === "$schema" ||
        key === "$id" ||
        key === "$ref" ||
        key === "allOf"
      ) {
        continue;
      }
      out[key] = value;
    }

    if (out.const !== undefined) lowerConst(out);

    for (const mapKey of CONTAINER_MAPS) {
      if (isObject(out[mapKey])) {
        out[mapKey] = Object.fromEntries(
          Object.entries(out[mapKey] as JsonSchema).map(([k, v]) => [k, child(v)])
        );
      }
    }
    for (const childKey of BOOLEAN_OR_SCHEMA_CHILDREN) {
      if (isObject(out[childKey])) {
        out[childKey] = child(out[childKey]);
      }
    }
    for (const childKey of SCHEMA_ONLY_CHILDREN) {
      if (
        out[childKey] !== undefined &&
        (isObject(out[childKey]) || typeof out[childKey] === "boolean")
      ) {
        out[childKey] = child(out[childKey]);
      }
    }
    if (Array.isArray(out.prefixItems)) {
      out.prefixItems = out.prefixItems.map((item) => child(item));
    }
    if (Array.isArray(out.items)) {
      out.items = out.items.map((item) => child(item));
    } else if (isObject(out.items)) {
      out.items = child(out.items);
    } else if (out.items === false) {
      if (Array.isArray(out.prefixItems) && out.prefixItems.length > 0) {
        const length = out.prefixItems.length;
        out.maxItems = typeof out.maxItems === "number" ? Math.min(out.maxItems, length) : length;
        out.items = structuredClone(unionPropertySchemas(out.prefixItems));
      } else {
        out.maxItems = 0;
        out.items = { type: "string", description: NO_VALUE_HINT };
      }
    }
    for (const key of ["anyOf", "oneOf"] as const) {
      if (Array.isArray(out[key]))
        out[key] = (out[key] as unknown[]).map((branch) => child(branch));
    }

    if (typeof schema.$ref === "string") {
      const target = resolvePointer(rootSchema, schema.$ref);
      if (target !== undefined) {
        out = intersectSchemas([out, expandRef(target, inlineDepth + 1, nextActive)]);
      } else {
        appendHint(out, `Unresolved schema reference: ${schema.$ref}`);
      }
    }

    if (Array.isArray(schema.allOf) && schema.allOf.length) {
      const branches = schema.allOf.map((branch) => {
        if (inlined >= MAX_INLINED_NODES || inlinedBytes >= MAX_INLINED_BYTES) {
          return limit(branch, LIMIT_HINT);
        }
        return measure(inlineDepth + 1, () => visit(branch, inlineDepth + 1, nextActive)).schema;
      });
      out = intersectSchemas([out, ...branches]);
    }

    out = lowerUnionKey(out, "oneOf");
    out = lowerUnionKey(out, "anyOf");

    if (out.additionalProperties === true) {
      appendHint(out, "Accepts arbitrary additional key-value properties.");
    } else if (isObject(out.additionalProperties)) {
      appendHint(out, `Additional properties: ${summarizeSchema(out.additionalProperties)}`);
    }
    if (isObject(out.patternProperties) && Object.keys(out.patternProperties).length > 0) {
      const shown = Object.entries(out.patternProperties)
        .slice(0, 6)
        .map(([pat, val]) => `${pat}: ${summarizeSchema(val)}`);
      appendHint(out, `Pattern properties: ${shown.join(", ")}`);
    }

    producedBytes += ownBytes(out);
    return out;
  }

  return visit(root, 0, new Set<object>());
}

// ── Sanitization for agy's ACP → Code Assist translator (index.mjs) ─────────

const ARRAY_ONLY_KEYWORDS = [
  "items",
  "prefixItems",
  "minItems",
  "maxItems",
  "uniqueItems",
  "contains",
] as const;
const OBJECT_ONLY_KEYWORDS = [
  "properties",
  "patternProperties",
  "required",
  "minProperties",
  "maxProperties",
  "dependentRequired",
] as const;
const RECURSIVE_SCHEMA_KEYS = [
  "propertyNames",
  "contains",
  "if",
  "then",
  "else",
  "unevaluatedProperties",
  "unevaluatedItems",
] as const;

/** The single non-"null" type of a node, or null when there is none/several. */
function resolvedSchemaType(type: unknown): string | null {
  if (typeof type === "string") return type;
  if (Array.isArray(type)) return (type.find((item) => item !== "null") as string) ?? null;
  return null;
}

/**
 * Port of index.mjs sanitizeInputSchema: the constructs agy's ACP → Code
 * Assist translator turns into invalid Schema protos. A union type leaves
 * stale `items`/`properties` keywords behind, which the translator emits as a
 * contradictory proto; a non-string or empty `enum`/`const` becomes
 * `enum[0]: cannot be empty`, and a `required` key with no matching property
 * is rejected outright. Everything is narrowed to a single type, the
 * keywords that cannot apply to it are dropped, and the dropped values are
 * preserved in the description so the model still learns them.
 */
export function sanitizeAgyInputSchema<T>(schema: T): T {
  if (!isObject(schema)) return schema;
  const out: JsonSchema = { ...schema };

  if (Array.isArray(out.type)) {
    const types = out.type.filter((item): item is string => typeof item === "string");
    const nullable = types.includes("null");
    const nonNull = types.filter((item) => item !== "null");
    if (nonNull.length > 1) {
      let chosen = nonNull[0];
      if (nonNull.includes("array") && out.items !== undefined) {
        chosen = "array";
      } else if (
        nonNull.includes("object") &&
        (out.properties !== undefined || out.additionalProperties !== undefined)
      ) {
        chosen = "object";
      }
      out.type = nullable ? [chosen, "null"] : chosen;
      appendHint(out, `Accepts types: ${types.join(" | ")}`);
    } else if (nonNull.length === 1) {
      out.type = nullable ? [nonNull[0], "null"] : nonNull[0];
    }
  }

  const resolvedType = resolvedSchemaType(out.type);

  if (resolvedType && resolvedType !== "array") {
    for (const key of ARRAY_ONLY_KEYWORDS) delete out[key];
  }
  if (resolvedType && resolvedType !== "object") {
    for (const key of OBJECT_ONLY_KEYWORDS) delete out[key];
  }

  if (Array.isArray(out.enum)) {
    const invalidEnum =
      out.enum.length === 0 ||
      (resolvedType !== null && resolvedType !== "string") ||
      out.enum.some((item) => typeof item !== "string" || item.length === 0);
    if (invalidEnum) {
      if (out.enum.length) {
        appendHint(
          out,
          `Allowed values: ${out.enum.map((item) => JSON.stringify(item)).join(", ")}`
        );
      }
      delete out.enum;
    }
  }

  if (
    out.const !== undefined &&
    (typeof out.const !== "string" ||
      out.const.length === 0 ||
      (resolvedType !== null && resolvedType !== "string"))
  ) {
    appendHint(out, `Must equal: ${JSON.stringify(out.const)}`);
    delete out.const;
  }

  if (isObject(out.properties)) {
    out.properties = Object.fromEntries(
      Object.entries(out.properties).map(([key, value]) => [key, sanitizeAgyInputSchema(value)])
    );
    if (Array.isArray(out.required)) {
      // A required key with no property of that name makes the proto invalid.
      const filtered = out.required.filter(
        (key) => typeof key === "string" && Object.hasOwn(out.properties as object, key)
      );
      if (filtered.length) out.required = filtered;
      else delete out.required;
    }
  }
  if (isObject(out.patternProperties)) {
    out.patternProperties = Object.fromEntries(
      Object.entries(out.patternProperties).map(([key, value]) => [
        key,
        sanitizeAgyInputSchema(value),
      ])
    );
  }
  if (isObject(out.additionalProperties)) {
    out.additionalProperties = sanitizeAgyInputSchema(out.additionalProperties);
  }
  if (Array.isArray(out.items)) {
    out.items = out.items.map((item) => sanitizeAgyInputSchema(item));
  } else if (isObject(out.items)) {
    out.items = sanitizeAgyInputSchema(out.items);
  }
  if (Array.isArray(out.prefixItems)) {
    out.prefixItems = out.prefixItems.map((item) => sanitizeAgyInputSchema(item));
  }
  for (const key of ["anyOf", "oneOf", "allOf"] as const) {
    if (Array.isArray(out[key])) {
      out[key] = (out[key] as unknown[]).map((item) => sanitizeAgyInputSchema(item));
    }
  }
  if (isObject(out.not)) out.not = sanitizeAgyInputSchema(out.not);
  for (const defsKey of ["$defs", "definitions"] as const) {
    if (isObject(out[defsKey])) {
      out[defsKey] = Object.fromEntries(
        Object.entries(out[defsKey] as JsonSchema).map(([key, value]) => [
          key,
          sanitizeAgyInputSchema(value),
        ])
      );
    }
  }
  for (const key of RECURSIVE_SCHEMA_KEYS) {
    if (isObject(out[key])) out[key] = sanitizeAgyInputSchema(out[key]);
  }
  if (isObject(out.dependentSchemas)) {
    out.dependentSchemas = Object.fromEntries(
      Object.entries(out.dependentSchemas as JsonSchema).map(([key, value]) => [
        key,
        sanitizeAgyInputSchema(value),
      ])
    );
  }

  // A pattern that is only valid as ECMA-262 makes agy reject the whole
  // toolbox, so this runs inside the same pass the rest of the sanitization
  // does.
  sanitizePatternFields(out);
  return out as T;
}

// ── RE2-safe patterns (re2-pattern.mjs) ─────────────────────────────────────

const HINT_PREFIX = "pattern: ";

const HIGH_SURROGATE_START = 0xd800;
const HIGH_SURROGATE_END = 0xdbff;
const LOW_SURROGATE_START = 0xdc00;
const LOW_SURROGATE_END = 0xdfff;
const UNICODE_MAX = 0x10ffff;

const isHighSurrogate = (cp: number): boolean =>
  cp >= HIGH_SURROGATE_START && cp <= HIGH_SURROGATE_END;
const isLowSurrogate = (cp: number): boolean =>
  cp >= LOW_SURROGATE_START && cp <= LOW_SURROGATE_END;
const joinSurrogates = (high: number, low: number): number =>
  0x10000 + ((high - HIGH_SURROGATE_START) << 10) + (low - LOW_SURROGATE_START);
const isHex = (char: string): boolean => /[0-9a-fA-F]/.test(char);

function parseUnicodeEscape(
  source: string,
  idx: number
): { end: number; cp: number; hex: string } | null {
  if (source[idx] !== "\\") return null;
  const rest = source.slice(idx + 1);
  let match = /^u\{([0-9a-fA-F]+)\}/.exec(rest);
  if (match) return { end: idx + 1 + match[0].length, cp: parseInt(match[1], 16), hex: match[1] };
  match = /^u([0-9a-fA-F]{4})/.exec(rest);
  if (match) return { end: idx + 1 + match[0].length, cp: parseInt(match[1], 16), hex: match[1] };
  match = /^U([0-9a-fA-F]{8})/.exec(rest);
  if (match) return { end: idx + 1 + match[0].length, cp: parseInt(match[1], 16), hex: match[1] };
  match = /^x\{([0-9a-fA-F]+)\}/.exec(rest);
  if (match) return { end: idx + 1 + match[0].length, cp: parseInt(match[1], 16), hex: match[1] };
  return null;
}

function emitHex(cp: number, hex: string | null = null): string {
  if (hex != null && Number.parseInt(hex, 16) === cp) return `\\x{${hex}}`;
  const digits = cp.toString(16).toUpperCase();
  return `\\x{${cp <= 0xffff ? digits.padStart(4, "0") : digits}}`;
}

export function translateUnicodeEscapes(source: string): string;
export function translateUnicodeEscapes(source: unknown): unknown;
export function translateUnicodeEscapes(source: unknown): unknown {
  if (typeof source !== "string") return source;
  let out = "";
  let i = 0;
  const length = source.length;
  while (i < length) {
    const parsed = parseUnicodeEscape(source, i);
    if (parsed) {
      const next = parseUnicodeEscape(source, parsed.end);
      if (
        Number.isFinite(parsed.cp) &&
        isHighSurrogate(parsed.cp) &&
        next &&
        Number.isFinite(next.cp) &&
        isLowSurrogate(next.cp)
      ) {
        out += emitHex(joinSurrogates(parsed.cp, next.cp));
        i = next.end;
        continue;
      }
      if (Number.isFinite(parsed.cp) && isHighSurrogate(parsed.cp) && parsed.end < length) {
        const rawLow = source.charCodeAt(parsed.end);
        if (isLowSurrogate(rawLow)) {
          out += emitHex(joinSurrogates(parsed.cp, rawLow));
          i = parsed.end + 1;
          continue;
        }
      }
      out += emitHex(parsed.cp, parsed.hex);
      i = parsed.end;
      continue;
    }
    if (source[i] === "\\") {
      out += source[i++];
      if (i < length) out += source[i++];
      continue;
    }
    const code = source.charCodeAt(i);
    if (isHighSurrogate(code) && i + 1 < length) {
      const next = parseUnicodeEscape(source, i + 1);
      if (next && Number.isFinite(next.cp) && isLowSurrogate(next.cp)) {
        out += emitHex(joinSurrogates(code, next.cp));
        i = next.end;
        continue;
      }
      const low = source.charCodeAt(i + 1);
      if (isLowSurrogate(low)) {
        out += emitHex(joinSurrogates(code, low));
        i += 2;
        continue;
      }
    }
    out += source[i++];
  }
  return out;
}

const RE2_LETTER_ESCAPES = new Set(["f", "n", "r", "t", "v", "b", "B", "d", "D", "s", "w", "W"]);

const RE2_CLASS_LETTER_ESCAPES = new Set(["f", "n", "r", "t", "v", "d", "D", "s", "w", "W"]);

const SINGLE_ESCAPE_CP: Record<string, number> = {
  f: 0x0c,
  n: 0x0a,
  r: 0x0d,
  t: 0x09,
  v: 0x0b,
};

const RE2_GROUP_FLAGS = new Set(["i", "m", "s", "U"]);

// Names Go's `regexp` accepts in `\p{...}` / `\P{...}` (case-insensitive):
// general categories, scripts and the aliases Go documents. Generated against
// Go 1.27's `regexp`; `Script=Greek` and other key=value forms are rejected.
const RE2_UNICODE_PROPERTIES = new Set([
  "adlam",
  "ahom",
  "anatolian_hieroglyphs",
  "any",
  "arabic",
  "armenian",
  "ascii",
  "assigned",
  "avestan",
  "balinese",
  "bamum",
  "bassa_vah",
  "batak",
  "bengali",
  "beria_erfe",
  "bhaiksuki",
  "bopomofo",
  "brahmi",
  "braille",
  "buginese",
  "buhid",
  "c",
  "canadian_aboriginal",
  "carian",
  "cased_letter",
  "caucasian_albanian",
  "cc",
  "cf",
  "chakma",
  "cham",
  "cherokee",
  "chorasmian",
  "close_punctuation",
  "cn",
  "cntrl",
  "co",
  "common",
  "connector_punctuation",
  "control",
  "coptic",
  "cs",
  "cuneiform",
  "currency_symbol",
  "cypriot",
  "cypro_minoan",
  "cyrillic",
  "dash_punctuation",
  "decimal_number",
  "deseret",
  "devanagari",
  "digit",
  "dives_akuru",
  "dogra",
  "duployan",
  "egyptian_hieroglyphs",
  "elbasan",
  "elymaic",
  "enclosing_mark",
  "ethiopic",
  "final_punctuation",
  "format",
  "garay",
  "georgian",
  "glagolitic",
  "gothic",
  "grantha",
  "greek",
  "gujarati",
  "gunjala_gondi",
  "gurmukhi",
  "gurung_khema",
  "han",
  "hangul",
  "hanifi_rohingya",
  "hanunoo",
  "hatran",
  "hebrew",
  "hiragana",
  "imperial_aramaic",
  "inherited",
  "initial_punctuation",
  "inscriptional_pahlavi",
  "inscriptional_parthian",
  "javanese",
  "kaithi",
  "kannada",
  "katakana",
  "kawi",
  "kayah_li",
  "kharoshthi",
  "khitan_small_script",
  "khmer",
  "khojki",
  "khudawadi",
  "kirat_rai",
  "l",
  "lao",
  "latin",
  "lc",
  "lepcha",
  "letter",
  "letter_number",
  "limbu",
  "line_separator",
  "linear_a",
  "linear_b",
  "lisu",
  "ll",
  "lm",
  "lo",
  "lowercase_letter",
  "lt",
  "lu",
  "lycian",
  "lydian",
  "m",
  "mahajani",
  "makasar",
  "malayalam",
  "mandaic",
  "manichaean",
  "marchen",
  "mark",
  "masaram_gondi",
  "math_symbol",
  "mc",
  "me",
  "medefaidrin",
  "meetei_mayek",
  "mende_kikakui",
  "meroitic_cursive",
  "meroitic_hieroglyphs",
  "miao",
  "mn",
  "modi",
  "modifier_letter",
  "modifier_symbol",
  "mongolian",
  "mro",
  "multani",
  "myanmar",
  "n",
  "nabataean",
  "nag_mundari",
  "nandinagari",
  "nd",
  "new_tai_lue",
  "newa",
  "nko",
  "nl",
  "no",
  "nonspacing_mark",
  "number",
  "nushu",
  "nyiakeng_puachue_hmong",
  "ogham",
  "ol_chiki",
  "ol_onal",
  "old_hungarian",
  "old_italic",
  "old_north_arabian",
  "old_permic",
  "old_persian",
  "old_sogdian",
  "old_south_arabian",
  "old_turkic",
  "old_uyghur",
  "open_punctuation",
  "oriya",
  "osage",
  "osmanya",
  "other",
  "other_letter",
  "other_number",
  "other_punctuation",
  "other_symbol",
  "p",
  "pahawh_hmong",
  "palmyrene",
  "paragraph_separator",
  "pau_cin_hau",
  "pc",
  "pd",
  "pe",
  "pf",
  "phags_pa",
  "phoenician",
  "pi",
  "po",
  "private_use",
  "ps",
  "psalter_pahlavi",
  "punct",
  "punctuation",
  "rejang",
  "runic",
  "s",
  "samaritan",
  "saurashtra",
  "sc",
  "separator",
  "sharada",
  "shavian",
  "siddham",
  "sidetic",
  "signwriting",
  "sinhala",
  "sk",
  "sm",
  "so",
  "sogdian",
  "sora_sompeng",
  "soyombo",
  "space_separator",
  "spacing_mark",
  "sundanese",
  "sunuwar",
  "surrogate",
  "syloti_nagri",
  "symbol",
  "syriac",
  "tagalog",
  "tagbanwa",
  "tai_le",
  "tai_tham",
  "tai_viet",
  "tai_yo",
  "takri",
  "tamil",
  "tangsa",
  "tangut",
  "telugu",
  "thaana",
  "thai",
  "tibetan",
  "tifinagh",
  "tirhuta",
  "titlecase_letter",
  "todhri",
  "tolong_siki",
  "toto",
  "tulu_tigalari",
  "ugaritic",
  "unassigned",
  "uppercase_letter",
  "vai",
  "vithkuqi",
  "wancho",
  "warang_citi",
  "yezidi",
  "yi",
  "z",
  "zanabazar_square",
  "zl",
  "zp",
  "zs",
]);

function isKnownUnicodeProperty(name: unknown): boolean {
  if (typeof name !== "string" || !name) return false;
  const body = name[0] === "^" ? name.slice(1) : name;
  return body.length > 0 && RE2_UNICODE_PROPERTIES.has(body.toLowerCase());
}

const isCodePointInRange = (cp: number): boolean =>
  Number.isInteger(cp) && cp >= 0 && cp <= UNICODE_MAX;

/**
 * Conservative RE2 compiler check: true only when the pattern should compile
 * with Go's `regexp.Compile` (the engine agy uses) AND keep its JavaScript
 * meaning. Anything that cannot be positively accepted is rejected, which
 * drops the pattern into a description hint instead of failing the toolbox.
 */
export function isRE2Safe(source: unknown): boolean {
  if (typeof source !== "string") return false;
  const length = source.length;
  let i = 0;
  let depth = 0;
  let canQuantify = false;

  // Repeat-product tracking, matching Go's repeatIsValid(..., 1000): the
  // product of nested `{n}` maxima along one path must not exceed 1000.
  const groupStack = [{ alt: 1, best: 1, last: 1 }];
  const ctx = (): { alt: number; best: number; last: number } => groupStack[groupStack.length - 1];
  const foldLast = (): void => {
    const c = ctx();
    c.alt = Math.max(c.alt, c.last);
  };
  const noteAtom = (mass = 1): void => {
    foldLast();
    ctx().last = mass;
    canQuantify = true;
  };

  const parseEscape = (inCharClass: boolean): { set?: boolean; cp?: number } | null => {
    if (i >= length || source[i] !== "\\") return null;
    i++;
    if (i >= length) return null;
    const next = source[i++];
    if (next >= "1" && next <= "9") return null;
    if (next === "0") {
      let extra = 0;
      let oct = 0;
      while (extra < 2 && i < length && source[i] >= "0" && source[i] <= "7") {
        oct = (oct << 3) + (source[i++] as unknown as number) - ("0" as unknown as number);
        extra++;
      }
      return { cp: oct };
    }
    if (next === "x") {
      if (i < length && source[i] === "{") {
        i++;
        let hex = "";
        while (i < length && isHex(source[i])) hex += source[i++];
        if (!hex || i >= length || source[i] !== "}") return null;
        i++;
        const cp = Number.parseInt(hex, 16);
        if (!isCodePointInRange(cp)) return null;
        return { cp };
      }
      if (i + 1 < length && isHex(source[i]) && isHex(source[i + 1])) {
        const cp = Number.parseInt(source.slice(i, i + 2), 16);
        i += 2;
        return { cp };
      }
      return null;
    }
    if (next === "p" || next === "P") {
      if (i < length && source[i] === "{") {
        i++;
        let name = "";
        while (i < length && source[i] !== "}") {
          const char = source[i];
          if (!/[A-Za-z0-9_^]/.test(char)) return null;
          name += char;
          i++;
        }
        if (!name || i >= length || source[i] !== "}") return null;
        i++;
        if (!isKnownUnicodeProperty(name)) return null;
        return { set: true };
      }
      if (i < length && /[A-Za-z]/.test(source[i])) {
        const name = source[i++];
        if (!isKnownUnicodeProperty(name)) return null;
        return { set: true };
      }
      return null;
    }
    if (next === "Q" || next === "E") return null;
    if (
      next === "u" ||
      next === "U" ||
      next === "C" ||
      next === "k" ||
      next === "Z" ||
      next === "G"
    )
      return null;
    if (next === "z" || next === "S" || next === "a" || next === "A") return null;
    if (/[A-Za-z]/.test(next)) {
      const allowed = (inCharClass ? RE2_CLASS_LETTER_ESCAPES : RE2_LETTER_ESCAPES).has(next);
      if (!allowed) return null;
      if (next === "d" || next === "D" || next === "s" || next === "w" || next === "W")
        return { set: true };
      if (next === "b" || next === "B") return { set: true };
      if (Object.hasOwn(SINGLE_ESCAPE_CP, next)) return { cp: SINGLE_ESCAPE_CP[next] };
      return { set: true };
    }
    if (/^[A-Za-z]$/.test(next) === false && next.charCodeAt(0) >= 0x80) return null;
    return { cp: next.charCodeAt(0) };
  };

  const parseClassItem = (): { set?: boolean; cp?: number } | null => {
    if (i >= length) return null;
    if (source[i] === "\\") return parseEscape(true);
    let cp = source.charCodeAt(i++);
    if (isHighSurrogate(cp) && i < length && isLowSurrogate(source.charCodeAt(i))) {
      cp = joinSurrogates(cp, source.charCodeAt(i++));
    }
    return { cp };
  };

  const consumeClass = (): boolean => {
    i++;
    if (i < length && source[i] === "^") i++;
    let justOpened = true;
    while (i < length) {
      if (source[i] === "]" && !justOpened) {
        i++;
        return true;
      }
      // Go treats `[:` inside a class as a POSIX named class; JS does not.
      if (source[i] === "[" && i + 1 < length && source[i + 1] === ":") return false;
      const lo = parseClassItem();
      if (!lo) return false;
      justOpened = false;
      if (
        lo.cp != null &&
        i < length &&
        source[i] === "-" &&
        i + 1 < length &&
        source[i + 1] !== "]"
      ) {
        i++;
        const hi = parseClassItem();
        if (!hi) return false;
        if (hi.cp == null) return false;
        if (hi.cp < lo.cp) return false;
      }
    }
    return false;
  };

  const applyRepeatProduct = (min: number, maxStr: string | null): boolean => {
    const hasMax = maxStr != null && maxStr !== "";
    const max = hasMax ? Number(maxStr) : null;
    const productChecked = min >= 2 || (hasMax && (max as number) >= 2);
    if (!productChecked) return true;
    const m = hasMax ? (max as number) : min;
    const last = ctx().last || 1;
    if (m > 0 && last * m > 1000) return false;
    ctx().last = last * m;
    return true;
  };

  const consumeRepeat = (): boolean => {
    const start = i;
    i++;
    if (i >= length || source[i] < "0" || source[i] > "9") {
      i = start + 1;
      noteAtom(1);
      return true;
    }
    let minStr = "";
    while (i < length && source[i] >= "0" && source[i] <= "9") minStr += source[i++];
    let maxStr: string | null = null;
    if (i < length && source[i] === ",") {
      i++;
      maxStr = "";
      while (i < length && source[i] >= "0" && source[i] <= "9") maxStr += source[i++];
    }
    if (i >= length || source[i] !== "}") {
      i = start + 1;
      noteAtom(1);
      return true;
    }
    if (!canQuantify) return false;
    const min = Number(minStr);
    if (min > 1000) return false;
    if (maxStr != null && maxStr !== "") {
      const max = Number(maxStr);
      if (max > 1000 || min > max) return false;
    }
    i++;
    if (i < length && source[i] === "?") i++;
    else if (i < length && source[i] === "+") return false;
    if (!applyRepeatProduct(min, maxStr)) return false;
    canQuantify = false;
    return true;
  };

  const consumeNamedGroup = (): boolean => {
    let name = 0;
    while (i < length && source[i] !== ">") {
      if (!/[A-Za-z0-9_]/.test(source[i])) return false;
      i++;
      name++;
    }
    if (name === 0 || i >= length || source[i] !== ">") return false;
    i++;
    depth++;
    foldLast();
    groupStack.push({ alt: 1, best: 1, last: 1 });
    canQuantify = false;
    return true;
  };

  const consumeGroup = (): boolean => {
    i++;
    if (i < length && source[i] === "?") {
      i++;
      if (i >= length) return false;
      const next = source[i];
      if (next === ":") {
        i++;
        depth++;
        foldLast();
        groupStack.push({ alt: 1, best: 1, last: 1 });
        canQuantify = false;
        return true;
      }
      if (next === "P") {
        i++;
        if (i >= length || source[i] !== "<") return false;
        i++;
        return consumeNamedGroup();
      }
      if (next === "<") {
        i++;
        if (i < length && (source[i] === "=" || source[i] === "!")) return false;
        return consumeNamedGroup();
      }
      let flags = 0;
      while (i < length && RE2_GROUP_FLAGS.has(source[i])) {
        i++;
        flags++;
      }
      if (i < length && source[i] === "-") {
        i++;
        while (i < length && RE2_GROUP_FLAGS.has(source[i])) {
          i++;
          flags++;
        }
      }
      if (i < length && source[i] === ":") {
        if (flags === 0) return false;
        i++;
        depth++;
        foldLast();
        groupStack.push({ alt: 1, best: 1, last: 1 });
        canQuantify = false;
        return true;
      }
      if (i < length && source[i] === ")") {
        if (flags === 0) return false;
        i++;
        canQuantify = false;
        return true;
      }
      return false;
    }
    depth++;
    foldLast();
    groupStack.push({ alt: 1, best: 1, last: 1 });
    canQuantify = false;
    return true;
  };

  while (i < length) {
    const char = source[i];
    if (char === "\\") {
      if (!parseEscape(false)) return false;
      noteAtom(1);
      continue;
    }
    if (char === "[") {
      if (!consumeClass()) return false;
      noteAtom(1);
      continue;
    }
    if (char === "]") return false;
    if (char === "(") {
      if (!consumeGroup()) return false;
      continue;
    }
    if (char === ")") {
      if (depth <= 0 || groupStack.length <= 1) return false;
      depth--;
      const inner = groupStack.pop() as { alt: number; best: number; last: number };
      ctx().last = Math.max(inner.best, inner.alt, inner.last);
      canQuantify = true;
      i++;
      continue;
    }
    if (char === "*" || char === "+" || char === "?") {
      if (!canQuantify) return false;
      i++;
      if (i < length && source[i] === "?") i++;
      else if (i < length && source[i] === "+") return false;
      canQuantify = false;
      continue;
    }
    if (char === "{") {
      if (!consumeRepeat()) return false;
      continue;
    }
    if (char === "|") {
      const c = ctx();
      c.best = Math.max(c.best, c.alt, c.last);
      c.alt = 1;
      c.last = 1;
      canQuantify = false;
      i++;
      continue;
    }
    if (char === "^" || char === "$") {
      canQuantify = false;
      i++;
      continue;
    }
    if (
      isHighSurrogate(source.charCodeAt(i)) &&
      i + 1 < length &&
      isLowSurrogate(source.charCodeAt(i + 1))
    ) {
      i += 2;
    } else {
      i++;
    }
    noteAtom(1);
  }
  return depth === 0 && groupStack.length === 1;
}

export function sanitizePatternString(original: unknown): {
  ok: boolean;
  pattern?: string;
  original: unknown;
} {
  if (typeof original !== "string") return { ok: false, pattern: undefined, original };
  const translated = translateUnicodeEscapes(original);
  if (isRE2Safe(translated)) return { ok: true, pattern: translated, original };
  return { ok: false, pattern: undefined, original };
}

/** Mutates one schema node's `pattern` / `patternProperties` keys. */
export function sanitizePatternFields(node: unknown): unknown {
  if (!isObject(node)) return node;

  if (Object.hasOwn(node, "pattern")) {
    const result = sanitizePatternString(node.pattern);
    if (result.ok) {
      node.pattern = result.pattern;
    } else {
      const shown =
        typeof result.original === "string" ? result.original : JSON.stringify(result.original);
      appendHint(node, `${HINT_PREFIX}${shown}`);
      delete node.pattern;
    }
  }

  if (isObject(node.patternProperties)) {
    const next: JsonSchema = {};
    const dropped: string[] = [];
    for (const [key, value] of Object.entries(node.patternProperties)) {
      const result = sanitizePatternString(key);
      if (result.ok) next[result.pattern as string] = value;
      else dropped.push(key);
    }
    if (dropped.length) appendHint(node, `dropped patternProperties: ${dropped.join(", ")}`);
    if (Object.keys(next).length) {
      node.patternProperties = next;
    } else {
      delete node.patternProperties;
      // Every key dropped while additionalProperties is false would reject
      // every property; lift that so the schema stays usable (the hint says so).
      if (node.additionalProperties === false) {
        delete node.additionalProperties;
        appendHint(
          node,
          "additionalProperties:false was lifted because every patternProperties key was dropped"
        );
      }
    }
  }

  return node;
}

// ── Gemini array items (array-items.mjs) ────────────────────────────────────

export const PERMISSIVE_LEAF_TYPES = ["string", "number", "integer", "boolean", "object", "null"];
export const PERMISSIVE_ARRAY_DEPTH = 8;
const TUPLE_ITEMS_HINT = "tuple items were left as a list; positional tuples may not be honored";
const UNTYPED_ITEMS_HINT = "array items were untyped; a permissive items schema was added";

function nodeDeclaresArray(node: unknown): boolean {
  if (!isObject(node)) return false;
  if (typeof node.type === "string") return node.type === "array";
  if (Array.isArray(node.type)) return node.type.includes("array");
  return false;
}

function typelessItems(items: unknown): boolean {
  if (items == null || items === true) return true;
  if (items === false) return false;
  if (Array.isArray(items)) return false;
  if (typeof items !== "object") return true;
  const record = items as JsonSchema;
  if (typeof record.$ref === "string" && record.$ref) return false;
  if (typeof record.type === "string" && record.type) return false;
  if (Array.isArray(record.type) && record.type.length) return false;
  return !record.anyOf && !record.oneOf && !record.allOf;
}

function cloneSchemaNode<T>(node: T): T {
  if (Array.isArray(node)) return node.map((item) => cloneSchemaNode(item)) as T;
  if (node && typeof node !== "object") return node;
  if (node && typeof node === "object") return { ...node } as T;
  return node;
}

function branchCanAcceptArray(branch: unknown): boolean {
  if (branch == null || branch === false) return false;
  if (branch === true) return true;
  if (!isObject(branch)) return false;
  if (typeof branch.type === "string") return branch.type === "array";
  if (Array.isArray(branch.type)) return branch.type.includes("array");
  return true;
}

function itemsFromCombinators(node: JsonSchema): unknown {
  const collected: unknown[] = [];
  for (const key of ["anyOf", "oneOf", "allOf"] as const) {
    if (!Array.isArray(node[key])) continue;
    let openArray = false;
    const definite: unknown[] = [];
    for (const branch of node[key] as unknown[]) {
      if (!branchCanAcceptArray(branch)) continue;
      const b = branch as JsonSchema;
      if (Array.isArray(b.items)) continue;
      if (typelessItems(b.items)) {
        if (key !== "allOf") openArray = true;
        continue;
      }
      definite.push(cloneSchemaNode(b.items));
    }
    if (openArray) return null;
    collected.push(...definite);
  }
  if (!collected.length) return null;
  const unique: unknown[] = [];
  const seen = new Set<string>();
  for (const item of collected) {
    const sig = JSON.stringify(item);
    if (seen.has(sig)) continue;
    seen.add(sig);
    unique.push(item);
  }
  if (unique.length === 1) return unique[0];
  return { anyOf: unique };
}

function inferItemsFromExisting(existing: JsonSchema): JsonSchema | null {
  if (existing.properties || existing.additionalProperties !== undefined) return { ...existing };
  if (Array.isArray(existing.enum) && existing.enum.length && !existing.type) {
    const samples = existing.enum.filter((item) => item !== null && item !== undefined);
    if (!samples.length) return null;
    const types = new Set(
      samples.map((sample) =>
        typeof sample === "boolean"
          ? "boolean"
          : typeof sample === "number"
            ? Number.isInteger(sample)
              ? "integer"
              : "number"
            : "string"
      )
    );
    if (types.has("number") && types.has("integer")) types.delete("integer");
    if (types.size !== 1) return null;
    return { ...existing, type: [...types][0] };
  }
  return null;
}

function leafSchemas(): JsonSchema[] {
  return PERMISSIVE_LEAF_TYPES.map((type) => ({ type }));
}

function permissiveValueSchema(depth: number): JsonSchema {
  const leaves = leafSchemas();
  if (depth <= 1) {
    return {
      anyOf: [...leaves, { type: "array", items: { anyOf: leaves.map((item) => ({ ...item })) } }],
    };
  }
  return { anyOf: [...leaves, { type: "array", items: permissiveValueSchema(depth - 1) }] };
}

function permissiveItemSchema(existing: JsonSchema = {}): JsonSchema {
  return { ...existing, ...permissiveValueSchema(PERMISSIVE_ARRAY_DEPTH) };
}

function mergeItems(fromCombo: unknown, existing: JsonSchema): unknown {
  if (!existing || Object.keys(existing).length === 0) return fromCombo;
  return { ...(fromCombo as JsonSchema), ...existing };
}

function fillGeminiArrayItems(node: JsonSchema): void {
  if (!nodeDeclaresArray(node)) return;
  if (Array.isArray(node.items)) {
    appendHint(node, TUPLE_ITEMS_HINT);
    return;
  }
  const existing = isObject(node.items) ? { ...node.items } : {};
  if (Array.isArray(node.prefixItems)) {
    appendHint(node, TUPLE_ITEMS_HINT);
    if (!typelessItems(node.items)) return;
    const fromCombo = itemsFromCombinators(node);
    if (fromCombo) node.items = mergeItems(fromCombo, existing);
    else {
      const inferred = inferItemsFromExisting(existing);
      node.items = inferred || permissiveItemSchema(existing);
      if (!inferred) appendHint(node, UNTYPED_ITEMS_HINT);
    }
    return;
  }
  if (!typelessItems(node.items)) return;
  const fromCombo = itemsFromCombinators(node);
  if (fromCombo) {
    node.items = mergeItems(fromCombo, existing);
    return;
  }
  const inferred = inferItemsFromExisting(existing);
  if (inferred) {
    node.items = inferred;
    return;
  }
  node.items = permissiveItemSchema(existing);
  appendHint(node, UNTYPED_ITEMS_HINT);
}

const SCHEMA_CHILD_KEYS = [
  "additionalProperties",
  "propertyNames",
  "contains",
  "if",
  "then",
  "else",
  "not",
  "unevaluatedProperties",
  "unevaluatedItems",
  "items",
] as const;
const SCHEMA_ARRAY_KEYS = ["anyOf", "oneOf", "allOf", "prefixItems"] as const;
const SCHEMA_MAP_KEYS = [
  "properties",
  "patternProperties",
  "dependentSchemas",
  "$defs",
  "definitions",
] as const;

function walk(node: unknown): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) walk(item);
    return;
  }
  const record = node as JsonSchema;
  // Children first so combinator branches are filled before items copy up.
  for (const key of SCHEMA_CHILD_KEYS) walk(record[key]);
  for (const key of SCHEMA_ARRAY_KEYS) {
    if (Array.isArray(record[key])) for (const item of record[key] as unknown[]) walk(item);
  }
  for (const key of SCHEMA_MAP_KEYS) {
    const map = record[key];
    if (isObject(map)) for (const child of Object.values(map)) walk(child);
  }
  fillGeminiArrayItems(record);
}

/** Mutates and returns the tree, so callers can chain the three passes. */
export function ensureGeminiArrayItems<T>(node: T): T {
  walk(node);
  return node;
}

// ── agy's 20,000-token customization budget (tool-budget.mjs) ───────────────

export const TOOL_TOKEN_BUDGET = 18000;

const encoder = new TextEncoder();
const bytes = (s: string): number => encoder.encode(s).length;
export const agyTokens = (s: string): number => Math.ceil(bytes(s) / 3);

const tokensOf = (tools: Array<Record<string, unknown>>): number =>
  tools.reduce((n, tool) => n + agyTokens(JSON.stringify(tool)), 0);

const DECOR = new Set(["$schema", "title", "examples"]);
const CONTRACT_WEIGHT = 11;
const TOOL_WEIGHT = 2.5;

function isContract(node: unknown): boolean {
  if (!isObject(node)) return false;
  const d = typeof node.description === "string" ? node.description : "";
  if (/\b(Variants|Accepts anyOf):/.test(d)) return true;
  const types = Array.isArray(node.type) ? node.type : [node.type];
  return (
    types.includes("object") && !(node.properties && Object.keys(node.properties as object).length)
  );
}

/** `cut` shortens text to at most `max` UTF-8 bytes, marking the cut with "…". */
export function cut(text: string, max: number): string | null {
  if (bytes(text) <= max) return text;
  const bare = text.replace(/\s*\bExamples?:[\s\S]*$/i, "").trimEnd();
  if (bare && bytes(bare) <= max) return bare;
  const room = max - bytes("…");
  if (room < 4) return null;
  let out = "";
  let used = 0;
  for (const ch of bare || text) {
    const b = bytes(ch);
    if (used + b > room) break;
    out += ch;
    used += b;
  }
  const stop = Math.max(...[". ", "; ", "。", "；"].map((p) => out.lastIndexOf(p)));
  if (stop > out.length / 2) out = out.slice(0, stop + 1);
  return out.trimEnd() + "…";
}

export const MIN_TEXT = 24;

function trim(text: string, max: number): string | null {
  if (bytes(text) <= max) return text;
  return max < MIN_TEXT ? null : cut(text, max);
}

function walkBudget(node: unknown, cap: (node: unknown) => number, strip: boolean): unknown {
  if (Array.isArray(node)) return node.map((item) => walkBudget(item, cap, strip));
  if (!isObject(node)) return node;
  const out: JsonSchema = {};
  for (const [key, value] of Object.entries(node)) {
    if (strip && DECOR.has(key)) continue;
    if (key === "description" && typeof value === "string") {
      const max = cap(node);
      const text = max === Infinity ? value : trim(value, max);
      if (text) out.description = text;
      continue;
    }
    if (
      (key === "properties" ||
        key === "$defs" ||
        key === "definitions" ||
        key === "patternProperties") &&
      isObject(value)
    ) {
      // A map of names to schemas: the names are the client's, never keywords.
      out[key] = Object.fromEntries(
        Object.entries(value).map(([name, schema]) => [name, walkBudget(schema, cap, strip)])
      );
      continue;
    }
    if (key === "enum" || key === "const" || key === "default" || key === "required") {
      out[key] = value;
      continue;
    }
    out[key] = walkBudget(value, cap, strip);
  }
  return out;
}

function shaped(
  tools: Array<Record<string, unknown>>,
  { strip, L, lean }: { strip: boolean; L?: number; lean?: boolean }
): Array<Record<string, unknown>> {
  const plain = lean ? MIN_TEXT - 1 : L;
  const prop =
    L === undefined
      ? () => Infinity
      : (node: unknown) => (isContract(node) ? CONTRACT_WEIGHT * L : (plain as number));
  return tools.map((tool) => {
    const out: Record<string, unknown> = { ...tool };
    if (isObject(tool.inputSchema)) {
      out.inputSchema = walkBudget(tool.inputSchema, prop, strip);
    }
    if (typeof tool.description === "string") {
      const max = L === undefined ? Infinity : TOOL_WEIGHT * L;
      const text = max === Infinity ? tool.description : trim(tool.description, max);
      if (text) out.description = text;
      else delete out.description;
    }
    return out;
  });
}

function highest(lo: number, hi: number, fits: (n: number) => boolean): number {
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (fits(mid)) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/**
 * The tools as agy should list them: unchanged when they fit the budget, else
 * with the decorative keywords gone, then with every description capped at the
 * highest level that fits. Every tool and every bit of its schema survives;
 * only descriptions shorten.
 */
export function fitTools(
  tools: Array<Record<string, unknown>>,
  budget: number = TOOL_TOKEN_BUDGET
): Array<Record<string, unknown>> {
  if (tokensOf(tools) <= budget) return tools;
  const stripped = shaped(tools, { strip: true });
  if (tokensOf(stripped) <= budget) return stripped;
  const at = (L: number): Array<Record<string, unknown>> => shaped(tools, { strip: true, L });
  if (tokensOf(at(0)) > budget) return at(0);
  const L = highest(0, 4000, (n) => tokensOf(at(n)) <= budget);
  if (L >= MIN_TEXT) return at(L);
  const lean = (n: number): Array<Record<string, unknown>> =>
    shaped(tools, { strip: true, L: n, lean: true });
  if (tokensOf(lean(0)) > budget) return at(L);
  return lean(highest(0, 4000, (n) => tokensOf(lean(n)) <= budget));
}

// ── The full normalization pipeline agy needs ──────────────────────────────

/**
 * The pipeline agy runs over each tool's input schema, in its own order:
 * expandToolSchema -> sanitizeInputSchema (which itself RE2-sanitizes every
 * pattern) -> ensureGeminiArrayItems. Called once per tool, exactly where agy
 * calls it, so a broken schema is repaired rather than aborting the turn.
 */
export function normalizeAgyToolSchema(schema: unknown): unknown {
  return ensureGeminiArrayItems(sanitizeAgyInputSchema(expandToolSchema(schema)));
}

/**
 * The client's tools as agy should list them: every `inputSchema` normalized,
 * then the list fitted into agy's budget. `run_command` also loses a
 * `toolSummary` requirement, because agy adds its own and a duplicate makes
 * the resulting schema invalid before the agent can start.
 */
export function prepareAgyTools(
  tools: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
  const normalized = tools.map((tool) => {
    if (!isObject(tool.inputSchema)) return tool;
    const inputSchema = normalizeAgyToolSchema(tool.inputSchema) as JsonSchema;
    if (tool.name === "run_command" && Array.isArray(inputSchema.required)) {
      inputSchema.required = inputSchema.required.filter((key) => key !== "toolSummary");
    }
    return { ...tool, inputSchema };
  });
  return fitTools(normalized);
}
