import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  acquireSharedAgent,
  closeAllSharedAgents,
  closeSharedAgent,
  contentText,
  releaseSharedAgent,
  runMinimaxCodeAcpTurn,
  sharedAgentCount,
} from "../../open-sse/executors/minimaxCodeAcp.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const FAKE = join(HERE, "..", "fixtures", "fake-mcode-acp.mjs");

const options = (name: string) => ({
  command: process.execPath,
  args: [FAKE],
  cwd: HERE,
  dataDir: `/tmp/minimax-code-shared-agent-test-${name}`,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pidFile = (name: string) => `/tmp/minimax-code-shared-agent-test-${name}.pid`;

function readPid(name: string): number {
  const path = pidFile(name);
  if (!existsSync(path)) return 0;
  const pid = Number(readFileSync(path, "utf8").trim());
  return Number.isFinite(pid) ? pid : 0;
}

function alive(pid: number): boolean {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

test("the shared agent is reused across turns", async () => {
  await closeAllSharedAgents();
  const first = await runMinimaxCodeAcpTurn({
    command: process.execPath,
    args: [FAKE],
    cwd: HERE,
    prompt: "hello",
    model: "MiniMax-M3.1-Flash",
    timeoutMs: 30_000,
    dataDir: options("reuse").dataDir,
  });
  assert.equal(first, "works");
  assert.equal(sharedAgentCount(), 1, "the turn must not start a second agent");

  const second = await runMinimaxCodeAcpTurn({
    command: process.execPath,
    args: [FAKE],
    cwd: HERE,
    prompt: "hello again",
    model: "MiniMax-M3.1-Flash",
    timeoutMs: 30_000,
    dataDir: options("reuse").dataDir,
  });
  assert.equal(second, "works");
  assert.equal(sharedAgentCount(), 1, "the second turn must reuse the running agent");

  await closeAllSharedAgents();
  assert.equal(sharedAgentCount(), 0);
});

test("parallel turns share one agent", async () => {
  await closeAllSharedAgents();
  const results = await Promise.all(
    Array.from({ length: 5 }, (_, index) =>
      runMinimaxCodeAcpTurn({
        command: process.execPath,
        args: [FAKE],
        cwd: HERE,
        prompt: `hello ${index}`,
        model: "MiniMax-M3.1-Flash",
        timeoutMs: 30_000,
        dataDir: options("parallel").dataDir,
      })
    )
  );
  assert.deepEqual(results, ["works", "works", "works", "works", "works"]);
  assert.equal(sharedAgentCount(), 1, "five parallel turns must share one agent");
  await closeAllSharedAgents();
});

test("a dead agent is replaced instead of reused", async () => {
  await closeAllSharedAgents();
  const client = await acquireSharedAgent(options("dead"));
  await client.close();
  await sleep(50);
  const next = await acquireSharedAgent(options("dead"));
  assert.notEqual(next, client, "a dead agent must not be handed out again");
  releaseSharedAgent(next, options("dead"));
  await closeAllSharedAgents();
});

test("an idle agent is closed after the idle timeout", async () => {
  await closeAllSharedAgents();
  const settings = { ...options("idle"), idleTimeoutMs: 50 };
  const client = await acquireSharedAgent(settings);
  releaseSharedAgent(client, settings);
  await sleep(200);
  assert.equal(sharedAgentCount(), 0, "the idle agent must be closed");
});

test("closing a shared agent drops it from the registry", async () => {
  await closeAllSharedAgents();
  const client = await acquireSharedAgent(options("close"));
  assert.equal(sharedAgentCount(), 1);
  await closeSharedAgent(
    `${options("close").command}|${options("close").args.join(" ")}|${options("close").cwd}|${options("close").dataDir}`
  );
  assert.equal(sharedAgentCount(), 0);
  releaseSharedAgent(client, options("close"));
});

test("the content of an update is read as text", () => {
  assert.equal(contentText({ type: "text", text: "works" }), "works");
  assert.equal(contentText([{ text: "a" }, { text: "b" }]), "ab");
  assert.equal(contentText(undefined), "");
});

test("a missing binary fails the request instead of crashing the process", async () => {
  await closeAllSharedAgents();
  const broken = {
    command: join("/tmp", "minimax-code-does-not-exist-xyz"),
    args: ["acp"],
    cwd: HERE,
    dataDir: "/tmp/minimax-code-shared-agent-test-missing",
  };
  await assert.rejects(
    () => acquireSharedAgent(broken),
    /could not start|ENOENT|not found/i,
    "a spawn failure must reject the request, not take the process down"
  );
  assert.equal(sharedAgentCount(), 0, "a failed start must not stay in the registry");
});

test("a failed start leaves no agent process behind", async () => {
  await closeAllSharedAgents();
  const name = "init-fail";
  const file = pidFile(name);
  rmSync(file, { force: true });
  process.env.FAKE_ACP_INIT_FAIL = "no init for you";
  process.env.FAKE_ACP_PID_FILE = file;
  try {
    const broken = { ...options(name), startupTimeoutMs: 5_000 };
    await assert.rejects(() => acquireSharedAgent(broken), /no init for you/);
    assert.equal(sharedAgentCount(), 0);
    const pid = readPid(name);
    assert.ok(pid > 0, "the agent must have started before it failed");
    await sleep(300);
    assert.equal(alive(pid), false, "the failed agent process must be reaped");
  } finally {
    delete process.env.FAKE_ACP_INIT_FAIL;
    delete process.env.FAKE_ACP_PID_FILE;
    rmSync(file, { force: true });
  }
});

test("an abort before the session exists ends the request", async () => {
  await closeAllSharedAgents();
  const name = "abort-session";
  process.env.FAKE_ACP_SESSION_DELAY_MS = "3000";
  const controller = new AbortController();
  try {
    const turn = runMinimaxCodeAcpTurn({
      command: process.execPath,
      args: [FAKE],
      cwd: HERE,
      prompt: "hello",
      model: "MiniMax-M3.1-Flash",
      timeoutMs: 30_000,
      dataDir: options(name).dataDir,
      signal: controller.signal,
    });
    setTimeout(() => controller.abort(), 200);
    await assert.rejects(() => turn, /aborted/);
  } finally {
    delete process.env.FAKE_ACP_SESSION_DELAY_MS;
    await closeAllSharedAgents();
  }
});

test("an abort during the turn settles the request at once", async () => {
  await closeAllSharedAgents();
  const name = "abort-turn";
  process.env.FAKE_ACP_PROMPT_DELAY_MS = "5000";
  const controller = new AbortController();
  try {
    const started = Date.now();
    const turn = runMinimaxCodeAcpTurn({
      command: process.execPath,
      args: [FAKE],
      cwd: HERE,
      prompt: "hello",
      model: "MiniMax-M3.1-Flash",
      timeoutMs: 30_000,
      dataDir: options(name).dataDir,
      signal: controller.signal,
    });
    setTimeout(() => controller.abort(), 300);
    await assert.rejects(() => turn, /aborted/);
    const elapsed = Date.now() - started;
    assert.ok(elapsed < 3000, `an aborted turn must not wait for its timeout (${elapsed} ms)`);
  } finally {
    delete process.env.FAKE_ACP_PROMPT_DELAY_MS;
    await closeAllSharedAgents();
  }
});

test("the answer is streamed chunk by chunk", async () => {
  await closeAllSharedAgents();
  const name = "streaming";
  process.env.FAKE_ACP_TEXT = "Hello, world!";
  process.env.FAKE_ACP_CHUNKS = "4";
  const deltas: string[] = [];
  try {
    const answer = await runMinimaxCodeAcpTurn({
      command: process.execPath,
      args: [FAKE],
      cwd: HERE,
      prompt: "hello",
      model: "MiniMax-M3.1-Flash",
      timeoutMs: 30_000,
      dataDir: options(name).dataDir,
      onDelta: (delta) => deltas.push(delta),
    });
    assert.equal(answer, "Hello, world!");
    assert.equal(deltas.length, 4, "every chunk must reach the client as it arrives");
    assert.equal(deltas.join(""), "Hello, world!");
  } finally {
    delete process.env.FAKE_ACP_TEXT;
    delete process.env.FAKE_ACP_CHUNKS;
    await closeAllSharedAgents();
  }
});

test("the idle timer of a dead agent does not close its replacement", async () => {
  await closeAllSharedAgents();
  const name = "stale-timer";
  const file = pidFile(name);
  rmSync(file, { force: true });
  process.env.FAKE_ACP_PID_FILE = file;
  const settings = { ...options(name), idleTimeoutMs: 150 };
  try {
    const first = await acquireSharedAgent(settings);
    releaseSharedAgent(first, settings);
    const pid = readPid(name);
    assert.ok(pid > 0);
    process.kill(pid, "SIGTERM");
    await sleep(100);
    const second = await acquireSharedAgent(settings);
    assert.notEqual(second, first);
    // The idle timer of the dead agent fires here and must not close the agent
    // that replaced it.
    await sleep(400);
    assert.equal(second.running, true, "the replacement agent must still be alive");
    assert.equal(sharedAgentCount(), 1, "the replacement agent must stay in the registry");
    releaseSharedAgent(second, settings);
  } finally {
    delete process.env.FAKE_ACP_PID_FILE;
    rmSync(file, { force: true });
    await closeAllSharedAgents();
  }
});

test("the late exit of a replaced agent does not drop the new one", async () => {
  await closeAllSharedAgents();
  const name = "late-exit";
  const file = pidFile(name);
  rmSync(file, { force: true });
  process.env.FAKE_ACP_PID_FILE = file;
  const settings = options(name);
  try {
    const first = await acquireSharedAgent(settings);
    const pid = readPid(name);
    assert.ok(pid > 0);
    process.kill(pid, "SIGTERM");
    await sleep(100);
    const second = await acquireSharedAgent(settings);
    assert.notEqual(second, first);
    // The exit of the first agent is delivered after the second one exists.
    await sleep(200);
    assert.equal(sharedAgentCount(), 1, "the late exit must not drop the new agent");
    const answer = await runMinimaxCodeAcpTurn({
      command: process.execPath,
      args: [FAKE],
      cwd: HERE,
      prompt: "hello",
      model: "MiniMax-M3.1-Flash",
      timeoutMs: 30_000,
      dataDir: settings.dataDir,
    });
    assert.equal(answer, "works");
    releaseSharedAgent(second, settings);
  } finally {
    delete process.env.FAKE_ACP_PID_FILE;
    rmSync(file, { force: true });
    await closeAllSharedAgents();
  }
});
