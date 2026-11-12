/** Request-local generated character evidence. Observe only raw provider events, never
 * translated projections. Signatures and encrypted/redacted blocks are deliberately excluded. */
export function createGeneratedContentTracker() {
  let characters = 0;
  let observed = false;
  const seen = new WeakSet<object>();
  const sequences = new Set<number>();
  const snapshots = new Map<string, number>();
  const record = (v: unknown): Record<string, unknown> =>
    v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
  function add(key: string, count: number, snapshot = false) {
    const previous = snapshots.get(key) ?? 0;
    const next = snapshot ? Math.max(previous, count) : previous + count;
    characters += next - previous;
    snapshots.set(key, next);
  }
  function responseItem(value: unknown, index: number) {
    const item = record(value),
      id = String(item.id ?? index);
    if (item.type === "function_call") add(`${id}:args`, length(item.arguments), true);
    for (const [i, part] of list(item.content).entries()) {
      const content = record(part);
      if (content.type === "output_text") add(`${id}:text:${i}`, length(content.text), true);
    }
    for (const [i, part] of list(item.summary).entries())
      add(`${id}:reasoning:${i}`, length(record(part).text), true);
  }
  const started = new Set<number>();
  const length = (value: unknown) => (typeof value === "string" ? value.length : 0);
  function blockLength(value: unknown): number {
    if (!value || typeof value !== "object") return 0;
    const block = value as Record<string, unknown>;
    if (block.type === "text") return length(block.text);
    if (block.type === "thinking") return length(block.thinking);
    if (block.type === "tool_use" && block.input && typeof block.input === "object") {
      return Object.keys(block.input).length ? JSON.stringify(block.input).length : 0;
    }
    return 0;
  }
  return {
    observe(value: unknown) {
      if (!value || typeof value !== "object") return;
      if (seen.has(value)) return;
      seen.add(value);
      const event = value as Record<string, unknown>;
      if (typeof event.type === "string" && event.type.startsWith("response.")) {
        if (typeof event.sequence_number === "number") {
          if (sequences.has(event.sequence_number)) return;
          sequences.add(event.sequence_number);
        }
        const id = String(event.item_id ?? event.output_index ?? 0);
        const types: Record<string, string> = {
          "response.output_text.delta": `${id}:text:${event.content_index ?? 0}`,
          "response.function_call_arguments.delta": `${id}:args`,
          "response.reasoning_summary_text.delta": `${id}:reasoning:${event.summary_index ?? 0}`,
          "response.reasoning_text.delta": `${id}:reasoning:${event.content_index ?? 0}`,
        };
        if (types[event.type]) add(types[event.type], length(event.delta));
        if (
          event.type === "response.output_item.added" ||
          event.type === "response.output_item.done"
        )
          responseItem(event.item, Number(event.output_index ?? 0));
        if (event.type === "response.completed")
          list(record(event.response).output).forEach(responseItem);
        return;
      }
      if (Array.isArray(event.choices)) {
        for (const [index, choice] of event.choices.entries()) {
          const c = record(choice),
            delta = record(c.delta ?? c.message);
          const key = `choice:${c.index ?? index}`;
          const snapshot = c.delta == null && c.message != null;
          const count = (field: string, size: number) => add(`${key}:${field}`, size, snapshot);
          const content = delta.content;
          count(
            "text",
            typeof content === "string"
              ? length(content)
              : list(content).reduce<number>((n, p) => n + length(record(p).text), 0)
          );
          const reasoning =
            delta.reasoning_content ??
            delta.reasoning ??
            delta.reasoning_text ??
            delta.thinking ??
            delta.thought;
          const reasoningLength = reasoning
            ? length(reasoning)
            : list(delta.reasoning_details).reduce<number>((size, detail) => {
                const d = record(detail);
                return size + (String(d.type ?? "").includes("encrypted") ? 0 : length(d.text));
              }, 0);
          count("reasoning", reasoningLength);
          for (const [toolIndex, value] of list(delta.tool_calls).entries()) {
            const tool = record(value);
            count(`tool:${tool.index ?? toolIndex}`, length(record(tool.function).arguments));
          }
          count("function", length(record(delta.function_call).arguments));
        }
        return;
      }
      const candidates = event.candidates ?? record(event.response).candidates;
      if (Array.isArray(candidates)) {
        for (const candidate of candidates)
          for (const part of list(record(record(candidate).content).parts)) {
            const p = record(part);
            characters += length(p.text);
            const args = record(p.functionCall).args;
            if (args && typeof args === "object") characters += JSON.stringify(args).length;
          }
        return;
      }
      if (event.type === "message_start") {
        observed = true;
        const message = event.message as { content?: unknown[] } | undefined;
        for (const [index, block] of (message?.content ?? []).entries()) {
          if (!started.has(index)) {
            characters += blockLength(block);
            started.add(index);
          }
        }
      } else if (event.type === "content_block_start") {
        observed = true;
        const index = Number(event.index ?? 0);
        if (!started.has(index)) {
          characters += blockLength(event.content_block);
          started.add(index);
        }
      } else if (event.type === "content_block_delta") {
        observed = true;
        const delta = event.delta as Record<string, unknown> | undefined;
        if (delta?.type === "text_delta") characters += length(delta.text);
        if (delta?.type === "thinking_delta") characters += length(delta.thinking);
        if (delta?.type === "input_json_delta") characters += length(delta.partial_json);
      } else if (!event.type)
        characters += length(event.delta) + length(event.content) + length(event.text);
    },
    getLength: () => characters,
    hasObserved: () => observed,
  };
}
