import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { NextResponse } from "next/server";
import * as schemas from "../../src/shared/validation/grokBotSchemas.ts";
import * as cards from "../../src/app/(dashboard)/dashboard/grok-bot/cards.ts";
import * as permission from "../../src/app/(dashboard)/dashboard/grok-bot/permission.ts";
import * as send from "../../src/app/(dashboard)/dashboard/grok-bot/send.ts";

// Execute the actual handlers, retaining real domain parsing. Only auth, storage,
// token refresh and upstream RPC are replaced; no credentials or network are used.
function harness(
  route: string,
  options: { denied?: boolean; provider?: string | null; expired?: boolean; leased?: boolean } = {}
) {
  const events: string[] = [];
  const calls: Array<{ method: string; payload: unknown }> = [];
  const modules: Record<string, unknown> = {
    "next/server": { NextResponse },
    "@/shared/validation/grokBotSchemas": schemas,
    "@/lib/exclusiveLeaseIsolation": {
      isConnectionUnavailableToAuxiliaryActivity: async () => options.leased ?? false,
    },
    "@/lib/api/requireManagementAuth": {
      requireManagementAuth: async () => {
        events.push("auth");
        return options.denied
          ? NextResponse.json({ error: "Unauthorized" }, { status: 401 })
          : null;
      },
    },
    "@/lib/db/providers": {
      getProviderConnectionById: async () => {
        events.push("load");
        return options.provider === null ? null : { provider: options.provider ?? "grok-bot" };
      },
    },
    "../tokenSource": {
      grokBotToken: async () => {
        events.push("token");
        return options.expired ? { error: "expired" } : { accessToken: "test-only" };
      },
    },
    "../../../../../(dashboard)/dashboard/grok-bot/read": {
      grokBotRead: async (input: { method: string; payload: unknown }) => {
        events.push("rpc");
        calls.push(input);
        return { accepted: true };
      },
    },
    "../../../../../(dashboard)/dashboard/grok-bot/cards": cards,
    "../../../../../(dashboard)/dashboard/grok-bot/permission": permission,
    "../../../../../(dashboard)/dashboard/grok-bot/send": send,
  };
  const source = readFileSync(
    new URL(`../../src/app/api/providers/[id]/grok-bot/${route}/route.ts`, import.meta.url),
    "utf8"
  );
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports: {
    POST?: (request: Request, context: { params: Promise<{ id: string }> }) => Promise<Response>;
  } = {};
  runInNewContext(code, {
    Error,
    URL,
    exports,
    Date,
    require: (id: string) => {
      if (!(id in modules)) throw new Error(`Unmocked dependency: ${id}`);
      return modules[id];
    },
  });
  assert.ok(exports.POST);
  return {
    events,
    calls,
    post: (body: string) =>
      exports.POST!(new Request("http://localhost/api", { method: "POST", body }), {
        params: Promise.resolve({ id: "connection" }),
      }),
  };
}

const cases = [
  {
    route: "connector",
    body: { agentId: "agent", entryId: "", requestId: "request", resolution: "allowed" },
    method: "ResolveGrokBotConnectorGrant",
  },
  {
    route: "permission",
    body: { agentId: "agent", entryId: "", requestId: "request", resolution: "deny" },
    method: "ResolveGrokBotLocalToolPermission",
  },
  { route: "draft", body: { agentId: "agent", entryId: "entry" }, method: "DiscardGrokBotDraft" },
  {
    route: "secret",
    body: { agentId: "agent", entryId: "entry", value: "synthetic-input" },
    method: "SubmitGrokBotSecret",
  },
  {
    route: "send",
    body: { agentId: "agent", messageId: "message", text: "hello" },
    method: "SendGrokBotUserMessage",
  },
  {
    route: "widget",
    body: { agentId: "agent", entryId: "entry", value: "reply" },
    method: "RespondGrokBotWidget",
  },
];

