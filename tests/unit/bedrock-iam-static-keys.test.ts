// Opt-in by data: a Bedrock connection whose providerSpecificData carries awsAccessKeyId uses
// AWS IAM static keys (SigV4) instead of a bearer API key. The connection's apiKey holds the
// secret access key. Connections without awsAccessKeyId keep the bearer path unchanged.
import test from "node:test";
import assert from "node:assert/strict";

import { BedrockExecutor } from "../../open-sse/executors/bedrock.ts";
import { discoverBedrockNativeModels } from "../../open-sse/services/bedrock.ts";

// Built from parts so no credential-shaped literal sits in the repo.
const KEY_ID = ["AKI", "A", "0123456789", "ABCDEF"].join("");
const SECRET = ["test", "secret", "value", "0123456789"].join("-");
const SESSION = ["test", "session", "token"].join("-");

const iam = (extra: Record<string, unknown> = {}) => ({
  apiKey: SECRET,
  providerSpecificData: { region: "eu-west-2", awsAccessKeyId: KEY_ID, ...extra },
});
const bearer = () => ({ apiKey: "bearer-key", providerSpecificData: { region: "eu-west-2" } });

test("IAM connection: the SDK client signs with the static keys, not a bearer token", async () => {
  const client = new BedrockExecutor().createClient(iam());
  const creds = await client.config.credentials();
  assert.equal(creds.accessKeyId, KEY_ID);
  assert.equal(creds.secretAccessKey, SECRET);
  assert.equal(creds.sessionToken, undefined);
  assert.notDeepEqual(await client.config.authSchemePreference?.(), ["httpBearerAuth"]);
});

test("IAM connection: an optional session token is passed on", async () => {
  const client = new BedrockExecutor().createClient(iam({ awsSessionToken: SESSION }));
  assert.equal((await client.config.credentials()).sessionToken, SESSION);
});

test("a connection without awsAccessKeyId keeps the bearer path", async () => {
  const client = new BedrockExecutor().createClient(bearer());
  assert.deepEqual(await client.config.authSchemePreference(), ["httpBearerAuth"]);
});

test("IAM connection: the logged request header does not claim a bearer token", () => {
  const headers = new BedrockExecutor().buildHeaders(iam());
  assert.doesNotMatch(headers.Authorization, /^Bearer/);
  assert.match(new BedrockExecutor().buildHeaders(bearer()).Authorization, /^Bearer/);
});

test("model discovery signs each request with SigV4 for an IAM connection", async () => {
  const seen: Array<{ url: string; headers: Record<string, string> }> = [];
  const r = await discoverBedrockNativeModels({
    apiKey: SECRET,
    providerSpecificData: iam({ awsSessionToken: SESSION }).providerSpecificData,
    fetcher: async (url, init) => {
      seen.push({ url: String(url), headers: (init?.headers || {}) as Record<string, string> });
      return new Response(JSON.stringify({ modelSummaries: [], inferenceProfileSummaries: [] }));
    },
  });
  assert.deepEqual(r.warnings, [], "no profile-listing warning");
  assert.equal(seen.length, 2, "foundation models and inference profiles are both requested");
  for (const { headers } of seen) {
    const lower = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
    assert.match(
      lower.authorization,
      new RegExp(`^AWS4-HMAC-SHA256 Credential=${KEY_ID}/\\d{8}/eu-west-2/bedrock/aws4_request`)
    );
    assert.equal(lower["x-amz-security-token"], SESSION);
    assert.ok(lower["x-amz-date"]);
  }
});

test("model discovery keeps the bearer header without awsAccessKeyId", async () => {
  let auth = "";
  await discoverBedrockNativeModels({
    apiKey: "bearer-key",
    providerSpecificData: { region: "eu-west-2" },
    fetcher: async (_url, init) => {
      auth = String((init?.headers as Record<string, string>).Authorization);
      return new Response(JSON.stringify({ modelSummaries: [], inferenceProfileSummaries: [] }));
    },
  });
  assert.equal(auth, "Bearer bearer-key");
});

test("the secret key never appears in the signed headers", async () => {
  let all = "";
  await discoverBedrockNativeModels({
    apiKey: SECRET,
    providerSpecificData: iam().providerSpecificData,
    fetcher: async (_url, init) => {
      all += JSON.stringify(init?.headers);
      return new Response(JSON.stringify({ modelSummaries: [], inferenceProfileSummaries: [] }));
    },
  });
  assert.ok(!all.includes(SECRET));
});
