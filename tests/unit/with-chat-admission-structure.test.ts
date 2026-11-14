import test from "node:test";
import assert from "node:assert/strict";

// withChatAdmission admits by body size only. A request that is small in bytes but heavy in structure
// (200 or more messages, or 64 or more tools) took no heavyweight lease on these routes, while
// /v1/chat/completions and /v1/responses call admitChatStructure for it (#9654). A body that reaches
// the large-body size already holds a lease, so only the small, structurally heavy body needs the check.
// It uses the same controller and the same lease, so this is not a second admission path.
const { ChatAdmissionController } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");
const { withChatAdmission } = await import("../../src/shared/middleware/withChatAdmission.ts");

function request(body: string): Request {
  return new Request("http://x/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": String(body.length) },
    body,
  });
}

const heavyBody = () =>
  JSON.stringify({ messages: Array.from({ length: 200 }, () => ({ role: "user", content: "x" })) });
const lightBody = () => JSON.stringify({ messages: [{ role: "user", content: "x" }] });

// Heap under pressure (the probe says so): a busy primary lease means the request waits, then is shed
// (queueMs 0). With a healthy heap admitChatStructure admits a busy request through its headroom budget
// (#10183, #10437); that path is unchanged and not what this test is about.
function busyController() {
  const controller = new ChatAdmissionController(1, undefined, 0);
  const held = controller.tryAcquireHeavy();
  assert.ok(held);
  return { controller, held };
}

test("a small but structurally heavy body is shed while heavyweight capacity is busy", async () => {
  const { controller, held } = busyController();
  let called = false;
  const wrapped = withChatAdmission(
    async () => {
      called = true;
      return new Response("ok");
    },
    { controller, queueMs: 0, heapPressureCheck: () => true }
  );
  const res = await wrapped(request(heavyBody()));
  assert.equal(called, false, "the handler must not run");
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error.code, "chat_admission_busy");
  assert.equal(controller.activeHeavy, 1, "only the original holder has a lease");
  held.release();
});

test("a small structurally heavy body holds a lease while the handler runs, then releases it", async () => {
  const controller = new ChatAdmissionController(1, undefined, 0);
  let activeDuringHandler = -1;
  const wrapped = withChatAdmission(
    async () => {
      activeDuringHandler = controller.activeHeavy;
      return new Response("ok");
    },
    { controller, queueMs: 0, heapPressureCheck: () => true }
  );
  const res = await wrapped(request(heavyBody()));
  assert.equal(res.status, 200);
  await res.text();
  assert.equal(activeDuringHandler, 1, "the structural lease is held during the handler");
  assert.equal(controller.activeHeavy, 0, "and released after it");
});

test("a light body is admitted without a lease even while capacity is busy", async () => {
  const { controller, held } = busyController();
  let called = false;
  const wrapped = withChatAdmission(
    async () => {
      called = true;
      return new Response("ok");
    },
    { controller, queueMs: 0, heapPressureCheck: () => true }
  );
  const res = await wrapped(request(lightBody()));
  assert.equal(res.status, 200);
  assert.equal(called, true);
  held.release();
});

test("the handler still receives the full body after the structure check", async () => {
  const controller = new ChatAdmissionController(1, undefined, 0);
  const body = heavyBody();
  let seen = "";
  const wrapped = withChatAdmission(
    async (req: Request) => {
      seen = await req.text();
      return new Response("ok");
    },
    { controller, queueMs: 0, heapPressureCheck: () => true }
  );
  await (await wrapped(request(body))).text();
  assert.equal(seen, body);
});

test("a body that is not JSON goes to the handler, which owns the error", async () => {
  const { controller, held } = busyController();
  let called = false;
  const wrapped = withChatAdmission(
    async () => {
      called = true;
      return new Response("bad", { status: 400 });
    },
    { controller, queueMs: 0, heapPressureCheck: () => true }
  );
  const res = await wrapped(request("not json"));
  assert.equal(called, true);
  assert.equal(res.status, 400);
  held.release();
});

test("a body at the large-body size is still decided by the byte lease alone", async () => {
  const controller = new ChatAdmissionController(1, undefined, 0);
  let activeDuringHandler = -1;
  const wrapped = withChatAdmission(
    async () => {
      activeDuringHandler = controller.activeHeavy;
      return new Response("ok");
    },
    {
      controller,
      queueMs: 0,
      heapPressureCheck: () => true,
      largeBodyBytes: 32,
      hardMaxBytes: 1024 * 1024,
    }
  );
  const res = await wrapped(request(heavyBody()));
  assert.equal(res.status, 200);
  assert.equal(activeDuringHandler, 1, "one lease, not two");
  assert.equal(controller.activeHeavy, 0);
});
