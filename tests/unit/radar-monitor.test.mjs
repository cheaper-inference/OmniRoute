import assert from "node:assert/strict";
import { execFile, spawnSync } from "node:child_process";
import { generateKeyPairSync, sign } from "node:crypto";
import { once } from "node:events";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import test from "node:test";
import { promisify } from "node:util";
import { load } from "js-yaml";

import { FREE_CATALOG_CURATED_AT } from "../../open-sse/config/freeModelCatalog.data.ts";
import { RadarFeedSchema } from "../../src/lib/radar/feedSchema.ts";
import { PINNED_FEED_PUBLIC_KEYS } from "../../src/lib/radar/pinnedKeys.ts";
import { verifyFeedBytes } from "../../src/lib/radar/verify.ts";

const readSource = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
const importMonitor = () => import("../../scripts/ops/radar-monitor.mjs");
const signatureHeader = "x-omniroute-feed-signature";
const versionHeader = "x-omniroute-feed-version";
const version = "2026.11.25.1";
const now = "2026-11-25T12:00:00.000Z";
const generatedAt = "2026-11-25T11:00:00.000Z";
const catalog = {
  feed: "omniroute-radar",
  schemaVersion: 2,
  version,
  generatedAt,
  tier: "community",
  counts: { providers: 0, models: 0 },
  providers: [],
  models: [],
  quirks: [],
  referrals: { fixed: [], campaigns: [] },
  totals: { dedupedTokensPerMonth: 0, modelCount: 0, poolCount: 0 },
};
const curatedAt = "2026-11-23";
const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const pinnedKey = publicKey.export({ type: "spki", format: "der" }).toString("base64");

function signedFeed({
  kind = "catalog",
  feed = catalog,
  body = JSON.stringify(feed),
  signedBody = body,
  headers = {},
  ...overrides
} = {}) {
  return {
    kind,
    status: 200,
    headers: {
      [signatureHeader]: sign(null, Buffer.from(signedBody), privateKey).toString("base64"),
      ...headers,
    },
    bodyBytes: Buffer.from(body),
    now,
    pinnedKeys: [pinnedKey],
    curatedAt,
    ...overrides,
  };
}

test("reads the exact pinned key array from the source file", async () => {
  const { readPinnedKeysFromSource } = await importMonitor();
  assert.deepEqual(
    readPinnedKeysFromSource(readSource("src/lib/radar/pinnedKeys.ts")),
    PINNED_FEED_PUBLIC_KEYS
  );
});

test("reads the exact curation date from the source file", async () => {
  const { readCuratedAtFromSource } = await importMonitor();
  assert.equal(
    readCuratedAtFromSource(readSource("open-sse/config/freeModelCatalog.data.ts")),
    FREE_CATALOG_CURATED_AT
  );
  const result = spawnSync(
    process.execPath,
    [
      "scripts/ops/radar-monitor.mjs",
      "--read-curated-at",
      "open-sse/config/freeModelCatalog.data.ts",
    ],
    { encoding: "utf8" }
  );
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, `${FREE_CATALOG_CURATED_AT}\n`);
});

test("the default signed catalog body satisfies the client schema", () => {
  assert.equal(
    RadarFeedSchema.safeParse(JSON.parse(signedFeed().bodyBytes.toString())).success,
    true
  );
});

