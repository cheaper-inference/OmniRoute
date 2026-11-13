// Unit tests for the claude-agent live model discovery mapping (pure part).
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { mapModelRows } from "../../open-sse/services/claudeAgentModels";

describe("claude-agent model discovery mapping", () => {
  it("drops the default alias row, keeps first-party ids and bare aliases", () => {
    const rows = mapModelRows([
      { value: "default", displayName: "Default model" },
      {
        value: "claude-fable-5-1",
        displayName: "Claude Fable 5.1",
        description: "Most capable",
        supportsEffort: true,
        supportedEffortLevels: ["low", "high"],
      },
      { value: "opus" },
      { value: "claude-haiku-5-5" },
    ]);
    assert.deepEqual(
      rows.map((r) => r.id),
      ["claude-fable-5-1", "opus", "claude-haiku-5-5"]
    );
  });

  it("normalizes router routing prefixes and dedupes", () => {
    const rows = mapModelRows([
      { value: "cmd/claude-fable-5-2", displayName: "Claude Fable 5.2" },
      { value: "claude/cmd/claude-fable-5-2", displayName: "Claude Fable 5.2 (OmniRoute)" },
    ]);
    assert.deepEqual(rows, [
      {
        id: "cmd/claude-fable-5-2",
        name: "Claude Fable 5.2",
        description: undefined,
        supportsEffort: undefined,
        supportedEffortLevels: undefined,
      },
    ]);
  });

  it("drops third-party vendor leakage from a router-backed CLI", () => {
    const rows = mapModelRows([
      { value: "kr/claude-opus-5.5" },
      { value: "claude/kr/claude-opus-5.5" },
      { value: "claude/cmd/z-ai/glm-5.3-flash" },
      { value: "claude/cmd/deepseek/deepseek-v4.1-flash" },
      { value: "claude/cmd/thinkingmachines/inkling-2-small:free" },
    ]);
    assert.deepEqual(rows, []);
  });

  it("drops empty ids", () => {
    assert.deepEqual(mapModelRows([{ value: "" }, { value: "claude-sonnet-5-5" }]), [
      { id: "claude-sonnet-5-5", name: "claude-sonnet-5-5", description: undefined, supportsEffort: undefined, supportedEffortLevels: undefined },
    ]);
  });
});
