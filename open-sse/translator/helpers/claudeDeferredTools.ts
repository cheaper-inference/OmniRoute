/**
 * Claude Code inline-tools beta (`inline-tools-2026-09-15`): deferred MCP tools
 * arrive mid-session as message content blocks instead of entries in `tools[]`:
 *
 *   { type: "tool_addition", tool: { type: "tool_definition", definition: { name, … } } }
 *   { type: "tool_addition", tool: { type: "tool_reference", name } }
 *
 * Only Anthropic's own Messages API understands those blocks. Third-party
 * Claude-shape gateways reject them with a 400, and the Claude → OpenAI
 * translator has no case for them, so the definition is silently lost and the
 * model never sees the tool. For those targets the definitions are moved into
 * `tools[]` (deduplicated by name) and the blocks are removed.
 */

type JsonRecord = Record<string, unknown>;

const TOOL_ADDITION = "tool_addition";

/**
 * Providers whose upstream is Anthropic's Messages API and that forward the
 * client's `anthropic-beta` (including the inline-tools beta) verbatim, so the
 * blocks must reach them untouched. Vertex is absent on purpose: its executor
 * does not forward client betas, so the blocks would be rejected there too.
 */
export function acceptsInlineToolAdditions(provider: string | null | undefined): boolean {
  if (typeof provider !== "string") return false;
  return (
    provider === "claude" ||
    provider === "anthropic" ||
    provider.startsWith("anthropic-compatible-")
  );
}

function isToolAddition(block: unknown): block is JsonRecord {
  return !!block && typeof block === "object" && (block as JsonRecord).type === TOOL_ADDITION;
}

function definitionOf(block: JsonRecord): JsonRecord | null {
  const tool = block.tool as JsonRecord | undefined;
  const definition = tool?.definition as JsonRecord | undefined;
  if (!definition || typeof definition !== "object") return null;
  return typeof definition.name === "string" && definition.name ? definition : null;
}

function toContentArray(content: unknown): unknown[] {
  if (Array.isArray(content)) return content;
  if (typeof content === "string" && content) return [{ type: "text", text: content }];
  return [];
}

/**
 * Move every `tool_addition` definition into `tools[]` and drop the blocks.
 * Turns left without content are removed; when that leaves two same-role turns
 * adjacent, they are merged so strict upstreams keep role alternation.
 *
 * Copy-on-write: the input body is never mutated (account/combo fallback
 * retries translate the original body again). Returns the same object when the
 * body carries no `tool_addition` block.
 */
export function hoistToolAdditions<T extends JsonRecord>(body: T): T {
  if (!body || typeof body !== "object" || !Array.isArray(body.messages)) return body;

  const sourceTools = Array.isArray(body.tools) ? (body.tools as JsonRecord[]) : null;
  const names = new Set<string>();
  for (const tool of sourceTools ?? []) {
    if (tool && typeof tool.name === "string") names.add(tool.name);
  }
  const added: JsonRecord[] = [];
  let changed = false;

  const collect = (blocks: unknown[]): unknown[] => {
    const kept: unknown[] = [];
    for (const block of blocks) {
      if (!isToolAddition(block)) {
        kept.push(block);
        continue;
      }
      changed = true;
      const definition = definitionOf(block);
      if (definition && !names.has(definition.name as string)) {
        names.add(definition.name as string);
        added.push({ ...definition });
      }
    }
    return kept;
  };

  const system = Array.isArray(body.system) ? collect(body.system) : body.system;

  const messages: JsonRecord[] = [];
  let droppedSinceLastKept = false;
  for (const msg of body.messages as JsonRecord[]) {
    if (!msg || !Array.isArray(msg.content)) {
      messages.push(msg);
      droppedSinceLastKept = false;
      continue;
    }
    const content = collect(msg.content);
    if (content.length === 0 && msg.content.length > 0) {
      droppedSinceLastKept = true;
      continue;
    }
    const next = content.length === msg.content.length ? msg : { ...msg, content };
    const last = messages[messages.length - 1];
    if (droppedSinceLastKept && last && last.role === next.role) {
      messages[messages.length - 1] = {
        ...last,
        content: [...toContentArray(last.content), ...toContentArray(next.content)],
      };
    } else {
      messages.push(next);
    }
    droppedSinceLastKept = false;
  }

  if (!changed) return body;
  return {
    ...body,
    messages,
    ...(Array.isArray(body.system) ? { system } : {}),
    ...(added.length > 0 ? { tools: [...(sourceTools ?? []), ...added] } : {}),
  };
}

/** Claude → Claude: keep the blocks for Anthropic-native targets, hoist otherwise. */
export function hoistDeferredToolsForTarget<T extends JsonRecord>(
  body: T,
  provider: string | null | undefined
): T {
  return acceptsInlineToolAdditions(provider) ? body : hoistToolAdditions(body);
}
