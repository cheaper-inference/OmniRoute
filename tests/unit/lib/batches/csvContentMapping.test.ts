import { test } from "node:test";
import assert from "node:assert/strict";
import { wizardCsvMappingSchema } from "../../../../src/lib/batches/schemas.ts";

test("CSV mapping rejects a message role without message content", () => {
  const result = wizardCsvMappingSchema.safeParse({
    id: "custom_id",
    role: "body.messages[0].role",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.ok(result.error.issues.some((issue) => issue.message.includes("body content")));
  }
});

for (const path of [
  "body.messages[0].content",
  "body.messages[1].content",
  "body.input",
  "body.prompt",
]) {
  test(`CSV mapping accepts content at ${path} with a role mapping`, () => {
    assert.equal(
      wizardCsvMappingSchema.safeParse({
        id: "custom_id",
        role: "body.messages[0].role",
        prompt: path,
      }).success,
      true
    );
  });
}
