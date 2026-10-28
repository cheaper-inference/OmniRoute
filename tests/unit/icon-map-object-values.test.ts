import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The literal scanner behind icon-map-coverage (scripts/dev/gen-icon-map.mjs) only sees names
// written straight into an icon slot (`<Icon name="x">`, `icon="x"`, `icon: "x"`). Names kept as
// VALUES of a lookup object (`const KIND_ICONS = { pagerduty: "notifications_active" }` read by
// `<Icon name={KIND_ICONS[kind]}>`) escaped it, so unmapped names silently rendered the Material
// ligature fallback (lote 8: five profile badge icons; F4 sweep: webhook "coming soon" tiles,
// the media OCR tab). This test finds those lookup objects and checks every value against
// ICON_MAP — a value must resolve to a Lucide icon, not be missing nor `null`.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DIRS = ["src/app", "src/shared"];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/node_modules|__tests__/.test(entry.name)) walk(p, out);
    } else if (/\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name)) out.push(p);
  }
  return out;
}

/** Text of the balanced `{…}` block whose opening brace is at `open` (exclusive of braces). */
function braceBody(src: string, open: number): string | null {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      const end = src.indexOf(c, i + 1);
      if (end < 0) return null;
      i = end;
    } else if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  return null;
}

/** `\bNAME\b` matcher for an identifier, with every regex metacharacter escaped. */
function identifierRe(name: string): RegExp {
  return new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
}

/** Expressions that end up as an icon name: <Icon name={…}>, icon={…}, icon: …, span content. */
export function iconSlotExpressions(src: string): string[] {
  const slots: string[] = [];
  const openers = [
    /<Icon\b[^>]*?\bname=\{/g,
    /\b(?:icon|iconRight|emptyIcon|leadingIcon)=\{/g,
    /material-symbols-outlined[^>]*>\s*\{/g,
  ];
  for (const re of openers)
    for (const m of src.matchAll(re)) {
      const body = braceBody(src, (m.index ?? 0) + m[0].length - 1);
      if (body) slots.push(body);
    }
  // `icon: KIND_ICON[kind] ?? "category"` (options handed to SegmentedControl, Tabs…)
  for (const m of src.matchAll(/\bicon:\s*([^,\n}]+)/g)) slots.push(m[1]);
  // One hop: `const materialIcon = BADGE_ICONS[icon]; … <Icon name={materialIcon} />`
  const hops: string[] = [];
  for (const m of src.matchAll(/\b(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*([^;\n]+)/g)) {
    const [, name, expr] = m;
    if (slots.some((s) => identifierRe(name).test(s))) hops.push(expr);
  }
  return [...slots, ...hops];
}

/** `const NAME… = { key: "value", … }` objects whose NAME is read by an icon slot. */
export function iconLookupValues(src: string): Array<{ object: string; value: string }> {
  const slots = iconSlotExpressions(src);
  const found: Array<{ object: string; value: string }> = [];
  for (const m of src.matchAll(/\bconst\s+([A-Za-z_$][\w$]*)\s*(?::[^=]+)?=\s*\{/g)) {
    const name = m[1];
    if (!slots.some((s) => identifierRe(name).test(s))) continue;
    const body = braceBody(src, (m.index ?? 0) + m[0].length - 1);
    if (body == null) continue;
    const flat = !/\{/.test(body);
    // Flat lookup → every string value is an icon name; nested config objects → only `icon:`.
    const re = flat
      ? /(?:^|[,{\n])\s*(?:[A-Za-z_$][\w$]*|"[^"]+"|'[^']+')\s*:\s*"([^"]*)"/g
      : /\bicon:\s*"([^"]*)"/g;
    for (const v of body.matchAll(re)) found.push({ object: name, value: v[1] });
  }
  return found;
}

test("the lookup-object detector reads icon maps and ignores non-icon objects", () => {
  const source = `
    const KIND_ICONS: Record<Kind, string> = { slack: "chat", pagerduty: "notifications_active" };
    const KIND_COLORS = { slack: "text-chart-1" };
    const BADGE_ICONS: Record<string, string> = { "git-merge": "merge", trophy: "emoji_events" };
    const STATUS = { ok: { icon: "check_circle", color: "text-success" } };
    function A({ kind }) { return <Icon name={KIND_ICONS[kind]} className={KIND_COLORS[kind]} />; }
    function B({ icon }) { const materialIcon = icon ? BADGE_ICONS[icon] : null; return <Icon name={materialIcon} />; }
    function C({ s }) { const config = STATUS[s]; return <Icon name={config.icon} />; }
    const tabs = kinds.map((k) => ({ value: k, icon: TAB_ICON[k] ?? "category" }));
    const TAB_ICON = { ocr: "document_scanner" };
  `;
  assert.deepEqual(
    iconLookupValues(source).map((f) => `${f.object}:${f.value}`),
    [
      "KIND_ICONS:chat",
      "KIND_ICONS:notifications_active",
      "BADGE_ICONS:merge",
      "BADGE_ICONS:emoji_events",
      "STATUS:check_circle",
      "TAB_ICON:document_scanner",
    ]
  );
});

test("every icon name held as a lookup-object value resolves to a Lucide icon in ICON_MAP", async () => {
  const { ICON_MAP } = await import("../../src/shared/constants/iconMap.ts");
  const missing: string[] = [];
  let checked = 0;
  for (const dir of DIRS)
    for (const file of walk(path.join(ROOT, dir))) {
      for (const { object, value } of iconLookupValues(fs.readFileSync(file, "utf8"))) {
        checked++;
        if (!ICON_MAP[value]) missing.push(`${path.relative(ROOT, file)} ${object}: "${value}"`);
      }
    }
  assert.ok(
    checked > 50,
    `the detector found only ${checked} lookup values; expected well over 50`
  );
  assert.deepEqual(
    missing,
    [],
    `lookup values without a Lucide icon (map them in src/shared/constants/iconMap.ts):\n${missing.join("\n")}`
  );
});

test("every Material name the literal scanner finds resolves to Lucide (no null entries in use)", async () => {
  const { collectNames } = await import("../../scripts/dev/gen-icon-map.mjs");
  const { ICON_MAP } = await import("../../src/shared/constants/iconMap.ts");
  const unresolved = (collectNames(ROOT) as string[]).filter((n) => !ICON_MAP[n]);
  assert.deepEqual(
    unresolved,
    [],
    `names in use without a Lucide icon (they would draw the <Icon> placeholder glyph):\n${unresolved.join("\n")}`
  );
});
