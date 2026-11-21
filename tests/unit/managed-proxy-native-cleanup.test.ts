import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import { withManagedNativeFixtureCleanup } from "../../scripts/test/managed-proxy-native-fixture.ts";

test("native fixture cleanup requests bounded retries for transient EPERM", async (t) => {
  const root = "/synthetic/fixture";
  const remove = t.mock.method(fs, "rmSync", () => undefined);
  await withManagedNativeFixtureCleanup(root, async () => undefined);
  assert.equal(remove.mock.callCount(), 1);
  assert.deepEqual(remove.mock.calls[0].arguments, [
    root,
    { recursive: true, force: true, maxRetries: 3, retryDelay: 100 },
  ]);
});

test("native fixture cleanup does not hide persistent EPERM", async (t) => {
  const cleanupError = Object.assign(new Error("fixture still locked"), { code: "EPERM" });
  t.mock.method(fs, "rmSync", () => {
    throw cleanupError;
  });
  await assert.rejects(
    withManagedNativeFixtureCleanup("/synthetic/fixture", async () => undefined),
    (error) => error === cleanupError
  );
});

test("native fixture cleanup preserves the check and cleanup errors if both fail", async (t) => {
  const checkError = new Error("native config rejected");
  const cleanupError = Object.assign(new Error("fixture still locked"), { code: "EPERM" });
  t.mock.method(fs, "rmSync", () => {
    throw cleanupError;
  });
  await assert.rejects(
    withManagedNativeFixtureCleanup("/synthetic/fixture", async () => {
      throw checkError;
    }),
    (error) => {
      assert.ok(error instanceof AggregateError);
      assert.equal(error.cause, checkError);
      assert.deepEqual(error.errors, [checkError, cleanupError]);
      return true;
    }
  );
});

test("native fixture cleanup rethrows a check error unchanged when removal succeeds", async (t) => {
  const checkError = new Error("native config rejected");
  const remove = t.mock.method(fs, "rmSync", () => undefined);
  await assert.rejects(
    withManagedNativeFixtureCleanup("/synthetic/fixture", async () => {
      throw checkError;
    }),
    (error) => error === checkError
  );
  assert.equal(remove.mock.callCount(), 1);
});
