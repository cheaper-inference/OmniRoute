// bin/cli/launch/contract/data.mjs: pure data helpers (merge, freeze, argv flags, view rows).
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

import { isPlainObject } from "./json.mjs";

/** @typedef {import("../contract.d.ts").LaunchContext} LaunchContext */

// ---------- pure data helpers ----------

/**
 * Deep merge for JSON-like data: plain objects merge recursively, everything else (arrays
 * included) is replaced by `override`. Inputs are not mutated.
 */
export function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return clone(override === undefined ? base : override);
  }
  const out = clone(base);
  for (const key of Object.keys(override)) mergeKey(out, key, override[key]);
  return out;
}

/** Merge one override entry into `out` (a fresh clone, so mutating it is safe). */
function mergeKey(out, key, value) {
  if (value === undefined) return;
  out[key] = key in out ? deepMerge(out[key], value) : clone(value);
}

function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (isPlainObject(value)) {
    const out = {};
    for (const key of Object.keys(value)) out[key] = clone(value[key]);
    return out;
  }
  return value;
}

/** Recursively freeze plain objects and arrays; returns the same value. */
export function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value)) deepFreeze(value[key]);
  }
  return value;
}

/**
 * Find the first occurrence of any of `names` in argv, supporting `--flag value`, `--flag=value`
 * and stopping at a bare `--`. Returns `{ index, flag, value }` or `null`.
 * @param {ReadonlyArray<string>} args
 * @param {string | string[]} names e.g. ["-m", "--model"]
 * @param {{ takesValue?: boolean }} [options] default true
 */
export function findFlag(args, names, options = {}) {
  const takesValue = options.takesValue !== false;
  const wanted = Array.isArray(names) ? names : [names];
  for (let i = 0; i < args.length; i++) {
    if (String(args[i]) === "--") return null;
    const match = matchFlagAt(args, i, wanted, takesValue);
    if (match) return match;
  }
  return null;
}

/** First of `wanted` that argv[i] spells, as a findFlag result, else null. */
function matchFlagAt(args, i, wanted, takesValue) {
  for (const name of wanted) {
    const match = matchFlag(args, i, name, takesValue);
    if (match) return match;
  }
  return null;
}

function matchFlag(args, i, name, takesValue) {
  const arg = String(args[i]);
  if (arg === name) return { index: i, flag: name, value: takesValue ? args[i + 1] : undefined };
  if (!takesValue || !name.startsWith("--") || !arg.startsWith(`${name}=`)) return null;
  return { index: i, flag: name, value: arg.slice(name.length + 1) };
}

/** True when the user already passed one of `names` (skip-ours rule: qwen, pi, opencode). */
export function hasFlag(args, names, options) {
  return findFlag(args, names, options) !== null;
}

/** Row id -> display label fallback. */
export function rowLabel(row) {
  return row && typeof row.label === "string" && row.label !== "" ? row.label : row?.id;
}

/**
 * The rows an inject adapter writes: `ctx.view.rows` cut by `injectLimit`, never re-filtered
 * (boundary invariant).
 * @param {LaunchContext} ctx
 * @param {number} [injectLimit]
 */
export function injectRows(ctx, injectLimit) {
  const rows = ctx.view.rows;
  return typeof injectLimit === "number" && injectLimit >= 0
    ? rows.slice(0, injectLimit)
    : rows.slice();
}
