import fs from "node:fs";
import { StringDecoder } from "node:string_decoder";

/** Decode JSON without ever materializing the entire document as a V8 string.
 * Containers are assembled incrementally; only individual scalar tokens reach JSON.parse.
 * This preserves the impact-map contract even when its serialized form exceeds 512 MiB.
 */
export function readJsonFileChunked(file, { chunkSize = 64 * 1024 } = {}) {
  if (!Number.isSafeInteger(chunkSize) || chunkSize < 1) throw new RangeError("Invalid chunk size");
  const fd = fs.openSync(file, "r");
  const buffer = Buffer.alloc(chunkSize);
  const decoder = new StringDecoder("utf8");
  let chunk = "";
  let position = 0;
  let ended = false;
  const invalid = () => {
    throw new SyntaxError("Invalid or truncated JSON document");
  };
  function available() {
    while (position === chunk.length && !ended) {
      const count = fs.readSync(fd, buffer, 0, buffer.length, null);
      ended = count === 0;
      chunk = ended ? decoder.end() : decoder.write(buffer.subarray(0, count));
      position = 0;
    }
    return position < chunk.length;
  }
  function peek() {
    return available() ? chunk[position] : "";
  }
  function take() {
    const c = peek();
    if (c) position++;
    return c;
  }
  function whitespace() {
    while (available() && /[\x20\t\r\n]/.test(chunk[position])) position++;
  }
  function string() {
    const parts = [take()];
    while (available()) {
      const start = position;
      const specials = /["\\]/g;
      specials.lastIndex = position;
      const match = specials.exec(chunk);
      if (!match) {
        parts.push(chunk.slice(start));
        position = chunk.length;
        continue;
      }
      position = match.index + 1;
      parts.push(chunk.slice(start, position));
      if (match[0] === '"') return JSON.parse(parts.join(""));
      const escaped = take();
      if (!escaped) invalid();
      parts.push(escaped);
    }
    return invalid();
  }
  function value() {
    whitespace();
    const first = peek();
    if (first === '"') return string();
    if (first === "{" || first === "[") {
      take();
      const object = first === "{";
      const result = object ? {} : [];
      const close = object ? "}" : "]";
      whitespace();
      if (peek() === close) {
        take();
        return result;
      }
      while (true) {
        let key;
        if (object) {
          whitespace();
          if (peek() !== '"') invalid();
          key = string();
          whitespace();
          if (take() !== ":") invalid();
        }
        const item = value();
        if (object)
          Object.defineProperty(result, key, {
            value: item,
            enumerable: true,
            configurable: true,
            writable: true,
          });
        else result.push(item);
        whitespace();
        const separator = take();
        if (separator === close) return result;
        if (separator !== ",") invalid();
      }
    }
    let token = "";
    while (available() && !/[\x20\t\r\n,\]}]/.test(peek())) token += take();
    if (!token) invalid();
    return JSON.parse(token);
  }
  try {
    const result = value();
    whitespace();
    if (available()) invalid();
    return result;
  } finally {
    fs.closeSync(fd);
  }
}
