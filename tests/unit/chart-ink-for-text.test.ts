// Text in a chart colour uses the `-ink` token.
//
// `text-chart-N` paints with the pure chart token, picked for bars, lines and dots: as text it
// falls under 4.5:1 on the light theme (src/shared/utils/categoricalPalette.ts). The kit ships
// a readable pair for every slot (`--ci-chart-N-ink`, bridged as `text-chart-N-ink`).
// `text-primary`, `text-accent` and `text-warning` are redirected to their ink by the theme;
// the chart slots are not, so each screen has to pick. The UI review of 2026-11-15 counted 105
// `text-chart-N` against 8 `-ink`; 58 of them painted text and now use the ink.
//
// What may keep the pure token: an icon, a dot or a stroke (3:1 is enough there). The guard
// accepts a bare `text-chart-N` only when it can see that:
//   - on the `className` of an icon element (`<Icon>`, `<svg>` and SVG shapes), or of an
//     element whose only children are icons (an icon chip);
//   - in a JSX prop named `iconColor`, or an object property named `icon`;
//   - in a file of ICON_ONLY, where the class sits in a lookup table that only an icon reads.

import { test } from "node:test";
import assert from "node:assert/strict";
import ts from "typescript";

import {
  lineOf,
  literalTokens,
  parse,
  read,
  rel,
  sourceFiles,
  utilityOf,
} from "../helpers/classScan.ts";

const ICON_TAGS = new Set(["Icon", "svg", "path", "polyline", "polygon", "circle", "line", "rect"]);

// Lookup tables whose `text-chart-N` only ever reaches an icon. `count` is exact: a new use in
// the file fails, and so does an entry left behind after the table is gone.
const ICON_ONLY: Record<string, { count: number; why: string }> = {
  "src/app/(dashboard)/dashboard/health/TelemetryCard.tsx": {
    count: 1,
    why: "`tone` of the metric icon chip: <span className={metric.tone}><Icon /></span>",
  },
  "src/app/(dashboard)/dashboard/translator/components/TranslateFlowDiagram.tsx": {
    count: 5,
    why: "COLOR_MAP[color].text is read once, by the node <Icon>",
  },
  "src/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel.tsx": {
    count: 5,
    why: "FORMAT_ACCENT_CLASS colours the source/target format <Icon>",
  },
  "src/app/(dashboard)/dashboard/webhooks/components/WebhookCard.tsx": {
    count: 4,
    why: "KIND_COLORS colours the webhook kind <Icon>",
  },
  "src/app/(dashboard)/dashboard/webhooks/components/shared/IntegrationCard.tsx": {
    count: 4,
    why: "KIND_COLORS colours the integration kind <Icon>",
  },
};

const isBareChartText = (token: string) =>
  /^text-chart-[1-8]$/.test(utilityOf(token).replace(/\/.*$/, ""));

type JsxTag = ts.JsxOpeningElement | ts.JsxSelfClosingElement;

function isIconTag(node: ts.Node, sf: ts.SourceFile): boolean {
  if (ts.isJsxElement(node)) return ICON_TAGS.has(node.openingElement.tagName.getText(sf));
  return ts.isJsxSelfClosingElement(node) && ICON_TAGS.has(node.tagName.getText(sf));
}

/** The element is an icon, or a wrapper whose JSX children are icons and nothing else. */
function paintsOnlyIcons(tag: JsxTag, sf: ts.SourceFile): boolean {
  if (ICON_TAGS.has(tag.tagName.getText(sf))) return true;
  if (!ts.isJsxOpeningElement(tag)) return false;
  const children = tag.parent.children.filter((c) => !(ts.isJsxText(c) && !c.text.trim()));
  return children.length > 0 && children.every((child) => isIconTag(child, sf));
}

type Verdict = "icon" | "text" | "table";

function classify(literal: ts.Node, sf: ts.SourceFile): Verdict {
  for (let p = literal.parent; p; p = p.parent) {
    if (ts.isJsxAttribute(p)) {
      const name = p.name.getText(sf);
      if (name === "iconColor") return "icon";
      if (name !== "className") return "text";
      return paintsOnlyIcons(p.parent.parent as JsxTag, sf) ? "icon" : "text";
    }
    if (ts.isPropertyAssignment(p) && p.name.getText(sf) === "icon") return "icon";
    if (ts.isSourceFile(p)) break;
  }
  return "table";
}

test("text-chart-N is only used where it paints an icon; text uses text-chart-N-ink", () => {
  const text: string[] = [];
  const table: Record<string, number> = {};
  for (const file of sourceFiles("src/app", "src/shared")) {
    const source = read(file);
    if (!/text-chart-[1-8](?![\w-])/.test(source)) continue;
    const sf = parse(file, source);
    for (const { token, node } of literalTokens(sf)) {
      if (!isBareChartText(token)) continue;
      const verdict = classify(node, sf);
      if (verdict === "text") text.push(`${rel(file)}:${lineOf(sf, node)} ${token}`);
      else if (verdict === "table") table[rel(file)] = (table[rel(file)] ?? 0) + 1;
    }
  }
  assert.deepEqual(text, [], "these classes colour text: use text-chart-N-ink");
  assert.deepEqual(
    table,
    Object.fromEntries(Object.entries(ICON_ONLY).map(([file, entry]) => [file, entry.count])),
    "a text-chart-N outside JSX must be text-chart-N-ink, or an icon-only table listed in ICON_ONLY"
  );
});
