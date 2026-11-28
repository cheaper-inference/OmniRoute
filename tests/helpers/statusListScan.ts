// Status-list scanning shared by the vocabulary guard and its self-test. Parses with the TypeScript
// compiler so quote style, wrapping calls, spreads, nesting and preceding declarations all stop
// mattering: a list is a list. A row list (objects) is data; a presentation list is not a decision.
import fs from "node:fs";
import ts from "typescript";
import { read, rel as relPath, sourceFiles } from "./classScan";

const PRESENTATION_TOKENS = new Set([
  "OPTION", "OPTIONS", "LABEL", "LABELS", "FILTER", "FILTERS", "CHOICE", "CHOICES",
  "CHIP", "CHIPS", "BADGE", "BADGES", "COLOR", "COLORS", "COLOUR", "COLOURS", "UI",
]);

/** A name that describes a presentation list rather than a decision. */
export function isPresentationList(name: string): boolean {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .some((token) => PRESENTATION_TOKENS.has(token.toUpperCase()));
}

/**
 * Names in `source` of declarations whose value is a list of known statuses including at least one
 * parked status. The known-status set is the caller's, so the oracle is explicit at the call site.
 */
export function statusListNames(
  rel: string,
  source: string,
  knownStatuses: ReadonlySet<string>,
  parkedStatuses: ReadonlySet<string>
): string[] {
  const file = ts.createSourceFile(
    rel,
    source,
    ts.ScriptTarget.ESNext,
    true,
    rel.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  const out: string[] = [];
  const unwrap = (node: ts.Expression): ts.Expression => {
    if (
      (ts.isCallExpression(node) || ts.isNewExpression(node)) &&
      node.arguments &&
      node.arguments.length > 0
    ) {
      const callee = node.expression.getText(file);
      if (callee === "Object.freeze" || callee.endsWith("Set")) return unwrap(node.arguments[0]);
    }
    if (ts.isParenthesizedExpression(node)) return unwrap(node.expression);
    if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return unwrap(node.expression);
    return node;
  };
  const stringsOf = (node: ts.Expression, acc: string[]): string[] => {
    const value = unwrap(node);
    if (ts.isSpreadElement(node)) return stringsOf(node.expression, acc);
    if (ts.isArrayLiteralExpression(value)) {
      for (const element of value.elements) stringsOf(element, acc);
    } else if (ts.isStringLiteralLike(value)) {
      acc.push(value.text);
    }
    return acc;
  };
  const onlyStringsOrSpreads = (array: ts.ArrayLiteralExpression) =>
    array.elements.every((element) => {
      const value = unwrap(element);
      return (
        ts.isStringLiteralLike(value) || ts.isSpreadElement(element) || ts.isArrayLiteralExpression(value)
      );
    });
  const isStatusList = (strings: string[]) =>
    strings.length > 0 &&
    strings.every((value) => knownStatuses.has(value.trim().toLowerCase())) &&
    strings.some((value) => parkedStatuses.has(value.trim().toLowerCase()));
  const record = (name: string, array: ts.ArrayLiteralExpression) => {
    if (!onlyStringsOrSpreads(array)) return;
    if (!isStatusList(stringsOf(array, []))) return;
    if (isPresentationList(name)) return;
    out.push(`${rel}:${name}`);
  };
  const visit = (node: ts.Node) => {
    if (ts.isPropertyAssignment(node) && ts.isArrayLiteralExpression(unwrap(node.initializer))) {
      record(node.name.getText(file), unwrap(node.initializer) as ts.ArrayLiteralExpression);
    }
    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      ts.isArrayLiteralExpression(unwrap(node.initializer)) &&
      ts.isIdentifier(node.name)
    ) {
      record(node.name.text, unwrap(node.initializer) as ts.ArrayLiteralExpression);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}

/** Every status-list declaration under the given repo-relative directories. */
export function scanStatusLists(
  dirs: string[],
  knownStatuses: ReadonlySet<string>,
  parkedStatuses: ReadonlySet<string>,
  exempt: (rel: string) => boolean
): string[] {
  const out: string[] = [];
  for (const file of sourceFiles(...dirs)) {
    const rel = relPath(file);
    if (exempt(rel)) continue;
    out.push(...statusListNames(rel, read(file), knownStatuses, parkedStatuses));
  }
  return out;
}

export { fs };
