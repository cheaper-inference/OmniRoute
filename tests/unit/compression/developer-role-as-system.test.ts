/**
 * `role: "developer"` is OpenAI's modern spelling of `system` (Responses API, and newer
 * chat completions). Every compression role gate keys off `system` — `cavemanConfig.compressRoles`
 * (caveman.ts), ultra's `preserveSystemPrompt` branch (ultra.ts), lite's system preservation —
 * so a developer block was invisible to all of them. Pi, which sends its whole system prompt +
 * AGENTS.md + skills as one `input[]` item with `role: "developer"`, got zero rules even with
 * `x-omniroute-compression: allow-lossy`.
 *
 * These tests pin the adapter-level fix: developer is folded into system for the engines in both
 * wire shapes, and `restore` hands the original role back so the provider payload is unchanged.
 * Defaults are untouched — a developer block is still preserved unless the operator sets
 * `preserveSystemPrompt: false` and lists `system` in `compressRoles`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { adaptBodyForCompression } from "../../../open-sse/services/compression/bodyAdapter.ts";
import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";

const DEVELOPER_TEXT =
  "Please could you kindly review the configuration of the file and make sure to explain the " +
  "reason is because the function uses a database. ".repeat(4);

type Message = { role: string; content: string };

function standardConfig(compressRoles: string[], preserveSystemPrompt: boolean) {
  return {
    config: {
      cavemanConfig: {
        enabled: true,
        compressRoles,
        intensity: "full",
        minMessageLength: 0,
      },
      preserveSystemPrompt,
    },
  } as Record<string, unknown>;
}

function compressStandard(body: Record<string, unknown>, config: Record<string, unknown>) {
  const result = applyCompression(body, "standard", config);
  return { result, messages: result.body.messages as Message[] };
}

test("Responses input[]: developer is folded into system for the engines", () => {
  const adapter = adaptBodyForCompression({
    input: [{ role: "developer", content: DEVELOPER_TEXT }],
  });
  const messages = adapter.body.messages as Message[];
  assert.equal(messages[0].role, "system");
});

test("Responses input[]: restore keeps the client's developer role", () => {
  const adapter = adaptBodyForCompression({
    input: [{ role: "developer", content: DEVELOPER_TEXT }],
  });
  const restored = adapter.restore(adapter.body);
  const input = restored.input as Message[];
  assert.equal(input[0].role, "developer");
});

test("Responses input[]: a developer block compresses once system preservation is off", () => {
  const result = applyCompression(
    { input: [{ role: "developer", content: DEVELOPER_TEXT }] },
    "standard",
    standardConfig(["system"], false)
  );
  const input = result.body.input as Message[];
  assert.ok(result.compressed);
  assert.notEqual(input[0].content, DEVELOPER_TEXT);
  assert.equal(input[0].role, "developer");
});

test("Responses input[]: default config still preserves the developer block", () => {
  const result = applyCompression(
    { input: [{ role: "developer", content: DEVELOPER_TEXT }] },
    "standard",
    standardConfig(["user"], true)
  );
  const input = result.body.input as Message[];
  assert.equal(input[0].content, DEVELOPER_TEXT);
  assert.equal(input[0].role, "developer");
});

test("chat: developer is folded into system for the engines without mutating the client body", () => {
  const body = {
    messages: [
      { role: "developer", content: DEVELOPER_TEXT },
      { role: "user", content: "hello" },
    ],
  };
  const adapter = adaptBodyForCompression(body);
  assert.equal(adapter.adapted, true);
  assert.equal((adapter.body.messages as Message[])[0].role, "system");
  assert.equal((body.messages[0] as Message).role, "developer");
});

test("chat: restore keeps the client's developer role", () => {
  const adapter = adaptBodyForCompression({
    messages: [{ role: "developer", content: DEVELOPER_TEXT }],
  });
  const restored = adapter.restore(adapter.body);
  assert.equal((restored.messages as Message[])[0].role, "developer");
});

test("chat: a developer block compresses exactly like the same block as system", () => {
  const asDeveloper = compressStandard(
    { messages: [{ role: "developer", content: DEVELOPER_TEXT }] },
    standardConfig(["system"], false)
  );
  const asSystem = compressStandard(
    { messages: [{ role: "system", content: DEVELOPER_TEXT }] },
    standardConfig(["system"], false)
  );
  assert.notEqual(asSystem.messages[0].content, DEVELOPER_TEXT);
  assert.equal(asDeveloper.messages[0].content, asSystem.messages[0].content);
  assert.equal(asDeveloper.messages[0].role, "developer");
});

test("chat: bodies without a developer message keep the zero-copy pass-through", () => {
  const body = { messages: [{ role: "user", content: "hello" }] };
  const adapter = adaptBodyForCompression(body);
  assert.equal(adapter.adapted, false);
  assert.equal(adapter.body, body);
  assert.equal(adapter.restore(adapter.body), body);
});
