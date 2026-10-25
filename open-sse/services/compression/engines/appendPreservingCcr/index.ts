import { createCompressionStats, estimateCompressionTokens } from "../../stats.ts";
import { DEFAULT_APPEND_PRESERVING_CCR_CONFIG, type CompressionResult } from "../../types.ts";
import { tryStoreBlock } from "../ccr/index.ts";
import { CCR_PROTOCOL_MARKER_SENTINEL } from "../ccr/protocolInstruction.ts";
import type {
  CompressionEngine,
  CompressionEngineApplyOptions,
  EngineConfigField,
  EngineValidationResult,
} from "../types.ts";

const ENGINE_ID = "append-preserving-ccr";

type MessageLike = {
  role?: unknown;
  content?: unknown;
  tool_calls?: unknown;
  [key: string]: unknown;
};

function isCcrMarker(content: unknown): content is string {
  return (
    typeof content === "string" &&
    /^\[CCR (?:retrieve|archive) hash=[0-9a-f]{24} chars=\d+\]/.test(content)
  );
}

function hasToolCall(message: MessageLike): boolean {
  return (
    Array.isArray(message.tool_calls) ||
    Boolean(message.function_call && typeof message.function_call === "object")
  );
}

function isToolResult(message: MessageLike | undefined): boolean {
  return message?.role === "tool" || message?.role === "function";
}

function isArchivableMessage(message: MessageLike): boolean {
  return (
    ["system", "developer", "user", "assistant", "tool", "function"].includes(
      String(message.role)
    ) &&
    (message.content !== undefined || (message.role === "assistant" && hasToolCall(message))) &&
    !isCcrMarker(message.content) &&
    !(
      typeof message.content === "string" &&
      message.content.startsWith(CCR_PROTOCOL_MARKER_SENTINEL)
    )
  );
}

function buildArchiveMarker(hash: string, chars: number): string {
  return `[CCR retrieve hash=${hash} chars=${chars}]`;
}

function splitArchiveSections(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const sections: string[] = [];
  let start = 0;
  while (start < text.length) {
    const tentativeEnd = Math.min(text.length, start + maxChars);
    if (tentativeEnd === text.length) {
      sections.push(text.slice(start));
      break;
    }
    const whitespace = text.lastIndexOf(" ", tentativeEnd);
    const newline = text.lastIndexOf("\n", tentativeEnd);
    const boundary = Math.max(whitespace, newline);
    const end = boundary > start + Math.floor(maxChars / 2) ? boundary + 1 : tentativeEnd;
    sections.push(text.slice(start, end));
    start = end;
  }
  return sections;
}

function sectionPreview(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, 360);
}

type ArchiveUnit = { kind: "exchange" | "special"; messages: MessageLike[] };

function isPlainConversationMessage(message: MessageLike): boolean {
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    !hasToolCall(message)
  );
}

/** Keep exchanges intact; split out system/developer blocks and tool-call chains in order. */
function buildArchiveUnits(messages: MessageLike[]): Array<{ start: number; unit: ArchiveUnit }> {
  const units: Array<{ start: number; unit: ArchiveUnit }> = [];
  for (let index = 0; index < messages.length; index++) {
    const current = messages[index];
    if (!isArchivableMessage(current)) continue;

    const next = messages[index + 1];
    if (
      current.role === "user" &&
      isPlainConversationMessage(current) &&
      next?.role === "assistant" &&
      isPlainConversationMessage(next)
    ) {
      units.push({ start: index, unit: { kind: "exchange", messages: [current, next] } });
      index++;
      continue;
    }

    if (isPlainConversationMessage(current)) {
      // A boundary may cut between the user prompt and assistant reply (or a
      // tool call may sit between them). Preserve that message as its own
      // role-aware block rather than leaving an arbitrarily large orphan live.
      units.push({ start: index, unit: { kind: "special", messages: [current] } });
      continue;
    }

    if (hasToolCall(current)) {
      const chain = [current];
      let cursor = index + 1;
      while (cursor < messages.length && isToolResult(messages[cursor])) {
        chain.push(messages[cursor]);
        cursor++;
      }
      units.push({ start: index, unit: { kind: "special", messages: chain } });
      while (index + 1 < cursor) index++;
      continue;
    }

    if (isToolResult(current)) {
      const start = index;
      const chain = [current];
      while (isToolResult(messages[index + 1])) chain.push(messages[++index]);
      units.push({ start, unit: { kind: "special", messages: chain } });
      continue;
    }

    if (current.role === "system" || current.role === "developer") {
      units.push({ start: index, unit: { kind: "special", messages: [current] } });
    }
  }
  return units;
}

