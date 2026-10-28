import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Vazirmatn (self-hosted, @fontsource/vazirmatn) gives the Arabic-script RTL locales (fa, ar, ur)
// a real typeface. Contract: the font may only ever be requested by an RTL document. Browsers
// fetch an @font-face file lazily — only when a used `font-family` names it AND the rendered
// text falls inside its `unicode-range` — so the family must be referenced exclusively from
// rules scoped to `html[dir="rtl"]` (layout.tsx sets `dir="rtl"` only for RTL_LOCALES). An LTR
// page — even one showing "فارسی" in the language switcher — then never downloads it.
// The browser-level proof of the same contract lives in tests/e2e/rtl-font-loading.spec.ts.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");
const css = read("src/app/globals.css");
const requireFromRoot = createRequire(path.join(ROOT, "package.json"));

const RTL_SCOPE = 'html[dir="rtl"]';
const VAZIRMATN_WEIGHTS = ["400", "500", "600", "700"];

type Declaration = { scopes: string[]; block: number; text: string };

/** Every declaration (or at-rule statement) in a stylesheet, with its enclosing block preludes. */
function declarations(source: string): Declaration[] {
  const text = source.replace(/\/\*[\s\S]*?\*\//g, "");
  const out: Declaration[] = [];
  const stack: string[] = [];
  const blocks: number[] = [];
  let nextBlock = 0;
  let buffer = "";
  for (const ch of text) {
    if (ch === "{") {
      stack.push(buffer.trim());
      blocks.push(nextBlock++);
      buffer = "";
    } else if (ch === "}") {
      if (buffer.trim())
        out.push({ scopes: [...stack], block: blocks.at(-1) ?? -1, text: buffer.trim() });
      stack.pop();
      blocks.pop();
      buffer = "";
    } else if (ch === ";") {
      if (buffer.trim())
        out.push({ scopes: [...stack], block: blocks.at(-1) ?? -1, text: buffer.trim() });
      buffer = "";
    } else {
      buffer += ch;
    }
  }
  return out;
}

const splitSelectors = (prelude: string) =>
  prelude
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const isFontFace = (d: Declaration) => d.scopes.some((s) => s.startsWith("@font-face"));
const mentionsVazirmatn = (d: Declaration) => /vazirmatn/i.test(d.text);

test("globals.css self-hosts Vazirmatn through @fontsource (no Google Fonts / next/font)", () => {
  const imports = VAZIRMATN_WEIGHTS.map((w) => `@import "@fontsource/vazirmatn/${w}.css";`);
  for (const line of imports) assert.ok(css.includes(line), `globals.css has ${line}`);
  const kitImport = css.indexOf('@import "../../packages/ui-kit/src/ci-ui.css";');
  assert.ok(
    imports.every((line) => css.indexOf(line) < kitImport),
    "Vazirmatn is imported with the other fonts, before the kit"
  );
  assert.doesNotMatch(css, /fonts\.googleapis\.com/);
  assert.doesNotMatch(css, /next\/font/);
  assert.equal(
    requireFromRoot("@fontsource/vazirmatn/package.json").license,
    "OFL-1.1",
    "Vazirmatn ships under the SIL Open Font License"
  );
});

test("every reference to Vazirmatn in globals.css is scoped to html[dir=rtl]", () => {
  const refs = declarations(css).filter(
    (d) => mentionsVazirmatn(d) && !d.text.startsWith("@import")
  );
  assert.ok(refs.length >= 1, "the RTL font stack mentions Vazirmatn");
  for (const ref of refs) {
    const selectors = splitSelectors(ref.scopes[ref.scopes.length - 1] ?? "");
    assert.ok(selectors.length > 0, `"${ref.text}" sits inside a style rule`);
    for (const selector of selectors) {
      assert.ok(
        selector.startsWith(RTL_SCOPE),
        `"${selector}" (declaring "${ref.text}") must be scoped to ${RTL_SCOPE}`
      );
    }
    // `:lang()` / `[lang=…]` would also match the language switcher's native names in LTR pages.
    assert.doesNotMatch(ref.scopes.join(" "), /:lang\(|\[lang/);
  }
});

test("the RTL rule overrides the kit font token with Inter first, then Vazirmatn, at 0 tracking", () => {
  const rtl = declarations(css).filter((d) => {
    const selectors = splitSelectors(d.scopes[d.scopes.length - 1] ?? "");
    return selectors.includes(RTL_SCOPE) && selectors.includes(`${RTL_SCOPE} .ci-theme`);
  });
  const value = (prop: string) =>
    rtl
      .find((d) => d.text.startsWith(`${prop}:`))
      ?.text.slice(prop.length + 1)
      .trim();
  const stack = value("--ci-font-ui");
  assert.ok(stack, "--ci-font-ui is redefined for html[dir=rtl] (the kit sets it on .ci-theme)");
  assert.match(
    stack,
    /^"Inter",\s*"Vazirmatn",/,
    "Latin stays Inter; Arabic script falls to Vazirmatn"
  );
  assert.match(stack, /sans-serif$/);
  assert.equal(value("--font-sans"), "var(--ci-font-ui)");
  assert.equal(value("letter-spacing"), "0", "tracking breaks Arabic-script joining");
});

test("no other stylesheet or source file can pull Vazirmatn into an LTR page", () => {
  const offenders: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules") walk(rel);
      } else if (/\.(css|scss|tsx?|jsx?|mjs)$/.test(entry.name) && rel !== "src/app/globals.css") {
        if (/vazirmatn/i.test(read(rel))) offenders.push(rel);
      }
    }
  };
  walk("src");
  walk("packages/ui-kit/src");
  assert.deepEqual(offenders, [], "only globals.css (RTL-scoped) may reference Vazirmatn");
});

test("the imported @fontsource files only declare faces, with the Arabic face range-limited", () => {
  for (const weight of VAZIRMATN_WEIGHTS) {
    const file = requireFromRoot.resolve(`@fontsource/vazirmatn/${weight}.css`);
    const decls = declarations(fs.readFileSync(file, "utf8"));
    assert.ok(decls.length > 0);
    assert.ok(decls.every(isFontFace), `${weight}.css contains nothing but @font-face blocks`);
    const arabicSrc = decls.find((d) => /^src:.*vazirmatn-arabic-/.test(d.text));
    assert.ok(arabicSrc, `${weight}.css declares the arabic subset`);
    const range = decls.find(
      (d) => d.block === arabicSrc.block && d.text.startsWith("unicode-range:")
    );
    assert.ok(range, `${weight}.css limits the arabic face with unicode-range`);
    assert.match(range.text, /U\+0600-06FF/);
    assert.doesNotMatch(range.text, /U\+0000-00FF/, "Latin never triggers the Arabic file");
  }
});

test("dir=rtl is only emitted for the RTL locales", () => {
  const i18n = JSON.parse(read("config/i18n.json")) as { rtl: string[] };
  assert.deepEqual([...i18n.rtl].sort(), ["ar", "fa", "he", "ur"]);
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /const isRtl = RTL_LOCALES\.includes\(/);
  assert.match(layout, /dir=\{isRtl \? "rtl" : "ltr"\}/);
});
