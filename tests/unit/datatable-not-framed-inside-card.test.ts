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
// they render no element. One level across files is covered too: when a parent writes
// `<Card>…<Child />…</Card>` with `Child` imported from another dashboard file, that file's
// tables (outside a Card of their own) are checked as if they sat in that card. The rendered
// behaviour of the cases fixed this way is also pinned by
// tests/unit/ui/single-frame-tables-in-card-19620.test.tsx.

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
 * Walks up from a JSX element, looking through expressions, fragments and `.map()` callbacks,
 * collecting the elements on the way. Stops at the nearest <Card> (`card: true`) or at the
 * enclosing function (`card: false`: the component's own root). Returns null for an element
 * passed as a prop value, which is not a child.
 */
function walkUp(node: JsxTag, sf: ts.SourceFile): { between: JsxTag[]; card: boolean } | null {
  const between: JsxTag[] = [];
  // An opening element's parent is its own JsxElement wrapper: start above it.
  let current: ts.Node | undefined = ts.isJsxOpeningElement(node)
    ? node.parent.parent
    : node.parent;
  while (current) {
    if (ts.isJsxElement(current)) {
      if (CARD_TAGS.has(tagName(current.openingElement, sf))) return { between, card: true };
      between.push(current.openingElement);
    } else if (ts.isJsxAttribute(current)) {
      return null;
    } else if (
      (ts.isFunctionLike(current) && !isMapCallback(current)) ||
      ts.isSourceFile(current)
    ) {
      return { between, card: false };
    }
    current = current.parent;
  }
  return { between, card: false };
}

/** Resolves a component import (`./X`, `../X`, `@/x/X`) to a scanned .tsx file, or null. */
function resolveImport(fromFile: string, spec: string, files: Set<string>): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = path.join(ROOT, "src", spec.slice(2));
  else if (spec.startsWith(".")) base = path.resolve(path.dirname(fromFile), spec);
  else return null;
  for (const candidate of [base, `${base}.tsx`, path.join(base, "index.tsx")]) {
    if (files.has(candidate)) return candidate;
  }
  return null;
}

/** One parent render of an imported component inside a <Card>. */
interface Hosting {
  /** Exported name of the component in its file ("default" for the default export). */
  exportName: string;
  /** Where the parent renders it, for messages. */
  site: string;
  /** Bordered elements between the component and the card, on the parent side. */
  panels: string[];
}

/**
 * Components that some parent renders inside a <Card> (one level: the parent writes
 * `<Card>…<Child />…</Card>` with `Child` imported from another scanned file). Their tables
 * sit in that card even though the card is not in their own JSX tree. Keyed by file.
 */
