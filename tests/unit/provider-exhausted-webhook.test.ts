import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-exhausted-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const webhooksDb = await import("../../src/lib/db/webhooks.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { WEBHOOK_EVENT_VALUES } = await import("../../src/lib/webhooks/eventDescriptions.ts");

type Hit = { event: string; data: Record<string, unknown> };
const received: Hit[] = [];
const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    received.push(JSON.parse(body));
    res.end("ok");
  });
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

test.after(async () => {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const future = () => new Date(Date.now() + 30 * 60 * 1000).toISOString();

async function seed(provider: string, name: string, cooling: boolean) {
  const created = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `sk-synthetic-${name}`,
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: cooling ? future() : null,
  });
  assert.ok(created?.id);
  return created.id as string;
}

async function settle(expected: number) {
  for (let i = 0; i < 40 && received.length < expected; i++) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  await new Promise((resolve) => setTimeout(resolve, 150));
}

test("provider.exhausted is a subscribable webhook event", () => {
  assert.ok((WEBHOOK_EVENT_VALUES as readonly string[]).includes("provider.exhausted"));
});

test("a provider with every account cooling sends one deduped provider.exhausted webhook", async () => {
  webhooksDb.createWebhook({
    url: `${baseUrl}/hook`,
    events: ["provider.exhausted"],
    kind: "custom",
  });
  await seed("openai", "a1", true);
  await seed("openai", "a2", true);
  await seed("groq", "g1", true);

  const first = (await getProviderCredentials("openai")) as Record<string, unknown>;
  const repeat = (await getProviderCredentials("openai")) as Record<string, unknown>;
  assert.equal(first.allRateLimited, true);
  assert.equal(repeat.allRateLimited, true);
  await settle(1);
  assert.equal(received.length, 1, "repeat requests inside the dedupe window send nothing");
  assert.equal(received[0].event, "provider.exhausted");
  assert.equal(received[0].data.provider, "openai");
  assert.equal(received[0].data.connectionsCount, 2);
  assert.equal(typeof received[0].data.retryAfter, "string");

  const other = (await getProviderCredentials("groq")) as Record<string, unknown>;
  assert.equal(other.allRateLimited, true);
  await settle(2);
  assert.equal(received.length, 2, "dedupe is per provider");
  assert.equal(received[1].data.provider, "groq");
});

test("no webhook while the provider still has a usable account", async () => {
  const before = received.length;
  await seed("anthropic", "b1", true);
  await seed("anthropic", "b2", false);
  const picked = (await getProviderCredentials("anthropic")) as Record<string, unknown>;
  assert.equal(picked.allRateLimited, undefined);
  await settle(before);
  assert.equal(received.length, before);
});

test("no webhook when a key policy narrows the pool to cooling accounts only", async () => {
  const before = received.length;
  const cooling = await seed("deepseek", "c1", true);
  await seed("deepseek", "c2", false);
  const narrowed = (await getProviderCredentials("deepseek", null, [cooling])) as Record<
    string,
    unknown
  >;
  assert.equal(narrowed.allRateLimited, true);
  await settle(before);
  assert.equal(received.length, before, "the provider is not down, only this key's view of it");
});