const healthCases = [
  ["a one-hour-old signed catalog", {}, [], version, generatedAt],
  [
    "a signed catalog one millisecond under 26 hours old",
    { feed: { version, generatedAt: "2026-11-24T10:00:00.001Z" } },
    [],
    version,
    "2026-11-24T10:00:00.001Z",
  ],
  [
    "a signed catalog exactly 26 hours old",
    { feed: { version, generatedAt: "2026-11-24T10:00:00.000Z" } },
    ["stale"],
    version,
    "2026-11-24T10:00:00.000Z",
  ],
  [
    "a 27-hour-old signed catalog",
    { feed: { version, generatedAt: "2026-11-24T09:00:00.000Z" } },
    ["stale"],
    version,
    "2026-11-24T09:00:00.000Z",
  ],
  [
    "a signature for a different byte sequence",
    { signedBody: JSON.stringify(catalog, null, 2) },
    ["bad-signature"],
    null,
    null,
  ],
  [
    "a missing signature",
    { headers: { [signatureHeader]: "" } },
    ["missing-signature"],
    null,
    null,
  ],
  ["an HTTP 404", { status: 404, headers: { [signatureHeader]: "" } }, ["http-404"], null, null],
  [
    "a feed generated before curation",
    { curatedAt: "2026-11-26" },
    ["before-curation"],
    version,
    generatedAt,
  ],
  [
    "a feed generated exactly at the curation floor",
    { curatedAt: "2026-11-25", feed: { version, generatedAt: "2026-11-25T00:00:00.000Z" } },
    [],
    version,
    "2026-11-25T00:00:00.000Z",
  ],
  [
    "a malformed catalog version",
    { feed: { version: "abc", generatedAt } },
    ["bad-version"],
    null,
    generatedAt,
  ],
  ["signed invalid JSON", { body: "{" }, ["invalid-json"], null, null],
  [
    "signed JSON without a generation timestamp",
    { feed: { version } },
    ["invalid-json"],
    version,
    null,
  ],
  [
    "a referrals feed without a body version",
    { kind: "referrals", feed: { generatedAt } },
    [],
    null,
    generatedAt,
  ],
  [
    "a referrals feed with a valid version header",
    { kind: "referrals", feed: { generatedAt }, headers: { [versionHeader]: version } },
    [],
    version,
    generatedAt,
  ],
  [
    "a referrals feed with a malformed version header",
    { kind: "referrals", feed: { generatedAt }, headers: { [versionHeader]: "abc" } },
    ["bad-version"],
    null,
    generatedAt,
  ],
  [
    "a feed signed by the second key in the rotation",
    { pinnedKeys: ["invalid", pinnedKey] },
    [],
    version,
    generatedAt,
  ],
];

for (const [description, options, problems, expectedVersion, expectedGeneratedAt] of healthCases) {
  test(`evaluates ${description}`, async () => {
    const { evaluateFeedHealth } = await importMonitor();
    assert.deepEqual(evaluateFeedHealth(signedFeed(options)), {
      ok: problems.length === 0,
      problems,
      version: expectedVersion,
      generatedAt: expectedGeneratedAt,
    });
  });
}

test("matches the client verifier on exact bytes and base64 with an internal space", async (t) => {
  const { evaluateFeedHealth } = await importMonitor();
  const sample = signedFeed();
  const signature = sample.headers[signatureHeader];
  const spacedSignature = `${signature.slice(0, 12)} ${signature.slice(12)}`;
  const changedBytes = Buffer.from(sample.bodyBytes);
  changedBytes[changedBytes.indexOf(version) + version.length - 1] ^= 1;

  const previousKey = process.env.RADAR_FEED_PUBKEY;
  process.env.RADAR_FEED_PUBKEY = pinnedKey;
  t.after(() => {
    if (previousKey === undefined) delete process.env.RADAR_FEED_PUBKEY;
    else process.env.RADAR_FEED_PUBKEY = previousKey;
  });

  for (const signatureValue of [signature, spacedSignature]) {
    assert.equal(verifyFeedBytes(sample.bodyBytes, signatureValue), true);
    assert.equal(verifyFeedBytes(changedBytes, signatureValue), false);
    const headers = { ...sample.headers, [signatureHeader]: signatureValue };
    assert.equal(evaluateFeedHealth({ ...sample, headers }).ok, true);
    assert.deepEqual(evaluateFeedHealth({ ...sample, headers, bodyBytes: changedBytes }).problems, [
      "bad-signature",
    ]);
  }
});

test("passes a 30-second timeout signal to fetch", async (t) => {
  const { fetchFeedHealth } = await importMonitor();
  const { kind, status, headers, bodyBytes, ...context } = signedFeed();
  const timeout = t.mock.method(AbortSignal, "timeout", AbortSignal.timeout);
  const fetch = t.mock.method(
    globalThis,
    "fetch",
    async () => new Response(bodyBytes, { status, headers })
  );

  const result = await fetchFeedHealth(new URL("http://127.0.0.1"), kind, context);

  assert.equal(result.ok, true);
  assert.deepEqual(
    timeout.mock.calls.map(({ arguments: args }) => args),
    [[30_000]]
  );
  assert.equal(fetch.mock.calls[0].arguments[1].signal, timeout.mock.calls[0].result);
});

