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
  // Opt-in, default OFF. Backed by the OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES feature flag
  // (resolver precedence: DB/dashboard-toggle override > env > default "false"), so a
  // provider model sync never silently writes ~/.claude/profiles/<name>/settings.json
  // unless the operator turned it on — via the providers-dashboard toggle or the env var.
  return isFeatureFlagEnabled("OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES");
}

export async function autoSyncClaudeProfilesFromLiveCatalog(
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
  const { models, baseUrl: internalBase } = catalog;

  // Claude Code has no flat config file; its per-tool config lives at ~/.claude/settings.json,
  // so getCliConfigPaths("claude") exposes `settings` (NOT `config`). The profiles are written
  // under <claudeHome>/profiles/<name>/settings.json, where claudeHome = dirname(settings).
  const claudePaths = getCliConfigPaths("claude");
  if (!claudePaths?.settings) {
    return { ok: false, skipped: true, reason: "claude_config_path_unavailable" };
  }
  const claudeHome = path.dirname(claudePaths.settings);

  // Each generated profile points ANTHROPIC_BASE_URL at the OmniRoute this server serves.
  // Strip a trailing /v1 (Claude Code appends the version segment itself).
  const profileBaseUrl = internalBase.replace(/\/v1$/, "");

  // Reuse the CLI generator so automatic sync and `omniroute setup-claude` stay
  // behaviorally identical.
  // @ts-ignore - bin CLI modules are shipped as ESM JavaScript, without TS declarations.
  const { syncClaudeProfilesFromModels } =
    await import("../../../bin/cli/commands/setup-claude.mjs");
  const result = await syncClaudeProfilesFromModels(models, {
    claudeHome,
    baseUrl: profileBaseUrl,
  });

  return {
    ok: true,
    written: result.written,
    skipped: result.skipped,
    reason,
  };
}
