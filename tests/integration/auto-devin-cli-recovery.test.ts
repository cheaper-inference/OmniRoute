import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { Socket } from "node:net";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "devin-acp-recovery-"));
const bin = path.join(dir, "devin");
Object.assign(process.env, {
  DATA_DIR: dir,
  CLI_DEVIN_BIN: bin,
  REQUIRE_API_KEY: "false",
  API_KEY_SECRET: "synthetic-only",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
});
const connect = Socket.prototype.connect;
Socket.prototype.connect = function () {
  throw new Error("network forbidden");
};
const fetchBefore = globalThis.fetch;
let alternate = 0;
globalThis.fetch = async (input) => {
  const url = String(input instanceof Request ? input.url : input);
  if (url.includes("api.openai.com")) alternate++;
  throw new Error("synthetic fixture forbids upstream");
};
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const combos = await import("../../src/lib/db/combos.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const overrides = await import("../../src/lib/db/autoCandidateOverrides.ts");
const factory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const { POST } = await import("../../src/app/api/v1/responses/route.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

test.after(async () => {
  await closeCallLogSaves(10000);
  core.resetDbInstance();
  globalThis.fetch = fetchBefore;
  Socket.prototype.connect = connect;
});

test(
  "a locally installed executable becomes a working auto/coding target after cached absence",
  { timeout: 60000 },
  async () => {
    await settings.updateSettings({
      excludeTosAvoid: false,
      blockedProviders: ["opencode", "duckduckgo-web", "veoaifree-web", "auggie"],
    });
    const account = await providers.createProviderConnection({
      provider: "devin-cli",
      authType: "apikey",
      apiKey: "synthetic",
      isActive: true,
    });
    const secondAccount = await providers.createProviderConnection({
      provider: "devin-cli",
      authType: "apikey",
      apiKey: "synthetic-second",
      isActive: true,
    });
    const secondBefore = await providers.getProviderConnectionById(secondAccount.id);
    assert.equal(
      (await factory.prepareVirtualAutoComboInputs()).regularCandidates.filter(
        (c) => c.provider === "devin-cli"
      ).length,
      0
    );
    fs.writeFileSync(
      bin,
      `#!${process.execPath}\nconst readline = require("node:readline");\nconst rl = readline.createInterface({ input: process.stdin });\nrl.on("line", (line) => { const m = JSON.parse(line); const send = (v) => process.stdout.write(JSON.stringify(v) + "\\n"); if (m.method === "initialize") send({jsonrpc:"2.0",id:m.id,result:{}}); if (m.method === "session/new") send({jsonrpc:"2.0",id:m.id,result:{sessionId:"synthetic"}}); if (m.method === "session/prompt") { send({jsonrpc:"2.0",method:"session/update",params:{update:{sessionUpdate:"agent_message_chunk",content:{type:"text",text:"ACP complete"}}}}); send({jsonrpc:"2.0",id:m.id,result:{stopReason:"end_turn"}}); } });\n`,
      { mode: 0o755 }
    );
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const prepared = await Promise.all(
      Array.from({ length: 8 }, () => factory.prepareVirtualAutoComboInputs())
    );
    for (const snapshot of prepared) {
      assert.ok(snapshot.regularCandidates.some((c) => c.provider === "devin-cli"));
    }
    const key = await keys.createApiKey("fixture", "fixture-machine");
    await keys.updateApiKeyPermissions(key.id, { allowedConnections: [account.id] });
    await overrides.setExcluded(key.id, "auto/coding", account.id, true);
    const excluded = await factory.selectVirtualAutoCandidatePool(
      prepared[0],
      undefined,
      key.id,
      "auto/coding"
    );
    const excludedDevin = excluded.candidatePool.filter(
      (candidate) => candidate.provider === "devin-cli"
    );
    assert.ok(excludedDevin.length > 0);
    assert.ok(
      excludedDevin.every(
        (candidate) =>
          !candidate.allowedConnectionIds?.includes(account.id) &&
          candidate.allowedConnectionIds?.includes(secondAccount.id)
      )
    );
    await overrides.setExcluded(key.id, "auto/coding", account.id, false);
    const response = await POST(
      new Request("http://localhost/v1/responses", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key.key}` },
        body: JSON.stringify({ model: "auto/coding", stream: true, input: "hello" }),
      })
    );
    const body = await response.text();
    assert.equal(response.status, 200, body);
    assert.match(body, /ACP complete/);
    assert.match(body, /response.completed/);
    assert.equal(alternate, 0);
    assert.deepEqual(await providers.getProviderConnectionById(secondAccount.id), secondBefore);
    await overrides.setExcluded(key.id, "auto/coding", account.id, true);
    const denied = await POST(
      new Request("http://localhost/v1/responses", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${key.key}` },
        body: JSON.stringify({ model: "auto/coding", stream: false, input: "hello" }),
      })
    );
    const deniedBody = await denied.text();
    assert.notEqual(denied.status, 200, deniedBody);
    assert.doesNotMatch(deniedBody, /ACP complete/);
    await overrides.setExcluded(key.id, "auto/coding", account.id, false);
    await combos.createCombo({
      name: "synthetic-cli-combo",
      models: ["devin-cli/deepseek-v4-flash-max"],
      strategy: "priority",
      config: {},
    });
    for (const model of ["devin-cli/deepseek-v4-flash-max", "synthetic-cli-combo"]) {
      const direct = await POST(
        new Request("http://localhost/v1/responses", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ model, stream: true, input: "hello" }),
        })
      );
      const directBody = await direct.text();
      assert.equal(direct.status, 200, directBody);
      assert.match(directBody, /ACP complete/);
      assert.match(directBody, /response.completed/);
    }
  }
);