test("cancels a signed feed when its streamed body exceeds the size limit", async (t) => {
  const { fetchFeedHealth } = await importMonitor();
  const { kind, status, headers, bodyBytes, ...context } = signedFeed();
  let cancelled = false;
  const body = new ReadableStream(
    {
      start(controller) {
        controller.enqueue(bodyBytes.subarray(0, 1));
        controller.enqueue(bodyBytes.subarray(1));
      },
      pull(controller) {
        controller.close();
      },
      cancel() {
        cancelled = true;
      },
    },
    { highWaterMark: 0 }
  );
  t.mock.method(globalThis, "fetch", async () => new Response(body, { status, headers }));

  const result = await fetchFeedHealth(new URL("http://127.0.0.1"), kind, context, {
    maxFeedBytes: bodyBytes.byteLength - 1,
  });
  assert.deepEqual(result, {
    ok: false,
    problems: ["too-large"],
    version: null,
    generatedAt: null,
  });
  assert.equal(cancelled, true);
});

test("sorts the problem key independently of discovery order", async () => {
  const { problemsKey } = await importMonitor();
  const problems = ["stale", "bad-version"];
  assert.equal(problemsKey(problems), "bad-version,stale");
  assert.deepEqual(problems, ["stale", "bad-version"]);
  assert.equal(problemsKey([]), "");
});

const actionCases = [
  ["a healthy feed without an issue", true, null, "none"],
  ["a healthy feed with an issue", true, { lastMarkerKey: null, lastMarkerAt: null }, "close"],
  ["an unhealthy feed without an issue", false, null, "create"],
  [
    "the same failure reported two hours ago",
    false,
    { lastMarkerKey: "same", lastMarkerAt: "2026-11-25T10:00:00Z" },
    "none",
  ],
  [
    "the same failure reported 25 hours ago",
    false,
    { lastMarkerKey: "same", lastMarkerAt: "2026-11-24T11:00:00Z" },
    "comment",
  ],
  [
    "a different failure reported two hours ago",
    false,
    { lastMarkerKey: "different", lastMarkerAt: "2026-11-25T10:00:00Z" },
    "comment",
  ],
  [
    "an issue without a usable marker",
    false,
    { lastMarkerKey: null, lastMarkerAt: null },
    "comment",
  ],
];

for (const [description, healthy, openIssue, expected] of actionCases) {
  test(`decides what to do for ${description}`, async () => {
    const { decideReportAction } = await importMonitor();
    assert.equal(decideReportAction({ healthy, key: "same", openIssue, now }), expected);
  });
}

test("--decide reads JSON from stdin and prints the action", () => {
  const result = spawnSync(process.execPath, ["scripts/ops/radar-monitor.mjs", "--decide"], {
    input: JSON.stringify({ healthy: false, key: "same", openIssue: null, now }),
    encoding: "utf8",
  });
  assert.equal(result.status, 0);
  assert.equal(result.stdout, "create\n");
  assert.equal(result.stderr, "");
});

test("--url fails before fetching when the explicit curation date is missing or invalid", () => {
  for (const dateArgs of [[], ["--curated-at", "invalid"], ["--curated-at", "2026-02-30"]]) {
    const result = spawnSync(
      process.execPath,
      ["scripts/ops/radar-monitor.mjs", "--url", "http://127.0.0.1:1", ...dateArgs],
      { encoding: "utf8" }
    );
    assert.equal(result.status, 2);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /curation-date-unavailable/);
  }
});

test("--url probes both routes unconditionally and reports an unhealthy feed as JSON", async (t) => {
  const requests = [];
  const server = createServer((request, response) => {
    requests.push({
      url: request.url,
      schema: request.headers["x-omniroute-radar-schema"],
      etag: request.headers["if-none-match"],
      modifiedSince: request.headers["if-modified-since"],
    });
    response.writeHead(404).end();
  });
  server.listen(0, "127.0.0.1");
  t.after(() => server.close());
  await once(server, "listening");

  await assert.rejects(
    promisify(execFile)(process.execPath, [
      "scripts/ops/radar-monitor.mjs",
      "--url",
      `http://127.0.0.1:${server.address().port}`,
      "--curated-at",
      FREE_CATALOG_CURATED_AT,
      "--pinned-keys",
      "src/lib/radar/pinnedKeys.ts",
    ]),
    (error) => {
      assert.equal(error.code, 1);
      assert.equal(error.stderr, "");
      const { healthy, key, feeds } = JSON.parse(error.stdout);
      assert.equal(healthy, false);
      assert.equal(key, "catalog:http-404,referrals:http-404");
      assert.deepEqual(feeds.catalog.problems, ["http-404"]);
      assert.deepEqual(feeds.referrals.problems, ["http-404"]);
      return true;
    }
  );
  requests.sort((left, right) => left.url.localeCompare(right.url));
  assert.deepEqual(
    requests,
    ["/v1/catalog/latest", "/v1/referrals/latest"].map((url) => ({
      url,
      schema: "2",
      etag: undefined,
      modifiedSince: undefined,
    }))
  );
});

