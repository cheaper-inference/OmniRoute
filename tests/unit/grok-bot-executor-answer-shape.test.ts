import { isRetryablePreOutputTransportError } from "../../src/sse/services/sameAccountTransportRetry.ts";
import { before, after, describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  prepareExecutorFixture,
  cleanupExecutorFixture,
  GrokBotExecutor,
  _grokBotInternals,
  type FakeTransport,
  makeTransport,
  installTransport,
  makeInput,
  assistantRow,
} from "../helpers/grokBotExecutorFixture.ts";
before(prepareExecutorFixture);
after(cleanupExecutorFixture);

describe("GrokBotExecutor answer shape", () => {
  let t: FakeTransport;

  let executor: InstanceType<typeof GrokBotExecutor>;

  beforeEach(() => {
    t = makeTransport();
    installTransport(t);
    _grokBotInternals.resetPendingCleanupsForTests();
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    executor = new GrokBotExecutor();
  });

  function streamedContents(sse: string): string[] {
    return sse
      .split("\n\n")
      .filter((frame) => frame.startsWith("data: {"))
      .map(
        (frame) =>
          JSON.parse(frame.slice(6)) as { choices?: Array<{ delta?: { content?: string } }> }
      )
      .map((payload) => payload.choices?.[0]?.delta?.content)
      .filter((content): content is string => typeof content === "string" && content.length > 0);
  }

  async function readStream(response: Response): Promise<string> {
    const chunks: Uint8Array[] = [];
    const reader = response.body!.getReader();
    for (;;) {
      const next = await reader.read();
      if (next.done) break;
      chunks.push(next.value!);
    }
    return new TextDecoder().decode(Buffer.concat(chunks));
  }

  for (const streamed of [false, true]) {
    for (const [label, content] of [
      ["whitespace", " "],
      ["an ideographic space", "\u3000"],
      ["a zero-width space", "\u200b"],
      ["a word joiner", "\u2060"],
      ["a control character", "\u0000"],
      ["a colour code", "\u001b[31m"],
      ["a delete character", "\u007f"],
      ["a C1 control", "\u009b"],
      ["a bidi override", "\u202e"],
      ["a hangul filler", "\u115f"],
      ["a mongolian variation selector", "\u180b"],
      ["a variation selector supplement", "\u{e0100}"],
      ["a combining joiner", "\u034f"],
      ["an arabic letter mark", "\u061c"],
      ["a braille blank", "\u2800"],
      ["a halfwidth hangul filler", "\uffa0"],
    ] as const) {
      it(`refuses an answer made only of ${label} in the ${streamed ? "streamed" : "buffered"} shape`, async () => {
        executor.setBridgeControllerForTests(null);
        t.watchEvents = [
          { agent: { isRunningTurn: true } },
          { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", content)] } },
        ];
        const response = (await executor.execute(
          makeInput([{ role: "user", content: "hi" }], streamed)
        )) as Response;
        if (!streamed) {
          assert.equal(response.status, 502);
          assert.match(await response.text(), /turn finished without an answer/);
          return;
        }
        assert.equal(response.status, 200);
        const text = await readStream(response);
        assert.match(text, /turn finished without an answer/);
        assert.match(text, /"type":"upstream_response_error"/);
        assert.equal(text.includes('"finish_reason":"stop"'), false);
      });
    }
  }

  for (const answer of [
    "plenty to read",
    "x",
    "!!!",
    "\u4f60\u597d",
    "\u001b[31mred\u001b[0m",
    "\u{1f642}",
    "42",
  ]) {
    it(`delivers ${answer === "x" ? "a one-character answer" : JSON.stringify(answer)} in the streamed shape`, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", answer)] } },
      ];
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], true)
      )) as Response;
      assert.equal(response.status, 200);
      const text = await readStream(response);
      assert.deepEqual(streamedContents(text), [answer]);
      assert.match(text, /"finish_reason":"stop"/);
      assert.equal(text.includes("turn finished without an answer"), false);
    });
  }

  for (const streamed of [false, true]) {
    it(`keeps a recorded invocation when the answer is also the sentinel, ${streamed ? "streamed" : "buffered"}`, async () => {
      executor.setBridgeControllerForTests({
        async start() {
          return {
            url: "https://bridge.example.com/grok-bridge/abcdefghijklmnopqrstuv/mcp",
            call() {
              throw new Error("Rejected challenge");
            },
            invocations: [{ name: "lookup", arguments: { q: "x" } }],
          };
        },
        async stop() {},
      });
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        {
          agent: { isRunningTurn: false },
          rows: { entries: [assistantRow("1", "TOOL_UNAVAILABLE")] },
        },
      ];
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], streamed, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        })
      )) as Response;
      assert.equal(response.status, 200);
      const text = streamed ? await readStream(response) : await response.text();
      assert.match(text, /lookup/);
      assert.equal(text.includes("bridge_not_called"), false);
    });
  }

  it("reports a bridge turn with no readable answer as an upstream response, not a bridge rejection", async () => {
    executor.setBridgeControllerForTests({
      async start() {
        return {
          url: "https://bridge.example.com/grok-bridge/abcdefghijklmnopqrstuv/mcp",
          call() {
            throw new Error("Rejected challenge");
          },
        };
      },
      async stop() {},
    });
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", " \u200b ")] } },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "wrong",
      })
    )) as Response;
    assert.equal(response.status, 502);
    const body = (await response.json()) as { error: { type: string } };
    assert.equal(body.error.type, "upstream_response_error");
  });

  it("ends a streamed no-answer refusal with the same terminator as the other refusals", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", " ")] } },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], true)
    )) as Response;
    assert.equal(response.status, 200);
    const text = await readStream(response);
    assert.match(text, /turn finished without an answer/);
    assert.equal(text.includes("[DONE]"), true);
  });

  it("refuses the unavailable-tool sentinel in the streamed shape", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [assistantRow("1", "TOOL_UNAVAILABLE")] },
      },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], true, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(response.status, 200);
    const text = await readStream(response);
    assert.match(text, /Request bridge tool was not called/);
    assert.match(text, /"type":"bridge_not_called"/);
    assert.deepEqual(streamedContents(text), []);
    assert.equal(text.includes('"finish_reason":"stop"'), false);
  });

  for (const streamed of [false, true]) {
    for (const [label, reply] of [
      ["a zero-width space", "TOOL_UNAVAILABLE\u200b"],
      ["a hangul filler", "TOOL_UNAVAILABLE\u3164"],
      ["a jamo filler", "TOOL_UNAVAILABLE\u115f"],
      ["a braille blank", "TOOL_UNAVAILABLE\u2800"],
      ["a halfwidth hangul filler", "TOOL_UNAVAILABLE\uffa0"],
      ["a combining acute accent", "TOOL_UNAVAILABLE\u0301"],
      ["a combining grapheme joiner", "TOOL_UNAVAILABLE\u034f"],
      ["a variation selector", "TOOL_UNAVAILABLE\ufe0f"],
      ["a mongolian free variation selector", "TOOL_UNAVAILABLE\u180b"],
      ["a variation selector supplement", "TOOL_UNAVAILABLE\u{e0100}"],
      ["a private-use character", "TOOL_UNAVAILABLE\ue000"],
      ["an unassigned code point", "TOOL_UNAVAILABLE\u0378"],
      ["no padding at all, lower-cased", "tool_unavailable"],
      ["backticks", "`TOOL_UNAVAILABLE`"],
      ["bold markers", "**TOOL_UNAVAILABLE**"],
      ["a trailing full stop", "TOOL_UNAVAILABLE."],
      ["double quotes", '\"TOOL_UNAVAILABLE\"'],
      ["brackets", "[TOOL_UNAVAILABLE]"],
      ["a space instead of the underscore", "TOOL UNAVAILABLE"],
      ["title case with a space", "Tool Unavailable"],
      ["a hyphen instead of the underscore", "TOOL-UNAVAILABLE"],
      ["no separator at all", "TOOLUNAVAILABLE"],
      ["markdown emphasis underscores", "_TOOL_UNAVAILABLE_"],
      ["strong emphasis underscores", "__TOOL_UNAVAILABLE__"],
      ["a doubled underscore", "TOOL__UNAVAILABLE"],
      ["a trailing underscore", "TOOL_UNAVAILABLE_"],
      [
        "fullwidth letters",
        "\uff34\uff2f\uff2f\uff2c\uff3f\uff35\uff2e\uff21\uff36\uff21\uff29\uff2c\uff21\uff22\uff2c\uff25",
      ],
      [
        "mathematical bold letters",
        "\ud835\udc13\ud835\udc0e\ud835\udc0e\ud835\udc0b\ud835\udc14\ud835\udc0d\ud835\udc00\ud835\udc15\ud835\udc00\ud835\udc08\ud835\udc0b\ud835\udc00\ud835\udc01\ud835\udc0b\ud835\udc04",
      ],
      [
        "circled letters",
        "\u24c9\u24c4\u24c4\u24c1\u24ca\u24c3\u24b6\u24cb\u24b6\u24be\u24c1\u24b6\u24b7\u24c1\u24ba",
      ],
      [
        "small capitals",
        "\u1d1b\u1d0f\u1d0f\u029f\u1d1c\u0274\u1d00\u1d20\u1d00\u026a\u029f\u1d00\u0299\u029f\u1d07",
      ],
      ["the capital form of a small-capital I", "TOOL_UNAVA" + "\uA7AE" + "LABLE"],
      ["the capital form of a small-capital L", "TOO" + "\uA7AD" + "_UNAVAILABLE"],
      ["an escape sequence that swallows a letter", "\u001bTOOL_UNAVAILABLE"],
      ["an operating-system command wrapper", "\u001b]TOOL_UNAVAILABLE\u0007"],
      ["a numbered paragraph in front of it", "1. TOOL_UNAVAILABLE"],
      ["a terminal reset appended", "\u001b[0mTOOL_UNAVAILABLE\u001b[0m"],
      ["a colour sequence in front", "\u009b31mTOOL_UNAVAILABLE"],
      ["a character set switch in front", "\u001b(BTOOL_UNAVAILABLE"],
      ["a numbered paragraph and a reset", "\u001b[0m2. TOOL_UNAVAILABLE\u001b[0m"],
      ["an arabic-indic numeral in front", "\u0662. TOOL_UNAVAILABLE"],
      ["a devanagari numeral in front", "\u0967. TOOL_UNAVAILABLE"],
      ["a superscript numeral after", "TOOL_UNAVAILABLE\u00b2"],
      ["a percent designator in front", "\u001b%GTOOL_UNAVAILABLE"],
      ["a starred designator in front", "\u001b*BTOOL_UNAVAILABLE"],
      ["a reset-to-initial-state in front", "\u001bcTOOL_UNAVAILABLE"],
      ["an 8-bit command string in front", "\u009d0;t\u009cTOOL_UNAVAILABLE"],
      ["a two-byte designator with a parameter", "\u001b$BTOOL_UNAVAILABLE"],
      ["a control sequence with an intermediate", "\u001b[1 qTOOL_UNAVAILABLE"],
      ["an 8-bit control sequence with an intermediate", "\u009b1 qTOOL_UNAVAILABLE"],
      ["a bel-terminated command string", "\u001b]0;t\u0007TOOL_UNAVAILABLE"],
      ["a bel-terminated 8-bit command string", "\u009d0;t\u0007TOOL_UNAVAILABLE"],
      ["a device control string", "\u001bPq\u001b\\TOOL_UNAVAILABLE"],
    ] as const) {
      it(`refuses the sentinel padded with ${label} in the ${streamed ? "streamed" : "buffered"} shape`, async () => {
        executor.setBridgeControllerForTests(null);
        t.watchEvents = [
          { agent: { isRunningTurn: true } },
          { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", reply)] } },
        ];
        const input = makeInput([{ role: "user", content: "hi" }], streamed, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        });
        const response = (await executor.execute(input)) as Response;
        if (!streamed) {
          assert.equal(response.status, 502);
          assert.match(await response.text(), /bridge_not_called/);
          return;
        }
        assert.equal(response.status, 200);
        const text = await readStream(response);
        assert.match(text, /"type":"bridge_not_called"/);
        assert.deepEqual(streamedContents(text), []);
        assert.equal(text.includes("[DONE]"), true);
      });
    }
  }

  for (const streamed of [false, true]) {
    for (const sentence of [
      "If discovery finds nothing, reply TOOL_UNAVAILABLE and stop.",
      "TOOL_UNAVAILABLE sorry",
      "No search was needed: the value is 42.",
    ]) {
      it(`delivers a longer reply containing the token in the ${streamed ? "streamed" : "buffered"} shape`, async () => {
        executor.setBridgeControllerForTests(null);
        t.watchEvents = [
          { agent: { isRunningTurn: true } },
          { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", sentence)] } },
        ];
        const response = (await executor.execute(
          makeInput([{ role: "user", content: "hi" }], streamed, undefined, {
            url: "http://127.0.0.1:9/mcp",
            challenge: "test-challenge",
          })
        )) as Response;
        assert.equal(response.status, 200);
        const text = streamed ? await readStream(response) : await response.text();
        assert.equal(text.includes("bridge_not_called"), false);
        assert.equal(text.includes(sentence.split(" ")[0]), true);
      });
    }
  }

  for (const streamed of [false, true]) {
    it(`delivers a sentence that mentions the token in the ${streamed ? "streamed" : "buffered"} shape`, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        {
          agent: { isRunningTurn: false },
          rows: { entries: [assistantRow("1", "the tool is unavailable, retrying later")] },
        },
      ];
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], streamed, undefined, {
          url: "http://127.0.0.1:9/mcp",
          challenge: "test-challenge",
        })
      )) as Response;
      if (!streamed) {
        assert.equal(response.status, 200);
        const body = (await response.json()) as {
          choices: Array<{ message: { content: string } }>;
        };
        assert.equal(body.choices[0].message.content, "the tool is unavailable, retrying later");
        return;
      }
      assert.equal(response.status, 200);
      const text = await readStream(response);
      assert.deepEqual(streamedContents(text), ["the tool is unavailable, retrying later"]);
    });
  }

  it("refuses the sentinel wrapped in invisible padding in the buffered shape", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [assistantRow("1", "\u2800\u200b TOOL_UNAVAILABLE \u034f\uffa0")] },
      },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], false, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      })
    )) as Response;
    assert.equal(response.status, 502);
    assert.match(await response.text(), /bridge_not_called/);
  });

  it("delivers the sentinel when the bridge was explicitly disabled on a streamed turn", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [assistantRow("1", "TOOL_UNAVAILABLE")] },
      },
    ];
    const input = makeInput([{ role: "user", content: "hi" }], true);
    (input.body as { grokBotBridge?: unknown }).grokBotBridge = false;
    const response = (await executor.execute(input)) as Response;
    assert.equal(response.status, 200);
    const text = await readStream(response);
    assert.deepEqual(streamedContents(text), ["TOOL_UNAVAILABLE"]);
    assert.equal(text.includes("bridge_not_called"), false);
  });

  it("delivers the sentinel as an answer when the turn asked for no bridge", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [assistantRow("1", "TOOL_UNAVAILABLE")] },
      },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], true)
    )) as Response;
    assert.equal(response.status, 200);
    const text = await readStream(response);
    assert.deepEqual(streamedContents(text), ["TOOL_UNAVAILABLE"]);
    assert.equal(text.includes("bridge_not_called"), false);
  });

  it("treats an explicitly disabled bridge as no bridge in the buffered shape", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [assistantRow("1", "TOOL_UNAVAILABLE")] },
      },
    ];
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.body as { grokBotBridge?: unknown }).grokBotBridge = false;
    const response = (await executor.execute(input)) as Response;
    assert.equal(response.status, 200);
    const body = (await response.json()) as { choices: Array<{ message: { content: string } }> };
    assert.equal(body.choices[0].message.content, "TOOL_UNAVAILABLE");
  });

  for (const answer of ["\u{1f642}", "42", "!!!", "\u4f60\u597d", "x", "\u001b[31mred\u001b[0m"]) {
    it(`delivers ${JSON.stringify(answer)} in the buffered shape`, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", answer)] } },
      ];
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(response.status, 200);
      const body = (await response.json()) as { choices: Array<{ message: { content: string } }> };
      assert.equal(body.choices[0].message.content, answer);
    });
  }

  for (const [prose, shouldRefuse] of [
    ["I researched the topic and found the answer.", false],
    ["It was already covered earlier.", false],
    ["We put the results together.", false],
    ["I used search to find the answer.", true],
    ["I used Search to find the answer.", true],
    ["\u6211\u8c03\u7528search\u5de5\u5177\u67e5\u5230\u4e86\u7ed3\u679c\u3002", true],
    ["\u6211\u8c03\u7528\u4e86search\u5de5\u5177\u3002", true],
    ["I used \uff53\uff45\uff41\uff52\uff43\uff48 to find it", true],
    ["The date is 2026-11-22.", false],
    ["I read the file already.", false],
    ["The search tool is optional.", false],
    ["I used the search results to answer.", false],
    ["I used the date as the key.", false],
    ["I haven't used search yet.", false],
    ["I used search-based ranking.", false],
    ["The date function in SQL returns a row.", false],
    ["Results were served via search.", false],
    ["I did not need to use search here.", false],
    ['search(query="x")', false],
    ["I called `date` and it worked.", true],
    ["I executed search twice.", true],
    ["I will use lookup for this.", true],
    ["I used the `search` tool.", true],
    ["I'll use search to check that.", true],
    ["I'm going to use search.", true],
    ["It was \u901a\u8fc7search\u63a5\u53e3\u83b7\u53d6\u6570\u636e\u7684\u3002", false],
  ] as const) {
    it(`${shouldRefuse ? "refuses" : "delivers"} a reply whose client tool name appears ${shouldRefuse ? "as a whole word" : "inside a longer word"}`, async () => {
      executor.setBridgeControllerForTests({
        async start() {
          return {
            url: "https://bridge.example.com/grok-bridge/abcdefghijklmnopqrstuv/mcp",
            invocations: [],
          };
        },
        async stop() {},
      });
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", prose)] } },
      ];
      const input = makeInput([{ role: "user", content: "hi" }], true, undefined, {
        url: "http://127.0.0.1:9/mcp",
        challenge: "test-challenge",
      });
      (input.body as { tools?: unknown[] }).tools = [
        { type: "function", function: { name: "search", description: "s", parameters: {} } },
        { type: "function", function: { name: "read", description: "r", parameters: {} } },
        { type: "function", function: { name: "get", description: "g", parameters: {} } },
        { type: "function", function: { name: "date", description: "d", parameters: {} } },
        { type: "function", function: { name: "lookup", description: "l", parameters: {} } },
      ];
      const response = (await executor.execute(input)) as Response;
      assert.equal(response.status, 200);
      const text = await readStream(response);
      if (shouldRefuse) {
        assert.match(text, /"type":"bridge_not_called"/);
        assert.deepEqual(streamedContents(text), []);
      } else {
        assert.deepEqual(streamedContents(text), [prose]);
      }
    });
  }

  it("treats a bridge verdict as final while a transport 502 stays retryable", () => {
    const body = JSON.stringify({ error: { message: "Request bridge tool was not called" } });
    assert.equal(isRetryablePreOutputTransportError(502, body, null, "bridge_not_called"), false);
    // bridge_rejected also fires when the bridge recorded no call yet, which a retry can win.
    assert.equal(isRetryablePreOutputTransportError(502, body, null, "bridge_rejected"), true);
    assert.equal(
      isRetryablePreOutputTransportError(502, body, null, "upstream_response_error"),
      false
    );
    // A real transport failure keeps its retry, and so does the readiness rewrite.
    assert.equal(
      isRetryablePreOutputTransportError(502, "upstream connect error", null, null),
      true
    );
    assert.equal(
      isRetryablePreOutputTransportError(502, "early eof", null, "stream_early_eof"),
      true
    );
  });

  it("reports a turn with no answer as an upstream response, not a retryable transport error", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", "")] } },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    const body = (await response.json()) as { error: { type: string } };
    assert.equal(body.error.type, "upstream_response_error");
    assert.equal(
      isRetryablePreOutputTransportError(
        response.status,
        JSON.stringify(body),
        null,
        body.error.type
      ),
      false
    );
  });
});
