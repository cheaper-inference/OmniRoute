import {
  appendAnthropicBetaHeader,
  applyClientAnthropicBeta,
  normalizeAnthropicHeaderVariants,
} from "../config/anthropicHeaders.ts";

/** Beta that admits a top-level `context_management` field on an Anthropic `/messages` body. */
export const CONTEXT_MANAGEMENT_BETA = "context-management-2025-06-27";

function readClientBeta(clientHeaders: Record<string, string> | null | undefined): string | null {
  if (!clientHeaders || typeof clientHeaders !== "object") return null;
  for (const [key, value] of Object.entries(clientHeaders)) {
    if (key.toLowerCase() === "anthropic-beta" && typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return null;
}

function carriesContextManagement(body: unknown): boolean {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const value = (body as Record<string, unknown>).context_management;
  return value !== undefined && value !== null;
}

/**
 * `anthropic-beta` for the OpenCode Go / Zen Claude lane (`/v1/messages`), a strict
 * Anthropic proxy: it 400s "Extra inputs are not permitted" on a body field whose beta is
 * missing, and ignores beta values it does not know.
 *
 * - The client's betas are forwarded through the same allowlist the other Anthropic-format
 *   relays use (`FORWARDABLE_CLIENT_BETAS`), seeded from an empty set: the Claude OAuth
 *   fingerprint (`claude-code-20250219`, `oauth-2025-04-20`) never reaches this lane.
 * - A body carrying `context_management` always gets `context-management-2025-06-27`, so
 *   the field and its beta travel together whether or not the client sent the flag.
 * - Tokens are deduped; nothing to send leaves the header unset.
 */
export function applyOpencodeClaudeBeta(
  headers: Record<string, string>,
  clientHeaders: Record<string, string> | null | undefined,
  model: string | undefined,
  body: unknown
): void {
  applyClientAnthropicBeta(headers, readClientBeta(clientHeaders), {
    seedWhenAbsent: true,
    model: model ?? null,
    body,
  });
  if (carriesContextManagement(body)) {
    appendAnthropicBetaHeader(headers, CONTEXT_MANAGEMENT_BETA);
  }
  normalizeAnthropicHeaderVariants(headers);
}
