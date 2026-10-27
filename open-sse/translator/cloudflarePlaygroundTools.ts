/**
 * Cloudflare AI Playground Tool Call Translation
 *
 * The Cloudflare Playground does not have native tool/function calling. Instead,
 * we emulate tool calling by serializing OpenAI `tools[]` into a prompt contract
 * (injected into the first user message, since the server-side persona drops
 * system messages) and parsing the model's text reply back into OpenAI
 * `tool_calls`.
 *
 * Real-world shapes observed from the playground:
 *   - `<tool>{"command": "ls"}</tool>` — no name field, infer from schema
 *   - `<tool name="bash">{"command": "ls"}</tool>` — explicit name attribute
 *   - `<shell>...</shell>` — tool name as the tag (discovered live)
 *   - `<tool:name>...</tool:name>` — alternative tag form
 *
 * The parser handles all these shapes and infers the tool name when omitted
 * (uses the single available tool from the schema, or falls back to the
 * first tool in the list).
 */
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import type { ChatCompletionTool } from "openai/resources/chat/completions";

/**
 * OpenAI tool definition (subset we care about).
 */
export interface CfToolDef {
  name: string;
  description?: string;
  parameters: Record<string, unknown>;
}

/**
 * Parsed tool call from the model's text output.
 */
export interface CfParsedToolCall {
  id: string;
  name: string;
  arguments: string; // JSON string
}

/**
 * Serialize OpenAI `tools[]` into a human-readable contract block that can be
 * injected into the user prompt. The model sees this as instructions for how
 * to invoke tools using XML-like tags.
 */
export function serializeCfToolPrompt(tools: ChatCompletionTool[]): string {
  if (!tools || tools.length === 0) return "";

  const defs: CfToolDef[] = tools.map((t) => ({
    name: t.function.name,
    description: t.function.description,
    parameters: t.function.parameters as Record<string, unknown>,
  }));

  const lines = [
    "# Tools",
    "",
    "You have access to the following functions. To invoke a function, respond with an XML tag:",
    "",
    '  <tool name="function_name">{"arg": "value"}</tool>',
    "",
    "Or, if there is only ONE function available, you may omit the name:",
    "",
    '  <tool>{"arg": "value"}</tool>',
    "",
    "The argument object must be valid JSON. Do not include any other text outside the tool tag when making a tool call.",
    "",
    "Available functions:",
  ];

  for (const def of defs) {
    lines.push(`## ${def.name}`);
    if (def.description) lines.push(def.description);
    lines.push("Parameters:");
    lines.push(JSON.stringify(def.parameters, null, 2));
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Check if the text contains what looks like a tool call attempt but is
 * malformed (e.g., unclosed tags, invalid JSON). This helps us decide whether
 * to treat the response as a tool call or regular text.
 */
export function hasMalformedCfToolIntent(text: string): boolean {
  if (!text) return false;
  // Look for tool-like tags that don't parse cleanly
  const toolTagRegex = /<\s*tool\b[^>]*>|<\s*\/\s*tool\s*>/i;
  const shellTagRegex = /<\s*shell\b[^>]*>|<\s*\/\s*shell\s*>/i;
  const hasToolTag = toolTagRegex.test(text);
  const hasShellTag = shellTagRegex.test(text);
  if (!hasToolTag && !hasShellTag) return false;
  // If it has tags but parseCfToolCalls returns empty, it's malformed
  // Use a dummy tool list so name inference works for <tool> without name
  const parsed = parseCfToolCalls(text, [{ name: "dummy", parameters: {} }]);
  return parsed.length === 0;
}

/**
 * Parse tool calls from the model's text output.
 *
 * Handles the following shapes:
 *   1. `<tool>{"arg": "val"}</tool>` — name omitted, infer from schema
 *   2. `<tool name="bash">{"arg": "val"}</tool>` — explicit name attribute
 *   3. `<tool:bash>{"arg": "val"}</tool:bash>` — name as tag suffix
 *   4. `<shell>...</shell>` — tool name IS the tag (discovered live)
 *
 * @param text - The model's full text response
 * @param availableTools - List of tool definitions (for name inference when omitted)
 * @returns Array of parsed tool calls with generated IDs
 */
// Helper to validate JSON
function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export function parseCfToolCalls(text: string, availableTools: CfToolDef[]): CfParsedToolCall[] {
  if (!text) return [];

  const calls: CfParsedToolCall[] = [];

  // Pattern 1: <tool name="...">...</tool> or <tool>...</tool>
  const toolTagRegex = /<\s*tool\b([^>]*)>([\s\S]*?)<\s*\/\s*tool\s*>/gi;
  let match: RegExpExecArray | null;
  while ((match = toolTagRegex.exec(text)) !== null) {
    const attrs = match[1];
    const content = match[2].trim();
    // Only accept tool calls with valid JSON arguments
    if (!isValidJson(content)) continue;
    // Handle format: <tool>{"name": "shell", "arguments": {...}}</tool>
    let name: string | null = null;
    let argsJson = content;
    try {
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === "object" && parsed.name && parsed.arguments) {
        name = parsed.name;
        argsJson = JSON.stringify(parsed.arguments);
      }
    } catch {
      // not the wrapped format, continue
    }
    if (!name) {
      const nameMatch = attrs.match(/name\s*=\s*["']([^"']+)["']/i);
      name = nameMatch ? nameMatch[1] : inferToolName(argsJson, availableTools);
    }
    if (name) {
      calls.push({
        id: `call_${crypto.randomUUID().slice(0, 8)}`,
        name,
        arguments: argsJson,
      });
    }
  }

  // Pattern 2: <tool:name>...</tool:name> (alternative form)
  const toolNameTagRegex = /<\s*tool:(\w+)>([\s\S]*?)<\s*\/\s*tool:\1\s*>/gi;
  while ((match = toolNameTagRegex.exec(text)) !== null) {
    const name = match[1];
    const content = match[2].trim();
    if (!isValidJson(content)) continue;
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name,
      arguments: content,
    });
  }

  // Pattern 3: <shell>...</shell> — tool name IS the tag (live discovered shape)
  const shellTagRegex = /<\s*shell\b([^>]*)>([\s\S]*?)<\s*\/\s*shell\s*>/gi;
  while ((match = shellTagRegex.exec(text)) !== null) {
    const content = match[2].trim();
    if (!isValidJson(content)) continue;
    // For <shell> tags, the tool name is literally "shell" (the tag IS the name)
    calls.push({
      id: `call_${crypto.randomUUID().slice(0, 8)}`,
      name: "shell",
      arguments: content,
    });
  }

  return calls;
}

