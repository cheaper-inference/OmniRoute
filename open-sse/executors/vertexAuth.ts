/**
 * Vertex AI service-account helpers: parse the Service Account JSON, tell it apart from an
 * Express-mode key, and mint a cached OAuth access token. Kept apart from the executor so code
 * that only needs a token (embeddings, OCR, validation) does not import the whole executor.
 */
import { SignJWT, importPKCS8 } from "jose";

export interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  [key: string]: unknown;
}

const TOKEN_CACHE = new Map<string, { token: string; expiresAt: number }>();

// OAuth scopes minted into the Vertex SA access token.
//   - cloud-platform authorizes Vertex AI (aiplatform.googleapis.com) for chat/image execution.
//   - generative-language.retriever is ADDITIONALLY required so model discovery can list the live
//     catalog from generativelanguage.googleapis.com/v1beta/models — without it that listing returns
//     403 ACCESS_TOKEN_SCOPE_INSUFFICIENT and discovery silently falls back to the static ~10-model
//     registry list. The extra scope is harmless for execution (cloud-platform still present) and for
//     projects where it isn't needed (the mint never validates scope availability).
export const VERTEX_OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/cloud-platform",
  "https://www.googleapis.com/auth/generative-language.retriever",
] as const;

export function parseSAFromApiKey(apiKey: string): ServiceAccount {
  let parsed: ServiceAccount & { web?: unknown; installed?: unknown };
  try {
    parsed = JSON.parse(apiKey);
  } catch {
    throw new Error("Vertex AI requires a valid Service Account JSON as the API key");
  }
  if (parsed && typeof parsed === "object" && ("web" in parsed || "installed" in parsed)) {
    throw new Error(
      "OAuth client JSON is not a Service Account key; create a Service Account JSON key or provide an OAuth access token"
    );
  }
  return parsed;
}

/**
 * A Service Account credential is a JSON object (type/client_email/private_key). A Vertex AI
 * Express-mode API key is an opaque non-JSON string. Distinguishing them lets the executor
 * support BOTH: Service Account JSON (JWT → OAuth → project-scoped endpoint + Bearer auth) and
 * Express keys (project-less publisher endpoint + query-key auth), instead of failing every
 * Express key with "requires a valid Service Account JSON".
 */
export function looksLikeServiceAccountJson(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== "string") return false;
  try {
    const parsed = JSON.parse(apiKey);
    return !!parsed && typeof parsed === "object" && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

/** True for a Vertex AI Express-mode API key (a non-empty, non-JSON, non-OAuth credential). */
export function isExpressApiKey(apiKey?: string | null): boolean {
  return (
    typeof apiKey === "string" && apiKey.trim().length > 0 && !looksLikeServiceAccountJson(apiKey)
  );
}

export async function getAccessToken(sa: ServiceAccount): Promise<string> {
  if (!sa.client_email || !sa.private_key) {
    throw new Error(
      "Service Account JSON is missing required fields (client_email or private_key)"
    );
  }

  const cacheKey = sa.client_email;
  const cached = TOKEN_CACHE.get(cacheKey);

  // Buffer of 60 seconds
  if (cached && Date.now() < cached.expiresAt - 60_000) {
    return cached.token;
  }

  const privateKey = await importPKCS8(sa.private_key, "RS256");
  const now = Math.floor(Date.now() / 1000);

  const jwt = await new SignJWT({
    iss: sa.client_email,
    sub: sa.client_email,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
    scope: VERTEX_OAUTH_SCOPES.join(" "),
  })
    .setProtectedHeader({ alg: "RS256", kid: sa.private_key_id })
    .sign(privateKey);

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    throw new Error(
      `Failed to exchange JWT for Vertex access token: ${tokenRes.status} ${errorText}`
    );
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    throw new Error("Vertex AI token exchange succeeded but no access_token found");
  }

  TOKEN_CACHE.set(cacheKey, {
    token: accessToken,
    expiresAt: (now + 3600) * 1000,
  });

  return accessToken;
}
