import { FORMATS } from "../translator/formats.ts";
import { createTerminalJsonObserver } from "./streamTerminalJson.ts";
import type { ResponsesStreamContext } from "./responsesSequence.ts";

const DONE = "[DONE]";
const RESPONSES_TERMINAL_TYPES = new Set([
  "response.completed",
  "response.incomplete",
  "response.failed",
]);

type WatcherState = {
  format?: string | null;
  terminal: boolean;
  observeResponses: boolean;
  context: ResponsesStreamContext;
  boundary: boolean;
  afterCR: boolean;
  lineStarted: boolean;
  field: "data" | "event" | "ignore" | null;
  prefix: string;
  firstValue: boolean;
  eventValue: string;
  eventTooLong: boolean;
  event: string;
  sawData: boolean;
  json: ReturnType<typeof createTerminalJsonObserver>;
  doneIndex: number;
  doneInvalid: boolean;
};

function createState(format?: string | null): WatcherState {
  const observeResponses =
    format === FORMATS.OPENAI_RESPONSES || format === FORMATS.OPENAI_RESPONSE;
  return {
    format,
    terminal: false,
    observeResponses,
    context: {},
    boundary: true,
    afterCR: false,
    lineStarted: false,
    field: null,
    prefix: "",
    firstValue: false,
    eventValue: "",
    eventTooLong: false,
    event: "",
    sawData: false,
    json: createTerminalJsonObserver(observeResponses),
    doneIndex: 0,
    doneInvalid: false,
  };
}

function noteData(w: WatcherState, text: string): void {
  w.json.note(text);
  if (w.doneInvalid) return;
  for (const char of text) {
    if ((w.doneIndex === 0 || w.doneIndex === DONE.length) && char.trim() === "") continue;
    if (char !== DONE[w.doneIndex]) {
      w.doneInvalid = true;
      break;
    }
    w.doneIndex++;
  }
}

function startData(w: WatcherState): void {
  if (w.sawData) noteData(w, "\n");
  w.sawData = true;
}

function absorbSequence(context: ResponsesStreamContext, metadata: ResponsesStreamContext): void {
  if (
    metadata.lastSequenceNumber !== undefined &&
    metadata.lastSequenceNumber > (context.lastSequenceNumber ?? -1)
  ) {
    context.lastSequenceNumber = metadata.lastSequenceNumber;
  }
}

/** The first real response owns this stream. Nested item ids, telemetry,
 * malformed frames and a later foreign response must never replace it.
 */
function absorbIdentity(context: ResponsesStreamContext, metadata: ResponsesStreamContext): void {
  if (!metadata.id || (context.id && context.id !== metadata.id)) return;
  context.id = metadata.id;
  if (!context.model && metadata.model) context.model = metadata.model;
  if (context.createdAt === undefined && metadata.createdAt !== undefined) {
    context.createdAt = metadata.createdAt;
  }
}

/** Terminal verdict of a fully valid event; undefined when the format has no rule. */
function validEventTerminal(
  w: WatcherState,
  type: string,
  finishedChoice: boolean
): boolean | undefined {
  // Claude: the translator has already delivered/classified a provider error.
  // A later EOF/socket failure must not duplicate it or invent truncation.
  if (w.format === FORMATS.CLAUDE) return type === "message_stop" || type === "error";
  // Responses: the transformer owns classification/accounting of this failure.
  // EOF/rejection after its delivery must not manufacture a second one.
  if (w.observeResponses) return RESPONSES_TERMINAL_TYPES.has(type);
  if (w.format === FORMATS.OPENAI) return finishedChoice;
  return undefined;
}

function finishEventData(w: WatcherState): void {
  const result = w.json.finish();
  const type = result.type ?? w.event;
  if (w.observeResponses && result.valid && type.startsWith("response.")) {
    const metadata = result.responsesContext;
    if (metadata) {
      absorbSequence(w.context, metadata);
      absorbIdentity(w.context, metadata);
    }
  }
  if (!w.doneInvalid && w.doneIndex === DONE.length) w.terminal = true;
  else if (result.valid) {
    const verdict = validEventTerminal(w, type, result.finishedChoice);
    if (verdict !== undefined) w.terminal = verdict;
  }
}

function endEvent(w: WatcherState): void {
  if (w.sawData) finishEventData(w);
  w.event = "";
  w.sawData = false;
  w.json = createTerminalJsonObserver(w.observeResponses);
  w.doneIndex = 0;
  w.doneInvalid = false;
  w.boundary = true;
}

function endLine(w: WatcherState): void {
  if (!w.lineStarted) endEvent(w);
  else if (w.field === "event") w.event = w.eventTooLong ? "" : w.eventValue.trim();
  else if (w.field === null && w.prefix === "data") startData(w);
  else if (w.field === null && w.prefix === "event") w.event = "";
  w.lineStarted = false;
  w.field = null;
  w.prefix = "";
  w.firstValue = false;
  w.eventValue = "";
  w.eventTooLong = false;
}

function fieldForPrefix(prefix: string): "data" | "event" | "ignore" {
  if (prefix === "data") return "data";
  return prefix === "event" ? "event" : "ignore";
}

/** Consume the field name up to its colon; returns the index of the first value char. */
function scanFieldName(w: WatcherState, text: string): number {
  let index = 0;
  while (w.field === null && index < text.length) {
    const char = text[index++];
    if (char === ":") {
      w.field = fieldForPrefix(w.prefix);
      w.firstValue = true;
      if (w.field === "data") startData(w);
    } else {
      w.prefix += char;
      if (w.prefix.length > 5) {
        w.field = "ignore";
        w.prefix = "";
      }
    }
  }
  return index;
}

function appendEventValue(w: WatcherState, value: string): void {
  if (w.eventTooLong) return;
  if (w.eventValue.length + value.length > 128) {
    w.eventTooLong = true;
    w.eventValue = "";
  } else w.eventValue += value;
}

function noteLinePart(w: WatcherState, text: string): void {
  if (!text) return;
  w.boundary = false;
  w.lineStarted = true;
  let index = scanFieldName(w, text);
  if (index === text.length) return;
  if (w.firstValue) {
    w.firstValue = false;
    if (text[index] === " ") index++;
  }
  const value = text.slice(index);
  if (w.field === "data") noteData(w, value);
  else if (w.field === "event") appendEventValue(w, value);
}

function noteChunk(w: WatcherState, text: string): boolean {
  if (w.terminal) return true;
  let start = 0;
  if (w.afterCR && text.length > 0) {
    w.afterCR = false;
    if (text[0] === "\n") start = 1;
  }
  const separators = /\r\n|\r|\n/g;
  separators.lastIndex = start;
  let match: RegExpExecArray | null;
  while ((match = separators.exec(text)) !== null) {
    noteLinePart(w, text.slice(start, match.index));
    endLine(w);
    start = separators.lastIndex;
    w.afterCR = match[0] === "\r" && start === text.length;
    if (w.terminal) return true;
  }
  noteLinePart(w, text.slice(start));
  return w.terminal;
}

/** Observe only dispatchable SSE events. Memory is independent of frame/line
 * size: no whole snapshot or ever-growing partial data line is retained. JSON
 * syntax and top-level fields are validated incrementally, including its tail.
 */
export function createClientTerminalWatcher(format?: string | null) {
  const state = createState(format);
  return {
    note: (text: string): boolean => noteChunk(state, text),
    // Already forwarded malformed data cannot be retracted. A synthetic error
    // needs its own boundary so a recovering downstream can dispatch it.
    atBoundary: () => state.boundary,
    responsesContext: (): ResponsesStreamContext => ({ ...state.context }),
  };
}
