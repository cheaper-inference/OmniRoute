/**
 * Video generation handler for Google Flow Web (Veo via Playwright browser session).
 */

import {
  generateFlowVideo,
  normalizeVideoAspectRatio,
} from "../../executors/googleflow-web/flowClient.ts";
import {
  flowErrorStatus,
  readFlowAspectRatio,
  toFlowCredentials,
} from "../../executors/googleflow-web/flowPage.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

export interface GoogleFlowWebVideoHandlerArgs {
  model: string;
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  credentials: Record<string, unknown> | null;
  /** Persists a session cookie Google rotated during the run (provider-connection DB module). */
  onSessionCookieRotated?: (cookie: string) => Promise<void>;
  log?: { info?: (tag: string, msg: string) => void; error?: (tag: string, msg: string) => void };
}

export async function handleGoogleFlowWebVideoGeneration({
  model,
  body,
  credentials,
  onSessionCookieRotated,
  log,
}: GoogleFlowWebVideoHandlerArgs): Promise<{
  success: boolean;
  status?: number;
  data?: unknown;
  error?: string;
}> {
  try {
    const prompt = String(body.prompt ?? "");
    if (!prompt.trim()) {
      return { success: false, status: 400, error: "Prompt is required for video generation" };
    }

    const aspectRatio = normalizeVideoAspectRatio(readFlowAspectRatio(body));

    log?.info?.(
      "VIDEO",
      `Google Flow video generation starting: model=${model}, aspect=${aspectRatio}`
    );

    const result = await generateFlowVideo({
      prompt,
      model,
      aspectRatio,
      credentials: toFlowCredentials(credentials),
      onSessionCookieRotated,
    });

    return {
      success: true,
      data: {
        created: Math.floor(Date.now() / 1000),
        data: [{ url: result.url, format: result.format || "mp4" }],
      },
    };
  } catch (err) {
    const raw = err instanceof Error ? err.message : "";
    const message = sanitizeErrorMessage(raw || "Google Flow video generation failed");
    log?.error?.("VIDEO", `Google Flow video generation error: ${message}`);
    return { success: false, status: flowErrorStatus(message), error: message };
  }
}
