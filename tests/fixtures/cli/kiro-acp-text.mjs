#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline";

const [command, flag, mode, modelFlag, model] = process.argv.slice(2);
assert.deepEqual(
  [command, flag, mode, modelFlag],
  ["acp", "--agent", "omniroute-text-only", "--model"]
);
assert.equal(process.env.ACP_SECRET_CANARY, undefined);
const profile = JSON.parse(
  fs.readFileSync(path.join(process.env.HOME, ".kiro", "agents", `${mode}.json`))
);
assert.deepEqual(profile.tools, []);
assert.deepEqual(profile.resources, []);
assert.deepEqual(profile.mcpServers, {});
assert.deepEqual(profile.hooks, {});
assert.equal(profile.includeMcpJson, false);
assert.equal(profile.includePowers, false);
const send = (obj) => process.stdout.write(JSON.stringify({ jsonrpc: "2.0", ...obj }) + "\n");
const answer = (id, result) => send({ id, result });
let turn;
createInterface({ input: process.stdin }).on("line", (line) => {
  const r = JSON.parse(line);
  if (r.method === "initialize") {
    assert.deepEqual(r.params.clientCapabilities, {});
    answer(r.id, { protocolVersion: 1, agentCapabilities: {}, authMethods: [] });
  } else if (r.method === "session/new") {
    assert.deepEqual(r.params.mcpServers, []);
    if (model === "require-login")
      return send({ id: r.id, error: { code: -32000, message: "Login required" } });
    answer(r.id, {
      sessionId: "s",
      modes: {
        currentModeId: model === "wrong-mode" ? "default" : mode,
        availableModes: [{ id: mode, name: mode }],
      },
      models: {
        currentModelId: model === "wrong-model" ? "other" : model,
        availableModels: [{ modelId: model, name: model }],
      },
    });
  } else if (r.method === "session/prompt") {
    assert.equal(r.params.prompt[0].text, "say hello");
    assert.equal(r.params.sessionId, "s");
    assert.ok(!["wrong-mode", "wrong-model", "require-login"].includes(model));
    if (model === "hang") return;
    turn = r.id;
    send({
      id: "permission",
      method: "session/request_permission",
      params: {
        sessionId: "s",
        toolCall: { toolCallId: "t", title: "unauthorized tool", kind: "execute" },
        options: [{ optionId: "allow", name: "Allow", kind: "allow_once" }],
      },
    });
  } else if (r.id === "permission") {
    assert.equal(r.result.outcome.outcome, "cancelled");
    for (const text of ["hel", "lo"]) {
      send({
        method: "session/update",
        params: {
          sessionId: "s",
          update: { sessionUpdate: "agent_message_chunk", content: { type: "text", text } },
        },
      });
    }
    answer(turn, { stopReason: "end_turn" });
  }
});
