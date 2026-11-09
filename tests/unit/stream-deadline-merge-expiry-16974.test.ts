/**
 * #16974: the deadline paths merge the client signal and the deadline controller
 * with `mergeAbortSignals` instead of `AbortSignal.any`. The merge registers its
 * listener on the deadline signal BEFORE the keepalive wrapper registers
 * `onExpired`, so on expiry the merged (route) signal aborts first and the
 * wrapper's `onAbort` runs before `onExpired`. These tests pin that a deadline
 * expiry still takes the expiry path — error frame + one warn — and is not
 * mistaken for a client disconnect (silent close).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  OPENAI_CHAT_ERROR_FRAME,
  withDeadlineSignal,
  withEarlyStreamKeepalive,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";
import { createStreamDeadlineSignal } from "../../open-sse/utils/streamDeadlineSignal.ts";

async function readAll(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let out = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) out += decoder.decode(value, { stream: true });
  }
  return out;
}

const never = () =>
  new Promise<Response>(() => {
    /* handler that never resolves */
  });

async function expireThrough(signal: AbortSignal, deadlineController: AbortController) {
  const warnings: string[] = [];
  const result = await withEarlyStreamKeepalive(never(), {
    thresholdMs: 10,
    intervalMs: 15,
    signal,
    slowPathDeadlineMs: 50,
    deadlineController,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
    correlationId: "corr-16974",
    log: { warn: (_tag, message) => warnings.push(message) },
  });
  return { body: await readAll(result), warnings };
}

test("withDeadlineSignal: deadline expiry with a live client still emits the error frame", async () => {
  const client = new AbortController();
  const { wrappedReq, deadlineController } = withDeadlineSignal(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "m", stream: true }),
      signal: client.signal,
    })
  );

  const { body, warnings } = await expireThrough(wrappedReq.signal, deadlineController);

  assert.match(body, /"error":/, "deadline expiry must emit the route error frame");
  assert.equal(warnings.length, 1, "exactly one deadline warn");
  assert.match(warnings[0]!, /deadline expired/);
  assert.equal(wrappedReq.signal.aborted, true, "handler observes the deadline as an abort");
  assert.equal(client.signal.aborted, false, "the client signal is never aborted by the deadline");
});

test("createStreamDeadlineSignal: deadline expiry with a live client still emits the error frame", async () => {
  const client = new AbortController();
  const { signal, deadlineController } = createStreamDeadlineSignal(client.signal);

  const { body, warnings } = await expireThrough(signal, deadlineController);

  assert.match(body, /"error":/, "deadline expiry must emit the route error frame");
  assert.equal(warnings.length, 1, "exactly one deadline warn");
  assert.equal(signal.aborted, true);
  assert.equal(client.signal.aborted, false);
});

test("a client disconnect through the merged signal still closes silently", async () => {
  const client = new AbortController();
  const { signal, deadlineController } = createStreamDeadlineSignal(client.signal);
  const warnings: string[] = [];
  const result = await withEarlyStreamKeepalive(never(), {
    thresholdMs: 10,
    intervalMs: 15,
    signal,
    slowPathDeadlineMs: 5000,
    deadlineController,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
    log: { warn: (_tag, message) => warnings.push(message) },
  });
  const reader = result.body!.getReader();
  await reader.read();
  client.abort();
  let rest = "";
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) rest += decoder.decode(value, { stream: true });
  }
  assert.doesNotMatch(rest, /"error":/, "a disconnect must not emit the deadline error frame");
  assert.equal(warnings.length, 0);
  assert.equal(deadlineController.signal.aborted, false);
});
