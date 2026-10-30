import { createHash, randomUUID } from "node:crypto";

/**
 * Stable device id for a Qoder account.
 *
 * Ported from magpie's `internal/qoder/endpoints.go` → `NewMachineID`: Qoder
 * CN's CLI presents a UUID v4 machine id, and the account keeps working only
 * while that id stays constant. A seeded id is derived deterministically so a
 * connection keeps its machine id across restarts; without a seed we mint a
 * fresh random one.
 */

const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function isQoderMachineId(value: unknown): boolean {
  return typeof value === "string" && UUID_V4_PATTERN.test(value);
}

/**
 * Build a UUID v4. With a seed the id is stable for that seed (sha256 → 16
 * bytes → version/variant bits forced to v4); without one it is random.
 */
export function newQoderMachineId(seed?: string): string {
  if (seed === undefined || seed === "") return randomUUID();

  const bytes = createHash("sha256").update(seed, "utf8").digest().subarray(0, 16);
  // Force RFC 4122 version 4 and the 8/9/a/b variant.
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.toString("hex");
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join("-");
}
