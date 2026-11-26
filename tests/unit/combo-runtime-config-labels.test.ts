import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// KEA-9368: the route detail page listed a route's stored settings under their raw config
// keys ("explorationRate", "routerStrategy"). Every row now gets a readable label: the
// `comboControl.runtimeConfigLabel.<key>` message when there is one, else the key in words.
const { humanizeRuntimeConfigKey, runtimeConfigLabel } =
  await import("@/lib/combos/runtimeConfigLabels");
const { comboRuntimeConfigSchema } = await import("@/shared/validation/schemas/combo");

const en = JSON.parse(readFileSync("src/i18n/messages/en.json", "utf8"));
const labels: Record<string, string> = en.comboControl.runtimeConfigLabel;

/** The slice of a next-intl translator the helper uses, over the real English messages. */
function translator(messages: Record<string, string>) {
  const lookup = (key: string) => messages[key.replace(/^runtimeConfigLabel\./, "")];
  const t = (key: string) => lookup(key) ?? key;
  t.has = (key: string) => key.startsWith("runtimeConfigLabel.") && lookup(key) !== undefined;
  return t;
}

// The schema is `z.object({...}).passthrough().transform(...)`: its keys are on the input side
// of the pipe. (Passthrough is also why a stored key can be one no message knows about.)
const schemaKeys = Object.keys(comboRuntimeConfigSchema.in.shape);
// Stored by the built-in automatic routes beside the schema keys (virtualFactory.ts).
const AUTO_ROUTE_KEYS = ["auto", "chaos", "failClosedWhenEmpty", "preserveRungOrder"];

describe("runtimeConfigLabel", () => {
  test("the keys of an automatic route read as English labels", () => {
    const t = translator(labels);
    assert.equal(runtimeConfigLabel("explorationRate", t), "Exploration rate");
    assert.equal(runtimeConfigLabel("routerStrategy", t), "Router strategy");
    assert.equal(runtimeConfigLabel("candidatePool", t), "Candidate pool");
    assert.equal(runtimeConfigLabel("weights", t), "Scoring weights");
  });

  test("no config key the schema accepts is shown as its raw key", () => {
    const t = translator(labels);
    assert.ok(schemaKeys.length > 50, "the schema keys were not read");
    for (const key of [...schemaKeys, ...AUTO_ROUTE_KEYS]) {
      const label = runtimeConfigLabel(key, t);
      assert.notEqual(label, key, `${key} is shown raw`);
      assert.match(label, /^[A-Z]/, `${key} → "${label}" does not read as a label`);
      assert.doesNotMatch(label, /[a-z][A-Z]|_/, `${key} → "${label}" still looks like a key`);
    }
  });

  test("every English label belongs to a real config key", () => {
    const known = new Set([...schemaKeys, ...AUTO_ROUTE_KEYS]);
    for (const key of Object.keys(labels)) {
      assert.ok(known.has(key), `runtimeConfigLabel.${key} labels no known config key`);
    }
  });

  test("a key without a message falls back to its words, never to the key", () => {
    const t = translator({});
    assert.equal(runtimeConfigLabel("explorationRate", t), "Exploration rate");
    assert.equal(runtimeConfigLabel("someNewKnobMs", t), "Some new knob (ms)");
    assert.equal(runtimeConfigLabel("service_tier", t), "Service tier");
    assert.equal(runtimeConfigLabel("quotaCacheTTL", t), "Quota cache TTL");
  });

  test("works with a translator that has no `has` (older mocks) and with odd keys", () => {
    const bare = (key: string) => key;
    assert.equal(runtimeConfigLabel("routerStrategy", bare), "Router strategy");
    assert.equal(humanizeRuntimeConfigKey(""), "");
    assert.equal(humanizeRuntimeConfigKey("x"), "X");
  });
});
