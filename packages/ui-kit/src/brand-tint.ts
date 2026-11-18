/**
 * A third-party brand colour is a tint, never the text colour: many brands fall under 3:1 as text
 * on a light canvas, and white on a light brand is unreadable. `brandTintVars` turns any hex into
 * an ink and a border that hold their contrast, keeping the brand's hue and saturation and moving
 * only its lightness. `.ci-brand-tint` then derives the subtle background and picks the ink and
 * border for the current colour scheme.
 */

export type BrandTintScheme = "light" | "dark";

export interface BrandTintVars {
  "--ci-brand": string;
  "--ci-brand-ink-light": string;
  "--ci-brand-ink-dark": string;
  "--ci-brand-border-light": string;
  "--ci-brand-border-dark": string;
}

type Rgb = readonly [number, number, number];

/** Share of the brand in the `--ci-brand-subtle` background. */
export const BRAND_TINT_PERCENT = 18;

/**
 * Every background, surface, surface-subtle and surface-muted of the Classic, Editions and Editions
 * landing appearances, per colour scheme. One ink per scheme clears all of them, so it holds on any
 * surface of any appearance. `tests/css-contract.test.ts` fails if these drift from the tokens.
 */
export const BRAND_TINT_SURFACES: Record<BrandTintScheme, readonly string[]> = {
  light: [
    "#fbfbf8", "#ffffff", "#f7f7f2", "#eeeee8",
    "#f3f1e9", "#faf9f4", "#eae8df", "#e3e1d7",
    "#f3f0e7", "#f8f5ed", "#ece8de", "#e5e0d5",
  ],
  dark: [
    "#040d10", "#0d191c", "#1e2c2f", "#394446",
    "#11120f", "#191a16", "#22231d", "#20211b", "#292a23",
  ],
};

// A hair above 4.5:1 and 3:1, so painting the color-mix to 8 bits cannot round a pair below AA.
const TEXT_CONTRAST = 4.55;
const BORDER_CONTRAST = 3.05;
const LIGHTNESS_STEP = 0.005;

function parseHex(value: string): Rgb {
  return [1, 3, 5].map((start) => Number.parseInt(value.slice(start, start + 2), 16)) as unknown as Rgb;
}

function formatHex(rgb: Rgb): string {
  return `#${rgb.map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;
}

function normalizeHex(value: string): string | undefined {
  const hex = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(value.trim())?.[1].toLowerCase();
  if (!hex) return undefined;
  return `#${hex.length === 3 ? [...hex].map((digit) => digit.repeat(2)).join("") : hex}`;
}

function luminance(rgb: Rgb): number {
  const [red, green, blue] = rgb.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(first: number, second: number): number {
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function toHsl([red, green, blue]: Rgb): Rgb {
  const [r, g, b] = [red / 255, green / 255, blue / 255];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;
  if (delta === 0) return [0, 0, lightness];
  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  const sector = max === r ? ((g - b) / delta + 6) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return [sector * 60, saturation, lightness];
}

function fromHsl([hue, saturation, lightness]: Rgb): Rgb {
  const chroma = saturation * Math.min(lightness, 1 - lightness);
  const channel = (offset: number) => {
    const position = (offset + hue / 30) % 12;
    return 255 * (lightness - chroma * Math.max(-1, Math.min(position - 3, 9 - position, 1)));
  };
  return [channel(0), channel(8), channel(4)].map(Math.round) as unknown as Rgb;
}

/** The colour nearest the brand, by lightness alone, that clears `target` on every background. */
function adjustLightness(brand: Rgb, backgrounds: readonly number[], target: number, scheme: BrandTintScheme): string {
  const clears = (colour: Rgb) => {
    const ink = luminance(colour);
    return backgrounds.every((background) => contrast(ink, background) >= target);
  };
  if (clears(brand)) return formatHex(brand);
  const [hue, saturation, start] = toHsl(brand);
  const step = scheme === "light" ? -LIGHTNESS_STEP : LIGHTNESS_STEP;
  for (let lightness = start + step; lightness > 0 && lightness < 1; lightness += step) {
    const candidate = fromHsl([hue, saturation, lightness]);
    if (clears(candidate)) return formatHex(candidate);
  }
  return scheme === "light" ? "#000000" : "#ffffff";
}

function mix(brand: Rgb, surface: Rgb): Rgb {
  const share = BRAND_TINT_PERCENT / 100;
  return brand.map((channel, index) => channel * share + surface[index] * (1 - share)) as unknown as Rgb;
}

const parsedSurfaces = {
  light: BRAND_TINT_SURFACES.light.map(parseHex),
  dark: BRAND_TINT_SURFACES.dark.map(parseHex),
};
const surfaceLuminance = { light: parsedSurfaces.light.map(luminance), dark: parsedSurfaces.dark.map(luminance) };

function schemeColours(brand: Rgb, scheme: BrandTintScheme): { ink: string; border: string } {
  const tints = parsedSurfaces[scheme].map((surface) => luminance(mix(brand, surface)));
  const backgrounds = [...surfaceLuminance[scheme], ...tints];
  return {
    ink: adjustLightness(brand, backgrounds, TEXT_CONTRAST, scheme),
    border: adjustLightness(brand, backgrounds, BORDER_CONTRAST, scheme),
  };
}

/**
 * The custom properties for a brand colour, for the `style` of a `.ci-brand-tint` element.
 * Accepts `#rgb` and `#rrggbb`; anything else returns `undefined`, so a bad value in brand data
 * renders the untinted component rather than failing.
 */
export function brandTintVars(color: string | null | undefined): BrandTintVars | undefined {
  // Brand data often arrives untyped, so a non-string must take the same fallback as a bad hex.
  const hex = typeof color === "string" ? normalizeHex(color) : undefined;
  if (!hex) return undefined;
  const brand = parseHex(hex);
  const light = schemeColours(brand, "light");
  const dark = schemeColours(brand, "dark");
  return {
    "--ci-brand": hex,
    "--ci-brand-ink-light": light.ink,
    "--ci-brand-ink-dark": dark.ink,
    "--ci-brand-border-light": light.border,
    "--ci-brand-border-dark": dark.border,
  };
}
