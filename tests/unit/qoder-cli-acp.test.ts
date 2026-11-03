import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const qoderCli = await import("../../open-sse/services/qoderCli.ts");
const acp = await import("../../open-sse/services/qoderCliAcp.ts");
const concurrency = await import("../../open-sse/services/qoderCliConcurrency.ts");
const { __clearQoderCliInvocationCache } =
  await import("../../open-sse/services/qoderCliResolve.ts");

const isPosix = process.platform !== "win32";

// Minimal ACP agent: newline-delimited JSON-RPC on stdio, logging what it saw.
const FAKE_AGENT = String.raw`#!/usr/bin/env node
const fs = require("fs");
const log = (name, value) => fs.appendFileSync("__DIR__/" + name, value + "\n");
if (process.argv.includes("--version")) { console.log("1.0.0"); process.exit(0); }
log("spawns", JSON.stringify({ argv: process.argv.slice(2), pat: process.env.QODER_PERSONAL_ACCESS_TOKEN || "" }));
const send = (msg) => process.stdout.write(JSON.stringify({ jsonrpc: "2.0", ...msg }) + "\n");
let sessions = 0;
const waiting = new Map();
let permissionPrompt = null;
let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let i;
  while ((i = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, i); buffer = buffer.slice(i + 1);
    if (line.trim()) handle(JSON.parse(line));
  }
});
process.stdin.on("end", () => process.exit(0));
function handle(msg) {
  const p = msg.params || {};
  if (msg.id === 900) {
    log("permission", JSON.stringify(msg.result));
    send({ method: "session/update", params: { sessionId: permissionPrompt.sessionId, update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: "denied ok" } } } });
    send({ id: permissionPrompt.id, result: { stopReason: "end_turn" } });
    return;
  }
  switch (msg.method) {
    case "initialize":
      return send({ id: msg.id, result: { protocolVersion: 1, agentCapabilities: {} } });
    case "session/new":
      sessions += 1;
      return send({ id: msg.id, result: { sessionId: "s" + sessions, models: { availableModels: [{ modelId: "auto", name: "Auto (default)" }, { modelId: "qmodel", name: "Qwen3.7-Plus" }], currentModelId: "auto" } } });
    case "session/set_model":
      log("models", p.modelId);
      return send({ id: msg.id, result: {} });
    case "session/delete":
      log("deletes", p.sessionId);
      return send({ id: msg.id, result: {} });
    case "session/cancel": {
      log("cancels", p.sessionId);
      const id = waiting.get(p.sessionId);
      if (id !== undefined) send({ id, result: { stopReason: "cancelled" } });
      return;
    }
    case "session/prompt": {
      const text = p.prompt.map((block) => block.text).join("");
      if (text.includes("EXIT")) process.exit(3);
      if (text.includes("SLOW")) { waiting.set(p.sessionId, msg.id); log("slow", p.sessionId); return; }
      if (text.includes("PERM")) {
        permissionPrompt = { id: msg.id, sessionId: p.sessionId };
        return send({ id: 900, method: "session/request_permission", params: { sessionId: p.sessionId, options: [] } });
      }
      for (const part of ["Hello ", "world"]) {
        send({ method: "session/update", params: { sessionId: p.sessionId, update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text: part } } } });
      }
      return send({ id: msg.id, result: { stopReason: "end_turn" } });
    }
    default:
      return send({ id: msg.id, error: { code: -32601, message: "unknown " + msg.method } });
  }
}
`;

function readLines(dir: string, name: string): string[] {
  const file = path.join(dir, name);
  return fs.existsSync(file)
    ? fs.readFileSync(file, "utf8").trim().split("\n").filter(Boolean)
    : [];
}

