import assert from "node:assert/strict";
import { spawnSync, type SpawnSyncReturns } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import test, { type TestContext } from "node:test";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../../scripts/release/reach-facts.mjs", import.meta.url));
const now = "2026-11-28T00:00:00Z";
const collectedAt = "2026-11-27T08:45:33Z";
const token = "fixture-read-token";
const limit = 1024 * 1024;
const values = {
  creators: 1950,
  dockerPulls: 3000,
  instagramVideos: 200,
  instagramViews: 2000,
  npmDownloads30d: 500,
  releaseDownloads: 5000,
  repoViews14d: 600,
  tiktokVideos: 300,
  tiktokViews: 3000,
  videoViews: 40903073,
  videos: 100,
  youtubeVideos: 400,
  youtubeViews: 4000,
};
const baseline = {
  schema: 1,
  collectedOn: "2026-11-27",
  metrics: Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      { value, collectedAt: key === "creators" ? "2026-11-26T23:59:59Z" : collectedAt },
    ])
  ),
};
const baselineBytes = Buffer.from(JSON.stringify(baseline, null, 2) + "\n");

function source() {
  return {
    schema: 1,
    generatedAt: now,
    metrics: Object.entries(baseline.metrics)
      .reverse()
      .map(([key, metric]) => ({ key, ...metric, source: "fixture" })),
  };
}

function changedMetric(key: string, changes: Record<string, unknown>) {
  const input = source();
  return {
    ...input,
    metrics: input.metrics.map((metric) =>
      metric.key === key ? { ...metric, ...changes } : metric
    ),
  };
}

function setup(t: TestContext, previous: Buffer | string | null = baselineBytes) {
  const dir = mkdtempSync(join(tmpdir(), "reach-facts-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));

  const bin = join(dir, "bin");
  const out = join(dir, "snapshot.json");
  const fixture = join(dir, "source.json");
  const calls = join(dir, "gh-calls.jsonl");
  mkdirSync(bin);
  if (previous !== null) writeFileSync(out, previous);
  writeFileSync(
    join(bin, "gh"),
    `#!/usr/bin/env node
const { appendFileSync, readFileSync } = require("node:fs");
const { GH_TOKEN, REACH_TEST_CALLS, REACH_TEST_FIXTURE, REACH_TEST_GH_FAIL } = process.env;
const call = { args: process.argv.slice(2), token: GH_TOKEN };
appendFileSync(REACH_TEST_CALLS, JSON.stringify(call) + "\\n");
if (REACH_TEST_GH_FAIL === "1") {
  process.stdout.write(GH_TOKEN + " private response");
  process.stderr.write(GH_TOKEN + " private diagnostic");
  process.exitCode = 1;
} else {
  process.stdout.write(readFileSync(REACH_TEST_FIXTURE));
}
`,
    { mode: 0o755 }
  );

  function run(args: string[] = [], env: NodeJS.ProcessEnv = {}) {
    const result = spawnSync(process.execPath, [cli, "--now", now, "--out", out, ...args], {
      cwd: dir,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: [bin, process.env.PATH].join(delimiter),
        GH_TOKEN: "ambient-gh-token",
        GITHUB_TOKEN: "ambient-github-token",
        TRACKER_EXPORT_READ_TOKEN: token,
        TRACKER_EXPORT_REPOSITORY: repository,
        REACH_TEST_CALLS: calls,
        REACH_TEST_FIXTURE: fixture,
        REACH_TEST_GH_FAIL: undefined,
        ...env,
      },
    });
    assert.ifError(result.error);
    return result;
  }

  return {
    dir,
    out,
    fixture,
    run,
    useSource(input: unknown = source()) {
      writeFileSync(fixture, typeof input === "string" ? input : JSON.stringify(input));
    },
    calls() {
      return existsSync(calls)
        ? readFileSync(calls, "utf8")
            .trimEnd()
            .split("\n")
            .map((line) => JSON.parse(line))
        : [];
    },
  };
}

function assertUnchanged(
  result: SpawnSyncReturns<string>,
  out: string,
  reason: string,
  previous: Buffer | string = baselineBytes
) {
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, `reach-facts: unchanged (${reason})\n`);
  assert.equal(result.stderr, "");
  assert.deepEqual(readFileSync(out), Buffer.from(previous));
}

