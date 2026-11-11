/**
 * #18075 — the MCP service toggle printed a hard-coded "ON"/"OFF" next to its switch, while the
 * A2A toggle already used the translated `common.on` / `common.off`. Both pages now read the
 * same keys, so the state text follows the user's locale.
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
  test(`${page}: the service toggle state text is translated`, () => {
    const src = read(page);
    assert.doesNotMatch(src, /["'](ON|OFF)["']/, "no hard-coded ON/OFF literal");
    assert.match(src, /tCommon\("on"\)/);
    assert.match(src, /tCommon\("off"\)/);
  });
}

test("common.on / common.off exist in the English catalog", () => {
  const en = JSON.parse(fs.readFileSync(path.join(ROOT, "src/i18n/messages/en.json"), "utf8"));
  assert.equal(typeof en.common.on, "string");
  assert.equal(typeof en.common.off, "string");
});
