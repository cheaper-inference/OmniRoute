// CI UI Kit adoption, slice A2 (settings): static guards over
// `src/app/(dashboard)/dashboard/settings/**`. Each test pins one mapping of the adoption so
// the hand-written form does not come back. An exception is a `file|needle` line with the
// reason next to it; a stale exception fails the test.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SETTINGS = path.join(ROOT, "src", "app", "(dashboard)", "dashboard", "settings");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const FILES = walk(SETTINGS).map((full) => ({
  file: path.relative(SETTINGS, full).split(path.sep).join("/"),
  text: fs.readFileSync(full, "utf8"),
}));

type Hit = { file: string; line: number; text: string };

/** Every line of the settings sources that matches `pattern`. */
function hits(pattern: RegExp): Hit[] {
  const found: Hit[] = [];
  for (const { file, text } of FILES) {
    text.split("\n").forEach((line, index) => {
      if (pattern.test(line)) found.push({ file, line: index + 1, text: line.trim() });
    });
  }
  return found;
}

/** Hits not covered by an exception, plus the exceptions that no longer match anything. */
function offenders(found: Hit[], exceptions: Record<string, string>) {
  const used = new Set<string>();
  const left = found.filter((hit) => {
    const key = Object.keys(exceptions).find((entry) => {
      const [file, needle] = entry.split("|");
      return hit.file === file && hit.text.includes(needle);
    });
    if (key) used.add(key);
    return !key;
  });
  const stale = Object.keys(exceptions).filter((key) => !used.has(key));
  return { left: left.map((hit) => `${hit.file}:${hit.line}: ${hit.text}`), stale };
}

type Element = { file: string; line: number; tag: string; attrs: Record<string, string> };

/**
 * Every JSX element of the settings sources whose tag is in `tags`, with the text of its
 * attributes: a string literal as is, an expression as source text, a bare attribute as "".
 */
