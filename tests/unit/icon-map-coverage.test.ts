import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

// KEA-7886 F4: the Material Symbols font is gone, so <Icon> has no ligature fallback — a name
// missing from ICON_MAP draws a placeholder glyph. Every icon name used in src/ must therefore
// map to a real Lucide component.
test("every icon name used in src/ maps to a Lucide icon in ICON_MAP", async () => {
  const out = execFileSync(process.execPath, ["scripts/dev/gen-icon-map.mjs", "--names"], {
    cwd: ROOT,
  }).toString();
  const names = out
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  assert.ok(
    names.length > 250,
    `the scanner found ${names.length} names; expected the ~380 in use`
  );
  const { ICON_MAP } = await import("../../src/shared/constants/iconMap.ts");
  const unmapped = names.filter((n) => typeof ICON_MAP[n] !== "object" || ICON_MAP[n] === null);
  assert.deepEqual(
    unmapped,
    [],
    `names without a Lucide icon in ICON_MAP:\n${unmapped.join("\n")}\n` +
      "Real icon → map it to a Lucide component in src/shared/constants/iconMap.ts (npm run gen:icon-map). " +
      "Not an icon (a logo key, a size key… in an `icon:` slot that never reaches <Icon>) → add it to " +
      "NOT_ICON_NAMES in scripts/dev/gen-icon-map.mjs with the proof, never map it to a fake glyph."
  );
});

test("ICON_MAP has no null entry and every value is a Lucide component", async () => {
  const { ICON_MAP } = await import("../../src/shared/constants/iconMap.ts");
  const bad = Object.entries(ICON_MAP)
    .filter(([, icon]) => !icon || typeof icon !== "object" || !("render" in icon))
    .map(([name]) => name);
  assert.deepEqual(bad, [], `entries that are not Lucide components:\n${bad.join("\n")}`);
});

test("the generator drops the known non-icon strings", async () => {
  const { collectNames, NOT_ICON_NAMES } = await import("../../scripts/dev/gen-icon-map.mjs");
  const names = collectNames(ROOT);
  // Regression guard: provider logo keys and size keys once leaked into ICON_MAP as fake icons.
  for (const n of ["anthropic", "server", "proxy", "icon", "generic"]) {
    assert.ok(!names.includes(n), `"${n}" is not an icon name`);
  }
  assert.ok(NOT_ICON_NAMES.size > 0);
});

test("the scanner sees names in <Icon name>, icon props and ternaries, but not data-*-icon attrs", async () => {
  const { collectNamesFromSource } = await import("../../scripts/dev/gen-icon-map.mjs");
  const source = `
    <Icon name="settings" size={16} />
    <Icon name={x ? "light_mode" : "dark_mode"} className="shrink-0" />
    <Button icon="add" iconRight={open ? "expand_less" : "expand_more"} />
    <span data-provider-icon="generic" />
    const TABS = [{ id: "a", icon: "tune" }];
  `;
  assert.deepEqual(collectNamesFromSource(source), [
    "add",
    "dark_mode",
    "expand_less",
    "expand_more",
    "light_mode",
    "settings",
    "tune",
  ]);
});

test("resolveIcon only resolves own ICON_MAP keys (no Object.prototype members)", async () => {
  const { resolveIcon } = await import("../../src/shared/constants/iconMap.ts");
  for (const name of ["constructor", "toString", "hasOwnProperty", "__proto__"]) {
    assert.equal(resolveIcon(name), null, `${name} is not an icon`);
  }
  assert.ok(resolveIcon("settings"), "a real key still resolves");
});
