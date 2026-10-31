type Body = Record<string, unknown>;

export interface PrunerOptions {
  maxRecentToolResults?: number;
  maxRecentUserTurns?: number;
  maxToolOutputLength?: number;
  preserveSystemMessages?: boolean;
  preserveUserPrompt?: boolean;
  maxToolResultPairs?: number;
  truncateChars?: number;
}

export interface ToolGroup {
  startIndex: number;
  endIndex: number;
  assistantIndex: number;
  toolIndices: number[];
  indices: number[];
}

const DEFAULT_OPTIONS: Required<PrunerOptions> = {
  maxRecentToolResults: 5,
  maxToolResultPairs: 5,
  maxRecentUserTurns: 10,
  maxToolOutputLength: 2000,
  truncateChars: 2000,
  preserveSystemMessages: true,
  preserveUserPrompt: true,
};

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const marker = "... [TRUNCATED] ... [truncated]";
  const sliceLen = Math.max(0, maxLength - marker.length);
  return text.slice(0, sliceLen) + marker;
}

function isToolResultMessage(msg: unknown): boolean {
  const m = msg as Record<string, unknown>;
  return (
    m?.role === "tool" ||
    m?.role === "function" ||
    (typeof m?.content === "object" &&
      m.content !== null &&
      Array.isArray(m.content) &&
      (m.content as { type?: string }[]).some((c) =>
        ["tool_result", "function_call_output", "computer_call_output"].includes(c?.type ?? "")
      ))
  );
}

function isAssistantWithToolCalls(msg: unknown): boolean {
  const m = msg as Record<string, unknown>;
  return (
    m?.role === "assistant" &&
    ((Array.isArray(m.tool_calls) && (m.tool_calls as unknown[]).length > 0) ||
      Boolean(m.function_call) ||
      (typeof m.content === "object" &&
        m.content !== null &&
        Array.isArray(m.content) &&
        (m.content as { type?: string }[]).some((c) =>
          ["tool_use", "function_call"].includes(c?.type ?? "")
        )))
  );
}

export function _getToolResultPairIndices(messages: Record<string, unknown>[]): ToolGroup[] {
  const groups: ToolGroup[] = [];
  let i = 0;
  while (i < messages.length) {
    if (isAssistantWithToolCalls(messages[i])) {
      const assistantIndex = i;
      const toolCallIds = new Set<string>();

      const tc = messages[i].tool_calls;
      if (Array.isArray(tc)) {
        for (const item of tc) {
          if (item && typeof item === "object") {
            const id =
              (item as { id?: string; call_id?: string }).id ??
              (item as { id?: string; call_id?: string }).call_id;
            if (typeof id === "string") toolCallIds.add(id);
          }
        }
      }

      if (Array.isArray(messages[i].content)) {
        for (const part of messages[i].content as Array<{
          type?: string;
          id?: string;
          tool_use_id?: string;
        }>) {
          if (part && typeof part === "object") {
            if (typeof part.id === "string") toolCallIds.add(part.id);
            if (typeof part.tool_use_id === "string") toolCallIds.add(part.tool_use_id);
          }
        }
      }

      const toolIndices: number[] = [];
      let j = i + 1;
      while (j < messages.length && isToolResultMessage(messages[j])) {
        const toolMsg = messages[j];
        const toolCallId =
          ((toolMsg.tool_call_id ?? toolMsg.tool_use_id) as string | undefined) ?? "";
        if (toolCallId && toolCallIds.size > 0 && !toolCallIds.has(toolCallId)) {
          break;
        }
        toolIndices.push(j);
        j++;
      }

      if (toolIndices.length > 0) {
        groups.push({
          startIndex: assistantIndex,
          endIndex: toolIndices[toolIndices.length - 1],
          assistantIndex,
          toolIndices,
          indices: [assistantIndex, ...toolIndices],
        });
        i = j;
        continue;
      }
    }
    i++;
  }
  return groups;
}

