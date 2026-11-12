/**
 * Read the mailbox behind a Grok Bot grant.
 *
 * The Bot JWT carries no email claim, so the login flow cannot tell two
 * accounts apart from the token alone. DashboardService/GetMe returns the
 * mailbox. A failure here must not abort the login: the caller stores the
 * connection without an email and the next login for that mailbox creates a
 * second row instead of refreshing the first.
 */

const GROK_BOT_GET_ME_URL = "https://api2.cursor.sh/aiserver.v1.DashboardService/GetMe";

type GetMeResponse = { email?: unknown };

export async function fetchGrokBotAccountEmail(
  accessToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<string | null> {
  try {
    const response = await fetchImpl(GROK_BOT_GET_ME_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
        "x-cursor-client-type": "sand",
        "x-sand-box-namespace": "prod",
        "user-agent": "connect-es/1.6.1",
      },
      body: "{}",
      redirect: "error",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as GetMeResponse;
    return typeof data.email === "string" && data.email.trim() ? data.email.toLowerCase() : null;
  } catch {
    return null;
  }
}
