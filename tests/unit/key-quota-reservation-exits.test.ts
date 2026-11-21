// A key-quota rpm reservation is taken when the chat policy admits a call. withChatAdmission
// must give the slot back on EVERY way the call can end, or the key locks itself out.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-exits-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const quotaDb = await import("../../src/lib/db/keyQuota.ts");
const quota = await import("../../src/domain/keyQuota.ts");
const { withChatAdmission } = await import("../../src/sse/handlers/chatAdmission.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

type Exit =
  | "ok"
  | "upstream-error"
  | "throw"
  | "client-error"
  | "sse-done"
  | "sse-cancel"
  | "sse-abort"
  | "sse-error";
const EXITS: Exit[] = [
  "ok",
  "upstream-error",
  "throw",
  "client-error",
  "sse-done",
  "sse-cancel",
  "sse-abort",
  "sse-error",
];

function sseResponse(failAfterFirstChunk = false): Response {
  let sent = 0;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (failAfterFirstChunk && sent === 1) return controller.error(new Error("upstream died"));
      if (sent++ < 3) controller.enqueue(new TextEncoder().encode("data: x\n\n"));
      else controller.close();
    },
  });
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}

/** One chat call: admit through the quota gate, hold the slot, then end the way `exit` says. */
async function callOnce(keyId: string, exit: Exit): Promise<{ admitted: boolean }> {
  let admitted = false;
  const handle = withChatAdmission(async (_req, _raw, _body, _cid, ctx) => {
    const verdict = quota.checkKeyQuota(keyId);
    if (!verdict.allowed) return new Response("quota", { status: 429 });
    admitted = true;
    ctx.holdKeyQuota(verdict.reservation!);
    if (exit === "throw") throw new Error("handler blew up");
    if (exit === "client-error") return new Response("rejected later", { status: 400 });
    if (exit === "upstream-error") return new Response("bad gateway", { status: 502 });
    if (exit === "ok") return Response.json({ ok: true });
    return sseResponse(exit === "sse-error");
  });
  const abort = new AbortController();
  let response: Response | null = null;
  try {
    response = await handle({}, null, null, undefined, abort.signal);
  } catch {
    // the "throw" exit
  }
  if (exit === "sse-done") await response!.text();
  if (exit === "sse-error") await response!.text().catch(() => undefined);
  if (exit === "sse-cancel") await response!.body!.cancel();
  if (exit === "sse-abort") abort.abort();
  return { admitted };
}

for (const exit of EXITS) {
  test(`exit ${exit}: the slot is released and a later call is admitted`, async () => {
    const keyId = `exit-${exit}`;
    quotaDb.upsertKeyQuotaLimits(keyId, { rpmLimit: 1 });
    assert.equal((await callOnce(keyId, exit)).admitted, true);
    assert.equal(quota.countKeyQuotaReservations(keyId), 0, "no slot may stay held");
    assert.equal((await callOnce(keyId, "ok")).admitted, true, "the later call is admitted");
  });
}

test("while an SSE call is still streaming, its slot stays held", async () => {
  quotaDb.upsertKeyQuotaLimits("streaming", { rpmLimit: 1 });
  const handle = withChatAdmission(async (_req, _raw, _body, _cid, ctx) => {
    ctx.holdKeyQuota(quota.checkKeyQuota("streaming").reservation!);
    return sseResponse();
  });
  const response = await handle({}, null, null, undefined, undefined);
  assert.equal(quota.checkKeyQuota("streaming", { reserve: false }).allowed, false);
  await response.text();
  assert.equal(quota.countKeyQuotaReservations("streaming"), 0);
});

test("1000 mixed calls, three at a time at limit 3: every call is admitted and nothing leaks", async () => {
  quotaDb.upsertKeyQuotaLimits("mixed", { rpmLimit: 3 });
  let admitted = 0;
  for (let i = 0; i < 1000; i += 3) {
    const wave = [i, i + 1, i + 2].filter((n) => n < 1000);
    const results = await Promise.all(wave.map((n) => callOnce("mixed", EXITS[n % EXITS.length])));
    admitted += results.filter((r) => r.admitted).length;
  }
  assert.equal(admitted, 1000, `admitted ${admitted} of 1000: a slot leaked`);
  assert.equal(quota.countKeyQuotaReservations("mixed"), 0);
  const slots = [1, 2, 3, 4].map(() => quota.checkKeyQuota("mixed").allowed);
  assert.deepEqual(slots, [true, true, true, false], "the limit still holds after 1000 calls");
});