async function withFakeAgent(fn: (dir: string) => Promise<void>): Promise<void> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "qodercli-acp-"));
  const stub = path.join(dir, "qodercli");
  fs.writeFileSync(stub, FAKE_AGENT.replaceAll("__DIR__", dir), { mode: 0o755 });
  const keys = ["CLI_QODER_BIN", "QODER_CLI_CONFIG_DIR", "QODER_CLI_TRANSPORT"] as const;
  const previous = keys.map((key) => [key, process.env[key]] as const);
  process.env.CLI_QODER_BIN = stub;
  process.env.QODER_CLI_CONFIG_DIR = path.join(dir, "cfg");
  process.env.QODER_CLI_TRANSPORT = "acp";
  __clearQoderCliInvocationCache();
  concurrency.__resetQoderCliConcurrency();
  try {
    await fn(dir);
  } finally {
    acp.disposeQoderAcpProcesses();
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("pickQoderAcpModelId matches modelId or display name, then the static level key", () => {
  const available = [
    { modelId: "auto", name: "Auto (default)" },
    { modelId: "qmodel", name: "Qwen3.7-Plus" },
    { modelId: "gm51model", name: "GLM-5.2" },
  ];
  assert.equal(qoderCli.pickQoderAcpModelId("qmodel", available), "qmodel");
  assert.equal(qoderCli.pickQoderAcpModelId("GLM-5.2", available), "gm51model");
  assert.equal(qoderCli.pickQoderAcpModelId("qoder/qwen3.7-plus", available), "qmodel");
  assert.equal(qoderCli.pickQoderAcpModelId("kimi-k3", available), null);
  assert.equal(qoderCli.pickQoderAcpModelId("", available), null);
});

test(
  "ACP transport reuses one qodercli process, switches models and deletes sessions",
  { skip: !isPosix },
  async () => {
    await withFakeAgent(async (dir) => {
      const first = await qoderCli.runQoderCli({
        token: "pt-acp",
        prompt: "hi",
        stream: false,
        model: "qwen3.7-plus",
      });
      const second = await qoderCli.runQoderCli({
        token: "pt-acp",
        prompt: "hi",
        stream: false,
        model: "auto",
      });

      for (const run of [first, second]) {
        assert.equal(run.ok, true);
        assert.deepEqual(qoderCli.parseQoderCliResult(run.stdout), {
          text: "Hello world",
          isError: false,
          errorMessage: "",
        });
      }
      const spawns = readLines(dir, "spawns").map((line) => JSON.parse(line));
      assert.equal(spawns.length, 1);
      assert.equal(spawns[0].pat, "pt-acp");
      assert.deepEqual(spawns[0].argv.slice(0, 3), ["--acp", "--tools", ""]);
      assert.deepEqual(readLines(dir, "models"), ["qmodel"]);
      assert.deepEqual(readLines(dir, "deletes"), ["s1", "s2"]);
      assert.equal(acp.getQoderAcpProcessCount(), 1);
      assert.equal(concurrency.getQoderCliConcurrencyStats().active, 0);
    });
  }
);

test(
  "ACP transport cancels the session and returns promptly on client abort",
  { skip: !isPosix },
  async () => {
    await withFakeAgent(async (dir) => {
      const controller = new AbortController();
      const pending = qoderCli.runQoderCli({
        token: "pt-acp-abort",
        prompt: "SLOW",
        stream: false,
        model: "auto",
        signal: controller.signal,
      });
      while (readLines(dir, "slow").length === 0) await new Promise((r) => setTimeout(r, 20));
      const abortedAt = Date.now();
      controller.abort();
      const run = await pending;
      assert.ok(Date.now() - abortedAt < 2000);
      assert.equal(run.ok, false);
      assert.equal(run.error, "Aborted");
      assert.deepEqual(readLines(dir, "cancels"), ["s1"]);
      assert.deepEqual(readLines(dir, "deletes"), ["s1"]);
      assert.equal(concurrency.getQoderCliConcurrencyStats().active, 0);
    });
  }
);

test(
  "ACP transport deletes a session that finishes setup after the client aborted",
  { skip: !isPosix },
  async () => {
    await withFakeAgent(async (dir) => {
      const controller = new AbortController();
      const pending = qoderCli.runQoderCli({
        token: "pt-acp-early-abort",
        prompt: "hi",
        stream: false,
        model: "auto",
        signal: controller.signal,
      });
      while (readLines(dir, "spawns").length === 0) await new Promise((r) => setTimeout(r, 5));
      controller.abort();
      const run = await pending;
      assert.equal(run.error, "Aborted");
      assert.deepEqual(readLines(dir, "deletes"), ["s1"]);
      assert.equal(concurrency.getQoderCliConcurrencyStats().active, 0);
    });
  }
);

test("ACP transport denies agent permission requests", { skip: !isPosix }, async () => {
  await withFakeAgent(async (dir) => {
    const run = await qoderCli.runQoderCli({
      token: "pt-acp-perm",
      prompt: "PERM",
      stream: false,
      model: "auto",
    });
    assert.equal(run.ok, true);
    assert.equal(qoderCli.parseQoderCliResult(run.stdout).text, "denied ok");
    assert.deepEqual(
      readLines(dir, "permission").map((line) => JSON.parse(line)),
      [{ outcome: { outcome: "cancelled" } }]
    );
  });
});

test(
  "ACP transport surfaces a crashed qodercli and respawns it on the next request",
  { skip: !isPosix },
  async () => {
    await withFakeAgent(async (dir) => {
      const crashed = await qoderCli.runQoderCli({
        token: "pt-acp-exit",
        prompt: "EXIT",
        stream: false,
        model: "auto",
      });
      assert.equal(crashed.ok, false);
      assert.match(String(crashed.error), /exited/);

      const recovered = await qoderCli.runQoderCli({
        token: "pt-acp-exit",
        prompt: "hi",
        stream: false,
        model: "auto",
      });
      assert.equal(recovered.ok, true);
      assert.equal(readLines(dir, "spawns").length, 2);
    });
  }
);
