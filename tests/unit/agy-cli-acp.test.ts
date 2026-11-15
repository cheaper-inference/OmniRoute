/**
 * agyCliAcp.ts — the transport that drives a real `agy acp` process.
 *
 * A fake agy drives every case here: it is a Node script that speaks ACP over
 * stdio, so the suite exercises the real spawn, framing, handshake, permission
 * and prompt paths without an agy binary or a signed-in account on the machine.
 * Its behaviour is chosen per test through an environment variable it reads.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  AGENT_NAME,
  AgyTurnError,
  MIN_AGY_VERSION,
  agyTooOld,
  agentDefinition,
  closestEffort,
  compareVersions,
  configModelSelection,
  configSelect,
  ensureShimDir,
  firstTurnParts,
  fitBridgeTools,
  mergePromptParts,
  processKey,
  promptHasImage,
  resetShimDir,
  selectValues,
  systemAppend,
  turnFailure,
  userTurnParts,
} from "../../open-sse/services/agyCliAcp.ts";
import { AGENT_ERROR_CORES, CREDITS_CORE } from "../../open-sse/services/agyAgentText.ts";

// ── Pure helpers ───────────────────────────────────────────────────────────

test("compareVersions orders dotted versions and refuses nonsense", () => {
  assert.equal(compareVersions("1.4.12", "1.4.12"), 0);
  assert.equal(compareVersions("1.4.11", "1.4.12"), -1);
  assert.equal(compareVersions("1.5.0", "1.4.12"), 1);
  assert.equal(compareVersions("2.0.0", "1.99.99"), 1);
  assert.equal(compareVersions("v1.4.12", "1.4.12"), null);
  assert.equal(compareVersions("", "1.4.12"), null);
});

test("agyTooOld refuses an old agy but accepts a development build", () => {
  assert.equal(agyTooOld(MIN_AGY_VERSION), null);
  assert.equal(agyTooOld("1.5.0"), null);
  // A dev build is newer than the ceiling it was checked against; refusing it
  // would lock an operator out of their own install.
  assert.equal(agyTooOld("1.5.0-dev"), null);
  assert.match(String(agyTooOld("1.4.11")), /older than 1\.4\.12/);
  assert.equal(agyTooOld(null), null, "no version reported is not a refusal");
  assert.equal(agyTooOld(undefined), null);
});

test("systemAppend is off unless the operator turns it on", () => {
  const saved = process.env.AGY_BRIDGE_SYSTEM_APPEND;
  try {
    delete process.env.AGY_BRIDGE_SYSTEM_APPEND;
    assert.equal(systemAppend(), false, "the 429-safe default is off");
    for (const value of ["1", "true", "on", "yes", "TRUE"]) {
      process.env.AGY_BRIDGE_SYSTEM_APPEND = value;
      assert.equal(systemAppend(), true, `${value} should enable it`);
    }
    for (const value of ["0", "false", "off", "", "nope"]) {
      process.env.AGY_BRIDGE_SYSTEM_APPEND = value;
      assert.equal(systemAppend(), false, `${value} should leave it off`);
    }
  } finally {
    if (saved === undefined) delete process.env.AGY_BRIDGE_SYSTEM_APPEND;
    else process.env.AGY_BRIDGE_SYSTEM_APPEND = saved;
  }
});

test("userTurnParts rewords the Codex identity lines a user turn can carry", () => {
  // cloakUser is scoped to the lines Antigravity refuses in a user turn, which
  // are the Codex ones; a Claude Code line in a user turn is left alone, and
  // that is what the HTTP path does too.
  const parts = userTurnParts([
    { type: "text", text: "You are Codex, an agent based on GPT-5." },
    { type: "text", text: "You are Claude Code, Anthropic's official CLI for Claude." },
  ]);
  assert.doesNotMatch(
    (parts[0] as { text: string }).text,
    /an agent based on GPT-5/,
    "the Codex line is reworded"
  );
  assert.match(
    (parts[1] as { text: string }).text,
    /Claude Code/,
    "a line outside the user-turn list is untouched"
  );
});

test("userTurnParts leaves an image part exactly as it was", () => {
  const image = { type: "image" as const, mimeType: "image/png", data: "AAAA" };
  assert.deepEqual(userTurnParts([image])[0], image, "an image is not text and is not rewritten");
});

test("mergePromptParts joins with a blank line and keeps an empty side", () => {
  const a = [{ type: "text" as const, text: "a" }];
  const b = [{ type: "text" as const, text: "b" }];
  assert.deepEqual(mergePromptParts(a, b), [
    { type: "text", text: "a" },
    { type: "text", text: "\n\n" },
    { type: "text", text: "b" },
  ]);
  assert.deepEqual(mergePromptParts([], b), b);
  assert.deepEqual(mergePromptParts(a, []), a);
});

test("promptHasImage sees an image part", () => {
  assert.equal(promptHasImage([{ type: "text", text: "x" }]), false);
  assert.equal(promptHasImage([{ type: "image", mimeType: "image/png", data: "a" }]), true);
});

test("the first turn carries the system prompt as external instructions", () => {
  const parts = firstTurnParts([{ type: "text", text: "what is this?" }], "You are a helpful bot.");
  assert.equal(parts.length, 2);
  const prefix = (parts[0] as { text: string }).text;
  assert.match(prefix, /^<external_system_instructions>\n/);
  assert.match(prefix, /\n<\/external_system_instructions>$/);
  assert.match(prefix, /You are a helpful bot\./, "the caller's prompt is preserved");
  assert.deepEqual(parts[1], { type: "text", text: "what is this?" });
});

test("the first turn does not carry a system prompt the caller did not send", () => {
  const parts = [{ type: "text" as const, text: "hi" }];
  assert.deepEqual(firstTurnParts(parts, ""), parts);
  assert.deepEqual(firstTurnParts(parts, "   \n "), parts);
});

test("the external instructions are reworded, since they go upstream", () => {
  // A client's identity line is what Antigravity answers 429 to, so the same
  // reworder runs over the wrapper. The rewrite keeps the meaning and drops the
  // phrasing Antigravity matches on, which is what the assertion pins.
  const listed = "You are Claude Code, Anthropic's official CLI for Claude.";
  const reworded = firstTurnParts([{ type: "text", text: "hi" }], listed);
  const wrapper = (reworded[0] as { text: string }).text;
  assert.match(wrapper, /^<external_system_instructions>/);
  assert.doesNotMatch(wrapper, /^You are Claude Code,/m, "the matched phrasing is gone");
  assert.match(wrapper, /Claude Code/, "the client is still identifiable to the model");
  assert.equal(
    (reworded[1] as { text: string }).text,
    "hi",
    "the wrapper is its own part, so the model still sees the turn apart"
  );
});

test("the agent definition offers no tools and inherits nothing", () => {
  const definition = agentDefinition();
  assert.match(definition, /^---\n/);
  assert.match(definition, new RegExp(`name: ${AGENT_NAME}`));
  assert.match(definition, /^tools: \[\]$/m, "agy's own tools are not offered");
  assert.match(definition, /^inheritMcp: false$/m, "the operator's MCP servers stay out");
  assert.match(definition, /^inheritCustomizations: false$/m, "their skills and plugins stay out");
  assert.match(definition, /^mainAgent: true$/m);
  assert.match(definition, /\n---\n/, "the frontmatter is closed");
});

test("fitBridgeTools leaves a small catalog untouched and fits a large one", () => {
  const small = [{ name: "read", description: "read a file", inputSchema: { type: "object" } }];
  assert.deepEqual(fitBridgeTools(small), small);

  const huge = Array.from({ length: 40 }, (_value, index) => ({
    name: `tool_${index}`,
    description: "x".repeat(4000),
    inputSchema: { type: "object", properties: {} },
  }));
  const fitted = fitBridgeTools(huge);
  assert.equal(fitted.length, huge.length, "no tool is dropped, only shortened");
});

// ── Model selection ────────────────────────────────────────────────────────

const configOptions = [
  {
    id: "model",
    type: "select",
    category: "model",
    currentValue: "gemini-3.8-flash",
    options: [
      { value: "gemini-4-argon", name: "Gemini 4 Argon" },
      { value: "gemini-3.8-flash", name: "Gemini 3.8 Flash" },
    ],
  },
  {
    id: "thought_level",
    type: "select",
    category: "thought_level",
    currentValue: "medium",
    options: [{ value: "low" }, { value: "medium" }, { value: "high" }],
  },
];

test("selectValues flattens a grouped option list", () => {
  assert.deepEqual(selectValues([{ value: "a" }, { options: [{ value: "b" }, { value: "c" }] }]), [
    { value: "a", name: undefined },
    { value: "b", name: undefined },
    { value: "c", name: undefined },
  ]);
  assert.deepEqual(selectValues(undefined), []);
  assert.deepEqual(selectValues([{ nothing: true }, 5, null]), []);
});

test("configSelect finds an option by category, then by id", () => {
  assert.equal(configSelect(configOptions, "model")?.id, "model");
  assert.equal(configSelect([{ id: "model", type: "select" }], "model")?.id, "model");
  assert.equal(configSelect(configOptions, "nope"), null);
  assert.equal(configSelect("not an array", "model"), null);
});

test("a model with an effort suffix is split into the value and the level", () => {
  const selection = configModelSelection(configOptions, "gemini-3.8-flash-high");
  assert.equal(selection?.value, "gemini-3.8-flash");
  assert.equal(selection?.effort, "high");
});

test("a plain model value takes the effort the caller asked for", () => {
  const selection = configModelSelection(configOptions, "gemini-3.8-flash", { effort: "low" });
  assert.equal(selection?.value, "gemini-3.8-flash");
  assert.equal(selection?.effort, "low");
});

test("the longest matching prefix wins, so a model name with a dash is not truncated", () => {
  const options = [
    {
      id: "model",
      type: "select",
      category: "model",
      options: [{ value: "gemini-4" }, { value: "gemini-4-argon" }],
    },
  ];
  assert.equal(configModelSelection(options, "gemini-4-argon-high")?.value, "gemini-4-argon");
});

test("an unadvertised model selects nothing, so the caller's choice is not faked", () => {
  assert.equal(configModelSelection(configOptions, "gpt-9"), null);
  assert.equal(configModelSelection([], "gemini-3.8-flash"), null);
});

test("closestEffort picks the nearest advertised level", () => {
  assert.equal(closestEffort("max", ["low", "medium", "high"]), "high");
  assert.equal(closestEffort("minimal", ["low", "high"]), "low");
  assert.equal(closestEffort("medium", ["low", "medium", "high"]), "medium");
  assert.equal(closestEffort("high", []), "high", "nothing advertised keeps the request");
});

// ── Turning agy's words into an HTTP status ────────────────────────────────

test("a low credit balance is a 402, which is not retryable", () => {
  const error = turnFailure("Your AI credits balance is too low", CREDITS_CORE, "");
  assert.equal(error.status, 402);
  assert.match(error.message, /credits balance is too low/);
});

test("the quota banner is a 429", () => {
  const error = turnFailure("", AGENT_ERROR_CORES[3], "");
  assert.equal(error.status, 429);
  assert.match(error.message, /quota or rate limit/);
});

test("a refused system prompt is a 400 and says so, because waiting will not help", () => {
  const instructions = "You are Claude Code, Anthropic's official CLI for Claude.";
  const error = turnFailure(
    "code 429: Resource has been exhausted (e.g. check quota).",
    "",
    instructions
  );
  assert.equal(error.status, 400);
  assert.match(error.message, /answered 429 to this system prompt/);
  assert.ok(error.message.length > 0);
});

test("the same 429 with a clean system prompt is a 429, since it may be a real quota", () => {
  const error = turnFailure(
    "code 429: Resource has been exhausted (e.g. check quota).",
    "",
    "You are a helpful assistant."
  );
  assert.equal(error.status, 429);
  assert.match(error.message, /whatever quota is left/, "it says the ambiguity is known");
});

test("anything else agy stopped on is a 500 with agy's own words", () => {
  const error = turnFailure("agent execution terminated", AGENT_ERROR_CORES[0], "");
  assert.equal(error.status, 500);
  assert.match(error.message, /agent execution terminated/);
});

test("AgyTurnError carries the status and the no-retry flag", () => {
  const error = new AgyTurnError("boom", 409, true);
  assert.equal(error.status, 409);
  assert.equal(error.noRetry, true);
  assert.equal(error.name, "AgyTurnError");
  assert.equal(error instanceof Error, true);
});

// ── The shim on PATH ───────────────────────────────────────────────────────

test("the shim is an `nc` that runs the bridge's stdio server", async () => {
  resetShimDir();
  const dir = await ensureShimDir();
  try {
    const name = process.platform === "win32" ? "nc.cmd" : "nc";
    const file = path.join(dir, name);
    const content = fs.readFileSync(file, "utf8");
    assert.match(content, /agy-mcp-server\.mjs/, "it runs the stdio shim");
    assert.match(content, new RegExp(process.execPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    if (process.platform !== "win32") {
      const mode = fs.statSync(file).mode & 0o777;
      assert.equal(mode, 0o700, "agy runs it, and nobody else needs to");
    }
  } finally {
    resetShimDir();
  }
});

test("the shim directory is created once and reused", async () => {
  resetShimDir();
  try {
    const first = await ensureShimDir();
    const second = await ensureShimDir();
    assert.equal(first, second);
  } finally {
    resetShimDir();
  }
});

test("resetShimDir removes the directory it created", async () => {
  resetShimDir();
  const dir = await ensureShimDir();
  assert.equal(fs.existsSync(dir), true);
  resetShimDir();
  assert.equal(fs.existsSync(dir), false);
});

// ── The pool key ───────────────────────────────────────────────────────────

test("the pool key separates connections, conversations, binaries and models", () => {
  const base = { connectionId: "c1", conversationId: "v1", agyPath: "/usr/bin/agy" };
  const key = processKey(base);
  assert.equal(key.length, 64, "a sha256 hex digest, never a path");
  assert.equal(processKey(base), key, "it is stable");

  assert.notEqual(processKey({ ...base, connectionId: "c2" }), key);
  assert.notEqual(processKey({ ...base, conversationId: "v2" }), key);
  assert.notEqual(processKey({ ...base, agyPath: "/opt/agy" }), key);
  assert.notEqual(processKey({ ...base, model: "gemini-4-argon" }), key);
});

test("the pool key does not leak the identifiers it was given", () => {
  const key = processKey({
    connectionId: "secret-connection",
    conversationId: "secret-conversation",
    agyPath: "/usr/bin/agy",
  });
  assert.doesNotMatch(key, /secret/);
});

// ── A fake agy, driven over its real pipes ─────────────────────────────────

/**
 * A stand-in for `agy acp`. The scenario comes from AGY_FAKE_MODE, so one script
 * serves every case, and it writes what it was asked to do to AGY_FAKE_LOG so a
 * test can assert on the request agy received.
 */
