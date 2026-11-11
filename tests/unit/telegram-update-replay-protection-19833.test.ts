import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createHmac } from "node:crypto";
import { clearInitDataReplayCache } from "../../src/lib/telegram/initData";

const BOT_TOKEN = "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghij";
const ENV_KEYS = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_USER_ALLOWLIST_ENABLED",
  "TELEGRAM_ALLOWED_USER_IDS",
  "TELEGRAM_INITDATA_ANTI_REPLAY",
];
const saved: Record<string, string | undefined> = {};

let POST: (req: Request) => Promise<Response>;

function signedInitData(userId: number, authDateSec = Math.floor(Date.now() / 1000)): string {
  const fields: Record<string, string> = {
    auth_date: String(authDateSec),
    query_id: `qid-${userId}-${Date.now()}`,
    user: JSON.stringify({ id: userId, first_name: "Tester" }),
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
  process.env.TELEGRAM_USER_ALLOWLIST_ENABLED = "true";
  process.env.TELEGRAM_ALLOWED_USER_IDS = "1001";
  process.env.TELEGRAM_INITDATA_ANTI_REPLAY = "true";
  POST = (await import("../../src/app/api/telegram/update/route.ts")).POST as typeof POST;
});

after(() => {
  clearInitDataReplayCache();
  for (const key of ENV_KEYS) {
    if (saved[key] === undefined) delete process.env[key];
    else process.env[key] = saved[key];
  }
});

test("replayed initData with identical message is rejected with 401 (issue #19833)", async () => {
  clearInitDataReplayCache();
  const initData = signedInitData(9999); // not in allowlist, so reaches authz check
  const body = { initData, message: "hello bot" };

  // 1st request: passes signature check, reaches allowlist check and returns 403 (authenticating user 9999)
  const res1 = await POST(
    new Request("https://example.test/api/telegram/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
  assert.equal(res1.status, 403);
  assert.deepEqual(await res1.json(), { ok: false, error: "Telegram user not allowed" });

  // 2nd request (exact replay): rejected at signature level due to anti-replay
  const res2 = await POST(
    new Request("https://example.test/api/telegram/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
  assert.equal(res2.status, 401);
  assert.deepEqual(await res2.json(), { ok: false, error: "Invalid initData signature" });

  // 3rd request with different message from same session: passes anti-replay
  const res3 = await POST(
    new Request("https://example.test/api/telegram/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ initData, message: "different message" }),
    })
  );
  assert.equal(res3.status, 403); // passed signature check
});

test("initData with future auth_date (e.g. 2099) is rejected with 401 (issue #19833)", async () => {
  clearInitDataReplayCache();
  const futureInitData = signedInitData(9999, 4102444800); // 2099
  const res = await POST(
    new Request("https://example.test/api/telegram/update", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ initData: futureInitData, message: "hello" }),
    })
  );
  assert.equal(res.status, 401);
  assert.deepEqual(await res.json(), { ok: false, error: "Invalid initData signature" });
});
