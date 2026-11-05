import type { EventEmitter } from "node:events";
import WebSocket from "ws";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  encodeFrame,
  handshakeFrame,
  keepaliveFrame,
  metricsFrame,
} from "./copilot-m365-frames.ts";

type Frame = Record<string, unknown>;
export interface M365TurnSocket extends Pick<EventEmitter, "on" | "off"> {
  readonly readyState: number;
  send(data: string): void;
  close(): void;
  terminate(): void;
}
export type M365WebSocketConstructor = new (
  url: string,
  options: { headers: Record<string, string>; maxPayload: number }
) => M365TurnSocket;
export interface M365TurnOptions {
  url: string;
  invocation: Frame;
  signal?: AbortSignal;
  WebSocketCtor?: M365WebSocketConstructor;
  onFrame?: (frame: Frame) => void;
  idleTimeoutMs?: number;
  timeoutMs?: number;
}
const ERRORS = {
  M365_ABORTED: [499, "Microsoft 365 Copilot turn cancelled."],
  M365_HANDSHAKE_ERROR: [502, "Microsoft 365 Copilot handshake failed."],
  M365_PROTOCOL_ERROR: [502, "Microsoft 365 Copilot turn failed."],
  M365_SOCKET_ERROR: [502, "Microsoft 365 Copilot connection failed."],
  M365_SOCKET_CLOSED: [502, "Microsoft 365 Copilot connection closed before completion."],
  M365_FRAME_TOO_LARGE: [502, "Microsoft 365 Copilot frame exceeded the size limit."],
  M365_RESPONSE_TOO_LARGE: [502, "Microsoft 365 Copilot response exceeded the size limit."],
  M365_THROTTLED: [429, "Microsoft 365 Copilot request throttled."],
  M365_OUT_OF_CREDITS: [429, "Microsoft 365 Copilot credits exhausted."],
  M365_FORBIDDEN: [403, "Microsoft 365 Copilot access denied."],
  // A content-less turn Copilot dropped; the conversation it happened in tends to stay broken.
  M365_INTERNAL_ERROR: [502, "Microsoft 365 Copilot could not complete the turn."],
  // Its safety filter declined this request: a request-scoped provider safety stop.
  M365_DISENGAGED: [400, "Microsoft 365 Copilot declined this request."],
  M365_IDLE_TIMEOUT: [504, "Microsoft 365 Copilot turn idle timeout."],
  M365_TIMEOUT: [504, "Microsoft 365 Copilot turn timeout."],
} as const;
export type M365TurnErrorCode = keyof typeof ERRORS;
export type M365UpstreamErrorCode =
  | "PremiumModelUnavailableForLicense"
  | "ClaudeUnavailableForLicense"
  | "ForbiddenRequest"
  | "InvalidCopilotLicense";
