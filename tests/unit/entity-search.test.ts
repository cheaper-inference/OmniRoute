import assert from "node:assert/strict";
import { test } from "node:test";
import {
  filterEntityOptions,
  matchesEntitySearch,
  indexEntityOptions,
  normalizeEntitySearch,
} from "../../src/shared/utils/entitySearch.ts";

test("entity search normalizes Turkish, accents, Arabic Yeh/Kaf and Persian spacing symmetrically", () => {
  for (const [left, right] of [
    ["İSTANBUL Şarj", "istanbul sarj"],
    ["Renée", "renee"],
    ["علي كيان", "علی کیان"],
    ["حساب‌من", "حساب من"],
  ]) {
    assert.equal(normalizeEntitySearch(left), normalizeEntitySearch(right));
    for (const [label, query] of [
      [left, right],
      [right, left],
    ]) {
      assert.equal(
        filterEntityOptions(indexEntityOptions([{ value: "exact-ID", label }]), query)[0]?.value,
        "exact-ID"
      );
    }
  }
});

test("all terms match explicit fields, preserve order/identity and treat punctuation literally", () => {
  const options = [
    {
      value: "openai/model-4.10[mini]*",
      label: "Renée",
      description: "Imported",
      keywords: ["alias"],
    },
    { value: "openai/model-4.1", label: "Renée", keywords: ["alias"] },
  ];
  const index = indexEntityOptions(options);
  assert.deepEqual(filterEntityOptions(index, " ALIAS  openai "), options);
  assert.equal(filterEntityOptions(index, "renée imported [mini]*")[0], options[0]);
  assert.equal(filterEntityOptions(index, "4.1").length, 2);
  assert.equal(filterEntityOptions(index, "[.*").length, 0);
  assert.equal(options[0].label, "Renée");
});

test("index projects allowlisted fields only and preserves Auto during search", () => {
  const option = {
    value: "account-1",
    label: "a***",
    accessToken: "SECRET-CANARY",
    email: "hidden@example.invalid",
  };
  const auto = { value: "", label: "Auto", alwaysVisible: true };
  const index = indexEntityOptions([option, auto]);
  assert.deepEqual(filterEntityOptions(index, "SECRET-CANARY"), [auto]);
  assert.deepEqual(filterEntityOptions(index, "hidden@example.invalid"), [auto]);
  assert.ok(!JSON.stringify(index.map(({ text }) => text)).includes("CANARY"));
});

for (const size of [0, 1, 100, 1000, 5000]) {
  test(`complete ${size}-item catalog, including last exact value`, () => {
    const options = Array.from({ length: size }, (_, i) => ({
      value: `qualified/model-${i}`,
      label: `Model ${i}`,
    }));
    const index = indexEntityOptions(options);
    assert.equal(filterEntityOptions(index, "").length, size);
    if (size)
      assert.equal(filterEntityOptions(index, `qualified/model-${size - 1}`)[0], options[size - 1]);
  });
}

test("restriction matching uses all safe fields without changing IDs", () => {
  assert.equal(matchesEntitySearch(["علي كيان", "account-2"], "علی  account-2"), true);
  assert.equal(matchesEntitySearch(["visible***", "account-2"], "hidden"), false);
  assert.equal(matchesEntitySearch(["İstanbul", "Imported"], "istanbul imported"), true);
});
