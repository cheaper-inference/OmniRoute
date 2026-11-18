// Review of 2026-11-15, defect 5 (finding A5-03): six hand-assembled kit tables had a row that
// opened something on a mouse click and nothing on the keyboard. The behaviour now lives in
// the `InteractiveTableRow` adapter (src/shared/components/InteractiveTableRow.tsx): tab stop,
// Enter and Space, and controls inside the row keep their own events.
//
// This guard parses every dashboard TSX file and fails on a kit `<TableRow>` that takes
// `onClick` directly: render `<InteractiveTableRow onActivate={…}>` instead. The behaviour
// itself is pinned by tests/unit/ui/interactive-table-row.test.tsx and
// tests/unit/ui/logger-row-keyboard-activation.test.tsx.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCAN_DIRS = ["src/app", "src/shared/components"];
/** The adapter itself: the one place that puts `onClick` on the kit row, with the keys. */
const ADAPTER = "src/shared/components/InteractiveTableRow.tsx";

/**
 * Rows that keep a pointer-only `onClick` on purpose, by file. Each entry needs the reason:
 * the row must already be operable from the keyboard some other way.
 */
const POINTER_ONLY_ROWS: Record<string, string> = {
  // The row click is a pointer shortcut for the disclosure button in its last cell, which is
  // the keyboard path and carries the state (`aria-expanded`, a name with the provider). A
  // second tab stop on the row would repeat it without the expanded state.
  "src/app/(dashboard)/dashboard/provider-stats/page.tsx":
    "row click mirrors the labelled aria-expanded disclosure button of the same row",
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

/** Local names bound to the kit `TableRow` (`import { TableRow as Row } from "…/table"`). */
function kitTableRowNames(sf: ts.SourceFile): Set<string> {
  const names = new Set<string>();
  for (const stmt of sf.statements) {
    if (!ts.isImportDeclaration(stmt) || !ts.isStringLiteral(stmt.moduleSpecifier)) continue;
    if (stmt.moduleSpecifier.text !== "@omniroute/ui-kit/table") continue;
    const named = stmt.importClause?.namedBindings;
    if (!named || !ts.isNamedImports(named)) continue;
    for (const el of named.elements) {
      if ((el.propertyName ?? el.name).text === "TableRow") names.add(el.name.text);
    }
  }
  return names;
}

/** `file:line` of every kit TableRow that takes `onClick` as a direct attribute. */
function findRowsWithBareOnClick(files: string[]): string[] {
  const found: string[] = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    if (!text.includes("TableRow")) continue;
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const rowNames = kitTableRowNames(sf);
    if (rowNames.size === 0) continue;
    const visit = (node: ts.Node) => {
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        rowNames.has(node.tagName.getText(sf)) &&
        node.attributes.properties.some(
          (attr) => ts.isJsxAttribute(attr) && attr.name.getText(sf) === "onClick"
        )
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

const fileOf = (site: string) => site.slice(0, site.lastIndexOf(":"));

test("no kit TableRow takes onClick without the keyboard handling", () => {
  const files = SCAN_DIRS.flatMap((dir) => listTsx(path.join(ROOT, dir)));
  assert.ok(files.length > 100, "scan should cover the dashboard sources");
  assert.ok(files.includes(path.join(ROOT, ADAPTER)), "the adapter should be in the scan");
  const found = findRowsWithBareOnClick(files.filter((file) => file !== path.join(ROOT, ADAPTER)));
  const violations = found.filter((site) => !(fileOf(site) in POINTER_ONLY_ROWS));
  assert.deepEqual(
    violations,
    [],
    "use <InteractiveTableRow onActivate={…}> instead of <TableRow onClick={…}>"
  );
  // An exception that no longer matches a row is stale: drop it.
  const used = new Set(found.map(fileOf));
  assert.deepEqual(
    Object.keys(POINTER_ONLY_ROWS).filter((file) => !used.has(file)),
    [],
    "stale POINTER_ONLY_ROWS entries"
  );
});

test("the adapter row handles the keyboard next to the click", () => {
  const text = fs.readFileSync(path.join(ROOT, ADAPTER), "utf8");
  for (const prop of ["onClick=", "onKeyDown=", "tabIndex="]) {
    assert.ok(text.includes(prop), `InteractiveTableRow sets ${prop}`);
  }
});

test("the pointer-only exception still has its keyboard path", () => {
  const file = "src/app/(dashboard)/dashboard/provider-stats/page.tsx";
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  // The disclosure button of the row: named, with the expanded state, toggling the same thing.
  assert.match(text, /aria-expanded=\{isExpanded\}/);
  assert.match(text, /aria-label=\{t\("toggleModels", \{ provider: providerName \}\)\}/);
});

test("the guard sees a bare onClick and accepts the adapter row", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-table-row-click-"));
  try {
    const write = (name: string, lines: string[]) => {
      const file = path.join(tmp, name);
      fs.writeFileSync(file, [...lines, ""].join("\n"));
      return file;
    };
    const bad = write("Bad.tsx", [
      `import { TableRow } from "@omniroute/ui-kit/table";`,
      `export const A = () => <TableRow onClick={() => open()} className="cursor-pointer" />;`,
      `export const B = () => <TableRow onClick={open}><td /></TableRow>;`,
    ]);
    const aliased = write("Aliased.tsx", [
      `import { TableRow as Row } from "@omniroute/ui-kit/table";`,
      `export const C = () => <Row onClick={open} />;`,
    ]);
    const good = write("Good.tsx", [
      `import { TableRow } from "@omniroute/ui-kit/table";`,
      `export const D = () => <InteractiveTableRow onActivate={() => open()} />;`,
      `export const E = () => <TableRow><td><button onClick={open} /></td></TableRow>;`,
      `export const F = () => <TableRow onMouseEnter={hover} />;`,
    ]);
    // A local component that happens to be called TableRow is not the kit row.
    const local = write("Local.tsx", [
      `function TableRow(props: { onClick: () => void }) { return <div {...props} />; }`,
      `export const G = () => <TableRow onClick={open} />;`,
    ]);
    const rel = (file: string) => path.relative(ROOT, file);
    assert.deepEqual(findRowsWithBareOnClick([bad, aliased, good, local]), [
      `${rel(bad)}:2`,
      `${rel(bad)}:3`,
      `${rel(aliased)}:2`,
    ]);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
