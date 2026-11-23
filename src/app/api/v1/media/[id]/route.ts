import { z } from "zod";
import { NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import {
  canAccessOwnedRecord,
  getApiKeyRequestScope,
  resolveEffectiveApiKeyId,
} from "@/app/api/v1/_helpers/apiKeyScope";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import {
  MEDIA_ID_PATTERN,
  NO_OWNER_TAG,
  mediaMimeType,
  mediaOwnerTag,
  mediaOwnerTagFor,
  readMediaFile,
} from "@/lib/media/mediaStore";

const MediaIdSchema = z.string().regex(MEDIA_ID_PATTERN);

export async function OPTIONS() {
  return handleCorsOptions();
}

function notFound(): Response {
  return NextResponse.json(buildErrorBody(404, "Media not found"), {
    status: 404,
    headers: CORS_HEADERS,
  });
}

/**
 * The owner of a stored media id, in the shape `canAccessOwnedRecord()` compares: the caller's
 * own id when the digest in the media id matches it, null for unowned media, and an opaque
 * value that can never equal a real key id otherwise.
 */
function mediaRecordOwner(ownerTag: string, callerOwnerId: string | null): string | null {
  if (ownerTag === NO_OWNER_TAG) return null;
  if (callerOwnerId && mediaOwnerTagFor(callerOwnerId) === ownerTag) return callerOwnerId;
  return `media-owner:${ownerTag}`;
}

/**
 * Serve generated media stored by the video job pipeline (#16372) — provider results that are
 * auth-gated upstream (OpenRouter's `/videos/{id}/content`) are handed back as a URL here.
 *
 * Ownership follows the files API exactly (`canAccessOwnedRecord`): the key that generated the
 * media (or a manage-scope key / the dashboard session) can read it; anonymous media under
 * REQUIRE_API_KEY=false is shared by anonymous callers only; unowned (session) media needs the
 * session. A mismatch answers 404 so the route never confirms that an unowned id exists. The id
 * is validated against the exact pattern the store generates, so it cannot escape the media dir.
 */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const scope = await getApiKeyRequestScope(request);
  if (scope.rejection) return scope.rejection;
  if (scope.apiKey && !scope.apiKeyId) {
    return NextResponse.json(buildErrorBody(401, "Invalid API key"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  const policy = await enforceApiKeyPolicy(request, null);
  if (policy.rejection) return policy.rejection;

  const parsed = MediaIdSchema.safeParse((await params).id);
  if (!parsed.success) return notFound();
  const id = parsed.data;

  const ownerTag = mediaOwnerTag(id);
  const callerOwnerId = resolveEffectiveApiKeyId(scope, policy.apiKeyInfo);
  if (
    !ownerTag ||
    !canAccessOwnedRecord(
      { ...scope, apiKeyId: callerOwnerId },
      mediaRecordOwner(ownerTag, callerOwnerId)
    )
  ) {
    return notFound();
  }

  const content = readMediaFile(id);
  if (!content) return notFound();

  return new Response(new Uint8Array(content), {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": mediaMimeType(id),
      "Content-Length": String(content.length),
      // inline, not attachment: these URLs back a `url` field in a generation
      // response, so a client may render them directly rather than download.
      "Content-Disposition": `inline; filename="${id}"`,
    },
  });
}
