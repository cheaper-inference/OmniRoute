import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

// Log/status badges and brand chips must reach WCAG AA (4.5:1) text contrast in all four looks:
// Classic and Editions, light and dark. Colours are resolved from the kit token files, so a kit
// sync, a palette edit or a hex value in src/shared/constants/colors.ts that breaks contrast
// fails here (#19066 block 1: white on #D97706 / #10B981 / #06B6D4 was 2.4–3.2:1 at 9–10 px).

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const tokensCss = read("packages/ui-kit/src/ci-tokens.css");
const editionsCss = read("packages/ui-kit/src/ci-editions.css");

const colors = await import("../../src/shared/constants/colors.ts");
const { BRAND_TINT_PERCENT } = await import("../../src/shared/utils/brandTint.ts");
const { AI_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");

function block(css: string, selector: string): string {
  const start = css.indexOf(`${selector} {`);
  assert.ok(start >= 0, `token block ${selector} exists`);
  const open = css.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) return css.slice(open + 1, i);
  }
  throw new Error(`unterminated block ${selector}`);
}

function declarations(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

const classicLight = declarations(block(tokensCss, ".ci-theme"));
const classicDark = declarations(block(tokensCss, '[data-theme="dark"] .ci-theme'));
const editionsLight = declarations(
  block(
    editionsCss,
    ':is(html:root:has([data-ci-appearance="editions"]), html:root[data-ci-appearance="editions"]) .ci-theme'
  )
);
const editionsDark = declarations(
  block(editionsCss, '[data-ci-appearance="editions"][data-theme="dark"]')
);

const THEMES: Record<string, Record<string, string>> = {
  "Classic light": { ...classicLight },
  "Classic dark": { ...classicLight, ...classicDark },
  "Editions light": { ...classicLight, ...editionsLight },
  "Editions dark": { ...classicLight, ...classicDark, ...editionsLight, ...editionsDark },
};

/** A literal colour, or a `var(--token)` chain resolved in one theme. */
function resolve(theme: string, value: string, depth = 0): string {
  assert.ok(depth < 10, `token cycle resolving ${value}`);
  const v = value.trim();
  const ref = /^var\(--([\w-]+)\)$/.exec(v);
  if (ref) {
    const next = THEMES[theme][ref[1]];
    assert.ok(next, `${theme}: --${ref[1]} is declared by the kit`);
    return resolve(theme, next, depth + 1);
  }
  const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v);
  assert.ok(hex, `${theme}: ${value} resolves to an opaque hex colour`);
  const h = hex[1].length === 3 ? [...hex[1]].map((c) => c + c).join("") : hex[1];
  return `#${h.toLowerCase()}`;
}

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

