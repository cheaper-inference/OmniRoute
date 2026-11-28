import test from "node:test";
import assert from "node:assert/strict";
import { CodexHandler } from "../../src/mitm/handlers/codex.ts";
import { runHandler } from "./_mitmHandlerHarness.ts";

test("codex handler — forwards Chat Completions payload via OmniRoute", async () => {
  const r = await runHandler(new CodexHandler(), { model: "gpt-4.1", messages: [] }, "gpt-4o-mini");
  assert.ok(r.fetchCalled);
  assert.equal(r.status, 200);
  assert.ok(r.fetchUrl?.endsWith("/v1/chat/completions"));
  const sent = JSON.parse(r.fetchBody);
  assert.equal(sent.model, "gpt-4o-mini");
});

test("codex handler preserves the Responses payload and forwards the mapped model", async () => {
  const r = await runHandler(
    new CodexHandler(),
    { model: "gpt-5", input: "hello", stream: true },
    "provider/mapped",
    {
      url: "/backend-api/codex/responses",
      upstreamBody: 'event: response.completed\ndata: {"type":"response.completed"}\n\n',
    }
  );
  assert.equal(r.status, 200);
  assert.ok(r.fetchUrl?.endsWith("/v1/responses"));
  assert.deepEqual(JSON.parse(r.fetchBody), {
    model: "provider/mapped",
    input: "hello",
    stream: true,
  });
  assert.match(r.responseChunks.join(""), /event: response.completed/);
});
