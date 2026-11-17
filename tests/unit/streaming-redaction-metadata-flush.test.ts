import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Streamed replies lost text when credential redaction was on: the transform descended into
// metadata objects, classified their string fields as content, and held those values in the
// 512-character redaction window. A short answer sat inside that window with usage provenance
// values instead of its own text; a long answer kept streaming but lost its tail at the flush.
//
// Both lengths are covered on purpose: the short case proves metadata never displaces the
// answer, and the long case (past the window) proves the tail survives the flush.

const isolated = fs.mkdtempSync(path.join(os.tmpdir(), "streaming-redaction-metadata-"));
process.env.HOME = isolated;
process.env.DATA_DIR = path.join(isolated, "data");
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("offline pipeline test forbids fetch");
};

const { assembleStreamingPipeline } = await import(
  "../../open-sse/handlers/chatCore/streamingPipeline.ts"
);
const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  globalThis.fetch = originalFetch;
  fs.rmSync(isolated, { recursive: true, force: true });
});

const frame = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;

function parsedChunks(output: string): Array<Record<string, any>> {
  const chunks: Array<Record<string, any>> = [];
  for (const line of output.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (payload === "[DONE]") continue;
    try {
      chunks.push(JSON.parse(payload));
    } catch {
      /* not a JSON frame */
    }
  }
  return chunks;
}

function contentOf(output: string): string {
  let text = "";
  for (const chunk of parsedChunks(output)) {
    for (const choice of chunk.choices ?? []) text += choice?.delta?.content ?? "";
  }
  return text;
}

function reasoningLeaked(output: string, needle: string): boolean {
  for (const chunk of parsedChunks(output)) {
    for (const choice of chunk.choices ?? []) {
      const delta = choice?.delta ?? {};
      for (const [key, value] of Object.entries(delta)) {
        // reasoning_content / reasoning are the fields that are supposed to carry it.
        if (key === "reasoning_content" || key === "reasoning") continue;
        if (typeof value === "string" && value.includes(needle)) return true;
      }
    }
  }
  return false;
}

async function runWithCredentialRedaction(chunks: string[]): Promise<string> {
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
  const abort = new AbortController();
  const stream = assembleStreamingPipeline({
    providerResponse: new Response(source),
    // The passthrough production wires in, not a stand-in: the interaction between the
    // credential transform's flush and this downstream transform is what dropped the tail.
    transformStream: createPassthroughStreamWithLogger(
      null,
      null,
      null,
      "grok-4.7",
      null,
      null,
      null,
      null,
      null,
      "openai"
    ),
    streamController: {
      signal: abort.signal,
      startTime: Date.now(),
      isConnected: () => true,
      handleDisconnect: () => {},
      handleComplete: () => {},
      markClientTerminalSeen: () => {},
      handleError: () => {},
      abort: () => abort.abort(),
      clientResponseFormat: "openai",
    },
    createPiiTransform: undefined,
    clientRawRequestHeaders: null,
    clientResponseFormat: "openai",
    echoModel: "grok-4.7",
    responseHeaders: {},
    credentialRedactionEnabled: true,
    credentialDisabledGuardrails: [],
    piiDisabledGuardrails: [],
  });
  return await new Response(stream).text();
}

const terminalUsage = {
  prompt_tokens: 10,
  completion_tokens: 3,
  total_tokens: 13,
  cost_in_usd_ticks: 64180000,
  usage_evidence: { input: { source: "unknown" }, output: { method: "estimated" } },
  tokens_per_second: 12.5,
};

test("a short answer shorter than the redaction window reaches the client", async () => {
  const chunks = [
    frame({ choices: [{ index: 0, delta: { role: "assistant" } }] }),
    frame({ choices: [{ index: 0, delta: { reasoning_content: "The user wants SMOKE." } }] }),
    frame({ choices: [{ index: 0, delta: { content: "SMOKE" } }] }),
    frame({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: terminalUsage,
    }),
    "data: [DONE]\n\n",
  ];
  const out = await runWithCredentialRedaction(chunks);
  assert.equal(contentOf(out), "SMOKE", `client got ${JSON.stringify(contentOf(out))}`);
  assert.ok(!reasoningLeaked(out, "The user wants"), "reasoning leaked into an emitted delta");
});