function findCardHostedComponents(files: string[]): Map<string, Hosting[]> {
  const scanned = new Set(files);
  const hosted = new Map<string, Hosting[]>();
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    if (!/<Card\b/.test(text)) continue;
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const at = (node: ts.Node) =>
      `${path.relative(ROOT, file)}:${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1}`;
    const imports = new Map<string, { target: string; exportName: string }>();
    for (const stmt of sf.statements) {
      if (!ts.isImportDeclaration(stmt) || !stmt.importClause) continue;
      const target = resolveImport(file, (stmt.moduleSpecifier as ts.StringLiteral).text, scanned);
      if (!target || target === file) continue;
      if (stmt.importClause.name) {
        imports.set(stmt.importClause.name.text, { target, exportName: "default" });
      }
      const named = stmt.importClause.namedBindings;
      if (named && ts.isNamedImports(named)) {
        for (const el of named.elements) {
          imports.set(el.name.text, { target, exportName: (el.propertyName ?? el.name).text });
        }
      }
    }
    const visit = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const imported = imports.get(tagName(node, sf));
        const walk = imported ? walkUp(node, sf) : null;
        if (imported && walk?.card) {
          const panels = walk.between
            .filter((el) => hasClass(staticClassText(el, "className"), "border"))
            .map((el) => at(el));
          const list = hosted.get(imported.target) ?? [];
          list.push({ exportName: imported.exportName, site: at(node), panels });
          hosted.set(imported.target, list);
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return hosted;
}

const hasModifier = (node: ts.Node, kind: ts.SyntaxKind) =>
  ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some((m) => m.kind === kind);

/** Names a top-level statement declares (functions, classes, variables). */
function declaredNames(stmt: ts.Statement): string[] {
  if ((ts.isFunctionDeclaration(stmt) || ts.isClassDeclaration(stmt)) && stmt.name) {
    return [stmt.name.text];
  }
  if (ts.isVariableStatement(stmt)) {
    return stmt.declarationList.declarations
      .map((d) => (ts.isIdentifier(d.name) ? d.name.text : ""))
      .filter(Boolean);
  }
  return [];
}

/** The top-level statement that holds a node. */
function topLevelStatement(node: ts.Node): ts.Statement | null {
  let current: ts.Node = node;
  while (current.parent && !ts.isSourceFile(current.parent)) current = current.parent;
  return current.parent ? (current as ts.Statement) : null;
}

/**
 * The statements whose tables a hosted component renders: the exported component itself plus
 * the same-file components it renders by JSX tag (one level), e.g. a local `Rows` helper.
 */
function hostedStatements(sf: ts.SourceFile, exportName: string): Set<ts.Statement> {
  const byName = new Map<string, ts.Statement>();
  for (const stmt of sf.statements) for (const name of declaredNames(stmt)) byName.set(name, stmt);
  let root: ts.Statement | undefined;
  if (exportName === "default") {
    root = sf.statements.find(
      (st) =>
        (ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st)) &&
        hasModifier(st, ts.SyntaxKind.DefaultKeyword)
    );
    const assignment = sf.statements.find(ts.isExportAssignment);
    if (!root && assignment && ts.isIdentifier(assignment.expression)) {
      root = byName.get(assignment.expression.text);
    }
  } else {
    root = byName.get(exportName);
  }
  const result = new Set<ts.Statement>();
  if (!root) return result;
  result.add(root);
  const visit = (node: ts.Node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const local = byName.get(node.tagName.getText(sf));
      if (local) result.add(local);
    }
    ts.forEachChild(node, visit);
  };
  visit(root);
  return result;
}

