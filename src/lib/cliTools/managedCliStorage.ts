import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";
import { setTimeout as delay } from "node:timers/promises";
import {
  assertManagedCliPath,
  type ManagedCliDefinition,
  type ManagedCliPointer,
} from "@/shared/services/managedCliRuntime";
import { ManagedCliRuntimeError } from "./managedCliError";

export async function ensureManagedCliDirectories(root: string, toolId: string): Promise<string> {
  await fs.mkdir(root, { recursive: true, mode: 0o700 });
  assertManagedCliPath(root, root);
  const toolDir = path.join(root, toolId);
  await fs.mkdir(toolDir, { recursive: true, mode: 0o700 });
  assertManagedCliPath(root, toolDir);
  if ((await fs.lstat(toolDir)).isSymbolicLink()) throw new Error("Invalid CLI directory");
  const versionsDir = path.join(toolDir, "versions");
  await fs.mkdir(versionsDir, { recursive: true, mode: 0o700 });
  assertManagedCliPath(root, versionsDir);
  if ((await fs.lstat(versionsDir)).isSymbolicLink())
    throw new Error("Invalid CLI versions directory");
  return toolDir;
}

type LockClaim = { owner: string; ticket: bigint | null };
const PROCESS_STARTED_AT = Math.floor(performance.timeOrigin);
const LEGACY_TIMESTAMP_TOLERANCE_MS = 1_000;
const CLAIM_NAME =
  /^(\d+)-(?:(\d{1,16})-)?([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})-(.+)$/;
const LINUX_OWNER_IDENTITY = /^[a-f0-9-]{36}:\d+$/;
let linuxBootId: string | undefined;

function updateInProgress(): ManagedCliRuntimeError {
  return new ManagedCliRuntimeError(
    "update_in_progress",
    "This CLI already has an update in progress. Try again after it finishes.",
    409
  );
}

function ownerIsAlive(pid: number, startedAt?: number, modifiedAt?: number): boolean {
  if (pid === process.pid) {
    // Container restarts commonly reuse PID 1 while retaining DATA_DIR. The
    // process epoch distinguishes even rapid restarts; timestamps are only a
    // conservative fallback for older claims that did not include that epoch.
    if (startedAt !== undefined && startedAt < PROCESS_STARTED_AT) return false;
    if (
      startedAt === undefined &&
      modifiedAt !== undefined &&
      modifiedAt < PROCESS_STARTED_AT - LEGACY_TIMESTAMP_TOLERANCE_MS
    )
      return false;
  }
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code !== "ESRCH";
  }
}

async function readLinuxOwnerIdentity(pid: number): Promise<string | null> {
  if (process.platform !== "linux") return null;
  try {
    linuxBootId ??= (await fs.readFile("/proc/sys/kernel/random/boot_id", "utf8")).trim();
    const stat = await fs.readFile(`/proc/${pid}/stat`, "utf8");
    // Field 22 is the process start in clock ticks. The command can include spaces or parentheses.
    const startTicks = stat.slice(stat.lastIndexOf(")") + 2).split(/\s+/)[19];
    const identity = `${linuxBootId}:${startTicks}`;
    return LINUX_OWNER_IDENTITY.test(identity) ? identity : null;
  } catch {
    return null;
  }
}

async function claimOwnerWasReused(file: string, pid: number): Promise<boolean> {
  if (process.platform !== "linux" || pid === process.pid) return false;
  try {
    const stat = await fs.lstat(file);
    if (!stat.isFile() || stat.size === 0 || stat.size > 128) return false;
    const recorded = await fs.readFile(file, "utf8");
    if (!LINUX_OWNER_IDENTITY.test(recorded)) return false;
    const observed = await readLinuxOwnerIdentity(pid);
    return observed !== null && observed !== recorded;
  } catch {
    // An empty, older, or just-renamed claim still uses the conservative PID check.
    return false;
  }
}

async function respectLegacyOwner(toolDir: string): Promise<void> {
  for (const name of ["update.lock", "update.lock.recovery"]) {
    let pid: unknown;
    let modifiedAt: number | undefined;
    try {
      const file = path.join(toolDir, name);
      const stat = await fs.lstat(file);
      if (stat.isFile() && !stat.isSymbolicLink() && stat.size <= 4096) {
        pid = JSON.parse(await fs.readFile(file, "utf8")).pid;
        modifiedAt = stat.mtimeMs;
      }
    } catch {
      // Incomplete legacy files are not ownership records in the ticket protocol.
    }
    if (
      Number.isSafeInteger(pid) &&
      Number(pid) > 0 &&
      ownerIsAlive(Number(pid), undefined, modifiedAt)
    )
      throw updateInProgress();
  }
}

