/**
 * OmniGlyph semantic profiling (1.4.0 package) — end-to-end persistence.
 *
 * Cobre:
 * 1. compressionSettingsUpdateSchema accepts omniglyph:{profile} and REFUSES invalid name
 * 2. updateCompressionSettings / getCompressionSettings round-trip the profile
 * 3. the persisted default is `aggressive` (the policy that the receipts measured)
 * 4. an unknown profile coming from the storage drops to default, it does not leak further
 */
import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { compressionSettingsUpdateSchema } from "../../../src/shared/validation/compressionConfigSchemas.ts";
import { DEFAULT_OMNIGLYPH_CONFIG } from "../../../open-sse/services/compression/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-omniglyph-profile-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

afterEach(() => {
  core.resetDbInstance();
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

describe("omniglyph profile config", () => {
  it("the schema accepts the four profiles and refuses any other name", () => {
    for (const profile of ["coding-safe", "balanced", "aggressive", "passthrough"]) {
      const parsed = compressionSettingsUpdateSchema.safeParse({ omniglyph: { profile } });
      assert.equal(parsed.success, true, `perfil válido recusado: ${profile}`);
    }
    // An invalid name must die in the schema. If it passes, the adapter still fails
    // fechado (skip:invalid_profile), mas o operador veria a engine desligada
    // without any errors on the configuration screen.
    assert.equal(
      compressionSettingsUpdateSchema.safeParse({ omniglyph: { profile: "turbo-max" } }).success,
      false
    );
    assert.equal(
      compressionSettingsUpdateSchema.safeParse({ omniglyph: { profile: "" } }).success,
      false
    );
  });

  it("default is aggressive — the policy that published receipts measured", async () => {
    assert.equal(DEFAULT_OMNIGLYPH_CONFIG.profile, "aggressive");
    assert.equal((await getCompressionSettings()).omniglyph?.profile, "aggressive");
  });

  it("round-trip of the profile chosen by the operator", async () => {
    await updateCompressionSettings({ omniglyph: { profile: "coding-safe" } });
    assert.equal((await getCompressionSettings()).omniglyph?.profile, "coding-safe");

    await updateCompressionSettings({ omniglyph: { profile: "passthrough" } });
    assert.equal((await getCompressionSettings()).omniglyph?.profile, "passthrough");
  });

  it("unknown profile on storage drops to default instead of leaking forward", async () => {
    await updateCompressionSettings({ omniglyph: { profile: "coding-safe" } });
    // Simulates a line written by a future/tampered version, bypassing the schema.
    await updateCompressionSettings({ omniglyph: { profile: "turbo-max" } } as never);
    assert.equal((await getCompressionSettings()).omniglyph?.profile, "aggressive");
  });
});
