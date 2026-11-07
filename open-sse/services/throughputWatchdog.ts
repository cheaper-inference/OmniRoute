/**
 * Deterministic quality watchdog for active SSE streams.
 *
 * Unlike the idle timeout, this only makes a decision after a warm-up period and
 * a complete rolling window. Heartbeats/metadata and tool/reasoning phases do not
 * count as assistant output (and tool/reasoning phases suspend judgement).
 */

export interface ThroughputWatchdogOptions {
  enabled?: boolean;
  warmupMs?: number;
  windowMs?: number;
  minUsefulBytesPerSecond?: number;
  minUsefulBytes?: number;
  now?: () => number;
}

export interface ThroughputWatchdogDecision {
  abort: boolean;
  reason?: "throughput_too_low";
  usefulBytes: number;
  rateBytesPerSecond: number;
  protectedPhase: boolean;
}

export class ThroughputWatchdogError extends Error {
  readonly code = "STREAM_THROUGHPUT_TOO_LOW";

  constructor(message = "Upstream stream throughput remained below the configured minimum") {
    super(message);
    this.name = "ThroughputWatchdogError";
  }
}

type ParsedEvent = { usefulBytes: number; protectedPhase: boolean };

function parseEvent(event: string): ParsedEvent {
  const lines = event.split(/\r?\n/);
  const eventName = lines
    .find((line) => /^event:\s*/i.test(line))
    ?.replace(/^event:\s*/i, "")
    .trim();
  const data = lines
    .filter((line) => /^data:\s*/i.test(line))
    .map((line) => line.replace(/^data:\s*/i, "").trim())
    .join("\n");
  if (!data || data === "[DONE]") return { usefulBytes: 0, protectedPhase: false };

  let payload: unknown;
  try {
    payload = JSON.parse(data);
  } catch {
    return { usefulBytes: 0, protectedPhase: false };
  }

  const record = payload as Record<string, unknown>;
  const type = typeof record.type === "string" ? record.type : eventName;
  if (type && /(reasoning|thinking|tool|function_call)/i.test(type)) {
    return { usefulBytes: 0, protectedPhase: true };
  }

  const choices = Array.isArray(record.choices) ? record.choices : [];
  let useful = "";
  let protectedPhase = false;
  for (const choice of choices) {
    const delta = (choice as Record<string, unknown>).delta;
    if (!delta || typeof delta !== "object") continue;
    const deltaRecord = delta as Record<string, unknown>;
    if (Array.isArray(deltaRecord.tool_calls) || deltaRecord.function_call) {
      protectedPhase = true;
    }
    for (const key of ["content", "text"]) {
      if (typeof deltaRecord[key] === "string") useful += deltaRecord[key] as string;
    }
    if (
      typeof deltaRecord.reasoning_content === "string" ||
      typeof deltaRecord.reasoning === "string"
    ) {
      protectedPhase = true;
    }
  }

  const outputText = typeof record.delta === "string" ? record.delta : undefined;
  if (outputText) useful += outputText;
  const nestedDelta = record.delta;
  if (nestedDelta && typeof nestedDelta === "object") {
    const nested = nestedDelta as Record<string, unknown>;
    const nestedType = typeof nested.type === "string" ? nested.type : "";
    if (/(reasoning|thinking|tool|function_call)/i.test(nestedType)) {
      protectedPhase = true;
    }
    if (typeof nested.text === "string") useful += nested.text;
  }
  const contentBlock = record.content_block;
  if (contentBlock && typeof contentBlock === "object") {
    const blockType = (contentBlock as Record<string, unknown>).type;
    if (typeof blockType === "string" && /(reasoning|thinking|tool_use)/i.test(blockType)) {
      protectedPhase = true;
    }
  }
  const gemini = scanGeminiCandidates(record);
  if (gemini.protectedPhase) protectedPhase = true;
  if (gemini.useful) useful += gemini.useful;
  if (protectedPhase) useful = "";
  return {
    usefulBytes: useful ? new TextEncoder().encode(useful).byteLength : 0,
    protectedPhase,
  };
}

