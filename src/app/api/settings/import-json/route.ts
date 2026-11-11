import { NextResponse } from "next/server";
import { getDbInstance } from "@/lib/db/core";
import { backupDbFile } from "@/lib/db/backup";
import { clearApiKeyCaches } from "@/lib/db/apiKeys";
import { invalidateDbCache } from "@/lib/db/readCache";
import {
  CREDENTIAL_IMPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { runJsonMigration, type LegacyJsonData } from "@/lib/db/jsonMigration";
import { getSettings } from "@/lib/db/settings";
import { setSystemPromptConfig } from "@omniroute/open-sse/services/systemPrompt.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { IMPORT_STRIPPED_SETTINGS_KEYS } from "@/shared/constants/securityImpactingSettings";
import { updateSettingsSchema } from "@/shared/validation/settingsSchemas";

const settingsKeySchema = updateSettingsSchema.partial();

/**
 * Drops the password (and any `currentPassword`), every key PATCH only accepts after password
 * re-auth, and the dashboard session state (`sessionsValidAfter`, `revokedDashboardSessions`).
 */
function stripSecurityImpactingSettings(settings: object): Record<string, unknown> {
  const stripped = new Set<string>(IMPORT_STRIPPED_SETTINGS_KEYS);
  const safeSettings: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(settings)) {
    if (stripped.has(key)) continue;
    // Spread and `Object.assign` route this key through the `__proto__` setter on
    // whichever engine compiles the copy, and the key is then lost before the
    // migration ever sees it. Keep it an own property here.
    if (key === "__proto__") {
      Object.defineProperty(safeSettings, key, {
        value,
        enumerable: true,
        writable: true,
        configurable: true,
      });
      continue;
    }
    safeSettings[key] = value;
  }
  return safeSettings;
}

/**
 * Validates each key on its own with the PATCH /api/settings schema. A key that fails is dropped
 * and named, so one bad value cannot poison the stored settings. Keys the schema does not know
 * (written by other routes, such as `tailscaleUrl`) are kept, as before.
 */
function dropInvalidSettings(settings: Record<string, unknown>) {
  const valid: Record<string, unknown> = {};
  const ignoredKeys: string[] = [];
  for (const [key, value] of Object.entries(settings)) {
    // Old backups store the Codex tier as a bare boolean. PATCH no longer accepts it, but
    // resolveCodexGlobalFastServiceTier still reads it, so keep it.
    if (key === "codexServiceTier" && typeof value === "boolean") {
      valid[key] = value;
      continue;
    }
    const parsed = settingsKeySchema.safeParse({ [key]: value });
    if (!parsed.success) {
      ignoredKeys.push(key);
      continue;
    }
    // Store what PATCH would store (coerced and trimmed). The schema strips keys it does not
    // know, so for those keep the value as sent.
    valid[key] = Object.hasOwn(parsed.data, key) ? parsed.data[key] : value;
  }
  return { valid, ignoredKeys };
}

/**
 * POST /api/settings/import-json
 *
 * Imports a legacy OmniRoute JSON backup into the current SQLite
 * database.  Accepts either multipart/form-data (file field) or a raw JSON body.
 *
 * 🔒 Operator-only: dashboard session, local CLI, or login disabled. The import replaces
 *    settings, connections and API keys, so API keys of any scope and `oma_` access tokens
 *    get 403 (same boundary as `GET /api/settings/export-json`).
 * 🔒 Zero-Trust: IMPORT_STRIPPED_SETTINGS_KEYS are stripped before insertion — the password
 *    and `currentPassword`, every key `PATCH /api/settings` only accepts after password
 *    re-auth (SECURITY_IMPACTING_SETTINGS_KEYS: requireLogin, the LOCAL_ONLY manage-scope
 *    bypass list/kill-switch, every OIDC key) and the dashboard session state — an import
 *    must not be a way around that re-auth, nor revive sessions a password change or a
 *    sign-out ended.
 * 🔒 A pre-import backup is created automatically before any data is written.
 */
export async function POST(request: Request) {
  const operatorVerdict = await requireOperatorCredential(request, {
    forbiddenMessage: CREDENTIAL_IMPORT_FORBIDDEN_MESSAGE,
  });
  if (operatorVerdict.ok === false) return operatorVerdict.response;

  try {
    let rawText: string | null = null;
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      if (!file) return NextResponse.json({ error: "No json file provided" }, { status: 400 });
      rawText = await file.text();
    } else {
      rawText = await request.text();
    }

    if (!rawText?.trim()) {
      return NextResponse.json({ error: "Empty request payload" }, { status: 400 });
    }

    // Parse with explicit 400 on malformed JSON (Gemini suggestion)
    let data: LegacyJsonData;
    try {
      data = JSON.parse(rawText) as LegacyJsonData;
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON: the file could not be parsed. Please upload a valid .json backup.",
        },
        { status: 400 }
      );
    }

    // 🔒 Zero-Trust: strip authentication + security-impacting config before migration
    let ignoredKeys: string[] = [];
    if (data.settings && typeof data.settings === "object") {
      const checked = dropInvalidSettings(stripSecurityImpactingSettings(data.settings));
      ignoredKeys = checked.ignoredKeys;
      data = { ...data, settings: checked.valid };
    }

    const db = getDbInstance();

    // Create a safety backup before writing anything
    backupDbFile("pre-json-import");

    // Delegate the actual migration to the shared helper (avoids duplication with core.ts)
    const counts = runJsonMigration(db, data);
    clearApiKeyCaches();
    invalidateDbCache();

    // Re-hydrate the in-memory Global System Prompt config — the migration writes it to
    // the DB but the in-memory state would stay stale until a restart otherwise (#2470).
    const importedSettings = await getSettings();
    if (importedSettings.systemPrompt) {
      setSystemPromptConfig(importedSettings.systemPrompt);
    }

    console.log(
      `[JSON Import] Imported ${counts.connections} connections, ${counts.nodes} nodes, ` +
        `${counts.combos} combos, ${counts.apiKeys} API keys, ` +
        `${counts.usageHistory} usage rows, ${counts.domainCostHistory} cost rows, ` +
        `${counts.domainBudgets} budgets`
    );

    return NextResponse.json({
      success: true,
      message: "Legacy JSON database imported successfully",
      ...counts,
      ...(ignoredKeys.length > 0 ? { ignoredKeys } : {}),
    });
  } catch (err) {
    console.error("[API] Error importing JSON backup:", err);
    return NextResponse.json(
      { error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)) },
      { status: 500 }
    );
  }
}
