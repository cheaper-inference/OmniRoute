import assert from "node:assert/strict";
import test from "node:test";
import OpenAI from "openai";
import {
  createDisconnectAwareStream,
  createNoopAbortWritable,
  createStreamController,
} from "../../open-sse/utils/streamHandler.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

type Packet = Record<string, unknown>;
const frame = (packet: Packet) =>
  `event: ${packet.type}\r\ndata: ${JSON.stringify(packet)}\r\n\r\n`;
const model = "public-model-contract";
const id = "resp_started_by_this_request";
const snapshot = {
  id,
  object: "response",
  model,
  created_at: 1700000000,
  status: "in_progress",
  error: null,
  output: [],
};
const item = {
  id: "fc_this_request",
  type: "function_call",
  call_id: "call_same_across_clients",
  name: "lookup",
  arguments: "",
  status: "in_progress",
};
const events: Packet[] = [
  { type: "response.created", sequence_number: 41, response: snapshot },
  { type: "response.in_progress", sequence_number: 42, response: snapshot },
  { type: "response.output_item.added", sequence_number: 43, output_index: 0, item },
  {
    type: "response.function_call_arguments.delta",
    sequence_number: 44,
    item_id: item.id,
    output_index: 0,
    delta: '{"q":"🙂',
  },
];

test.after(() => resetDbInstance());
test("control: official Responses SDK resolves a failed snapshot without losing its identity", async () => {
  const terminal = {
    type: "response.failed",
    sequence_number: 45,
    response: {
      ...snapshot,
      status: "failed",
      error: { code: "server_error", message: "Synthetic failure" },
    },
  };
  const client = new OpenAI({
    apiKey: "synthetic-no-network",
    maxRetries: 0,
    fetch: async () =>
      new Response(events.concat(terminal).map(frame).join(""), {
        headers: { "content-type": "text/event-stream" },
      }),
  });
  const failed = await client.responses.stream({ model, input: "Use lookup" }).finalResponse();
  assert.equal(failed.status, "failed");
  assert.equal(failed.id, id);
  assert.equal(failed.model, model);
  assert.equal(failed.error?.message, "Synthetic failure");
});
for (const fault of ["socket", "eof"] as const) {
  for (const fragmentBytes of [1, 17, 4096]) {
    test(`Responses interrupted identity / ${fault} / fragment=${fragmentBytes}`, async () => {
      const bytes = Buffer.from(events.map(frame).join(""));
      let offset = 0;
      const source = new ReadableStream<Uint8Array>(
        {
          pull(controller) {
            if (offset < bytes.length) {
              controller.enqueue(bytes.subarray(offset, offset + fragmentBytes));
              offset += fragmentBytes;
            } else if (fault === "socket") {
              controller.error(
                Object.assign(new Error("terminated"), { code: "stream_terminated" })
              );
            } else controller.close();
          },
        },
        { highWaterMark: 0 }
      );
      const stream = createDisconnectAwareStream(
        { readable: source, writable: createNoopAbortWritable() },
        createStreamController({ clientResponseFormat: FORMATS.OPENAI_RESPONSES })
      );
      let sends = 0;
      const client = new OpenAI({
        apiKey: "synthetic-no-network",
        maxRetries: 0,
        fetch: async () => {
          sends++;
          return new Response(stream, { headers: { "content-type": "text/event-stream" } });
        },
      });
      const reader = client.responses.stream({ model, input: "Use lookup" });
      const seen: Packet[] = [];
      reader.on("event", (event) => seen.push(structuredClone(event) as unknown as Packet));
      const failed = await reader.finalResponse();
      // Official SDK finalResponse() may RESOLVE with status=failed. Rejection
      // is not required by that API; replacing the response identity is the bug.
      assert.equal(sends, 1);
      assert.equal(failed.status, "failed");
      assert.equal(typeof failed.error?.message, "string");
      assert.equal(seen.filter((event) => event.type === "response.failed").length, 1);
      assert.equal(seen.filter((event) => event.type === "response.completed").length, 0);
      const sequence = seen.map((event) => Number(event.sequence_number));
      const increasing = sequence.every(
        (number, i) => Number.isSafeInteger(number) && (i === 0 || number > sequence[i - 1])
      );
      assert.deepEqual(
        { responseId: failed.id, model: failed.model, increasingSequence: increasing },
        { responseId: id, model, increasingSequence: true },
        `The failure belongs to the already-open response, not a fresh synthetic one; sequence=${JSON.stringify(sequence)}`
      );
    });
  }
}
