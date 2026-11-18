/**
 * CCR retrieve-protocol instruction (#8033)
 *
 * The CCR engine replaces large blocks of text with a bare
 * `[CCR retrieve hash=<24hex> chars=N]` marker (see `index.ts`). A caller that has
 * never been told what that marker means has no way to recover the original
 * content — it can only call `omniroute_ccr_retrieve` if it (a) knows the tool
 * exists and (b) copies the 24-hex hash verbatim.
 *
 * This module injects a single, idempotent `system` message the first time a
 * request carries a CCR marker, teaching the model the marker → tool contract —
 * but ONLY when the caller's advertised `tools[]` proves it can actually reach
 * `omniroute_ccr_retrieve` (an MCP-capable caller). Plain OpenAI-compatible
 * callers that cannot reach the tool must never be told to call it.
 *
 * MCP gateways/aggregators (Docker MCP Toolkit, Claude Code, and similar) rename
 * tools when re-exposing them to the model to avoid cross-server name collisions,
 * typically as `mcp__<gateway>__<server>__omniroute_ccr_retrieve` or with a
 * dotted/slashed namespace prefix (`omniroute.omniroute_ccr_retrieve`). A caller
 * reachable only under such a namespaced name is still MCP-capable, so the match
 * below accepts a trailing-segment match bounded by a separator (`__`, `.`, `/`,
 * `:`, `_`) — never a bare substring test — so a near-miss like
 * `omniroute_ccr_retrieve_v2` still correctly does not match (#13781, #13897).
 */

const CCR_RETRIEVE_TOOL_NAME = "omniroute_ccr_retrieve";

/** Separators MCP gateways use to namespace a re-exposed tool name. */
const CCR_RETRIEVE_TOOL_NAME_SEPARATORS = ["__", ".", "/", ":", "_"];

/**
 * True when `name` is exactly the CCR retrieve tool name, or ends with it as a
 * separator-bounded trailing segment (e.g. an MCP-gateway-namespaced name such
 * as `mcp__docker__omniroute__omniroute_ccr_retrieve`). Deliberately NOT a bare
 * `.includes()`/unqualified `.endsWith()` — that would also match an unrelated
 * near-miss name like `omniroute_ccr_retrieve_v2`.
 */
function matchesCcrRetrieveToolName(name: string | undefined): boolean {
  if (typeof name !== "string") return false;
  if (name === CCR_RETRIEVE_TOOL_NAME) return true;
  return CCR_RETRIEVE_TOOL_NAME_SEPARATORS.some((separator) =>
    name.endsWith(`${separator}${CCR_RETRIEVE_TOOL_NAME}`)
  );
}

/** Leading marker that identifies the injected instruction (also the idempotency sentinel). */
export const CCR_PROTOCOL_MARKER_SENTINEL = "[CCR protocol]";

/** Prefix of the CCR retrieve marker (the engine writes the 24-hex hash + char count). */
const CCR_MARKER_PREFIX = "[CCR retrieve hash=";

/** Prefix of the session-dedup marker (the dedup engine writes the 8-hex sha). */
const DEDUP_MARKER_PREFIX = "[dedup:ref sha=";

const DEDUP_CLAUSE =
  "If you instead see a marker like `[dedup:ref sha=...]`, it means that content already " +
  "appeared earlier in this conversation — look back in the message history for it.";

/**
 * Full note, taught only to callers whose `tools[]` proves they can reach the
 * retrieve tool. `announcedToolName` is the tool name exactly as advertised
 * (possibly namespaced by a gateway), so the model calls the tool it can
 * actually see.
 */
function ccrRetrieveInstruction(announcedToolName: string): string {
  return (
    `${CCR_PROTOCOL_MARKER_SENTINEL} This conversation uses content-compression-retrieve (CCR). ` +
    `When you see a marker like \`${CCR_MARKER_PREFIX}<24hex> chars=N]\` in a message, it means the full original text (N characters) was stored and ` +
    `replaced with this marker to save space — call the \`${announcedToolName}\` tool with that hash to get the original text back verbatim. ` +
    `Copy the hash EXACTLY as written — all 24 hexadecimal characters, never truncated, abbreviated, or reformatted — a single wrong character will make the retrieval fail. ` +
    `${DEDUP_CLAUSE} Do NOT call ${announcedToolName} for a dedup reference.`
  );
}

/**
 * Dedup-only note for callers that cannot reach the retrieve tool: explains the
 * dedup marker without announcing any tool name.
 */
const DEDUP_ONLY_INSTRUCTION =
  `${CCR_PROTOCOL_MARKER_SENTINEL} Some content in this conversation is replaced by markers ` +
  `like \`${DEDUP_MARKER_PREFIX}...]\`, which means that content already appeared earlier — ` +
  `look back in the message history for it.`;

type ToolLike = {
  type?: unknown;
  name?: unknown;
  function?: { name?: unknown } | null;
};

