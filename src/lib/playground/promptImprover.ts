// src/lib/playground/promptImprover.ts
import { z } from "zod";

export const ImprovePromptRequestSchema = z
  .object({
    /** Current content to improve; at least one of the two must be non-empty. */
    system: z.string().max(50_000).optional(),
    prompt: z.string().max(50_000).optional(),
    /** Model configured in the Config panel — user's choice (D8). */
    model: z.string().min(1),
    /** Tone: "concise" (default) or "detailed" (more verbose). */
    tone: z.enum(["concise", "detailed"]).default("concise"),
  })
  .refine((d) => Boolean(d.system?.trim() || d.prompt?.trim()), {
    message: "At least one of `system` or `prompt` must be non-empty",
    path: ["system"],
  });

export type ImprovePromptRequest = z.infer<typeof ImprovePromptRequestSchema>;

export interface ImprovePromptResult {
  /** Improved versions (only the ones provided in the request are returned). */
  improvedSystem?: string;
  improvedPrompt?: string;
  /** Tokens consumed by the improve call (from usage). */
  tokensIn: number;
  tokensOut: number;
}

/**
 * Fixed meta-prompt (D8). DO NOT change without orchestrator approval.
 * Inspired by Anthropic Console Prompt Improver.
 */
export const META_SYSTEM_PROMPT = `\
You are an expert prompt engineer. Rewrite the user-supplied prompts to be:
- Clear, specific, and unambiguous
- Free of redundancy and filler
- Structured (numbered steps, bullets) only when it materially helps the model
- Preserving the user's original intent — never invent new constraints

Return ONLY the rewritten text. No explanations, no markdown wrappers.
If you receive both a system message and a user prompt, output them on separate
lines prefixed with "<<SYSTEM>>" and "<<PROMPT>>" respectively.`;

/**
 * Builds the /v1/chat/completions body for the improve call.
 * Exported for reuse in tests and in the route.
 */
export function buildImproveChatBody(req: ImprovePromptRequest): {
  model: string;
  messages: Array<{ role: "system" | "user"; content: string }>;
  temperature: number;
  max_tokens: number;
  stream: false;
} {
  const userContent: string[] = [];
  if (req.system?.trim()) userContent.push(`<<SYSTEM>>\n${req.system}`);
  if (req.prompt?.trim()) userContent.push(`<<PROMPT>>\n${req.prompt}`);
  const tonePrefix =
    req.tone === "detailed"
      ? "Be detailed and explicit in the rewrite.\n\n"
      : "Be concise and direct.\n\n";

  return {
    model: req.model,
    messages: [
      { role: "system", content: META_SYSTEM_PROMPT },
      { role: "user", content: tonePrefix + userContent.join("\n\n") },
    ],
    temperature: 0.3,
    max_tokens: 2048,
    stream: false,
  };
}

/**
 * Parses the meta-LLM response into improvedSystem/improvedPrompt.
 * Returns both when both were sent; otherwise returns only the one present.
 *
 * Edge cases:
 * - If raw has no <<SYSTEM>> or <<PROMPT>> markers:
 *   - If hadSystem and !hadPrompt → treat the whole content as improvedSystem
 *   - If !hadSystem and hadPrompt → treat the whole content as improvedPrompt
 *   - If hadSystem and hadPrompt → treat the whole content as improvedPrompt (fallback)
 * - Whitespace is trimmed before returning
 */
export function parseImprovedContent(
  raw: string,
  hadSystem: boolean,
  hadPrompt: boolean
): { improvedSystem?: string; improvedPrompt?: string } {
  const result: { improvedSystem?: string; improvedPrompt?: string } = {};

  const systemMarker = "<<SYSTEM>>";
  const promptMarker = "<<PROMPT>>";

  const hasSystemMarker = raw.includes(systemMarker);
  const hasPromptMarker = raw.includes(promptMarker);

  if (hasSystemMarker || hasPromptMarker) {
    // Parse by markers
    if (hasSystemMarker && hasPromptMarker) {
      const sysStart = raw.indexOf(systemMarker) + systemMarker.length;
      const promptStart = raw.indexOf(promptMarker);

      let sysContent: string;
      if (sysStart < promptStart) {
        sysContent = raw.substring(sysStart, promptStart).trim();
      } else {
        sysContent = raw.substring(sysStart).trim();
      }

      const promptContentStart = promptStart + promptMarker.length;
      let promptContent: string;
      if (hasSystemMarker && raw.indexOf(systemMarker) > promptStart) {
        promptContent = raw.substring(promptContentStart, raw.indexOf(systemMarker)).trim();
      } else {
        promptContent = raw.substring(promptContentStart).trim();
      }

      if (hadSystem && sysContent) result.improvedSystem = sysContent;
      if (hadPrompt && promptContent) result.improvedPrompt = promptContent;
    } else if (hasSystemMarker) {
      const sysStart = raw.indexOf(systemMarker) + systemMarker.length;
      const sysContent = raw.substring(sysStart).trim();
      if (hadSystem && sysContent) result.improvedSystem = sysContent;
    } else {
      // Only <<PROMPT>> marker
      const promptStart = raw.indexOf(promptMarker) + promptMarker.length;
      const promptContent = raw.substring(promptStart).trim();
      if (hadPrompt && promptContent) result.improvedPrompt = promptContent;
    }
  } else {
    // No markers — assign to whichever field was provided
    const trimmed = raw.trim();
    if (hadSystem && !hadPrompt) {
      if (trimmed) result.improvedSystem = trimmed;
    } else if (!hadSystem && hadPrompt) {
      if (trimmed) result.improvedPrompt = trimmed;
    } else if (hadSystem && hadPrompt) {
      // Fallback: assign to prompt
      if (trimmed) result.improvedPrompt = trimmed;
    }
  }

  return result;
}
