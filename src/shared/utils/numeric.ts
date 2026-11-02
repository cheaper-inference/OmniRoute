// The numeric coercion helpers live in the engine (open-sse/utils/numeric.ts) so open-sse code can
// use them without importing from src/ (boundary ratchet, quality-baseline.json). src/ keeps this
// path for its existing callers.
export * from "@omniroute/open-sse/utils/numeric.ts";
