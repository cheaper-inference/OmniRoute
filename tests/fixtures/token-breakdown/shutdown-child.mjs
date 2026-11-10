import { requestGracefulShutdown } from "../../../src/lib/gracefulShutdown.ts";
import { runtimeDiagnosticsLog } from "../../../bin/cli/runtime/runtimeDiagnosticsLog.mjs";

// The server owner exits explicitly after awaiting application cleanup.
await requestGracefulShutdown("synthetic-shutdown");
runtimeDiagnosticsLog("INFO", "Synthetic application shutdown completed");
process.exit(0);
