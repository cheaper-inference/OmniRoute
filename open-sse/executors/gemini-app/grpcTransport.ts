/**
 * Product-only native HTTP/2 gRPC transport for the Gemini App (Robin)
 * backend. No desktop app, IPC, research ledger or internal retries.
 *
 * Derived from `ShawTim/gemini-app2api` — `src/gateway/native-transport.mjs`
 * (MIT). See ./LICENSE for the upstream MIT notice.
 */

import http2 from "node:http2";
import net from "node:net";
import { lengthDelimited as message, varintField } from "./protobuf.ts";
import { GrpcMessageReader, frameGrpcMessage, type NativeImageAttachment } from "./robinWire.ts";
import { buildNativeInitial } from "./toolProtocol.ts";
import { GeminiAppError, fromGrpcStatus } from "./errors.ts";
import { PROMPT_MAX_BYTES } from "./modelPolicy.ts";

export const MIN_CONNECT_ATTEMPT_TIMEOUT_MS = 5000;

/** Node v22 defaults Happy Eyeballs to 250ms, breaking IPv4 over high-RTT VPN. */
export function ensureConnectAttemptTimeout(minMs = MIN_CONNECT_ATTEMPT_TIMEOUT_MS): void {
  if (
    typeof net.getDefaultAutoSelectFamilyAttemptTimeout === "function" &&
    typeof net.setDefaultAutoSelectFamilyAttemptTimeout === "function" &&
    net.getDefaultAutoSelectFamilyAttemptTimeout() < minMs
  ) {
    net.setDefaultAutoSelectFamilyAttemptTimeout(minMs);
  }
}
ensureConnectAttemptTimeout();

export const NATIVE_ORIGIN = "https://robinfrontend-pa.googleapis.com";
export const NATIVE_RPC = "/assistant.mobile.robin.RobinService/ProcessQuery";
export const NATIVE_COMPATIBILITY_VERSION = "1.135.1.1291";

const RESPONSE_LIMITS = {
  wireBytes: 16 * 1024 * 1024,
  frameBytes: 1024 * 1024,
  queuedBytes: 4 * 1024 * 1024,
} as const;

export type NativeEvent =
  | { type: "frame"; bytes: Buffer }
  | { type: "end"; httpStatus: number | null; grpcStatus: number | null };

interface StreamWithRst extends http2.ClientHttp2Stream {
  rstCode?: number;
}

export interface OpenTurnOptions {
  token: string;
  userText: string;
  images?: readonly NativeImageAttachment[];
  systemText?: string;
  tools?: readonly unknown[];
  toolChoice?: unknown;
  modeCategory: number;
  thinkingLevel: number;
  temporaryChat?: boolean;
  smartModelSelection?: boolean;
  timeoutMs?: number;
  signal?: AbortSignal;
  connect?: (authority: string) => http2.ClientHttp2Session;
}

function decodeGrpcMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    return decodeURIComponent(value).slice(0, 512);
  } catch {
    return null;
  }
}

export interface NativeTurn {
  events: AsyncIterable<NativeEvent>;
  cancel: () => void;
}

