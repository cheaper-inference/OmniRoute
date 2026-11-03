import { type RawData } from "ws";
import { createFalEventParser } from "./events.ts";
import { normalizeFalOutput } from "./output.ts";
import { falRecord } from "./schema.ts";

type Emit = (event: string, data: unknown) => void;
type Artifact = (bytes: Uint8Array, type: string, name: string) => string;
type Start = { id: string; status: number; headers: Record<string, unknown> };
function status(value: unknown): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 100 || value > 599)
    throw new Error("Invalid HTTP status");
  return value;
}
function header(start: Start, name: string) {
  return String(
    Object.entries(start.headers).find(([key]) => key.toLowerCase() === name)?.[1] ?? ""
  );
}
function control(bytes: Buffer, binary: boolean) {
  if (binary) return {};
  try {
    return falRecord(JSON.parse(bytes.toString()));
  } catch {
    return {};
  }
}
/** Per-invocation response state, independent from the lifetime of its socket. */
export class FalHttpWebsocketReply {
  pending = false;
  private current: Start | null = null;
  private chunks: Buffer[] = [];
  private size = 0;
  private decoder = new TextDecoder();
  private parser: ReturnType<typeof createFalEventParser>;
  constructor(
    private emit: Emit,
    private artifact: Artifact,
    private completed: () => void
  ) {
    this.parser = this.newParser();
  }
  private newParser() {
    return createFalEventParser((event) => this.emit(event.event, event.data));
  }
  consume(raw: RawData, binary: boolean) {
    const bytes = Array.isArray(raw)
      ? Buffer.concat(raw)
      : Buffer.from(raw instanceof ArrayBuffer ? new Uint8Array(raw) : raw);
    const frame = control(bytes, binary);
    if (frame.type === "start") return this.start(frame);
    if (frame.type === "end") return this.end(frame);
    if (!this.current || !this.pending) throw new Error("Body outside response");
    this.size += bytes.length;
    if (this.size > 32 * 1024 * 1024) throw new Error("Body limit");
    if (header(this.current, "content-type").includes("text/event-stream"))
      this.parser.push(this.decoder.decode(bytes, { stream: true }));
    else this.chunks.push(bytes);
  }
  private start(frame: Record<string, unknown>) {
    if (
      this.current ||
      !this.pending ||
      typeof frame.request_id !== "string" ||
      !frame.headers ||
      Array.isArray(frame.headers) ||
      typeof frame.headers !== "object"
    )
      throw new Error("Invalid start");
    this.current = {
      id: frame.request_id,
      status: status(frame.status),
      headers: falRecord(frame.headers),
    };
    this.emit("http-start", frame);
  }
  private result(start: Start, completion: Record<string, unknown>) {
    const type = header(start, "content-type") || "application/octet-stream";
    if (type.includes("text/event-stream")) {
      this.parser.push(this.decoder.decode());
      this.parser.finish();
      return normalizeFalOutput({ completion });
    }
    if (/^(text\/|application\/(json|[^;]+\+json))/.test(type))
      return normalizeFalOutput(this.text(type));
    const name =
      header(start, "content-disposition").match(/filename="?([^";]+)"?/)?.[1] ?? "fal-output";
    const file = {
      url: this.artifact(Buffer.concat(this.chunks), type, name),
      file_name: name,
      content_type: type,
    };
    return { output: { file }, artifacts: [{ ...file, path: "$.file" }] };
  }
  private text(type: string): unknown {
    const text = Buffer.concat(this.chunks).toString("utf8");
    if (type.includes("json")) {
      try {
        return JSON.parse(text);
      } catch {
        /* Preserve native non-JSON error text. */
      }
    }
    return text;
  }
  private end(frame: Record<string, unknown>) {
    const start = this.current;
    if (!start || frame.request_id !== start.id) throw new Error("Invalid end");
    const failed = start.status >= 400 || status(frame.status) >= 400;
    const completion = { ...start, ...frame };
    this.emit(failed ? "error" : "final", {
      ...this.result(start, completion),
      http: completion,
      partial: false,
      ...(failed ? { error: "Fal upstream HTTP response failed" } : {}),
    });
    this.pending = false;
    this.current = null;
    this.chunks = [];
    this.size = 0;
    this.decoder = new TextDecoder();
    this.parser = this.newParser();
    this.completed();
  }
  dispose() {
    this.chunks = [];
  }
}
