import { createPublicKey, verify } from "node:crypto";
import { readFileSync } from "node:fs";

const HOUR_MS = 60 * 60 * 1000;
const MAX_FEED_BYTES = 10 * 1024 * 1024; // Same cap as the Radar sync clients.
const FETCH_TIMEOUT_MS = 30_000;
const VERSION = /^\d{4}\.\d{2}\.\d{2}\.\d+$/;
const TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?Z$/;
const SIGNATURE_HEADER = "x-omniroute-feed-signature";
const VERSION_HEADER = "x-omniroute-feed-version";

export function readPinnedKeysFromSource(text) {
  const declaration = text.match(
    /^export const PINNED_FEED_PUBLIC_KEYS\s*:\s*readonly string\[\]\s*=\s*\[([^\]]*)\]/m
  );
  const literals = declaration?.[1].replace(/^\s*\/\/[^\n]*/gm, "") ?? "";
  const keys = [...literals.matchAll(/"([A-Za-z0-9+/]+={0,2})"/g)].map((match) => match[1]);
  if (keys.length === 0) throw new Error("No pinned Radar public keys found.");
  return keys;
}

export function readCuratedAtFromSource(text) {
  const date = text.match(
    /^export const FREE_CATALOG_CURATED_AT\s*=\s*"(\d{4}-\d{2}-\d{2})";/m
  )?.[1];
  if (!isCurationDate(date)) throw new Error("No valid Radar catalog curation date found.");
  return date;
}

function isCurationDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? "")) return false;
  const parsed = new Date(date);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

function verifiesSignature(bytes, signature, pinnedKeys) {
  const signatureBytes = Buffer.from(signature, "base64");
  if (bytes.length === 0 || signatureBytes.length === 0) return false;
  return pinnedKeys.some((encodedKey) => {
    try {
      const key = createPublicKey({
        key: Buffer.from(encodedKey, "base64"),
        format: "der",
        type: "spki",
      });
      return key.asymmetricKeyType === "ed25519" && verify(null, bytes, key, signatureBytes);
    } catch {
      // An unusable pin must not block the remaining keys during rotation.
      return false;
    }
  });
}

function unhealthy(problem) {
  return { ok: false, problems: [problem], version: null, generatedAt: null };
}

export function evaluateFeedHealth({
  kind,
  status,
  headers,
  bodyBytes,
  now,
  pinnedKeys,
  curatedAt,
  maxAgeHours = 26,
}) {
  if (status !== 200) return unhealthy(`http-${status}`);
  const responseHeaders = new Headers(headers);
  const signature = responseHeaders.get(SIGNATURE_HEADER);
  if (!signature) return unhealthy("missing-signature");

  const bytes = Buffer.from(bodyBytes);
  if (!verifiesSignature(bytes, signature, pinnedKeys)) return unhealthy("bad-signature");

  let feed;
  try {
    feed = JSON.parse(bytes.toString("utf8"));
  } catch {
    return unhealthy("invalid-json");
  }

  const problems = [];
  const rawVersion = kind === "catalog" ? feed?.version : responseHeaders.get(VERSION_HEADER);
  const version = typeof rawVersion === "string" && VERSION.test(rawVersion) ? rawVersion : null;
  if (version === null && (kind === "catalog" || rawVersion !== null)) {
    problems.push("bad-version");
  }

  const timestamp = feed?.generatedAt;
  let generatedAt = null;
  if (typeof timestamp === "string" && TIMESTAMP.test(timestamp)) {
    const date = new Date(timestamp);
    const generatedMs = date.getTime();
    if (
      Number.isFinite(generatedMs) &&
      date.toISOString().slice(0, 10) === timestamp.slice(0, 10)
    ) {
      generatedAt = timestamp;
      // The static publisher sets referrals' generatedAt from the run clock on each publish.
      // A stale referrals feed means the publisher stopped.
      if (new Date(now).getTime() - generatedMs >= maxAgeHours * HOUR_MS) problems.push("stale");
      if (generatedMs < Date.parse(curatedAt)) problems.push("before-curation");
    }
  }
  if (generatedAt === null) problems.push("invalid-json");

  return { ok: problems.length === 0, problems, version, generatedAt };
}

