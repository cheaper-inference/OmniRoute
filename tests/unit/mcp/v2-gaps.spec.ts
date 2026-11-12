/**
 * RED test for Task 1: createMcpServerV2 and startMcpStdioV2 exported from index.ts
 */
import { describe, it, expect, vi } from "vitest";

// Run before application imports: real MCP modules must never discover the
// developer's data/plugins. Reuse the repository's trust, DNS and browser guards.
await vi.hoisted(async () => {
  delete process.env.DATA_DIR;
  delete process.env.OMNIROUTE_PLUGINS_DIR;
  process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  await import("../../_setup/isolateDataDir.ts");
  const { mkdirSync } = await import("node:fs");
  mkdirSync(process.env.OMNIROUTE_PLUGINS_DIR!, { recursive: true });
});
import { createMcpServerV2, startMcpStdioV2 } from "../../../open-sse/mcp-server/index.js";

describe("Task 1 — v2 barrel exports", () => {
  it("exports createMcpServerV2", () => {
    expect(typeof createMcpServerV2).toBe("function");
  });

  it("exports startMcpStdioV2", () => {
    expect(typeof startMcpStdioV2).toBe("function");
  });
});
