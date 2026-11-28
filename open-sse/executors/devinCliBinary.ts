import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/** The exact command selected by the credentialed Devin executor. */
export function resolveDevinBin(): string {
  const envBin = process.env.CLI_DEVIN_BIN?.trim();
  if (envBin) return envBin;
  const isWin = process.platform === "win32";
  if (isWin) {
    const localAppData = process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local");
    const winPath = path.join(localAppData, "devin", "cli", "bin", "devin.exe");
    if (fs.existsSync(winPath)) return winPath;
  }
  const home = os.homedir();
  for (const candidate of [
    path.join(home, ".local", "share", "devin", "bin", "devin"),
    path.join(home, ".devin", "bin", "devin"),
  ]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return isWin ? "devin.exe" : "devin";
}

let cached: { key: string; until: number; ready: boolean } | undefined;

/** Advisory only: this cannot guarantee a subsequent spawn succeeds. */
export function isDevinBinAvailable(): boolean {
  const bin = resolveDevinBin();
  const searchPath = process.env.PATH ?? "";
  const key = JSON.stringify([bin, searchPath, process.cwd(), process.env.PATHEXT]);
  const now = performance.now();
  if (cached?.key === key && now < cached.until) return cached.ready;
  const hasDirectory = bin.includes("/") || (process.platform === "win32" && bin.includes("\\"));
  const candidates = hasDirectory
    ? [bin]
    : searchPath.split(path.delimiter).map((dir) => path.join(dir || ".", bin));
  // The executor invokes cmd.exe on Windows; limit admission to a literal executable
  // rather than interpreting shell operators or promising .cmd/.bat semantics.
  const ready = candidates.some((candidate) => {
    try {
      return fs.statSync(candidate).isFile() && (fs.accessSync(candidate, fs.constants.X_OK), true);
    } catch {
      return false; // absent, inaccessible, or removed during this advisory check
    }
  });
  cached = { key, until: now + 1000, ready };
  return ready;
}
