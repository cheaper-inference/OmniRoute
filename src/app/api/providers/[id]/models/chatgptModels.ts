import { NextResponse } from "next/server";
import { getModelIsHidden } from "@/lib/db/models";
import { discoverChatGptModels } from "@/lib/providerModels/chatgptDiscovery";
import { errorResponse } from "@omniroute/open-sse/utils/error";

/** Live ChatGPT (SIWC) account catalog: only `visibility: "list"` entries, no static fallback. */
export async function buildChatGptModelsResponse(
  connection: Record<string, unknown>,
  excludeHidden: boolean
): Promise<Response> {
  try {
    const models = await discoverChatGptModels(connection);
    return NextResponse.json({
      models: excludeHidden ? models.filter((m) => !getModelIsHidden("chatgpt", m.id)) : models,
      source: "api",
    });
  } catch {
    return errorResponse(
      503,
      "ChatGPT live catalog unavailable. Check plan authorization and reconnect if necessary."
    );
  }
}
