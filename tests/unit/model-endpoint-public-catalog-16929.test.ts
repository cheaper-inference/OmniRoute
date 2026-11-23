import test from "node:test";
import assert from "node:assert/strict";
import { isUnifiedChatSourceModelSelectable } from "../../src/app/api/v1/models/catalogModelPolicy.ts";

// The /v1/models hiding is opt-in (MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED, default
// off); these cases pin the flag-on behavior. Flag off is covered by
// model-endpoint-capability-gate-flag-16929.test.ts.
const FLAG = "MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED";
const previousFlag = process.env[FLAG];
process.env[FLAG] = "true";
test.after(() => {
  if (previousFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = previousFlag;
});

test("#16929: public /v1/models does not advertise unsupported Gemini audio", () => {
  assert.equal(
    isUnifiedChatSourceModelSelectable("gemini", {
      id: "gemini-3.5-transcribe",
      supportedEndpoints: ["audio-transcriptions"],
      endpointCapabilitySource: "inferred",
    }),
    false
  );
  assert.equal(
    isUnifiedChatSourceModelSelectable("gemini", {
      id: "lyria-exp",
      supportedEndpoints: ["music"],
      endpointCapabilitySource: "inferred",
    }),
    false
  );
});

test("#16929: runnable, multi-endpoint and unknown models remain in the catalog", () => {
  assert.equal(
    isUnifiedChatSourceModelSelectable("vertex", {
      id: "lyria-002",
      supportedEndpoints: ["music"],
      endpointCapabilitySource: "declared",
    }),
    true
  );
  assert.equal(
    isUnifiedChatSourceModelSelectable("gemini", {
      id: "gemini-3.8-flash",
      supportedEndpoints: ["chat"],
      endpointCapabilitySource: "defaulted",
    }),
    true
  );
  assert.equal(
    isUnifiedChatSourceModelSelectable("unregistered-16929", {
      id: "model-x",
      supportedEndpoints: ["audio-transcriptions"],
      endpointCapabilitySource: "declared",
    }),
    true
  );
});
