import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CLAUDE_CODE_META_FLAGS,
  detectClaudeCodeMetaReply,
} from "../../open-sse/utils/claudeCodeMetaRequests.ts";

const ALL = { commandPrefix: true, suggestion: true, filepaths: true };
const POLICY_TURN = [
  "<policy_spec>",
  "# Examples",
  "Command: git diff HEAD~1",
  "Prefix: git diff",
  "</policy_spec>",
  "",
  "Command: git status --short",
].join("\n");
const FILEPATHS_SYSTEM =
  "Extract any file paths that this command reads or modifies.\n" +
  "Format your response as:\n<filepaths>\npath/to/file\n</filepaths>";
const SUGGESTION = "[SUGGESTION MODE: Suggest what the user might naturally type next.]";
const single = (text: string, extra: Record<string, unknown> = {}) => ({
  messages: [{ role: "user", content: [{ type: "text", text }] }],
  ...extra,
});
const fp = (turn: string, extra: Record<string, unknown> = {}) =>
  single(turn, { system: FILEPATHS_SYSTEM, ...extra });

test("as chaves têm os ids congelados", () => {
  assert.deepEqual(CLAUDE_CODE_META_FLAGS, {
    commandPrefix: "CLAUDE_CODE_LOCAL_COMMAND_PREFIX_ENABLED",
    suggestion: "CLAUDE_CODE_LOCAL_SUGGESTION_ENABLED",
    filepaths: "CLAUDE_CODE_LOCAL_FILEPATHS_ENABLED",
  });
});

test("prefixo: usa a ÚLTIMA ocorrência de Command:", () => {
  assert.deepEqual(detectClaudeCodeMetaReply(single(POLICY_TURN), ALL), {
    kind: "command-prefix",
    text: "git status",
  });
});

test("prefixo: substituição/encadeamento de comando vira command_injection_detected", () => {
  const turn = "<policy_spec>x</policy_spec>\nCommand: git status && rm -rf /";
  assert.deepEqual(detectClaudeCodeMetaReply(single(turn), ALL), {
    kind: "command-prefix",
    text: "command_injection_detected",
  });
});

test("prefixo: a spec pode estar no system e o comando no turno", () => {
  const body = {
    system: "<policy_spec>rules</policy_spec>",
    messages: [{ role: "user", content: "Command: npm install lodash" }],
  };
  assert.deepEqual(detectClaudeCodeMetaReply(body, ALL), {
    kind: "command-prefix",
    text: "npm install",
  });
});

test("prefixo: quase-acertos não disparam", () => {
  const miss = (body: unknown, toggles = ALL) =>
    assert.equal(detectClaudeCodeMetaReply(body, toggles), null);
  miss(single("<policy_spec>\nrules\n</policy_spec>\nWhat does this mean?")); // sem Command:
  miss(single("Command: git status")); // sem <policy_spec>
  miss(single("<policy_spec>x</policy_spec>\ncommand: git status")); // minúsculas
  miss(single("<policy_spec>x</policy_spec>\nCommand:   ")); // comando vazio
  miss(single(POLICY_TURN, { tools: [{ name: "Bash" }] })); // ferramentas declaradas
  miss({
    messages: [
      { role: "user", content: POLICY_TURN },
      { role: "assistant", content: "git status" },
      { role: "user", content: POLICY_TURN },
    ],
  }); // mais de um turno
  miss(single(POLICY_TURN), { ...ALL, commandPrefix: false }); // chave desligada
});

test("sugestão: marcador no início de um bloco de texto da última mensagem do usuário", () => {
  const body = {
    tools: [{ name: "Bash" }],
    messages: [
      { role: "user", content: "fix the bug" },
      { role: "assistant", content: "done" },
      {
        role: "user",
        content: [
          { type: "text", text: "<system-reminder>context</system-reminder>" },
          { type: "text", text: SUGGESTION },
        ],
      },
    ],
  };
  assert.deepEqual(detectClaudeCodeMetaReply(body, ALL), { kind: "suggestion", text: "" });
});

