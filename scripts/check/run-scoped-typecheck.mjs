import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const FILE_DIAGNOSTIC = /^.+?\(\d+,\d+\): error TS\d+:/;

/** Return complete, baseline-compatible diagnostics; never accept a partial run. */
export function runScopedTypecheck(root, config) {
  // Invoke only this checkout's compiler. npx may download or select an ancestor's
  // dependency, which cannot establish the candidate's toolchain identity.
  const result = spawnSync(
    process.execPath,
    [
      resolve(root, "node_modules/typescript/bin/tsc"),
      "--pretty",
      "false",
      "--noEmit",
      "-p",
      config,
    ],
    { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
  const stdout = result.stdout || "";
  const stderr = result.stderr || "";
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
