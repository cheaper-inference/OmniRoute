import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { SignJWT } from "jose";
import type { AuditLogEntry } from "../../src/lib/compliance/index.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-webhook-audit-"));
const sessionSecret = "test-webhook-audit-session-secret";
process.env.DATA_DIR = dataDir;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = sessionSecret;
process.env.STORAGE_ENCRYPTION_KEY = "test-webhook-audit-encryption-key";

const { DASHBOARD_SESSION_COOKIE } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createWebhook, getWebhook } = await import("../../src/lib/db/webhooks.ts");
const { POST } = await import("../../src/app/api/webhooks/route.ts");
const { DELETE, PUT } = await import("../../src/app/api/webhooks/[id]/route.ts");
const { GET: getAuditLog } = await import("../../src/app/api/compliance/audit-log/route.ts");
const { logger } = await import("../../src/shared/utils/logger.ts");
const { getWebhookAuditTarget } = await import("../../src/lib/webhooks/audit.ts");

const session = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: "HS256" })
  .setIssuedAt()
  .setExpirationTime("1h")
  .sign(new TextEncoder().encode(sessionSecret));

const origin = "https://hooks.example.com:8443";
const hookPath = "/services/T000/B000/XXXXSECRET?token=QSECRET#test-fragment";
const webhookUrl = `${origin}${hookPath}`;
const legacyUrl = `https://hook-test-user:p4ss@hooks.example.com:8443${hookPath}`;
const secret = "test-webhook-signing-secret";
const clientIp = "203.0.113.5";
const createId = "webhook-audit-create";
const updateId = "webhook-audit-update";
const deleteId = "webhook-audit-delete";

function resetDb() {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}

test.beforeEach(() => {
  resetDb();
  fs.mkdirSync(dataDir, { recursive: true });
});

test.after(resetDb);

function request(
  endpoint: string,
  method = "GET",
  requestId = "webhook-audit-read",
  body?: unknown
) {
  return new Request(`http://localhost/api/${endpoint}`, {
    method,
    headers: {
      "content-type": "application/json",
      cookie: `${DASHBOARD_SESSION_COOKIE}=${session}`,
      "x-forwarded-for": clientIp,
      "x-request-id": requestId,
    },
    body: JSON.stringify(body),
  });
}

function byId(id: string) {
  return { params: Promise.resolve({ id }) };
}

async function getWebhookAuditEvents(): Promise<AuditLogEntry[]> {
  const response = await getAuditLog(request("compliance/audit-log?action=webhook."));
  assert.equal(response.status, 200);
  return response.json();
}

async function assertAuditEvent(
  action: string,
  requestId: string,
  target: string,
  details: Record<string, unknown>,
  privateValues: string[]
) {
  const entries = await getWebhookAuditEvents();
  assert.equal(entries.length, 1, `expected exactly one ${action} audit event`);
  const [entry] = entries;
  assert.equal(entry.action, action);
  assert.equal(entry.actor, "dashboard");
  assert.equal(entry.ip_address, clientIp);
  assert.equal(entry.requestId, requestId);
  assert.equal(entry.resourceType, "webhook");
  assert.equal(entry.status, "success");
  assert.equal(entry.target, target);
  assert.deepEqual(entry.details, details);
  const serialized = JSON.stringify(entry);
  for (const value of privateValues) {
    assert.ok(!serialized.includes(value), "audit record contains a private value");
  }
}

test("POST logs a successful webhook creation with only the destination origin", async () => {
  const response = await POST(
    request("webhooks", "POST", createId, { url: webhookUrl, kind: "slack", secret })
  );
  assert.equal(response.status, 201);
  const { webhook } = await response.json();

  await assertAuditEvent("webhook.create", createId, origin, { id: webhook.id, kind: "slack" }, [
    "T000",
    "B000",
    "XXXXSECRET",
    "QSECRET",
    "test-fragment",
    secret,
  ]);
});

test("PUT logs the new origin and only the names of changed fields", async () => {
  const webhook = createWebhook({ url: "https://old.example.com/old-token", kind: "slack" });
  const newSecret = "test-replacement-signing-secret";
  const description = "private webhook description";
  const metadataValue = "private webhook metadata";
  const response = await PUT(
    request(`webhooks/${webhook.id}`, "PUT", updateId, {
      url: webhookUrl,
      secret: newSecret,
      description,
      events: ["*"],
      metadata: { channel: metadataValue },
    }),
    byId(webhook.id)
  );
  assert.equal(response.status, 200);

  await assertAuditEvent(
    "webhook.update",
    updateId,
    origin,
    { id: webhook.id, kind: "slack", changedFields: ["url", "secret", "description", "metadata"] },
    [webhookUrl, "XXXXSECRET", "QSECRET", "test-fragment", newSecret, description, metadataValue]
  );
});

