#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
  closeSync,
  constants,
  fstatSync,
  lstatSync,
  openSync,
  readFileSync,
  readSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import { isMainModule } from "../lib/is-main-module.mjs";

const DEFAULT_OUT = fileURLToPath(
  new URL("../../docs/reference/reach-facts.json", import.meta.url)
);
const MAX_SOURCE_BYTES = 1024 * 1024;
const HOUR_MS = 60 * 60 * 1000;
const REQUIRED_KEYS = [
  "videos",
  "videoViews",
  "creators",
  "youtubeVideos",
  "youtubeViews",
  "tiktokVideos",
  "tiktokViews",
  "instagramVideos",
  "instagramViews",
  "npmDownloads30d",
  "dockerPulls",
  "releaseDownloads",
];
const decoder = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true });

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isMetricKey(key) {
  return typeof key === "string" && /^[a-z][A-Za-z0-9]{1,39}$/.test(key);
}

function isCount(value) {
  return Number.isSafeInteger(value) && value > 0;
}

function parseUtc(value) {
  if (typeof value !== "string") return null;
  const match = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d+))?Z$/.exec(value);
  if (!match) return null;

  const date = new Date(`${match[1]}Z`);
  const time = date.getTime();
  // Date can normalize impossible calendar dates and 24:00:00.
  if (!Number.isFinite(time) || date.toISOString().slice(0, 19) !== match[1]) return null;

  // Keep decimal digits to compare timestamps beyond Date's millisecond precision.
  const fraction = match[2] ?? "";
  let end = fraction.length;
  while (end > 0 && fraction[end - 1] === "0") end -= 1;
  return { time, fraction: fraction.slice(0, end) };
}

function compareInstants(left, right) {
  if (left.time !== right.time) return left.time - right.time;
  if (left.fraction === right.fraction) return 0;
  return left.fraction < right.fraction ? -1 : 1;
}

function failure(reason) {
  return { ok: false, reason };
}

/** Validate a parsed source. now is a UTC ISO timestamp or Unix time in milliseconds. */
export function validateReach(source, { now, previous, allowDrop = [] }) {
  if (!isRecord(source) || source.schema !== 1) return failure("unsupported-schema");
  if (!Array.isArray(source.metrics) || source.metrics.length === 0) {
    return failure("malformed-metrics");
  }

  const clock = typeof now === "number" ? new Date(now) : null;
  const current = parseUtc(clock && Number.isFinite(clock.getTime()) ? clock.toISOString() : now);
  if (!current) return failure("invalid-now");
  const oldest = { ...current, time: current.time - 72 * HOUR_MS };
  const newest = { ...current, time: current.time + HOUR_MS };
  const allowedDrops = new Set(allowDrop);
  const metrics = new Map();
  let collectedOn = "";

  for (const metric of source.metrics) {
    if (!isRecord(metric) || !isMetricKey(metric.key)) return failure("malformed-metrics");
    const { key, value, collectedAt } = metric;
    if (metrics.has(key)) return failure(`duplicate-key:${key}`);
    if (!isCount(value)) return failure(`invalid-value:${key}`);

    const instant = parseUtc(collectedAt);
    if (!instant) return failure(`invalid-date:${key}`);
    if (compareInstants(instant, oldest) < 0) return failure(`stale:${key}`);
    if (compareInstants(instant, newest) > 0) return failure(`future-date:${key}`);

    if (
      previous &&
      Object.hasOwn(previous.metrics, key) &&
      !/\d+d$/.test(key) &&
      !allowedDrops.has(key) &&
      BigInt(value) * 5n < BigInt(previous.metrics[key].value) * 4n
    ) {
      return failure(`drop:${key}`);
    }

    const day = collectedAt.slice(0, 10);
    if (day > collectedOn) collectedOn = day;
    metrics.set(key, { value, collectedAt });
  }

  for (const key of REQUIRED_KEYS) {
    if (!metrics.has(key)) return failure(`missing-key:${key}`);
  }

  return { ok: true, snapshot: { schema: 1, collectedOn, metrics: Object.fromEntries(metrics) } };
}

export function renderSnapshot({ schema, collectedOn, metrics }) {
  const sorted = Object.fromEntries(
    Object.keys(metrics)
      .sort()
      .map((key) => {
        const { value, collectedAt } = metrics[key];
        return [key, { value, collectedAt }];
      })
  );
  return JSON.stringify({ schema, collectedOn, metrics: sorted }, null, 2) + "\n";
}

function isSnapshot(snapshot) {
  if (
    !isRecord(snapshot) ||
    snapshot.schema !== 1 ||
    Object.keys(snapshot).length !== 3 ||
    !isRecord(snapshot.metrics)
  ) {
    return false;
  }
  let latestDay = "";
  for (const [key, metric] of Object.entries(snapshot.metrics)) {
    if (
      !isMetricKey(key) ||
      !isRecord(metric) ||
      Object.keys(metric).length !== 2 ||
      !isCount(metric.value) ||
      !parseUtc(metric.collectedAt)
    ) {
      return false;
    }
    const day = metric.collectedAt.slice(0, 10);
    if (day > latestDay) latestDay = day;
  }
  return latestDay !== "" && snapshot.collectedOn === latestDay;
}

