#!/usr/bin/env node
// List icon names in use (props icon=/iconRight=/emptyIcon=/leadingIcon=, `<Icon name>` and
// `icon: "..."` in constants) and prints a skeleton of ICON_MAP for the missing ones.
// The vocabulary is that of the Material Symbols names that the screens already use, but the font and package
// `material-symbols` left in F4 (KEA-7886): every captured name needs to map to an icon
// Lucide em src/shared/constants/iconMap.ts, exceto as strings de NOT_ICON_NAMES abaixo.
// node scripts/dev/gen-icon-map.mjs # TS skeleton with the names missing from the current map
// node scripts/dev/gen-icon-map.mjs --names # just the names, one per line (used by the coverage test)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DIRS = ["src/app", "src/shared"];
// `(?<![-\w])` keeps `data-provider-icon="generic"` and similar attributes out of the icon slots.
const PATTERNS = [
  /(?<![-\w])(?:icon|iconRight|emptyIcon|leadingIcon)=\"([a-z][a-z0-9_]+)\"/g, // prop icon="name"
  /\bicon:\s*\"([a-z][a-z0-9_]+)\"/g, // { icon: "name" } (sidebar sections, tabs)
  /<Icon\b[^>]*\bname=\"([a-z][a-z0-9_]+)\"/g, // <Icon name="name" />
];
// Ternaries (`cond ? "a" : "b"`) only count when they are in an icon slot: the expression of a prop
// icon=/iconRight=/emptyIcon=/leadingIcon={…} ou de <Icon name={…} />.
const SLOT_PATTERNS = [
  /(?<![-\w])(?:icon|iconRight|emptyIcon|leadingIcon)=\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, // icon={cond ? "a" : "b"}
  /<Icon\b[^>]*\bname=\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, // <Icon name={cond ? "a" : "b"} />
];
const TERNARY_RE = /\?\s*\"([a-z][a-z0-9_]+)\"\s*:\s*\"([a-z][a-z0-9_]+)\"/g;

/**
 * Strings the scanner sees in an `icon:` slot that never reach <Icon>. Each one was checked by
 * hand (2026-10-21): provider-catalog `icon` fields are logo keys (no `<Icon name={provider.icon}>`
 * exists), RoutingTab's tile `icon` field is never read, and Button's `icon: "icon"` is a size key.
 * Add a name here only with the same proof; a real icon name belongs in ICON_MAP instead.
 */
export const NOT_ICON_NAMES = new Set([
  "anthropic", // RoutingTab PROVIDER_TILE_DISPLAY.icon (field unused)
  "dahl", // provider catalog logo keys (src/shared/constants/providers/**) ↓
  "opencode",
  "openference",
  "proxy",
  "server",
  "unorouter",
  "vector_polygon",
  "icon", // Button ICON_SIZE / size map key `icon: "icon"`
]);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!/node_modules|__tests__/.test(e.name)) walk(p, out);
    } else if (/\.(tsx?|mjs)$/.test(e.name) && !/\.test\./.test(e.name)) out.push(p);
  }
  return out;
}

/** Icon names used in one source text (sorted, NOT_ICON_NAMES removed). */
export function collectNamesFromSource(text) {
  const names = new Set();
  const add = (g) => {
    if (g && !NOT_ICON_NAMES.has(g)) names.add(g);
  };
  if (/icon[:=]|<Icon\b/.test(text)) {
    for (const re of PATTERNS)
      for (const m of text.matchAll(re)) for (const g of m.slice(1)) add(g);
    for (const re of SLOT_PATTERNS)
      for (const slot of text.matchAll(re))
        for (const m of slot[1].matchAll(TERNARY_RE)) for (const g of m.slice(1)) add(g);
  }
  return [...names].sort();
}

export function collectNames(root = ROOT) {
  const names = new Set();
  for (const dir of DIRS)
    for (const file of walk(path.join(root, dir)))
      for (const n of collectNamesFromSource(fs.readFileSync(file, "utf8"))) names.add(n);
  return [...names].sort();
}

function existingMap() {
  const file = path.join(ROOT, "src/shared/constants/iconMap.ts");
  if (!fs.existsSync(file)) return new Set();
  return new Set(
    [...fs.readFileSync(file, "utf8").matchAll(/^\s+"?([a-z][a-z0-9_]+)"?:\s/gm)].map((m) => m[1])
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const names = collectNames();
  if (process.argv.includes("--names")) {
    console.log(names.join("\n"));
    process.exit(0);
  }
  const have = existingMap();
  const missing = names.filter((n) => !have.has(n));
  console.log(
    `// ${names.length} icon names in use; ${missing.length} missing from ICON_MAP. Map each real icon to a Lucide import in iconMap.ts;`
  );
  console.log(
    "// not an icon (logo key, size key… that never reaches <Icon>)? add it to NOT_ICON_NAMES above, with the proof."
  );
  for (const n of missing) console.log(`  ${n}: /* Lucide */,`);
}
