import fs from "fs";
import path from "path";
import { hashFileSync } from "./backupFileHash";

const CONTENT_ADDRESSED_SNAPSHOT = /^db_state-([a-f0-9]{64})_pre-migration\.sqlite$/;
const PORTABLE_SNAPSHOT = /^(db_state-[a-f0-9]{64}_pre-migration\.sqlite)\.snapshot$/;

export function portableSnapshotId(name: string): string | null {
  return PORTABLE_SNAPSHOT.exec(name)?.[1] ?? null;
}

export function portableSnapshotFile(directory: string): string {
  const file = path.join(directory, "snapshot.sqlite");
  if (!fs.lstatSync(directory).isDirectory() || !fs.lstatSync(file).isFile()) {
    throw new Error("Invalid portable snapshot: expected a directory and regular SQLite file");
  }
  return file;
}

/**
 * Pre-migration snapshots are content-addressed: the id carries the SHA-256 of the file bytes.
 * Throws when the file no longer matches, so a valid SQLite file that was changed after
 * publication is not restored. Ids with no hash make no claim and pass. Opt-in on purpose:
 * hashing reads the whole file, which listing must not do for every snapshot.
 */
export function verifyContentAddressedSnapshot(id: string, file: string): void {
  const claimed = CONTENT_ADDRESSED_SNAPSHOT.exec(id)?.[1];
  if (claimed && hashFileSync(file) !== claimed) {
    throw new Error(`Backup ${id} does not match its content hash; refusing to restore it`);
  }
}

/** IDs remain flat; portable snapshots never introduce user-controlled path segments. */
export function resolveBackupFile(backupDir: string, id: string): string {
  if (!/^db_[^/\\\0]+\.sqlite$/.test(id)) throw new Error("Invalid backup ID");
  const directoryStat = fs.lstatSync(backupDir, { throwIfNoEntry: false });
  if (directoryStat && !directoryStat.isDirectory()) throw new Error("Invalid backup directory");
  const flat = path.join(backupDir, id);
  const stat = fs.lstatSync(flat, { throwIfNoEntry: false });
  if (stat) {
    if (!stat.isFile()) throw new Error("Invalid backup: expected a regular file");
    return flat;
  }
  const directory = `${flat}.snapshot`;
  if (
    portableSnapshotId(path.basename(directory)) &&
    fs.lstatSync(directory, { throwIfNoEntry: false })
  ) {
    return portableSnapshotFile(directory);
  }
  return flat;
}

export function listBackupIds(backupDir: string): string[] {
  return [
    ...new Set(
      fs.readdirSync(backupDir).flatMap((name) => {
        const portable = portableSnapshotId(name);
        return portable
          ? [portable]
          : name.startsWith("db_") && name.endsWith(".sqlite")
            ? [name]
            : [];
      })
    ),
  ];
}
