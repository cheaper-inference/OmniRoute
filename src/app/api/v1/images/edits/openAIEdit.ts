import {
  isAllRateLimitedCredentials,
  rateLimitedProviderResponse,
} from "@/app/api/v1/_shared/rateLimit";
import { resolveProxyForConnection } from "@/lib/db/settings";
import {
  runImageRequestWithAccounting,
  type ImageRequestAccounting,
} from "@/lib/usage/imageRequestAccounting";
import {
  clearRecoveredProviderState,
  getProviderCredentialsWithQuotaPreflight,
} from "@/sse/services/auth";
import {
  isKeyScopeBlockedCredentials,
  keyScopeBlockedResponse,
} from "@/sse/services/keyConnectionScope";
import * as log from "@/sse/utils/logger";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import type { ImageProviderConfig } from "@omniroute/open-sse/config/imageRegistry.ts";
import { handleOpenAIImageEdit } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import type { EditInput } from "./editInput.ts";

type OpenAIEditInput = Pick<
  EditInput,
  "options" | "prompt" | "size" | "responseFormat" | "images" | "imageInputCount"
>;

type OpenAIEditCredentials = NonNullable<
  Parameters<typeof handleOpenAIImageEdit>[0]["credentials"]
> & { connectionId?: string | null };

const MAX_OPENAI_EDIT_REFERENCES = 16;

export function isBuiltinOpenAIEditProvider(
  config: ImageProviderConfig | null
): config is ImageProviderConfig & { id: "openai"; format: "openai" } {
  return config?.id === "openai" && config.format === "openai";
}

export function isBuiltinOpenAIEditModel(model: string | null): boolean {
  return Boolean(model && (/^gpt-image-/i.test(model) || model === "dall-e-2"));
}

export function openAIEditReferenceError(count: number): string | null {
  return count > MAX_OPENAI_EDIT_REFERENCES
    ? `OpenAI image edit supports at most ${MAX_OPENAI_EDIT_REFERENCES} reference images`
    : null;
}

export async function dispatchBuiltinOpenAIEdit(
  model: string,
  baseUrl: string,
  credentials: unknown,
  input: OpenAIEditInput
) {
  const referenceError = openAIEditReferenceError(input.imageInputCount);
  if (referenceError) {
    return { success: false as const, status: HTTP_STATUS.BAD_REQUEST, error: referenceError };
  }

  const openAICredentials = credentials as OpenAIEditCredentials;
  const firstReference = input.images[0];
  const editImage = () =>
    handleOpenAIImageEdit({
      provider: "openai",
      model,
      baseUrl,
      credentials: openAICredentials,
      prompt: input.prompt,
      imageBytes: firstReference.bytes,
      imageMime: firstReference.mime,
      images: input.images,
      size: input.size,
      responseFormat: input.responseFormat,
      options: input.options ?? {},
      log,
    });

  const { connectionId } = openAICredentials;
  if (!connectionId) return editImage();

  let proxyInfo = null;
  try {
    proxyInfo = await resolveProxyForConnection(connectionId);
  } catch {
    log.debug("PROXY", "Failed to resolve proxy for image provider: openai");
  }
  return runWithProxyContext(proxyInfo?.proxy || null, editImage).catch(() => ({
    success: false as const,
    status: HTTP_STATUS.SERVICE_UNAVAILABLE,
    error: "Image edit proxy error",
  })) as ReturnType<typeof editImage>;
}

export async function runDirectBuiltinOpenAIEdit(
  model: string,
  baseUrl: string,
  input: OpenAIEditInput,
  allowedConnections: string[] | null,
  resolvedModel: string,
  accounting: ImageRequestAccounting
) {
  const referenceError = openAIEditReferenceError(input.imageInputCount);
  if (referenceError) return errorResponse(HTTP_STATUS.BAD_REQUEST, referenceError);

  const credentials = await getProviderCredentialsWithQuotaPreflight(
    "openai",
    null,
    allowedConnections,
    resolvedModel
  );
  if (!credentials) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "No credentials for provider: openai");
  }
  if (isKeyScopeBlockedCredentials(credentials)) {
    return keyScopeBlockedResponse("openai", credentials);
  }
  if (isAllRateLimitedCredentials(credentials)) {
    return rateLimitedProviderResponse("openai", credentials);
  }

  const result = await runImageRequestWithAccounting({ ...accounting, credentials }, () =>
    dispatchBuiltinOpenAIEdit(model, baseUrl, credentials, input)
  );
  if (result.success) await clearRecoveredProviderState(credentials);
  return result;
}
