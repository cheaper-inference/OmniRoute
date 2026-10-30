import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const {
  applyTranscriptFrame,
  nextTranscriptRequest,
  recordedSend,
  localRowId,
  mergeTranscriptRows,
} = await import("../../../src/app/(dashboard)/dashboard/grok-bot/transcript.ts");

// Entries as the service actually sends them: `entryKind` says who spoke, and the
// message itself is base64 JSON in `body`. Fixtures that put `role`/`text` on the
// entry read like our reader instead of like the wire, and they hid the fact that
// nothing was ever decoded.
const wire = (entryKind: string, message: unknown, updatedSeq: string, entryId = "e1") => ({
  seq: updatedSeq,
  entryKind,
  entryId,
  updatedSeq,
  body: Buffer.from(JSON.stringify(message), "utf-8").toString("base64"),
});
// The reply rows come down as entryKind "send-message" with the text inside
// `message`, while the user's own row comes back as entryKind "message" carrying
// `role`, `content` and the nonce we sent. Measured from a live capture.
const reply = (text: string) => ({ message: { type: "text", content: text } });

test("replay frames move the cursor and keep the history they carry", () => {
  // The snapshot's rows are the conversation. Dropping them until the seal left
  // a freshly opened bot blank, which is what this test used to require.
  const start = { cursor: "0", visible: [], permissions: [], sealed: false };
  const replayed = applyTranscriptFrame(start, {
    replay: true,
    rows: { entries: [wire("send-message", reply("old"), "10")] },
  });
  assert.equal(replayed.cursor, "10");
  assert.deepEqual(replayed.visible, [
    { seq: "10", entryId: "e1", role: "assistant", text: "old", clientNonce: "", streaming: false },
  ]);
  assert.equal(replayed.sealed, false);

  const sealed = applyTranscriptFrame(replayed, { heartbeat: true });
  assert.equal(sealed.sealed, true);
  assert.equal(sealed.visible.length, 1);
});

test("the cursor compares decimal strings past the safe integer limit", () => {
  const state = { cursor: "9007199254740993", visible: [], permissions: [], sealed: true };
  const next = applyTranscriptFrame(state, {
    rows: { entries: [wire("send-message", reply("x"), "9007199254740992")] },
  });
  assert.equal(next.cursor, "9007199254740993");
});

test("rows after the seal are shown", () => {
  const sealed = { cursor: "10", visible: [], permissions: [], sealed: true };
  const next = applyTranscriptFrame(sealed, {
    rows: { entries: [wire("send-message", reply("new"), "11")] },
  });
  assert.equal(next.cursor, "11");
  assert.deepEqual(next.visible, [
    { seq: "11", entryId: "e1", role: "assistant", text: "new", clientNonce: "", streaming: false },
  ]);
});

test("an absent client nonce never confirms a send", () => {
  assert.equal(recordedSend("", { role: "user", clientNonce: "" }), false);
  assert.equal(recordedSend("", { role: "user" }), false);
  assert.equal(recordedSend("abc", { role: "user", clientNonce: "abc" }), true);
});

test("a pending local tool request is surfaced instead of dropped", () => {
  // The bot asking to touch the machine is a message type of its own; a reader
  // that only keeps role+text left the bot waiting with a blank card.
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], permissions: [], sealed: false },
    {
      rows: {
        entries: [
          wire(
            "send-message",
            {
              message: {
                type: "local-tool-permission",
                ask: {
                  requestId: "req-1",
                  action: "run-command",
                  target: "/home/houminxi/Downloads",
                  machineId: "m-1",
                  status: "pending",
                },
              },
            },
            "12",
            "entry-9"
          ),
        ],
      },
    }
  );
  assert.deepEqual(state.permissions, [
    {
      seq: "12",
      entryId: "entry-9",
      requestId: "req-1",
      action: "run-command",
      target: "/home/houminxi/Downloads",
      machineId: "m-1",
      status: "pending",
    },
  ]);
  assert.deepEqual(state.visible, [], "a permission request is not conversation text");
});

