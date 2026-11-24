import { afterEach, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { CLAUDE_CODE_META_FLAGS } from "../../open-sse/utils/claudeCodeMetaRequests.ts";
import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";

const { handleBypassRequest } = await import("../../open-sse/utils/bypassHandler.ts");

test("as três chaves existem, são booleanas, da categoria cli e nascem desligadas", () => {
  const expectedWarning = {
    [CLAUDE_CODE_META_FLAGS.commandPrefix]: "caution",
    [CLAUDE_CODE_META_FLAGS.suggestion]: "info",
    [CLAUDE_CODE_META_FLAGS.filepaths]: "info",
  };
  for (const key of Object.values(CLAUDE_CODE_META_FLAGS)) {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);
    assert.ok(def, `${key} must be defined`);
    assert.equal(def.category, "cli");
    assert.equal(def.type, "boolean");
    assert.equal(def.defaultValue, "false");
    assert.equal(def.requiresRestart, false);
    assert.equal(def.warningLevel, expectedWarning[key]);
  }
});

const UA = "claude-cli/2.1.89";
const KEYS = Object.values(CLAUDE_CODE_META_FLAGS);
const RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");
const globalStore = globalThis as Record<symbol, unknown>;
const savedEnv = new Map<string, string | undefined>();
let savedResolver: unknown;