test("schedules only hourly upstream runs and supports manual dispatch", () => {
  const workflow = load(readSource(".github/workflows/radar-monitor.yml"));
  assert.deepEqual(Object.keys(workflow.on).sort(), ["schedule", "workflow_dispatch"]);
  assert.deepEqual(workflow.on.schedule, [{ cron: "37 * * * *" }]);
  for (const job of Object.values(workflow.jobs)) {
    assert.ok(
      job.if.includes(
        "github.event_name != 'schedule' || github.repository == 'cheaper-inference/OmniRoute'"
      )
    );
  }
});

test("isolates the probe and report with least privilege, sparse checkouts and pinned actions", () => {
  const source = readSource(".github/workflows/radar-monitor.yml");
  const { jobs, permissions } = load(source);
  const exportWorkflow = load(readSource(".github/workflows/radar-export.yml"));
  const pinnedActions = exportWorkflow.jobs["publish-export"].steps
    .filter((step) => step.uses)
    .map((step) => step.uses);
  assert.equal(pinnedActions.length, 2);
  assert.equal(Object.keys(jobs).length, 2);
  assert.deepEqual(permissions, { contents: "read" });
  assert.deepEqual(jobs.probe.permissions, { contents: "read" });
  assert.deepEqual(jobs.report.permissions, { issues: "write", contents: "read" });

  for (const [job, checkouts] of [
    [
      jobs.probe,
      [
        ["scripts/ops/radar-monitor.mjs"],
        ["open-sse/config/freeModelCatalog.data.ts", "src/lib/radar/pinnedKeys.ts"],
      ],
    ],
    [jobs.report, [["scripts/ops/radar-monitor.mjs"]]],
  ]) {
    const actions = job.steps.filter((step) => step.uses);
    assert.deepEqual(
      actions.map((step) => step.uses),
      [...Array(checkouts.length).fill(pinnedActions[0]), pinnedActions[1]]
    );
    for (const [index, files] of checkouts.entries()) {
      assert.equal(actions[index].with["persist-credentials"], false);
      assert.equal(actions[index].with["sparse-checkout-cone-mode"], false);
      assert.deepEqual(actions[index].with["sparse-checkout"].trim().split("\n").sort(), files);
    }
  }
  assert.doesNotMatch(source, /\bsecrets\s*\[/);
  assert.deepEqual([...source.matchAll(/\bsecrets\.(\w+)/g)], []);
  assert.equal(
    jobs.report.steps.find((step) => step.env?.GH_TOKEN)?.env.GH_TOKEN,
    "${{ github.token }}"
  );
});

test("resolves the highest stable release SHA and fails on an unavailable ref", (t) => {
  const { jobs } = load(readSource(".github/workflows/radar-monitor.yml"));
  const resolve = jobs.probe.steps.find((step) => step.id === "release");
  assert.ok(resolve);
  const checkout = jobs.probe.steps.find((step) => step.with?.path === "radar-release");
  assert.equal(checkout?.with.ref, "${{ steps.release.outputs.sha }}");

  const directory = mkdtempSync("tests/unit/.radar-monitor-");
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const outputPath = `${directory}/output`;
  const highest = "a".repeat(40);
  const other = "b".repeat(40);
  const refs = [
    `${other}\trefs/heads/release/v3.9.99`,
    `${highest}\trefs/heads/release/v3.10.2`,
    `${other}\trefs/heads/release/v3.10.1`,
    `${other}\trefs/heads/release/v4.0.0-rc.1`,
    `${other}\trefs/heads/release/v5.0.0/preview`,
  ].join("\n");
  function runResolver(input, gitStatus) {
    writeFileSync(outputPath, "");
    const result = spawnSync(
      "bash",
      ["-c", `git() { cat; return "$RESOLVER_GIT_STATUS"; }\n${resolve.run}`],
      {
        encoding: "utf8",
        env: { GITHUB_OUTPUT: outputPath, RESOLVER_GIT_STATUS: gitStatus },
        input,
      }
    );
    return { ...result, output: readFileSync(outputPath, "utf8") };
  }
  const resolved = runResolver(refs, "0");
  assert.equal(resolved.status, 0, resolved.stderr);
  assert.equal(resolved.output, `sha=${highest}\n`);
  for (const failed of [runResolver("", "0"), runResolver(refs, "1")]) {
    assert.equal(failed.status, 2);
    assert.match(failed.stdout, /release-ref-unavailable/);
    assert.equal(failed.output, "");
  }
});
