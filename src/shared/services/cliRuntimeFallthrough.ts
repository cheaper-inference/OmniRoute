/**
 * #20452 — healthcheck fall-through helpers for cliRuntime.ts.
 *
 * Detection locates ONE candidate and healthchecks only it, so a stale/broken shim
 * (e.g. an old npm `claude.cmd`) hid a working binary later on PATH. These helpers
 * list the OTHER candidates so the caller can retry the healthcheck on each.
 * Extracted from cliRuntime.ts (frozen file-size budget); dependency-injected, no
 * import back into cliRuntime.ts.
 */
import fs from "fs/promises";
import path from "path";

/** Max alternate candidates healthchecked after the primary one fails. */
export const MAX_ALTERNATE_CANDIDATES = 3;

const WIN_EXT = /\.(cmd|exe|bat|com)$/i;

/** Windows: every extension-matching `where.exe` line, in order, de-duplicated. */
export const parseWhereCandidates = (
  stdout: string,
  normalize: (p: string) => string = (p) => p
): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of String(stdout || "").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || !WIN_EXT.test(line)) continue;
    const normalized = normalize(line);
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(normalized);
  }
  return out;
};

/** POSIX: every executable regular file named `command` across PATH dirs, in order. */
export const listPosixPathCandidates = async (
  command: string,
  pathEnv: string
): Promise<string[]> => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const dir of String(pathEnv || "").split(path.delimiter)) {
    if (!dir || !path.isAbsolute(dir)) continue;
    const candidate = path.join(dir, command);
    if (seen.has(candidate)) continue;
    seen.add(candidate);
    try {
      const stat = await fs.stat(candidate);
      if (!stat.isFile()) continue;
      await fs.access(candidate, fs.constants.X_OK);
      out.push(candidate);
    } catch {
      // not present / not executable — skip
    }
  }
  return out;
};

export type HealthcheckResult = { runnable: boolean; reason?: string | null; version?: string };

/**
 * Try the healthcheck on alternate candidates (excluding the already-tried path) and
 * return the first runnable one, or null when none is.
 */
export const findRunnableAlternate = async (
  candidates: string[],
  triedPath: string | null,
  isSafe: (p: string) => boolean,
  check: (p: string) => Promise<HealthcheckResult>
): Promise<{ commandPath: string; healthcheck: HealthcheckResult } | null> => {
  const tried = String(triedPath || "").toLowerCase();
  let attempts = 0;
  for (const candidate of candidates) {
    if (attempts >= MAX_ALTERNATE_CANDIDATES) break;
    if (candidate.toLowerCase() === tried || !isSafe(candidate)) continue;
    attempts++;
    const healthcheck = await check(candidate);
    if (healthcheck.runnable) return { commandPath: candidate, healthcheck };
  }
  return null;
};
