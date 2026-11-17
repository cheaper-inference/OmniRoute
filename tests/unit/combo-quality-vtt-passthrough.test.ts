// Regression test: the combo quality validator must NOT reject non-JSON
// transcription bodies. gabistream (ether) requests response_format=vtt through
// the `stt` combo; the whisper.cpp upstreams answer HTTP 200 with a `text/vtt`
// body. validateResponseQuality used to JSON.parse every text/* response, so
// the valid WebVTT body was classified "response is not valid JSON", the combo
// failed over, and the client saw 502 — while the same request to a single
// provider/model passed through fine (direct models skip the quality gate).
import test from "node:test";
import assert from "node:assert/strict";
const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");
const silentLog = { warn: () => {} };

const WEBVTT_BODY = [
  "WEBVTT",
  "",
  "00:00:00.000 --> 00:00:04.640",
  ' "Well, I don\'t wish to see it anymore," observed Phoebe.',
  "",
  "00:00:04.640 --> 00:00:07.080",
  " It is certainly very like the old portrait.",
].join("\n");

function makeVttResponse(): Response {
  return new Response(WEBVTT_BODY, {
    status: 200,
    headers: { "content-type": "text/vtt" },
  });
}

test("#vtt-passthrough: combo validator passes a text/vtt 200 body instead of failing over", async () => {
  const res = makeVttResponse();
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, `expected vtt to pass; reason: ${out.reason}`);
});

test("#vtt-passthrough: combo validator passes vtt served as text/plain (srt-style) too", async () => {
  const res = new Response("1\n00:00:00,000 --> 00:00:04,640\nHello\n", {
    status: 200,
    headers: { "content-type": "text/plain" },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, true, `expected srt/plain text to pass; reason: ${out.reason}`);
});

test("#vtt-passthrough: JSON chat responses are still quality-checked (control)", async () => {
  const res = new Response(JSON.stringify({ choices: [{ message: { content: "" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
  const out = await validateResponseQuality(res, false, silentLog);
  assert.equal(out.valid, false, "an empty chat JSON body must keep failing the gate");
});
