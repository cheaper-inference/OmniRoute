import { SchemaPreparationError } from "../../utils/schemaErrors.ts";

type JsonRecord = Record<string, unknown>;
type Literal = string | number | boolean;

/** Keys a branch may carry and still count as "just a literal". */
const LITERAL_BRANCH_KEYS = new Set(["const", "enum", "type", "description", "title", "$comment"]);
/** Maps of name → subschema: recurse into the values, never treat the map as a schema. */
const SCHEMA_MAP_KEYS = new Set([
  "properties",
  "patternProperties",
  "$defs",
  "definitions",
  "dependentSchemas",
]);
/** Data-valued keywords: their contents are instance values, not subschemas. */
const DATA_KEYS = new Set(["const", "enum", "default", "examples", "required"]);

const isRecord = (value: unknown): value is JsonRecord =>
  !!value && typeof value === "object" && !Array.isArray(value);

const isNullBranch = (branch: JsonRecord): boolean =>
  (branch.type === "null" &&
    Object.keys(branch).every((k) => k === "type" || k === "description")) ||
  (Object.hasOwn(branch, "const") && branch.const === null);

/** Literal values of one branch, or null when the branch is not a pure literal. */
function branchLiterals(branch: JsonRecord): unknown[] | null {
  if (!Object.keys(branch).every((key) => LITERAL_BRANCH_KEYS.has(key))) return null;
  if (Object.hasOwn(branch, "const")) return [branch.const];
  return Array.isArray(branch.enum) ? branch.enum : null;
}

/**
 * Collect the values of an all-literal union. Returns null when any branch is not
 * a literal/null branch, or when a value is not a JSON primitive.
 */
function collectUnionLiterals(
  branches: unknown[]
): { values: Literal[]; hasNull: boolean; declaresString: boolean } | null {
  const values: Literal[] = [];
  let hasNull = false;
  let declaresString = false;
  for (const branch of branches) {
    if (!isRecord(branch)) return null;
    if (isNullBranch(branch)) {
      hasNull = true;
      continue;
    }
    const literals = branchLiterals(branch);
    if (!literals) return null;
    if (branch.type === "string") declaresString = true;
    for (const value of literals) {
      if (value === null) hasNull = true;
      else if (["string", "number", "boolean"].includes(typeof value))
        values.push(value as Literal);
      else return null;
    }
  }
  return values.length > 0 ? { values, hasNull, declaresString } : null;
}

/**
 * Write `minimum`/`maximum` covering `values`, intersected with bounds the schema
 * already declares. Gemini rejects `enum` on numeric types, so the range is the
 * tightest constraint it can carry.
 */
export function applyNumericBounds(record: JsonRecord, values: number[], location: string): void {
  if (values.length === 0) return;
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (typeof record.minimum === "number") min = Math.max(min, record.minimum);
  if (typeof record.maximum === "number") max = Math.min(max, record.maximum);
  if (min > max) throw new SchemaPreparationError("schema_conflict", location);
  record.minimum = min;
  record.maximum = max;
}

/** Replace an all-literal anyOf/oneOf on `record` with one typed schema. */
function mergeUnion(
  record: JsonRecord,
  key: "anyOf" | "oneOf",
  options: { nullable: boolean; location: string }
): void {
  const collected = Array.isArray(record[key]) ? collectUnionLiterals(record[key]) : null;
  if (!collected) return;
  const { values, hasNull } = collected;
  const declaresString = collected.declaresString || record.type === "string";
  delete record[key];

  const kinds = new Set(values.map((v) => typeof v));
  if (!declaresString && kinds.size === 1 && kinds.has("boolean")) {
    record.type = "boolean";
  } else if (!declaresString && kinds.size === 1 && kinds.has("number")) {
    const numbers = values as number[];
    record.type = numbers.every(Number.isInteger) ? "integer" : "number";
    applyNumericBounds(record, numbers, options.location);
  } else {
    record.type = "string";
    record.enum = [...new Set(values.map(String))];
  }
  if (hasNull && options.nullable) record.nullable = true;
}

/**
 * Merge every all-literal union (`anyOf`/`oneOf` of `const`/`enum` branches, plus
 * optional null branches) into one typed schema before the cleaner flattens unions
 * by keeping a single branch — which otherwise leaves only the first literal, as a
 * string. Unions with any structural branch are left to the existing flattening.
 */
export function mergeLiteralUnions(
  obj: unknown,
  options: { nullable: boolean; location: string }
): void {
  if (Array.isArray(obj)) {
    for (const item of obj) mergeLiteralUnions(item, options);
    return;
  }
  if (!isRecord(obj)) return;

  mergeUnion(obj, "anyOf", options);
  mergeUnion(obj, "oneOf", options);
  for (const [key, value] of Object.entries(obj)) {
    if (!value || typeof value !== "object" || DATA_KEYS.has(key)) continue;
    if (SCHEMA_MAP_KEYS.has(key) && isRecord(value)) {
      for (const sub of Object.values(value)) mergeLiteralUnions(sub, options);
    } else {
      mergeLiteralUnions(value, options);
    }
  }
}
