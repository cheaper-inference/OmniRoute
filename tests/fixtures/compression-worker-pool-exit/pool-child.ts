// Child process for tests/unit/compression/compression-worker-pool-exit.test.ts. It never closes
// the pool: the process has to exit by itself once its jobs are done.
import { Worker } from "node:worker_threads";

import { CompressionWorkerPool } from "../../../open-sse/services/compression/compressionWorkerPool.ts";

const workerFile = new URL("./slow-reply-worker.mjs", import.meta.url);
// idleMs is pinned to the 60 s default so OMNI_COMPRESSION_WORKER_IDLE_MS cannot shorten it: an
// idle worker that still held the process would then outlive the parent test's 25 s timeout.
const pool = new CompressionWorkerPool({
  size: 1,
  idleMs: 60_000,
  workerFactory: () => new Worker(workerFile),
});

const first = await pool.run({ job: "first" }, "stacked");
console.log(`first ${first.body.job}`);

// The worker is idle now. This timer keeps the process up just long enough to start a second
// job that nothing awaits; the process must still stay up for its reply.
setTimeout(() => {
  void pool.run({ job: "second" }, "stacked").then((result) => {
    console.log(`second ${result.body.job}`);
  });
}, 100);
