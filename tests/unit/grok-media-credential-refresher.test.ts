import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { getGrokMediaToken } from "../../open-sse/handlers/grokMedia.ts";
import {
  getRegisteredCredentialRefresher,
  registerCredentialRefresher,
} from "../../open-sse/utils/registeredCredentialRefresher.ts";

const FUTURE = new Date(Date.now() + 3_600_000).toISOString();
const PAST = new Date(Date.now() - 3_600_000).toISOString();

test.afterEach(() => registerCredentialRefresher(null));

test("Grok media renews through the registered refresher", async () => {
  const calls: Array<[string, unknown]> = [];
  registerCredentialRefresher(async (provider, credentials) => {
    calls.push([provider, credentials]);
    return { ...credentials, accessToken: "renewed", expiresAt: FUTURE };
  });
  const credentials = { accessToken: "stale", expiresAt: PAST };
  assert.equal(await getGrokMediaToken(credentials), "renewed");
  assert.deepEqual(calls, [["grok-cli", credentials]]);
});

test("Grok media still refuses an expired token when the refresher could not renew it", async () => {
  registerCredentialRefresher(async (_provider, credentials) => credentials);
  await assert.rejects(getGrokMediaToken({ accessToken: "stale", expiresAt: PAST }), {
    status: 401,
    message: "Grok OAuth access token could not be renewed",
  });
});

test("without a registered refresher a live token is used and an expired one is refused", async () => {
  assert.equal(getRegisteredCredentialRefresher(), null);
  assert.equal(await getGrokMediaToken({ accessToken: "live", expiresAt: FUTURE }), "live");
  await assert.rejects(getGrokMediaToken({ accessToken: "stale", expiresAt: PAST }), {
    status: 401,
  });
});

test("the token-refresh module registers itself and startup loads it", async () => {
  // A fresh evaluation of the module proves the side effect, whatever loaded it first.
  await import(`../../src/sse/services/tokenRefresh.ts?registers=${Date.now()}`);
  assert.equal(typeof getRegisteredCredentialRefresher(), "function");

  const startup = fs.readFileSync("src/instrumentation-node.ts", "utf8");
  assert.match(startup, /await import\("@\/sse\/services\/tokenRefresh"\)/);
});
