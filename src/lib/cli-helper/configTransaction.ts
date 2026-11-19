import fs from "fs/promises";

// `mode` is for secrets: an existing file is narrowed to it before the write, a new file is created with it.
type PlannedWrite = { path: string; content: string; mode?: number };
type DoneWrite = { path: string; before: string | null; wrote: string };

/** Put back the files already written, newest first. Skip a file another writer changed since. */
async function rollback(done: DoneWrite[]): Promise<void> {
  for (const { path, before, wrote } of done.reverse()) {
    try {
      if ((await fs.readFile(path, "utf8")) !== wrote) continue;
      if (before === null) await fs.unlink(path);
      else await fs.writeFile(path, before);
    } catch {
      // Best effort: the original write error is the one the caller must see.
    }
  }
}

/**
 * Write files in order. When a write fails, restore the files already written (in reverse
 * order) and rethrow the original error. Same fs.writeFile call as a plain write (plus the optional
 * mode), so nothing changes when every write succeeds.
 * shortcut: a crash between two writes is not covered (no journal on disk); upgrade if needed.
 */
export async function writeFilesWithRollback(writes: PlannedWrite[]): Promise<void> {
  const done: DoneWrite[] = [];
  for (const { path, content, mode } of writes) {
    try {
      let before: string | null = null;
      try {
        before = await fs.readFile(path, "utf8");
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      if (mode !== undefined) {
        // Narrow an existing file BEFORE the secret goes in; a new file is created with the mode.
        await fs.chmod(path, mode).catch((error: NodeJS.ErrnoException) => {
          if (error.code !== "ENOENT") throw error;
        });
      }
      await fs.writeFile(path, content, mode === undefined ? undefined : { mode });
      done.push({ path, before, wrote: content });
    } catch (error) {
      await rollback(done);
      throw error;
    }
  }
}
