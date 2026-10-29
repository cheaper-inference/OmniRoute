/**
 * Claude Code's built-in WebSearch bridge, shared by every response translator that
 * reaches a target whose native search is not the Anthropic server tool.
 *
 * Two halves live here:
 *  - the request-side predicates (`isClaudeServerWebSearchTool`,
 *    `isSoleClaudeServerWebSearchTool`), used to recognize the server tool Claude
 *    Code sends and enable a provider's native grounding for it, and
 *  - the response-side emitters (`toClaudeWebSearchResults`,
 *    `buildClaudeWebSearchBlockEvents`), which turn a provider's normalized search
 *    results back into the Anthropic `server_tool_use` + `web_search_tool_result`
 *    block pair Claude Code reads its WebSearch output from.
 *
 * The emitters are pure: they never touch translator state (open text blocks are
 * the caller's concern — Gemini tracks `openTextBlockIdx` plus a Markdown buffer,
 * the OpenAI/Responses lane tracks its own), so each response translator can close
 * whatever it has open and then splice these events in at the next index.
 */

/**
 * Anthropic's web-search *server* tool as Claude Code's WebSearch sends it:
 * `{ type: "web_search_20250305", name: "web_search", max_uses: 8 }`. The dated
 * `type` is versioned (`web_search_YYYYMMDD`); the literal `name` is fixed by the
 * Messages API for each dated type.
 *
 * The two lanes that reach a Gemini target need this same predicate:
 *  - the hub (`claudeToOpenAIRequest`, CLAUDE→OPENAI→GEMINI/ANTIGRAVITY), and
 *  - the direct translator (`claudeToGeminiRequest`, CLAUDE→GEMINI),
 * which hands the raw Claude tool straight to `buildGeminiTools`.
 */
export function isClaudeServerWebSearchTool(tool: unknown): boolean {
  if (!tool || typeof tool !== "object" || Array.isArray(tool)) return false;
  const record = tool as Record<string, unknown>;
  return (
    record.name === "web_search" &&
    typeof record.type === "string" &&
    /^web_search_\d{8}$/.test(record.type)
  );
}

/**
 * True when the server tool is the ONLY tool in the request — the Claude Code
 * WebSearch sub-request shape. Google Search grounding is enabled only for that
 * shape: Antigravity's v1internal 400s when a built-in tool shares a request with
 * functionDeclarations, and an agent turn that merely happens to declare the
 * server tool alongside its own functions must keep those functions.
 */
export function isSoleClaudeServerWebSearchTool(tools: unknown): boolean {
  return Array.isArray(tools) && tools.length === 1 && isClaudeServerWebSearchTool(tools[0]);
}

/** One entry of an Anthropic `web_search_tool_result` content list. */
export interface ClaudeWebSearchResult {
  type: "web_search_result";
  url: string;
  title: string;
  encrypted_content: string;
  page_age: null;
}

/** A provider search hit before normalization; `url` is required, `title` optional. */
export interface ClaudeWebSearchResultInput {
  url?: unknown;
  title?: unknown;
}

/** The subset of Anthropic SSE events the web-search emitters produce. */
export interface ClaudeWebSearchBlockEvent {
  type: string;
  index?: number;
  content_block?: Record<string, unknown>;
  delta?: Record<string, unknown>;
}

/**
 * Normalize a provider's search hits into Anthropic `web_search_result` entries,
 * deduplicated by URL. Entries without a non-empty string `url` are dropped and a
 * missing/blank title falls back to the URL.
 */
export function toClaudeWebSearchResults(
  items: ReadonlyArray<ClaudeWebSearchResultInput> | null | undefined
): ClaudeWebSearchResult[] {
  if (!Array.isArray(items)) return [];
  const seen = new Set<string>();
  const webResults: ClaudeWebSearchResult[] = [];
  for (const item of items) {
    const url = item?.url;
    if (typeof url !== "string" || url.length === 0 || seen.has(url)) continue;
    seen.add(url);
    webResults.push({
      type: "web_search_result",
      url,
      title: typeof item.title === "string" && item.title.length > 0 ? item.title : url,
      // Anthropic encrypts the page body server-side; the grounding sources have no
      // equivalent blob, so the field is present-but-empty (Claude Code reads
      // only url/title for display).
      encrypted_content: "",
      page_age: null,
    });
  }
  return webResults;
}

/**
 * Build the five Anthropic SSE events that surface one grounded search to Claude
 * Code: a `server_tool_use` block carrying the query as `input_json_delta`, then a
 * `web_search_tool_result` block listing the hits. They occupy `startIndex` and
 * `startIndex + 1`.
 *
 * Pure — the caller is responsible for closing whatever text/thinking block is
 * still open (and for bumping its own block counter by `nextIndex`). Pass
 * `toolUseId` to pin the id for deterministic tests; otherwise it is generated
 * with the usual `srvtoolu_` prefix.
 */
export function buildClaudeWebSearchBlockEvents({
  query,
  results,
  startIndex,
  toolUseId,
}: {
  query: string;
  results: ReadonlyArray<ClaudeWebSearchResult>;
  startIndex: number;
  toolUseId?: string;
}): { events: ClaudeWebSearchBlockEvent[]; nextIndex: number; toolUseId: string } {
  const id = toolUseId || `srvtoolu_${Date.now()}_${startIndex}`;
  const events: ClaudeWebSearchBlockEvent[] = [
    {
      type: "content_block_start",
      index: startIndex,
      content_block: { type: "server_tool_use", id, name: "web_search", input: {} },
    },
    {
      type: "content_block_delta",
      index: startIndex,
      delta: { type: "input_json_delta", partial_json: JSON.stringify({ query }) },
    },
    { type: "content_block_stop", index: startIndex },
    {
      type: "content_block_start",
      index: startIndex + 1,
      content_block: {
        type: "web_search_tool_result",
        tool_use_id: id,
        content: results,
      },
    },
    { type: "content_block_stop", index: startIndex + 1 },
  ];
  return { events, nextIndex: startIndex + 2, toolUseId: id };
}
