import { loadSqliteRuntime } from "./sqliteRuntime.mjs";

let warmed = false;

/**
 * Pre-resolves native runtimes at startup so the first DB access is fast
 * and EBUSY-resilient on Windows.
 *
 * Tray runtime (systray2) is warmed lazily by initTray() in bin/cli/tray/.
 *
 * #21001: this is also the postinstall warm-up entry point (scripts/postinstall.mjs),
 * so it must NEVER install: allowInstall:false keeps `npm install` of OmniRoute
 * off the network and on the locked, already-installed drivers only.
 */
export async function warmUpRuntimes() {
  if (warmed) return;
  warmed = true;
  try {
    await loadSqliteRuntime({ allowInstall: false });
  } catch {}
}

export { loadSqliteRuntime };
