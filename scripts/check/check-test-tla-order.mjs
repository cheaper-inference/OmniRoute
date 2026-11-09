#!/usr/bin/env node
// scripts/check/check-test-tla-order.mjs
// Static gate: a node:test file must not register a top-level test, then hit a top-level
// `await`, then register more top-level tests.
//
// WHY (#18045): every unit script runs `node --test --test-force-exit`. The runner exits a
// test-file child as soon as all *known* top-level tests have finished. While the module is
// suspended on a top-level `await`, the tests registered before it can all finish; the child
// then exits before the tests after the `await` are ever registered. They never run, and the
// run still reports green. Put every top-level `await` before the first `test()`.
//
// Rules (TypeScript compiler API, top-level statements only):
//  - test registration = a call whose callee is `test` / `it` / `describe` / `suite`, or
//    `<one of those>.only|skip|todo(...)`. Hooks (`before`, `after`, `beforeEach`, ...) do
//    not count.
//  - top-level await = an `await` expression (or `for await`) that is not inside a function
//    body. Its effect is placed at the end of the awaited expression, so `await test(...)`
//    counts as "register, then await".
//  - a loop whose body both registers tests and awaits is evaluated twice, because its second
//    iteration registers tests after the first iteration's await.
// Violation = the event sequence contains test -> await -> test.
//
// Ratchet: pre-existing offenders are listed in config/quality/test-tla-order-allowlist.json.
// The list may only shrink: a new offender fails, and an allowlisted file that no longer
// offends (or no longer exists) fails until its entry is deleted.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);

export const SCAN_ROOT = "tests/unit";
export const ALLOWLIST_PATH = "config/quality/test-tla-order-allowlist.json";
const TEST_FILE_RE = /\.test\.(ts|tsx|mts|mjs|js)$/;
const WALK_EXCLUDE = new Set(["node_modules", ".git", "dist", "coverage"]);
const TEST_NAMES = new Set(["test", "it", "describe", "suite"]);
const TEST_MODIFIERS = new Set(["only", "skip", "todo"]);

let cachedTs = null;
function loadTs() {
  cachedTs ??= require("typescript");
  return cachedTs;
}

function isTestCall(ts, node) {
  if (!ts.isCallExpression(node)) return false;
  const callee = node.expression;
  if (ts.isIdentifier(callee)) return TEST_NAMES.has(callee.text);
  if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression)) {
    return TEST_NAMES.has(callee.expression.text) && TEST_MODIFIERS.has(callee.name.text);
  }
  return false;
}

function isFunctionBoundary(ts, node) {
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node) ||
    ts.isClassStaticBlockDeclaration(node)
  );
}

function isLoop(ts, node) {
  return (
    ts.isForStatement(node) ||
    ts.isForOfStatement(node) ||
    ts.isForInStatement(node) ||
    ts.isWhileStatement(node) ||
    ts.isDoStatement(node)
  );
}

/**
 * Appends the ordered test/await events of a subtree, never descending into function bodies.
 * forEachChild stops at the first truthy callback result, hence the `void`s.
 */
function collectEvents(ts, sf, node, events = []) {
  if (isFunctionBoundary(ts, node)) return events;
  if (isLoop(ts, node)) {
    const inner = [];
    if (ts.isForOfStatement(node) && node.awaitModifier) {
      inner.push({ kind: "await", pos: node.awaitModifier.getStart(sf) });
    }
    ts.forEachChild(node, (child) => void collectEvents(ts, sf, child, inner));
    const repeats = inner.some((e) => e.kind === "test") && inner.some((e) => e.kind === "await");
    events.push(...inner, ...(repeats ? inner : []));
    return events;
  }
  if (isTestCall(ts, node)) events.push({ kind: "test", pos: node.getStart(sf) });
  ts.forEachChild(node, (child) => void collectEvents(ts, sf, child, events));
  if (ts.isAwaitExpression(node)) events.push({ kind: "await", pos: node.getEnd() });
  return events;
}

function scriptKindFor(ts, fileName) {
  if (fileName.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (/\.(mjs|js|cjs)$/.test(fileName)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

/**
 * @returns {null | { firstTestLine: number, awaitLine: number, laterTestLine: number }}
 */
export function findTlaAfterTest(sourceText, fileName = "file.test.ts") {
  const ts = loadTs();
  const sf = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    scriptKindFor(ts, fileName)
  );
  const events = [];
  for (const stmt of sf.statements) collectEvents(ts, sf, stmt, events);
  const line = (pos) => sf.getLineAndCharacterOfPosition(pos).line + 1;
  let firstTest = null;
  let awaitAfterTest = null;
  for (const e of events) {
    if (e.kind === "test" && firstTest === null) firstTest = e;
    else if (e.kind === "await" && firstTest !== null && awaitAfterTest === null)
      awaitAfterTest = e;
    else if (e.kind === "test" && awaitAfterTest !== null) {
      return {
        firstTestLine: line(firstTest.pos),
        awaitLine: line(awaitAfterTest.pos),
        laterTestLine: line(e.pos),
      };
    }
  }
  return null;
}

function walk(dir, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (WALK_EXCLUDE.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (TEST_FILE_RE.test(entry.name)) out.push(full);
  }
  return out;
}

export function scanRepo(root = process.cwd()) {
  const files = walk(path.join(root, SCAN_ROOT), []).sort();
  const offenders = new Map();
  for (const abs of files) {
    const rel = path.relative(root, abs).split(path.sep).join("/");
    const hit = findTlaAfterTest(fs.readFileSync(abs, "utf8"), rel);
    if (hit) offenders.set(rel, hit);
  }
  return { scanned: files.length, offenders };
}

export function readAllowlist(root = process.cwd()) {
  const raw = JSON.parse(fs.readFileSync(path.join(root, ALLOWLIST_PATH), "utf8"));
  if (!Array.isArray(raw.files)) throw new Error(`${ALLOWLIST_PATH}: "files" must be an array`);
  return raw.files;
}

export function evaluate(offenders, allowlist) {
  const allowed = new Set(allowlist);
  const duplicates = allowlist.filter((f, i) => allowlist.indexOf(f) !== i);
  const newOffenders = [...offenders.keys()].filter((f) => !allowed.has(f));
  const staleEntries = allowlist.filter((f) => !offenders.has(f));
  return { newOffenders, staleEntries, duplicates };
}

function main() {
  const root = process.cwd();
  const { scanned, offenders } = scanRepo(root);
  const allowlist = readAllowlist(root);
  const { newOffenders, staleEntries, duplicates } = evaluate(offenders, allowlist);
  let failed = false;
  for (const f of newOffenders) {
    const h = offenders.get(f);
    console.error(
      `✖ ${f}: test() at line ${h.firstTestLine}, top-level await at line ${h.awaitLine}, ` +
        `then test() at line ${h.laterTestLine}. Under --test-force-exit the later tests can ` +
        `silently never run (#18045). Move every top-level await above the first test().`
    );
    failed = true;
  }
  for (const f of staleEntries) {
    console.error(
      `✖ ${ALLOWLIST_PATH}: "${f}" no longer has a top-level await between tests (or no longer ` +
        `exists). Delete the entry; this list may only shrink.`
    );
    failed = true;
  }
  for (const f of new Set(duplicates)) {
    console.error(`✖ ${ALLOWLIST_PATH}: duplicate entry "${f}".`);
    failed = true;
  }
  if (failed) process.exit(1);
  console.log(
    `✔ check:test-tla-order: ${scanned} files under ${SCAN_ROOT}, ${offenders.size} allowlisted offenders, no new ones.`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main();
