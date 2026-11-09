/**
 * Audio Translation Handler
 *
 * Handles POST /v1/audio/translations (Whisper translate-to-English API
 * format). Proxies multipart/form-data to upstream providers that expose an
 * OpenAI-Whisper-compatible /audio/translations endpoint.
 *
 * Unlike /v1/audio/transcriptions, translation always outputs English text
 * regardless of the source audio language, so there is no `language` input
 * field — only `model`, `file`, `prompt`, `response_format`, and
 * `temperature` are forwarded upstream.
 */

import { audioErrorResponse } from "../utils/audioResponse.ts";
import {
  getTranslationProvider,
  parseTranslationModel,
  type AudioProvider,
} from "../config/audioRegistry.ts";
import { buildAuthHeaders } from "../config/registryUtils.ts";
import { buildMultipartBody } from "./audioTranscription.ts";
import { errorResponse } from "../utils/error.ts";
import { upstreamErrorResponse } from "../utils/audioResponse.ts";

type TranslationCredentials = {
  apiKey?: string;
  accessToken?: string;
};

/**
 * Handle audio translation request
 *
 * @param {Object} options
 * @param {FormData} options.formData - Multipart form data with file + model
 * @param {Object} options.credentials - Provider credentials { apiKey }
 * @returns {Response}
 */
export async function handleAudioTranslation({
  formData,
  credentials,
  resolvedProvider = null,
  resolvedModel = null,
}: {
  formData: FormData;
  credentials?: TranslationCredentials | null;
  resolvedProvider?: AudioProvider | null;
  resolvedModel?: string | null;
}): Promise<Response> {
  const model = formData.get("model");
  if (typeof model !== "string" || !model) {
    return errorResponse(400, "model is required");
  }

  const fileEntry = formData.get("file");
  if (!(fileEntry instanceof Blob)) {
    return errorResponse(400, "file is required");
  }
  const file = fileEntry as Blob & { name?: unknown };

  // Use pre-resolved provider/model from route handler if available.
  let providerConfig = resolvedProvider;
  let modelId = resolvedModel;
  if (!providerConfig) {
    const parsed = parseTranslationModel(model);
    providerConfig = parsed.provider ? getTranslationProvider(parsed.provider) : null;
    modelId = parsed.model;
  }

  if (!providerConfig) {
    return errorResponse(
      400,
      `No translation provider found for model "${model}". Available: openai, groq`
    );
  }

  const token =
    providerConfig.authType === "none" ? null : credentials?.apiKey || credentials?.accessToken;
  if (providerConfig.authType !== "none" && !token) {
    return errorResponse(401, `No credentials for translation provider: ${providerConfig.id}`);
  }

  // OpenAI Whisper translate-to-English params — no `language`, output is
  // always English regardless of the source audio language.
  const extraFields: Record<string, string> = {};
  for (const key of ["prompt", "response_format", "temperature"]) {
    const val = formData.get(key);
    if (val !== null && val !== undefined) {
      extraFields[key] = String(val);
    }
  }

  const { body: multipartBody, contentType: multipartCT } = await buildMultipartBody(file, {
    model: modelId as string,
    ...extraFields,
  });

  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { ...buildAuthHeaders(providerConfig, token), "Content-Type": multipartCT },
      body: multipartBody,
    });

    if (!res.ok) {
      const errText = await res.text();
      return upstreamErrorResponse(res, errText);
    }

    const data = await res.text();
    const respContentType = res.headers.get("content-type") || "application/json";

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": respContentType },
    });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return audioErrorResponse(500, `Translation request failed: ${error.message}`);
  }
}
