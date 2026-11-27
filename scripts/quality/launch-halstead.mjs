#!/usr/bin/env node
// Per-function Halstead difficulty for the launch quality gate.
//
// Counting rules:
//  1. Measured nodes: function-like nodes WITH a body (declaration, expression, arrow, method,
//     constructor, accessors). Overloads and .d.ts declarations are skipped.
//  2. Tokens are the AST leaves inside the node span, minus the spans of nested measured
//     functions (each is measured on its own). Trivia and comments are never counted.
//  3. Operands: identifiers, private identifiers and literals (number, bigint, string, regex,
//     template pieces). Operators: every other token (keywords incl. true/false/null/this, and
//     punctuators).
//  4. n1/n2 are distinct operators/operands by token text; N1/N2 are the totals.
//  5. difficulty = (n1 / 2) * (N2 / n2), 0 when n2 is 0, rounded to 2 decimals.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const K = ts.SyntaxKind;

const OPERAND_KINDS = new Set([
  K.Identifier,
  K.PrivateIdentifier,
  K.NumericLiteral,
  K.BigIntLiteral,
  K.StringLiteral,
  K.NoSubstitutionTemplateLiteral,
  K.RegularExpressionLiteral,
  K.TemplateHead,
  K.TemplateMiddle,
  K.TemplateTail,
]);

function isFunctionLike(node) {
  switch (node.kind) {
    case K.FunctionDeclaration:
    case K.FunctionExpression:
    case K.ArrowFunction:
    case K.MethodDeclaration:
    case K.Constructor:
    case K.GetAccessor:
    case K.SetAccessor:
      return true;
    default:
      return false;
  }
}

function isMeasured(node) {
  return isFunctionLike(node) && !!node.body;
}

function propName(nameNode, sf) {
  return nameNode ? nameNode.getText(sf) : "<anonymous>";
}

function functionName(node, sf) {
  let base;
  switch (node.kind) {
    case K.FunctionDeclaration:
      base = node.name ? node.name.text : "<anonymous>";
      break;
    case K.Constructor:
      base = "constructor";
      break;
    case K.MethodDeclaration:
      base = propName(node.name, sf);
      break;
    case K.GetAccessor:
      base = `get ${propName(node.name, sf)}`;
      break;
    case K.SetAccessor:
      base = `set ${propName(node.name, sf)}`;
      break;
    default: {
      const parent = node.parent;
      base = "<anonymous>";
      if (node.name) base = node.name.text;
      else if (parent && parent.kind === K.VariableDeclaration) base = propName(parent.name, sf);
      else if (parent && parent.kind === K.PropertyAssignment) base = propName(parent.name, sf);
      else if (
        parent &&
        parent.kind === K.BinaryExpression &&
        parent.operatorToken.kind === K.EqualsToken
      ) {
        base = parent.left.getText(sf);
      }
    }
  }
  const parent = node.parent;
  if (
    parent &&
    (parent.kind === K.ClassDeclaration || parent.kind === K.ClassExpression) &&
    parent.name
  ) {
    return `${parent.name.text}.${base}`;
  }
  return base;
}

function collectTokens(node, sf, acc, isRoot) {
  if (!isRoot && isMeasured(node)) return;
  if (node.kind >= K.FirstJSDocNode && node.kind <= K.LastJSDocNode) return;
  const children = node.getChildren(sf);
  if (children.length === 0) {
    const text = node.getText(sf);
    if (text) acc.push({ kind: node.kind, text });
    return;
  }
  for (const child of children) collectTokens(child, sf, acc, false);
}

function scriptKindFor(fileName) {
  if (/\.(mjs|cjs|js)$/.test(fileName)) return ts.ScriptKind.JS;
  if (/\.tsx$/.test(fileName)) return ts.ScriptKind.TSX;
  return ts.ScriptKind.TS;
}

function scan(sourceText, fileName) {
  const sf = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    scriptKindFor(fileName)
  );
  const items = [];
  const visit = (node) => {
    if (isMeasured(node)) {
      const start = node.getStart(sf);
      const startPos = sf.getLineAndCharacterOfPosition(start);
      const endPos = sf.getLineAndCharacterOfPosition(node.end);
      const nested = [];
      const findNested = (n) => {
        if (n !== node && isMeasured(n)) nested.push([n.getStart(sf), n.end]);
        ts.forEachChild(n, findNested);
      };
      ts.forEachChild(node, findNested);
      items.push({
        node,
        info: {
          name: functionName(node, sf),
          line: startPos.line + 1,
          column: startPos.character + 1,
          startLine: startPos.line + 1,
          endLine: endPos.line + 1,
          start,
          end: node.end,
          nested,
        },
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { sf, items };
}

export function listFunctions(sourceText, fileName = "input.ts") {
  return scan(sourceText, fileName).items.map((i) => i.info);
}

export function computeHalstead(sourceText, fileName = "input.ts") {
  const { sf, items } = scan(sourceText, fileName);
  return items.map(({ node, info }) => {
    const tokens = [];
    collectTokens(node, sf, tokens, true);
    const operators = new Set();
    const operands = new Set();
    let N1 = 0;
    let N2 = 0;
    for (const t of tokens) {
      if (OPERAND_KINDS.has(t.kind)) {
        operands.add(t.text);
        N2++;
      } else {
        operators.add(t.text);
        N1++;
      }
    }
    const n1 = operators.size;
    const n2 = operands.size;
    const difficulty = n2 === 0 ? 0 : Math.round((n1 / 2) * (N2 / n2) * 100) / 100;
    return { name: info.name, line: info.line, n1, n2, N1, N2, difficulty };
  });
}

export function runHalstead(files, { root = process.cwd(), limit = Infinity } = {}) {
  const measured = [];
  for (const file of files) {
    const text = fs.readFileSync(path.resolve(root, file), "utf8");
    for (const fn of computeHalstead(text, file)) {
      measured.push({ file, line: fn.line, function: fn.name, value: fn.difficulty });
    }
  }
  return { measured, violations: measured.filter((m) => m.value > limit) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { measured } = runHalstead(process.argv.slice(2));
  for (const m of measured) console.log(`${m.file}:${m.line} ${m.function} ${m.value}`);
}
