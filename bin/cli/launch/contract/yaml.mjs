// bin/cli/launch/contract/yaml.mjs: block YAML and dotenv serializers.
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

import { LaunchError } from "./errors.mjs";
import { isPlainObject } from "./json.mjs";

const YAML_PLAIN_SAFE = /^[A-Za-z_][A-Za-z0-9_./-]*$/;
const YAML_RESERVED = new Set(["true", "false", "yes", "no", "on", "off", "null", "y", "n", "~"]);

function yamlScalar(value) {
  if (value === null) return "null";
  if (typeof value === "boolean") return String(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new LaunchError("Internal", "YAML number must be finite");
    return String(value);
  }
  const s = String(value);
  if (YAML_PLAIN_SAFE.test(s) && !YAML_RESERVED.has(s.toLowerCase())) return s;
  return JSON.stringify(s); // JSON strings are valid YAML double-quoted scalars
}

function yamlKey(key) {
  return yamlScalar(String(key));
}

/** A non-empty object or array: written as a nested block, not inline. */
function isBlock(entry) {
  if (Array.isArray(entry)) return entry.length > 0;
  return isPlainObject(entry) && Object.keys(entry).length > 0;
}

function yamlArrayItem(entry, indent) {
  const pad = " ".repeat(indent);
  if (!isBlock(entry)) return [`${pad}- ${yamlInline(entry)}`];
  const nested = yamlLines(entry, indent + 2);
  return [`${pad}- ${nested[0].slice(indent + 2)}`, ...nested.slice(1)];
}

function yamlObjectEntry(key, entry, indent) {
  const head = `${" ".repeat(indent)}${yamlKey(key)}:`;
  return isBlock(entry)
    ? [head, ...yamlLines(entry, indent + 2)]
    : [`${head} ${yamlInline(entry)}`];
}

function yamlArrayLines(value, indent) {
  if (value.length === 0) return [`${" ".repeat(indent)}[]`];
  return value.flatMap((entry) => yamlArrayItem(entry, indent));
}

function yamlObjectLines(value, indent) {
  const keys = Object.keys(value).filter((k) => value[k] !== undefined);
  if (keys.length === 0) return [`${" ".repeat(indent)}{}`];
  return keys.flatMap((key) => yamlObjectEntry(key, value[key], indent));
}

function yamlLines(value, indent) {
  if (Array.isArray(value)) return yamlArrayLines(value, indent);
  if (isPlainObject(value)) return yamlObjectLines(value, indent);
  return [`${" ".repeat(indent)}${yamlScalar(value)}`];
}

function yamlInline(value) {
  if (Array.isArray(value)) return "[]";
  if (isPlainObject(value)) return "{}";
  if (value === undefined) return "null";
  if (typeof value === "function" || typeof value === "symbol" || typeof value === "bigint") {
    throw new LaunchError("Internal", `Cannot serialize a ${typeof value} to YAML`);
  }
  return yamlScalar(value);
}

/**
 * Safe block YAML: keys in insertion order (callers control order for readability), strings
 * double-quoted unless plainly safe, `undefined` keys dropped. Ends with a newline.
 */
export function yaml(value) {
  return `${yamlLines(value, 0).join("\n")}\n`;
}

const DOTENV_KEY = /^[A-Za-z_][A-Za-z0-9_]*$/;

/** dotenv file body (aider `--env-file`): `KEY="value"` lines, values JSON-escaped. */
export function dotenv(entries) {
  const lines = [];
  for (const key of Object.keys(entries)) {
    if (entries[key] === undefined) continue;
    if (!DOTENV_KEY.test(key)) throw new LaunchError("Internal", `Invalid env key: ${key}`);
    lines.push(`${key}=${JSON.stringify(String(entries[key]))}`);
  }
  return lines.length > 0 ? `${lines.join("\n")}\n` : "";
}

/** Valid env variable name (plan validation and adapters). */
export function isValidEnvKey(key) {
  return typeof key === "string" && DOTENV_KEY.test(key);
}
