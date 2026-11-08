import test from "node:test";
import assert from "node:assert/strict";

import { extractResponsesId } from "../../open-sse/handlers/chatCore/attemptLogging.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  normalizeStreamFailurePayload,
  prepareTranslatedStreamFailure,
  projectStreamFailureEvent,
  type StreamFailureSnapshot,
} from "../../open-sse/utils/streamErrorFormat.ts";
import {
  createStreamFailureFinalizers,
  type StreamFailurePayload,
} from "../../open-sse/utils/streamFailureFinalization.ts";
import { buildStreamFailureSnapshot } from "../../open-sse/utils/streamFailureSnapshot.ts";
import { createStructuredSSECollector } from "../../open-sse/utils/streamPayloadCollector.ts";

const FAILURE_MESSAGE = "Upstream terminated mid-stream";
const RESPONSES_FORMAT = FORMATS.OPENAI_RESPONSES;

type Collector = ReturnType<typeof createStructuredSSECollector>;

function makeProviderCollector(options?: {
  format?: string | null;
  maxEvents?: number;
  maxBytes?: number;
}): Collector {
  return createStructuredSSECollector({
    stage: "provider_response",
    format: options?.format === undefined ? FORMATS.OPENAI : options.format,
    fallbackModel: "test-model",
    ...(options?.maxEvents !== undefined ? { maxEvents: options.maxEvents } : {}),
    ...(options?.maxBytes !== undefined ? { maxBytes: options.maxBytes } : {}),
  });
}

function pushChatEvents(collector: Collector, count: number): void {
  for (let index = 0; index < count; index++) {
    collector.push({
      id: "chatcmpl_test_1",
      object: "chat.completion.chunk",
      created: 123,
      model: "test-model",
      choices: [
        {
          index: 0,
          delta:
            index === 0
              ? { role: "assistant", content: `part-${index} ` }
              : { content: `part-${index} ` },
        },
      ],
    });
  }
}

function upstreamFailurePayload(): unknown {
  return { error: { message: FAILURE_MESSAGE, code: "stream_terminated" } };
}

function directFailure(snapshot?: StreamFailureSnapshot): StreamFailurePayload {
  const base = { status: 502, message: FAILURE_MESSAGE, code: "stream_terminated" };
  return snapshot ? { ...base, streamSnapshot: snapshot } : base;
}

function captureCompletion(): {
  completions: Array<Record<string, unknown>>;
  handleStreamFailure: (failure: StreamFailurePayload) => boolean;
} {
  const completions: Array<Record<string, unknown>> = [];
  let failureRecorded = false;
  const finalizers = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => failureRecorded,
    onStreamComplete: (payload) => {
      failureRecorded = true;
      completions.push(payload as unknown as Record<string, unknown>);
    },
    persistFailureUsage: () => {},
  });
  return { completions, handleStreamFailure: finalizers.handleStreamFailure };
}

function asRecord(value: unknown): Record<string, unknown> {
  assert.ok(value !== null && typeof value === "object", "expected an object payload");
  return value as Record<string, unknown>;
}

function withoutCount(value: unknown): unknown {
  const record = { ...asRecord(value) };
  delete record._eventCount;
  return record;
}

test("cut stream after three events keeps the event count and the bounded summary", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);

  const snapshot = buildStreamFailureSnapshot(collector);
  assert.equal(snapshot.providerEventCount, 3);
  assert.deepEqual(snapshot.providerSummary, collector.getSummary());

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(directFailure(snapshot));

  assert.equal(completions.length, 1);
  const providerPayload = asRecord(completions[0].providerPayload);
  assert.equal(providerPayload._eventCount, 3);
  assert.deepEqual(providerPayload.summary, collector.getSummary());
});

