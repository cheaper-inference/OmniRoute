import assert from "node:assert/strict";
import { execFile, spawnSync } from "node:child_process";
import { generateKeyPairSync, sign } from "node:crypto";
import { once } from "node:events";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import test from "node:test";
import { promisify } from "node:util";
import { load } from "js-yaml";

import { FREE_CATALOG_CURATED_AT } from "../../open-sse/config/freeModelCatalog.data.ts";
import { PINNED_FEED_PUBLIC_KEYS } from "../../src/lib/radar/pinnedKeys.ts";

const readSource = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
const importMonitor = () => import("../../scripts/ops/radar-monitor.mjs");
const signatureHeader = "x-omniroute-feed-signature";
const versionHeader = "x-omniroute-feed-version";
const version = "2026.11.25.1";
const now = "2026-11-25T12:00:00.000Z";
const generatedAt = "2026-11-25T11:00:00.000Z";
const curatedAt = "2026-11-23";
const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const pinnedKey = publicKey.export({ type: "spki", format: "der" }).toString("base64");

function signedFeed({
  kind = "catalog",
  feed = { version, generatedAt },
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
});

const healthCases = [
  ["a one-hour-old signed catalog", {}, [], version, generatedAt],
  [
    "a 27-hour-old signed catalog",
    { feed: { version, generatedAt: "2026-11-24T09:00:00.000Z" } },
    ["stale"],
    version,
    "2026-11-24T09:00:00.000Z",
  ],
  [
    "a signature for a different byte sequence",
    { signedBody: JSON.stringify({ version, generatedAt }, null, 2) },
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
  const { jobs } = load(source);
  const exportWorkflow = load(readSource(".github/workflows/radar-export.yml"));
  const pinnedActions = exportWorkflow.jobs["publish-export"].steps
    .filter((step) => step.uses)
    .map((step) => step.uses);
  assert.equal(pinnedActions.length, 2);
  assert.equal(Object.keys(jobs).length, 2);
  assert.deepEqual(jobs.probe.permissions, { contents: "read" });
  assert.deepEqual(jobs.report.permissions, { issues: "write", contents: "read" });

  for (const [job, files] of [
    [
      jobs.probe,
      [
        "open-sse/config/freeModelCatalog.data.ts",
        "scripts/ops/radar-monitor.mjs",
        "src/lib/radar/pinnedKeys.ts",
      ],
    ],
    [jobs.report, ["scripts/ops/radar-monitor.mjs"]],
  ]) {
    const actions = job.steps.filter((step) => step.uses);
    assert.deepEqual(
      actions.map((step) => step.uses),
      pinnedActions
    );
    assert.equal(actions[0].with["persist-credentials"], false);
    assert.equal(actions[0].with["sparse-checkout-cone-mode"], false);
    assert.deepEqual(actions[0].with["sparse-checkout"].trim().split("\n").sort(), files);
  }
  assert.doesNotMatch(source, /\bsecrets\s*\[/);
  assert.deepEqual(
    [...source.matchAll(/\bsecrets\.(\w+)/g)].map((match) => match[1]),
    ["GITHUB_TOKEN"]
  );
});
