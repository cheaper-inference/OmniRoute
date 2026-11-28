import { readFileSync } from "node:fs";
import { join } from "node:path";

import { frozenReadmeLines, isReadmeDigitEdit } from "../../release/derived-refresh-autoland.mjs";

export const REACH_FACTS_PATH = "docs/reference/reach-facts.json";

const DISTRIBUTION_HEADING = "### Distribution snapshot";
const VIDEO_HEADING = "### If you want the numbers";
const DISTRIBUTION_ROWS = new Map([
  ["npm downloads, last 30 days", "npmDownloads30d"],
  ["Docker pulls, both images", "dockerPulls"],
  ["All GitHub release asset downloads", "releaseDownloads"],
]);
const VIDEO_ROWS = new Map([
  ["YouTube", ["youtubeVideos", "youtubeViews"]],
  ["Instagram", ["instagramVideos", "instagramViews"]],
  ["TikTok", ["tiktokVideos", "tiktokViews"]],
  ["**Total**", ["videos", "videoViews"]],
]);
const SNAPSHOT_FIELDS = [
  ["snapshotCollectedOn", "collectedOn", ": **"],
  ["snapshotVideos", "videos", " unique videos** (YouTube "],
  ["snapshotYouTube", "youtubeVideos", " · TikTok "],
  ["snapshotTikTok", "tiktokVideos", " · Instagram "],
  ["snapshotInstagram", "instagramVideos", "), **"],
  ["snapshotViews", "videoViews", " known views**, **"],
  ["snapshotCreators", "creators", " channels and profiles**."],
];
const CLAIMS = [
  { id: "distributionCollectedOn", key: "collectedOn", format: "date" },
  ...Array.from(DISTRIBUTION_ROWS.values(), (key) => ({ id: key, key, format: "floor" })),
  ...Array.from(VIDEO_ROWS.values()).flatMap((keys) =>
    keys.map((key) => ({ id: key, key, format: "exact", video: true }))
  ),
  ...SNAPSHOT_FIELDS.map(([id, key]) => ({
    id,
    key,
    format: key === "collectedOn" ? "date" : "exact",
    video: true,
  })),
];
const claimFormats = new Map(CLAIMS.map(({ id, format }) => [id, format]));
const requiredMetrics = new Set(
  CLAIMS.filter(({ key }) => key !== "collectedOn").map(({ key }) => key)
);

const countFormatter = new Intl.NumberFormat("en-US");
export const formatExact = (value) => countFormatter.format(value);
// The lower bound for a count below one thousand is zero, displayed as "0+".
export const formatFloorThousands = (value) => `${formatExact(Math.floor(value / 1000) * 1000)}+`;

const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const digitsOnly = (text) => text.length > 0 && !/[^0-9]/.test(text);

