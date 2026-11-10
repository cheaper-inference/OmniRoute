import { isMainThread } from "node:worker_threads";
import { startCacheDiagnostics } from "./cacheDiagnostics.mjs";
if (isMainThread) {
  const observer = startCacheDiagnostics();
  process.once("beforeExit", () => {
    void observer.stop();
  });
}
