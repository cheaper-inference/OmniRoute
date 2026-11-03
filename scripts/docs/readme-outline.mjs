// The last step of every README diagram: render the kit's Switzer text roles as vector outlines.
//
// Why outlines and not a subset: packages/ui-kit/src/fonts/FFL.txt forbids subsetting and format
// conversion without written consent and requires an embedded font to be non-extractable, while
// §01 allows "vector files, scalable drawings". So Switzer is NEVER embedded in a README SVG, whole
// or subset, as a data: URI or anywhere else; the only thing that leaves this module is drawings.
//
// outlineSvg() takes a finished SVG and, for every <text> whose resolved font-family is not the
// code face, shapes it with HarfBuzz at the real weight, size and tracking and draws the glyphs as
// <use> references into per-weight <defs> paths. The fill stays on the wrapping <g> through the
// same classes and inline style, so light/dark and SMIL opacity keep working. The original string
// stays in the file as an invisible <text class="ol"> (fill-opacity 0), which is what
// scripts/check/check-docs-counts-sync.mjs and anything else reading the raw file sees.
//
// Code roles (font-family "CI Mono": .cmd .term .term-lg .mono .mono-sm .mono-xs) stay real text on
// the embedded OFL IBM Plex Mono subset, which this step builds from the characters that stay
// visible, so the subset can never miss a glyph (readme-fonts.mjs throws on one it cannot embed).
//
// The cascade below implements what a browser does for these files and fails loudly on anything
// else (an attribute it does not understand, a weight outside the kit's 400/500/600, a character
// neither Switzer nor the drawn-symbol table carries): inline style > class rules in source order >
// presentation attribute > parent. Only single-class rules are read.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fontverter from "fontverter";
import * as hb from "harfbuzzjs";
import { JSDOM } from "jsdom";
import { buildFontFaceCss, CODE_FAMILY } from "./readme-fonts.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SVG_NS = "http://www.w3.org/2000/svg";

// The kit's weights (packages/ui-kit/src/ci-tokens.css: regular, medium, semibold; no 700).
export const SWITZER_WEIGHTS = [400, 500, 600];
export const OUTLINE_CLASS = "ol";

const sfnt = await fontverter.convert(
  readFileSync(resolve(ROOT, "packages/ui-kit/src/fonts/Switzer-Variable.woff2")),
  "sfnt"
);
const face = new hb.Face(new hb.Blob(sfnt));
const UPM = face.upem;
const fonts = new Map(
  SWITZER_WEIGHTS.map((wght) => {
    const font = new hb.Font(face);
    font.setScale(UPM, UPM);
    font.setVariations([new hb.Variation("wght", wght)]);
    return [wght, font];
  })
);

function fontFor(weight) {
  const font = fonts.get(weight);
  if (!font) {
    throw new Error(`readme-outline: weight ${weight} is not one of ${SWITZER_WEIGHTS.join("/")}`);
  }
  return font;
}

// CSS turns ligatures off under letter-spacing; the shaper has to be told.
const NO_LIGATURES = [new hb.Feature("liga", 0), new hb.Feature("clig", 0)];

function shape(text, weight, tracked) {
  const buffer = new hb.Buffer();
  buffer.addText(text);
  buffer.guessSegmentProperties();
  hb.shape(fontFor(weight), buffer, tracked ? NO_LIGATURES : undefined);
  return buffer.getGlyphInfosAndPositions();
}

// --- path data ------------------------------------------------------------------------------

const PATH_COMMAND = /([MLQCZ])([^MLQCZ]*)/g;
const ARG_COUNT = { L: 2, Q: 4, C: 6 };

const joinNumbers = (nums, needsSeparator) =>
  nums.reduce((out, n, i) => out + (i > 0 || needsSeparator ? (n < 0 ? "" : " ") : "") + n, "");

