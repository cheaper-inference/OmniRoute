import { createLogger } from "@/shared/utils/logger.ts";
import type { StopDnsDeps } from "./stopDnsTeardown.ts";

const log = createLogger("mitm-manager");

export type UnexpectedExitDeps = StopDnsDeps & {
  getCachedPassword: () => string | null;
  /** Whether privileged hosts edits can run with this password (root/NOPASSWD/Windows need none). */
  canRunPrivileged: (sudoPassword: string) => boolean;
};

/**
 * Revert the `/etc/hosts` entries after the MITM child died on its own, after a
 * successful start (crash, OOM kill, external `kill`). Without this, the target
 * hostnames keep resolving to `127.0.0.1` with nothing listening, so they fail
 * machine-wide with `ECONNREFUSED`.
 *
 * Runs inside a child `exit` handler, so it never prompts: it only uses the
 * sudo password already cached for this session, or none when the host does not
 * need one. Returns `true` when the entries were reverted, `false` when the
 * caller must flag orphaned state so the dashboard offers Repair. Never throws.
 */
export async function revertHostsAfterUnexpectedExit(
  deps: UnexpectedExitDeps,
  exitCode: number | null
): Promise<boolean> {
  const sudoPassword = deps.getCachedPassword() ?? "";
  try {
    if (!deps.canRunPrivileged(sudoPassword)) {
      log.warn(
        { exitCode },
        "MITM server exited unexpectedly — no cached sudo password; run Repair to clean /etc/hosts."
      );
      return false;
    }
    await deps.removeDNSEntry(sudoPassword);
    const managed = deps.collectManagedHosts();
    if (managed.length > 0) {
      await deps.removeDNSEntries(managed, sudoPassword);
    }
    log.info({ exitCode }, "MITM server exited unexpectedly — /etc/hosts entries reverted.");
    return true;
  } catch (err) {
    log.error(
      { err, exitCode },
      "MITM server exited unexpectedly — hosts cleanup failed; run Repair to clean /etc/hosts."
    );
    return false;
  }
}

/**
 * Orphaned state as reported by `getMitmStatus()`: either the sticky flag set by
 * a teardown that could not run, or hosts entries still spoofed while no MITM
 * server is listening (and no start is in flight, which provisions DNS before it
 * spawns the server).
 */
export function deriveOrphanedState(input: {
  flagged: boolean;
  running: boolean;
  dnsConfigured: boolean;
  starting: boolean;
}): boolean {
  return input.flagged || (input.dnsConfigured && !input.running && !input.starting);
}
