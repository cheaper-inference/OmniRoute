const record = (value) =>
  value && typeof value === "object" && !Array.isArray(value) ? value : {};
const counter = (value) =>
  typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
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
  let buffer = "",
    unavailable = false,
    terminal = false,
    usage = rawCacheUsage(null),
    reported = false;
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
        for (const key of Object.keys(usage)) if (next[key] !== null) usage[key] = next[key];
        reported = true;
      }
      if (["response.completed", "response.incomplete", "message_stop"].includes(value.type))
        terminal = true;
      if (!sse) terminal = true;
    } catch {
      /* Malformed frames establish no usage; a terminal marker remains independent. */
    }
  }
  function push(chunk) {
    if (unavailable) return;
    const bytes = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
    for (let offset = 0; offset < bytes.length; offset += 32768) {
      buffer += decoder.decode(bytes.subarray(offset, offset + 32768), { stream: true });
      if (sse) {
        let boundary;
        while ((boundary = /\r?\n\r?\n/.exec(buffer))) {
          const frame = buffer.slice(0, boundary.index);
          buffer = buffer.slice(boundary.index + boundary[0].length);
          if (Buffer.byteLength(frame) > maxFrameBytes) {
            unavailable = true;
            buffer = "";
            return;
          }
          const data = frame
            .split(/\r?\n/)
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trimStart())
            .join("\n");
          if (data) consume(data);
        }
      }
      if (Buffer.byteLength(buffer) > maxFrameBytes) {
        unavailable = true;
        buffer = "";
        return;
      }
    }
  }
  return {
    push,
    finish() {
      if (!unavailable) {
        buffer += decoder.decode();
        if (!sse) consume(buffer);
        else if (buffer.trim()) {
          const data = buffer
            .split(/\r?\n/)
            .filter((line) => line.startsWith("data:"))
            .map((line) => line.slice(5).trimStart())
            .join("\n");
          if (data) consume(data);
        }
      }
      return {
        ...usage,
        terminal,
        status: unavailable ? "oversized" : reported ? "reported" : "unavailable",
      };
    },
  };
}