/**
 * Infer the tool name when the model omits it.
 * Strategy:
 *   1. If availableTools has exactly one tool, use that.
 *   2. If a hint is provided (e.g., "shell" for <shell> tags), use that if it matches.
 *   3. Otherwise, return the first tool's name.
 */
function inferToolName(
  _content: string,
  availableTools: CfToolDef[],
  hint?: string
): string | null {
  if (availableTools.length === 0) return null;

  // If hint provided and matches a tool, use it
  if (hint) {
    const hintTool = availableTools.find((t) => t.name === hint);
    if (hintTool) return hintTool.name;
  }

  // Single tool available — infer it
  if (availableTools.length === 1) {
    return availableTools[0].name;
  }

  // Multiple tools but no name given — default to first (best effort)
  return availableTools[0].name;
}

/**
 * Build the conversation prompt with the tool contract folded into the first
 * user message (since the playground drops system messages).
 *
 * This replaces the standard system prompt + user messages approach with a
 * single user message that contains the tool contract followed by the actual
 * user content.
 */
export function buildCfToolConversationPrompt(
  messages: ChatCompletionMessageParam[],
  tools: ChatCompletionTool[]
): ChatCompletionMessageParam[] {
  const toolPrompt = serializeCfToolPrompt(tools);
  if (!toolPrompt) return messages;

  // Find the first user message to prepend the tool contract
  const firstUserIndex = messages.findIndex((m) => m.role === "user");
  if (firstUserIndex === -1) return messages;

  const newMessages = [...messages];
  const firstUserMsg = newMessages[firstUserIndex];

  // Extract existing content
  let existingContent = "";
  if (typeof firstUserMsg.content === "string") {
    existingContent = firstUserMsg.content;
  } else if (Array.isArray(firstUserMsg.content)) {
    existingContent = firstUserMsg.content
      .map((part) =>
        typeof part === "string" ? part : ((part as { text?: string; type?: string }).text ?? "")
      )
      .filter(Boolean)
      .join("\n");
  }

  // Prepend tool contract
  const combinedContent = `${toolPrompt}\n\n---\n\n${existingContent}`.trim();

  newMessages[firstUserIndex] = {
    ...firstUserMsg,
    content: combinedContent,
  };

  return newMessages;
}

/**
 * Strip tool-call markup from text, leaving only the conversational content.
 * Used when the model emits both text and tool calls in one response.
 */
export function stripCfToolMarkup(text: string): string {
  if (!text) return "";
  return text
    .replace(/<\s*tool\b[^>]*>[\s\S]*?<\s*\/\s*tool\s*>/gi, "")
    .replace(/<\s*tool:(\w+)>[\s\S]*?<\s*\/\s*tool:\1\s*>/gi, "")
    .replace(/<\s*shell\b[^>]*>[\s\S]*?<\s*\/\s*shell\s*>/gi, "")
    .replace(/^---+\s*\n?/m, "") // separator line
    .trimStart(); // only trim leading whitespace, preserve trailing for test
}
