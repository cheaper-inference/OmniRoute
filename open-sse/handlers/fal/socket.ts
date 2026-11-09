import WebSocket from "ws";
import { HttpsProxyAgent } from "https-proxy-agent";
import { FalError } from "./client.ts";

export type FalSocketArgs = {
  token: string;
  proxyUrl?: string | null;
  signal: AbortSignal;
  onClose: () => void;
  uncertain?: () => boolean;
  socketFactory?: (url: string, options: WebSocket.ClientOptions) => WebSocket;
};
/** Shared bounded socket lifecycle; protocol adapters never reconnect or replay. */
export class FalSocket {
  readonly socket: WebSocket;
  readonly output: ReadableStream<Uint8Array>;
  private controller: ReadableStreamDefaultController<Uint8Array>;
  private closed = false;
  private encoder = new TextEncoder();
  constructor(
    url: string,
    private args: FalSocketArgs
  ) {
    if (args.proxyUrl && !/^https?:/.test(args.proxyUrl))
      throw new FalError("This proxy transport does not support Fal WebSockets", 409);
    this.socket = (args.socketFactory ?? ((target, options) => new WebSocket(target, options)))(
      url,
      {
        headers: { Authorization: `Key ${args.token}` },
        followRedirects: false,
        handshakeTimeout: 15_000,
        maxPayload: 32 * 1024 * 1024,
        ...(args.proxyUrl ? { agent: new HttpsProxyAgent(args.proxyUrl) } : {}),
      }
    );
    this.output = new ReadableStream<Uint8Array>({
      start: (controller) => {
        this.controller = controller;
      },
      pull: () => this.socket.resume(),
      cancel: () => this.close(),
    });
    args.signal.addEventListener("abort", this.abort, { once: true });
    this.socket.on("error", () => this.fail("Fal WebSocket connection failed"));
    this.socket.once("close", () => {
      if (args.uncertain?.())
        this.emit("error", { error: "Fal connection lost", status: "SUBMISSION_UNKNOWN" });
      this.close();
    });
  }
  private abort = () => {
    if (this.args.uncertain?.())
      this.emit("error", {
        error: "Fal WebSocket stopped; upstream completion is unknown",
        status: "SUBMISSION_UNKNOWN",
      });
    this.close();
  };
  async ready() {
    await new Promise<void>((resolve, reject) => {
      this.socket.once("open", resolve);
      this.socket.once("error", () => reject(new FalError("Fal WebSocket connection failed", 502)));
      this.socket.once("close", () => reject(new FalError("Fal WebSocket connection closed", 502)));
      if (this.args.signal.aborted) {
        this.close();
        reject(new FalError("Fal WebSocket aborted", 504));
      }
    });
  }
  emit(event: string, data: unknown) {
    if (this.closed) return;
    const prefix = event === "message" ? "" : `event: ${event}\n`;
    this.controller.enqueue(this.encoder.encode(`${prefix}data: ${JSON.stringify(data)}\n\n`));
    if (this.controller.desiredSize !== null && this.controller.desiredSize <= 0)
      this.socket.pause();
  }
  fail(message: string) {
    this.emit("error", { error: message, status: "SUBMISSION_UNKNOWN" });
    this.close();
  }
  close = () => {
    if (this.closed) return;
    this.closed = true;
    this.args.signal.removeEventListener("abort", this.abort);
    this.socket.terminate();
    try {
      this.controller.close();
    } catch {
      /* A cancelled stream is already closed. */
    }
    this.args.onClose();
  };
  assertOpen() {
    if (this.closed || this.socket.readyState !== WebSocket.OPEN)
      throw new FalError("Fal WebSocket session has ended or expired", 410);
  }
  send(data: string | Uint8Array) {
    this.assertOpen();
    if (this.socket.bufferedAmount > 1024 * 1024)
      throw new FalError("Fal WebSocket send buffer is full", 429);
    this.socket.send(data, (error) => {
      if (error) this.fail("Fal WebSocket submission is uncertain");
    });
  }
}
