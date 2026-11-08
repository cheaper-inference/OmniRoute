import test from "node:test";
import assert from "node:assert/strict";
import { translateChunk } from "../../scripts/i18n/run-translation.mjs";

// A chunk the validator rejects used to be retried 3 times on the SAME model and then fail
// the whole doc. The fallback chain only engaged on HTTP errors. On 2026-10-27 the fallback
// model (Kimi) cut large markdown tables right after the header row ("table rows 1/9")
// under load, and one USER_GUIDE run took 6.6 h of retries. A rejected chunk now falls
// through the model chain and, as a last resort, is translated in smaller pieces.

const tableRow = (i: number) => `| \`VAR_${i}\` | \`value-${i}\` | row ${i} description text |`;
const table = (rows: number) =>
  [
    "| Variable | Default | Description |",
    "| -------- | ------- | ----------- |",
    ...Array.from({ length: rows }, (_, i) => tableRow(i)),
  ].join("\n");

// Translation stand-in: prose words get a marker, markdown structure and code spans stay.
const translate = (text: string) => text.replace(/description text/g, "texto de descrição");
// The defect being guarded against: only the header row survives.
const truncate = (text: string) => text.split("\n").slice(0, 1).join("\n");

function fakeCall(behaviour: (model: string, content: string) => string) {
  const calls: Array<{ model: string; length: number }> = [];
  const call = async (messages: Array<{ content: string }>, backend: { model: string }) => {
    const content = messages[1].content;
    calls.push({ model: backend.model, length: content.length });
    return behaviour(backend.model, content);
  };
  return { call, calls };
}

const backend = { model: "primary", fallbackModels: ["secondary"] };

test("a chunk the primary model keeps truncating is accepted from the next model", async () => {
  const chunk = table(9);
  const { call, calls } = fakeCall((model, content) =>
    model === "primary" ? truncate(content) : translate(content)
  );
  const text = await translateChunk(chunk, "system", backend, { call, label: "chunk 1/1" });
  assert.equal(text, translate(chunk));
  assert.deepEqual(
    calls.map((c) => c.model),
    ["primary", "primary", "primary", "secondary"]
  );
});

test("HTTP fallback inside one level still sees the rest of the chain", async () => {
  const seen: string[][] = [];
  const call = async (messages: Array<{ content: string }>, b: typeof backend) => {
    seen.push([b.model, ...(b.fallbackModels ?? [])]);
    return translate(messages[1].content);
  };
  await translateChunk(table(3), "system", backend, { call, label: "chunk 1/1" });
  assert.deepEqual(seen, [["primary", "secondary"]]);
});

test("a large chunk every model truncates is split and translated in smaller pieces", async () => {
  const chunk = table(80);
  assert.ok(chunk.length > 3000, "fixture must be big enough to split");
  // Every model truncates anything bigger than 2000 chars and translates smaller pieces.
  const { call, calls } = fakeCall((_model, content) =>
    content.length > 2000 ? truncate(content) : translate(content)
  );
  const text = await translateChunk(chunk, "system", backend, { call, label: "chunk 1/1" });
  assert.equal(text, translate(chunk), "rows, order and code spans survive the split");
  assert.ok(
    calls.some((c) => c.length <= 2000),
    "smaller pieces were requested"
  );
});

test("a small chunk that never validates still fails loudly instead of being written", async () => {
  const chunk = table(3);
  const { call } = fakeCall((_model, content) => truncate(content));
  await assert.rejects(
    translateChunk(chunk, "system", backend, { call, label: "chunk 2/5" }),
    /chunk 2\/5 failed validation: table rows 1\/5/
  );
});
