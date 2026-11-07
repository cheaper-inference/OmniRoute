import type { FieldCategory } from "./sseTextTransform";

type JsonObject = Record<string, unknown>;
type Processor = (
  text: string,
  field: FieldCategory,
  stop?: boolean,
  index?: string | number,
  snapshot?: boolean
) => string;
const DELTA_FIELDS: Record<string, [string, FieldCategory]> = {
  "response.output_text.delta": ["text", "content"],
  "response.refusal.delta": ["refusal", "content"],
  "response.reasoning_text.delta": ["text", "reasoning"],
  "response.reasoning_summary_text.delta": ["text", "reasoning"],
  "response.function_call_arguments.delta": ["arguments", "toolArgs"],
  "response.custom_tool_call_input.delta": ["input", "toolArgs"],
  "response.mcp_call_arguments.delta": ["arguments", "toolArgs"],
  "response.code_interpreter_call_code.delta": ["code", "content"],
  "response.audio.transcript.delta": ["text", "content"],
};
const TERMINALS = new Set([
  "response.completed",
  "response.done",
  "response.incomplete",
  "response.failed",
  "response.cancelled",
]);
const object = (value: unknown): JsonObject | undefined =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonObject) : undefined;

/** Select Responses payloads by schema; never feed protocol metadata into a text buffer. */
export function createResponsesSseText(
  processor: Processor,
  processToolArgs = false,
  release?: (index: string) => void
) {
  const pending = new Map<string, { event: JsonObject; category: FieldCategory }>();
  const itemIndexes = new Map<string, number>();
  const indexItems = new Map<number, string>();
  const identities = new Map<string, string>();
  const identityKeys = (event: JsonObject) => {
    const keys: string[] = [];
    const id = event.item_id ?? object(event.item)?.id;
    if (typeof event.output_index === "number") keys.push(`index:${event.output_index}`);
    if (typeof id === "string") keys.push(`id:${id}`);
    return keys;
  };
  const learnIdentity = (event: JsonObject) => {
    const keys = identityKeys(event);
    const known = keys.map((key) => identities.get(key)).filter((key) => key !== undefined);
    if (new Set(known).size > 1) throw new Error("Conflicting Responses stream identities");
    const identity = known[0] ?? keys[0];
    if (identity !== undefined) for (const key of keys) identities.set(key, identity);
    const id = event.item_id ?? object(event.item)?.id;
    if (typeof id === "string" && typeof event.output_index === "number") {
      itemIndexes.set(id, event.output_index);
      indexItems.set(event.output_index, id);
    }
  };
  const outputIndex = (event: JsonObject) =>
    typeof event.output_index === "number"
      ? event.output_index
      : itemIndexes.get(String(event.item_id ?? object(event.item)?.id));
  const itemId = (event: JsonObject) => {
    const index = outputIndex(event);
    return (
      event.item_id ??
      object(event.item)?.id ??
      (index === undefined ? undefined : indexItems.get(index))
    );
  };
  const laneKey = (event: JsonObject) =>
    JSON.stringify([
      event.type,
      identities.get(identityKeys(event)[0]) ?? "anonymous",
      event.content_index ?? 0,
      event.summary_index ?? 0,
    ]);
  const enabled = (category: FieldCategory) => category !== "toolArgs" || processToolArgs;
  const processField = (obj: JsonObject | undefined, key: string, category: FieldCategory) => {
    if (obj && typeof obj[key] === "string" && enabled(category)) {
      obj[key] = processor(obj[key], category, false, "responses:snapshot", true);
    }
  };
  const part = (value: unknown) => {
    const obj = object(value);
    if (obj?.type === "output_text") processField(obj, "text", "content");
    if (obj?.type === "refusal") processField(obj, "refusal", "content");
    if (obj?.type === "summary_text" || obj?.type === "reasoning_text")
      processField(obj, "text", "reasoning");
  };
  const item = (value: unknown) => {
    const obj = object(value);
    if (!obj) return;
    if (obj.type === "message" && Array.isArray(obj.content)) obj.content.forEach(part);
    if (obj.type === "reasoning") {
      if (Array.isArray(obj.summary)) obj.summary.forEach(part);
      if (Array.isArray(obj.content)) obj.content.forEach(part);
    }
    if (obj.type === "function_call" || obj.type === "mcp_call")
      processField(obj, "arguments", "toolArgs");
    if (obj.type === "code_interpreter_call") processField(obj, "code", "content");
    if (obj.type === "custom_tool_call") processField(obj, "input", "toolArgs");
  };
  const drain = (matches: (event: JsonObject) => boolean = () => true): JsonObject[] => {
    const events: JsonObject[] = [];
    for (const [key, lane] of pending) {
      if (!matches(lane.event)) continue;
      const delta = processor("", lane.category, true, key, false);
      if (delta) events.push({ ...lane.event, delta });
      release?.(key);
      pending.delete(key);
    }
    return events;
  };
  const sameItem = (a: JsonObject, b: JsonObject) => {
    const aId = itemId(a);
    const bId = itemId(b);
    if (aId !== undefined && bId !== undefined) return aId === bId;
    const aIndex = outputIndex(a);
    const bIndex = outputIndex(b);
    if (aIndex !== undefined && bIndex !== undefined) return aIndex === bIndex;
    return aId === undefined && bId === undefined && aIndex === undefined && bIndex === undefined;
  };
  return {
    drain,
    transform(event: JsonObject): JsonObject[] {
      const type = String(event.type);
      learnIdentity(event);
      const selected = DELTA_FIELDS[type];
      if (selected && typeof event.delta === "string" && enabled(selected[1])) {
        const key = laneKey(event);
        const previous = pending.get(key)?.event;
        const wire: JsonObject = { ...previous, type };
        if (itemId(event) !== undefined) wire.item_id = itemId(event);
        if (outputIndex(event) !== undefined) wire.output_index = outputIndex(event);
        for (const field of ["item_id", "output_index", "content_index", "summary_index"]) {
          if (event[field] !== undefined) wire[field] = event[field];
        }
        pending.set(key, { event: wire, category: selected[1] });
        event.delta = processor(event.delta, selected[1], false, key, false);
        return [];
      }
      let flushed: JsonObject[] = [];
      if (TERMINALS.has(type)) {
        flushed = drain();
      } else if (type.endsWith(".done")) {
        const deltaType = type.slice(0, -5) + ".delta";
        flushed = drain((lane) => {
          if (!sameItem(lane, event)) return false;
          if (type === "response.output_item.done") return true;
          if (type === "response.content_part.done")
            return (lane.content_index ?? 0) === (event.content_index ?? 0);
          if (type === "response.reasoning_summary_part.done")
            return (lane.summary_index ?? 0) === (event.summary_index ?? 0);
          return (
            lane.type === deltaType &&
            (lane.content_index ?? 0) === (event.content_index ?? 0) &&
            (lane.summary_index ?? 0) === (event.summary_index ?? 0)
          );
        });
      }
      const snapshot = DELTA_FIELDS[type.replace(/\.done$/, ".delta")];
      if (type.endsWith(".done") && snapshot) processField(event, snapshot[0], snapshot[1]);
      if (type === "response.output_item.added" || type === "response.output_item.done")
        item(event.item);
      if (
        type === "response.content_part.added" ||
        type === "response.content_part.done" ||
        type === "response.reasoning_summary_part.added" ||
        type === "response.reasoning_summary_part.done"
      )
        part(event.part);
      const response = object(event.response);
      if (
        response &&
        (TERMINALS.has(type) || type === "response.created" || type === "response.in_progress")
      ) {
        if (Array.isArray(response.output)) response.output.forEach(item);
        processField(response, "output_text", "content");
      }
      return flushed;
    },
  };
}
