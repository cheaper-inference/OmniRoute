import { SELF_ACCOUNT_QUOTA_SCOPE, SELF_USAGE_SCOPE } from "@/shared/constants/selfServiceScopes";
import { API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE } from "@/shared/constants/apiKeyPolicyScopes";
import { MCP_CONNECT_SCOPE } from "@/shared/constants/managementScopes";
import { COMPRESSION_READ_SCOPE } from "@/shared/constants/mcpScopes";

const MANAGEMENT_SCOPE = "manage";

export interface CreateScopeOptions {
  mcpConnectEnabled?: boolean;
  compressionReadEnabled?: boolean;
  manageEnabled: boolean;
  selfUsageEnabled?: boolean;
  selfAccountQuotaEnabled?: boolean;
  bypassProviderQuotaPolicyEnabled?: boolean;
}

export interface PermissionScopeOptions {
  mcpConnectEnabled?: boolean;
  compressionReadEnabled?: boolean;
  manageEnabled: boolean;
  selfUsageEnabled: boolean;
  selfAccountQuotaEnabled: boolean;
  bypassProviderQuotaPolicyEnabled: boolean;
}

/** Build explicit grants for a new key, defaulting self-usage on and gating quota access on it. */
export function buildApiKeyCreateScopes(options: CreateScopeOptions): string[] {
  const scopes: string[] = [];
  const selfUsageEnabled = options.selfUsageEnabled ?? true;
  if (options.manageEnabled) scopes.push(MANAGEMENT_SCOPE);
  if (options.mcpConnectEnabled === true) scopes.push(MCP_CONNECT_SCOPE);
  if (options.compressionReadEnabled === true) scopes.push(COMPRESSION_READ_SCOPE);
  if (selfUsageEnabled) scopes.push(SELF_USAGE_SCOPE);
  if (selfUsageEnabled && options.selfAccountQuotaEnabled === true) {
    scopes.push(SELF_ACCOUNT_QUOTA_SCOPE);
  }
  if (options.bypassProviderQuotaPolicyEnabled === true) {
    scopes.push(API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE);
  }
  return scopes;
}

/** Update owned permission toggles while preserving unrelated scopes and unspecified MCP grants. */
export function mergeApiKeyPermissionScopes(
  currentScopes: readonly string[] | null | undefined,
  options: PermissionScopeOptions
): string[] {
  const scopes = new Set((currentScopes ?? []).filter((scope) => typeof scope === "string"));

  setScope(scopes, MANAGEMENT_SCOPE, options.manageEnabled);
  // Older consumers that do not own these controls must preserve explicit grants.
  if (options.mcpConnectEnabled !== undefined)
    setScope(scopes, MCP_CONNECT_SCOPE, options.mcpConnectEnabled);
  if (options.compressionReadEnabled !== undefined)
    setScope(scopes, COMPRESSION_READ_SCOPE, options.compressionReadEnabled);
  setScope(scopes, SELF_USAGE_SCOPE, options.selfUsageEnabled);
  setScope(
    scopes,
    SELF_ACCOUNT_QUOTA_SCOPE,
    options.selfUsageEnabled && options.selfAccountQuotaEnabled
  );
  setScope(scopes, API_KEY_BYPASS_PROVIDER_QUOTA_SCOPE, options.bypassProviderQuotaPolicyEnabled);

  return [...scopes];
}

/** Mutate a scope set to match one explicitly controlled permission toggle. */
function setScope(scopes: Set<string>, scope: string, enabled: boolean): void {
  if (enabled) {
    scopes.add(scope);
  } else {
    scopes.delete(scope);
  }
}
