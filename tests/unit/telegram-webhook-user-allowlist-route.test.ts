/**
 * Route-level guard for the opt-in Telegram user allowlist on the bot webhook
 * path: with TELEGRAM_USER_ALLOWLIST_ENABLED=true a correctly signed update
 * (valid secret_token) from an unlisted sender is acknowledged and dropped
 * before any reply is sent; the sender is checked, not the (group) chat.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";

const BOT_TOKEN = "123456:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const SECRET = "webhook-secret";
const ENV_KEYS = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_WEBHOOK_SECRET",
  "TELEGRAM_BOT_API_BASE",
  "TELEGRAM_USER_ALLOWLIST_ENABLED",
  "TELEGRAM_ALLOWED_USER_IDS",
] as const;
const saved: Record<string, string | undefined> = {};
let realFetch: typeof fetch;
let botApiCalls: string[] = [];

let POST: (req: Request) => Promise<Response>;

before(async () => {
  for (const key of ENV_KEYS) saved[key] = process.env[key];
  process.env.TELEGRAM_BOT_TOKEN = BOT_TOKEN;
  process.env.TELEGRAM_WEBHOOK_SECRET = SECRET;
  process.env.TELEGRAM_BOT_API_BASE = "http://telegram.test";
  POST = (await import("../../src/app/api/telegram/update/route.ts")).POST as typeof POST;
  realFetch = globalThis.fetch;
  // Stub after the import: importing the route installs the proxy-aware global fetch.
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    botApiCalls.push(String(input));
    return new Response(JSON.stringify({ ok: true, result: { message_id: 1 } }), {
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
});

after(() => {
  globalThis.fetch = realFetch;
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

// "/help" is answered with a canned sendMessage, so no chat proxy is involved.
async function deliver(chatId: number, fromId?: number): Promise<number> {
  botApiCalls = [];
  const message: Record<string, unknown> = {
    message_id: 7,
    chat: { id: chatId, type: chatId < 0 ? "group" : "private" },
    date: 1,
    text: "/help",
  };
  if (fromId !== undefined) message.from = { id: fromId, is_bot: false, first_name: "T" };
  const res = await POST(
    new Request("https://example.test/api/telegram/update", {
      method: "POST",
      headers: { "content-type": "application/json", "x-telegram-bot-api-secret-token": SECRET },
      body: JSON.stringify({ update_id: 1, message }),
    })
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  await new Promise((resolve) => setTimeout(resolve, 50));
  return botApiCalls.filter((url) => url.endsWith("/sendMessage")).length;
}

test("webhook: with the allowlist enabled only listed senders get a reply", async () => {
  process.env.TELEGRAM_USER_ALLOWLIST_ENABLED = "true";
  process.env.TELEGRAM_ALLOWED_USER_IDS = "1001";

  assert.equal(await deliver(1001, 1001), 1);
  assert.equal(await deliver(777001, 777001), 0);
  assert.equal(await deliver(-100123, 1001), 1);
  assert.equal(await deliver(-100123, 777001), 0);
  assert.equal(await deliver(-100124), 0);
});

test("webhook: with the allowlist off every sender still gets a reply", async () => {
  process.env.TELEGRAM_USER_ALLOWLIST_ENABLED = "false";
  process.env.TELEGRAM_ALLOWED_USER_IDS = "1001";

  assert.equal(await deliver(777001, 777001), 1);
  assert.equal(await deliver(-100124), 1);
});
