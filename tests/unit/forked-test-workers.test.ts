import assert from "node:assert/strict";
import { fork, type ChildProcess } from "node:child_process";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import test from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { drainTestWorkers } from "../_helpers/forkedTestWorkers.mjs";
import { stopTestProcess } from "../_helpers/stopTestProcess.ts";

async function startFixture(mode = "tracked") {
  const child = fork(new URL("../fixtures/batch/fork-drain.mjs", import.meta.url), [mode], {
    stdio: ["ignore", "ignore", "ignore", "ipc"],
  });
  await once(child, "message");
  return child;
}

async function command(child: ChildProcess, name: string, slot = "") {
  const id = randomUUID();
  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => finish(new Error("Fixture command timed out")), 5_000);
    function finish(error?: Error) {
      clearTimeout(timer);
      child.off("message", onMessage);
      if (error) reject(error);
      else resolve();
    }
    function onMessage(message: { type?: string; id?: string }) {
      if (message?.type === "fixture-complete" && message.id === id) finish();
    }
    child.on("message", onMessage);
    child.send({ type: "fixture-command", command: name, slot, id }, (error) => {
      if (error) finish(error);
    });
  });
}

test("worker drain waits for every real child, including forks added while waiting", async () => {
  const child = await startFixture();
  let drained = false;
  try {
    await command(child, "spawn", "first");
    await command(child, "spawn", "second");
    const pending = drainTestWorkers(child).then(() => {
      drained = true;
    });
    await command(child, "wrong-ack");
    await command(child, "release", "first");
    await delay(25);
    assert.equal(drained, false, "One closed child and an unrelated reply cannot finish the drain");
    await command(child, "spawn", "late");
    await command(child, "release", "second");
    await delay(25);
    assert.equal(drained, false, "A child forked during the drain must also close");
    await command(child, "release", "late");
    await pending;
    assert.equal(drained, true);
    assert.equal(child.listenerCount("message"), 0);
  } finally {
    await command(child, "release-all");
    await stopTestProcess(child);
  }
});

test("worker drain times out without weakening cleanup and can be retried after close", async () => {
  const child = await startFixture();
  try {
    await command(child, "spawn", "held");
    await assert.rejects(drainTestWorkers(child, 50), /did not close before the drain deadline/);
    assert.equal(child.listenerCount("message"), 0, "Timed out requests remove their listeners");
    await command(child, "release-all");
    await drainTestWorkers(child);
  } finally {
    await command(child, "release-all");
    await stopTestProcess(child);
  }
});

test("worker drain acknowledges a server with no forked children", async () => {
  const child = await startFixture();
  try {
    await drainTestWorkers(child);
    assert.equal(child.listenerCount("message"), 0);
  } finally {
    await stopTestProcess(child);
  }
});

test("a server disconnect before acknowledgment fails the drain", async () => {
  const child = await startFixture("silent");
  try {
    const rejected = assert.rejects(drainTestWorkers(child), /before acknowledging/);
    child.send({ type: "fixture-command", command: "disconnect", id: randomUUID() });
    await rejected;
    await assert.rejects(drainTestWorkers(child), /exited before draining/);
  } finally {
    await stopTestProcess(child);
  }
});
