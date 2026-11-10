/**
 * Cancelling a smart-routing A2A task must stop its upstream /v1/chat/completions call.
 * The task manager aborts a per-task signal on cancel; the skill has to hand that signal to
 * fetch, otherwise the call runs on until the 30 s timeout.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

// Keep the task manager's persistence away from a real user database.
import "../_setup/isolateDataDir.ts";

const { getTaskManager } = await import("../../src/lib/a2a/taskManager.ts");
const { executeSmartRouting } = await import("../../src/lib/a2a/skills/smartRouting.ts");

const completion = { choices: [{ message: { content: "done" } }], model: "m", provider: "p" };

test("cancelling a smart-routing task aborts its upstream fetch", async () => {
  const original = globalThis.fetch;
  let fetchSignal: AbortSignal | null | undefined;
  let started!: () => void;
  const fetchStarted = new Promise<void>((resolve) => (started = resolve));
  // Replies after a short delay unless the caller aborts first, so a missing wiring fails
  // an assertion instead of hanging until the 30 s timeout.
  globalThis.fetch = ((_input: RequestInfo | URL, init?: RequestInit) => {
    fetchSignal = init?.signal;
    started();
    return new Promise<Response>((resolve, reject) => {
      const timer = setTimeout(() => resolve(Response.json(completion)), 100);
      init?.signal?.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(init.signal?.reason);
      });
    });
  }) as typeof globalThis.fetch;

  try {
    const tm = getTaskManager();
    const task = tm.createTask({
      skill: "smart-routing",
      messages: [{ role: "user", content: "hi" }],
    });
    tm.updateTask(task.id, "working");

    const running = executeSmartRouting(task);
    const outcome = running.then(
      () => "completed",
      () => "aborted"
    );
    await fetchStarted;
    tm.cancelTask(task.id);

    assert.equal(fetchSignal?.aborted, true, "the upstream fetch signal was not aborted");
    assert.equal(await outcome, "aborted");
  } finally {
    globalThis.fetch = original;
  }
});