// Absolute M/L/Q/C/Z in floating font units → integer-unit relative path with the implicit-repeat
// and h/v short forms. Rounding is against the already-rounded pen, so errors never accumulate.
export function compactPath(d, map = (x, y) => [x, y]) {
  let out = "";
  let last = "";
  let pen = [0, 0];
  let start = [0, 0];
  for (const [, command, rawArgs] of d.matchAll(PATH_COMMAND)) {
    const args = rawArgs.trim()
      ? rawArgs
          .trim()
          .split(/[\s,]+/)
          .map(Number)
      : [];
    const points = [];
    for (let i = 0; i < args.length; i += 2) {
      const [x, y] = map(args[i], args[i + 1]);
      points.push(Math.round(x), Math.round(y));
    }
    if (command === "Z") {
      out += "z";
      last = "z";
      pen = start;
      continue;
    }
    if (command === "M") {
      out += `M${joinNumbers(points, false)}`;
      last = "M";
      pen = start = [points[0], points[1]];
      continue;
    }
    if (points.length !== ARG_COUNT[command]) {
      throw new Error(`readme-outline: malformed path command ${command}${rawArgs}`);
    }
    const end = [points.at(-2), points.at(-1)];
    const relative = points.map((v, i) => v - pen[i % 2]);
    let letter = command.toLowerCase();
    let nums = relative;
    if (letter === "l") {
      if (relative[0] === 0 && relative[1] === 0) continue;
      if (relative[1] === 0) {
        letter = "h";
        nums = [relative[0]];
      } else if (relative[0] === 0) {
        letter = "v";
        nums = [relative[1]];
      }
    }
    if (letter === last) out += joinNumbers(nums, true);
    else out += letter + joinNumbers(nums, false);
    last = letter;
    pen = end;
  }
  return out;
}

// --- drawn symbols --------------------------------------------------------------------------
// Switzer has no arrows or geometric shapes, and the @fontsource latin files of Inter do not carry
// them either (only ↑ ↓), so these are drawn here, in font units, on Switzer's own metrics: the
// stroke and the vertical centre come from its minus sign at the requested weight, so they sit on
// the math axis and match the surrounding stems.

function minusMetrics(weight) {
  const [glyph] = shape("−", weight, false);
  const box = fontFor(weight).glyphExtents(glyph.codepoint);
  const height = Math.abs(box.height);
  return { stroke: height, axis: box.yBearing - height / 2 };
}

const polygonArea = (pts) =>
  pts.reduce((sum, [x, y], i) => {
    const [nx, ny] = pts[(i + 1) % pts.length];
    return sum + x * ny - nx * y;
  }, 0);

// One closed subpath, counter-clockwise: overlapping pieces of a symbol union under nonzero fill.
function polygon(pts) {
  const ordered = polygonArea(pts) < 0 ? [...pts].reverse() : pts;
  return `M${ordered[0].join(" ")}${ordered
    .slice(1)
    .map((p) => `L${p.join(" ")}`)
    .join("")}Z`;
}

// A two-segment stroke with a mitered joint and butt ends, as a polygon.
function chevron([a, b, c], width) {
  const unit = ([x0, y0], [x1, y1]) => {
    const len = Math.hypot(x1 - x0, y1 - y0);
    return [(x1 - x0) / len, (y1 - y0) / len];
  };
  const h = width / 2;
  const u0 = unit(a, b);
  const u1 = unit(b, c);
  const n0 = [-u0[1], u0[0]];
  const n1 = [-u1[1], u1[0]];
  const bisector = [n0[0] + n1[0], n0[1] + n1[1]];
  const scale = h / (bisector[0] * n0[0] + bisector[1] * n0[1]);
  const miter = [bisector[0] * scale, bisector[1] * scale];
  return polygon([
    [a[0] + n0[0] * h, a[1] + n0[1] * h],
    [b[0] + miter[0], b[1] + miter[1]],
    [c[0] + n1[0] * h, c[1] + n1[1] * h],
    [c[0] - n1[0] * h, c[1] - n1[1] * h],
    [b[0] - miter[0], b[1] - miter[1]],
    [a[0] - n0[0] * h, a[1] - n0[1] * h],
  ]);
}

