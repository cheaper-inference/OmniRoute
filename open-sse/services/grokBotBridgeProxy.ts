import {
  BRIDGE_NONCE_PATTERN,
  BRIDGE_PROXY_TIMEOUT_MS,
  challengeMatches,
  type BridgeTurnEntry,
  type GrokBotBridgeRegistry,
} from "./grokBotBridgeRegistry";

/**
 * Public bridge proxy pipeline (frozen spec 2026-09-28, fable r20 PASS,
 * "Public Route" section). One MCP request per call; the route handler in
 * src/app/grok-bridge/[nonce]/mcp/route.ts is a thin wrapper around this.
 *
 * Pipeline order (earlier steps short-circuit later ones; the registry is
 * never touched before step 2 and no slot is consumed before step 5):
 *   1. nonce shape re-check (the route segment matcher already enforces it)
 *   2. registry lookup in active -> active-close -> tombstone order
 *   3. state check: over cap -> 404; closed or expired -> 410
 *   4. constant-time challenge check -> 404 (indistinguishable from unknown)
 *   5. atomic slot reservation (one of 8); exhausted -> 410/404 by cap
 *   6. single monotonic deadline from reservation; body read capped at
 *      1 MiB + 1 byte -> 413, deadline -> 504, whichever fires first
 *   7. proxy to the registered loopback port under the remaining budget;
 *      deadline -> 504
 *   8. upstream unreachable or response over 1 MiB -> 502
 * Reserved slots are consumed exactly once and never refunded, whatever
 * the outcome. Errors are sanitized JSON with no stack traces.
 */

export const BRIDGE_BODY_LIMIT_BYTES = 1024 * 1024;

export class BridgeBodyTooLargeError extends Error {}
export class BridgeDeadlineError extends Error {}

/**
 * Monotonic clock for deadline math. Wall-clock (Date.now) is vulnerable to
 * NTP step adjustments: a backward jump would extend the proxy deadline past
 * the registered budget, a forward jump would 504 healthy requests. The
 * performance clock is monotone and free of both failure modes.
 */
function nowMs(): number {
  return performance.now();
}

function jsonError(status: number, code: string): Response {
  return Response.json({ error: code }, { status });
}

function bearerToken(headers: Headers): string | null {
  const value = headers.get("authorization");
  if (!value || !value.startsWith("Bearer ")) return null;
  return value.slice("Bearer ".length);
}

function corsHeaders(): Headers {
  const headers = new Headers();
  headers.set("access-control-allow-methods", "GET, POST, OPTIONS");
  headers.set("access-control-allow-headers", "authorization, content-type, accept, mcp-protocol-version");
  return headers;
}

