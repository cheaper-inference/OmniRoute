/**
 * Image generation handler for Google Flow Web (Nano Banana & Imagen via Playwright browser session).
 */

import {
  generateFlowImage,
  normalizeImageAspectRatio,
} from "../../../executors/googleflow-web/flowClient.ts";
import {
  flowErrorStatus,
  readFlowAspectRatio,
  toFlowCredentials,
} from "../../../executors/googleflow-web/flowPage.ts";
import { sanitizeErrorMessage } from "../../../utils/error.ts";

export interface GoogleFlowWebImageHandlerArgs {
  model: string;
  provider: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials: Record<string, unknown> | null;
  /** Persists a session cookie Google rotated during the run (provider-connection DB module). */
  onSessionCookieRotated?: (cookie: string) => Promise<void>;
  log?: { info?: (tag: string, msg: string) => void; error?: (tag: string, msg: string) => void };
}

export async function handleGoogleFlowWebImageGeneration({
  model,
  body,
  credentials,
  onSessionCookieRotated,
  log,
}: GoogleFlowWebImageHandlerArgs): Promise<{
  success: boolean;
  status?: number;
  data?: unknown;
  error?: string;
}> {
  try {
    const prompt = String(body.prompt ?? "");
    if (!prompt.trim()) {
      return { success: false, status: 400, error: "Prompt is required for image generation" };
    }

    const aspectRatio = normalizeImageAspectRatio(readFlowAspectRatio(body));

    log?.info?.(
      "IMAGE",
      `Google Flow image generation starting: model=${model}, aspect=${aspectRatio}`
    );

    const result = await generateFlowImage({
      prompt,
      model,
      aspectRatio,
      credentials: toFlowCredentials(credentials),
      onSessionCookieRotated,
    });

    const item: Record<string, unknown> = { url: result.url };
    if (result.b64_json) item.b64_json = result.b64_json;

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: [item] },
    };
  } catch (err) {
    const raw = err instanceof Error ? err.message : "";
    const message = sanitizeErrorMessage(raw || "Google Flow image generation failed");
    log?.error?.("IMAGE", `Google Flow image generation error: ${message}`);
    return { success: false, status: flowErrorStatus(message), error: message };
  }
}
