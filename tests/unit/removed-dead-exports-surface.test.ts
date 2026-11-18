import assert from "node:assert/strict";
import { test } from "node:test";

// Pins the public surface of the modules that lost their unused exports, so a
// removal cannot take a live export with it and a dead one does not creep back.
const SURFACES = [
  {
    path: "../../src/shared/services/piConfig.ts",
    kept: ["getPiAgentDir", "getPiModelsPath", "readPiModelsJson"],
    removed: ["getPiSettingsPath", "getPiconfigPresence"],
  },
  {
    path: "../../src/lib/db/providers/providerSpecificDataSecrets.ts",
    kept: ["providerSpecificSecretKeysIn", "mapProviderSpecificDataSecrets"],
    removed: ["isProviderSpecificSecretKey"],
  },
  {
    path: "../../src/lib/oauth/providers/freebuff.ts",
    kept: ["freebuff", "generateFreebuffFingerprintId"],
    removed: ["default"],
  },
  {
    path: "../../src/server/authz/entra/evaluate.ts",
    kept: ["evaluateSsoAuth", "resetSsoResolutionCache"],
    removed: ["invalidateSsoResolution"],
  },
];

for (const { path, kept, removed } of SURFACES) {
  test(`${path} keeps its live exports and not the removed ones`, async () => {
    const mod = await import(path);
    for (const name of kept) {
      assert.equal(typeof mod[name] === "undefined", false, `${name} must stay exported`);
    }
    for (const name of removed) {
      assert.equal(name in mod, false, `${name} must stay removed`);
    }
  });
}
