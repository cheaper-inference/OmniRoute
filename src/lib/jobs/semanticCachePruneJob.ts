import { pruneSemanticCache } from "../db/semanticCache";
import { getSemanticCachePruneConfig } from "./semanticCachePruneConfig";

let timer: NodeJS.Timeout | null = null;
let startupTimer: NodeJS.Timeout | null = null;
let running = false;

export function startSemanticCachePruneJob(prune = pruneSemanticCache) {
  if (timer) return timer;
  const config = getSemanticCachePruneConfig();
  if (config.intervalMs === 0) return null;

  const run = async () => {
    if (running) return;
    running = true;
    try {
      const { expiredDeleted, capDeleted } = await prune(config);
      if (expiredDeleted + capDeleted > 0) {
        console.log(`[SemanticCache] pruned expired=${expiredDeleted} cap=${capDeleted}`);
      }
    } catch (error) {
      console.error("[SemanticCache] Prune job failed:", error);
    } finally {
      running = false;
    }
  };

  startupTimer = setTimeout(() => {
    startupTimer = null;
    void run();
  }, 1000);
  startupTimer.unref?.();
  timer = setInterval(() => void run(), config.intervalMs);
  timer.unref?.();
  return timer;
}

/** Cancel pending timers; an in-flight bounded pass finishes without allowing overlap. */
export function stopSemanticCachePruneJob() {
  if (startupTimer) clearTimeout(startupTimer);
  if (timer) clearInterval(timer);
  startupTimer = null;
  timer = null;
}
