// bin/cli/launch/contract/json.mjs: plain-object check and canonical JSON.
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

import { LaunchError } from "./errors.mjs";

export function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

const UNSERIALIZABLE_TYPES = new Set(["bigint", "function", "symbol"]);

function canonicalScalar(value) {
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new LaunchError("Internal", "Cannot serialize a non-finite number");
  }
  if (UNSERIALIZABLE_TYPES.has(typeof value)) {
    throw new LaunchError("Internal", `Cannot serialize a ${typeof value}`);
  }
  return value;
}

function canonicalObject(value, seen) {
  const out = {};
  for (const key of Object.keys(value).sort()) {
    if (value[key] === undefined) continue;
    out[key] = canonicalize(value[key], seen);
  }
  return out;
}

function canonicalize(value, seen) {
  if (value === null || typeof value !== "object") return canonicalScalar(value);
  if (seen.has(value)) throw new LaunchError("Internal", "Cannot serialize a cyclic value");
  seen.add(value);
  const out = Array.isArray(value)
    ? value.map((entry) => (entry === undefined ? null : canonicalize(entry, seen)))
    : canonicalObject(value, seen);
  seen.delete(value);
  return out;
}

/**
 * Canonical JSON: object keys sorted, `undefined` dropped, non-finite numbers rejected.
 * @param {import("../contract.d.ts").SerializableValue} value
 * @param {{ indent?: number }} [options] indent 0 (default) = compact, else pretty with N spaces
 */
export function json(value, options = {}) {
  const indent = options.indent ?? 0;
  return JSON.stringify(canonicalize(value, new Set()), null, indent > 0 ? indent : undefined);
}