function truncateToolOutput(msg: Record<string, unknown>, maxLength: number): void {
  if (typeof msg.content === "string") {
    msg.content = truncateText(msg.content, maxLength);
  } else if (msg.content && typeof msg.content === "object" && !Array.isArray(msg.content)) {
    const raw = JSON.stringify(msg.content);
    if (raw.length > maxLength) {
      msg.content = truncateText(raw, maxLength);
    }
  }

  if (Array.isArray(msg.content)) {
    for (const part of msg.content) {
      if (part && typeof part === "object") {
        const p = part as Record<string, unknown>;
        if (typeof p.text === "string") {
          p.text = truncateText(p.text, maxLength);
        } else if (typeof p.content === "string") {
          p.content = truncateText(p.content, maxLength);
        } else if (p.content && typeof p.content === "object" && !Array.isArray(p.content)) {
          const raw = JSON.stringify(p.content);
          if (raw.length > maxLength) {
            p.content = truncateText(raw, maxLength);
          }
        }
      }
    }
  }
}

export class ContextPruner {
  static pruneForPlanner(messages: unknown[], options: PrunerOptions = {}): unknown[] {
    if (!Array.isArray(messages)) return [];

    const maxPairs =
      options.maxToolResultPairs ??
      options.maxRecentToolResults ??
      DEFAULT_OPTIONS.maxToolResultPairs;
    const truncateLimit =
      options.truncateChars ?? options.maxToolOutputLength ?? DEFAULT_OPTIONS.truncateChars;

    const msgs = messages.map((m) =>
      m && typeof m === "object" ? { ...(m as Record<string, unknown>) } : m
    ) as Record<string, unknown>[];

    const toolGroups = _getToolResultPairIndices(msgs);

    const droppedIndices = new Set<number>();
    if (toolGroups.length > maxPairs) {
      const groupsToDrop = toolGroups.slice(0, toolGroups.length - maxPairs);
      for (const group of groupsToDrop) {
        for (const idx of group.indices) {
          const role = msgs[idx]?.role;
          if (role !== "system" && role !== "user") {
            droppedIndices.add(idx);
          }
        }
      }
    }

    const result: Record<string, unknown>[] = [];
    for (let i = 0; i < msgs.length; i++) {
      if (droppedIndices.has(i)) continue;
      const msg = { ...msgs[i] };
      if (options.preserveSystemMessages === false && msg.role === "system") {
        continue;
      }
      if (isToolResultMessage(msg)) {
        truncateToolOutput(msg, truncateLimit);
      }
      result.push(msg);
    }

    return result;
  }

  /**
   * Identify complete tool call groups (assistant with tool_calls + all corresponding tool results)
   * Returns array of ToolGroup
   */
  static identifyToolCallGroups(messages: Record<string, unknown>[]): ToolGroup[] {
    return _getToolResultPairIndices(messages);
  }

  static pruneInputArray(input: unknown[], options: PrunerOptions = {}): unknown[] {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    if (!Array.isArray(input)) return [];

    const items = input.map((m) =>
      m && typeof m === "object" ? { ...(m as Record<string, unknown>) } : m
    ) as Record<string, unknown>[];
    const result: Record<string, unknown>[] = [];

    // Identify complete function call groups (function_call + function_call_output)
    const groups: Array<{ startIndex: number; endIndex: number }> = [];
    let i = 0;
    while (i < items.length - 1) {
      const curr = items[i];
      const next = items[i + 1];
      const isFuncCall =
        curr.type === "function_call" ||
        (Array.isArray((curr as Record<string, unknown>).tool_calls) &&
          ((curr as Record<string, unknown>).tool_calls as unknown[]).length > 0);
      const isFuncOutput =
        next.type === "function_call_output" ||
        next.type === "computer_call_output" ||
        next.type === "local_shell_call_output";
      if (isFuncCall && isFuncOutput) {
        groups.push({ startIndex: i, endIndex: i + 1 });
        i += 2;
      } else {
        i++;
      }
    }

    const maxPairs =
      options.maxToolResultPairs ?? options.maxRecentToolResults ?? opts.maxRecentToolResults;
    const groupsToKeep = Math.min(maxPairs, groups.length);
    const startGroupIndex = groups.length - groupsToKeep;
    const keepFromIndex = startGroupIndex > 0 ? groups[startGroupIndex].startIndex : 0;

    // Preserve non-tool messages before the kept pairs
    for (let j = 0; j < keepFromIndex; j++) {
      if (
        items[j].type !== "function_call" &&
        items[j].type !== "function_call_output" &&
        items[j].type !== "computer_call_output" &&
        items[j].type !== "local_shell_call_output"
      ) {
        result.push(items[j]);
      }
    }

    const truncateLimit =
      options.truncateChars ?? options.maxToolOutputLength ?? opts.maxToolOutputLength;

    for (let j = keepFromIndex; j < items.length; j++) {
      const item = { ...items[j] };
      if (typeof item.output === "string") {
        item.output = truncateText(item.output, truncateLimit);
      }
      result.push(item);
    }

    return result;
  }

