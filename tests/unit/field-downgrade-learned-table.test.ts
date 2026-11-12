// applyFieldDowngradeRecovery records a field in an in-memory table (provider + model) only when
// the retry without that field succeeds. A caller reads the table before its first send to skip
// the paid-twice 4xx round trip. A 400 that names no field, or a retry that fails, teaches nothing.
import test from "node:test";
import assert from "node:assert/strict";
import * as recovery from "../../open-sse/executors/base/fieldDowngradeRecovery.ts";

const URL_ = "https://api.example.test/v1/chat/completions";

function run(
  provider: string,
  model: string,
  body: Record<string, unknown>,
  errorBody: string,
  retryStatus: number
) {
  const sent: string[] = [];
  return recovery
    .applyFieldDowngradeRecovery({
      response: new Response(errorBody, { status: 400 }),
      url: URL_,
      provider,
      model,
      body,
      fetchOptions: {},
      fetchFn: async (_url, options) => {
        sent.push(String(options.body));
        return new Response("{}", { status: retryStatus });
      },
      serializeBody: (b) => JSON.stringify(b),
      strippedFields: new Set<string>(),
    })
    .then((response) => ({ response, sent }));
}

const VERBOSITY_400 = '{"error":"verbosity: Extra inputs are not permitted"}';
const learned = (provider: string, model: string) =>
  recovery.getLearnedStrippedFields(provider, model);

test.beforeEach(() => recovery.__clearLearnedStrippedFieldsForTests());

test("a field whose removal fixed the request is remembered for that provider and model", async () => {
  const { response } = await run(
    "p1",
    "m1",
    { verbosity: "low", messages: [] },
    VERBOSITY_400,
    200
  );
  assert.equal(response.status, 200);
  assert.deepEqual(learned("p1", "m1"), ["verbosity"]);
  assert.deepEqual(learned("p1", "other-model"), []);
  assert.deepEqual(learned("other-provider", "m1"), []);
});

test("a message-level field is remembered under its wildcard name", async () => {
  const detail = JSON.stringify({
    detail: [{ type: "extra_forbidden", loc: ["body", "messages", 0, "reasoning_content"] }],
  });
  await run(
    "p2",
    "m2",
    { messages: [{ role: "user", content: "hi", reasoning_content: "x" }] },
    detail,
    200
  );
  assert.deepEqual(learned("p2", "m2"), ["messages.*.reasoning_content"]);
});

test("a retry that fails teaches nothing", async () => {
  await run("p3", "m3", { verbosity: "low", messages: [] }, VERBOSITY_400, 400);
  assert.deepEqual(learned("p3", "m3"), []);
});

test("a 400 that names no field teaches nothing", async () => {
  const { sent } = await run(
    "p4",
    "m4",
    { verbosity: "low", messages: [] },
    '{"error":"bad"}',
    200
  );
  assert.deepEqual(sent, []);
  assert.deepEqual(learned("p4", "m4"), []);
});

test("a remembered field expires after an hour", async () => {
  const realNow = Date.now;
  const t0 = realNow.call(Date);
  try {
    Date.now = () => t0;
    await run("p5", "m5", { verbosity: "low", messages: [] }, VERBOSITY_400, 200);
    Date.now = () => t0 + 59 * 60_000;
    assert.deepEqual(learned("p5", "m5"), ["verbosity"]);
    Date.now = () => t0 + 61 * 60_000;
    assert.deepEqual(learned("p5", "m5"), []);
  } finally {
    Date.now = realNow;
  }
});

test("a protected field is never remembered", async () => {
  const sent: string[] = [];
  await recovery.applyFieldDowngradeRecovery({
    response: new Response('{"error":"service_tier: Extra inputs are not permitted"}', {
      status: 400,
    }),
    url: URL_,
    provider: "p6",
    model: "m6",
    body: { service_tier: "priority", messages: [] },
    fetchOptions: {},
    fetchFn: async (_u, o) => {
      sent.push(String(o.body));
      return new Response("{}", { status: 200 });
    },
    serializeBody: (b) => JSON.stringify(b),
    strippedFields: new Set<string>(),
    protectedFields: ["service_tier"],
  });
  assert.deepEqual(learned("p6", "m6"), []);
});
