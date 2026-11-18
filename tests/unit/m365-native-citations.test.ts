import test from "node:test";
import assert from "node:assert/strict";
import { M365TurnComposer } from "../../open-sse/executors/m365Protocol/composer.ts";
import {
  M365CitationLedger,
  m365Reference,
  renderM365Citations,
} from "../../open-sse/executors/m365Protocol/citations.ts";

type Frame = Record<string, unknown>;
const CONTROL = /[\uE200-\uE202]/;
const cite = (...ids: string[]) => `\uE200cite\uE202${ids.join("\uE202")}\uE201`;

/** A `references` entry as Copilot sends it: display data is a JSON string. */
function reference(id: string, url: string, title?: string, label = "1") {
  return {
    targetLink: url,
    displayData: {
      type: "text/json",
      renderType: "CITATION",
      content: JSON.stringify({
        metadata: { type: "Web", referenceType: 0, referenceId: id, citationRefId: id },
        label,
        providerDisplayName: "Example News",
        ...(title ? { Title: title } : {}),
        snippet: "…",
      }),
    },
  };
}
const forecast = reference("turn1search1", "https://news.example/forecast", "Forecast");
const radar = reference("turn1search2", "https://radar.example/live", "Radar", "2");

function snapshot(text: string, references: Frame = {}): Frame {
  return {
    type: 1,
    target: "update",
    arguments: [
      {
        cursor: { j: "$['bot'].adaptiveCards[0].body[0].text", p: -1 },
        messages: [{ author: "bot", messageId: "bot", text, references, contentOrigin: "DeepLeo" }],
      },
    ],
  };
}
const write = (text: string, references: Frame = {}): Frame => ({
  type: 1,
  target: "update",
  arguments: [{ writeAtCursor: text, references }],
});
const final = (text: string, references: Frame): Frame => ({
  type: 2,
  item: {
    result: { value: "Success" },
    messages: [{ author: "bot", messageId: "bot", text, references }],
  },
});

function play(frames: Frame[]) {
  const composer = new M365TurnComposer();
  let streamed = "";
  const annotations: unknown[] = [];
  let reasoning = "";
  for (const frame of frames) {
    const update = composer.push(frame);
    assert.equal(update.streamingDiverged, false);
    assert.doesNotMatch(update.delta, CONTROL, "a marker byte reached the stream");
    streamed += update.delta;
    annotations.push(...update.annotations);
    reasoning += update.reasoningDelta;
  }
  return { composer, streamed, annotations, reasoning };
}

test("a cited answer streams as text with numbered links and url_citation annotations", () => {
  const raw = `Rain is likely tomorrow.${cite("turn1search1")} Pack an umbrella.`;
  const { composer, streamed, annotations } = play([
    snapshot("Rain is likely"),
    // The marker is split across updates, and its source rides on the second one.
    write(` tomorrow.\uE200cite\uE202turn1sea`),
    write(`rch1\uE201 Pack an umbrella.`, { "1-d07884": forecast }),
    final(raw, { "1-d07884": forecast }),
  ]);
  const expected = "Rain is likely tomorrow. [1](https://news.example/forecast) Pack an umbrella.";
  assert.equal(composer.text, expected);
  assert.equal(streamed, expected);
  assert.deepEqual(annotations, composer.annotations);
  assert.deepEqual(composer.annotations, [
    {
      type: "url_citation",
      url_citation: {
        url: "https://news.example/forecast",
        title: "Forecast",
        start_index: 25,
        end_index: 59,
      },
    },
  ]);
  const { start_index, end_index } = composer.annotations[0].url_citation;
  assert.equal(expected.slice(start_index, end_index), "[1](https://news.example/forecast)");
});

test("text after a citation waits until its source arrives", () => {
  const composer = new M365TurnComposer();
  composer.push(snapshot("Before"));
  const held = composer.push(write(`.${cite("turn1search1")} After`));
  assert.equal(held.delta, ".", "the text after an unresolved citation was published early");
  const resolved = composer.push(write(" more.", { "1-d07884": forecast }));
  assert.equal(resolved.delta, " [1](https://news.example/forecast) After more.");
  assert.equal(resolved.annotations.length, 1);
});

test("a source that never arrives, or a marker cut off by the end of the turn, is dropped", () => {
  const { composer, streamed } = play([
    snapshot(`Answer.${cite("turn9search9")} Done.\uE200cite\uE202turn1`),
    { type: 3, invocationId: "0" },
  ]);
  assert.equal(composer.text, "Answer. Done.");
  assert.equal(streamed, "Answer. Done.");
  assert.deepEqual(composer.annotations, []);
});

