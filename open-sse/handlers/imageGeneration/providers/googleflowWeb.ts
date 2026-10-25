/**
 * Image generation handler for Google Flow Web (Nano Banana & Imagen via Playwright browser session).
 */

import { generateFlowImage, normalizeImageAspectRatio } from "../../../executors/googleflow-web/flowClient.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

export interface GoogleFlowWebImageHandlerArgs {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials: Record<string, unknown> | null;
  log?: { info?: (tag: string, msg: string) => void; error?: (tag: string, msg: string) => void };
}

export async function handleGoogleFlowWebImageGeneration({
  model,
  body,
  credentials,
  log,
}: GoogleFlowWebImageHandlerArgs): Promise<{ success: boolean; status?: number; data?: unknown; error?: string }> {
  try {
    const prompt = String(body.prompt ?? "");
    if (!prompt.trim()) {
      return { success: false, status: 400, error: "Prompt is required for image generation" };
    }

    const rawAspect = typeof body.aspect_ratio === "string"
      ? body.aspect_ratio
      : typeof body.aspectRatio === "string"
        ? body.aspectRatio
        : typeof body.size === "string"
          ? body.size
          : undefined;

    const aspectRatio = normalizeImageAspectRatio(rawAspect);

    const creds = {
      apiKey: typeof credentials?.apiKey === "string" ? credentials.apiKey : undefined,
      accessToken: typeof credentials?.accessToken === "string" ? credentials.accessToken : undefined,
    };

    log?.info?.("IMAGE", `Google Flow image generation starting: model=${model}, aspect=${aspectRatio}`);

    const result = await generateFlowImage({
      prompt,
      model,
      aspectRatio,
      credentials: creds,
    });

    const item: Record<string, unknown> = {
      url: result.url,
    };
    if (result.b64_json) {
      item.b64_json = result.b64_json;
    }

    return {
      success: true,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [item],
      },
    };
  } catch (err: any) {
    const message = sanitizeErrorMessage(err?.message || "Google Flow image generation failed");
    log?.error?.("IMAGE", `Google Flow image generation error: ${message}`);

    const status = message.includes("session is expired") || message.includes("re-authentication")
      ? 401
      : 502;

    return {
      success: false,
      status,
      error: message,
    };
  }
}
