import { isCloudEnabled } from "@/lib/db/settings";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import * as log from "@/sse/utils/logger";

/** Best-effort background side effect, never part of the create/import HTTP contract. */
export async function syncKeysToCloudIfEnabled() {
  try {
    if (!(await isCloudEnabled())) return;
    await syncToCloud(await getConsistentMachineId());
  } catch (error) {
    log.error("keys", "Error syncing keys to cloud", error);
  }
}
