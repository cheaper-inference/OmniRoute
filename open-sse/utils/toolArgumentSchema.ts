/**
 * Interpreted subset retained from Devin: scalar type/integer, identity enum,
 * object required/properties/additionalProperties:false, and homogeneous items.
 * Not full JSON Schema: unions, composition, formats, bounds and other keywords
 * are not enforced. Unsupported type arrays remain permissive (no false rejection).
 * ownProperties opts native callers into JSON-own-key semantics; the default
 * preserves Devin's legacy inherited-key behavior and diagnostics.
 */
type JsonRecord = Record<string, unknown>;
function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function typeOf(value: unknown): string {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function validateType(value: unknown, expectedType: unknown, path: string): string[] {
  if (typeof expectedType !== "string") return [];
  const actual = typeOf(value);
  if (expectedType === "integer") {
    return Number.isInteger(value) ? [] : [`${path} must be integer`];
  }
  return actual === expectedType ? [] : [`${path} must be ${expectedType}, got ${actual}`];
}

function validateEnum(value: unknown, choices: unknown, path: string): string[] {
  if (!Array.isArray(choices) || choices.some((item) => item === value)) return [];
  return [`${path} must be one of ${choices.map((item) => JSON.stringify(item)).join(", ")}`];
}

function hasProperty(record: JsonRecord, key: string, ownProperties: boolean): boolean {
  return ownProperties ? Object.hasOwn(record, key) : key in record;
}

function validateRequired(
  record: JsonRecord,
  required: unknown,
  path: string,
  ownProperties: boolean
): string[] {
  const errors: string[] = [];
  const keys = Array.isArray(required) ? required.map(String) : [];
  for (const key of keys) {
    if (!hasProperty(record, key, ownProperties)) errors.push(`${path}.${key} is required`);
  }
  return errors;
}

function validateProperties(
  record: JsonRecord,
  properties: JsonRecord,
  path: string,
  ownProperties: boolean
): string[] {
  const errors: string[] = [];
  for (const [key, propSchema] of Object.entries(properties)) {
    if (hasProperty(record, key, ownProperties))
      errors.push(
        ...validateSchema(record[key], asRecord(propSchema), `${path}.${key}`, ownProperties)
      );
  }
  return errors;
}

function validateAdditionalProperties(
  record: JsonRecord,
  properties: JsonRecord,
  path: string,
  ownProperties: boolean
): string[] {
  const errors: string[] = [];
  for (const key of Object.keys(record)) {
    if (!hasProperty(properties, key, ownProperties)) errors.push(`${path}.${key} is not allowed`);
  }
  return errors;
}

function validateObject(
  value: unknown,
  schema: JsonRecord,
  path: string,
  ownProperties: boolean
): string[] {
  if (schema.type !== "object" && !(value && typeof value === "object" && !Array.isArray(value)))
    return [];
  const record = asRecord(value);
  const errors = validateRequired(record, schema.required, path, ownProperties);
  const properties = asRecord(schema.properties);
  errors.push(...validateProperties(record, properties, path, ownProperties));
  if (schema.additionalProperties === false)
    errors.push(...validateAdditionalProperties(record, properties, path, ownProperties));
  return errors;
}

function validateArray(
  value: unknown,
  items: unknown,
  path: string,
  ownProperties: boolean
): string[] {
  if (!Array.isArray(value) || !items) return [];
  const errors: string[] = [];
  const itemSchema = asRecord(items);
  value.forEach((item, index) =>
    errors.push(...validateSchema(item, itemSchema, `${path}[${index}]`, ownProperties))
  );
  return errors;
}

export function validateSchema(
  value: unknown,
  schema: JsonRecord,
  path: string,
  ownProperties = false
): string[] {
  const errors = validateType(value, schema.type, path);
  errors.push(...validateEnum(value, schema.enum, path));
  errors.push(...validateObject(value, schema, path, ownProperties));
  errors.push(...validateArray(value, schema.items, path, ownProperties));
  return errors;
}
