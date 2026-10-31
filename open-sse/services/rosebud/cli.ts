import { spawn } from "node:child_process";
import { mkdir, realpath } from "node:fs/promises";
import { resolve, join, isAbsolute, relative } from "node:path";
import { homedir } from "node:os";

export type JsonObject = Record<string, unknown>;
export class RosebudError extends Error {
  jobId?: string;
  constructor(
    public code: string,
    public status: number,
    public uncertain = false
  ) {
    super(`Rosebud: ${code}`);
  }
}
export function rosebudRoot() {
  return resolve(
    process.env.ROSEBUD_DATA_DIR ||
      join(process.env.DATA_DIR || join(homedir(), ".omniroute"), "rosebud")
  );
}
export async function rosebudProfile(profile: string) {
  if (!/^[a-zA-Z0-9_-]{1,80}$/.test(profile)) throw new RosebudError("invalid_profile", 400);
  const root = rosebudRoot();
  await mkdir(root, { recursive: true, mode: 0o700 });
  const folder = join(root, "accounts", profile);
  await mkdir(folder, { recursive: true, mode: 0o700 });
  const actual = await realpath(folder);
  const rel = relative(await realpath(root), actual);
  if (rel.startsWith("..") || isAbsolute(rel)) throw new RosebudError("unsafe_profile", 400);
  return actual;
}
export type RosebudRunner = (
  profile: string,
  args: string[],
  timeoutMs?: number
) => Promise<JsonObject>;

// The CLI briefly locks its credentials even for reads. Serialize commands for
// one profile while allowing different accounts to use the process pool.
const PROFILE_QUEUES = Symbol.for("omniroute.rosebud.profileQueues");
type ProfileQueues = Map<string, { tail: Promise<void>; count: number }>;
const processState = globalThis as typeof globalThis & { [PROFILE_QUEUES]?: ProfileQueues };
const profileQueues = (processState[PROFILE_QUEUES] ??= new Map());
async function acquireProfileSlot(profile: string) {
  const previous = profileQueues.get(profile);
  if ((previous?.count || 0) >= 128) throw new RosebudError("queue_full", 429);
  let release!: () => void;
  const tail = new Promise<void>((resolve) => {
    release = resolve;
  });
  const entry = { tail, count: (previous?.count || 0) + 1 };
  profileQueues.set(profile, entry);
  await previous?.tail;
  return () => {
    release();
    const latest = profileQueues.get(profile);
    if (latest) latest.count--;
    if (latest === entry) profileQueues.delete(profile);
  };
}

let activeProcesses = 0;
const processWaiters: Array<() => void> = [];
async function acquireProcessSlot() {
  const configured = Number(process.env.ROSEBUD_CONCURRENCY || 2);
  const limit = Number.isInteger(configured) && configured > 0 && configured <= 32 ? configured : 2;
  if (activeProcesses >= limit) {
    if (processWaiters.length >= 128) throw new RosebudError("queue_full", 429);
    await new Promise<void>((resolve) => processWaiters.push(resolve));
  } else activeProcesses++;
}
function releaseProcessSlot() {
  const next = processWaiters.shift();
  if (next) next();
  else activeProcesses--;
}

/** No shell, inherited provider keys, user-selected executable or public stderr. */
export const runRosebud: RosebudRunner = async (profile, args, timeoutMs = 120000) => {
  const folder = await rosebudProfile(profile);
  const env: NodeJS.ProcessEnv = {
    PATH: process.env.PATH,
    HOME: folder,
    USERPROFILE: folder,
    SYSTEMROOT: process.env.SYSTEMROOT,
    TMPDIR: process.env.TMPDIR,
    TEMP: process.env.TEMP,
    ROSEBUD_CREDENTIALS_DIR: folder,
  };
  const bin = process.env.ROSEBUD_CLI_SCRIPT
    ? process.execPath
    : process.env.ROSEBUD_CLI_BIN || "rosebud";
  const argv = process.env.ROSEBUD_CLI_SCRIPT ? [process.env.ROSEBUD_CLI_SCRIPT, ...args] : args;
  const releaseProfile = await acquireProfileSlot(profile);
  try {
    await acquireProcessSlot();
  } catch (error) {
    releaseProfile();
    throw error;
  }
  return new Promise<JsonObject>((accept, reject) => {
    const child = spawn(bin, argv, {
      shell: false,
      windowsHide: true,
      env,
      cwd: folder,
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    let stdout = "",
      stderr = "",
      exceeded = false;
    let killTimer: ReturnType<typeof setTimeout> | undefined;
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      killTimer = setTimeout(() => child.kill("SIGKILL"), 5000);
    }, timeoutMs);
    const collect = (chunk: string, error: boolean) => {
      if (stdout.length + stderr.length + chunk.length > 8 * 1024 * 1024) {
        exceeded = true;
        child.kill("SIGTERM");
        return;
      }
      if (error) stderr += chunk.toString();
      else stdout += chunk.toString();
    };
    child.stdout.on("data", (chunk) => collect(chunk, false));
    child.stderr.on("data", (chunk) => collect(chunk, true));
    child.on("error", () => {
      clearTimeout(timer);
      reject(new RosebudError("cli_unavailable", 503));
    });
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      if (killTimer) clearTimeout(killTimer);
      let result: JsonObject;
      try {
        result = JSON.parse(code === 0 ? stdout : stderr);
      } catch {
        reject(new RosebudError(exceeded ? "output_too_large" : "invalid_cli_response", 502, true));
        return;
      }
      if (code === 0 && !signal) {
        accept(result);
        return;
      }
      const error =
        result.error && typeof result.error === "object" ? (result.error as JsonObject) : result;
      const name =
        typeof error.code === "string" && /^[a-z_]{1,80}$/.test(error.code)
          ? error.code
          : "cli_failed";
      reject(
        new RosebudError(
          name,
          name === "insufficient_credits"
            ? 402
            : ["invalid_key", "key_expired", "key_revoked", "login_required"].includes(name)
              ? 401
              : name === "throttled"
                ? 429
                : 502,
          code === 4 ||
            code === 130 ||
            code === 143 ||
            Boolean(signal) ||
            error.outcome === "unknown"
        )
      );
    });
  }).finally(() => {
    releaseProcessSlot();
    releaseProfile();
  });
};
