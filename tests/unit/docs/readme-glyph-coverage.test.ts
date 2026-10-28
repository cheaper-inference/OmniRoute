import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import subsetFont from "subset-font";
import { README_DIAGRAMS } from "../../../scripts/docs/gen-readme-diagrams.mjs";
import { SYMBOL_FALLBACKS } from "../../../scripts/docs/readme-fonts.mjs";

// readme-fonts.mjs decides coverage from the @fontsource latin *unicode ranges*, not from the
// font's cmap: a character inside the latin ranges that the face happens to lack would still
// count as covered and render in a fallback family on GitHub. This test is the cmap oracle on
// the committed files: for every drawn text node it resolves the embedded face the CSS cascade
// picks (family + weight) and asks subset-font whether that face carries each character —
// subsetting the embedded face to one character yields the same bytes as subsetting it to
// nothing when the glyph is absent. Per file it asserts 0 missing glyphs, 0 unresolved text
// nodes (no family, or a family/weight with no embedded face) and 0 embedded faces nobody uses.
//
// Cascade heuristic (explicit, on purpose — the diagrams only use these forms):
//   - faces: `@font-face{font-family:"F";font-style:normal;font-weight:W;src:url(data:…)}`
//     exactly as readme-fonts.mjs writes them;
//   - stylesheet rules read: single-class selectors only (`.name{…}`); compound or descendant
//     selectors are ignored, so a diagram that set a font through `.a .b{}` would show up here
//     as an unresolved node, not as a silent pass;
//   - per element, inline `style` / presentation attributes beat classes; among the element's
//     classes the rule that appears LAST in the stylesheet wins (CSS source order at equal
//     specificity); the walk then continues to the parent for whatever is still unset
//     (inheritance); font-weight defaults to 400, `bold`/`normal` keywords map to 700/400;
//   - only text inside <text>, <tspan> and <textPath> is drawn; whitespace and the characters
//     in SYMBOL_FALLBACKS (drawn by the next family in the stack by design) are exempt.

type Diagram = { name: string; out: string };
type FontDecl = { family?: string; weight?: string; order: number };

const EXEMPT = new Set<string>([" ", " ", "\n", "\t", ...SYMBOL_FALLBACKS]);

const FACE_RULE =
  /@font-face\{font-family:"([^"]+)";font-style:normal;font-weight:(\d+);src:url\(data:font\/woff2;base64,([A-Za-z0-9+/=]+)\)/g;

const firstFamily = (value: string | null | undefined): string | undefined => {
  if (!value) return undefined;
  const first = value
    .split(",")[0]
    .trim()
    .replace(/^["']|["']$/g, "");
  return first || undefined;
};

const numericWeight = (value: string | null | undefined): string | undefined => {
  if (!value) return undefined;
  const v = value.trim();
  if (/^\d+$/.test(v)) return v;
  if (v === "bold") return "700";
  if (v === "normal") return "400";
  return undefined;
};

function parseStylesheet(styleText: string) {
  const faces = new Map<string, Buffer>(); // "family|weight" → woff2 bytes
  for (const m of styleText.matchAll(FACE_RULE)) {
    faces.set(`${m[1]}|${m[2]}`, Buffer.from(m[3], "base64"));
  }
  const classes = new Map<string, FontDecl>();
  let order = 0;
  for (const m of styleText.matchAll(/(?:^|[\s}])\.([A-Za-z][\w-]*)\{([^}]*)\}/g)) {
    order += 1;
    const body = m[2];
    const family = firstFamily(body.match(/font-family:\s*([^;}]+)/)?.[1]);
    const weight = numericWeight(body.match(/font-weight:\s*([^;}]+)/)?.[1]);
    if (!family && !weight) continue;
    const cur = classes.get(m[1]) ?? { order: 0 };
    // later rules override earlier ones for the same class (source order)
    if (family) cur.family = family;
    if (weight) cur.weight = weight;
    cur.order = order;
    classes.set(m[1], cur);
  }
  return { faces, classes };
}

