import { describe, expect, it, vi } from "vitest";
vi.mock("@/lib/db/models/activeSyncedCatalog", () => ({
  getActiveSyncedCatalog: vi.fn(async () => ({
    models: [{ id: "clef:27b", supportedEndpoints: ["systemone"] }],
  })),
}));
import { nativeDecisionTestEndpoint } from "@/lib/api/decisionModelTestPolicy";
describe("native decision probe policy", () => {
  it("uses provider-node protocol without guessing the model name", async () => {
    expect(await nativeDecisionTestEndpoint("custom", "custom/julia-1", null, "systemone")).toBe(
      "/v1/systemone"
    );
  });
  it("uses synced capabilities for an ordinary provider import", async () => {
    expect(
      await nativeDecisionTestEndpoint("ollama-cloud", "ollamacloud/clef:27b", null, undefined)
    ).toBe("/v1/systemone");
  });
  it("preserves chat testing for a chat-only model", async () => {
    expect(
      await nativeDecisionTestEndpoint(
        "custom",
        "custom/chat",
        { supportedEndpoints: ["chat"] },
        "chat"
      )
    ).toBeNull();
  });
});

it("preserves legacy Jev decisions tags as System One while explicit native format wins", async () => {
  expect(
    await nativeDecisionTestEndpoint(
      "typesafe",
      "typesafe/jev-latest",
      { supportedEndpoints: ["decisions"] },
      undefined
    )
  ).toBe("/v1/systemone");
  expect(
    await nativeDecisionTestEndpoint(
      "custom",
      "custom/native",
      { supportedEndpoints: ["decisions"], apiFormat: "decisions" },
      undefined
    )
  ).toBe("/v1/decisions");
});
