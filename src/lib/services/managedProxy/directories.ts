import fs from "node:fs";
import path from "node:path";
import { resolveDataDir } from "@/lib/dataPaths";

/** DATA_DIR is operator-controlled; links beneath that boundary are never trusted. */
export function ensureManagedDirectory(directory: string, trustedRoot = resolveDataDir()): void {
  const base = path.resolve(trustedRoot);
  const relative = path.relative(base, path.resolve(directory));
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative))
    throw new Error("Managed directory must stay inside DATA_DIR");
  fs.mkdirSync(base, { recursive: true, mode: 0o700 });
  if (!fs.statSync(base).isDirectory()) throw new Error("DATA_DIR must be a directory");
  let current = base;
  for (const part of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      const entry = fs.lstatSync(current);
      if (entry.isSymbolicLink() || !entry.isDirectory())
        throw new Error("Managed directory descendants must be directories, not links");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      fs.mkdirSync(current, { mode: 0o700 });
    }
  }
}
