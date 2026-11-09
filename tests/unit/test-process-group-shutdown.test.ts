import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { once } from "node:events";
import test from "node:test";
import { createTestProcessStopper } from "../_helpers/stopTestProcess.ts";

function fixture(mode: string) {
  const child = fork(new URL("../fixtures/process-shutdown/child.mjs", import.meta.url), [mode], {
    execArgv: [],
    env: { PATH: "/usr/bin:/bin", LANG: "C.UTF-8" },
    stdio: ["ignore", "ignore", "ignore", "ipc"],
  });
  let closed = false;
  const close = once(child, "close").then(() => {
    closed = true;
  });
  const ready = once(child, "message");
  const stop = createTestProcessStopper(child, { graceMs: 20 });
  return {
    child,
    close,
    ready,
    stop,
    get closed() {
      return closed;
    },
  };
}

async function cleanup(value: ReturnType<typeof fixture>) {
  if (value.child.exitCode === null && value.child.signalCode === null) value.child.kill("SIGKILL");
  await value.close;
}

test(
  "tracked direct cleanup escalates ignored SIGTERM and awaits close",
  { timeout: 15_000 },
  async () => {
    const value = fixture("ignore");
    try {
      await value.ready;
      await value.stop();
      assert.equal(value.child.signalCode, "SIGKILL");
      assert.equal(value.closed, true);
    } finally {
      await cleanup(value);
    }
  }
);

test(
  "tracked direct cleanup preserves graceful exit and shares concurrent cleanup",
  { timeout: 15_000 },
  async () => {
    const value = fixture("graceful");
    try {
      await value.ready;
      const first = value.stop();
      const second = value.stop();
      assert.equal(first, second);
      await first;
      assert.equal(value.child.exitCode, 0);
      assert.equal(value.closed, true);
      assert.equal(value.stop(), first);
    } finally {
      await cleanup(value);
    }
  }
);