const FAKE_AGY = `import fs from "node:fs";
import readline from "node:readline";

const mode = process.env.AGY_FAKE_MODE || "happy";
const log = process.env.AGY_FAKE_LOG;
const record = (entry) => { if (log) fs.appendFileSync(log, JSON.stringify(entry) + "\\n"); };

const write = (message) => process.stdout.write(JSON.stringify(message) + "\\n");
const reply = (id, result) => write({ jsonrpc: "2.0", id, result });
const fail = (id, code, message) => write({ jsonrpc: "2.0", id, error: { code, message } });

record({ event: "argv", argv: process.argv.slice(2) });
record({ event: "cwd", cwd: process.cwd() });
record({ event: "env", control: process.env.AGY_BRIDGE_CONTROL_PORT ? "set" : "unset", token: process.env.AGY_BRIDGE_TOKEN ? "set" : "unset", pathHasShim: (process.env.PATH || "").includes("agy-bridge-bin") });

if (mode === "slow-start") {
  // Never answers: the start timeout is what is under test.
  setInterval(() => {}, 1000);
} else {
  let sessionId = "session-1";
  let nextClientId = 1000;
  const permissionWaiters = new Map();

  const chunk = (text) => write({
    jsonrpc: "2.0",
    method: "session/update",
    params: { sessionId, update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text } } },
  });

  // agy asks the client for permission: one request, answered later by id.
  const ask = (toolCall) => {
    const id = nextClientId++;
    write({
      jsonrpc: "2.0", id, method: "session/request_permission",
      params: {
        sessionId,
        toolCall,
        options: [
          { optionId: "allow", kind: "allow_once" },
          { optionId: "reject", kind: "reject_once" },
        ],
      },
    });
    return new Promise((resolve) => permissionWaiters.set(id, resolve));
  };

  const rl = readline.createInterface({ input: process.stdin });
  rl.on("line", (line) => {
    let message;
    try { message = JSON.parse(line); } catch { return; }

    // The client's reply to agy's own request: no method, an id we assigned.
    if (!message.method) {
      const waiter = permissionWaiters.get(message.id);
      if (waiter) {
        permissionWaiters.delete(message.id);
        waiter(message.result);
      }
      return;
    }

    record({ event: "request", method: message.method, params: message.params });

    if (message.method === "initialize") {
      if (mode === "too-old") {
        reply(message.id, { agentInfo: { version: "1.4.0" }, agentCapabilities: {} });
        return;
      }
      if (mode === "no-version") {
        reply(message.id, { agentCapabilities: {} });
        return;
      }
      reply(message.id, {
        agentInfo: { version: "1.5.9" },
        agentCapabilities: {
          promptCapabilities: { image: mode === "images" },
          _meta: { antigravity: { systemPrompt: { append: true } } },
          sessionCapabilities: { resume: true },
        },
      });
      return;
    }

    if (message.method === "session/new") {
      record({ event: "session-new", meta: message.params._meta ?? null });
      if (mode === "no-session") { reply(message.id, {}); return; }
      reply(message.id, {
        sessionId,
        models: { currentModelId: "gemini-3.8-flash", availableModels: [] },
        configOptions: [
          {
            id: "model", type: "select", category: "model", currentValue: "gemini-3.8-flash",
            options: [{ value: "gemini-3.8-flash" }, { value: "gemini-4-argon" }],
          },
          {
            id: "thought_level", type: "select", category: "thought_level", currentValue: "medium",
            options: [{ value: "low" }, { value: "medium" }, { value: "high" }],
          },
        ],
      });
      return;
    }

    if (message.method === "session/resume") {
      if (mode === "no-resume") { fail(message.id, -32602, "unknown session"); return; }
      sessionId = message.params.sessionId;
      reply(message.id, { sessionId, models: { currentModelId: "gemini-3.8-flash" }, configOptions: [] });
      return;
    }

    if (message.method === "session/set_config_option") {
      if (mode === "no-config-method") { fail(message.id, -32601, "Method not found"); return; }
      record({ event: "config", id: message.params.configId, value: message.params.value });
      const chosen = message.params.value;
      reply(message.id, {
        configOptions: [
          {
            id: "model", type: "select", category: "model",
            currentValue: message.params.configId === "model" ? chosen : "gemini-3.8-flash",
            options: [{ value: "gemini-3.8-flash" }, { value: "gemini-4-argon" }],
          },
          {
            id: "thought_level", type: "select", category: "thought_level",
            currentValue: message.params.configId === "thought_level" ? chosen : "medium",
            options: [{ value: "low" }, { value: "medium" }, { value: "high" }],
          },
        ],
      });
      return;
    }

    if (message.method === "session/set_model") {
      record({ event: "set-model", modelId: message.params.modelId });
      reply(message.id, {});
      return;
    }

    if (message.method === "session/cancel") {
      record({ event: "cancel" });
      return;
    }

    if (message.method === "session/prompt") {
      const text = (message.params.prompt || [])
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("");
      record({ event: "prompt-parts", parts: message.params.prompt });

      (async () => {
        if (mode === "permission-tool") {
          const outcome = await ask({ title: "mcp(ide-tools/read_file)" });
          record({ event: "permission", outcome });
          chunk("read_file ran");
        } else if (mode === "permission-other") {
          const outcome = await ask({ title: "run_command" });
          record({ event: "permission", outcome });
          chunk("refused");
        } else if (mode === "banner-credits") {
          chunk("\\n⚠ Your AI credits balance is too low to continue.\\n");
        } else if (mode === "banner-quota") {
          chunk("\\n⚠ RESOURCE_EXHAUSTED (code 429): Resource has been exhausted (e.g. check quota).\\n");
        } else if (mode === "retry-banner") {
          chunk("a\\n⚠ Model produced invalid output.\\nb");
        } else if (mode === "echo") {
          chunk("echo:" + text);
        } else if (mode === "thinking") {
          write({
            jsonrpc: "2.0", method: "session/update",
            params: { sessionId, update: { sessionUpdate: "agent_thought_chunk", content: { type: "text", text: "considering" } } },
          });
          chunk("answer");
        } else if (mode === "slow") {
          // Let a cancel arrive before the reply.
          setTimeout(() => reply(message.id, { stopReason: "end_turn" }), 400);
          return;
        } else {
          chunk("hello");
        }
        reply(message.id, { stopReason: "end_turn" });
      })();
      return;
    }

    fail(message.id, -32601, "Method not found");
  });
}
`;

