import test from "node:test";
import assert from "node:assert/strict";

const { convertClovaToOpenAI } =
  await import("../../open-sse/translator/response/clova-to-openai.ts");

type State = { upstreamError?: { status: number; type: string; code: string } };
type Chunk = { choices?: Array<{ delta?: { content?: string }; finish_reason?: string | null }> };

const errorFrame = (code: string) => ({ status: { code, message: "failed" }, result: null });

// Codes from the CLOVA Studio troubleshooting pages: 42900 to 42903 are HTTP 429.
for (const code of ["42900", "42901", "42902", "42903"]) {
  test(`CLOVA in-stream code ${code} maps to 429 rate_limit_error`, () => {
    const state: State = {};
    convertClovaToOpenAI(errorFrame(code), state);
    assert.equal(state.upstreamError?.status, 429);
    assert.equal(state.upstreamError?.type, "rate_limit_error");
  });
}

test("other 4xxxx CLOVA codes still map to 400", () => {
  const state: State = {};
  convertClovaToOpenAI(errorFrame("40100"), state);
  assert.equal(state.upstreamError?.status, 400);
  assert.equal(state.upstreamError?.type, "server_error");
});

test("a 5xxxx CLOVA code still maps to 502", () => {
  const state: State = {};
  convertClovaToOpenAI(errorFrame("50000"), state);
  assert.equal(state.upstreamError?.status, 502);
});

const resultFrame = (text: string) =>
  `id: a\nevent: result\ndata: ${JSON.stringify({
    message: { role: "assistant", content: text },
    finishReason: "stop",
    usage: { promptTokens: 2, completionTokens: 3, totalTokens: 5 },
  })}\n\n`;

const tokenFrame = (text: string) =>
  `id: a\nevent: token\ndata: ${JSON.stringify({ message: { role: "assistant", content: text }, finishReason: null })}\n\n`;

function textOf(chunks: Array<Chunk | Chunk[] | null>): string {
  return chunks
    .flat()
    .map((chunk) => chunk?.choices?.[0]?.delta?.content ?? "")
    .join("");
}

test("an event: result with no earlier token events still delivers the answer", () => {
  const state = {};
  const out = convertClovaToOpenAI(resultFrame("hello"), state) as Chunk[] | Chunk | null;
  const chunks = [out].flat();
  assert.equal(textOf(chunks), "hello");
  assert.equal(chunks.at(-1)?.choices?.[0]?.finish_reason, "stop");
});

test("a token stream followed by event: result still yields the answer once", () => {
  const state = {};
  const out = [tokenFrame("he"), tokenFrame("llo"), resultFrame("hello")].map((frame) =>
    convertClovaToOpenAI(frame, state)
  ) as Array<Chunk | Chunk[] | null>;
  assert.equal(textOf(out), "hello");
});