test("cut stream with nothing sent records zero and leaves the error untouched", () => {
  const collector = makeProviderCollector();
  const snapshot = buildStreamFailureSnapshot(collector);
  assert.equal(snapshot.providerEventCount, 0);
  assert.ok(!("providerSummary" in snapshot));

  const withSnapshot = captureCompletion();
  withSnapshot.handleStreamFailure(directFailure(snapshot));
  const withoutSnapshot = captureCompletion();
  withoutSnapshot.handleStreamFailure(directFailure());

  assert.equal(withSnapshot.completions.length, 1);
  assert.equal(withoutSnapshot.completions.length, 1);
  const failed = withSnapshot.completions[0];
  const bare = withoutSnapshot.completions[0];

  const providerPayload = asRecord(failed.providerPayload);
  assert.equal(providerPayload._eventCount, 0);
  assert.ok(!("summary" in providerPayload));
  assert.deepEqual(failed.error, bare.error);
  assert.deepEqual(failed.responseBody, bare.responseBody);
  assert.deepEqual(failed.clientPayload, bare.clientPayload);
  assert.deepEqual(withoutCount(providerPayload), withoutCount(bare.providerPayload));
});

test("successful stream keeps its shape", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);

  const summary = collector.getSummary();
  const built = asRecord(collector.build(summary, { includeEvents: false }));
  assert.equal(built._streamed, true);
  assert.equal(built._eventCount, 3);
  assert.deepEqual(built.summary, summary);
  assert.ok(!("events" in built));
});

test("snapshot survives failure normalization and projection", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);
  const snapshot = buildStreamFailureSnapshot(collector);

  const normalized = normalizeStreamFailurePayload({
    ...(upstreamFailurePayload() as Record<string, unknown>),
    streamSnapshot: snapshot,
  });
  assert.ok(normalized);
  assert.deepEqual(normalized.streamSnapshot, snapshot);

  const projected = projectStreamFailureEvent({
    ...(upstreamFailurePayload() as Record<string, unknown>),
    streamSnapshot: snapshot,
  });
  assert.ok(projected, "failure event must project");
  assert.deepEqual(projected.internalFailure.streamSnapshot, snapshot);

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(projected.internalFailure);
  assert.equal(completions.length, 1);
  assert.equal(asRecord(completions[0].providerPayload)._eventCount, 3);
});

test("first recorded failure wins when a rich failure arrives first", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);
  const snapshot = buildStreamFailureSnapshot(collector);

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(directFailure(snapshot));
  handleStreamFailure(directFailure());

  assert.equal(completions.length, 1);
  assert.equal(asRecord(completions[0].providerPayload)._eventCount, 3);
});

test("first recorded failure wins when a bare failure arrives first", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);
  const snapshot = buildStreamFailureSnapshot(collector);

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(directFailure());
  handleStreamFailure(directFailure(snapshot));

  assert.equal(completions.length, 1);
  assert.equal(asRecord(completions[0].providerPayload)._eventCount, 0);
});

test("failure provider payload carries a readable summary id while the client payload stays bare", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);
  const snapshot = buildStreamFailureSnapshot(collector);

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(directFailure(snapshot));
  assert.equal(completions.length, 1);

  const providerPayload = asRecord(completions[0].providerPayload);
  assert.equal(extractResponsesId(RESPONSES_FORMAT, completions[0].clientPayload), null);
  assert.equal(extractResponsesId(RESPONSES_FORMAT, providerPayload), "chatcmpl_test_1");
});

test("collector without a format still counts events and omits the summary", () => {
  const collector = makeProviderCollector({ format: null });
  pushChatEvents(collector, 3);

  assert.equal(collector.getEventCount(), 3);
  assert.equal(collector.getSummary(), undefined);

  const snapshot = buildStreamFailureSnapshot(collector);
  assert.equal(snapshot.providerEventCount, 3);
  assert.ok(!("providerSummary" in snapshot));

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(directFailure(snapshot));
  assert.equal(completions.length, 1);
  const providerPayload = asRecord(completions[0].providerPayload);
  assert.equal(providerPayload._eventCount, 3);
  assert.ok(!("summary" in providerPayload));
});

