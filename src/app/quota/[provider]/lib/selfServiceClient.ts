/**
 * The only place where the self-service page sends the API key over the network: in the
 * Authorization header of the two /api/v1/me/* routes. Outcomes are a closed set, so no server
 * message, error object or key can reach the screen or a log from here.
 */
export type SelfServiceFailure =
  "invalid-key" | "missing-scope" | "network" | "server" | "invalid-response";
export type SelfServiceResult<T> =
  { ok: true; data: T } | { ok: false; failure: SelfServiceFailure | "aborted" };
export interface ResponseSchema<T> {
  safeParse(value: unknown): { success: true; data: T } | { success: false };
}

export const quotaPath = (provider: string): string =>
  "/api/v1/me/quota/" + encodeURIComponent(provider);
export const usagePath = (range: string): string =>
  "/api/v1/me/usage?range=" + encodeURIComponent(range);

function failed<T>(failure: SelfServiceFailure | "aborted"): SelfServiceResult<T> {
  return { ok: false, failure };
}

/** Status only: the error body is never read. */
function refusal(status: number): SelfServiceFailure | null {
  if (status === 401) return "invalid-key";
  if (status === 403) return "missing-scope";
  if (status < 200 || status > 299) return "server";
  return null;
}

export async function requestSelfService<T>(input: {
  path: string;
  apiKey: string;
  schema: ResponseSchema<T>;
  signal: AbortSignal;
  fetchImpl?: typeof fetch;
}): Promise<SelfServiceResult<T>> {
  const { path, apiKey, schema, signal } = input;
  const fetchImpl = input.fetchImpl ?? fetch;
  let response: Response;
  try {
    response = await fetchImpl(path, {
      method: "GET",
      headers: { Authorization: "Bearer " + apiKey, Accept: "application/json" },
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
      signal,
    });
  } catch {
    return failed(signal.aborted ? "aborted" : "network");
  }
  const refused = refusal(response.status);
  if (refused) return failed(refused);
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return failed(signal.aborted ? "aborted" : "invalid-response");
  }
  const parsed = schema.safeParse(body);
  return parsed.success ? { ok: true, data: parsed.data } : failed("invalid-response");
}
