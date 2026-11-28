import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { applyEdits } from "../../scripts/check/lib/derivedClaims.mjs";
import {
  buildReachChecks,
  expectedReachTexts,
  formatExact,
  formatFloorThousands,
  locateReachClaims,
  readReachFacts,
} from "../../scripts/check/lib/reachClaims.mjs";
import {
  frozenReadmeLines,
  isReadmeDigitEdit,
} from "../../scripts/release/derived-refresh-autoland.mjs";

const README = [
  "### Distribution snapshot",
  "",
  "Collected on 2026-11-28.",
  "",
  "| Measure | Count | Scope |",
  "| --- | ---: | --- |",
  "| npm downloads, last 30 days | 345,000+ | Rolling period |",
  "| Docker pulls, both images | 2,151,000+ | Both images |",
  "| All GitHub release asset downloads | 631,000+ | All assets |",
  "| npm downloads since first publish | 1,450,000+ | Historical |",
  "| Desktop installer downloads | 201,000+ | 283 releases |",
  "| OmniCopilot, VS Code Marketplace | 49,000+ | As of November |",
  "| OmniCopilot, Open VSX | 18,900+ | As of November |",
  "| OmniRouteTray DMG downloads | 1,600+ | As of November |",
  "",
  "### Video ranking",
  "| YouTube | 777 | 42,001 |",
  "| **Total** | **321** | **54,321** |",
  "",
  "### If you want the numbers",
  "",
  '| <img width="2000" height="0" alt=""> Platform | Videos | Known views |',
  "| --- | ---: | ---: |",
  "| YouTube | 2,118 | 15,102,533 |",
  "| Instagram | 538 | 14,911,666 |",
  "| TikTok | 567 | 10,922,080 |",
  "| **Total** | **3,223** | **40,936,279** |",
  "",
  "Snapshot of 2026-11-28: **3,223 unique videos** (YouTube 2,118 · TikTok 567 · Instagram 538), **40,936,279 known views**, **1,969 channels and profiles**. More details.",
  "",
  "### More",
  "",
].join("\n");

const VALUES = {
  videos: 3223,
  videoViews: 40936279,
  creators: 1969,
  youtubeVideos: 2118,
  youtubeViews: 15102533,
  tiktokVideos: 567,
  tiktokViews: 10922080,
  instagramVideos: 538,
  instagramViews: 14911666,
  npmDownloads30d: 345840,
  dockerPulls: 2151790,
  releaseDownloads: 631923,
};

function snapshot(values = VALUES, collectedOn = "2026-11-28") {
  return {
    schema: 1,
    collectedOn,
    metrics: Object.fromEntries(
      Object.entries(values).map(([key, value]) => [
        key,
        { value, collectedAt: `${collectedOn}T08:46:35Z` },
      ])
    ),
  };
}

const REACH = snapshot();
const TOMORROW = snapshot(
  {
    videos: 3226,
    videoViews: 40936282,
    creators: 1970,
    youtubeVideos: 2119,
    youtubeViews: 15102534,
    tiktokVideos: 568,
    tiktokViews: 10922081,
    instagramVideos: 539,
    instagramViews: 14911667,
    npmDownloads30d: 346000,
    dockerPulls: 2152000,
    releaseDownloads: 632000,
  },
  "2026-11-29"
);

function defects(content: string, reach: typeof REACH | null) {
  return buildReachChecks(reach).flatMap((check) => {
    const result = check.validate(content);
    return result.ok ? [] : [result.detail];
  });
}

function plan(content: string, reach: typeof REACH | null) {
  const parts = buildReachChecks(reach).map((check) => check.plan(content));
  return {
    edits: parts.flatMap((part) => part.edits),
    manual: parts.flatMap((part) => part.manual),
  };
}

test("reach figures use exact grouping or floor to the nearest thousand (999 displays as 0+)", () => {
  assert.equal(formatExact(40936279), "40,936,279");
  assert.equal(formatFloorThousands(999), "0+");
  assert.equal(formatFloorThousands(1000), "1,000+");
  assert.equal(formatFloorThousands(345840), "345,000+");
});