export function handleGrokBridgeOptions(): Response {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export function handleGrokBridgeMethodNotAllowed(): Response {
  return new Response(null, { status: 405, headers: { allow: "GET, POST, OPTIONS" } });
}

/**
 * Race one promise against a deadline timer. The timer is always cleared,
 * and whichever rejects first wins: a body-limit throw beats a not-yet-fired
 * timer, a fired timer beats a still-pending read.
 */
function withDeadline<T>(promise: Promise<T>, remainingMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    if (remainingMs <= 0) {
      reject(new BridgeDeadlineError());
      return;
    }
    const timer = setTimeout(() => reject(new BridgeDeadlineError()), remainingMs);
    // A never-settling race must not hold the event loop for the whole
    // remaining deadline during teardown.
    timer.unref?.();
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

async function readBodyCapped(request: Request, deadline: number, signal: AbortSignal): Promise<Buffer> {
  if (!request.body) return Buffer.alloc(0);
  const reader = request.body.getReader();
  const onAbort = () => { void reader.cancel().catch(() => {}); };
  signal.addEventListener("abort", onAbort, { once: true });
  if (signal.aborted) onAbort();
  const chunks: Buffer[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await withDeadline(reader.read(), deadline - nowMs());
      if (signal.aborted) throw new BridgeDeadlineError();
      if (done) break;
      total += value.byteLength;
      if (total > BRIDGE_BODY_LIMIT_BYTES) {
        // Stop at 1 MiB plus one byte: the upload is aborted and never
        // proxied, and the slot stays consumed.
        throw new BridgeBodyTooLargeError();
      }
      chunks.push(Buffer.from(value));
    }
  } finally {
    signal.removeEventListener("abort", onAbort);
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
  return Buffer.concat(chunks);
}

async function readResponseCapped(response: Response, deadline: number): Promise<Buffer> {
  if (!response.body) return Buffer.alloc(0);
  const reader = response.body.getReader();
  const chunks: Buffer[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await withDeadline(reader.read(), deadline - nowMs());
      if (done) break;
      total += value.byteLength;
      if (total > BRIDGE_BODY_LIMIT_BYTES) {
        // An upstream response body over 1 MiB is answered as sanitized 502.
        throw new BridgeBodyTooLargeError();
      }
      chunks.push(Buffer.from(value));
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks);
}

export interface GrokBridgeRequestInput {
  request: Request;
  /** Path and query to forward to the local server (from the public URL). */
  upstreamPath: string;
  nonce: string;
  registry: GrokBotBridgeRegistry;
  /** Test seam for the 30-second proxy deadline. */
  timeoutMs?: number;
}

export async function handleGrokBridgeRequest(input: GrokBridgeRequestInput): Promise<Response> {
  const { request, upstreamPath, nonce, registry } = input;
  const timeoutMs = input.timeoutMs ?? BRIDGE_PROXY_TIMEOUT_MS;
  if (request.method !== "GET" && request.method !== "POST") {
    return handleGrokBridgeMethodNotAllowed();
  }

  // Step 1: the handler re-checks the same 22-character pattern the route
  // segment matcher compiles, before the registry is ever touched.
  if (!BRIDGE_NONCE_PATTERN.test(nonce)) {
    return jsonError(404, "not_found");
  }

  // Step 2: registry lookup order active -> active-close -> tombstones.
  const found = registry.lookup(nonce);
  if (found.kind === "unknown") {
    return jsonError(404, "not_found");
  }
  const entry: BridgeTurnEntry = found.entry;

  // Step 3: state check. At or after the absolute cap a closed nonce
  // replays as 404, matching spec tests 27/37/38; closed or expired is 410.
  if (registry.isOverCap(entry)) {
    return jsonError(404, "not_found");
  }
  if (found.kind === "closed-replay" || registry.isExpired(entry)) {
    return jsonError(410, "gone");
  }

  // Step 4: constant-time challenge check. Missing or wrong returns 404,
  // indistinguishable from an unknown nonce, and consumes no slot.
  if (!challengeMatches(entry, bearerToken(request.headers))) {
    return jsonError(404, "not_found");
  }

  // Step 5: atomic slot reservation, before any body byte is read. An
  // exhausted count is 410 before the cap and 404 at or after it.
  if (!registry.reserveSlot(entry)) {
    return jsonError(registry.isOverCap(entry) ? 404 : 410, registry.isOverCap(entry) ? "not_found" : "gone");
  }

  // GET is only the server-to-client channel. Answering it here returns the
  // SSE headers before any upstream dial, so a client that gives up when the
  // first byte is late still sees the stream open. The same timeoutMs budget
  // the POST path uses still bounds it. The local bridge GET carries no
  // request data; POST is the path that must reach it.
  if (request.method === "GET") {
    const headers = new Headers({
      "content-type": "text/event-stream",
      "cache-control": "no-cache, no-transform",
    });
    const encoder = new TextEncoder();
    const controller = new AbortController();
    entry.inflight.add(controller);
    const deadline = setTimeout(() => controller.abort(), timeoutMs);
    deadline.unref?.();
    const release = (sink: ReadableStreamDefaultController<Uint8Array> | null) => {
      clearTimeout(deadline);
      entry.inflight.delete(controller);
      if (sink) { try { sink.close(); } catch { /* already closed */ } }
    };
    let stream: ReadableStream<Uint8Array>;
    try {
      stream = new ReadableStream<Uint8Array>({
      start(sink) {
        // Cursor sends mcp-protocol-version 2025-11-25 but still speaks the
        // 2024-11-05 HTTP+SSE transport: it reads the first frame and, unless
        // that frame is an `endpoint` event naming the POST path, closes the
        // stream and never POSTs. A packet capture on the live bridge showed
        // the 200 and the comment frame delivered, then a FIN one round trip
        // later. The data is a path so the client resolves it against the
        // connection origin, and it is built from the turn nonce so it does
        // not depend on the request URL.
        sink.enqueue(encoder.encode(`event: endpoint\ndata: /grok-bridge/${entry.nonce}/mcp\n\n`));
        sink.enqueue(encoder.encode(": connected\n\n"));
        const timer = setInterval(() => {
          if (controller.signal.aborted) return;
          try { sink.enqueue(encoder.encode(": keepalive\n\n")); }
          catch { clearInterval(timer); }
        }, 5000);
        timer.unref?.();
        controller.signal.addEventListener("abort", () => { clearInterval(timer); release(sink); }, { once: true });
        request.signal.addEventListener("abort", () => controller.abort(), { once: true });
      },
      cancel() { controller.abort(); },
    });
    } catch (err) {
      clearTimeout(deadline);
      entry.inflight.delete(controller);
      throw err;
    }
    return new Response(stream, { status: 200, headers });
  }

  // Step 6: one monotonic budget covers the upload, response and live stream.
  const deadline = nowMs() + timeoutMs;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  timer.unref?.();
  entry.inflight.add(controller);
  const onClientAbort = () => controller.abort();
  request.signal.addEventListener("abort", onClientAbort, { once: true });
  if (request.signal.aborted) onClientAbort();
  const cleanup = () => {
    clearTimeout(timer);
    entry.inflight.delete(controller);
    request.signal.removeEventListener("abort", onClientAbort);
  };
  let streaming = false;
  try {
    let body: Buffer | undefined;
    try {
      if (request.method === "POST") {
        body = await readBodyCapped(request, deadline, controller.signal);
      }
    } catch (error) {
      if (error instanceof BridgeBodyTooLargeError) {
        return jsonError(413, "payload_too_large");
      }
      return jsonError(504, "gateway_timeout");
    }
    if (controller.signal.aborted || deadline <= nowMs()) {
      return jsonError(504, "gateway_timeout");
    }
    // Allow only the authentication and MCP negotiation headers.
    const headers = new Headers();
    for (const name of ["authorization", "content-type", "accept", "mcp-protocol-version"]) {
      const value = request.headers.get(name);
      if (value !== null) headers.set(name, value);
    }
    if (request.method === "POST" && !headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    let upstream: Response;
    try {
      upstream = await fetch(`http://127.0.0.1:${entry.port}${upstreamPath}`, {
        method: request.method,
        headers,
        body: body ? new Uint8Array(body) : undefined,
        signal: controller.signal,
      });
    } catch {
      return controller.signal.aborted
        ? jsonError(504, "gateway_timeout")
        : jsonError(502, "bad_gateway");
    }
    const responseHeaders = new Headers();
    const contentType = upstream.headers.get("content-type");
    if (contentType) responseHeaders.set("content-type", contentType);
    if (upstream.body && contentType?.split(";")[0].trim() === "text/event-stream") {
      responseHeaders.set("cache-control", "no-cache, no-transform");
      const stream = relayEventStream(upstream.body, controller, cleanup);
      const response = new Response(stream, { status: upstream.status, headers: responseHeaders });
      streaming = true;
      return response;
    }
    try {
      const buffered = await readResponseCapped(upstream, deadline);
      const responseBody = [204, 205, 304].includes(upstream.status) ? null : new Uint8Array(buffered);
      return new Response(responseBody, { status: upstream.status, headers: responseHeaders });
    } catch (error) {
      return error instanceof BridgeBodyTooLargeError
        ? jsonError(502, "bad_gateway")
        : jsonError(504, "gateway_timeout");
    }
  } finally {
    if (!streaming) {
      cleanup();
      controller.abort();
    }
  }
}

/** Relay SSE under the same deadline, including when nobody reads the body. */
function relayEventStream(
  upstream: ReadableStream<Uint8Array>,
  abort: AbortController,
  cleanup: () => void
): ReadableStream<Uint8Array> {
  const reader = upstream.getReader();
  let total = 0;
  let settled = false;
  let downstream: ReadableStreamDefaultController<Uint8Array>;
  const finish = (error?: Error) => {
    if (settled) return;
    settled = true;
    abort.signal.removeEventListener("abort", onAbort);
    cleanup();
    if (error) {
      downstream.error(error);
      void reader.cancel().catch(() => {}).finally(() => reader.releaseLock());
      abort.abort();
    } else {
      downstream.close();
      reader.releaseLock();
    }
  };
  const onAbort = () => finish(new Error("bridge stream closed"));
  return new ReadableStream<Uint8Array>({
    start(controller) {
      downstream = controller;
      abort.signal.addEventListener("abort", onAbort, { once: true });
      if (abort.signal.aborted) onAbort();
    },
    async pull(controller) {
      if (settled) return;
      try {
        const { done, value } = await reader.read();
        if (settled) return;
        if (done) {
          finish();
          return;
        }
        total += value.byteLength;
        if (total > BRIDGE_BODY_LIMIT_BYTES) {
          finish(new Error("bridge response too large"));
          return;
        }
        if (settled) return;
        controller.enqueue(value);
      } catch {
        finish(new Error("bridge stream closed"));
      }
    },
    cancel() {
      if (settled) return;
      settled = true;
      abort.signal.removeEventListener("abort", onAbort);
      abort.abort();
      cleanup();
      return reader.cancel().catch(() => {}).finally(() => reader.releaseLock());
    },
  });
}
