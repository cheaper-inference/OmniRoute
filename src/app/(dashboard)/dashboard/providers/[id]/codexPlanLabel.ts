/**
 * Codex subscription plan label (e.g. "Plus", "Pro", "Team"), persisted on the
 * connection's providerSpecificData.chatgptPlanType at OAuth import time (see
 * src/lib/oauth/services/codexImport.ts). Returns "" when the connection is
 * not Codex or the value is missing/blank — callers gate rendering on that.
 *
 * Kept in its own module (not providerPageHelpers.ts) because that file is
 * frozen at its file-size ratchet cap (config/quality/file-size-baseline.json)
 * and this helper is fully self-contained.
 */
export function getCodexPlanLabel(isCodex: boolean, providerSpecificData: unknown): string {
  if (!isCodex) return "";
  const record =
    providerSpecificData && typeof providerSpecificData === "object"
      ? (providerSpecificData as Record<string, unknown>)
      : {};
  const trimmed = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  return trimmed(record.chatgptPlanType) || trimmed(record.workspacePlanType);
}

export type CodexAccountKind = "personal" | "business";

export interface CodexAccountSummary {
  kind: CodexAccountKind;
  /** ChatGPT workspace name; only set for Business (workspace) accounts. */
  workspaceName: string;
  /** The user's role in the workspace as reported by ChatGPT, e.g. "account-owner". */
  role: string;
}

// Plan types that belong to a shared (Business/Team/Enterprise/Edu) workspace.
const WORKSPACE_PLAN_PATTERN = /team|business|enterprise|edu/;

/**
 * Personal plan vs. Business seat for a Codex connection, plus the workspace
 * name. Prefers the workspace structure stored by the usage sync
 * (providerSpecificData.workspaceStructure, src/lib/usage/codexWorkspaceSync.ts)
 * and falls back to the OAuth plan type until that sync has run. Returns null
 * when the connection is not Codex or nothing is known yet.
 */
export function getCodexAccountSummary(
  isCodex: boolean,
  providerSpecificData: unknown
): CodexAccountSummary | null {
  if (!isCodex) return null;
  const record =
    providerSpecificData && typeof providerSpecificData === "object"
      ? (providerSpecificData as Record<string, unknown>)
      : {};
  const trimmed = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const structure = trimmed(record.workspaceStructure).toLowerCase();
  const plan = getCodexPlanLabel(true, record).toLowerCase();
  let kind: CodexAccountKind | null = null;
  if (structure === "workspace") kind = "business";
  else if (structure === "personal") kind = "personal";
  else if (plan) kind = WORKSPACE_PLAN_PATTERN.test(plan) ? "business" : "personal";
  if (!kind) return null;
  return {
    kind,
    workspaceName: kind === "business" ? trimmed(record.workspaceName) : "",
    role: trimmed(record.workspaceRole),
  };
}

const PLAN_WORDS: Record<string, string> = {
  free: "Free",
  go: "Go",
  plus: "Plus",
  pro: "Pro",
  prolite: "Pro Lite",
  team: "Team",
  business: "Business",
  enterprise: "Enterprise",
  edu: "Edu",
};

/**
 * Human-readable form of a raw ChatGPT plan type: "prolite" → "Pro Lite",
 * "self_serve_business_prolite" → "Business Pro Lite". Unknown words are
 * capitalized; the raw value stays available to callers for tooltips.
 */
export function formatCodexPlanLabel(rawPlan: string): string {
  const words = rawPlan
    .trim()
    .toLowerCase()
    .replace(/^self_serve_/, "")
    .split(/[_\s-]+/)
    .filter(Boolean);
  return words
    .map((word) => PLAN_WORDS[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
