import { fork } from "node:child_process";
import { installForkedWorkerDrain } from "../../_helpers/forkedTestWorkers.mjs";

if (process.argv[2] === "worker") {
  process.on("message", (message) => {
    if (message === "finish") process.disconnect();
  });
  process.send({ type: "ready" });
} else {
  if (process.argv[2] !== "silent") installForkedWorkerDrain();
  const children = new Map();
  async function release(slot) {
    const child = children.get(slot);
    if (!child) return;
    await new Promise((resolve) => {
      child.once("close", resolve);
      child.send("finish");
    });
    children.delete(slot);
  }
  process.on("message", async (message) => {
    if (message?.type !== "fixture-command") return;
    if (message.command === "spawn") {
      const child = fork(new URL(import.meta.url), ["worker"], {
        stdio: ["ignore", "ignore", "ignore", "ipc"],
      });
      children.set(message.slot, child);
      await new Promise((resolve) => child.once("message", resolve));
    } else if (message.command === "release") {
      await release(message.slot);
    } else if (message.command === "release-all") {
      await Promise.all([...children.keys()].map(release));
    } else if (message.command === "wrong-ack") {
      process.send({ type: "omniroute-test-workers-drained", id: "unrelated-request" });
    } else if (message.command === "disconnect") {
      process.disconnect();
      return;
    }
    process.send({ type: "fixture-complete", id: message.id });
  });
  process.send({ type: "ready" });
}
