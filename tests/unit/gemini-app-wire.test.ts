import test from "node:test";
import assert from "node:assert/strict";
import {
  varint,
  parse,
  lengthDelimited,
  varintField,
  MAX_MESSAGE_BYTES,
} from "../../open-sse/executors/gemini-app/protobuf.ts";
import {
  frameGrpcMessage,
  GrpcMessageReader,
  buildClientGenerate,
  buildRequestMetadata,
  decodeClientGenerateResponse,
  NATIVE_VERSION,
} from "../../open-sse/executors/gemini-app/robinWire.ts";
import {
  canonicalModel,
  resolveThinkingLevel,
  verifyResolvedModel,
  MODEL_MODES,
} from "../../open-sse/executors/gemini-app/modelPolicy.ts";
import {
  decodeNativeFrame,
  monotonicDelta,
} from "../../open-sse/executors/gemini-app/responseDecoder.ts";
import {
  normalizeGeminiAppError,
  GeminiAppError,
} from "../../open-sse/executors/gemini-app/errors.ts";

test("protobuf varint roundtrip and int64 edge cases", () => {
  assert.deepEqual(varint(0), Buffer.from([0]));
  assert.deepEqual(varint(127), Buffer.from([127]));
  assert.deepEqual(varint(128), Buffer.from([0x80, 0x01]));
  assert.deepEqual(varint(300), Buffer.from([0xac, 0x02]));
  assert.deepEqual(varint(0xffffffffffffffffn).length, 10);
  assert.throws(() => varint(-1), RangeError);
  assert.throws(() => varint(Number.MAX_SAFE_INTEGER + 2), RangeError);
});

test("protobuf parse preserves unknown fields and rejects malformed input", () => {
  const encoded = Buffer.concat([
    varintField(1, 42),
    lengthDelimited(2, Buffer.from("hello")),
    varintField(300, 7),
  ]);
  const fields = parse(encoded);
  assert.equal(fields.length, 3);
  assert.deepEqual(
    fields.map((field) => field.number),
    [1, 2, 300]
  );
  assert.equal(fields[1].payload.toString(), "hello");
  assert.throws(() => parse(Buffer.from([0x08])), /Truncated varint/);
  assert.throws(() => parse(Buffer.from([0x00])), /Invalid field number/);
  assert.throws(() => parse(Buffer.from([0x0f])), /Unsupported wire type/);
});

test("protobuf rejects messages beyond the 16 MiB budget", () => {
  assert.throws(() => lengthDelimited(1, Buffer.alloc(MAX_MESSAGE_BYTES + 1)), RangeError);
});

test("GrpcMessageReader handles concatenated chunks, truncation and oversized frames", () => {
  const a = frameGrpcMessage(Buffer.from("alpha"));
  const b = frameGrpcMessage(Buffer.from("beta"));
  const stream = Buffer.concat([a, b]);
  const reader = new GrpcMessageReader();
  const frames = [
    ...reader.push(stream.subarray(0, 3)),
    ...reader.push(stream.subarray(3, 9)),
    ...reader.push(stream.subarray(9)),
  ];
  assert.deepEqual(
    frames.map((frame) => frame.toString()),
    ["alpha", "beta"]
  );
  reader.finish();

  const truncated = new GrpcMessageReader();
  truncated.push(frameGrpcMessage(Buffer.from("hello")).subarray(0, 8));
  assert.throws(() => truncated.finish(), /Truncated gRPC stream/);

  const oversized = new GrpcMessageReader({ maxBytes: 4 });
  const header = Buffer.alloc(5);
  header.writeUInt32BE(5, 1);
  assert.throws(() => oversized.push(header), /exceeds budget/);
  assert.throws(() => frameGrpcMessage(Buffer.alloc(MAX_MESSAGE_BYTES + 1)), RangeError);
});

