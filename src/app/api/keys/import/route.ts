import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { syncKeysToCloudIfEnabled } from "@/lib/api/keyCloudSync";
import {
  requireManagementAuth,
  requireCredentialForManagementScopedKey,
} from "@/lib/api/requireManagementAuth";
import { importApiKey, ApiKeyImportConflictError } from "@/lib/db/apiKeyImport";
import { getApiKeyById } from "@/lib/db/apiKeys";
import { maskStoredApiKey } from "@/shared/utils/apiKeyMask";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { normalizeSelfServiceScopesForCreate } from "@/shared/constants/selfServiceScopes";
import { importKeySchema } from "@/shared/validation/schemas/keyImport";
import { validatedJsonBody } from "@/shared/validation/helpers";

// Deliberate response whitelist: never spread a DB row (keyHash/keyPrefix/machineId included).
const POLICY_FIELDS = [
  "modelAccessMode",
  "allowedModels",
  "blockedModels",
  "allowedCombos",
  "allowedConnections",
  "allowedQuotas",
  "scopes",
  "noLog",
  "autoResolve",
  "isActive",
  "isBanned",
  "revokedAt",
  "expiresAt",
  "accessSchedule",
  "maxRequestsPerDay",
  "maxRequestsPerMinute",
  "throttleDelayMs",
  "rateLimits",
  "maxSessions",
  "ipAllowlist",
  "proxyId",
  "allowedEndpoints",
  "streamDefaultMode",
  "cacheDefaultMode",
  "codexServiceMode",
  "disableNonPublicModels",
  "allowUsageCommand",
  "usageLimitEnabled",
  "dailyUsageLimitUsd",
  "weeklyUsageLimitUsd",
  "chaosModeEnabled",
  "compressionEnabled",
  "allowAutoCombos",
  "catalogScope",
  "forcedModel",
] as const;

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const validation = await validatedJsonBody(request, importKeySchema);
  if (validation.success === false) return validation.response;
  const data = validation.data;
  const scopes = normalizeSelfServiceScopesForCreate(data.scopes);
  const scopeError = await requireCredentialForManagementScopedKey(request, scopes);
  if (scopeError) return scopeError;
  try {
    const result = importApiKey(data, await getConsistentMachineId());
    const stored = await getApiKeyById(result.id, { readOnly: true });
    if (!stored) throw new Error("Imported key unavailable");
    // An open-mode retry may omit manage in its body; the existing policy still governs it.
    if (!result.created) {
      const retryError = await requireCredentialForManagementScopedKey(request, stored.scopes);
      if (retryError) return retryError;
    }
    if (result.created) void syncKeysToCloudIfEnabled();
    return NextResponse.json(
      {
        id: stored.id,
        name: stored.name,
        key: maskStoredApiKey(stored.key),
        ...Object.fromEntries(POLICY_FIELDS.map((field) => [field, stored[field]])),
      },
      { status: result.created ? 201 : 200 }
    );
  } catch (error) {
    if (error instanceof ApiKeyImportConflictError) {
      return createErrorResponse({
        status: 409,
        message: "API key import conflicts with an existing credential",
      });
    }
    // SQL/encryption errors can embed supplied credentials. Do not log or echo their contents.
    return createErrorResponse({ status: 500, message: "Failed to import API key" });
  }
}