function findTablesFramedInsideCards(files: string[]): string[] {
  const hosted = findCardHostedComponents(files);
  const violations: string[] = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    if (!/<(DataTable(Shell)?|Table)\b/.test(text)) continue;
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const hostings = (hosted.get(file) ?? []).map((h) => ({
      ...h,
      statements: hostedStatements(sf, h.exportName),
    }));
    const at = (node: ts.Node) =>
      `${path.relative(ROOT, file)}:${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1}`;
    const report = (node: JsxTag, name: string, walk: { between: JsxTag[] }, where: string) => {
      if (tableDrawsOwnFrame(node, name)) violations.push(`${at(node)} <${name}> inside ${where}`);
      for (const panel of walk.between) {
        if (hasClass(staticClassText(panel, "className"), "border")) {
          violations.push(
            `${at(panel)} bordered <${tagName(panel, sf)}> around a table in ${where}`
          );
        }
      }
    };
    const visit = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const name = tagName(node, sf);
        const walk = TABLE_TAGS.has(name) ? walkUp(node, sf) : null;
        if (walk?.card) {
          report(node, name, walk, "<Card>");
        } else if (walk) {
          const stmt = topLevelStatement(node);
          for (const h of hostings) {
            if (!stmt || !h.statements.has(stmt)) continue;
            report(node, name, walk, `the <Card> of ${h.site}`);
            for (const panel of h.panels) {
              violations.push(
                `${panel} bordered element around ${at(node)} in the <Card> of ${h.site}`
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

test("the guard follows a child component rendered inside a parent's Card", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-datatable-card-"));
  try {
    const write = (name: string, body: string) => {
      const file = path.join(tmp, name);
      fs.writeFileSync(file, body);
      return file;
    };
    const parent = write(
      "Parent.tsx",
      [
        `import Hosted from "./Hosted";`,
        `import { Loose } from "./Loose";`,
        `import Framed from "./Framed";`,
        `export default function Parent() {`,
        `  return (<><Card><div className="p-6"><Hosted /></div></Card><Loose /><Card><Framed /></Card></>);`,
        `}`,
        "",
      ].join("\n")
    );
    // Rendered in the parent's Card: a bordered sub-panel and a bordered table are reported.
    const hosted = write(
      "Hosted.tsx",
      [
        `export default function Hosted() {`,
        `  return (<div className="rounded-xl border border-border p-5"><Table scrollbarLabel="x" /></div>);`,
        `}`,
        "",
      ].join("\n")
    );
    // Not inside any Card: its own frame is fine.
    const loose = write(
      "Loose.tsx",
      [
        `export function Loose() {`,
        `  return (<div className="rounded-xl border p-5"><Table /></div>);`,
        `}`,
        "",
      ].join("\n")
    );
    // In the parent's Card and already unframed.
    const framed = write(
      "Framed.tsx",
      [
        `export default function Framed() {`,
        `  return (<section><Table containerClassName="rounded-none border-0" /></section>);`,
        `}`,
        "",
      ].join("\n")
    );
    const found = findTablesFramedInsideCards([parent, hosted, loose, framed]);
    assert.equal(found.length, 2, found.join("\n"));
    assert.ok(
      found.every((v) => v.includes("Hosted.tsx:2") && v.includes("Parent.tsx:5")),
      found.join("\n")
    );
    assert.ok(found.some((v) => v.includes("<Table> inside the <Card> of")));
    assert.ok(found.some((v) => v.includes("bordered <div> around a table in the <Card> of")));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("the cross-file check follows the hosted component, its local helpers and parent panels", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-datatable-card-"));
  try {
    const write = (name: string, body: string) => {
      const file = path.join(tmp, name);
      fs.writeFileSync(file, body);
      return file;
    };
    const parent = write(
      "Parent.tsx",
      [
        `import { Child } from "./Components";`,
        `import Panelled from "./Panelled";`,
        `export const P = () => (<><Card><Child /></Card><Card><div className="rounded-lg border p-4"><Panelled /></div></Card></>);`,
        "",
      ].join("\n")
    );
    const components = write(
      "Components.tsx",
      [
        `function Rows() {`,
        `  return <Table scrollbarLabel="rows" />;`,
        `}`,
        `export function Child() {`,
        `  return (<section><Rows /></section>);`,
        `}`,
        `export function Standalone() {`,
        `  return (<div className="rounded-xl border p-5"><Table /></div>);`,
        `}`,
        "",
      ].join("\n")
    );
    const panelled = write(
      "Panelled.tsx",
      [
        `export default function Panelled() {`,
        `  return <Table containerClassName="rounded-none border-0" />;`,
        `}`,
        "",
      ].join("\n")
    );
    const found = findTablesFramedInsideCards([parent, components, panelled]);
    // Child's local helper Rows draws a framed table in the parent's card; Standalone is never
    // rendered in a card, so its own frame is fine; Panelled is unframed but the parent wraps
    // it in a bordered panel inside the card.
    assert.equal(found.length, 2, found.join("\n"));
    assert.ok(
      found.some((v) =>
        v.startsWith(path.relative(ROOT, components) + ":2 <Table> inside the <Card> of")
      ),
      found.join("\n")
    );
    assert.ok(
      found.some((v) => v.startsWith(path.relative(ROOT, parent) + ":3 bordered element around")),
      found.join("\n")
    );
    assert.ok(!found.some((v) => v.includes("Components.tsx:8")), found.join("\n"));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
