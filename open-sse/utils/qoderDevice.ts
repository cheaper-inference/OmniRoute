import { randomUUID } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let cachedMachineId: string | null = null;

/**
 * Reset machine id cache (useful for isolated unit tests).
 */
export function resetQoderMachineIdCache(): void {
  cachedMachineId = null;
}

/**
 * Resolve a persistent machine ID for Qoder device authentication and token refresh.
 *
 * Precedence:
 * 1. process.env.QODER_MACHINE_ID
 * 2. Host ~/.qoder/.auth/machine_id (if existing Qoder CLI installed)
 * 3. Stored ~/.omniroute/oauth/qoder-machine-id (DATA_DIR)
 * 4. Fresh randomUUID persisted to dataDir
 */
export function getQoderMachineId(): string {
  if (cachedMachineId) return cachedMachineId;

  const envId = process.env.QODER_MACHINE_ID?.trim();
  if (envId) {
    cachedMachineId = envId;
    return cachedMachineId;
  }

  // 1. Try reading the local Qoder CLI machine_id if installed on the host
  try {
    const home = os.homedir();
    const qoderCliMachinePath = path.join(home, ".qoder", ".auth", "machine_id");
    if (fs.existsSync(qoderCliMachinePath)) {
      const id = fs.readFileSync(qoderCliMachinePath, "utf8").trim();
      if (id && id.length > 8) {
        cachedMachineId = id;
        return id;
      }
    }
  } catch {
    // Ignore and proceed to next strategy
  }

  // 2. Try reading from DATA_DIR/oauth/qoder-machine-id
  try {
    const dataDir = process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");
    const oauthDir = path.join(dataDir, "oauth");
    const storedPath = path.join(oauthDir, "qoder-machine-id");
    if (fs.existsSync(storedPath)) {
      const id = fs.readFileSync(storedPath, "utf8").trim();
      if (id && id.length > 8) {
        cachedMachineId = id;
        return id;
      }
    }

    fs.mkdirSync(oauthDir, { recursive: true });
    const generated = randomUUID();
    fs.writeFileSync(storedPath, generated, "utf8");
    cachedMachineId = generated;
    return generated;
  } catch {
    // 3. Fallback to in-memory UUID
    const generated = randomUUID();
    cachedMachineId = generated;
    return generated;
  }
}
