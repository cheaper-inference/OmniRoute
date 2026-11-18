import assert from "node:assert/strict";
import test from "node:test";
import { createClientTerminalWatcher } from "../../open-sse/utils/streamTerminal.ts";
import { withResponsesFailureContext } from "../../open-sse/utils/responsesSequence.ts";
const frame = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;

for (const newline of ["\n", "\r\n", "\r"]) {
  test(`terminal recognition needs a complete event, newline=${JSON.stringify(newline)}`, () => {
    const watcher = createClientTerminalWatcher("openai-responses");
    const raw = frame({ type: "response.completed", response: { status: "completed" } }).replace(
      /\n/g,
      newline
    );
    const end = raw.length - newline.length;
    assert.equal(watcher.note(raw.slice(0, end)), false);
    assert.equal(watcher.atBoundary(), false);
    assert.equal(watcher.note(raw.slice(end)), true);
  });
  test(`stale named SSE event cannot turn the next unnamed frame into a terminal / ${JSON.stringify(newline)}`, () => {
    const watcher = createClientTerminalWatcher("openai-responses");
    const raw =
      'event: response.completed\n: no data\n\ndata: {"delta":"still working"}\n\n'.replace(
        /\n/g,
        newline
      );
    assert.equal(watcher.note(raw), false);
  });
}

for (const value of [
  { type: "progress", metadata: { type: "response.completed" } },
  { type: "response.completed", padding: "x".repeat(512 * 1024) },
])
  test(`large/nested frames retain root semantics / ${value.type}`, () => {
    const watcher = createClientTerminalWatcher("openai-responses");
    const raw = frame(value);
    for (let offset = 0; offset < raw.length; offset += 97)
      watcher.note(raw.slice(offset, offset + 97));
    assert.equal(watcher.note(""), value.type === "response.completed");
  });

for (const suffix of [",}", " trailing}", ',"broken":00}', ',"broken":[1,]}']) {
  test(`a valid terminal-looking prefix cannot bypass invalid JSON tail / ${suffix}`, () => {
    const watcher = createClientTerminalWatcher("openai-responses");
    assert.equal(watcher.note('data: {"type":"response.completed"' + suffix + "\n\n"), false);
  });
}

test("failure metadata belongs to the first response, never nested ids or a foreign response", () => {
  const watcher = createClientTerminalWatcher("openai-responses");
  watcher.note(
    frame({
      type: "response.created",
      sequence_number: 80,
      response: { id: "resp_real", created_at: 10, model: "m1" },
    })
  );
  watcher.note(
    frame({
      type: "response.output_item.added",
      sequence_number: 81,
      item: { id: "foreign", model: "not-the-response" },
    })
  );
  watcher.note(
    frame({
      type: "response.in_progress",
      sequence_number: 82,
      response: { id: "resp_foreign", created_at: 20, model: "m2" },
    })
  );
  const failure = withResponsesFailureContext(
    {
      type: "response.failed",
      sequence_number: 1,
      response: { id: "synthetic", status: "failed", error: { message: "sanitized" } },
    },
    watcher.responsesContext()
  );
  assert.equal(failure.sequence_number, 83);
  assert.deepEqual(failure.response, {
    id: "resp_real",
    status: "failed",
    error: { message: "sanitized" },
    model: "m1",
    created_at: 10,
  });
});

test("oversized nesting is not reinterpreted as a suffix terminal", () => {
  const watcher = createClientTerminalWatcher("openai-responses");
  const raw =
    'data: {"ignored":' +
    "[".repeat(300) +
    "0" +
    "]".repeat(300) +
    ',"type":"response.completed"}\n\n';
  assert.equal(watcher.note(raw), false);
  assert.equal(watcher.atBoundary(), true);
});
