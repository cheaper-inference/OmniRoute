import test from "node:test";
import assert from "node:assert/strict";

const { grokBotAccounts } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/regions.ts");
const { namedItems } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/details.ts");

test("grok bot accounts keep only signed-in grok bot connections", () => {
  const accounts = grokBotAccounts([
    { id: "a", provider: "grok-bot", name: "one", accessToken: "secret" },
    { id: "b", provider: "grok-cli", name: "other" },
    { provider: "grok-bot", name: "no id" },
  ]);

  assert.deepEqual(accounts, [{ id: "a", name: "one", email: "" }]);
});

test("named items drop entries without a string id and name", () => {
  assert.deepEqual(namedItems([{ id: "s", name: "search" }, { id: "x" }, null]), [
    { id: "s", name: "search" },
  ]);
});
