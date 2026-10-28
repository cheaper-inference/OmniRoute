import fs from "node:fs";
import path from "node:path";
import type { SqliteAdapter } from "../db/adapters/types";
import { parseStoredPayload } from "./parseStoredPayload";

/** Read-only surface shared by the dashboard and isolated export process. */
export interface CallLogReadDb {
  prepare(sql: string): Pick<ReturnType<SqliteAdapter["prepare"]>, "get" | "all">;
}
export interface CallLogDetailEntry {
  id: string;
  timestamp: string | null;
  model: string | null;
  status: number;
  detailState: string;
  artifactRelPath: string | null;
  error: unknown;
  hasPipelineDetails: boolean;
}
interface DetailFileIo {
  readFile(file: string): string | Promise<string>;
  readdir(dir: string): string[] | Promise<string[]>;
}
const asyncIo: DetailFileIo = {
  readFile: (file) => fs.promises.readFile(file, "utf8"),
  readdir: (dir) => fs.promises.readdir(dir),
};
/** Dashboard compatibility: its existing detail path still reads synchronously. */
export const dashboardDetailIo: DetailFileIo = {
  readFile: (file) => fs.readFileSync(file, "utf8"),
  readdir: (dir) => fs.readdirSync(dir),
};

function hasTable(db: CallLogReadDb, table: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(table)
  );
}
function legacyPipeline(db: CallLogReadDb, id: string): Record<string, unknown> | null {
  if (!hasTable(db, "request_detail_logs")) return null;
  const row = db
    .prepare(
      `SELECT * FROM request_detail_logs WHERE call_log_id = ? ORDER BY timestamp DESC LIMIT 1`
    )
    .get(id) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    clientRequest: parseStoredPayload(row.client_request),
    providerRequest: parseStoredPayload(row.translated_request),
    providerResponse: parseStoredPayload(row.provider_response),
    clientResponse: parseStoredPayload(row.client_response),
  };
}
async function legacyDisk(
  entry: CallLogDetailEntry,
  baseDir: string | null,
  io: DetailFileIo
): Promise<Record<string, unknown> | null> {
  if (!baseDir || !entry.timestamp) return null;
  const date = new Date(entry.timestamp);
  if (Number.isNaN(date.getTime())) return null;
  const dateFolder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const dir = path.join(baseDir, dateFolder);
  const time = `${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;
  const safeModel = (entry.model || "unknown").replace(/[/:]/g, "-");
  try {
    try {
      return JSON.parse(
        await io.readFile(path.join(dir, `${time}_${safeModel}_${entry.status}.json`))
      ) as Record<string, unknown>;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") return null;
    }
    const files = (await io.readdir(dir)).filter(
      (file) => file.startsWith(time) && file.endsWith(`_${entry.status}.json`)
    );
    return files.length
      ? (JSON.parse(await io.readFile(path.join(dir, files[0]))) as Record<string, unknown>)
      : null;
  } catch {
    // Missing/corrupt historical files intentionally export summary-only records.
    return null;
  }
}

type ArtifactState = "missing" | "corrupt";
type DetailPayload = Record<string, unknown>;
interface ArtifactRead {
  payload: DetailPayload | null;
  detailState: string;
  artifactRelPath: string | null;
  pipelinePayloads: DetailPayload | null;
}

async function readArtifactPayload(
  db: CallLogReadDb,
  entry: CallLogDetailEntry,
  baseDir: string | null,
  io: DetailFileIo,
  onArtifactState?: (relativePath: string, state: ArtifactState) => void
): Promise<ArtifactRead> {
  const relPath = entry.artifactRelPath;
  const unchanged: ArtifactRead = {
    payload: null,
    detailState: entry.detailState,
    artifactRelPath: relPath,
    pipelinePayloads: null,
  };
  if (!relPath || !baseDir) return unchanged;
  try {
    const payload = JSON.parse(await io.readFile(path.join(baseDir, relPath))) as DetailPayload;
    if (!payload) return unchanged;
    return {
      payload,
      detailState: "ready",
      artifactRelPath: relPath,
      pipelinePayloads: (payload.pipeline ?? legacyPipeline(db, entry.id)) as DetailPayload | null,
    };
  } catch (error) {
    const state: ArtifactState =
      (error as NodeJS.ErrnoException).code === "ENOENT" ? "missing" : "corrupt";
    onArtifactState?.(relPath, state);
    return {
      payload: null,
      detailState: state,
      artifactRelPath: state === "missing" ? null : relPath,
      pipelinePayloads: null,
    };
  }
}

/** Legacy inline error column: blank → null, JSON → parsed, plain text kept verbatim. */
function parseLegacyError(value: unknown): unknown {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value; // Historical plain-text error.
  }
}

function readLegacyInline(db: CallLogReadDb, id: string): DetailPayload | null {
  if (!hasTable(db, "call_logs_v1_legacy")) return null;
  const row = db
    .prepare("SELECT request_body, response_body, error FROM call_logs_v1_legacy WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    requestBody: parseStoredPayload(row.request_body),
    responseBody: parseStoredPayload(row.response_body),
    error: parseLegacyError(row.error),
  };
}

/** Body/error fields; an inline legacy row's error wins even when null (historical shape). */
function detailBodyFields(payload: DetailPayload | null, inline: boolean, entryError: unknown) {
  return {
    requestBody: payload?.requestBody ?? null,
    responseBody: payload?.responseBody ?? null,
    error: inline ? payload?.error : (payload?.error ?? entryError),
  };
}

/**
 * Pure detail resolution: artifact → legacy-inline → legacy-disk → none.
 * Never updates SQLite. The dashboard owns missing/corrupt bookkeeping via onArtifactState;
 * the export child deliberately supplies no callback and uses asynchronous filesystem IO.
 */
export async function resolveCallLogDetail<T extends CallLogDetailEntry>(
  db: CallLogReadDb,
  entry: T,
  baseDir: string | null,
  options: {
    io?: DetailFileIo;
    onArtifactState?: (relativePath: string, state: ArtifactState) => void;
  } = {}
) {
  const io = options.io ?? asyncIo;
  const artifact = await readArtifactPayload(db, entry, baseDir, io, options.onArtifactState);
  const artifactReady = artifact.payload !== null;
  const inlinePayload =
    !artifactReady && artifact.detailState === "legacy-inline"
      ? readLegacyInline(db, entry.id)
      : null;
  const inline = inlinePayload !== null;
  const payload = artifact.payload ?? inlinePayload ?? (await legacyDisk(entry, baseDir, io));
  const pipelinePayloads = artifact.pipelinePayloads || legacyPipeline(db, entry.id);
  const hasPipelineDetails = artifactReady ? Boolean(payload?.pipeline) : Boolean(pipelinePayloads);
  return {
    ...entry,
    detailState: artifact.detailState,
    artifactRelPath: artifact.artifactRelPath,
    ...detailBodyFields(payload, inline, entry.error),
    pipelinePayloads,
    hasPipelineDetails: hasPipelineDetails || entry.hasPipelineDetails,
    active: false,
  };
}
