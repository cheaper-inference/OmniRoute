import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  copilotM365,
  M365_NATIVE_REDIRECT_URI,
  type M365MappedTokens,
} from "./providers/copilot-m365-web";
import { generatePKCE } from "./utils/pkce";

const TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 64;
const connectionIdSchema = z.string().min(1).max(256).optional();
const consumeSchema = z.object({
  redirectedUrl: z.string().min(1).max(16384),
  state: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
  codeVerifier: z.string().regex(/^[A-Za-z0-9._~-]{43,128}$/),
  connectionId: connectionIdSchema,
});

export interface M365AuthAttempt {
  state: string;
  codeVerifier: string;
  authUrl: string;
  redirectUri: typeof M365_NATIVE_REDIRECT_URI;
  expiresAt: number;
  connectionId?: string;
}
export interface M365AuthCompletionInput {
  redirectedUrl: string;
  state: string;
  codeVerifier: string;
  connectionId?: string;
}
export interface M365ConsumedAuthAttempt {
  code: string;
  codeVerifier: string;
  redirectUri: typeof M365_NATIVE_REDIRECT_URI;
  connectionId?: string;
}
export interface M365AuthAttempts {
  issue(options?: { connectionId?: string }): M365AuthAttempt;
  consume(input: M365AuthCompletionInput): M365ConsumedAuthAttempt;
  complete(input: M365AuthCompletionInput): Promise<{
    tokens: M365MappedTokens;
    connectionId?: string;
  }>;
}

function fail(message = "M365 authorization attempt is invalid or expired"): never {
  throw new Error(sanitizeErrorMessage(message));
}
function equal(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function validateRedirectedUrl(redirectedUrl: string, callback: URL): void {
  // Check the literal prefix too: URL normalization must not accept dot segments, backslashes,
  // empty fragments, explicit credentials/ports or other aliases of the native callback.
  if (
    !redirectedUrl.startsWith(`${M365_NATIVE_REDIRECT_URI}?`) ||
    redirectedUrl.includes("#") ||
    callback.origin !== "https://login.microsoftonline.com" ||
    callback.pathname !== "/common/oauth2/nativeclient" ||
    callback.username ||
    callback.password ||
    callback.hash ||
    callback.searchParams.has("error") ||
    callback.searchParams.has("error_description") ||
    callback.searchParams.has("error_uri") ||
    callback.searchParams.getAll("code").length !== 1 ||
    callback.searchParams.getAll("state").length !== 1
  )
    fail("M365 redirected URL is invalid");
}

function parseRedirectedCode(input: M365AuthCompletionInput, attempt: M365AuthAttempt): string {
  let callback: URL;
  try {
    callback = new URL(input.redirectedUrl);
  } catch {
    fail("M365 requires the full redirected Microsoft URL");
  }
  validateRedirectedUrl(input.redirectedUrl, callback);
  const state = callback.searchParams.get("state");
  const code = callback.searchParams.get("code");
  if (
    !state ||
    !equal(state, attempt.state) ||
    !code ||
    code.length > 8192 ||
    /\s|\p{Cc}/u.test(code)
  )
    fail("M365 redirected URL is invalid");
  return code;
}

/**
 * In-memory, process-local transactions. The route must reuse one store instance, not create
 * a store per request. Nothing is persisted; restart/expiry requires a new sign-in.
 * `complete` is the route-safe entry: no raw authorization-code escape hatch.
 */
export function createM365AuthAttempts(options: { now?: () => number } = {}): M365AuthAttempts {
  const now = options.now ?? Date.now;
  const attempts = new Map<string, M365AuthAttempt>();
  function prune(): void {
    const time = now();
    for (const [state, attempt] of attempts) {
      if (attempt.expiresAt <= time) attempts.delete(state);
    }
  }
  function consume(raw: M365AuthCompletionInput): M365ConsumedAuthAttempt {
    prune();
    const parsed = consumeSchema.safeParse(raw);
    if (!parsed.success) fail();
    const input = parsed.data;
    const attempt = attempts.get(input.state);
    if (
      !attempt ||
      !equal(input.codeVerifier, attempt.codeVerifier) ||
      input.connectionId !== attempt.connectionId
    )
      fail();
    const code = parseRedirectedCode(input, attempt);
    // Delete synchronously, before returning a code or reaching any network/await boundary.
    attempts.delete(attempt.state);
    return {
      code,
      codeVerifier: attempt.codeVerifier,
      redirectUri: attempt.redirectUri,
      ...(attempt.connectionId !== undefined ? { connectionId: attempt.connectionId } : {}),
    };
  }
  return {
    issue(input = {}) {
      prune();
      const parsed = z.object({ connectionId: connectionIdSchema }).safeParse(input);
      if (!parsed.success) fail();
      if (attempts.size >= MAX_ATTEMPTS)
        fail("M365 authorization attempt limit reached; retry later");
      const pkce = generatePKCE();
      const attempt: M365AuthAttempt = {
        state: pkce.state,
        codeVerifier: pkce.codeVerifier,
        authUrl: copilotM365.buildAuthUrl(
          copilotM365.config,
          M365_NATIVE_REDIRECT_URI,
          pkce.state,
          pkce.codeChallenge
        ),
        redirectUri: M365_NATIVE_REDIRECT_URI,
        expiresAt: now() + TTL_MS,
        ...(parsed.data.connectionId !== undefined
          ? { connectionId: parsed.data.connectionId }
          : {}),
      };
      // Never expose the stored object itself to callers.
      attempts.set(attempt.state, { ...attempt });
      return attempt;
    },
    consume,
    async complete(input) {
      const attempt = consume(input);
      const response = await copilotM365.exchangeToken(
        copilotM365.config,
        attempt.code,
        attempt.redirectUri,
        attempt.codeVerifier
      );
      return {
        tokens: copilotM365.mapTokens(response),
        ...(attempt.connectionId !== undefined ? { connectionId: attempt.connectionId } : {}),
      };
    },
  };
}

/** Shared route store; no filesystem, app secrets, device code or loopback listener. */
export const m365AuthAttempts = createM365AuthAttempts();
