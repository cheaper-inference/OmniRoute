/**
 * HTTP side of the managed update for `/api/system/version`. Kept out of the route file (which
 * may only export HTTP methods) so each answer can be tested in process.
 */
import { NextResponse } from "next/server";
import { clearLatestVersionCache } from "@/lib/system/versionCheck";
import {
  managedUpdateOperationIdSchema,
  maybeLaunchManagedUpdate,
  readManagedUpdateState,
  type ManagedUpdateHooks,
} from "@/lib/system/managedUpdate";

/** `null` means "not applicable": the route continues exactly as it did before this feature. */
export async function managedUpdateResponse(
  mode: string,
  current: string,
  latest: string,
  hooks?: ManagedUpdateHooks
) {
  const managed = await maybeLaunchManagedUpdate({ mode, latest }, hooks);
  if (managed.kind === "accepted") {
    clearLatestVersionCache();
    return NextResponse.json(
      {
        success: true,
        operationId: managed.operationId,
        status: "accepted",
        message: `Update to v${latest} started. The service stops briefly while it is swapped and checked.`,
        from: current,
        to: latest,
        channel: "npm-managed",
      },
      { status: 202 }
    );
  }
  if (managed.kind === "refused") {
    return NextResponse.json(
      { success: false, error: managed.message, code: managed.code, channel: "npm-managed" },
      { status: 409 }
    );
  }
  return null;
}

export function managedUpdateStateResponse(operationId: string) {
  const noStore = { "Cache-Control": "no-store" };
  if (!managedUpdateOperationIdSchema.safeParse(operationId).success) {
    return NextResponse.json({ error: "Invalid operationId" }, { status: 400, headers: noStore });
  }
  const state = readManagedUpdateState(operationId);
  if (!state) {
    return NextResponse.json(
      { error: "Unknown update operation" },
      { status: 404, headers: noStore }
    );
  }
  return NextResponse.json(state, { headers: noStore });
}
