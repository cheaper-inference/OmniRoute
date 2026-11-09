import assert from "node:assert/strict";
import test from "node:test";

import { markEmptyTurnExecution } from "../../open-sse/utils/emptyTurnPolicy.ts";
import { ensureStreamReadiness } from "../../open-sse/utils/streamReadiness.ts";
import {
  createDisconnectAwareStream,
  createStreamController,
} from "../../open-sse/utils/streamHandler.ts";

const privateContent = "private-diagnostic-fixture-do-not-log";
const terminal = {
  type: "response.done",
  response: {
    status: "completed",
    output: [{ type: "reasoning", encrypted_content: privateContent }],
    usage: { output_tokens: 47, output_tokens_details: { reasoning_tokens: 47 } },
  },
};

function nativeResponse(): Response {
  return markEmptyTurnExecution(
    new Response(`data: ${JSON.stringify(terminal)}\n\n`, {
      headers: { "content-type": "text/event-stream" },
    }),
    "https://chatgpt.com/backend-api/codex/responses",
    { connectionId: "fixture-connection", accessToken: "fixture-access-token" }
  );
}

test("readiness rejection logs native termination evidence without logging content", async () => {
  const warnings: string[] = [];
  const result = await ensureStreamReadiness(nativeResponse(), {
    timeoutMs: 500,
    contentProbeMs: 1_000,
    log: { warn: (_tag, message) => warnings.push(message) },
  });

  assert.equal(result.ok, false);
  assert.equal(result.response.status, 502);
  assert.match(warnings.join("\n"), /detector=readiness/);
  assert.match(warnings.join("\n"), /"terminalType":"response.done"/);
  assert.match(warnings.join("\n"), /"reasoningTokens":47/);
  assert.doesNotMatch(warnings.join("\n"), new RegExp(privateContent));
  assert.doesNotMatch(await result.response.text(), /terminalType|reasoningTokens|detector=/);
});

test("post-translation rejection logs diagnostic evidence but keeps the public 502 generic", async (t) => {
  const upstream = nativeResponse();
  await upstream.text();
  const lines: string[] = [];
  t.mock.method(console, "warn", (...args: unknown[]) => lines.push(args.join(" ")));
  const { getEmptyTurnDiagnostics } = await import("../../open-sse/utils/emptyTurnPolicy.ts");
  const controller = createStreamController({ clientResponseFormat: "openai" });
  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    start(output) {
      output.enqueue(
        encoder.encode(
          'data: {"choices":[{"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n'
        )
      );
      output.close();
    },
  });
  const body = createDisconnectAwareStream(
    { readable, writable: new WritableStream<Uint8Array>() },
    controller,
    { emptyTurnDiagnostics: () => getEmptyTurnDiagnostics(upstream) }
  );
  const response = await new Response(body).text();

  assert.match(response, /Provider returned empty content/);
  assert.match(lines.join("\n"), /detector=post-translation reason=empty-content/);
  assert.match(lines.join("\n"), /"terminalType":"response.done"/);
  assert.doesNotMatch(lines.join("\n"), new RegExp(privateContent));
  assert.doesNotMatch(response, /terminalType|reasoningTokens|detector=/);
});
