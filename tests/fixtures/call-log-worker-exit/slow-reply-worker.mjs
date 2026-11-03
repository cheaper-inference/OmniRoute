// Stand-in call-log artifact worker for tests/unit/call-log-artifact-worker-exit.test.ts. It
// speaks the writer's protocol and replies after a delay, so each write is in flight for a while.
import { parentPort } from "node:worker_threads";

parentPort.on("message", ({ id }) => {
  setTimeout(() => {
    parentPort.postMessage({ id, result: { relPath: `reply-${id}`, sizeBytes: 0, sha256: "" } });
  }, 300);
});
