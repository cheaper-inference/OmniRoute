import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { gzip } from "node:zlib";
import { buildErrorBody } from "./error.ts";

const gzipAsync = promisify(gzip);
export const CI_WIRE_BODY_BYTES = 4_000_000;
export const CI_PAYLOAD_PART_BYTES = 1024 * 1024;
export const CI_MAX_JSON_BYTES = 20 * 1024 * 1024;
const MIN_GZIP_BYTES = 32 * 1024;
const INFERENCE_PATH = /\/(chat\/completions|responses)$/;
type Transport = (url: string, init: RequestInit) => Promise<Response>;

function refusal(message: string): Response {
  return Response.json(buildErrorBody(413, message), { status: 413 });
}

/** Lossless CI transport. Never retries inference or changes the prompt/model. */
export async function sendCIPayload(
  url: string,
  init: RequestInit,
  send: Transport
): Promise<Response> {
  const target = new URL(url);
  const match = target.pathname.match(INFERENCE_PATH);
  const headers = new Headers(init.headers);
  if (!match || !isJsonUpload(init, headers)) return send(url, init);
  const bytes = Buffer.from(init.body as string, "utf8");
  if (bytes.length > CI_MAX_JSON_BYTES)
    return refusal("CI accepts at most 20 MiB of JSON per request, including chunked uploads.");
  if (bytes.length < MIN_GZIP_BYTES) return send(url, init);
  init.signal?.throwIfAborted();
  const compressed = await gzipAsync(bytes);
  init.signal?.throwIfAborted();
  headers.delete("content-length");
  headers.delete("transfer-encoding");
  headers.set("content-encoding", "gzip");
  if (compressed.length <= CI_WIRE_BODY_BYTES) {
    return send(url, { ...init, headers, body: compressed });
  }

  return uploadAndDispatch(url, init, send, target, match[1], headers, bytes, compressed);
}

function isJsonUpload(init: RequestInit, headers: Headers): boolean {
  return (
    init.method === "POST" &&
    typeof init.body === "string" &&
    Boolean(headers.get("content-type")?.toLowerCase().startsWith("application/json")) &&
    !headers.has("content-encoding")
  );
}

/** Upload bounded same-origin parts, then issue one inference request for the reservation. */
async function uploadAndDispatch(
  url: string,
  init: RequestInit,
  send: Transport,
  target: URL,
  path: string,
  headers: Headers,
  bytes: Buffer,
  compressed: Buffer<ArrayBuffer>
): Promise<Response> {
  // Upload traffic stays on the same origin/base path and the same guarded transport.
  // Only an opaque id returned by CI is used; never follow a returned upload URL.
  const endpoint = `/${path}`;
  const base = new URL(target);
  base.pathname = target.pathname.slice(0, -endpoint.length) + "/payload-uploads";
  base.search = "";
  const uploadUrl = base.toString();
  const uploadHeaders = new Headers(headers);
  uploadHeaders.delete("content-encoding");
  uploadHeaders.delete("x-ci-payload-upload");
  const created = await send(uploadUrl, {
    ...init,
    headers: uploadHeaders,
    redirect: "error",
    body: JSON.stringify({
      endpoint,
      encoding: "gzip",
      size_bytes: compressed.length,
      decoded_size_bytes: bytes.length,
      sha256: createHash("sha256").update(compressed).digest("hex"),
    }),
  });
  if (!created.ok) return created;
  const reservation = (await created.json().catch(() => null)) as {
    id?: unknown;
    part_bytes?: unknown;
  } | null;
  if (
    typeof reservation?.id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(reservation.id)
  )
    throw new Error("CI returned an invalid payload upload reservation.");
  const resource = `${uploadUrl}/${reservation.id}`;
  let needsCleanup = true;
  try {
    if (reservation.part_bytes !== CI_PAYLOAD_PART_BYTES)
      throw new Error("CI returned an invalid payload upload reservation.");
    const partHeaders = new Headers(uploadHeaders);
    partHeaders.set("content-type", "application/octet-stream");
    for (
      let offset = 0, part = 0;
      offset < compressed.length;
      offset += CI_PAYLOAD_PART_BYTES, part++
    ) {
      init.signal?.throwIfAborted();
      const uploaded = await send(`${resource}/parts/${part}`, {
        ...init,
        method: "PUT",
        headers: partHeaders,
        redirect: "error",
        body: compressed.subarray(offset, offset + CI_PAYLOAD_PART_BYTES),
      });
      if (!uploaded.ok) return uploaded;
      await uploaded.body?.cancel();
    }
    const executionHeaders = new Headers(uploadHeaders);
    executionHeaders.set("x-ci-payload-upload", reservation.id);
    // Exactly one inference dispatch. A lost response must not cause a hidden second generation.
    const response = await send(url, { ...init, headers: executionHeaders, body: "{}" });
    // CI drops stored bytes before starting inference. Never delay a successful stream on DELETE.
    needsCleanup = !response.ok;
    return response;
  } finally {
    if (needsCleanup) await cleanUpload(resource, init, uploadHeaders, send);
  }
}

/** Best-effort delete reserved bytes independently of the caller cancellation signal. */
async function cleanUpload(
  resource: string,
  init: RequestInit,
  uploadHeaders: Headers,
  send: Transport
) {
  // Cancellation must not cancel deletion of already-reserved prompt bytes.
  // Keep the original response/error; server-side expiry is a final safety net.
  try {
    const cleaned = await send(resource, {
      ...init,
      method: "DELETE",
      headers: uploadHeaders,
      body: undefined,
      redirect: "error",
      signal: AbortSignal.timeout(2000),
    });
    await cleaned.body?.cancel();
  } catch {
    /* The receiver's retention worker reaps abandoned uploads. */
  }
}
