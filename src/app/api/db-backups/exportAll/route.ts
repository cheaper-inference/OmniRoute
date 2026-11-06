import { NextRequest, NextResponse } from "next/server";
import { getDbInstance, SQLITE_FILE } from "@/lib/db/core";
import { exportAllSummaryRows } from "@/lib/db/backup";
import { getCallLogsDir } from "@/lib/usage/callLogArtifacts";
import fs from "fs";
import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import path from "path";
import os from "os";
import { execFile } from "node:child_process";
import {
  CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  requireOperatorCredential,
} from "@/lib/api/operatorCredential";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

/**
 * Run `tar` without blocking the event loop. `execFile` is looked up through the
 * property access at call time (not captured once) so tests can substitute it.
 */
function runTar(args: string[], options: { cwd: string; timeout: number }): Promise<void> {
  const { promise, resolve, reject } = Promise.withResolvers<void>();
  execFile("tar", args, options, (error) => {
    if (error) reject(error);
    else resolve();
  });
  return promise;
}

/**
 * GET /api/db-backups/exportAll
 * Exports the entire database + settings as a tar.gz archive
 * Security: operator-only (dashboard session, local CLI, or login disabled); API keys
 * and `oma_` access tokens get 403.
 */
export async function GET(request: NextRequest) {
  // Hands out every stored credential: operator only (dashboard session, local CLI, or login
  // disabled). API keys of any scope and `oma_` access tokens get 403.
  const operatorVerdict = await requireOperatorCredential(request, {
    forbiddenMessage: CREDENTIAL_EXPORT_FORBIDDEN_MESSAGE,
  });
  if (operatorVerdict.ok === false) return operatorVerdict.response;

  return buildFullExportResponse(request);
}

const ARCHIVE_CONTENTS = [
  "storage.sqlite - Full database",
  "settings.json - Key-value settings",
  "combos.json - Combo configurations",
  "providers.json - Provider connections (no credentials)",
  "api-keys.json - API key metadata (masked)",
  "reasoning-routing-rules.json - Reasoning routing policies",
  "call_logs/ - Detailed call log artifacts",
];

/** Stage the JSON sidecars of the export payload (steps 2–7). */
function writeExportSidecars(payloadDir: string): void {
  const { settings, combos, providers, apiKeys, reasoningRoutingRules } = exportAllSummaryRows();
  const write = (name: string, value: unknown) =>
    fs.writeFileSync(path.join(payloadDir, name), JSON.stringify(value, null, 2));

  write("settings.json", settings);
  write("combos.json", combos);
  write("providers.json", providers);
  write("api-keys.json", apiKeys);
  write("reasoning-routing-rules.json", reasoningRoutingRules);

  const callLogsDir = getCallLogsDir();
  if (callLogsDir && fs.existsSync(callLogsDir)) {
    fs.cpSync(callLogsDir, path.join(payloadDir, "call_logs"), { recursive: true });
  }

  write("metadata.json", {
    exportedAt: new Date().toISOString(),
    version: process.env.npm_package_version || "unknown",
    format: "omniroute-full-backup-v1",
    contents: ARCHIVE_CONTENTS,
  });
}

/**
 * Stream the finished archive and remove the work directory once the response
 * has consumed it (or the client aborts).
 *
 * `Readable.toWeb` pulls from the file only as the client drains the response,
 * so a slow client applies backpressure instead of buffering the archive in
 * the queue. The `close` event covers normal end, errors and destruction; an
 * abort only destroys the stream and lets `close` do the cleanup.
 */
function streamArchive(
  tarPath: string,
  workDir: string,
  request: NextRequest,
  headers: Record<string, string>
): Response {
  const archiveStream = createReadStream(tarPath);
  // `close` fires only after the descriptor is released, so the directory is
  // removed from here alone: Windows can refuse to remove a file still open.
  archiveStream.once("close", () => {
    try {
      fs.rmSync(workDir, { recursive: true, force: true });
    } catch {
      // Cleanup must not replace a successful response.
    }
  });

  // A client that left during the backup or tar has already fired `abort`, and
  // Next drops such a response without reading or cancelling its body.
  const abort = () => archiveStream.destroy();
  if (request.signal.aborted) abort();
  else request.signal.addEventListener("abort", abort, { once: true });

  return new Response(Readable.toWeb(archiveStream) as ReadableStream<Uint8Array>, {
    status: 200,
    headers,
  });
}

async function buildFullExportResponse(request: NextRequest): Promise<Response> {
  try {
    if (!SQLITE_FILE) {
      return NextResponse.json(
        { error: "Export is only available in local (non-cloud) mode" },
        { status: 400 }
      );
    }

    const db = getDbInstance();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    // Use mkdtempSync (exclusive creation, random suffix) instead of a
    // deterministic timestamp path — a predictable path lets a local
    // attacker pre-place a symlink and redirect the write (TOCTOU).
    const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-export-"));
    const payloadDir = path.join(workDir, path.basename(workDir));
    const archiveName = `omniroute-full-backup-${timestamp}.tar.gz`;
    const tarPath = path.join(workDir, archiveName);

    try {
      fs.mkdirSync(payloadDir);
      // 1. Export database using native backup API
      await db.backup(path.join(payloadDir, "storage.sqlite"));

      // 2–7. JSON sidecars, call-log artifacts and metadata
      writeExportSidecars(payloadDir);

      // A bare filename avoids GNU tar interpreting a Windows drive colon as a
      // remote archive. The exclusive work directory also isolates concurrent exports.
      // Async exec: execFileSync blocked the shared event loop for the whole
      // tar run (up to the 30s timeout), freezing the LLM proxy and the UI.
      await runTar(["-czf", archiveName, path.basename(payloadDir)], {
        cwd: workDir,
        timeout: 30000,
      });

      // Size for Content-Length without buffering the archive in the heap.
      const { size: archiveSize } = await fs.promises.stat(tarPath);
      return streamArchive(tarPath, workDir, request, {
        "Content-Type": "application/gzip",
        "Content-Disposition": `attachment; filename="${archiveName}"`,
        "Content-Length": String(archiveSize),
      });
    } catch (error) {
      // Nothing is streaming on the failure path: drop the work directory now.
      try {
        fs.rmSync(workDir, { recursive: true, force: true });
      } catch {
        // Cleanup must not replace the original export error.
      }
      throw error;
    }
  } catch (error: unknown) {
    console.error("[ExportAll] Error:", error);
    return NextResponse.json(
      {
        error: "Failed to create full export",
        details: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
