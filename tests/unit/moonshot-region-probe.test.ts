// Opt-in MOONSHOT_REGION_PROBE: when the key is rejected on the default Moonshot host
// (api.moonshot.ai), validation tries the other region host (api.moonshot.cn). If that host
// accepts the key, validation returns its base URL in providerSpecificData so it is saved with
// the connection. A custom base URL is never rewritten. Default off.
import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;
const FLAG = "MOONSHOT_REGION_PROBE";
const KEY = ["test", "moonshot", "key"].join("-");
const GLOBAL_HOST = "api.moonshot.ai";
const CN_HOST = "api.moonshot.cn";

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env[FLAG];
});

/** Local fake of both hosts: `accepts` lists the hosts that take the key. */
function fakeHosts(accepts: string[], rejectStatus = 401) {
  const hosts: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = new URL(
      typeof input === "string" ? input : String((input as Request).url ?? input)
    );
    hosts.push(url.hostname);
    return accepts.includes(url.hostname)
      ? new Response(JSON.stringify({ data: [{ id: "kimi-k2" }] }), { status: 200 })
      : new Response(JSON.stringify({ error: { message: "Invalid Authentication" } }), {
          status: rejectStatus,
        });
  }) as typeof fetch;
  return hosts;
}

test("a key for the CN host is accepted and the CN base URL is returned", async () => {
  process.env[FLAG] = "1";
  const hosts = fakeHosts([CN_HOST]);
  const result = await validateProviderApiKey({ provider: "moonshot", apiKey: KEY });
  assert.equal(result.valid, true);
  assert.equal(result.providerSpecificData?.baseUrl, `https://${CN_HOST}/v1`);
  assert.ok(hosts.includes(GLOBAL_HOST) && hosts.includes(CN_HOST));
});

test("a key for the default host returns no base URL and skips the second host", async () => {
  process.env[FLAG] = "1";
  const hosts = fakeHosts([GLOBAL_HOST]);
  const result = await validateProviderApiKey({ provider: "moonshot", apiKey: KEY });
  assert.equal(result.valid, true);
  assert.equal(result.providerSpecificData, undefined);
  assert.ok(!hosts.includes(CN_HOST));
});

test("a key that no host accepts is still invalid", async () => {
  process.env[FLAG] = "1";
  fakeHosts([]);
  const result = await validateProviderApiKey({ provider: "moonshot", apiKey: KEY });
  assert.equal(result.valid, false);
  assert.equal(result.providerSpecificData, undefined);
});

test("is off by default: a CN key is rejected and no second host is tried", async () => {
  const hosts = fakeHosts([CN_HOST]);
  const result = await validateProviderApiKey({ provider: "moonshot", apiKey: KEY });
  assert.equal(result.valid, false);
  assert.ok(!hosts.includes(CN_HOST));
});

test("a custom base URL is left alone", async () => {
  process.env[FLAG] = "1";
  const hosts = fakeHosts([CN_HOST]);
  const result = await validateProviderApiKey({
    provider: "moonshot",
    apiKey: KEY,
    providerSpecificData: { baseUrl: "https://relay.example.invalid/v1" },
  });
  assert.equal(result.valid, false);
  assert.deepEqual([...new Set(hosts)], ["relay.example.invalid"]);
});

test("other providers are not probed across regions", async () => {
  process.env[FLAG] = "1";
  const hosts = fakeHosts([]);
  await validateProviderApiKey({ provider: "openai", apiKey: KEY });
  assert.ok(!hosts.includes(CN_HOST));
});

test("a server error on the default host does not trigger the probe", async () => {
  process.env[FLAG] = "1";
  const hosts = fakeHosts([CN_HOST], 503);
  const result = await validateProviderApiKey({ provider: "moonshot", apiKey: KEY });
  assert.equal(result.valid, false);
  assert.ok(!hosts.includes(CN_HOST));
});
