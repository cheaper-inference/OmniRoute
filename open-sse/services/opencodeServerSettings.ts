// Dashboard-managed settings of the opencode CLI server provider.
//
// Only the server URL lives here. The CLI binary that gets spawned is deliberately
// NOT a stored setting: a free-text path in the settings DB that the request path
// later passes to spawn() would turn any management JWT into a process-execution
// primitive (Hard Rules 15/17). The binary comes from the operator's environment
// (OPENCODE_SERVER_BIN / CLI_OPENCODE_BIN) or well-known install locations only.

const SETTINGS_CACHE_TTL_MS = 60_000;

export type OpencodeServerSettings = { url?: string };

// Cached because the executor sits on the request hot path; the PATCH
// /api/settings handler calls clearOpencodeServerSettingsCache() so an operator
// edit takes effect at once instead of after the TTL.
let cachedSettings: { value: OpencodeServerSettings; ts: number } | null = null;

export function clearOpencodeServerSettingsCache(): void {
  cachedSettings = null;
}

export async function readOpencodeServerSettings(): Promise<OpencodeServerSettings> {
  if (cachedSettings && Date.now() - cachedSettings.ts < SETTINGS_CACHE_TTL_MS) {
    return cachedSettings.value;
  }
  let value: OpencodeServerSettings = {};
  try {
    // Imported lazily so the executor never hard-depends on the DB at import time
    // (same pattern as executors/dario.ts).
    const { getSettings } = await import("@/lib/db/settings");
    const settings = (await getSettings()) as Record<string, unknown>;
    value = {
      url:
        typeof settings.opencode_server_url === "string" ? settings.opencode_server_url : undefined,
    };
  } catch {
    value = {};
  }
  cachedSettings = { value, ts: Date.now() };
  return value;
}
