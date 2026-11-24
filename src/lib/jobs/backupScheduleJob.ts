import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { matchesCron } from "@/lib/jobs/cronMatch";
// Reuses the CLI's own backup implementation rather than duplicating it — the
// `omniroute backup auto enable` schedule this job executes is written by
// exactly that CLI, with the exact same cloud/encrypt/retention semantics.
// `runBackupCommand`/`resolveDataDir` are plain functions with no Commander
// or process.exit() coupling (verified), and `resolveDataDir()` here is
// algorithmically identical to `src/lib/dataPaths.ts`'s server-side resolver
// (same DATA_DIR/XDG/legacy-dir precedence) — both agree on where
// `backup-schedule.json` lives.
import { runBackupCommand } from "../../../bin/cli/commands/backup.mjs";
import { resolveDataDir } from "../../../bin/cli/data-dir.mjs";

const DEFAULT_INTERVAL_MS = 30 * 1000;

let timer: NodeJS.Timeout | null = null;

function getIntervalMs() {
  const raw = process.env.OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS;
  const parsed = raw ? Number(raw) : Number.NaN;
  // Floor at 5s (not the usual 60s+ floor used by the other jobs in this
  // directory): cron granularity is 1 minute, so the tick must be
  // meaningfully shorter than that to reliably land inside the matching
  // minute at all.
  return Number.isFinite(parsed) && parsed >= 5_000 ? parsed : DEFAULT_INTERVAL_MS;
}

function getSchedulePath() {
  return join(resolveDataDir(), "backup-schedule.json");
}

function minuteKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
}

type BackupSchedule = {
  enabled?: boolean;
  cron?: string;
  cloud?: boolean;
  encrypt?: boolean;
  retention?: number | null;
  updatedAt?: string;
  lastRunAt?: string;
  keyFile?: string;
  lastError?: string | null;
};

function readSchedule(): BackupSchedule | null {
  const schedulePath = getSchedulePath();
  if (!existsSync(schedulePath)) return null;
  try {
    return JSON.parse(readFileSync(schedulePath, "utf8"));
  } catch {
    return null;
  }
}

function writeLastRunAt(schedule: BackupSchedule, at: Date, lastError?: string | null) {
  const schedulePath = getSchedulePath();
  const updated = { ...schedule, lastRunAt: at.toISOString(), lastError: lastError ?? null };
  writeFileSync(schedulePath, JSON.stringify(updated, null, 2), "utf8");
}

function alreadyRanThisMinute(schedule: BackupSchedule, now: Date): boolean {
  if (!schedule.lastRunAt) return false;
  const lastRun = new Date(schedule.lastRunAt);
  return !Number.isNaN(lastRun.getTime()) && minuteKey(lastRun) === minuteKey(now);
}

async function runScheduledBackup(schedule: BackupSchedule, now: Date): Promise<void> {
  try {
    // runBackupCommand reports failure through its exit code, not by throwing.
    const exitCode = await runBackupCommand({
      cloud: !!schedule.cloud,
      encrypt: !!schedule.encrypt,
      keyFile: schedule.encrypt ? schedule.keyFile : undefined,
      retention: schedule.retention || undefined,
    });
    if (exitCode !== 0) {
      console.error(`[BackupSchedule] Backup failed (exit ${exitCode})`);
      writeLastRunAt(schedule, now, `backup failed (exit ${exitCode})`);
    }
  } catch (error) {
    console.error("[BackupSchedule] Job failed:", error);
    writeLastRunAt(schedule, now, error instanceof Error ? error.message : String(error));
  }
}

/**
 * Evaluates the persisted `backup-schedule.json` against `now` and, if due,
 * runs the backup. Returns whether a backup was actually triggered — used
 * directly by tests (with an explicit `now`) and by the interval tick below
 * (with the real current time).
 */
export async function runBackupScheduleTick(now: Date = new Date()): Promise<boolean> {
  const schedule = readSchedule();
  if (!schedule || !schedule.enabled || !schedule.cron) return false;
  if (!matchesCron(schedule.cron, now)) return false;

  // A scheduled run has no TTY, so an encrypted schedule needs a key file
  // (`backup auto enable --encrypt --key-file <path>`); without one, skip
  // rather than block on a stdin passphrase prompt.
  if (schedule.encrypt && !schedule.keyFile) {
    console.error(
      "[BackupSchedule] Schedule has encrypt:true but no keyFile — re-run " +
        "`omniroute backup auto enable --encrypt --key-file <path>`; skipping this run."
    );
    return false;
  }

  // A tick shorter than 60s means multiple ticks can land inside the same
  // matching minute — without this guard the backup would fire once per
  // tick for the whole minute instead of once for the whole day.
  if (alreadyRanThisMinute(schedule, now)) return false;

  writeLastRunAt(schedule, now);
  await runScheduledBackup(schedule, now);
  return true;
}

export function startBackupScheduleJob() {
  if (timer) {
    return timer;
  }

  const run = () => {
    runBackupScheduleTick().catch((error) => {
      console.error("[BackupSchedule] Tick failed:", error);
    });
  };

  timer = setInterval(run, getIntervalMs());
  timer.unref?.();
  return timer;
}

export function stopBackupScheduleJob() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
