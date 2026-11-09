import { handleAdobeFireflyImageGeneration } from "@omniroute/open-sse/handlers/imageGeneration.ts";
import { getImageProvider, parseImageModel } from "@omniroute/open-sse/config/imageRegistry.ts";
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import {
  getProviderCredentialsWithQuotaPreflight,
  clearRecoveredProviderState,
} from "@/sse/services/auth";
import {
  runImageRequestWithAccounting,
  type ImageRequestAccounting,
} from "@/lib/usage/imageRequestAccounting";
import * as log from "@/sse/utils/logger";
import { toJsonErrorPayload } from "@/shared/utils/upstreamError";

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Reduce reference images (multi + single fallback) to data-URL strings for Firefly. */
export function buildAdobeFireflyEditDataUrls(
  images: Array<{ bytes: Buffer; mime: string }>,
  imageBytes: Buffer | null,
  imageMime: string | null
): string[] {
  const dataUrls: string[] = [];
  const refList = Array.isArray(images) ? images : [];
  for (const ref of refList) {
    if (!ref || typeof ref !== "object") continue;
    const bytes = (ref as { bytes?: Buffer }).bytes;
    const mime =
      typeof (ref as { mime?: string }).mime === "string" &&
      String((ref as { mime?: string }).mime).startsWith("image/")
        ? String((ref as { mime?: string }).mime)
        : "image/png";
    if (Buffer.isBuffer(bytes) && bytes.length > 0) {
      dataUrls.push(`data:${mime};base64,${bytes.toString("base64")}`);
    }
  }
  if (dataUrls.length === 0 && imageBytes && imageBytes.length > 0) {
    const mime =
      typeof imageMime === "string" && imageMime.startsWith("image/") ? imageMime : "image/png";
    dataUrls.push(`data:${mime};base64,${imageBytes.toString("base64")}`);
  }
  return dataUrls;
}

/** Adobe Firefly edit = storage upload + generate-async referenceBlobs. */
export async function handleAdobeFireflyEditRequest(params: {
  parsed: ReturnType<typeof parseImageModel>;
  providerConfig: NonNullable<ReturnType<typeof getImageProvider>>;
  allowedConnections: string[] | null;
  resolvedModel: string;
  prompt: string;
  size: string | null;
  responseFormat: string | null;
  images: Array<{ bytes: Buffer; mime: string }>;
  imageBytes: Buffer | null;
  imageMime: string | null;
  accounting: Pick<ImageRequestAccounting, "apiKeyInfo" | "startTime">;
}): Promise<Response> {
  const {
    parsed,
    providerConfig,
    allowedConnections,
    resolvedModel,
    prompt,
    size,
    responseFormat,
    images,
    imageBytes,
    imageMime,
    accounting,
  } = params;

  const credentials = await getProviderCredentialsWithQuotaPreflight(
    parsed.provider,
    null,
    allowedConnections,
    resolvedModel
  );
  if (!credentials) {
    return errorResponse(
      HTTP_STATUS.UNAUTHORIZED,
      `No credentials for provider: ${parsed.provider}`
    );
  }
  if ("allRateLimited" in credentials && credentials.allRateLimited) {
    return unavailableResponse(
      HTTP_STATUS.RATE_LIMITED,
      `[${parsed.provider}] All accounts rate limited`,
      credentials.retryAfter,
      credentials.retryAfterHuman
    );
  }

  // Prefer multi-image list when present; fall back to the primary imageBytes.
  const dataUrls = buildAdobeFireflyEditDataUrls(images, imageBytes, imageMime);
  if (dataUrls.length === 0) {
    return errorResponse(HTTP_STATUS.BAD_REQUEST, "Missing required field: image");
  }

  const result = await runImageRequestWithAccounting(
    {
      ...accounting,
      endpoint: "/v1/images/edits",
      provider: parsed.provider,
      model: parsed.model,
      credentials,
    },
    () =>
      handleAdobeFireflyImageGeneration({
        provider: parsed.provider,
        model: parsed.model,
        providerConfig,
        body: {
          prompt,
          size: size ?? undefined,
          response_format: responseFormat ?? undefined,
          n: 1,
          image_url: dataUrls[0],
          image: dataUrls.length === 1 ? dataUrls[0] : dataUrls,
          image_urls: dataUrls,
          images: dataUrls,
        },
        // The all-expired sentinel has no auth fields. Preserve every selected
        // field while making its already-absent apiKey explicit for the handler.
        credentials: {
          ...credentials,
          apiKey:
            "apiKey" in credentials && typeof credentials.apiKey === "string"
              ? credentials.apiKey
              : undefined,
        },
        log,
      })
  );

  if ((result as { success?: boolean }).success) {
    await clearRecoveredProviderState(credentials);
    return jsonResponse((result as { data?: unknown }).data);
  }
  return jsonResponse(
    toJsonErrorPayload((result as { error?: unknown }).error, "Image edit provider error"),
    (result as { status?: number }).status ?? HTTP_STATUS.BAD_GATEWAY
  );
}
