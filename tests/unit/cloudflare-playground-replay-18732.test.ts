import test from "node:test";
import assert from "node:assert/strict";
import {
  CfStreamParser,
  CloudflarePlaygroundExecutor,
  type CfTransport,
} from "../../open-sse/executors/cloudflare-playground.ts";

const CID = "chatcmpl-cfp-repro18732";
const frame = (body: unknown, extra: Record<string, unknown> = {}) =>
  JSON.stringify({
    id: CID,
    type: "cf_agent_use_chat_response",
    body: JSON.stringify(body),
    ...extra,
  });
const delta = (d: string, extra: Record<string, unknown> = {}) =>
  frame({ type: "text-delta", id: "t1", delta: d }, extra);

function collect(frames: string[]) {
  const p = new CfStreamParser(CID);
  const out: string[] = [];
  for (const f of frames) {
    const ev = p.push(f);
    if (ev?.type === "content") out.push(ev.value!);
  }
  return { out, text: p.text };
}

test("replay:true copies of already-seen chunks are emitted only once", () => {
  const { out } = collect([
    delta("How", { seq: 0 }),
    delta("How", { seq: 0, replay: true }),
    delta(" can", { seq: 1 }),
    delta(" can", { seq: 1, replay: true }),
  ]);
  assert.deepEqual(out, ["How", " can"]);
});

test("same seq delivered twice (no replay flag) is emitted only once", () => {
  const { out } = collect([delta("blue", { seq: 3 }), delta("blue", { seq: 3 })]);
  assert.deepEqual(out, ["blue"]);
});

test("legit repeated tokens with distinct seq are still both emitted (guard)", () => {
  const { out } = collect([delta("ha", { seq: 0 }), delta("ha", { seq: 1 })]);
  assert.deepEqual(out, ["ha", "ha"]);
});

test("frames without seq/replay are untouched", () => {
  const { out } = collect([delta("a"), delta("a")]);
  assert.deepEqual(out, ["a", "a"]);
});

test("seq carried inside the body is honoured", () => {
  const f = (seq: number) => frame({ type: "text-delta", id: "t1", delta: "x", seq });
  const { out } = collect([f(0), f(0), f(1)]);
  assert.deepEqual(out, ["x", "x"]);
});

test("non-stream: executor output has no doubled text when upstream replays", async () => {
  const frames = [
    delta("ok", { seq: 0 }),
    delta("ok", { seq: 0, replay: true }),
    JSON.stringify({ id: CID, type: "cf_agent_use_chat_response", done: true, body: "" }),
  ];
  let cid = "";
  const ex = new CloudflarePlaygroundExecutor((chatId) => {
    cid = chatId;
    const t: CfTransport = {
      async start() {
        return { ok: true };
      },
      async *frames() {
        for (const f of frames) yield f.replace(CID, cid);
      },
      async close() {},
    };
    return t;
  });
  const res = await ex.execute({
    model: "cfp/qwen/qwen3-30b-a3b-fp8",
    body: { model: "qwen/qwen3-30b-a3b-fp8", messages: [{ role: "user", content: "Reply: ok" }] },
    stream: false,
    credentials: {},
    signal: null,
  } as never);
  const json = await res.response.json();
  assert.equal(json.choices[0].message.content, "ok");
});
