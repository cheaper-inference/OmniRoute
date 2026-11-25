/**
 * The only place where the self-service page sends the API key over the network: in the
 * Authorization header of the self-service routes (the GET of /api/v1/me/* and the PATCH that
 * records lending consent). Outcomes are a closed set, so no server message, error object or key
 * can reach the screen or a log from here.
 */
export type SelfServiceFailure =
  "invalid-key" | "missing-scope" | "network" | "server" | "invalid-response";
export type SelfServiceResult<T> =
  { ok: true; data: T } | { ok: false; failure: SelfServiceFailure | "aborted" };
export type SelfServiceWriteFailure =
  | "unauthorized"
  | "forbidden"
  | "not-found"
  | "rejected"
  | "rate-limited"
  | "server"
  | "network"
  | "invalid-response";
export type SelfServiceWriteResult<T> =
  | { ok: true; data: T }
  | { ok: false; failure: SelfServiceWriteFailure | "aborted"; retryAfterSeconds: number | null };
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

type Sent = Response | "network" | "aborted";
type Read<T> = { ok: true; data: T } | { ok: false; failure: "aborted" | "invalid-response" };

/** The one fetch of this module. Method, body and Content-Type are set only for a write. */
async function dispatch(input: {
  path: string;
  apiKey: string;
  signal: AbortSignal;
  fetchImpl?: typeof fetch;
  write?: { method: "PATCH"; body: string };
}): Promise<Sent> {
  const { path, apiKey, signal, write } = input;
  const fetchImpl = input.fetchImpl ?? fetch;
  const headers: Record<string, string> = {
    Authorization: "Bearer " + apiKey,
    Accept: "application/json",
  };
  if (write) headers["Content-Type"] = "application/json";
  try {
    return await fetchImpl(path, {
      method: write ? write.method : "GET",
      headers,
      ...(write ? { body: write.body } : {}),
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
      signal,
    });
  } catch {
    return signal.aborted ? "aborted" : "network";
  }
}

/** Reads a 2xx answer through the schema. */
async function readAnswer<T>(
  response: Response,
  schema: ResponseSchema<T>,
  signal: AbortSignal
): Promise<Read<T>> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, failure: signal.aborted ? "aborted" : "invalid-response" };
  }
  const parsed = schema.safeParse(body);
  return parsed.success
    ? { ok: true, data: parsed.data }
    : { ok: false, failure: "invalid-response" };
}

export async function requestSelfService<T>(input: {
  path: string;
  apiKey: string;
  schema: ResponseSchema<T>;
  signal: AbortSignal;
  fetchImpl?: typeof fetch;
}): Promise<SelfServiceResult<T>> {
  const response = await dispatch(input);
  if (typeof response === "string") return failed(response);
  const refused = refusal(response.status);
  if (refused) return failed(refused);
  const read = await readAnswer(response, input.schema, input.signal);
  return "failure" in read ? failed(read.failure) : read;
}

const WRITE_REFUSALS: Readonly<Record<number, SelfServiceWriteFailure>> = {
  401: "unauthorized",
  403: "forbidden",
  404: "not-found",
  // A timeout says nothing about the values: the change may or may not have been saved.
  408: "server",
  429: "rate-limited",
};

/** Status only: the error body is never read. */
function writeRefusal(status: number): SelfServiceWriteFailure | null {
  if (status >= 200 && status <= 299) return null;
  const known = WRITE_REFUSALS[status];
  if (known) return known;
  return status >= 400 && status <= 499 ? "rejected" : "server";
}

/** Whole seconds of a 429, only from a plain positive integer. */
function retryAfterSeconds(response: Response): number | null {
  if (response.status !== 429) return null;
  const value = response.headers.get("Retry-After");
  if (value === null || !/^[0-9]{1,5}$/.test(value)) return null;
  const seconds = Number(value);
  return seconds >= 1 ? seconds : null;
}

function writeFailed<T>(
  failure: SelfServiceWriteFailure | "aborted",
  retryAfter: number | null = null
): SelfServiceWriteResult<T> {
  return { ok: false, failure, retryAfterSeconds: retryAfter };
}

/** Sends one PATCH with a JSON body. A 2xx answer must match the schema. */
export async function sendSelfService<T>(input: {
  path: string;
  apiKey: string;
  body: unknown;
  schema: ResponseSchema<T>;
  signal: AbortSignal;
  fetchImpl?: typeof fetch;
}): Promise<SelfServiceWriteResult<T>> {
  const write = { method: "PATCH", body: JSON.stringify(input.body) } as const;
  const response = await dispatch({ ...input, write });
  if (typeof response === "string") return writeFailed(response);
  const refused = writeRefusal(response.status);
  if (refused) return writeFailed(refused, retryAfterSeconds(response));
  const read = await readAnswer(response, input.schema, input.signal);
  return "failure" in read ? writeFailed(read.failure) : read;
}