type FakeAgy = { path: string; log: string; cleanup: () => void };

function installFakeAgy(): FakeAgy {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-fake-"));
  const file = path.join(dir, "agy.mjs");
  fs.writeFileSync(file, FAKE_AGY);
  const log = path.join(dir, "log.ndjson");
  const wrapper = path.join(dir, process.platform === "win32" ? "agy.cmd" : "agy");
  if (process.platform === "win32") {
    fs.writeFileSync(wrapper, `@echo off\r\n"${process.execPath}" "${file}" %*\r\n`);
  } else {
    fs.writeFileSync(wrapper, `#!/bin/sh\nexec "${process.execPath}" "${file}" "$@"\n`, {
      mode: 0o700,
    });
  }
  return {
    path: wrapper,
    log,
    cleanup: () => fs.rmSync(dir, { recursive: true, force: true }),
  };
}

function readLog(log: string): Array<Record<string, unknown>> {
  if (!fs.existsSync(log)) return [];
  return fs
    .readFileSync(log, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as Record<string, unknown>);
}

/** What a test needs to drive one pooled process against the fake agy. */
async function withTransport<T>(
  mode: string,
  body: (helpers: {
    run: (
      overrides?: Partial<
        Parameters<typeof import("../../open-sse/services/agyCliAcp.ts").runAgyPrompt>[0]
      >
    ) => Promise<import("../../open-sse/services/agyCliAcp.ts").AgyTurnResult>;
    fake: FakeAgy;
    log: () => Array<Record<string, unknown>>;
  }) => Promise<T>
): Promise<T> {
  const fake = installFakeAgy();
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-work-"));
  const saved = {
    mode: process.env.AGY_FAKE_MODE,
    log: process.env.AGY_FAKE_LOG,
    startTimeout: process.env.AGY_BRIDGE_START_TIMEOUT_MS,
  };
  process.env.AGY_FAKE_MODE = mode;
  process.env.AGY_FAKE_LOG = fake.log;
  const acp = await import("../../open-sse/services/agyCliAcp.ts");
  try {
    let counter = 0;
    return await body({
      fake,
      log: () => readLog(fake.log),
      run: (overrides = {}) =>
        acp.runAgyPrompt({
          connectionId: "conn-test",
          conversationId: `conv-${mode}-${counter++}`,
          workDir,
          agyPath: fake.path,
          parts: [{ type: "text", text: "hi" }],
          ...overrides,
        } as Parameters<typeof acp.runAgyPrompt>[0]),
    });
  } finally {
    await acp.shutdownAgyPool();
    const restore = (key: string, value: string | undefined) => {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    };
    restore("AGY_FAKE_MODE", saved.mode);
    restore("AGY_FAKE_LOG", saved.log);
    restore("AGY_BRIDGE_START_TIMEOUT_MS", saved.startTimeout);
    fs.rmSync(workDir, { recursive: true, force: true });
    fake.cleanup();
  }
}

