import assert from "node:assert/strict";
import { test } from "node:test";
import { hideExposedEmailLabel } from "../../src/app/(dashboard)/dashboard/combos/comboAccountLabel.ts";
import { pickDisplayValue } from "../../src/shared/utils/maskEmail.ts";

test("omits a hidden email that the masker leaves unchanged", () => {
  assert.equal(hideExposedEmailLabel("abc@x.com", "abc@x.com", false), null);
  assert.equal(hideExposedEmailLabel("  abc@x.com  ", "abc@x.com", false), null);
});

test("keeps a masked email when emails are hidden", () => {
  const email = "hello@example.com";
  const masked = pickDisplayValue([email], false, email);
  assert.equal(hideExposedEmailLabel(email, masked, false), "hel**@********com");
});

test("shows the original email when emails are visible", () => {
  assert.equal(hideExposedEmailLabel("abc@x.com", "abc@x.com", true), "abc@x.com");
  assert.equal(
    hideExposedEmailLabel("hello@example.com", "hello@example.com", true),
    "hello@example.com"
  );
});

test("keeps a non-email label when emails are hidden", () => {
  assert.equal(hideExposedEmailLabel("Work account", "Work account", false), "Work account");
});

test("omits empty or missing labels with either visibility setting", () => {
  for (const emailsVisible of [false, true]) {
    for (const label of ["", "  ", null, undefined]) {
      const displayLabel = label ? pickDisplayValue([label], emailsVisible, label) : null;
      assert.equal(hideExposedEmailLabel(label, displayLabel, emailsVisible), null);
      assert.equal(hideExposedEmailLabel("Work account", label, emailsVisible), null);
    }
  }
});
