// A 4xx that names a request field is fixed by retrying without it. The next request to the
// same provider and model must not pay that round trip again: the field is dropped before the
// first send. Only a retry that succeeds teaches the table, and the table is per model.
import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { __clearLearnedStrippedFieldsForTests } from "../../open-sse/executors/base/fieldDowngradeRecovery.ts";

const realFetch = globalThis.fetch;
const realDelay = BaseExecutor.RETRY_CONFIG.delayMs;

type Handler = (body: string) => Response;

function stub(handler: Handler): string[] {
  const bodies: string[] = [];
  globalThis.fetch = (async (_url: RequestInfo | URL, init?: RequestInit) => {
    const body = String(init?.body ?? "");
    if (!body) return new Response("{}", { status: 200 });
    bodies.push(body);
    return handler(body);
  }) as typeof fetch;
  return bodies;
}

const rejectsVerbosity: Handler = (body) =>
  body.includes('"verbosity"')
    ? new Response('{"error":"verbosity: Extra inputs are not permitted"}', { status: 400 })
    : new Response("{}", { status: 200 });

async function send(model: string, extra: Record<string, unknown> = { verbosity: "low" }) {
  return new DefaultExecutor("openai").execute({
    model,
    body: { model, messages: [{ role: "user", content: "hi" }], ...extra },
    stream: false,
    credentials: { apiKey: "k", connectionId: `learn-${model}`, providerSpecificData: {} },
  } as never);
}

test.beforeEach(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = 1;
  __clearLearnedStrippedFieldsForTests();
});
test.afterEach(() => {
  BaseExecutor.RETRY_CONFIG.delayMs = realDelay;
  globalThis.fetch = realFetch;
});

test("a field the upstream rejected is not sent again on the next request", async () => {
  const bodies = stub(rejectsVerbosity);
  const first = await send("learn-model-a");
  assert.equal(first.response.status, 200);
  assert.deepEqual(
    bodies.map((b) => b.includes('"verbosity"')),
    [true, false]
  );
  bodies.length = 0;
  const second = await send("learn-model-a");
  assert.equal(second.response.status, 200);
  assert.deepEqual(
    bodies.map((b) => b.includes('"verbosity"')),
    [false],
    "the second request must go out once, without the rejected field"
  );
});

test("the learned field is scoped to the model", async () => {
  const bodies = stub(rejectsVerbosity);
  await send("learn-model-b");
  bodies.length = 0;
  await send("learn-model-c");
  assert.equal(bodies[0]?.includes('"verbosity"'), true, "another model still sends the field");
});

test("a retry that also fails teaches nothing", async () => {
  const bodies = stub((body) =>
    body.includes('"verbosity"')
      ? new Response('{"error":"verbosity: Extra inputs are not permitted"}', { status: 400 })
      : new Response('{"error":"something else is wrong"}', { status: 400 })
  );
  await send("learn-model-d");
  bodies.length = 0;
  await send("learn-model-d");
  assert.equal(bodies[0]?.includes('"verbosity"'), true, "no success, so the field stays in");
});

test("a 400 that does not name a field teaches nothing", async () => {
  const bodies = stub(() => new Response('{"error":"bad request"}', { status: 400 }));
  await send("learn-model-e");
  bodies.length = 0;
  await send("learn-model-e");
  assert.equal(bodies[0]?.includes('"verbosity"'), true);
});
