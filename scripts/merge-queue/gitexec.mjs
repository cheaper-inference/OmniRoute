// scripts/merge-queue/gitexec.mjs — the one way omni-queue modules run git.
//
// - Never through a shell (execFile-style argv): PR titles, refs and SHAs are attacker-influenced.
// - Credentials travel in the environment (GIT_CONFIG_COUNT/KEY/VALUE → http extraheader), never
//   in argv or in the remote URL, and every error message is redacted before it is thrown.
// - Synchronous: one tick is a short, sequential script.

import { spawnSync } from "node:child_process";

export class GitError extends Error {
  /** @param {string[]} args @param {number|null} code @param {string} stderr */
  constructor(args, code, stderr) {
    super(`git ${args.join(" ")} failed (exit ${code}): ${stderr.trim().slice(0, 2000)}`);
    this.name = "GitError";
    this.args = args;
    this.code = code;
    this.stderr = stderr;
  }
}

/**
 * Environment that authenticates https://github.com/ requests with an installation token
 * (same header actions/checkout uses). Returns {} when no token is given.
 * @param {string|undefined} token
 */
export function authEnv(token) {
  if (!token) return {};
  const basic = Buffer.from(`x-access-token:${token}`, "utf8").toString("base64");
  return {
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "http.https://github.com/.extraheader",
    GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${basic}`,
  };
}

/**
 * @typedef {object} GitResult
 * @property {number|null} code
 * @property {string} stdout
 * @property {string} stderr
 */

/**
 * @typedef {object} Git
 * @property {string} cwd
 * @property {(args: string[], opts?: {allowFail?: boolean, input?: string, env?: object}) => GitResult} run
 * @property {(args: string[], opts?: {input?: string, env?: object}) => string} out  stdout trimmed; throws GitError
 */

/**
 * @param {{cwd: string, token?: string, env?: object, identity?: {name: string, email: string},
 *          log?: (msg: string) => void}} options
 * @returns {Git}
 */
export function createGit({ cwd, token, env = {}, identity, log = () => {} }) {
  const secrets = token
    ? [token, Buffer.from(`x-access-token:${token}`, "utf8").toString("base64")]
    : [];
  const redact = (text) => secrets.reduce((acc, s) => acc.split(s).join("***"), String(text ?? ""));
  const baseEnv = {
    ...process.env,
    GIT_TERMINAL_PROMPT: "0",
    GIT_CONFIG_NOSYSTEM: "1",
    LC_ALL: "C",
    ...(identity
      ? {
          GIT_AUTHOR_NAME: identity.name,
          GIT_AUTHOR_EMAIL: identity.email,
          GIT_COMMITTER_NAME: identity.name,
          GIT_COMMITTER_EMAIL: identity.email,
        }
      : {}),
    ...authEnv(token),
    ...env,
  };

  function run(args, { allowFail = false, input, env: extra } = {}) {
    const shown = args.map(redact);
    log(`git ${shown.join(" ")}`);
    const res = spawnSync("git", args, {
      cwd,
      env: extra ? { ...baseEnv, ...extra } : baseEnv,
      input,
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
    });
    if (res.error) throw new GitError(shown, null, redact(res.error.message));
    const result = { code: res.status, stdout: res.stdout ?? "", stderr: redact(res.stderr ?? "") };
    if (!allowFail && result.code !== 0) throw new GitError(shown, result.code, result.stderr);
    return result;
  }

  return {
    cwd,
    run,
    out: (args, opts = {}) => run(args, opts).stdout.trim(),
  };
}
