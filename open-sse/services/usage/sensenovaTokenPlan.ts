/**
 * sensenovaTokenPlan.ts - SenseNova (日日新) console host recognition.
 *
 * The Token Plan quota lives behind the console gateway at token.sensenova.cn.
 * Accounts are usually configured as OpenAI-compatible custom nodes, whose
 * provider ids are minted per connection and therefore can never appear in a
 * static provider list; the base URL is the only thing both shapes share.
 *
 * Kept separate from sensenovaQuotaFetcher.ts because the dashboard's
 * visibility gate runs in client components: the fetcher pulls in quota
 * registries and proxy plumbing, while this module is pure data plus a host
 * comparison.
 */

export const SENSENOVA_CONSOLE_HOST = "token.sensenova.cn";

export type SensenovaOriginConnection = {
  provider?: string | null;
  providerSpecificData?: unknown;
};

/**
 * Parsed origin (protocol + host + optional port) when the host is the console.
 *
 * Takes `unknown` on purpose: callers hand over whatever arrived in
 * `providerSpecificData`, and the guard below rejects every non-string instead
 * of trusting the shape at the call site.
 *
 * The return value answers "is this the console, and on which origin"; it is not
 * a fetch base to be reused verbatim by unrelated callers. It preserves the
 * scheme it was given, so an `http://` input yields an `http://` origin.
 */
export function parseSensenovaOrigin(baseUrl: unknown): string | null {
  if (typeof baseUrl !== "string") return null;
  const trimmed = baseUrl.trim();
  if (trimmed === "") return null;
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  // Credentials embedded in a base URL are a configuration error, not a way to
  // reach the console, and keeping them out of the recognised shape means they
  // never travel with the origin into a later diagnostic.
  if (url.username !== "" || url.password !== "") return null;
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (host !== SENSENOVA_CONSOLE_HOST) return null;
  // The URL parser reports a default port (80/443) as an empty string, so the
  // ternary keeps the origin clean instead of emitting a redundant `:80`.
  const port = url.port ? `:${url.port}` : "";
  return `${url.protocol}//${host}${port}`;
}

/**
 * True when the connection talks to the SenseNova console host.
 *
 * An explicit `baseUrl` decides on its own: a connection can carry the builtin
 * provider id and still be pointed at a proxy or a mirror, so the host it names
 * is what settles the question. Only when the connection names no base URL does
 * the provider id stand in for it.
 */
export function isSensenovaQuotaConnection(connection: SensenovaOriginConnection): boolean {
  const psd = connection.providerSpecificData;
  const record = psd && typeof psd === "object" && !Array.isArray(psd) ? (psd as Record<string, unknown>) : null;
  const baseUrl = record?.baseUrl;
  if (typeof baseUrl === "string" && baseUrl.trim() !== "") {
    return parseSensenovaOrigin(baseUrl) !== null;
  }
  return connection.provider === "sensenova";
}