  static pruneContentsArray(contents: unknown[], options: PrunerOptions = {}): unknown[] {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    if (!Array.isArray(contents)) return [];

    const items = contents.map((m) =>
      m && typeof m === "object" ? { ...(m as Record<string, unknown>) } : m
    ) as Record<string, unknown>[];
    const result: Record<string, unknown>[] = [];

    // Identify complete function call groups for Gemini format
    const groups: Array<{ startIndex: number; endIndex: number }> = [];
    let i = 0;
    while (i < items.length - 1) {
      const curr = items[i];
      const next = items[i + 1];
      const hasFuncCall =
        curr.type === "function_call" ||
        (Array.isArray(curr.parts) &&
          (curr.parts as Record<string, unknown>[]).some(
            (p) => (p as Record<string, unknown>)?.functionCall
          ));
      const hasFuncResponse =
        next.type === "function_call_output" ||
        (Array.isArray(next.parts) &&
          (next.parts as Record<string, unknown>[]).some(
            (p) => (p as Record<string, unknown>)?.functionResponse
          ));
      if (hasFuncCall && hasFuncResponse) {
        groups.push({ startIndex: i, endIndex: i + 1 });
        i += 2;
      } else {
        i++;
      }
    }

    const maxPairs =
      options.maxToolResultPairs ?? options.maxRecentToolResults ?? opts.maxRecentToolResults;
    const groupsToKeep = Math.min(maxPairs, groups.length);
    const startGroupIndex = groups.length - groupsToKeep;
    const keepFromIndex = startGroupIndex > 0 ? groups[startGroupIndex].startIndex : 0;

    for (let j = 0; j < keepFromIndex; j++) {
      if (
        items[j].type !== "function_call" &&
        !(
          Array.isArray(items[j].parts) &&
          (items[j].parts as Record<string, unknown>[]).some(
            (p) => (p as Record<string, unknown>)?.functionCall
          )
        )
      ) {
        result.push(items[j]);
      }
    }

    const truncateLimit =
      options.truncateChars ?? options.maxToolOutputLength ?? opts.maxToolOutputLength;

    for (let j = keepFromIndex; j < items.length; j++) {
      const item = { ...items[j] };
      if (Array.isArray(item.parts)) {
        item.parts = (item.parts as Record<string, unknown>[]).map((part) => {
          if (part && typeof part === "object") {
            const p = { ...part };
            const resp = p.functionResponse as Record<string, unknown> | undefined;
            if (resp && typeof resp === "object") {
              const resObj = resp.response as Record<string, unknown> | undefined;
              if (resObj && typeof resObj.result === "string") {
                p.functionResponse = {
                  ...resp,
                  response: {
                    ...resObj,
                    result: truncateText(resObj.result, truncateLimit),
                  },
                };
              }
            }
            return p;
          }
          return part;
        });
      }
      result.push(item);
    }

    return result;
  }

  static pruneBody(body: Body, options: PrunerOptions = {}): Body {
    const newBody = structuredClone(body);

    if (Array.isArray(newBody.messages)) {
      newBody.messages = this.pruneForPlanner(newBody.messages, options);
    }
    if (Array.isArray(newBody.input)) {
      newBody.input = this.pruneInputArray(newBody.input, options);
    }
    if (Array.isArray(newBody.contents)) {
      newBody.contents = this.pruneContentsArray(newBody.contents, options);
    }

    return newBody;
  }
}
