import assert from "node:assert/strict";
import { after, describe, test } from "node:test";

describe("TLS proxy context with case-insensitive environment names", async () => {
  // Run the existing assertions with Windows main-thread environment-name semantics.
  // This models case-insensitivity only; it is not a native Windows execution.
  const originalEnv = process.env;
  const values = Object.fromEntries(
    Object.entries(originalEnv).map(([key, value]) => [key.toUpperCase(), value])
  );
  const normalize = (key: string | symbol) => (typeof key === "string" ? key.toUpperCase() : key);
  process.env = new Proxy(values, {
    get: (target, key) => Reflect.get(target, normalize(key)),
    set: (target, key, value) => Reflect.set(target, normalize(key), String(value)),
    deleteProperty: (target, key) => Reflect.deleteProperty(target, normalize(key)),
    has: (target, key) => Reflect.has(target, normalize(key)),
  });
  after(() => {
    process.env = originalEnv;
  });

  test("Windows environment model aliases assignment and deletion across casing", () => {
    process.env.OMNIROUTE_TEST_CASE_INSENSITIVE = "present";
    assert.equal(process.env.omniroute_test_case_insensitive, "present");
    delete process.env.omniroute_test_case_insensitive;
    assert.equal(process.env.OMNIROUTE_TEST_CASE_INSENSITIVE, undefined);
  });

  await import("./tls-proxy-context.test.ts");
});
