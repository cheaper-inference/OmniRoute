/** Native ZCode exchanges the Z.ai OAuth grant before using subscription services. */
export async function exchangeZaiBusinessToken(token: string): Promise<string> {
  try {
    const response = await fetch("https://api.z.ai/api/auth/z/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
      redirect: "error",
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error();
    const value = (await response.json()) as {
      code?: unknown;
      success?: boolean;
      data?: { access_token?: unknown; accessToken?: unknown };
    };
    if (
      !value ||
      value.success === false ||
      (value.code != null && ![0, 200, "0", "200"].includes(value.code as string | number))
    )
      throw new Error();
    const access = value.data?.access_token ?? value.data?.accessToken;
    if (typeof access !== "string" || !access.trim()) throw new Error();
    return access.trim();
  } catch {
    // Provider errors can contain the submitted grant. Never propagate them.
    throw new Error("Z.ai subscription token exchange failed; retry login completion");
  }
}

/** Only identifies the legacy storage format, never verifies authentication or identity. */
export function isLegacyZaiOAuthToken(token: string): boolean {
  try {
    const claims = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
    return typeof claims?.sub === "string" && claims.token_version != null && !claims.api_key;
  } catch {
    return false;
  }
}
