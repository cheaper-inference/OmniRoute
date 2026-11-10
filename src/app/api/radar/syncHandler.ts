import { NextResponse } from "next/server";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { CORS_HEADERS } from "@/shared/utils/cors";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { radarSyncBodyError, validateRadarSyncBody } from "./syncRequest";

export async function handleRadarFeedSync(
  request: Request,
  sync: () => Promise<unknown>,
  failureMessage: string
) {
  if (!isFeatureFlagEnabled("RADAR_ENABLED")) {
    return NextResponse.json(buildErrorBody(404, "Not found"), {
      status: 404,
      headers: CORS_HEADERS,
    });
  }
  if (!(await isAuthenticated(request))) {
    return NextResponse.json(buildErrorBody(401, "Unauthorized"), {
      status: 401,
      headers: CORS_HEADERS,
    });
  }

  const bodyError = radarSyncBodyError(await validateRadarSyncBody(request));
  if (bodyError) {
    return NextResponse.json(buildErrorBody(bodyError.status, bodyError.message), {
      status: bodyError.status,
      headers: CORS_HEADERS,
    });
  }

  try {
    return NextResponse.json(await sync(), { headers: CORS_HEADERS });
  } catch (error: unknown) {
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(error) || failureMessage), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}
