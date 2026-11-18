/**
 * RenderHour (renderhour.com) text-to-speech: the OpenAI `input` becomes a RenderHour job's
 * `text`; the finished file is streamed back. RenderHour picks the voice of each model, so
 * `voice` is not sent. Job API shared with images and video (./mediaGeneration/renderhour.ts).
 */

import { audioStreamResponse } from "../utils/audioResponse.ts";
import { errorResponse } from "../utils/error.ts";
import {
  renderhourBaseUrl,
  renderhourFailure,
  renderhourNumber,
  renderhourToken,
  runRenderhourJob,
} from "./mediaGeneration/renderhour.ts";

export async function handleRenderhourSpeech({
  providerConfig,
  body,
  modelId,
  credentials,
}: {
  providerConfig: { baseUrl: string };
  body: Record<string, unknown>;
  modelId: string;
  credentials: unknown;
}): Promise<Response> {
  const token = renderhourToken(credentials);
  if (!token) {
    return errorResponse(401, "RenderHour needs an API key or a signed-in RenderHour account");
  }
  const text = typeof body.input === "string" ? body.input.trim() : "";
  if (!text) return errorResponse(400, "input is required");

  try {
    const result = await runRenderhourJob({
      baseUrl: renderhourBaseUrl(credentials, providerConfig.baseUrl),
      token,
      request: { model: modelId, text },
      timeoutMs: renderhourNumber(body.timeout_ms, 180_000),
      pollIntervalMs: renderhourNumber(body.poll_interval_ms, 2000),
    });
    if (result.ok === false) return errorResponse(result.status, result.error);
    return audioStreamResponse(await fetch(result.job.outputs[0].url));
  } catch (err) {
    const failure = renderhourFailure(err);
    return errorResponse(failure.status, failure.error);
  }
}
