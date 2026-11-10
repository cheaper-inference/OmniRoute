import { NextResponse } from "next/server";
import { z } from "zod";
import { m365AuthAttempts } from "@/lib/oauth/m365AuthAttempts";
import { M365_NATIVE_REDIRECT_URI } from "@/lib/oauth/providers/copilot-m365-web";
import { persistOAuthConnection } from "@/lib/oauth/connectionPersistence";
import { getProviderConnections } from "@/lib/db/providers";
import { resolveProxyForProvider } from "@/models";
import { runWithProxyContextOrDirect } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const provider = "copilot-m365-web";
const id = z.string().min(1).max(256).optional();
const inputSchema = z.object({
  code: z.string().min(1).max(16384),
  redirectUri: z.literal(M365_NATIVE_REDIRECT_URI),
  codeVerifier: z.string().min(43).max(128),
  state: z.string().min(1).max(256),
  connectionId: id,
});
function invalid(message: string) {
  return NextResponse.json(buildErrorBody(400, message), { status: 400 });
}
/** Called only after the existing route's management-auth guard. Never launches a browser. */
export async function authorizeM365(search: URLSearchParams): Promise<Response> {
  const parsed = id.safeParse(search.get("connectionId") ?? undefined);
  if (!parsed.success) return invalid("Invalid Microsoft 365 connection ID");
  if (parsed.data) {
    const connections = await getProviderConnections({ provider });
    if (!connections.some((row) => row.id === parsed.data))
      return invalid("Microsoft 365 connection not found");
  }
  try {
    return NextResponse.json(
      {
        ...m365AuthAttempts.issue({ connectionId: parsed.data }),
        flowType: "authorization_code_pkce",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return invalid("Unable to start Microsoft 365 sign-in; retry after existing attempts expire");
  }
}
/** One-use server-issued PKCE attempt, then account-safe native encrypted persistence. */
export async function exchangeM365(raw: unknown): Promise<Response> {
  const parsed = inputSchema.safeParse(raw);
  if (!parsed.success) return invalid("Invalid Microsoft 365 sign-in request");
  const input = parsed.data;
  try {
    const proxy = await resolveProxyForProvider(provider);
    const completed = await runWithProxyContextOrDirect(proxy, () =>
      m365AuthAttempts.complete({
        redirectedUrl: input.code,
        state: input.state,
        codeVerifier: input.codeVerifier,
        connectionId: input.connectionId,
      })
    );
    const connection = await persistOAuthConnection(
      provider,
      completed.tokens,
      completed.connectionId
    );
    return NextResponse.json(
      {
        success: true,
        connection: {
          id: connection.id,
          provider: connection.provider,
          email: connection.email,
          displayName: connection.displayName,
        },
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    // Never expose callback URLs, upstream bodies or credential values in an OAuth error.
    return invalid(
      "Microsoft 365 sign-in failed or expired; restart sign-in with the same account"
    );
  }
}
