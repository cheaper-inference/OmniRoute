import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { runtimeDiagnosticsLog } from "./runtimeDiagnosticsLog.mjs";
const MAX_BYTES = 10 * 1024 * 1024;
const FILE = /^cache-[0-9]+-[0-9a-f-]+\.jsonl$/;
/** Only an explicit, matching closed-run lease proves that a writer relinquished this file.
 * Never infer ownership or death from a PID or an old mtime: both can be reused. */
function closedRun(directory, name) {
  const file = path.join(directory, name),
    marker = file + ".closed";
  try {
    if (fs.existsSync(file + ".active")) return null;
    const stat = fs.lstatSync(file),
      leaseStat = fs.lstatSync(marker);
    if (
      !stat.isFile() ||
      stat.isSymbolicLink() ||
      !leaseStat.isFile() ||
      leaseStat.isSymbolicLink() ||
      leaseStat.size > 512
    )
      return null;
    const lease = JSON.parse(fs.readFileSync(marker, "utf8"));
    if (
      lease.version !== 1 ||
      lease.file !== name ||
      typeof lease.run !== "string" ||
      name !== `cache-${lease.pid}-${lease.run}.jsonl`
    )
      return null;
    return { file, marker, time: leaseStat.mtimeMs };
  } catch {
    return null;
  }
}

function withRotationLock(directory, work) {
  const lock = path.join(directory, ".rotation.lock");
  const lockFd = fs.openSync(lock, "wx", 0o600);
  try {
    return work();
  } finally {
    fs.closeSync(lockFd);
    fs.unlinkSync(lock);
  }
}

function rotateClosedRuns(directory) {
  const closed = fs
    .readdirSync(directory)
    .filter((name) => FILE.test(name))
    .map((name) => closedRun(directory, name))
    .filter(Boolean)
    .sort((a, b) => b.time - a.time);
  for (const row of closed.slice(4)) {
    fs.unlinkSync(row.file);
    fs.unlinkSync(row.marker);
  }
}

/** Busy/stale locks fail open for inference; active and unknown runs are never rotated. */
function openRun(directory) {
  return withRotationLock(directory, () => {
    rotateClosedRuns(directory);
    const run = randomUUID(),
      name = `cache-${process.pid}-${run}.jsonl`;
    const file = path.join(directory, name),
      active = file + ".active";
    const fd = fs.openSync(file, "wx", 0o600);
    try {
      fs.writeFileSync(active, JSON.stringify({ version: 1, file: name, run, pid: process.pid }), {
        flag: "wx",
        mode: 0o600,
      });
    } catch (error) {
      fs.closeSync(fd);
      fs.unlinkSync(file);
      throw error;
    }
    return { file, fd, active };
  });
}

/** Private bounded files; four closed runs plus all active/unknown runs (10 MiB each). */
export function createCacheDiagnosticsSink(
  dataDir,
  { maxBytes = MAX_BYTES, log = runtimeDiagnosticsLog } = {}
) {
  const directory = path.join(dataDir, "cache-diagnostics");
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  const info = fs.lstatSync(directory);
  if (!info.isDirectory() || info.isSymbolicLink())
    throw new Error("Invalid diagnostics directory");
  const { file, fd, active } = openRun(directory);
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
      if (!stream.closed)
        await new Promise((resolve) => {
          stream.once("close", resolve);
          if (!stream.destroyed) stream.end();
        });
      try {
        fs.renameSync(active, file + ".closed");
        withRotationLock(directory, () => rotateClosedRuns(directory));
      } catch {
        log("WARNING", "Closed diagnostic run retention deferred");
      }
    },
  };
}
