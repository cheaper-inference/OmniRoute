import { FORMATS } from "../../translator/formats.ts";
import { sanitizeOpenAITool } from "../../services/toolSchemaSanitizer.ts";

export function sanitizeChatRequestBody(
  body: Record<string, unknown>,
  sourceFormat: string,
  targetFormat: string
): Record<string, unknown> {
  const prefersResponsesTokenField = targetFormat === FORMATS.OPENAI_RESPONSES;
  // Claude-format bodies are translated through claude-to-openai first, and that
  // translator reads `max_tokens` — the field Claude clients send. Renaming it
  // here (Responses target) drops the output cap before the translator can see
  // it, so the upstream request ships with no limit. Leave Claude token fields
  // alone: normalizeOpenAIResponsesRequest performs the same rename on the
  // translated body. OpenAI-shaped sources keep the #9161 outbound-only rule.
  const skipResponsesTokenRename = sourceFormat === FORMATS.CLAUDE;

  if (prefersResponsesTokenField && !skipResponsesTokenRename) {
    if (body.max_output_tokens === undefined) {
      if (body.max_completion_tokens !== undefined) {
        body.max_output_tokens = body.max_completion_tokens;
        delete body.max_completion_tokens;
      } else if (body.max_tokens !== undefined) {
        body.max_output_tokens = body.max_tokens;
        delete body.max_tokens;
      }
    }
  } else if (body.max_output_tokens !== undefined) {
    if (body.max_tokens === undefined) {
      body.max_tokens = body.max_output_tokens;
    }
    delete body.max_output_tokens;
  }

  if (Array.isArray(body.messages)) {
    body.messages = body.messages.map((msg: Record<string, unknown>) => {
      if (msg.name === "") {
        const { name: _n, ...rest } = msg;
        return rest;
      }
      return msg;
    });
  }
  if (Array.isArray(body.input)) {
    body.input = body.input.map((item: Record<string, unknown>) => {
      if (item.name === "") {
        const { name: _n, ...rest } = item;
        return rest;
      }
      return item;
    });
  }

  if (Array.isArray(body.tools)) {
    const tools = body.tools.filter((tool: Record<string, unknown>) => {
      const toolType = typeof tool.type === "string" ? tool.type : "";
      if (toolType && toolType !== "function" && !tool.function && tool.name === undefined) {
        return true;
      }
      const fn = tool.function as Record<string, unknown> | undefined;
      const name = fn?.name ?? tool.name;
      return name && String(name).trim().length > 0;
    });

    body.tools = tools.map((tool) => sanitizeOpenAITool(tool));
  }

  return body;
}