function validDay(text) {
  if (typeof text !== "string" || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(text)) return false;
  const date = new Date(`${text}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === text;
}

function validUtc(text) {
  if (typeof text !== "string" || !text.endsWith("Z")) return false;
  const seconds = text.slice(0, 19);
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(seconds)) return false;
  const date = new Date(`${seconds}Z`);
  return (
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 19) === seconds &&
    (text.length === 20 || (text[19] === "." && digitsOnly(text.slice(20, -1))))
  );
}

function validSnapshot(snapshot) {
  if (
    !isRecord(snapshot) ||
    snapshot.schema !== 1 ||
    Object.keys(snapshot).length !== 3 ||
    !isRecord(snapshot.metrics) ||
    !validDay(snapshot.collectedOn)
  ) {
    return false;
  }
  for (const key of requiredMetrics) {
    if (!Object.hasOwn(snapshot.metrics, key)) return false;
  }

  let latestDay = "";
  for (const [key, metric] of Object.entries(snapshot.metrics)) {
    if (
      key.length < 2 ||
      key.length > 40 ||
      !/^[a-z]/.test(key) ||
      /[^A-Za-z0-9]/.test(key) ||
      !isRecord(metric) ||
      Object.keys(metric).length !== 2 ||
      !Number.isSafeInteger(metric.value) ||
      metric.value <= 0 ||
      !validUtc(metric.collectedAt)
    ) {
      return false;
    }
    const day = metric.collectedAt.slice(0, 10);
    if (day > latestDay) latestDay = day;
  }
  return snapshot.collectedOn === latestDay;
}

/** Parses the same snapshot from disk or from the refresh planner's file reader. */
export function parseReachFacts(text) {
  if (text == null) return null;
  let snapshot;
  try {
    snapshot = JSON.parse(text);
  } catch {
    throw new Error("invalid docs/reference/reach-facts.json");
  }
  if (!validSnapshot(snapshot)) throw new Error("invalid docs/reference/reach-facts.json");
  return snapshot;
}

export function readReachFacts(root) {
  let text;
  try {
    text = readFileSync(join(root, REACH_FACTS_PATH), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw new Error("could not read docs/reference/reach-facts.json");
  }
  return parseReachFacts(text);
}

export function hasReachSections(content) {
  return content
    .split("\n")
    .some((line) => [DISTRIBUTION_HEADING, VIDEO_HEADING].includes(line.trimEnd()));
}

function validClaimText(text, format) {
  if (format === "date") return validDay(text);
  const figure = format === "floor" ? text.slice(0, -1) : text;
  const digits = figure.replaceAll(",", "");
  if (digits.length > 16 || !digitsOnly(digits)) return false;
  const value = Number(digits);
  if (!Number.isSafeInteger(value)) return false;
  return text === (format === "floor" ? formatFloorThousands(value) : formatExact(value));
}

function cellClaim(cells, column, id, offset, bold = false) {
  const cell = cells[column];
  let text = cell.trim();
  let start = offset + cells.slice(0, column).reduce((total, part) => total + part.length + 1, 0);
  start += cell.length - cell.trimStart().length;
  if (bold) {
    if (!text.startsWith("**") || !text.endsWith("**")) return null;
    text = text.slice(2, -2);
    start += 2;
  }
  return { id, text, start, end: start + text.length };
}

function snapshotClaims(line, offset) {
  const prefix = "Snapshot of ";
  if (!line.startsWith(prefix)) return [];
  const claims = [];
  let start = prefix.length;
  for (const [id, , suffix] of SNAPSHOT_FIELDS) {
    const end = line.indexOf(suffix, start);
    if (end === -1) return [];
    claims.push({ id, text: line.slice(start, end), start: offset + start, end: offset + end });
    start = end + suffix.length;
  }
  return claims;
}

function claimsOnLine(line, offset, section, distance) {
  if (section === DISTRIBUTION_HEADING) {
    const date = /^Collected on ([0-9]{4}-[0-9]{2}-[0-9]{2})\.$/d.exec(line);
    if (date && distance <= 12) {
      const [start, end] = date.indices[1];
      return [
        { id: "distributionCollectedOn", text: date[1], start: offset + start, end: offset + end },
      ];
    }
  } else {
    const snapshot = snapshotClaims(line, offset);
    if (snapshot.length) return snapshot;
  }

  if (!line.startsWith("|")) return [];
  const cells = line.split("|");
  if (cells.length < 5 || cells.at(-1).trim() !== "") return [];
  const label = cells[1].trim();
  if (section === DISTRIBUTION_HEADING) {
    const id = DISTRIBUTION_ROWS.get(label);
    return id ? [cellClaim(cells, 2, id, offset)] : [];
  }
  const keys = VIDEO_ROWS.get(label);
  return keys && cells.length === 5
    ? keys.map((id, index) => cellClaim(cells, index + 2, id, offset, label === "**Total**"))
    : [];
}

function isSetextHeading(line, nextLine = "") {
  if (!line || /^(?: {4}|[\t|>])/.test(line) || /^(?: {4}|\t)/.test(nextLine)) return false;
  const underline = nextLine.trim();
  return underline.length > 0 && (!/[^=]/.test(underline) || !/[^-]/.test(underline));
}

/** Finds unambiguous number spans in the two English README sections. */
export function locateReachClaims(content) {
  const frozen = frozenReadmeLines(content);
  const lines = content.split("\n");
  const candidates = new Map();
  let section = "";
  let headingIndex = 0;
  let offset = 0;
  for (const [index, raw] of lines.entries()) {
    const start = offset;
    offset += raw.length + 1;
    if (frozen.has(index + 1)) continue;

    const line = raw.trimEnd();
    if (/^ {0,3}#{1,6}[ \t]/.test(line)) {
      section = line;
      headingIndex = index;
      continue;
    }
    if (section !== DISTRIBUTION_HEADING && section !== VIDEO_HEADING) continue;
    if (isSetextHeading(line, lines[index + 1])) {
      section = "";
      continue;
    }
    for (const claim of claimsOnLine(line, start, section, index - headingIndex)) {
      if (claim) candidates.set(claim.id, candidates.has(claim.id) ? null : claim);
    }
  }
  return Array.from(candidates.values()).filter(
    (claim) => claim && validClaimText(claim.text, claimFormats.get(claim.id))
  );
}

export function expectedReachTexts(reach) {
  if (reach == null) return {};
  return Object.fromEntries(
    CLAIMS.map(({ id, key, format }) => {
      if (format === "date") return [id, reach.collectedOn];
      const value = reach.metrics[key].value;
      return [id, format === "floor" ? formatFloorThousands(value) : formatExact(value)];
    })
  );
}

function videoTotalsMatch({ metrics }) {
  return ["Videos", "Views"].every((suffix) => {
    const total = metrics[suffix === "Videos" ? "videos" : "videoViews"].value;
    return (
      metrics[`youtube${suffix}`].value +
        metrics[`instagram${suffix}`].value +
        metrics[`tiktok${suffix}`].value ===
      total
    );
  });
}

function digitEditProblem(content, { start, end, text }, to) {
  const digitDelta = to.replace(/[^0-9]/g, "").length - text.replace(/[^0-9]/g, "").length;
  if (digitDelta !== 0)
    return `the figure ${digitDelta > 0 ? "gained" : "lost"} a digit; edit by hand`;
  if (text.replace(/[0-9]/g, "0") !== to.replace(/[0-9]/g, "0")) {
    return "the separator positions changed; edit by hand";
  }
  const lineStart = content.lastIndexOf("\n", start) + 1;
  const nextLine = content.indexOf("\n", end);
  const lineEnd = nextLine === -1 ? content.length : nextLine;
  if (
    !isReadmeDigitEdit(
      content.slice(lineStart, lineEnd),
      content.slice(lineStart, start) + to + content.slice(end, lineEnd)
    )
  ) {
    return "the change is outside the README digits-only rule; edit by hand";
  }
  return null;
}

/** Format invariants without a snapshot, derived claims when there are facts to compare. */
export function buildReachChecks(reach) {
  const expected = expectedReachTexts(reach);
  const coherent = reach == null || videoTotalsMatch(reach);
  let lastContent;
  let located;
  function findClaim(content, id) {
    if (content !== lastContent) {
      located = new Map(locateReachClaims(content).map((claim) => [claim.id, claim]));
      lastContent = content;
    }
    return located.get(id);
  }

  return CLAIMS.map(({ id, video }) => {
    const name = id === "distributionCollectedOn" ? "Collected on (distributionCollectedOn)" : id;
    const label = `README reach ${name}`;
    const target = expected[id];
    const missing = `${label}: missing, ambiguous, or malformed claim`;
    const blocked = video && !coherent;
    const inconsistency = "platform figures do not add up to the total";
    return {
      label,
      claimId: `reach-${id}`,
      actual: target ?? "required format",
      docKey: "README reach",
      files: ["README.md"],
      strict: true,
      scope: reach == null ? "invariant" : "derived",
      requireClaim: true,
      validate(content) {
        const claim = findClaim(content, id);
        if (!claim) return { ok: false, detail: missing };
        if (blocked) return { ok: false, detail: `${label}: ${inconsistency}` };
        if (target !== undefined && claim.text !== target) {
          return { ok: false, detail: `${label}: found "${claim.text}", expected "${target}"` };
        }
        return { ok: true, detail: `${label}: "${claim.text}"` };
      },
      extract(content) {
        const claim = findClaim(content, id);
        return claim ? [{ ...claim, value: claim.text }] : [];
      },
      plan(content) {
        if (target === undefined) return { edits: [], manual: [] };
        const claim = findClaim(content, id);
        const problem = !claim ? missing : blocked ? inconsistency : null;
        if (problem) return { edits: [], manual: [problem] };
        if (claim.text === target) return { edits: [], manual: [] };

        const unsafe = digitEditProblem(content, claim, target);
        if (unsafe) return { edits: [], manual: [`${claim.text} → ${target}: ${unsafe}`] };
        return { edits: [{ start: claim.start, end: claim.end, to: target }], manual: [] };
      },
    };
  });
}
