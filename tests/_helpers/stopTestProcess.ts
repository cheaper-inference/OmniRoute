import type { ChildProcess } from "node:child_process";

export async function stopTestProcess(child: ChildProcess, graceMs = 5_000) {
  if (child.exitCode !== null || child.signalCode !== null || !child.pid) return;
  // `killed` only records successful signal delivery, not process termination.
  let onExit: () => void;
  const exited = new Promise<boolean>((resolve) => {
    onExit = () => resolve(true);
    child.once("exit", onExit);
  });
  async function waitForExit(ms: number) {
    let timer: NodeJS.Timeout;
    try {
      return await Promise.race([
        exited,
        new Promise<boolean>((resolve) => {
          timer = setTimeout(() => resolve(false), ms);
        }),
      ]);
    } finally {
      clearTimeout(timer!);
    }
  }
  try {
    child.kill("SIGTERM");
    if (await waitForExit(graceMs)) return;
    child.kill("SIGKILL");
    if (!(await waitForExit(5_000))) throw new Error(`Test process ${child.pid} did not exit`);
  } finally {
    child.off("exit", onExit!);
  }
}

/** Register immediately after spawn; this contract covers only the supplied ChildProcess. */
export function createTestProcessStopper(child: ChildProcess, { graceMs = 5_000 } = {}) {
  if (!child.pid || !Number.isSafeInteger(graceMs) || graceMs < 0 || graceMs > 2_147_478_647) {
    throw new Error("Invalid test process cleanup registration");
  }
  let closed = false;
  const close = new Promise<void>((resolve) => {
    child.once("close", () => {
      closed = true;
      resolve();
    });
  });
  let pending: Promise<void> | undefined;

  async function waitForClose() {
    if (closed) return true;
    let timer: NodeJS.Timeout;
    try {
      return await Promise.race([
        close.then(() => true),
        new Promise<boolean>((resolve) => {
          timer = setTimeout(() => resolve(false), graceMs + 5_000);
        }),
      ]);
    } finally {
      clearTimeout(timer!);
    }
  }

  async function stop() {
    // Neither branch is abandoned when its sibling fails. The close deadline runs
    // alongside the existing TERM grace + KILL wait rather than extending them.
    const [stopped, drained] = await Promise.allSettled([
      stopTestProcess(child, graceMs),
      waitForClose(),
    ]);
    if (stopped.status === "rejected") throw stopped.reason;
    if (drained.status === "rejected") throw drained.reason;
    if (!drained.value) throw new Error("Test process did not close before the cleanup deadline");
  }
  return () => (pending ||= stop());
}
