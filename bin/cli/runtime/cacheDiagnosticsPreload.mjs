import { isMainThread } from "node:worker_threads";
import { startCacheDiagnostics } from "./cacheDiagnostics.mjs";
if (isMainThread) {
  const observer = startCacheDiagnostics();
  // Join the gateway's shutdown owner before it calls process.exit().
  globalThis.__omnirouteStopCacheDiagnostics = () => observer.stop();
  process.once("beforeExit", () => {
    void observer.stop();
  });
}
