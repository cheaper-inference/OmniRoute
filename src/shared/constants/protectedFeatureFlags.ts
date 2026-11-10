import { FEATURE_FLAG_DEFINITIONS } from "@/shared/constants/featureFlagDefinitions";

/**
 * Flags outside the "security" category that still loosen an access, SSRF,
 * TLS or sandbox control when flipped. Every "security" flag is covered by
 * category, so a new one is protected without editing this list.
 * MITM_DISABLE_TLS_VERIFY and SKILLS_SANDBOX_NETWORK_ENABLED (like the
 * security flag INPUT_SANITIZER_ENABLED) are read from env only today; they
 * are listed so a DB-aware reader added later is already covered.
 */
const PROTECTED_FLAGS_OUTSIDE_SECURITY_CATEGORY: ReadonlySet<string> = new Set([
  "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS",
  "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS",
  "MITM_DISABLE_TLS_VERIFY",
  "OMNIROUTE_MCP_ENFORCE_SCOPES",
  "SKILLS_SANDBOX_NETWORK_ENABLED",
]);

/**
 * Whether writing this flag's DB override needs a real credential even with
 * login disabled: a dashboard session, a manage-scope API key, an oma_ access
 * token with write scope or higher, or the CLI token or internal-service token
 * sent from loopback. The override wins over env and most of these apply
 * without a restart, so an anonymous write would switch the control off at
 * once.
 */
export function isProtectedFeatureFlag(key: string): boolean {
  if (PROTECTED_FLAGS_OUTSIDE_SECURITY_CATEGORY.has(key)) return true;
  return FEATURE_FLAG_DEFINITIONS.some((d) => d.key === key && d.category === "security");
}