test("locates the 19 README claims and leaves the ranking and historical distribution rows alone", () => {
  const claims = locateReachClaims(README);
  assert.deepEqual(
    claims.map(({ text }) => text),
    [
      "2026-11-28",
      "345,000+",
      "2,151,000+",
      "631,000+",
      "2,118",
      "15,102,533",
      "538",
      "14,911,666",
      "567",
      "10,922,080",
      "3,223",
      "40,936,279",
      "2026-11-28",
      "3,223",
      "2,118",
      "567",
      "538",
      "40,936,279",
      "1,969",
    ]
  );
  const expected = expectedReachTexts(REACH);
  assert.equal(new Set(claims.map(({ id }) => id)).size, 19);
  for (const { id, start, end, text } of claims) {
    assert.equal(text, README.slice(start, end));
    assert.equal(text, expected[id]);
  }
});

test("plans one safe edit per divergent claim and produces the exact expected README", () => {
  const expected = README.replace("Collected on 2026-11-28.", "Collected on 2026-11-29.")
    .replace("345,000+", "346,000+")
    .replace("2,151,000+", "2,152,000+")
    .replace("631,000+", "632,000+")
    .replace("| YouTube | 2,118 | 15,102,533 |", "| YouTube | 2,119 | 15,102,534 |")
    .replace("| Instagram | 538 | 14,911,666 |", "| Instagram | 539 | 14,911,667 |")
    .replace("| TikTok | 567 | 10,922,080 |", "| TikTok | 568 | 10,922,081 |")
    .replace(
      "| **Total** | **3,223** | **40,936,279** |",
      "| **Total** | **3,226** | **40,936,282** |"
    )
    .replace(
      "Snapshot of 2026-11-28: **3,223 unique videos** (YouTube 2,118 · TikTok 567 · Instagram 538), **40,936,279 known views**, **1,969 channels and profiles**.",
      "Snapshot of 2026-11-29: **3,226 unique videos** (YouTube 2,119 · TikTok 568 · Instagram 539), **40,936,282 known views**, **1,970 channels and profiles**."
    );
  const { edits, manual } = plan(README, TOMORROW);
  assert.equal(edits.length, 19);
  assert.deepEqual(manual, []);
  assert.equal(applyEdits(README, edits), expected);
  assert.equal(defects(README, TOMORROW).length, 19);
  assert.deepEqual(defects(expected, TOMORROW), []);
  assert.deepEqual(plan(expected, TOMORROW), { edits: [], manual: [] });

  const frozen = frozenReadmeLines(README);
  for (const { start, end, to } of edits) {
    const before = README.slice(0, start);
    const lineStart = before.lastIndexOf("\n") + 1;
    const lineEnd = README.indexOf("\n", end);
    const originalLine = README.slice(lineStart, lineEnd);
    const newLine = README.slice(lineStart, start) + to + README.slice(end, lineEnd);
    assert.equal(frozen.has(before.split("\n").length), false);
    assert.equal(isReadmeDigitEdit(originalLine, newLine), true, originalLine);
  }
});

test("blocks edits on a count that gains or loses a digit", () => {
  for (const [from, value, reason] of [
    ["999,000+", 1000000, "gained"],
    ["1,000,000+", 999999, "lost"],
  ] as const) {
    const content = README.replace("345,000+", from);
    const { edits, manual } = plan(content, snapshot({ ...VALUES, npmDownloads30d: value }));
    assert.deepEqual(edits, []);
    assert.equal(manual.length, 1);
    assert.match(manual.join("\n"), new RegExp(`the figure ${reason} a digit; edit by hand`));
  }
});

test("incoherent platform counts block every video edit while distribution is still planned", () => {
  for (const key of ["videos", "videoViews"]) {
    const reach = structuredClone(TOMORROW);
    reach.metrics[key].value++;
    const { edits, manual } = plan(README, reach);
    assert.equal(edits.length, 4);
    assert.ok(edits.every(({ start }) => start < README.indexOf("### Video ranking")));
    assert.match(manual.join("\n"), /platform figures do not add up to the total/);
    assert.match(defects(README, reach).join("\n"), /platform figures do not add up to the total/);
  }
});

