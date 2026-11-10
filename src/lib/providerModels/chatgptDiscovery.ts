import { z } from "zod";
import { getAccessToken, runWithOnPersist } from "@omniroute/open-sse/services/tokenRefresh";
import { hasChatGptPlanScope } from "@omniroute/open-sse/config/chatgpt";
import { updateProviderConnection } from "@/lib/db/providers";
import { persistDiscoveredModels } from "./modelDiscovery";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch";
import { resolveProxyForConnection } from "@/lib/db/settings";

const catalogSchema = z.object({
  models: z.array(
    z
      .object({
        slug: z.string().min(1),
        display_name: z.string().optional(),
        visibility: z.string(),
      })
      .passthrough()
  ),
});

export class ChatGptDiscoveryError extends Error {
  constructor(
    message: string,
    public status: number,
    public requiresReauth = false
  ) {
    super(message);
    this.name = "ChatGptDiscoveryError";
  }
}

export function parseChatGptModels(payload: unknown) {
  return catalogSchema
    .parse(payload)
    .models.filter((m) => m.visibility === "list")
    .map((m) => ({
      ...m,
      id: m.slug,
      name: m.display_name || m.slug,
      owned_by: "chatgpt",
      apiFormat: "responses",
      // Endpoint capabilities use OmniRoute's modality vocabulary, not the upstream wire format.
      supportedEndpoints: ["chat"],
    }));
}

export async function discoverChatGptModels(connection: Record<string, unknown>) {
  let credentials: Record<string, unknown> = { ...connection, connectionId: connection.id };
  const proxy = await resolveProxyForConnection(String(connection.id));
  const expiry = typeof connection.expiresAt === "string" ? Date.parse(connection.expiresAt) : 0;
  if (!expiry || expiry < Date.now() + 60_000) {
    const refreshed = await runWithOnPersist(
      async (update) => {
        await updateProviderConnection(String(connection.id), {
          ...update,
          // The connection row prefers tokenExpiresAt. Keep it in sync on Retest too.
          ...(update.expiresAt ? { tokenExpiresAt: update.expiresAt } : {}),
        });
      },
      () => getAccessToken("chatgpt", credentials, null, proxy.proxy)
    );
    if (!refreshed || "error" in refreshed) {
      if (refreshed?.error === "unrecoverable_refresh_error") {
        throw new ChatGptDiscoveryError(
          "ChatGPT credentials were rejected. Please sign in again.",
          401,
          true
        );
      }
      throw new ChatGptDiscoveryError(
        "ChatGPT token refresh is temporarily unavailable. Try again later.",
        503
      );
    }
    credentials = { ...credentials, ...refreshed };
  }
  const data = credentials.providerSpecificData as Record<string, unknown> | undefined;
  if (!hasChatGptPlanScope(data?.scopes))
    throw new ChatGptDiscoveryError(
      "ChatGPT plan usage is not authorized. Please sign in again.",
      403,
      true
    );
  const response = await runWithProxyContext(proxy.proxy, () =>
    fetch("https://api.openai.com/v1/models", {
      headers: { Authorization: `Bearer ${credentials.accessToken}`, Accept: "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(30_000),
    })
  );
  if (!response.ok) {
    const requiresReauth = response.status === 401 || response.status === 403;
    throw new ChatGptDiscoveryError(
      requiresReauth
        ? "ChatGPT authorization was rejected. Please sign in again."
        : `ChatGPT live catalog unavailable (HTTP ${response.status}).`,
      response.status,
      requiresReauth
    );
  }
  const models = parseChatGptModels(await response.json());
  await persistDiscoveredModels("chatgpt", String(connection.id), models);
  return models;
}
