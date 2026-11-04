/**
 * v2 server/discover must not advertise capabilities the sidecar does not
 * actually implement.
 *
 * `buildDiscoverResult` previously hardcoded
 *   resources: { listChanged: false }, prompts: { listChanged: false }
 * while v2 registers ZERO resources and ZERO prompts (verified:
 * registerResource/registerPrompt/.resource(/.prompt( all count 0 in v2).
 * That is a false claim in the record: a client that trusts it probes
 * resources/list or prompts/list, gets nothing back, and cannot tell a
 * mis-declared capability from a broken server.
 *
 * The contract these tests lock in: the discover result reports only what
 * is really registered, so the two sources cannot disagree.
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
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildDiscoverResult } from "../../../open-sse/mcp-server/v2/server.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const V2_SOURCE = readFileSync(join(HERE, "../../../open-sse/mcp-server/v2/server.ts"), "utf8");

/** Remove block and line comments so only real code is asserted on. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, "");
}

describe("v2 server/discover capability honesty", () => {
  it("does not advertise resources, because v2 registers none", () => {
    // Ground truth: strip comments first, so prose ABOUT registerResource
    // (the doc comment on DiscoverResult) cannot satisfy or break the check.
    // Only real call sites count.
    const code = stripComments(V2_SOURCE);
    expect(code).not.toMatch(/registerResource|\.resource\(/);

    const discover = buildDiscoverResult(8);
    expect(discover.capabilities).not.toHaveProperty("resources");
  });

  it("does not advertise prompts, because v2 registers none", () => {
    expect(stripComments(V2_SOURCE)).not.toMatch(/registerPrompt|\.prompt\(/);

    const discover = buildDiscoverResult(8);
    expect(discover.capabilities).not.toHaveProperty("prompts");
  });

  it("still advertises tools, and only tools", () => {
    const discover = buildDiscoverResult(8);
    expect(Object.keys(discover.capabilities)).toEqual(["tools"]);
    expect(discover.capabilities.tools).toEqual({ listChanged: false });
  });

  it("does not list features the sidecar does not implement", () => {
    const discover = buildDiscoverResult(8);
    // resources/read and prompts/get are not implemented, so they must not
    // be advertised as shipped features.
    expect(discover.features).not.toContain("resources/read");
    expect(discover.features).not.toContain("prompts/list");
    expect(discover.features).not.toContain("prompts/get");
  });
});

// Registry/helper tests do not dispatch HTTP; legacy integration is exercised separately.
vi.mock("../../../open-sse/mcp-server/internalFetch.ts", () => ({ omniRouteFetch: vi.fn() }));
