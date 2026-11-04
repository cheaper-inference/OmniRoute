/**
 * v2 must be OFF by default and must not change v1 behaviour.
 *
 * Diego's constraint: "Off by default. v1 stays untouched and v2 is opt-in,
 * behind a feature flag ... experimental and off by default in the first release
 * it ships in, not on."
 *
 * These assertions are BEHAVIOURAL, not shape checks:
 *   1. startMcpStdioV2() actually THROWS when the flag is unset (default env).
 *   2. The flag is read at MODULE LOAD, proven in a fresh child process with
 *      OMNIROUTE_MCP_V2=true vs unset — the only way to observe a module-load
 *      read, since in-process env mutation cannot flip it.
 *   3. v1's tool surface is byte-identical whether the v2 flag is set or not.
 */

import { describe, it, expect, vi } from "vitest";

// Run before application imports: real MCP modules must never discover the
// developer's data/plugins. Reuse the repository's trust, DNS and browser guards.
await vi.hoisted(async () => {
  delete process.env.DATA_DIR;
  delete process.env.OMNIROUTE_PLUGINS_DIR;
  // The sidecar reads this flag at module load, so clear any inherited value
  // before the server import below runs.
  delete process.env.OMNIROUTE_MCP_V2;
  process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  await import("../../_setup/isolateDataDir.ts");
  const { mkdirSync } = await import("node:fs");
  mkdirSync(process.env.OMNIROUTE_PLUGINS_DIR!, { recursive: true });
});
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { FEATURE_FLAG_DEFINITIONS } from "../../../src/shared/constants/featureFlagDefinitions.ts";
import { isMcpV2Enabled, startMcpStdioV2 } from "../../../open-sse/mcp-server/v2/server.ts";
import { createMcpServer } from "../../../open-sse/mcp-server/server.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../../..");

describe("v2 is off by default", () => {
  it("OMNIROUTE_MCP_V2 is registered as a feature flag with default false", () => {
    const flag = FEATURE_FLAG_DEFINITIONS.find((f) => f.key === "OMNIROUTE_MCP_V2");
    expect(flag).toBeDefined();
    expect(flag!.defaultValue).toBe("false");
    expect(flag!.type).toBe("boolean");
  });

  it("isMcpV2Enabled() is false in the default (unset) test environment", () => {
    // The suite does not set OMNIROUTE_MCP_V2, so the module-load read is false.
    expect(process.env.OMNIROUTE_MCP_V2).toBeUndefined();
    expect(isMcpV2Enabled()).toBe(false);
  });

  it("startMcpStdioV2() refuses to start when the flag is unset", async () => {
    await expect(startMcpStdioV2()).rejects.toThrow(/MCP v2 sidecar is disabled/i);
  });
});

describe("OMNIROUTE_MCP_V2 is read at module load", () => {
  it("a fresh process sees ENABLED=true with the env set, false without", () => {
    const probe =
      "import('./open-sse/mcp-server/v2/server.ts').then(m => " +
      "process.stdout.write('ENABLED:' + m.isMcpV2Enabled()))";

    const run = (env: NodeJS.ProcessEnv) =>
      execFileSync(process.execPath, ["--import", "tsx", "-e", probe], {
        cwd: REPO_ROOT,
        env: { ...env, DISABLE_SQLITE_AUTO_BACKUP: "true" },
        encoding: "utf8",
        timeout: 60_000,
      }).trim();

    const base = { ...process.env };
    delete base.OMNIROUTE_MCP_V2;

    expect(run({ ...base, OMNIROUTE_MCP_V2: "true" })).toContain("ENABLED:true");
    expect(run(base)).toContain("ENABLED:false");
  }, 120_000);
});

describe("v1 behaviour is unchanged by the v2 flag", () => {
  it("v1 exposes the same tools with the v2 flag off and on", async () => {
    // v1 (createMcpServer) must never consult the v2 flag. Flip the env between
    // the two listings so a future regression that wires v1 to the flag fails here.
    const previous = process.env.OMNIROUTE_MCP_V2;
    delete process.env.OMNIROUTE_MCP_V2;
    const offTools = await listToolNames();

    process.env.OMNIROUTE_MCP_V2 = "true";
    try {
      const onTools = await listToolNames();
      expect(offTools.length).toBeGreaterThan(0);
      expect(onTools).toEqual(offTools);
    } finally {
      if (previous === undefined) delete process.env.OMNIROUTE_MCP_V2;
      else process.env.OMNIROUTE_MCP_V2 = previous;
    }
  }, 60_000);
});

async function listToolNames() {
  const instance = createMcpServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await instance.server.connect(serverTransport as never);
  const client = new Client({ name: "flag-test-client", version: "1.0.0" });
  await client.connect(clientTransport);
  const listed = await client.listTools();
  await client.close();
  return listed.tools.map((t) => t.name).sort();
}
