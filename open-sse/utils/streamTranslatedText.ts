import { FORMATS } from "../translator/formats.ts";
import { collectClaudeDelta } from "./streamClaudeDelta.ts";
import { appendBoundedText, type parseSSELine, unwrapGeminiChunk } from "./streamHelpers.ts";

type Payload = NonNullable<ReturnType<typeof parseSSELine>>;
type ContentState = { accumulatedContent?: string; accumulatedReasoning?: string };
function appendText(state: ContentState | null, value: string): number {
  if (state?.accumulatedContent !== undefined)
    state.accumulatedContent = appendBoundedText(state.accumulatedContent, value);
  return value.length;
}

function collectOpenAiText(parsed: Payload, state: ContentState | null): number {
  const content = parsed.choices?.[0]?.delta?.content;
  if (typeof content === "string") return appendText(state, content);
  if (!Array.isArray(content)) return 0;
  let length = 0;
  for (const part of content) {
    if (typeof part?.text === "string") length += appendText(state, part.text);
  }
  return length;
}

function collectGeminiText(
  parsed: Payload,
  state: ContentState | null,
  targetFormat: string
): number {
  let totalContentLength = 0;
  // Gemini / Cloud Code format - may have multiple parts
  // Cloud Code API wraps in { response: { candidates: [...] } }, so unwrap.
  // Only applies to Gemini-family formats — skip for OpenAI, Claude, etc.
  const isGeminiFormat = targetFormat === FORMATS.GEMINI || targetFormat === FORMATS.ANTIGRAVITY;
  const geminiChunk = isGeminiFormat ? unwrapGeminiChunk(parsed) : parsed;
  if (geminiChunk.candidates?.[0]?.content?.parts) {
    for (const part of geminiChunk.candidates[0].content.parts) {
      if (part.text && typeof part.text === "string") {
        totalContentLength += appendText(state, part.text);
      }
    }
  }
  return totalContentLength;
}

function collectResponsesOrGenericText(parsed: Payload, state: ContentState | null): number {
  const { type, delta, content, text } = parsed;

  // Responses .done events contain full snapshots, not more delta text.
  // Reasoning summaries reach accumulatedReasoning via the response translator.
  if (typeof type === "string" && type.startsWith("response.")) {
    if (typeof delta !== "string") return 0;
    return type === "response.output_text.delta" ? appendText(state, delta) : delta.length;
  }

  if (state?.accumulatedContent === undefined) return 0;
  let length = 0;
  for (const value of [delta, content, text]) {
    if (typeof value === "string") length += appendText(state, value);
  }
  return length;
}

/** Apply the same bounded raw-provider text accumulation to live and final translated events. */
export function collectTranslatedText(
  parsed: Payload,
  state: ContentState | null,
  targetFormat: string,
  isDuplicateSequence?: (value: unknown) => boolean
) {
  if (targetFormat === FORMATS.OPENAI_RESPONSES && isDuplicateSequence?.(parsed.sequence_number)) {
    return { hasClaudeText: false, length: 0 };
  }
  const claude = collectClaudeDelta(parsed.delta, state ?? undefined);
  return {
    hasClaudeText: claude.hasText,
    length:
      claude.contentLength +
      collectOpenAiText(parsed, state) +
      collectGeminiText(parsed, state, targetFormat) +
      collectResponsesOrGenericText(parsed, state),
  };
}
