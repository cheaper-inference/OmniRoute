// Review of 2026-11-15, defect 6 (finding A5-02): 50 of the 74 hand-assembled kit tables had
// no accessible name. The kit makes the table container a tab stop while it overflows, and
// names it (role="region") only from `scrollLabel`, a `TableCaption`, or the table's own
// `aria-labelledby` / `aria-label` (packages/ui-kit/src/table.tsx). Without one of them the
// overflowing table is a tab stop a screen reader announces with no name.
//
// `scrollbarLabel` is not a name: it only labels the kit's persistent scrollbar.
//
// This guard parses every dashboard TSX file and fails on a kit `<Table>` that carries none of
// the four. There is no exception list: a table without a better label takes a generic one.
//
// The same review (defect 9, finding A7-05) found tables that draw the kit's persistent
// scrollbar without `scrollbarLabel`: the kit then announces it with its English default,
// "Table", in every locale. The second guard fails on those.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCAN_DIRS = ["src/app", "src/shared/components"];
const KIT_TABLE_MODULE = "@omniroute/ui-kit/table";
const NAMING_PROPS = ["scrollLabel", "aria-label", "aria-labelledby"];

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

/** Local names bound to an export of the kit table module (`import { Table as T }`). */
function kitTableImports(sf: ts.SourceFile, exported: string): Set<string> {
  const names = new Set<string>();
  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier)) continue;
    if (stmt.moduleSpecifier.text !== KIT_TABLE_MODULE) continue;
    const named = stmt.importClause?.namedBindings;
    if (!named || !ts.isNamedImports(named)) continue;
    for (const el of named.elements) {
      if ((el.propertyName ?? el.name).text === exported) names.add(el.name.text);
    }
  }
  return names;
}

/** True when one of the props is written with a value that is not an empty string. */
function hasTextProp(node: JsxTag, sf: ts.SourceFile, props: string[]): boolean {
  return node.attributes.properties.some((attr) => {
    if (!ts.isJsxAttribute(attr) || !props.includes(attr.name.getText(sf))) return false;
    const init = attr.initializer;
    if (!init) return false;
    if (ts.isStringLiteral(init)) return init.text.trim() !== "";
    if (!ts.isJsxExpression(init) || !init.expression) return false;
    const expr = init.expression;
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
      return expr.text.trim() !== "";
    }
    return true;
  });
}

const hasNamingProp = (node: JsxTag, sf: ts.SourceFile) => hasTextProp(node, sf, NAMING_PROPS);

/**
 * True when the table draws the kit's persistent horizontal scrollbar: the kit default, unless
 * `persistentScrollbars={false}` turns it off or `maxHeight` is set (a capped table keeps its
 * native scrollbars, packages/ui-kit/src/table.tsx). Any other `persistentScrollbars` value
 * (true, a variable) can draw it.
 */
function drawsPersistentScrollbar(node: JsxTag, sf: ts.SourceFile): boolean {
  const prop = (name: string) =>
    node.attributes.properties.find(
      (attr): attr is ts.JsxAttribute => ts.isJsxAttribute(attr) && attr.name.getText(sf) === name
    );
  const persistent = prop("persistentScrollbars");
  if (!persistent) return prop("maxHeight") === undefined;
  const init = persistent.initializer;
  const off =
    init !== undefined &&
    ts.isJsxExpression(init) &&
    init.expression?.kind === ts.SyntaxKind.FalseKeyword;
  return !off;
}

