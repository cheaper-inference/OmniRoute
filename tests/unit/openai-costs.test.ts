import test from "node:test";
import assert from "node:assert/strict";
import {
  clearOpenAICostCache,
  fetchOpenAICosts,
  openAICostWindow,
} from "../../src/lib/usage/openaiCosts.ts";

const now = new Date("2026-11-08T12:00:00Z");
const bucket = (start: number, value: number, organization_id = "org-test") => ({
  start_time: start,
  end_time: start + 86400,
  results: [{ amount: { value, currency: "usd" }, organization_id }],
});
test.beforeEach(clearOpenAICostCache);

test("fetches all pages once, including adjustments, and shares cached organization totals", async () => {
  const urls: URL[] = [];
  const fetcher: typeof fetch = async (input, init) => {
    const url = new URL(String(input));
    urls.push(url);
    assert.equal(url.origin, "https://api.openai.com");
    assert.equal(url.pathname, "/v1/organization/costs");
    assert.equal(new Headers(init?.headers).get("Authorization"), "Bearer test-admin-key");
    assert.equal(new Headers(init?.headers).get("OpenAI-Organization"), "org-test");
    assert.equal(init?.redirect, "error");
    return Response.json(
      url.searchParams.has("page")
        ? { data: [bucket(2, -1)], has_more: false, next_page: null }
        : { data: [bucket(1, 4)], has_more: true, next_page: "next" }
    );
  };
  const [a, b] = await Promise.all([
    fetchOpenAICosts("org-test", "test-admin-key", "month", { fetcher, now }),
    fetchOpenAICosts("org-test", "test-admin-key", "month", { fetcher, now }),
  ]);
  assert.equal(a.totalUsd, 3);
  assert.deepEqual(a, b);
  assert.equal(urls.length, 2);
  assert.equal(urls[1].searchParams.get("page"), "next");
  assert.equal(JSON.stringify(a).includes("test-admin-key"), false);
});

test("bounds UTC calendar periods", () => {
  assert.equal(
    new Date(openAICostWindow("month", now).startTime * 1000).toISOString(),
    "2026-11-01T00:00:00.000Z"
  );
  assert.equal(
    new Date(openAICostWindow("7d", now).startTime * 1000).toISOString(),
    "2026-11-02T00:00:00.000Z"
  );
  assert.equal(
    new Date(openAICostWindow("30d", now).startTime * 1000).toISOString(),
    "2026-10-10T00:00:00.000Z"
  );
});

test("fails on duplicate pagination buckets rather than double-counting", async () => {
  const fetcher: typeof fetch = async () =>
    Response.json({ data: [bucket(1, 4)], has_more: true, next_page: "again" });
  await assert.rejects(
    fetchOpenAICosts("org-test", "key", "month", { fetcher, now }),
    /billing_duplicate_bucket/
  );
});

test("does not return another organization's costs", async () => {
  const fetcher: typeof fetch = async () =>
    Response.json({ data: [bucket(1, 4, "org-other")], has_more: false });
  await assert.rejects(
    fetchOpenAICosts("org-test", "key", "month", { fetcher, now }),
    /organization_mismatch/
  );
});

test("errors never become cached zero costs and do not expose upstream bodies", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async () => {
    calls++;
    return new Response("secret upstream diagnostic", { status: 403 });
  };
  for (let i = 0; i < 2; i++)
    await assert.rejects(
      fetchOpenAICosts("org-test", "key", "month", { fetcher, now }),
      /^Error: billing_access_denied$/
    );
  assert.equal(calls, 2);
});

test("zero is valid only after a successful complete response; key rotation invalidates cache", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async () => {
    calls++;
    return Response.json({ data: [], has_more: false });
  };
  assert.equal((await fetchOpenAICosts("org-test", "old", "month", { fetcher, now })).totalUsd, 0);
  await fetchOpenAICosts("org-test", "new", "month", { fetcher, now });
  assert.equal(calls, 2);
});

test("rejects malformed amounts instead of inventing a USD total", async () => {
  const data = bucket(1, 5);
  data.results[0].amount.currency = "eur";
  const fetcher: typeof fetch = async () => Response.json({ data: [data], has_more: false });
  await assert.rejects(
    fetchOpenAICosts("org-test", "key", "month", { fetcher, now }),
    /invalid_response/
  );
});
