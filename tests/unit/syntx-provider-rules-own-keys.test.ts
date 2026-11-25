// CodeQL #1392 (js/unvalidated-dynamic-method-call): applySyntxProviderRules indexed a plain
// object literal with the caller-chosen `aiName` (the text before "/" in the requested model), so
// names such as "constructor", "__proto__", "hasOwnProperty" or "valueOf" resolved to members
// inherited from Object.prototype and were invoked. Only the rules defined in the table may run;
// any other name takes the "no rule" path and leaves the settings untouched.
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { applySyntxProviderRules } = await import("../../open-sse/services/syntxMedia.ts");

const INHERITED_NAMES = ["constructor", "__proto__", "hasOwnProperty", "valueOf", "toString"];

describe("applySyntxProviderRules: only own rule entries run", () => {
  for (const aiName of INHERITED_NAMES) {
    it(`"${aiName}" takes the no-rule path without a TypeError`, () => {
      const settings = { aspect_ratio: "1:1", resolution: "1K", style: "x" };
      assert.doesNotThrow(() =>
        applySyntxProviderRules(aiName, settings, { modelType: "m", fileCount: 0 })
      );
      assert.deepEqual(settings, { aspect_ratio: "1:1", resolution: "1K", style: "x" });
    });
  }

  it("never invokes the inherited Object.prototype.constructor", () => {
    const original = Object.prototype.constructor;
    let calls = 0;
    // Swap the inherited member for a spy; a plain-object lookup of "constructor" reaches it.
    Object.prototype.constructor = function spy() {
      calls += 1;
    } as unknown as ObjectConstructor;
    try {
      applySyntxProviderRules("constructor", {}, { modelType: "m" });
    } finally {
      Object.prototype.constructor = original;
    }
    assert.equal(calls, 0);
  });

  it("an own rule still applies", () => {
    const settings = { model_type: "seedream-4.5", resolution: "1K" };
    applySyntxProviderRules("seedream", settings, { modelType: "seedream-4.5" });
    assert.equal(settings.resolution, "2K");
  });
});
