import assert from "node:assert/strict";
import { test } from "node:test";
import {
  verifiedReleaseSelection,
  releaseAssetName,
} from "../../src/lib/services/managedProxy/catalog.ts";
const hash = "a".repeat(64);
function release(distribution = "xray", version = "v26.3.27") {
  const repository = distribution === "mahsa" ? "GFW-knocker/Xray-core" : "XTLS/Xray-core";
  return {
    tag_name: version,
    assets: [
      {
        name: "Xray-linux-64.zip",
        digest: `sha256:${hash}`,
        browser_download_url: `https://github.com/${repository}/releases/download/${version}/Xray-linux-64.zip`,
      },
    ],
  };
}
test("official and Mahsa releases retain independent distribution identities", () => {
  assert.equal(verifiedReleaseSelection("xray", "xray", release(), "linux", "x64").sha256, hash);
  assert.equal(
    verifiedReleaseSelection("xray", "mahsa", release("mahsa", "v1.26.10-mahsa-r2"), "linux", "x64")
      .distribution,
    "mahsa"
  );
});
test("release validation refuses missing hashes, wrong origin, wrong family and unstable releases", () => {
  const missing = release();
  delete missing.assets[0].digest;
  assert.throws(() => verifiedReleaseSelection("xray", "xray", missing, "linux", "x64"), /digest/);
  const external = release();
  external.assets[0].browser_download_url = "https://attacker.invalid/core.zip";
  assert.throws(() => verifiedReleaseSelection("xray", "xray", external, "linux", "x64"), /digest/);
  assert.throws(
    () => verifiedReleaseSelection("singbox", "xray", release(), "linux", "x64"),
    /format/
  );
  assert.throws(
    () =>
      verifiedReleaseSelection("xray", "xray", { ...release(), prerelease: true }, "linux", "x64"),
    /stable/
  );
});
test("asset naming is platform-specific and refuses unsupported platforms", () => {
  assert.equal(
    releaseAssetName("singbox", "v1.14.3", "win32", "arm64"),
    "sing-box-1.14.3-windows-arm64.zip"
  );
  assert.equal(
    releaseAssetName("mahsa", "v1.26.10-mahsa-r2", "darwin", "arm64"),
    "Xray-macos-arm64-v8a.zip"
  );
  assert.throws(() => releaseAssetName("xray", "v1", "android", "x64"));
});
