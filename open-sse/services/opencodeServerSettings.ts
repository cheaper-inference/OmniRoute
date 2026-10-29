// Dashboard-managed settings of the opencode CLI server provider.
//
// Only the server URL lives here. The CLI binary that gets spawned is deliberately
// NOT a stored setting: a free-text path in the settings DB that the request path
// later passes to spawn() would turn any management JWT into a process-execution
// primitive (Hard Rules 15/17). The binary comes from the operator's environment
// (OPENCODE_SERVER_BIN / CLI_OPENCODE_BIN) or well-known install locations only.
//
// The value is pushed in by the runtime-settings applier (src/lib/config/
// runtimeSettings.ts → applyRuntimeSettings, at boot and on every settings save),
// so this engine module never imports the settings DB from src/ (the open-sse → src
// boundary is ratcheted). It lives on globalThis so every Next.js bundle that loads
// this module (the settings route, the instrumentation hook, the /v1 routes) shares
// one value, the same reason runtimeSettings keeps its authz-bypass store there.

export type OpencodeServerSettings = { url?: string };

const SETTINGS_GLOBAL_KEY = "__omniroute_opencodeServerSettings__";
const settingsStore = globalThis as unknown as Record<string, OpencodeServerSettings | undefined>;

/** Store the dashboard URL setting; an empty or missing URL means "use the default". */
export function setOpencodeServerSettings(settings: OpencodeServerSettings | null | undefined) {
  const url = typeof settings?.url === "string" ? settings.url.trim() : "";
  settingsStore[SETTINGS_GLOBAL_KEY] = url ? { url } : {};
}

/** Forget the pushed value (tests); reads then return the empty default. */
export function clearOpencodeServerSettingsCache(): void {
  delete settingsStore[SETTINGS_GLOBAL_KEY];
}

export async function readOpencodeServerSettings(): Promise<OpencodeServerSettings> {
  return { ...(settingsStore[SETTINGS_GLOBAL_KEY] ?? {}) };
}
