import { ensureCloudSyncInitialized } from "@/lib/initCloudSync";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

// Starts the background sync services if boot has not already done so
// (instrumentation-node.ts calls ensureCloudSyncInitialized directly). It
// registers and starts jobs, so it is a management route, not a public one.
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const initialized = await ensureCloudSyncInitialized();
  return Response.json({ initialized });
}
