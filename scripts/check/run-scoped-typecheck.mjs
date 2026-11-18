import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const FILE_DIAGNOSTIC = /^.+?\(\d+,\d+\): error TS\d+:/;

/**
 * Return complete, baseline-compatible diagnostics; never accept a partial run.
 *
 * `maxOldSpaceSizeMb` raises the compiler's heap for programs large enough to
 * exhaust the default (the whole-app build program needs several GB).
 *
 * `incremental: false` forces a full compile. A gate must not accept a verdict
 * computed from a stale `.tsbuildinfo`: a reuse of someone else's build info can
 * report a clean tree for code that no longer is one.
 */
export function runScopedTypecheck(
  root,
  config,
  { maxOldSpaceSizeMb, incremental = true, listOnly = false } = {}
) {
  // Invoke only this checkout's compiler. npx may download or select an ancestor's
  // dependency, which cannot establish the candidate's toolchain identity.
  const nodeArgs = [];
  if (maxOldSpaceSizeMb) nodeArgs.push(`--max-old-space-size=${maxOldSpaceSizeMb}`);
  nodeArgs.push(
    resolve(root, "node_modules/typescript/bin/tsc"),
    "--pretty",
    "false",
    "--noEmit"
  );
  if (!incremental) nodeArgs.push("--incremental", "false");
  if (listOnly) nodeArgs.push("--listFilesOnly");
  nodeArgs.push("-p", config);
  const result = spawnSync(process.execPath, nodeArgs, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const stdout = result.stdout || "";
  const stderr = result.stderr || "";
  if (listOnly) {
    // The file list is only meaningful from a run that resolved the whole program.
    if (result.error || result.signal || result.status !== 0) {
      throw new Error(
        `TypeScript could not list the program's files ` +
          `(exit=${result.status}, signal=${result.signal || "none"}).\n` +
          [result.error?.message, stderr, stdout].filter(Boolean).join("\n").slice(0, 4000)
      );
    }
    return stdout;
  }
  const errors = stdout.split(/\r?\n/).filter((line) => /\berror TS\d+:/.test(line));
  const complete =
    !result.error &&
    !result.signal &&
    !stderr.trim() &&
    ((result.status === 0 && errors.length === 0) ||
      ((result.status === 1 || result.status === 2) &&
        errors.length > 0 &&
        errors.every((line) => FILE_DIAGNOSTIC.test(line))));
  if (!complete) {
    throw new Error(
      `TypeScript did not produce a complete baseline-compatible result ` +
        `(exit=${result.status}, signal=${result.signal || "none"}).\n` +
        [result.error?.message, stderr, stdout].filter(Boolean).join("\n").slice(0, 4000)
    );
  }
  return stdout;
}
