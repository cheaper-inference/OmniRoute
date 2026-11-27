import assert from "node:assert/strict";
import { test } from "node:test";
import { hideUnmaskableEmailLabel } from "../../src/app/(dashboard)/dashboard/combos/comboAccountLabel.ts";

test("omits a hidden email that the masker leaves unchanged", () => {
  assert.equal(hideUnmaskableEmailLabel("abc@x.com", false), null);
  assert.equal(hideUnmaskableEmailLabel("  abc@x.com  ", false), null);
});

test("masks a longer email when emails are hidden", () => {
  assert.equal(hideUnmaskableEmailLabel("hello@example.com", false), "hel**@********com");
});

test("shows the original email when emails are visible", () => {
  assert.equal(hideUnmaskableEmailLabel("abc@x.com", true), "abc@x.com");
  assert.equal(hideUnmaskableEmailLabel("hello@example.com", true), "hello@example.com");
});

test("keeps a non-email label when emails are hidden", () => {
  assert.equal(hideUnmaskableEmailLabel("Work account", false), "Work account");
});

test("omits empty or missing labels with either visibility setting", () => {
  for (const emailsVisible of [false, true]) {
    for (const label of ["", "  ", null, undefined]) {
      assert.equal(hideUnmaskableEmailLabel(label, emailsVisible), null);
    }
  }
});