function resolveFace(el: Element, classes: Map<string, FontDecl>) {
  let family: string | undefined;
  let weight: string | undefined;
  for (let e: Element | null = el; e && e.nodeType === 1; e = e.parentElement) {
    const style = e.getAttribute("style") ?? "";
    const inlineFamily = firstFamily(
      style.match(/font-family:\s*([^;]+)/)?.[1] ?? e.getAttribute("font-family")
    );
    const inlineWeight = numericWeight(
      style.match(/font-weight:\s*([^;]+)/)?.[1] ?? e.getAttribute("font-weight")
    );
    if (!family && inlineFamily) family = inlineFamily;
    if (!weight && inlineWeight) weight = inlineWeight;
    const decls = (e.getAttribute("class") ?? "")
      .split(/\s+/)
      .filter(Boolean)
      .map((c) => classes.get(c))
      .filter((d): d is FontDecl => Boolean(d))
      .sort((a, b) => b.order - a.order); // last in the stylesheet first
    if (!family) family = decls.find((d) => d.family)?.family;
    if (!weight) weight = decls.find((d) => d.weight)?.weight;
    if (family && weight) break;
  }
  return { family, weight: weight ?? "400" };
}

const codePoint = (ch: string) =>
  `U+${ch.codePointAt(0)!.toString(16).toUpperCase().padStart(4, "0")}`;

for (const { name, out } of README_DIAGRAMS as Diagram[]) {
  test(`${name}: every drawn character exists in the embedded face it resolves to`, async () => {
    const svg = readFileSync(out, "utf8");
    const doc = new JSDOM(svg, { contentType: "image/svg+xml" }).window.document;
    const styleText = [...doc.querySelectorAll("style")].map((s) => s.textContent).join("\n");
    const { faces, classes } = parseStylesheet(styleText);
    assert.ok(faces.size > 0, `${out}: no embedded @font-face found`);

    const used = new Map<string, Set<string>>(); // face key → characters drawn with it
    const example = new Map<string, string>(); // face key + char → first string it appears in
    const unresolved: string[] = [];
    const walker = doc.createTreeWalker(doc.documentElement, 4 /* NodeFilter.SHOW_TEXT */);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || !["text", "tspan", "textPath"].includes(parent.tagName)) continue;
      const txt = node.textContent ?? "";
      if (!txt.trim()) continue;
      const { family, weight } = resolveFace(parent, classes);
      const key = `${family}|${weight}`;
      if (!family) {
        unresolved.push(`no font-family resolves for ${JSON.stringify(txt.slice(0, 50))}`);
        continue;
      }
      if (!faces.has(key)) {
        unresolved.push(`no embedded face for ${key}: ${JSON.stringify(txt.slice(0, 50))}`);
        continue;
      }
      if (!used.has(key)) used.set(key, new Set());
      for (const ch of txt) {
        if (EXEMPT.has(ch)) continue;
        used.get(key)!.add(ch);
        if (!example.has(key + ch)) example.set(key + ch, txt.slice(0, 40));
      }
    }
    assert.deepEqual(unresolved, [], `${out}: text nodes without an embedded face`);

    // cmap oracle: one subset-font call per (face, character), the empty subset cached per face
    const emptyLength = new Map<string, number>();
    const missing: string[] = [];
    for (const [key, chars] of used) {
      const buf = faces.get(key)!;
      if (!emptyLength.has(key)) {
        emptyLength.set(key, (await subsetFont(buf, "", { targetFormat: "woff2" })).length);
      }
      for (const ch of chars) {
        const one = await subsetFont(buf, ch, { targetFormat: "woff2" });
        if (one.length === emptyLength.get(key)) {
          missing.push(
            `${key} ${codePoint(ch)} '${ch}' in ${JSON.stringify(example.get(key + ch))}`
          );
        }
      }
    }
    assert.deepEqual(missing, [], `${out}: characters absent from the face they resolve to`);

    const unused = [...faces.keys()].filter((k) => !used.has(k));
    assert.deepEqual(unused, [], `${out}: embedded faces no text node resolves to`);
  });
}
