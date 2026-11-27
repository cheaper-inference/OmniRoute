import test from "node:test";
import assert from "node:assert/strict";

import {
  invalidateProxyHealth,
  isProxyReachable,
  __setProxyHealthTcpCheckForTesting,
} from "../../src/lib/proxyHealth.ts";
import {
  runWithProxyContext,
  runCommittedWithProxyContext,
} from "../../open-sse/utils/proxyFetch.ts";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const proxyConfig = { type: "http", host: "127.0.0.1", port: "18080" };
const proxyUrl = "http://127.0.0.1:18080/";

test.after(() => {
  __setProxyHealthTcpCheckForTesting(null);
  invalidateProxyHealth(proxyUrl);
});

test("#20626: slow failing probe must not discard a dispatched committed request", async () => {
  invalidateProxyHealth(proxyUrl);
  __setProxyHealthTcpCheckForTesting(async () => {
    await sleep(30);
    return false;
  });
  let dispatched = 0;
  const refreshFn = async () => {
    dispatched += 1;
    await sleep(150);
    return { access_token: "new", refresh_token: "ROTATED" };
  };
  const result = await runCommittedWithProxyContext(proxyConfig, refreshFn);
  assert.equal(dispatched, 1);
  assert.deepEqual(result, { access_token: "new", refresh_token: "ROTATED" });
});

test("#20626: cached unreachable verdict must not discard a dispatched committed request", async () => {
  invalidateProxyHealth(proxyUrl);
  __setProxyHealthTcpCheckForTesting(async () => false);
  assert.equal(await isProxyReachable(proxyUrl), false);
  const result = await runWithProxyContext(
    proxyConfig,
    async () => {
      await sleep(100);
      return { refresh_token: "ROTATED" };
    },
    { noFastFail: true }
  );
  assert.deepEqual(result, { refresh_token: "ROTATED" });
});

test("#20626 regression: normal (data-plane) calls still fast-fail on an unreachable proxy", async () => {
  invalidateProxyHealth(proxyUrl);
  __setProxyHealthTcpCheckForTesting(async () => false);
  assert.equal(await isProxyReachable(proxyUrl), false);
  await assert.rejects(
    runWithProxyContext(proxyConfig, async () => {
      await sleep(300);
      return "late";
    }),
    (e: { code?: string; statusCode?: number }) =>
      e?.code === "PROXY_UNREACHABLE" && e?.statusCode === 503
  );
});