const CIRCLE_K = 0.5523;

function circle(cx, cy, r, hole = false) {
  const k = r * CIRCLE_K;
  const s = hole ? -1 : 1; // the hole winds the other way, so nonzero fill leaves it empty
  return (
    `M${cx + r} ${cy}` +
    `C${cx + r} ${cy + s * k} ${cx + k} ${cy + s * r} ${cx} ${cy + s * r}` +
    `C${cx - k} ${cy + s * r} ${cx - r} ${cy + s * k} ${cx - r} ${cy}` +
    `C${cx - r} ${cy - s * k} ${cx - k} ${cy - s * r} ${cx} ${cy - s * r}` +
    `C${cx + k} ${cy - s * r} ${cx + r} ${cy - s * k} ${cx + r} ${cy}Z`
  );
}

const ARROW_ADVANCE = 900;
const ARROW_BEARING = 70;
const ARROW_HEAD = 220;
const CIRCLE_ADVANCE = 760;
const CIRCLE_RADIUS = 300;

// A horizontal arrow from tailX to tipX on the axis, `heads` listing which ends carry a head.
function arrowPieces(fromX, toX, axis, stroke, heads, map) {
  const h = stroke / 2;
  const pieces = [];
  const place = (pts) => pts.map(([x, y]) => map(x, y));
  pieces.push(
    polygon(
      place([
        [fromX, axis + h],
        [toX, axis + h],
        [toX, axis - h],
        [fromX, axis - h],
      ])
    )
  );
  const head = (tipX, dir) => {
    const joint = tipX - dir * h * Math.SQRT2;
    return chevron(
      place([
        [joint - dir * ARROW_HEAD, axis + ARROW_HEAD],
        [joint, axis],
        [joint - dir * ARROW_HEAD, axis - ARROW_HEAD],
      ]),
      stroke
    );
  };
  if (heads.includes("to")) pieces.push(head(toX, 1));
  if (heads.includes("from")) pieces.push(head(fromX, -1));
  return pieces.join("");
}

const identity = (x, y) => [x, y];

const SYMBOLS = {
  "→": ({ axis, stroke }) => ({
    advance: ARROW_ADVANCE,
    d: arrowPieces(ARROW_BEARING, ARROW_ADVANCE - ARROW_BEARING, axis, stroke, ["to"], identity),
  }),
  "←": ({ axis, stroke }) => ({
    advance: ARROW_ADVANCE,
    d: arrowPieces(ARROW_BEARING, ARROW_ADVANCE - ARROW_BEARING, axis, stroke, ["from"], identity),
  }),
  "↔": ({ axis, stroke }) => ({
    advance: ARROW_ADVANCE,
    d: arrowPieces(
      ARROW_BEARING,
      ARROW_ADVANCE - ARROW_BEARING,
      axis,
      stroke,
      ["from", "to"],
      identity
    ),
  }),
  "↑": ({ axis, stroke }) => verticalArrow(axis, stroke, 1),
  "↓": ({ axis, stroke }) => verticalArrow(axis, stroke, -1),
  "●": ({ axis }) => ({
    advance: CIRCLE_ADVANCE,
    d: circle(CIRCLE_ADVANCE / 2, axis, CIRCLE_RADIUS),
  }),
  "○": ({ axis, stroke }) => ({
    advance: CIRCLE_ADVANCE,
    d:
      circle(CIRCLE_ADVANCE / 2, axis, CIRCLE_RADIUS) +
      circle(CIRCLE_ADVANCE / 2, axis, CIRCLE_RADIUS - stroke, true),
  }),
  // Circle with lower half black: the ring plus a half disc under the axis.
  "◒": ({ axis, stroke }) => {
    const cx = CIRCLE_ADVANCE / 2;
    const r = CIRCLE_RADIUS;
    const k = r * CIRCLE_K;
    return {
      advance: CIRCLE_ADVANCE,
      d:
        circle(cx, axis, r) +
        circle(cx, axis, r - stroke, true) +
        `M${cx + r} ${axis}L${cx - r} ${axis}` +
        `C${cx - r} ${axis - k} ${cx - k} ${axis - r} ${cx} ${axis - r}` +
        `C${cx + k} ${axis - r} ${cx + r} ${axis - k} ${cx + r} ${axis}Z`,
    };
  },
  "✓": ({ axis, stroke }) => ({
    advance: CIRCLE_ADVANCE,
    d: chevron(
      [
        [110, axis - 20],
        [300, axis - 220],
        [650, axis + 300],
      ],
      stroke * 1.15
    ),
  }),
  "▮": () => ({
    advance: 560,
    d: polygon([
      [90, 0],
      [470, 0],
      [470, 720],
      [90, 720],
    ]),
  }),
};

