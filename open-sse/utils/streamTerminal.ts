import { FORMATS } from "../translator/formats.ts";
import { createTerminalJsonObserver } from "./streamTerminalJson.ts";
import type { ResponsesStreamContext } from "./responsesSequence.ts";

/** Observe only dispatchable SSE events. Memory is independent of frame/line
 * size: no whole snapshot or ever-growing partial data line is retained. JSON
 * syntax and top-level fields are validated incrementally, including its tail.
 */
export function createClientTerminalWatcher(format?: string | null) {
  let terminal = false;
  const observeResponses =
    format === FORMATS.OPENAI_RESPONSES || format === FORMATS.OPENAI_RESPONSE;
  const context: ResponsesStreamContext = {};
  let boundary = true;
  let afterCR = false;
  let lineStarted = false;
  let field: "data" | "event" | "ignore" | null = null;
  let prefix = "";
  let firstValue = false;
  let eventValue = "";
  let eventTooLong = false;
  let event = "";
  let sawData = false;
  let json = createTerminalJsonObserver(observeResponses);
  let doneIndex = 0;
  let doneInvalid = false;
  const done = "[DONE]";

  const noteData = (text: string) => {
    json.note(text);
    if (doneInvalid) return;
    for (const char of text) {
      if ((doneIndex === 0 || doneIndex === done.length) && char.trim() === "") continue;
      if (char !== done[doneIndex]) {
        doneInvalid = true;
        break;
      }
      doneIndex++;
    }
  };
  const startData = () => {
    if (sawData) noteData("\n");
    sawData = true;
  };
  const endEvent = () => {
    if (sawData) {
      const result = json.finish();
      const type = result.type ?? event;
      if (observeResponses && result.valid && type.startsWith("response.")) {
        const metadata = result.responsesContext;
        if (
          metadata?.lastSequenceNumber !== undefined &&
          metadata.lastSequenceNumber > (context.lastSequenceNumber ?? -1)
        ) {
          context.lastSequenceNumber = metadata.lastSequenceNumber;
        }
        // The first real response owns this stream. Nested item ids, telemetry,
        // malformed frames and a later foreign response must never replace it.
        if (metadata?.id && (!context.id || context.id === metadata.id)) {
          context.id = metadata.id;
          if (!context.model && metadata.model) context.model = metadata.model;
          if (context.createdAt === undefined && metadata.createdAt !== undefined)
            context.createdAt = metadata.createdAt;
        }
      }
      if (!doneInvalid && doneIndex === done.length) terminal = true;
      else if (result.valid) {
        if (format === FORMATS.CLAUDE) {
          // The translator has already delivered/classified a provider error.
          // A later EOF/socket failure must not duplicate it or invent truncation.
          terminal = type === "message_stop" || type === "error";
        } else if (format === FORMATS.OPENAI_RESPONSES || format === FORMATS.OPENAI_RESPONSE) {
          // The transformer owns classification/accounting of this failure.
          // EOF/rejection after its delivery must not manufacture a second one.
          terminal =
            type === "response.completed" ||
            type === "response.incomplete" ||
            type === "response.failed";
        } else if (format === FORMATS.OPENAI) terminal = result.finishedChoice;
      }
    }
    event = "";
    sawData = false;
    json = createTerminalJsonObserver(observeResponses);
    doneIndex = 0;
    doneInvalid = false;
    boundary = true;
  };
  const endLine = () => {
    if (!lineStarted) endEvent();
    else if (field === "event") event = eventTooLong ? "" : eventValue.trim();
    else if (field === null && prefix === "data") startData();
    else if (field === null && prefix === "event") event = "";
    lineStarted = false;
    field = null;
    prefix = "";
    firstValue = false;
    eventValue = "";
    eventTooLong = false;
  };
  const noteLinePart = (text: string) => {
    if (!text) return;
    boundary = false;
    lineStarted = true;
    let index = 0;
    while (field === null && index < text.length) {
      const char = text[index++];
      if (char === ":") {
        field = prefix === "data" ? "data" : prefix === "event" ? "event" : "ignore";
        firstValue = true;
        if (field === "data") startData();
      } else {
        prefix += char;
        if (prefix.length > 5) {
          field = "ignore";
          prefix = "";
        }
      }
    }
    if (index === text.length) return;
    if (firstValue) {
      firstValue = false;
      if (text[index] === " ") index++;
    }
    const value = text.slice(index);
    if (field === "data") noteData(value);
    else if (field === "event" && !eventTooLong) {
      if (eventValue.length + value.length > 128) {
        eventTooLong = true;
        eventValue = "";
      } else eventValue += value;
    }
  };

  return {
    note(text: string): boolean {
      if (terminal) return true;
      let start = 0;
      if (afterCR && text.length > 0) {
        afterCR = false;
        if (text[0] === "\n") start = 1;
      }
      const separators = /\r\n|\r|\n/g;
      separators.lastIndex = start;
      let match: RegExpExecArray | null;
      while ((match = separators.exec(text)) !== null) {
        noteLinePart(text.slice(start, match.index));
        endLine();
        start = separators.lastIndex;
        afterCR = match[0] === "\r" && start === text.length;
        if (terminal) return true;
      }
      noteLinePart(text.slice(start));
      return terminal;
    },
    // Already forwarded malformed data cannot be retracted. A synthetic error
    // needs its own boundary so a recovering downstream can dispatch it.
    atBoundary: () => boundary,
    responsesContext: (): ResponsesStreamContext => ({ ...context }),
  };
}
