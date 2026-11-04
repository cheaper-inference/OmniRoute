import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

test("the image route rejects untrusted peers before binding or model discovery", () => {
  const route = readFileSync(
    new URL("../../src/app/api/v1/images/generations/route.ts", import.meta.url),
    "utf8"
  );
  const gate = route.indexOf('"Rosebud CLI requires a trusted local or LAN caller"');
  assert.ok(gate > 0);
  assert.ok(gate < route.indexOf("rosebudPinned = await bindRosebud()"));
  assert.ok(gate < route.indexOf("await rosebudModelConnections("));
});