test("missing rows, changed labels, duplicated rows and fenced examples never produce blind edits", () => {
  const row = "| YouTube | 2,118 | 15,102,533 |";
  for (const content of [
    README.replace(`${row}\n`, ""),
    README.replace(row, row.replace("YouTube", "YouTube videos")),
    README.replace(row, `${row}\n${row}\n`),
    README.replace(row, `\`\`\`md\n${row}\n\`\`\``),
  ]) {
    const { edits, manual } = plan(content, REACH);
    assert.deepEqual(edits, []);
    assert.equal(manual.length, 2);
    assert.match(manual.join("\n"), /youtubeVideos/);
    assert.equal(defects(content, REACH).length, 2);
    assert.equal(defects(content, null).length, 2);
  }
});

test("collection date must follow its heading within 12 lines and before any next heading", () => {
  const date = "Collected on 2026-11-28.";
  const without = README.replace(`${date}\n`, "");
  for (const content of [
    `${date}\n${without}`,
    without.replace("### Video ranking", `### Video ranking\n${date}`),
    without.replace(
      "### Distribution snapshot",
      `### Distribution snapshot\n\nAnother heading\n===============\n\n${date}`
    ),
    without.replace(
      "### Distribution snapshot",
      `### Distribution snapshot${"\n".repeat(13)}${date}`
    ),
  ]) {
    for (const reach of [REACH, null]) {
      assert.match(defects(content, reach).join("\n"), /Collected on/);
      assert.deepEqual(plan(content, reach).edits, []);
    }
  }
  const boundary = without.replace(
    "### Distribution snapshot",
    `### Distribution snapshot${"\n".repeat(12)}${date}`
  );
  assert.deepEqual(defects(boundary, null), []);
});

test("null reach checks shape only, including canonical grouping and real ISO dates", () => {
  const different = README.replace("345,000+", "888,000+").replace("2026-11-28", "2024-02-29");
  assert.deepEqual(defects(different, null), []);
  assert.deepEqual(plan(different, null), { edits: [], manual: [] });

  const malformed = README.replace("345,000+", "345000+")
    .replace("15,102,533", "015,102,533")
    .replace("Collected on 2026-11-28", "Collected on 2026-02-30");
  assert.equal(defects(malformed, null).length, 3);
  assert.deepEqual(plan(malformed, null), { edits: [], manual: [] });
});

test("readReachFacts returns null on absence, reads the collector format and gives a fixed error", (t) => {
  const root = mkdtempSync(join(process.env.DATA_DIR ?? tmpdir(), "reach-claims-"));
  t.after(() => rmSync(root, { recursive: true }));
  assert.equal(readReachFacts(root), null);
  const snapshotDir = join(root, "docs/reference");
  mkdirSync(snapshotDir, { recursive: true });
  const file = join(snapshotDir, "reach-facts.json");
  writeFileSync(file, JSON.stringify(REACH));
  assert.deepEqual(readReachFacts(root), REACH);

  const invalidMetric = structuredClone(REACH);
  invalidMetric.metrics.videos.value = -1;
  const missingMetric = structuredClone(REACH);
  delete missingMetric.metrics.videos;
  const invalidTime = structuredClone(REACH);
  invalidTime.metrics.videos.collectedAt = "2026-11-28T24:00:00Z";
  for (const text of [
    "{ unparseable payload",
    JSON.stringify({ ...REACH, schema: 2 }),
    JSON.stringify({ ...REACH, collectedOn: "2026-11-27" }),
    JSON.stringify(invalidMetric),
    JSON.stringify(missingMetric),
    JSON.stringify(invalidTime),
  ]) {
    writeFileSync(file, text);
    assert.throws(() => readReachFacts(root), {
      message: "invalid docs/reference/reach-facts.json",
    });
  }
});
