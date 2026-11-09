import { canonicalFalEndpoint } from "../../config/falEndpoint.ts";
import { FalError } from "./client.ts";
import { FalSocket, type FalSocketArgs } from "./socket.ts";
import { FalHttpWebsocketReply } from "./httpWebsocketReply.ts";
import type { FalRealtimeConnection } from "./realtime.ts";

/** Official HTTP-over-WebSockets: plain input, start, raw body, end. */
export async function connectFalHttpWebsocket(
  args: Omit<FalSocketArgs, "onClose"> & {
    endpoint: string;
    timeoutMs: number;
    onClose: (uncertain: boolean) => void;
    artifact: (bytes: Uint8Array, type: string, name: string) => string;
  }
): Promise<FalRealtimeConnection> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const socket = new FalSocket(`wss://ws.fal.run/${canonicalFalEndpoint(args.endpoint)}`, {
    ...args,
    uncertain: () => reply.pending,
    onClose() {
      clearTimeout(timer);
      reply.dispose();
      args.onClose(reply.pending);
    },
  });
  const reply = new FalHttpWebsocketReply(
    (event, data) => socket.emit(event, data),
    args.artifact,
    () => clearTimeout(timer)
  );
  socket.socket.on("message", (raw, binary) => {
    try {
      reply.consume(raw, binary);
    } catch {
      socket.fail("Invalid or oversized Fal HTTP WebSocket response");
    }
  });
  await socket.ready();
  return {
    output: socket.output,
    close: socket.close,
    send(input) {
      socket.assertOpen();
      if (reply.pending) throw new FalError("The previous Fal invocation has not ended", 409);
      reply.pending = true;
      timer = setTimeout(
        () => socket.fail("Fal HTTP WebSocket invocation timed out"),
        args.timeoutMs
      );
      try {
        socket.send(JSON.stringify(input));
      } catch (error) {
        reply.pending = false;
        clearTimeout(timer);
        throw error;
      }
    },
  };
}
