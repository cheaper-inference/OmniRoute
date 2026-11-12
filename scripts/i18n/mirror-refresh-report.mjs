#!/usr/bin/env node
/** Strict work-order reader for the refresh workflow; it does not change CI drift policy. */
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const REFRESH_BUCKETS = [
  "driftedSources",
  "missingTargets",
  "driftedTargets",
  "staleTargets",
  "inconsistentSectionCaches",
];

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isSource = (value) =>
  typeof value === "string" &&
  /^(?:[A-Za-z0-9_.-]+\/)*[A-Za-z0-9_.-]+$/.test(value) &&
  value.split("/").every((part) => part !== "." && part !== "..") &&
  !value.startsWith("-");

export function readRefreshReport(report) {
  if (!isObject(report) || typeof report.ok !== "boolean") {
    throw new Error("invalid-checker-report");
  }
  const fields = new Set(["ok", "checkedSources", "checkedTargets", ...REFRESH_BUCKETS]);
  if (Object.keys(report).some((key) => !fields.has(key))) {
    throw new Error("unexpected-checker-field");
  }
  for (const key of ["checkedSources", "checkedTargets"]) {
    if (!Number.isSafeInteger(report[key]) || report[key] <= 0) {
      throw new Error("empty-or-invalid-coverage");
    }
  }
  for (const bucket of REFRESH_BUCKETS) {
    if (!Array.isArray(report[bucket])) throw new Error("missing-or-invalid-bucket");
    for (const item of report[bucket]) {
      if (
        !isObject(item) ||
        !isSource(item.rel) ||
        (bucket !== "driftedSources" &&
          (typeof item.locale !== "string" || !/^[a-z]{2,3}(?:-[A-Za-z]{2,4})?$/.test(item.locale)))
      ) {
        throw new Error("invalid-bucket-entry");
      }
    }
  }
  const counts = Object.fromEntries(REFRESH_BUCKETS.map((key) => [key, report[key].length]));
  if (report.ok !== REFRESH_BUCKETS.every((key) => counts[key] === 0)) {
    throw new Error("contradictory-checker-verdict");
  }
  return {
    counts,
    files: [
      ...new Set(REFRESH_BUCKETS.flatMap((key) => report[key].map((item) => item.rel))),
    ].sort(),
    clean: REFRESH_BUCKETS.every((key) => counts[key] === 0),
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const [mode, filename, ...extra] = process.argv.slice(2);
    if (!["select", "check"].includes(mode) || !filename || extra.length) {
      throw new Error("invalid-arguments");
    }
    const result = readRefreshReport(JSON.parse(readFileSync(filename, "utf8")));
    if (mode === "select") {
      process.stdout.write(result.files.join(","));
    } else {
      console.log(
        `[i18n-refresh] ${result.clean ? "CLEAN" : "DRIFT"} ${JSON.stringify(result.counts)}`
      );
      process.exitCode = result.clean ? 0 : 1;
    }
  } catch {
    // Do not echo malformed input, paths or external exception text into public logs.
    console.error("[i18n-refresh] INCOMPLETE: invalid or unavailable checker report");
    process.exitCode = 2;
  }
}