for (const item of cases)
  describe(`Grok ${item.route} request validation`, () => {
    for (const [label, body] of [
      ["malformed", "{"],
      ["null", "null"],
      ["array", "[]"],
      ["scalar", "42"],
      ["wrong field type", JSON.stringify({ ...item.body, agentId: 42 })],
    ]) {
      it(`rejects ${label} before token refresh or RPC`, async () => {
        const h = harness(item.route);
        const response = await h.post(body);
        assert.equal(response.status, 400);
        assert.deepEqual(await response.json(), { error: "invalid" });
        assert.equal(h.events.includes("token"), false);
        assert.equal(h.calls.length, 0);
      });
    }
    it("preserves the valid payload and upstream method", async () => {
      const h = harness(item.route);
      const response = await h.post(JSON.stringify(item.body));
      assert.equal(response.status, 200);
      assert.equal(h.calls.length, 1);
      assert.equal(h.calls[0].method, item.method);
      const payload = h.calls[0].payload as Record<string, unknown>;
      assert.equal(payload.agentId, "agent");
      if ("value" in item.body) assert.equal(payload.value, item.body.value);
      if ("resolution" in item.body)
        assert.equal(payload.resolution, item.route === "connector" ? 1 : 2);
    });
    it("retains auth denial without reading or dispatching", async () => {
      const h = harness(item.route, { denied: true });
      assert.equal((await h.post("{}")).status, 401);
      assert.deepEqual(h.events, ["auth"]);
    });
    it("retains missing-provider and reauth statuses", async () => {
      assert.equal(
        (await harness(item.route, { provider: null }).post(JSON.stringify(item.body))).status,
        404
      );
      assert.equal(
        (await harness(item.route, { provider: "other" }).post(JSON.stringify(item.body))).status,
        404
      );
      assert.equal(
        (await harness(item.route, { expired: true }).post(JSON.stringify(item.body))).status,
        409
      );
    });
  });

it("does not accept inherited object keys as permission resolutions", async () => {
  for (const route of ["permission", "connector"]) {
    for (const resolution of ["constructor", "toString", "__proto__"]) {
      const h = harness(route);
      assert.equal(
        (await h.post(JSON.stringify({ agentId: "agent", requestId: "request", resolution })))
          .status,
        400
      );
      assert.equal(h.calls.length, 0);
    }
  }
});
it("supports dismissing a widget without a value", async () => {
  const h = harness("widget");
  assert.equal(
    (await h.post(JSON.stringify({ agentId: "agent", entryId: "entry", dismiss: true }))).status,
    200
  );
  assert.equal(h.calls[0].method, "DismissGrokBotWidget");
});

async function agentHarness(existing = true, leased = false) {
  const admin = await import("../../src/lib/grokBotAgentAdmin.ts");
  const events: string[] = [];
  const calls: Array<{ method: string; payload: Record<string, unknown> }> = [];
  const modules: Record<string, unknown> = {
    "next/server": { NextResponse },
    "@/shared/validation/grokBotSchemas": schemas,
    "@/lib/exclusiveLeaseIsolation": {
      isConnectionUnavailableToAuxiliaryActivity: async () => leased,
    },
    "@/lib/db/readCache": {
      getCachedProviderConnectionById: async () => {
        events.push("load");
        return {
          provider: "grok-bot",
          accessToken: "test-only",
          providerSpecificData: {
            grokBotAgent: existing
              ? {
                  agentId: "agent",
                  rowId: "row",
                  name: "Existing",
                  description: "Existing agent",
                }
              : undefined,
          },
        };
      },
    },
    "@/lib/db/providers": {
      updateProviderConnection: async () => {
        events.push("save");
      },
    },
    "@/lib/grokBotAgentAdmin": admin,
    "@/sse/services/grokBotAgentRpc": {
      grokBotAgentRpc: () => async (method: string, payload: Record<string, unknown>) => {
        calls.push({ method, payload });
        if (method === "CreateGrokBotTemporalAgent")
          return { agent: { id: "new-row", legacyAgentId: payload.agentId, harness: "temporal" } };
        return { version: 1 };
      },
    },
  };
  const source = readFileSync(
    new URL("../../src/app/api/providers/[id]/grok-bot-agent/route.ts", import.meta.url),
    "utf8"
  );
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports: {
    GET?: (request: Request, context: { params: Promise<{ id: string }> }) => Promise<Response>;
    DELETE?: (request: Request, context: { params: Promise<{ id: string }> }) => Promise<Response>;
    POST?: (request: Request, context: { params: Promise<{ id: string }> }) => Promise<Response>;
  } = {};
  runInNewContext(code, {
    Error,
    URL,
    exports,
    require: (id: string) => {
      if (!(id in modules)) throw new Error("Unmocked dependency: " + id);
      return modules[id];
    },
  });
  assert.ok(exports.POST);
  return {
    events,
    calls,
    get: () =>
      exports.GET!(new Request("http://localhost/api"), {
        params: Promise.resolve({ id: "connection" }),
      }),
    remove: () =>
      exports.DELETE!(new Request("http://localhost/api?mode=delete", { method: "DELETE" }), {
        params: Promise.resolve({ id: "connection" }),
      }),
    post: (body: string) =>
      exports.POST!(new Request("http://localhost/api", { method: "POST", body }), {
        params: Promise.resolve({ id: "connection" }),
      }),
  };
}

