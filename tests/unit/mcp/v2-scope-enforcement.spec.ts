/**
 * The v2 scope gate must actually DENY, not merely exist.
 *
 * The prior commit (8285a029d, unpushed) added the check but nothing exercised it,
 * so "scope enforcement" in the changelog was a claim, not a behavior. These tests
 * drive a real MCP client through InMemoryTransport and assert on the observable
 * outcome, which is the only thing a caller can see.
 *
 * Enforcement is opt-in via OMNIROUTE_MCP_ENFORCE_SCOPES, matching v1. The
 * enforcement SWITCH is resolved per call through v1's DB-aware resolver
 * (isMcpScopeEnforcementEnabled), so these tests keep the env set for the whole
 * call — not just the import — and one case flips the DB override to prove v2
 * tracks the same switch v1 does (Diego's "never looser than v1" constraint).
 * The allowed-scopes env grant is still read at module load, so each case imports
 * a cache-busted copy for its scope grant.
 */

import { describe, it, expect, afterAll, afterEach, vi } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

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
const { resetDbInstance } = await import("../../../src/lib/db/core.ts");

// Authorization probes must never dispatch into a running local dashboard.
vi.mock("../../../open-sse/mcp-server/internalFetch.ts", () => ({
  omniRouteFetch: vi.fn(async () => ({ combos: [], success: true })),
}));

const V2_ENTRY = "../../../open-sse/mcp-server/v2/server.ts";

type V2Module = typeof import("../../../open-sse/mcp-server/v2/server.ts");
type ToolResult = {
  isError?: boolean;
  content?: Array<{ type: string; text: string }>;
};

/** Set the given env for the whole test, import a fresh v2 for its scope grant. */
async function loadV2(env: Record<string, string>): Promise<V2Module> {
  for (const [k, v] of Object.entries(env)) {
    process.env[k] = v;
  }
  // Query string defeats vitest's module cache so each case re-reads the
  // module-load allowed-scopes grant.
  const query = `?scopeenv=${Object.entries(env)
    .map(([k, v]) => `${k}=${v}`)
    .join("&")}`;
  return (await import(`${V2_ENTRY}${query}`)) as V2Module;
}

const ENV_KEYS = ["OMNIROUTE_MCP_ENFORCE_SCOPES", "OMNIROUTE_MCP_SCOPES"];
const savedEnv: Record<string, string | undefined> = {};

afterEach(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
});

afterAll(() => resetDbInstance());

// Snapshot once so afterEach can restore.
for (const k of ENV_KEYS) savedEnv[k] = process.env[k];

/** Connect a real client to a real v2 server. */
async function connect(mod: V2Module): Promise<Client> {
  const v2 = mod.createMcpServerV2();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await v2.server.connect(serverTransport);
  const client = new Client({ name: "scope-test-client", version: "1.0.0" });
  await client.connect(clientTransport);
  return client;
}

async function callTool(
  client: Client,
  name: string,
  args: Record<string, unknown>,
  options?: { _meta?: Record<string, unknown> }
): Promise<{ isError: boolean; text: string }> {
  const result = (await client.callTool(
    { name, arguments: args, ...(options?._meta ? { _meta: options._meta } : {}) },
    undefined,
    undefined
  )) as ToolResult;
  return {
    isError: result.isError === true,
    text: result.content?.[0]?.text ?? "",
  };
}

