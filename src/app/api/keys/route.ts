import { NextResponse } from "next/server";
import {
  getApiKeys,
  getApiKeysCount,
  createApiKey,
  createApiKeyFromPolicy,
  updateApiKeyPermissions,
} from "@/lib/db/apiKeys";
import { getKeyTemplateRefStatus } from "@/lib/db/keyTemplates";
import { createKeyFromPolicySchema } from "@/shared/validation/schemas/keyTemplates";
import type { CreateKeyFromPolicyResponse, KeyTemplatePolicy } from "@/shared/types/keyTemplates";
import {
  NO_STORE_HEADERS,
  templateFailure,
  templateJson,
  validationError,
} from "@/lib/api/keyTemplateHttp";

import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncKeysToCloudIfEnabled } from "@/lib/api/keyCloudSync";
import { createKeySchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isApiKeyRevealEnabled, maskStoredApiKey } from "@/lib/apiKeyExposure";
import {
  requireCredentialForManagementScopedKey,
  requireManagementAuth,
} from "@/lib/api/requireManagementAuth";
import { normalizeSelfServiceScopesForCreate } from "@/shared/constants/selfServiceScopes";
import * as log from "@/sse/utils/logger";

function parsePagination(request: Request) {
  const url = new URL(request.url);
  const limitValue = url.searchParams.get("limit");
  const offsetValue = url.searchParams.get("offset");

  const parsedLimit = limitValue ? Number.parseInt(limitValue, 10) : undefined;
  const parsedOffset = offsetValue ? Number.parseInt(offsetValue, 10) : 0;

  const limit =
    Number.isInteger(parsedLimit) && parsedLimit && parsedLimit > 0 ? parsedLimit : null;
  const offset = Number.isInteger(parsedOffset) && parsedOffset > 0 ? parsedOffset : 0;

  return { limit, offset };
}

/**
 * The permission flags a create request sets on top of the defaults, or `null` when it sets none
 * (the key then keeps the defaults and no follow-up update runs).
 */
function createPermissionOverrides(data: {
  noLog?: boolean;
  allowUsageCommand?: boolean;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  fiveHourUsageLimitUsd?: number | null;
  chaosModeEnabled?: boolean;
}) {
  const overrides = {
    ...(data.noLog === true && { noLog: true }),
    ...(data.allowUsageCommand === true && { allowUsageCommand: true }),
    ...(data.usageLimitEnabled === true && { usageLimitEnabled: true }),
    ...(data.dailyUsageLimitUsd !== undefined && { dailyUsageLimitUsd: data.dailyUsageLimitUsd }),
    ...(data.weeklyUsageLimitUsd !== undefined && {
      weeklyUsageLimitUsd: data.weeklyUsageLimitUsd,
    }),
    ...(data.fiveHourUsageLimitUsd !== undefined && {
      fiveHourUsageLimitUsd: data.fiveHourUsageLimitUsd,
    }),
    ...(data.chaosModeEnabled === true && { chaosModeEnabled: true }),
  };
  return Object.keys(overrides).length > 0 ? overrides : null;
}

// GET /api/keys - List API keys
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { limit, offset } = parsePagination(request);
    const dbLimit = limit ?? undefined;
    const total = getApiKeysCount();
    const keys = await getApiKeys(dbLimit, offset);
    const maskedKeys = keys.map((k) => ({
      ...k,
      key: maskStoredApiKey(k.key),
    }));

    return NextResponse.json({
      keys: maskedKeys,
      total,
      allowKeyReveal: isApiKeyRevealEnabled(),
    });
  } catch (error) {
    log.error("keys", "Error fetching keys", error);
    return NextResponse.json({ error: "Failed to fetch keys" }, { status: 500 });
  }
}

/**
 * POST /api/keys with `{ name, policy, templateRef? }`: the submitted policy is final
 * (never re-merged with a stored template). The key and every related row are written in
 * one transaction, so a failure leaves no key behind and no secret is ever returned for it.
 */
