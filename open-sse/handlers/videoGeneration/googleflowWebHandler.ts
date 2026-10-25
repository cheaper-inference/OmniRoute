/**
 * Video generation handler for Google Flow Web (Veo via Playwright browser session).
 */

import { generateFlowVideo, normalizeVideoAspectRatio } from "../../executors/googleflow-web/flowClient.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

export interface GoogleFlowWebVideoHandlerArgs {
  model: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials: Record<string, unknown> | null;
  log?: { info?: (tag: string, msg: string) => void; error?: (tag: string, msg: string) => void };
}

export async function handleGoogleFlowWebVideoGeneration({
  model,
  body,
  credentials,
  log,
}: GoogleFlowWebVideoHandlerArgs): Promise<{ success: boolean; status?: number; data?: unknown; error?: string }> {
  try {
    const prompt = String(body.prompt ?? "");
    if (!prompt.trim()) {
      return { success: false, status: 400, error: "Prompt is required for video generation" };
    }

    const rawAspect = typeof body.aspect_ratio === "string"
      ? body.aspect_ratio
      : typeof body.aspectRatio === "string"
        ? body.aspectRatio
        : typeof body.size === "string"
          ? body.size
          : undefined;

    const aspectRatio = normalizeVideoAspectRatio(rawAspect);

    const creds = {
      apiKey: typeof credentials?.apiKey === "string" ? credentials.apiKey : undefined,
      accessToken: typeof credentials?.accessToken === "string" ? credentials.accessToken : undefined,
    };

    log?.info?.("VIDEO", `Google Flow video generation starting: model=${model}, aspect=${aspectRatio}`);

    const result = await generateFlowVideo({
      prompt,
      model,
      aspectRatio,
      credentials: creds,
    });

    return {
      success: true,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [
          {
            url: result.url,
            format: result.format || "mp4",
          },
        ],
      },
    };
  } catch (err: any) {
    const message = sanitizeErrorMessage(err?.message || "Google Flow video generation failed");
    log?.error?.("VIDEO", `Google Flow video generation error: ${message}`);

    const status = message.includes("quota exhausted") || message.includes("credits remaining")
      ? 429
      : message.includes("session is expired") || message.includes("re-authentication")
        ? 401
        : 502;

    return {
      success: false,
      status,
      error: message,
    };
  }
}