function elements(tags: string[]): Element[] {
  const wanted = new Set(tags);
  const found: Element[] = [];
  for (const { file, text } of FILES) {
    if (!file.endsWith(".tsx")) continue;
    const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tag = node.tagName.getText(tree);
        if (wanted.has(tag)) {
          const attrs: Record<string, string> = {};
          for (const attr of node.attributes.properties) {
            if (!ts.isJsxAttribute(attr)) continue;
            const init = attr.initializer;
            attrs[attr.name.getText(tree)] = !init
              ? ""
              : ts.isStringLiteral(init)
                ? init.text
                : init.getText(tree);
          }
          const line = tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1;
          found.push({ file, line, tag, attrs });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(tree);
  }
  return found;
}

const FIELD_TAGS = ["Input", "Textarea", "NumberInput", "SavedNumberInput"];

// D — number-input: a numeric setting is the shared `NumberInput` (kit NumberInput inside the
// kit Field), never `<Input type="number">`: the value is `number | null`, the unit sits in
// the field and `min`/`max` apply when the edit ends.
test('A2/D: settings has no <Input type="number">', () => {
  const { left, stale } = offenders(hits(/type=["']number["']/), {});
  assert.deepEqual(left, []);
  assert.deepEqual(stale, []);
});

test("A2/D: the numeric fields of settings go through the shared NumberInput adapter", () => {
  const users = FILES.filter(({ text }) => /<(Saved)?NumberInput\b/.test(text)).map(
    ({ file }) => file
  );
  assert.ok(users.length >= 25, `expected the migrated screens, found ${users.length}`);
  // The kit component is never imported directly: the adapter passes the app locale and the
  // Field label/hint/error wiring.
  assert.deepEqual(
    FILES.filter(({ text }) => text.includes("@omniroute/ui-kit/number-input")).map(
      ({ file }) => file
    ),
    []
  );
});

// Three fields keep the value the person typed when it is out of range: two screens show their
// own range error next to Save, and "0 days" on a new access token means it never expires.
test("A2/D: fields with their own range rule do not clamp on blur", () => {
  const unclamped = elements(["NumberInput"])
    .filter(({ attrs }) => attrs.clamp === "{false}")
    .map(({ file }) => file)
    .sort();
  assert.deepEqual(unclamped, [
    "components/AccessTokensTab.tsx",
    "components/CacheSettingsTab.tsx",
    "components/RequestLimitsTab.tsx",
  ]);
});

// D — input-mono-xs: `font-mono` does nothing on an <input> or a <textarea> (the kit typography
// sheet wins), so code-like fields ask for the kit code font with `mono`; a dense field asks for
// `size="xs"` instead of shrinking the text by class.
test("A2/D: settings fields use `mono` and `size`, not font or text-size classes", () => {
  const fields = elements(FIELD_TAGS);
  assert.ok(fields.length > 150, `expected the settings fields, found ${fields.length}`);
  const bad = fields
    .filter(({ attrs }) => {
      const classes = `${attrs.className ?? ""} ${attrs.inputClassName ?? ""}`;
      const sized = /(^|[\s"'`])(text-(xs|\[\d+px\])|h-8)(?=$|[\s"'`])/.test(
        attrs.inputClassName ?? ""
      );
      return /\bfont-mono\b/.test(classes) || sized;
    })
    .map(({ file, line, tag }) => `${file}:${line} <${tag}>`);
  assert.deepEqual(bad, []);
  assert.ok(
    fields.filter(({ attrs }) => "mono" in attrs).length >= 13,
    "the code-like fields carry the `mono` prop"
  );
});

// D — file-trigger: a toolbar "Import"/"Upload" opens the native picker through the kit
// `FileTrigger` around its Button, not through a hidden <input type="file"> clicked by a ref.
test("A2/D: settings opens the file picker through FileTrigger", () => {
  assert.deepEqual(
    hits(/type=["']file["']|\.current\?\.click\(\)/).map(({ file, line }) => `${file}:${line}`),
    []
  );
  assert.equal(elements(["FileTrigger"]).length, 4);
});

// C — card-inset: a panel nested inside a card (border, radius, neutral fill, padding) is
// `Card.Section`, the kit inset card, so every inner panel shares one fill, border, radius and
// 16px padding. Left alone on purpose: status-coloured boxes (notices), list frames
// (`overflow-hidden` / `divide-y`, whose rows pad themselves), hover rows, and a second level of
// nesting, which stays a `div` with `rounded-card-nested`.
function isHandMadePanel(classes: string): boolean {
  const tokens = classes.split(/\s+/).filter(Boolean);
  const has = (pattern: RegExp) => tokens.some((token) => pattern.test(token));
  if (!tokens.includes("border")) return false;
  if (!has(/^rounded(-(sm|md|lg|xl|2xl|control|card))?$/)) return false;
  if (!has(/^p-[34]$/) && !(tokens.includes("px-4") && tokens.includes("py-3"))) return false;
  if (has(/^(border|bg)-.*(info|warning|error|success|primary|accent|dashed)/)) return false;
  return !has(/^(overflow-hidden|divide-y|hover:.*)$/);
}

test("A2/C: settings draws inner panels with Card.Section, not by hand", () => {
  const handMade = elements(["div", "section"])
    .filter(({ attrs }) => isHandMadePanel(attrs.className ?? ""))
    .map(({ file, line, attrs }) => `${file}:${line}: ${attrs.className}`);
  assert.deepEqual(handMade, []);
  assert.ok(
    elements(["Card.Section"]).length >= 79,
    "the settings panels are Card.Section elements"
  );
  // The detector itself: a neutral padded panel is caught, a notice and a list frame are not.
  assert.equal(isHandMadePanel("rounded-xl border border-border bg-bg-subtle p-4"), true);
  assert.equal(isHandMadePanel("space-y-3 rounded-xl border border-border p-3"), true);
  assert.equal(isHandMadePanel("rounded-lg border border-info/20 bg-info/5 p-3"), false);
  assert.equal(isHandMadePanel("rounded-lg border border-border overflow-hidden"), false);
  assert.equal(isHandMadePanel("p-3 rounded-card-nested bg-bg/40 border border-border/40"), false);
});

// F — heading-scale-eyebrow: labels use the kit label sizes (`text-2xs`, `text-3xs`), an
// uppercase label is the kit `ci-eyebrow` (with `data-size` / `data-weight`), and a card heading
// takes its size from `ci-heading data-size`, not from a Tailwind text-size utility.
const TEXT_TAGS = [
  "p",
  "span",
  "div",
  "dt",
  "dd",
  "li",
  "label",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];
const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

test("A2/F: settings has no pixel text sizes under 12px", () => {
  const { left, stale } = offenders(hits(/text-\[(8|9|10|11)px\]/), {
    // A link drawn as a chip: the Badge adapter has no `asChild`, so it cannot wrap the Link.
    "components/CompressionTokenSaverCard.tsx|rounded border border-border bg-bg-subtle px-1.5":
      "link chip",
  });
  assert.deepEqual(left, []);
  assert.deepEqual(stale, []);
});

test("A2/F: an uppercase label in settings is a ci-eyebrow", () => {
  const handMade = elements(TEXT_TAGS)
    .filter(({ attrs }) => {
      const classes = attrs.className ?? "";
      return /\buppercase\b/.test(classes) && !/\bci-eyebrow\b/.test(classes);
    })
    .map(({ file, attrs }) => `${file}: ${attrs.className}`);
  assert.deepEqual(handMade, []);
  const eyebrows = elements(TEXT_TAGS).filter(({ attrs }) =>
    /\bci-eyebrow\b/.test(attrs.className ?? "")
  );
  assert.ok(eyebrows.length >= 14, `expected the migrated labels, found ${eyebrows.length}`);
});

test("A2/F: settings headings take their size from ci-heading data-size", () => {
  const headings = elements(HEADING_TAGS);
  const sizedByUtility = headings
    .filter(({ attrs }) => {
      const tokens = (attrs.className ?? "").split(/\s+/);
      return tokens.some((token) => /^text-(xs|sm|base|lg|xl|2xl)$/.test(token));
    })
    .map(({ file, attrs }) => `${file}: ${attrs.className}`);
  assert.deepEqual(sizedByUtility, [
    // Responsive titles (16px on phones, 18px from `sm`): `data-size` has one step only.
    "components/QuotaPreflightCard.tsx: text-base sm:text-lg",
    "components/RoutingStrategyCard.tsx: text-base sm:text-lg",
  ]);
  const kitSized = headings.filter(
    ({ attrs }) => /\bci-heading\b/.test(attrs.className ?? "") && "data-size" in attrs
  );
  assert.ok(kitSized.length >= 65, `expected the migrated headings, found ${kitSized.length}`);
});

// A — badge-size-tones: a removable chip (blocked IP, banned keyword, error code, pattern) is
// the kit `ScopeChip` with a `tone` and `onRemove`, not a Badge with a hand-sized Button inside;
// a small pill is `Badge size="sm"`, with `tone="chart-N"` when it names a series.
test("A2/A: settings chips are ScopeChip and pills are Badge", () => {
  const chips = elements(["ScopeChip"]);
  assert.equal(chips.length, 5);
  for (const chip of chips) {
    assert.ok(chip.attrs.tone, `${chip.file}:${chip.line} names its tone`);
    assert.ok(chip.attrs.removeLabel, `${chip.file}:${chip.line} names its remove button`);
  }
  // No Badge carries a remove button any more.
  const withButton = FILES.filter(({ text }) =>
    /<Badge\b[^>]*className="[^"]*\bgap-1 p[re]-(0\.5|1)\b/.test(text)
  ).map(({ file }) => file);
  assert.deepEqual(withButton, []);
  // No span draws a pill by hand: padding + radius + a tint or text size of its own.
  const pills = elements(["span"])
    .filter(({ attrs }) => {
      const tokens = (attrs.className ?? "").split(/\s+/);
      const has = (pattern: RegExp) => tokens.some((token) => pattern.test(token));
      return (
        has(/^px-(1\.5|2|2\.5)$/) &&
        has(/^py-(0\.5|1)$/) &&
        has(/^rounded(-(sm|md|full))?$/) &&
        !has(/^font-mono$/)
      );
    })
    .map(({ file, attrs }) => `${file}: ${attrs.className}`);
  assert.deepEqual(pills, []);
});

// E — tables: a table framed by its card is `variant="plain"`, a dense one takes `density`
// instead of padding and text-size classes on each cell, a numeric column is `numeric`, and a
// numbered paginator is the shared `Pager`.
test("A2/E: settings tables use the kit table props, not per-cell classes", () => {
  assert.deepEqual(
    hits(/containerClassName="[^"]*rounded-none border-0/).map(
      ({ file, line }) => `${file}:${line}`
    ),
    []
  );
  assert.equal(elements(["Table"]).filter(({ attrs }) => attrs.variant === "plain").length, 7);

  const cells = elements(["TableHead", "TableCell"]);
  const classed = (pattern: RegExp) =>
    cells
      .filter(({ attrs }) => pattern.test(attrs.className ?? ""))
      .map(({ file, line, attrs }) => `${file}:${line}: ${attrs.className}`);
  // Alignment by physical side: `numeric` (end-aligned, tabular figures) mirrors in RTL.
  assert.deepEqual(classed(/\btext-(right|left)\b/), []);
  // Padding and row height come from the table `density`.
  assert.deepEqual(classed(/(^|[\s"`])(p[xytbse]?-\d|h-\d)/), []);
  assert.ok(cells.filter(({ attrs }) => "numeric" in attrs).length >= 9);
  assert.ok(elements(["Table"]).filter(({ attrs }) => attrs.density === "compact").length >= 4);
});

test("A2/E: the free pool pager is the shared Pager", () => {
  const freePool = FILES.find(({ file }) => file === "components/proxy/FreePoolTab.tsx")!.text;
  assert.match(freePool, /<Pager\b/);
  assert.doesNotMatch(freePool, /buildPageRange|MAX_VISIBLE_PAGES|"ellipsis"/);
});

// B — button-dense-muted: a 24px button is `size="2xs"` / `size="icon-2xs"`, never a larger
// size squeezed by `size-N min-h-N`; a muted ghost or outline button is `tone="muted"`, which
// keeps the kit hover (a `text-text-muted` class stays muted on hover too).
test("A2/B: settings buttons use the kit dense sizes and the muted tone", () => {
  const buttons = elements(["Button"]);
  const classed = (pattern: RegExp) =>
    buttons
      .filter(({ attrs }) => pattern.test(attrs.className ?? ""))
      .map(({ file, line, attrs }) => `${file}:${line}: ${attrs.className}`);
  assert.deepEqual(classed(/(^|\s)(size-[456]|min-h-[456]|h-[56] w-[56])(\s|$)/), []);
  assert.deepEqual(classed(/(^|\s)text-text-muted(\s|$)/), []);
  assert.equal(buttons.filter(({ attrs }) => attrs.size === "icon-2xs").length, 2);
  assert.equal(buttons.filter(({ attrs }) => attrs.tone === "muted").length, 2);
});

// G — small pieces: an icon on a tinted square is the kit `IconChip`, a `<code>` drawn as a chip
// is `InlineCode`, a bar is the kit `Progress`, and a one-message tinted box is `Notice`.
test("A2/G: settings uses IconChip, InlineCode, Progress and Notice for the small pieces", () => {
  const boxes = elements(["div", "p", "span", "code"]);
  const classed = (tags: string[], pattern: RegExp) =>
    boxes
      .filter(({ tag, attrs }) => tags.includes(tag) && pattern.test(attrs.className ?? ""))
      .map(({ file, line, attrs }) => `${file}:${line}: ${attrs.className}`);

  // Icon squares: padding + radius + tint around a lone icon.
  assert.deepEqual(
    classed(["div", "span"], /^p-2 rounded-lg bg-[\w/-]+ text-[\w-]+( h-fit| shrink-0)?$/),
    []
  );
  assert.equal(elements(["IconChip"]).length, 30);

  // Chip-like <code>: its own fill and padding. Plain <code> inside text stays.
  assert.deepEqual(classed(["code"], /\bbg-[\w/-]+\b.*\bpx?-|\bpx?-.*\bbg-[\w/-]+\b/), []);
  assert.equal(elements(["InlineCode"]).length, 5);

  // Bars: no hand-made progressbar.
  assert.deepEqual(
    hits(/role="progressbar"/).map(({ file, line }) => `${file}:${line}`),
    []
  );

  // One-message boxes: a tinted, bordered element that only carries a status message.
  const tinted = /\bbg-(error|success|warning|info)(-bg|\/\d+)/;
  const roleBoxes = elements(["div", "p"])
    .filter(({ attrs }) => {
      const classes = attrs.className ?? "";
      const isStatus = attrs.role === "alert" || attrs.role === "status";
      return isStatus && classes.split(/[\s"`]+/).includes("border") && tinted.test(classes);
    })
    .map(({ file, attrs }) => `${file}: ${attrs.className}`);
  assert.deepEqual(roleBoxes, [
    // These hold more than one message (a title, a list, an action): left as composed boxes.
    "components/AuthzSection.tsx: flex items-start gap-3 rounded-lg border border-warning/40 bg-warning-bg px-4 py-3 text-warning",
    "components/FeatureFlagsGrid.tsx: flex items-center justify-between gap-3 rounded-card border border-error/30 bg-error-bg p-4",
    "components/RoutingTab.tsx: mb-3 rounded border border-error/40 bg-error/10 p-2 text-xs text-error",
    "components/SidebarTab.tsx: mt-3 flex flex-col gap-3 rounded-lg border border-warning/30 bg-warning-bg p-3 sm:flex-row sm:items-center",
    "components/systemStorageAuth.tsx: mb-4 rounded-xl border border-warning/30 bg-warning-bg px-5 py-4",
  ]);
  assert.equal(elements(["Notice"]).length, 15);
});
