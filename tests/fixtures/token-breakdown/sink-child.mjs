import { createCacheDiagnosticsSink } from "../../../bin/cli/runtime/cacheDiagnosticsSink.mjs";
const sink = createCacheDiagnosticsSink(process.argv[2]);
sink.write({ event: "synthetic_child" });
process.send({ file: sink.file });
process.once("message", async () => {
  sink.write({ event: "synthetic_close" });
  await sink.close();
  process.disconnect();
});
