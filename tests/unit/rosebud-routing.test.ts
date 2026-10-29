import test from "node:test";
import assert from "node:assert/strict";
import { executeImageWithCredentialFallback } from "../../src/sse/services/imageCredentialRetry.ts";

test("Rosebud never rotates a paid job to another account after authentication expires", async () => {
  let calls = 0;
  const result = await executeImageWithCredentialFallback({
    provider: "rosebud",
    requestedModel: "flux-2-flash",
    credentials: { connectionId: "primary" },
    execute: async () => {
      calls++;
      return { success: false, status: 401, error: "key_expired" };
    },
    selectNextCredentials: async () => {
      throw new Error("must not select a different billing account");
    },
  });
  assert.equal(calls, 1);
  assert.equal(result.result.status, 401);
});
