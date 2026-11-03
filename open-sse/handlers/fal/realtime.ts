import WebSocket, { type RawData } from "ws";
import { encode, decode } from "@msgpack/msgpack";
import { HttpsProxyAgent } from "https-proxy-agent";
import { canonicalFalEndpoint } from "../../config/falEndpoint.ts";
import { FalError, normalizeFalOutput } from "./client.ts";
import { type FalRecord } from "./schema.ts";

export { falRealtimePath } from "../../config/falEndpoint.ts";

export type FalRealtimeConnection = {
  output: ReadableStream<Uint8Array>;
  send: (input: FalRecord) => void;
  close: () => void;
};

/** All credentials stay server-side. A gateway request validates and meters each message. */
export async function connectFalRealtime(args: {
  path: string;
  token: string;
  proxyUrl?: string | null;
  signal: AbortSignal;
  onClose: () => void;
  socketFactory?: (url: string, options: WebSocket.ClientOptions) => WebSocket;
}): Promise<FalRealtimeConnection> {
  const path = canonicalFalEndpoint(args.path);
  if (args.proxyUrl && !/^https?:/.test(args.proxyUrl)) {
    throw new FalError("This proxy transport does not support fal realtime", 409);
  }
  const socket = (args.socketFactory ?? ((url, options) => new WebSocket(url, options)))(
    `wss://fal.run/${path}`,
    {
      headers: { Authorization: `Key ${args.token}` },
      followRedirects: false,
      handshakeTimeout: 15_000,
      ...(args.proxyUrl ? { agent: new HttpsProxyAgent(args.proxyUrl) } : {}),
    }
  );
  let controller: ReadableStreamDefaultController<Uint8Array>;
  let closed = false;
  const encoder = new TextEncoder();
  const close = () => {
    if (closed) return;
    closed = true;
    args.signal.removeEventListener("abort", close);
    socket.terminate();
    try {
      controller?.close();
    } catch {
      /* A cancelled ReadableStream is already closed. */
    }
    args.onClose();
  };
  const output = new ReadableStream<Uint8Array>({
    start(value) {
      controller = value;
    },
    pull() {
      socket.resume();
    },
    cancel() {
      close();
    },
  });
  args.signal.addEventListener("abort", close, { once: true });
  socket.on("message", (data: RawData) => {
    if (closed) return;
    try {
      const bytes = Array.isArray(data)
        ? Buffer.concat(data)
        : data instanceof ArrayBuffer
          ? new Uint8Array(data)
          : data;
      const payload = decode(bytes);
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify(normalizeFalOutput(payload), (_key, value) =>
            value instanceof Uint8Array
              ? { binary_base64: Buffer.from(value).toString("base64") }
              : value
          )}\n\n`
        )
      );
      if (controller.desiredSize !== null && controller.desiredSize <= 0) socket.pause();
    } catch {
      controller.enqueue(
        encoder.encode('event: error\ndata: {"error":"Invalid fal realtime output"}\n\n')
      );
      close();
    }
  });
  socket.on("error", () => {
    if (!closed)
      controller.enqueue(
        encoder.encode('event: error\ndata: {"error":"Fal realtime connection failed"}\n\n')
      );
    close();
  });
  socket.once("close", close);
  await new Promise<void>((resolve, reject) => {
    socket.once("open", resolve);
    socket.once("error", () => reject(new FalError("Fal realtime connection failed", 502)));
    socket.once("close", () => reject(new FalError("Fal realtime connection closed", 502)));
    if (args.signal.aborted) {
      close();
      reject(new FalError("Fal realtime connection aborted", 504));
    }
  });
  return {
    output,
    close,
    send(input) {
      if (closed || socket.readyState !== WebSocket.OPEN)
        throw new FalError("Fal realtime session has ended", 410);
      socket.send(encode(input));
    },
  };
}
