// #19620 / kit 0.0.116 (keak-ai/cheaper-inference-ui-kit#203): a kit <Table> that scrolls
// vertically takes `maxHeight`, so the kit owns the scroll container: it pins the header and
// makes the container a focusable, named region while it overflows (WCAG 2.1.1).
//
// This guard parses the dashboard and shared TSX and fails when a kit <Table>:
//   - caps its own height through classes (`max-h-*` in `containerClassName`), or sits directly
//     in an element that caps it (`max-h-*` / inline `maxHeight` plus a vertical overflow);
//   - takes `maxHeight` without an accessible name for the scroll region (`scrollLabel`,
//     `aria-label` or `aria-labelledby`).
// Whole-panel scroll areas sized by flex (`flex-1 overflow-y-auto`, `h-full overflow-auto`)
// are layout, not a table cap, and are not covered.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCAN_DIRS = ["src/app", "src/shared/components"];

type JsxTag = ts.JsxOpeningElement | ts.JsxSelfClosingElement;

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

const attr = (node: JsxTag, name: string) =>
  node.attributes.properties.find(
    (a): a is ts.JsxAttribute => ts.isJsxAttribute(a) && a.name.getText() === name
  );

const attrText = (node: JsxTag, name: string, sf: ts.SourceFile) =>
  attr(node, name)?.initializer?.getText(sf) ?? "";

const CAP_CLASS = /(^|[\s"'`])max-h-/;
const V_OVERFLOW = /overflow(-y)?-(auto|scroll)|overflow:\s*["'](auto|scroll)|overflowY/;

function parentElement(node: JsxTag): JsxTag | null {
  let current: ts.Node | undefined = ts.isJsxOpeningElement(node)
    ? node.parent.parent
    : node.parent;
  while (current) {
    if (ts.isJsxElement(current)) return current.openingElement;
    if (ts.isFunctionLike(current) || ts.isSourceFile(current) || ts.isJsxAttribute(current)) {
      return null;
    }
    current = current.parent;
  }
  return null;
}

function findViolations(files: string[]): string[] {
  const out: string[] = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    if (!/<Table\b/.test(text) || !/ui-kit\/table/.test(text)) continue;
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const at = (n: ts.Node) =>
      `${path.relative(ROOT, file)}:${sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1}`;
    const visit = (node: ts.Node) => {
      if (
        (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
        node.tagName.getText(sf) === "Table"
      ) {
        if (CAP_CLASS.test(attrText(node, "containerClassName", sf))) {
          out.push(`${at(node)} caps its height with classes: use maxHeight`);
        }
        const parent = parentElement(node);
        if (parent) {
          const p = `${attrText(parent, "className", sf)} ${attrText(parent, "style", sf)}`;
          if ((CAP_CLASS.test(p) || /maxHeight/.test(p)) && V_OVERFLOW.test(p)) {
            out.push(`${at(node)} scrolls inside its own capped wrapper: use maxHeight`);
          }
        }
        if (
          attr(node, "maxHeight") &&
          !attr(node, "scrollLabel") &&
          !attr(node, "aria-label") &&
          !attr(node, "aria-labelledby")
        ) {
          out.push(`${at(node)} has maxHeight but no accessible name for its scroll region`);
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return out;
}

test("kit tables scroll vertically through maxHeight, with a named scroll region", () => {
  const files = SCAN_DIRS.flatMap((dir) => listTsx(path.join(ROOT, dir)));
  assert.ok(files.length > 100, "scan should cover the dashboard sources");
  assert.deepEqual(findViolations(files), []);
});

test("the guard detects class caps, capped wrappers and unnamed capped tables", () => {
  const tmp = fs.mkdtempSync(path.join(ROOT, "tests/unit/.tmp-table-max-height-"));
  try {
    const imp = `import { Table } from "@omniroute/ui-kit/table";\n`;
    const bad = path.join(tmp, "Bad.tsx");
    fs.writeFileSync(
      bad,
      imp +
        [
          `export const A = () => <Table containerClassName="max-h-64 overflow-y-auto" />;`,
          `export const B = () => <div className="max-h-64 overflow-y-auto"><Table /></div>;`,
          `export const C = () => <div style={{ maxHeight: 320, overflow: "auto" }}><Table /></div>;`,
          `export const D = () => <Table maxHeight="20rem" />;`,
          "",
        ].join("\n")
    );
    const good = path.join(tmp, "Good.tsx");
    fs.writeFileSync(
      good,
      imp +
        [
          `export const E = () => <Table maxHeight="20rem" scrollLabel={t("rows")} />;`,
          `export const F = () => <Table maxHeight={320} aria-label={t("rows")} />;`,
          `export const G = () => <div className="flex-1 overflow-y-auto"><Table /></div>;`,
          `export const H = () => <div className="max-h-64"><Table /></div>;`,
          `export const I = () => <Table containerClassName="mt-3 rounded-none border-0" />;`,
          "",
        ].join("\n")
    );
    const found = findViolations([bad, good]);
    assert.ok(
      found.every((v) => v.includes("Bad.tsx")),
      found.join("\n")
    );
    assert.deepEqual(
      found.map((v) => Number(v.split(":")[1].split(" ")[0])),
      [2, 3, 4, 5],
      found.join("\n")
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
