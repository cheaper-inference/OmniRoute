import { after, test } from "node:test";
import assert from "node:assert/strict";
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

const OPTIONS = {
  command: process.execPath,
  args: [FAKE],
  cwd: HERE,
  dataDir: "/tmp/minimax-code-shared-agent-test",
};

after(async () => {
  await closeAllSharedAgents();
});

test("the shared agent is reused across turns", async () => {
  await closeAllSharedAgents();
  const first = await runMinimaxCodeAcpTurn({
    command: OPTIONS.command,
    args: OPTIONS.args,
    cwd: OPTIONS.cwd,
    prompt: "hello",
    model: "MiniMax-M3.1-Flash",
    timeoutMs: 30_000,
    dataDir: OPTIONS.dataDir,
  });
  assert.equal(first, "works");
  assert.equal(sharedAgentCount(), 1, "the turn must not start a second agent");

  const second = await runMinimaxCodeAcpTurn({
    command: OPTIONS.command,
    args: OPTIONS.args,
    cwd: OPTIONS.cwd,
    prompt: "hello again",
    model: "MiniMax-M3.1-Flash",
    timeoutMs: 30_000,
    dataDir: OPTIONS.dataDir,
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
        command: OPTIONS.command,
        args: OPTIONS.args,
        cwd: OPTIONS.cwd,
        prompt: `hello ${index}`,
        model: "MiniMax-M3.1-Flash",
        timeoutMs: 30_000,
        dataDir: OPTIONS.dataDir,
      })
    )
  );
  assert.deepEqual(results, ["works", "works", "works", "works", "works"]);
  assert.equal(sharedAgentCount(), 1, "five parallel turns must share one agent");
  await closeAllSharedAgents();
});

test("a dead agent is replaced instead of reused", async () => {
  await closeAllSharedAgents();
  const client = await acquireSharedAgent(OPTIONS);
  await client.close();
  await new Promise((resolve) => setTimeout(resolve, 50));
  const next = await acquireSharedAgent(OPTIONS);
  assert.notEqual(next, client, "a dead agent must not be handed out again");
  releaseSharedAgent(next, OPTIONS);
  await closeAllSharedAgents();
});

test("an idle agent is closed after the idle timeout", async () => {
  await closeAllSharedAgents();
  const options = { ...OPTIONS, idleTimeoutMs: 50 };
  const client = await acquireSharedAgent(options);
  releaseSharedAgent(client, options);
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.equal(sharedAgentCount(), 0, "the idle agent must be closed");
});

test("closing a shared agent drops it from the registry", async () => {
  await closeAllSharedAgents();
  const client = await acquireSharedAgent(OPTIONS);
  assert.equal(sharedAgentCount(), 1);
  await closeSharedAgent(
    `${OPTIONS.command}|${OPTIONS.args.join(" ")}|${OPTIONS.cwd}|${OPTIONS.dataDir}`
  );
  assert.equal(sharedAgentCount(), 0);
  releaseSharedAgent(client, OPTIONS);
});

test("the content of an update is read as text", () => {
  assert.equal(contentText({ type: "text", text: "works" }), "works");
  assert.equal(contentText([{ text: "a" }, { text: "b" }]), "ab");
  assert.equal(contentText(undefined), "");
});
