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
// they render no element.
//
// Two more shapes are covered since the UI review of 2026-11-15 (finding A5-07), which found
// seven double frames this guard could not see:
//   - a card made by hand: an element with a full `border` and a `rounded-*` class (a `div`
//     or a `section` styled as a card) is a frame too. A table under it, with no <Card> in
//     between, must not draw its own frame either;
//   - any depth across components: when a component is rendered inside a frame (a <Card> or a
//     hand-made card) of its parent, its tables are checked as if they sat in that frame, and
//     so are the tables of the components it renders outside a frame of its own, in the same
//     file or imported from another dashboard file, at any depth.
// The rendered behaviour of the cases fixed this way is also pinned by
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

/**
 * Tables that keep the kit frame inside a frame on purpose, by file, each with the reason.
 * The frame has to be part of what the table is, not a leftover.
 */
const FRAMED_ON_PURPOSE: Record<string, string> = {
  // A table written in markdown is content inside prose (a chat bubble, a model answer). It is
  // drawn wherever that prose is shown, bordered box or not, and needs its own outline to read
  // as a table in the middle of the text.
  "src/app/(dashboard)/dashboard/playground/components/MarkdownMessage.tsx":
    "markdown table inside prose",
};

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

/**
 * A card made by hand: an element that always renders a full border and a rounded corner
 * (`rounded`, `rounded-lg`, … but not `rounded-none`). It frames what is inside it the way a
 * <Card> does.
 */
function isHandMadeCard(node: JsxTag): boolean {
  const text = staticClassText(node, "className");
  return (
    hasClass(text, "border") &&
    text !== null &&
    /(^|\s)rounded(-(?!none($|\s))\S+)?($|\s)/.test(text)
  );
}

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

/** Where a component is rendered inside a frame, possibly through other components. */
interface Hosting {
  /** The frame: "<Card>" or, for a card made by hand, "bordered <div>". */
  frame: string;
  /** Where the frame's own file renders the component (or the first one of the chain). */
  site: string;
  /** Bordered elements between the component and the frame, across the chain. */
  panels: string[];
}

const hasModifier = (node: ts.Node, kind: ts.SyntaxKind) =>
  ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some((m) => m.kind === kind);

/**
 * The top-level declarations of a file by name: a function or class statement, or one
 * declarator of a variable statement (`export const A = …, B = …` gives two units).
 */
function declarationUnits(sf: ts.SourceFile): Map<string, ts.Node> {
  const units = new Map<string, ts.Node>();
  for (const stmt of sf.statements) {
    if ((ts.isFunctionDeclaration(stmt) || ts.isClassDeclaration(stmt)) && stmt.name) {
      units.set(stmt.name.text, stmt);
    } else if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) units.set(decl.name.text, decl);
      }
    }
  }
  return units;
}

/** The top-level declaration unit (see `declarationUnits`) that holds a node. */
function topLevelUnit(node: ts.Node): ts.Node | null {
  let current: ts.Node = node;
  let declarator: ts.Node | null = null;
  while (current.parent && !ts.isSourceFile(current.parent)) {
    if (ts.isVariableDeclaration(current)) declarator = current;
    current = current.parent;
  }
  if (!current.parent) return null;
  return ts.isVariableStatement(current) ? declarator : current;
}

/** The declaration behind an export name ("default" for the default export), or undefined. */
function exportedUnit(
  sf: ts.SourceFile,
  byName: Map<string, ts.Node>,
  exportName: string
): ts.Node | undefined {
  if (exportName !== "default") return byName.get(exportName);
  const declared = sf.statements.find(
    (st) =>
      (ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st)) &&
      hasModifier(st, ts.SyntaxKind.DefaultKeyword)
  );
  if (declared) return declared;
  const assignment = sf.statements.find(ts.isExportAssignment);
  return assignment && ts.isIdentifier(assignment.expression)
    ? byName.get(assignment.expression.text)
    : undefined;
}

/** One scanned file: its AST, its top-level declarations and its component imports. */
interface Source {
  file: string;
  sf: ts.SourceFile;
  units: Map<string, ts.Node>;
  imports: Map<string, { target: string; exportName: string }>;
  at: (node: ts.Node) => string;
}

