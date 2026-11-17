import assert from "node:assert/strict";
import { it } from "node:test";
import { runGrokBotAgentAction } from "../../src/lib/grokBotAgentAdmin.ts";

it("passes the POST profile to the management function", async () => {
  let seen: { action?: string; profile?: { name?: string; description?: string } } | null = null;
  const result = await runGrokBotAgentAction({
    action: "recreate",
    profile: { name: "Research", description: "Collect sources only." },
    connection: { id: "conn-1", provider: "grok-bot", accessToken: "at" },
    manage: async (input) => {
      seen = input;
      return {
        agentId: "agent-1",
        rowId: "row-1",
        name: "Research",
        description: "Collect sources only.",
      };
    },
  });
  assert.equal(seen?.action, "recreate");
  assert.equal(seen?.profile?.name, "Research");
  assert.equal(seen?.profile?.description, "Collect sources only.");
  assert.equal(result.name, "Research");
  assert.equal(result.description, "Collect sources only.");
});

it("passes a skill change to the management function", async () => {
  let seen: { action?: string; skill?: { name?: string; content?: string } } | null = null;
  await runGrokBotAgentAction({
    action: "update-skill",
    skill: { name: "Research", content: "steps" },
    connection: { id: "conn-1", provider: "grok-bot", accessToken: "at" },
    manage: async (input) => {
      seen = input;
      return { agentId: "agent-1", rowId: "row-1" };
    },
  });
  assert.equal(seen?.action, "update-skill");
  assert.equal(seen?.skill?.name, "Research");
  assert.equal(seen?.skill?.content, "steps");
});

it("passes memory text to the management function", async () => {
  let seen: { action?: string; profile?: unknown } | null = null;
  await runGrokBotAgentAction({
    action: "put-memory",
    profile: "Remember the lab notes.",
    connection: { id: "conn-1", provider: "grok-bot", accessToken: "at" },
    manage: async (input) => {
      seen = input;
      return { agentId: "agent-1", rowId: "row-1" };
    },
  });
  assert.equal(seen?.action, "put-memory");
  assert.equal(seen?.profile, "Remember the lab notes.");
});

it("keeps a memory post instead of turning it into create", async () => {
  const route = await import("../../src/app/api/providers/[id]/grok-bot-agent/route.ts");
  assert.equal(route.postAction({ action: "put-memory" }), "put-memory");
  assert.equal(route.postAction({ action: "recreate" }), "recreate");
  assert.equal(route.postAction({}), "create");
});

it("keeps the skill body on a skill post", async () => {
  const route = await import("../../src/app/api/providers/[id]/grok-bot-agent/route.ts");
  const body = { action: "add-skill", skill: { name: "Research", content: "steps" } };
  assert.deepEqual(route.postPayload(body).skill, body.skill);
});

it("keeps the routine body on a routine post", async () => {
  const route = await import("../../src/app/api/providers/[id]/grok-bot-agent/route.ts");
  const body = { action: "remove-routine", routine: { id: "routine-1" } };
  assert.deepEqual(route.postPayload(body).routine, body.routine);
});

it("returns a management error as JSON", async () => {
  const route = await import("../../src/app/api/providers/[id]/grok-bot-agent/route.ts");
  const response = await route.postRoute(
    new Request("http://local/api", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "set-routine", routine: {} }),
    }),
    { params: Promise.resolve({ id: "conn-1" }) },
    {
      load: async () => ({
        id: "conn-1",
        provider: "grok-bot",
        accessToken: "token",
      }),
      manage: async () => {
        throw new Error("Routine fields are required");
      },
    }
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Routine fields are required" });
});

it("rejects a missing or non-grok connection", async () => {
  const route = await import("../../src/app/api/providers/[id]/grok-bot-agent/route.ts");
  const missing = await route.postRoute(
    new Request("http://local/api", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "create" }),
    }),
    { params: Promise.resolve({ id: "missing" }) },
    { load: async () => null }
  );
  assert.equal(missing.status, 404);
  const other = await route.postRoute(
    new Request("http://local/api", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "create" }),
    }),
    { params: Promise.resolve({ id: "conn-2" }) },
    { load: async () => ({ id: "conn-2", provider: "openai", accessToken: "token" }) }
  );
  assert.equal(other.status, 422);
});