test("DELETE audits the saved origin and removes userinfo from a legacy URL", async () => {
  // The current URL guard rejects embedded credentials on new writes.
  const webhook = createWebhook({ url: legacyUrl, kind: "slack", secret });
  const response = await DELETE(
    request(`webhooks/${webhook.id}`, "DELETE", deleteId),
    byId(webhook.id)
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(getWebhook(webhook.id), null);

  await assertAuditEvent("webhook.delete", deleteId, origin, { id: webhook.id, kind: "slack" }, [
    "hook-test-user",
    "p4ss",
    "T000",
    "B000",
    "XXXXSECRET",
    "QSECRET",
    "test-fragment",
    secret,
  ]);
});

test("Telegram audit entries identify the webhook without disclosing its chat ID", async () => {
  const chatId = "-1001234567890";
  const botToken = "test-telegram-bot-token";
  const response = await POST(
    request("webhooks", "POST", createId, { url: chatId, kind: "telegram", metadata: { botToken } })
  );
  assert.equal(response.status, 201);
  const { webhook } = await response.json();

  await assertAuditEvent(
    "webhook.create",
    createId,
    `telegram:${webhook.id}`,
    { id: webhook.id, kind: "telegram" },
    [chatId, botToken]
  );
});

test("validation failures and missing webhooks do not emit audit events", async () => {
  assert.equal((await POST(request("webhooks", "POST", createId, {}))).status, 400);
  assert.equal((await POST(request("webhooks", "POST", createId, { url: legacyUrl }))).status, 400);
  const missing = "missing";
  const endpoint = `webhooks/${missing}`;
  assert.equal(
    (await PUT(request(endpoint, "PUT", updateId, { url: 42 }), byId(missing))).status,
    400
  );
  assert.equal(
    (await PUT(request(endpoint, "PUT", updateId, { url: webhookUrl }), byId(missing))).status,
    404
  );
  assert.equal((await DELETE(request(endpoint, "DELETE", deleteId), byId(missing))).status, 404);
  assert.deepEqual(await getWebhookAuditEvents(), []);
});

test("a failed deletion leaves the webhook in place and emits no success event", async (t) => {
  const webhook = createWebhook({ url: webhookUrl });
  const db = getDbInstance();
  const prepare = db.prepare.bind(db);
  t.mock.method(db, "prepare", (sql: string) => {
    if (sql.startsWith("DELETE FROM webhooks")) throw new Error("test webhook deletion failure");
    return prepare(sql);
  });

  const response = await DELETE(
    request(`webhooks/${webhook.id}`, "DELETE", deleteId),
    byId(webhook.id)
  );
  assert.equal(response.status, 500);
  assert.ok(getWebhook(webhook.id));
  assert.deepEqual(await getWebhookAuditEvents(), []);
});

test("a failed audit write is logged and webhook creation still succeeds", async (t) => {
  const db = getDbInstance();
  const prepare = db.prepare.bind(db);
  t.mock.method(db, "prepare", (sql: string) => {
    if (sql.includes("INSERT INTO audit_log")) throw new Error("test audit write failure");
    return prepare(sql);
  });
  const warn = t.mock.method(logger, "warn", () => {});

  const response = await POST(request("webhooks", "POST", createId, { url: webhookUrl }));
  assert.equal(response.status, 201);
  const { webhook } = await response.json();
  assert.ok(getWebhook(webhook.id));
  assert.deepEqual(await getWebhookAuditEvents(), []);
  assert.equal(warn.mock.callCount(), 1);
  assert.deepEqual(warn.mock.calls[0].arguments[0], {
    action: "webhook.create",
    webhookId: webhook.id,
  });
});

for (const { name, kind, url, target } of [
  { name: "HTTP", kind: "custom", url: "http://example.com/path", target: "http://example.com" },
  { name: "HTTPS", kind: "custom", url: "https://example.com/path", target: "https://example.com" },
  { name: "a port and URL credentials", kind: "slack", url: legacyUrl, target: origin },
  {
    name: "IPv6",
    kind: "custom",
    url: "http://[2001:db8::1]:8080/path",
    target: "http://[2001:db8::1]:8080",
  },
  { name: "an invalid URL", kind: "custom", url: "invalid destination", target: "webhook:hook-id" },
  {
    name: "a non-HTTP URL",
    kind: "custom",
    url: "ftp://example.com/path",
    target: "webhook:hook-id",
  },
  { name: "Telegram", kind: "telegram", url: "-1001234567890", target: "telegram:hook-id" },
] as const) {
  test(`getWebhookAuditTarget masks ${name}`, () => {
    assert.equal(getWebhookAuditTarget({ id: "hook-id", kind, url }), target);
  });
}