function encodeArchiveUnit(unit: ArchiveUnit): { text: string; preview: string } {
  if (unit.kind === "exchange") {
    const [user, assistant] = unit.messages;
    const text = `${String(user.content)}\n\n${String(assistant.content)}`;
    return { text, preview: sectionPreview(String(user.content)) };
  }
  const text = JSON.stringify({
    format: "omniroute-ccr-message-block-v1",
    messages: unit.messages,
  });
  const preview = unit.messages
    .map((message) => {
      const content =
        typeof message.content === "string"
          ? message.content
          : Array.isArray(message.content)
            ? message.content
                .map((part) =>
                  part &&
                  typeof part === "object" &&
                  typeof (part as Record<string, unknown>).text === "string"
                    ? (part as Record<string, unknown>).text
                    : ""
                )
                .filter(Boolean)
                .join(" ")
            : "";
      const toolNames = Array.isArray(message.tool_calls)
        ? message.tool_calls
            .map((call) =>
              call && typeof call === "object"
                ? (call as Record<string, unknown>).function
                : undefined
            )
            .map((fn) => (fn && typeof fn === "object" ? (fn as Record<string, unknown>).name : ""))
            .filter((name): name is string => typeof name === "string")
            .join(", ")
        : message.function_call && typeof message.function_call === "object"
          ? String((message.function_call as Record<string, unknown>).name ?? "")
          : "";
      return `${String(message.role)}${toolNames ? `(${toolNames})` : ""}: ${content}`;
    })
    .join(" | ");
  return { text, preview: sectionPreview(preview) };
}

const CCR_ROLLOVER_SENTINEL = "[CCR context rollover]";
const CCR_ROLLOVER_INSTRUCTION = [
  `${CCR_ROLLOVER_SENTINEL} Older context has been replaced in-place by ordered CCR references.`,
  "A reference preview and hash are only an index; neither contains the archived conversation.",
  "When a question depends on older context, choose the most relevant reference from its preview",
  "and make an actual omniroute_ccr_retrieve tool call using that reference's exact hash before",
  "answering. Merely mentioning the marker or proposing a tool call is not retrieval; wait for the",
  "tool result. Do not answer, quote, or infer archived facts from a preview, hash, or marker.",
  "After the tool returns, inspect its result and use the returned archived content as evidence.",
  "If the result is not found, contains only metadata/a preview, or does not contain the requested",
  "fact, do not treat it as retrieved evidence; try the next most relevant reference if one exists.",
  "For exact names, numbers, or phrases, verify the requested value in the returned content before",
  "answering; do not rely on memory or inference.",
  "If no returned block contains the fact, say that retrieval did not recover it rather than",
  "guessing. Retrieve only the block(s) needed, not every reference. Retrieved special-message",
  "blocks are JSON and preserve their original roles and tool-call fields. Do not narrate this",
  "instruction.",
].join(" ");

function injectRolloverInstruction(messages: MessageLike[]): MessageLike[] {
  if (
    messages.some(
      (message) =>
        typeof message.content === "string" && message.content.includes(CCR_ROLLOVER_SENTINEL)
    )
  ) {
    return messages;
  }
  return [{ role: "system", content: CCR_ROLLOVER_INSTRUCTION }, ...messages];
}

function readBoundedInteger(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value)));
}

