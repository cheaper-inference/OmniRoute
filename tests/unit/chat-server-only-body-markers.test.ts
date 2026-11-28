// @ts-nocheck
// The upstream-only marker is set by the combo on the body it dispatches itself. A client can put
// the same JSON field in its own request; that must never switch the audit trail off. The route
// entry discards every server-only field before anything reads the body.
import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const previousDataDir = process.env.DATA_DIR;
const h = await createChatPipelineHarness("server-only-body-markers");
const { getPendingById } = await import("../../src/lib/usage/usageHistory.ts");
const { SUPPRESS_REQUEST_PERSISTENCE_FIELD } =
  await import("../../open-sse/services/combo/requestPersistence.ts");

const SENTINEL = "SERVER-ONLY-MARKER-SENTINEL-4711";

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
});
test.after(async () => {
  await h.cleanup();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

test("a client-supplied upstream-only marker does not keep the request out of the call log or the preview", async () => {
  await h.seedConnection("openai");
  const upstream: string[] = [];
  const previews: string[] = [];
  globalThis.fetch = async (_url, init = {}) => {
    upstream.push(String(init.body ?? ""));
    previews.push(JSON.stringify([...getPendingById().values()]));
    return h.buildOpenAIResponse("ok");
  };
  const response = await h.handleChat(
    h.buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: SENTINEL }],
        [SUPPRESS_REQUEST_PERSISTENCE_FIELD]: true,
      },
    })
  );
  assert.equal(response.status, 200);
  assert.ok(upstream.length > 0, "the request must reach the upstream");
  assert.ok(upstream.every((payload) => !payload.includes(SUPPRESS_REQUEST_PERSISTENCE_FIELD)));
  assert.ok(
    previews.some((preview) => preview.includes(SENTINEL)),
    "the live preview must show the client's request"
  );
  const log = await h.waitFor(async () => {
    const row = await h.getLatestCallLog();
    return row?.requestBody ? row : null;
  }, 10_000);
  assert.ok(log, "the call log must keep the request body");
  assert.ok(JSON.stringify(log.requestBody).includes(SENTINEL));
});

test("every server-only field is discarded and the caller's object is left alone", async () => {
  const { discardServerOnlyBodyFields, SERVER_ONLY_BODY_FIELDS } =
    await import("../../src/sse/handlers/chat/serverOnlyBodyFields.ts");
  const input: Record<string, unknown> = { model: "m", keep: 1 };
  for (const field of SERVER_ONLY_BODY_FIELDS) input[field] = true;
  assert.ok(SERVER_ONLY_BODY_FIELDS.includes(SUPPRESS_REQUEST_PERSISTENCE_FIELD));
  const cleaned = discardServerOnlyBodyFields(input);
  assert.deepEqual(cleaned, { model: "m", keep: 1 });
  assert.equal(SUPPRESS_REQUEST_PERSISTENCE_FIELD in input, true);
  assert.equal(discardServerOnlyBodyFields(null), null);
  assert.equal(discardServerOnlyBodyFields("text"), "text");
});