test("a connector card is kept when it has a name but no request id", () => {
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], cards: [], permissions: [], sealed: false },
    {
      rows: {
        entries: [
          wire(
            "send-message",
            {
              message: {
                type: "connector",
                connector: "Finance",
                serverId: "grok:user-Finance-xai",
                variant: "connect",
              },
            },
            "20",
            "entry-20"
          ),
        ],
      },
    }
  );
  assert.deepEqual(state.cards, [
    {
      seq: "20",
      entryId: "entry-20",
      kind: "connector",
      name: "Finance",
      requestId: "",
      action: "connect",
    },
  ]);
});

test("an email draft keeps its body", () => {
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], cards: [], permissions: [], sealed: false },
    {
      rows: {
        entries: [
          wire(
            "send-message",
            {
              message: {
                type: "email-draft",
                draft: {
                  from: "a@x.ai",
                  to: ["b@x.ai"],
                  subject: "Hello",
                  body: "The actual message",
                },
              },
            },
            "21",
            "entry-21"
          ),
        ],
      },
    }
  );
  assert.equal(state.cards[0]?.kind === "email" ? state.cards[0].body : "", "The actual message");
});

test("a live secret card reads the label at the message root", () => {
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], cards: [], permissions: [], sealed: false },
    {
      rows: {
        entries: [
          wire(
            "send-message",
            { type: "secret-request", secretRequest: { label: "PROBE_TOKEN" } },
            "22",
            "entry-22"
          ),
        ],
      },
    }
  );
  assert.equal(state.cards[0]?.kind === "secret" ? state.cards[0].label : "", "PROBE_TOKEN");
});

test("repeated unsupported messages stay as one card", () => {
  let state = { cursor: "0", visible: [], cards: [], permissions: [], sealed: false };
  for (let index = 1; index <= 94; index += 1) {
    state = applyTranscriptFrame(state, {
      rows: {
        entries: [
          wire("send-message", { type: `unused-${index}` }, String(index), `entry-${index}`),
        ],
      },
    });
  }
  assert.equal(state.cards.length, 1);
});

test("a later answer replaces the request instead of stacking another card", () => {
  const ask = (status: string) => ({
    rows: {
      entries: [
        wire(
          "send-message",
          {
            message: {
              type: "local-tool-permission",
              ask: {
                requestId: "req-1",
                action: "run-command",
                target: "/tmp",
                machineId: "m",
                status,
              },
            },
          },
          status === "pending" ? "12" : "13"
        ),
      ],
    },
  });
  const first = applyTranscriptFrame(
    { cursor: "0", visible: [], permissions: [], sealed: false },
    ask("pending")
  );
  const second = applyTranscriptFrame(first, ask("always"));
  assert.equal(second.permissions.length, 1);
  assert.equal(second.permissions[0].status, "always");
});

test("a notice carries its text at the top level, not under message", () => {
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], permissions: [], sealed: false },
    { rows: { entries: [wire("send-message", { text: "the box restarted" }, "14")] } }
  );
  assert.deepEqual(state.visible, [
    {
      seq: "14",
      entryId: "e1",
      role: "assistant",
      text: "the box restarted",
      clientNonce: "",
      streaming: false,
    },
  ]);
});

test("a captured frame decodes to the two rows it actually contains", async () => {
  // This fixture is a frame recorded from the live service, not a shape written
  // from the reader. It is the guard the earlier fixtures could not be: they
  // encoded the reader's assumption, so they agreed with it forever.
  const frames = JSON.parse(
    await readFile(
      new URL("../../fixtures/grok-bot-transcript-frames.json", import.meta.url),
      "utf-8"
    )
  ) as unknown[];
  let state = {
    cursor: "0",
    visible: [] as unknown[],
    permissions: [] as unknown[],
    sealed: false,
  };
  for (const frame of frames) state = applyTranscriptFrame(state, frame);
  const rows = state.visible as Array<{ role: string; text: string; clientNonce: string }>;
  assert.equal(rows.length, 2);
  const mine = rows.find((row) => row.role === "user");
  const reply = rows.find((row) => row.role === "assistant");
  assert.ok(mine, "the user row is decoded as the user's");
  assert.ok(reply, "the reply is decoded as the bot's");
  assert.ok(mine!.text.length > 0 && reply!.text.length > 0);
  assert.notEqual(mine!.clientNonce, "", "the echo carries the id we sent");
  assert.equal(reply!.clientNonce, "");
});