async function createKeyFromPolicy(request: Request, body: unknown) {
  const parsed = createKeyFromPolicySchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);
  const { name, templateRef } = parsed.data;
  const submitted = parsed.data.policy as KeyTemplatePolicy;
  const scopes = normalizeSelfServiceScopesForCreate(submitted.key.scopes);
  const policy: KeyTemplatePolicy = { ...submitted, key: { ...submitted.key, scopes } };

  const scopeAuthError = await requireCredentialForManagementScopedKey(request, scopes);
  if (scopeAuthError) return scopeAuthError;

  try {
    const machineId = await getConsistentMachineId();
    const created = await createApiKeyFromPolicy(name, machineId, policy, {
      enforceReferences: true,
      ...(templateRef && { templateRef }),
    });
    void syncKeysToCloudIfEnabled();
    const response: CreateKeyFromPolicyResponse = {
      key: created.key,
      id: created.id,
      name: created.name,
      machineId: created.machineId,
      policy,
      expiresAt: created.expiresAt,
      ...(templateRef && {
        templateRef: { ...templateRef, status: getKeyTemplateRefStatus(templateRef) },
      }),
    };
    return templateJson(response, 201);
  } catch (error) {
    return templateFailure(error, "Error creating key from policy");
  }
}

// POST /api/keys - Create new API key
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    if (body && typeof body === "object" && !Array.isArray(body) && "policy" in body) {
      return await createKeyFromPolicy(request, body);
    }

    // Zod validation
    const validation = validateBody(createKeySchema, body);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const {
      name,
      modelAccessMode,
      allowedModels,
      allowedCombos,
      noLog,
      scopes,
      allowedConnections,
      preferredConnections,
      allowUsageCommand,
      usageLimitEnabled,
      dailyUsageLimitUsd,
      weeklyUsageLimitUsd,
      fiveHourUsageLimitUsd,
      chaosModeEnabled,
      expiresAt,
    } = validation.data;

    const normalizedScopes = normalizeSelfServiceScopesForCreate(scopes);
    const scopeAuthError = await requireCredentialForManagementScopedKey(request, normalizedScopes);
    if (scopeAuthError) return scopeAuthError;

    // Always get machineId from server
    const machineId = await getConsistentMachineId();
    const apiKey = await createApiKey(name, machineId, normalizedScopes, {
      modelAccessMode,
      allowedModels,
      allowedCombos,
      allowedConnections,
      preferredConnections,
      expiresAt,
    });
    const permissionOverrides = createPermissionOverrides(validation.data);
    if (permissionOverrides) await updateApiKeyPermissions(apiKey.id, permissionOverrides);

    // Auto sync to Cloud if enabled — fire-and-forget. Cloud sync is a
    // background side-effect, not part of the key-creation contract, and it
    // performs an outbound network call. Awaiting it here blocked the HTTP
    // response on a slow/unreachable Cloud endpoint (e.g. a fresh/offline
    // install with a misconfigured or unreachable CLOUD_URL): the request
    // would hang until the fetch settled or timed out (#6570). Errors inside
    // syncKeysToCloudIfEnabled() are already caught and logged internally, so
    // this is safe to leave unawaited.
    void syncKeysToCloudIfEnabled();

    return NextResponse.json(
      {
        key: apiKey.key,
        name: apiKey.name,
        id: apiKey.id,
        machineId: apiKey.machineId,
        modelAccessMode: apiKey.modelAccessMode,
        allowedModels: apiKey.allowedModels,
        allowedCombos: apiKey.allowedCombos,
        allowedConnections: apiKey.allowedConnections,
        preferredConnections: apiKey.preferredConnections,
        noLog: noLog === true,
        allowUsageCommand: allowUsageCommand === true,
        usageLimitEnabled: usageLimitEnabled === true,
        dailyUsageLimitUsd: dailyUsageLimitUsd ?? null,
        weeklyUsageLimitUsd: weeklyUsageLimitUsd ?? null,
        fiveHourUsageLimitUsd: fiveHourUsageLimitUsd ?? null,
        chaosModeEnabled: chaosModeEnabled === true,
        expiresAt: expiresAt ?? null,
        streamDefaultMode: "legacy",
        compressionEnabled: true,
        cacheDefaultMode: "legacy",
      },
      // One-time secret: never cacheable.
      { status: 201, headers: NO_STORE_HEADERS }
    );
  } catch (error) {
    log.error("keys", "Error creating key", error);
    return NextResponse.json({ error: "Failed to create key" }, { status: 500 });
  }
}
