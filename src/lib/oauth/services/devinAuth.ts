import {
  DEVIN_BROWSER_UA,
  DEVIN_CONNECT_ES_UA,
  DEVIN_GET_CURRENT_USER_URL,
  DEVIN_GET_OTT_URL,
  DEVIN_IDE_TOKEN_MARKER,
  DEVIN_PASSWORD_LOGIN_URL,
  DEVIN_POST_AUTH_URL,
  DEVIN_REGISTER_USER_URL,
  decodeProto,
  encodeProtoString,
  findSubslice,
  protoString,
  truncateToken,
} from "../devinAuth";

/**
 * Devin Auth login for Windsurf / Devin Desktop.
 *
 * Sequence (cockpit-tools `windsurf_devin_oauth.rs`):
 *
 *   email+password  → POST /_devin-auth/password/login      → auth1_token
 *   auth1_token     → WindsurfPostAuth(auth1)               → session_token, account_id, org_id
 *   session_token   → GetOneTimeAuthToken(session)          → ott
 *   ott             → RegisterUser(ott)                     → ide_token (machine-bound)
 *
 * `refreshFromAuth1` re-runs the last three steps from a stored auth1_token, so
 * OmniRoute can renew without ever seeing the user's password again.
 *
 * The password is used in exactly one request and is never logged, returned,
 * or persisted.
 */

export class DevinAuthError extends Error {
  status: number;
  code: string;

  constructor(message: string, code: string, status = 502) {
    super(message);
    this.name = "DevinAuthError";
    this.code = code;
    this.status = status;
  }
}

export interface DevinLoginResult {
  ideToken: string;
  auth1Token: string;
  sessionToken: string;
  accountId: string | null;
  orgId: string | null;
  email: string | null;
  userId: string | null;
}

export interface DevinRefreshResult {
  ideToken: string;
  sessionToken: string;
  accountId: string | null;
  orgId: string | null;
}

const REQUEST_TIMEOUT_MS = 30_000;

function describeUpstreamFailure(action: string, status: number): DevinAuthError {
  if (status === 401 || status === 403) {
    return new DevinAuthError(
      "Windsurf rejected these credentials. Check the email and password, and that the account uses Devin Auth.",
      "invalid_credentials",
      401
    );
  }
  if (status === 429) {
    return new DevinAuthError(
      "Windsurf is rate-limiting sign-in attempts. Wait a moment and try again.",
      "rate_limited",
      429
    );
  }
  if (status === 404) {
    return new DevinAuthError(
      "This account is not registered with Devin Auth. Sign in once in the Windsurf app.",
      "account_not_found",
      404
    );
  }
  return new DevinAuthError(`Windsurf ${action} failed (status ${status}).`, "upstream_error", 502);
}

function withTimeout(): AbortSignal {
  return AbortSignal.timeout(REQUEST_TIMEOUT_MS);
}

/**
 * Read a response body as bytes. Binary protos must not be JSON-decoded, and a
 * text error body must never leak into an error message verbatim.
 */
async function readBytes(response: Response): Promise<Uint8Array> {
  return new Uint8Array(await response.arrayBuffer());
}

/**
 * Encode a proto body as an ArrayBuffer.
 *
 * `fetch` accepts ArrayBuffer as BodyInit, but not a Uint8Array whose buffer
 * type is generic ArrayBufferLike — so the wire copy happens here, once.
 */
function protoBody(fieldNumber: number, value: string): ArrayBuffer {
  const encoded = encodeProtoString(fieldNumber, value);
  const buffer = new ArrayBuffer(encoded.byteLength);
  new Uint8Array(buffer).set(encoded);
  return buffer;
}

// ========== Steps ==========

async function passwordLogin(
  email: string,
  password: string
): Promise<{ auth1Token: string; userId: string | null; email: string | null }> {
  const response = await fetch(DEVIN_PASSWORD_LOGIN_URL, {
    method: "POST",
    signal: withTimeout(),
    headers: {
      Accept: "*/*",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Content-Type": "application/json",
      Origin: "https://windsurf.com",
      Referer: "https://windsurf.com/account/login",
      "User-Agent": DEVIN_BROWSER_UA,
    },
    body: JSON.stringify({ email, password, product: "Windsurf" }),
  });

  if (!response.ok) throw describeUpstreamFailure("sign-in", response.status);

  let body: Record<string, unknown>;
  try {
    body = (await response.json()) as Record<string, unknown>;
  } catch {
    throw new DevinAuthError(
      "Windsurf returned an unreadable sign-in response.",
      "malformed_response"
    );
  }

  const auth1Token = typeof body.auth1_token === "string" ? body.auth1_token : "";
  if (!auth1Token) {
    throw new DevinAuthError(
      "Windsurf accepted the sign-in but returned no auth1 token.",
      "missing_auth1"
    );
  }

  return {
    auth1Token,
    userId: typeof body.user_id === "string" ? body.user_id : null,
    email: typeof body.email === "string" ? body.email : null,
  };
}

async function postAuth(auth1Token: string): Promise<{
  sessionToken: string;
  accountId: string | null;
  orgId: string | null;
}> {
  const response = await fetch(DEVIN_POST_AUTH_URL, {
    method: "POST",
    signal: withTimeout(),
    headers: {
      "Content-Type": "application/proto",
      "connect-protocol-version": "1",
      "x-devin-auth1-token": auth1Token,
      "User-Agent": DEVIN_BROWSER_UA,
    },
    body: protoBody(1, auth1Token),
  });

  if (!response.ok) throw describeUpstreamFailure("session exchange", response.status);

  const fields = decodeProto(await readBytes(response));
  const sessionToken = protoString(fields, 2);
  if (!sessionToken) {
    throw new DevinAuthError(
      "Windsurf returned no session token for this credential.",
      "missing_session_token"
    );
  }

  return {
    sessionToken,
    accountId: protoString(fields, 4),
    orgId: protoString(fields, 5),
  };
}

