// #19620 "DataTable inside a Card (double frame)".
//
// The kit DataTableShell (and the DataTable adapter built on it) draws its own frame.
// Rendered as a direct child of a Card, the card border and the shell border stack into a
// double frame. This guard parses every dashboard TSX file and fails when a
// <DataTable> / <DataTableShell> element's nearest enclosing JSX element is a <Card>,
// unless the DataTable opts out of its frame with `framed={false}` (the card is the frame).
//
// Conditionals and fragments between the two are looked through, because they render no
// element. Deeper nesting (a table inside a bordered sub-panel inside a card) is a layout
// choice per screen and is not covered here.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCAN_DIRS = ["src/app", "src/shared/components"];
const TABLE_TAGS = new Set(["DataTable", "DataTableShell"]);
const CARD_TAGS = new Set(["Card"]);

function listTsx(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "__tests__") continue;
      listTsx(full, out);
    } else if (entry.name.endsWith(".tsx") && !entry.name.endsWith(".test.tsx")) {
      out.push(full);
    }
  }
  return out;
}

function tagName(node: ts.JsxOpeningElement | ts.JsxSelfClosingElement, sf: ts.SourceFile) {
  return node.tagName.getText(sf);
}

function hasFramedFalse(node: ts.JsxOpeningElement | ts.JsxSelfClosingElement): boolean {
  return node.attributes.properties.some(
    (attr) =>
      ts.isJsxAttribute(attr) &&
      attr.name.getText() === "framed" &&
      attr.initializer !== undefined &&
      ts.isJsxExpression(attr.initializer) &&
      attr.initializer.expression?.kind === ts.SyntaxKind.FalseKeyword
  );
}

/** Nearest enclosing JSX element (not fragment) tag name, looking through expressions. */
function nearestElementTag(
  node: ts.JsxOpeningElement | ts.JsxSelfClosingElement,
  sf: ts.SourceFile
): string | null {
  // An opening element's parent is its own JsxElement wrapper: start above it.
  let current: ts.Node | undefined = ts.isJsxOpeningElement(node)
    ? node.parent.parent
    : node.parent;
  while (current) {
    if (ts.isJsxElement(current)) return tagName(current.openingElement, sf);
    if (ts.isJsxFragment(current)) {
      current = current.parent;
      continue;
    }
    if (
      ts.isFunctionLike(current) ||
      ts.isSourceFile(current) ||
      ts.isJsxAttribute(current) // a table passed as a prop value is not a child
    ) {
      return null;
    }
    current = current.parent;
  }
  return null;
}

function findTablesFramedInsideCards(files: string[]): string[] {
  const violations: string[] = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    if (!/<DataTable(Shell)?\b/.test(text)) continue;
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const visit = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const name = tagName(node, sf);
        if (TABLE_TAGS.has(name)) {
          const parentTag = nearestElementTag(node, sf);
          const optedOut = name === "DataTable" && hasFramedFalse(node);
          if (parentTag && CARD_TAGS.has(parentTag) && !optedOut) {
            const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
            violations.push(`${path.relative(ROOT, file)}:${line + 1} <${name}> inside <Card>`);
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return violations;
}

test("no DataTable/DataTableShell draws a second frame directly inside a Card", () => {
  const files = SCAN_DIRS.flatMap((dir) => listTsx(path.join(ROOT, dir)));
  assert.ok(files.length > 100, "scan should cover the dashboard sources");
  assert.deepEqual(findTablesFramedInsideCards(files), []);
});

test("the guard detects a framed table in a card and accepts framed={false}", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-datatable-card-"));
  try {
    const bad = path.join(tmp, "Bad.tsx");
    fs.writeFileSync(
      bad,
      `export const A = () => <Card title="x">{ok ? <DataTable data={[]} /> : null}</Card>;\n` +
        `export const B = () => <Card><DataTableShell>{rows}</DataTableShell></Card>;\n`
    );
    const good = path.join(tmp, "Good.tsx");
    fs.writeFileSync(
      good,
      `export const C = () => <Card><DataTable framed={false} data={[]} /></Card>;\n` +
        `export const D = () => <section><DataTable data={[]} /></section>;\n` +
        `export const E = () => <Card><div className="p-2"><DataTable data={[]} /></div></Card>;\n`
    );
    const found = findTablesFramedInsideCards([bad, good]);
    assert.equal(found.length, 2, found.join("\n"));
    assert.ok(found.every((v) => v.includes("Bad.tsx")));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
