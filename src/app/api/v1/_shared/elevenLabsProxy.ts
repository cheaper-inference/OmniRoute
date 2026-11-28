import {
  clearRecoveredProviderState,
  getProviderCredentialsWithQuotaPreflight,
} from "@/sse/services/auth";
import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import type { ApiKeyPolicyResult } from "@/shared/utils/apiKeyPolicy";
import { enforceApiKeyPolicyWithScope } from "./keyScopedRoute";
import { recordUnpricedSpecialtyRequest } from "@/lib/usage/specialtyRequestAccounting";
import {
  isKeyScopeBlockedCredentials,
  keyScopeBlockedResponse,
} from "@/sse/services/keyConnectionScope";

const ELEVENLABS_API_BASE = "https://api.elevenlabs.io/v1";
const ALLOWED_RESPONSE_HEADERS = [
  "content-type",
  "content-disposition",
  "request-id",
  "retry-after",
  "character-cost",
  "song-id",
] as const;

type ElevenLabsCredentials = {
  apiKey?: string | null;
  accessToken?: string | null;
  allExpired?: boolean;
  connectionId?: string | null;
};

export function elevenLabsOptionsResponse(): Response {
  return handleCorsOptions();
}

export function isSafeElevenLabsVoiceId(value: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(value);
}

function proxyResponseHeaders(upstream: Response): Headers {
  const headers = new Headers(CORS_HEADERS);
  for (const name of ALLOWED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

type ElevenLabsProxyOptions = {
  model?: string;
  contentType?: string;
  /** Internal combo dispatch already performed policy + connection-scope checks. */
  preauthorizedConnections?: string[] | null;
  apiKeyInfo?: ApiKeyPolicyResult["apiKeyInfo"];
};

async function resolveProxyScope(request: Request, options: ElevenLabsProxyOptions) {
  if (options.preauthorizedConnections !== undefined) {
    return {
      allowedConnections: options.preauthorizedConnections,
      apiKeyInfo: options.apiKeyInfo,
      rejection: null,
    };
  }
  const scope = await enforceApiKeyPolicyWithScope(request, options.model ?? null);
  return { ...scope, apiKeyInfo: scope.policy.apiKeyInfo };
}

export async function proxyElevenLabsRequest(
  request: Request,
  pathname: string,
  init: Omit<RequestInit, "headers"> = {},
  options: ElevenLabsProxyOptions = {}
): Promise<Response> {
  const startTime = Date.now();
  const { allowedConnections, apiKeyInfo, rejection } = await resolveProxyScope(request, options);
  if (rejection) return rejection;

  const selection = await getProviderCredentialsWithQuotaPreflight(
    "elevenlabs",
    null,
    allowedConnections
  );
  if (isKeyScopeBlockedCredentials(selection)) {
    return keyScopeBlockedResponse("elevenlabs", selection);
  }
  const credentials = selection as ElevenLabsCredentials | null;
  if (credentials && isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse("elevenlabs", credentials);
  }
  const apiKey = credentials?.apiKey || credentials?.accessToken;
  if (!apiKey || credentials?.allExpired) {
    return new Response(
      JSON.stringify(buildErrorBody(401, "No credentials for provider: elevenlabs")),
      {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${ELEVENLABS_API_BASE}${pathname}`);
  upstreamUrl.search = incomingUrl.search;
  const headers = new Headers();
  headers.set("xi-api-key", apiKey);
  const contentType = options.contentType ?? request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const accept = request.headers.get("accept");
  if (accept) headers.set("accept", accept);

  try {
    const upstream = await fetch(upstreamUrl, { ...init, headers, signal: request.signal });
    if (upstream.ok) {
      await clearRecoveredProviderState(credentials as Record<string, unknown>);
      if (init.method === "POST") {
        await recordUnpricedSpecialtyRequest({
          endpoint: `/v1${pathname}`,
          provider: "elevenlabs",
          model: options.model ?? pathname,
          apiKeyId: apiKeyInfo?.id,
          apiKeyName: apiKeyInfo?.name,
          connectionId: credentials.connectionId,
          startTime,
        });
      }
    }
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: proxyResponseHeaders(upstream),
    });
  } catch (error) {
    return new Response(
      JSON.stringify(
        buildErrorBody(
          502,
          sanitizeErrorMessage(error instanceof Error ? error.message : "ElevenLabs request failed")
        )
      ),
      {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
}