function assertUsageError(result: SpawnSyncReturns<string>, reason: string) {
  assert.equal(result.status, 2);
  assert.equal(result.stdout, "");
  assert.equal(result.stderr, `reach-facts: ${reason}\n`);
}

function readMetrics(out: string): typeof baseline.metrics {
  return JSON.parse(readFileSync(out, "utf8")).metrics;
}

const rawHeader = ["--header", "Accept: application/vnd.github.raw+json"];
const repository = "example-org/reach-export";

test("fetches raw reach.json once and saves the exact first snapshot", (t) => {
  const h = setup(t, null);
  h.useSource();
  const result = h.run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "reach-facts: updated 13 metric(s), collected on 2026-11-27\n");
  assert.equal(result.stderr, "");
  assert.deepEqual(h.calls(), [
    {
      args: ["api", `repos/${repository}/contents/reach.json`, ...rawHeader],
      token,
    },
  ]);
  assert.deepEqual(readFileSync(h.out), baselineBytes);
  assert.deepEqual(Object.keys(readMetrics(h.out)), Object.keys(values));
  assert.match(readFileSync(h.out, "utf8"), /}\n$/);
  assert.deepEqual(readdirSync(h.dir).sort(), [
    "bin",
    "gh-calls.jsonl",
    "snapshot.json",
    "source.json",
  ]);
});

for (const readToken of [undefined, ""]) {
  const tokenState = readToken === undefined ? "missing" : "blank";
  test(`leaves the snapshot intact with a ${tokenState} token`, (t) => {
    const h = setup(t);
    h.useSource(changedMetric("videos", { value: 101 }));
    assertUnchanged(h.run([], { TRACKER_EXPORT_READ_TOKEN: readToken }), h.out, "no-read-token");
    assert.deepEqual(h.calls(), []);
  });
}

for (const name of [undefined, ""]) {
  const nameState = name === undefined ? "missing" : "blank";
  test(`leaves the snapshot intact with a ${nameState} repository name`, (t) => {
    const h = setup(t);
    h.useSource(changedMetric("videos", { value: 101 }));
    assertUnchanged(h.run([], { TRACKER_EXPORT_REPOSITORY: name }), h.out, "no-repository");
    assert.deepEqual(h.calls(), []);
  });
}

