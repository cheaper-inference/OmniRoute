import { getCachedSettings } from "@/lib/db/settings";
import { DEFAULT_HEADROOM_URL, getHeadroomStatus } from "@/lib/headroom/detect";
import { getManagedPid } from "@/lib/headroom/process";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { getRequestPeerLocality } from "@/shared/utils/apiAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    const settings = await getCachedSettings();
    const url =
      typeof settings.headroomUrl === "string" && settings.headroomUrl
        ? settings.headroomUrl
        : DEFAULT_HEADROOM_URL;
    // The binary probes spawn on the host (`which`, `python --version`), but this route
    // stays remote-reachable for the dashboard: only loopback/LAN callers run them
    // (GHSA-35fw-cv32-2373 class, GHSA-jmq6-8j86-8xqj call-site gate).
    const status = await getHeadroomStatus(url, {
      allowLocalProbe: getRequestPeerLocality(request) !== "remote",
    });
    const managedPid = getManagedPid();
    return Response.json({ ...status, url, managedPid });
  } catch (error) {
    return createErrorResponse({
      status: 500,
      message: sanitizeErrorMessage(error),
      type: "server_error",
    });
  }
}
