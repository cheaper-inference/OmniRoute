import { open as openFile } from "node:fs/promises";
import { join } from "node:path";
import WebSocket, { type RawData } from "ws";
import { decodeZcodeValue, encodeZcodeRpcCall, type ZcodeCallOptions } from "../zcodeProtocol.ts";

const HEADER_BYTES = 13;
const MAX_FRAME_BYTES = 32 * 1024 * 1024;
const MAX_METADATA_BYTES = 64 * 1024;
const RPC_CONTEXTS = new Set([
  "project.saveProject",
  "model-selection.getView",
  "zcode-agent.generateWorkspaceText",
  "usage-stats.getEntitlementSnapshot",
  ...[
    "createSession",
    "sendPrompt",
    "readSession",
    "getTaskTokenUsage",
    "closeSession",
    "disposeWorkspace",
  ].map((method) => `zcode-agent.${method}`),
]);

type Pending = {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  cleanup: () => void;
  rpc: string;
};

type Options = { serverRoot: string; requestTimeoutMs?: number; startupTimeoutMs?: number };

function safeCode(value: unknown): string | number | undefined {
  if (value === "model_request_cancelled") return value;
  if (typeof value === "number" && Number.isSafeInteger(value)) return value;
  if (typeof value === "string" && /^(?:[A-Z][A-Z0-9_]{1,31}|[0-9]{1,10})$/.test(value))
    return value;
  return undefined;
}

export class NativeZcodeHostClient {
  private readonly options: Options;
  private readonly abort = new AbortController();
  private socket?: WebSocket;
  private startup?: Promise<void>;
  private readyResolve?: () => void;
  private readyReject?: (error: Error) => void;
  private startupTimer?: ReturnType<typeof setTimeout>;
  private startupCleanup?: () => void;
  private startupStage = "metadata";
  private ready = false;
  private closed = false;
  private buffer = Buffer.alloc(0);
  private nextId = 1;
  private secretValues: string[] = [];
  private readonly pending = new Map<number, Pending>();

  constructor(options: Options) {
    this.options = options;
  }

  start(options: ZcodeCallOptions = {}): Promise<void> {
    if (this.closed) return Promise.reject(new Error("ZCode host client is closed"));
    if (options.signal?.aborted) return Promise.reject(new Error("ZCode host startup canceled"));
    if (this.startup) return this.startup;
    this.startup = new Promise<void>((resolve, reject) => {
      this.readyResolve = () => {
        if (this.startupTimer) clearTimeout(this.startupTimer);
        this.startupCleanup?.();
        this.ready = true;
        this.readyResolve = undefined;
        this.readyReject = undefined;
        resolve();
      };
      this.readyReject = reject;
      this.startupTimer = setTimeout(
        () => this.fail(`ZCode host startup timed out (stage=${this.startupStage})`),
        options.timeoutMs ?? this.options.startupTimeoutMs ?? 10000
      );
      const onAbort = () => this.fail("ZCode host startup canceled");
      options.signal?.addEventListener("abort", onAbort, { once: true });
      this.startupCleanup = () => options.signal?.removeEventListener("abort", onAbort);
      void this.open().catch(() =>
        this.fail(`ZCode host startup failed (stage=${this.startupStage})`)
      );
    });
    return this.startup;
  }