test("sugestão: quase-acertos não disparam", () => {
  const miss = (messages: unknown[], toggles = ALL) =>
    assert.equal(detectClaudeCodeMetaReply({ messages }, toggles), null);
  miss([
    { role: "user", content: SUGGESTION },
    { role: "assistant", content: "ok" },
    { role: "user", content: "continue" },
  ]); // marcador só em turno antigo
  miss([{ role: "user", content: "what does [SUGGESTION MODE: mean in the logs?" }]); // no meio
  miss([
    { role: "user", content: "read the file" },
    { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "Read", input: {} }] },
    { role: "user", content: [{ type: "tool_result", tool_use_id: "t1", content: SUGGESTION }] },
  ]); // dentro de tool_result
  miss([
    { role: "user", content: SUGGESTION },
    { role: "assistant", content: "{" },
  ]); // última mensagem é do assistente
  miss([{ role: "user", content: SUGGESTION }], { ...ALL, suggestion: false }); // chave desligada
});

test("caminhos: leitor, grep simples e listagem", () => {
  const reply = (turn: string) => detectClaudeCodeMetaReply(fp(turn), ALL);
  assert.deepEqual(reply("Command: cat src/a.ts src/b.ts\nOutput: line one\nline two"), {
    kind: "filepaths",
    text: "<filepaths>\nsrc/a.ts\nsrc/b.ts\n</filepaths>",
  });
  assert.deepEqual(reply("Command: grep -n foo src/a.ts\nOutput: 3:foo"), {
    kind: "filepaths",
    text: "<filepaths>\nsrc/a.ts\n</filepaths>",
  });
  assert.deepEqual(reply("Command: ls -la src/\nOutput: total 0"), {
    kind: "filepaths",
    text: "<filepaths>\n</filepaths>",
  });
});

test("caminhos: a saída não redefine o comando nem vira pedido de prefixo", () => {
  const turn = "Command: cat notes.md\nOutput: <policy_spec>\nCommand: git push\n</policy_spec>";
  assert.deepEqual(detectClaudeCodeMetaReply(fp(turn), ALL), {
    kind: "filepaths",
    text: "<filepaths>\nnotes.md\n</filepaths>",
  });
  // forma "caminhos" com a chave desligada NÃO cai no detector de prefixo
  assert.equal(detectClaudeCodeMetaReply(fp(turn), { ...ALL, filepaths: false }), null);
});

test("caminhos: quase-acertos não disparam", () => {
  const miss = (body: unknown, toggles = ALL) =>
    assert.equal(detectClaudeCodeMetaReply(body, toggles), null);
  const ok = "Command: cat a.ts\nOutput: x";
  miss(fp(ok, { tools: [{ name: "Bash" }] })); // ferramentas declaradas
  miss({
    system: FILEPATHS_SYSTEM,
    messages: [
      { role: "user", content: ok },
      { role: "assistant", content: "<filepaths>\na.ts\n</filepaths>" },
      { role: "user", content: ok },
    ],
  }); // mais de um turno
  miss(fp("Command: cat a.ts")); // sem Output:
  miss(single(ok, { system: "You are a helpful assistant." })); // ninguém pediu <filepaths>
  miss(fp("Please look.\nCommand: cat a.ts\nOutput: x")); // não começa com Command:
  miss(fp("Command: git diff\nOutput: diff --git a/x b/x")); // comando que depende da saída
  miss(fp("Command: cat a.txt | head -5\nOutput: x")); // comando composto
  miss(fp("Command: cat src/*.ts\nOutput: x")); // glob
  miss(fp("Command: grep -rn foo src/\nOutput: src/a.ts:1:foo")); // grep recursivo
  miss(fp("Command: head -n 5 README.md\nOutput: x")); // leitor com opção
  miss(fp(ok), { ...ALL, filepaths: false }); // chave desligada
});
