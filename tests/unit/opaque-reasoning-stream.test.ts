import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  SECRET,
  opaqueA,
  opaqueB,
  encrypted,
  delta,
  frame,
  finish,
  source,
  events,
  deltas,
  records,
  text,
  tools,
  type Event,
} from "../helpers/opaqueReasoningStream.ts";

const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  APP_LOG_TO_FILE: process.env.APP_LOG_TO_FILE,
  PII_RESPONSE_SANITIZATION: process.env.PII_RESPONSE_SANITIZATION,
  PII_RESPONSE_SANITIZATION_MODE: process.env.PII_RESPONSE_SANITIZATION_MODE,
  CREDENTIAL_REDACTION_ENABLED: process.env.CREDENTIAL_REDACTION_ENABLED,
};
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "opaque-reasoning-"));
process.env.DATA_DIR = directory;
process.env.APP_LOG_TO_FILE = "false";
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
process.env.CREDENTIAL_REDACTION_ENABLED = "true";
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("Network forbidden in stream fixture");
};
const { createCredentialSseTransform, resolveCredentialGate } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { createPiiSseTransform } = await import("../../src/lib/streamingPiiTransform.ts");
const { assembleStreamingPipeline } =
  await import("../../open-sse/handlers/chatCore/streamingPipeline.ts");
const { createStreamController } = await import("../../open-sse/utils/streamHandler.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { redactCredentials } = await import("../../src/lib/guardrails/credentialMasker.ts");
const { sanitizePII } = await import("../../src/lib/piiSanitizer.ts");

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  globalThis.fetch = originalFetch;
  fs.rmSync(directory, { recursive: true, force: true });
});

type Mode = "credential" | "pii" | "composed" | "reverse-composed" | "pipeline";
async function run(input: string, mode: Mode, size = 37): Promise<Event[]> {
  let stream = source(input, size);
  if (mode === "pipeline") {
    const gate = await resolveCredentialGate({
      getSettings: async () => ({ credentialRedactionEnabled: false }),
      resolveDisabledGuardrails: () => [],
    });
    assert.equal(
      gate.credentialRedactionEnabled,
      true,
      "environment opt-in overrides false setting"
    );
    stream = assembleStreamingPipeline({
      providerResponse: new Response(stream),
      transformStream: new TransformStream(),
      streamController: createStreamController({ clientResponseFormat: "openai" }),
      createPiiTransform: null,
      clientRawRequestHeaders: {},
      clientResponseFormat: "openai",
      echoModel: undefined,
      responseHeaders: {},
      ...gate,
      activeTimeoutMs: 0,
      contentStallTimeoutMs: 0,
    });
  } else {
    if (mode === "credential" || mode === "reverse-composed")
      stream = stream.pipeThrough(createCredentialSseTransform());
    if (mode !== "credential") stream = stream.pipeThrough(createPiiSseTransform());
    if (mode === "composed") stream = stream.pipeThrough(createCredentialSseTransform());
  }
  return events(await new Response(stream).text());
}

function minimal(details = [encrypted(), encrypted(1, opaqueB)]): Event[] {
  return [
    delta({ reasoning_details: details }),
    delta({
      tool_calls: [
        {
          index: 0,
          id: "call-synthetic",
          type: "function",
          function: { name: "submit", arguments: '{"ok":true}' },
        },
      ],
    }),
  ];
}

function assertExact(output: Event[], details = [encrypted(), encrypted(1, opaqueB)]) {
  assert.deepEqual(
    records(output),
    details,
    "all encrypted records must survive exactly once, in order"
  );
  assert.equal(text(output, "content"), "");
  assert.equal(text(output, "reasoning"), "");
  assert.equal(text(output, "reasoning_content"), "");
  assert.deepEqual(
    [...tools(output)],
    [[0, { id: "call-synthetic", name: "submit", arguments: '{"ok":true}' }]]
  );
}

for (const mode of ["credential", "pii", "composed", "reverse-composed", "pipeline"] as const) {
  for (const termination of ["finish", "done", "eof"] as const) {
    for (const size of [1, 37, 65_536]) {
      test(`${mode}: exact encrypted records and tool call on ${termination}, ${size}-byte transport`, async () => {
        const input =
          minimal().map(frame).join("") +
          (termination === "finish" ? frame(finish()) : "") +
          (termination !== "eof" ? "data: [DONE]\n\n" : "");
        assertExact(await run(input, mode, size));
      });
    }
  }
}