function verticalArrow(axis, stroke, dir) {
  const advance = 640;
  const half = 340;
  // Drawn horizontally around the origin, then turned onto the vertical through the advance's middle.
  const turn = (x, y) => [advance / 2 - (y - axis), axis + x];
  return {
    advance,
    d: arrowPieces(-dir * half, dir * half, axis, stroke, ["to"], turn),
  };
}

// The superscript has no shape of its own to draw: it is Switzer's n, scaled and raised.
const SUPERSCRIPT_N_SCALE = 0.62;
const SUPERSCRIPT_N_RAISE = 340;

const symbolCache = new Map();

function symbolFor(char, weight) {
  const key = `${weight}|${char}`;
  if (!symbolCache.has(key)) {
    let symbol;
    if (char === "ⁿ") {
      const [n] = shape("n", weight, false);
      symbol = {
        advance: Math.round(n.xAdvance * SUPERSCRIPT_N_SCALE),
        d: compactPath(fontFor(weight).glyphToPath(n.codepoint), (x, y) => [
          x * SUPERSCRIPT_N_SCALE,
          y * SUPERSCRIPT_N_SCALE + SUPERSCRIPT_N_RAISE,
        ]),
      };
    } else {
      const raw = SYMBOLS[char](minusMetrics(weight));
      symbol = { advance: raw.advance, d: compactPath(raw.d) };
    }
    symbolCache.set(key, symbol);
  }
  return symbolCache.get(key);
}

/** The characters this module draws itself because Switzer has no glyph for them. */
export const DRAWN_SYMBOLS = new Set([...Object.keys(SYMBOLS), "ⁿ"]);

/**
 * A drawn symbol as path data in 1/1000 em, y up, for a generator that needs one as a shape next to
 * real code text (the terminal's status dots: the mono subset has no such glyph).
 * @returns {{ d: string, advance: number }}
 */
export function drawnSymbol(char, weight = 500) {
  if (!DRAWN_SYMBOLS.has(char)) throw new Error(`readme-outline: no drawn symbol for ${char}`);
  return symbolFor(char, weight);
}

// --- shaping a run ---------------------------------------------------------------------------

