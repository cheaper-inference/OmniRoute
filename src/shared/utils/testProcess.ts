/**
 * "Am I running under an automated test runner?" — one answer, one place.
 *
 * Only runner environment signals, the exact native --test execution flag, and the entry script's
 * basename count. Directory names and application arguments are not evidence: both `latest` and
 * explicit `test` path segments occur in production installs. Misclassifying those processes
 * silently disables SQLite backups, migrations, cloud sync and health checks.
 *
 * argv, env and execArgv are separate parameters so tests can exercise production invocations
 * without inheriting the runner's own signals. Only argv[1] identifies the entry script;
 * execArgv contains Node options, not application arguments after the script.
 */
const TEST_FILE_RE = /\.(test|spec)\.[^./\\]+$/i;
const TEST_RUNNER_RE = /^(vitest|jest|mocha|ava|tap)(\.[cm]?js)?$/i;

function isTestEntry(argv: readonly string[]): boolean {
  if (!Array.isArray(argv) || typeof argv[1] !== "string") return false;
  const entry = argv[1].split(/[\\/]/).pop() ?? "";
  return TEST_FILE_RE.test(entry) || TEST_RUNNER_RE.test(entry);
}

export function isAutomatedTestProcess(
  argv: readonly string[] = typeof process !== "undefined" ? process.argv : [],
  env: NodeJS.ProcessEnv = typeof process !== "undefined" ? process.env : ({} as NodeJS.ProcessEnv),
  execArgv: readonly string[] = typeof process !== "undefined" ? process.execArgv : []
): boolean {
  if (env.NODE_ENV === "test") return true;
  if (env.VITEST !== undefined) return true;
  if (env.NODE_TEST_CONTEXT?.startsWith("child")) return true;
  if (env.JEST_WORKER_ID !== undefined) return true;
  if (Array.isArray(execArgv) && execArgv.includes("--test")) return true;
  // Malformed caller input must not crash the production subsystems this check protects.
  return isTestEntry(argv);
}

/** Next.js production build phase — several call sites pair this with the test check. */
export function isBuildProcess(env: NodeJS.ProcessEnv = process.env): boolean {
  return typeof process !== "undefined" && env.NEXT_PHASE === "phase-production-build";
}
