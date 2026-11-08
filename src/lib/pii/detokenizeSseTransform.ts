/**
 * Streaming half of the reversible PII vault: restores surrogate tokens in an SSE body.
 *
 * The swap runs per field on the parsed SSE (via `createSseTextTransform`), not on raw bytes.
 * A model emits a token in pieces, one `data:` event per piece, and the bytes between two
 * pieces are JSON framing, so a byte-level regex never sees the whole token. Each
 * (choice x field) keeps a rolling buffer that holds back only a suffix that could still grow
 * into a token (at most `MAX_TOKEN_LENGTH` characters); everything else is released at once,
 * so the first event goes out without waiting and `a < b` or `<<EOF` are never delayed.
 *
 * Escaping follows the layer: `content` / `reasoning` values are plain strings that the
 * re-serialization escapes, while `arguments` / `partial_json` are JSON fragments inside a
 * string, so the restored value is JSON-escaped first. Snapshot events (`*.done`,
 * `response.completed`) are restored as standalone strings so their text is not duplicated.
 * A held-back tail is drained on the stop signal, on `[DONE]` and at the end of the stream,
 * with the same per-format frames as the credential transform.
 */

import { createSseTextTransform, type FieldCategory } from "../sseTextTransform";
import { bufferField, type BufferedField, type TextBuffers } from "../sseTextBuffers";
import { flushRemainingByShape, type ChoiceBufferStore } from "../streamingCredentialTransform";
import { findTokenPrefixStart, type RequestTokenVault, type TokenReplaceMode } from "./tokenVault";

const DEFAULT_MAX_BUFFERED_CHOICES = 32;

export type DetokenizeCounters = {
  /** Fields left as-is because the swap threw (the tokens stay literal). */
  failures: number;
  /** Fields of choices past the buffer limit, swapped without holding back a prefix. */
  unbufferedFields: number;
};

export function createDetokenizeCounters(): DetokenizeCounters {
  return { failures: 0, unbufferedFields: 0 };
}

function emptyBuffers(): TextBuffers {
  return { content: "", reasoning: "", reasoning_content: "", toolArgs: "", partialJson: "" };
}

function modeFor(field: BufferedField | FieldCategory): TokenReplaceMode {
  return field === "toolArgs" || field === "partialJson" ? "json" : "raw";
}

function createBufferStore(): ChoiceBufferStore {
  const buffers = new Map<string, TextBuffers>();
  return {
    buffers,
    get: (index) => {
      const key = String(index);
      let entry = buffers.get(key);
      if (!entry) {
        entry = emptyBuffers();
        buffers.set(key, entry);
      }
      return entry;
    },
    takeAll: () => Array.from(buffers.entries()),
    clearAll: () => {
      for (const entry of buffers.values()) Object.assign(entry, emptyBuffers());
    },
  };
}

function hasHeldText(store: ChoiceBufferStore): boolean {
  for (const [, entry] of store.takeAll()) {
    if (Object.values(entry).some((value) => value.length > 0)) return true;
  }
  return false;
}

export function createDetokenizeSseTransform(
  vault: RequestTokenVault,
  options: { counters?: DetokenizeCounters; maxBufferedChoices?: number } = {}
): TransformStream {
  const counters = options.counters ?? createDetokenizeCounters();
  const maxChoices = Math.max(1, options.maxBufferedChoices ?? DEFAULT_MAX_BUFFERED_CHOICES);
  const store = createBufferStore();

  const release = (
    text: string,
    category: FieldCategory,
    isStopSignal: boolean,
    index: string | number,
    fieldName?: string
  ): string => {
    const mode = modeFor(category);
    const key = String(index);
    if (!store.buffers.has(key) && store.buffers.size >= maxChoices) {
      counters.unbufferedFields++;
      return vault.replaceTokens(text, mode);
    }
    const buffers = store.get(key);
    const field = bufferField(category, fieldName);
    const combined = buffers[field] + text;
    const hold = isStopSignal ? -1 : findTokenPrefixStart(combined);
    buffers[field] = hold === -1 ? "" : combined.slice(hold);
    return vault.replaceTokens(hold === -1 ? combined : combined.slice(0, hold), mode);
  };

  const processor = (
    text: string,
    category: FieldCategory,
    isStopSignal = false,
    index: string | number = "0_0",
    isSnapshot = false,
    fieldName?: string
  ): string => {
    try {
      if (isSnapshot) return vault.replaceTokens(text, modeFor(category));
      return release(text, category, isStopSignal, index, fieldName);
    } catch {
      // Fail-safe: the field goes out as received, tokens literal, never an errored stream.
      counters.failures++;
      return text;
    }
  };

  const onFlush = (lastJson: unknown, isJsonStream = false, lastContentJson: unknown = null) => {
    if (!hasHeldText(store)) return null;
    // A held tail is a token prefix that never completed, so this is normally a no-op swap.
    for (const [, entry] of store.takeAll()) {
      for (const field of Object.keys(entry) as BufferedField[]) {
        if (entry[field]) entry[field] = vault.replaceTokens(entry[field], modeFor(field));
      }
    }
    if (!lastJson) {
      const tail = store.get("0_0").content;
      store.clearAll();
      if (!tail) return null;
      return isJsonStream ? { choices: [{ delta: { content: tail } }] } : tail;
    }
    return flushRemainingByShape(store, lastJson, lastContentJson);
  };

  return createSseTextTransform(processor, onFlush, undefined, { processToolArgs: true });
}
