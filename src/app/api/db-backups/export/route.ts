import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import os from "os";
import { z } from "zod";
import { getDbInstance, SQLITE_FILE } from "@/lib/db/core";
import { stripPortableHistory } from "@/lib/db/backup";
import {
  CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/** `?portable=true` is the remote-sync opt-in; anything else in `portable` is a 400. */
const exportQuerySchema = z.object({ portable: z.enum(["true", "false"]).optional() });

/**
 * GET /api/db-backups/export — Download the current database as a .sqlite file.
 *
 * Uses SQLite's native backup API to create a consistent snapshot,
 * then streams it as a downloadable attachment.
 *
 * By default the snapshot is the complete database (the dashboard export). `?portable=true`
 * is the opt-in used only by `omniroute sync remote`: it empties `usage_history` and
 * `call_logs` in the exported copy before streaming it (#20418).
 *
 * 🔒 Operator-only: dashboard session, local CLI, or login disabled. API keys (any scope)
 *    and `oma_` access tokens get 403 — the file carries every stored credential.
 */
export async function GET(request: Request) {
  // Hands out every stored credential: operator only (dashboard session, local CLI, or login
  // disabled). API keys of any scope and `oma_` access tokens get 403.
  const operatorVerdict = await requireOperatorCredential(request, {
    forbiddenMessage: CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  });
  if (operatorVerdict.ok === false) return operatorVerdict.response;
  const query = exportQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!query.success) {
    return NextResponse.json({ error: "Invalid export query" }, { status: 400 });
  }
  const portable = query.data.portable === "true";
  try {
    if (!SQLITE_FILE || !fs.existsSync(SQLITE_FILE)) {
      return NextResponse.json({ error: "Database file not found" }, { status: 404 });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const exportFilename = `omniroute-backup-${timestamp}.sqlite`;
    // Use mkdtempSync (exclusive creation, random suffix) instead of a
    // deterministic timestamp path — a predictable path lets a local
    // attacker pre-place a symlink and redirect the write (TOCTOU).
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-"));
    const tmpPath = path.join(tmpDir, "backup.sqlite");

    // Use native SQLite backup API for a consistent snapshot
    const db = getDbInstance();
    try {
      await db.backup(tmpPath);
      // #20418: remote sync only. backup() has no table filter, so the copy is scrubbed in
      // place; the default export is never touched.
      if (portable) await stripPortableHistory(tmpPath);
    } catch (backupError) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      throw backupError;
    }

    const { size: fileSize } = fs.statSync(tmpPath);
    const readStream = fs.createReadStream(tmpPath);

    // Cleanup temp dir (and everything in it) on completion, error, or client abort
    const cleanup = () => {
      readStream.destroy();
      fs.rm(tmpDir, { recursive: true, force: true }, () => {});
    };
    request.signal.addEventListener("abort", cleanup, { once: true });

    const webStream = new ReadableStream({
      start(controller) {
        readStream.on("data", (chunk) => controller.enqueue(chunk));
        readStream.on("end", () => {
          controller.close();
          cleanup();
        });
        readStream.on("error", (err) => {
          controller.error(err);
          cleanup();
        });
      },
      cancel() {
        cleanup();
      },
    });

    return new Response(webStream, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${exportFilename}"`,
        "Content-Length": String(fileSize),
        "Cache-Control": "no-cache, no-store",
      },
    });
  } catch (error) {
    console.error("[API] Error exporting database:", error);
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
