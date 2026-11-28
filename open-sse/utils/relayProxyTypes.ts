// Edge-relay proxy types. These do NOT go through an HTTP/SOCKS dispatcher —
// the caller wraps the upstream URL with buildRelayHeaders() and fetches the
// relay endpoint directly. Keep this set as the single source of truth so
// every dispatch decision stays in sync when a new relay backend lands.
export const RELAY_TYPES: ReadonlySet<string> = new Set(["vercel", "deno", "cloudflare"]);

export function isRelayType(type: string | undefined | null): boolean {
  return typeof type === "string" && RELAY_TYPES.has(type);
}
