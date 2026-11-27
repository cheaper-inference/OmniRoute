import assert from "node:assert/strict";
import test from "node:test";

import { PerplexityWebExecutor } from "../../open-sse/executors/perplexity-web.ts";
import { __setTlsFetchOverrideForTesting } from "../../open-sse/services/perplexityTlsClient.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

const endpoint = "https://www.perplexity.ai/rest/sse/perplexity_ask";
const currentCookie =
  "__Secure-pplx.session.11111111-1111-4111-8111-111111111111=fixture-account-token; " +
  "pplx.session-id=22222222-2222-4222-8222-222222222222";

test.afterEach(() => __setTlsFetchOverrideForTesting(null));
test.after(() => resetDbInstance());

function captureCookieHeaders() {
  const requests: Array<{ url: string; method?: string; cookie: string | null }> = [];
  __setTlsFetchOverrideForTesting(async (url, options) => {
    requests.push({
      url,
      method: options.method,
      cookie: new Headers(options.headers).get("cookie"),
    });
    return { status: 200, headers: new Headers(), text: "event: end_of_stream\n\n", body: null };
  });
  return requests;
}

function validate(apiKey: string) {
  return validateProviderApiKey({ provider: "perplexity-web", apiKey });
}

function execute(apiKey: string) {
  return new PerplexityWebExecutor().execute({
    model: "pplx-auto",
    body: { messages: [{ role: "user", content: "test" }] },
    stream: false,
    credentials: { apiKey },
    signal: null,
    log: null,
  });
}

function executeAccessToken(accessToken: string) {
  return new PerplexityWebExecutor().execute({
    model: "pplx-auto",
    body: { messages: [{ role: "user", content: "test" }] },
    stream: false,
    credentials: { accessToken },
    signal: null,
    log: null,
  });
}

function captureAuthHeaders() {
  const requests: Array<{
    url: string;
    method?: string;
    cookie: string | null;
    authorization: string | null;
  }> = [];
  __setTlsFetchOverrideForTesting(async (url, options) => {
    const headers = new Headers(options.headers);
    requests.push({
      url,
      method: options.method,
      cookie: headers.get("cookie"),
      authorization: headers.get("authorization"),
    });
    return { status: 200, headers: new Headers(), text: "event: end_of_stream\n\n", body: null };
  });
  return requests;
}

async function expectCookie(pasted: string, sent: string) {
  const requests = captureCookieHeaders();
  await validate(pasted);
  await execute(pasted);
  const expected = { url: endpoint, method: "POST", cookie: sent };
  assert.deepEqual(requests, [expected, expected]);
}

test("#21170: connection validation sends the current cookie pair as supplied", async () => {
  const requests = captureCookieHeaders();
  await validate(currentCookie);

  assert.deepEqual(requests, [{ url: endpoint, method: "POST", cookie: currentCookie }]);
});

test("#21170: chat execution sends the current cookie pair as supplied", async () => {
  const requests = captureCookieHeaders();
  await execute(currentCookie);

  assert.deepEqual(requests, [{ url: endpoint, method: "POST", cookie: currentCookie }]);
});

test("#21170: validation and execution retain both named and bare legacy tokens", async () => {
  const requests = captureCookieHeaders();
  const bareLegacyToken = "fixture-legacy-token";
  const legacyCookie = `__Secure-next-auth.session-token=${bareLegacyToken}`;

  await validate(bareLegacyToken);
  await validate(legacyCookie);
  await execute(bareLegacyToken);
  await execute(legacyCookie);

  const expectedRequest = { url: endpoint, method: "POST", cookie: legacyCookie };
  assert.deepEqual(
    requests,
    Array.from({ length: 4 }, () => expectedRequest)
  );
});

test("#21170: either order of the current pair is sent unchanged", async () => {
  const reversed = currentCookie.split("; ").reverse().join("; ");
  await expectCookie(reversed, reversed);
});

test("#21170: a leading Cookie: prefix is removed and the pairs stay intact", async () => {
  await expectCookie(`Cookie: ${currentCookie}`, currentCookie);
  await expectCookie(`cookie:${currentCookie}`, currentCookie);
});

test("#21170: extra cookies stay beside the current pair", async () => {
  const withExtras = `cf_clearance=fixture-clearance; ${currentCookie}; sidebar_visible=1`;
  await expectCookie(withExtras, withExtras);
});

test("#21170: a fragmented legacy session header is not wrapped again", async () => {
  const fragmented =
    "__Secure-next-auth.session-token.0=fixture-part-a; " +
    "__Secure-next-auth.session-token.1=fixture-part-b; cf_clearance=fixture-clearance";
  await expectCookie(fragmented, fragmented);
});

test("#21170: bearer validation and access-token execution stay off the cookie header", async () => {
  const requests = captureAuthHeaders();
  await validate("Bearer fixture-bearer-token");
  await executeAccessToken("fixture-bearer-token");

  const expected = {
    url: endpoint,
    method: "POST",
    cookie: null,
    authorization: "Bearer fixture-bearer-token",
  };
  assert.deepEqual(requests, [expected, expected]);
});
