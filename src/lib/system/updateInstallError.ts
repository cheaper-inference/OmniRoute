/**
 * Error reporting for the npm-mode dashboard "Update" flow.
 *
 * The flow runs `npm install -g omniroute@X` and `npm rebuild better-sqlite3`
 * inside the running server. On Windows the server keeps its own package files
 * open (the native `better_sqlite3.node` is loaded), so npm cannot rename or
 * rewrite them and fails with EBUSY / EPERM. The dashboard used to surface only
 * npm's raw stderr; this turns that specific failure into the recovery steps.
 *
 * The EBUSY/EPERM token lives in npm's stderr or the error message — never in
 * `err.code`, which for a failed child process is the numeric exit code.
 */

const FILE_LOCK_TOKEN = /\b(EBUSY|EPERM)\b/;
const MAX_NPM_LINE_LENGTH = 300;

function errorText(err: unknown): string {
  if (typeof err === "string") return err;
  if (err && typeof err === "object") {
    const { stderr, message } = err as { stderr?: unknown; message?: unknown };
    return [stderr, message].filter((part): part is string => typeof part === "string").join("\n");
  }
  return String(err);
}

/** The raw text the dashboard showed before this module existed (kept for non-lock errors). */
function rawErrorMessage(err: unknown): string {
  if (err && typeof err === "object") {
    const { stderr, message } = err as { stderr?: unknown; message?: unknown };
    if (typeof stderr === "string" && stderr) return stderr;
    if (typeof message === "string" && message) return message;
  }
  return String(err);
}

export function isWindowsFileLockError(err: unknown, platform: NodeJS.Platform): boolean {
  return platform === "win32" && FILE_LOCK_TOKEN.test(errorText(err));
}

function firstLockLine(err: unknown): string {
  const lines = errorText(err)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  // npm prints `code EBUSY` first and the detailed `EBUSY: resource busy or locked, rename
  // '<path>'` last — the last match is the one that names the locked path.
  const matches = lines.filter((candidate) => FILE_LOCK_TOKEN.test(candidate));
  const line = matches[matches.length - 1] ?? lines[0] ?? "";
  return line.slice(0, MAX_NPM_LINE_LENGTH);
}

export function formatUpdateInstallError(
  err: unknown,
  { platform, latest }: { platform: NodeJS.Platform; latest: string }
): string {
  if (!isWindowsFileLockError(err, platform)) return rawErrorMessage(err);

  return [
    "Windows is holding files of the running OmniRoute server, so npm cannot replace the installed package (EBUSY/EPERM).",
    "Stop OmniRoute completely (quit the tray app or terminal, or `pm2 stop omniroute`), then open a new terminal and run:",
    `  npm install -g omniroute@${latest}`,
    "(or `omniroute update --apply`) and start OmniRoute again.",
    `npm said: ${firstLockLine(err)}`,
  ].join("\n");
}
