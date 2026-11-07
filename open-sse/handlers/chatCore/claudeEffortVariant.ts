/**
 * chatCore Claude effort-variant normalizer (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * The Claude / Claude-Code model picker (e.g. VS Code's "Effort" slider) advertises
 * claude-...-{low,medium,high,xhigh,max}. Anthropic has no such model, so the suffixed id 404s
 * upstream. This strips it back to the real base id and surfaces the level as reasoning_effort so
 * the OpenAI→Claude translator / Claude-Code bridge can turn it into Claude thinking/effort config.
 * An explicit client-supplied effort always wins; native Claude passthrough (sourceFormat === claude)
 * is left untouched (it carries its own `thinking`). The body is mutated in place (model +
 * reasoning_effort), byte-identical to the previous inline block; the new effectiveModel and an
 * optional log line are returned for the handler to apply.
 */

import { splitClaudeEffortSuffix } from "../../config/providerModels.ts";
import { resolveProviderModelAlias } from "../../services/modelCanonicalization.ts";
import { isClaudeCodeCompatibleProvider } from "../../services/claudeCodeCompatible.ts";
import { FORMATS } from "../../translator/formats.ts";
import { isKnownClaudeEffortBaseModel } from "../../utils/claudeEffortVariants.ts";
import { isAntigravityLiteralTierModelId } from "../../utils/antigravityLiteralModelIds.ts";
import { isDevinLiteralModelIdProvider } from "../../utils/devinLiteralModelIds.ts";

/**
 * True when the client already supplied an explicit reasoning effort (top-level reasoning_effort,
 * reasoning.effort, or output_config.effort) — in which case the stripped suffix must not overwrite
 * it. A blank string counts as "not supplied".
 */
function hasExplicitClaudeEffort(claudeBody: Record<string, unknown>): boolean {
  const explicitEffort =
    claudeBody.reasoning_effort ??
    (claudeBody.reasoning as Record<string, unknown> | undefined)?.effort ??
    (claudeBody.output_config as Record<string, unknown> | undefined)?.effort;
  return !(explicitEffort === undefined || explicitEffort === null || explicitEffort === "");
}

function isCursorProvider(provider: string | null | undefined): boolean {
  return (
    provider === "cursor" || provider === "cu" || provider === "cursor-api" || provider === "cua"
  );
}

/**
 * The base model id that {@link applyClaudeEffortVariant} dispatches for a Claude
 * effort-variant id (`claude-opus-5-5-high` → `claude-opus-5-5`), or `null` when the
 * id is sent upstream as-is (no effort suffix, not a Claude effort base, or a lane
 * that keeps tier ids literal: Cursor, Devin CLI, Antigravity Claude 5.x tiers).
 * Cost accounting uses it to price a variant like the model that actually served it.
 */
export function resolveClaudeEffortVariantBase(
  provider: string | null | undefined,
  model: string
): { baseModel: string; effort: string } | null {
  // Cursor advertises native effort-suffixed ids. Its executor resolves exact
  // live-catalog ids before applying its own suffix fallback; stripping here
  // destroys that information before the executor can see it.
  if (isCursorProvider(provider)) return null;
  // Devin CLI catalogs embed the effort tier in the model id itself
  // (`claude-opus-5-low` is a distinct upstream model). Stripping the suffix
  // would dispatch a base id that does not exist upstream, so keep the id
  // literal for these providers regardless of the Claude-family name.
  if (isDevinLiteralModelIdProvider(provider)) return null;
  // Antigravity Claude 5.x tiers are distinct upstream ids (`claude-opus-5-5-high`);
  // the bare base id does not exist on the Cloud Code backend.
  if (isAntigravityLiteralTierModelId(provider, model)) return null;
  if (typeof model !== "string") return null;

  const { baseModel, effort } = splitClaudeEffortSuffix(model);
  if (!effort) return null;
  const isDirectClaudeLane = provider === "claude" || isClaudeCodeCompatibleProvider(provider);
  // Anthropic's dotted catalog aliases must resolve before checking the known base.
  const knownBase =
    provider === "anthropic"
      ? (resolveProviderModelAlias(provider, baseModel) ?? baseModel)
      : baseModel;
  if (!isDirectClaudeLane && !isKnownClaudeEffortBaseModel(knownBase)) return null;
  // The suffixed id was resolved before it was split, so the provider alias (for example the
  // dotted `claude-haiku-4.5` that Anthropic only accepts as `claude-haiku-4-5`) has to be
  // applied to the base id here too.
  return { baseModel: resolveProviderModelAlias(provider, baseModel) ?? baseModel, effort };
}

export function applyClaudeEffortVariant(opts: {
  provider: string | null | undefined;
  effectiveModel: string;
  /** Mutated in place (model + reasoning_effort) when an effort suffix is stripped. */
  body: unknown;
  sourceFormat: string;
}): { effectiveModel: string; log: string | null } {
  const { provider, body, sourceFormat } = opts;
  const variant = resolveClaudeEffortVariantBase(provider, opts.effectiveModel);
  if (!variant) return { effectiveModel: opts.effectiveModel, log: null };

  const { baseModel: resolvedBase, effort } = variant;
  if (body && typeof body === "object" && !Array.isArray(body)) {
    const claudeBody = body as Record<string, unknown>;
    claudeBody.model = resolvedBase;
    if (sourceFormat !== FORMATS.CLAUDE && !hasExplicitClaudeEffort(claudeBody)) {
      claudeBody.reasoning_effort = effort;
    }
  }
  return {
    effectiveModel: resolvedBase,
    log: `Claude effort variant: stripped "-${effort}" → ${resolvedBase} (reasoning_effort=${effort})`,
  };
}
