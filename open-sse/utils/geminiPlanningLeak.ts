/**
 * Strips Gemini's leaked leading planning JSON (e.g. `{"thought":"…"}`)
 * emitted into VISIBLE text rather than as a `thought` part.
 *
 * Scoped strictly to the definitive `thought` key signature to avoid
 * false positives with JSON mode or tool schemas.
 */

export function isPlanningLeakPrefix(text: string): boolean {
  const trimmed = text.trimStart();
  if (!trimmed.startsWith("{")) {
    return false;
  }
  const afterBrace = trimmed.slice(1).trimStart();
  if (afterBrace === "") {
    return trimmed.length <= 100;
  }
  if (afterBrace[0] !== '"') {
    return false;
  }
  const nextQuoteIndex = afterBrace.indexOf('"', 1);
  if (nextQuoteIndex === -1) {
    const keyPrefix = afterBrace.slice(1);
    return "thought".startsWith(keyPrefix) && trimmed.length <= 100;
  }
  const key = afterBrace.slice(1, nextQuoteIndex);
  if (key !== "thought") {
    return false;
  }
  const afterKey = afterBrace.slice(nextQuoteIndex + 1).trimStart();
  if (afterKey === "") {
    return trimmed.length <= 100;
  }
  if (afterKey[0] !== ":") {
    return false;
  }
  return true;
}

type JsonScanState = { depth: number; inString: boolean; escaped: boolean };

function advanceInsideString(state: JsonScanState, ch: string): void {
  if (state.escaped) {
    state.escaped = false;
  } else if (ch === "\\") {
    state.escaped = true;
  } else if (ch === '"') {
    state.inString = false;
  }
}

function advanceOutsideString(state: JsonScanState, ch: string): void {
  if (ch === '"') {
    state.inString = true;
  } else if (ch === "{" || ch === "[") {
    state.depth += 1;
  } else if (ch === "}" || ch === "]") {
    state.depth -= 1;
  }
}

/** Returns true if a comma `,` appears at depth 1 outside strings (indicating multiple root properties). */
export function hasTopLevelComma(text: string): boolean {
  const state: JsonScanState = { depth: 0, inString: false, escaped: false };

  for (let index = 0; index < text.length; index += 1) {
    const ch = text[index];
    if (state.inString) {
      advanceInsideString(state, ch);
      continue;
    }
    if (ch === '"') {
      state.inString = true;
    } else if (ch === "{" || ch === "[") {
      state.depth += 1;
    } else if (ch === "}" || ch === "]") {
      state.depth -= 1;
      if (state.depth === 0) {
        break;
      }
    } else if (ch === "," && state.depth === 1) {
      return true;
    }
  }

  return false;
}

/** Index of the `}` closing the object that opens at `text[0]`, or -1 if it never closes. */
function findJsonObjectEnd(text: string): number {
  const state: JsonScanState = { depth: 0, inString: false, escaped: false };

  for (let index = 0; index < text.length; index += 1) {
    const ch = text[index];
    if (state.inString) {
      advanceInsideString(state, ch);
      continue;
    }
    advanceOutsideString(state, ch);
    if (ch === "}" && state.depth === 0) return index;
  }

  return -1;
}

export function splitLeadingJsonObject(
  text: string
): { prefixLength: number; jsonText: string; rest: string } | undefined {
  const prefixLength = text.length - text.trimStart().length;
  const trimmed = text.slice(prefixLength);
  if (!trimmed.startsWith("{")) return undefined;

  const endIndex = findJsonObjectEnd(trimmed);
  if (endIndex === -1) return undefined;

  return {
    prefixLength: prefixLength + endIndex + 1,
    jsonText: trimmed.slice(0, endIndex + 1),
    rest: trimmed.slice(endIndex + 1),
  };
}

export type BufferedPlanningResult =
  | { kind: "incomplete" }
  | { kind: "plain"; visibleText: string }
  | { kind: "leak"; visibleText: string };

/** Leading object never closed: at the final chunk a "thought" fragment is a leak, otherwise wait. */
function classifyUnclosedObject(text: string, isFinal: boolean): BufferedPlanningResult {
  if (!isFinal) return { kind: "incomplete" };
  return text.trim().includes('"thought"')
    ? { kind: "leak", visibleText: "" }
    : { kind: "plain", visibleText: text };
}

/** A root object whose only key is a string `thought` (a leaked planning artifact). */
function isSolitaryThought(parsed: unknown): boolean {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
  const record = parsed as Record<string, unknown>;
  return typeof record.thought === "string" && Object.keys(record).length === 1;
}

/** Strip a solitary thought object only when visible text follows it. */
function classifySolitaryThought(
  text: string,
  rest: string,
  isFinal: boolean
): BufferedPlanningResult {
  if (rest.length > 0) return { kind: "leak", visibleText: rest };
  if (!isFinal) return { kind: "incomplete" };
  // At final chunk, if no visible text follows a solitary thought object,
  // stripping it would yield empty content (0 chars) and cause empty-stream
  // failure loops (#19805). Preserve it as plain text.
  return { kind: "plain", visibleText: text };
}

export function consumePlanningLeak(text: string, isFinal = false): BufferedPlanningResult {
  // A top-level comma means the root object has multiple properties
  // (e.g. {"thought":"...","summary":"..."}), which is structured application
  // output, not a leaked solitary planning artifact.
  if (!isPlanningLeakPrefix(text) || hasTopLevelComma(text)) {
    return { kind: "plain", visibleText: text };
  }

  const leading = splitLeadingJsonObject(text);
  if (!leading) return classifyUnclosedObject(text, isFinal);

  let parsed: unknown;
  try {
    parsed = JSON.parse(leading.jsonText);
  } catch {
    return { kind: "plain", visibleText: text };
  }
  return isSolitaryThought(parsed)
    ? classifySolitaryThought(text, leading.rest, isFinal)
    : { kind: "plain", visibleText: text };
}

export class GeminiPlanningLeakFilter {
  private buffer = "";
  private resolved = false;

  feed(delta: string): string {
    if (this.resolved) {
      return delta;
    }
    this.buffer += delta;

    const result = consumePlanningLeak(this.buffer, false);
    if (result.kind === "incomplete") {
      return "";
    }

    this.resolved = true;
    this.buffer = "";
    return result.visibleText;
  }

  flush(): string {
    if (this.resolved) {
      return "";
    }
    this.resolved = true;
    const result = consumePlanningLeak(this.buffer, true);
    this.buffer = "";
    return "visibleText" in result ? result.visibleText : "";
  }
}
