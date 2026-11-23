import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Regression guard for the v3.8.52 base-red in #15306: b16bf50f made ConnectionRow read
// `connection.rateLimitAutoProtected` (sent by GET /api/providers) without declaring it on
// `ConnectionRowConnection`, which broke `check:dashboard-typecheck` with TS2339. The
// dashboard is outside `typecheck:core`, so this static check keeps every field the row
// reads off `connection` declared on the interface.
const rowFile = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "src",
  "app",
  "(dashboard)",
  "dashboard",
  "providers",
  "[id]",
  "components",
  "ConnectionRow.tsx"
);

function declaredFields(source: string): Set<string> {
  const start = source.indexOf("export interface ConnectionRowConnection {");
  assert.notEqual(start, -1, "ConnectionRowConnection interface not found");
  const end = source.indexOf("\n}", start);
  const body = source.slice(start, end);
  return new Set([...body.matchAll(/^\s+([A-Za-z_]\w*)\??:/gm)].map((m) => m[1]));
}

test("every connection.<field> read in ConnectionRow is declared on ConnectionRowConnection", () => {
  const source = readFileSync(rowFile, "utf8");
  const types = readFileSync(path.join(path.dirname(rowFile), "connectionRowTypes.ts"), "utf8");
  const declared = declaredFields(types);
  const statusSource = readFileSync(
    path.join(path.dirname(rowFile), "connectionRowStatus.ts"),
    "utf8"
  );
  const read = new Set(
    [...`${source}\n${statusSource}`.matchAll(/\bconnection\.([A-Za-z_]\w*)/g)].map((m) => m[1])
  );
  const undeclared = [...read].filter((field) => !declared.has(field)).sort();
  assert.deepEqual(undeclared, []);
});

test("rateLimitAutoProtected is declared as an optional boolean", () => {
  const source = readFileSync(path.join(path.dirname(rowFile), "connectionRowTypes.ts"), "utf8");
  assert.match(source, /^\s+rateLimitAutoProtected\?: boolean;$/m);
});
