import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import ts from "typescript";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-exhaustion-id-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const chatHelpers = await import("../../src/sse/handlers/chatHelpers.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function createConnection(provider = "opencode-test") {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    isActive: true,
    testStatus: "active",
  });
  return String(conn.id);
}

async function driveExhaustionViaBare500(
  connId: string,
  options?: { correlationId?: string | null }
) {
  // Bare 500 takes the status === 500 early branch: no model lockout, the
  // request-scoped id lands on the exhaustion line.
  return auth.markAccountUnavailable(
    connId,
    500,
    "transient upstream 500",
    "opencode-test",
    "test-model",
    null,
    options ?? {}
  );
}

function readSource(rel: string) {
  return fs.readFileSync(new URL(rel, import.meta.url), "utf8");
}

function callsNamed(source: string, name: string): ts.CallExpression[] {
  const file = ts.createSourceFile("sender.ts", source, ts.ScriptTarget.Latest, true);
  const calls: ts.CallExpression[] = [];
  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === name
    )
      calls.push(node);
    ts.forEachChild(node, visit);
  }
  visit(file);
  return calls;
}

/** Compare tokens, accepting whitespace/comments without matching strings as calls. */
function tokens(source: string): string[] {
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    true,
    ts.LanguageVariant.Standard,
    source
  );
  const result: string[] = [];
  while (scanner.scan() !== ts.SyntaxKind.EndOfFileToken) result.push(scanner.getTokenText());
  return result;
}

function assertExpression(actual: ts.Node | undefined, expected: string, label: string) {
  assert.ok(actual, `${label} must exist`);
  assert.deepEqual(tokens(actual.getText()), tokens(expected), label);
}

function optionProperty(call: ts.CallExpression, name: string): ts.Expression | undefined {
  const options = call.arguments[1];
  assert.ok(options && ts.isObjectLiteralExpression(options), "options must be an object literal");
  assert.equal(
    options.properties.some(ts.isSpreadAssignment),
    false,
    "spreads must not override required options"
  );
  const properties = options.properties.filter((property) => property.name?.getText() === name);
  assert.equal(properties.length, 1, `${name} must occur exactly once`);
  const property = properties[0];
  if (ts.isPropertyAssignment(property)) return property.initializer;
  if (ts.isShorthandPropertyAssignment(property)) return property.name;
  assert.fail(`${name} must be an ordinary property`);
}

function assertSenderBinding(call: ts.CallExpression, id: string) {
  const parent = call.parent;
  assert.ok(ts.isCallExpression(parent), "options must be consumed by a real call");
  assertExpression(parent.expression, "markAccountUnavailable", "receiver");
  assert.equal(parent.arguments.length, 7, "receiver argument count");
  assert.equal(parent.arguments[6], call, "options must be the seventh receiver argument");
  assertExpression(call.expression, "buildExhaustionOptions", "options helper");
  assertExpression(call.arguments[0], id, "request-scoped correlation id");
  assertExpression(optionProperty(call, "isCombo"), "isCombo", "combo flag");
}

function assertBoundSender(call: ts.CallExpression, id: string, originalArguments: string[]) {
  assertSenderBinding(call, id);
  const parent = call.parent as ts.CallExpression;
  originalArguments.forEach((expected, index) =>
    assertExpression(parent.arguments[index], expected, `receiver argument ${index}`)
  );
}

const CHAT_SENDERS = {
  muse: ["result.status", 'String(result.rawMessage ?? result.error ?? "")'],
  streamReadiness: ["result.status || HTTP_STATUS.BAD_GATEWAY", "classificationError"],
  preResponseTimeout: ["result.status", "result.error || ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE"],
  fallback: ["result.status", "errorStr"],
} as const;

function chatSender(source: string, name: keyof typeof CHAT_SENDERS): ts.CallExpression {
  const expectedError = tokens(CHAT_SENDERS[name][1]);
  const matches = callsNamed(source, "markAccountUnavailable").filter((call) => {
    const actualError = tokens(call.arguments[2]?.getText() ?? "");
    return JSON.stringify(actualError) === JSON.stringify(expectedError);
  });
  assert.equal(matches.length, 1, `${name} account-failure receiver must exist exactly once`);
  const sender = matches[0].arguments[6];
  assert.ok(sender && ts.isCallExpression(sender), `${name} must consume an options helper`);
  return sender;
}

