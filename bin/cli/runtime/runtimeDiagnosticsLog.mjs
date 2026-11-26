const LEVELS = { DEBUG: 10, INFO: 20, WARNING: 30, ERROR: 40 };
/** Runtime diagnostics use fixed messages; never pass request data or error objects here. */
export function runtimeDiagnosticsLog(level, message, minimum = "INFO") {
  if (LEVELS[level] >= LEVELS[minimum])
    process.stderr.write(`${new Date().toISOString()} ${level} [diagnostics] ${message}\n`);
}
