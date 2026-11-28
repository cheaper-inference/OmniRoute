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
} from "../helpers/grokBotExecutorFixture.ts";
before(prepareExecutorFixture);
after(cleanupExecutorFixture);

describe("GrokBotExecutor watch row replay", () => {
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

  function assistantRow(seq: string, content: string) {
    return {
      seq,
      updatedSeq: seq,
      body: Buffer.from(
        JSON.stringify({
          kind: "send-message",
          clientNonce: null,
          message: { type: "text", content },
        })
      ).toString("base64"),
    };
  }

  async function assertWatchText(expected: string) {
    const response = (await executor.execute(
      makeInput([{ role: "user", content: "hi" }])
    )) as Response;
    assert.equal(response.status, 200);
    assert.equal((await response.json()).choices[0]?.message.content, expected);
  }

  const replayCases = [
    {
      name: "keeps a direct reply pending across unrelated replay rows",
      events: [
        { rows: { entries: [assistantRow("1", "first ")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "answer" } } },
        { rows: { entries: [assistantRow("1", "first "), assistantRow("2", "answer")] } },
      ],
      expected: "first answer",
    },
    {
      name: "reconciles several direct replies with a delayed transcript batch",
      events: [
        { entry: { kind: "send-message", message: { type: "text", content: "first " } } },
        { entry: { kind: "send-message", message: { type: "text", content: "answer" } } },
        { rows: { entries: [assistantRow("1", "first "), assistantRow("2", "answer")] } },
      ],
      expected: "first answer",
    },
    {
      name: "recognizes a replay that adds an entry identity",
      events: [
        { rows: { entries: [assistantRow("1", "answer")] } },
        { rows: { entries: [{ ...assistantRow("1", "answer"), entryId: "entry-1" }] } },
        {
          rows: {
            entries: [
              {
                ...assistantRow("1", "revised"),
                seq: undefined,
                entryId: "entry-1",
                updatedSeq: "3",
              },
            ],
          },
        },
      ],
      expected: "revised",
    },
    {
      name: "matches a delayed direct reply against a transcript part that is not last",
      events: [
        { rows: { entries: [assistantRow("1", "first "), assistantRow("2", "answer")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "first " } } },
      ],
      expected: "first answer",
    },
    {
      name: "keeps distinct identified rows that share an update cursor",
      events: [
        {
          rows: {
            entries: [
              { ...assistantRow("1", "first "), entryId: "entry-1", updatedSeq: "5" },
              { ...assistantRow("2", "answer"), entryId: "entry-2", updatedSeq: "5" },
            ],
          },
        },
      ],
      expected: "first answer",
    },
    {
      name: "merges row aliases when separate identities are later linked",
      events: [
        { rows: { entries: [{ entryId: "entry-1", updatedSeq: "1" }] } },
        { rows: { entries: [{ ...assistantRow("1", "answer"), updatedSeq: "2" }] } },
        {
          rows: {
            entries: [{ ...assistantRow("1", "answer"), entryId: "entry-1", updatedSeq: "3" }],
          },
        },
      ],
      expected: "answer",
    },
    {
      name: "removes every text alias when linked row identities are deleted",
      events: [
        { rows: { entries: [{ ...assistantRow("1", "obsolete"), updatedSeq: "1" }] } },
        {
          rows: {
            entries: [
              {
                ...assistantRow("1", "obsolete"),
                seq: undefined,
                entryId: "entry-1",
                updatedSeq: "2",
              },
            ],
          },
        },
        { rows: { deletes: [{ seq: "1", entryId: "entry-1", updatedSeq: "3" }] } },
        { rows: { entries: [assistantRow("2", "answer")] } },
      ],
      expected: "answer",
    },
    {
      name: "prefers a hydrated alias over an equal-version omission",
      events: [
        { rows: { entries: [{ seq: "1", updatedSeq: "5" }] } },
        {
          rows: {
            entries: [
              { ...assistantRow("1", "answer"), seq: undefined, entryId: "e", updatedSeq: "5" },
            ],
          },
        },
        { rows: { entries: [{ seq: "1", entryId: "e", updatedSeq: "5" }] } },
      ],
      expected: "answer",
    },
    {
      name: "removes retained text when a later alias reveals a tombstone",
      events: [
        { rows: { entries: [assistantRow("1", "obsolete")] } },
        { rows: { deletes: [{ entryId: "e", updatedSeq: "2" }] } },
        { rows: { entries: [{ seq: "1", entryId: "e", updatedSeq: "3" }] } },
        { rows: { entries: [assistantRow("2", "answer")] } },
      ],
      expected: "answer",
    },
    {
      name: "does not retain a newer text alias when linked to a deleted row",
      events: [
        { rows: { entries: [assistantRow("1", "obsolete")] } },
        { rows: { deletes: [{ seq: "1", updatedSeq: "2" }] } },
        {
          rows: {
            entries: [
              { ...assistantRow("1", "obsolete"), seq: undefined, entryId: "e", updatedSeq: "3" },
            ],
          },
        },
        { rows: { entries: [{ seq: "1", entryId: "e", updatedSeq: "4" }] } },
        { rows: { entries: [assistantRow("2", "answer")] } },
      ],
      expected: "answer",
    },
    {
      name: "orders a hydrated row when a bodyless alias supplies its sequence",
      events: [
        { rows: { entries: [assistantRow("10", "answer")] } },
        {
          rows: {
            entries: [
              { ...assistantRow("2", "first "), seq: undefined, entryId: "e", updatedSeq: "12" },
            ],
          },
        },
        { rows: { entries: [{ seq: "2", entryId: "e", updatedSeq: "12" }] } },
      ],
      expected: "first answer",
    },
    {
      name: "does not overwrite a versioned body with an unversioned replay",
      events: [
        { rows: { entries: [{ ...assistantRow("1", "revised"), updatedSeq: "3" }] } },
        { rows: { entries: [{ ...assistantRow("1", "obsolete"), updatedSeq: undefined }] } },
      ],
      expected: "revised",
    },
    {
      name: "pairs a direct echo before a later distinct message repeats that text",
      events: [
        { rows: { entries: [assistantRow("1", "A")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "A" } } },
        { entry: { kind: "send-message", message: { type: "text", content: "B" } } },
        { entry: { kind: "send-message", message: { type: "text", content: "A" } } },
      ],
      expected: "ABA",
    },
    {
      name: "hydrates a provisional omission when its identified body arrives",
      events: [
        { rows: { entries: [{ updatedSeq: "5" }] } },
        { rows: { entries: [{ ...assistantRow("1", "answer"), entryId: "e", updatedSeq: "5" }] } },
      ],
      expected: "answer",
    },
    {
      name: "reconciles the direct echo of a revised transcript row",
      events: [
        { rows: { entries: [assistantRow("1", "A")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "A" } } },
        { rows: { entries: [assistantRow("2", "C")] } },
        { rows: { entries: [{ ...assistantRow("1", "B"), updatedSeq: "3" }] } },
        { entry: { kind: "send-message", message: { type: "text", content: "B" } } },
      ],
      expected: "BC",
    },
    {
      name: "reconciles a revised row that originally arrived as direct text",
      events: [
        { entry: { kind: "send-message", message: { type: "text", content: "draft" } } },
        { rows: { entries: [assistantRow("1", "draft")] } },
        { rows: { entries: [{ ...assistantRow("1", "final"), updatedSeq: "2" }] } },
        { entry: { kind: "send-message", message: { type: "text", content: "tail" } } },
        { entry: { kind: "send-message", message: { type: "text", content: "final" } } },
      ],
      expected: "finaltail",
    },
    {
      name: "pairs direct text that arrives before a row revision",
      events: [
        { rows: { entries: [assistantRow("1", "draft"), assistantRow("2", " tail")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "final" } } },
        { rows: { entries: [{ ...assistantRow("1", "final"), updatedSeq: "3" }] } },
      ],
      expected: "final tail",
    },
    {
      name: "keeps later direct text after rows that preceded it",
      events: [
        { rows: { entries: [assistantRow("10", "B")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "C" } } },
        { rows: { entries: [assistantRow("2", "A")] } },
      ],
      expected: "ABC",
    },
    {
      name: "does not infer row deletion from matching direct text alone",
      events: [
        { rows: { entries: [assistantRow("1", "repeat"), assistantRow("2", "first ")] } },
        { rows: { deletes: [{ seq: "1", updatedSeq: "3" }] } },
        // Direct frames have no row identity to associate with the deletion.
        { entry: { kind: "send-message", message: { type: "text", content: "repeat" } } },
      ],
      expected: "first repeat",
    },
    {
      name: "keeps the newer hydrated body when unequal versions are linked without a body",
      events: [
        { rows: { entries: [assistantRow("1", "obsolete")] } },
        {
          rows: {
            entries: [
              { ...assistantRow("1", "answer"), seq: undefined, entryId: "e", updatedSeq: "5" },
            ],
          },
        },
        { rows: { entries: [{ seq: "1", entryId: "e", updatedSeq: "5" }] } },
      ],
      expected: "answer",
    },
    {
      name: "retires a promoted update alias before a different cursor-only body",
      events: [
        { rows: { entries: [{ updatedSeq: "5" }] } },
        { rows: { entries: [{ ...assistantRow("1", "A"), entryId: "a", updatedSeq: "5" }] } },
        { rows: { entries: [{ ...assistantRow("2", "B"), seq: undefined, updatedSeq: "5" }] } },
        { rows: { entries: [{ ...assistantRow("2", "B"), entryId: "b", updatedSeq: "5" }] } },
      ],
      expected: "AB",
    },
    {
      name: "keeps a merged revision in the original row position",
      events: [
        { rows: { entries: [assistantRow("1", "draft")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "tail" } } },
        {
          rows: {
            entries: [
              { ...assistantRow("1", "final"), seq: undefined, entryId: "e", updatedSeq: "3" },
            ],
          },
        },
        { rows: { entries: [{ seq: "1", entryId: "e", updatedSeq: "3" }] } },
      ],
      expected: "finaltail",
    },
    {
      name: "refreshes echo pairing for a new version with unchanged text",
      events: [
        { rows: { entries: [assistantRow("1", "A")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "A" } } },
        { rows: { entries: [assistantRow("2", "C")] } },
        { rows: { entries: [{ ...assistantRow("1", "A"), updatedSeq: "3" }] } },
        { entry: { kind: "send-message", message: { type: "text", content: "A" } } },
      ],
      expected: "AC",
    },
    {
      name: "preserves a completed echo match when equal-version aliases merge",
      events: [
        { rows: { entries: [assistantRow("1", "A")] } },
        { entry: { kind: "send-message", message: { type: "text", content: "A" } } },
        { rows: { entries: [assistantRow("2", "C")] } },
        { rows: { entries: [{ ...assistantRow("1", "A"), seq: undefined, entryId: "e" }] } },
        { rows: { entries: [{ seq: "1", entryId: "e", updatedSeq: "1" }] } },
        { entry: { kind: "send-message", message: { type: "text", content: "A" } } },
      ],
      expected: "ACA",
    },
    {
      name: "keeps distinct direct text from a frame that also contains rows",
      events: [
        {
          rows: { entries: [assistantRow("1", "first ")] },
          entry: { kind: "send-message", message: { type: "text", content: "answer" } },
        },
      ],
      expected: "first answer",
    },
    {
      name: "ignores a stale version of an updated transcript row",
      events: [
        { rows: { entries: [{ ...assistantRow("1", "answer"), updatedSeq: "3" }] } },
        { rows: { entries: [{ ...assistantRow("1", "obsolete"), updatedSeq: "2" }] } },
      ],
      expected: "answer",
    },
    {
      name: "does not resurrect a deleted row during replay",
      events: [
        { rows: { entries: [assistantRow("1", "obsolete"), assistantRow("2", "answer")] } },
        { rows: { deletes: [{ seq: "1", updatedSeq: "3" }] } },
        { rows: { entries: [assistantRow("1", "obsolete")] } },
      ],
      expected: "answer",
    },
    {
      name: "orders a recovered body before a later transcript row",
      events: [
        { rows: { entries: [assistantRow("10", "answer"), { seq: "2", updatedSeq: "12" }] } },
        { rows: { entries: [{ ...assistantRow("2", "first "), updatedSeq: "12" }] } },
      ],
      expected: "first answer",
    },
    {
      name: "keeps distinct updated-sequence-only rows and suppresses their replay",
      events: [
        {
          rows: {
            entries: [
              { ...assistantRow("1", "A"), seq: undefined },
              { ...assistantRow("2", "A"), seq: undefined },
              { ...assistantRow("3", "B"), seq: undefined },
              { ...assistantRow("1", "A"), seq: undefined },
            ],
          },
        },
      ],
      expected: "AAB",
    },
    {
      name: "replaces text when an existing transcript row is updated",
      events: [
        { rows: { entries: [assistantRow("1", "first")] } },
        { rows: { entries: [{ ...assistantRow("1", "first answer"), updatedSeq: "2" }] } },
      ],
      expected: "first answer",
    },
    {
      name: "clears an omission deleted later in the same frame",
      events: [
        {
          rows: {
            entries: [{ seq: "7", updatedSeq: "7" }, assistantRow("8", "answer")],
            deletes: [{ seq: "7", updatedSeq: "9" }],
          },
        },
      ],
      expected: "answer",
    },
    {
      name: "removes deleted text before settling the transcript",
      events: [
        { rows: { entries: [assistantRow("1", "obsolete"), assistantRow("2", "answer")] } },
        { rows: { deletes: [{ seq: "1", updatedSeq: "3" }] } },
      ],
      expected: "answer",
    },
  ];
  for (const { name, events, expected } of replayCases) {
    it(name, async () => {
      executor.setBridgeControllerForTests(null);
      t.watchEvents = [
        { agent: { isRunningTurn: true } },
        ...events.map((event) => ({ ...event, agent: { isRunningTurn: true } })),
        { agent: { isRunningTurn: false } },
      ];
      await assertWatchText(expected);
    });
  }
});
