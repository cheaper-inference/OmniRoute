import { describe, it, mock } from "node:test";
import { ok, equal } from "node:assert/strict";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";
import { buildTarGz, pluginPackageEntries } from "../helpers/tarGzFixture.ts";

const FLAG = "PLUGIN_MARKETPLACE_INTEGRITY_ENABLED";
const INDEX_URL = "https://plugins.example.test/index.json";
const SIGNATURE_URL = "https://plugins.example.test/index.json.sig";
const PACKAGE_URL = "https://plugins.example.test/signed-fixture-1.0.0.tgz";
const INSTALL_URL = "http://localhost:20128/api/plugins/marketplace/install";
const NOW = new Date("2026-11-26T12:00:00.000Z");
const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

const marketplace = await import("@/lib/plugins/marketplace");
const installRoute = await import("../../src/app/api/plugins/marketplace/install/route.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const core = await import("../../src/lib/db/core.ts");

describe("Plugins marketplace install (#6752)", () => {
  it("MarketplaceEntry supports optional checksum field", async () => {
    const { searchMarketplace } = await import("@/lib/plugins/marketplace");
    const results = await searchMarketplace("prompt");
    ok(Array.isArray(results));
    for (const entry of results) {
      ok(typeof entry.name === "string");
      ok(typeof entry.downloadUrl === "string");
      // The checksum field exists in the type (may be undefined)
      if (entry.checksum !== undefined) {
        ok(typeof entry.checksum === "string");
      }
    }
  });

  it("installMarketplacePlugin throws for unknown plugin", async () => {
    const { installMarketplacePlugin } = await import("@/lib/plugins/marketplace");
    try {
      await installMarketplacePlugin("nonexistent-plugin");
      ok(false, "should have thrown");
    } catch (e: unknown) {
      ok((e as Error).message.includes("not found"));
    }
  });

  it("checksum verification logic works", async () => {
    const crypto = await import("node:crypto");
    const data = Buffer.from("test-plugin-data");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    const hash2 = crypto.createHash("sha256").update(data).digest("hex");
    equal(hash, hash2, "same data should produce same hash");
    const hash3 = crypto.createHash("sha256").update(Buffer.from("different-data")).digest("hex");
    ok(hash !== hash3, "different data should produce different hash");
  });
});

type InstallResult = { name: string; version: string };

/** A signed fixture registry. `package` is what the download URL really serves. */
function signedFixture(
  options: {
    package?: Buffer;
    declared?: Buffer;
    pluginVersion?: string;
    signer?: crypto.KeyObject;
    issuedAt?: string;
    expiresAt?: string;
    checksum?: string | null;
  } = {}
) {
  const declared = options.declared ?? buildTarGz(pluginPackageEntries("signed-fixture", "1.0.0"));
  const served = options.package ?? declared;
  const entry: Record<string, unknown> = {
    name: "signed-fixture",
    version: options.pluginVersion ?? "1.0.0",
    downloadUrl: PACKAGE_URL,
  };
  if (options.checksum !== null) {
    entry.checksum = options.checksum ?? crypto.createHash("sha256").update(declared).digest("hex");
  }
  const indexBytes = Buffer.from(
    JSON.stringify({
      issuedAt: options.issuedAt ?? "2026-11-26T00:00:00.000Z",
      expiresAt: options.expiresAt ?? "2026-12-26T00:00:00.000Z",
      plugins: [entry],
    })
  );
  const signature = crypto.sign(null, indexBytes, options.signer ?? privateKey).toString("base64");
  const responses = new Map<string, Buffer>([
    [INDEX_URL, indexBytes],
    [SIGNATURE_URL, Buffer.from(signature)],
    [PACKAGE_URL, served],
  ]);
  const fetched: string[] = [];
  const stagedAtInstall: Array<{ dir: string; files: string[] }> = [];
  const install = mock.fn(async (dir: string): Promise<InstallResult> => {
    stagedAtInstall.push({ dir, files: fs.readdirSync(dir) });
    return { name: "signed-fixture", version: "1.0.0" };
  });
  marketplace.setVerifiedInstallDepsForTesting({
    trust: { indexUrl: INDEX_URL, signatureUrl: SIGNATURE_URL, keys: [publicKey] },
    fetchBytes: async (url: string) => {
      fetched.push(url);
      const bytes = responses.get(url);
      if (!bytes) throw new Error(`unexpected fetch ${url}`);
      return bytes;
    },
    install,
    now: () => NOW,
  });
  return { install, fetched, stagedAtInstall };
}

async function postInstall(body: Record<string, unknown>) {
  const request = await makeManagementSessionRequest(INSTALL_URL, { method: "POST", body });
  const response = await installRoute.POST(request as never);
  return { status: response.status, text: await response.text() };
}

describe("Plugins marketplace: signed install (integrity flag on)", () => {
  const originalFlag = process.env[FLAG];
  const originalJwt = process.env.JWT_SECRET;

  it("setup", () => {
    process.env[FLAG] = "true";
    process.env.JWT_SECRET ||= "plugin-mp-signed-install-jwt-secret";
  });

  it("installs a verified package: the manager receives the extracted directory", async () => {
    const { install, stagedAtInstall, fetched } = signedFixture();
    const result = await marketplace.installMarketplacePlugin({
      name: "signed-fixture",
      version: "1.0.0",
    });
    assert.deepEqual(result, { name: "signed-fixture", version: "1.0.0" });
    equal(install.mock.callCount(), 1);
    assert.deepEqual(fetched, [INDEX_URL, SIGNATURE_URL, PACKAGE_URL]);
    assert.deepEqual(stagedAtInstall[0].files.sort(), ["index.js", "plugin.json"]);
    // staging is private and gone once the manager is done
    equal(fs.existsSync(stagedAtInstall[0].dir), false);
  });

  it("a package swapped after the index was signed never reaches the manager", async () => {
    const changedPackage = buildTarGz([
      ...pluginPackageEntries("signed-fixture", "1.0.0"),
      { name: "extra.js", content: "swapped" },
    ]);
    const { install } = signedFixture({ package: changedPackage });
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "1.0.0" }),
      /integrity/i
    );
    equal(install.mock.callCount(), 0);
  });

  it("a signed package whose manifest declares another version never reaches the manager", async () => {
    const signedWrongVersion = buildTarGz(pluginPackageEntries("signed-fixture", "2.0.0"));
    const { install } = signedFixture({ declared: signedWrongVersion });
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "1.0.0" }),
      /manifest/i
    );
    equal(install.mock.callCount(), 0);
  });

  it("refuses an index signed by an untrusted key", async () => {
    const { install } = signedFixture({ signer: crypto.generateKeyPairSync("ed25519").privateKey });
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "1.0.0" }),
      /signature/i
    );
    equal(install.mock.callCount(), 0);
  });

  it("refuses an expired index, and an entry without a checksum", async () => {
    let fixture = signedFixture({
      issuedAt: "2026-11-01T00:00:00.000Z",
      expiresAt: "2026-11-25T00:00:00.000Z",
    });
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "1.0.0" }),
      /expired/i
    );
    equal(fixture.install.mock.callCount(), 0);
    fixture = signedFixture({ checksum: null });
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "1.0.0" }),
      /index/i
    );
    equal(fixture.install.mock.callCount(), 0);
  });

  it("requires an explicit version and an exact id+version match in the index", async () => {
    const { install, fetched } = signedFixture();
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture" }),
      /version/i
    );
    equal(fetched.length, 0, "no network before the request itself is valid");
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "9.9.9" }),
      /not found/i
    );
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "other-plugin", version: "1.0.0" }),
      /not found/i
    );
    equal(install.mock.callCount(), 0);
  });

  it("refuses an unreadable archive and an index fetch failure, without any fallback", async () => {
    const notAnArchive = Buffer.from("definitely not a tarball");
    const checksum = crypto.createHash("sha256").update(notAnArchive).digest("hex");
    let fixture = signedFixture({ declared: notAnArchive, checksum });
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "1.0.0" }),
      /archive/i
    );
    equal(fixture.install.mock.callCount(), 0);

    fixture = signedFixture();
    marketplace.setVerifiedInstallDepsForTesting({
      fetchBytes: async () => {
        throw new Error("connect ECONNREFUSED 10.0.0.1:443 /secret/internal/path");
      },
    });
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "1.0.0" }),
      (error: Error) =>
        /unavailable/i.test(error.message) && !/ECONNREFUSED|secret/.test(error.message)
    );
    equal(fixture.install.mock.callCount(), 0);
  });

  it("ignores the operator's custom registry: only the verified official index is used", async () => {
    await updateSettings({
      pluginMarketplaceUrl: "https://custom-registry.example.test/list.json",
    });
    try {
      const { fetched, install } = signedFixture();
      await marketplace.installMarketplacePlugin({ name: "signed-fixture", version: "1.0.0" });
      equal(install.mock.callCount(), 1);
      assert.ok(fetched.every((url) => url.startsWith("https://plugins.example.test/")));
    } finally {
      await updateSettings({ pluginMarketplaceUrl: "" });
    }
  });

  it("with the shipped (empty) trust list the signed mode refuses, it never installs unsigned", async () => {
    marketplace.setVerifiedInstallDepsForTesting(null);
    await assert.rejects(
      marketplace.installMarketplacePlugin({ name: "request-logger", version: "1.0.0" }),
      /not configured/i
    );
  });

  it("route: anonymous call is 401; authenticated valid call reaches the manager", async () => {
    const { install } = signedFixture();
    const anonymous = await installRoute.POST(
      new Request(INSTALL_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "signed-fixture", version: "1.0.0" }),
      }) as never
    );
    equal(anonymous.status, 401);
    equal(install.mock.callCount(), 0);

    const ok201 = await postInstall({ name: "signed-fixture", version: "1.0.0" });
    equal(ok201.status, 201, ok201.text);
    assert.deepEqual(JSON.parse(ok201.text), { name: "signed-fixture", version: "1.0.0" });
    equal(install.mock.callCount(), 1);
  });

  it("route: verification failures are 4xx with a fixed message, never a stack or a path", async () => {
    const swapped = buildTarGz([{ name: "plugin.json", content: "{}" }]);
    const { install } = signedFixture({ package: swapped });
    const failed = await postInstall({ name: "signed-fixture", version: "1.0.0" });
    equal(failed.status, 400, failed.text);
    assert.match(JSON.parse(failed.text).error.message, /integrity/i);
    assert.ok(!/at \/|\.ts:|node_modules|plugin-mp-/.test(failed.text));
    equal(install.mock.callCount(), 0);

    const noVersion = await postInstall({ name: "signed-fixture" });
    equal(noVersion.status, 400, noVersion.text);
    assert.match(noVersion.text, /version/i);
  });

  it("route: the shipped trust configuration yields 503 and installs nothing", async () => {
    marketplace.setVerifiedInstallDepsForTesting(null);
    const refused = await postInstall({ name: "request-logger", version: "1.0.0" });
    equal(refused.status, 503, refused.text);
    assert.match(refused.text, /not configured/i);
  });

  it("teardown", () => {
    marketplace.setVerifiedInstallDepsForTesting(null);
    if (originalFlag === undefined) delete process.env[FLAG];
    else process.env[FLAG] = originalFlag;
    if (originalJwt === undefined) delete process.env.JWT_SECRET;
    core.resetDbInstance();
  });
});

