import { hashFileSync } from "../backupFileHash";
import { tryOpenSync } from "../adapters/driverFactory";

export interface VacuumSnapshotJob {
  sqliteFile: string;
  tempPath: string;
}

export interface VacuumSnapshotWorkerResult {
  ok: boolean;
  sha256?: string;
  unavailable?: boolean;
}

process.once("message", (job: VacuumSnapshotJob) => {
  let reader: ReturnType<typeof tryOpenSync> = null;
  try {
    reader = tryOpenSync(job.sqliteFile, { readonly: true, fileMustExist: true });
    if (!reader) {
      const result: VacuumSnapshotWorkerResult = { ok: false, unavailable: true };
      process.send?.(result, () => {
        process.disconnect?.();
      });
      return;
    }
    reader.exec(`VACUUM INTO '${job.tempPath.replace(/'/g, "''")}'`);
    reader.close();
    reader = null;
    const sha256 = hashFileSync(job.tempPath);
    const result: VacuumSnapshotWorkerResult = { ok: true, sha256 };
    process.send?.(result, () => {
      process.disconnect?.();
    });
  } catch {
    try {
      reader?.close();
    } catch {
      /* Preserve the original failure. */
    }
    process.exitCode = 1;
    if (process.connected) process.disconnect?.();
  }
});
