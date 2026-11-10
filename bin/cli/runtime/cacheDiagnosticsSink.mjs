import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { runtimeDiagnosticsLog } from "./runtimeDiagnosticsLog.mjs";
const MAX_BYTES = 10 * 1024 * 1024;
const FILE = /^cache-[0-9]+-[0-9a-f-]+\.jsonl$/;
/** Atomic startup rotation; a busy or stale lock disables diagnostics instead of blocking inference. */
function openRun(directory) {
  const lock = path.join(directory, ".rotation.lock");
  const lockFd = fs.openSync(lock, "wx", 0o600);
  try {
    const existing = fs
      .readdirSync(directory)
      .filter((name) => FILE.test(name))
      .map((name) => {
        const file = path.join(directory, name),
          stat = fs.lstatSync(file);
        return { file, time: stat.mtimeMs, regular: stat.isFile() && !stat.isSymbolicLink() };
      })
      .filter((row) => row.regular)
      .sort((a, b) => b.time - a.time);
    for (const row of existing.slice(3)) fs.unlinkSync(row.file);
    const file = path.join(directory, `cache-${process.pid}-${randomUUID()}.jsonl`);
    const fd = fs.openSync(file, "wx", 0o600);
    return { file, fd };
  } finally {
    fs.closeSync(lockFd);
    fs.unlinkSync(lock);
  }
}

/** Private unique files, bounded writes/backpressure and at most four retained diagnostic runs. */
export function createCacheDiagnosticsSink(
  dataDir,
  { maxBytes = MAX_BYTES, log = runtimeDiagnosticsLog } = {}
) {
  const directory = path.join(dataDir, "cache-diagnostics");
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  const info = fs.lstatSync(directory);
  if (!info.isDirectory() || info.isSymbolicLink())
    throw new Error("Invalid diagnostics directory");
  const { file, fd } = openRun(directory);
  const stream = fs.createWriteStream(file, { fd, autoClose: true, highWaterMark: 65536 });
  let size = 0,
    blocked = false,
    failed = false,
    ended = false;
  stream.on("error", () => {
    failed = true;
    log("ERROR", "Private diagnostic sink failed");
  });
  stream.on("drain", () => {
    blocked = false;
  });
  return {
    file,
    write(record) {
      if (failed || blocked || ended) return false;
      const line =
        JSON.stringify({ timestamp: new Date().toISOString(), severity: "INFO", ...record }) + "\n";
      const bytes = Buffer.byteLength(line);
      if (size + bytes > maxBytes) return false;
      size += bytes;
      blocked = !stream.write(line);
      return true;
    },
    async close() {
      if (ended) return;
      ended = true;
      if (failed || stream.destroyed) return;
      await new Promise((resolve) => {
        stream.once("error", resolve);
        stream.end(resolve);
      });
    },
  };
}
