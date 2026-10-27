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
    let eventType = "";
    const data: string[] = [];
    for (const line of frame.split("\n")) {
      if (line.startsWith("event:")) eventType = line.slice(6).trim();
      else if (line.startsWith("data:")) {
        const value = line.slice(5);
        data.push(value.startsWith(" ") ? value.slice(1) : value);
      }
    }
    if (!data.length || data.join("\n") === "[DONE]") continue;
    try {
      const parsed: unknown = JSON.parse(data.join("\n"));
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const payload = parsed as Record<string, unknown>;
        events.push({
          ...payload,
          type: typeof payload.type === "string" ? payload.type : eventType,
        });
      }
    } catch {
      // An incomplete/malformed data field cannot declare progress or failure.
    }
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