for (const mode of ["credential", "pii", "composed", "pipeline"] as const) {
  test(`${mode}: every field of an encrypted record remains opaque, including nested metadata`, async () => {
    const detail = {
      ...encrypted(7),
      text: opaqueB,
      provider_state: {
        text: opaqueA,
        arguments: SECRET,
        nested: [{ data: opaqueB, text: "é🙂" }],
      },
    };
    const input = [...minimal([detail]), finish()].map(frame).join("") + "data: [DONE]\n\n";
    assertExact(await run(input, mode), [detail]);
  });

  test(`${mode}: reasoning-detail indexes cannot become choice or tool indexes`, async () => {
    const input =
      [
        delta({
          reasoning_details: [
            { type: "reasoning.text", index: 9, id: "reason-nine", text: "think-é🙂" },
          ],
        }),
        delta({ content: "answer-é🙂" }),
        delta({
          tool_calls: [
            {
              index: 1,
              id: "call-one",
              type: "function",
              function: { name: "submit", arguments: '{"ok":' },
            },
          ],
        }),
        delta({ reasoning_details: [encrypted(1, opaqueB)] }),
        delta({ tool_calls: [{ index: 1, function: { arguments: "true}" } }] }),
        finish(),
      ]
        .map(frame)
        .join("") + "data: [DONE]\n\n";
    const output = await run(input, mode, 1);
    assert.equal(text(output, "content"), "answer-é🙂");
    const reasoning =
      text(output, "reasoning") +
      text(output, "reasoning_content") +
      records(output)
        .map((record) => (record.type === "reasoning.text" ? (record.text ?? "") : ""))
        .join("");
    assert.equal(reasoning, "think-é🙂");
    assert.deepEqual(
      [
        ...new Set(
          output.flatMap((event) => event.choices?.map((choice) => choice.index ?? 0) ?? [])
        ),
      ],
      [0]
    );
    assert.deepEqual(tools(output).get(1), {
      id: "call-one",
      name: "submit",
      arguments: '{"ok":true}',
    });
    assert.deepEqual(
      records(output).filter((record) => record.type === "reasoning.encrypted"),
      [encrypted(1, opaqueB)]
    );
  });
}

test("multiple choices, tools and reasoning records retain separate numeric identities", async () => {
  const input =
    [
      delta({ reasoning_details: [encrypted(1)] }, 1),
      delta({ reasoning_details: [encrypted(0, opaqueB)] }, 0),
      delta({ content: "one", reasoning: "why-one" }, 1),
      delta({ content: "zero", reasoning_content: "why-zero" }, 0),
      delta(
        {
          tool_calls: [
            { index: 0, id: "one-zero", function: { name: "alpha", arguments: '{"n":' } },
          ],
        },
        1
      ),
      delta(
        {
          tool_calls: [
            { index: 1, id: "zero-one", function: { name: "beta", arguments: '{"n":' } },
          ],
        },
        0
      ),
      delta({ tool_calls: [{ index: 0, function: { arguments: "1}" } }] }, 1),
      delta({ tool_calls: [{ index: 1, function: { arguments: "0}" } }] }, 0),
      finish(1),
      finish(0),
    ]
      .map(frame)
      .join("") + "data: [DONE]\n\n";
  const output = await run(input, "pipeline", 1);
  assert.deepEqual(records(output, 1), [encrypted(1)]);
  assert.deepEqual(records(output, 0), [encrypted(0, opaqueB)]);
  assert.equal(text(output, "content", 1), "one");
  assert.equal(text(output, "content", 0), "zero");
  assert.equal(text(output, "reasoning", 1), "why-one");
  assert.equal(text(output, "reasoning_content", 0), "why-zero");
  assert.deepEqual(
    [...tools(output, 1)],
    [[0, { id: "one-zero", name: "alpha", arguments: '{"n":1}' }]]
  );
  assert.deepEqual(
    [...tools(output, 0)],
    [[1, { id: "zero-one", name: "beta", arguments: '{"n":0}' }]]
  );
});

test("CRLF, comments, heartbeats and UTF-8 fragmentation preserve exact metadata once", async () => {
  const detail = encrypted(11, opaqueA + "é🙂");
  const input = (
    ": heartbeat\n\n" +
    [...minimal([detail]), finish()].map(frame).join("") +
    "data: [DONE]\n\n"
  ).replaceAll("\n", "\r\n");
  assertExact(await run(input, "pipeline", 1), [detail]);
});

test("credential/PII redaction remains active across opaque records and in supported tool arguments", async () => {
  const input =
    [
      delta({ content: "mail alice@exam" }),
      delta({ reasoning_details: [encrypted()] }),
      delta({ content: "ple.com key " + SECRET.slice(0, 19) }),
      delta({ reasoning: "reason " + SECRET.slice(0, 19) }),
      delta({ reasoning_details: [encrypted(1, opaqueB)] }),
      delta({ content: SECRET.slice(19) + " end", reasoning: SECRET.slice(19) }),
      delta({
        tool_calls: [
          {
            index: 0,
            id: "call-secret",
            function: { name: "submit", arguments: '{"key":"' + SECRET.slice(0, 19) },
          },
        ],
      }),
      delta({ tool_calls: [{ index: 0, function: { arguments: SECRET.slice(19) + '"}' } }] }),
      finish(),
    ]
      .map(frame)
      .join("") + "data: [DONE]\n\n";
  const output = await run(input, "pipeline", 1);
  const maskedText = redactCredentials(sanitizePII(SECRET).text).text;
  assert.equal(text(output, "content"), "mail [EMAIL_REDACTED] key " + maskedText + " end");
  assert.equal(text(output, "reasoning"), "reason " + maskedText);
  assert.deepEqual(JSON.parse(tools(output).get(0)!.arguments), {
    key: redactCredentials(SECRET).text,
  });
  assert.deepEqual(records(output), [encrypted(), encrypted(1, opaqueB)]);
});

