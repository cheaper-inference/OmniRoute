import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const MODAL = path.resolve(
  "src/app/(dashboard)/dashboard/providers/[id]/components/modals/AddApiKeyModal.tsx"
);

/**
 * react-hooks 7.1.1 `immutability` errors when the open-reset effect calls
 * these setters before their useState bindings. Runtime still works (the
 * effect runs after the function returns); the source order is the guard.
 */
describe("AddApiKeyModal bulk state is declared before the open-reset effect", () => {
  const source = fs.readFileSync(MODAL, "utf8");
  const resetCall = source.indexOf('setMode("single")');

  it("finds the open-reset setMode call", () => {
    assert.ok(resetCall > 0);
  });

  for (const declaration of [
    'const [mode, setMode] = useState<"single" | "bulk">("single")',
    'const [bulkText, setBulkText] = useState("")',
    "const [bulkValidateKeys, setBulkValidateKeys] = useState(false)",
    "const [bulkResult, setBulkResult] = useState<",
    "const [bulkWarnings, setBulkWarnings] = useState<string[]>([])",
  ]) {
    it(`declares ${declaration.slice(6, 40)} before the reset`, () => {
      const at = source.indexOf(declaration);
      assert.ok(at > 0, `missing ${declaration}`);
      assert.ok(at < resetCall, `${declaration} must precede setMode("single")`);
    });
  }
});
