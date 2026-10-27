// Stand-in compression worker for tests/unit/compression/compression-worker-pool-exit.test.ts. It
// speaks the pool's protocol and replies after a delay, so each job is in flight for a while.
import { parentPort } from "node:worker_threads";

parentPort.on("message", ({ id, body }) => {
  setTimeout(() => {
    parentPort.postMessage({
      type: "result",
      id,
      result: { body, compressed: false, stats: null },
    });
  }, 300);
});