  private async open(): Promise<void> {
    const read = async (name: string) => {
      const file = await openFile(join(this.options.serverRoot, "run", name), "r");
      try {
        const data = Buffer.alloc(MAX_METADATA_BYTES + 1);
        const { bytesRead } = await file.read(data, 0, data.length, 0);
        if (bytesRead > MAX_METADATA_BYTES) throw new Error("metadata too large");
        return data.subarray(0, bytesRead).toString("utf8");
      } finally {
        await file.close();
      }
    };
    const [stateText, tokenText] = await Promise.all([read("status.json"), read("ingress-token")]);
    const state = JSON.parse(stateText) as { port?: unknown };
    const port = state.port;
    const token = tokenText.trim();
    this.secretValues = [token];
    if (!Number.isInteger(port) || (port as number) < 1 || (port as number) > 65535 || !token)
      throw new Error("invalid metadata");
    this.startupStage = "capability";
    const response = await fetch(`http://127.0.0.1:${port}/api/rpc-host-capability`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      signal: this.abort.signal,
    });
    if (!response.ok || !response.body) throw new Error("capability unavailable");
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_METADATA_BYTES) {
        await reader.cancel();
        throw new Error("capability too large");
      }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8")) as { capability?: unknown };
    if (typeof body.capability !== "string" || !body.capability || this.closed)
      throw new Error("invalid capability");
    this.secretValues.push(body.capability);
    this.startupStage = "websocket";
    const socket = new WebSocket(`ws://127.0.0.1:${port}/ws/host`, {
      headers: { Authorization: `Bearer ${token}`, "x-zcode-rpc-host-capability": body.capability },
      maxPayload: MAX_FRAME_BYTES + HEADER_BYTES,
    });
    this.socket = socket;
    socket.on("open", () => {
      this.startupStage = "handshake";
    });
    socket.on("message", (raw, isBinary) => {
      if (!isBinary) {
        this.fail("Invalid ZCode host frame");
        return;
      }
      try {
        this.consume(raw);
      } catch {
        this.fail("Invalid ZCode host frame");
      }
    });
    socket.on("error", () => this.fail("ZCode host transport error"));
    socket.on("close", () => this.fail("ZCode host disconnected"));
  }

  private consume(raw: RawData): void {
    const chunk = Array.isArray(raw) ? Buffer.concat(raw) : Buffer.from(raw as ArrayBuffer);
    if (this.buffer.length + chunk.length > MAX_FRAME_BYTES + HEADER_BYTES)
      throw new Error("frame buffer too large");
    this.buffer = Buffer.concat([this.buffer, chunk]);
    let offset = 0;
    while (this.buffer.length - offset >= HEADER_BYTES) {
      const length = this.buffer.readUInt32BE(offset + 9);
      if (length > MAX_FRAME_BYTES) throw new Error("frame too large");
      if (this.buffer.length - offset < HEADER_BYTES + length) break;
      const type = this.buffer[offset];
      const body = this.buffer.subarray(offset + HEADER_BYTES, offset + HEADER_BYTES + length);
      offset += HEADER_BYTES + length;
      this.consumeFrame(type, body);
    }
    if (offset) this.buffer = this.buffer.subarray(offset);
  }

  private consumeFrame(type: number, body: Buffer): void {
    if (type !== 1) return;
    const header = decodeZcodeValue(body);
    const payload = decodeZcodeValue(body, header.offset);
    if (payload.offset !== body.length || !Array.isArray(header.value))
      throw new Error("bad frame");
    const [kind, id] = header.value;
    if (kind === 200) {
      this.readyResolve?.();
      return;
    }
    if (![201, 202, 203].includes(kind) || typeof id !== "number") return;
    const pending = this.pending.get(id);
    if (!pending) return;
    this.pending.delete(id);
    pending.cleanup();
    if (kind === 201) pending.resolve(payload.value);
    else {
      const error = new Error(
        kind === 203 ? "ZCode host request canceled" : "ZCode host request failed"
      );
      const value =
        payload.value && typeof payload.value === "object"
          ? (payload.value as Record<string, unknown>)
          : {};
      const data =
        value.data && typeof value.data === "object" ? (value.data as Record<string, unknown>) : {};
      const sanitizeCode = (candidate: unknown) => {
        const code = safeCode(candidate);
        return typeof code === "string" &&
          this.secretValues.some((secret) => secret && code.includes(secret))
          ? undefined
          : code;
      };
      const code = sanitizeCode(value.code),
        providerCode = sanitizeCode(data.code);
      if (
        [value.message, data.message].some(
          (message) =>
            typeof message === "string" &&
            message.trim().toLowerCase() === "request has been blocked due to unusual activity."
        )
      )
        Object.assign(error, { providerReason: "unusual_activity" });
      if (code !== undefined) Object.assign(error, { code });
      if (providerCode !== undefined) Object.assign(error, { providerCode });
      error.message += ` (rpc=${pending.rpc}${code === undefined ? "" : `, code=${code}`}${
        providerCode === undefined ? "" : `, providerCode=${providerCode}`
      })`;
      pending.reject(error);
    }
  }

  async call(
    channel: string,
    method: string,
    args: unknown[],
    options: ZcodeCallOptions = {}
  ): Promise<unknown> {
    if (options.signal?.aborted) throw new Error("ZCode host request canceled");
    await this.start(options);
    if (options.signal?.aborted) throw new Error("ZCode host request canceled");
    const socket = this.socket;
    if (!this.ready || !socket || socket.readyState !== WebSocket.OPEN)
      throw new Error("ZCode host is not ready");
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      const failRequest = (message: string) => {
        const pending = this.pending.get(id);
        if (!pending) return;
        this.pending.delete(id);
        pending.cleanup();
        reject(new Error(message));
      };
      const onAbort = () => failRequest("ZCode host request canceled");
      const timer = setTimeout(
        () => failRequest("ZCode host request timed out"),
        options.timeoutMs ?? this.options.requestTimeoutMs ?? 90000
      );
      this.pending.set(id, {
        resolve,
        reject,
        rpc: RPC_CONTEXTS.has(`${channel}.${method}`) ? `${channel}.${method}` : "other",
        cleanup: () => {
          clearTimeout(timer);
          options.signal?.removeEventListener("abort", onAbort);
        },
      });
      options.signal?.addEventListener("abort", onAbort, { once: true });
      try {
        socket.send(encodeZcodeRpcCall(id, channel, method, args), (error) => {
          if (!error) return;
          const pending = this.pending.get(id);
          if (pending) {
            this.pending.delete(id);
            pending.cleanup();
            pending.reject(new Error("ZCode host transport error"));
          }
        });
      } catch {
        failRequest("ZCode host transport error");
      }
    });
  }

  async close(): Promise<void> {
    this.fail("ZCode host client is closed");
  }

  private fail(message: string): void {
    if (this.closed) return;
    this.closed = true;
    this.ready = false;
    this.abort.abort();
    if (this.startupTimer) clearTimeout(this.startupTimer);
    this.startupCleanup?.();
    this.readyReject?.(new Error(message));
    this.readyReject = undefined;
    this.readyResolve = undefined;
    for (const pending of this.pending.values()) {
      pending.cleanup();
      pending.reject(new Error(message));
    }
    this.pending.clear();
    this.buffer = Buffer.alloc(0);
    this.secretValues = [];
    this.socket?.terminate();
  }
}
