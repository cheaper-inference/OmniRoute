/**
 * The output-limit advisory is the only supported way to keep combo targets whose
 * known output ceiling sits below the request's max_tokens. The combo resolver has
 * read it from three places for a while -- the per-combo config, the round-robin
 * config, and the global settings row -- but only the per-combo copy could be set
 * from the dashboard, so an operator with a dozen combos had to edit every one.
 *
 * It lives in settings now, which means it needs a schema entry or the settings API
 * strips it, and a declared default or the resolver sees undefined.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";
import { getSettings, updateSettings } from "../../src/lib/db/settings.ts";

test("outputLimitAdvisory is off unless an operator turns it on", async () => {
  const settings = await getSettings();
  assert.equal(settings.outputLimitAdvisory, false);
});

test("the schema accepts outputLimitAdvisory as a boolean and keeps its neighbours", () => {
  const parsed = updateSettingsSchema.parse({ outputLimitAdvisory: true, theme: "dark" });
  assert.equal(parsed.outputLimitAdvisory, true);
  assert.equal(parsed.theme, "dark");
});

test("the schema rejects a non-boolean advisory instead of coercing it", () => {
  assert.equal(updateSettingsSchema.safeParse({ outputLimitAdvisory: "yes" }).success, false);
});

test("turning it on through updateSettings is visible to the combo resolver", async () => {
  await updateSettings({ outputLimitAdvisory: true });
  const settings = await getSettings();
  assert.equal(settings.outputLimitAdvisory, true);

  await updateSettings({ outputLimitAdvisory: false });
  const restored = await getSettings();
  assert.equal(restored.outputLimitAdvisory, false);
});
