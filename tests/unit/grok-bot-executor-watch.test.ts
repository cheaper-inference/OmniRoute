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

describe("GrokBotExecutor watch settlement", () => {
  let t: FakeTransport;

  let executor: InstanceType<typeof GrokBotExecutor>;

  beforeEach(() => {
    t = makeTransport();
    installTransport(t);
    _grokBotInternals.resetPendingCleanupsForTests();
    // Production shape (spec deployment step 9): the public bridge URL is
    // configured; tests that exercise the stop switch or env-absent paths
    // override/delete it locally.
    globalThis.process.env.GROK_BOT_PUBLIC_BRIDGE_URL = "https://bridge.example.com";
    executor = new GrokBotExecutor();
  });

  it("cuts an oversized history down to the upstream text cap", async () => {
    executor.setBridgeControllerForTests(null);
    const old = "OLD-" + "a".repeat(150_000);
    const recent = "RECENT-" + "b".repeat(150_000);
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.body as { messages: unknown[] }).messages = [
      { role: "user", content: old },
      { role: "user", content: recent },
    ];
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 200);
    const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
    const text = String(send?.payload.text);
    assert.ok(text.length <= 190_000, "prompt length " + text.length);
    assert.equal(text.includes("OLD-"), false);
    assert.equal(text.includes("RECENT-"), true);
    assert.match(text, /Answer only from this conversation/);
  });

  it("stays within the cap when one message is longer than the budget", async () => {
    executor.setBridgeControllerForTests(null);
    const huge = "Z".repeat(250_000);
    const input = makeInput([{ role: "user", content: "hi" }]);
    (input.body as { messages: unknown[] }).messages = [{ role: "user", content: huge }];
    const res = (await executor.execute(input)) as Response;
    assert.equal(res.status, 200);
    const send = t.calls.find((call) => call.method === "SendGrokBotUserMessage");
    const text = String(send?.payload.text);
    assert.ok(text.length <= 190_000, "prompt length " + text.length);
    assert.match(text, /Answer only from this conversation/);
    assert.equal(text.includes("Z"), true);
  });

  it("reconnects a watch at the generation a cursorTooOld frame names", async () => {
    executor.setBridgeControllerForTests(null);
    let watchCount = 0;
    t.watchEventsAsync = async function* () {
      watchCount += 1;
      if (watchCount === 1) {
        yield { cursorTooOld: { agentId: "agent-1", generation: 5, sessionId: "" } };
        return;
      }
      yield { agent: { isRunningTurn: true } };
      yield { entry: { kind: "send-message", message: { type: "text", content: "pong" } } };
      yield { agent: { isRunningTurn: false } };
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const watches = t.calls.filter((call) => call.method === "WatchGrokBotTranscripts");
    assert.equal(watches.length, 2);
    const second = (watches[1]?.payload.cursors as Array<Record<string, unknown>>)[0];
    assert.equal(second?.generation, 5);
  });

  function watches() {
    return t.calls.filter((call) => call.method === "WatchGrokBotTranscripts");
  }

  async function assertWatchText(expected: string) {
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 200);
    assert.equal((await response.json()).choices[0]?.message.content, expected);
  }

  it("collects every assistant row in one idle watch frame", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEventsAsync = async function* () {
      yield { agent: { isRunningTurn: true } };
      yield {
        agent: { isRunningTurn: false },
        rows: {
          entries: [
            assistantRow("1", "first "),
            assistantRow("2", "second "),
            assistantRow("3", "second "),
          ],
        },
      };
      yield { turnFailed: {} };
    };
    await assertWatchText("first second second ");
    assert.equal(watches().length, 1);
  });

  it("does not return text while an earlier row is still missing its body", async () => {
    executor.setBridgeControllerForTests(null);
    const later = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "second" },
      })
    ).toString("base64");
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { rows: { entries: [{ seq: "7" }] } },
      { rows: { entries: [{ seq: "8", body: later }] } },
      { agent: { isRunningTurn: false } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 502);
    const responseBody = (await res.json()) as { error?: { type?: string } };
    assert.equal(responseBody.error?.type, "incomplete_turn");
  });

  it("clears a deleted missing row and reconnects after the deletion", async () => {
    executor.setBridgeControllerForTests(null);
    let reads = 0;
    t.watchEventsAsync = async function* () {
      reads += 1;
      if (reads === 1) {
        yield { agent: { isRunningTurn: true }, rows: { entries: [assistantRow("6", "answer")] } };
        yield { rows: { entries: [{ seq: "7", entryId: "missing", updatedSeq: "7" }] } };
        yield { rows: { deletes: [{ entryId: "missing", updatedSeq: "8" }] } };
      } else {
        yield { agent: { isRunningTurn: false } };
      }
    };
    await assertWatchText("answer");
    assert.equal(watches().length, 2);
    const cursors = watches()[1]?.payload.cursors as Array<{ afterUpdatedSeq: string }>;
    assert.equal(cursors[0]?.afterUpdatedSeq, "8");
  });

  it("keeps one copy when a direct reply is followed by its transcript row", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { entry: { kind: "send-message", message: { type: "text", content: "answer" } } },
      { rows: { entries: [assistantRow("1", "answer"), assistantRow("2", "answer")] } },
      { agent: { isRunningTurn: false } },
    ];
    await assertWatchText("answeranswer");
    assert.equal(watches().length, 1);
  });

  it("settles when a replayed row arrives with an idle signal", async () => {
    executor.setBridgeControllerForTests(null);
    const row = assistantRow("1", "answer");
    let reads = 0;
    t.watchEventsAsync = async function* () {
      reads += 1;
      if (reads === 1) {
        yield { agent: { isRunningTurn: true } };
        yield { agent: { isRunningTurn: true }, rows: { entries: [row] } };
      } else if (reads === 2) {
        yield { agent: { isRunningTurn: false }, rows: { entries: [row] } };
      } else {
        yield { turnFailed: {} };
      }
    };
    await assertWatchText("answer");
    assert.equal(watches().length, 2);
  });

  it("ignores an unnamed live entry accompanying a running agent and text", async () => {
    executor.setBridgeControllerForTests(null);
    t.stampAgentId = false;
    t.watchEvents = [
      {
        agent: { agentId: "agent-1", isRunningTurn: true },
        agentState: { live: [{ isRunning: true }] },
        rows: { entries: [assistantRow("1", "first ")] },
      },
      {
        agent: { agentId: "agent-1", isRunningTurn: false },
        rows: { entries: [assistantRow("2", "answer")] },
      },
    ];
    // The fixture chooses the temporal ID at send time, not the roster row ID.
    t.onSend = () => {
      for (const event of t.watchEvents) {
        (event.agent as { agentId: string }).agentId = t.lastAgentId;
      }
    };
    await assertWatchText("first answer");
  });

  for (const changed of [false, true]) {
    it(`reconciles text after a ${changed ? "changed" : "same"}-generation resync`, async () => {
      executor.setBridgeControllerForTests(null);
      let reads = 0;
      t.watchEventsAsync = async function* () {
        reads += 1;
        if (reads === 1) {
          yield { cursorTooOld: { generation: 2 } };
        } else if (reads === 2) {
          yield {
            agent: { isRunningTurn: true },
            rows: { entries: [assistantRow("1", "before "), assistantRow("2", "held ")] },
          };
          if (changed) yield { rows: { deletes: [{ seq: "2", updatedSeq: "3" }] } };
          yield { cursorTooOld: { generation: changed ? 3 : 2 } };
        } else {
          yield {
            agent: { isRunningTurn: false },
            rows: {
              entries: changed
                ? [assistantRow("2", "answer")]
                : [assistantRow("1", "before "), assistantRow("3", "answer")],
            },
          };
        }
      };
      await assertWatchText(changed ? "answer" : "before held answer");
      assert.equal(watches().length, 3);
      const cursor = (watches()[2]?.payload.cursors as Array<Record<string, unknown>>)[0];
      assert.equal(cursor?.generation, changed ? 3 : 2);
      assert.equal(cursor?.afterUpdatedSeq, "0");
    });
  }

  it("preserves omissions across a same-generation resync", async () => {
    executor.setBridgeControllerForTests(null);
    let reads = 0;
    t.watchEventsAsync = async function* () {
      reads += 1;
      if (reads === 1) {
        yield { cursorTooOld: { generation: 2 } };
      } else if (reads === 2) {
        yield {
          agent: { isRunningTurn: true },
          rows: { entries: [{ seq: "7", updatedSeq: "7" }, assistantRow("8", "partial")] },
        };
        yield { cursorTooOld: { generation: 2 } };
      } else {
        yield { agent: { isRunningTurn: false } };
      }
    };
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
    assert.equal(watches().length, 3);
    const cursor = (watches()[2]?.payload.cursors as Array<Record<string, unknown>>)[0];
    assert.equal(cursor?.generation, 2);
    assert.equal(cursor?.afterUpdatedSeq, "0");
  });

  it("retains a missing row cursor when a bodyless repeat omits its position", async () => {
    executor.setBridgeControllerForTests(null);
    let reads = 0;
    t.watchEventsAsync = async function* () {
      reads += 1;
      if (reads === 1) {
        yield {
          agent: { isRunningTurn: true },
          rows: { entries: [{ seq: "7", updatedSeq: "7" }] },
        };
        yield { rows: { entries: [{ seq: "7" }, assistantRow("8", "answer")] } };
      } else {
        yield { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("7", "first ")] } };
      }
    };
    await assertWatchText("first answer");
    assert.equal(
      (watches()[1]?.payload.cursors as Array<{ afterUpdatedSeq: string }>)[0]?.afterUpdatedSeq,
      "6"
    );
  });

  it("does not mistake a hydrated user echo for a missing assistant body", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEventsAsync = async function* () {
      yield { agent: { isRunningTurn: true } };
      yield {
        rows: {
          entries: [
            {
              seq: "1",
              updatedSeq: "1",
              body: Buffer.from(
                JSON.stringify({
                  kind: "send-message",
                  clientNonce: t.lastMessageId,
                  message: { type: "text", content: "hi" },
                })
              ).toString("base64"),
            },
          ],
        },
      };
      yield { rows: { entries: [{ seq: "1", updatedSeq: "1" }, assistantRow("2", "answer")] } };
      yield { agent: { isRunningTurn: false } };
    };
    await assertWatchText("answer");
  });

  for (const replacement of ["echo", "tool"] as const) {
    it(`removes superseded assistant text when its newer body is ${replacement}`, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEventsAsync = async function* () {
        yield {
          agent: { isRunningTurn: true },
          rows: { entries: [assistantRow("1", "obsolete")] },
        };
        const body =
          replacement === "echo"
            ? {
                kind: "send-message",
                clientNonce: t.lastMessageId,
                message: { type: "text", content: "hi" },
              }
            : { kind: "tool-call", tool: { name: "other", content: "ignored" } };
        yield {
          rows: {
            entries: [
              {
                seq: "1",
                updatedSeq: "2",
                body: Buffer.from(JSON.stringify(body)).toString("base64"),
              },
              assistantRow("2", "answer"),
            ],
          },
        };
        yield { agent: { isRunningTurn: false } };
      };
      await assertWatchText("answer");
    });
  }

  it("uses an unidentified deletion only to advance the reconnect cursor", async () => {
    executor.setBridgeControllerForTests(null);
    let reads = 0;
    t.watchEventsAsync = async function* () {
      reads += 1;
      if (reads === 1) {
        yield { agent: { isRunningTurn: true }, rows: { entries: [assistantRow("1", "answer")] } };
        yield { rows: { deletes: [{ updatedSeq: "1" }, { updatedSeq: "5" }] } };
      } else yield { agent: { isRunningTurn: false } };
    };
    await assertWatchText("answer");
    assert.equal(watches().length, 2);
    assert.equal(
      (watches()[1]?.payload.cursors as Array<{ afterUpdatedSeq: string }>)[0]?.afterUpdatedSeq,
      "5"
    );
  });

  it("keeps a newer omission when a bodyless link joins unequal row versions", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { rows: { entries: [assistantRow("1", "obsolete"), assistantRow("2", "partial")] } },
      { rows: { entries: [{ entryId: "e", updatedSeq: "5" }] } },
      { rows: { entries: [{ seq: "1", entryId: "e", updatedSeq: "1" }] } },
      { agent: { isRunningTurn: false } },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
  });

  it("does not guess which identified row a shared cursor-only omission belongs to", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      {
        rows: {
          entries: [
            { ...assistantRow("1", "first "), entryId: "a", updatedSeq: "5" },
            { ...assistantRow("2", "second"), entryId: "b", updatedSeq: "5" },
            { updatedSeq: "5" },
          ],
        },
      },
      { agent: { isRunningTurn: false } },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
  });

  for (const replayKnown of [false, true]) {
    it(`does not resolve an ambiguous omission${replayKnown ? " with a known row replay" : " through a promoted alias"}`, async () => {
      executor.setBridgeControllerForTests(null);
      const a = { ...assistantRow("1", "A"), entryId: "a", updatedSeq: "5" };
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        ...(!replayKnown ? [{ rows: { entries: [{ updatedSeq: "5" }] } }] : []),
        { rows: { entries: [a] } },
        { rows: { entries: [{ ...assistantRow("2", "B"), entryId: "b", updatedSeq: "5" }] } },
        { rows: { entries: [{ updatedSeq: "5" }] } },
        ...(replayKnown ? [{ rows: { entries: [a] } }] : []),
        { agent: { isRunningTurn: false } },
      ];
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error.type, "incomplete_turn");
    });
  }

  for (const damaged of ["not JSON", "null", "false", "[]"]) {
    it(`rejects an unreadable required body: ${damaged}`, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        { rows: { entries: [{ seq: "1", updatedSeq: "3" }, assistantRow("2", "partial")] } },
        {
          rows: {
            entries: [{ seq: "1", updatedSeq: "3", body: Buffer.from(damaged).toString("base64") }],
          },
        },
        { agent: { isRunningTurn: false } },
      ];
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error.type, "incomplete_turn");
    });
  }

  it("discards old omissions after a changed-generation resync", async () => {
    executor.setBridgeControllerForTests(null);
    let reads = 0;
    t.watchEventsAsync = async function* () {
      reads += 1;
      if (reads === 1) {
        yield {
          agent: { isRunningTurn: true },
          rows: { entries: [{ seq: "1", updatedSeq: "5" }, assistantRow("2", "obsolete")] },
        };
        yield { cursorTooOld: { generation: 2 } };
      } else
        yield { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("3", "answer")] } };
    };
    await assertWatchText("answer");
    assert.equal(watches().length, 2);
    const cursor = (watches()[1]?.payload.cursors as Array<Record<string, unknown>>)[0];
    assert.equal(cursor?.generation, 2);
    assert.equal(cursor?.afterUpdatedSeq, "0");
  });

  it("advances reconnect cursors as individual omissions are hydrated", async () => {
    executor.setBridgeControllerForTests(null);
    let reads = 0;
    t.watchEventsAsync = async function* () {
      reads += 1;
      if (reads === 1) {
        yield {
          agent: { isRunningTurn: true },
          rows: {
            entries: [
              { seq: "1", updatedSeq: "4" },
              { seq: "2", updatedSeq: "8" },
              { ...assistantRow("10", "answer"), updatedSeq: "20" },
            ],
          },
        };
      } else if (reads === 2) {
        yield { rows: { entries: [{ ...assistantRow("1", "first "), updatedSeq: "4" }] } };
      } else if (reads === 3) {
        yield { rows: { entries: [{ ...assistantRow("2", "second "), updatedSeq: "8" }] } };
      } else yield { agent: { isRunningTurn: false } };
    };
    await assertWatchText("first second answer");
    assert.deepEqual(
      watches().map(
        (watch) => (watch.payload.cursors as Array<{ afterUpdatedSeq: string }>)[0]?.afterUpdatedSeq
      ),
      ["0", "3", "7", "20"]
    );
  });

  it("settles after both identified rows receive their missing bodies", async () => {
    executor.setBridgeControllerForTests(null);
    const first = { seq: "1", entryId: "a", updatedSeq: "2" };
    const second = { seq: "2", entryId: "b", updatedSeq: "2" };
    t.watchEvents = [
      { agent: { isRunningTurn: true }, rows: { entries: [first, second] } },
      {
        agent: { isRunningTurn: false },
        rows: {
          entries: [
            { ...assistantRow("2", "B"), ...second },
            { ...assistantRow("1", "A"), ...first },
          ],
        },
      },
    ];
    await assertWatchText("AB");
    assert.equal(watches().length, 1);
  });

  it("reports an unfinished turn instead of an empty stream when no answer arrived", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      {
        agent: { isRunningTurn: true },
        rows: { entries: [{ seq: "1", entryId: "a", updatedSeq: "1" }] },
      },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [{ ...assistantRow("1", ""), entryId: "a", updatedSeq: "1" }] },
      },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }], true)
    )) as Response;
    assert.equal(response.status, 200);
    const chunks: Uint8Array[] = [];
    const reader = response.body!.getReader();
    for (;;) {
      const next = await reader.read();
      if (next.done) break;
      chunks.push(next.value!);
    }
    const text = new TextDecoder().decode(Buffer.concat(chunks));
    assert.match(text, /turn finished without an answer/);
    assert.equal(text.includes('"finish_reason":"stop"'), false);
  });

  for (const includeEntryId of [false, true]) {
    it(`hydrates a cursor-only announcement for a known row's newer version${includeEntryId ? " by entry identity" : " by sequence"}`, async () => {
      executor.setBridgeControllerForTests(null);
      const initial = includeEntryId
        ? { ...assistantRow("1", "draft"), entryId: "a" }
        : assistantRow("1", "draft");
      const revised = includeEntryId
        ? { ...assistantRow("1", "answer"), seq: undefined, entryId: "a", updatedSeq: "3" }
        : { ...assistantRow("1", "answer"), updatedSeq: "3" };
      t.watchEvents = [
        { agent: { isRunningTurn: true }, rows: { entries: [initial] } },
        { rows: { entries: [{ updatedSeq: "3" }] } },
        { agent: { isRunningTurn: false }, rows: { entries: [revised] } },
      ];
      await assertWatchText("answer");
      assert.equal(watches().length, 1);
    });
  }

  it("does not assign a cursor-only omission to a same-version known row replay", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true }, rows: { entries: [assistantRow("1", "answer")] } },
      { rows: { entries: [{ updatedSeq: "1" }] } },
      { agent: { isRunningTurn: false }, rows: { entries: [assistantRow("1", "answer")] } },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
  });

  it("hydrates matching stable and provisional omissions when both name the required version", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true }, rows: { entries: [assistantRow("1", "draft")] } },
      { rows: { entries: [{ seq: "1", updatedSeq: "3" }, { updatedSeq: "3" }] } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [{ ...assistantRow("1", "answer"), updatedSeq: "3" }] },
      },
    ];
    await assertWatchText("answer");
  });

  it("keeps the original row position when its newer body resolves a provisional omission", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true }, rows: { entries: [assistantRow("1", "draft")] } },
      { entry: { kind: "send-message", message: { type: "text", content: "tail" } } },
      { rows: { entries: [{ updatedSeq: "3" }] } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [{ ...assistantRow("1", "final"), updatedSeq: "3" }] },
      },
    ];
    await assertWatchText("finaltail");
  });

  it("keeps an omission unresolved when a new body shares an already known row's cursor", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      {
        agent: { isRunningTurn: true },
        rows: { entries: [{ ...assistantRow("2", "B"), entryId: "b", updatedSeq: "5" }] },
      },
      { rows: { entries: [{ updatedSeq: "5" }] } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [{ ...assistantRow("1", "A"), entryId: "a", updatedSeq: "5" }] },
      },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
  });

  it("keeps a hydrated anonymous row out of an ambiguous frame's known identity", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      {
        agent: { isRunningTurn: true },
        rows: { entries: [{ ...assistantRow("2", "known"), updatedSeq: "1" }] },
      },
      {
        agent: { isRunningTurn: true },
        rows: { entries: [{ ...assistantRow("9", "anon"), seq: undefined, updatedSeq: "5" }] },
      },
      {
        agent: { isRunningTurn: false },
        rows: {
          entries: [
            { ...assistantRow("2", "body"), updatedSeq: "5" },
            { seq: "3", updatedSeq: "5" },
          ],
        },
      },
    ];
    await assertWatchText("bodyanon");
  });

  it("keeps an omission unresolved when it precedes two distinct rows sharing its cursor", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      {
        agent: { isRunningTurn: false },
        rows: {
          entries: [
            { updatedSeq: "5" },
            { ...assistantRow("1", "first "), entryId: "a", updatedSeq: "5" },
            { ...assistantRow("2", "second"), entryId: "b", updatedSeq: "5" },
          ],
        },
      },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
  });

  for (const damaged of ["not JSON", "null", "false", "[]"]) {
    it(`rejects an unreadable body on first sighting: ${damaged}`, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        {
          agent: { isRunningTurn: false },
          rows: {
            entries: [
              assistantRow("2", "partial"),
              { seq: "1", updatedSeq: "3", body: Buffer.from(damaged).toString("base64") },
            ],
          },
        },
      ];
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error.type, "incomplete_turn");
    });
  }

  for (const omitted of [false, true]) {
    it(`applies same-frame deletions before idle settlement${omitted ? " for an omitted row" : " for readable text"}`, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        {
          agent: { isRunningTurn: false },
          rows: {
            entries: [
              omitted ? { seq: "1", updatedSeq: "1" } : assistantRow("1", "obsolete"),
              assistantRow("2", "answer"),
            ],
            deletes: [{ seq: "1", updatedSeq: "3" }],
          },
        },
      ];
      await assertWatchText("answer");
      assert.equal(watches().length, 1);
    });
  }

  it("rejects idle settlement with a readable answer and a same-frame newer omission", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true }, rows: { entries: [assistantRow("1", "draft")] } },
      {
        agent: { isRunningTurn: false },
        rows: { entries: [assistantRow("2", "answer"), { seq: "1", updatedSeq: "3" }] },
      },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
  });

  it("rejects an unversioned body after a versioned omission", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { rows: { entries: [{ seq: "1", updatedSeq: "3" }, assistantRow("2", "partial")] } },
      { rows: { entries: [{ ...assistantRow("1", "obsolete"), updatedSeq: undefined }] } },
      { agent: { isRunningTurn: false } },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
  });

  for (const staleBody of [false, true]) {
    it(`rejects an omitted newer row version${staleBody ? " even after an older body replays" : ""}`, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        { rows: { entries: [assistantRow("1", "obsolete")] } },
        { rows: { entries: [{ seq: "1", updatedSeq: "3" }] } },
        ...(staleBody ? [{ rows: { entries: [assistantRow("1", "obsolete")] } }] : []),
        { agent: { isRunningTurn: false } },
      ];
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }])
      )) as Response;
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error.type, "incomplete_turn");
    });
  }

  it("keeps the reconnect cursor behind an omitted newer row version", async () => {
    executor.setBridgeControllerForTests(null);
    let reads = 0;
    t.watchEventsAsync = async function* () {
      reads += 1;
      if (reads === 1) {
        yield {
          agent: { isRunningTurn: true },
          rows: { entries: [assistantRow("1", "obsolete")] },
        };
        yield { rows: { entries: [{ seq: "1", updatedSeq: "3" }] } };
      } else {
        yield {
          agent: { isRunningTurn: false },
          rows: { entries: [{ ...assistantRow("1", "answer"), updatedSeq: "3" }] },
        };
      }
    };
    await assertWatchText("answer");
    assert.equal(watches().length, 2);
    assert.equal(
      (watches()[1]?.payload.cursors as Array<{ afterUpdatedSeq: string }>)[0]?.afterUpdatedSeq,
      "2"
    );
  });

  it("does not clear a missing row when only an older body arrives", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { rows: { entries: [{ seq: "1", updatedSeq: "3" }, assistantRow("2", "partial")] } },
      { rows: { entries: [assistantRow("1", "obsolete")] } },
      { agent: { isRunningTurn: false } },
    ];
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 502);
    assert.equal((await response.json()).error.type, "incomplete_turn");
  });

  for (const unknownUpdate of [false, true]) {
    it(`rewinds to ${unknownUpdate ? "zero for an unversioned omission" : "the earliest of out-of-order omissions"}`, async () => {
      executor.setBridgeControllerForTests(null);
      let reads = 0;
      t.watchEventsAsync = async function* () {
        reads += 1;
        if (reads === 1) {
          yield {
            agent: { isRunningTurn: true },
            rows: { entries: [{ ...assistantRow("10", "answer"), updatedSeq: "20" }] },
          };
          yield {
            rows: {
              entries: unknownUpdate
                ? [{ seq: "1" }]
                : [
                    { seq: "2", updatedSeq: "8" },
                    { seq: "1", updatedSeq: "4" },
                  ],
            },
          };
        } else {
          yield {
            agent: { isRunningTurn: false },
            rows: {
              entries: unknownUpdate
                ? [assistantRow("1", "first ")]
                : [
                    { ...assistantRow("1", "first "), updatedSeq: "4" },
                    { ...assistantRow("2", "second "), updatedSeq: "8" },
                  ],
            },
          };
        }
      };
      await assertWatchText(unknownUpdate ? "first answer" : "first second answer");
      assert.equal(watches().length, 2);
      assert.equal(
        (watches()[1]?.payload.cursors as Array<{ afterUpdatedSeq: string }>)[0]?.afterUpdatedSeq,
        unknownUpdate ? "0" : "3"
      );
    });
  }

  it("ends a turn on the stale timer when isRunning never flips", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield {
        agentState: { live: [{ isRunning: true, staleAfterMs: 1000, updatedAtMs: Date.now() }] },
      };
      yield { rows: { entries: [{ body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("rejects a turn the server says failed even after text arrived", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEvents = [
      { agent: { isRunningTurn: true } },
      { entry: { kind: "send-message", message: { type: "text", content: "partial" } } },
      { turnFailed: { agentId: "agent-1" } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 502);
    const responseBody = (await res.json()) as { error?: { type?: string } };
    assert.equal(responseBody.error?.type, "incomplete_turn");
  });

  it("does not let a stale timer from the first watch abort the reconnected one", async () => {
    executor.setBridgeControllerForTests(null);
    let watchCount = 0;
    t.watchEventsAsync = async function* () {
      watchCount += 1;
      if (watchCount === 1) {
        yield {
          agentState: { live: [{ isRunning: true, staleAfterMs: 50, updatedAtMs: Date.now() }] },
        };
        yield { cursorTooOld: { generation: 3, sessionId: "" } };
        return;
      }
      yield { agent: { isRunningTurn: true } };
      yield { entry: { kind: "send-message", message: { type: "text", content: "pong" } } };
      yield { agent: { isRunningTurn: false } };
    };
    await assertWatchText("pong");
  });

  it("keeps a submitted answer when transcript rows remain missing", async () => {
    executor.setBridgeControllerForTests(null);
    t.watchEventsAsync = async function* () {
      yield { agent: { isRunningTurn: true } };
      yield { rows: { entries: [assistantRow("1", "draft transcript"), { seq: "7" }] } };
      yield {
        agent: { isRunningTurn: false },
        rows: { entries: [assistantRow("2", "late transcript")] },
        entry: {
          kind: "tool-call",
          tool: { name: "submit_answer", callId: "call-1", content: "explicit answer" },
        },
      };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "explicit answer");
    assert.equal(watches().length, 1);
  });

  it("keeps the stale timer across a watch that ends before the window", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    let watchCount = 0;
    t.watchEventsAsync = async function* () {
      watchCount += 1;
      if (watchCount === 1) {
        yield {
          agentState: { live: [{ isRunning: true, staleAfterMs: 80, updatedAtMs: Date.now() }] },
        };
        yield { rows: { entries: [{ body }] } };
        return;
      }
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("waits for the text row when isRunning drops first", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEvents = [
      { agentState: { live: [{ isRunning: true, staleAfterMs: 5000, updatedAtMs: Date.now() }] } },
      { agentState: { live: [{ isRunning: false, staleAfterMs: 5000, updatedAtMs: Date.now() }] } },
      { rows: { entries: [{ body }] } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("returns when the text arrives before any running frame", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEvents = [
      { rows: { entries: [{ body }] } },
      { agentState: { live: [{ staleAfterMs: 90000, updatedAtMs: Date.now() }] } },
    ];
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("returns the text row when no live entry says the turn is still running", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { rows: { entries: [{ body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("keeps reading while the same frame says the turn is still running", async () => {
    executor.setBridgeControllerForTests(null);
    const first = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    const second = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong!" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield {
        agentState: { live: [{ isRunning: true, staleAfterMs: 90000, updatedAtMs: Date.now() }] },
        rows: { entries: [{ body: first }] },
      };
      yield { rows: { entries: [{ body: second }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pongpong!");
  });

  it("does not arm the short timer when the agent frame says the turn is running", async () => {
    executor.setBridgeControllerForTests(null);
    const first = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    const second = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "!" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { agent: { isRunningTurn: true }, rows: { entries: [{ body: first }] } };
      await new Promise((resolve) => setTimeout(resolve, 2500));
      yield { rows: { entries: [{ body: second }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong!");
  });

  it("does not return the text it has when another row body never arrives", async () => {
    executor.setBridgeControllerForTests(null);
    await assertStaleOmission({ updatedSeq: "7" });
  });

  it("rejects stale partial text when an omitted row has only a sequence", async () => {
    executor.setBridgeControllerForTests(null);
    await assertStaleOmission({ seq: "7" });
  });

  async function assertStaleOmission(omission: { seq?: string; updatedSeq?: string }) {
    t.watchEventsAsync = async function* () {
      yield { rows: { entries: [omission, assistantRow("8", "pong")] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 502);
    const responseBody = (await res.json()) as { error?: { type?: string } };
    assert.equal(responseBody.error?.type, "incomplete_turn");
  }

  it("ignores a live frame that does not name an agent", async () => {
    executor.setBridgeControllerForTests(null);
    t.stampAgentId = false;
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { agentState: { live: [{ isRunning: true }] } };
      yield { agentState: { live: [{ isRunning: false }] } };
      yield { rows: { entries: [{ body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("ignores a live frame that names a different agent", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    t.watchEventsAsync = async function* () {
      yield { agentState: { live: [{ agentId: "other", isRunning: true }] } };
      yield { agentState: { live: [{ agentId: "other", isRunning: false }] } };
      yield { rows: { entries: [{ body }] } };
      await new Promise(() => {});
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const responseBody = (await res.json()) as {
      choices: Array<{ message: { content?: string } }>;
    };
    assert.equal(responseBody.choices[0]?.message.content, "pong");
  });

  it("reconnects from the last updatedSeq instead of the start", async () => {
    executor.setBridgeControllerForTests(null);
    const body = Buffer.from(
      JSON.stringify({
        kind: "send-message",
        clientNonce: null,
        message: { type: "text", content: "pong" },
      })
    ).toString("base64");
    let round = 0;
    t.watchEventsAsync = async function* () {
      round += 1;
      if (round === 1) {
        yield { rows: { entries: [{ seq: "1", body, updatedSeq: "5" }] } };
        return;
      }
      yield { agent: { isRunningTurn: true } };
      yield { agent: { isRunningTurn: false } };
    };
    const res = (await executor.execute(makeInput([{ role: "user", content: "hi" }]))) as Response;
    assert.equal(res.status, 200);
    const watches = t.calls.filter((call) => call.method === "WatchGrokBotTranscripts");
    const second = watches[1]?.payload.cursors as Array<{ afterUpdatedSeq?: string }> | undefined;
    assert.equal(second?.[0]?.afterUpdatedSeq, "5");
  });
  it("terminates an expired empty watch instead of reconnecting with an aborted signal", async () => {
    const client = new AbortController();
    const { getTransport, setGrokBotTransportForTests } =
      await import("../../open-sse/executors/grok-bot.ts");
    const transport = getTransport("fixture");
    let watches = 0;
    setGrokBotTransportForTests({
      rpc: transport.rpc.bind(transport),
      watch(method, payload, options) {
        watches += 1;
        // Bound the failing baseline without hiding its unexpected reconnect.
        if (watches > 1) client.abort();
        return transport.watch(method, payload, options);
      },
    });
    t.watchEventsAsync = async function* () {
      yield {
        agentState: { live: [{ isRunning: true, staleAfterMs: 1, updatedAtMs: Date.now() }] },
      };
      await new Promise(() => {});
    };
    try {
      const response = (await executor.execute(
        makeInput([{ role: "user", content: "hi" }], false, client.signal)
      )) as Response;
      assert.equal(response.status, 502);
      assert.equal((await response.json()).error.type, "incomplete_turn");
      assert.equal(watches, 1);
      assert.equal(t.calls.filter((c) => c.method === "DeleteGrokBotAgent").length, 1);
    } finally {
      client.abort();
      t.watchEventsAsync = undefined;
    }
  });
});
