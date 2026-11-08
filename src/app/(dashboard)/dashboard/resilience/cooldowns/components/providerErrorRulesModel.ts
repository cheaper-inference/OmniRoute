/**
 * Pure draft model for the operator error-rules editor (settings keys
 * `providerErrorRules` + `providerErrorDefaults`). Kept React-free so the
 * parse / serialize / validate round-trip is unit-testable.
 */

export const ERROR_RULE_SCOPES = ["connection", "model", "provider"] as const;
export type ErrorRuleScope = (typeof ERROR_RULE_SCOPES)[number];

export const ERROR_RULE_REASONS = [
  "quota_exhausted",
  "rate_limit_exceeded",
  "auth_error",
  "model_capacity",
  "server_error",
  "unknown",
] as const;
export type ErrorRuleReason = (typeof ERROR_RULE_REASONS)[number];

const MINUTE_MS = 60_000;
export const MAX_CUSTOM_COOLDOWN_MINUTES = 30 * 24 * 60;
export const MAX_ERROR_RULES = 50;

/** Duration choices: "auto" = no explicit cooldown (per-reason default), presets, or custom. */
export const COOLDOWN_PRESETS = [
  { key: "30m", ms: 30 * MINUTE_MS },
  { key: "1h", ms: 60 * MINUTE_MS },
  { key: "5h", ms: 5 * 60 * MINUTE_MS },
  { key: "24h", ms: 24 * 60 * MINUTE_MS },
] as const;
export type CooldownChoice = "auto" | (typeof COOLDOWN_PRESETS)[number]["key"] | "custom";

export interface DraftCooldown {
  choice: CooldownChoice;
  /** Minutes, used only when choice === "custom". */
  customMinutes: string;
}

export interface DraftRule {
  key: string;
  provider: string;
  status: string;
  match: string;
  scope: ErrorRuleScope;
  reason: ErrorRuleReason | "";
  cooldown: DraftCooldown;
}

export interface DraftDefault {
  key: string;
  provider: string;
  scope: ErrorRuleScope;
  cooldown: DraftCooldown;
}

export interface ErrorRulesDraft {
  rules: DraftRule[];
  defaults: DraftDefault[];
}

type StoredRule = {
  status?: number;
  match?: string;
  scope: ErrorRuleScope;
  reason?: ErrorRuleReason;
  cooldownMs?: number;
};
type StoredDefault = { cooldownMs: number; scope?: ErrorRuleScope };

export interface ErrorRulesPayload {
  providerErrorRules: Record<string, StoredRule[]>;
  providerErrorDefaults: Record<string, StoredDefault>;
}

export type ErrorRowIssueKind =
  "provider" | "condition" | "status" | "duration" | "duplicateDefault";
export type ErrorRulesIssue =
  { kind: ErrorRowIssueKind; target: "rule" | "default"; index: number } | { kind: "tooMany" };

let keySeq = 0;
export const nextDraftKey = () => `draft-${++keySeq}`;

export function cooldownFromMs(ms: number | undefined): DraftCooldown {
  if (typeof ms !== "number" || ms <= 0) return { choice: "auto", customMinutes: "" };
  const preset = COOLDOWN_PRESETS.find((p) => p.ms === ms);
  if (preset) return { choice: preset.key, customMinutes: "" };
  return { choice: "custom", customMinutes: String(Math.max(1, Math.round(ms / MINUTE_MS))) };
}

/** Resolves a draft duration: undefined = auto, null = invalid custom value. */
export function cooldownToMs(cooldown: DraftCooldown): number | undefined | null {
  if (cooldown.choice === "auto") return undefined;
  if (cooldown.choice === "custom") {
    const minutes = Number(cooldown.customMinutes);
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > MAX_CUSTOM_COOLDOWN_MINUTES) {
      return null;
    }
    return minutes * MINUTE_MS;
  }
  return COOLDOWN_PRESETS.find((p) => p.key === cooldown.choice)?.ms ?? null;
}

function asScope(value: unknown): ErrorRuleScope {
  return ERROR_RULE_SCOPES.includes(value as ErrorRuleScope)
    ? (value as ErrorRuleScope)
    : "connection";
}

function asReason(value: unknown): ErrorRuleReason | "" {
  return ERROR_RULE_REASONS.includes(value as ErrorRuleReason) ? (value as ErrorRuleReason) : "";
}

