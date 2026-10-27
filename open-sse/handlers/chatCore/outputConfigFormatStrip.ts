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
  delete outputConfig.format;
  if (Object.keys(outputConfig).length === 0) delete body.output_config;
}
