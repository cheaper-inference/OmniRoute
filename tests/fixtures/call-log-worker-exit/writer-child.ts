// Child process for tests/unit/call-log-artifact-worker-exit.test.ts. It never closes the
// writer: the process has to exit by itself once its writes are done.
import { fileURLToPath } from "node:url";

import {
  __setCallLogWorkerOverrideForTests,
  writeCallArtifactAsync,
} from "../../../src/lib/usage/callLogArtifactWriter.ts";

__setCallLogWorkerOverrideForTests({
  workerFile: fileURLToPath(new URL("./slow-reply-worker.mjs", import.meta.url)),
  execArgv: [],
});

// The stand-in worker ignores the payload.
const artifact = {} as Parameters<typeof writeCallArtifactAsync>[0];

const first = await writeCallArtifactAsync(artifact);
console.log(`first ${first?.relPath}`);

// The worker is idle now. This timer keeps the process up just long enough to start a second
// write that nothing awaits; the process must still stay up for its reply.
setTimeout(() => {
  void writeCallArtifactAsync(artifact).then((result) => console.log(`second ${result?.relPath}`));
}, 100);
