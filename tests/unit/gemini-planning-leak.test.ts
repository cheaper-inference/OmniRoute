import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isPlanningLeakPrefix,
  splitLeadingJsonObject,
  consumePlanningLeak,
  GeminiPlanningLeakFilter,
  hasTopLevelComma,
} from "../../open-sse/utils/geminiPlanningLeak.ts";
import { geminiToOpenAIResponse } from "../../open-sse/translator/response/gemini-to-openai.ts";

describe("Part C - Antigravity Gemini planning-JSON leak stripping", () => {
  it("detects planning leak prefix accurately", () => {
    assert.equal(isPlanningLeakPrefix('{"thought": "planning..."}'), true);
    assert.equal(isPlanningLeakPrefix('  {  "thought": "abc"'), true);
    assert.equal(isPlanningLeakPrefix('{ "thoug'), true);
    assert.equal(isPlanningLeakPrefix('{"answer": "value"}'), false);
    assert.equal(isPlanningLeakPrefix("Just normal text"), false);
    assert.equal(isPlanningLeakPrefix("{"), true);
  });

  it("splits leading json object cleanly", () => {
    const split = splitLeadingJsonObject('{"thought":"test"}\nActual response');
    assert.ok(split);
    assert.equal(split.jsonText, '{"thought":"test"}');
    assert.equal(split.rest, "\nActual response");
  });

  it("keeps braces and escaped quotes inside JSON strings out of the depth count", () => {
    const leaked = '  {"thought":"a } \\" { b","nested":{"k":"}"}}tail';
    const split = splitLeadingJsonObject(leaked);
    assert.ok(split);
    assert.equal(split.jsonText, '{"thought":"a } \\" { b","nested":{"k":"}"}}');
    assert.equal(split.rest, "tail");
    assert.equal(split.prefixLength, leaked.length - "tail".length);
  });

  it("returns undefined for an unterminated object and for non-object text", () => {
    assert.equal(splitLeadingJsonObject('{"thought":"open'), undefined);
    assert.equal(splitLeadingJsonObject('{"thought":"closed quote"'), undefined);
    assert.equal(splitLeadingJsonObject("plain text"), undefined);
  });

  it("consumePlanningLeak handles complete leak, incomplete buffer, and plain text", () => {
    const leak = consumePlanningLeak('{"thought":"planning..."}\nVisible text', false);
    assert.deepEqual(leak, { kind: "leak", visibleText: "\nVisible text" });

    const incomplete = consumePlanningLeak('{"thought":"incomplete', false);
    assert.deepEqual(incomplete, { kind: "incomplete" });

    const finalIncomplete = consumePlanningLeak('{"thought":"never-closed', true);
    assert.deepEqual(finalIncomplete, { kind: "leak", visibleText: "" });

    const plain = consumePlanningLeak('{"answer":"hello"}', false);
    assert.deepEqual(plain, { kind: "plain", visibleText: '{"answer":"hello"}' });

    // Numeric thought is not a leak
    const numericThought = consumePlanningLeak('{"thought":123}', false);
    assert.deepEqual(numericThought, { kind: "plain", visibleText: '{"thought":123}' });

    // Malformed JSON is not a leak
    const malformed = consumePlanningLeak('{"thought": unbalanced "quote"}\nReal text', false);
    assert.deepEqual(malformed, {
      kind: "plain",
      visibleText: '{"thought": unbalanced "quote"}\nReal text',
    });
  });

  it("GeminiPlanningLeakFilter buffers and strips leading leak across chunks", () => {
    const filter = new GeminiPlanningLeakFilter();
    assert.equal(filter.feed('{"thought":'), "");
    assert.equal(filter.feed('"doing some thinking"}\n'), "\n");
    assert.equal(filter.feed("Hello world"), "Hello world");
    assert.equal(filter.feed(" more text"), " more text");
    assert.equal(filter.flush(), "");
  });

  it("geminiToOpenAIResponse strips leading planning leak on gemini flash models", () => {
    const state: Record<string, unknown> = {
      messageId: "test-msg-1",
      model: "gemini-2.5-flash",
      toolCalls: new Map(),
      functionIndex: 0,
    };

    const chunk1 = {
      candidates: [
        {
          content: {
            parts: [{ text: '{"thought":"planning something"}\nHello world' }],
          },
        },
      ],
    };

    const result1 = geminiToOpenAIResponse(
      chunk1,
      state as unknown as Parameters<typeof geminiToOpenAIResponse>[1]
    );
    assert.ok(result1);
    // Should contain assistant role and Hello world without {"thought":...}
    const textDeltas = result1
      .map(
        (r: { choices?: Array<{ delta?: { content?: string } }> }) => r.choices?.[0]?.delta?.content
      )
      .filter(Boolean);
    assert.equal(textDeltas.join(""), "\nHello world");
  });

  it("geminiToOpenAIResponse preserves JSON and plain text on non-flash models or when no thought key", () => {
    // Non-flash model
    const nonFlashState: Record<string, unknown> = {
      messageId: "test-msg-2",
      model: "gemini-2.5-pro",
      toolCalls: new Map(),
      functionIndex: 0,
    };
    const chunkNonFlash = {
      candidates: [
        {
          content: {
            parts: [{ text: '{"thought":"planning something"}\nHello world' }],
          },
        },
      ],
    };
    const resultNonFlash = geminiToOpenAIResponse(
      chunkNonFlash,
      nonFlashState as unknown as Parameters<typeof geminiToOpenAIResponse>[1]
    );
    assert.ok(resultNonFlash);
    const nonFlashTexts = resultNonFlash
      .map(
        (r: { choices?: Array<{ delta?: { content?: string } }> }) => r.choices?.[0]?.delta?.content
      )
      .filter(Boolean);
    assert.equal(nonFlashTexts.join(""), '{"thought":"planning something"}\nHello world');

    // Flash model but normal JSON without thought key
    const flashJsonState: Record<string, unknown> = {
      messageId: "test-msg-3",
      model: "gemini-2.5-flash",
      toolCalls: new Map(),
      functionIndex: 0,
    };
    const chunkJson = {
      candidates: [
        {
          content: {
            parts: [{ text: '{"response":"hello"}' }],
          },
        },
      ],
    };
    const resultJson = geminiToOpenAIResponse(
      chunkJson,
      flashJsonState as unknown as Parameters<typeof geminiToOpenAIResponse>[1]
    );
    assert.ok(resultJson);
    const jsonTexts = resultJson
      .map(
        (r: { choices?: Array<{ delta?: { content?: string } }> }) => r.choices?.[0]?.delta?.content
      )
      .filter(Boolean);
    assert.equal(jsonTexts.join(""), '{"response":"hello"}');
  });

  describe("Regression #19805: multi-key JSON and solitary thought objects", () => {
    it("hasTopLevelComma distinguishes top-level property commas from internal commas", () => {
      // Commas inside string values do not indicate multiple properties
      assert.equal(hasTopLevelComma('{"thought":"step 1, step 2"}'), false);
      assert.equal(hasTopLevelComma('{"thought":"hello \\"world, inside\\""}'), false);

      // Commas inside nested objects/arrays do not indicate multiple root properties
      assert.equal(hasTopLevelComma('{"thought":{"sub1":"a","sub2":"b"}}'), false);
      assert.equal(hasTopLevelComma('{"thought":["item1","item2"]}'), false);

      // Commas at root object level indicate multiple properties
      assert.equal(hasTopLevelComma('{"thought":"planning","summary":"done"}'), true);
      assert.equal(hasTopLevelComma('  { "thought": "x" , "commit_message": "fix" }'), true);
      assert.equal(hasTopLevelComma('{"thought":"x",'), true);
    });

    it("preserves multi-key JSON payloads containing a thought key as plain text", () => {
      const multiKeyJson =
        '{"thought":"I will fix this","summary":"Fixed bug","commit_message":"fix: test"}';
      const result = consumePlanningLeak(multiKeyJson, false);
      assert.deepEqual(result, { kind: "plain", visibleText: multiKeyJson });

      const multiKeyWithFollowText =
        '{"thought":"plan","summary":"done"}\n```ts\nexport const x = 1;\n```';
      const resultWithFollow = consumePlanningLeak(multiKeyWithFollowText, false);
      assert.deepEqual(resultWithFollow, { kind: "plain", visibleText: multiKeyWithFollowText });
    });

    it("emits multi-key JSON immediately across chunks without buffering or stripping", () => {
      const filter = new GeminiPlanningLeakFilter();
      // Chunk 1 introduces top-level comma after thought
      const chunk1 = '{"thought":"planning",';
      assert.equal(filter.feed(chunk1), chunk1);

      // Subsequent chunks stream through unmodified
      const chunk2 = '"summary":"done"}\n```ts\nconst a = 1;\n```';
      assert.equal(filter.feed(chunk2), chunk2);
      assert.equal(filter.flush(), "");
    });

    it("preserves solitary thought JSON when no subsequent text follows (prevents 0-char empty stream)", () => {
      const filter = new GeminiPlanningLeakFilter();
      // Feed solitary thought object with no trailing text
      assert.equal(filter.feed('{"thought":"only thought"}'), "");

      // On stream finish, flush must NOT wipe content to empty string
      assert.equal(filter.flush(), '{"thought":"only thought"}');
    });

    it("still strips solitary thought leak when followed by visible response text", () => {
      const filter = new GeminiPlanningLeakFilter();
      assert.equal(filter.feed('{"thought":"only thought"}'), "");
      assert.equal(filter.feed("\nHello! Here is the answer."), "\nHello! Here is the answer.");
      assert.equal(filter.flush(), "");
    });

    it("geminiToOpenAIResponse preserves multi-key JSON on flash models (#19805)", () => {
      const flashState: Record<string, unknown> = {
        messageId: "test-msg-19805",
        model: "gemini-3.8-flash-tiered",
        toolCalls: new Map(),
        functionIndex: 0,
      };

      const payload =
        '{"thought":"analyzed","summary":"fixed issue","commit_message":"fix: test"}\n```ts\ncode\n```';
      const chunk = {
        candidates: [
          {
            content: {
              parts: [{ text: payload }],
            },
          },
        ],
      };

      const result = geminiToOpenAIResponse(
        chunk,
        flashState as unknown as Parameters<typeof geminiToOpenAIResponse>[1]
      );
      assert.ok(result);
      const textDeltas = result
        .map(
          (r: { choices?: Array<{ delta?: { content?: string } }> }) =>
            r.choices?.[0]?.delta?.content
        )
        .filter(Boolean);
      assert.equal(textDeltas.join(""), payload);
    });
  });
});
