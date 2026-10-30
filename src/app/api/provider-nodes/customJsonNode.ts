import { NextResponse } from "next/server";
import { CUSTOM_JSON_API_TYPE } from "@omniroute/open-sse/config/customJson.ts";
import {
  CustomJsonError,
  normalizeCustomJsonConfig,
  type CustomJsonConfig,
} from "@omniroute/open-sse/utils/customJson.ts";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

type CustomJsonNodeResult =
  | { config: CustomJsonConfig | null; error?: undefined }
  | {
      config?: undefined;
      error: NextResponse;
    };

/**
 * Resolve the stored config for a provider node write. Non custom-json nodes store
 * nothing (switching a node back to chat/responses drops the template). A custom-json
 * node needs its complete endpoint URL (no OpenAI default) and a valid config; an
 * omitted config keeps `existing` (edits that only rename the node) or the defaults.
 */
export function resolveCustomJsonNodeConfig(
  apiType: unknown,
  customJson: unknown,
  endpoint: string | undefined,
  existing: unknown = undefined
): CustomJsonNodeResult {
  if (apiType !== CUSTOM_JSON_API_TYPE) return { config: null };
  try {
    return { config: normalizeCustomJsonConfig(customJson ?? existing ?? {}, endpoint) };
  } catch (error) {
    const message =
      error instanceof CustomJsonError ? error.message : "Invalid custom JSON configuration";
    return { error: NextResponse.json(buildErrorBody(400, message), { status: 400 }) };
  }
}

/**
 * Explicit "Send test request" for a custom JSON node: exactly ONE real request with
 * `ping` as the latest user text, through the same executor (template, auth, custom
 * headers, outbound guard, no retry) that serves chat traffic. Upstream bodies are never
 * echoed back — only the status.
 */
export async function probeCustomJsonEndpoint(input: {
  baseUrl: string;
  apiKey?: string;
  config: CustomJsonConfig;
  customHeaders?: Record<string, string> | null;
  modelId?: string;
}) {
  const { executeCustomJson } = await import("@omniroute/open-sse/executors/customJson.ts");
  const model = input.modelId || "custom";
  const result = await executeCustomJson({
    model,
    stream: false,
    body: { model, messages: [{ role: "user", content: "ping" }], stream: false },
    credentials: {
      apiKey: input.apiKey ?? "",
      providerSpecificData: {
        apiType: CUSTOM_JSON_API_TYPE,
        baseUrl: input.baseUrl,
        customJson: input.config,
        ...(input.customHeaders ? { customHeaders: input.customHeaders } : {}),
      },
    },
  });
  const response = "response" in result ? result.response : result;
  await response.body?.cancel().catch(() => {});
  if (response.ok) return { valid: true, error: null, method: CUSTOM_JSON_API_TYPE };
  return {
    valid: false,
    error: `Custom JSON request failed (${response.status})`,
    method: CUSTOM_JSON_API_TYPE,
  };
}
