import test from "node:test";
import assert from "node:assert/strict";

import {
  markEmptyTurnExecution,
  hasTrustedEmptyTurn,
} from "../../open-sse/utils/emptyTurnPolicy.ts";
import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";
import {
  createDisconnectAwareStream,
  createStreamController,
} from "../../open-sse/utils/streamHandler.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

type FixtureEvent = {
  type: string;
  response: Record<string, unknown>;
};

function terminal(type: string, status: string): FixtureEvent {
  return {
    type,
    response: {
      id: "resp_empty_terminal_fixture",
      status,
      output: [],
      usage: { input_tokens: 129837, output_tokens: 47 },
    },
  };
}

function execute(events: FixtureEvent[]): Response {
  const body = events.map((event) => `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`);
  return markEmptyTurnExecution(
    new Response(body.join(""), { headers: { "content-type": "text/event-stream" } }),
    getRegistryEntry("codex")!.baseUrl,
    { connectionId: "fixture-selected-account", accessToken: "synthetic-fixture-token" }
  );
}

test("native Codex response.completed establishes a normal empty stop", async () => {
  const response = execute([terminal("response.completed", "completed")]);
  await response.text();
  assert.equal(hasTrustedEmptyTurn(response), true);
});

test("a response.done alias does not silently authorize an empty successful reply", async () => {
  const response = execute([terminal("response.done", "completed")]);
  await response.text();
  assert.equal(hasTrustedEmptyTurn(response), false);
});

for (const status of ["failed", "cancelled", "incomplete", "in_progress"]) {
  test(`response.done with ${status} status cannot authorize an empty stop`, async () => {
    const response = execute([terminal("response.done", status)]);
    await response.text();
    assert.equal(hasTrustedEmptyTurn(response), false);
  });
}

test("a late incomplete response.done invalidates an earlier completion", async () => {
  const response = execute([
    terminal("response.completed", "completed"),
    terminal("response.done", "incomplete"),
  ]);
  await response.text();
  assert.equal(hasTrustedEmptyTurn(response), false);
});

test("an empty translated response.done stays an error until its policy is approved", async () => {
  const response = execute([terminal("response.done", "completed")]);
  const translatorState: Record<string, unknown> = {};
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const translated = response.body!.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        for (const line of decoder.decode(chunk).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const result = openaiResponsesToOpenAIResponse(
            JSON.parse(line.slice(6)),
            translatorState
          );
          for (const item of result == null ? [] : Array.isArray(result) ? result : [result]) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(item)}\n\n`));
          }
        }
      },
    })
  );
  const streamController = createStreamController({
    provider: "codex",
    model: "gpt-6.1-sol",
    clientResponseFormat: FORMATS.OPENAI,
  });
  const client = createDisconnectAwareStream(
    {
      readable: translated,
      writable: { getWriter: () => ({ abort: () => Promise.resolve() }) },
    },
    streamController,
    { permitsEmptyTurn: () => hasTrustedEmptyTurn(response) }
  );
  const text = await new Response(client).text();
  assert.match(text, /Provider returned empty content/);
  assert.equal(hasTrustedEmptyTurn(response), false);
});
