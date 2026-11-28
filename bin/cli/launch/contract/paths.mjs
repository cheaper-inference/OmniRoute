// bin/cli/launch/contract/paths.mjs: URL helpers and ${TMP} / ${STATE} path placeholders.
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

import { PLACEHOLDERS } from "./constants.mjs";
import { LaunchError } from "./errors.mjs";

// ---------- URL helpers ----------

/** Remove every trailing "/" (no regex, so no ReDoS surface). */
export function stripTrailingSlash(value) {
  const s = String(value ?? "");
  let end = s.length;
  while (end > 0 && s.charCodeAt(end - 1) === 47) end--;
  return end === s.length ? s : s.slice(0, end);
}

/** Root URL -> ".../v1" exactly once (run.mjs ensureV1BaseUrl). */
export function ensureV1(rootUrl) {
  const normalized = stripTrailingSlash(rootUrl);
  return normalized.endsWith("/v1") ? normalized : `${normalized}/v1`;
}

// ---------- path placeholders ----------

function assertRelativePath(name) {
  const s = String(name ?? "");
  if (s === "" || s.startsWith("/") || s.startsWith("\\") || /^[A-Za-z]:/.test(s)) {
    throw new LaunchError("Internal", `Temp path must be relative: ${JSON.stringify(s)}`);
  }
  const parts = s.split(/[\\/]/);
  if (parts.some((part) => part === ".." || part === "")) {
    throw new LaunchError("Internal", `Temp path must not contain "..": ${JSON.stringify(s)}`);
  }
  return parts.join("/");
}

/** "${TMP}/<name>", removed after exit. `name` is relative, may contain subdirs. */
export function tempPath(name) {
  return `${PLACEHOLDERS.TMP}/${assertRelativePath(name)}`;
}

/** "${STATE}/<name>": DATA_DIR/launch/<tool>/<cwdHash>/, kept across launches. */
export function statePath(name) {
  return `${PLACEHOLDERS.STATE}/${assertRelativePath(name)}`;
}