function readPrevious(out) {
  try {
    const stat = lstatSync(out, { throwIfNoEntry: false });
    if (!stat) return { ok: true };
    if (!stat.isFile()) return failure("unreadable-snapshot");
    const bytes = readFileSync(out);
    const snapshot = JSON.parse(decoder.decode(bytes));
    return isSnapshot(snapshot) ? { ok: true, bytes, snapshot } : failure("unreadable-snapshot");
  } catch (error) {
    if (error.code === "ENOTDIR") return { ok: true };
    return failure("unreadable-snapshot");
  }
}

function readSourceFile(path) {
  const fd = openSync(path, constants.O_RDONLY | constants.O_NONBLOCK);
  try {
    const stat = fstatSync(fd);
    if (!stat.isFile()) return failure("source-unavailable");
    if (stat.size > MAX_SOURCE_BYTES) return failure("source-too-large");

    // Enforce the same limit if the file grows between stat and read.
    const bytes = Buffer.alloc(MAX_SOURCE_BYTES + 1);
    let length = 0;
    while (length < bytes.length) {
      const count = readSync(fd, bytes, length, bytes.length - length, null);
      if (count === 0) break;
      length += count;
    }
    return length > MAX_SOURCE_BYTES
      ? failure("source-too-large")
      : { ok: true, bytes: bytes.subarray(0, length) };
  } finally {
    closeSync(fd);
  }
}

function readSource(path, repository) {
  try {
    if (path !== undefined) return readSourceFile(path);

    // The export repository is private. Its name comes from the environment, never from this file.
    if (!repository) return failure("no-repository");
    const token = process.env.TRACKER_EXPORT_READ_TOKEN;
    if (!token) return failure("no-read-token");
    const env = { ...process.env, GH_HOST: "github.com", GH_TOKEN: token };
    delete env.TRACKER_EXPORT_READ_TOKEN;
    delete env.GITHUB_TOKEN;
    delete env.GH_ENTERPRISE_TOKEN;
    delete env.GITHUB_ENTERPRISE_TOKEN;

    const bytes = execFileSync(
      "gh",
      [
        "api",
        `repos/${repository}/contents/reach.json`,
        "--header",
        "Accept: application/vnd.github.raw+json",
      ],
      { env, stdio: ["ignore", "pipe", "ignore"], maxBuffer: MAX_SOURCE_BYTES }
    );
    return bytes.length > MAX_SOURCE_BYTES ? failure("source-too-large") : { ok: true, bytes };
  } catch (error) {
    return failure(error.code === "ENOBUFS" ? "source-too-large" : "source-unavailable");
  }
}

function writeSnapshot(out, bytes) {
  const temp = join(dirname(out), `.reach-facts-${randomUUID()}.tmp`);
  const fd = openSync(temp, "wx");
  try {
    try {
      writeFileSync(fd, bytes);
    } finally {
      closeSync(fd);
    }
    renameSync(temp, out);
  } catch (error) {
    try {
      unlinkSync(temp);
    } catch {
      // Preserve the original write failure if cleanup is unavailable.
    }
    throw error;
  }
}

function unchanged(reason) {
  console.log(`reach-facts: unchanged (${reason})`);
  return 0;
}

function usageError(reason) {
  console.error(`reach-facts: ${reason}`);
  return 2;
}

function main() {
  let options;
  try {
    ({ values: options } = parseArgs({
      strict: true,
      options: {
        "source-file": { type: "string" },
        out: { type: "string" },
        now: { type: "string" },
        "allow-drop": { type: "string", multiple: true, default: [] },
        "dry-run": { type: "boolean" },
      },
    }));
  } catch {
    return usageError("invalid-arguments");
  }
  if (options.out === "" || options["source-file"] === "") return usageError("invalid-arguments");

  const now = options.now ?? new Date().toISOString();
  if (!parseUtc(now)) return usageError("invalid-now");
  if (!options["allow-drop"].every(isMetricKey)) return usageError("invalid-allow-drop");
  const repository = process.env.TRACKER_EXPORT_REPOSITORY || undefined;
  if (repository !== undefined && !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
    return usageError("invalid-repository");
  }

  const source = readSource(options["source-file"], repository);
  if (!source.ok) return unchanged(source.reason);
  let payload;
  try {
    payload = JSON.parse(decoder.decode(source.bytes));
  } catch {
    return unchanged("invalid-json");
  }

  const out = resolve(options.out ?? DEFAULT_OUT);
  const previous = readPrevious(out);
  if (!previous.ok) return unchanged(previous.reason);
  const result = validateReach(payload, {
    now,
    previous: previous.snapshot,
    allowDrop: options["allow-drop"],
  });
  if (!result.ok) return unchanged(result.reason);

  const { snapshot } = result;
  const bytes = Buffer.from(renderSnapshot(snapshot));
  if (previous.bytes?.equals(bytes)) return unchanged("same-values");

  if (!options["dry-run"]) {
    try {
      writeSnapshot(out, bytes);
    } catch {
      return usageError("output-unwritable");
    }
  }

  const count = Object.entries(snapshot.metrics).filter(
    ([key, { value }]) => previous.snapshot?.metrics[key]?.value !== value
  ).length;
  const action = options["dry-run"] ? "would update" : "updated";
  console.log(`reach-facts: ${action} ${count} metric(s), collected on ${snapshot.collectedOn}`);
  return 0;
}

if (isMainModule(import.meta.url)) {
  process.exitCode = main();
}
