import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer, type Server } from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conductor-a2a-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const tasksRoute = await import("../../src/app/api/a2a/tasks/route.ts");

const servers: Server[] = [];

async function enableA2A() {
  await settings.updateSettings({ a2aEnabled: true });
}

function delegationRequest(body: unknown, bearer?: string) {
  return new Request("http://localhost/api/a2a/tasks", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(bearer ? { authorization: `Bearer ${bearer}` } : {}),
    },
    body: JSON.stringify(body),
  });
}

const VALID_BODY = {
  skill: "conductor-cli-claude",
  messages: [{ role: "user", content: "adicione um README com a seção Sobre" }],
  metadata: {
    conductor: {
      repo: { url: "https://git.x/repo", base_ref: "dev" },
      mode: "solo",
      model: "cc/claude-sonnet-5",
    },
  },
};

// Each case gets a fresh DB and the open auth posture (login off, no
// REQUIRE_API_KEY, no env key, no INITIAL_PASSWORD) and puts the env back when
// it ends, so it neither depends on nor leaks into other test files that share
// the process (node --test --test-isolation=none). INITIAL_PASSWORD matters
// because getSettings() turns requireLogin on while setup is incomplete.
const ENV_KEYS = [
  "DATA_DIR",
  "INITIAL_PASSWORD",
  "REQUIRE_API_KEY",
  "OMNIROUTE_API_KEY",
  "ROUTER_API_KEY",
  "CONDUCTOR_HUB_URL",
] as const;

async function freshPosture(t: TestContext) {
  const saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  t.after(() => {
    core.resetDbInstance();
    for (const k of ENV_KEYS) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
  });
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.DATA_DIR = TEST_DATA_DIR;
  delete process.env.INITIAL_PASSWORD;
  delete process.env.REQUIRE_API_KEY;
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  delete process.env.CONDUCTOR_HUB_URL;
  await settings.updateSettings({ requireLogin: false });
}

test.after(async () => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  while (servers.length > 0) {
    const s = servers.pop();
    await new Promise((resolve) => s?.close(resolve));
  }
});

test("A2A desabilitado → 503 (mesmo gate do JSON-RPC)", async (t) => {
  await freshPosture(t);
  const res = await tasksRoute.POST(delegationRequest(VALID_BODY));
  assert.equal(res.status, 503);
});

test("com OMNIROUTE_API_KEY configurada, bearer errado → 401 e bearer certo passa", async (t) => {
  await freshPosture(t);
  await enableA2A();
  process.env.OMNIROUTE_API_KEY = "chave-certa";
  const denied = await tasksRoute.POST(delegationRequest(VALID_BODY, "chave-errada"));
  assert.equal(denied.status, 401);
});

test("delegação válida → 201 com o task_id do hub; requirements derivados da skill do card", async (t) => {
  await freshPosture(t);
  await enableA2A();
  const bodies: unknown[] = [];
  await new Promise<void>((resolve) => {
    const server = createServer((req, res) => {
      let raw = "";
      req.on("data", (c) => (raw += c));
      req.on("end", () => {
        bodies.push(JSON.parse(raw));
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify({ id: "t_delegada", status: "submitted" }));
      });
    });
    servers.push(server);
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      process.env.CONDUCTOR_HUB_URL = `http://127.0.0.1:${typeof addr === "object" && addr ? addr.port : 0}`;
      resolve();
    });
  });
  const res = await tasksRoute.POST(delegationRequest(VALID_BODY));
  assert.equal(res.status, 201);
  const out = await res.json();
  assert.equal(out.conductor_task_id, "t_delegada");
  assert.equal(out.state, "submitted");
  const sent = bodies[0] as {
    repo: { url: string; base_ref: string };
    spec: { prompt: string };
    requirements: { cli: string; model: string };
  };
  assert.equal(sent.repo.url, "https://git.x/repo");
  assert.equal(sent.repo.base_ref, "dev");
  assert.equal(sent.spec.prompt, "adicione um README com a seção Sobre");
  assert.equal(sent.requirements.cli, "claude", "skill conductor-cli-claude vira requirements.cli");
  assert.equal(sent.requirements.model, "cc/claude-sonnet-5");
});

test("sem repo na metadata → 400 (delegação exige repo); skill não-conductor → 400", async (t) => {
  await freshPosture(t);
  await enableA2A();
  const noRepo = await tasksRoute.POST(
    delegationRequest({ skill: "conductor", messages: [{ role: "user", content: "p" }] })
  );
  assert.equal(noRepo.status, 400);
  const wrongSkill = await tasksRoute.POST(
    delegationRequest({ ...VALID_BODY, skill: "smart-routing" })
  );
  assert.equal(wrongSkill.status, 400);
});
