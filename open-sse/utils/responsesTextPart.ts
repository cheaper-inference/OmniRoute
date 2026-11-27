/**
 * Wire identity of a Responses-API `output_text` content part. Strict Responses clients
 * correlate `response.output_text.delta` events by these fields, so a delta OmniRoute
 * synthesizes later (a held-back tail, a recovery suffix) must reuse the identity of the
 * upstream part it extends instead of inventing one (#20257).
 */
export interface ResponsesTextPart {
  item_id?: string;
  output_index?: number;
  content_index?: number;
}

/** Copy only the well-typed identity fields of a Responses text event. */
export function pickResponsesTextPart(event: unknown): ResponsesTextPart {
  const part: ResponsesTextPart = {};
  if (!event || typeof event !== "object") return part;
  const record = event as Record<string, unknown>;
  if (typeof record.item_id === "string" && record.item_id) part.item_id = record.item_id;
  if (typeof record.output_index === "number") part.output_index = record.output_index;
  if (typeof record.content_index === "number") part.content_index = record.content_index;
  return part;
}