describe("Plugins marketplace: integrity flag off keeps the existing contract", () => {
  it("the flag defaults to off and is registered once", async () => {
    const { FEATURE_FLAG_DEFINITIONS } = await import("@/shared/constants/featureFlagDefinitions");
    const defs = FEATURE_FLAG_DEFINITIONS.filter((d) => d.key === FLAG);
    equal(defs.length, 1);
    equal(defs[0].defaultValue, "false");
  });

  it("an unknown name still reports 'not found in marketplace' and never touches the verified path", async () => {
    delete process.env[FLAG];
    let touched = false;
    marketplace.setVerifiedInstallDepsForTesting({
      fetchBytes: async () => {
        touched = true;
        return Buffer.alloc(0);
      },
    });
    try {
      await assert.rejects(
        marketplace.installMarketplacePlugin("nonexistent-plugin"),
        /not found in marketplace/
      );
      await assert.rejects(
        marketplace.installMarketplacePlugin({ name: "nonexistent-plugin", version: "1.0.0" }),
        /not found in marketplace/
      );
      equal(touched, false);
    } finally {
      marketplace.setVerifiedInstallDepsForTesting(null);
    }
  });

  it("the route still accepts a body with only a name", async () => {
    delete process.env[FLAG];
    process.env.JWT_SECRET ||= "plugin-mp-signed-install-jwt-secret";
    const response = await postInstall({ name: "nonexistent-plugin" });
    equal(response.status, 400);
    assert.match(response.text, /not found in marketplace/);
    core.resetDbInstance();
  });
});