test("the session is created on the first prompt, not at start-up", async () => {
  await withTransport("happy", async ({ run, log }) => {
    await run();
    const methods = log()
      .filter((entry) => entry.event === "request")
      .map((entry) => entry.method);
    assert.deepEqual(methods, ["initialize", "session/new", "session/prompt"]);
    assert.equal(
      log().filter((entry) => entry.event === "session-new").length,
      1,
      "one session serves the process"
    );
  });
});

test("a prompt round-trips through a spawned agy", async () => {
  await withTransport("happy", async ({ run }) => {
    const result = await run();
    assert.equal(result.text, "hello");
    assert.equal(result.stopReason, "end_turn");
    assert.equal(result.sessionId, "session-1");
  });
});

test("agy is started for the acp subcommand, as the bridge agent, with its own control port", async () => {
  await withTransport("happy", async ({ run, log }) => {
    await run();
    const argv = log().find((entry) => entry.event === "argv")?.argv as string[];
    assert.equal(argv[0], "acp");
    assert.deepEqual(argv.slice(1, 3), ["--agent", AGENT_NAME]);
    const portAt = argv.indexOf("--ide-mcp-port");
    assert.ok(portAt > 0, "agy dials the bridge through --ide-mcp-port");
    assert.match(String(argv[portAt + 1]), /^\d+$/);

    const env = log().find((entry) => entry.event === "env");
    assert.equal(env?.control, "set", "the shim needs the control port");
    assert.equal(env?.token, "set", "and the per-process token");
    assert.equal(env?.pathHasShim, true, "the nc shim comes first on PATH");
  });
});

