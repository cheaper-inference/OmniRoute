/**
 * Monaco editor themes built from the kit's CSS variables at runtime (KEA-7886, P8 / lote 6 p10).
 *
 * Monaco only accepts literal `#rrggbb[aa]` colours, so instead of hard-coding a hex palette we
 * read the live `--ci-*` tokens off a hidden `.ci-theme` probe (forced to `data-theme="dark"` or
 * `"light"`), normalise each to hex and register two themes. Consumers keep passing Monaco's own
 * names (`"vs-dark"`, `"light"`, `"vs"`); MonacoEditor.tsx swaps them for the kit themes when the
 * kit themes could be built, and leaves them untouched otherwise (SSR, jsdom, odd colour formats).
 *
 * Limitation: the kit flips tokens on `[data-theme="dark"] .ci-theme`, so a light probe cannot
 * read light values while the page itself is dark — the light kit theme is then not (re)defined
 * and a `"light"` editor on a dark page keeps Monaco's built-in light theme.
 */

export const KIT_MONACO_THEME = {
  light: "omniroute-kit-light",
  dark: "omniroute-kit-dark",
} as const;

/** Palette slots → the kit variables they are read from. */
export const KIT_EDITOR_VARS = {
  surface: "--ci-color-surface",
  surfaceSubtle: "--ci-color-surface-subtle",
  foreground: "--ci-color-foreground",
  heading: "--ci-color-heading",
  muted: "--ci-color-text-muted",
  subtle: "--ci-color-text-subtle",
  border: "--ci-color-border",
  borderSubtle: "--ci-color-border-subtle",
  selection: "--ci-color-accent-surface-range",
  string: "--ci-chart-4",
  number: "--ci-chart-2",
  keyword: "--ci-chart-3",
  key: "--ci-color-info",
  warning: "--ci-color-warning",
  danger: "--ci-color-danger",
} as const;

export type KitEditorPalette = Record<keyof typeof KIT_EDITOR_VARS, string>;

export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

const clampByte = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

/** Parse `#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`, `rgb()`/`rgba()` (comma or space syntax). */
export function parseCssColor(value: string | null | undefined): Rgba | null {
  const v = (value ?? "").trim().toLowerCase();
  if (!v) return null;
  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.exec(v);
  if (hex) {
    let h = hex[1];
    if (h.length <= 4) h = [...h].map((c) => c + c).join("");
    const n = (i: number) => parseInt(h.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
  }
  const fn = /^rgba?\(\s*([^)]*)\)$/.exec(v);
  if (!fn) return null;
  const parts = fn[1]
    .replace(/\s*\/\s*/, " / ")
    .split(/[\s,]+/)
    .filter((p) => p && p !== "/");
  if (parts.length < 3 || parts.length > 4) return null;
  const channel = (p: string) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p));
  const [r, g, b] = parts.slice(0, 3).map(channel);
  const alphaRaw = parts[3];
  const a =
    alphaRaw === undefined
      ? 1
      : alphaRaw.endsWith("%")
        ? parseFloat(alphaRaw) / 100
        : parseFloat(alphaRaw);
  if ([r, g, b, a].some((x) => !Number.isFinite(x))) return null;
  return { r: clampByte(r), g: clampByte(g), b: clampByte(b), a: Math.max(0, Math.min(1, a)) };
}

const hex2 = (n: number) => clampByte(n).toString(16).padStart(2, "0");

/** `#rrggbb`, or `#rrggbbaa` when the colour is translucent. */
export function toMonacoHex(c: Rgba): string {
  const base = `#${hex2(c.r)}${hex2(c.g)}${hex2(c.b)}`;
  return c.a >= 1 ? base : `${base}${hex2(c.a * 255)}`;
}

/** Monaco token rules want the colour without `#` and without alpha. */
const ruleHex = (c: Rgba) => toMonacoHex({ ...c, a: 1 }).slice(1);

export interface MonacoThemeData {
  base: "vs" | "vs-dark";
  inherit: boolean;
  rules: { token: string; foreground?: string; fontStyle?: string }[];
  colors: Record<string, string>;
}