async function oneTimeAuthToken(
  sessionToken: string,
  auth1Token: string,
  accountId: string | null,
  orgId: string | null
): Promise<string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/proto",
    "connect-protocol-version": "1",
    "x-auth-token": sessionToken,
    "x-devin-session-token": sessionToken,
    "x-devin-auth1-token": auth1Token,
    "User-Agent": DEVIN_BROWSER_UA,
  };
  if (accountId) headers["x-devin-account-id"] = accountId;
  if (orgId) headers["x-devin-primary-org-id"] = orgId;

  const response = await fetch(DEVIN_GET_OTT_URL, {
    method: "POST",
    signal: withTimeout(),
    headers,
    body: protoBody(1, sessionToken),
  });

  if (!response.ok) throw describeUpstreamFailure("one-time-token request", response.status);

  const ott = protoString(decodeProto(await readBytes(response)), 1);
  if (!ott) {
    throw new DevinAuthError(
      "Windsurf returned no one-time token for this session.",
      "missing_ott"
    );
  }
  return ott;
}

/**
 * Register the device and recover the ide_token.
 *
 * The server answers with a proto blob that carries the token as a raw ASCII
 * run; cockpit-tools locates it by scanning the response bytes for
 * `devin-session-token$` and taking the printable run that follows. We do the
 * same, because the field number is not stable across server revisions.
 */
async function registerUser(ott: string): Promise<string> {
  const response = await fetch(DEVIN_REGISTER_USER_URL, {
    method: "POST",
    signal: withTimeout(),
    headers: {
      "Content-Type": "application/proto",
      "connect-protocol-version": "1",
      "User-Agent": DEVIN_CONNECT_ES_UA,
    },
    body: protoBody(1, ott),
  });

  if (!response.ok) throw describeUpstreamFailure("device registration", response.status);

  const bytes = await readBytes(response);
  const marker = new TextEncoder().encode(DEVIN_IDE_TOKEN_MARKER);
  const at = findSubslice(bytes, marker);

  if (at >= 0) {
    // Take the printable run starting at the marker.
    const out: number[] = [];
    for (let i = at; i < bytes.length; i += 1) {
      const byte = bytes[i];
      if (byte < 0x21 || byte > 0x7e) break;
      out.push(byte);
    }
    const token = new TextDecoder().decode(Uint8Array.from(out));
    if (token.startsWith(DEVIN_IDE_TOKEN_MARKER) && token.length > DEVIN_IDE_TOKEN_MARKER.length) {
      return token;
    }
  }

  throw new DevinAuthError(
    "Windsurf registered the device but returned no ide token. Try again in a moment.",
    "missing_ide_token"
  );
}

/**
 * Best-effort user info for display only. A failure here never fails the login:
 * the ide_token is what actually sends requests.
 */
async function currentUserEmail(sessionToken: string, auth1Token: string): Promise<string | null> {
  try {
    const response = await fetch(DEVIN_GET_CURRENT_USER_URL, {
      method: "POST",
      signal: withTimeout(),
      headers: {
        "Content-Type": "application/proto",
        "connect-protocol-version": "1",
        "x-auth-token": sessionToken,
        "x-devin-session-token": sessionToken,
        "x-devin-auth1-token": auth1Token,
        "User-Agent": DEVIN_BROWSER_UA,
      },
      body: protoBody(1, sessionToken),
    });
    if (!response.ok) return null;
    const bytes = await readBytes(response);
    const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    const match = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    return match ? match[0] : null;
  } catch {
    return null;
  }
}

// ========== Public API ==========

function assertAuth1(auth1Token: string): void {
  const trimmed = (auth1Token ?? "").trim();
  if (!trimmed.startsWith("auth1_")) {
    throw new DevinAuthError(
      "That is not a Devin Auth credential: it must start with auth1_.",
      "invalid_auth1",
      400
    );
  }
}

export const devinAuth = {
  async loginWithPassword(email: string, password: string): Promise<DevinLoginResult> {
    const trimmedEmail = (email ?? "").trim();
    if (!trimmedEmail) {
      throw new DevinAuthError("Email is required.", "missing_email", 400);
    }
    if (!password) {
      throw new DevinAuthError("Password is required.", "missing_password", 400);
    }

    const login = await passwordLogin(trimmedEmail, password);
    const session = await postAuth(login.auth1Token);
    const ott = await oneTimeAuthToken(
      session.sessionToken,
      login.auth1Token,
      session.accountId,
      session.orgId
    );
    const ideToken = await registerUser(ott);

    const emailFromUser = await currentUserEmail(session.sessionToken, login.auth1Token);

    return {
      ideToken,
      auth1Token: login.auth1Token,
      sessionToken: session.sessionToken,
      accountId: session.accountId,
      orgId: session.orgId,
      email: login.email ?? emailFromUser ?? trimmedEmail,
      userId: login.userId,
    };
  },

  async refreshFromAuth1(auth1Token: string): Promise<DevinRefreshResult> {
    assertAuth1(auth1Token);
    const trimmed = auth1Token.trim();

    const session = await postAuth(trimmed);
    const ott = await oneTimeAuthToken(
      session.sessionToken,
      trimmed,
      session.accountId,
      session.orgId
    );
    const ideToken = await registerUser(ott);

    return {
      ideToken,
      sessionToken: session.sessionToken,
      accountId: session.accountId,
      orgId: session.orgId,
    };
  },

  /** Log-safe label for a credential. Never returns the full value. */
  describeToken(token: string): string {
    return truncateToken(token ?? "");
  },
};
