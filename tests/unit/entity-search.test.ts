import assert from "node:assert/strict";
import { test } from "node:test";
import { matchesEntitySearch, normalizeEntitySearch } from "../../src/shared/utils/entitySearch";
import {
  filterComboSearchOption,
  projectAccountSearchOption,
  withCurrentAndDefaultOptions,
} from "../../src/app/(dashboard)/dashboard/combos/comboSearchOptions";

test("entity search folds accents, Turkish I, Arabic Yeh and Kaf, and ZWNJ on both sides", () => {
  for (const [left, right] of [
    ["İSTANBUL Şarj", "ıstanbul sarj"],
    ["Renée", "renee"],
    ["علي كيان", "علی کیان"],
    ["حساب‌من", "حساب من"],
  ]) {
    assert.equal(normalizeEntitySearch(left), normalizeEntitySearch(right));
    assert.ok(matchesEntitySearch(left, normalizeEntitySearch(right)));
    assert.ok(matchesEntitySearch(right, normalizeEntitySearch(left)));
  }
});

test("all query terms can match different fields without treating punctuation as a pattern", () => {
  const text = normalizeEntitySearch("Renée openai/model-4.10[mini]* Imported");
  assert.ok(matchesEntitySearch(" imported  RENÉE [mini]* ", text));
  assert.equal(matchesEntitySearch("renee unknown", text), false);
  assert.equal(matchesEntitySearch("[.*", text), false);
});

test("account projection only searches the exact ID and the privacy-safe display label", () => {
  const account = {
    id: "account-Exact",
    label: "private.person@example.test",
    status: "active" as const,
    lastError: "INTERNAL-CANARY",
  };
  const hidden = projectAccountSearchOption(account, false);
  assert.equal(hidden.value, "account-Exact");
  assert.equal(hidden.label, "pri***********@*********est");
  assert.ok(matchesEntitySearch("pri account-exact", hidden.keywords));
  assert.equal(matchesEntitySearch("private.person@example.test", hidden.keywords), false);
  assert.equal(matchesEntitySearch("internal-canary", hidden.keywords), false);
  assert.equal(matchesEntitySearch("active", hidden.keywords), false);
  assert.ok(matchesEntitySearch(account.label, projectAccountSearchOption(account, true).keywords));

  const short = projectAccountSearchOption({ ...account, label: "a@b.test" }, false);
  assert.equal(short.label, "account-Exact");
  assert.equal(matchesEntitySearch("a@b.test", short.keywords), false);
});

test("keeps an unavailable current ID visible and leaves the default choice searchable", () => {
  const defaultOption = { value: "", label: "Select provider" };
  const options = withCurrentAndDefaultOptions([], "Legacy-PROVIDER", defaultOption);
  assert.deepEqual(options, [
    defaultOption,
    {
      value: "Legacy-PROVIDER",
      label: "Legacy-PROVIDER",
      keywords: "legacy-provider",
      disabled: true,
    },
  ]);
  assert.deepEqual(
    options.filter((option) => filterComboSearchOption("missing", option)),
    [defaultOption]
  );
});