export interface M365TurnErrorMetadata {
  upstreamErrorCode?: M365UpstreamErrorCode;
  retryAfterSeconds?: number;
  priorityWindow?: "day" | "week";
  quotaResetSource?: "priority_access" | "unknown";
}
const LICENSE_CODES: readonly string[] = [
  "PremiumModelUnavailableForLicense",
  "ClaudeUnavailableForLicense",
  "ForbiddenRequest",
  "InvalidCopilotLicense",
];
function retrySeconds(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.min(604_800, Math.ceil(value))
    : undefined;
}
export class M365TurnError extends Error implements M365TurnErrorMetadata {
  readonly status: number;
  readonly upstreamErrorCode?: M365UpstreamErrorCode;
  readonly retryAfterSeconds?: number;
  readonly priorityWindow?: "day" | "week";
  readonly quotaResetSource?: "priority_access" | "unknown";
  constructor(
    readonly code: M365TurnErrorCode,
    metadata: M365TurnErrorMetadata = {}
  ) {
    super(sanitizeErrorMessage(ERRORS[code][1]));
    this.name = "M365TurnError";
    this.status = ERRORS[code][0];
    // Copy only validated scalars, never upstream text, objects or causes.
    if (metadata.upstreamErrorCode && LICENSE_CODES.includes(metadata.upstreamErrorCode))
      this.upstreamErrorCode = metadata.upstreamErrorCode;
    this.retryAfterSeconds = retrySeconds(metadata.retryAfterSeconds);
    if (metadata.priorityWindow === "day" || metadata.priorityWindow === "week")
      this.priorityWindow = metadata.priorityWindow;
    if (metadata.quotaResetSource === "priority_access" || metadata.quotaResetSource === "unknown")
      this.quotaResetSource = metadata.quotaResetSource;
  }
}
const MAX_FRAME_BYTES = 1024 * 1024;
const MAX_RESPONSE_BYTES = 16 * 1024 * 1024;
const IDLE_TIMEOUT_MS = 120_000;
const CLOSE_GRACE_MS = 2000;
const RS = "\x1e";
function record(value: unknown): value is Frame {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function completeJsonMessage(text: string): Frame | undefined {
  try {
    const value: unknown = JSON.parse(text);
    return record(value) ? value : undefined;
  } catch {
    // Not a standalone JSON message: retain it for the ordinary RS framing path.
    return undefined;
  }
}
function positiveTimeout(value: number | undefined, fallback: number): number {
  return value !== undefined && Number.isFinite(value) && value > 0
    ? Math.min(value, 2_147_483_647)
    : fallback;
}
function finalItem(frame: Frame): Frame | undefined {
  const argument = Array.isArray(frame.arguments) ? frame.arguments[0] : undefined;
  const item = frame.item ?? (record(argument) ? argument.item : undefined);
  const canonical = Array.isArray(item) ? item[0] : item;
  return record(canonical) ? canonical : undefined;
}

// Match only a refusal opener, never quoted prose or a bare mention of Monday.
const PRIORITY_ACCESS_RE =
  /^(?:you['’]ve|you have)\s+used\s+(?:up\s+)?(?:all\s+of\s+)?your\s+(?:available\s+)?priority\s+access(?:\s+to\s+the\s+[\w.\- ]{1,32}?\s+model)?\s+for\s+(?:the\s+)?(today|day|week|this\s+week)\b/i;
function creditMetadata(result: Frame): M365TurnErrorMetadata {
  const match =
    typeof result.message === "string"
      ? result.message.trim().slice(0, 512).match(PRIORITY_ACCESS_RE)
      : null;
  if (!match) return { quotaResetSource: "unknown" };
  const priorityWindow = match[1].toLowerCase().includes("week") ? "week" : "day";
  const now = new Date();
  const days = priorityWindow === "week" ? (8 - now.getUTCDay()) % 7 || 7 : 1;
  const reset = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + days);
  return {
    priorityWindow,
    retryAfterSeconds: Math.max(1, Math.ceil((reset - now.getTime()) / 1000)),
    quotaResetSource: "priority_access",
  };
}
function hasDisengagedMessage(item: unknown): boolean {
  return (
    record(item) &&
    Array.isArray(item.messages) &&
    item.messages.some(
      (message: unknown) => record(message) && message.messageType === "Disengaged"
    )
  );
}
function messageContainers(frame: Frame, item: Frame | undefined): unknown[] {
  if (frame.type === 1 && Array.isArray(frame.arguments)) return frame.arguments;
  return frame.type === 2 ? [item] : [];
}
function finalResultError(
  result: Frame | undefined
): M365TurnErrorCode | M365TurnError | undefined {
  if (!result) return "M365_PROTOCOL_ERROR";
  switch (result.value) {
    case "Throttled":
    case "PerUserThrottled":
      // Observed throttling.metering is usage, not a retry/reset hint.
      return new M365TurnError("M365_THROTTLED", {
        retryAfterSeconds: retrySeconds(result.retryAfter),
      });
    case "OutOfCredits":
      return new M365TurnError("M365_OUT_OF_CREDITS", creditMetadata(result));
    case "ForbiddenRequest":
    case "InvalidCopilotLicense":
      return new M365TurnError("M365_FORBIDDEN", { upstreamErrorCode: result.value });
    case "Disengaged":
      return "M365_DISENGAGED";
    case "InternalError":
      return "M365_INTERNAL_ERROR";
  }
  if (result.error || result.value !== "Success") return "M365_PROTOCOL_ERROR";
}

function resultError(frame: Frame): M365TurnErrorCode | M365TurnError | undefined {
  const item = frame.type === 2 ? finalItem(frame) : undefined;
  const result = item && record(item.result) ? item.result : undefined;
  // A model/account licence refusal takes precedence over generic result.value.
  if (result && typeof result.errorCode === "string" && LICENSE_CODES.includes(result.errorCode)) {
    return new M365TurnError("M365_FORBIDDEN", {
      upstreamErrorCode: result.errorCode as M365UpstreamErrorCode,
    });
  }
  if (messageContainers(frame, item).some(hasDisengagedMessage)) return "M365_DISENGAGED";
  if (frame.type === 7) return "M365_PROTOCOL_ERROR";
  if (frame.error !== undefined && frame.error !== null && frame.error !== "") {
    return "M365_PROTOCOL_ERROR";
  }
  if (frame.type === 2) return finalResultError(result);
}

function messageBytes(data: unknown): Buffer | null {
  if (typeof data === "string") return Buffer.from(data);
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof ArrayBuffer) return Buffer.from(data);
  if (Array.isArray(data) && data.every(Buffer.isBuffer)) return Buffer.concat(data);
  return null;
}

/** Owns one transport's framing, settlement fence and physical close lifecycle. */
class M365Turn {
  private socket: M365TurnSocket | undefined;
  private settled = false;
  private handshake = false;
  private opened = false;
  private pending = "";
  private received = 0;
  private readonly decoder = new TextDecoder("utf-8", { fatal: true });
  private readonly idleMs: number;
  private readonly totalMs: number;
  private idle: ReturnType<typeof setTimeout> | undefined;
  private total: ReturnType<typeof setTimeout> | undefined;
  private termination: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private readonly options: M365TurnOptions,
    private readonly resolve: () => void,
    private readonly reject: (error: M365TurnError) => void
  ) {
    this.idleMs = positiveTimeout(options.idleTimeoutMs, IDLE_TIMEOUT_MS);
    this.totalMs = positiveTimeout(options.timeoutMs, Math.max(FETCH_TIMEOUT_MS, this.idleMs));
  }

  start(): void {
    try {
      const url = new URL(this.options.url);
      const conversationId = url.searchParams.get("ConversationId");
      if (url.protocol !== "wss:" || !conversationId) {
        this.finish("M365_HANDSHAKE_ERROR");
        return;
      }
      const Ctor = this.options.WebSocketCtor ?? WebSocket;
      this.socket = new Ctor(this.options.url, {
        maxPayload: MAX_RESPONSE_BYTES,
        headers: {
          "X-RoutingParameter-SessionKey": conversationId,
          Origin: "https://m365.cloud.microsoft",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        },
      });
      this.socket.on("error", this.onError);
      this.socket.on("close", this.onClose);
      this.socket.on("open", this.onOpen);
      this.socket.on("message", this.onMessage);
      this.options.signal?.addEventListener("abort", this.onAbort, { once: true });
      this.resetIdle();
      this.total = setTimeout(() => this.finish("M365_TIMEOUT"), this.totalMs);
      if (this.options.signal?.aborted) this.onAbort();
    } catch {
      this.finish("M365_SOCKET_ERROR");
    }
  }
  private acceptHandshake = (frame: Frame) => {
    if (!this.opened || Object.keys(frame).length !== 0) {
      this.finish("M365_HANDSHAKE_ERROR");
      return;
    }
    this.handshake = true;
    this.options.onFrame?.(frame);
    if (!this.settled) this.socket?.send(encodeFrame(this.options.invocation) + metricsFrame());
    return;
  };
  // Keep the error/close handlers until actual close: ws can emit an error while closing.
  private release = () => {
    clearTimeout(this.termination);
    this.socket?.off("error", this.onError);
    this.socket?.off("close", this.onClose);
  };
  private cleanup = () => {
    clearTimeout(this.idle);
    clearTimeout(this.total);
    this.options.signal?.removeEventListener("abort", this.onAbort);
    this.socket?.off("open", this.onOpen);
    this.socket?.off("message", this.onMessage);
    this.pending = "";
    if (!this.socket || this.socket.readyState === 3) {
      this.release();
      return;
    }
    this.termination = setTimeout(() => {
      try {
        this.socket?.terminate();
      } catch {
        // No runtime exception or credential-bearing socket error crosses the boundary.
      }
    }, CLOSE_GRACE_MS);
    this.termination.unref();
    try {
      this.socket.close();
    } catch {
      // The bounded termination above still owns physical cleanup.
    }
  };
  private finish = (code?: M365TurnErrorCode | M365TurnError, terminal?: Frame) => {
    if (this.settled) return;
    this.settled = true;
    // Claim the outcome before invoking composer code or initiating asynchronous close.
    if (!code && terminal) {
      try {
        this.options.onFrame?.(terminal);
      } catch {
        code = "M365_PROTOCOL_ERROR";
      }
    }
    this.cleanup();
    if (code) this.reject(code instanceof M365TurnError ? code : new M365TurnError(code));
    else this.resolve();
  };
  private resetIdle = () => {
    clearTimeout(this.idle);
    this.idle = setTimeout(() => this.finish("M365_IDLE_TIMEOUT"), this.idleMs);
  };
  private onAbort = () => {
    if (this.settled) return;
    try {
      if (this.socket?.readyState === 1 && this.handshake) {
        this.socket.send(
          encodeFrame({ type: 1, invocationId: "1", target: "stop", arguments: [{}] })
        );
      }
    } catch {
      // Cancellation wins over failure to send Stop.
    }
    this.finish("M365_ABORTED");
  };
  private onError = () => this.finish("M365_SOCKET_ERROR");
  private onClose = () => {
    this.finish("M365_SOCKET_CLOSED");
    this.release();
  };
  private onOpen = () => {
    if (this.settled) return;
    this.opened = true;
    this.resetIdle();
    try {
      this.socket?.send(handshakeFrame());
    } catch {
      this.finish("M365_SOCKET_ERROR");
    }
  };
  private accept = (frame: Frame) => {
    if (!this.handshake) return this.acceptHandshake(frame);
    if (!Number.isInteger(frame.type) || ![1, 2, 3, 6, 7].includes(frame.type as number)) {
      this.finish("M365_PROTOCOL_ERROR");
      return;
    }
    const error = resultError(frame);
    if (error) {
      this.finish(error);
    } else if (frame.type === 2 || frame.type === 3) {
      this.finish(undefined, frame);
    } else {
      this.options.onFrame?.(frame);
      if (!this.settled && frame.type === 6) this.socket?.send(keepaliveFrame());
    }
  };
  private onMessage = (data: unknown) => {
    if (this.settled) return;
    try {
      const bytes = messageBytes(data);
      if (!bytes) return this.finish("M365_PROTOCOL_ERROR");
      this.received += bytes.byteLength;
      if (this.received > MAX_RESPONSE_BYTES) return this.finish("M365_RESPONSE_TOO_LARGE");
      this.resetIdle();
      this.decodeMessage(bytes);
    } catch {
      this.finish(this.handshake ? "M365_PROTOCOL_ERROR" : "M365_HANDSHAKE_ERROR");
    }
  };
  private decodeMessage(bytes: Buffer): void {
    const decoded = this.decoder.decode(bytes, { stream: true });
    // Standalone complete JSON is allowed only without an earlier partial RS frame.
    if (!this.pending && !decoded.includes(RS)) {
      if (bytes.byteLength > MAX_FRAME_BYTES) return this.finish("M365_FRAME_TOO_LARGE");
      const standalone = completeJsonMessage(decoded);
      if (standalone) {
        this.accept(standalone);
        return;
      }
    }
    this.pending += decoded;
    this.drainFrames();
  }
  private drainFrames(): void {
    let separator: number;
    while (!this.settled && (separator = this.pending.indexOf(RS)) !== -1) {
      const raw = this.pending.slice(0, separator);
      this.pending = this.pending.slice(separator + 1);
      if (!raw.trim()) continue;
      if (Buffer.byteLength(raw) > MAX_FRAME_BYTES) return this.finish("M365_FRAME_TOO_LARGE");
      const frame: unknown = JSON.parse(raw);
      if (!record(frame))
        return this.finish(this.handshake ? "M365_PROTOCOL_ERROR" : "M365_HANDSHAKE_ERROR");
      this.accept(frame);
    }
    if (!this.settled && Buffer.byteLength(this.pending) > MAX_FRAME_BYTES)
      this.finish("M365_FRAME_TOO_LARGE");
  }
}

/** One SignalR turn only; content composition and credentials belong to the caller. */
export function runM365Turn(options: M365TurnOptions): Promise<void> {
  if (options.signal?.aborted) return Promise.reject(new M365TurnError("M365_ABORTED"));
  return new Promise<void>((resolve, reject) => {
    new M365Turn(options, resolve, reject).start();
  });
}
