import test from "node:test";
import assert from "node:assert/strict";

const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");

test("updateProviderConnectionSchema: accepts hasArgonOverride true, false and null", () => {
  for (const value of [true, false, null]) {
    const parsed = updateProviderConnectionSchema.safeParse({
      providerSpecificData: { hasArgonOverride: value },
    });
    assert.equal(parsed.success, true, `hasArgonOverride=${value}`);
  }
});

test("updateProviderConnectionSchema: rejects a non-boolean hasArgonOverride", () => {
  for (const value of ["true", 1, {}]) {
    const parsed = updateProviderConnectionSchema.safeParse({
      providerSpecificData: { hasArgonOverride: value },
    });
    assert.equal(parsed.success, false, `hasArgonOverride=${JSON.stringify(value)}`);
    assert.match(parsed.error.issues[0].message, /hasArgonOverride must be a boolean/);
  }
});