test("the agent definition is written where agy looks for it", async () => {
  await withTransport("happy", async ({ run, log }) => {
    await run();
    const cwd = String(log().find((entry) => entry.event === "cwd")?.cwd || "");
    const agentFile = path.join(cwd, ".agents", "agents", AGENT_NAME, "agent.md");
    assert.equal(fs.existsSync(agentFile), true, `no agent.md under ${cwd}`);
    assert.match(fs.readFileSync(agentFile, "utf8"), /^tools: \[\]$/m);
  });
});

test("agy's own version is checked before the session starts", async () => {
  await withTransport("too-old", async ({ run }) => {
    await assert.rejects(run(), /older than 1\.4\.12/);
  });
});

test("an agy that reports no version is driven, not refused", async () => {
  await withTransport("no-version", async ({ run }) => {
    const result = await run();
    assert.equal(result.text, "hello");
  });
});

test("a session with no sessionId is a failure, not a silent empty turn", async () => {
  await withTransport("no-session", async ({ run }) => {
    await assert.rejects(run(), /session\/new returned no sessionId/);
  });
});

test("the caller's system prompt rides the first user turn by default", async () => {
  await withTransport("echo", async ({ run, log }) => {
    await run({ instructions: "You are a helpful assistant." });
    const sessionNew = log().find((entry) => entry.event === "session-new");
    assert.equal(sessionNew?.meta, null, "nothing is asked of the session by default");
    const prompt = log().find((entry) => entry.event === "prompt-parts");
    const parts = (prompt?.parts as Array<{ text: string }>) || [];
    assert.equal(parts.length, 2);
    assert.match(parts[0].text, /^<external_system_instructions>/);
    assert.match(parts[0].text, /You are a helpful assistant\./);
    assert.equal(parts[1].text, "hi");
  });
});

