import assert from "node:assert/strict";
import test from "node:test";

import {
  antigravityCliUserAgent,
  antigravityIdeNodeUserAgent,
  antigravityIdeUserAgent,
  getAntigravityContentHeaders,
  getAntigravityIdeNodeHeaders,
  getAntigravityLoadCodeAssistMetadata,
  getAntigravityOAuthUserAgent,
  resolveAntigravityCliChangelist,
} from "../../open-sse/services/antigravityHeaders.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityCliVersionCache,
  seedAntigravityIdeVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

test.afterEach(() => {
  clearAntigravityVersionCaches();
});

test("official IDE, IDE Node, and CLI User-Agent grammars match the native clients", () => {
  assert.equal(antigravityIdeUserAgent("2.1.1"), "antigravity/ide/2.1.1 darwin/arm64");
  assert.equal(
    antigravityIdeNodeUserAgent("2.1.1"),
    "antigravity/2.1.1 darwin/arm64 google-api-nodejs-client/10.3.0"
  );
  // The CLI is a Go binary: it reports the real host in GOOS/GOARCH dialect plus the
  // build changelist, both captured live from `agy 1.4.4` on Windows x64.
  assert.equal(
    antigravityCliUserAgent("1.4.4", "consumer", "1003595037", {
      osType: "windows",
      arch: "amd64",
    }),
    "antigravity/cli/1.4.4 (aidev_client; os_type=windows; arch=amd64; cl=1003595037; auth_method=consumer)"
  );
});

test("CLI User-Agent omits cl= instead of borrowing another version's changelist", () => {
  // `cl` is a per-build Piper changelist. Replaying 1.4.4's value on 1.4.5 would advertise
  // a build that does not exist, so an unknown version drops the token entirely.
  assert.equal(
    antigravityCliUserAgent("1.4.5", "consumer", undefined, { osType: "windows", arch: "amd64" }),
    "antigravity/cli/1.4.5 (aidev_client; os_type=windows; arch=amd64; auth_method=consumer)"
  );
  // A known version still resolves its changelist from the table.
  assert.equal(resolveAntigravityCliChangelist("1.4.4"), "1003595037");
  assert.equal(resolveAntigravityCliChangelist("1.4.5"), null);
});

test("User-Agent OS/arch token stays pinned to darwin/arm64 on the IDE path only", () => {
  // The upstream Antigravity backend expects the native macOS build for the IDE profile,
  // so OmniRoute presents that fingerprint no matter which platform it actually runs on
  // (#8098 protocol fidelity).
  assert.match(antigravityIdeUserAgent("2.1.1"), / darwin\/arm64$/);
  assert.match(antigravityIdeNodeUserAgent("2.1.1"), / darwin\/arm64 /);
  // The CLI profile is host-derived instead (Go binary), so pin the inputs here to keep
  // the assertion deterministic.
  assert.equal(
    antigravityCliUserAgent("1.4.4", "oauth", "1003595037", { osType: "windows", arch: "amd64" }),
    "antigravity/cli/1.4.4 (aidev_client; os_type=windows; arch=amd64; cl=1003595037; auth_method=oauth)"
  );
});

test("IDE and CLI content headers use independent cached versions", () => {
  seedAntigravityIdeVersionCache("2.2.0");
  seedAntigravityCliVersionCache("1.2.0");

  const ideHeaders = new Headers(getAntigravityContentHeaders("ide", "ide-token"));
  const cliHeaders = new Headers(getAntigravityContentHeaders("cli", "cli-token"));

  assert.match(ideHeaders.get("User-Agent") ?? "", /^antigravity\/ide\/2\.2\.0 /);
  assert.match(cliHeaders.get("User-Agent") ?? "", /^antigravity\/cli\/1\.2\.0 /);
  assert.equal(ideHeaders.get("Authorization"), "Bearer ide-token");
  assert.equal(cliHeaders.get("Authorization"), "Bearer cli-token");

  for (const headers of [ideHeaders, cliHeaders]) {
    for (const absent of [
      "x-client-name",
      "x-client-version",
      "x-machine-id",
      "x-vscode-sessionid",
      "X-Goog-Api-Client",
      "Client-Metadata",
    ]) {
      assert.equal(headers.get(absent), null, `${absent} must be absent from content headers`);
    }
  }
});

test("IDE Node OAuth and onboarding headers use the captured Google Node identity", () => {
  seedAntigravityIdeVersionCache("2.1.1");
  const headers = new Headers(getAntigravityIdeNodeHeaders("token"));

  assert.match(
    headers.get("User-Agent") ?? "",
    /^antigravity\/2\.1\.1 [^ ]+\/[^ ]+ google-api-nodejs-client\/10\.3\.0$/
  );
  assert.equal(headers.get("X-Goog-Api-Client"), "gl-node/22.21.1");
  assert.equal(headers.get("Authorization"), "Bearer token");
  assert.equal(headers.get("Client-Metadata"), null);
});

test("OAuth User-Agent selection keeps IDE and CLI identities independent", () => {
  seedAntigravityIdeVersionCache("2.2.0");
  seedAntigravityCliVersionCache("1.2.0");

  assert.match(
    getAntigravityOAuthUserAgent("ide"),
    /^antigravity\/2\.2\.0 [^ ]+\/[^ ]+ google-api-nodejs-client\/10\.3\.0$/
  );
  assert.match(getAntigravityOAuthUserAgent("cli"), /^antigravity\/cli\/1\.2\.0 /);
});

test("loadCodeAssist body metadata sends numeric protobuf-JSON enums, not a bare ideType string", () => {
  // Google's backend 403s loadCodeAssist/onboardUser when the IDE profile sends ideType
  // as the string "ANTIGRAVITY" with platform/pluginType omitted — verified via a live
  // side-by-side against 9router (same account, same host) using the full enum shape
  // below, which succeeded. See antigravityHeaders.ts for the full incident note.
  // The CLI profile is the exception: its native Go binary sends the bare string form.
  const metadata = getAntigravityLoadCodeAssistMetadata("ide");
  assert.deepEqual(metadata, { ideType: 9, platform: metadata.platform, pluginType: 2 });
  assert.equal(typeof metadata.platform, "number");
});
