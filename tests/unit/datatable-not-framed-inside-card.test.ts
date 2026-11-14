// #19620 "DataTable inside a Card (double frame)", extended by the owner decision of
// 2026-11-14: the Card is the only frame around a table.
//
// The kit DataTableShell (and the DataTable adapter built on it) draws its own frame, and the
// kit Table container keeps its own border and radius. Rendered inside a Card, the card border
// and the table border stack into a double frame. This guard parses every dashboard TSX file
// and, for each <DataTable> / <DataTableShell> / <Table> with a <Card> above it in the same JSX
// tree, fails when:
//   - a <DataTable> does not opt out of its frame with `framed={false}`;
//   - a <DataTableShell> is used at all (its frame cannot be turned off: use the kit
//     TableLoadingRegion and a borderless Table instead);
//   - a <Table> does not zero its container border (`containerClassName` with `border-0`);
//   - an element between the table and the card draws a full border (`border` class): a
//     bordered sub-panel inside the card is a frame too, so it becomes a plain section.
//
// Conditionals, fragments and `.map()` callbacks between the two are looked through, because
// they render no element. A table rendered by a child component in another file is not seen
// here; those are covered by tests/unit/ui/single-frame-tables-in-card-19620.test.tsx.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCAN_DIRS = ["src/app", "src/shared/components"];
const TABLE_TAGS = new Set(["DataTable", "DataTableShell", "Table"]);
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

type JsxTag = ts.JsxOpeningElement | ts.JsxSelfClosingElement;

function tagName(node: JsxTag, sf: ts.SourceFile) {
  return node.tagName.getText(sf);
}

function attribute(node: JsxTag, name: string): ts.JsxAttribute | undefined {
  return node.attributes.properties.find(
    (attr): attr is ts.JsxAttribute => ts.isJsxAttribute(attr) && attr.name.getText() === name
  );
}

function hasFramedFalse(node: JsxTag): boolean {
  const attr = attribute(node, "framed");
  return (
    attr?.initializer !== undefined &&
    ts.isJsxExpression(attr.initializer) &&
    attr.initializer.expression?.kind === ts.SyntaxKind.FalseKeyword
  );
}

/**
 * The class text a class-like attribute always renders: a string literal, or the literal parts
 * of a template literal (a class only counts when whitespace or the template edge bounds it). Any other expression (a conditional, `cn(...)`, a variable) is
 * unresolved and returns null, so an inactive branch can neither satisfy nor trip the guard.
 */
function staticClassText(node: JsxTag, name: string): string | null {
  const init = attribute(node, name)?.initializer;
  if (!init) return "";
  if (ts.isStringLiteral(init)) return init.text;
  const expr = ts.isJsxExpression(init) ? init.expression : undefined;
  if (!expr) return null;
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text;
  if (ts.isTemplateExpression(expr)) {
    // Each `${...}` becomes a non-space sentinel, so a class written right against an
    // interpolation (`border-0${suffix}`) is not a whole class: it can render as `border-0-x`.
    return [expr.head.text, ...expr.templateSpans.map((span) => span.literal.text)].join("\u0000");
  }
  return null;
}

const hasClass = (text: string | null, cls: string) =>
  text !== null && new RegExp(`(^|\\s)${cls}($|\\s)`).test(text);

function tableDrawsOwnFrame(node: JsxTag, name: string): boolean {
  if (name === "DataTableShell") return true;
  if (name === "DataTable") return !hasFramedFalse(node);
  // Unresolved (dynamic) container classes cannot prove the border is off.
  return !hasClass(staticClassText(node, "containerClassName"), "border-0");
}

