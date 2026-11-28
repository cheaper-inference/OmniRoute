// Weight, tracking and leading utilities that cannot take effect must not come back.
//
// CAUSE: `packages/ui-kit/src/ci-typography.css` is imported by ci-ui.css WITHOUT a layer, and
// its tag defaults sit outside any `@layer`:
//   :where(.ci-theme) :is(h1…h6, [role="heading"])        → weight 500, leading 1.1, tracking −0.02em
//   :where(.ci-theme) :where(button, label, th, …)        → weight 500 (600 when selected)
//   :where(.ci-theme) :is(input, textarea, td)            → weight 400
// Tailwind utilities live in `@layer utilities`, and an unlayered declaration beats a layered
// one whatever the specificity. `<html class="ci-theme">` puts every screen under these rules,
// so `font-semibold` on an <h3>, a TableCell or a <button> does nothing (measured in a browser
// on 2026-11-15). The UI review found 702 such classes; they were removed without changing a
// pixel, and this guard keeps them out so nobody reads them as working styles.
//
// WHAT THE KIT CHANGED (upstream #223, vendored 2026-11): the defaults stay unlayered, with two
// exits, and the first test below pins both so a third one cannot arrive unnoticed.
//   1. An element that carries a kit type class is skipped by the defaults. The role classes
//      (`type-heading`, `type-body`, `type-reading`, `type-control`, `type-data`,
//      `type-caption`) are unlayered rules themselves, so utilities stay dead next to them.
//      `ci-eyebrow` is a `@layer components` rule: on an element that carries it the utilities
//      DO apply, so the detector does not call them dead there (use the eyebrow's `data-weight`
//      and `data-size` rather than overriding it, but that is a style choice, not a dead class).
//      `ci-heading` is not an exit: an <h3 className="ci-heading"> keeps the tag default.
//   2. `data-ci-type-roles="layered"` on a container moves the defaults of its descendants into
//      `@layer utilities.ci-type-roles`, where host utilities win. OmniRoute does NOT set it.
//
// REVIEW THIS GUARD when the dashboard opts in (`data-ci-type-roles` anywhere under `src/`) or
// when the kit changes the layering again: on that day these utilities start working and the
// guard has to be deleted, not obeyed. The first test below fails on that day.
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

/**
 * Classes the element always carries: plain strings, the literal parts of a template and the
 * string arguments of `cn(…)`. A class behind a condition is left out on purpose, so an element
 * that is an eyebrow only sometimes is still checked.
 */
function alwaysTokens(expr: ts.Node | undefined, sf: ts.SourceFile, out: string[] = []): string[] {
  if (!expr) return out;
  if (ts.isParenthesizedExpression(expr) || ts.isJsxExpression(expr)) {
    return alwaysTokens(expr.expression, sf, out);
  }
  if (ts.isCallExpression(expr) && /^(cn|clsx|twMerge)$/.test(expr.expression.getText(sf))) {
    for (const arg of expr.arguments) alwaysTokens(arg, sf, out);
    return out;
  }
  if (
    ts.isStringLiteral(expr) ||
    ts.isNoSubstitutionTemplateLiteral(expr) ||
    ts.isTemplateExpression(expr)
  ) {
    // `classTokens` already drops a token glued to a `${…}` hole; the holes themselves are
    // conditions, so only the literal parts count here.
    const holes = ts.isTemplateExpression(expr)
      ? expr.templateSpans.flatMap((span) => classTokens(span.expression, sf))
      : [];
    const all = classTokens(expr, sf);
    for (const hole of holes) {
      const at = all.indexOf(hole);
      if (at !== -1) all.splice(at, 1);
    }
    out.push(...all);
  }
  return out;
}

/** The one kit type class that is a layered rule: utilities beat it, so they are not dead there. */
const LAYERED_KIT_TYPE_CLASS = "ci-eyebrow";

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
        if (alwaysTokens(attr?.initializer, sf).includes(LAYERED_KIT_TYPE_CLASS)) {
          ts.forEachChild(node, visit);
          return;
        }
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

// The exits the kit writes into the `:not()` of every tag default.
const UNLAYERED_ROLE_CLASSES = [
  ".type-heading",
  ".type-body",
  ".type-reading",
  ".type-control",
  ".type-data",
  ".type-caption",
];
const OPT_IN = '[data-ci-type-roles="layered"] *';
const ROLE_DEFAULTS: { selector: string; kitInternal?: string[] }[] = [
  { selector: ':where(.ci-theme) :is(h1, h2, h3, h4, h5, h6, [role="heading"])' },
  {
    selector:
      ':where(.ci-theme) :where(button, label, th, [role="button"], [role="tab"], [role="menuitem"], [role="option"])',
    // Two kit triggers that read as a field value, not as a control label.
    kitInternal: [".ci-select__trigger", ".ci-searchable-select__trigger--field"],
  },
  { selector: ":where(.ci-theme) :is(input, textarea, td)" },
];

const stripCssComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

test("the kit tag defaults still beat host utilities, with only the two known exits", () => {
  const ui = read(path.join(ROOT, "packages/ui-kit/src/ci-ui.css"));
  assert.match(ui, /^@import "\.\/ci-typography\.css";$/m, "imported without layer(...)");

  const typography = stripCssComments(
    read(path.join(ROOT, "packages/ui-kit/src/ci-typography.css"))
  );
  const firstLayer = typography.search(/^@layer\s[^;{]*\{/m);
  assert.notEqual(firstLayer, -1, "ci-typography.css no longer has a layered part");
  const unlayered = typography.slice(0, firstLayer);

  for (const { selector, kitInternal = [] } of ROLE_DEFAULTS) {
    const at = unlayered.indexOf(`${selector}:where(:not(`);
    assert.notEqual(
      at,
      -1,
      `${selector} left the unlayered part of ci-typography.css: weight/tracking utilities may work ` +
        "again on these elements, so review (and probably delete) this guard"
    );
    const listStart = at + `${selector}:where(:not(`.length;
    const exits = unlayered
      .slice(listStart, unlayered.indexOf(")) {", listStart))
      .split(",")
      .map((exit) => exit.trim());
    assert.deepEqual(
      exits,
      [...kitInternal, ...UNLAYERED_ROLE_CLASSES, `.${LAYERED_KIT_TYPE_CLASS}`, OPT_IN],
      `${selector} skips a different set of elements now: review which of them make a utility ` +
        "work, and teach the detector"
    );
  }

  // Exit 1a: the role classes are unlayered rules too, so a utility next to one is still dead.
  for (const roleClass of UNLAYERED_ROLE_CLASSES) {
    assert.match(
      unlayered,
      new RegExp(`^\\${roleClass}(,| \\{)$`, "m"),
      `${roleClass} is no longer an unlayered rule`
    );
  }
  // Exit 1b: `.ci-eyebrow` is a `@layer components` rule and nothing unlayered restates it, so
  // on an eyebrow the utilities apply. That is why the detector skips it.
  assert.doesNotMatch(unlayered, /^\.ci-eyebrow\b/m);
  const eyebrowAt = ui.search(/^ {2}\.ci-eyebrow \{$/m);
  assert.notEqual(eyebrowAt, -1, "`.ci-eyebrow` is no longer a nested (layered) rule of ci-ui.css");
  const enclosing = [...ui.slice(0, eyebrowAt).matchAll(/^(@layer [\w.-]+ \{|\})$/gm)].at(-1);
  assert.equal(enclosing?.[0], "@layer components {");

  // Exit 2: the opt-in exists in the kit, and the dashboard does not use it.
  assert.match(typography, /^@layer utilities\.ci-type-roles \{$/m);
  assert.match(read(path.join(ROOT, "src/app/layout.tsx")), /className="ci-theme[ "]/);
  const optedIn = sourceFiles("src")
    .filter((file) => read(file).includes("data-ci-type-roles"))
    .map(rel);
  assert.deepEqual(
    optedIn,
    [],
    "`data-ci-type-roles` makes weight/tracking/leading utilities work under it: this guard (and " +
      "rule 4 of docs/architecture/DESIGN_SYSTEM.md) has to be reviewed in the same change"
  );
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
  // A kit type class on the element: only `ci-eyebrow` is a layered rule the utility can beat.
  assert.deepEqual(sample('<h3 className="ci-eyebrow font-semibold tracking-wide">a</h3>'), []);
  assert.deepEqual(
    sample('<TableHead className={cn("ci-eyebrow", wide && "font-bold")}>a</TableHead>'),
    []
  );
  assert.deepEqual(sample('<h3 className={`ci-eyebrow ${on ? "font-bold" : ""}`}>a</h3>'), []);
  assert.deepEqual(sample('<h3 className="type-heading font-semibold">a</h3>'), [
    "<h3> font-semibold",
  ]);
  assert.deepEqual(sample('<h3 className="ci-heading font-semibold">a</h3>'), [
    "<h3> font-semibold",
  ]);
  // An eyebrow only sometimes: the other branch still falls under the tag default.
  assert.deepEqual(sample('<h3 className={cn(compact && "ci-eyebrow", "font-semibold")}>a</h3>'), [
    "<h3> font-semibold",
  ]);
  assert.deepEqual(
    sample('<h3 className={`font-semibold ${compact ? "ci-eyebrow" : ""}`}>a</h3>'),
    ["<h3> font-semibold"]
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
