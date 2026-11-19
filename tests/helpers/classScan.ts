// Static class-name scanning shared by the UI class guards (tests/unit/theme-color-classes,
// no-bare-card-class, dead-typography-classes…). Everything reads the TypeScript AST, so a
// class mentioned in a comment or in JSX text is never a hit.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

export const ROOT = path.resolve(import.meta.dirname, "../..");

function walk(dir: string, out: string[]): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== "__tests__") walk(full, out);
    } else if (/\.tsx?$/.test(entry.name) && !/\.(test|spec|d)\.tsx?$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

export const rel = (file: string) => path.relative(ROOT, file).split(path.sep).join("/");

/** Every `.ts`/`.tsx` source under the given repo-relative directories (tests excluded). */
export function sourceFiles(...dirs: string[]): string[] {
  return dirs.flatMap((dir) => walk(path.join(ROOT, dir), [])).sort();
}

export const read = (file: string) => fs.readFileSync(file, "utf8");

export function parse(file: string, text = read(file)): ts.SourceFile {
  const kind = file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
}

export const lineOf = (sf: ts.SourceFile, node: ts.Node) =>
  sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;

export type LiteralToken = { token: string; node: ts.Node };

/**
 * Whitespace-separated tokens of every string and template literal under `root`. A token glued
 * to a `${…}` hole (`bg-${tone}`, `${size}px`) is only part of a class name, so it is dropped.
 */
export function literalTokens(root: ts.Node): LiteralToken[] {
  const out: LiteralToken[] = [];
  const push = (node: ts.Node, text: string, gluedStart: boolean, gluedEnd: boolean) => {
    const parts = text.split(/\s+/);
    parts.forEach((token, i) => {
      if (!token) return;
      if (gluedStart && i === 0) return;
      if (gluedEnd && i === parts.length - 1) return;
      out.push({ token, node });
    });
  };
  const visit = (node: ts.Node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      push(node, node.text, false, false);
    } else if (ts.isTemplateExpression(node)) {
      push(node.head, node.head.text, false, true);
      for (const span of node.templateSpans) {
        push(span.literal, span.literal.text, true, ts.isTemplateMiddle(span.literal));
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(root);
  return out;
}

/** `hover:dark:!bg-primary/10` → `bg-primary/10`: variants and the important mark removed. */
export function utilityOf(token: string): string {
  let depth = 0;
  let cut = -1;
  for (let i = 0; i < token.length; i++) {
    const ch = token[i];
    if (ch === "[" || ch === "(") depth++;
    else if (ch === "]" || ch === ")") depth--;
    else if (ch === ":" && depth === 0) cut = i;
  }
  return token
    .slice(cut + 1)
    .replace(/^!/, "")
    .replace(/!$/, "");
}