async function legacyClaimModifiedAt(
  directory: string,
  name: string,
  pid: number,
  startedAt: number | undefined
): Promise<number | undefined> {
  if (pid !== process.pid || startedAt !== undefined) return undefined;
  try {
    return (await fs.lstat(path.join(directory, name))).mtimeMs;
  } catch {
    // A renamed choosing marker remains a blocker for this directory snapshot.
    return undefined;
  }
}

async function readLockClaims(directory: string): Promise<LockClaim[]> {
  const claims: LockClaim[] = [];
  for (const name of await fs.readdir(directory)) {
    const match = CLAIM_NAME.exec(name);
    if (!match) continue;
    const pid = Number(match[1]);
    if (!Number.isSafeInteger(pid) || pid < 1) continue;
    const startedAt = match[2] ? Number(match[2]) : undefined;
    const modifiedAt = await legacyClaimModifiedAt(directory, name, pid, startedAt);
    const claimPath = path.join(directory, name);
    if (!ownerIsAlive(pid, startedAt, modifiedAt) || (await claimOwnerWasReused(claimPath, pid))) {
      // Every claim has a unique name that is never reused by a newer owner.
      await fs.unlink(claimPath).catch(() => {});
      continue;
    }
    // A live choosing marker must remain a blocker even if it was renamed after
    // readdir. Rechecking its old path and ignoring ENOENT would introduce a race.
    claims.push({
      owner: match[3],
      ticket: /^[1-9]\d*$/.test(match[4]) ? BigInt(match[4]) : null,
    });
  }
  return claims;
}

/**
 * Bakery ordering gives server workers exclusive ownership without a mutable
 * recovery sentinel. Atomic claim names carry the PID, process epoch, nonce and phase.
 * Optional Linux claim contents distinguish PID reuse without weakening empty claims.
 */
export async function acquireManagedCliFileLock(toolDir: string): Promise<() => Promise<void>> {
  await respectLegacyOwner(toolDir);
  const directory = path.join(toolDir, "update-locks");
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  assertManagedCliPath(toolDir, directory);
  if ((await fs.lstat(directory)).isSymbolicLink()) throw new Error("Invalid lock directory");
  const owner = randomUUID();
  const claimPrefix = `${process.pid}-${PROCESS_STARTED_AT}-${owner}`;
  const choosing = path.join(directory, `${claimPrefix}-choosing`);
  let ready: string | undefined;
  const release = async () => {
    await Promise.all(
      [choosing, ready].filter(Boolean).map((file) => fs.rm(file!, { force: true }))
    );
  };
  try {
    const identity = await readLinuxOwnerIdentity(process.pid);
    const handle = await fs.open(choosing, "wx", 0o600);
    try {
      if (identity) await handle.writeFile(identity);
    } finally {
      await handle.close();
    }
    const claims = await readLockClaims(directory);
    const ticket =
      claims.reduce((max, claim) => (claim.ticket && claim.ticket > max ? claim.ticket : max), 0n) +
      1n;
    ready = path.join(directory, `${claimPrefix}-${ticket}`);
    await fs.rename(choosing, ready);

    const deadline = Date.now() + 250;
    while (true) {
      const others = (await readLockClaims(directory)).filter((claim) => claim.owner !== owner);
      if (
        others.some(
          (claim) =>
            claim.ticket !== null &&
            (claim.ticket < ticket || (claim.ticket === ticket && claim.owner < owner))
        )
      )
        throw updateInProgress();
      if (!others.some((claim) => claim.ticket === null)) return release;
      if (Date.now() >= deadline) throw updateInProgress();
      await delay(10);
    }
  } catch (error) {
    await release();
    throw error;
  }
}

export async function activateManagedCliPointer(
  root: string,
  definition: ManagedCliDefinition,
  pointer: ManagedCliPointer
): Promise<void> {
  const toolDir = path.join(root, definition.id);
  assertManagedCliPath(root, toolDir);
  const temporary = path.join(toolDir, `.active-${randomUUID()}.json`);
  try {
    const handle = await fs.open(temporary, "wx", 0o600);
    try {
      await handle.writeFile(JSON.stringify(pointer));
      await handle.sync();
    } finally {
      await handle.close();
    }
    await fs.rename(temporary, path.join(toolDir, "active.json"));
  } finally {
    await fs.rm(temporary, { force: true }).catch(() => {});
  }
}
