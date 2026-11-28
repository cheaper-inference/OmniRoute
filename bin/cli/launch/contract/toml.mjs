// bin/cli/launch/contract/toml.mjs: TOML serializers.
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

import { LaunchError } from "./errors.mjs";
import { isPlainObject } from "./json.mjs";

const TOML_BARE_KEY = /^[A-Za-z0-9_-]+$/;

/** TOML basic string (double quoted, escaped). */
export function tomlString(value) {
  let out = '"';
  for (const ch of String(value)) {
    const code = ch.codePointAt(0);
    if (ch === '"') out += '\\"';
    else if (ch === "\\") out += "\\\\";
    else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch === "\t") out += "\\t";
    else if (code < 0x20 || code === 0x7f) out += `\\u${code.toString(16).padStart(4, "0")}`;
    else out += ch;
  }
  return `${out}"`;
}

/** TOML key: dotted path, each segment bare when possible, quoted otherwise. */
export function tomlKey(key) {
  const segments = Array.isArray(key) ? key : String(key).split(".");
  if (segments.length === 0 || segments.some((segment) => String(segment) === "")) {
    throw new LaunchError("Internal", `Invalid TOML key: ${JSON.stringify(key)}`);
  }
  return segments
    .map((segment) => (TOML_BARE_KEY.test(String(segment)) ? String(segment) : tomlString(segment)))
    .join(".");
}

/** TOML scalar or inline array/table value. */
export function tomlValue(value) {
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new LaunchError("Internal", "TOML number must be finite");
    return String(value);
  }
  if (typeof value === "string") return tomlString(value);
  if (Array.isArray(value)) return `[${value.map(tomlValue).join(", ")}]`;
  if (isPlainObject(value)) {
    const entries = Object.keys(value)
      .filter((k) => value[k] !== undefined)
      .map((k) => `${tomlKey([k])} = ${tomlValue(value[k])}`);
    return entries.length === 0 ? "{}" : `{ ${entries.join(", ")} }`;
  }
  throw new LaunchError("Internal", `Unsupported TOML value: ${typeof value}`);
}

/**
 * `key=value` for a codex `-c` flag (launch-codex.mjs tomlAssign): `toml("a.b", "x")` ->
 * `a.b="x"`. The dotted key is split on "." and each segment quoted when not bare.
 */
export function toml(key, value) {
  return `${tomlKey(key)}=${tomlValue(value)}`;
}
export const tomlAssign = toml;