function draftRuleFrom(provider: string, rule: Partial<StoredRule>): DraftRule {
  return {
    key: nextDraftKey(),
    provider,
    status: typeof rule.status === "number" ? String(rule.status) : "",
    match: typeof rule.match === "string" ? rule.match : "",
    scope: asScope(rule.scope),
    reason: asReason(rule.reason),
    cooldown: cooldownFromMs(rule.cooldownMs),
  };
}

function draftRulesFrom(stored: unknown): DraftRule[] {
  if (!stored || typeof stored !== "object") return [];
  return Object.entries(stored as Record<string, unknown>).flatMap(([provider, list]) =>
    Array.isArray(list)
      ? list
          .filter((entry) => entry && typeof entry === "object")
          .map((entry) => draftRuleFrom(provider, entry as Partial<StoredRule>))
      : []
  );
}

function draftDefaultsFrom(stored: unknown): DraftDefault[] {
  if (!stored || typeof stored !== "object") return [];
  return Object.entries(stored as Record<string, unknown>).flatMap(([provider, entry]) => {
    const value = (entry ?? {}) as Partial<StoredDefault>;
    if (typeof value.cooldownMs !== "number") return [];
    return [
      {
        key: nextDraftKey(),
        provider,
        scope: asScope(value.scope),
        cooldown: cooldownFromMs(value.cooldownMs),
      },
    ];
  });
}

/** Settings JSON (GET /api/settings) → editable draft. Tolerates missing/malformed values. */
export function toErrorRulesDraft(settings: Record<string, unknown>): ErrorRulesDraft {
  return {
    rules: draftRulesFrom(settings.providerErrorRules),
    defaults: draftDefaultsFrom(settings.providerErrorDefaults),
  };
}

type FlagIssue = (kind: ErrorRowIssueKind) => void;

function parseDraftStatus(text: string, flag: FlagIssue): number | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  const status = Number(trimmed);
  if (!Number.isInteger(status) || status < 100 || status > 599) flag("status");
  return status;
}

function storedRuleFrom(rule: DraftRule, flag: FlagIssue): StoredRule {
  const status = parseDraftStatus(rule.status, flag);
  const match = rule.match.length > 0 ? rule.match : undefined;
  if (status === undefined && match === undefined) flag("condition");
  const cooldownMs = cooldownToMs(rule.cooldown);
  if (cooldownMs === null) flag("duration");
  const stored: StoredRule = { scope: rule.scope };
  if (status !== undefined) stored.status = status;
  if (match !== undefined) stored.match = match;
  if (rule.reason) stored.reason = rule.reason;
  if (typeof cooldownMs === "number") stored.cooldownMs = cooldownMs;
  return stored;
}

/** Draft → PATCH /api/settings payload, or the list of problems blocking the save. */
export function serializeErrorRulesDraft(
  draft: ErrorRulesDraft
): { ok: true; payload: ErrorRulesPayload } | { ok: false; issues: ErrorRulesIssue[] } {
  const issues: ErrorRulesIssue[] = [];
  const providerErrorRules: Record<string, StoredRule[]> = {};
  const providerErrorDefaults: Record<string, StoredDefault> = {};

  if (draft.rules.length > MAX_ERROR_RULES) issues.push({ kind: "tooMany" });

  draft.rules.forEach((rule, index) => {
    const provider = rule.provider.trim().toLowerCase();
    const flag = (kind: ErrorRowIssueKind) => issues.push({ kind, target: "rule", index });
    if (!provider) flag("provider");
    const stored = storedRuleFrom(rule, flag);
    if (!provider) return;
    (providerErrorRules[provider] ??= []).push(stored);
  });

  draft.defaults.forEach((entry, index) => {
    const provider = entry.provider.trim().toLowerCase();
    const flag = (kind: ErrorRowIssueKind) => issues.push({ kind, target: "default", index });
    if (!provider) flag("provider");
    else if (providerErrorDefaults[provider]) flag("duplicateDefault");
    const cooldownMs = cooldownToMs(entry.cooldown);
    if (typeof cooldownMs !== "number") flag("duration");
    if (provider && typeof cooldownMs === "number" && !providerErrorDefaults[provider]) {
      providerErrorDefaults[provider] = { cooldownMs, scope: entry.scope };
    }
  });

  if (issues.length > 0) return { ok: false, issues };
  return { ok: true, payload: { providerErrorRules, providerErrorDefaults } };
}
