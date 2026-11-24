/**
 * KEA-9386: the limits and the wording the Custom webhook dialog shows inline are the ones
 * the API enforces.
 *
 * - POST /api/webhooks and PUT /api/webhooks/[id] refuse a `url` over WEBHOOK_URL_MAX_LENGTH
 *   and a `secret` over WEBHOOK_SECRET_MAX_LENGTH, naming the field; values at the limit and
 *   the 340 / 400 character values of the ticket are accepted and stored whole.
 * - POST /api/webhooks/validate-url tells "not a URL" apart from "blocked private address":
 *   it used to answer `blocked_private` for plain text, so the form told the user that
 *   `not-a-url` was a private address.
 */

import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-webhook-limits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");
const { updateSettings } = await import("../../../../src/lib/db/settings.ts");
await updateSettings({ requireLogin: false });

const webhooksRoute = await import("../../../../src/app/api/webhooks/route.ts");
const webhookByIdRoute = await import("../../../../src/app/api/webhooks/[id]/route.ts");
const validateUrlRoute = await import("../../../../src/app/api/webhooks/validate-url/route.ts");
const { getWebhook } = await import("../../../../src/lib/db/webhooks.ts");
const { WEBHOOK_SECRET_MAX_LENGTH, WEBHOOK_URL_MAX_LENGTH } =
  await import("../../../../src/shared/constants/formLimits.ts");

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function jsonRequest(url: string, method: string, body: unknown): Request {
  return new Request(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const urlOfLength = (length: number) => {
  const prefix = "https://example.com/hook/";
  return prefix + "a".repeat(length - prefix.length);
};

const create = (body: unknown) =>
  webhooksRoute.POST(jsonRequest("http://localhost/api/webhooks", "POST", body));
const update = (id: string, body: unknown) =>
  webhookByIdRoute.PUT(jsonRequest(`http://localhost/api/webhooks/${id}`, "PUT", body), {
    params: Promise.resolve({ id }),
  });
const validateUrl = async (url: string) => {
  const res = await validateUrlRoute.POST(
    jsonRequest("http://localhost/api/webhooks/validate-url", "POST", { url })
  );
  return { status: res.status, body: await res.json() };
};

describe("webhook field limits shared with the dashboard form", () => {
  it("exposes the limits the routes enforce", () => {
    assert.equal(WEBHOOK_URL_MAX_LENGTH, 2000);
    assert.equal(WEBHOOK_SECRET_MAX_LENGTH, 500);
  });

  it("POST stores the ticket's 340-character URL and 400-character secret whole", async () => {
    const url = urlOfLength(340);
    const secret = "s".repeat(400);
    const res = await create({ kind: "custom", url, secret });
    assert.equal(res.status, 201);
    const { webhook } = await res.json();
    const stored = getWebhook(webhook.id);
    assert.equal(stored?.url, url);
    assert.equal(stored?.secret?.length, 400, "the secret is not truncated on the way in");
  });

  it("POST accepts values exactly at the limits", async () => {
    const res = await create({
      kind: "custom",
      url: urlOfLength(WEBHOOK_URL_MAX_LENGTH),
      secret: "s".repeat(WEBHOOK_SECRET_MAX_LENGTH),
    });
    assert.equal(res.status, 201);
  });

  it("POST refuses a URL over the limit, naming the field", async () => {
    const res = await create({ kind: "custom", url: urlOfLength(WEBHOOK_URL_MAX_LENGTH + 1) });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.ok(body.error.details.some((detail: { field: string }) => detail.field === "url"));
  });

  it("POST refuses a secret over the limit, naming the field", async () => {
    const res = await create({
      kind: "custom",
      url: "https://example.com/hook",
      secret: "s".repeat(WEBHOOK_SECRET_MAX_LENGTH + 1),
    });
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.deepEqual(
      body.error.details.map((detail: { field: string }) => detail.field),
      ["secret"]
    );
  });

  it("PUT enforces the same limits", async () => {
    const created = await create({ kind: "custom", url: "https://example.com/hook" });
    const { webhook } = await created.json();

    const longUrl = await update(webhook.id, { url: urlOfLength(WEBHOOK_URL_MAX_LENGTH + 1) });
    assert.equal(longUrl.status, 400);
    const longSecret = await update(webhook.id, {
      secret: "s".repeat(WEBHOOK_SECRET_MAX_LENGTH + 1),
    });
    assert.equal(longSecret.status, 400);
    const atLimit = await update(webhook.id, {
      url: urlOfLength(WEBHOOK_URL_MAX_LENGTH),
      secret: "s".repeat(WEBHOOK_SECRET_MAX_LENGTH),
    });
    assert.equal(atLimit.status, 200);
  });
});

describe("POST /api/webhooks/validate-url — reason", () => {
  it("answers invalid_url for text that is not a URL", async () => {
    for (const url of ["not-a-url", "<script>x</script> %% 😀", "ftp://example.com/hook"]) {
      const { status, body } = await validateUrl(url);
      assert.equal(status, 200);
      assert.deepEqual(body, { valid: false, reason: "invalid_url" }, url);
    }
  });

  it("answers blocked_private for a private address", async () => {
    const { body } = await validateUrl("http://127.0.0.1:20128/hook");
    assert.deepEqual(body, { valid: false, reason: "blocked_private" });
  });

  it("accepts a public https URL and refuses one over the limit", async () => {
    assert.deepEqual((await validateUrl("https://example.com/hook")).body, { valid: true });
    assert.equal((await validateUrl(urlOfLength(WEBHOOK_URL_MAX_LENGTH + 1))).status, 400);
  });
});
