import { encode, decode } from "@msgpack/msgpack";
import type { RawData } from "ws";
import { canonicalFalEndpoint } from "../../config/falEndpoint.ts";
import { normalizeFalOutput } from "./output.ts";
import { FalSocket, type FalSocketArgs } from "./socket.ts";
import type { FalRecord } from "./schema.ts";

export { falRealtimePath } from "../../config/falEndpoint.ts";
export type FalRealtimeConnection = {
  output: ReadableStream<Uint8Array>;
  send: (input: FalRecord) => void;
  close: () => void;
};
type Artifact = (bytes: Uint8Array, type: string, name: string) => string;
function realtimeOutput(data: RawData, artifact?: Artifact) {
  const bytes = Array.isArray(data)
    ? Buffer.concat(data)
    : data instanceof ArrayBuffer
      ? new Uint8Array(data)
      : data;
  const payload = decode(bytes);
  const normalized = normalizeFalOutput(payload);
  binaryFiles(payload, "$", normalized.artifacts, artifact);
  // Keep native binary values alongside usable file downloads.
  return JSON.parse(
    JSON.stringify(normalized, (_key, value) =>
      value instanceof Uint8Array ? { binary_base64: Buffer.from(value).toString("base64") } : value
    )
  );
}
function binaryFiles(value: unknown, path: string, artifacts: FalRecord[], artifact?: Artifact) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => binaryFiles(item, `${path}[${i}]`, artifacts, artifact));
    return;
  }
  if (!value || typeof value !== "object") return;
  const file = value as FalRecord;
  if (file.content instanceof Uint8Array && typeof file.content_type === "string") {
    const name = typeof file.file_name === "string" ? file.file_name : "realtime-output";
    const url = artifact
      ? artifact(file.content, file.content_type, name)
      : `data:${file.content_type};base64,${Buffer.from(file.content).toString("base64")}`;
    artifacts.push({ ...file, content: undefined, path, url });
  }
  for (const [key, item] of Object.entries(file))
    if (key !== "content") binaryFiles(item, `${path}.${key}`, artifacts, artifact);
}
/** Credentials stay server-side; gateway routes validate and meter every message. */
export async function connectFalRealtime(
  args: FalSocketArgs & { path: string; artifact?: Artifact }
): Promise<FalRealtimeConnection> {
  const socket = new FalSocket(`wss://fal.run/${canonicalFalEndpoint(args.path)}`, args);
  socket.socket.on("message", (data: RawData) => {
    try {
      socket.emit("message", realtimeOutput(data, args.artifact));
    } catch {
      socket.fail("Invalid fal realtime output");
    }
  });
  await socket.ready();
  return {
    output: socket.output,
    close: socket.close,
    send: (input) => socket.send(encode(input)),
  };
}
