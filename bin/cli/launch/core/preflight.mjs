// bin/cli/launch/core/preflight.mjs: evaluate PreflightCheck data before spawn.

import { execFile as execFileCb } from "node:child_process";
import { readFileSync } from "node:fs";
import net from "node:net";

import { LaunchError } from "../contract.mjs";

const DEFAULT_VERSION_PATTERN = "(\\d+\\.\\d+\\.\\d+)";

/**
 * Extract a version from command output.
 * @param {string} text
 * @param {string} [pattern] regex source with one capture group
 * @returns {string | undefined}
 */
export function parseVersion(text, pattern) {
  if (typeof text !== "string") return undefined;
  let re;
  try {
    re = new RegExp(pattern || DEFAULT_VERSION_PATTERN);
  } catch {
    return undefined;
  }
  const match = re.exec(text);
  const found = match ? (match[1] ?? match[0]) : undefined;
  return typeof found === "string" && found !== "" ? found : undefined;
}

function segments(version) {
  const core = String(version ?? "")
    .trim()
    .replace(/^v/i, "")
    .split("-")[0]
    .split("+")[0];
  return core.split(".").map((part) => {
    const n = Number.parseInt(part, 10);
    return Number.isFinite(n) ? n : 0;
  });
}

/**
 * Numeric compare per segment; missing segments are 0, prerelease suffix ignored.
 * @returns {-1 | 0 | 1}
 */
export function compareVersions(a, b) {
  const left = segments(a);
  const right = segments(b);
  const length = Math.max(left.length, right.length);
  for (let i = 0; i < length; i += 1) {
    const x = left[i] ?? 0;
    const y = right[i] ?? 0;
    if (x > y) return 1;
    if (x < y) return -1;
  }
  return 0;
}

const COMPARATOR = /^(>=|<=|>|<|=)?\s*v?(\d+(?:\.\d+)*)$/;

/**
 * `range` = space separated comparators (`>=x`, `>x`, `<=x`, `<x`, `=x`, bare `x`); all must hold.
 * @param {string} version
 * @param {string} range
 */
export function satisfiesRange(version, range) {
  if (typeof version !== "string" || version.trim() === "") return false;
  if (!/^v?\d+(?:\.\d+)*(?:[-+].*)?$/.test(version.trim())) return false;
  const text = String(range ?? "").trim();
  if (text === "") return false;
  // npm-style: alternatives separated by "||" (OR); each is a space-separated AND-set.
  // An empty alternative (e.g. ">=1 ||") makes the whole range invalid.
  for (const alternative of text.split("||")) {
    const parts = alternative.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return false;
  }
  return text.split("||").some((alternative) => {
    const parts = alternative.trim().split(/\s+/).filter(Boolean);
    for (const part of parts) {
      const match = COMPARATOR.exec(part);
      if (!match) return false;
      const op = match[1] ?? "=";
      const cmp = compareVersions(version, match[2]);
      const ok =
        op === ">="
          ? cmp >= 0
          : op === ">"
            ? cmp > 0
            : op === "<="
              ? cmp <= 0
              : op === "<"
                ? cmp < 0
                : cmp === 0;
      if (!ok) return false;
    }
    return true;
  });
}

function defaultExecFile(cmd, args) {
  return new Promise((resolve, reject) => {
    execFileCb(cmd, args, { timeout: 10000, windowsHide: true }, (error, stdout) => {
      if (error) reject(error);
      else resolve(String(stdout));
    });
  });
}

function defaultReadFile(path) {
  return readFileSync(path, "utf8");
}

function defaultProbePortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(false));
    server.listen(port, "127.0.0.1", () => {
      server.close(() => resolve(true));
    });
  });
}

/** Value at a dotted key path, `{ found, value }`. */
export function readDottedKey(object, key) {
  let current = object;
  for (const part of String(key).split(".")) {
    if (current === null || typeof current !== "object" || !Object.hasOwn(current, part)) {
      return { found: false, value: undefined };
    }
    current = current[part];
  }
  return { found: true, value: current };
}

