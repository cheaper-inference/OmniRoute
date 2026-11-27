import assert from "node:assert/strict";
import test from "node:test";
import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas";

const validator = updateSettingsSchema.shape.corsOrigins;

test("accepts an omitted or empty CORS list and HTTP(S) origins with optional ports", () => {
  assert.equal(validator.parse(undefined), undefined);
  assert.equal(validator.parse(""), "");
  assert.equal(validator.parse("  \t "), "");
  const origins = "https://app.example.com, http://localhost:3000 , http://[::1]:8080";
  assert.equal(validator.parse(`  ${origins}  `), origins);
});

test("rejects incomplete or non-HTTP(S) CORS origins and URLs with extra components", () => {
  const invalid = [
    "<b>x</b> 😀, http://",
    "example.com",
    "ftp://app.example.com",
    "https:///app.example.com",
    "https://app.example.com/",
    "https://app.example.com/path/..",
    "https://app.example.com?",
    "https://app.example.com#",
    "https://user:password@app.example.com",
    "https://app.example.com\\path",
    "https://app.example.com:",
    "https://app.example.com:65536",
    "https://a pp.example.com",
  ];
  assert.deepEqual(
    invalid.filter((value) => validator.safeParse(value).success),
    []
  );
});

test("rejects empty entries, wildcards, and duplicate CORS origins", () => {
  const invalid = [
    ",",
    "https://app.example.com, ",
    "https://app.example.com,, https://admin.example.com",
    "*",
    "https://*.example.com",
    "https://app.example.com, https://app.example.com",
    "https://app.example.com, HTTPS://APP.EXAMPLE.COM:443",
  ];
  assert.deepEqual(
    invalid.filter((value) => validator.safeParse(value).success),
    []
  );
});

test("keeps the 500-character CORS list limit", () => {
  const originList = Array.from({ length: 24 }, (_, i) => `https://${i}.example.com`).join(", ");
  assert.ok(originList.length > 500);
  assert.equal(validator.safeParse(originList).success, false);
});