const codePoint = (c) => `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;

// A run as glyph records { ref, x (font units from the run origin) } plus its advance in px.
function shapeRun(text, { size, weight, tracking }) {
  const scale = size / UPM;
  const trackingUnits = tracking / scale;
  const glyphs = [];
  let pen = 0;
  const emit = (kind, id, advance, xOffset = 0) => {
    glyphs.push({ kind, id, x: pen + xOffset });
    pen += advance + trackingUnits;
  };
  for (const piece of text.split(/([→←↔↑↓●○◒✓▮ⁿ])/u)) {
    if (!piece) continue;
    if (DRAWN_SYMBOLS.has(piece)) {
      emit("symbol", piece, symbolFor(piece, weight).advance);
      continue;
    }
    for (const g of shape(piece, weight, tracking !== 0)) {
      if (g.codepoint === 0) {
        const char = String.fromCodePoint(piece.slice(g.cluster).codePointAt(0));
        throw new Error(
          `readme-outline: Switzer has no glyph for ${codePoint(char)} '${char}' in "${text}" and it is not a drawn symbol`
        );
      }
      emit("glyph", g.codepoint, g.xAdvance, g.xOffset);
    }
  }
  // Letter-spacing sits after every glyph in CSS; a trailing one would push anchored text off its edge.
  const width = glyphs.length ? (pen - trackingUnits) * scale : 0;
  return { glyphs, width, scale };
}

/**
 * Width in px of `text` set in Switzer, the same way the outlining step will draw it. Runs of spaces
 * collapse as in SVG text; a space at either end counts, since a run usually continues after it.
 * Generators use this wherever they would otherwise guess a width.
 * @param {string} text
 * @param {{ size: number, weight: number, tracking?: number }} style tracking in px
 */
export function measureText(text, { size, weight, tracking = 0 }) {
  return shapeRun(text.replace(/[ \t\r\n]+/g, " "), { size, weight, tracking }).width;
}

// --- the cascade -----------------------------------------------------------------------------

const parseDeclarations = (body) => {
  const map = new Map();
  for (const decl of body.split(";")) {
    const i = decl.indexOf(":");
    if (i > 0) map.set(decl.slice(0, i).trim(), decl.slice(i + 1).trim());
  }
  return map;
};

const CLASS_RULE = /(?<![\w-])\.([A-Za-z][\w-]*)\{([^{}]*)\}/g;

function parseClassRules(styleText) {
  const rules = new Map();
  let order = 0;
  for (const m of styleText.matchAll(CLASS_RULE)) {
    const entry = rules.get(m[1]) ?? { decls: [] };
    entry.decls.push({ order: ++order, map: parseDeclarations(m[2]) });
    rules.set(m[1], entry);
  }
  return rules;
}

// The declared value of one inherited property and the element that declared it.
function cascade(el, prop, rules) {
  for (let e = el; e && e.nodeType === 1; e = e.parentNode) {
    const inline = parseDeclarations(e.getAttribute("style") ?? "").get(prop);
    if (inline !== undefined) return { value: inline, on: e };
    let best = null;
    for (const name of (e.getAttribute("class") ?? "").split(/\s+/).filter(Boolean)) {
      for (const decl of rules.get(name)?.decls ?? []) {
        if (decl.map.has(prop) && (!best || decl.order > best.order)) best = decl;
      }
    }
    if (best) return { value: best.map.get(prop), on: e };
    const attr = e.getAttribute(prop);
    if (attr !== null) return { value: attr, on: e };
  }
  return { value: undefined, on: null };
}

function px(value, what) {
  const m = String(value).match(/^(-?[\d.]+)(px)?$/);
  if (!m) throw new Error(`readme-outline: expected a px length for ${what}, got "${value}"`);
  return Number(m[1]);
}

function fontSize(el, rules) {
  const { value } = cascade(el, "font-size", rules);
  if (value === undefined) {
    throw new Error(
      `readme-outline: no font-size resolves for "${el.textContent.slice(0, 40)}" (class="${el.getAttribute("class")}")`
    );
  }
  return px(value, "font-size");
}

function fontWeight(el, rules) {
  const { value = "400" } = cascade(el, "font-weight", rules);
  const named = { normal: 400, bold: 700 }[value];
  return named ?? Number(value);
}

// em resolves against the element that declared it; the computed length is what inherits.
function letterSpacing(el, rules) {
  const { value, on } = cascade(el, "letter-spacing", rules);
  if (value === undefined || value === "normal") return 0;
  const em = String(value).match(/^(-?[\d.]+)em$/);
  return em ? Number(em[1]) * fontSize(on, rules) : px(value, "letter-spacing");
}

function isCode(el, rules) {
  const { value } = cascade(el, "font-family", rules);
  return Boolean(value?.includes(`"${CODE_FAMILY}"`));
}

// --- laying out one <text> -------------------------------------------------------------------

const FONT_ATTRS = ["font-size", "font-weight", "letter-spacing"];
const TEXT_ATTRS = new Set([
  "x",
  "y",
  "class",
  "style",
  "text-anchor",
  "opacity",
  "fill-opacity",
  ...FONT_ATTRS,
]);
const TSPAN_ATTRS = new Set(["class", "style", "fill-opacity", ...FONT_ATTRS]);

function assertAttrs(el, allowed) {
  for (const { name } of el.attributes) {
    if (!allowed.has(name)) {
      throw new Error(
        `readme-outline: <${el.tagName} ${name}="…"> is not supported on outlined text ("${el.textContent.slice(0, 40)}")`
      );
    }
  }
}

// Text nodes and tspans in document order, with SVG's default whitespace collapsing applied across
// run boundaries: a run of spaces is one space, none at the very start or end of the element.
function collectRuns(textEl) {
  const raw = [];
  const walk = (node) => {
    for (const child of node.childNodes) {
      if (child.nodeType === 3) raw.push({ el: node, text: child.nodeValue });
      else if (child.nodeType === 1 && child.tagName === "tspan") {
        assertAttrs(child, TSPAN_ATTRS);
        walk(child);
      } else if (child.nodeType === 1 && child.tagName !== "animate") {
        throw new Error(
          `readme-outline: <${child.tagName}> inside outlined <text> is not supported`
        );
      }
    }
  };
  walk(textEl);
  let afterSpace = true;
  const runs = [];
  for (const { el, text } of raw) {
    let out = "";
    for (const ch of text) {
      const space = /[ \t\r\n]/.test(ch);
      if (space && afterSpace) continue;
      out += space ? " " : ch;
      afterSpace = space;
    }
    if (out) runs.push({ el, text: out });
  }
  while (runs.length && runs.at(-1).text.endsWith(" ")) {
    const last = runs.at(-1);
    last.text = last.text.slice(0, -1);
    if (!last.text) runs.pop();
  }
  return runs;
}

function layoutText(textEl, rules) {
  assertAttrs(textEl, TEXT_ATTRS);
  const runs = collectRuns(textEl).map((run) => {
    const style = {
      size: fontSize(run.el, rules),
      weight: fontWeight(run.el, rules),
      tracking: letterSpacing(run.el, rules),
    };
    return { ...run, ...style, ...shapeRun(run.text, style) };
  });
  const lastIndex = runs.length - 1;
  // Tracking stays between runs; only the very last glyph of the element drops it.
  const width = runs.reduce((sum, r, i) => sum + r.width + (i < lastIndex ? r.tracking : 0), 0);
  const { value: anchor = "start" } = cascade(textEl, "text-anchor", rules);
  const x = Number(textEl.getAttribute("x") ?? 0);
  const y = Number(textEl.getAttribute("y") ?? 0);
  const left = anchor === "middle" ? x - width / 2 : anchor === "end" ? x - width : x;
  let pen = left;
  for (const r of runs) {
    r.left = pen;
    pen += r.width + r.tracking;
  }
  return { runs, left, width, y, size: Math.max(0, ...runs.map((r) => r.size)) };
}

// --- writing the result ----------------------------------------------------------------------

const fmt = (v, digits = 2) =>
  String(+v.toFixed(digits)).replace(/^0\./, ".").replace(/^-0\./, "-.");

const stripFontDeclarations = (style) =>
  (style ?? "")
    .split(";")
    .map((d) => d.trim())
    .filter((d) => d && !/^(font-|letter-spacing)/.test(d))
    .join(";");

function shortId(n) {
  return `g${n.toString(36)}`;
}

function outlineInto(doc, defs, ids, textEl, rules) {
  const layout = layoutText(textEl, rules);
  const element = (name, attrs = {}) => {
    const el = doc.createElementNS(SVG_NS, name);
    for (const [k, v] of Object.entries(attrs)) if (v) el.setAttribute(k, v);
    return el;
  };
  const ref = (weight, g) => {
    const key = `${weight}|${g.kind}|${g.id}`;
    if (!ids.has(key)) {
      const d =
        g.kind === "symbol"
          ? symbolFor(g.id, weight).d
          : compactPath(fontFor(weight).glyphToPath(g.id));
      // A space shapes to a glyph with no outline: its id stays empty and draws nothing.
      if (!d) {
        ids.set(key, null);
      } else {
        const id = shortId(defs.childElementCount);
        defs.appendChild(doc.createTextNode("\n    "));
        defs.appendChild(element("path", { id, d }));
        ids.set(key, id);
      }
    }
    return ids.get(key);
  };
  const runGroup = (run, attrs) => {
    const group = element("g", {
      ...attrs,
      transform: `translate(${fmt(run.left)} ${fmt(layout.y)}) scale(${fmt(run.scale, 5)} ${fmt(-run.scale, 5)})`,
    });
    for (const g of run.glyphs) {
      const id = ref(run.weight, g);
      if (!id) continue;
      const x = Math.round(g.x);
      group.appendChild(element("use", { href: `#${id}`, ...(x ? { x: String(x) } : {}) }));
    }
    return group;
  };
  const presentation = (el) => ({
    class: el.getAttribute("class"),
    style: stripFontDeclarations(el.getAttribute("style")),
    "fill-opacity": el.getAttribute("fill-opacity"),
  });
  const own = { ...presentation(textEl), opacity: textEl.getAttribute("opacity") };
  let outline;
  if (layout.runs.length === 1 && layout.runs[0].el === textEl) {
    outline = runGroup(layout.runs[0], own);
  } else {
    outline = element("g", own);
    for (const run of layout.runs) {
      outline.appendChild(runGroup(run, run.el === textEl ? {} : presentation(run.el)));
    }
  }
  for (const animation of [...textEl.children].filter((c) => c.tagName === "animate")) {
    outline.insertBefore(animation, outline.firstChild);
  }

  textEl.parentNode.insertBefore(outline, textEl);
  textEl.parentNode.insertBefore(doc.createTextNode("\n  "), textEl);

  // What stays behind is only the string, for readers of the raw file.
  const string = textEl.textContent;
  while (textEl.firstChild) textEl.removeChild(textEl.firstChild);
  textEl.appendChild(doc.createTextNode(string));
  for (const { name } of [...textEl.attributes]) {
    if (name !== "x" && name !== "y") textEl.removeAttribute(name);
  }
  textEl.setAttribute("class", OUTLINE_CLASS);
}

