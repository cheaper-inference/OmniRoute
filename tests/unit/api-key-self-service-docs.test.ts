import test from "node:test";
import assert from "node:assert/strict";
import { buildApiOperationExample } from "../../src/lib/agentSkills/apiOperationExample.ts";
import { updateApiKeySelfServiceSchema } from "../../src/shared/validation/schemas/keys.ts";

test("generated self-service PUT example sends a body the route accepts", () => {
  const example = buildApiOperationExample(
    { method: "PUT", path: "/api/keys/{id}/self-service" },
    false
  );
  const dataLine = example.find((line) => line.trimStart().startsWith("-d "));
  assert.ok(dataLine, "example has a request body");
  const body = JSON.parse(dataLine.trim().slice(3).replace(/^'|'$/g, ""));
  assert.equal(updateApiKeySelfServiceSchema.safeParse(body).success, true);
});