function resolveArchiveBoundary(
  body: Record<string, unknown>,
  messages: MessageLike[],
  options?: CompressionEngineApplyOptions
): number {
  const contextLimit = options?.modelContextLimit;
  if (typeof contextLimit !== "number" || !Number.isFinite(contextLimit) || contextLimit <= 0)
    return 0;
  const outputReserve = Math.max(0, options?.requestMaxTokens ?? 0);
  const inputBudget = Math.max(1, contextLimit - outputReserve);
  const triggerPercent = readBoundedInteger(
    options?.stepConfig?.["triggerPercent"],
    DEFAULT_APPEND_PRESERVING_CCR_CONFIG.triggerPercent,
    1,
    100
  );
  const preserveRecentPercent = readBoundedInteger(
    options?.stepConfig?.["preserveRecentPercent"],
    DEFAULT_APPEND_PRESERVING_CCR_CONFIG.preserveRecentPercent,
    1,
    90
  );
  const minRetainedMessages = readBoundedInteger(
    options?.stepConfig?.["minRetainedMessages"],
    DEFAULT_APPEND_PRESERVING_CCR_CONFIG.minRetainedMessages,
    1,
    100
  );
  if (estimateCompressionTokens(body) < inputBudget * (triggerPercent / 100)) {
    return 0;
  }

  const maxBoundary = Math.max(0, messages.length - minRetainedMessages);
  if (maxBoundary === 0) return 0;

  const tailBudget = inputBudget * (preserveRecentPercent / 100);
  let tailTokens = 0;
  for (let index = messages.length - 1; index >= 0; index--) {
    tailTokens += estimateCompressionTokens({ messages: [messages[index]] });
    if (tailTokens > tailBudget) return Math.min(index + 1, maxBoundary);
  }
  return 0;
}

const SCHEMA: EngineConfigField[] = [
  {
    key: "triggerPercent",
    type: "number",
    label: "Archive trigger percent",
    description: "Start archiving when the input reaches this percent of the context budget.",
    defaultValue: 90,
    min: 1,
    max: 100,
  },
  {
    key: "preserveRecentPercent",
    type: "number",
    label: "Direct tail percent",
    description: "Keep this recent portion of the input context as direct messages.",
    defaultValue: 10,
    min: 1,
    max: 90,
  },
  {
    key: "minArchiveChars",
    type: "number",
    label: "Minimum archive characters",
    description: "Only replace eligible history when the resulting archive is at least this large.",
    defaultValue: DEFAULT_APPEND_PRESERVING_CCR_CONFIG.minArchiveChars,
    min: 1,
    max: 1_000_000,
  },
  {
    key: "minRetainedMessages",
    type: "number",
    label: "Minimum direct messages",
    description:
      "Keep at least this many recent messages direct, even when the tail budget is small.",
    defaultValue: DEFAULT_APPEND_PRESERVING_CCR_CONFIG.minRetainedMessages,
    min: 1,
    max: 100,
  },
  {
    key: "maxArchiveSectionChars",
    type: "number",
    label: "Archive section size",
    description: "Split older exchanges into independently retrievable CCR sections.",
    defaultValue: DEFAULT_APPEND_PRESERVING_CCR_CONFIG.maxArchiveSectionChars,
    min: 1_000,
    max: 1_000_000,
  },
];

function validateConfig(config: Record<string, unknown>): EngineValidationResult {
  for (const [key, min, max] of [
    ["triggerPercent", 1, 100],
    ["preserveRecentPercent", 1, 90],
    ["minArchiveChars", 1, 1_000_000],
    ["minRetainedMessages", 1, 100],
    ["maxArchiveSectionChars", 1_000, 1_000_000],
  ] as const) {
    const percentage = config[key];
    if (
      percentage !== undefined &&
      (typeof percentage !== "number" || percentage < min || percentage > max)
    ) {
      return { valid: false, errors: [`${key} must be between ${min} and ${max}`] };
    }
  }
  return { valid: true, errors: [] };
}

