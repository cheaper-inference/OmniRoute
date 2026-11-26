import assert from "node:assert/strict";
import test from "node:test";
import { classifyModelAbsence } from "../../open-sse/services/modelAvailabilityEvidence.ts";

const model = "example/model-v2";
const absence = { error: { code: "model_not_found", param: "model", model } };

test("classifies only explicit absence of the exact model on the wire", () => {
  assert.equal(classifyModelAbsence(404, absence, model), "explicit_model_not_found");
  assert.equal(
    classifyModelAbsence(
      404,
      { error: { message: "Model 'example/model-v2' does not exist." } },
      model
    ),
    "explicit_model_not_found"
  );
  for (const status of [200, 400, 401, 403, 408, 429, 502]) {
    assert.equal(classifyModelAbsence(status, absence, model), null, String(status));
  }
  for (const body of [
    "<html>404</html>",
    { error: { message: "Not found" } },
    { error: { code: "model_not_found", message: "Not found" } },
    { error: { ...absence.error, param: "file_id" } },
    { error: { ...absence.error, resource_type: "file" } },
    { error: { ...absence.error, type: "resource_not_found" } },
    { error: { ...absence.error, model: "example/model-v20" } },
    ...[
      "Model is at capacity",
      "Model does not exist or you do not have access to it",
      "Model is unavailable under this account policy",
      "Model is unavailable on this endpoint",
      "File was not found",
      "Model requires an entitlement",
    ].map((message) => ({ error: { ...absence.error, message } })),
  ]) {
    assert.equal(classifyModelAbsence(404, body, model), null, JSON.stringify(body));
  }
});
