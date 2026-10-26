import path from "node:path";
import { ensureCliConfigWriteAllowed, getCliConfigPaths } from "../../shared/services/cliRuntime";
import { loadProfileCatalog } from "./profileCatalog";
import { isFeatureFlagEnabled } from "../../shared/utils/featureFlags";

type SyncResult =
  | {
      ok: true;
      written: number;
      skipped: number;
      reason: string;
    }
  | {
      ok: false;
      skipped: true;
      reason: string;
    };

function isAutoSyncEnabled() {
  // Opt-in, default OFF. Backed by the OMNIROUTE_AUTO_SYNC_CODEX_PROFILES feature flag
  // (resolver precedence: DB/dashboard-toggle override > env > default "false"), so a
  // provider model sync never silently writes ~/.codex/*.config.toml unless the operator
  // turned it on — via the providers-dashboard toggle or the env var.
  return isFeatureFlagEnabled("OMNIROUTE_AUTO_SYNC_CODEX_PROFILES");
}

export async function autoSyncCodexProfilesFromLiveCatalog(
  request: Request,
  reason: string
): Promise<SyncResult> {
  if (!isAutoSyncEnabled()) {
    return { ok: false, skipped: true, reason: "disabled" };
  }

  const writeGuard = ensureCliConfigWriteAllowed();
  if (writeGuard) {
    return { ok: false, skipped: true, reason: writeGuard };
  }

  const catalog = await loadProfileCatalog(request);
  if (catalog.ok === false) {
    return { ok: false, skipped: true, reason: catalog.reason };
  }
  const { models } = catalog;
  const codexPaths = getCliConfigPaths("codex");
  if (!codexPaths?.config) {
    return { ok: false, skipped: true, reason: "codex_config_path_unavailable" };
  }
  const codexHome = path.dirname(codexPaths.config);

  // Reuse the CLI generator so automatic sync and `omniroute setup-codex`
  // stay behaviorally identical.
  // @ts-ignore - bin CLI modules are shipped as ESM JavaScript, without TS declarations.
  const { syncCodexProfilesFromModels } = await import("../../../bin/cli/commands/setup-codex.mjs");
  const result = await syncCodexProfilesFromModels(models, { codexHome });

  return {
    ok: true,
    written: result.written,
    skipped: result.skipped,
    reason,
  };
}