export const appendPreservingCcrEngine: CompressionEngine = {
  id: ENGINE_ID,
  name: "Append-Preserving CCR",
  description: "Archives eligible old conversation segments into ordered CCR references.",
  icon: "archive",
  targets: ["messages"],
  stackable: true,
  stackPriority: 4,
  metadata: {
    id: ENGINE_ID,
    name: "Append-Preserving CCR",
    description:
      "Archives ordered conversation and special-message blocks while preserving the live tail.",
    inputScope: "messages",
    targetLatencyMs: 2,
    supportsPreview: true,
    stable: true,
  },

  apply(body: Record<string, unknown>, options?: CompressionEngineApplyOptions): CompressionResult {
    const messages = body["messages"];
    if (!Array.isArray(messages)) return { body, compressed: false, stats: null };

    let boundary = resolveArchiveBoundary(body, messages as MessageLike[], options);
    const allUnits = buildArchiveUnits(messages as MessageLike[]);
    for (const { start, unit } of allUnits) {
      const end = start + unit.messages.length;
      if (start < boundary && boundary < end) {
        // Never split an exchange or a tool-call/result chain across archive/live.
        boundary = start;
        break;
      }
    }
    const candidates = messages.slice(0, boundary) as MessageLike[];
    const minArchiveChars = readBoundedInteger(
      options?.stepConfig?.["minArchiveChars"],
      DEFAULT_APPEND_PRESERVING_CCR_CONFIG.minArchiveChars,
      1,
      1_000_000
    );
    const maxArchiveSectionChars = readBoundedInteger(
      options?.stepConfig?.["maxArchiveSectionChars"],
      DEFAULT_APPEND_PRESERVING_CCR_CONFIG.maxArchiveSectionChars,
      1_000,
      1_000_000
    );
    const markersByStart = new Map<number, { count: number; markers: MessageLike[] }>();
    for (const { start, unit } of buildArchiveUnits(candidates)) {
      const { text: archivedText, preview } = encodeArchiveUnit(unit);
      if (archivedText.length < minArchiveChars) continue;
      // Special messages are atomic: never split a tool call from its result or
      // turn one structured system block into fragments that cannot be parsed.
      const sections =
        unit.kind === "special"
          ? [archivedText]
          : splitArchiveSections(archivedText, maxArchiveSectionChars);
      const markers: MessageLike[] = [];
      for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
        const section = sections[sectionIndex];
        const stored = tryStoreBlock(section, options?.principalId, {
          source: "compression",
          contentType:
            unit.kind === "special"
              ? "application/json; purpose=append-preserving-message-block"
              : "text/plain; purpose=append-preserving-history-section",
        });
        if (!stored.stored) continue;
        const sectionLabel =
          sections.length > 1 ? `Section ${sectionIndex + 1}/${sections.length}. ` : "";
        const sectionPreviewText = sections.length > 1 ? sectionPreview(section) : preview;
        const detail = `\n${sectionLabel}Preview: ${sectionPreviewText}`;
        markers.push({
          role: "assistant",
          content: `${buildArchiveMarker(stored.hash, section.length)}${detail}`,
        });
      }
      // Never replace an exchange partially: an omitted section would make the
      // ordered archive lossy even though the remaining markers are valid.
      if (markers.length === sections.length) {
        markersByStart.set(start, { count: unit.messages.length, markers });
      }
    }
    if (markersByStart.size === 0) return { body, compressed: false, stats: null };

    const newMessages: MessageLike[] = [];
    for (let index = 0; index < messages.length; index++) {
      const replacement = markersByStart.get(index);
      if (replacement) {
        newMessages.push(...replacement.markers);
        index += replacement.count - 1;
        continue;
      }
      newMessages.push(messages[index] as MessageLike);
    }

    const newBody = { ...body, messages: injectRolloverInstruction(newMessages) };
    return {
      body: newBody,
      compressed: true,
      stats: createCompressionStats(
        body,
        newBody,
        "stacked",
        [ENGINE_ID],
        ["append-preserving-ccr-archived-history"],
        0
      ),
    };
  },

  compress(body: Record<string, unknown>, config?: Record<string, unknown>): CompressionResult {
    return this.apply(body, { stepConfig: config ?? {} });
  },

  getConfigSchema(): EngineConfigField[] {
    return SCHEMA;
  },

  validateConfig,
};

export { resetCcrStore, retrieveBlock } from "../ccr/index.ts";