test("the service's own role label outranks the transport entry kind", () => {
  // Six captured rows never disagree: `role` only ever appears on the user's own
  // row, and every bot row carries none. So "role wins" is a decision, not a
  // measurement, and this test exists to make a future reversal deliberate. The
  // experiment that would settle it is a captured bot row that carries `role`.
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], permissions: [], sealed: false },
    { rows: { entries: [wire("send-message", { role: "user", content: "hello" }, "20")] } }
  );
  assert.deepEqual(state.visible, [
    { seq: "20", entryId: "e1", role: "user", text: "hello", clientNonce: "", streaming: false },
  ]);
});

test("an unfamiliar role is not relabelled as the bot", () => {
  // The client switches on "user", on "article", and on the field being absent;
  // collapsing everything that is not "user" into the bot's side would mislabel
  // rows the service already labelled itself.
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], permissions: [], sealed: false },
    { rows: { entries: [wire("send-message", { role: "article", content: "long form" }, "21")] } }
  );
  assert.equal((state.visible[0] as { role: string }).role, "article");
});

test("attachment, notice, connector, widget and unknown rows keep their own shape", () => {
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], cards: [], permissions: [], sealed: false },
    {
      rows: {
        entries: [
          wire(
            "send-message",
            {
              message: {
                type: "attachment",
                file_name: "notes.txt",
                url: "https://secret.example/file",
              },
            },
            "30",
            "file"
          ),
          wire("send-message", { kind: "notice", text: "paused" }, "31", "note"),
          wire(
            "send-message",
            {
              message: {
                type: "connector",
                connector: "GitHub",
                requestId: "grant",
                serverId: "server-secret",
              },
            },
            "32",
            "link"
          ),
          wire(
            "send-message",
            {
              message: {
                type: "widget",
                prompt: "Pick one",
                options: [
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                ],
                allowCustom: true,
                multiSelect: false,
                dismissOnMoveOn: false,
              },
            },
            "33",
            "choice"
          ),
          wire(
            "send-message",
            { message: { type: "canvas", payload: { secret: "hidden" } } },
            "34",
            "other"
          ),
        ],
      },
    }
  );
  assert.deepEqual(state.cards, [
    { seq: "30", entryId: "file", kind: "attachment", fileName: "notes.txt" },
    { seq: "31", entryId: "note", kind: "notice", text: "paused" },
    {
      seq: "32",
      entryId: "link",
      kind: "connector",
      name: "GitHub",
      requestId: "grant",
      action: "connect",
    },
    {
      seq: "33",
      entryId: "choice",
      kind: "widget",
      prompt: "Pick one",
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
      ],
      allowCustom: true,
      multiSelect: false,
      dismissOnMoveOn: false,
    },
    { seq: "34", entryId: "other", kind: "unknown", type: "canvas" },
  ]);
  assert.equal(JSON.stringify(state.cards).includes("secret"), false);
});

test("a widget option object shows its label and returns its value", () => {
  const state = applyTranscriptFrame(
    { cursor: "0", visible: [], cards: [], permissions: [], sealed: false },
    {
      rows: {
        entries: [
          wire(
            "send-message",
            {
              message: {
                type: "widget",
                prompt: "Land?",
                options: [{ label: "Yes", value: "land-now", style: "primary" }, { label: "Hold" }],
              },
            },
            "35",
            "ask"
          ),
        ],
      },
    }
  );
  assert.deepEqual(state.cards, [
    {
      seq: "35",
      entryId: "ask",
      kind: "widget",
      prompt: "Land?",
      options: [
        { label: "Yes", value: "land-now" },
        { label: "Hold", value: "Hold" },
      ],
      allowCustom: false,
      multiSelect: false,
      dismissOnMoveOn: false,
    },
  ]);
  assert.equal(JSON.stringify(state.cards).includes("primary"), false);
});

