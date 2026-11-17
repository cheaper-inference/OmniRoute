export const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const CREDENTIAL_HEADER = /^(authorization|proxy-authorization|cookie)$|key|token|secret/i;
const BODY_HEADERS = ["content-type", "content-length", "content-encoding", "content-language"];

/** Request options for the next hop: drops credentials across origins, applies Fetch method rules. */
export function redirectHopOptions<T extends RequestInit>(
  options: T,
  status: number,
  fromUrl: string,
  toUrl: string
): T {
  const headers = new Headers(options.headers);
  if (new URL(toUrl).origin !== new URL(fromUrl).origin) {
    for (const name of [...headers.keys()]) {
      if (CREDENTIAL_HEADER.test(name)) headers.delete(name);
    }
  }
  const method = (options.method || "GET").toUpperCase();
  const switchesToGet = status === 303 ? method !== "HEAD" : status <= 302 && method === "POST";
  if (!switchesToGet) return { ...options, headers: Object.fromEntries(headers.entries()) };
  for (const name of BODY_HEADERS) headers.delete(name);
  return {
    ...options,
    method: "GET",
    body: undefined,
    headers: Object.fromEntries(headers.entries()),
  };
}