/**
 * Scan a request body's `tools[]` for the CCR retrieve tool name, across the
 * three shapes seen in the wild: OpenAI-nested (`{type:"function",
 * function:{name}}`), flat (`{name}`), and Claude (`{name}`). A non-array or
 * absent `tools` field means the caller advertised no tools at all → `null`.
 * Returns the matching name exactly as advertised (possibly namespaced by a
 * gateway), or `null` when no advertised tool can reach it.
 */
export function resolveCcrRetrieveToolName(body: Record<string, unknown>): string | null {
  const tools = body["tools"];
  if (!Array.isArray(tools)) return null;

  for (const tool of tools) {
    const t = tool as ToolLike;
    const flatName = typeof t?.name === "string" ? t.name : undefined;
    if (matchesCcrRetrieveToolName(flatName)) return flatName as string;
    const nestedName = typeof t?.function?.name === "string" ? t.function.name : undefined;
    if (matchesCcrRetrieveToolName(nestedName)) return nestedName as string;
  }
  return null;
}

/**
 * True when the caller's advertised `tools[]` proves it can reach the CCR
 * retrieve tool under its canonical or a namespaced name.
 */
export function callerSupportsCcrRetrieve(body: Record<string, unknown>): boolean {
  return resolveCcrRetrieveToolName(body) !== null;
}

type MessageWithContent = {
  role?: unknown;
  content?: unknown;
};

function messageTextContent(message: MessageWithContent): string {
  const content = message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) =>
        part &&
        typeof part === "object" &&
        typeof (part as Record<string, unknown>)["text"] === "string"
          ? ((part as Record<string, unknown>)["text"] as string)
          : ""
      )
      .join("\n");
  }
  return "";
}

function messageContainsSentinel(message: MessageWithContent): boolean {
  return messageTextContent(message).includes(CCR_PROTOCOL_MARKER_SENTINEL);
}

function messageHasCcrMarker(message: MessageWithContent): boolean {
  return messageTextContent(message).includes(CCR_MARKER_PREFIX);
}

function messageHasDedupMarker(message: MessageWithContent): boolean {
  return messageTextContent(message).includes(DEDUP_MARKER_PREFIX);
}

/**
 * Prepend a single leading `system` message teaching the marker → tool
 * contract, but only when the message history actually carries a marker to
 * explain:
 *  - a CCR marker (`[CCR retrieve hash=...`) and the caller's `tools[]`
 *    proves it can reach the retrieve tool → full note, with the tool name
 *    exactly as advertised (possibly gateway-namespaced);
 *  - a dedup marker (`[dedup:ref sha=...`) → look-back clause, with the tool
 *    name when one is advertised and none otherwise;
 *  - no marker → `messages` unchanged (no-op);
 *  - sentinel already present → `messages` unchanged (idempotent — multi-turn
 *    requests replay prior messages, so without this check the note would
 *    stack once per turn).
 */
export function injectCcrProtocolInstruction<T extends MessageWithContent>(
  messages: T[],
  body: Record<string, unknown>
): T[] {
  const announcedToolName = resolveCcrRetrieveToolName(body);
  const hasCcrMarker = messages.some((message) => messageHasCcrMarker(message));
  const hasDedupMarker = messages.some((message) => messageHasDedupMarker(message));

  // The CCR marker is only ever produced for callers that pass the tool gate,
  // so a CCR marker without a reachable tool means there is nothing to teach.
  const hasExplainableCcrMarker = hasCcrMarker && announcedToolName !== null;
  if (!hasExplainableCcrMarker && !hasDedupMarker) return messages;
  if (messages.some((message) => messageContainsSentinel(message))) return messages;

  const content =
    announcedToolName !== null ? ccrRetrieveInstruction(announcedToolName) : DEDUP_ONLY_INSTRUCTION;

  const instructionMessage = {
    role: "system",
    content,
  } as unknown as T;

  return [instructionMessage, ...messages];
}

/**
 * Pipeline post-pass: inject the marker-protocol instruction into a request
 * body after every compression engine has run, so a dedup marker (engine that
 * runs before CCR) and a CCR marker are both seen — one note explains both.
 * Returns the same `body` object when nothing is injected (idempotent: a
 * replayed prior-turn instruction carrying the sentinel suppresses a second
 * note). Malformed bodies fail OPEN — the body passes through untouched.
 */
export function applyCcrProtocolInstruction(body: Record<string, unknown>): {
  body: Record<string, unknown>;
  injected: boolean;
} {
  const messages = body["messages"];
  if (!Array.isArray(messages)) return { body, injected: false };
  try {
    const typed = messages as Array<MessageWithContent>;
    const injected = injectCcrProtocolInstruction(typed, body);
    if (injected === typed) return { body, injected: false };
    return { body: { ...body, messages: injected }, injected: true };
  } catch (err) {
    // Defensive: a malformed body must never throw into the request pipeline.
    // Surface it the same way the CCR gate does, so a future regression in the
    // helpers is visible instead of silently skipping the protocol note forever.
    console.warn(
      "[compression/ccr] applyCcrProtocolInstruction threw; passing the body through unchanged:",
      err instanceof Error ? err.message : err
    );
    return { body, injected: false };
  }
}
