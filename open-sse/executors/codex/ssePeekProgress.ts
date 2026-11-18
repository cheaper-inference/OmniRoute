function isOutputProgressEvent(event: Record<string, unknown>): boolean {
  if (typeof event.type !== "string" || event.error) return false;
  if (event.type === "response.completed") return true;
  return (
    event.type.startsWith("response.") &&
    event.type.endsWith(".delta") &&
    typeof event.delta === "string" &&
    event.delta.length > 0
  );
}

/** Split one SSE frame into its `event:` label and its (possibly multi-line) data field. */
function readSseFrame(frame: string): { eventType: string; data: string[] } {
  let eventType = "";
  const data: string[] = [];
  for (const line of frame.split("\n")) {
    if (line.startsWith("event:")) eventType = line.slice(6).trim();
    else if (line.startsWith("data:")) {
      const value = line.slice(5);
      data.push(value.startsWith(" ") ? value.slice(1) : value);
    }
  }
  return { eventType, data };
}

/** Decode one frame into an event object, or null when it cannot declare anything. */
function decodeSseFrame(frame: string): Record<string, unknown> | null {
  const { eventType, data } = readSseFrame(frame);
  if (!data.length || data.join("\n") === "[DONE]") return null;
  try {
    const parsed: unknown = JSON.parse(data.join("\n"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const payload = parsed as Record<string, unknown>;
    return {
      ...payload,
      type: typeof payload.type === "string" ? payload.type : eventType,
    };
  } catch {
    // An incomplete/malformed data field cannot declare progress or failure.
    return null;
  }
}

/** Decode only dispatchable SSE events. A data field may span several lines,
 * and a named-only event uses its SSE label when JSON has no type. The peeker
 * retains at most its bounded prefix; downstream bytes are never rewritten.
 */
export function completeCodexSseEvents(
  text: string,
  streamEnded = false
): Record<string, unknown>[] {
  const frames = text.replace(/\r\n|\r/g, "\n").split("\n\n");
  if (!streamEnded) frames.pop();
  const events: Record<string, unknown>[] = [];
  for (const frame of frames) {
    const event = decodeSseFrame(frame);
    if (event) events.push(event);
  }
  return events;
}

/** Release the pre-read on actual output, not merely response.created. */
export function hasCodexSsePeekProgress(text: string): boolean {
  return completeCodexSseEvents(text).some(isOutputProgressEvent);
}

export interface CodexSseOutputTextScan {
  outputText: string;
  completed: boolean;
  otherProgress: boolean;
}

export function scanCodexSseOutputText(text: string): CodexSseOutputTextScan {
  let outputText = "";
  let completed = false;
  let otherProgress = false;
  for (const event of completeCodexSseEvents(text)) {
    if (event.type === "response.completed") completed = true;
    else if (event.type === "response.output_text.delta") {
      if (typeof event.delta === "string") outputText += event.delta;
    } else if (isOutputProgressEvent(event)) otherProgress = true;
  }
  return { outputText, completed, otherProgress };
}