function visibleCodeCharacters(textEl) {
  let chars = "";
  const walk = (node) => {
    for (const child of node.childNodes) {
      if (child.nodeType === 3) chars += child.nodeValue;
      else if (
        child.nodeType === 1 &&
        child.tagName === "tspan" &&
        !(child.getAttribute("class") ?? "").split(/\s+/).includes(OUTLINE_CLASS)
      ) {
        walk(child);
      }
    }
  };
  walk(textEl);
  return chars;
}

// The stylesheet the finished file needs: the mono @font-face first, nothing for classes no element
// uses any more, and no font declarations on rules whose text is now drawn.
function rewriteStylesheet(styleText, usedClasses, fontFaceCss) {
  const rewritten = styleText
    .replace(CLASS_RULE, (rule, name, body) => {
      if (!usedClasses.has(name)) return "";
      if (parseDeclarations(body).has("font-family")) return rule;
      const kept = stripFontDeclarations(body);
      return kept ? `.${name}{${kept}}` : "";
    })
    .split("\n")
    .map((line) => line.trim().replace(/\s{2,}/g, " "))
    .filter(Boolean);
  if (usedClasses.has(OUTLINE_CLASS)) rewritten.push(`.${OUTLINE_CLASS}{fill-opacity:0}`);
  return `\n${[fontFaceCss, ...rewritten].filter(Boolean).join("\n")}\n  `;
}

