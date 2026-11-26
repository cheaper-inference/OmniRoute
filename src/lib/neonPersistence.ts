import { spawn } from "node:child_process";
import path from "node:path";

const SCRIPT = path.join(process.cwd(), "scripts", "neon", "persistence.mjs");
const ENABLED =
  process.env.OMNIROUTE_NEON_PERSISTENCE !== "0" && Boolean(process.env.DATABASE_URL?.trim());
const INTERVAL_MS = Math.max(
  60_000,
  Number(process.env.OMNIROUTE_NEON_SNAPSHOT_INTERVAL_MS || 300_000)
);

let timer: NodeJS.Timeout | undefined;
let snapshotInFlight = false;

function run(command: "restore" | "snapshot"): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [SCRIPT, command], {
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) {
        if (stdout.trim()) console.log(stdout.trim());
        resolve();
        return;
      }
      reject(new Error(stderr.trim() || `Neon persistence helper exited with ${signal || code}`));
    });
  });
}

export function isNeonPersistenceEnabled(): boolean {
  return ENABLED;
}

export async function restoreNeonPersistenceIfNeeded(): Promise<boolean> {
  if (!ENABLED) return false;
  await run("restore");
  return true;
}

export function startNeonPersistence(): boolean {
  if (!ENABLED || timer) return false;

  timer = setInterval(() => {
    if (snapshotInFlight) return;
    snapshotInFlight = true;
    void run("snapshot")
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[NEON] scheduled snapshot failed (non-fatal): ${message}`);
      })
      .finally(() => {
        snapshotInFlight = false;
      });
  }, INTERVAL_MS);
  timer.unref?.();

  void run("snapshot").catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[NEON] initial snapshot failed (non-fatal): ${message}`);
  });

  console.log(`[NEON] SQLite durability enabled; snapshot interval ${INTERVAL_MS}ms`);
  return true;
}

export async function stopNeonPersistence(): Promise<void> {
  if (timer) clearInterval(timer);
  timer = undefined;
  if (!ENABLED || snapshotInFlight) return;
  snapshotInFlight = true;
  try {
    await run("snapshot");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[NEON] final snapshot failed: ${message}`);
  } finally {
    snapshotInFlight = false;
  }
}