const TABLE_TAG_PATTERN = /<(DataTable(Shell)?|Table)\b/;

/**
 * The files that can put a frame above a table: the ones that render a table, and the ones
 * that import them, directly or through other files. Found by text, so the rest of the
 * dashboard is never parsed.
 */
function filesAroundTables(texts: Map<string, string>): Set<string> {
  const scanned = new Set(texts.keys());
  const importers = new Map<string, string[]>();
  for (const [file, text] of texts) {
    for (const match of text.matchAll(/\bfrom\s+["']([^"']+)["']/g)) {
      const target = resolveImport(file, match[1], scanned);
      if (target && target !== file)
        importers.set(target, [...(importers.get(target) ?? []), file]);
    }
  }
  const around = new Set<string>();
  const pending = [...texts].filter(([, text]) => TABLE_TAG_PATTERN.test(text)).map(([f]) => f);
  while (pending.length > 0) {
    const file = pending.pop()!;
    if (around.has(file)) continue;
    around.add(file);
    pending.push(...(importers.get(file) ?? []));
  }
  return around;
}

function loadSources(files: string[]): Map<string, Source> {
  const scanned = new Set(files);
  const texts = new Map(files.map((file) => [file, fs.readFileSync(file, "utf8")]));
  const sources = new Map<string, Source>();
  for (const file of filesAroundTables(texts)) {
    const text = texts.get(file)!;
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
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
    sources.set(file, {
      file,
      sf,
      units: declarationUnits(sf),
      imports,
      at: (node) =>
        `${path.relative(ROOT, file)}:${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1}`,
    });
  }
  return sources;
}

/**
 * The frame above a JSX element in its own JSX tree, with the elements in between:
 *   - a <Card>, however far up: everything between counts as inside the card;
 *   - otherwise the nearest card made by hand (see `isHandMadeCard`);
 *   - otherwise none (`frame: null`): the element sits at the root of its component.
 * Returns null for an element passed as a prop value, which is not a child.
 */
function frameAbove(
  node: JsxTag,
  src: Source
): { frame: string | null; frameSite: string | null; between: JsxTag[] } | null {
  const walk = walkUp(node, src.sf);
  if (!walk) return null;
  if (walk.card) return { frame: "<Card>", frameSite: null, between: walk.between };
  const index = walk.between.findIndex(isHandMadeCard);
  if (index === -1) return { frame: null, frameSite: null, between: walk.between };
  const card = walk.between[index];
  return {
    frame: `bordered <${tagName(card, src.sf)}>`,
    frameSite: src.at(card),
    between: walk.between.slice(0, index),
  };
}

const unitKey = (file: string, unit: ts.Node) => `${file}\u0000${unit.pos}`;

/**
 * Components rendered inside a frame, keyed by declaration (`unitKey`): directly, when some
 * component writes `<Card>…<Child />…</Card>` (or the same with a card made by hand), and
 * through other components, when a hosted component renders `<Grandchild />` outside a frame
 * of its own. `Child` and `Grandchild` are declared in the same file or imported from another
 * scanned file. Their tables sit in that frame even though it is not in their own JSX tree.
 */
