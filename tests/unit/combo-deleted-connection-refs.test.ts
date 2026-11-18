// tests/unit/combo-deleted-connection-refs.test.ts
//
// Deleting a provider connection must not rewrite a combo step that pins it
// into an unpinned "any account of this provider" step: that silently widens
// where the request can go. The step keeps its reference so the target fails
// loudly and the dashboard can say the account is gone.
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { pruneDeletedComboConnectionRefs } from "@/lib/db/comboConnectionRefs";

describe("pruneDeletedComboConnectionRefs", () => {
  it("keeps a pinned step's connectionId after its connection is deleted", () => {
    const steps = [
      { id: "s1", kind: "model", model: "agy/gemini-3.8-flash-high", connectionId: "gone" },
    ];

    const result = pruneDeletedComboConnectionRefs(steps, ["gone"]);

    assert.deepEqual(result.steps, steps);
    assert.equal(result.steps[0].connectionId, "gone");
    assert.equal(result.changed, false);
  });

  it("keeps a provider-wildcard step's connectionId", () => {
    const steps = [
      { id: "s1", kind: "provider-wildcard", providerId: "agy", connectionId: "gone" },
    ];

    const result = pruneDeletedComboConnectionRefs(steps, new Set(["gone"]));

    assert.equal(result.steps[0].connectionId, "gone");
    assert.equal(result.changed, false);
  });

  it("prunes only the deleted id from a multi-account allowlist", () => {
    const steps = [
      { id: "s1", kind: "model", model: "claude", allowedConnectionIds: ["a", "gone", "b"] },
    ];

    const result = pruneDeletedComboConnectionRefs(steps, ["gone"]);

    assert.deepEqual(result.steps[0].allowedConnectionIds, ["a", "b"]);
    assert.equal(result.changed, true);
  });

  it("keeps a single-account allowlist intact instead of turning it into an empty (unrestricted) scope", () => {
    const steps = [{ id: "s1", kind: "model", model: "claude", allowedConnectionIds: ["gone"] }];

    const result = pruneDeletedComboConnectionRefs(steps, ["gone"]);

    assert.deepEqual(result.steps[0].allowedConnectionIds, ["gone"]);
    assert.equal(result.steps[0], steps[0], "an untouched step must come back as the same object");
    assert.equal(result.changed, false);
  });

  it("drops non-string entries from an allowlist instead of keeping them as scope", () => {
    const steps = [
      { id: "s1", kind: "model", model: "claude", allowedConnectionIds: ["keep", 42, null] },
    ];

    const result = pruneDeletedComboConnectionRefs(steps, ["gone"]);

    assert.deepEqual(result.steps[0].allowedConnectionIds, ["keep"]);
    assert.equal(result.changed, true);
  });

  it("leaves steps that reference nothing deleted untouched", () => {
    const steps = [
      { id: "s1", kind: "model", model: "gpt-4", connectionId: "keep" },
      { id: "s2", kind: "model", model: "gemini", allowedConnectionIds: ["keep"] },
    ];

    const result = pruneDeletedComboConnectionRefs(steps, ["gone"]);

    assert.deepEqual(result.steps, steps);
    assert.equal(result.changed, false);
  });

  it("does not mutate the caller's step objects", () => {
    const step = {
      id: "s1",
      kind: "model",
      model: "claude",
      allowedConnectionIds: ["gone", "keep"],
    };
    const steps = [step];

    pruneDeletedComboConnectionRefs(steps, ["gone"]);

    assert.deepEqual(step.allowedConnectionIds, ["gone", "keep"]);
  });

  it("passes through entries that are not step objects", () => {
    const steps = ["legacy-model-string", null, { id: "s1", kind: "model", model: "x" }];

    const result = pruneDeletedComboConnectionRefs(steps, ["gone"]);

    assert.deepEqual(result.steps, steps);
    assert.equal(result.changed, false);
  });

  it("matches a whitespace-padded deleted id against the trimmed ids it stores", () => {
    const steps = [
      { id: "s1", kind: "model", model: "claude", allowedConnectionIds: ["gone", "keep"] },
    ];

    const result = pruneDeletedComboConnectionRefs(steps, [" gone "]);

    assert.deepEqual(result.steps[0].allowedConnectionIds, ["keep"]);
  });

  it("does nothing when there are no deleted ids", () => {
    const steps = [{ id: "s1", kind: "model", model: "claude", allowedConnectionIds: ["a"] }];

    const result = pruneDeletedComboConnectionRefs(steps, []);

    assert.deepEqual(result.steps, steps);
    assert.equal(result.changed, false);
  });
});