function line(check, detail) {
  const why = typeof check?.why === "string" ? check.why : "";
  return detail ? (why ? `${why} (${detail})` : detail) : why;
}

async function evaluateOne(check, deps) {
  const env = deps.env ?? {};
  switch (check?.kind) {
    case "node-version": {
      let output;
      if (check.binary) {
        try {
          output = await (deps.execFile ?? defaultExecFile)(check.binary, ["--version"]);
        } catch {
          return {
            status: "fail",
            message: line(check, `could not run ${check.binary} --version`),
          };
        }
      } else {
        output = deps.nodeVersion ?? process.versions.node;
      }
      const version = parseVersion(String(output ?? ""));
      if (!version) {
        return { status: "fail", message: line(check, "node version could not be determined") };
      }
      return satisfiesRange(version, check.range)
        ? { status: "pass", message: line(check, `found node ${version}`) }
        : {
            status: "fail",
            message: line(check, `found node ${version}, need ${check.range}`),
          };
    }
    case "tool-version": {
      const version = deps.toolVersion;
      if (!version) {
        return { status: "warn", message: line(check, "tool version unknown") };
      }
      return compareVersions(version, check.min) >= 0
        ? { status: "pass", message: line(check, `found ${version}`) }
        : { status: "fail", message: line(check, `found ${version}, need >= ${check.min}`) };
    }
    case "env-absent": {
      const value = env[check.key];
      if (value === undefined || value === null || value === "") {
        return { status: "pass", message: line(check, `${check.key} is not set`) };
      }
      return {
        status: check.severity === "error" ? "fail" : "warn",
        message: line(check, `${check.key} is set`),
      };
    }
    case "env-equals": {
      return env[check.key] === check.value
        ? { status: "pass", message: line(check, `${check.key} is set as expected`) }
        : { status: "fail", message: line(check, `${check.key} does not have the expected value`) };
    }
    case "file-json-key": {
      let parsed;
      try {
        parsed = JSON.parse(String((deps.readFile ?? defaultReadFile)(check.path)));
      } catch {
        return { status: "pass", message: line(check, `${check.path} not present or unreadable`) };
      }
      return readDottedKey(parsed, check.key).found
        ? { status: "warn", message: line(check, `${check.key} is set in ${check.path}`) }
        : { status: "pass", message: line(check, `${check.key} not set in ${check.path}`) };
    }
    case "port-free": {
      let free;
      try {
        free = await (deps.probePortFree ?? defaultProbePortFree)(check.port);
      } catch {
        free = false;
      }
      return free
        ? { status: "pass", message: line(check, `port ${check.port} is free`) }
        : { status: "fail", message: line(check, `port ${check.port} is in use`) };
    }
    default:
      return {
        status: "fail",
        message: line(check, `unknown preflight check: ${String(check?.kind)}`),
      };
  }
}

/**
 * @param {import("../contract.d.ts").PreflightCheck[]} checks
 * @param {{ env?: Record<string,string>, toolVersion?: string, nodeVersion?: string,
 *   execFile?: (cmd: string, args: string[]) => Promise<string>,
 *   readFile?: (path: string) => string, probePortFree?: (port: number) => Promise<boolean> }} [deps]
 * @returns {Promise<Array<{ check: object, status: "pass" | "warn" | "fail", message: string }>>}
 */
export async function evaluatePreflight(checks, deps = {}) {
  const results = [];
  for (const check of checks ?? []) {
    let outcome;
    try {
      outcome = await evaluateOne(check, deps);
    } catch {
      outcome = { status: "fail", message: line(check, "check could not be evaluated") };
    }
    results.push({ check, ...outcome });
  }
  return results;
}

/**
 * Throw PreflightFailed when any result failed; otherwise return the warn messages.
 * @returns {string[]}
 */
export function assertPreflight(results) {
  const list = results ?? [];
  const failed = list.filter((result) => result.status === "fail");
  if (failed.length > 0) {
    throw new LaunchError(
      "PreflightFailed",
      `${failed.length} preflight check(s) failed: ${failed.map((r) => r.message).join("; ")}`
    );
  }
  return list.filter((result) => result.status === "warn").map((result) => result.message);
}