test("buildRequestMetadata and buildClientGenerate produce bounded wire messages", () => {
  const metadata = buildRequestMetadata({
    clientType: 21,
    languageCode: "en",
    interfaceLanguageCode: "en",
    clientVersion: NATIVE_VERSION,
    clientInstanceId: "test-instance",
    triggerType: 1,
    uiSource: 1,
  });
  assert.ok(metadata.length > 0);
  assert.throws(() => buildRequestMetadata({ clientType: 999 }), /client type/);

  const request = buildClientGenerate({
    userText: "hello",
    systemText: "system",
    modelId: "gemini-neon",
    clientMetadata: { clientType: 21 },
  });
  const fields = parse(request);
  assert.ok(fields.some((field) => field.number === 1));
  assert.ok(fields.some((field) => field.number === 29));
  assert.throws(
    () =>
      buildClientGenerate({
        userText: "x",
        images: [{ blobId: "id", mimeType: "image/png", data: Buffer.from("x") }],
      }),
    TypeError
  );
});

test("decodeClientGenerateResponse extracts model identity and mode evidence", () => {
  const response = Buffer.concat([
    lengthDelimited(
      1,
      Buffer.concat([
        lengthDelimited(1, Buffer.from("resp-1")),
        lengthDelimited(2, Buffer.concat([lengthDelimited(1, Buffer.from("hello"))])),
      ])
    ),
    varintField(9, 1),
    lengthDelimited(30, Buffer.from("neon")),
    varintField(41, 3),
  ]);
  const decoded = decodeClientGenerateResponse(response);
  assert.equal(decoded.models.length, 1);
  assert.equal(decoded.models[0].responseId, "resp-1");
  assert.equal(decoded.models[0].text, "hello");
  assert.equal(decoded.completed, true);
  assert.equal(decoded.attribution, "neon");
  assert.equal(Number(decoded.resolvedModeCategory), 3);
});

test("model aliases, thinking levels and anti-downgrade verification", () => {
  assert.equal(canonicalModel("models/gemini-argon"), "gemini-neon");
  assert.equal(canonicalModel("gemini-hydrogen"), "gemini-hydrogen");
  assert.equal(resolveThinkingLevel({ reasoning_effort: "low" }), 1);
  assert.equal(resolveThinkingLevel({ reasoning_effort: "xhigh" }), 2);
  assert.throws(() => resolveThinkingLevel({ thinking_level: 3 }), /NATIVE_DEEP_THINK_UNSUPPORTED/);
  assert.throws(
    () => resolveThinkingLevel({ reasoning_effort: "nonsense" }),
    /INVALID_REASONING_EFFORT/
  );

  assert.equal(
    verifyResolvedModel("gemini-neon", {
      resolvedModeCategory: MODEL_MODES["gemini-neon"],
      attribution: "neon",
      fallback: null,
      downgradeReason: null,
    }).downgraded,
    false
  );
  const downgrade = verifyResolvedModel("gemini-neon", {
    resolvedModeCategory: 1,
    attribution: "hydrogen",
    fallback: 1,
    downgradeReason: 2,
  });
  assert.equal(downgrade.downgraded, true);
  assert.match(downgrade.reason ?? "", /mode=1 expected=3/);
});

test("frame decoder ignores continuation frames and enforces monotonic snapshots", () => {
  assert.equal(decodeNativeFrame(lengthDelimited(1003, Buffer.alloc(0))), null);
  assert.equal(monotonicDelta("hello", "hello world"), " world");
  assert.equal(monotonicDelta("", "answer"), "answer");
  assert.throws(() => monotonicDelta("abcdef", "abc"), /regressed/);
});

test("native errors normalize without leaking stack traces", () => {
  const quota = normalizeGeminiAppError(new GeminiAppError("NATIVE_QUOTA_EXHAUSTED", 429, "quota"));
  assert.equal(quota.status, 429);
  assert.equal(quota.code, "NATIVE_QUOTA_EXHAUSTED");
  const deepThink = normalizeGeminiAppError(new Error("NATIVE_DEEP_THINK_UNSUPPORTED"));
  assert.equal(deepThink.status, 422);
  const leaked = new Error("token=secret\nat stacktrace");
  const normalized = normalizeGeminiAppError(leaked);
  assert.doesNotMatch(normalized.message, /stacktrace/);
});
