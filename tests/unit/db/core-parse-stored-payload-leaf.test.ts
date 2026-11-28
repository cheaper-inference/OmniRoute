import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

// core.ts only needs parseStoredPayload, which lives in a dependency-free leaf.
// Importing it through logPayloads pulls in piiSanitizer -> piiRuleConfig ->
// db/piiSettings -> db/core, an import cycle back into the DB singleton.
test("db/core imports parseStoredPayload from the leaf, not logPayloads", () => {
  const coreSource = fs.readFileSync(path.join(process.cwd(), "src/lib/db/core.ts"), "utf8");

  assert.match(coreSource, /from "\.\.\/usage\/parseStoredPayload"/);
  assert.doesNotMatch(coreSource, /from "\.\.\/logPayloads"/);
  assert.doesNotMatch(coreSource, /from "@\/lib\/logPayloads"/);
});

test("parseStoredPayload leaf stays dependency-free", () => {
  const leafSource = fs.readFileSync(
    path.join(process.cwd(), "src/lib/usage/parseStoredPayload.ts"),
    "utf8"
  );

  assert.doesNotMatch(leafSource, /^\s*import\s/m);
});
