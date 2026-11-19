// A translucent colour is `color-mix`, never a hex alpha suffix glued to a colour string.
//
// `${color}20` only works while `color` is a 6-digit hex. The flow palette became `var(--…)`
// (src/shared/components/flow/edgeStyles.ts), so the same template now yields
// `var(--orch-status-error)20`: invalid CSS that the browser drops, and the circuit-breaker and
// cooldown badges of the combo studio lost their background. A provider brand colour from the
// catalog has the same problem whenever it is missing, 3-digit or a token. The UI review of
// 2026-11-15 found 8 such templates in 7 files; `flowColorAlpha` is the replacement.

import { test } from "node:test";
import assert from "node:assert/strict";
import ts from "typescript";

import { flowColorAlpha } from "../../src/shared/components/flow/edgeStyles.ts";
import { lineOf, parse, read, rel, sourceFiles } from "../helpers/classScan.ts";

test("flowColorAlpha mixes any CSS colour with transparent", () => {
  assert.equal(
    flowColorAlpha("var(--orch-status-error)", 13),
    "color-mix(in srgb, var(--orch-status-error) 13%, transparent)"
  );
  assert.equal(flowColorAlpha("#64748b", 8), "color-mix(in srgb, #64748b 8%, transparent)");
  assert.equal(flowColorAlpha("#abc", 25), "color-mix(in srgb, #abc 25%, transparent)");
});

test("flowColorAlpha percentages match the 8-bit alpha suffixes they replace", () => {
  // `15` → 8%, `20` → 13%, `30` → 19%, `40` → 25% (the mapping documented on the helper).
  const percentOf = (suffix: string) => Math.round((parseInt(suffix, 16) / 255) * 100);
  assert.deepEqual(["15", "20", "30", "40"].map(percentOf), [8, 13, 19, 25]);
});

test("the suffix trick is invalid as soon as the colour is not a 6-digit hex", () => {
  const isHexColor = (value: string) => /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);
  assert.equal(isHexColor(`${"#64748b"}20`), true);
  assert.equal(isHexColor(`${"var(--orch-status-error)"}20`), false);
  assert.equal(isHexColor(`${"#abc"}20`), false);
});

// Property names (style objects) and JSX attributes whose value is a CSS colour or shadow.
const COLOR_PROPERTY =
  /^(color|background|backgroundColor|borderColor|border(Top|Right|Bottom|Left)Color|outlineColor|boxShadow|textShadow|fill|stroke|stopColor|caretColor|accentColor)$/;

function inColorContext(node: ts.Node, sf: ts.SourceFile): boolean {
  for (let p = node.parent; p && !ts.isFunctionLike(p); p = p.parent) {
    if (ts.isPropertyAssignment(p) && COLOR_PROPERTY.test(p.name.getText(sf))) return true;
    if (ts.isJsxAttribute(p)) {
      const name = p.name.getText(sf);
      return name === "style" || COLOR_PROPERTY.test(name);
    }
  }
  return false;
}

test("no colour value glues a hex alpha suffix to an interpolated colour", () => {
  const hits: string[] = [];
  for (const file of sourceFiles("src/app", "src/shared")) {
    const text = read(file);
    if (!/\}[0-9a-fA-F]{2}(?![\w%.])/.test(text)) continue;
    const sf = parse(file, text);
    const visit = (node: ts.Node) => {
      if (ts.isTemplateExpression(node) && inColorContext(node, sf)) {
        for (const span of node.templateSpans) {
          if (/^[0-9a-fA-F]{2}(?![\w%.])/.test(span.literal.text)) {
            hits.push(`${rel(file)}:${lineOf(sf, span)}`);
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  assert.deepEqual(
    hits,
    [],
    "use flowColorAlpha(color, percent) from @/shared/components/flow/edgeStyles"
  );
});
