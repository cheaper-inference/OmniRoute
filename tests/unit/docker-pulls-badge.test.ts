import assert from "node:assert/strict";
import { it } from "node:test";

import {
  buildDockerPullsBadge,
  fetchDockerPullCounts,
  formatPullCount,
  serializeDockerPullsBadge,
} from "../../scripts/release/lib/docker-pulls-badge.mjs";

it("formats pull counts and promotes rounded values to the next unit", () => {
  const cases = [
    [999, "999"],
    [1_000, "1k"],
    [5_568, "5.6k"],
    [99_949, "99.9k"],
    [608_400, "608k"],
    [999_960, "1M"],
    [2_119_712, "2.1M"],
    [2_000_000, "2M"],
    [999_960_000, "1B"],
    [1_234_000_000, "1.2B"],
  ] as const;
  for (const [count, expected] of cases) assert.equal(formatPullCount(count), expected);
});

it("sums the public pull counts from both Docker Hub repositories", async () => {
  const urls = new Map([
    ["https://hub.docker.com/v2/repositories/diegosouzapw/omniroute/", 2_114_144],
    ["https://hub.docker.com/v2/repositories/cheaperinference/omniroute/", 5_568],
  ]);
  const called: string[] = [];
  const result = await fetchDockerPullCounts({
    fetchImpl: async (url, options) => {
      called.push(String(url));
      assert.ok(options?.signal instanceof AbortSignal);
      return Response.json({ pull_count: urls.get(String(url)) });
    },
  });
  assert.deepEqual(called.sort(), [...urls.keys()].sort());
  assert.deepEqual(result, {
    total: 2_119_712,
    counts: { "diegosouzapw/omniroute": 2_114_144, "cheaperinference/omniroute": 5_568 },
  });
});

it("reports the repository and HTTP status when Docker Hub rejects the request", async () => {
  await assert.rejects(
    fetchDockerPullCounts({
      repositories: ["example/omniroute"],
      fetchImpl: async () => new Response("private diagnostic", { status: 429 }),
    }),
    { message: "example/omniroute (HTTP 429): request failed" }
  );
});

it("rejects a missing, non-integer, negative or unsafe pull_count", async () => {
  for (const pullCount of [undefined, "123", 1.5, -1, Number.MAX_SAFE_INTEGER + 1]) {
    await assert.rejects(
      fetchDockerPullCounts({
        repositories: ["example/omniroute"],
        fetchImpl: async () => Response.json({ pull_count: pullCount }),
      }),
      { message: "example/omniroute (HTTP 200): invalid pull_count" }
    );
  }
});

it("reports a malformed JSON response without exposing response text", async () => {
  await assert.rejects(
    fetchDockerPullCounts({
      repositories: ["example/omniroute"],
      fetchImpl: async () => new Response("private diagnostic"),
    }),
    { message: "example/omniroute (HTTP 200): invalid JSON" }
  );
});

it("reports a transport failure without exposing the underlying error text", async () => {
  await assert.rejects(
    fetchDockerPullCounts({
      repositories: ["example/omniroute"],
      fetchImpl: async () => {
        throw new Error("private diagnostic");
      },
    }),
    { message: "example/omniroute (no HTTP response): request failed" }
  );
});

it("builds a Shields endpoint badge using only schema fields", () => {
  const badge = buildDockerPullsBadge(2_119_712);
  assert.deepEqual(badge, {
    schemaVersion: 1,
    label: "docker pulls",
    message: "2.1M",
    color: "2496ED",
    namedLogo: "docker",
    cacheSeconds: 3600,
  });
  assert.equal(serializeDockerPullsBadge(badge), JSON.stringify(badge, null, 2) + "\n");
});