test("several sources in one marker, and a repeated source, keep stable numbers", () => {
  const ledger = new M365CitationLedger();
  ledger.add({ "1-a": forecast, "2-b": radar });
  const rendered = renderM365Citations(
    `Storms.${cite("turn1search1", "turn1search2")} Later.${cite("turn1search1")}`,
    ledger,
    true
  );
  assert.equal(
    rendered.text,
    "Storms. [1](https://news.example/forecast) [2](https://radar.example/live) Later. [1](https://news.example/forecast)"
  );
  assert.deepEqual(
    rendered.annotations.map((a) =>
      rendered.text.slice(a.url_citation.start_index, a.url_citation.end_index)
    ),
    [
      "[1](https://news.example/forecast)",
      "[2](https://radar.example/live)",
      "[1](https://news.example/forecast)",
    ]
  );
});

test("a marker used as a Markdown link target becomes that link's URL", () => {
  const ledger = new M365CitationLedger();
  ledger.add({
    "1-f": reference("turn1file1", "https://contoso.sharepoint.com/plan.md", "plan.md"),
  });
  const rendered = renderM365Citations(`Updated [plan.md](${cite("turn1file1")}).`, ledger, true);
  assert.equal(rendered.text, "Updated [plan.md](https://contoso.sharepoint.com/plan.md).");
  const [annotation] = rendered.annotations;
  assert.equal(
    rendered.text.slice(annotation.url_citation.start_index, annotation.url_citation.end_index),
    "https://contoso.sharepoint.com/plan.md"
  );
});

test("only web sources with a marker id are trusted; display data falls back to the host", () => {
  assert.equal(m365Reference(reference("turn1search1", "javascript:alert(1)")), null);
  assert.equal(m365Reference({ targetLink: "https://news.example/a" }), null);
  assert.equal(m365Reference({ ...forecast, displayData: { content: "not json" } }), null);
  assert.equal(m365Reference(reference("bad id!", "https://news.example/a")), null);
  const untitled = reference("turn2search1", "https://news.example/a");
  const parsed = JSON.parse(untitled.displayData.content);
  delete parsed.providerDisplayName;
  untitled.displayData.content = JSON.stringify(parsed);
  assert.deepEqual(m365Reference(untitled), {
    id: "turn2search1",
    source: { url: "https://news.example/a", title: "news.example" },
  });
});

test("private-use text that is not a citation marker stays as written", () => {
  const ledger = new M365CitationLedger();
  for (const raw of ["a\uE200b", `x\uE200note\uE201y`, `\uE200cite\uE202${"z".repeat(2000)}`]) {
    assert.equal(renderM365Citations(raw, ledger, true).text, raw);
  }
});

test("Copilot's reasoning summary streams apart from the answer", () => {
  const thought = (text: string): Frame => ({
    type: 1,
    target: "update",
    arguments: [
      {
        messages: [
          {
            author: "bot",
            messageId: "cot",
            messageType: "Progress",
            contentOrigin: "ChainOfThoughtSummary",
            addToChainOfThought: true,
            text,
          },
        ],
      },
    ],
  });
  const { composer, streamed, reasoning } = play([
    thought("Checking the forecast"),
    thought("Checking the forecast for tomorrow"),
    snapshot("Rain is likely."),
    { type: 3, invocationId: "0" },
  ]);
  assert.equal(composer.text, "Rain is likely.");
  assert.equal(streamed, "Rain is likely.");
  assert.equal(reasoning, "Checking the forecast for tomorrow");
  assert.equal(composer.reasoning, "Checking the forecast for tomorrow");
});

test("a reasoning summary that rewrites itself stops streaming without failing the answer", () => {
  const composer = new M365TurnComposer();
  const cot = (text: string): Frame => ({
    type: 1,
    target: "update",
    arguments: [
      {
        messages: [
          {
            author: "bot",
            messageId: "cot",
            messageType: "Progress",
            addToChainOfThought: true,
            text,
          },
        ],
      },
    ],
  });
  assert.equal(composer.push(cot("First plan")).reasoningDelta, "First plan");
  const rewritten = composer.push(cot("Second plan"));
  assert.equal(rewritten.reasoningDelta, "");
  assert.equal(rewritten.streamingDiverged, false);
  assert.equal(composer.push(snapshot("Answer.")).delta, "Answer.");
  assert.equal(composer.reasoning, "Second plan");
});
