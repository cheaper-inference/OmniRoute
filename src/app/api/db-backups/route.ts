import { NextRequest, NextResponse } from "next/server";
import {
  listDbBackups,
  restoreDbBackup,
  backupDbFile,
  cleanupDbBackups,
  getDbBackupMaxFiles,
  setDbBackupMaxFiles,
  getDbBackupRetentionDays,
  setDbBackupRetentionDays,
} from "@/lib/db/backup";
import { dbBackupCleanupSchema, dbBackupRestoreSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  CREDENTIAL_IMPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * 403 messages for the two handlers that destroy restore points (or arm their automatic
 * pruning). Route-local on purpose: the shared `CREDENTIAL_IMPORT_FORBIDDEN_MESSAGE` talks
 * about restoring, and no other route prunes backups.
 */
const BACKUP_CLEANUP_FORBIDDEN_MESSAGE =
  "Deleting database backups requires a signed-in dashboard session or the local CLI; API keys and access tokens cannot prune restore points.";
const BACKUP_RETENTION_FORBIDDEN_MESSAGE =
  "Changing backup retention requires a signed-in dashboard session or the local CLI; API keys and access tokens cannot change what automatic pruning keeps.";

async function readOptionalJsonBody(request: NextRequest | Request): Promise<unknown> {
  try {
    const text = await request.text();
    return text.trim() ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid JSON body");
  }
}

function persistDbBackupRetentionSettings(input: { keepLatest?: number; retentionDays?: number }) {
  const keepLatest = input.keepLatest ?? getDbBackupMaxFiles();
  const retentionDays = input.retentionDays ?? getDbBackupRetentionDays();

  if (input.keepLatest !== undefined) {
    setDbBackupMaxFiles(input.keepLatest);
  }
  if (input.retentionDays !== undefined) {
    setDbBackupRetentionDays(input.retentionDays);
  }

  return { keepLatest, retentionDays };
}

/**
 * PUT /api/db-backups — Trigger a manual backup snapshot.
 * Security: Requires admin authentication.
 */
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = backupDbFile("manual");
    if (!result) {
      return NextResponse.json({ message: "No changes since last backup (throttled)" });
    }
    return NextResponse.json({ created: true, ...result });
  } catch (error) {
    console.error("[API] Error creating manual backup:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

/**
 * GET /api/db-backups — List available database backups.
 * Security: Requires admin authentication.
 */
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const backups = await listDbBackups();
    return NextResponse.json({ backups });
  } catch (error) {
    console.error("[API] Error listing DB backups:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

/**
 * POST /api/db-backups — Restore a specific backup.
 * Body: { backupId: "db_2026-02-11T14-00-00-000Z_pre-write.json" }
 * Security: operator-only — dashboard session, local CLI, or login disabled. Restoring
 * replaces the live database wholesale, so API keys of any scope and `oma_` access tokens
 * get 403 (same boundary as the exports). Listing and creating (GET/PUT above) keep ordinary
 * management auth; retention and cleanup below are operator-only too.
 */
export async function POST(request: NextRequest) {
  const operatorVerdict = await requireOperatorCredential(request, {
    forbiddenMessage: CREDENTIAL_IMPORT_FORBIDDEN_MESSAGE,
  });
  if (operatorVerdict.ok === false) return operatorVerdict.response;

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
    const validation = validateBody(dbBackupRestoreSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { backupId } = validation.data;

    const result = await restoreDbBackup(backupId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API] Error restoring DB backup:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

/**
 * PATCH /api/db-backups — Save database backup retention settings.
 * Body: { keepLatest?: number, retentionDays?: number }
 * Security: operator-only — dashboard session, local CLI, or login disabled. The persisted
 * values are exactly what `cleanupDbBackups()` applies after every automatic backup
 * (`src/lib/db/backup.ts`), so a machine credential that could save `keepLatest: 1` would prune
 * every restore point on the next snapshot without ever calling DELETE. API keys of any scope
 * and `oma_` access tokens get 403.
 */
export async function PATCH(request: NextRequest) {
  const operatorVerdict = await requireOperatorCredential(request, {
    forbiddenMessage: BACKUP_RETENTION_FORBIDDEN_MESSAGE,
  });
  if (operatorVerdict.ok === false) return operatorVerdict.response;

  let rawBody: unknown = {};
  try {
    rawBody = await readOptionalJsonBody(request);
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
    const validation = validateBody(dbBackupCleanupSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    return NextResponse.json({
      saved: true,
      ...persistDbBackupRetentionSettings(validation.data),
    });
  } catch (error) {
    console.error("[API] Error saving DB backup retention settings:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

/**
 * DELETE /api/db-backups — Cleanup old database backups.
 * Body: { keepLatest?: number, retentionDays?: number }
 * Security: operator-only — dashboard session, local CLI, or login disabled. Cleanup deletes
 * every stored restore point beyond the retention it is given (`keepLatest: 1` leaves one), and
 * restore points are the recovery path after a leaked machine credential, so API keys of any
 * scope and `oma_` access tokens get 403 (same boundary as restoring, #16899).
 */
export async function DELETE(request: NextRequest) {
  const operatorVerdict = await requireOperatorCredential(request, {
    forbiddenMessage: BACKUP_CLEANUP_FORBIDDEN_MESSAGE,
  });
  if (operatorVerdict.ok === false) return operatorVerdict.response;

  let rawBody: unknown = {};
  try {
    rawBody = await readOptionalJsonBody(request);
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
    const validation = validateBody(dbBackupCleanupSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { keepLatest, retentionDays } = persistDbBackupRetentionSettings(validation.data);
    const result = cleanupDbBackups({ maxFiles: keepLatest, retentionDays });
    return NextResponse.json({
      cleaned: true,
      keepLatest,
      retentionDays,
      ...result,
    });
  } catch (error) {
    console.error("[API] Error cleaning DB backups:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
