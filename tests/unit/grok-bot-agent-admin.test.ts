import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { manageGrokBotAgent, withGrokBotAgentLock } from "../../src/lib/grokBotAgentAdmin.ts";

function connection(agent?: {
  agentId: string;
  rowId: string | null;
  name?: string;
  description?: string;
}) {
  return {
    id: "conn-1",
    provider: "grok-bot",
    accessToken: "at",
    providerSpecificData: agent ? { keep: true, grokBotAgent: agent } : { keep: true },
  };
}

describe("grok bot agent admin", () => {
  it("returns an empty binding when nothing is saved", async () => {
    const result = await manageGrokBotAgent({
      action: "get",
      connection: connection(),
      rpc: async () => {
        throw new Error("get must not call Cursor");
      },
      save: async () => {
        throw new Error("get must not write");
      },
    });
    assert.deepEqual(result, { agentId: null, rowId: null });
  });

  it("returns the saved agent without calling Cursor", async () => {
    const calls: string[] = [];
    const result = await manageGrokBotAgent({
      action: "get",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async (method) => {
        calls.push(method);
        return { shards: [] };
      },
      save: async () => {
        throw new Error("get must not write");
      },
    });
    assert.deepEqual(result, {
      agentId: "agent-1",
      rowId: "row-1",
      name: "omni-grok-bot",
      description: "OmniRoute durable agent.",
      memory: [],
      skills: [],
      routines: [],
    });
    assert.deepEqual(calls, ["ListGrokBotMemoryShards", "ListGrokBotAgentSkills", "ListGrokBotAgentAutomations"]);
  });

  it("create returns the saved agent without calling Cursor", async () => {
    const result = await manageGrokBotAgent({
      action: "create",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async () => {
        throw new Error("create must not call Cursor");
      },
      save: async () => {
        throw new Error("create must not rewrite an existing agent");
      },
    });
    assert.deepEqual(result, {
      agentId: "agent-1",
      rowId: "row-1",
      name: "omni-grok-bot",
      description: "OmniRoute durable agent.",
    });
  });

  it("creates once and saves the agent beside existing data", async () => {
    let saved: Record<string, unknown> | null = null;
    const result = await manageGrokBotAgent({
      action: "create",
      connection: connection(),
      rpc: async (method, payload) => {
        assert.equal(method, "CreateGrokBotTemporalAgent");
        return { agent: { id: "row-new", legacyAgentId: payload.agentId, harness: "temporal" } };
      },
      save: async (data) => {
        saved = data;
      },
    });
    assert.equal(result.rowId, "row-new");
    assert.equal(saved?.keep, true);
    assert.equal((saved?.grokBotAgent as { rowId: string }).rowId, "row-new");
  });

  it("keeps the saved agent when recreate cannot create a replacement", async () => {
    let saved = false;
    await assert.rejects(() =>
      manageGrokBotAgent({
        action: "recreate",
        connection: connection({ agentId: "old", rowId: "row-old" }),
        rpc: async () => {
          throw new Error("create failed");
        },
        save: async () => {
          saved = true;
        },
      })
    );
    assert.equal(saved, false);
  });

  it("does not delete the old agent when the new agent has no row id", async () => {
    const methods: string[] = [];
    const result = await manageGrokBotAgent({
      action: "recreate",
      connection: connection({ agentId: "old", rowId: "row-old" }),
      rpc: async (method, payload) => {
        methods.push(method);
        return { agent: { legacyAgentId: payload.agentId, harness: "temporal" } };
      },
      save: async () => {},
    });
    assert.equal(result.rowId, null);
    assert.deepEqual(methods, ["CreateGrokBotTemporalAgent"]);
  });

  it("recreate saves the new agent before deleting the old one", async () => {
    const methods: string[] = [];
    await manageGrokBotAgent({
      action: "recreate",
      connection: connection({ agentId: "old", rowId: "row-old" }),
      rpc: async (method, payload) => {
        methods.push(method);
        if (method === "DeleteGrokBotAgent") assert.deepEqual(payload, { id: "row-old" });
        return { agent: { id: "row-new", legacyAgentId: payload.agentId, harness: "temporal" } };
      },
      save: async () => {},
    });
    assert.deepEqual(methods, ["CreateGrokBotTemporalAgent", "DeleteGrokBotAgent"]);
  });

  it("unbind removes only the local binding", async () => {
    let saved: Record<string, unknown> | null = null;
    const result = await manageGrokBotAgent({
      action: "unbind",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async () => {
        throw new Error("unbind must not call Cursor");
      },
      save: async (data) => {
        saved = data;
      },
    });
    assert.equal(result.agentId, null);
    assert.equal("grokBotAgent" in (saved ?? {}), false);
    assert.equal(saved?.keep, true);
  });

  it("delete without a saved agent only clears local data", async () => {
    let saved: Record<string, unknown> | null = null;
    const result = await manageGrokBotAgent({
      action: "delete",
      connection: connection(),
      rpc: async () => {
        throw new Error("delete must not call Cursor");
      },
      save: async (data) => {
        saved = data;
      },
    });
    assert.deepEqual(result, { agentId: null, rowId: null });
    assert.equal(saved?.keep, true);
  });

  it("delete removes the remote agent and local binding", async () => {
    const methods: string[] = [];
    await manageGrokBotAgent({
      action: "delete",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async (method, payload) => {
        methods.push(method);
        assert.deepEqual(payload, { id: "row-1" });
        return {};
      },
      save: async (data) => {
        assert.equal("grokBotAgent" in data, false);
      },
    });
    assert.deepEqual(methods, ["DeleteGrokBotAgent"]);
  });

  it("runs the same connection one at a time and keeps a concurrent field", async () => {
    let stored: Record<string, unknown> = { keep: true, other: "first" };
    let releaseFirstSave: () => void = () => {};
    const firstSave = new Promise<void>((resolve) => {
      releaseFirstSave = resolve;
    });
    const first = withGrokBotAgentLock("conn-1", async () => {
      const seen = { ...stored };
      await firstSave;
      stored = { ...seen, from: "first" };
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const second = withGrokBotAgentLock("conn-1", async () => {
      stored = { ...stored, other: "second" };
    });
    releaseFirstSave();
    await first;
    await second;
    assert.equal(stored.other, "second");
    assert.equal(stored.from, "first");
  });

  it("does not let one connection failure block another connection", async () => {
    const failed = withGrokBotAgentLock("conn-a", async () => {
      throw new Error("conn-a failed");
    });
    const other = withGrokBotAgentLock("conn-b", async () => "ok");
    await assert.rejects(failed, /conn-a failed/);
    assert.equal(await other, "ok");
  });

  it("saves the request profile inside grokBotAgent", async () => {
    let saved: Record<string, unknown> | null = null;
    const result = await manageGrokBotAgent({
      action: "create",
      connection: connection(),
      profile: { name: "Research", description: "Collect sources only." },
      rpc: async (method, payload) => {
        assert.equal(method, "CreateGrokBotTemporalAgent");
        assert.equal(payload.name, "Research");
        assert.equal(payload.description, "Collect sources only.");
        return { agent: { id: "row-new", legacyAgentId: payload.agentId, harness: "temporal" } };
      },
      save: async (data) => {
        saved = data;
      },
    });
    assert.equal(result.name, "Research");
    assert.equal(result.description, "Collect sources only.");
    const stored = saved?.grokBotAgent as { name: string; description: string };
    assert.equal(stored.name, "Research");
    assert.equal(stored.description, "Collect sources only.");
    assert.equal(saved?.keep, true);
  });

  it("recreate keeps saved fields and replaces only the supplied field", async () => {
    let saved: Record<string, unknown> | null = null;
    const result = await manageGrokBotAgent({
      action: "recreate",
      connection: connection({
        agentId: "agent-old",
        rowId: "row-old",
        name: "Research",
        description: "Collect sources only.",
      }),
      profile: { description: "Collect papers only." },
      rpc: async (method, payload) => {
        if (method === "CreateGrokBotTemporalAgent") {
          assert.equal(payload.name, "Research");
          assert.equal(payload.description, "Collect papers only.");
          return { agent: { id: "row-new", legacyAgentId: payload.agentId, harness: "temporal" } };
        }
        return {};
      },
      save: async (data) => {
        saved = data;
      },
    });
    const stored = saved?.grokBotAgent as { name: string; description: string };
    assert.equal(result.name, "Research");
    assert.equal(stored.name, "Research");
    assert.equal(stored.description, "Collect papers only.");
  });

  it("uses defaults only for fields missing from both request and saved agent", async () => {
    let saved: Record<string, unknown> | null = null;
    const result = await manageGrokBotAgent({
      action: "create",
      connection: connection(),
      profile: { name: "   ", description: 12 },
      rpc: async (_method, payload) => {
        assert.equal(payload.name, "omni-grok-bot");
        assert.equal(payload.description, "OmniRoute durable agent.");
        return { agent: { id: "row-new", legacyAgentId: payload.agentId, harness: "temporal" } };
      },
      save: async (data) => {
        saved = data;
      },
    });
    const stored = saved?.grokBotAgent as { name: string; description: string };
    assert.equal(result.name, "omni-grok-bot");
    assert.equal(stored.description, "OmniRoute durable agent.");
  });

  it("does not save when the created agent is invalid", async () => {
    let saved = false;
    await assert.rejects(() =>
      manageGrokBotAgent({
        action: "recreate",
        connection: connection({
          agentId: "agent-old",
          rowId: "row-old",
          name: "Research",
          description: "Collect sources only.",
        }),
        rpc: async () => ({ agent: { id: "row-new", legacyAgentId: "wrong", harness: "temporal" } }),
        save: async () => {
          saved = true;
        },
      })
    );
    assert.equal(saved, false);
  });

  it("does not delete the old agent when saving the new profile fails", async () => {
    const methods: string[] = [];
    await assert.rejects(() =>
      manageGrokBotAgent({
        action: "recreate",
        connection: connection({ agentId: "agent-old", rowId: "row-old" }),
        rpc: async (method, payload) => {
          methods.push(method);
          return { agent: { id: "row-new", legacyAgentId: payload.agentId, harness: "temporal" } };
        },
        save: async () => {
          throw new Error("save failed");
        },
      })
    );
    assert.deepEqual(methods, ["CreateGrokBotTemporalAgent"]);
  });

  it("create with a saved agent does not send or save a replacement profile", async () => {
    let saved = false;
    const result = await manageGrokBotAgent({
      action: "create",
      connection: connection({
        agentId: "agent-1",
        rowId: "row-1",
        name: "Research",
        description: "Collect sources only.",
      }),
      profile: { name: "Changed", description: "Changed" },
      rpc: async () => {
        throw new Error("create must not call Cursor");
      },
      save: async () => {
        saved = true;
      },
    });
    assert.equal(saved, false);
    assert.equal(result.name, "Research");
  });

  it("reads memory shards without writing them", async () => {
    const methods: string[] = [];
    const result = await manageGrokBotAgent({
      action: "get",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async (method, payload) => {
        methods.push(method);
        if (method === "ListGrokBotMemoryShards") {
          assert.deepEqual(payload, {});
          return {
            shards: [
              { agentId: "agent-1", folder: { profile: "Use short answers." } },
              { agentId: "other", folder: { profile: "Ignore." } },
              null,
              { agentId: "agent-1", folder: { profile: 1 } },
            ],
          };
        }
        return { skills: [] };
      },
      save: async () => {
        throw new Error("get must not write");
      },
    });
    assert.deepEqual(methods, ["ListGrokBotMemoryShards", "ListGrokBotAgentSkills", "ListGrokBotAgentAutomations"]);
    assert.deepEqual(result.memory, [{ agentId: "agent-1", profile: "Use short answers." }]);
  });

  it("treats an empty memory response as no memory", async () => {
    for (const body of [null, undefined, {}, { shards: null }, { shards: {} }]) {
      const result = await manageGrokBotAgent({
        action: "get",
        connection: connection({ agentId: "agent-1", rowId: "row-1" }),
        rpc: async () => body,
        save: async () => {
          throw new Error("get must not write");
        },
      });
      assert.deepEqual(result.memory, []);
    }
  });

  it("does not read or store memory on write actions", async () => {
    const methods: string[] = [];
    let saved: Record<string, unknown> | null = null;
    await manageGrokBotAgent({
      action: "create",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async (method) => {
        methods.push(method);
        return {};
      },
      save: async (data) => {
        saved = data;
      },
    });
    assert.deepEqual(methods, []);
    assert.equal("memory" in ((saved?.grokBotAgent as object) ?? {}), false);
    assert.equal("skills" in ((saved?.grokBotAgent as object) ?? {}), false);
  });

  it("treats an empty skill response as no skills", async () => {
    for (const body of [null, {}, { skills: null }, { skills: {} }]) {
      const result = await manageGrokBotAgent({
        action: "get",
        connection: connection({ agentId: "agent-1", rowId: "row-1" }),
        rpc: async (method) => (method === "ListGrokBotMemoryShards" ? { shards: [] } : body),
        save: async () => {
          throw new Error("get must not write");
        },
      });
      assert.deepEqual(result.skills, []);
    }
  });

  it("reads routines without writing them", async () => {
    const methods: string[] = [];
    const result = await manageGrokBotAgent({
      action: "get",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async (method, payload) => {
        methods.push(`${method}:${JSON.stringify(payload)}`);
        if (method === "ListGrokBotAgentAutomations") {
          return {
            automations: [
              { automationId: "auto-1", recordJson: '{"name":"Daily"}' },
              null,
              { automationId: 1, recordJson: "{}" },
            ],
          };
        }
        return method === "ListGrokBotMemoryShards" ? { shards: [] } : { skills: [] };
      },
      save: async () => {
        throw new Error("get must not write");
      },
    });
    assert.equal(methods.includes('ListGrokBotAgentAutomations:{"agentId":"agent-1","timeZone":"UTC"}'), true);
    assert.deepEqual(result.routines, [{ id: "auto-1", recordJson: '{"name":"Daily"}' }]);
  });

  it("drops a skill that misses one required field", async () => {
    const result = await manageGrokBotAgent({
      action: "get",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async (method) =>
        method === "ListGrokBotMemoryShards"
          ? { shards: [] }
          : { skills: [{ id: "skill-1", name: "Research", description: "Look up", body: "steps" }] },
      save: async () => {
        throw new Error("get must not write");
      },
    });
    assert.deepEqual(result.skills, []);
  });

  it("reads skills without writing them", async () => {
    const methods: string[] = [];
    const result = await manageGrokBotAgent({
      action: "get",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      rpc: async (method, payload) => {
        methods.push(`${method}:${JSON.stringify(payload)}`);
        if (method === "ListGrokBotMemoryShards") return { shards: [] };
        return {
          skills: [
            { id: "skill-1", name: "Research", description: "Look up", body: "steps", source: "user" },
            null,
            { id: 1, name: "Bad" },
          ],
        };
      },
      save: async () => {
        throw new Error("get must not write");
      },
    });
    assert.equal(methods.includes('ListGrokBotAgentSkills:{"agentId":"agent-1"}'), true);
    assert.deepEqual(result.skills, [
      { id: "skill-1", name: "Research", description: "Look up", body: "steps", source: "user" },
    ]);
  });

  it("writes memory for the saved agent", async () => {
    const calls: string[] = [];
    const result = await manageGrokBotAgent({
      action: "put-memory",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      profile: "Use short answers.",
      rpc: async (method, payload) => {
        calls.push(`${method}:${JSON.stringify(payload)}`);
        return { version: 3 };
      },
      save: async () => {
        throw new Error("memory write must not save the connection");
      },
    });
    assert.deepEqual(calls, [
      'PutGrokBotMemoryShard:{"agentId":"agent-1","folder":{"profile":"Use short answers."}}',
    ]);
    assert.equal(result.version, 3);
  });

  it("rejects memory writes without a saved agent or text", async () => {
    const calls: string[] = [];
    for (const input of [
      { connection: connection(null), profile: "Use short answers." },
      { connection: connection({ agentId: "agent-1", rowId: "row-1" }), profile: " " },
    ]) {
      await assert.rejects(() =>
        manageGrokBotAgent({
          action: "put-memory",
          connection: input.connection,
          profile: input.profile,
          rpc: async (method) => {
            calls.push(method);
            return {};
          },
          save: async () => {
            throw new Error("save");
          },
        })
      );
    }
    assert.deepEqual(calls, []);
  });

  it("returns null when memory version is not a number", async () => {
    const result = await manageGrokBotAgent({
      action: "put-memory",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      profile: "Use short answers.",
      rpc: async () => ({ version: "3" }),
      save: async () => {
        throw new Error("save");
      },
    });
    assert.equal(result.version, null);
  });

  it("returns null for an empty memory write response", async () => {
    for (const body of [null, undefined, {}]) {
      const result = await manageGrokBotAgent({
        action: "put-memory",
        connection: connection({ agentId: "agent-1", rowId: "row-1" }),
        profile: "Use short answers.",
        rpc: async () => body,
        save: async () => {
          throw new Error("save");
        },
      });
      assert.equal(result.version, null);
    }
  });

  it("returns null for non-finite memory versions", async () => {
    for (const version of [Number.NaN, Number.POSITIVE_INFINITY, -1, 1.5, 4294967296]) {
      const result = await manageGrokBotAgent({
        action: "put-memory",
        connection: connection({ agentId: "agent-1", rowId: "row-1" }),
        profile: "Use short answers.",
        rpc: async () => ({ version }),
        save: async () => {
          throw new Error("save");
        },
      });
      assert.equal(result.version, null);
    }
  });

  it("normalizes negative zero memory versions", async () => {
    const result = await manageGrokBotAgent({
      action: "put-memory",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      profile: "Use short answers.",
      rpc: async () => ({ version: -0 }),
      save: async () => {
        throw new Error("save");
      },
    });
    assert.equal(Object.is(result.version, 0), true);
  });

  it("adds a skill without saving the connection", async () => {
    const calls: string[] = [];
    const result = await manageGrokBotAgent({
      action: "add-skill",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      skill: { name: "Research", description: "Look up", content: "steps" },
      rpc: async (method, payload) => {
        calls.push(`${method}:${JSON.stringify(payload)}`);
        return {};
      },
      save: async () => {
        throw new Error("save");
      },
    });
    assert.deepEqual(calls, [
      'AddGrokBotAgentSkill:{"agentId":"agent-1","name":"Research","description":"Look up","content":"steps"}',
    ]);
    assert.deepEqual(result, {
      agentId: "agent-1",
      rowId: "row-1",
      name: "omni-grok-bot",
      description: "OmniRoute durable agent.",
    });
  });

  it("rejects a skill without a saved agent or required fields", async () => {
    const calls: string[] = [];
    const rpc = async (method: string) => {
      calls.push(method);
      return {};
    };
    await assert.rejects(
      () =>
        manageGrokBotAgent({
          action: "add-skill",
          connection: connection({}),
          skill: { name: "Research", description: "Look up", content: "steps" },
          rpc,
          save: async () => {},
        }),
      /No saved Grok Bot agent/
    );
    for (const skill of [
      { name: " ", description: "Look up", content: "steps" },
      { name: "Research", description: " ", content: "steps" },
      { name: "Research", description: "Look up", content: " " },
    ]) {
      await assert.rejects(
        () =>
          manageGrokBotAgent({
            action: "add-skill",
            connection: connection({ agentId: "agent-1", rowId: "row-1" }),
            skill,
            rpc,
            save: async () => {},
          }),
        /Skill fields are required/
      );
    }
    assert.deepEqual(calls, []);
  });

  it("updates a skill without saving the connection", async () => {
    const calls: string[] = [];
    const result = await manageGrokBotAgent({
      action: "update-skill",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      skill: { name: "Research", description: "Look up", content: "steps" },
      rpc: async (method, payload) => {
        calls.push(`${method}:${JSON.stringify(payload)}`);
        return {};
      },
      save: async () => {
        throw new Error("save");
      },
    });
    assert.deepEqual(calls, [
      'UpdateGrokBotAgentSkill:{"agentId":"agent-1","name":"Research","content":"steps","description":"Look up"}',
    ]);
    assert.deepEqual(result, {
      agentId: "agent-1",
      rowId: "row-1",
      name: "omni-grok-bot",
      description: "OmniRoute durable agent.",
    });
  });

  it("rejects a skill update without a saved agent or required fields", async () => {
    const calls: string[] = [];
    const rpc = async (method: string) => {
      calls.push(method);
      return {};
    };
    await assert.rejects(
      () =>
        manageGrokBotAgent({
          action: "update-skill",
          connection: connection({}),
          skill: { name: "Research", content: "steps" },
          rpc,
          save: async () => {},
        }),
      /No saved Grok Bot agent/
    );
    for (const skill of [
      { name: " ", content: "steps" },
      { name: "Research", content: " " },
    ]) {
      await assert.rejects(
        () =>
          manageGrokBotAgent({
            action: "update-skill",
            connection: connection({ agentId: "agent-1", rowId: "row-1" }),
            skill,
            rpc,
            save: async () => {},
          }),
        /Skill fields are required/
      );
    }
    const result = await manageGrokBotAgent({
      action: "update-skill",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      skill: { name: "Research", description: "", content: "steps" },
      rpc: async (method, payload) => {
        calls.push(`${method}:${JSON.stringify(payload)}`);
        return {};
      },
      save: async () => {},
    });
    assert.equal(result.agentId, "agent-1");
    assert.deepEqual(calls, [
      'UpdateGrokBotAgentSkill:{"agentId":"agent-1","name":"Research","content":"steps","description":""}',
    ]);
    const omitted = await manageGrokBotAgent({
      action: "update-skill",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      skill: { name: "Research", content: "steps" },
      rpc: async (method, payload) => {
        calls.push(`${method}:${JSON.stringify(payload)}`);
        return {};
      },
      save: async () => {},
    });
    assert.equal(omitted.agentId, "agent-1");
    assert.deepEqual(calls, [
      'UpdateGrokBotAgentSkill:{"agentId":"agent-1","name":"Research","content":"steps","description":""}',
      'UpdateGrokBotAgentSkill:{"agentId":"agent-1","name":"Research","content":"steps"}',
    ]);
  });

  it("removes a skill without saving the connection", async () => {
    const calls: string[] = [];
    const result = await manageGrokBotAgent({
      action: "remove-skill",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      skill: { name: "Research" },
      rpc: async (method, payload) => {
        calls.push(`${method}:${JSON.stringify(payload)}`);
        return {};
      },
      save: async () => {
        throw new Error("save");
      },
    });
    assert.deepEqual(calls, [
      'RemoveGrokBotAgentSkill:{"agentId":"agent-1","name":"Research"}',
    ]);
    assert.deepEqual(result, {
      agentId: "agent-1",
      rowId: "row-1",
      name: "omni-grok-bot",
      description: "OmniRoute durable agent.",
    });
  });

  it("rejects a skill removal without a saved agent or name", async () => {
    const calls: string[] = [];
    const rpc = async (method: string) => {
      calls.push(method);
      return {};
    };
    await assert.rejects(
      () =>
        manageGrokBotAgent({
          action: "remove-skill",
          connection: connection({}),
          skill: { name: "Research" },
          rpc,
          save: async () => {},
        }),
      /No saved Grok Bot agent/
    );
    await assert.rejects(
      () =>
        manageGrokBotAgent({
          action: "remove-skill",
          connection: connection({ agentId: "agent-1", rowId: "row-1" }),
          skill: { name: " " },
          rpc,
          save: async () => {},
        }),
      /Skill fields are required/
    );
    assert.deepEqual(calls, []);
  });

  it("sets a routine without saving the connection", async () => {
    const calls: string[] = [];
    const result = await manageGrokBotAgent({
      action: "set-routine",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      routine: { id: "routine-1", enabled: false },
      rpc: async (method, payload) => {
        calls.push(`${method}:${JSON.stringify(payload)}`);
        return {};
      },
      save: async () => {
        throw new Error("save");
      },
    });
    assert.deepEqual(calls, [
      'SetGrokBotAgentAutomationEnabled:{"agentId":"agent-1","automationId":"routine-1","isEnabled":false,"timeZone":"UTC"}',
    ]);
    assert.deepEqual(result, {
      agentId: "agent-1",
      rowId: "row-1",
      name: "omni-grok-bot",
      description: "OmniRoute durable agent.",
    });
  });

  it("rejects a routine change without a saved agent or required fields", async () => {
    const calls: string[] = [];
    const rpc = async (method: string) => {
      calls.push(method);
      return {};
    };
    await assert.rejects(
      () =>
        manageGrokBotAgent({
          action: "set-routine",
          connection: connection({}),
          routine: { id: "routine-1", enabled: true },
          rpc,
          save: async () => {},
        }),
      /No saved Grok Bot agent/
    );
    for (const routine of [
      { id: " ", enabled: true },
      { id: "routine-1", enabled: "true" },
      { id: "routine-1" },
      {},
    ]) {
      await assert.rejects(
        () =>
          manageGrokBotAgent({
            action: "set-routine",
            connection: connection({ agentId: "agent-1", rowId: "row-1" }),
            routine,
            rpc,
            save: async () => {},
          }),
        /Routine fields are required/
      );
    }
    assert.deepEqual(calls, []);
  });

  it("removes a routine without saving the connection", async () => {
    const calls: string[] = [];
    const result = await manageGrokBotAgent({
      action: "remove-routine",
      connection: connection({ agentId: "agent-1", rowId: "row-1" }),
      routine: { id: "routine-1" },
      rpc: async (method, payload) => {
        calls.push(`${method}:${JSON.stringify(payload)}`);
        return {};
      },
      save: async () => {
        throw new Error("save");
      },
    });
    assert.deepEqual(calls, [
      'DeleteGrokBotAgentAutomation:{"agentId":"agent-1","automationId":"routine-1","timeZone":"UTC"}',
    ]);
    assert.deepEqual(result, {
      agentId: "agent-1",
      rowId: "row-1",
      name: "omni-grok-bot",
      description: "OmniRoute durable agent.",
    });
  });

  it("rejects a routine removal without a saved agent or id", async () => {
    const calls: string[] = [];
    const rpc = async (method: string) => {
      calls.push(method);
      return {};
    };
    await assert.rejects(
      () =>
        manageGrokBotAgent({
          action: "remove-routine",
          connection: connection({}),
          routine: { id: "routine-1" },
          rpc,
          save: async () => {},
        }),
      /No saved Grok Bot agent/
    );
    await assert.rejects(
      () =>
        manageGrokBotAgent({
          action: "remove-routine",
          connection: connection({ agentId: "agent-1", rowId: "row-1" }),
          routine: { id: " " },
          rpc,
          save: async () => {},
        }),
      /Routine fields are required/
    );
    assert.deepEqual(calls, []);
  });
});
