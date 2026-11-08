import { SchemaPreparationError } from "../../utils/schemaErrors.ts";

/**
 * Bounds for local `$ref` expansion. Gemini has no `$ref`, so the cleaner inlines
 * every local reference; without a bound a `$defs` fan-out (A → 2×B → 2×C …) grows
 * exponentially from a tiny request body. Only nodes produced by reference
 * expansion are charged — a schema without `$ref` is never rejected here.
 */
export const SCHEMA_LIMITS = Object.freeze({
  maxDepth: 64,
  maxNodes: 10_000,
  maxBytes: 256 * 1024,
  maxRequestNodes: 50_000,
  maxRequestBytes: 2 * 1024 * 1024,
});

export type SchemaLimits = typeof SCHEMA_LIMITS;

/** Counters shared by every schema (tools + response) of one request. */
export type SchemaBudget = { limits: SchemaLimits; nodes: number; bytes: number };

export type SchemaMeter = {
  /** Charge one expanded value at `depth`; throws when a limit is exceeded. */
  value(value: unknown, depth: number): void;
  /** Charge one expanded object key. */
  key(key: string): void;
};

/** `limits` overrides are for tests only — never derived from the request. */
export function createSchemaBudget(limits: Partial<SchemaLimits> = {}): SchemaBudget {
  return { limits: { ...SCHEMA_LIMITS, ...limits }, nodes: 0, bytes: 0 };
}

/** Per-schema meter that also charges the request-wide budget. */
export function createSchemaMeter(budget: SchemaBudget, location: string): SchemaMeter {
  const { limits } = budget;
  let nodes = 0;
  let bytes = 0;

  const charge = (n: number, b: number): void => {
    nodes += n;
    bytes += b;
    budget.nodes += n;
    budget.bytes += b;
    if (
      nodes > limits.maxNodes ||
      bytes > limits.maxBytes ||
      budget.nodes > limits.maxRequestNodes ||
      budget.bytes > limits.maxRequestBytes
    ) {
      throw new SchemaPreparationError("schema_size", location);
    }
  };

  return {
    value(value, depth) {
      if (depth > limits.maxDepth) throw new SchemaPreparationError("schema_depth", location);
      charge(1, typeof value === "string" ? value.length : 1);
    },
    key(key) {
      charge(0, key.length);
    },
  };
}