export function problemsKey(problems) {
  return [...problems].sort().join(",");
}

export function decideReportAction({ healthy, key, openIssue, now = Date.now() }) {
  if (healthy) return openIssue ? "close" : "none";
  if (!openIssue) return "create";
  const elapsed = new Date(now).getTime() - Date.parse(openIssue.lastMarkerAt);
  if (openIssue.lastMarkerKey === key && elapsed >= 0 && elapsed < 24 * HOUR_MS) return "none";
  return "comment";
}

export async function fetchFeedHealth(base, kind, context, { maxFeedBytes = MAX_FEED_BYTES } = {}) {
  const url = new URL(`/v1/${kind}/latest`, base);
  let response;
  let bodyBytes;
  try {
    response = await fetch(url, {
      headers: { "x-omniroute-radar-schema": "2" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (response.status !== 200) {
      await response.body?.cancel();
      return unhealthy(`http-${response.status}`);
    }
    const chunks = [];
    let totalBytes = 0;
    const reader = response.body?.getReader();
    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          totalBytes += value.byteLength;
          if (totalBytes > maxFeedBytes) {
            await reader.cancel().catch(() => {});
            return unhealthy("too-large");
          }
          chunks.push(value);
        }
      } finally {
        reader.releaseLock();
      }
    }
    bodyBytes = Buffer.concat(chunks, totalBytes);
  } catch {
    return unhealthy("network-error");
  }
  return evaluateFeedHealth({
    kind,
    status: response.status,
    headers: response.headers,
    bodyBytes,
    ...context,
  });
}

async function monitor(baseUrl, curatedAt, pinnedKeysPath) {
  const base = new URL(baseUrl);
  if (!["https:", "http:"].includes(base.protocol)) throw new Error("Invalid Radar feed URL.");

  const pinnedKeys = readPinnedKeysFromSource(readFileSync(pinnedKeysPath, "utf8"));
  const context = { now: Date.now(), pinnedKeys, curatedAt };
  const [catalog, referrals] = await Promise.all([
    fetchFeedHealth(base, "catalog", context),
    fetchFeedHealth(base, "referrals", context),
  ]);
  const feeds = { catalog, referrals };
  const problems = Object.entries(feeds).flatMap(([kind, feed]) =>
    feed.problems.map((problem) => `${kind}:${problem}`)
  );
  return { healthy: problems.length === 0, key: problemsKey(problems), feeds };
}

async function main(args) {
  if (args.length === 1 && args[0] === "--decide") {
    const input = JSON.parse(readFileSync(0, "utf8"));
    console.log(decideReportAction(input));
    return 0;
  }
  if (args.length === 2 && args[0] === "--read-curated-at") {
    console.log(readCuratedAtFromSource(readFileSync(args[1], "utf8")));
    return 0;
  }
  if (args[0] === "--url") {
    const [, baseUrl, dateFlag, curatedAt, keysFlag, pinnedKeysPath] = args;
    if (dateFlag !== "--curated-at" || !isCurationDate(curatedAt)) {
      console.error("curation-date-unavailable");
      return 2;
    }
    if (args.length === 6 && baseUrl && keysFlag === "--pinned-keys" && pinnedKeysPath) {
      const report = await monitor(baseUrl, curatedAt, pinnedKeysPath);
      console.log(JSON.stringify(report));
      return report.healthy ? 0 : 1;
    }
  }
  console.error(
    "Usage: node scripts/ops/radar-monitor.mjs --url <base> --curated-at <date> --pinned-keys <path> | --read-curated-at <path> | --decide"
  );
  return 2;
}

if (import.meta.main) {
  try {
    process.exitCode = await main(process.argv.slice(2));
  } catch {
    console.error(
      "Radar monitor could not complete. Check its arguments and source configuration."
    );
    process.exitCode = 2;
  }
}
