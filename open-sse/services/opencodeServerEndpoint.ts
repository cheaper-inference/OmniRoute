// Where the opencode CLI headless server (`opencode serve`) lives and whether it
// answers. Shared by the executor (request path) and the local-only lifecycle
// routes under /api/services/opencode-server/. Deliberately free of any process
// API: the executor must never reach spawn() (Hard Rules #15/#17), so starting
// the server lives in opencodeServerLauncher.ts, imported only by those routes.
import type { OpencodeServerSettings } from "./opencodeServerSettings.ts";

export const DEFAULT_OPENCODE_SERVER_URL = "http://127.0.0.1:4096";

/**
 * `apiMajor` is the server API generation. The executor speaks the v1 API
 * (`/session`, `/config/providers`, `/event`); opencode 2.x moved every route under
 * `/api/` behind Basic auth and serves its web app's index.html on the legacy
 * paths, so a v2 server must be recognized, never mistaken for a healthy v1 one.
 */
export type OpencodeServerHealth = { healthy: boolean; version?: string; apiMajor?: 1 | 2 };

/** OPENCODE_SERVER_URL wins over the dashboard setting; trailing slashes are dropped. */
export function resolveOpencodeServerUrl(
  settings: OpencodeServerSettings,
  env: Record<string, string | undefined> = process.env
): string {
  const configured =
    String(env.OPENCODE_SERVER_URL || "").trim() || String(settings.url || "").trim();
  return (configured || DEFAULT_OPENCODE_SERVER_URL).replace(/\/+$/, "");
}

function isJsonResponse(response: Response): boolean {
  return /\bjson\b/i.test(response.headers.get("content-type") || "");
}

function apiMajorOf(version: unknown): 1 | 2 {
  const major = Number.parseInt(String(version ?? ""), 10);
  return Number.isFinite(major) && major >= 2 ? 2 : 1;
}

/**
 * A v2 server answers JSON under `/api/` (200, or 401 without its Basic-auth
 * password) where a v1 server or any other web app serves HTML.
 */
async function answersV2Api(baseUrl: string, timeoutMs: number): Promise<boolean> {
  const response = await fetch(`${baseUrl}/api/provider`, {
    signal: AbortSignal.timeout(timeoutMs),
  });
  await response.body?.cancel().catch(() => {});
  return (response.ok || response.status === 401) && isJsonResponse(response);
}

/**
 * `GET /global/health`, with the API generation of the server that answered; null
 * when nothing (or not an opencode server) answers in time.
 */
export async function probeOpencodeServerHealth(
  baseUrl: string,
  timeoutMs = 1500
): Promise<OpencodeServerHealth | null> {
  try {
    const response = await fetch(`${baseUrl}/global/health`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (response.ok && isJsonResponse(response)) {
      const health = (await response.json()) as OpencodeServerHealth;
      return { ...health, apiMajor: apiMajorOf(health?.version) };
    }
    await response.body?.cancel().catch(() => {});
    // An HTML 200 here is a web app, not a v1 health answer: only a JSON `/api/`
    // makes it an opencode (v2) server.
    return (await answersV2Api(baseUrl, timeoutMs)) ? { healthy: true, apiMajor: 2 } : null;
  } catch {
    return null;
  }
}