/** True when the table's own JSX holds a `<TableCaption>` (not one of a nested table). */
function hasOwnCaption(
  table: ts.JsxElement,
  sf: ts.SourceFile,
  tableNames: Set<string>,
  captionNames: Set<string>
): boolean {
  let found = false;
  const visit = (node: ts.Node) => {
    if (found) return;
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const name = node.tagName.getText(sf);
      if (captionNames.has(name)) {
        found = true;
        return;
      }
      // A nested table's caption names the nested table, not this one.
      if (tableNames.has(name) && node !== table.openingElement) return;
    }
    if (
      ts.isJsxElement(node) &&
      node !== table &&
      tableNames.has(node.openingElement.tagName.getText(sf))
    ) {
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(table);
  return found;
}

/** What a check needs to judge one kit Table. */
interface KitTable {
  node: JsxTag;
  sf: ts.SourceFile;
  tableNames: Set<string>;
  captionNames: Set<string>;
}

/** `file:line` of every kit Table the check rejects. */
function findKitTables(files: string[], rejects: (table: KitTable) => boolean): string[] {
  const found: string[] = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    if (!text.includes(KIT_TABLE_MODULE)) continue;
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const tableNames = kitTableImports(sf, "Table");
    if (tableNames.size === 0) continue;
    const captionNames = kitTableImports(sf, "TableCaption");
    const visit = (node: ts.Node) => {
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        tableNames.has(node.tagName.getText(sf)) &&
        rejects({ node, sf, tableNames, captionNames })
      ) {
        const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
        found.push(`${path.relative(ROOT, file)}:${line}`);
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return found;
}

/** `file:line` of every kit Table without an accessible name. */
const findUnnamedTables = (files: string[]) =>
  findKitTables(
    files,
    ({ node, sf, tableNames, captionNames }) =>
      !hasNamingProp(node, sf) &&
      !(ts.isJsxOpeningElement(node) && hasOwnCaption(node.parent, sf, tableNames, captionNames))
  );

/** `file:line` of every kit Table whose persistent scrollbar keeps the kit's English label. */
const findDefaultScrollbarLabels = (files: string[]) =>
  findKitTables(
    files,
    ({ node, sf }) =>
      drawsPersistentScrollbar(node, sf) && !hasTextProp(node, sf, ["scrollbarLabel"])
  );

test("every kit Table has an accessible name", () => {
  const files = SCAN_DIRS.flatMap((dir) => listTsx(path.join(ROOT, dir)));
  assert.ok(files.length > 100, "scan should cover the dashboard sources");
  assert.deepEqual(
    findUnnamedTables(files),
    [],
    "pass scrollLabel (or aria-label / aria-labelledby / a TableCaption) with a translated name"
  );
});

test("the guard tells a named table from an unnamed one", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-table-name-"));
  try {
    const write = (name: string, lines: string[]) => {
      const file = path.join(tmp, name);
      fs.writeFileSync(file, [...lines, ""].join("\n"));
      return file;
    };
    const bad = write("Bad.tsx", [
      `import { Table, TableCaption } from "@omniroute/ui-kit/table";`,
      `export const A = () => <Table />;`,
      `export const B = () => <Table scrollbarLabel={t("logs")}><tbody /></Table>;`,
      `export const C = () => <Table scrollLabel="" />;`,
      `export const D = () => <Table aria-label={""}><tbody /></Table>;`,
      `export const E = () => <Table {...rest} />;`,
      `export const F = () => <Table><tbody><tr><td><Table><TableCaption>inner</TableCaption></Table></td></tr></tbody></Table>;`,
    ]);
    const aliased = write("Aliased.tsx", [
      `import { Table as KitTable } from "@omniroute/ui-kit/table";`,
      `export const G = () => <KitTable className="text-xs" />;`,
    ]);
    const good = write("Good.tsx", [
      `import { Table, TableCaption } from "@omniroute/ui-kit/table";`,
      `export const H = () => <Table scrollLabel={t("logs")} />;`,
      `export const I = () => <Table aria-label="Logs"><tbody /></Table>;`,
      `export const J = () => <Table aria-labelledby={headingId} />;`,
      `export const K = () => <Table><TableCaption className="sr-only">{t("logs")}</TableCaption></Table>;`,
      `export const L = () => <Table scrollLabel={label ?? fallback} scrollbarLabel={label} />;`,
    ]);
    // A table that is not the kit's (a local component, another library) is not checked.
    const other = write("Other.tsx", [
      `import { Table } from "./local-table";`,
      `export const M = () => <Table />;`,
    ]);
    const rel = (file: string) => path.relative(ROOT, file);
    assert.deepEqual(findUnnamedTables([bad, aliased, good, other]), [
      `${rel(bad)}:2`,
      `${rel(bad)}:3`,
      `${rel(bad)}:4`,
      `${rel(bad)}:5`,
      `${rel(bad)}:6`,
      `${rel(bad)}:7`,
      `${rel(aliased)}:2`,
    ]);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("every kit Table that draws the persistent scrollbar labels it", () => {
  const files = SCAN_DIRS.flatMap((dir) => listTsx(path.join(ROOT, dir)));
  assert.deepEqual(
    findDefaultScrollbarLabels(files),
    [],
    'pass scrollbarLabel with a translated text: the kit default is the English "Table"'
  );
});

test("the scrollbar guard only asks for a label where the kit draws the scrollbar", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-table-name-"));
  try {
    const write = (name: string, lines: string[]) => {
      const file = path.join(tmp, name);
      fs.writeFileSync(file, [...lines, ""].join("\n"));
      return file;
    };
    const bad = write("Bad.tsx", [
      `import { Table } from "@omniroute/ui-kit/table";`,
      `export const A = () => <Table scrollLabel={t("logs")} />;`,
      `export const B = () => <Table scrollbarLabel="" className="text-sm" />;`,
      `export const C = () => <Table persistentScrollbars maxHeight="20rem" />;`,
      `export const D = () => <Table persistentScrollbars={wide} maxHeight="20rem" />;`,
    ]);
    const good = write("Good.tsx", [
      `import { Table } from "@omniroute/ui-kit/table";`,
      `export const E = () => <Table scrollbarLabel={t("logs")} />;`,
      `export const F = () => <Table persistentScrollbars={false} />;`,
      `export const G = () => <Table maxHeight="20rem" scrollLabel={t("logs")} />;`,
      `export const H = () => <Table persistentScrollbars={wide} scrollbarLabel={t("logs")} />;`,
    ]);
    const rel = (file: string) => path.relative(ROOT, file);
    assert.deepEqual(findDefaultScrollbarLabels([bad, good]), [
      `${rel(bad)}:2`,
      `${rel(bad)}:3`,
      `${rel(bad)}:4`,
      `${rel(bad)}:5`,
    ]);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
