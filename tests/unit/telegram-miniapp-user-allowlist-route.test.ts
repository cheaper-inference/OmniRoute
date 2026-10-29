/**
 * Route-level guard for the opt-in Telegram user allowlist: with
 * TELEGRAM_USER_ALLOWLIST_ENABLED=true a Mini App request whose initData is
 * genuinely signed but whose user is not listed is refused with 403 before any
 * key is minted or chat is proxied.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";

const BOT_TOKEN = "123456:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const ENV_KEYS = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_USER_ALLOWLIST_ENABLED",
  "TELEGRAM_ALLOWED_USER_IDS",
] as const;
const saved: Record<string, string | undefined> = {};

let POST: (req: Request) => Promise<Response>;

function signedInitData(userId: number): string {
  const fields: Record<string, string> = {
    auth_date: String(Math.floor(Date.now() / 1000)),
    user: JSON.stringify({ id: userId, first_name: "T" }),
  };
  const pairs = Object.entries(fields).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
  const dataCheckString = pairs.map(([k, v]) => `${k}=${v}`).join("\n");
  const secretKey = createHmac("sha256", "WebAppData").update(BOT_TOKEN).digest();
  const hash = createHmac("sha256", secretKey).update(dataCheckString).digest("hex");
  return [...pairs, ["hash", hash]]
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

before(async () => {
  for (const key of ENV_KEYS) saved[key] = process.env[key];
  process.env.TELEGRAM_BOT_TOKEN = BOT_TOKEN;
  POST = (await import("../../src/app/api/telegram/update/route.ts")).POST as typeof POST;
});

after(() => {
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

test("Mini App user not on the enabled allowlist gets 403", async () => {
  process.env.TELEGRAM_USER_ALLOWLIST_ENABLED = "true";
  process.env.TELEGRAM_ALLOWED_USER_IDS = "1001";

  const res = await POST(
    new Request("https://example.test/api/telegram/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ initData: signedInitData(777001), message: "hi" }),
    })
  );

  assert.equal(res.status, 403);
  assert.deepEqual(await res.json(), { ok: false, error: "Telegram user not allowed" });
});