/** Open one bounded native turn and expose a single-consumer async event stream. */
export function openDirectTurn({
  token,
  userText,
  images = [],
  systemText,
  tools = [],
  toolChoice = "auto",
  modeCategory,
  thinkingLevel,
  temporaryChat = true,
  smartModelSelection = false,
  timeoutMs = 180_000,
  signal,
  connect = http2.connect,
}: OpenTurnOptions): NativeTurn {
  if (typeof token !== "string" || !token || token.length > 65_536 || /\s/.test(token)) {
    throw new GeminiAppError("NATIVE_UNAUTHENTICATED", 503, "Gemini App credential is missing");
  }
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 600_000) {
    throw new GeminiAppError("NATIVE_INVALID_REQUEST", 400, "Invalid native transport timeout");
  }
  if (signal?.aborted) {
    throw new GeminiAppError("NATIVE_INVALID_REQUEST", 499, "Request cancelled");
  }
  if (Buffer.byteLength(userText) > PROMPT_MAX_BYTES) {
    throw new GeminiAppError(
      "NATIVE_INVALID_REQUEST",
      413,
      "Prompt exceeds the 4 MiB native budget"
    );
  }

  const initial = buildNativeInitial({
    userText,
    images,
    systemText,
    tools,
    toolChoice,
    modeCategory,
    thinkingLevel,
    temporaryChat,
    smartModelSelection,
  });
  // Trailing extension frames carry continuation identifiers for the next turn.
  const wire = Buffer.concat(
    [
      initial,
      Buffer.concat([varintField(1, 1), message(1007, message(1, Buffer.from(userText)))]),
      Buffer.concat([varintField(1, 1), message(1007, message(2, Buffer.alloc(0)))]),
    ].map(frameGrpcMessage)
  );
  if (wire.length > 16 * 1024 * 1024) {
    throw new GeminiAppError(
      "NATIVE_INVALID_REQUEST",
      413,
      "Native request exceeds the wire budget"
    );
  }

  let client: http2.ClientHttp2Session | undefined;
  let socket: NodeJS.ReadWriteStream | null = null;
  let request: StreamWithRst | undefined;
  let timer: NodeJS.Timeout | undefined;
  let connectionEnd: { rstCode: number } | null = null;
  let closed = false;
  let ended = false;
  let error: GeminiAppError | null = null;
  let httpStatus: number | null = null;
  let grpcStatus: number | null = null;
  let grpcMessage: string | null = null;
  let received = 0;
  let queued = 0;
  const items: NativeEvent[] = [];
  const reader = new GrpcMessageReader({ maxBytes: RESPONSE_LIMITS.frameBytes });
  let waiting: {
    resolve: (value: IteratorResult<NativeEvent>) => void;
    reject: (error: GeminiAppError) => void;
  } | null = null;

  const detachSocketListeners = (): void => {
    const current = socket;
    socket = null;
    if (!current) return;
    try {
      current.removeListener("end", socketEnd);
      current.removeListener("close", socketClose);
    } catch {
      // Socket may already be torn down.
    }
  };
  const connectionEnded = (kind: "end" | "close"): void => {
    if (closed || ended || connectionEnd) return;
    // Capture rstCode BEFORE Node's socketOnClose locally closes streams with
    // CANCEL; that synthetic code is not peer evidence.
    const code = request?.rstCode;
    connectionEnd = { rstCode: Number.isInteger(code) ? code : 0 };
    if (kind === "close") detachSocketListeners();
  };
  const socketEnd = (): void => connectionEnded("end");
  const socketClose = (): void => connectionEnded("close");

  const stop = (): void => {
    if (timer) clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
    detachSocketListeners();
    try {
      request?.close(ended ? http2.constants.NGHTTP2_NO_ERROR : http2.constants.NGHTTP2_CANCEL);
    } catch {
      // Already closed.
    }
    const session = client;
    const destroy = (): void => {
      try {
        session?.destroy();
      } catch {
        // Already destroyed.
      }
    };
    if (typeof session?.close !== "function") {
      destroy();
      return;
    }
    // Graceful shutdown flushes RST_STREAM; hard bound prevents a stuck peer.
    const cleanup = setTimeout(destroy, 250);
    cleanup.unref();
    session.once("close", () => clearTimeout(cleanup));
    try {
      session.close();
    } catch {
      clearTimeout(cleanup);
      destroy();
    }
  };

  const push = (event: NativeEvent): void => {
    if (closed) return;
    if (waiting) {
      const resolve = waiting.resolve;
      waiting = null;
      resolve({ value: event, done: false });
      return;
    }
    const size = event.type === "frame" ? event.bytes.length : 0;
    if (queued + size > RESPONSE_LIMITS.queuedBytes) {
      fail("NATIVE_RECEIVE_LIMIT", 502);
      return;
    }
    queued += size;
    items.push(event);
  };

  const fail = (code: GeminiAppError["code"], status: number): void => {
    if (closed) return;
    error = new GeminiAppError(code, status, code);
    closed = true;
    if (waiting) {
      waiting.reject(error);
      waiting = null;
    }
    stop();
  };

  const abort = (): void => fail("NATIVE_INVALID_REQUEST", 499);

  const rejectPeerReset = (): boolean => {
    if (closed) return false;
    const code = request?.rstCode;
    if (!Number.isInteger(code) || (code as number) <= 0 || (code as number) > 0xffff_ffff) {
      return false;
    }
    if (connectionEnd?.rstCode === 0) {
      fail("NATIVE_PROTOCOL_ERROR", 502);
      return true;
    }
    fail("NATIVE_PROTOCOL_ERROR", 502);
    return true;
  };

  const inspectStatus = (headers: http2.IncomingHttpHeaders): void => {
    const message = decodeGrpcMessage(headers["grpc-message"]);
    if (message) grpcMessage = message;
    if (headers[":status"] !== undefined) httpStatus = Number(headers[":status"]);
    if (headers["grpc-status"] !== undefined) {
      const parsed = Number(headers["grpc-status"]);
      if (!Number.isInteger(parsed) || parsed < 0 || parsed > 16) {
        fail("NATIVE_PROTOCOL_ERROR", 502);
        return;
      }
      grpcStatus = parsed;
    }
    if (httpStatus === 429 || grpcStatus === 8) {
      fail("NATIVE_QUOTA_EXHAUSTED", 429);
      return;
    }
    if (grpcStatus === 9) {
      fail("NATIVE_PRECONDITION_REQUIRED", 428);
      return;
    }
    if ([401, 403].includes(httpStatus ?? 0) || [7, 16].includes(grpcStatus ?? -1)) {
      const mapped = fromGrpcStatus(
        grpcStatus ?? (httpStatus === 401 ? 16 : 7),
        grpcMessage ?? undefined
      );
      fail(mapped.code, mapped.status);
      return;
    }
    if (httpStatus === 503 || grpcStatus === 14) {
      fail("NATIVE_UNAVAILABLE", 503);
      return;
    }
    if (grpcStatus !== null && grpcStatus !== 0) {
      const mapped = fromGrpcStatus(grpcStatus, grpcMessage ?? undefined);
      fail(mapped.code, mapped.status);
      return;
    }
    if (httpStatus !== null && httpStatus !== 200) fail("NATIVE_PROTOCOL_ERROR", 502);
  };

  timer = setTimeout(() => fail("NATIVE_UNAVAILABLE", 504), timeoutMs);
  timer.unref();
  signal?.addEventListener("abort", abort, { once: true });

  try {
    client = connect(NATIVE_ORIGIN);
    try {
      socket = client.socket as NodeJS.ReadWriteStream;
      socket?.prependOnceListener?.("end", socketEnd);
      socket?.prependOnceListener?.("close", socketClose);
    } catch {
      detachSocketListeners();
    }
    client.on("error", () => fail("NATIVE_UNAVAILABLE", 502));
    request = client.request({
      ":method": "POST",
      ":path": NATIVE_RPC,
      authorization: `Bearer ${token}`,
      "content-type": "application/grpc",
      "grpc-timeout": `${timeoutMs}m`,
      te: "trailers",
      "user-agent": "omniroute-gemini-app/1.0",
    }) as StreamWithRst;
    request.on("response", (headers) => inspectStatus(headers));
    request.on("trailers", (headers) => inspectStatus(headers));
    request.on("error", () => {
      if (!rejectPeerReset()) fail("NATIVE_PROTOCOL_ERROR", 502);
    });
    request.on("close", () => {
      if (!ended && !closed && !rejectPeerReset()) fail("NATIVE_PROTOCOL_ERROR", 502);
    });
    request.on("data", (chunk: Buffer) => {
      if (closed) return;
      try {
        received += chunk.length;
        if (received > RESPONSE_LIMITS.wireBytes) {
          fail("NATIVE_RECEIVE_LIMIT", 502);
          return;
        }
        for (const bytes of reader.push(chunk)) push({ type: "frame", bytes });
      } catch {
        fail("NATIVE_PROTOCOL_ERROR", 502);
      }
    });
    request.on("end", () => {
      if (closed) return;
      if (rejectPeerReset()) return;
      try {
        reader.finish();
        push({ type: "end", httpStatus, grpcStatus });
        ended = true;
        if (timer) clearTimeout(timer);
      } catch {
        fail("NATIVE_PROTOCOL_ERROR", 502);
      }
    });
    request.end(wire);
  } catch {
    fail("NATIVE_UNAVAILABLE", 502);
  }

  const events: AsyncIterable<NativeEvent> = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next(): Promise<IteratorResult<NativeEvent>> {
      if (items.length) {
        const value = items.shift() as NativeEvent;
        queued -= value.type === "frame" ? value.bytes.length : 0;
        return Promise.resolve({ value, done: false });
      }
      if (error) return Promise.reject(error);
      if (ended || closed) return Promise.resolve({ done: true });
      if (waiting)
        return Promise.reject(
          new GeminiAppError("NATIVE_PROTOCOL_ERROR", 502, "Native reader busy")
        );
      return new Promise((resolve, reject) => {
        waiting = { resolve, reject };
      });
    },
    return(): Promise<IteratorResult<NativeEvent>> {
      if (!closed) {
        closed = true;
        items.length = 0;
        queued = 0;
        if (waiting) {
          waiting.resolve({ done: true });
          waiting = null;
        }
        stop();
      }
      return Promise.resolve({ done: true });
    },
  };

  return { events, cancel: () => void (events as { return?: () => Promise<unknown> }).return?.() };
}