test("the wrapper is not repeated on a second turn of the same session", async () => {
  await withTransport("echo", async ({ run, log }) => {
    await run({ instructions: "You are a helpful assistant.", sessionId: "session-1" });
    const prompts = log().filter((entry) => entry.event === "prompt-parts");
    assert.equal(prompts.length, 1);
    const parts = (prompts[0].parts as Array<{ text: string }>) || [];
    // A resumed session already has its instructions; only the turn goes.
    assert.equal(parts.length, 1, "the instructions are not resent");
    assert.equal(parts[0].text, "hi");
  });
});

test("the session is asked to carry the system prompt only when the operator opts in", async () => {
  const saved = process.env.AGY_BRIDGE_SYSTEM_APPEND;
  process.env.AGY_BRIDGE_SYSTEM_APPEND = "1";
  try {
    await withTransport("echo", async ({ run, log }) => {
      await run({ instructions: "You are a helpful assistant." });
      const sessionNew = log().find((entry) => entry.event === "session-new");
      assert.deepEqual(
        sessionNew?.meta,
        { antigravity: { systemPrompt: { append: "You are a helpful assistant." } } },
        "agy is told to append it to its own instructions"
      );
      const prompt = log().find((entry) => entry.event === "prompt-parts");
      const parts = (prompt?.parts as Array<{ type: string }>) || [];
      assert.equal(parts.length, 1, "the system prompt is not repeated in the user turn");
    });
  } finally {
    if (saved === undefined) delete process.env.AGY_BRIDGE_SYSTEM_APPEND;
    else process.env.AGY_BRIDGE_SYSTEM_APPEND = saved;
  }
});

test("an agy that does not advertise appending gets the wrapper instead, even when opted in", async () => {
  const saved = process.env.AGY_BRIDGE_SYSTEM_APPEND;
  process.env.AGY_BRIDGE_SYSTEM_APPEND = "1";
  try {
    await withTransport("no-version", async ({ run, log }) => {
      await run({ instructions: "You are a helpful assistant." });
      const sessionNew = log().find((entry) => entry.event === "session-new");
      assert.equal(sessionNew?.meta, null, "no capability, no _meta");
      const prompt = log().find((entry) => entry.event === "prompt-parts");
      const parts = (prompt?.parts as Array<{ text: string }>) || [];
      assert.equal(parts.length, 2);
      assert.match(parts[0].text, /^<external_system_instructions>/);
    });
  } finally {
    if (saved === undefined) delete process.env.AGY_BRIDGE_SYSTEM_APPEND;
    else process.env.AGY_BRIDGE_SYSTEM_APPEND = saved;
  }
});

test("agy's failure banner becomes a 402 for a spent credit balance", async () => {
  await withTransport("banner-credits", async ({ run }) => {
    await assert.rejects(run(), (error: unknown) => {
      assert.equal(error instanceof AgyTurnError, true);
      assert.equal((error as AgyTurnError).status, 402);
      assert.match((error as AgyTurnError).message, /credits balance is too low/);
      return true;
    });
  });
});

