// Fixture for tests/unit/quality/launch-coverage.test.ts: a lazy import() near the top (tsx
// appends an interop wrapper to it, which shifts every offset after it) and functions below
// whose coverage is known. Never imported by production code.
export async function loadSep() {
  return (await import("node:path")).sep;
}

export function classify(n) {
  const doubled = n * 2;
  if (doubled > 10) {
    return "big";
  }
  if (doubled < 0) {
    return "negative";
  }
  return "small";
}

export function neverCalled(x) {
  const y = x + 1;
  return y * 3;
}