function extractCandidateParts(candidate: unknown): unknown[] {
  if (!candidate || typeof candidate !== "object") return [];
  const content = (candidate as Record<string, unknown>).content;
  if (!content || typeof content !== "object") return [];
  const parts = (content as Record<string, unknown>).parts;
  return Array.isArray(parts) ? parts : [];
}

function isProtectedGeminiPart(part: Record<string, unknown>): boolean {
  return Boolean(
    part.thought === true ||
    typeof part.thoughtSignature === "string" ||
    part.functionCall ||
    part.executableCode ||
    part.codeExecutionResult
  );
}

function scanGeminiCandidates(record: Record<string, unknown>): {
  useful: string;
  protectedPhase: boolean;
} {
  const direct = record.candidates;
  const resp = record.response;
  const nested =
    resp && typeof resp === "object" ? (resp as Record<string, unknown>).candidates : undefined;
  const candidates = Array.isArray(direct) ? direct : Array.isArray(nested) ? nested : [];
  let useful = "";
  let protectedPhase = false;
  for (const candidate of candidates) {
    for (const part of extractCandidateParts(candidate)) {
      if (!part || typeof part !== "object") continue;
      const partRecord = part as Record<string, unknown>;
      if (isProtectedGeminiPart(partRecord)) protectedPhase = true;
      else if (typeof partRecord.text === "string") useful += partRecord.text;
    }
  }
  return { useful, protectedPhase };
}

export class ThroughputWatchdog {
  private readonly enabled: boolean;
  private readonly warmupMs: number;
  private readonly windowMs: number;
  private readonly minimumRate: number;
  private readonly minimumBytes: number;
  private readonly now: () => number;
  private startedAt: number | null = null;
  private buffer = "";
  private readonly decoder = new TextDecoder();
  private samples: Array<{ at: number; bytes: number }> = [];
  private protectedPhase = false;

  constructor(options: ThroughputWatchdogOptions = {}) {
    this.enabled = options.enabled === true;
    this.warmupMs = Math.max(0, Math.floor(options.warmupMs ?? 30_000));
    this.windowMs = Math.max(1, Math.floor(options.windowMs ?? 30_000));
    this.minimumRate = Math.max(0, options.minUsefulBytesPerSecond ?? 1);
    this.minimumBytes = Math.max(1, Math.floor(options.minUsefulBytes ?? 1));
    this.now = options.now ?? (() => Date.now());
  }

  observe(chunk: Uint8Array | string): ThroughputWatchdogDecision {
    const at = this.now();
    if (this.startedAt === null) this.startedAt = at;
    if (!this.enabled) return this.decision(false, 0);
    this.buffer += typeof chunk === "string" ? chunk : this.decoder.decode(chunk, { stream: true });
    const events = this.buffer.split(/\r?\n\r?\n/);
    this.buffer = events.pop() ?? "";
    let useful = 0;
    for (const event of events) {
      const parsed = parseEvent(event);
      useful += parsed.usefulBytes;
      if (parsed.protectedPhase) this.protectedPhase = true;
      if (parsed.usefulBytes > 0) this.protectedPhase = false;
    }
    if (useful > 0) this.samples.push({ at, bytes: useful });
    const cutoff = at - this.windowMs;
    this.samples = this.samples.filter((sample) => sample.at >= cutoff);
    const windowBytes = this.samples.reduce((sum, sample) => sum + sample.bytes, 0);
    const elapsed = at - (this.startedAt ?? at);
    const rate = windowBytes / Math.max(1, this.windowMs / 1000);
    const ready = elapsed >= this.warmupMs + this.windowMs;
    const measurable = windowBytes === 0 || windowBytes >= this.minimumBytes;
    const abort = ready && !this.protectedPhase && measurable && rate < this.minimumRate;
    return this.decision(abort, windowBytes, rate);
  }

  private decision(
    abort: boolean,
    usefulBytes: number,
    rateBytesPerSecond = 0
  ): ThroughputWatchdogDecision {
    return {
      abort,
      reason: abort ? "throughput_too_low" : undefined,
      usefulBytes,
      rateBytesPerSecond,
      protectedPhase: this.protectedPhase,
    };
  }
}

export function createThroughputWatchdog(
  options: ThroughputWatchdogOptions = {}
): ThroughputWatchdog {
  return new ThroughputWatchdog(options);
}