function assertChatSenders(source: string) {
  const receivers = callsNamed(source, "markAccountUnavailable");
  const senders = callsNamed(source, "buildExhaustionOptions");
  assert.equal(senders.length, receivers.length, "every helper must belong to an account failure");
  // Check every receiver, including future failure paths, without depending on
  // source order. Known paths below retain their original argument contracts.
  for (const receiver of receivers) {
    const sender = receiver.arguments[6];
    assert.ok(
      sender && ts.isCallExpression(sender),
      "every account failure must build its options"
    );
    assertSenderBinding(sender, "runtimeOptions.correlationId ?? null");
  }
  for (const name of Object.keys(CHAT_SENDERS) as (keyof typeof CHAT_SENDERS)[]) {
    assertBoundSender(chatSender(source, name), "runtimeOptions.correlationId ?? null", [
      "credentials.connectionId",
      ...CHAT_SENDERS[name],
      "provider",
      "model",
      "providerProfile",
    ]);
  }
  assertExpression(
    optionProperty(chatSender(source, "muse"), "headers"),
    "result.response.headers",
    "Muse failure headers"
  );
  const fallback = chatSender(source, "fallback");
  assertExpression(
    optionProperty(fallback, "headers"),
    "result.response.headers",
    "fallback headers"
  );
  assertExpression(
    optionProperty(fallback, "persistUnavailableState"),
    `!(
    isCombo && result.status === 429 && (failureKind === "rate_limit" || failureKind === "transient")
  )`,
    "fallback persistence policy"
  );
  const exhaustion = callsNamed(source, "handleNoCredentials");
  assert.equal(exhaustion.length, 1, "one exhaustion caller");
  assert.equal(exhaustion[0].arguments.length, 10, "exhaustion argument count");
  assertExpression(exhaustion[0].arguments[0], "credentials", "exhaustion credentials");
  assertExpression(exhaustion[0].arguments[8], "shadowedNode", "shadowed node");
  assertExpression(
    exhaustion[0].arguments[9],
    "runtimeOptions?.correlationId ?? null",
    "exhaustion request id"
  );
}

function assertStreamSender(source: string) {
  const senders = callsNamed(source, "buildExhaustionOptions");
  assert.equal(senders.length, 1, "one onStreamFailure sender");
  assertBoundSender(senders[0], "correlationId ?? null", [
    "credentials.connectionId",
    "Number(failure?.status || HTTP_STATUS.BAD_GATEWAY)",
    `String(failure?.message || failure?.code || "stream failure")`,
    "provider",
    "model",
    "providerProfile",
  ]);
  assertExpression(
    optionProperty(senders[0], "streamOutputEmitted"),
    "streamOutputEmitted",
    "stream output flag"
  );
}

function replaceNode(source: string, node: ts.Node, replacement: string): string {
  return source.slice(0, node.getStart()) + replacement + source.slice(node.end);
}

test("exhaustion lines carry the request id", async (t) => {
  await t.test("chat sender forwards the id (sender side)", async () => {
    // Inspect actual call expressions and their receiver arguments. A detached
    // helper call or a comment must not satisfy the sender-side contract.
    assertChatSenders(readSource("../../src/sse/handlers/chat.ts"));
    assertStreamSender(readSource("../../src/sse/handlers/chatHelpers.ts"));

    // The pure helper itself forwards the exact id the sender passes in.
    assert.deepEqual(auth.buildExhaustionOptions("trace-123", { isCombo: true }), {
      isCombo: true,
      correlationId: "trace-123",
    });
    assert.deepEqual(auth.buildExhaustionOptions(null, { isCombo: false }), {
      isCombo: false,
      correlationId: null,
    });
  });

  await t.test("auth.ts emits structured id meta on the exhaustion line", async () => {
    const authSource = readSource("../../src/sse/services/auth.ts");
    assert.match(
      authSource,
      /\.\.\.\(options\.correlationId \? \{ correlationId: options\.correlationId \} : \{\}\)/,
      "auth.ts:2868 must spread correlationId into the log meta only when truthy"
    );

    await resetStorage();
    const withId = await createConnection();
    const resWithId = await driveExhaustionViaBare500(
      withId,
      auth.buildExhaustionOptions("trace-123")
    );
    // Bare 500: no model lockout, connection stays active, fallback allowed.
    assert.equal(resWithId.shouldFallback, true);
    const withAfter = await providersDb.getProviderConnectionById(withId);
    assert.equal(
      (withAfter as unknown as { lastErrorType?: string })?.lastErrorType,
      "server_error"
    );

    await resetStorage();
    const withoutId = await createConnection();
    const resWithoutId = await driveExhaustionViaBare500(
      withoutId,
      auth.buildExhaustionOptions(null)
    );
    assert.equal(resWithoutId.shouldFallback, true);
  });

  await t.test("handleNoCredentials emits structured id meta", async () => {
    const helpersSource = readSource("../../src/sse/handlers/chatHelpers.ts");
    assert.match(
      helpersSource,
      /\.\.\.\(correlationId \? \{ correlationId \} : \{\}\)/,
      "chatHelpers.ts:771 must spread correlationId into the log meta only when truthy"
    );

    // Exhaustion with an id returns the upstream error; without an id the
    // response shape is unchanged.
    const withId = chatHelpers.handleNoCredentials(
      null,
      "conn-1",
      "opencode-test",
      "test-model",
      "upstream 500",
      500,
      undefined,
      false,
      null,
      "trace-123"
    );
    assert.equal(withId.status, 500);
    const withBody = (await withId.json()) as { error?: { message?: string } };
    assert.equal(withBody?.error?.message, "upstream 500");

    const withoutId = chatHelpers.handleNoCredentials(
      null,
      "conn-1",
      "opencode-test",
      "test-model",
      "upstream 500",
      500
    );
    assert.equal(withoutId.status, 500);
    const withoutBody = (await withoutId.json()) as { error?: { message?: string } };
    assert.equal(withoutBody?.error?.message, "upstream 500");
  });
});

