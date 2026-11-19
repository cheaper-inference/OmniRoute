import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeOpenAIResponse, sanitizeStreamingChunk } =
  await import("../../open-sse/handlers/responseSanitizer.ts");

const citation = {
  type: "url_citation",
  url_citation: {
    url: "https://example.com/article",
    title: "Example article",
    start_index: 6,
    end_index: 40,
  },
};

function completion(message: Record<string, unknown>) {
  return {
    id: "chatcmpl-1",
    object: "chat.completion",
    created: 1,
    model: "search-model",
    choices: [{ index: 0, message: { role: "assistant", ...message }, finish_reason: "stop" }],
  };
}

function chunk(delta: Record<string, unknown>) {
  return {
    id: "chatcmpl-1",
    object: "chat.completion.chunk",
    created: 1,
    model: "search-model",
    choices: [{ index: 0, delta, finish_reason: null }],
  };
}

test("a chat completion keeps the url_citation annotations its answer cites", () => {
  const sanitized = sanitizeOpenAIResponse(
    completion({
      content: "Read [the article](https://example.com/article).",
      annotations: [citation],
    })
  );
  assert.deepEqual(sanitized.choices[0].message.annotations, [citation]);
});

test("a streamed chunk keeps the url_citation annotations it carries", () => {
  const sanitized = sanitizeStreamingChunk(chunk({ annotations: [citation] })) as {
    choices: Array<{ delta: Record<string, unknown> }>;
  };
  assert.deepEqual(sanitized.choices[0].delta.annotations, [citation]);
});

test("annotations keep only well-formed url_citation entries and their standard fields", () => {
  const sanitized = sanitizeOpenAIResponse(
    completion({
      content: "Answer.",
      annotations: [
        { ...citation, url_citation: { ...citation.url_citation, internal_id: "turn1search2" } },
        { type: "url_citation", url_citation: { title: "no url" } },
        { type: "url_citation", url_citation: { url: "javascript:alert(1)", title: "script" } },
        { type: "file_citation", file_citation: { file_id: "file-1" } },
        "not an object",
      ],
    })
  );
  assert.deepEqual(sanitized.choices[0].message.annotations, [citation]);
});

test("a message without usable citations carries no annotations field", () => {
  for (const annotations of [undefined, [], [{ type: "url_citation" }], "x"]) {
    const message = sanitizeOpenAIResponse(completion({ content: "Answer.", annotations }))
      .choices[0].message;
    assert.equal("annotations" in message, false, JSON.stringify(annotations));
    const delta = (
      sanitizeStreamingChunk(chunk({ content: "Answer.", annotations })) as {
        choices: Array<{ delta: Record<string, unknown> }>;
      }
    ).choices[0].delta;
    assert.equal("annotations" in delta, false, JSON.stringify(annotations));
  }
});
