/**
 * Next.js `experimental` overrides applied only to macOS development (#17955).
 *
 * - `useTypeScriptCli: false` — Next's TypeScript CLI subprocess can fail with
 *   `spawn EBADF` during macOS dev startup. TypeScript 6 exposes the API Next
 *   uses to read the same tsconfig in-process.
 * - `workerThreads: true` — Next's development static-path worker can hit the
 *   same spawn failure; its experimental thread worker avoids the child process.
 *
 * Production, Docker and every other platform keep the Next defaults.
 */
export function macosDevExperimentalOverrides({
  platform = process.platform,
  nodeEnv = process.env.NODE_ENV,
} = {}) {
  if (platform === "darwin" && nodeEnv === "development") {
    return { useTypeScriptCli: false, workerThreads: true };
  }
  return {};
}
