import { seedVerifiedCodexClientVersion } from "@omniroute/open-sse/config/codexClient.ts";
import { seedVerifiedClaudeCodeClientVersion } from "@/shared/constants/claudeCodeClient";
import { createLogger } from "@/shared/utils/logger";
import { invalidate } from "./batchStatusCache";
import type { ManagedCliRuntimeItem } from "./managedCliRuntimes";

const log = createLogger("managed-cli-effects");

export interface ManagedCliUpdateEffects {
  runtimeCacheInvalidated: boolean;
  clientVersionRefreshed: boolean;
}

/** Installation remains successful when an ancillary cache refresh cannot be completed. */
export function applyManagedCliUpdateEffects(item: ManagedCliRuntimeItem): ManagedCliUpdateEffects {
  invalidate(item.id);
  const effects = { runtimeCacheInvalidated: true, clientVersionRefreshed: false };
  if (item.source !== "managed" || !item.runnable || !item.installedVersion) return effects;
  try {
    if (item.id === "codex") {
      seedVerifiedCodexClientVersion(item.installedVersion);
      effects.clientVersionRefreshed = true;
    } else if (item.id === "claude") {
      seedVerifiedClaudeCodeClientVersion(item.installedVersion);
      effects.clientVersionRefreshed = true;
    }
    log.debug({ toolId: item.id, ...effects }, "Refreshed managed CLI runtime caches");
  } catch {
    log.warn(
      { toolId: item.id },
      "CLI updated but its provider client cache could not be refreshed"
    );
  }
  return effects;
}
