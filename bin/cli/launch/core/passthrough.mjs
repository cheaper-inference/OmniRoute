// bin/cli/launch/core/passthrough.mjs: PassthroughRule enforcement before plan().

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { LaunchError, deepMerge } from "../contract.mjs";

function matchAt(arg, next, rule) {
  const takesValue = rule.takesValue !== false;
  const names = [rule.flag, ...(rule.aliases || [])];
  for (const name of names) {
    if (arg === name) {
      return takesValue ? { consumed: 2, value: next, flag: name } : { consumed: 1, flag: name };
    }
    if (takesValue && name.startsWith("--") && arg.startsWith(`${name}=`)) {
      return { consumed: 1, value: arg.slice(name.length + 1), flag: name };
    }
    // short flag with attached value: -m<value>, -cfoo=bar
    if (takesValue && /^-[^-]$/.test(name) && arg.startsWith(name) && arg.length > name.length) {
      return { consumed: 1, value: arg.slice(name.length), flag: name };
    }
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
 * Apply the adapter's passthrough policy to the user's tool args.
 * @param {ReadonlyArray<string>} args argv after `--`
 * @param {ReadonlyArray<import("../contract.d.ts").PassthroughRule>} rules
 * @param {{ cwd?: string, readFile?: Function, tool?: string }} [deps]
 * @returns {{ args: string[], json: Record<string, unknown>, warnings: string[] }}
 */
export function applyPassthrough(args, rules = [], deps = {}) {
  const out = [];
  const json = {};
  const warnings = [];
  const tool = deps.tool ?? "the tool";
  const list = [...(args || [])].map(String);
  let i = 0;
  while (i < list.length) {
    const arg = list[i];
    if (arg === "--") {
      out.push(...list.slice(i));
      break;
    }
    let handled = false;
    for (const rule of rules) {
      const hit = matchAt(arg, list[i + 1], rule);
      if (!hit || !prefixOk(rule, hit.value)) continue;
      const shown = hit.value !== undefined ? `${hit.flag} ${hit.value}` : hit.flag;
      if (rule.action === "reject") {
        throw new LaunchError(
          "UsageError",
          rule.message ?? `${hit.flag} is not supported with omnirouter launch ${tool}`
        );
      }
      if (rule.action === "owned") {
        throw new LaunchError(
          "ConfigConflict",
          rule.message ?? `${shown} conflicts with the launcher, which sets it for ${tool}`,
          { hint: "use the omnirouter option instead (for example --model before `--`)" }
        );
      }
      if (rule.action === "mergeJson") {
        const parsed = readJsonValue(hit.value, hit.flag, deps);
        json[rule.flag] = rule.flag in json ? deepMerge(json[rule.flag], parsed) : parsed;
        i += hit.consumed;
        handled = true;
        break;
      }
      // warn: keep the arg(s)
      warnings.push(
        rule.message ??
          `${hit.flag} is passed through to ${tool} unchanged; it may override the launch setup`
      );
      out.push(...list.slice(i, i + hit.consumed));
      i += hit.consumed;
      handled = true;
      break;
    }
    if (!handled) {
      out.push(arg);
      i++;
    }
  }
  return { args: out, json, warnings };
}