function luminance(hex: string): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = rgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** `color-mix(in srgb, brand P%, transparent)` composited over an opaque surface. */
function tint(brand: string, surface: string, percent: number): string {
  const p = percent / 100;
  const [br, bg] = [rgb(brand), rgb(surface)];
  return `#${br
    .map((c, i) => Math.round(c * p + bg[i] * (1 - p)))
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;
}

type Badge = { bg: string; text: string; label?: string };

function allBadges(): Array<[string, Badge]> {
  const out: Array<[string, Badge]> = [];
  const tables = {
    PROVIDER_COLORS: colors.PROVIDER_COLORS,
    PROTOCOL_COLORS: colors.PROTOCOL_COLORS,
    TYPE_COLORS: colors.TYPE_COLORS,
    LEVEL_COLORS: colors.LEVEL_COLORS,
  } as Record<string, Record<string, Badge>>;
  for (const [table, entries] of Object.entries(tables)) {
    for (const [key, badge] of Object.entries(entries)) out.push([`${table}.${key}`, badge]);
  }
  for (const status of [200, 201, 304, 400, 429, 500, 503, 0, 102]) {
    out.push([`getHttpStatusStyle(${status})`, colors.getHttpStatusStyle(status)]);
  }
  for (const status of ["success", "error", "timeout", "unknown"]) {
    out.push([`getProxyStatusStyle(${status})`, colors.getProxyStatusStyle(status)]);
  }
  out.push(["getProtocolColor(unknown)", colors.getProtocolColor("made-up", "made-up")]);
  return out;
}

test("every log/status badge reaches 4.5:1 in Classic and Editions, light and dark", () => {
  const failures: string[] = [];
  for (const [name, badge] of allBadges()) {
    for (const theme of Object.keys(THEMES)) {
      const ratio = contrast(resolve(theme, badge.text), resolve(theme, badge.bg));
      if (ratio < 4.5) failures.push(`${theme} ${name}: ${ratio.toFixed(2)}:1`);
    }
  }
  assert.deepEqual(failures, [], `badges under 4.5:1:\n${failures.join("\n")}`);
});

test("provider chip ink alone (inactive filter chip) is AA on the page and card surfaces", () => {
  const failures: string[] = [];
  for (const [key, badge] of Object.entries(colors.PROVIDER_COLORS as Record<string, Badge>)) {
    for (const theme of Object.keys(THEMES)) {
      for (const surface of ["ci-color-background", "ci-color-surface"]) {
        const ratio = contrast(resolve(theme, badge.text), resolve(theme, `var(--${surface})`));
        if (ratio < 4.5) failures.push(`${theme} ${key} on ${surface}: ${ratio.toFixed(2)}:1`);
      }
    }
  }
  assert.deepEqual(failures, [], failures.join("\n"));
});

test("the badge palette is kit tokens only — no hex literal in constants/colors.ts", () => {
  const source = read("src/shared/constants/colors.ts");
  assert.doesNotMatch(source, /#[0-9a-fA-F]{3,8}\b/);
  for (const [name, badge] of allBadges()) {
    assert.match(badge.bg, /^var\(--ci-[\w-]+\)$/, `${name} background is a kit token`);
    assert.match(badge.text, /^var\(--ci-[\w-]+\)$/, `${name} text is a kit token`);
  }
});

test("body ink on a brand tint stays AA for every provider and CLI tool brand colour", () => {
  const brands = new Map<string, string>();
  for (const p of Object.values(AI_PROVIDERS as Record<string, { id: string; color?: string }>)) {
    if (p.color) brands.set(`provider ${p.id}`, p.color);
  }
  for (const [id, tool] of Object.entries(CLI_TOOLS as Record<string, { color?: string }>)) {
    if (tool.color) brands.set(`cli ${id}`, tool.color);
  }
  assert.ok(brands.size > 100, "the catalog brands were loaded");
  const failures: string[] = [];
  for (const [name, brand] of brands) {
    for (const theme of Object.keys(THEMES)) {
      const ink = resolve(theme, "var(--ci-color-foreground)");
      for (const surface of ["ci-color-surface", "ci-color-surface-subtle"]) {
        const below = resolve(theme, `var(--${surface})`);
        const ratio = contrast(ink, tint(resolve(theme, brand), below, BRAND_TINT_PERCENT));
        if (ratio < 4.5)
          failures.push(`${theme} ${name} ${brand} on ${surface}: ${ratio.toFixed(2)}`);
      }
    }
  }
  assert.deepEqual(failures, [], failures.join("\n"));
});

test("white text on a brand fill and brand-coloured text are gone from the audited screens", () => {
  const files = [
    "src/app/(dashboard)/dashboard/free-provider-rankings/page.tsx",
    "src/app/(dashboard)/dashboard/cli-code/components/CopilotToolCard.tsx",
    "src/app/(dashboard)/dashboard/cli-code/components/DefaultToolCard.tsx",
    "src/app/(dashboard)/dashboard/providers/components/onboarding/ProviderOnboardingWizard.tsx",
    "src/app/(dashboard)/dashboard/providers/[id]/components/ProviderPageHeader.tsx",
    "src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx",
    "src/app/(dashboard)/dashboard/batch/components/NewBatchWizard.tsx",
  ];
  for (const file of files) {
    const source = read(file);
    assert.doesNotMatch(source, /text-white/, `${file}: no white text`);
    assert.doesNotMatch(
      source,
      /backgroundColor:\s*(provider|tool|providerInfo)\.color\b/,
      `${file}: no solid brand fill (use brandTintStyle)`
    );
    assert.doesNotMatch(
      source,
      /\bcolor:\s*(provider|providerInfo)\.color\b/,
      `${file}: no brand colour as text`
    );
  }
  const loggers = [
    "src/shared/components/RequestLoggerV2.tsx",
    "src/shared/components/RequestLoggerDetail.tsx",
    "src/shared/components/ProxyLogger.tsx",
    "src/shared/components/ProxyLogDetail.tsx",
    "src/app/(dashboard)/dashboard/conversations/page.tsx",
  ];
  for (const file of loggers) {
    const source = read(file);
    assert.doesNotMatch(source, /\b(bg|text):\s*"#/, `${file}: no hex badge fallback`);
    assert.doesNotMatch(source, /\$\{pc\.bg\}/, `${file}: no hex-alpha tint of a badge colour`);
  }
});
