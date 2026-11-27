// bin/cli/launch/contract/assets.mjs: launcher asset paths and ${ASSET:...} tokens (contract 1.1).
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

import { LaunchError } from "./errors.mjs";

// ---------- launcher assets (contract 1.1) ----------

/**
 * Repo-relative directory holding static assets adapters may reference (codex base
 * instructions, pi/omp extension templates). Core resolves every asset path against it; adapters
 * never read files themselves (boundary rule).
 *
 * Two ways to use an asset, both on a TempFileSpec:
 * - `asset: "<relpath>"` (no `contents`): core copies the asset verbatim to `path`.
 * - `contents` containing `assetRef(relpath)` / `assetRef(relpath, { json: true })` tokens:
 *   core replaces each token with the asset text (raw, or `JSON.stringify(text)`). Asset
 *   expansion runs AFTER ${TMP}/${STATE}/${TOKEN} substitution, so asset text is never
 *   placeholder-expanded. `expandAssetRefs` is the shared pure implementation.
 */
export const ASSET_ROOT = "bin/cli/launch/assets";

const ASSET_PATH = /^[A-Za-z0-9_][A-Za-z0-9._-]*(?:\/[A-Za-z0-9_][A-Za-z0-9._-]*)*$/;
const ASSET_TOKEN = /\$\{ASSET:([A-Za-z0-9._/-]+?)(:json)?\}/g;

/**
 * Validate an asset path: relative to ASSET_ROOT, forward slashes only, no empty, "." or ".."
 * segment, no absolute or drive path, characters [A-Za-z0-9._-] per segment, no leading dot.
 * Returns the path; throws LaunchError("Internal") otherwise.
 * @param {string} relpath e.g. "codex/base-instructions.md"
 */
export function validateAssetPath(relpath) {
  const s = typeof relpath === "string" ? relpath : "";
  const segments = s.split("/");
  if (!ASSET_PATH.test(s) || segments.some((segment) => segment === "." || segment === "..")) {
    throw new LaunchError("Internal", `Invalid asset path: ${JSON.stringify(relpath)}`);
  }
  return s;
}

/**
 * Token for an asset inside TempFileSpec.contents.
 * @param {string} relpath validated with validateAssetPath
 * @param {{ json?: boolean }} [options] json: insert as a JSON string literal (quotes included)
 */
export function assetRef(relpath, options = {}) {
  return `\${ASSET:${validateAssetPath(relpath)}${options.json ? ":json" : ""}}`;
}

/**
 * Every asset token in `contents`, in order: `{ token, path, json }`.
 * @param {string | undefined} contents
 */
export function findAssetRefs(contents) {
  const refs = [];
  for (const match of String(contents ?? "").matchAll(ASSET_TOKEN)) {
    refs.push({ token: match[0], path: match[1], json: match[2] === ":json" });
  }
  return refs;
}

/**
 * Replace every asset token in `contents` using `readAsset(relpath) -> string` (core supplies the
 * I/O). Pure given a pure reader. Invalid paths throw before readAsset is called.
 * @param {string} contents
 * @param {(relpath: string) => string} readAsset
 */
export function expandAssetRefs(contents, readAsset) {
  return String(contents).replace(ASSET_TOKEN, (_token, path, json) => {
    const text = String(readAsset(validateAssetPath(path)));
    return json === ":json" ? JSON.stringify(text) : text;
  });
}