function findHostedComponents(sources: Map<string, Source>): Map<string, Hosting[]> {
  /** A render of one component by another, outside any frame of the renderer's own tree. */
  interface Edge {
    to: string;
    panels: string[];
  }
  const hosted = new Map<string, Hosting[]>();
  const edges = new Map<string, Edge[]>();
  const queue: Array<{ key: string; hosting: Hosting }> = [];
  const host = (key: string, hosting: Hosting) => {
    const list = hosted.get(key) ?? [];
    // One hosting per component and site: a render cycle cannot grow the list.
    if (list.some((h) => h.site === hosting.site && h.frame === hosting.frame)) return;
    list.push(hosting);
    hosted.set(key, list);
    queue.push({ key, hosting });
  };

  for (const src of sources.values()) {
    const rendered = (name: string): string | null => {
      const imported = src.imports.get(name);
      if (imported) {
        const target = sources.get(imported.target);
        const unit = target && exportedUnit(target.sf, target.units, imported.exportName);
        return target && unit ? unitKey(target.file, unit) : null;
      }
      const local = src.units.get(name);
      return local ? unitKey(src.file, local) : null;
    };
    const visit = (node: ts.Node) => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const to = rendered(tagName(node, src.sf));
        const above = to ? frameAbove(node, src) : null;
        const owner = above ? topLevelUnit(node) : null;
        if (to && above) {
          const panels = above.between
            .filter((el) => hasClass(staticClassText(el, "className"), "border"))
            .map((el) => src.at(el));
          if (above.frame) {
            host(to, { frame: above.frame, site: src.at(node), panels });
          } else if (owner && unitKey(src.file, owner) !== to) {
            // No frame of the renderer's own above it: a frame above the renderer reaches it.
            const from = unitKey(src.file, owner);
            edges.set(from, [...(edges.get(from) ?? []), { to, panels }]);
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(src.sf);
  }

  // What a hosted component renders outside a frame of its own sits in the same frame.
  while (queue.length > 0) {
    const { key, hosting } = queue.shift()!;
    for (const edge of edges.get(key) ?? []) {
      host(edge.to, { ...hosting, panels: [...hosting.panels, ...edge.panels] });
    }
  }
  return hosted;
}

function findTablesFramedInsideCards(files: string[]): string[] {
  const sources = loadSources(files);
  const hosted = findHostedComponents(sources);
  const violations: string[] = [];
  for (const src of sources.values()) {
    const { sf, at } = src;
    if (!TABLE_TAG_PATTERN.test(sf.text)) continue;
    const report = (node: JsxTag, name: string, between: JsxTag[], where: string) => {
      if (tableDrawsOwnFrame(node, name)) violations.push(`${at(node)} <${name}> inside ${where}`);
      for (const panel of between) {
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
        const unit = walk ? topLevelUnit(node) : null;
        const hostings = unit ? (hosted.get(unitKey(src.file, unit)) ?? []) : [];
        if (walk?.card) {
          report(node, name, walk.between, "<Card>");
        } else if (walk && hostings.length > 0) {
          // The parent's frame is the frame: a card made by hand in this file, between the
          // table and the component root, is a bordered sub-panel inside it.
          for (const h of hostings) {
            report(node, name, walk.between, `the ${h.frame} of ${h.site}`);
            for (const panel of h.panels) {
              violations.push(
                `${panel} bordered element around ${at(node)} in the ${h.frame} of ${h.site}`
              );
            }
          }
        } else if (walk) {
          const above = frameAbove(node, src);
          if (above?.frame)
            report(node, name, above.between, `the ${above.frame} of ${above.frameSite}`);
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
  const found = findTablesFramedInsideCards(files);
  const fileOf = (violation: string) => violation.split(":")[0];
  assert.deepEqual(
    found.filter((violation) => !(fileOf(violation) in FRAMED_ON_PURPOSE)),
    []
  );
  // An exception that no longer matches a table is stale: drop it.
  const used = new Set(found.map(fileOf));
  assert.deepEqual(
    Object.keys(FRAMED_ON_PURPOSE).filter((file) => !used.has(file)),
    [],
    "stale FRAMED_ON_PURPOSE entries"
  );
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
    // Not inside any frame: its own frame is fine.
    const loose = write(
      "Loose.tsx",
      [
        `export function Loose() {`,
        `  return (<div className="p-5"><Table /></div>);`,
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
        `import { Hosted as PairHosted } from "./Pair";`,
        `export const P = () => (<><Card><Child /></Card><Card><div className="rounded-lg border p-4"><Panelled /></div></Card><Card><PairHosted /></Card></>);`,
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
        `  return (<div className="p-5"><Table /></div>);`,
        `}`,
        "",
      ].join("\n")
    );
    // Two components in one variable statement: only the hosted declarator counts.
    const pair = write(
      "Pair.tsx",
      [
        `export const Hosted = () => <Table scrollbarLabel="h" />,`,
        `  Other = () => <div className="p-5"><Table /></div>;`,
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
    const found = findTablesFramedInsideCards([parent, components, panelled, pair]);
    // Child's local helper Rows draws a framed table in the parent's card; Standalone is never
    // rendered in a frame, so its own frame is fine; Panelled is unframed but the parent wraps
    // it in a bordered panel inside the card; in Pair only the hosted declarator is checked.
    assert.equal(found.length, 3, found.join("\n"));
    assert.ok(
      found.some((v) =>
        v.startsWith(path.relative(ROOT, pair) + ":1 <Table> inside the <Card> of")
      ),
      found.join("\n")
    );
    assert.ok(!found.some((v) => v.includes("Pair.tsx:2")), found.join("\n"));
    assert.ok(
      found.some((v) =>
        v.startsWith(path.relative(ROOT, components) + ":2 <Table> inside the <Card> of")
      ),
      found.join("\n")
    );
    assert.ok(
      found.some((v) => v.startsWith(path.relative(ROOT, parent) + ":4 bordered element around")),
      found.join("\n")
    );
    assert.ok(!found.some((v) => v.includes("Components.tsx:8")), found.join("\n"));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("a card made by hand frames its table too", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-datatable-card-"));
  try {
    const bad = path.join(tmp, "Bad.tsx");
    fs.writeFileSync(
      bad,
      [
        `export const A = () => <div className="rounded-xl border border-border p-5"><Table scrollbarLabel="x" /></div>;`,
        `export const B = () => <section className="rounded border p-2"><Table persistentScrollbars={false} /></section>;`,
        `export const C = () => <div className={\`border rounded-lg overflow-hidden \${tone}\`}><div className="border-t border-border"><Table className="text-sm" /></div></div>;`,
        `export const D = () => <div className="rounded-lg border p-3"><DataTable data={[]} /></div>;`,
        `export const E = () => <div className="rounded-lg border p-3"><DataTableShell>{rows}</DataTableShell></div>;`,
        `export const F = () => <div className="rounded-xl border p-4"><div className="border p-2"><Table containerClassName="rounded-none border-0" /></div></div>;`,
        `export const G = () => <div className="rounded-md border">{rows.map((r) => <Table key={r} containerClassName="mt-3" />)}</div>;`,
        "",
      ].join("\n")
    );
    const good = path.join(tmp, "Good.tsx");
    fs.writeFileSync(
      good,
      [
        `export const H = () => <div className="rounded-xl border p-5"><Table containerClassName="mt-5 rounded-none border-0" /></div>;`,
        `export const I = () => <div className="rounded-lg border p-3"><DataTable framed={false} data={[]} /></div>;`,
        // A divider or a corner alone is not a card.
        `export const J = () => <div className="rounded-lg border-t border-border p-4"><Table /></div>;`,
        `export const K = () => <div className="rounded-xl bg-surface p-5"><Table /></div>;`,
        `export const L = () => <div className="rounded-none border p-5"><Table /></div>;`,
        // An unresolved class proves nothing, the same as for the table's own classes.
        `export const M = () => <div className={open ? "rounded-xl border" : ""}><Table /></div>;`,
        `export const N = () => <div className="rounded-xl border" title={<Table />} />;`,
        "",
      ].join("\n")
    );
    const found = findTablesFramedInsideCards([bad, good]);
    assert.ok(
      found.every((v) => v.includes("Bad.tsx")),
      found.join("\n")
    );
    const lines = found.map((v) => Number(v.split(":")[1].split(" ")[0]));
    assert.deepEqual(lines, [1, 2, 3, 4, 5, 6, 7], found.join("\n"));
    assert.ok(found[0].includes("<Table> inside the bordered <div> of"), found[0]);
    assert.ok(found[1].includes("<Table> inside the bordered <section> of"), found[1]);
    assert.ok(found[3].includes("<DataTable> inside the bordered <div> of"), found[3]);
    assert.ok(found[4].includes("<DataTableShell> inside the bordered <div> of"), found[4]);
    // F: the table is unframed, but a bordered sub-panel sits between it and the card.
    assert.ok(
      found[5].includes("bordered <div> around a table in the bordered <div> of"),
      found[5]
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("a frame reaches the tables of components at any depth below it", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-datatable-card-"));
  try {
    const write = (name: string, lines: string[]) => {
      const file = path.join(tmp, name);
      fs.writeFileSync(file, [...lines, ""].join("\n"));
      return file;
    };
    const rel = (file: string) => path.relative(ROOT, file);

    // A card made by hand in the parent, the table in an imported child.
    const row = write("WebhookRow.tsx", [
      `import { Deliveries } from "./Deliveries";`,
      `export function WebhookRow() {`,
      `  return (<div className="rounded-xl border border-border bg-surface"><div className="p-4"><Deliveries /></div></div>);`,
      `}`,
    ]);
    const deliveries = write("Deliveries.tsx", [
      `export function Deliveries() {`,
      `  return <Table className="text-xs" scrollbarLabel="d" />;`,
      `}`,
    ]);

    // A <Card>, a local component, an imported component and its local helper.
    const tab = write("Tab.tsx", [
      `import History from "./History";`,
      `function Form() {`,
      `  return (<div className="space-y-4"><History /></div>);`,
      `}`,
      `export default function Tab() {`,
      `  return (<Card><Form /></Card>);`,
      `}`,
    ]);
    const history = write("History.tsx", [
      `function Rows() {`,
      `  return <Table className="w-full" />;`,
      `}`,
      `export default function History() {`,
      `  return (<section><Rows /></section>);`,
      `}`,
    ]);

    // A <Card> two imports above the table, with a bordered panel on the way.
    const quota = write("QuotaCard.tsx", [
      `import Expanded from "./Expanded";`,
      `export default function QuotaCard() {`,
      `  return (<Card><Expanded /></Card>);`,
      `}`,
    ]);
    const expanded = write("Expanded.tsx", [
      `import Usage from "./Usage";`,
      `import Plain from "./Plain";`,
      `export default function Expanded() {`,
      `  return (<div className="pt-2">{cursor && <Usage />}<div className="border p-2"><Plain /></div></div>);`,
      `}`,
    ]);
    const usage = write("Usage.tsx", [
      `export default function Usage() {`,
      `  return <Table containerClassName="overflow-x-auto" persistentScrollbars={false} />;`,
      `}`,
    ]);
    // Unframed, but the middle component wraps it in a bordered panel inside the Card.
    const plain = write("Plain.tsx", [
      `export default function Plain() {`,
      `  return <Table containerClassName="rounded-none border-0" />;`,
      `}`,
    ]);

    // Components that render each other: the walk ends, and the unframed table is fine.
    const loop = write("Loop.tsx", [
      `function Branch() {`,
      `  return (<div><Leaf /><Table containerClassName="rounded-none border-0" /></div>);`,
      `}`,
      `function Leaf() {`,
      `  return (<div><Branch /></div>);`,
      `}`,
      `export const Tree = () => <Card><Branch /></Card>;`,
    ]);
    // Never rendered inside a frame, at any depth: the framed table is left alone.
    const free = write("Free.tsx", [
      `import Solo from "./Solo";`,
      `function Middle() {`,
      `  return (<div className="p-4"><Solo /></div>);`,
      `}`,
      `export const Free = () => <section><Middle /></section>;`,
    ]);
    const solo = write("Solo.tsx", [
      `export default function Solo() {`,
      `  return <Table />;`,
      `}`,
    ]);

    const found = findTablesFramedInsideCards([
      row,
      deliveries,
      tab,
      history,
      quota,
      expanded,
      usage,
      plain,
      loop,
      free,
      solo,
    ]);
    assert.deepEqual(
      [...found].sort(),
      [
        `${rel(deliveries)}:2 <Table> inside the bordered <div> of ${rel(row)}:3`,
        `${rel(history)}:2 <Table> inside the <Card> of ${rel(tab)}:6`,
        `${rel(usage)}:2 <Table> inside the <Card> of ${rel(quota)}:3`,
        `${rel(expanded)}:4 bordered element around ${rel(plain)}:2 in the <Card> of ${rel(quota)}:3`,
      ].sort(),
      found.join("\n")
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