function parse(svg) {
  const { document } = new JSDOM(svg, { contentType: "image/svg+xml" }).window;
  const style = document.querySelector("style");
  if (!style) throw new Error("readme-outline: the SVG has no <style>");
  return { document, style, rules: parseClassRules(style.textContent) };
}

/**
 * The shared last step of every README diagram generator: Switzer roles become outlines, code roles
 * stay real text on the embedded mono subset. Pure and deterministic: same input, same bytes.
 * @param {string} svg a finished SVG document
 * @returns {Promise<string>}
 */
export async function outlineSvg(svg) {
  textBoxSink?.push(...textBoxes(svg));
  const { document: doc, style, rules } = parse(svg);
  const root = doc.documentElement;
  const defs = doc.createElementNS(SVG_NS, "defs");
  const ids = new Map();
  let codeText = "";
  for (const textEl of [...doc.querySelectorAll("text")]) {
    if (isCode(textEl, rules)) codeText += visibleCodeCharacters(textEl);
    else outlineInto(doc, defs, ids, textEl, rules);
  }
  if (defs.childElementCount) {
    defs.appendChild(doc.createTextNode("\n  "));
    root.insertBefore(defs, style.nextSibling);
    root.insertBefore(doc.createTextNode("\n  "), defs);
  }
  const taken = new Set();
  for (const el of doc.querySelectorAll("[id]")) {
    const id = el.getAttribute("id");
    if (taken.has(id)) throw new Error(`readme-outline: duplicate id "${id}"`);
    taken.add(id);
  }
  const { css } = codeText ? await buildFontFaceCss({ mono: codeText }) : { css: "" };
  const used = new Set();
  for (const el of doc.querySelectorAll("[class]")) {
    for (const name of el.getAttribute("class").split(/\s+/).filter(Boolean)) used.add(name);
  }
  style.textContent = rewriteStylesheet(style.textContent, used, css);
  const serialized = new doc.defaultView.XMLSerializer().serializeToString(root);
  return `${serialized}\n`;
}