test("keeps the export repository name out of the script source", () => {
  const text = readFileSync(cli, "utf8");
  assert.doesNotMatch(text, /repos\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/contents/);
  assert.doesNotMatch(text, /["'`][A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]*export[A-Za-z0-9_.-]*["'`]/i);
});

test("suppresses private gh stdout and stderr when gh fails", (t) => {
  const h = setup(t);
  assertUnchanged(h.run([], { REACH_TEST_GH_FAIL: "1" }), h.out, "source-unavailable");
  assert.equal(h.calls().length, 1);
});

test("reads from the configured repository", (t) => {
  const h = setup(t);
  h.useSource();
  assertUnchanged(
    h.run([], { TRACKER_EXPORT_REPOSITORY: "other-org/project.export" }),
    h.out,
    "same-values"
  );
  assert.deepEqual(h.calls(), [
    { args: ["api", "repos/other-org/project.export/contents/reach.json", ...rawHeader], token },
  ]);
});

test("rejects an invalid repository before invoking gh", (t) => {
  const h = setup(t);
  assertUsageError(
    h.run([], { TRACKER_EXPORT_REPOSITORY: "owner/name/extra" }),
    "invalid-repository"
  );
  assert.deepEqual(h.calls(), []);
  assert.deepEqual(readFileSync(h.out), baselineBytes);
});

test("uses a local source without a token or a gh call", (t) => {
  const h = setup(t);
  h.useSource(changedMetric("videos", { value: 101 }));
  const originalInode = statSync(h.out).ino;
  const result = h.run(["--source-file", "source.json"], { TRACKER_EXPORT_READ_TOKEN: undefined });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "reach-facts: updated 1 metric(s), collected on 2026-11-27\n");
  assert.equal(readMetrics(h.out).videos.value, 101);
  assert.notEqual(statSync(h.out).ino, originalInode);
  assert.deepEqual(h.calls(), []);
});

test("leaves the snapshot intact when the local source cannot be read", (t) => {
  const h = setup(t);
  assertUnchanged(h.run(["--source-file", h.fixture]), h.out, "source-unavailable");
  assert.deepEqual(h.calls(), []);
});

const rejectedInputs: Array<[string, unknown, string]> = [
  ["invalid JSON", "{", "invalid-json"],
  ["null root", null, "unsupported-schema"],
  ["array root", [], "unsupported-schema"],
  ["unknown schema", { ...source(), schema: 2 }, "unsupported-schema"],
  ["non-array metrics", { ...source(), metrics: {} }, "malformed-metrics"],
  ["empty metrics", { ...source(), metrics: [] }, "malformed-metrics"],
  ["non-object metric", { ...source(), metrics: [null] }, "malformed-metrics"],
  ["non-string key", changedMetric("videos", { key: 23 }), "malformed-metrics"],
  ["malformed key", changedMetric("videos", { key: "Videos" }), "malformed-metrics"],
  [
    "duplicate key",
    { ...source(), metrics: [...source().metrics, source().metrics[0]] },
    "duplicate-key:youtubeViews",
  ],
  [
    "missing required key",
    { ...source(), metrics: source().metrics.filter(({ key }) => key !== "videos") },
    "missing-key:videos",
  ],
  ["numeric string", changedMetric("videos", { value: "101" }), "invalid-value:videos"],
  ["zero", changedMetric("videos", { value: 0 }), "invalid-value:videos"],
  ["negative", changedMetric("videos", { value: -1 }), "invalid-value:videos"],
  ["decimal", changedMetric("videos", { value: 100.5 }), "invalid-value:videos"],
  [
    "above MAX_SAFE_INTEGER",
    changedMetric("videos", { value: Number.MAX_SAFE_INTEGER + 1 }),
    "invalid-value:videos",
  ],
  [
    "invalid optional value",
    changedMetric("repoViews14d", { value: 0 }),
    "invalid-value:repoViews14d",
  ],
  [
    "date without Z",
    changedMetric("videos", { collectedAt: "2026-11-27T08:45:33" }),
    "invalid-date:videos",
  ],
  [
    "impossible calendar date",
    changedMetric("videos", { collectedAt: "2026-02-30T00:00:00Z" }),
    "invalid-date:videos",
  ],
  [
    "rolled-over hour",
    changedMetric("videos", { collectedAt: "2026-11-27T24:00:00Z" }),
    "invalid-date:videos",
  ],
  [
    "72 hours and one second old",
    changedMetric("videos", { collectedAt: "2026-11-24T23:59:59Z" }),
    "stale:videos",
  ],
  [
    "one hour and one second in the future",
    changedMetric("videos", { collectedAt: "2026-11-28T01:00:01Z" }),
    "future-date:videos",
  ],
  [
    "submillisecond past the future boundary",
    changedMetric("videos", { collectedAt: "2026-11-28T01:00:00.0001Z" }),
    "future-date:videos",
  ],
  ["21 percent cumulative drop", changedMetric("videos", { value: 79 }), "drop:videos"],
];

for (const [name, input, reason] of rejectedInputs) {
  test(`refuses ${name} and preserves the prior bytes`, (t) => {
    const h = setup(t);
    h.useSource(input);
    assertUnchanged(h.run(["--source-file", h.fixture]), h.out, reason);
  });
}

const acceptedDates = [
  ["exactly 72 hours old", "2026-11-25T00:00:00Z", "2026-11-27", []],
  ["exactly one hour ahead", "2026-11-28T01:00:00Z", "2026-11-28", []],
  [
    "fractional UTC seconds",
    "2026-11-28T01:00:00.12345Z",
    "2026-11-28",
    ["--now", "2026-11-28T00:00:00.123450Z"],
  ],
] as const;

for (const [name, date, day, args] of acceptedDates) {
  test(`accepts ${name} and updates the date without counting a value change`, (t) => {
    const h = setup(t);
    h.useSource(changedMetric("videos", { collectedAt: date }));
    const result = h.run(["--source-file", h.fixture, ...args]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, `reach-facts: updated 0 metric(s), collected on ${day}\n`);
    assert.equal(readMetrics(h.out).videos.collectedAt, date);
  });
}

for (const [key, value, args] of [
  ["videos", 80, ["--allow-drop", "creators"]],
  ["npmDownloads30d", 1, []],
  ["repoViews14d", 1, []],
  ["videos", 1, ["--allow-drop", "videos"]],
] as const) {
  test(`accepts ${key} dropping to ${value} with options [${args.join(", ")}]`, (t) => {
    const h = setup(t);
    h.useSource(changedMetric(key, { value }));
    const result = h.run(["--source-file", h.fixture, ...args]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, "reach-facts: updated 1 metric(s), collected on 2026-11-27\n");
    assert.equal(readMetrics(h.out)[key].value, value);
  });
}

test("checks all drops and honors repeatable allowances", (t) => {
  const h = setup(t);
  const input = changedMetric("videos", { value: 1 });
  h.useSource({
    ...input,
    metrics: input.metrics.map((metric) =>
      metric.key === "creators" ? { ...metric, value: 1 } : metric
    ),
  });
  const args = ["--source-file", h.fixture, "--allow-drop", "videos"];
  assertUnchanged(h.run(args), h.out, "drop:creators");
  const result = h.run([...args, "--allow-drop", "creators"]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "reach-facts: updated 2 metric(s), collected on 2026-11-27\n");
  assert.equal(readMetrics(h.out).videos.value, 1);
  assert.equal(readMetrics(h.out).creators.value, 1);
});

test("drops an absent optional key and includes an unknown valid key in sorted order", (t) => {
  const h = setup(t);
  const input = source();
  h.useSource({
    ...input,
    metrics: [
      ...input.metrics.filter(({ key }) => key !== "repoViews14d"),
      { key: "newMetric", value: 200, collectedAt },
    ],
  });
  const result = h.run(["--source-file", h.fixture]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "reach-facts: updated 1 metric(s), collected on 2026-11-27\n");
  const metrics = readMetrics(h.out);
  assert.deepEqual(metrics.newMetric, { value: 200, collectedAt });
  assert.equal(Object.hasOwn(metrics, "repoViews14d"), false);
  assert.deepEqual(Object.keys(metrics), Object.keys(metrics).sort());
});

test("ignores changed metadata without rewriting the snapshot or changing its mtime", (t) => {
  const h = setup(t);
  const input = source();
  h.useSource({
    ...input,
    generatedAt: "2026-11-28T02:00:00Z",
    metrics: input.metrics.map((metric) => ({ ...metric, source: "changed fixture" })),
  });
  utimesSync(h.out, 1_700_000_000, 1_700_000_000);
  const originalMtime = statSync(h.out).mtimeMs;
  assertUnchanged(h.run(["--source-file", h.fixture]), h.out, "same-values");
  assert.equal(statSync(h.out).mtimeMs, originalMtime);
});

for (const [name, previous] of [
  ["corrupted JSON", "{not JSON"],
  ["unsupported schema", JSON.stringify({ ...baseline, schema: 0 })],
  ["bad metric", JSON.stringify({ ...baseline, metrics: { videos: { value: -1, collectedAt } } })],
  ["inconsistent date", JSON.stringify({ ...baseline, collectedOn: "2026-11-28" })],
]) {
  test(`preserves an unreadable snapshot with ${name}`, (t) => {
    const h = setup(t, previous);
    h.useSource();
    assertUnchanged(h.run(["--source-file", h.fixture]), h.out, "unreadable-snapshot", previous);
  });
}

test("dry run reports a real change without creating a snapshot", (t) => {
  const h = setup(t, null);
  h.useSource();
  const result = h.run(["--source-file", h.fixture, "--dry-run"]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "reach-facts: would update 13 metric(s), collected on 2026-11-27\n");
  assert.equal(existsSync(h.out), false);
});

test("dry run preserves the prior snapshot on a valid update", (t) => {
  const h = setup(t);
  h.useSource(changedMetric("videos", { value: 101 }));
  const result = h.run(["--source-file", h.fixture, "--dry-run"]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, "reach-facts: would update 1 metric(s), collected on 2026-11-27\n");
  assert.deepEqual(readFileSync(h.out), baselineBytes);
});

test("reports an output failure with a fixed message", (t) => {
  const h = setup(t);
  h.useSource();
  const result = h.run(["--source-file", h.fixture, "--out", "absent/snapshot.json"]);
  assertUsageError(result, "output-unwritable");
  assert.equal(existsSync(join(h.dir, "absent")), false);
  assert.deepEqual(readFileSync(h.out), baselineBytes);
});

test("reports an output failure when the parent is a regular file", (t) => {
  const h = setup(t);
  h.useSource();
  const result = h.run(["--source-file", h.fixture, "--out", "source.json/snapshot.json"]);
  assertUsageError(result, "output-unwritable");
  assert.deepEqual(readFileSync(h.out), baselineBytes);
});

for (const transport of ["gh", "file"]) {
  test(`refuses a ${transport} source above one MiB and accepts the exact limit`, (t) => {
    const h = setup(t);
    const input = JSON.stringify(changedMetric("videos", { value: 101 }));
    // Multibyte metadata means counting string length would undercount the input.
    const fullSize = input.replaceAll("fixture", "é".repeat(50));
    const paddedInput = fullSize + " ".repeat(limit - Buffer.byteLength(fullSize));
    const args = transport === "file" ? ["--source-file", h.fixture] : [];
    h.useSource(paddedInput + " ");
    assertUnchanged(h.run(args), h.out, "source-too-large");
    h.useSource(paddedInput);
    const result = h.run(args);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, "reach-facts: updated 1 metric(s), collected on 2026-11-27\n");
  });
}

for (const [args, reason] of [
  [["--unknown-option"], "invalid-arguments"],
  [["--now", "yesterday"], "invalid-now"],
  [["--allow-drop", "invalid-key"], "invalid-allow-drop"],
] as const) {
  test(`rejects ${args.join(" ")} as a usage error`, (t) => {
    const h = setup(t);
    assertUsageError(h.run([...args]), reason);
    assert.deepEqual(h.calls(), []);
    assert.deepEqual(readFileSync(h.out), baselineBytes);
  });
}

test("exports pure validation and rendering without running the CLI on import", async () => {
  const { validateReach, renderSnapshot } = await import("../../scripts/release/reach-facts.mjs");
  const result = validateReach(source(), { now: Date.parse(now) });
  assert.equal(result.ok, true);
  assert.deepEqual(result.snapshot, baseline);
  assert.equal(renderSnapshot(result.snapshot), baselineBytes.toString());
  assert.deepEqual(validateReach(null, { now: Date.parse(now) }), {
    ok: false,
    reason: "unsupported-schema",
  });
});
