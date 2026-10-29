import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeFlowCookies,
  parseFlowCreditsReply,
  getGoogleFlowUsage,
} from "../../../open-sse/services/usage/googleflow.ts";

test("normalizeFlowCookies handles raw __Secure-1PSID string", () => {
  const cookie = normalizeFlowCookies("abcd1234efgh");
  assert.equal(cookie, "__Secure-1PSID=abcd1234efgh");
});

test("normalizeFlowCookies handles key-value cookie string", () => {
  const cookie = normalizeFlowCookies("__Secure-1PSID=abc; __Secure-1PSIDTS=def");
  assert.equal(cookie, "__Secure-1PSID=abc; __Secure-1PSIDTS=def");
});

test("normalizeFlowCookies handles JSON export array", () => {
  const json = JSON.stringify([
    { name: "__Secure-1PSID", value: "abc" },
    { name: "__Secure-1PSIDTS", value: "def" },
  ]);
  const cookie = normalizeFlowCookies(json);
  assert.equal(cookie, "__Secure-1PSID=abc; __Secure-1PSIDTS=def");
});

test("parseFlowCreditsReply parses standard nzlxg batchexecute response", () => {
  const rawBody = `)]}'

104
[["wrb.fr","nzlxg","[85,null,null,null,null,85,[1740000000,0]]",null,null,null,"generic"]]
`;
  const res = parseFlowCreditsReply(rawBody);
  assert.equal(res.credits, 85);
});

test("parseFlowCreditsReply parses zero balance", () => {
  const rawBody = `)]}'

104
[["wrb.fr","nzlxg","[0,null,null,null,null,0,[1740000000,0]]",null,null,null,"generic"]]
`;
  const res = parseFlowCreditsReply(rawBody);
  assert.equal(res.credits, 0);
});

test("getGoogleFlowUsage returns standard UsageQuota record", async () => {
  const mockFetch = async () => {
    return new Response(
      `)]}'\n[["wrb.fr","nzlxg","[42,null,null,null,null,42]",null,null,null,"generic"]]`,
      { status: 200 }
    );
  };

  const usage = await getGoogleFlowUsage("__Secure-1PSID=test_cookie", {}, mockFetch as any);
  assert.ok(usage.quotas.veo_credits);
  assert.equal(usage.quotas.veo_credits.total, 42);
  assert.equal(usage.quotas.veo_credits.remaining, 42);
  assert.equal(usage.quotas.veo_credits.remainingPercentage, 100);
  assert.equal(usage.quotas.veo_credits.displayName, "Veo Credits");
});
