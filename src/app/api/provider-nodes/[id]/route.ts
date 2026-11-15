import { NextResponse } from "next/server";
import {
  deleteModelAliasesForProvider,
  deleteProviderConnectionsByProvider,
  deleteProviderNode,
  getProviderConnections,
  getProviderNodeById,
  updateProviderConnection,
  updateProviderNode,
} from "@/models";
import { isClaudeCodeCompatibleProvider } from "@/shared/constants/providers";
import {
  applyCompatibleQuotaCheck,
  compatibleQuotaAuthFor,
  isCompatibleQuotaProvider,
} from "@/shared/utils/compatibleQuotaCheck";
import { updateProviderNodeSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { validateProviderNodeBaseUrl } from "../urlGuard";
import { resolveCustomJsonNodeConfig } from "../customJsonNode";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function sanitizeAnthropicBaseUrl(baseUrl: string) {
  return (baseUrl || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/messages(?:\?[^#]*)?$/i, "");
}

function sanitizeClaudeCodeCompatibleBaseUrl(baseUrl: string) {
  return (baseUrl || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/(?:v\d+\/)?messages(?:\?[^#]*)?$/i, "");
}

function sanitizeNodeBaseUrl(nodeType: unknown, id: string, baseUrl: string): string {
  if (nodeType !== "anthropic-compatible") return baseUrl;
  return isClaudeCodeCompatibleProvider(id)
    ? sanitizeClaudeCodeCompatibleBaseUrl(baseUrl)
    : sanitizeAnthropicBaseUrl(baseUrl);
}

async function reregisterMoonshotFetcher(
  updated: JsonRecord | null | undefined,
  id: string,
  prefix: string,
  baseUrl: string
) {
  try {
    const { registerMoonshotFetchersForNodes } =
      await import("@omniroute/open-sse/services/moonshotQuotaFetcher.ts");
    registerMoonshotFetchersForNodes([
      { id: typeof updated?.id === "string" ? updated.id : id, prefix, baseUrl },
    ]);
  } catch (error) {
    console.warn("Moonshot fetcher re-register after node update skipped:", error);
  }
}

/** Every existing connection follows the node's settings, custom JSON config included. */
async function syncNodeConnections(
  id: string,
  updated: JsonRecord,
  node: {
    prefix: string;
    baseUrl: string;
    apiType?: string;
    customJsonConfig: unknown;
    quotaCheck?: Parameters<typeof applyCompatibleQuotaCheck>[1]["setting"];
  }
) {
  const connections = await getProviderConnections({ provider: id });
  await Promise.all(
    connections.flatMap((connectionRaw) => {
      const connection = asRecord(connectionRaw);
      const connectionId = typeof connection.id === "string" ? connection.id : "";
      if (!connectionId) return [];

      const providerSpecificData = {
        ...asRecord(connection.providerSpecificData),
        prefix: node.prefix,
        baseUrl: node.baseUrl,
        nodeName: updated.name,
        chatPath: updated.chatPath || undefined,
        customHeaders: updated.customHeaders || undefined,
      } as JsonRecord;
      if (updated.modelsPath) {
        providerSpecificData.modelsPath = updated.modelsPath;
      } else {
        delete providerSpecificData.modelsPath;
      }
      if (node.apiType !== undefined) {
        providerSpecificData.apiType = node.apiType;
        if (node.customJsonConfig) providerSpecificData.customJson = node.customJsonConfig;
        else delete providerSpecificData.customJson;
      }

      return [
        updateProviderConnection(connectionId, {
          providerSpecificData: isCompatibleQuotaProvider(id)
            ? applyCompatibleQuotaCheck(providerSpecificData, {
                setting: node.quotaCheck,
                baseUrl: node.baseUrl,
                auth: compatibleQuotaAuthFor(id),
              })
            : providerSpecificData,
        }),
      ];
    })
  );
}

// PUT /api/provider-nodes/[id] - Update provider node
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const { id } = await params;
    const validation = validateBody(updateProviderNodeSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const {
      name,
      prefix,
      apiType,
      baseUrl,
      chatPath,
      modelsPath,
      customHeaders,
      customJson,
      iconUrl,
      dailyQuotaResetTimezone,
      dailyQuotaResetHour,
      quotaCheck,
    } = validation.data;
    const node: any = await getProviderNodeById(id);

    if (!node) {
      return NextResponse.json({ error: "Provider node not found" }, { status: 404 });
    }

    // Only validate apiType for OpenAI Compatible nodes
    const validApiTypes = [
      "chat",
      "responses",
      "embeddings",
      "audio-transcriptions",
      "audio-speech",
      "images-generations",
      "custom-json",
    ];
    if (node.type === "openai-compatible" && (!apiType || !validApiTypes.includes(apiType))) {
      return NextResponse.json({ error: "Invalid OpenAI compatible API type" }, { status: 400 });
    }

    const sanitizedBaseUrl = sanitizeNodeBaseUrl(node.type, id, baseUrl.trim());
    const baseUrlError = validateProviderNodeBaseUrl(sanitizedBaseUrl);
    if (baseUrlError) return baseUrlError;
    const customJsonNode = resolveCustomJsonNodeConfig(
      node.type === "openai-compatible" ? apiType : null,
      customJson,
      sanitizedBaseUrl,
      node.customJsonConfig
    );
    if (customJsonNode.error) return customJsonNode.error;

    const updates: Record<string, unknown> = {
      name: name.trim(),
      prefix: prefix.trim(),
      baseUrl: sanitizedBaseUrl,
      chatPath: chatPath || null,
      modelsPath: isClaudeCodeCompatibleProvider(id) ? null : modelsPath || null,
      // #2166: explicit null (not omission) so an empty submission clears a
      // previously stored custom icon.
      iconUrl: iconUrl?.trim() || null,
      customHeaders: customHeaders || null,
      dailyQuotaResetTimezone: dailyQuotaResetTimezone?.trim() || null,
      dailyQuotaResetHour:
        dailyQuotaResetHour === 0 || dailyQuotaResetHour != null ? dailyQuotaResetHour : null,
    };

    if (node.type === "openai-compatible") {
      updates.apiType = apiType;
      updates.customJsonConfig = customJsonNode.config;
    }

    const updated = await updateProviderNode(id, updates);

    await reregisterMoonshotFetcher(updated, id, prefix.trim(), sanitizedBaseUrl);

    await syncNodeConnections(id, updated, {
      prefix: prefix.trim(),
      baseUrl: sanitizedBaseUrl,
      apiType: node.type === "openai-compatible" ? apiType : undefined,
      customJsonConfig: customJsonNode.config,
      quotaCheck,
    });

    return NextResponse.json({ node: updated });
  } catch (error) {
    console.log("Error updating provider node:", error);
    return NextResponse.json({ error: "Failed to update provider node" }, { status: 500 });
  }
}

// DELETE /api/provider-nodes/[id] - Delete provider node and its connections
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const node = await getProviderNodeById(id);

    if (!node) {
      return NextResponse.json({ error: "Provider node not found" }, { status: 404 });
    }

    await deleteProviderConnectionsByProvider(id);
    await deleteProviderNode(id);
    // #1409: drop orphaned model-alias rows (key=<alias>, value="<providerId>/<model>")
    // so re-importing the same provider isn't blocked by stale "already exists" aliases.
    await deleteModelAliasesForProvider(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error deleting provider node:", error);
    return NextResponse.json({ error: "Failed to delete provider node" }, { status: 500 });
  }
}
