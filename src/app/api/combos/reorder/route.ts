import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getCombos, reorderCombos } from "@/lib/db/combos";
import { isCloudEnabled } from "@/lib/db/settings";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { reorderCombosSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

// Revision of the stored order: a hash of the combo ids in display order.
async function currentRevision(): Promise<string> {
  const ids = (await getCombos()).map((combo) => String(combo.id));
  return createHash("sha256").update(ids.join("\n")).digest("hex").slice(0, 16);
}

let reorderQueue: Promise<unknown> = Promise.resolve();
function exclusive<T>(task: () => Promise<T>): Promise<T> {
  const run = reorderQueue.then(task, task);
  reorderQueue = run.catch(() => undefined);
  return run;
}

// GET /api/combos/reorder - Current order revision, to send back with a reorder
export async function GET(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    return NextResponse.json({ revision: await currentRevision() });
  } catch (error) {
    console.log("Error reading combo order revision:", error);
    return NextResponse.json({ error: "Failed to read combo order" }, { status: 500 });
  }
}

// POST /api/combos/reorder - Persist combo ordering
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(reorderCombosSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Optional so older clients keep working; a client that sends the revision it last read
    // gets 409 instead of silently overwriting a newer order.
    const expected = rawBody?.revision;
    if (expected !== undefined && typeof expected !== "string") {
      return NextResponse.json(
        { error: { message: "Invalid request", details: [{ field: "revision" }] } },
        { status: 400 }
      );
    }
    // The revision check and the write run one at a time, so two requests that hold the same
    // revision cannot both pass the check.
    // shortcut: in-process lock only; a second server process on the same database can still
    // race, so move the check into the reorder transaction if that deployment appears.
    const outcome = await exclusive(async () => {
      if (expected !== undefined) {
        const revision = await currentRevision();
        if (revision !== expected) return { conflict: revision } as const;
      }
      return { combos: await reorderCombos(validation.data.comboIds) } as const;
    });
    if ("conflict" in outcome) {
      return NextResponse.json(
        {
          error: { message: "Combo order changed; reload and retry", type: "conflict" },
          revision: outcome.conflict,
        },
        { status: 409 }
      );
    }
    await syncToCloudIfEnabled();

    return NextResponse.json({ combos: outcome.combos, revision: await currentRevision() });
  } catch (error) {
    console.log("Error reordering combos:", error);
    return NextResponse.json({ error: "Failed to reorder combos" }, { status: 500 });
  }
}

async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing to cloud:", error);
  }
}