/** A `.map((item) => <El />)` callback inside JSX renders its element as a child. */
function isMapCallback(node: ts.Node): boolean {
  return (
    (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
    ts.isCallExpression(node.parent) &&
    ts.isPropertyAccessExpression(node.parent.expression) &&
    node.parent.expression.name.text === "map"
  );
}

/**
 * Walks up from a table to the nearest enclosing <Card>, looking through expressions,
 * fragments and `.map()` callbacks. Returns the card and the elements in between, or null
 * when no card encloses the table in this JSX tree.
 */
function enclosingCard(node: JsxTag, sf: ts.SourceFile): { between: JsxTag[] } | null {
  const between: JsxTag[] = [];
  // An opening element's parent is its own JsxElement wrapper: start above it.
  let current: ts.Node | undefined = ts.isJsxOpeningElement(node)
    ? node.parent.parent
    : node.parent;
  while (current) {
    if (ts.isJsxElement(current)) {
      if (CARD_TAGS.has(tagName(current.openingElement, sf))) return { between };
      between.push(current.openingElement);
    } else if (
      (ts.isFunctionLike(current) && !isMapCallback(current)) ||
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
    if (!/<(DataTable(Shell)?|Table)\b/.test(text)) continue;
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const at = (node: ts.Node) =>
      `${path.relative(ROOT, file)}:${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1}`;
    const visit = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const name = tagName(node, sf);
        const card = TABLE_TAGS.has(name) ? enclosingCard(node, sf) : null;
        if (card) {
          if (tableDrawsOwnFrame(node, name)) {
            violations.push(`${at(node)} <${name}> inside <Card>`);
          }
          for (const panel of card.between) {
            if (hasClass(staticClassText(panel, "className"), "border")) {
              violations.push(
                `${at(panel)} bordered <${tagName(panel, sf)}> around a table in <Card>`
              );
            }
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return [...new Set(violations)];
}

test("no table draws a second frame inside a Card", () => {
  const files = SCAN_DIRS.flatMap((dir) => listTsx(path.join(ROOT, dir)));
  assert.ok(files.length > 100, "scan should cover the dashboard sources");
  assert.deepEqual(findTablesFramedInsideCards(files), []);
});

test("the guard detects framed tables and bordered sub-panels in a card", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-datatable-card-"));
  try {
    const bad = path.join(tmp, "Bad.tsx");
    fs.writeFileSync(
      bad,
      [
        `export const A = () => <Card title="x">{ok ? <DataTable data={[]} /> : null}</Card>;`,
        `export const B = () => <Card><DataTableShell>{rows}</DataTableShell></Card>;`,
        `export const E = () => <Card><div className="p-2"><DataTable data={[]} /></div></Card>;`,
        `export const F = () => <Card><Table scrollbarLabel="x" /></Card>;`,
        `export const G = () => <Card><Table containerClassName="mt-3" /></Card>;`,
        `export const H = () => <Card><div className="rounded-xl border border-border p-5"><Table containerClassName="rounded-none border-0" /></div></Card>;`,
        `export const I = () => <Card>{items.map((it) => <div key={it} className="border rounded-lg"><DataTable framed={false} /></div>)}</Card>;`,
        `export const J = () => <Card><>{rows.map((r) => <Table key={r} />)}</></Card>;`,
        `export const Q = () => <Card><Table containerClassName={flat ? "rounded-none border-0" : ""} /></Card>;`,
        `export const R = () => <Card><Table containerClassName={\`mt-3 \${extra}\`} /></Card>;`,
        `export const S = () => <Card><div className={\`border \${tone}\`}><DataTable framed={false} /></div></Card>;`,
        `export const V = () => <Card><Table containerClassName={\`rounded-none border-0\${suffix}\`} /></Card>;`,
        "",
      ].join("\n")
    );
    const good = path.join(tmp, "Good.tsx");
    fs.writeFileSync(
      good,
      [
        `export const C = () => <Card><DataTable framed={false} data={[]} /></Card>;`,
        `export const D = () => <section><DataTable data={[]} /><Table /></section>;`,
        `export const K = () => <Card><Table containerClassName="rounded-none border-0" /></Card>;`,
        `export const L = () => <Card><div className="p-2"><Table containerClassName="max-h-64 rounded-none border-0" /></div></Card>;`,
        `export const M = () => <Card><div className="border-t border-border/20 p-4"><DataTable framed={false} /></div></Card>;`,
        `export const N = () => <Card><TableLoadingRegion><Table containerClassName={"rounded-none border-0"} /></TableLoadingRegion></Card>;`,
        `export const O = () => <Card action={<Table />} />;`,
        `export const P = () => <Card>{() => <Table />}</Card>;`,
        `export const T = () => <Card><Table containerClassName={\`rounded-none border-0 \${extra}\`} /></Card>;`,
        `export const U = () => <Card><div className={open ? "border p-2" : "p-2"}><Table containerClassName="rounded-none border-0" /></div></Card>;`,
        `export const X = () => <Card><div className={\`border\${suffix} p-2\`}><Table containerClassName={\`\${extra} rounded-none border-0\`} /></div></Card>;`,
        "",
      ].join("\n")
    );
    const found = findTablesFramedInsideCards([bad, good]);
    assert.ok(
      found.every((v) => v.includes("Bad.tsx")),
      found.join("\n")
    );
    // One violation per bad case. H, I and S are reported for their bordered sub-panel only
    // (their tables are unframed); Q, R and V because a dynamic container class proves nothing
    // (V: `border-0${suffix}` can render as `border-0-x`).
    const lines = found.map((v) => Number(v.split(":")[1].split(" ")[0]));
    assert.deepEqual(lines, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], found.join("\n"));
    for (const i of [5, 6, 10]) assert.ok(found[i].includes("bordered <div>"), found[i]);
    for (const i of [8, 9, 11]) assert.ok(found[i].includes("<Table> inside <Card>"), found[i]);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