for (const name of Object.keys(CHAT_SENDERS) as (keyof typeof CHAT_SENDERS)[]) {
  test(`sender AST rejects missing request id at ${name}`, () => {
    const source = readSource("../../src/sse/handlers/chat.ts");
    assertChatSenders(source);
    const call = chatSender(source, name);
    assert.throws(
      () => assertChatSenders(replaceNode(source, call.arguments[0], "null")),
      /request-scoped correlation id/
    );
  });
}

for (const [property, replacement] of [
  ["headers", "other.headers"],
  ["persistUnavailableState", "true"],
  ["isCombo", "false"],
]) {
  test(`sender AST rejects an unrelated fallback ${property}`, () => {
    const source = readSource("../../src/sse/handlers/chat.ts");
    assertChatSenders(source);
    const fallback = chatSender(source, "fallback");
    const node = optionProperty(fallback, property);
    assert.ok(node);
    assert.throws(() => assertChatSenders(replaceNode(source, node, replacement)));
  });
}

test("sender AST rejects a detached options helper even when its id text remains", () => {
  const source = readSource("../../src/sse/handlers/chat.ts");
  assertChatSenders(source);
  const call = chatSender(source, "fallback");
  const detached = replaceNode(source, call, "{}") + `\n${call.getText()};`;
  assert.throws(() => assertChatSenders(detached));
});

test("sender AST permits additional structured options and ignores comments and strings", () => {
  const source = readSource("../../src/sse/handlers/chat.ts");
  assertChatSenders(source);
  const fallback = chatSender(source, "fallback");
  const options = fallback.arguments[1];
  const changed = replaceNode(
    source,
    options,
    `{ extraDiagnostic: { code: "diagnostic" }, ${options.getText().slice(1)}`
  );
  const decoys = `\n// buildExhaustionOptions(wrongId, {});\nconst decoy = "buildExhaustionOptions(wrongId, {})";`;
  assertChatSenders(changed + decoys);
});

test("sender AST rejects a request id from another scope and a missing exhaustion id", () => {
  const source = readSource("../../src/sse/handlers/chat.ts");
  assertChatSenders(source);
  const first = chatSender(source, "muse");
  assert.throws(() =>
    assertChatSenders(replaceNode(source, first.arguments[0], "other.correlationId ?? null"))
  );
  const exhaustion = callsNamed(source, "handleNoCredentials")[0];
  assert.throws(() => assertChatSenders(replaceNode(source, exhaustion.arguments[9], "null")));
});

test("sender AST accepts a further failure path only when it forwards the request id", () => {
  const source = readSource("../../src/sse/handlers/chat.ts");
  const extra = `\nmarkAccountUnavailable(credentials.connectionId, result.status, newFailure,
    provider, model, providerProfile,
    buildExhaustionOptions(runtimeOptions.correlationId ?? null, { isCombo }));`;
  assertChatSenders(source + extra);
  assert.throws(
    () => assertChatSenders(source + extra.replace("runtimeOptions.correlationId ?? null", "null")),
    /request-scoped correlation id/
  );
});
