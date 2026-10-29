// Where the opencode CLI headless server (`opencode serve`) lives and whether it
// answers. Shared by the executor (request path) and the local-only lifecycle
// routes under /api/services/opencode-server/. Deliberately free of any process
// API: the executor must never reach spawn() (Hard Rules #15/#17), so starting
// the server lives in opencodeServerLauncher.ts, imported only by those routes.
import type { OpencodeServerSettings } from "./opencodeServerSettings.ts";

export const DEFAULT_OPENCODE_SERVER_URL = "http://127.0.0.1:4096";

export type OpencodeServerHealth = { healthy: boolean; version?: string };

/** OPENCODE_SERVER_URL wins over the dashboard setting; trailing slashes are dropped. */
export function resolveOpencodeServerUrl(
  settings: OpencodeServerSettings,
  env: Record<string, string | undefined> = process.env
): string {
  const configured =
    String(env.OPENCODE_SERVER_URL || "").trim() || String(settings.url || "").trim();
  return (configured || DEFAULT_OPENCODE_SERVER_URL).replace(/\/+$/, "");
}

/** `GET /global/health`; null when nothing (or not an opencode server) answers in time. */
export async function probeOpencodeServerHealth(
  baseUrl: string,
  timeoutMs = 1500
): Promise<OpencodeServerHealth | null> {
  try {
    const response = await fetch(`${baseUrl}/global/health`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) return null;
    return (await response.json()) as OpencodeServerHealth;
  } catch {
    return null;
  }
}