test("a long answer past the redaction window keeps its tail through the flush", async () => {
  // Longer than the 512-character window, so most of it streams and only the tail is flushed.
  const words = Array.from({ length: 140 }, (_, i) => `word${i}`).join(" ");
  assert.ok(words.length > 512, "fixture must exceed the redaction window");
  const chunks = [
    frame({ choices: [{ index: 0, delta: { content: words.slice(0, 300) } }] }),
    frame({ choices: [{ index: 0, delta: { content: words.slice(300) } }] }),
    frame({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: terminalUsage,
    }),
    "data: [DONE]\n\n",
  ];
  const out = await runWithCredentialRedaction(chunks);
  assert.equal(contentOf(out), words, "the tail of the answer was lost at the flush");
});

test("a credential split across two metadata frames is still masked", async () => {
  const { createCredentialSseTransform } = await import(
    "../../src/lib/streamingCredentialTransform.ts"
  );
  const key = "sk-" + "ABCD".repeat(12);
  const transform = createCredentialSseTransform() as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writing = (async () => {
    // Neither frame holds the key on its own; only the window across them does.
    await writer.write(
      new TextEncoder().encode(
        frame({ choices: [{ index: 0, delta: { content: "SMOKE" } }], usage_evidence: key.slice(0, 6) })
      )
    );
    await writer.write(
      new TextEncoder().encode(
        frame({ choices: [{ index: 0, delta: {} }], usage_evidence: key.slice(6) })
      )
    );
    await writer.write(new TextEncoder().encode("data: [DONE]\n\n"));
    try {
      await writer.close();
    } catch {
      /* closed */
    }
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await writing;
  const text = out.join("");
  assert.ok(!text.includes(key), "a credential split across metadata frames leaked");
  assert.ok(text.includes("[REDACTED"), "the split credential should be masked");
  assert.equal(contentOf(text), "SMOKE", "metadata leaked into the answer");
});

test("a credential inside usage metadata is masked and the rest of the metadata survives", async () => {
  // Observed on the transform itself: past the transform the passthrough rebuilds the terminal
  // frame's usage from its own counters and drops metadata-only frames, so the masking property
  // is only visible here.
  const { createCredentialSseTransform } = await import(
    "../../src/lib/streamingCredentialTransform.ts"
  );
  const key = "sk-" + "ABCD".repeat(12);
  const transform = createCredentialSseTransform() as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writing = (async () => {
    await writer.write(
      new TextEncoder().encode(
        frame({
          choices: [{ index: 0, delta: { content: "SMOKE" } }],
          cost_in_usd_ticks: 64180000,
          usage_evidence: { input: { token: key }, output: { method: "measured locally", notes: [key] } },
          tokens_per_second: 12.5,
        })
      )
    );
    // The same keys can arrive as plain strings, which is the shape that skipped masking when
    // they were added to the metadata set.
    await writer.write(
      new TextEncoder().encode(
        frame({ choices: [{ index: 0, delta: {} }], usage_evidence: `provenance ${key}` })
      )
    );
    await writer.write(
      new TextEncoder().encode(frame({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }))
    );
    await writer.write(new TextEncoder().encode("data: [DONE]\n\n"));
    try {
      await writer.close();
    } catch {
      /* closed */
    }
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await writing;
  const text = out.join("");

  assert.ok(!text.includes(key), "a credential inside usage metadata was not masked");
  assert.ok(text.includes("[REDACTED"), "the masked value should carry a redaction marker");
  // Short metadata values sit inside the hold-back window and only leave on the tail frame,
  // so they are asserted across the whole stream rather than on the live frame.
  assert.ok(text.includes("64180000"), "non-secret metadata should survive");
  assert.ok(text.includes("12.5"), "non-secret metadata should survive");
  assert.ok(text.includes("measured"), "non-secret metadata should survive");
  assert.ok(text.includes("locally"), "non-secret metadata should survive");
});

test("a credential in a Claude frame's usage metadata is masked", async () => {
  const { createCredentialSseTransform } = await import(
    "../../src/lib/streamingCredentialTransform.ts"
  );
  const key = "sk-" + "ABCD".repeat(12);
  const transform = createCredentialSseTransform() as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writing = (async () => {
    await writer.write(
      new TextEncoder().encode(
        "event: content_block_delta\n" +
          frame({
            type: "content_block_delta",
            index: 0,
            delta: { type: "text_delta", text: "hello" },
            usage_evidence: key,
          })
      )
    );
    await writer.write(
      new TextEncoder().encode("event: message_stop\n" + frame({ type: "message_stop" }) + "data: [DONE]\n\n")
    );
    try {
      await writer.close();
    } catch {
      /* closed */
    }
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await writing;
  const text = out.join("");
  assert.ok(!text.includes(key), "a credential in a Claude frame was not masked");
  assert.ok(text.includes("[REDACTED"), "the Claude frame credential should be masked");
  assert.ok(text.includes("hello"), "the Claude block text should survive");
});

test("a credential split across two Claude frames is still masked", async () => {
  const { createCredentialSseTransform } = await import(
    "../../src/lib/streamingCredentialTransform.ts"
  );
  const key = "sk-" + "ABCD".repeat(12);
  const transform = createCredentialSseTransform() as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const claude = (obj: unknown) =>
    "event: content_block_delta\n" + frame(obj);
  const writing = (async () => {
    await writer.write(
      new TextEncoder().encode(
        claude({
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: "hello" },
          usage_evidence: key.slice(0, 6),
        })
      )
    );
    await writer.write(
      new TextEncoder().encode(
        claude({
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: " world" },
          usage_evidence: key.slice(6),
        })
      )
    );
    await writer.write(
      new TextEncoder().encode("event: message_stop\n" + frame({ type: "message_stop" }) + "data: [DONE]\n\n")
    );
    try {
      await writer.close();
    } catch {
      /* closed */
    }
  })();
  const out: string[] = [];
  let r = await reader.read();
  while (!r.done) {
    out.push(new TextDecoder().decode(r.value));
    r = await reader.read();
  }
  await writing;
  const text = out.join("");
  assert.ok(!text.includes(key), "a credential split across Claude frames leaked");
  assert.ok(text.includes("[REDACTED"), "the split Claude credential should be masked");
  assert.ok(text.includes("hello"), "the Claude block text should survive");
});

test("an oversized metadata value hits the same byte limit as answer text", async () => {
  const { createCredentialSseTransform } = await import(
    "../../src/lib/streamingCredentialTransform.ts"
  );
  const transform = createCredentialSseTransform({ maxBufferedBytes: 1024 }) as TransformStream;
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const failed = new Promise<string>((resolve) => {
    reader.closed.catch((err: Error) => resolve(String(err?.message ?? err)));
  });
  const reading = (async () => {
    try {
      for (;;) {
        const r = await reader.read();
        if (r.done) break;
      }
    } catch {
      /* the limit error surfaces here */
    }
  })();
  // A credential prefix holds the whole value in the window, so nothing is released and the
  // byte ceiling is what stops it. A plain string would drain down to the window size.
  const huge = "sk-" + "A".repeat(4096);
  await writer
    .write(
      new TextEncoder().encode(
        frame({ choices: [{ index: 0, delta: { content: "" } }], usage_evidence: huge })
      )
    )
    .catch(() => {
      /* the limit error rejects the write; the assertion is on the stream error */
    });
  const message = await failed;
  assert.match(message, /buffer limit exceeded/);
  await reading;
});
