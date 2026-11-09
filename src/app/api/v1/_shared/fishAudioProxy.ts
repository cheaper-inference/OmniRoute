import {
  clearRecoveredProviderState,
  getProviderCredentialsWithQuotaPreflight,
} from "@/sse/services/auth";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import {
  enforceApiKeyPolicyWithScope,
  unusableCredentialsResponse,
} from "@/app/api/v1/_shared/keyScopedRoute";

const FISH_AUDIO_API_BASE = "https://api.fish.audio";
const ALLOWED_RESPONSE_HEADERS = [
  "content-type",
  "content-disposition",
  "retry-after",
  "x-request-id",
] as const;

type FishAudioCredentials = {
  apiKey?: string | null;
  accessToken?: string | null;
  allExpired?: boolean;
};

type FishAudioRequestInit = Omit<RequestInit, "headers"> & {
  /** Required by Node fetch when forwarding a streaming Request body. */
  duplex?: "half";
};

export function fishAudioOptionsResponse(): Response {
  return handleCorsOptions();
}

export function isSafeFishAudioVoiceId(value: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(value);
}

export function isFishAudioVoiceProvider(value: string): boolean {
  return value === "fishaudio";
}

function proxyResponseHeaders(upstream: Response): Headers {
  const headers = new Headers(CORS_HEADERS);
  for (const name of ALLOWED_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return headers;
}

export async function proxyFishAudioRequest(
  request: Request,
  pathname: string,
  init: FishAudioRequestInit = {}
): Promise<Response> {
  // GHSA-3w2r: resolve the caller key's policy like the sibling ElevenLabs
  // proxy does, so the Fish Audio connection is one the key may use.
  const scope = await enforceApiKeyPolicyWithScope(request, null);
  if (scope.rejection) return scope.rejection;

  const selection = await getProviderCredentialsWithQuotaPreflight(
    "fishaudio",
    null,
    scope.allowedConnections
  );
  const unusable = unusableCredentialsResponse("fishaudio", selection);
  if (unusable) return unusable;
  const credentials = selection as FishAudioCredentials | null;
  const apiKey = credentials?.apiKey || credentials?.accessToken;
  if (!apiKey || credentials?.allExpired) {
    return new Response(
      JSON.stringify(buildErrorBody(401, "No credentials for provider: fishaudio")),
      {
        status: 401,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }

  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${FISH_AUDIO_API_BASE}${pathname}`);
  upstreamUrl.search = incomingUrl.search;

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${apiKey}`);
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const accept = request.headers.get("accept");
  if (accept) headers.set("accept", accept);

  try {
    const upstream = await fetch(upstreamUrl, { ...init, headers });
    if (upstream.ok) {
      await clearRecoveredProviderState(credentials as Record<string, unknown>);
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
          sanitizeErrorMessage(error instanceof Error ? error.message : "Fish Audio request failed")
        )
      ),
      {
        status: 502,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      }
    );
  }
}