test("agy's quota banner becomes a 429", async () => {
  await withTransport("banner-quota", async ({ run }) => {
    await assert.rejects(run(), (error: unknown) => {
      assert.equal((error as AgyTurnError).status, 429);
      return true;
    });
  });
});

test("agy's retry banners never reach the caller, and the turn goes on", async () => {
  await withTransport("retry-banner", async ({ run }) => {
    const result = await run();
    assert.equal(result.text, "ab");
  });
});

test("a client tool permission is allowed once when it names a declared tool", async () => {
  const tools = [{ name: "read_file", description: "read", inputSchema: { type: "object" } }];
  await withTransport("permission-tool", async ({ run, log }) => {
    const result = await run({ tools });
    assert.equal(result.text, "read_file ran");
    const permission = log().find((entry) => entry.event === "permission");
    assert.deepEqual(permission?.outcome, {
      outcome: { outcome: "selected", optionId: "allow" },
    });
  });
});

test("a tool the caller never declared is refused, so agy cannot act on its own", async () => {
  const tools = [{ name: "read_file", description: "read", inputSchema: { type: "object" } }];
  await withTransport("permission-other", async ({ run, log }) => {
    await run({ tools });
    const permission = log().find((entry) => entry.event === "permission");
    assert.deepEqual(permission?.outcome, {
      outcome: { outcome: "selected", optionId: "reject" },
    });
  });
});

test("a declared tool is still refused when the caller passed no tools at all", async () => {
  await withTransport("permission-tool", async ({ run, log }) => {
    await run({ tools: [] });
    const permission = log().find((entry) => entry.event === "permission");
    assert.deepEqual(permission?.outcome, {
      outcome: { outcome: "selected", optionId: "reject" },
    });
  });
});

test("thinking chunks are reported apart from the reply text", async () => {
  await withTransport("thinking", async ({ run }) => {
    const thinking: string[] = [];
    const result = await run({ onThinking: (chunk) => thinking.push(chunk) });
    assert.deepEqual(thinking, ["considering"]);
    assert.equal(result.thinking, "considering");
    assert.equal(result.text, "answer");
  });
});

test("text is streamed as it arrives, not only at the end", async () => {
  await withTransport("echo", async ({ run }) => {
    const chunks: string[] = [];
    await run({
      onText: (chunk) => chunks.push(chunk),
      parts: [{ type: "text", text: "streamed" }],
    });
    assert.deepEqual(chunks, ["echo:streamed"]);
  });
});

