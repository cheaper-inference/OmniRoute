// bin/cli/launch/core/passthrough.mjs: PassthroughRule enforcement before plan().

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { LaunchError, deepMerge } from "../contract.mjs";

const SHORT_FLAG = /^-[^-]$/;

/** Value attached to `name` inside `arg` (`--flag=value`, `-m<value>`), else undefined. */
function attachedValue(arg, name) {
  if (name.startsWith("--")) {
    return arg.startsWith(`${name}=`) ? arg.slice(name.length + 1) : undefined;
  }
  // short flag with attached value: -m<value>, -cfoo=bar
  if (SHORT_FLAG.test(name) && arg.startsWith(name) && arg.length > name.length) {
    return arg.slice(name.length);
  }
  return undefined;
}

function matchName(arg, next, name, takesValue) {
  if (arg === name) {
    return takesValue ? { consumed: 2, value: next, flag: name } : { consumed: 1, flag: name };
  }
  if (!takesValue) return null;
  const value = attachedValue(arg, name);
  return value === undefined ? null : { consumed: 1, value, flag: name };
}

function matchAt(arg, next, rule) {
  const takesValue = rule.takesValue !== false;
  const names = [rule.flag, ...(rule.aliases || [])];
  for (const name of names) {
    const hit = matchName(arg, next, name, takesValue);
    if (hit) return hit;
  }
  return null;
}

function prefixOk(rule, value) {
  if (!rule.valuePrefixes || rule.valuePrefixes.length === 0) return true;
  return typeof value === "string" && rule.valuePrefixes.some((p) => value.startsWith(p));
}

/** Inline JSON (`{...}` / `[...]`) or a path to a JSON file (relative to cwd). */
export function readJsonValue(value, flag, { cwd = process.cwd(), readFile = readFileSync } = {}) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new LaunchError("UsageError", `${flag} needs a JSON value or a JSON file path`);
  }
  const trimmed = value.trim();
  let text = trimmed;
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    try {
      text = String(readFile(resolve(cwd, trimmed), "utf8"));
    } catch {
      throw new LaunchError("UsageError", `${flag}: cannot read ${trimmed}`);
    }
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new LaunchError("UsageError", `${flag}: invalid JSON`);
  }
}

/**
 * @typedef {string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }} JsonValue
 */

function rejectAction(rule, hit, state) {
  throw new LaunchError(
    "UsageError",
    rule.message ?? `${hit.flag} is not supported with omnirouter launch ${state.tool}`
  );
}

function ownedAction(rule, hit, state) {
  const shown = hit.value !== undefined ? `${hit.flag} ${hit.value}` : hit.flag;
  throw new LaunchError(
    "ConfigConflict",
    rule.message ?? `${shown} conflicts with the launcher, which sets it for ${state.tool}`,
    { hint: "use the omnirouter option instead (for example --model before `--`)" }
  );
}

function mergeJsonAction(rule, hit, state) {
  const { json } = state;
  const parsed = readJsonValue(hit.value, hit.flag, state.deps);
  json[rule.flag] = rule.flag in json ? deepMerge(json[rule.flag], parsed) : parsed;
}

/** warn (and any other action): keep the arg(s). */
function warnAction(rule, hit, state) {
  state.warnings.push(
    rule.message ??
      `${hit.flag} is passed through to ${state.tool} unchanged; it may override the launch setup`
  );
  state.out.push(...state.list.slice(state.i, state.i + hit.consumed));
}

const ACTION_HANDLERS = new Map([
  ["reject", rejectAction],
  ["owned", ownedAction],
  ["mergeJson", mergeJsonAction],
]);

function findHit(arg, next, rules) {
  for (const rule of rules) {
    const hit = matchAt(arg, next, rule);
    if (hit && prefixOk(rule, hit.value)) return { rule, hit };
  }
  return null;
}

function consumeArg(state, rules) {
  const arg = state.list[state.i];
  const found = findHit(arg, state.list[state.i + 1], rules);
  if (!found) {
    state.out.push(arg);
    state.i += 1;
    return;
  }
  const handler = ACTION_HANDLERS.get(found.rule.action) ?? warnAction;
  handler(found.rule, found.hit, state);
  state.i += found.hit.consumed;
}

function initialState(args, deps) {
  return {
    out: [],
    json: {},
    warnings: [],
    tool: deps.tool ?? "the tool",
    deps,
    list: [...(args || [])].map(String),
    i: 0,
  };
}

/**
 * Apply the adapter's passthrough policy to the user's tool args.
 * @param {ReadonlyArray<string>} args argv after `--`
 * @param {ReadonlyArray<import("../contract.d.ts").PassthroughRule>} rules
 * @param {{ cwd?: string, readFile?: Function, tool?: string }} [deps]
 * @returns {{ args: string[], json: { [flag: string]: JsonValue }, warnings: string[] }}
 */
export function applyPassthrough(args, rules = [], deps = {}) {
  const state = initialState(args, deps);
  const { list } = state;
  while (state.i < list.length) {
    if (list[state.i] === "--") {
      state.out.push(...list.slice(state.i));
      break;
    }
    consumeArg(state, rules);
  }
  return { args: state.out, json: state.json, warnings: state.warnings };
}
