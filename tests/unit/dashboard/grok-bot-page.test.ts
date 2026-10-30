import test from "node:test";
import assert from "node:assert/strict";

const { grokBotRegions } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/page.tsx");

test("grok bot page lists the five read-only regions in order", () => {
  assert.deepEqual(
    grokBotRegions().map((region) => region.id),
    ["accounts", "roster", "conversation", "skills", "computers"]
  );
});

test("every grok bot region has its own icon", () => {
  const icons = grokBotRegions().map((region) => region.icon);
  assert.equal(icons.length, new Set(icons).size);
  for (const icon of icons) {
    assert.equal(typeof icon, "string");
    assert.ok(icon.length > 0);
  }
});

test("every grok bot region reads its text from the page namespace", () => {
  for (const region of grokBotRegions()) {
    assert.equal(region.title, `${region.id}Title`);
    assert.equal(region.empty, `${region.id}Empty`);
  }
});

test("the marketplace link leaves this dashboard and carries no token", async () => {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(
    new URL("../../../src/app/(dashboard)/dashboard/grok-bot/page.tsx", import.meta.url),
    "utf-8"
  );
  assert.match(source, /href="https:\/\/x\.ai\/bot\/marketplace"/);
  assert.match(source, /target="_blank"/);
  assert.doesNotMatch(source, /marketplace[\s\S]{0,240}(token|accessToken|auth_token)/i);
});