describe("Grok agent POST validation", () => {
  for (const [label, body] of [
    ["malformed", "{"],
    ["null", "null"],
    ["array", "[]"],
    ["scalar", "42"],
    ["unknown action", '{"action":"typo"}'],
    ["wrong action type", '{"action":42}'],
    ["wrong profile type", '{"profile":true}'],
    ["wrong nested profile", '{"profile":{"name":42}}'],
    ["wrong skill type", '{"action":"add-skill","skill":[]}'],
    [
      "wrong routine field type",
      '{"action":"set-routine","routine":{"id":"routine","enabled":"true"}}',
    ],
  ])
    it("rejects " + label + " before loading, mutating or dispatching", async () => {
      const h = await agentHarness();
      assert.equal((await h.post(body)).status, 400);
      assert.deepEqual(h.events, []);
      assert.equal(h.calls.length, 0);
    });

  for (const [body, method] of [
    [{ action: "put-memory", profile: "Remember this" }, "PutGrokBotMemoryShard"],
    [
      {
        action: "add-skill",
        skill: { name: "name", description: "description", content: "content" },
      },
      "AddGrokBotAgentSkill",
    ],
    [
      { action: "update-skill", skill: { name: "name", content: "content" } },
      "UpdateGrokBotAgentSkill",
    ],
    [{ action: "remove-skill", skill: { name: "name" } }, "RemoveGrokBotAgentSkill"],
    [
      { action: "set-routine", routine: { id: "routine", enabled: false } },
      "SetGrokBotAgentAutomationEnabled",
    ],
    [{ action: "remove-routine", routine: { id: "routine" } }, "DeleteGrokBotAgentAutomation"],
    [
      { action: "recreate", profile: { name: "New name", description: "New description" } },
      "CreateGrokBotTemporalAgent",
    ],
    [{ action: "recreate", profile: "Legacy name" }, "CreateGrokBotTemporalAgent"],
  ] as const)
    it("preserves valid " + body.action + " input", async () => {
      const h = await agentHarness();
      assert.equal((await h.post(JSON.stringify(body))).status, 200);
      assert.equal(h.calls[0].method, method);
      if (body.action === "set-routine") assert.equal(h.calls[0].payload.isEnabled, false);
      if (body.action === "recreate")
        assert.equal(
          h.calls[0].payload.name,
          typeof body.profile === "string" ? body.profile : body.profile.name
        );
    });

  it("keeps omitted action as create and returns an existing agent without RPC", async () => {
    const h = await agentHarness();
    assert.equal((await h.post("{}")).status, 200);
    assert.equal(h.calls.length, 0);
    assert.deepEqual(h.events, ["load"]);
  });
  it("retains domain validation of missing required routine fields without RPC", async () => {
    const h = await agentHarness();
    const response = await h.post('{"action":"set-routine","routine":{}}');
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "Routine fields are required" });
    assert.equal(h.calls.length, 0);
    assert.equal(h.events.includes("save"), false);
  });
});

