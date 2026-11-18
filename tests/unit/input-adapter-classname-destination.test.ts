// The `Input` adapter sends `className` to the kit `Field` wrapper and `inputClassName` to the
// `<input>` (src/shared/components/Input.tsx). Typography or box classes written in `className`
// therefore never reach the field: `text-sm`/`text-xs`/`font-mono` were dead (the kit control
// declares its own font) and `rounded border p-2` drew a second box around the control
// (FalNativeFields). This guard keeps `className` for wrapper layout only.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const ROOTS = ["src/app", "src/shared/components"];

// Import sources that resolve to the adapter (never the kit `Input`).
const ADAPTER_SOURCES = new Set(["@/shared/components", "@/shared/components/Input"]);
const isAdapterSource = (source: string, file: string) =>
  ADAPTER_SOURCES.has(source) ||
  (file.startsWith("src/shared/components/") && /^(\.\.?\/)+Input$/.test(source));

// Classes that style the control or its text, not the wrapper's place in the layout.
const CONTROL_CLASS =
  /^(text-(xs|sm|base|lg|xl|[2-9]xl|\[.+\])|font-.+|tracking-.+|leading-.+|rounded(-.+)?|border(-.+)?|bg-.+|p[xytrblse]?-.+|shadow(-.+)?|ring(-.+)?)$/;

// A framed row on purpose: the box holds the label and the input together (it replaced a
// bordered <label> row in the KEA-7886 migration), and `capitalize` reaches the label.
const WRAPPER_BOX_ON_PURPOSE = new Set([
  "src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx|rounded border border-border/50 p-2 capitalize",
]);

function tsxFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== "__tests__") tsxFiles(full, out);
    } else if (entry.name.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

function adapterInputNames(tree: ts.SourceFile, file: string): Set<string> {
  const names = new Set<string>();
  for (const statement of tree.statements) {
    if (!ts.isImportDeclaration(statement) || !statement.importClause) continue;
    const source = (statement.moduleSpecifier as ts.StringLiteral).text;
    if (!isAdapterSource(source, file)) continue;
    const { name, namedBindings } = statement.importClause;
    // Default import of the Input module, or the barrel's named `Input`.
    if (name && source !== "@/shared/components") names.add(name.text);
    if (namedBindings && ts.isNamedImports(namedBindings)) {
      for (const element of namedBindings.elements) {
        if ((element.propertyName ?? element.name).text === "Input") names.add(element.name.text);
      }
    }
  }
  return names;
}

function stringLiterals(node: ts.Node, out: string[] = []): string[] {
  if (ts.isStringLiteralLike(node)) out.push(node.text);
  ts.forEachChild(node, (child) => void stringLiterals(child, out));
  return out;
}

type Site = { file: string; line: number; className: string; offending: string[] };

function scan(): { total: number; offenders: Site[] } {
  const offenders: Site[] = [];
  let total = 0;
  for (const root of ROOTS) {
    for (const full of tsxFiles(join(REPO_ROOT, root))) {
      const text = readFileSync(full, "utf8");
      if (!text.includes("<Input")) continue;
      const file = relative(REPO_ROOT, full).split("\\").join("/");
      const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      const names = adapterInputNames(tree, file);
      if (names.size === 0) continue;
      const visit = (node: ts.Node) => {
        if (
          (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
          ts.isIdentifier(node.tagName) &&
          names.has(node.tagName.text)
        ) {
          total += 1;
          const attribute = node.attributes.properties.find(
            (property): property is ts.JsxAttribute =>
              ts.isJsxAttribute(property) && property.name.getText() === "className"
          );
          if (attribute?.initializer) {
            const className = stringLiterals(attribute.initializer).join(" ");
            const offending = className
              .split(/\s+/)
              .filter(Boolean)
              // `sm:text-xs`, `dark:bg-…`: judge the utility, not its variant.
              .filter((token) => CONTROL_CLASS.test(token.slice(token.lastIndexOf(":") + 1)));
            if (offending.length > 0 && !WRAPPER_BOX_ON_PURPOSE.has(`${file}|${className}`)) {
              offenders.push({
                file,
                line: tree.getLineAndCharacterOfPosition(node.getStart()).line + 1,
                className,
                offending,
              });
            }
          }
        }
        ts.forEachChild(node, visit);
      };
      visit(tree);
    }
  }
  return { total, offenders };
}

test("the Input adapter's className carries wrapper layout only (control classes go in inputClassName)", () => {
  const { total, offenders } = scan();
  // The scan must really see the adapter's call sites (hundreds of them).
  assert.ok(total > 300, `expected to scan the adapter's call sites, saw ${total}`);
  assert.deepEqual(
    offenders.map((site) => `${site.file}:${site.line} className="${site.className}"`),
    [],
    "className on the Input adapter lands on the Field wrapper: move classes meant for the " +
      "control to inputClassName, or drop the ones that repeat the kit default"
  );
});

test("the one framed wrapper kept on purpose still exists (drop the exception with it)", () => {
  for (const entry of WRAPPER_BOX_ON_PURPOSE) {
    const [file, className] = entry.split("|");
    assert.ok(
      readFileSync(join(REPO_ROOT, file), "utf8").includes(`className="${className}"`),
      `stale exception: ${entry}`
    );
  }
});