test("an unidentified reasoning record cannot invent a new choice", async () => {
  const input = [
    delta({ reasoning_details: [{ type: "reasoning.text", index: 9, text: "explain" }] }, 1),
    delta({ content: "answer" }, 1),
    finish(1),
  ]
    .map(frame)
    .join("");
  const output = await run(input, "pipeline");
  const reasoning =
    text(output, "reasoning", 1) +
    records(output, 1)
      .map((record) => record.text ?? "")
      .join("");
  assert.equal(reasoning, "explain");
  assert.equal(text(output, "content", 1), "answer");
  assert.deepEqual(
    [...new Set(output.flatMap((event) => event.choices?.map((choice) => choice.index) ?? []))],
    [1]
  );
});

test("opaque-looking business data outside reasoning_details still receives credential redaction", async () => {
  const input =
    frame(delta({ custom: { type: "reasoning.encrypted", data: "normal " + SECRET } })) +
    frame(finish());
  const output = await run(input, "credential");
  assert.equal(JSON.stringify(output).includes(SECRET), false);
  assert.equal(text(output, "content"), "normal " + redactCredentials(SECRET).text);
});

test("EOF without a final newline flushes text once without replaying encrypted metadata", async () => {
  const input = frame(
    delta({ content: "held answer", reasoning_details: [encrypted(), encrypted(1, opaqueB)] })
  ).trimEnd();
  const output = await run(input, "composed", 1);
  assert.equal(text(output, "content"), "held answer");
  assert.deepEqual(records(output), [encrypted(), encrypted(1, opaqueB)]);
});

test("ordinary fields named data remain processed rather than becoming opaque", async () => {
  const input = frame(delta({ data: "normal " + SECRET })) + frame(finish());
  const output = await run(input, "credential");
  assert.equal(
    deltas(output)
      .map((value) => value.data ?? "")
      .join("") + text(output, "content"),
    "normal " + redactCredentials(SECRET).text
  );
});

for (const mode of ["credential", "pii", "composed", "reverse-composed"] as const) {
  for (const termination of ["done", "eof"] as const) {
    test(`${mode}: generic text-tail flush cannot replay or corrupt encrypted records on ${termination}`, async () => {
      const details = [encrypted(), encrypted(3, opaqueB)];
      // Metadata comes first: a generic flush must not consume answer buffers into it.
      const input =
        frame({ reasoning_details: details, content: "held answer" }) +
        (termination === "done" ? "data: [DONE]\n\n" : "");
      const output = await run(input, mode, 1);
      assert.deepEqual(
        output.flatMap((event) => event.reasoning_details ?? []),
        details
      );
      assert.equal(output.map((event) => event.content ?? "").join(""), "held answer");
    });
    test(`${mode}: generic flush retains protocol identifiers and separate reasoning aliases on ${termination}`, async () => {
      const metadata = {
        id: "synthetic-root",
        type: "synthetic-result",
        encrypted_content: opaqueA,
        signature: opaqueB,
      };
      const input =
        frame({ ...metadata, content: "answer", reasoning: "why", reasoning_content: "how" }) +
        (termination === "done" ? "data: [DONE]\n\n" : "");
      const output = await run(input, mode);
      for (const [key, value] of Object.entries(metadata)) {
        assert.ok(
          output.every((event) => event[key] === undefined || event[key] === value),
          key + " corrupted by text-tail flush"
        );
        assert.equal(output[0][key], value);
      }
      assert.equal(output.map((event) => event.content ?? "").join(""), "answer");
      assert.equal(output.map((event) => event.reasoning ?? "").join(""), "why");
      assert.equal(output.map((event) => event.reasoning_content ?? "").join(""), "how");
    });
  }
}

test("model-free continuation serializes every encrypted record and the matching tool result unchanged", async () => {
  const output = await run(minimal().map(frame).join("") + frame(finish()), "pipeline");
  const call = tools(output).get(0)!;
  const envelope = {
    model: "synthetic/model",
    messages: [
      { role: "user", content: "Use the synthetic tool." },
      {
        role: "assistant",
        content: null,
        reasoning_details: records(output),
        tool_calls: [
          {
            id: call.id,
            type: "function",
            function: { name: call.name, arguments: call.arguments },
          },
        ],
      },
      { role: "tool", tool_call_id: call.id, content: "synthetic result" },
    ],
  };
  const forwarded = translateRequest(
    "openai",
    "openai",
    "synthetic/model",
    envelope,
    true,
    null,
    "openrouter"
  );
  const serialized = JSON.parse(JSON.stringify(forwarded));
  assert.deepEqual(serialized.messages[1].reasoning_details, [encrypted(), encrypted(1, opaqueB)]);
  assert.equal(serialized.messages[2].tool_call_id, serialized.messages[1].tool_calls[0].id);
  assert.deepEqual(JSON.parse(serialized.messages[1].tool_calls[0].function.arguments), {
    ok: true,
  });
});
