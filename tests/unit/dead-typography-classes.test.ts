// Weight, tracking and leading utilities that cannot take effect must not come back.
//
// CAUSE: `packages/ui-kit/src/ci-typography.css` is imported by ci-ui.css WITHOUT a layer, and
// its role defaults sit outside any `@layer`:
//   :where(.ci-theme) :is(h1…h6, [role="heading"])        → weight 500, leading 1.1, tracking −0.02em
//   :where(.ci-theme) :where(button, label, th, …)        → weight 500 (600 when selected)
//   :where(.ci-theme) :is(input, textarea, td)            → weight 400
// Tailwind utilities live in `@layer utilities`, and an unlayered declaration beats a layered
// one whatever the specificity. `<html class="ci-theme">` puts every screen under these rules,
// so `font-semibold` on an <h3>, a TableCell or a <button> does nothing (measured in a browser
// on 2026-11-15). The UI review found 702 such classes; they were removed without changing a
// pixel, and this guard keeps them out so nobody reads them as working styles.
//
// REVIEW THIS GUARD when the kit changes that layering: if the vendored kit moves the role
// defaults into `@layer base` (the fix requested upstream), these utilities start working
// again and this guard has to be deleted, not obeyed. The first test below fails on that day.
//
// What still works on these elements and is NOT flagged: sizes, colours, `uppercase`,
// `font-mono`, anything with `!` (an important utility beats unlayered CSS), and a class behind
// a variant that styles another element (`[&>span]:font-semibold`, `*:`, `before:`…). To
// emphasise part of a title or a cell, put the class on an inner <span>.

import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import ts from "typescript";

import { ROOT, lineOf, parse, read, rel, sourceFiles } from "../helpers/classScan.ts";

const WEIGHT = /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/;
const TRACKING = /^-?tracking-.+$/;
const LEADING = /^leading-.+$/;

type Kind = "heading" | "cell" | "button";
const DEAD: Record<Kind, RegExp[]> = {
  heading: [WEIGHT, TRACKING, LEADING],
  cell: [WEIGHT, TRACKING],
  button: [WEIGHT],
};

// Variants that restyle the element itself: the utility behind them is just as dead.
const SELF_VARIANT =
  /^(sm|md|lg|xl|2xl|max-(sm|md|lg|xl|2xl)|dark|hover|focus|focus-visible|active|disabled|group-hover|rtl|ltr)$/;

const KIT_TABLE_SOURCES = new Set([
  "@omniroute/ui-kit/table",
  "@omniroute/ui-kit/data-table-shell",
]);
const KIT_TABLE_TAGS = new Set(["TableCell", "TableHead", "SortableTableHead"]);
const isButtonAdapterSource = (source: string) =>
  source === "@/shared/components" ||
  source === "@/shared/components/Button" ||
  /^\.{1,2}\/(?:.*\/)?Button$/.test(source);

function splitVariants(token: string): { variants: string[]; utility: string } {
  const variants: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < token.length; i++) {
    const ch = token[i];
    if (ch === "[" || ch === "(") depth++;
    else if (ch === "]" || ch === ")") depth--;
    else if (ch === ":" && depth === 0) {
      variants.push(token.slice(start, i));
      start = i + 1;
    }
  }
  return { variants, utility: token.slice(start) };
}

function isDead(token: string, kind: Kind): boolean {
  const { variants, utility } = splitVariants(token);
  if (utility.startsWith("!") || utility.endsWith("!")) return false;
  return DEAD[kind].some((re) => re.test(utility)) && variants.every((v) => SELF_VARIANT.test(v));
}

type Imports = Map<string, { source: string; imported: string }>;

function importsOf(sf: ts.SourceFile): Imports {
  const out: Imports = new Map();
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement) || !statement.importClause) continue;
    const source = (statement.moduleSpecifier as ts.StringLiteral).text;
    const clause = statement.importClause;
    if (clause.name) out.set(clause.name.text, { source, imported: "default" });
    if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
      for (const el of clause.namedBindings.elements) {
        out.set(el.name.text, { source, imported: (el.propertyName ?? el.name).text });
      }
    }
  }
  return out;
}

function kindOf(tag: string, imports: Imports): Kind | null {
  if (/^h[1-6]$/.test(tag)) return "heading";
  if (tag === "button") return "button";
  const from = imports.get(tag);
  if (!from) return null;
  if (KIT_TABLE_TAGS.has(tag) && from.imported === tag && KIT_TABLE_SOURCES.has(from.source)) {
    return "cell";
  }
  if (tag === "Button" && isButtonAdapterSource(from.source)) return "button";
  return null;
}

