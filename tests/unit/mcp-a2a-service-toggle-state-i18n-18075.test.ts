/**
 * #18075 — the MCP service toggle printed a hard-coded "ON"/"OFF" next to its switch.
 * #19620 — the state text is gone from both pages: the switch shows the state, and its translated
 * enable/disable name says what a press does. tests/unit/ui/mcp-a2a-service-toggle-19620.test.tsx
 * checks the rendered result.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) =>
  fs.readFileSync(path.join(ROOT, "src/app/(dashboard)/dashboard", p), "utf8");

for (const page of ["mcp/page.tsx", "a2a/page.tsx"]) {
  test(`${page}: the switch is named by translated labels, with no ON/OFF text beside it`, () => {
    const src = read(page);
    assert.doesNotMatch(src, /["'](ON|OFF)["']/, "no hard-coded ON/OFF literal");
    assert.doesNotMatch(src, /tCommon\("(on|off)"\)/, "no state text next to the switch");
    assert.match(
      src,
      /aria-label=\{enabled \? t\("disableLabel", \{ label \}\) : t\("enableLabel"/
    );
  });
}

test("common.on / common.off exist in the English catalog", () => {
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, "src/i18n/messages/en.json"), "utf8"));
  assert.equal(typeof en.common.on, "string");
  assert.equal(typeof en.common.off, "string");
});
