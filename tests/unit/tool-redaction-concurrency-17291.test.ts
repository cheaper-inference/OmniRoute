import test from "node:test";
import assert from "node:assert/strict";
import { createCredentialSseTransform } from "../../src/lib/streamingCredentialTransform.ts";

const fakeKey = "sk-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv";
const encoder = new TextEncoder();

async function roundTrip(request: number, enabled: boolean, stop: boolean) {
  const expected = new Map<string, string>();
  const events: string[] = [];
  for (let choice = 0; choice < 2; choice++) {
    for (let tool = 0; tool < 2; tool++) {
      const args = JSON.stringify({
        request,
        choice,
        tool,
        command: `ação-${request}-${choice}-${tool} ${"x".repeat(1200)} ${fakeKey} end`,
      });
      expected.set(
        `${choice}:${tool}`,
        enabled ? args.replace(fakeKey, "[REDACTED:openai]") : args
      );
      // Split inside the credential prefix as well as the long argument body.
      const boundary = args.indexOf(fakeKey) + 2;
      const parts = [args.slice(0, 700), args.slice(700, boundary), args.slice(boundary)];
      for (const [part, argumentsText] of parts.entries()) {
        events.push(
          `data: ${JSON.stringify({
            choices: [
              {
                index: choice,
                delta: {
                  tool_calls: [
                    {
                      index: tool,
                      ...(part === 0
                        ? { id: `call_${request}_${choice}_${tool}`, type: "function" }
                        : {}),
                      function: {
                        ...(part === 0 ? { name: "terminal" } : {}),
                        arguments: argumentsText,
                      },
                    },
                  ],
                },
              },
            ],
          })}\n\n`
        );
      }
    }
  }
  if (stop)
    events.push(
      `data: ${JSON.stringify({ choices: [0, 1].map((index) => ({ index, delta: {}, finish_reason: "tool_calls" })) })}\n\n`
    );
  events.push("data: [DONE]\n\n");
  const bytes = encoder.encode(events.join(""));
  const input = new ReadableStream<Uint8Array>({
    start(controller) {
      // Byte fragmentation crosses JSON, SSE separators and UTF-8 boundaries.
      for (let index = 0; index < bytes.length; index += 17)
        controller.enqueue(bytes.slice(index, index + 17));
      controller.close();
    },
  });
  const output = await new Response(
    enabled ? input.pipeThrough(createCredentialSseTransform()) : input
  ).text();
  const received = new Map<string, string>();
  let done = 0;
  for (const line of output.split("\n")) {
    if (!line.startsWith("data: ")) continue;
    if (line === "data: [DONE]") {
      done++;
      continue;
    }
    const event = JSON.parse(line.slice(6));
    for (const choice of event.choices ?? []) {
      for (const tool of choice.delta?.tool_calls ?? []) {
        const key = `${choice.index}:${tool.index}`;
        received.set(key, (received.get(key) ?? "") + (tool.function?.arguments ?? ""));
      }
    }
  }
  assert.equal(done, 1);
  assert.deepEqual(received, expected, "each request/choice/tool must reconstruct exactly once");
  for (const [key, args] of received) {
    assert.equal(JSON.parse(args).request, request, key);
    assert.equal(args.split("[REDACTED:openai]").length - 1, enabled ? 1 : 0);
  }
  if (enabled) assert.ok(!output.includes(fakeKey));
}

for (const stop of [false, true]) {
  test(`redaction reconstructs three sequential fragmented requests; stop=${stop}`, async () => {
    for (let request = 0; request < 3; request++) await roundTrip(request, true, stop);
  });
  test(`redaction isolates eight concurrent fragmented requests; stop=${stop}`, async () => {
    await Promise.all(Array.from({ length: 8 }, (_, index) => roundTrip(index + 10, true, stop)));
  });
}

test("disabled-transform control preserves original arguments and credentials", async () => {
  await roundTrip(100, false, true);
});
