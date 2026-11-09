/**
 * Log Rotation & Cleanup — manages application log file rotation.
 *
 * Handles:
 *   - Rotating log files when they exceed max size (startup + periodic during runtime)
 *   - Cleaning up old log files past retention period
 *   - Capping the number of rotated log files kept on disk
 *   - Creating the log directory on startup
 *
 * Configuration via env vars:
 *   - APP_LOG_TO_FILE: enable file logging (default: true)
 *   - APP_LOG_FILE_PATH: path to log file (default: logs/application/app.log)
 *   - APP_LOG_MAX_FILE_SIZE: max file size before rotation (default: 50MB)
 *   - APP_LOG_RETENTION_DAYS: days to keep old logs (default: 7)
 *   - APP_LOG_MAX_FILES: max number of rotated log files to keep (default: 20)
 *   - APP_LOG_ROTATION_CHECK_INTERVAL_MS: how often to check log size at runtime (default: 60000ms)
 */

import { existsSync, mkdirSync, statSync, renameSync, readdirSync, unlinkSync } from "fs";
import { dirname, join, basename, extname } from "path";
import {
  getAppLogFilePath,
  getAppLogMaxFiles,
  getAppLogMaxFileSize,
  getAppLogRetentionDays,
  getAppLogToFile,
} from "./logEnv";

const DEFAULT_ROTATION_CHECK_INTERVAL_MS = 60_000;

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

/** Interval between runtime rotation checks (default: 60s). */
export function getAppLogRotationCheckInterval(): number {
  return parsePositiveInt(
    process.env.APP_LOG_ROTATION_CHECK_INTERVAL_MS,
    DEFAULT_ROTATION_CHECK_INTERVAL_MS
  );
}

/** Listener notified with the current log path after a rotation. */
export type LogRotationListener = (currentPath: string) => void;

interface LogRotationState {
  timer: ReturnType<typeof setInterval> | null;
  /**
   * Rotation listeners live next to the timer on the process-wide state, so a
   * logger subscribed from one HMR/server-chunk copy of this module is still
   * notified by the timer another copy started.
   */
  listeners?: Set<LogRotationListener>;
}

declare global {
  var __omnirouteLogRotationState: LogRotationState | undefined;
}

/** Process-wide state survives Next.js development HMR and split server chunks. */
function getLogRotationState(): LogRotationState {
  return (globalThis.__omnirouteLogRotationState ??= { timer: null });
}

function getRotationListeners(): Set<LogRotationListener> {
  const state = getLogRotationState();
  return (state.listeners ??= new Set<LogRotationListener>());
}

export function getLogConfig() {
  const logToFile = getAppLogToFile();
  const logFilePath = getAppLogFilePath() || join(process.cwd(), "logs/application/app.log");
  const maxFileSize = getAppLogMaxFileSize();
  const retentionDays = getAppLogRetentionDays();
  const maxFiles = getAppLogMaxFiles();

  return { logToFile, logFilePath, maxFileSize, retentionDays, maxFiles };
}

/**
 * Ensure the log directory exists.
 */
