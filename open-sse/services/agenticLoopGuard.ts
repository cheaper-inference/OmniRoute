type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as RecordValue) : {};

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object")
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stable(record(value)[key])}`)
      .join(",")}}`;
  return JSON.stringify(value) ?? "null";
}

type Call = { key: string | null; signature: string };
type Result = { key: string | null; value: string; error: boolean };
type Round = { calls: Call[]; results: Result[] };

function reference(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? `id:${value}` : null;
}

function geminiReference(item: RecordValue): string | null {
  return (
    reference(item.id) ??
    (typeof item.name === "string" && item.name.length > 0 ? `name:${item.name}` : null)
  );
}

function call(key: string | null, name: unknown, args: unknown): Call {
  return { key, signature: stable({ name, arguments: args }) };
}

function collectCall(block: RecordValue, round: Round): void {
  const { calls } = round;
  const fn = record(block.functionCall ?? block.function_call);
  if (block.type === "tool_use") calls.push(call(reference(block.id), block.name, block.input));
  else if (block.type === "function_call")
    calls.push(call(reference(block.call_id), block.name, parseArguments(block.arguments)));
  else if (block.type === "computer_call" || block.type === "local_shell_call")
    calls.push(call(reference(block.call_id), block.type, block.action));
  else if (block.functionCall || block.function_call)
    calls.push(call(geminiReference(fn), fn.name, fn.args));
}

function collectResult(block: RecordValue, round: Round): void {
  const { results } = round;
  const output = record(block.functionResponse ?? block.function_response);
  if (
    [
      "tool_result",
      "function_call_output",
      "computer_call_output",
      "local_shell_call_output",
    ].includes(String(block.type))
  ) {
    results.push({
      key: reference(block.type === "tool_result" ? block.tool_use_id : block.call_id),
      value: stable(block.content ?? block.output),
      error: block.is_error === true,
    });
  } else if (block.functionResponse || block.function_response) {
    results.push({
      key: geminiReference(output),
      value: stable(output.response),
      error: record(output.response).error != null,
    });
  }
}

function collectEntry(item: RecordValue): Round {
  const parts = Array.isArray(item.content)
    ? item.content
    : Array.isArray(item.parts)
      ? item.parts
      : [item];
  const calls: Call[] = [];
  const results: Result[] = [];

  const round = { calls, results };
  for (const part of parts) {
    collectCall(record(part), round);
    collectResult(record(part), round);
  }
  if (Array.isArray(item.tool_calls))
    for (const tool of item.tool_calls) {
      const item = record(tool);
      const fn = record(item.function);
      calls.push(call(reference(item.id), fn.name, parseArguments(fn.arguments)));
    }
  if (item.role === "tool") {
    results.push({
      key: reference(item.tool_call_id),
      value: stable(item.content),
      error: item.is_error === true,
    });
  }

  return round;
}

/** Inspect only completed rounds in the active user turn, across native protocols. */
export function stalledToolLoopReason(body: RecordValue): string | null {
  const key = Array.isArray(body.messages)
    ? "messages"
    : Array.isArray(body.input)
      ? "input"
      : "contents";
  const entries = Array.isArray(body[key]) ? (body[key] as unknown[]) : [];
  const rounds: Round[] = [];
  let pending: Round = { calls: [], results: [] };
  for (const entry of entries) {
    const item = record(entry);
    const { calls, results } = collectEntry(item);
    if (item.role === "user" && !results.length) {
      rounds.length = 0;
      pending = { calls: [], results: [] };
    }
    if (calls.length && pending.results.length) {
      rounds.push(pending);
      pending = { calls: [], results: [] };
    }
    pending.calls.push(...calls);
    pending.results.push(...results);
  }
  if (pending.calls.length || pending.results.length) rounds.push(pending);
  return compareRounds(rounds);
}

function compareRounds(rounds: Round[]): string | null {
  const previous = rounds.at(-2);
  const current = rounds.at(-1);
  if (!previous || !current) return null;
  const previousPairs = pairedEvidence(previous);
  const currentPairs = pairedEvidence(current);
  if (!previousPairs || !currentPairs) return null;
  if (stable(previousPairs.sort()) === stable(currentPairs.sort())) {
    return "the same tool calls returned the same results in two consecutive rounds";
  }
  if (
    previous.results.every((result) => result.error) &&
    current.results.every((result) => result.error)
  )
    return "two consecutive tool rounds failed";
  return null;
}

/** Missing/duplicate references cannot prove unchanged evidence or a completed round. */
function pairedEvidence(round: Round): string[] | null {
  if (!round.calls.length || round.calls.length !== round.results.length) return null;
  const results = new Map(round.results.map((result) => [result.key, result]));
  const references = new Set(round.calls.map((item) => item.key));
  if (
    references.has(null) ||
    references.size !== round.calls.length ||
    results.size !== round.results.length
  )
    return null;
  const pairs: string[] = [];
  for (const item of round.calls) {
    const result = results.get(item.key);
    if (!result) return null;
    pairs.push(stable({ call: item.signature, result: result.value, error: result.error }));
  }
  return pairs;
}

function parseArguments(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
