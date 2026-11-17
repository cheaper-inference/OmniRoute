type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue =>
  value && typeof value === "object" ? (value as RecordValue) : {};
const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const length = (value: unknown): number => (typeof value === "string" ? value.length : 0);
function blockLength(value: unknown): number {
  const block = record(value);
  if (block.type === "text") return length(block.text);
  if (block.type === "thinking") return length(block.thinking);
  if (block.type !== "tool_use" || !block.input || typeof block.input !== "object") return 0;
  return Object.keys(block.input).length ? JSON.stringify(block.input).length : 0;
}
function reasoningLength(delta: RecordValue): number {
  const text =
    delta.reasoning_content ??
    delta.reasoning ??
    delta.reasoning_text ??
    delta.thinking ??
    delta.thought;
  if (text) return length(text);
  return list(delta.reasoning_details).reduce<number>((size, detail) => {
    const item = record(detail);
    return size + (String(item.type ?? "").includes("encrypted") ? 0 : length(item.text));
  }, 0);
}

/** Observe raw events once, retaining only lengths and identifiers, never generated text. */
class GeneratedContentTracker {
  private characters = 0;
  private observedClaude = false;
  private seen = new WeakSet<object>();
  private sequences = new Set<number>();
  private snapshots = new Map<string, number>();
  private started = new Set<number>();
  getLength(): number {
    return this.characters;
  }
  hasObserved(): boolean {
    return this.observedClaude;
  }
  private add(key: string, count: number, snapshot = false): void {
    const previous = this.snapshots.get(key) ?? 0;
    const next = snapshot ? Math.max(previous, count) : previous + count;
    this.characters += next - previous;
    this.snapshots.set(key, next);
  }
  private responseItem(value: unknown, index: number): void {
    const item = record(value),
      id = String(item.id ?? index);
    if (item.type === "function_call") this.add(`${id}:args`, length(item.arguments), true);
    for (const [i, value] of list(item.content).entries()) {
      const part = record(value);
      if (part.type === "output_text") this.add(`${id}:text:${i}`, length(part.text), true);
      if (part.type === "reasoning_text") this.add(`${id}:reasoning:${i}`, length(part.text), true);
    }
    for (const [i, part] of list(item.summary).entries())
      this.add(`${id}:summary:${i}`, length(record(part).text), true);
  }
  private responses(event: RecordValue): void {
    if (typeof event.sequence_number === "number") {
      if (this.sequences.has(event.sequence_number)) return;
      this.sequences.add(event.sequence_number);
    }
    const id = String(event.item_id ?? event.output_index ?? 0);
    const types: Record<string, string> = {
      "response.output_text.delta": `${id}:text:${event.content_index ?? 0}`,
      "response.function_call_arguments.delta": `${id}:args`,
      "response.reasoning_summary_text.delta": `${id}:summary:${event.summary_index ?? 0}`,
      "response.reasoning_text.delta": `${id}:reasoning:${event.content_index ?? 0}`,
    };
    const type = String(event.type);
    if (types[type]) this.add(types[type], length(event.delta));
    if (type === "response.output_item.added" || type === "response.output_item.done")
      this.responseItem(event.item, Number(event.output_index ?? 0));
    if (type === "response.completed")
      list(record(event.response).output).forEach((item, i) => this.responseItem(item, i));
  }
  private choice(value: unknown, index: number): void {
    const choice = record(value),
      delta = record(choice.delta ?? choice.message);
    const key = `choice:${choice.index ?? index}`;
    const snapshot = choice.delta == null && choice.message != null;
    const count = (field: string, size: number) => this.add(`${key}:${field}`, size, snapshot);
    const content = delta.content;
    count(
      "text",
      typeof content === "string"
        ? length(content)
        : list(content).reduce<number>((n, p) => n + length(record(p).text), 0)
    );
    count("reasoning", reasoningLength(delta));
    for (const [i, value] of list(delta.tool_calls).entries()) {
      const tool = record(value);
      count(`tool:${tool.index ?? i}`, length(record(tool.function).arguments));
    }
    count("function", length(record(delta.function_call).arguments));
  }
  private gemini(candidates: unknown[]): void {
    for (const candidate of candidates)
      for (const value of list(record(record(candidate).content).parts)) {
        const part = record(value);
        this.characters += length(part.text);
        const args = record(part.functionCall).args;
        if (args && typeof args === "object") this.characters += JSON.stringify(args).length;
      }
  }
  private startBlock(index: number, block: unknown): void {
    if (this.started.has(index)) return;
    this.characters += blockLength(block);
    this.started.add(index);
  }
  private claude(event: RecordValue): void {
    if (event.type === "message_start") {
      this.observedClaude = true;
      list(record(event.message).content).forEach((block, index) => this.startBlock(index, block));
    } else if (event.type === "content_block_start") {
      this.observedClaude = true;
      this.startBlock(Number(event.index ?? 0), event.content_block);
    } else if (event.type === "content_block_delta") {
      this.observedClaude = true;
      const delta = record(event.delta);
      const fields: Record<string, string> = {
        text_delta: "text",
        thinking_delta: "thinking",
        input_json_delta: "partial_json",
      };
      this.characters += length(delta[fields[String(delta.type)]]);
    } else if (!event.type)
      this.characters += length(event.delta) + length(event.content) + length(event.text);
  }
  observe(value: unknown): void {
    if (!value || typeof value !== "object" || this.seen.has(value)) return;
    this.seen.add(value);
    const event = record(value);
    if (typeof event.type === "string" && event.type.startsWith("response."))
      return this.responses(event);
    if (Array.isArray(event.choices))
      return event.choices.forEach((choice, index) => this.choice(choice, index));
    const candidates = event.candidates ?? record(event.response).candidates;
    if (Array.isArray(candidates)) return this.gemini(candidates);
    this.claude(event);
  }
}
export function createGeneratedContentTracker() {
  return new GeneratedContentTracker();
}
