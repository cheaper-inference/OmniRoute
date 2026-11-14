const categories = [
  "instructions",
  "toolDefinitions",
  "userMessages",
  "assistantMessages",
  "toolCalls",
  "toolOutputs",
  "other",
];
const sources = ["fileReads", "localSearch", "shellCommands", "mcpResults", "otherOrUnknown"];
/** Treat non-object content entries as empty records for role and tool-call inspection. */
const record = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});
/** Accept only nonempty bounded call IDs for correlating tool results with earlier calls. */
const id = (v) => (typeof v === "string" && v.length > 0 && v.length <= 256 ? v : null);
/** Preserve text verbatim and serialize structured content, using empty text for undefined. */
const serialized = (v) => (typeof v === "string" ? v : (JSON.stringify(v) ?? ""));

/** Exact tool-name allowlists; MCP names win before any local tool classification. */
function outputSource(name) {
  if (typeof name !== "string") return "otherOrUnknown";
  const n = name.toLowerCase();
  if (/^mcp(?:__|_|:|\/)/.test(n)) return "mcpResults";
  if (["read", "read_file", "readfile", "file_read"].includes(n)) return "fileReads";
  if (["grep", "glob", "search", "ripgrep", "rg", "file_search"].includes(n)) return "localSearch";
  if (["bash", "shell", "exec_command", "run_terminal_cmd", "terminal"].includes(n))
    return "shellCommands";
  return "otherOrUnknown";
}

/** Yield visible text and tool-call units recursively, marking media without counting its payload. */
function* contentParts(content, category, reference) {
  if (typeof content === "string") {
    yield { category, text: content, reference };
    return;
  }
  if (!Array.isArray(content)) {
    if (content != null) yield { category, text: serialized(content), reference };
    return;
  }
  for (const part of content) {
    if (!part || typeof part !== "object") {
      yield { category, text: serialized(part), reference };
      continue;
    }
    if (["text", "input_text", "output_text"].includes(part.type))
      yield { category, text: String(part.text ?? ""), reference };
    else if (part.type === "tool_use")
      yield { category: "toolCalls", text: serialized(part), call: id(part.id), name: part.name };
    else if (part.type === "tool_result")
      yield* contentParts(part.content, "toolOutputs", id(part.tool_use_id));
    else if (/image|audio|video|document|file/.test(String(part.type)))
      yield { category, text: "", reference, media: true };
    else yield { category, text: serialized(part), reference };
  }
}

/** Walk each visible part once, in request order, without exporting text, names or call IDs. */
function* units(body) {
  if (body.instructions != null) yield* contentParts(body.instructions, "instructions");
  if (body.system != null) yield* contentParts(body.system, "instructions");
  for (const tool of Array.isArray(body.tools) ? body.tools : [])
    yield { category: "toolDefinitions", text: serialized(tool) };
  const entries = Array.isArray(body.messages)
    ? body.messages
    : Array.isArray(body.input)
      ? body.input
      : [];
  if (typeof body.input === "string") yield { category: "userMessages", text: body.input };
  for (const entry of entries) {
    const item = record(entry);
    if (["function_call", "tool_call", "custom_tool_call"].includes(item.type)) {
      yield {
        category: "toolCalls",
        text: serialized(item),
        call: id(item.call_id ?? item.id),
        name: item.name,
      };
      continue;
    }
    if (["function_call_output", "custom_tool_call_output"].includes(item.type)) {
      yield* contentParts(item.output, "toolOutputs", id(item.call_id));
      continue;
    }
    const category = ["system", "developer"].includes(item.role)
      ? "instructions"
      : item.role === "user"
        ? "userMessages"
        : item.role === "assistant"
          ? "assistantMessages"
          : ["tool", "function"].includes(item.role)
            ? "toolOutputs"
            : "other";
    yield* contentParts(
      item.content,
      category,
      category === "toolOutputs" ? id(item.tool_call_id) : undefined
    );
    for (const call of Array.isArray(item.tool_calls) ? item.tool_calls : [])
      yield {
        category: "toolCalls",
        text: serialized(call),
        call: id(call.id),
        name: call.function?.name ?? call.custom?.name,
      };
  }
}

/** Chunked o200k counts plus a disclosed heuristic remainder are visible-content estimates. */
export function countTokenBreakdown(
  body,
  encode,
  { now = performance.now.bind(performance), maxChars = 262144, maxMs = 1500 } = {}
) {
  /** Initialize independent token, byte, and part counters for each requested bucket. */
  const empty = (names) =>
    Object.fromEntries(names.map((n) => [n, { tokens: 0, bytes: 0, parts: 0 }]));
  const out = {
    status: encode ? "ok" : "unavailable_tokenizer",
    categories: empty(categories),
    sources: empty(sources),
    totals: { tokens: 0, bytes: 0, parts: 0 },
    exactChars: 0,
    heuristicChars: 0,
    omittedMedia: 0,
  };
  const calls = new Map();
  let order = 0;
  for (const unit of units(body)) {
    if (unit.call) {
      if (calls.has(unit.call)) calls.set(unit.call, null);
      else if (calls.size < 512) calls.set(unit.call, { order, source: outputSource(unit.name) });
    }
    order++;
  }
  order = 0;
  const started = now();
  for (const unit of units(body)) {
    if (unit.media) {
      out.omittedMedia++;
      order++;
      continue;
    }
    let tokens = 0,
      offset = 0;
    while (offset < unit.text.length) {
      let end = Math.min(offset + 1024, unit.text.length);
      if (end < unit.text.length && /[\uD800-\uDBFF]/.test(unit.text[end - 1])) end--;
      const size = end - offset;
      if (!encode || out.exactChars + size > maxChars || now() - started >= maxMs) break;
      tokens += encode(unit.text.slice(offset, end)).length;
      out.exactChars += size;
      offset = end;
    }
    if (offset < unit.text.length) {
      tokens += Math.ceil((unit.text.length - offset) / 4);
      out.heuristicChars += unit.text.length - offset;
    }
    const stats = { tokens, bytes: Buffer.byteLength(unit.text), parts: 1 };
    const targets = [out.categories[unit.category], out.totals];
    if (unit.category === "toolOutputs") {
      const call = unit.reference ? calls.get(unit.reference) : null;
      targets.push(out.sources[call && call.order < order ? call.source : "otherOrUnknown"]);
    }
    for (const target of targets)
      for (const key of ["tokens", "bytes", "parts"]) target[key] += stats[key];
    order++;
  }
  return out;
}