test("an abort while the turn is running asks agy to cancel", async () => {
  await withTransport("slow", async ({ run, log }) => {
    const controller = new AbortController();
    const pending = run({ signal: controller.signal });
    // Abort only once agy has the prompt: aborting during the spawn is a
    // different path, covered below, and the spawn time varies by machine.
    const deadline = Date.now() + 20_000;
    while (
      !log().some((entry) => entry.event === "request" && entry.method === "session/prompt") &&
      Date.now() < deadline
    ) {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    controller.abort();
    const result = await pending;
    assert.equal(result.stopReason, "cancelled");
    assert.equal(
      log().some((entry) => entry.event === "cancel"),
      true,
      "agy was told, so it keeps its conversation"
    );
  });
});

test("an abort before the prompt is sent never runs the turn", async () => {
  await withTransport("echo", async ({ run, log }) => {
    const controller = new AbortController();
    controller.abort();
    const result = await run({ signal: controller.signal });
    assert.equal(result.stopReason, "cancelled");
    assert.equal(result.text, "");
    assert.equal(
      log().some((entry) => entry.event === "request" && entry.method === "session/prompt"),
      false,
      "a cancelled request costs no upstream call"
    );
  });
});

test("a session is resumed instead of created when the caller continues one", async () => {
  await withTransport("happy", async ({ run, log }) => {
    await run({ sessionId: "session-1" });
    const methods = log()
      .filter((entry) => entry.event === "request")
      .map((entry) => entry.method);
    assert.deepEqual(methods, ["initialize", "session/resume", "session/prompt"]);
    assert.equal(
      log().some((entry) => entry.method === "session/new"),
      false,
      "no fresh session was created"
    );
  });
});

test("a session agy no longer has is replaced, so a lost conversation is not an outage", async () => {
  await withTransport("no-resume", async ({ run, log }) => {
    const result = await run({ sessionId: "gone" });
    assert.equal(result.text, "hello");
    const methods = log()
      .filter((entry) => entry.event === "request")
      .map((entry) => entry.method);
    assert.deepEqual(methods, ["initialize", "session/resume", "session/new", "session/prompt"]);
  });
});

test("an image prompt is refused when agy cannot take one", async () => {
  await withTransport("happy", async ({ run }) => {
    await assert.rejects(
      run({ parts: [{ type: "image", mimeType: "image/png", data: "AAAA" }] }),
      (error: unknown) => {
        assert.equal((error as AgyTurnError).status, 400);
        assert.match((error as AgyTurnError).message, /image input needs an image-capable agy/);
        return true;
      }
    );
  });
});

test("an image prompt is sent when agy advertises the capability", async () => {
  await withTransport("images", async ({ run, log }) => {
    await run({ parts: [{ type: "image", mimeType: "image/png", data: "AAAA" }] });
    const prompt = log().find(
      (entry) => entry.event === "request" && entry.method === "session/prompt"
    );
    const parts = (prompt?.params as { prompt: Array<{ type: string }> }).prompt;
    assert.equal(parts[0].type, "image");
  });
});

test("a named model is selected through the session's own config", async () => {
  await withTransport("happy", async ({ run, log }) => {
    await run({ model: "gemini-4-argon" });
    const config = log().find((entry) => entry.event === "config");
    assert.deepEqual(config, { event: "config", id: "model", value: "gemini-4-argon" });
  });
});

test("an effort suffix selects the model and the level", async () => {
  await withTransport("happy", async ({ run, log }) => {
    await run({ model: "gemini-3.8-flash-high" });
    const configs = log().filter((entry) => entry.event === "config");
    assert.deepEqual(configs, [
      { event: "config", id: "model", value: "gemini-3.8-flash" },
      { event: "config", id: "thought_level", value: "high" },
    ]);
  });
});

test("an older agy without the config method falls back to session/set_model", async () => {
  await withTransport("no-config-method", async ({ run, log }) => {
    await run({ model: "gemini-4-argon" });
    const setModel = log().find((entry) => entry.event === "set-model");
    assert.equal(setModel?.modelId, "gemini-4-argon");
  });
});

test("the control server is closed when the pool shuts down", async () => {
  const bridge = await import("../../open-sse/services/agyMcpBridge.ts");
  const acp = await import("../../open-sse/services/agyCliAcp.ts");
  const fake = installFakeAgy();
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "agy-work-"));
  const savedMode = process.env.AGY_FAKE_MODE;
  process.env.AGY_FAKE_MODE = "happy";
  try {
    await acp.runAgyPrompt({
      connectionId: "conn-close",
      conversationId: "conv-close",
      workDir,
      agyPath: fake.path,
      parts: [{ type: "text", text: "hi" }],
    });
    assert.notEqual(bridge.controlServerPort(), null, "the bridge was listening");

    await acp.shutdownAgyPool();
    assert.equal(bridge.controlServerPort(), null, "shutdown must not leave the port open");
    assert.equal(acp.agyProcessCount(), 0);
  } finally {
    await acp.shutdownAgyPool();
    if (savedMode === undefined) delete process.env.AGY_FAKE_MODE;
    else process.env.AGY_FAKE_MODE = savedMode;
    fs.rmSync(workDir, { recursive: true, force: true });
    fake.cleanup();
  }
});

test("the same conversation reuses its process, and a different one does not", async () => {
  await withTransport("happy", async ({ run, log }) => {
    await run({ conversationId: "same" });
    await run({ conversationId: "same" });
    const starts = log().filter((entry) => entry.event === "argv").length;
    assert.equal(starts, 1, "one agy process serves both prompts");

    await run({ conversationId: "other" });
    assert.equal(
      log().filter((entry) => entry.event === "argv").length,
      2,
      "a different conversation gets its own process, so their histories cannot mix"
    );
  });
});

test("an agy that never answers is refused after the start timeout", async () => {
  const savedTimeout = process.env.AGY_BRIDGE_START_TIMEOUT_MS;
  process.env.AGY_BRIDGE_START_TIMEOUT_MS = "300";
  try {
    await withTransport("slow-start", async ({ run }) => {
      await assert.rejects(run(), /timed out starting agy acp after 300ms/);
    });
  } finally {
    if (savedTimeout === undefined) delete process.env.AGY_BRIDGE_START_TIMEOUT_MS;
    else process.env.AGY_BRIDGE_START_TIMEOUT_MS = savedTimeout;
  }
});

test("a machine with no agy is reported as not found, never as a crash", async () => {
  // This box has a real agy under %LOCALAPPDATA%, so discovery has to be
  // starved of every directory it looks in — otherwise this test would spawn
  // it and spend a real call.
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), "agy-none-"));
  const keys = ["PATH", "Path", "PATHEXT", "LOCALAPPDATA", "USERPROFILE", "HOME", "AGY_PATH"];
  const saved = new Map(keys.map((key) => [key, process.env[key]]));
  try {
    for (const key of keys) delete process.env[key];
    process.env.PATH = "";
    process.env.LOCALAPPDATA = path.join(empty, "AppData", "Local");
    process.env.USERPROFILE = empty;
    process.env.HOME = empty;

    const acp = await import("../../open-sse/services/agyCliAcp.ts");
    assert.equal(acp.resolveAgyBinary(process.env), null, "nothing is installed here");
    await assert.rejects(
      acp.runAgyPrompt({
        connectionId: "c",
        conversationId: "v",
        workDir: empty,
        parts: [{ type: "text", text: "hi" }],
      }),
      /the `agy` CLI was not found/
    );
  } finally {
    for (const [key, value] of saved) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(empty, { recursive: true, force: true });
  }
});
