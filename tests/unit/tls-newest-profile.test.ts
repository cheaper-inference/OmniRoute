import test from "node:test";
import assert from "node:assert/strict";

const { newestProfile } = await import("../../open-sse/utils/browserProfiles.ts");

test("orders mixed-width versions numerically, not lexicographically", () => {
  assert.equal(newestProfile("chrome", ["chrome_99", "chrome_100"]), "chrome_100");
});

test("picks the highest plain version of a family", () => {
  const profiles = ["chrome_124", "chrome_146", "firefox_151", "chrome_149", "chrome_android_146"];
  assert.equal(newestProfile("chrome", profiles), "chrome_149");
  assert.equal(newestProfile("firefox", profiles), "firefox_151");
});

test("returns null when the family is absent", () => {
  assert.equal(newestProfile("safari", ["chrome_149"]), null);
});

test("createGetClient without tlsProfile uses the newest chrome profile", async () => {
  const { createGetClient } = await import("../../open-sse/services/tlsClientBase.ts");
  const { newestChromeProfile } = await import("../../open-sse/utils/browserProfiles.ts");
  const seen: Record<string, unknown>[] = [];
  const fakeRuntime = {
    async createTransport(options: Record<string, unknown>) {
      seen.push(options);
      return { close() {} };
    },
    async fetch() {
      return { status: 200, headers: {}, body: null };
    },
  };
  const getClient = createGetClient({
    providerName: "Test",
    wreqRuntimeLoader: async () => fakeRuntime,
  });
  const client = await getClient();
  const request = client.request("https://example.test/", { method: "GET" });
  await request;
  request.releaseTransport();
  assert.equal(seen.length, 1);
  assert.equal(seen[0].browser, newestChromeProfile());
});

test("runtime-resolved profiles exist in the installed wreq-js catalog", async () => {
  const { newestChromeProfile, newestFirefoxProfile } =
    await import("../../open-sse/utils/browserProfiles.ts");
  const { getProfiles } = await import("wreq-js");
  const supported = new Set<string>(getProfiles());
  assert.ok(
    supported.has(newestChromeProfile()),
    `newestChromeProfile()=${newestChromeProfile()} not supported by installed wreq-js`
  );
  assert.ok(
    supported.has(newestFirefoxProfile()),
    `newestFirefoxProfile()=${newestFirefoxProfile()} not supported by installed wreq-js`
  );
});

test("claude-web UA version matches the TLS profile version", async () => {
  const { claudeWebFingerprint } = await import("../../open-sse/config/claudeWebFingerprint.ts");
  const { newestChromeVersion } = await import("../../open-sse/utils/browserProfiles.ts");
  const fp = claudeWebFingerprint();
  const profileVersion = newestChromeVersion();
  assert.equal(fp.version, profileVersion);
  assert.ok(fp.userAgent.includes(`Chrome/${profileVersion}.`));
  assert.ok(fp.secChUa.includes(`"Google Chrome";v="${profileVersion}"`));
});

test("concurrent getClient calls build the transport only once", async () => {
  const { createGetClient } = await import("../../open-sse/services/tlsClientBase.ts");
  let profileCalls = 0;
  const fakeRuntime = {
    async createTransport() {
      return { close() {} };
    },
    async fetch() {
      return { status: 200, headers: {}, body: null };
    },
  };
  const getClient = createGetClient({
    providerName: "Test",
    tlsProfile: () => {
      profileCalls += 1;
      return "chrome_149";
    },
    wreqRuntimeLoader: async () => fakeRuntime,
  });
  const [a, b, c] = await Promise.all([getClient(), getClient(), getClient()]);
  assert.equal(profileCalls, 1);
  assert.strictEqual(a, b);
  assert.strictEqual(b, c);
});

test("skips profiles with empty or non-numeric version suffixes", () => {
  const { newestProfile: np } = { newestProfile };
  // "chrome_" alone: Number("") === 0 must not count as a real version.
  assert.equal(np("chrome", ["chrome_"]), null);
  assert.equal(np("chrome", ["chrome_", "chrome_149"]), "chrome_149");
  // Mixed qualifiers (chrome_beta_150) are not plain <family>_<int> ids.
  assert.equal(np("chrome", ["chrome_beta_150", "chrome_149"]), "chrome_149");
});

test("profileVersion rejects ids outside <family>_<int>", async () => {
  const { profileVersion } = await import("../../open-sse/utils/browserProfiles.ts");
  assert.equal(profileVersion("chrome_149"), "149");
  assert.equal(profileVersion("chrome_beta_150"), null);
  assert.equal(profileVersion("chrome_"), null);
});
