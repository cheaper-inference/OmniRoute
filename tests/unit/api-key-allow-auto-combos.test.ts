/**
 * Per-key control over the built-in `auto` / `auto/*` combos.
 *
 * The per-key flag, `allowAutoCombos`, defaults to TRUE. Setting it to false
 * denies the built-in `auto` and `auto/*` names at dispatch and drops them from
 * the key's catalog. Legacy database rows with those names cannot bypass it.
 *
 * Rules:
 *   R1 The column is declared with DEFAULT 1 (allowed) for legacy rows.
 *   R2 The row parser treats anything but an explicit falsy value as allowed.
 *   R3 The deny predicate fires only for built-in auto ids on a key that opted out.
 *   R4 The PATCH schema preserves the flag and counts it as a real update.
 *   R5 The update route forwards it into the payload.
 *   R6 The catalog skips the auto/* synthesis loop for an opted-out key.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

process.env.API_KEY_SECRET ||= "api-key-allow-auto-combos-test-secret";

const { API_KEY_COLUMN_FALLBACKS } = await import("../../src/lib/db/apiKeyColumnFallbacks.ts");
const { parseAllowAutoCombos } = await import("../../src/lib/db/apiKeys/rowParsers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { enforceApiKeyPolicy, isAutoComboDeniedForKey } =
  await import("../../src/shared/utils/apiKeyPolicy.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("R1: allow_auto_combos is declared NOT NULL DEFAULT 1 so legacy keys keep auto/*", () => {
  const column = API_KEY_COLUMN_FALLBACKS.find(
    (c: { name: string }) => c.name === "allow_auto_combos"
  );
  assert.ok(column, "api_keys must gain an allow_auto_combos column");
  assert.match(
    column.definition,
    /NOT NULL DEFAULT 1/,
    "default must be 1 — an existing key must not silently lose auto/* access"
  );
});

test("R2: the row parser defaults to allowed and opts out only on an explicit falsy value", () => {
  // Legacy rows predating the column, and rows that never set it.
  assert.equal(parseAllowAutoCombos(undefined), true);
  assert.equal(parseAllowAutoCombos(null), true);
  assert.equal(parseAllowAutoCombos(1), true);
  assert.equal(parseAllowAutoCombos("1"), true);
  assert.equal(parseAllowAutoCombos(true), true);
  // Explicit opt-out, in every shape SQLite / JSON round-trips produce.
  assert.equal(parseAllowAutoCombos(0), false);
  assert.equal(parseAllowAutoCombos("0"), false);
  assert.equal(parseAllowAutoCombos(false), false);
});

test("R3: an opted-out key denies only recognized built-in auto IDs", () => {
  const optedOut = { allowAutoCombos: false };
  const optedIn = { allowAutoCombos: true };
  const legacy = {}; // flag absent entirely

  assert.equal(isAutoComboDeniedForKey(optedOut, "auto"), true);
  assert.equal(isAutoComboDeniedForKey(optedOut, "AUTO"), true);
  assert.equal(isAutoComboDeniedForKey(optedOut, "auto/best-coding"), true);
  assert.equal(isAutoComboDeniedForKey(optedOut, "Auto/Best-Coding"), true);
  assert.equal(isAutoComboDeniedForKey(optedOut, "auto/coding:fast"), true);
  assert.equal(isAutoComboDeniedForKey(optedOut, "Auto/Claude-Sonnet"), true);
  assert.equal(isAutoComboDeniedForKey(optedOut, "auto/legado-x"), false);

  // Opted in, or never configured — never denied.
  assert.equal(isAutoComboDeniedForKey(optedIn, "auto"), false);
  assert.equal(isAutoComboDeniedForKey(legacy, "auto"), false);
  assert.equal(isAutoComboDeniedForKey(optedIn, "auto/best-coding"), false);
  assert.equal(isAutoComboDeniedForKey(legacy, "auto/best-coding"), false);
  assert.equal(isAutoComboDeniedForKey(undefined, "auto/best-coding"), false);
  assert.equal(isAutoComboDeniedForKey(null, "auto/best-coding"), false);

  // Never touches anything that is not an auto/* id, even when opted out.
  assert.equal(isAutoComboDeniedForKey(optedOut, "claude-haiku"), false);
  assert.equal(isAutoComboDeniedForKey(optedOut, "codex/gpt-5.6-sol-xhigh"), false);
  assert.equal(isAutoComboDeniedForKey(optedOut, "qtSd/pool-1"), false);
  // Explicit combo syntax remains ordinary combo syntax, even when the stored
  // combo itself is named "auto".
  assert.equal(isAutoComboDeniedForKey(optedOut, "combo/auto"), false);
  // A combo whose name merely starts with the word "auto" is not an auto/* id.
  assert.equal(isAutoComboDeniedForKey(optedOut, "auto-router"), false);
  assert.equal(isAutoComboDeniedForKey(optedOut, ""), false);
});

test("R3b: a persisted auto combo cannot bypass the key opt-out", async () => {
  const allowedKey = await apiKeysDb.createApiKey("Bare auto allowed combo", "machine-auto-1");
  await apiKeysDb.updateApiKeyPermissions(allowedKey.id, {
    allowAutoCombos: false,
    allowedCombos: ["auto"],
  });
  const request = () =>
    new Request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${allowedKey.key}` },
    });

  const builtInBare = await enforceApiKeyPolicy(request(), "auto");
  assert.equal(builtInBare.rejection?.status, 403, "the built-in bare auto route must be denied");

  await combosDb.createCombo({
    name: "auto",
    strategy: "priority",
    models: ["openai/gpt-4.1"],
  });

  const storedBare = await enforceApiKeyPolicy(request(), "auto");
  assert.equal(
    storedBare.rejection?.status,
    403,
    "the persisted combo cannot override the auto opt-out"
  );

  const explicitStored = await enforceApiKeyPolicy(request(), "combo/auto");
  assert.equal(explicitStored.rejection, null, "combo/auto must remain ordinary combo syntax");

  const virtualPrefixed = await enforceApiKeyPolicy(request(), "auto/best-coding");
  assert.equal(
    virtualPrefixed.rejection?.status,
    403,
    "a recognized built-in auto variant must remain denied"
  );

  const blockedKey = await apiKeysDb.createApiKey("Bare auto blocked combo", "machine-auto-2");
  await apiKeysDb.updateApiKeyPermissions(blockedKey.id, {
    allowAutoCombos: false,
    allowedCombos: [],
  });
  const blocked = await enforceApiKeyPolicy(
    new Request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${blockedKey.key}` },
    }),
    "auto"
  );
  assert.equal(blocked.rejection?.status, 403, "auto remains denied for a key that opted out");
});

test("R3c: saved auto routes obey the key's combo list, including fuzzy matches", async () => {
  for (const name of ["auto/legado-x", "auto/best-foo"]) {
    await combosDb.createCombo({ name, strategy: "priority", models: ["openai/gpt-4.1"] });
  }

  const { key, id } = await apiKeysDb.createApiKey("Legacy auto combos", "machine-auto-legacy");
  const request = () =>
    new Request("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
    });
  await apiKeysDb.updateApiKeyPermissions(id, {
    allowAutoCombos: false,
    allowedCombos: ["auto/legado-x", "auto/best-foo"],
  });

  for (const model of ["auto/legado-x", "AUTO/LEGADO-X", "auto/foo"]) {
    assert.equal((await enforceApiKeyPolicy(request(), model)).rejection, null, model);
  }

  await apiKeysDb.updateApiKeyPermissions(id, { allowedCombos: ["auto/foo"] });
  for (const [model, savedName] of [
    ["auto/legado-x", "auto/legado-x"],
    ["auto/foo", "auto/best-foo"],
  ]) {
    const { rejection } = await enforceApiKeyPolicy(request(), model);
    assert.equal(rejection?.status, 403);
    const body = await rejection.json();
    assert.ok(body.error.message.includes(`Combo "${savedName}" is not allowed`));
  }

  await apiKeysDb.updateApiKeyPermissions(id, { allowAutoCombos: true });
  const { rejection } = await enforceApiKeyPolicy(request(), "Auto/Best-Coding");
  assert.equal(rejection?.status, 403, "a built-in auto id still requires combo access");
});

test("R4: the PATCH schema preserves allowAutoCombos and counts it as a real update", () => {
  const parsed = schemas.updateKeyPermissionsSchema.safeParse({ allowAutoCombos: false });
  assert.equal(
    parsed.success,
    true,
    "allowAutoCombos alone must be a valid update — the 'No valid fields' guard must count it"
  );
  if (!parsed.success) return;
  assert.equal(parsed.data.allowAutoCombos, false, "the flag must survive parsing");

  const on = schemas.updateKeyPermissionsSchema.safeParse({ allowAutoCombos: true });
  assert.equal(on.success, true);
  if (on.success) assert.equal(on.data.allowAutoCombos, true);

  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ allowAutoCombos: "no" }).success,
    false,
    "a non-boolean must be rejected"
  );
});

test("R5: the update route forwards allowAutoCombos into the payload", () => {
  const route = read("src/app/api/keys/[id]/route.ts");
  assert.ok(
    route.includes("if (allowAutoCombos !== undefined) payload.allowAutoCombos = allowAutoCombos"),
    "PATCH /api/keys/[id] must forward allowAutoCombos to updateApiKeyPermissions"
  );
});

test("R7: the API Manager wires the toggle and defaults it ON", () => {
  const tab = read("src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/CombosTab.tsx");
  const form = read("src/app/(dashboard)/dashboard/api-manager/[id]/access/useApiKeyAccessForm.ts");

  assert.ok(
    tab.includes("ApiKeyAutoCombosToggle"),
    "the combos tab must render the auto-combos toggle"
  );
  assert.ok(
    form.includes("allowAutoCombos: apiKey?.allowAutoCombos !== false"),
    "state must default ON via `!== false` — `=== true` would render a key that predates the field as disabled"
  );
  assert.ok(form.includes("allowAutoCombos: boolean;"), "the form state interface must declare it");
  assert.ok(
    form.includes("allowAutoCombos: formState.allowAutoCombos,"),
    "the buildApiKeyAccessPayload must include allowAutoCombos"
  );
});

test("R8: the toggle's UI strings exist in English and Vietnamese", () => {
  // en.json is the source of truth; vi is the one locale whose completeness is
  // asserted by tests/unit/i18n-vi-completeness.test.ts (it bans placeholders).
  for (const locale of ["en", "vi"]) {
    const messages = JSON.parse(read(`src/i18n/messages/${locale}.json`));
    for (const key of ["autoCombosTitle", "autoCombosDesc"]) {
      const value = messages?.settings?.[key];
      assert.equal(typeof value, "string", `${locale}.json settings.${key} must exist`);
      assert.ok(value.trim().length > 0, `${locale}.json settings.${key} must not be empty`);
      assert.ok(
        !/__(?:MISSING|TODO)__/i.test(value),
        `${locale}.json settings.${key} must be translated, not a placeholder`
      );
    }
  }
});

test("R6: the catalog skips auto/* synthesis for a key that opted out", () => {
  const catalog = read("src/app/api/v1/models/catalog.ts");
  assert.ok(
    catalog.includes("autoCombosDisallowedForKey"),
    "catalog must compute a per-key auto/* suppression flag"
  );
  assert.ok(
    /if \(hideAuto \|\| autoCombosDisallowedForKey\) break;/.test(catalog),
    "the auto/* synthesis loop must break for an opted-out key, as it already does for hideAuto"
  );
});
