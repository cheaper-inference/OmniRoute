/**
 * Claude passthrough: strip `output_config.format` (structured output / json_schema)
 * for Claude-compatible third-party endpoints (Fix #1719). MiniMax, DeepSeek via
 * aggregators, Alibaba MaaS etc. reject the field with a 400 — and Claude Code sends
 * it on every session-title request, so the connection would get locked.
 *
 * `effort` is kept; an `output_config` left empty is removed.
 *
 * Exempt: the first-party Anthropic endpoints, which do support structured output —
 * `claude` (Claude OAuth) and `anthropic` (official API-key provider).
 */

export const FIRST_PARTY_ANTHROPIC_PROVIDERS: ReadonlySet<string> = new Set([
  "claude",
  "anthropic",
]);

export function stripOutputConfigFormatForCompat(
  body: Record<string, unknown>,
  provider: string | null | undefined
): void {
  if (provider && FIRST_PARTY_ANTHROPIC_PROVIDERS.has(provider)) return;
  const oc = body.output_config;
  if (!oc || typeof oc !== "object") return;
  const outputConfig = oc as Record<string, unknown>;
  // Copy-on-write: the caller's body is shared per combo leg ({ ...body } is a
  // shallow copy), so deleting `format` in place also strips it from legs that
  // target a first-party Anthropic endpoint and DO support structured output.
  const { format: _format, ...rest } = outputConfig;
  if (Object.keys(rest).length === 0) delete body.output_config;
  else body.output_config = rest;
}
