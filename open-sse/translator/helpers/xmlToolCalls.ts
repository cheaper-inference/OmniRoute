type XmlToolCall = { id: string; name: string; args: Record<string, unknown> };

type ToolCallCandidate = {
  type: "invoke" | "tool_call_tag" | "tool_call_text";
  index: number;
  match: RegExpMatchArray;
};

/** Result of consuming one complete textual tool call from the head of the buffer. */
type Consumed = { length: number; toolCall?: XmlToolCall; passthrough?: string };

const CANDIDATE_PATTERNS = [
  ["invoke", /<invoke\s+name="([^"]*)"\s*>/],
  ["tool_call_tag", /<tool_call>/],
  ["tool_call_text", /TOOL_CALL\s+([A-Za-z0-9_]+):\s*/],
] as const;

function findEarliestCandidate(text: string): ToolCallCandidate | null {
  let earliest: ToolCallCandidate | null = null;
  for (const [type, pattern] of CANDIDATE_PATTERNS) {
    const match = text.match(pattern);
    if (match && (!earliest || match.index! < earliest.index)) {
      earliest = { type, index: match.index!, match };
    }
  }
  return earliest;
}

function parseInvokeBlock(
  rest: string,
  startMatch: RegExpMatchArray,
  callIndex: number
): Consumed | null {
  const endMatch = rest.match(/<\/invoke>/);
  if (!endMatch) return null;
  const innerXml = rest.slice(startMatch[0].length, endMatch.index!);
  const args: Record<string, string> = {};
  const paramRegex = /<parameter\s+name="([^"]*)"[^>]*>([\s\S]*?)<\/parameter>/g;
  let pm;
  while ((pm = paramRegex.exec(innerXml)) !== null) {
    args[pm[1]] = pm[2].trim();
  }
  return {
    length: endMatch.index! + endMatch[0].length,
    toolCall: { id: `toolu_xml_${Date.now()}_${callIndex}`, name: startMatch[1], args },
  };
}

function parseToolCallTag(rest: string, callIndex: number): Consumed | null {
  const endMatch = rest.match(/<\/tool_call>/);
  if (!endMatch) return null;
  const innerJson = rest.slice("<tool_call>".length, endMatch.index!).trim();
  const length = endMatch.index! + "</tool_call>".length;
  try {
    const parsed = JSON.parse(innerJson) as Record<string, unknown>;
    const name = (parsed.name || parsed.tool_name || "") as string;
    const rawArgs = parsed.arguments || parsed.args || parsed.parameters || {};
    const args: Record<string, unknown> =
      typeof rawArgs === "string" ? JSON.parse(rawArgs) : (rawArgs as Record<string, unknown>);
    if (!name) return { length };
    return { length, toolCall: { id: `toolu_txt_${Date.now()}_${callIndex}`, name, args } };
  } catch {
    return { length, passthrough: rest.slice(0, length) };
  }
}

/** Index just past the first balanced top-level JSON object in `text`, or -1 if still open. */
function findJsonObjectEnd(text: string): number {
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (escape) {
      escape = false;
    } else if (c === "\\" && inString) {
      escape = true;
    } else if (c === '"') {
      inString = !inString;
    } else if (!inString && c === "{") {
      depth++;
    } else if (!inString && c === "}" && --depth === 0) {
      return i + 1;
    }
  }
  return -1;
}

function parseToolCallText(
  rest: string,
  startMatch: RegExpMatchArray,
  callIndex: number
): Consumed | null {
  const afterPrefix = rest.slice(startMatch[0].length);
  const jsonEnd = findJsonObjectEnd(afterPrefix);
  if (jsonEnd === -1) return null;
  const length = startMatch[0].length + jsonEnd;
  try {
    const args = JSON.parse(afterPrefix.slice(0, jsonEnd)) as Record<string, unknown>;
    return {
      length,
      toolCall: { id: `toolu_txt_${Date.now()}_${callIndex}`, name: startMatch[1], args },
    };
  } catch {
    return { length, passthrough: rest.slice(0, length) };
  }
}

function consumeCandidate(
  candidate: ToolCallCandidate,
  rest: string,
  callIndex: number
): Consumed | null {
  if (candidate.type === "invoke") return parseInvokeBlock(rest, candidate.match, callIndex);
  if (candidate.type === "tool_call_tag") return parseToolCallTag(rest, callIndex);
  return parseToolCallText(rest, candidate.match, callIndex);
}

/** Parse textual tool calls while retaining incomplete bodies across chunks. */
export function extractXmlInvokeBlocks(
  text: string,
  state: { _xmlInvokeBuffer?: string }
): {
  cleaned: string;
  toolCalls: XmlToolCall[];
} {
  const toolCalls: XmlToolCall[] = [];
  let remaining = (state._xmlInvokeBuffer || "") + text;
  state._xmlInvokeBuffer = "";
  let cleaned = "";

  while (remaining.length > 0) {
    const first = findEarliestCandidate(remaining);
    if (!first) {
      cleaned += remaining;
      break;
    }
    cleaned += remaining.slice(0, first.index);
    const rest = remaining.slice(first.index);
    const consumed = consumeCandidate(first, rest, toolCalls.length);
    if (!consumed) {
      state._xmlInvokeBuffer = rest;
      break;
    }
    if (consumed.passthrough) cleaned += consumed.passthrough;
    if (consumed.toolCall) toolCalls.push(consumed.toolCall);
    remaining = rest.slice(consumed.length);
  }

  return { cleaned, toolCalls };
}
