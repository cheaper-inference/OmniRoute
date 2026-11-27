/** Normalize non-object and array inputs to an empty usage record. */
const record = (value) =>
  value && typeof value === "object" && !Array.isArray(value) ? value : {};
/** Accept finite nonnegative counters, preserving zero and returning null for invalid values. */
const counter = (value) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
/** Validate the first present alias; an invalid preferred value does not fall through. */
const first = (values) => {
  for (const value of values) if (value !== undefined && value !== null) return counter(value);
  return null;
};
/** Raw observations deliberately distinguish absence from explicit numeric zero. */
export function rawCacheUsage(input) {
  const u = record(input),
    p = record(u.prompt_tokens_details),
    i = record(u.input_tokens_details);
  return {
    inputTokens: first([u.input_tokens, u.prompt_tokens]),
    outputTokens: first([u.output_tokens, u.completion_tokens]),
    cacheReadTokens: first([
      u.cache_read_input_tokens,
      i.cached_tokens,
      p.cached_tokens,
      u.cached_tokens,
    ]),
    cacheWriteTokens: first([
      u.cache_creation_input_tokens,
      p.cache_creation_tokens,
      i.cache_creation_tokens,
      p.cache_write_tokens,
      i.cache_write_tokens,
      u.cache_write_tokens,
    ]),
  };
}
/** Incremental bounded JSON/SSE observer; never reads from or rewrites the transport stream. */
export function createCacheUsageParser({ maxFrameBytes = 256 * 1024, sse = true } = {}) {
  const decoder = new TextDecoder();
  const lineEnding = /\r\n|[\r\n]/g;
  let frame = "",
    frameBytes = 0,
    separator = "",
    pendingCR = false,
    unavailable = false,
    terminal = false,
    usage = rawCacheUsage(null),
    reported = false;
  /** Merge reported counters from one JSON payload and track terminal markers independently. */
  function consume(text) {
    if (text === "[DONE]") {
      terminal = true;
      return;
    }
    try {
      const value = JSON.parse(text);
      const candidate = value.response?.usage ?? value.usage;
      if (candidate && typeof candidate === "object") {
        const next = rawCacheUsage(candidate);
        for (const key of Object.keys(usage)) {
          if (next[key] === null) continue;
          usage[key] = next[key];
          reported = true;
        }
      }
      if (
        ["response.completed", "response.incomplete", "response.failed", "message_stop"].includes(
          value.type
        )
      )
        terminal = true;
      if (!sse) terminal = true;
    } catch {
      /* Malformed frames establish no usage; a terminal marker remains independent. */
    }
  }

  /** Dispatch only the data lines in the current SSE frame. */
  function consumeFrame() {
    const data = frame
      .split(/\r\n|[\r\n]/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (data) consume(data);
    frame = "";
    frameBytes = 0;
    separator = "";
  }

  /** A preceding newline is payload only when a following nonempty line confirms it. */
  function append(text) {
    if (!text) return;
    frameBytes += separator.length + Buffer.byteLength(text);
    if (frameBytes > maxFrameBytes) {
      unavailable = true;
      frame = "";
      return;
    }
    frame += separator + text;
    separator = "";
  }

  /** Process each decoded chunk once and fold a split CRLF into one line ending. */
  function scanSse(text) {
    if (!text) return;
    let cursor = 0;
    if (pendingCR && text[0] === "\n") {
      if (separator) separator += "\n";
      cursor = 1;
    }
    pendingCR = false;
    lineEnding.lastIndex = cursor;
    let ending;
    while ((ending = lineEnding.exec(text))) {
      append(text.slice(cursor, ending.index));
      if (unavailable) return;
      if (separator) consumeFrame();
      else if (frame) separator = ending[0];
      cursor = lineEnding.lastIndex;
      pendingCR = cursor === text.length && ending[0] === "\r";
    }
    append(text.slice(cursor));
  }

  /** Decode observed chunks incrementally, abandoning parsing when a frame exceeds the byte cap. */
  function push(chunk) {
    const bytes = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
    for (let offset = 0; !unavailable && offset < bytes.length; offset += 32768) {
      const text = decoder.decode(bytes.subarray(offset, offset + 32768), { stream: true });
      if (sse) scanSse(text);
      else append(text);
    }
  }
  return {
    push,
    /** Flush trailing text and return counters with separate terminal and availability indicators. */
    finish() {
      if (!unavailable) {
        const text = decoder.decode();
        if (sse) scanSse(text);
        else append(text);
      }
      if (!unavailable) {
        if (sse) consumeFrame();
        else consume(frame);
      }
      return {
        ...usage,
        terminal,
        status: unavailable ? "oversized" : reported ? "reported" : "unavailable",
      };
    },
  };
}
