import test from "node:test";
import assert from "node:assert/strict";

const { guardAbandonedBody, resolveAbandonedBodyLimits } =
  await import("../../open-sse/handlers/chatCore/abandonedBodyGuard.ts");

const LIMITS = { unreadMs: 30, inactivityMs: 60 };

function source(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let index = 0;
  return new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (index >= chunks.length) return controller.close();
        controller.enqueue(encoder.encode(chunks[index++]));
      },
    },
    { highWaterMark: 0 }
  );
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("a fully read body ends with a clean EOF and finalizes once", async () => {
  let calls = 0;
  const reader = guardAbandonedBody(source(["a", "b"]), () => calls++, LIMITS).getReader();
  const seen: string[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    seen.push(new TextDecoder().decode(value));
  }
  assert.deepEqual(seen, ["a", "b"]);
  assert.equal(calls, 1);
  await sleep(120);
  assert.equal(calls, 1, "no late timer may finalize again");
});

test("an upstream error reaches the reader and finalizes once", async () => {
  let calls = 0;
  const failing = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(new Error("upstream reset"));
    },
  });
  const reader = guardAbandonedBody(failing, () => calls++, LIMITS).getReader();
  await assert.rejects(reader.read(), /upstream reset/);
  assert.equal(calls, 1);
});

test("expiry is an error, never a clean EOF", async () => {
  let calls = 0;
  const body = guardAbandonedBody(source(["a", "b"]), () => calls++, LIMITS);
  await sleep(100);
  assert.equal(calls, 1);
  await assert.rejects(body.getReader().read(), /abandoned/);
});

test("cancel finalizes once and stops the timer", async () => {
  let calls = 0;
  const body = guardAbandonedBody(source(["a"]), () => calls++, LIMITS);
  await body.cancel("client gone");
  await sleep(100);
  assert.equal(calls, 1);
});

test("limits come from the environment, with 0 allowed and bad values ignored", () => {
  const saved = [
    process.env.PROVIDER_BODY_UNREAD_TIMEOUT_MS,
    process.env.PROVIDER_BODY_INACTIVITY_TIMEOUT_MS,
  ];
  try {
    delete process.env.PROVIDER_BODY_UNREAD_TIMEOUT_MS;
    delete process.env.PROVIDER_BODY_INACTIVITY_TIMEOUT_MS;
    assert.deepEqual(resolveAbandonedBodyLimits(), { unreadMs: 30_000, inactivityMs: 300_000 });
    process.env.PROVIDER_BODY_UNREAD_TIMEOUT_MS = "0";
    process.env.PROVIDER_BODY_INACTIVITY_TIMEOUT_MS = "not-a-number";
    assert.deepEqual(resolveAbandonedBodyLimits(), { unreadMs: 0, inactivityMs: 300_000 });
    process.env.PROVIDER_BODY_UNREAD_TIMEOUT_MS = "-5";
    process.env.PROVIDER_BODY_INACTIVITY_TIMEOUT_MS = "1500";
    assert.deepEqual(resolveAbandonedBodyLimits(), { unreadMs: 30_000, inactivityMs: 1500 });
  } finally {
    for (const [name, value] of [
      ["PROVIDER_BODY_UNREAD_TIMEOUT_MS", saved[0]],
      ["PROVIDER_BODY_INACTIVITY_TIMEOUT_MS", saved[1]],
    ] as const) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});