it("preserves every supported permission and connector resolution", async () => {
  for (const [route, resolutions] of [
    ["permission", ["allow_once", "deny", "always", "never"]],
    [
      "connector",
      ["allowed", "skipped", "always_this_bot", "always_all_team_bots", "allow_in_channel"],
    ],
  ] as const) {
    for (const [index, resolution] of resolutions.entries()) {
      const h = harness(route);
      assert.equal(
        (await h.post(JSON.stringify({ agentId: "agent", requestId: "request", resolution })))
          .status,
        200
      );
      assert.equal((h.calls[0].payload as Record<string, unknown>).resolution, index + 1);
      assert.equal((h.calls[0].payload as Record<string, unknown>).entryId, "");
    }
  }
});
it("rejects empty text and malformed widget flags without refreshing or dispatching", async () => {
  for (const [route, body] of [
    ["secret", { agentId: "agent", entryId: "entry", value: "  " }],
    ["widget", { agentId: "agent", entryId: "entry", value: "  " }],
    ["widget", { agentId: "agent", entryId: "entry", value: "reply", dismiss: "true" }],
    ["send", { agentId: "agent", messageId: "message", text: "  " }],
  ] as const) {
    const h = harness(route);
    assert.equal((await h.post(JSON.stringify(body))).status, 400);
    assert.equal(h.events.includes("token"), false);
    assert.equal(h.calls.length, 0);
  }
});
it("preserves secret whitespace without reflecting its value or forwarding extra fields", async () => {
  const h = harness("secret");
  const response = await h.post(
    JSON.stringify({
      agentId: "agent",
      entryId: "entry",
      value: " synthetic-input ",
      unexpected: "discard-me",
    })
  );
  assert.equal(response.status, 200);
  assert.equal((h.calls[0].payload as Record<string, unknown>).value, " synthetic-input ");
  assert.equal("unexpected" in (h.calls[0].payload as Record<string, unknown>), false);
  assert.deepEqual(await response.json(), { status: "submitted" });
});

it("creates and persists an agent for an explicit valid create request", async () => {
  const h = await agentHarness(false);
  assert.equal((await h.post('{"action":"create","profile":{"name":"New agent"}}')).status, 200);
  assert.equal(h.calls[0].method, "CreateGrokBotTemporalAgent");
  assert.equal(h.calls[0].payload.name, "New agent");
  assert.deepEqual(h.events, ["load", "save"]);
});
it("cannot turn malformed JSON into a newly created agent", async () => {
  const h = await agentHarness(false);
  assert.equal((await h.post("{")).status, 400);
  assert.deepEqual(h.events, []);
  assert.equal(h.calls.length, 0);
});

for (const item of cases)
  it("defers leased " + item.route + " without token refresh or RPC", async () => {
    const h = harness(item.route, { leased: true });
    const response = await h.post(JSON.stringify(item.body));
    assert.equal(response.status, 409);
    assert.deepEqual(await response.json(), { error: "exclusive_lease_active" });
    assert.equal(h.events.includes("token"), false);
    assert.equal(h.calls.length, 0);
  });
it("does not manage an agent on an actively leased connection", async () => {
  const h = await agentHarness(false, true);
  assert.equal((await h.post('{"action":"create"}')).status, 409);
  assert.deepEqual(h.events, []);
  assert.equal(h.calls.length, 0);
});

it("fences agent reads and deletes while preserving free-connection behavior", async () => {
  const blocked = await agentHarness(true, true);
  assert.equal((await blocked.get()).status, 409);
  assert.equal((await blocked.remove()).status, 409);
  assert.deepEqual(blocked.events, []);
  assert.equal(blocked.calls.length, 0);
  const free = await agentHarness();
  assert.equal((await free.get()).status, 200);
  assert.equal((await free.remove()).status, 200);
  assert.equal(free.calls.at(-1)?.method, "DeleteGrokBotAgent");
  assert.equal(free.events.includes("save"), true);
});
