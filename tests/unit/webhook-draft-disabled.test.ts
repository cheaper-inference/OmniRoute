import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { SignJWT } from "jose";
import { Agent, MockAgent } from "undici";
import type { Webhook } from "../../src/lib/db/webhooks.ts";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-webhook-draft-"));
const sessionSecret = "test-webhook-draft-session-secret";
process.env.DATA_DIR = dataDir;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = sessionSecret;

const { DASHBOARD_SESSION_COOKIE } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getWebhook } = await import("../../src/lib/db/webhooks.ts");
const { POST: create } = await import("../../src/app/api/webhooks/route.ts");
const { POST: sendTest } = await import("../../src/app/api/webhooks/[id]/test/route.ts");
const { dispatchEvent } = await import("../../src/lib/webhookDispatcher.ts");

const session = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("1h")
  .sign(new TextEncoder().encode(sessionSecret));

// Use a public IP literal so the real outbound guard needs no DNS lookup.
const receiver = "https://203.0.113.5";

function resetDb() {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
}

test.beforeEach(() => {
  resetDb();
  mkdirSync(dataDir, { recursive: true });
});
test.after(resetDb);

function request(path: string, body?: Record<string, unknown>) {
  return new Request(`http://localhost/api/webhooks${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: `${DASHBOARD_SESSION_COOKIE}=${session}`,
    },
    body: JSON.stringify(body),
  });
}

async function createWebhook(body: Record<string, unknown>): Promise<Webhook> {
  const response = await create(request("", body));
  assert.equal(response.status, 201);
  return (await response.json()).webhook;
}

function mockFetchTransport(t: test.TestContext) {
  const agent = new Agent();
  agent.dispatch = agent.dispatch.bind(agent);
  const transport = new MockAgent({ agent });
  transport.disableNetConnect();
  // Pinned fetch creates its own Undici Agent. Mock the transport beneath fetch,
  // so URL validation, HMAC signing and routing still run as in production.
  t.mock.method(Agent.prototype, "dispatch", transport.dispatch.bind(transport));
  t.after(() => transport.close());
  const requests: string[] = [];
  transport
    .get(receiver)
    .intercept({ path: /^\/(draft|active)$/, method: "POST" })
    .reply(200, (options) => {
      requests.push(options.path);
      return "ok";
    })
    .persist();
  return requests;
}

test("POST persists enabled=false and defaults to enabled=true when omitted", async () => {
  const draft = await createWebhook({ url: `${receiver}/draft`, enabled: false });
  const active = await createWebhook({ url: `${receiver}/active` });
  assert.equal(draft.enabled, false);
  assert.equal(getWebhook(draft.id)?.enabled, false);
  assert.equal(active.enabled, true);
  assert.equal(getWebhook(active.id)?.enabled, true);
});

test("POST validates enabled as a boolean", async () => {
  const response = await create(request("", { url: `${receiver}/draft`, enabled: "false" }));
  assert.equal(response.status, 400);
});

test("the production dispatcher delivers the event to the active subscriber only", async (t) => {
  const requests = mockFetchTransport(t);
  const events = ["request.completed"];
  const draft = await createWebhook({ url: `${receiver}/draft`, events, enabled: false });
  const active = await createWebhook({ url: `${receiver}/active`, events });

  await dispatchEvent("request.completed", { provider: "test-provider", status: 200 });

  assert.deepEqual(requests, ["/active"]);
  assert.equal(getWebhook(draft.id)?.last_status, null);
  assert.equal(getWebhook(active.id)?.last_status, 200);
});

test("the manual test endpoint delivers test.ping to a disabled webhook", async (t) => {
  const requests = mockFetchTransport(t);
  const draft = await createWebhook({ url: `${receiver}/draft`, enabled: false });
  const response = await sendTest(request(`/${draft.id}/test`), {
    params: Promise.resolve({ id: draft.id }),
  });

  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.delivered, true);
  assert.equal(result.payloadSent.event, "test.ping");
  assert.deepEqual(requests, ["/draft"]);
  assert.equal(getWebhook(draft.id)?.enabled, false);
});
