import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function canonical(p) {
  let resolved = path.resolve(p);
  try {
    resolved = fs.realpathSync.native(resolved);
  } catch {
    // Missing target: fall back to the lexically resolved path.
  }
  return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

/**
 * Entry-point guard that survives symlinked paths. Node resolves ES modules
 * through their realpath, so `import.meta.url` never contains a symlink while
 * `process.argv[1]` keeps the path as typed. Compare both canonicalised.
 *
 * Usage: `if (isMainModule(import.meta.url)) main();`
 */
export function isMainModule(moduleUrl, argv1 = process.argv[1]) {
  if (!argv1 || !moduleUrl) return false;
  try {
    return canonical(fileURLToPath(moduleUrl)) === canonical(argv1);
  } catch {
    return false;
  }
}