/** Build a Monaco theme from resolved kit colours; `null` if any slot is not a parseable colour. */
export function buildMonacoKitTheme(
  palette: Partial<Record<keyof KitEditorPalette, string>>,
  dark: boolean
): MonacoThemeData | null {
  const c = {} as Record<keyof KitEditorPalette, Rgba>;
  for (const slot of Object.keys(KIT_EDITOR_VARS) as (keyof KitEditorPalette)[]) {
    const parsed = parseCssColor(palette[slot]);
    if (!parsed) return null;
    c[slot] = parsed;
  }
  const h = (slot: keyof KitEditorPalette) => toMonacoHex(c[slot]);
  return {
    base: dark ? "vs-dark" : "vs",
    inherit: true,
    rules: [
      { token: "", foreground: ruleHex(c.foreground) },
      { token: "comment", foreground: ruleHex(c.subtle), fontStyle: "italic" },
      { token: "string", foreground: ruleHex(c.string) },
      { token: "string.value.json", foreground: ruleHex(c.string) },
      { token: "string.key.json", foreground: ruleHex(c.key) },
      { token: "number", foreground: ruleHex(c.number) },
      { token: "keyword", foreground: ruleHex(c.keyword) },
      { token: "keyword.json", foreground: ruleHex(c.keyword) },
      { token: "delimiter", foreground: ruleHex(c.muted) },
      { token: "invalid", foreground: ruleHex(c.danger) },
    ],
    colors: {
      "editor.background": h("surface"),
      "editor.foreground": h("foreground"),
      "editorCursor.foreground": h("heading"),
      "editor.lineHighlightBackground": h("surfaceSubtle"),
      "editor.selectionBackground": h("selection"),
      "editorLineNumber.foreground": h("subtle"),
      "editorLineNumber.activeForeground": h("muted"),
      "editorIndentGuide.background1": h("borderSubtle"),
      "editorWidget.background": h("surface"),
      "editorWidget.border": h("border"),
      "editorGutter.background": h("surface"),
      "editorWarning.foreground": h("warning"),
      "editorError.foreground": h("danger"),
      "scrollbarSlider.background": h("borderSubtle"),
    },
  };
}

/** Any CSS colour → `rgba()`/hex via a 1×1 canvas (sRGB), for formats parseCssColor skips. */
function normaliseViaCanvas(doc: Document, value: string): string | null {
  try {
    const ctx = doc.createElement("canvas").getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "#000";
    ctx.fillStyle = value;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
  } catch {
    return null;
  }
}

/** Read the kit palette for one theme off a hidden probe element. */
export function readKitEditorPalette(dark: boolean, doc: Document = document): KitEditorPalette {
  const probe = doc.createElement("div");
  probe.className = "ci-theme";
  probe.dataset.theme = dark ? "dark" : "light";
  probe.setAttribute("aria-hidden", "true");
  probe.style.display = "none";
  doc.body.appendChild(probe);
  try {
    const style = doc.defaultView?.getComputedStyle(probe);
    const out = {} as KitEditorPalette;
    for (const [slot, cssVar] of Object.entries(KIT_EDITOR_VARS)) {
      const raw = style?.getPropertyValue(cssVar).trim() ?? "";
      out[slot as keyof KitEditorPalette] =
        raw && !parseCssColor(raw) ? (normaliseViaCanvas(doc, raw) ?? raw) : raw;
    }
    return out;
  } finally {
    probe.remove();
  }
}

type MonacoLike = { editor: { defineTheme: (name: string, data: MonacoThemeData) => void } };

const definedThemes = new Set<string>();

/** (Re)register the kit themes; returns the names that are available. Never throws. */
export function defineKitMonacoThemes(
  monaco: MonacoLike,
  doc: Document | undefined = typeof document === "undefined" ? undefined : document
): ReadonlySet<string> {
  if (!doc?.body) return definedThemes;
  const pageDark = doc.documentElement.dataset.theme === "dark";
  for (const dark of [true, false]) {
    if (!dark && pageDark) continue; // a light probe reads dark values on a dark page
    try {
      const theme = buildMonacoKitTheme(readKitEditorPalette(dark, doc), dark);
      if (!theme) continue;
      const name = dark ? KIT_MONACO_THEME.dark : KIT_MONACO_THEME.light;
      monaco.editor.defineTheme(name, theme);
      definedThemes.add(name);
    } catch {
      // Keep Monaco's built-in theme for this variant.
    }
  }
  return definedThemes;
}

/** Map Monaco's built-in names onto the kit themes that were registered. */
export function kitMonacoThemeName(
  requested: string | undefined,
  available: ReadonlySet<string> = definedThemes
): string | undefined {
  const want =
    requested === "vs-dark"
      ? KIT_MONACO_THEME.dark
      : requested === "light" || requested === "vs" || requested === undefined
        ? KIT_MONACO_THEME.light
        : null;
  return want && available.has(want) ? want : requested;
}