test("an oversized or deeply nested body becomes unsupported", () => {
  const huge = applyTranscriptFrame(
    { cursor: "0", visible: [], cards: [], permissions: [], sealed: false },
    {
      rows: {
        entries: [
          wire(
            "send-message",
            { message: { type: "text", content: "x".repeat(4001) } },
            "40",
            "big"
          ),
        ],
      },
    }
  );
  const nested = { message: { type: "text", content: "ok" } } as Record<string, unknown>;
  let cursor: Record<string, unknown> = nested;
  for (let i = 0; i < 8; i += 1) {
    cursor.child = {};
    cursor = cursor.child as Record<string, unknown>;
  }
  const deep = applyTranscriptFrame(
    { cursor: "0", visible: [], cards: [], permissions: [], sealed: false },
    { rows: { entries: [wire("send-message", nested, "41", "deep")] } }
  );
  assert.deepEqual(huge.cards, [{ seq: "40", entryId: "big", kind: "unknown", type: "oversize" }]);
  assert.deepEqual(deep.cards, [{ seq: "41", entryId: "deep", kind: "unknown", type: "oversize" }]);
});

test("the next request hands the cards to the page", () => {
  const next = nextTranscriptRequest(
    { phase: "live", after: "0" },
    { rows: { entries: [wire("send-message", { kind: "notice", text: "paused" }, "31", "note")] } }
  );
  assert.deepEqual(next.cards, [{ seq: "31", entryId: "note", kind: "notice", text: "paused" }]);
});

const spoken = (seq: string, text: string, entryId = "") => ({
  seq,
  entryId,
  role: "assistant",
  text,
  clientNonce: "",
  streaming: false,
});

test("a row with no server id keeps one local id as its text grows", () => {
  const first = localRowId([], [spoken("5", "hel")], 0, 0, "acc:bot");
  assert.equal(first.item.entryId, "anon-acc:bot:0");
  const grown = localRowId([first.item], [spoken("5", "hello")], 0, first.next, "acc:bot");
  assert.equal(grown.item.entryId, "anon-acc:bot:0", "the same row must keep its id");
  assert.equal(grown.next, first.next, "reusing an id spends nothing");
  const shown = mergeTranscriptRows([first.item], [grown.item]);
  assert.equal(shown.length, 1, "growth replaces the row, it does not add one");
  assert.equal(shown[0].text, "hello");
});

test("a server id arriving for a locally numbered row replaces that row", () => {
  const streamed = localRowId([], [spoken("5", "hello")], 0, 0, "acc:bot").item;
  const confirmed = spoken("5", "hello", "server-9");
  const shown = mergeTranscriptRows([streamed], [confirmed]);
  assert.equal(shown.length, 1, "the same text must not render twice");
  assert.equal(shown[0].entryId, "server-9");
});

test("the same words from the user and the bot stay two rows", () => {
  const user = { ...spoken("5", "ok"), role: "user" };
  const bot = spoken("5", "ok");
  const first = localRowId([], [user], 0, 0, "acc:bot");
  const second = localRowId([first.item], [bot], 0, first.next, "acc:bot");
  assert.notEqual(first.item.entryId, second.item.entryId, "a different role is a different row");
  const shown = mergeTranscriptRows(
    [first.item, second.item],
    [
      { ...user, entryId: "s-user" },
      { ...bot, entryId: "s-bot" },
    ]
  );
  assert.deepEqual(
    shown.map((row) => row.entryId),
    ["s-user", "s-bot"]
  );
  assert.deepEqual(
    shown.map((row) => row.role),
    ["user", "assistant"]
  );
});

test("a mixed-role frame reuses each row's own id on the next frame", () => {
  const frame = [{ ...spoken("5", "ok"), role: "user" }, spoken("5", "ok")];
  let next = 0;
  const named = frame.map((unused, index) => {
    const result = localRowId([], frame, index, next, "acc:bot");
    next = result.next;
    return result.item;
  });
  const replayed = frame.map(
    (unused, index) => localRowId(named, frame, index, next, "acc:bot").item
  );
  assert.deepEqual(
    replayed.map((row) => row.entryId),
    named.map((row) => row.entryId)
  );
  assert.equal(new Set(replayed.map((row) => row.entryId)).size, 2);
});
