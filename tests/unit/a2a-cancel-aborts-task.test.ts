/**
 * Cancelling an A2A task must tell the running work to stop, and work that finishes anyway must
 * get a cancellation result. Before, cancelTask only flipped the state: the handler kept running,
 * and when it finished, updateTask threw "Invalid transition: cancelled → completed" (or, for a
 * failure, the route's own error path threw and the request ended with a 500).
 *
 * Uses a fake persistence object — no SQLite, no DATA_DIR.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { A2ATaskManager, type A2APersistence } from "../../src/lib/a2a/taskManager.ts";

const persistence: A2APersistence = {
  upsert: (() => {}) as A2APersistence["upsert"],
  appendEvent: (() => {}) as A2APersistence["appendEvent"],
  purge: (() => 0) as A2APersistence["purge"],
};

const managers: A2ATaskManager[] = [];
function newManager() {
  const tm = new A2ATaskManager(5, persistence);
  managers.push(tm);
  return tm;
}

function newWorkingTask(tm: A2ATaskManager) {
  const task = tm.createTask({ skill: "smart-routing", messages: [] });
  tm.updateTask(task.id, "working");
  return task;
}

test.afterEach(() => {
  while (managers.length > 0) managers.pop()?.destroy();
});

test("cancelTask aborts the signal that the running work holds", () => {
  const tm = newManager();
  const task = newWorkingTask(tm);
  const signal = tm.getTaskSignal(task.id);

  assert.ok(signal, "a live task has a signal");
  assert.equal(signal.aborted, false);
  tm.cancelTask(task.id);
  assert.equal(signal.aborted, true);
});

test("a cancelled state set through updateTask aborts the signal too", () => {
  const tm = newManager();
  const task = newWorkingTask(tm);
  const signal = tm.getTaskSignal(task.id);

  tm.updateTask(task.id, "cancelled");
  assert.equal(signal?.aborted, true);
});

test("a task that completes does not abort its signal", () => {
  const tm = newManager();
  const task = newWorkingTask(tm);
  const signal = tm.getTaskSignal(task.id);

  tm.updateTask(task.id, "completed");
  assert.equal(signal?.aborted, false);
  assert.equal(
    tm.getTaskSignal(task.id),
    undefined,
    "a finished task no longer hands out a signal"
  );
});

test("work that completes after a cancel gets a cancellation error and no artifacts", () => {
  const tm = newManager();
  const task = newWorkingTask(tm);
  tm.cancelTask(task.id);

  assert.throws(
    () => tm.updateTask(task.id, "completed", [{ type: "text", content: "late" }]),
    (err: Error) => /cancelled/i.test(err.message) && !/Invalid transition/.test(err.message)
  );
  assert.equal(tm.getTask(task.id)?.state, "cancelled");
  assert.deepEqual(tm.getTask(task.id)?.artifacts, []);
});

test("work that fails after a cancel is ignored and the task stays cancelled", () => {
  const tm = newManager();
  const task = newWorkingTask(tm);
  tm.cancelTask(task.id);
  const eventsBefore = tm.getTask(task.id)?.events.length;

  assert.doesNotThrow(() => tm.updateTask(task.id, "failed", undefined, "boom"));
  assert.equal(tm.getTask(task.id)?.state, "cancelled");
  assert.equal(tm.getTask(task.id)?.events.length, eventsBefore);
});

test("a task that already failed still rejects an unrelated transition", () => {
  const tm = newManager();
  const task = newWorkingTask(tm);
  tm.updateTask(task.id, "failed");

  assert.throws(() => tm.updateTask(task.id, "working"), /Invalid transition: failed → working/);
});