let textBoxSink = null;

/**
 * Runs a generator and returns the boxes its outlined text occupies, for tests: the generators only
 * hand back the finished file, and a finished file no longer knows how wide its text is.
 * @param {() => Promise<string>} render
 */
export async function captureTextBoxes(render) {
  const boxes = [];
  textBoxSink = boxes;
  try {
    await render();
  } finally {
    textBoxSink = null;
  }
  return boxes;
}

/**
 * The boxes the outlined text of a pre-outline SVG will occupy, in canvas px, from the real metrics:
 * the input of the overflow and collision checks. `top`/`bottom` span Switzer's cap height and a
 * descender. Ancestor translate() transforms are applied; SMIL motion is not.
 * @param {string} svg
 * @returns {Array<{ text: string, left: number, right: number, top: number, bottom: number }>}
 */
export function textBoxes(svg) {
  const { document: doc, rules } = parse(svg);
  const boxes = [];
  for (const textEl of doc.querySelectorAll("text")) {
    if (isCode(textEl, rules)) continue;
    const layout = layoutText(textEl, rules);
    let dx = 0;
    let dy = 0;
    for (let e = textEl.parentNode; e && e.nodeType === 1; e = e.parentNode) {
      const m = (e.getAttribute("transform") ?? "").match(
        /^translate\((-?[\d.]+)[ ,]+(-?[\d.]+)\)$/
      );
      if (m) {
        dx += Number(m[1]);
        dy += Number(m[2]);
      }
    }
    boxes.push({
      text: layout.runs.map((r) => r.text).join(""),
      left: layout.left + dx,
      right: layout.left + layout.width + dx,
      top: layout.y + dy - layout.size * 0.72,
      bottom: layout.y + dy + layout.size * 0.22,
    });
  }
  return boxes;
}
