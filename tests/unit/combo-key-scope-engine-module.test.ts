/**
 * GHSA-3w2r: the media combo executors (open-sse) read the caller key's scope
 * through `open-sse/services/comboKeyScope.ts`, not through the app module, so
 * the engine gains no `open-sse → src` edge. The app module re-exports the same
 * functions — one implementation, both sides.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import * as engine from "../../open-sse/services/comboKeyScope.ts";
import * as app from "../../src/sse/services/keyConnectionScope.ts";
import { allowlistPermitsSyntheticNoAuth as engineNoAuth } from "../../open-sse/services/autoCombo/resilienceCandidateFilter.ts";
import { allowlistPermitsSyntheticNoAuth as appNoAuth } from "../../src/sse/services/noAuthAllowlist.ts";

const SHARED = [
  "comboTargetsNotAllowedResponse",
  "filterComboTargetsForKey",
  "isKeyScopeBlockedCredentials",
  "keyAdmitsKeylessProviders",
  "keylessProviderRejection",
  "keyScopeBlockedResponse",
  "noActiveCredentialsResponse",
  "scopeComboTargetsForKey",
  "withoutKeyScopeBlocked",
] as const;

test("the app key-scope module re-exports the engine implementations", () => {
  for (const name of SHARED) {
    assert.equal(typeof engine[name], "function", name);
    assert.equal(app[name], engine[name], name);
  }
  assert.equal(appNoAuth, engineNoAuth);
});

test("media combo executors import the key scope from the engine, never from src", () => {
  for (const file of ["imageCombo.ts", "speechCombo.ts", "videoCombo.ts"]) {
    const source = fs.readFileSync(path.join("open-sse/services", file), "utf8");
    assert.doesNotMatch(source, /@\/sse\/services\/keyConnectionScope/, file);
    assert.match(source, /open-sse\/services\/comboKeyScope\.ts/, file);
  }
});

test("scopeComboTargetsForKey keeps the injected model gate and connection scope", async () => {
  const targets = [{ modelStr: "a/x" }, { modelStr: "b/y" }];
  const scoped = await engine.scopeComboTargetsForKey(
    targets,
    { allowedConnections: ["conn-1"], isTargetAllowed: async (m) => m === "b/y" },
    "media"
  );
  assert.deepEqual(scoped.targets, [{ modelStr: "b/y" }]);
  assert.deepEqual(scoped.allowedConnections, ["conn-1"]);
  assert.equal(scoped.rejection, null);

  const refused = await engine.scopeComboTargetsForKey(
    targets,
    { isTargetAllowed: async () => false },
    "media"
  );
  assert.deepEqual(refused.targets, []);
  assert.equal(refused.rejection?.status, 403);
});

test("keylessProviderRejection honours the synthetic noauth allowlist rule", async () => {
  let looked = false;
  const lookup = async () => {
    looked = true;
    return null;
  };
  assert.equal(await engine.keylessProviderRejection("ollama", null, lookup), null);
  assert.equal(await engine.keylessProviderRejection("ollama", ["noauth"], lookup), null);
  assert.equal(looked, false);

  const denied = await engine.keylessProviderRejection("ollama", ["conn-1"], lookup);
  assert.equal(looked, true);
  assert.equal(denied?.status, 404);

  const blocked = await engine.keylessProviderRejection("ollama", ["conn-1"], async () => ({
    blockedByKeyPolicy: true,
    blockedCount: 2,
  }));
  assert.equal(blocked?.status, 403);
});