beforeEach(() => {
  savedResolver = globalStore[RESOLVER_KEY];
  delete globalStore[RESOLVER_KEY]; // lê a chave só do ambiente
  for (const key of KEYS) {
    savedEnv.set(key, process.env[key]);
    delete process.env[key];
  }
});
afterEach(() => {
  for (const key of KEYS) {
    const value = savedEnv.get(key);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  if (savedResolver === undefined) delete globalStore[RESOLVER_KEY];
  else globalStore[RESOLVER_KEY] = savedResolver;
});

const POLICY_TURN =
  "<policy_spec>\nCommand: git diff HEAD~1\n</policy_spec>\n\nCommand: git status --short";
const SUGGESTION = "[SUGGESTION MODE: Suggest what the user might naturally type next.]";
const FILEPATHS_SYSTEM = "Extract file paths.\n<filepaths>\npath\n</filepaths>";
const prefixBody = (extra: Record<string, unknown> = {}) => ({
  messages: [{ role: "user", content: POLICY_TURN }],
  ...extra,
});
const claudeBody = (turn: string, system: string, extra: Record<string, unknown> = {}) => ({
  max_tokens: 64,
  system,
  messages: [{ role: "user", content: [{ type: "text", text: turn }] }],
  ...extra,
});
type ClaudeMessage = {
  type: string;
  role: string;
  stop_reason: string;
  content: Array<{ type: string; text: string }>;
};
const claudeStreamText = (sse: string): string =>
  sse
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map(
      (line) =>
        JSON.parse(line.slice(6)) as { type?: string; delta?: { type?: string; text?: string } }
    )
    .filter((e) => e.type === "content_block_delta" && e.delta?.type === "text_delta")
    .map((e) => e.delta?.text ?? "")
    .join("");

test("com as três chaves ausentes nada é respondido localmente", () => {
  assert.equal(handleBypassRequest(prefixBody({ stream: false }), "gpt-5", UA), null);
  assert.equal(
    handleBypassRequest(
      { stream: false, messages: [{ role: "user", content: SUGGESTION }] },
      "gpt-5",
      UA
    ),
    null
  );
  assert.equal(
    handleBypassRequest(
      claudeBody("Command: cat a.ts\nOutput: x", FILEPATHS_SYSTEM, { stream: false }),
      "gpt-5",
      UA
    ),
    null
  );
});

test("prefixo ligado: JSON no formato OpenAI com o prefixo e o usage fixo", async () => {
  process.env[CLAUDE_CODE_META_FLAGS.commandPrefix] = "true";
  const result = handleBypassRequest(prefixBody({ stream: false }), "gpt-5", UA);
  assert.ok(result);
  const payload = (await result.response.json()) as {
    choices: Array<{ message: { content: string }; finish_reason: string }>;
    usage: { total_tokens: number };
  };
  assert.equal(payload.choices[0].message.content, "git status");
  assert.equal(payload.choices[0].finish_reason, "stop");
  assert.equal(payload.usage.total_tokens, 2);
});

test("prefixo ligado: JSON no formato Claude", async () => {
  process.env[CLAUDE_CODE_META_FLAGS.commandPrefix] = "true";
  const result = handleBypassRequest(
    claudeBody(POLICY_TURN, "You are a classifier.", { stream: false }),
    "claude-x",
    UA
  );
  assert.ok(result);
  const payload = (await result.response.json()) as ClaudeMessage;
  assert.equal(payload.type, "message");
  assert.equal(payload.role, "assistant");
  assert.equal(payload.stop_reason, "end_turn");
  assert.deepEqual(payload.content, [{ type: "text", text: "git status" }]);
});

test("prefixo ligado: SSE no formato Claude entrega o texto literal", async () => {
  process.env[CLAUDE_CODE_META_FLAGS.commandPrefix] = "true";
  const result = handleBypassRequest(
    claudeBody(POLICY_TURN, "You are a classifier."),
    "claude-x",
    UA
  );
  assert.ok(result);
  assert.equal(result.response.headers.get("content-type"), "text/event-stream");
  const sse = await result.response.text();
  assert.equal(claudeStreamText(sse), "git status");
  assert.match(sse, /event: message_stop/);
});

test("sugestão ligada: mensagem Claude sem bloco de conteúdo", async () => {
  process.env[CLAUDE_CODE_META_FLAGS.suggestion] = "true";
  const body = {
    max_tokens: 64,
    system: "You are Claude Code.",
    stream: false,
    tools: [{ name: "Bash" }],
    messages: [
      { role: "user", content: [{ type: "text", text: "fix the bug" }] },
      { role: "assistant", content: [{ type: "text", text: "done" }] },
      { role: "user", content: [{ type: "text", text: SUGGESTION }] },
    ],
  };
  const result = handleBypassRequest(body, "claude-x", UA);
  assert.ok(result);
  const payload = (await result.response.json()) as ClaudeMessage;
  assert.deepEqual(payload.content, []);
  assert.equal(payload.stop_reason, "end_turn");
});

test("caminhos ligado: o bloco <filepaths> chega literal em JSON e em SSE (caminho com __)", async () => {
  process.env[CLAUDE_CODE_META_FLAGS.filepaths] = "true";
  const expected = "<filepaths>\nsrc/__init__.py\n</filepaths>";
  const turn = "Command: cat src/__init__.py\nOutput: import os";
  const json = handleBypassRequest(
    claudeBody(turn, FILEPATHS_SYSTEM, { stream: false }),
    "claude-x",
    UA
  );
  assert.ok(json);
  const payload = (await json.response.json()) as ClaudeMessage;
  assert.equal(payload.content.map((b) => b.text).join(""), expected);
  assert.ok(payload.content.every((b) => b.type === "text"));
  const stream = handleBypassRequest(claudeBody(turn, FILEPATHS_SYSTEM), "claude-x", UA);
  assert.ok(stream);
  assert.equal(claudeStreamText(await stream.response.text()), expected);
});

test("cada chave só liga o seu detector", () => {
  process.env[CLAUDE_CODE_META_FLAGS.filepaths] = "true";
  process.env[CLAUDE_CODE_META_FLAGS.suggestion] = "true";
  assert.equal(handleBypassRequest(prefixBody({ stream: false }), "gpt-5", UA), null);
});

test("a restrição por cliente continua valendo com tudo ligado", () => {
  for (const key of KEYS) process.env[key] = "true";
  assert.equal(handleBypassRequest(prefixBody({ stream: false }), "gpt-5", "curl/8.0"), null);
});

test("os padrões antigos não mudam com tudo ligado", async () => {
  for (const key of KEYS) process.env[key] = "true";
  const result = handleBypassRequest(
    { stream: false, messages: [{ role: "user", content: "Warmup" }] },
    "gpt-5-mini",
    UA
  );
  assert.ok(result);
  const payload = (await result.response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };
  assert.match(payload.choices[0].message.content, /clear terminal/i);
});
