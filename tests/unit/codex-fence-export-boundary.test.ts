import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Response-only helpers belong to the engine. Re-exporting them through the DB
// wrapper adds unused public symbols and obscures the engine/application boundary.
test("DB fence wrapper does not re-export engine-only response helpers", () => {
  const source = readFileSync(
    new URL("../../src/lib/db/codexConnectionFences.ts", import.meta.url),
    "utf8"
  );
  const exports = source.match(
    /export\s*\{([^}]+)\}\s*from\s*"@omniroute\/open-sse\/services\/codexAccount\/fences\.ts"/
  );
  assert.ok(exports, "the durable application wrapper must still expose the fence bridge");
  assert.doesNotMatch(exports[1], /\b(?:bindCodexResponseCallbacks|inheritCodexResponseFence)\b/);
  assert.match(exports[1], /\brunWithCodexConnectionFence\b/);
  assert.match(exports[1], /\bgetCodexOperationFence\b/);
});
