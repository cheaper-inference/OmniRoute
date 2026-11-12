import childProcess from "node:child_process";
import { randomUUID } from "node:crypto";
import { syncBuiltinESMExports } from "node:module";
import { fileURLToPath } from "node:url";

const REQUEST = "omniroute-test-drain-workers";
const RESPONSE = "omniroute-test-workers-drained";

// Development requests can return before Next's static-path workers close. Track
// their real ChildProcess handles so teardown does not orphan a late worker.
export function installForkedWorkerDrain() {
  const fork = childProcess.fork;
  const children = new Set();
  const requests = new Set();
  let scheduled = false;

  function acknowledgeWhenEmpty() {
    if (scheduled || children.size || !requests.size) return;
    scheduled = true;
    setImmediate(() => {
      scheduled = false;
      if (children.size || !process.connected) return;
      for (const id of requests) process.send({ type: RESPONSE, id });
      requests.clear();
    });
  }

  childProcess.fork = function (...args) {
    const child = Reflect.apply(fork, childProcess, args);
    children.add(child);
    child.once("close", () => {
      children.delete(child);
      acknowledgeWhenEmpty();
    });
    return child;
  };
  syncBuiltinESMExports();
  process.on("message", (message) => {
    if (message?.type !== REQUEST || typeof message.id !== "string") return;
    requests.add(message.id);
    acknowledgeWhenEmpty();
  });
}

/** Wait for the server's owned forked workers; an absent acknowledgment is a failure. */
export function drainTestWorkers(child, timeoutMs = 30_000) {
  return new Promise((resolve, reject) => {
    if (!child.connected || child.exitCode !== null || child.signalCode !== null) {
      reject(new Error("Test server exited before draining its workers"));
      return;
    }
    const id = randomUUID();
    let settled = false;
    const timer = setTimeout(
      () => finish(new Error("Test server workers did not close before the drain deadline")),
      timeoutMs
    );
    function finish(error) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.off("message", onMessage);
      child.off("exit", onExit);
      child.off("disconnect", onExit);
      if (error) reject(error);
      else resolve();
    }
    function onMessage(message) {
      if (message?.type === RESPONSE && message.id === id) finish();
    }
    function onExit() {
      finish(new Error("Test server exited before acknowledging its worker drain"));
    }
    child.on("message", onMessage);
    child.once("exit", onExit);
    child.once("disconnect", onExit);
    child.send({ type: REQUEST, id }, (error) => {
      if (error) finish(new Error("Cannot request the test server worker drain"));
    });
  });
}

// fork() inherits execArgv. Never install this IPC handler in a Next worker,
// whose IPC channel belongs to Next/Jest rather than to the integration test.
if (
  process.argv[1] === fileURLToPath(new URL("../../scripts/dev/run-next.mjs", import.meta.url)) &&
  typeof process.send === "function"
) {
  installForkedWorkerDrain();
}
