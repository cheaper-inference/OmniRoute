// Structural guard: every connection the OAuth route creates must start a model
// sync, and the call has to receive the connection object itself.
//
// The behaviour lives in triggerAutoModelSync (covered by
// auto-model-sync-trigger.test.ts). What is easy to lose is the call: a new
// OAuth branch that persists a connection and forgets the trigger leaves the
// account active with an empty catalog until the scheduler's next six-hour tick,
// which is silent from the operator's side. This walks the real AST instead of
// matching text, so renames and reformatting do not weaken it.
//
// Two shapes are rejected on purpose, because both were green in an earlier
// revision: a trigger nested inside some extra condition, and a trigger handed
// something other than the connection that was just persisted.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { settleConnectionFollowUpsAfterEachTest } from "../helpers/connectionFollowUps.ts";

settleConnectionFollowUpsAfterEachTest();

const ROOT = process.cwd();

function parse(relativePath: string) {
  const fullPath = path.join(ROOT, relativePath);
  const text = fs.readFileSync(fullPath, "utf8");
  return { fullPath, sourceFile: ts.createSourceFile(fullPath, text, ts.ScriptTarget.Latest, true) };
}

const oauthRoute = parse("src/app/api/oauth/[provider]/[action]/route.ts");
const providersRoute = parse("src/app/api/providers/route.ts");

function calleeName(node: ts.CallExpression): string | null {
  const expression = node.expression;
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.name)) {
    return expression.name.text;
  }
  return null;
}

function collectCalls(root: ts.Node, name: string): ts.CallExpression[] {
  const found: ts.CallExpression[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isCallExpression(node) && calleeName(node) === name) found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}

function enclosingBlocks(node: ts.Node): ts.Block[] {
  const blocks: ts.Block[] = [];
  let current: ts.Node | undefined = node.parent;
  while (current) {
    if (ts.isBlock(current)) blocks.push(current);
    current = current.parent;
  }
  return blocks;
}

function lineOf(sourceFile: ts.SourceFile, node: ts.Node): number {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
}

/** True when `call` is a plain statement of `block`, not nested in a condition. */
function isDirectStatementOf(call: ts.CallExpression, block: ts.Block): boolean {
  const statement = call.parent;
  return ts.isExpressionStatement(statement) && statement.parent === block;
}

/** The first argument, as written. */
function firstArgumentText(sourceFile: ts.SourceFile, call: ts.CallExpression): string {
  const [first] = call.arguments;
  return first ? first.getText(sourceFile) : "";
}

test("the OAuth route still has connection creation sites to check", () => {
  const createSites = collectCalls(oauthRoute.sourceFile, "createProviderConnection");
  const syncSites = collectCalls(oauthRoute.sourceFile, "syncToCloudIfEnabled");
  assert.ok(createSites.length >= 1, "expected at least one createProviderConnection call");
  assert.ok(syncSites.length >= createSites.length, "every creation path also syncs to cloud");
});

test("each created OAuth connection starts a model sync as a plain statement", () => {
  const createSites = collectCalls(oauthRoute.sourceFile, "createProviderConnection");
  for (const createCall of createSites) {
    const line = lineOf(oauthRoute.sourceFile, createCall);
    const block = enclosingBlocks(createCall).find(
      (candidate) => collectCalls(candidate, "syncToCloudIfEnabled").length > 0
    );
    assert.ok(
      block,
      `createProviderConnection at route.ts:${line} has no sibling cloud-sync block to anchor the check`
    );
    const triggers = collectCalls(block as ts.Block, "triggerAutoModelSync");
    assert.equal(
      triggers.length,
      1,
      `createProviderConnection at route.ts:${line} must call triggerAutoModelSync once in the same path`
    );
    assert.ok(
      isDirectStatementOf(triggers[0], block as ts.Block),
      `triggerAutoModelSync at route.ts:${lineOf(oauthRoute.sourceFile, triggers[0])} must be a plain statement of that path, not nested in another condition`
    );
    assert.equal(
      firstArgumentText(oauthRoute.sourceFile, triggers[0]),
      "connection",
      `triggerAutoModelSync at route.ts:${lineOf(oauthRoute.sourceFile, triggers[0])} must receive the connection it just persisted`
    );
  }
});

test("the API-key create path hands the trigger the connection it just persisted", () => {
  const createSites = collectCalls(providersRoute.sourceFile, "createProviderConnection");
  const triggers = collectCalls(providersRoute.sourceFile, "triggerAutoModelSync");
  assert.ok(createSites.length >= 1, "expected the API-key create path to keep its create call");
  assert.equal(triggers.length, createSites.length, "one trigger per create site");
  for (const trigger of triggers) {
    const line = lineOf(providersRoute.sourceFile, trigger);
    const argument = firstArgumentText(providersRoute.sourceFile, trigger);
    assert.match(argument, /newConnection\.id/, `providers/route.ts:${line} must pass the new id`);
    assert.match(argument, /provider\b/, `providers/route.ts:${line} must pass the provider`);
    const optionsText = trigger.arguments[1]?.getText(providersRoute.sourceFile) ?? "";
    assert.match(
      optionsText,
      /skipHeaderValue/,
      `providers/route.ts:${line} must forward the caller's skip signal instead of syncing over it`
    );
    assert.match(
      optionsText,
      /mode:\s*["']import["']/,
      `providers/route.ts:${line} must keep the import semantics the create path had`
    );

    const block = enclosingBlocks(trigger)[0];
    assert.ok(
      block && collectCalls(block, "createProviderConnection").length >= 1,
      `providers/route.ts:${line} must sit in the path that creates the connection`
    );
    assert.ok(
      isDirectStatementOf(trigger, block as ts.Block),
      `providers/route.ts:${line} must be a plain statement of that path, not nested in another condition`
    );
  }
});