describe("v2 scope enforcement — deny path", () => {
  it("denies a write tool when enforcement is on and no scopes are granted", async () => {
    const client = await connect(
      await loadV2({ OMNIROUTE_MCP_ENFORCE_SCOPES: "true", OMNIROUTE_MCP_SCOPES: "" })
    );

    // switch_combo requires write:combos; nothing was granted.
    const { isError, text } = await callTool(client, "omniroute_switch_combo", {
      comboId: "x",
      active: true,
    });

    expect(isError).toBe(true);
    expect(text).toContain("Insufficient MCP scopes");
    expect(text).toContain("write:combos");
    // S-04 (#15159): the refusal must NOT echo caller-influenced identity.
    expect(text).not.toMatch(/Caller=/);
    expect(text).not.toMatch(/source=/);
  }, 60_000);

  it("denies when the caller claims the wrong scope", async () => {
    const client = await connect(
      await loadV2({
        OMNIROUTE_MCP_ENFORCE_SCOPES: "true",
        OMNIROUTE_MCP_SCOPES: "read:health,read:combos",
      })
    );

    const { isError, text } = await callTool(client, "omniroute_create_combo", {
      name: "x",
      models: [{ provider: "openai", model: "gpt-4o" }],
    });

    expect(isError).toBe(true);
    expect(text).toContain("write:combos");
  }, 60_000);

  it("denies scopes claimed in client-supplied _meta (never a scope source)", async () => {
    // Diego's constraint: with no handshake, caller scopes must come from the
    // authenticated request, never from client-supplied _meta. A caller that
    // grants itself write:combos in _meta must still be refused.
    const client = await connect(
      await loadV2({ OMNIROUTE_MCP_ENFORCE_SCOPES: "true", OMNIROUTE_MCP_SCOPES: "" })
    );

    const { isError, text } = await callTool(
      client,
      "omniroute_switch_combo",
      { comboId: "x", active: true },
      { _meta: { scopes: ["write:combos"] } }
    );

    expect(isError).toBe(true);
    expect(text).toContain("Insufficient MCP scopes");
  }, 60_000);

  it("does not echo caller-influenced identity on the denial surface", async () => {
    // v1 removed Caller=/source= in S-04 (#15159) because callerId derives from
    // caller-supplied text. v2 must not reintroduce the reflection.
    const client = await connect(
      await loadV2({ OMNIROUTE_MCP_ENFORCE_SCOPES: "true", OMNIROUTE_MCP_SCOPES: "" })
    );

    const { isError, text } = await callTool(client, "omniroute_switch_combo", {
      comboId: "x",
      active: true,
    });

    expect(isError).toBe(true);
    expect(text).not.toMatch(/Caller=/);
    expect(text).not.toMatch(/source=/);
  }, 60_000);

  it("does NOT deny when the required scope IS granted", async () => {
    // Grants read:combos so list_combos passes the gate. The handler itself may
    // still fail on network — that is the point: the gate let it through, which
    // is what distinguishes "authorized then failed" from "refused before dispatch".
    const client = await connect(
      await loadV2({
        OMNIROUTE_MCP_ENFORCE_SCOPES: "true",
        OMNIROUTE_MCP_SCOPES: "read:combos",
      })
    );

    const { text } = await callTool(client, "omniroute_list_combos", {});

    expect(text).not.toContain("Insufficient MCP scopes");
  }, 60_000);
});

describe("v2 scope enforcement — fail-open parity with v1", () => {
  it("permits everything when enforcement is off (documents the default)", async () => {
    const client = await connect(await loadV2({ OMNIROUTE_MCP_ENFORCE_SCOPES: "false" }));

    const { text } = await callTool(client, "omniroute_switch_combo", {
      comboId: "x",
      active: true,
    });

    expect(text).not.toContain("Insufficient MCP scopes");
  }, 60_000);

  it("denies when the enforcement switch is enabled via the DB override, not the env", async () => {
    // Diego's constraint: v2 must never be reachable with enforcement LOOSER than
    // v1's. v1 resolves the switch through the DB-backed dashboard toggle, so v2
    // must read the same resolver — an env-only read would let v2 stay open while
    // v1 enforces. Here the env is OFF but the DB override is ON: v2 must deny.
    const { setFeatureFlagOverride, clearFeatureFlagOverrideCache } =
      await import("../../../src/lib/db/featureFlags.ts");

    // Env off; a stale module-load read would leave the gate open.
    const client = await connect(
      await loadV2({ OMNIROUTE_MCP_ENFORCE_SCOPES: "false", OMNIROUTE_MCP_SCOPES: "" })
    );

    try {
      setFeatureFlagOverride("OMNIROUTE_MCP_ENFORCE_SCOPES", "true");
      clearFeatureFlagOverrideCache("OMNIROUTE_MCP_ENFORCE_SCOPES");

      const { isError, text } = await callTool(client, "omniroute_switch_combo", {
        comboId: "x",
        active: true,
      });

      expect(isError).toBe(true);
      expect(text).toContain("Insufficient MCP scopes");
    } finally {
      const { removeFeatureFlagOverride, clearFeatureFlagOverrideCache: clear } =
        await import("../../../src/lib/db/featureFlags.ts");
      removeFeatureFlagOverride("OMNIROUTE_MCP_ENFORCE_SCOPES");
      clear("OMNIROUTE_MCP_ENFORCE_SCOPES");
    }
  }, 60_000);
});

describe("v2 tools/list advertises scopes", () => {
  it("each tool definition carries its scopes array", async () => {
    const v2 = (await loadV2({ OMNIROUTE_MCP_ENFORCE_SCOPES: "true" })).createMcpServerV2();
    const listed = v2.handleListTools("public") as {
      resultType?: string;
      tools?: Array<{ name: string; scopes?: string[] }>;
    };

    expect(listed.resultType).toBe("complete");
    expect(listed.tools?.length ?? 0).toBeGreaterThan(0);
    for (const tool of listed.tools ?? []) {
      expect(Array.isArray(tool.scopes), `${tool.name} missing scopes`).toBe(true);
      expect((tool.scopes ?? []).length, `${tool.name} has empty scopes`).toBeGreaterThan(0);
    }
  });
});
