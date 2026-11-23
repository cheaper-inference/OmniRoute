import test from "node:test";
import assert from "node:assert/strict";
import { LMArenaExecutor } from "../../open-sse/executors/lmarena.ts";
import { __setTlsFetchOverrideForTesting } from "../../open-sse/services/lmarenaTlsClient.ts";
import { runWithAppliedProxyCapture } from "../../open-sse/utils/proxyFetch.ts";
import type { AppliedProxySink } from "../../open-sse/utils/proxyFetch.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const TEST_MODEL = "019e080d-c29d-7d9a-aa54-faed41da0763";

function baseInput(): ExecuteInput {
  return {
    model: TEST_MODEL,
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { cookie: "session=test" },
    signal: new AbortController().signal,
    log: undefined,
  };
}

test.afterEach(() => {
  __setTlsFetchOverrideForTesting(null);
});

test("refusal 429 records the upstream status on the sink", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 429,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: "limited",
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new LMArenaExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 429);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("refusal 401 records the upstream status on the sink", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 401,
    headers: new Headers({ "Content-Type": "application/json" }),
    text: "limited",
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new LMArenaExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, 401);
    assert.equal(response.status, 401);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("refusal 403 through the bot-block path records the upstream status on the sink", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 403,
    headers: new Headers({ "Content-Type": "text/html" }),
    text: "Just a moment — attention required",
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new LMArenaExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, 403);
    assert.equal(response.status, 403);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("successful completion leaves the sink untouched", async () => {
  __setTlsFetchOverrideForTesting(async () => ({
    status: 200,
    headers: new Headers({ "Content-Type": "text/event-stream" }),
    text: '0:"Hello"\nd:{"finishReason":"stop"}\n',
    body: null,
  }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new LMArenaExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 200);
    const payload = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    assert.equal(payload.choices[0].message.content, "Hello");
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});

test("network failure leaves the sink untouched", async () => {
  __setTlsFetchOverrideForTesting(async () => {
    throw new Error("connection reset");
  });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new LMArenaExecutor().execute(baseInput())
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 502);
  } finally {
    __setTlsFetchOverrideForTesting(null);
  }
});