export function ensureLogDir(logFilePath: string): void {
  const dir = dirname(logFilePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

/**
 * Register a listener notified with the current log path after each rotation
 * (own rotation, or an external one detected by the periodic check). Returns an
 * unsubscribe function. Backed by a Set, so subscribing the same listener twice
 * notifies it once.
 */
export function onLogRotation(listener: LogRotationListener): () => void {
  const listeners = getRotationListeners();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyLogRotationListeners(currentPath: string): void {
  for (const listener of getRotationListeners()) {
    try {
      listener(currentPath);
    } catch (error) {
      try {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[logRotation] rotation listener failed: ${message}`);
      } catch {
        // Never let logging break rotation.
      }
    }
  }
}

/**
 * Rotate the log file if it exceeds the max size.
 * Renames current file to app.YYYY-MM-DD_HHmmss.log and notifies rotation
 * listeners so open writers can reopen the current path.
 *
 * Returns the rotated file path when a rotation happened, `null` otherwise
 * (missing file, below the size limit, or a failed rotation — the documented
 * policy keeps writing to the same file in that case).
 */
export function rotateIfNeeded(logFilePath: string, maxFileSize: number): string | null {
  try {
    if (!existsSync(logFilePath)) return null;
    const stats = statSync(logFilePath);
    if (stats.size < maxFileSize) return null;

    const dir = dirname(logFilePath);
    const ext = extname(logFilePath);
    const base = basename(logFilePath, ext);
    const now = new Date();
    const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(
      now.getMinutes()
    ).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;

    const rotatedPath = join(dir, `${base}.${ts}${ext}`);
    renameSync(logFilePath, rotatedPath);
    notifyLogRotationListeners(logFilePath);
    return rotatedPath;
  } catch {
    // If rotation fails, continue writing to the same file
    return null;
  }
}

/**
 * Remove log files older than the retention period.
 */
export function cleanupOldLogs(logFilePath: string, retentionDays: number): void {
  try {
    const dir = dirname(logFilePath);
    if (!existsSync(dir)) return;

    const ext = extname(logFilePath);
    const base = basename(logFilePath, ext);
    const files = readdirSync(dir);
    const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;

    for (const file of files) {
      // Match rotated files like app.2026-02-19_030000.log
      if (file.startsWith(base + ".") && file.endsWith(ext) && file !== basename(logFilePath)) {
        const filePath = join(dir, file);
        try {
          const stats = statSync(filePath);
          if (stats.mtimeMs < cutoff) {
            unlinkSync(filePath);
          }
        } catch {
          // Skip files we can't stat
        }
      }
    }
  } catch {
    // Cleanup is best-effort
  }
}

/**
 * Keep only the newest rotated files up to the configured count limit.
 */
export function cleanupOverflowLogs(logFilePath: string, maxFiles: number): void {
  try {
    const dir = dirname(logFilePath);
    if (!existsSync(dir) || maxFiles < 1) return;

    const ext = extname(logFilePath);
    const base = basename(logFilePath, ext);
    const rotatedFiles = readdirSync(dir)
      .filter(
        (file) =>
          file !== basename(logFilePath) && file.startsWith(base + ".") && file.endsWith(ext)
      )
      .map((file) => {
        const filePath = join(dir, file);
        try {
          return { filePath, mtimeMs: statSync(filePath).mtimeMs };
        } catch {
          return null;
        }
      })
      .filter((entry): entry is { filePath: string; mtimeMs: number } => !!entry)
      .sort((a, b) => b.mtimeMs - a.mtimeMs);

    for (const entry of rotatedFiles.slice(maxFiles)) {
      try {
        unlinkSync(entry.filePath);
      } catch {
        // Best effort only.
      }
    }
  } catch {
    // Cleanup is best-effort
  }
}

/**
 * Initialize log rotation — call once at application startup.
 * Creates directories, rotates if needed, cleans up old files, and starts
 * a background timer that re-checks rotation at APP_LOG_ROTATION_CHECK_INTERVAL_MS
 * (defaults to every 60 s). This catches log growth that happens during runtime
 * — without this timer, rotation only runs once at startup.
 *
 * Call closeLogRotation() during application shutdown to clear the timer.
 */
export function initLogRotation(): void {
  const state = getLogRotationState();
  if (state.timer !== null) return;

  const config = getLogConfig();
  if (!config.logToFile) return;

  ensureLogDir(config.logFilePath);
  rotateIfNeeded(config.logFilePath, config.maxFileSize);
  cleanupOldLogs(config.logFilePath, config.retentionDays);
  cleanupOverflowLogs(config.logFilePath, config.maxFiles);

  const intervalMs = getAppLogRotationCheckInterval();
  // External-rotation check (one existsSync per tick, never per write): when the
  // current file vanished without this process rotating it (logrotate, another
  // process, an operator), listeners are notified ONCE so the writer reopens the
  // current path. `notifiedMissing` bounds that to one notification per absence
  // window — if the reopen cannot recreate the file, later ticks stay quiet
  // instead of rebuilding the writer every interval. It re-arms as soon as the
  // current file exists again.
  // Residual window (declared): if the file is renamed AND recreated by someone
  // else between two ticks, the path exists and this check cannot tell that the
  // writer still points at the renamed file; those lines stay readable in that
  // file until the next own rotation reopens the writer.
  let notifiedMissing = false;
  state.timer = setInterval(
    (filePath: string, maxSize: number, maxFiles: number) => {
      if (rotateIfNeeded(filePath, maxSize) !== null) {
        // Own rotation: listeners were already notified inside rotateIfNeeded.
        notifiedMissing = true;
      } else if (existsSync(filePath)) {
        notifiedMissing = false;
      } else if (!notifiedMissing && getRotationListeners().size > 0) {
        notifiedMissing = true;
        notifyLogRotationListeners(filePath);
      }
      cleanupOverflowLogs(filePath, maxFiles);
    },
    intervalMs,
    config.logFilePath,
    config.maxFileSize,
    config.maxFiles
  );
  state.timer.unref?.();
}

/**
 * Stop the background rotation timer started by initLogRotation().
 * Idempotent — safe to call multiple times.
 */
export function closeLogRotation(): void {
  const state = getLogRotationState();
  if (state.timer !== null) {
    clearInterval(state.timer);
    state.timer = null;
  }
}
