import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// A JSON body that is valid JSON but not an object made `handleChat` throw
// (`Cannot use 'in' operator to search for 'messages' in x`, `Cannot convert undefined or null to object`) and
// the request ended as a 500. `/v1/responses` already answers it with "Request body must be a JSON object".

const harness = await createChatPipelineHarness("chat-non-object-body");
const { handleChat, buildRequest, resetStorage } = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

for (const [label, body] of [
  ["null", "null"],
  ["a string", '"x"'],
  ["a number", "5"],
  ["true", "true"],
] as const) {
  for (const url of [
    "http://localhost/v1/chat/completions",
    "http://localhost/v1/messages",
    "http://localhost/v1/completions",
  ]) {
    test(`${label} on ${new URL(url).pathname} is rejected with a clear 400`, async () => {
      let status = 0;
      let message = "";
      try {
        const response = await handleChat(buildRequest({ url, body }));
        status = response.status;
        message =
          ((await response.json()) as { error?: { message?: string } }).error
            ?.message ?? "";
      } catch (error) {
        // A throw out of handleChat is what the route turns into a 500.
        status = 500;
        message = error instanceof Error ? error.message : String(error);
      }
      assert.equal(status, 400, `expected 400, got ${status}: ${message}`);
      assert.match(message, /Request body must be a JSON object/i);
    });
  }
}