/** Class tokens the element's own `className` can resolve to (a token glued to `${…}` is not one). */
function classTokens(expr: ts.Node | undefined, sf: ts.SourceFile, out: string[] = []): string[] {
  if (!expr) return out;
  const push = (text: string, gluedStart: boolean, gluedEnd: boolean) => {
    const parts = text.split(/\s+/);
    parts.forEach((token, i) => {
      if (!token || (gluedStart && i === 0) || (gluedEnd && i === parts.length - 1)) return;
      out.push(token);
    });
  };
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    push(expr.text, false, false);
  } else if (ts.isTemplateExpression(expr)) {
    push(expr.head.text, false, true);
    for (const span of expr.templateSpans) {
      classTokens(span.expression, sf, out);
      push(span.literal.text, true, ts.isTemplateMiddle(span.literal));
    }
  } else if (ts.isParenthesizedExpression(expr) || ts.isJsxExpression(expr)) {
    classTokens(expr.expression, sf, out);
  } else if (ts.isConditionalExpression(expr)) {
    classTokens(expr.whenTrue, sf, out);
    classTokens(expr.whenFalse, sf, out);
  } else if (ts.isBinaryExpression(expr)) {
    // `cond && "class"`: the left side is the condition, never a class.
    if (expr.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken) {
      classTokens(expr.left, sf, out);
    }
    classTokens(expr.right, sf, out);
  } else if (ts.isCallExpression(expr) && /^(cn|clsx|twMerge)$/.test(expr.expression.getText(sf))) {
    for (const arg of expr.arguments) classTokens(arg, sf, out);
  } else if (ts.isArrayLiteralExpression(expr)) {
    for (const el of expr.elements) classTokens(el, sf, out);
  }
  return out;
}

function deadClassesIn(file: string, text: string): string[] {
  const sf = parse(file, text);
  const imports = importsOf(sf);
  const hits: string[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(sf);
      const attrOf = (name: string) =>
        node.attributes.properties.find(
          (a): a is ts.JsxAttribute => ts.isJsxAttribute(a) && a.name.getText(sf) === name
        );
      // `asChild` hands the classes to the child element (a link, say), where they do work.
      const kind = attrOf("asChild") ? null : kindOf(tag, imports);
      if (kind) {
        const attr = attrOf("className");
        for (const token of classTokens(attr?.initializer, sf)) {
          if (isDead(token, kind)) hits.push(`${rel(file)}:${lineOf(sf, node)} <${tag}> ${token}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return hits;
}

test("the kit typography roles are still unlayered (the reason these classes are dead)", () => {
  const ui = read(path.join(ROOT, "packages/ui-kit/src/ci-ui.css"));
  assert.match(ui, /^@import "\.\/ci-typography\.css";$/m, "imported without layer(...)");
  const typography = read(path.join(ROOT, "packages/ui-kit/src/ci-typography.css"));
  const unlayered = typography.slice(0, typography.indexOf("@layer"));
  for (const selector of [
    ':where(.ci-theme) :is(h1, h2, h3, h4, h5, h6, [role="heading"])',
    ":where(.ci-theme) :where(button, label, th,",
    ":where(.ci-theme) :is(input, textarea, td)",
  ]) {
    assert.ok(
      unlayered.includes(selector),
      `${selector} left the unlayered part of ci-typography.css: weight/tracking utilities may work ` +
        "again on these elements, so review (and probably delete) this guard"
    );
  }
  assert.match(read(path.join(ROOT, "src/app/layout.tsx")), /className="ci-theme"/);
});

test("the detector flags dead classes and leaves working ones", () => {
  const sample = (jsx: string) =>
    deadClassesIn(
      path.join(ROOT, "src/app/sample.tsx"),
      `import Button from "@/shared/components/Button";
       import { TableCell, TableHead } from "@omniroute/ui-kit/table";
       export const x = (${jsx});`
    ).map((hit) => hit.replace(/^\S+ /, ""));

  assert.deepEqual(sample('<h3 className="text-sm font-semibold tracking-wide leading-6">a</h3>'), [
    "<h3> font-semibold",
    "<h3> tracking-wide",
    "<h3> leading-6",
  ]);
  assert.deepEqual(
    sample('<TableCell className="font-medium tracking-tight leading-5">a</TableCell>'),
    ["<TableCell> font-medium", "<TableCell> tracking-tight"]
  );
  assert.deepEqual(
    sample('<TableHead className={cn("w-10", wide && "md:font-bold")}>a</TableHead>'),
    ["<TableHead> md:font-bold"]
  );
  assert.deepEqual(
    sample('<button className={`px-2 ${on ? "font-semibold" : "font-normal"}`} />'),
    ["<button> font-semibold", "<button> font-normal"]
  );
  assert.deepEqual(sample('<Button className="font-semibold tracking-wide">a</Button>'), [
    "<Button> font-semibold",
  ]);

  // Working styles: important, size, colour, uppercase, font-mono, another element's variant.
  assert.deepEqual(
    sample(
      '<h2 className="!font-semibold text-lg text-text-main uppercase font-mono [&>span]:font-bold">a</h2>'
    ),
    []
  );
  assert.deepEqual(
    sample('<Button asChild className="font-semibold"><a href="/x">a</a></Button>'),
    []
  );
  // The same classes work on p / span / div / a.
  assert.deepEqual(sample('<p className="font-semibold tracking-wide leading-6">a</p>'), []);
  assert.deepEqual(sample('<h3><span className="font-semibold">a</span></h3>'), []);
});

test("no heading, table cell or button carries a weight/tracking/leading utility", () => {
  const hits: string[] = [];
  for (const file of sourceFiles("src/app", "src/shared")) {
    if (!file.endsWith(".tsx")) continue;
    const text = read(file);
    if (
      !/font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)|tracking-|leading-/.test(
        text
      )
    ) {
      continue;
    }
    hits.push(...deadClassesIn(file, text));
  }
  assert.deepEqual(
    hits,
    [],
    "these utilities lose to the kit's unlayered typography roles: remove them, or move the " +
      "emphasis to an inner <span>"
  );
});