test("truncated collector counts dropped events and stays far under the pipeline ceiling", () => {
  const collector = makeProviderCollector({ maxEvents: 2, maxBytes: 4000 });
  pushChatEvents(collector, 5);

  assert.equal(collector.getEventCount(), 5);
  const snapshot = buildStreamFailureSnapshot(collector);
  assert.equal(snapshot.providerEventCount, 5);

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(directFailure(snapshot));
  assert.equal(completions.length, 1);
  const providerPayload = asRecord(completions[0].providerPayload);
  assert.equal(providerPayload._eventCount, 5);

  const summary = asRecord(providerPayload.summary);
  const message = asRecord((summary.choices as Array<Record<string, unknown>>)[0].message);
  assert.match(String(message.content), /part-0/);
  assert.match(String(message.content), /part-4/);

  const serialized = JSON.stringify(completions[0].providerPayload);
  assert.ok(serialized.length < 512 * 1024);
});

test("translate failure snapshots the events read before the failure frame is stored", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);

  const failure = prepareTranslatedStreamFailure(upstreamFailurePayload());
  assert.ok(failure, "translate failure must prepare");
  failure.internalFailure.streamSnapshot ??= buildStreamFailureSnapshot(collector);
  collector.push(failure.providerPayload);

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(failure.internalFailure);
  assert.equal(completions.length, 1);
  assert.equal(asRecord(completions[0].providerPayload)._eventCount, 3);
  assert.equal(buildStreamFailureSnapshot(collector).providerEventCount, 4);
});

test("passthrough failure excludes the stored failure frame from the count", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);

  const failurePayload = upstreamFailurePayload();
  collector.push(failurePayload);
  const projected = projectStreamFailureEvent(failurePayload);
  assert.ok(projected, "failure event must project");
  projected.internalFailure.streamSnapshot ??= buildStreamFailureSnapshot(
    collector,
    collector.getEventCount() - 1
  );

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(projected.internalFailure);
  assert.equal(completions.length, 1);
  assert.equal(asRecord(completions[0].providerPayload)._eventCount, 3);
});

test("buffered failure excludes the stored failure frame from the count", () => {
  const collector = makeProviderCollector();
  pushChatEvents(collector, 3);

  const bufferedPayload = upstreamFailurePayload();
  collector.push(bufferedPayload);
  const projected = projectStreamFailureEvent(bufferedPayload);
  assert.ok(projected, "failure event must project");
  projected.internalFailure.streamSnapshot ??= buildStreamFailureSnapshot(
    collector,
    collector.getEventCount() - 1
  );

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(projected.internalFailure);
  assert.equal(completions.length, 1);
  assert.equal(asRecord(completions[0].providerPayload)._eventCount, 3);
});

test("snapshot outside the collector contract is sanitized to a bounded count with no summary", () => {
  const forged = {
    ...(upstreamFailurePayload() as Record<string, unknown>),
    streamSnapshot: {
      providerEventCount: -5,
      providerSummary: { rawUserContent: "x".repeat(600 * 1024) },
    },
  };
  const projected = projectStreamFailureEvent(forged);
  assert.ok(projected, "failure event must project");

  const { completions, handleStreamFailure } = captureCompletion();
  handleStreamFailure(projected.internalFailure);
  assert.equal(completions.length, 1);
  const providerPayload = asRecord(completions[0].providerPayload);
  assert.equal(providerPayload._eventCount, 0);
  assert.ok(!("summary" in providerPayload));
});

test("collector that throws while counting still yields a zero-count snapshot", () => {
  const snapshot = buildStreamFailureSnapshot({
    getEventCount: () => {
      throw new Error("count unavailable");
    },
    getSummary: () => null,
  });
  assert.equal(snapshot.providerEventCount, 0);
  assert.ok(!("providerSummary" in snapshot));
});
