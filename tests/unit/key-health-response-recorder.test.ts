// The key-health callback preserves dispatch order even when responses arrive out of order.
import test from "node:test";
import assert from "node:assert/strict";
import { makeRequestDeps } from "../helpers/executeProviderRequestFixture.ts";

import {
  executeProviderRequest,
  makeResponseKeyHealthRecorder,
} from "../../open-sse/handlers/chatCore/executeProviderRequest.ts";

type Recorded = {
  status: number;
  creds: Record<string, unknown> | null | undefined;
  transport: string | undefined;
  failureDetail: string | undefined;
  retryAfterMs: number | null | undefined;
  requestSeq: number;
};

function recorderSpy() {
  const calls: Recorded[] = [];
  const record = (
    status: number,
    creds: Record<string, unknown> | null | undefined,
    transport: string | undefined,
    failureDetail: string | undefined,
    retryAfterMs: number | null | undefined,
    requestSeq: number
  ) => {
    calls.push({ status, creds, transport, failureDetail, retryAfterMs, requestSeq });
  };
  return { calls, record };
}

test("the response callback reports the dispatch sequence it was built with", () => {
  const requestSeq = 1_700_000_000_123;
  const { calls, record } = recorderSpy();
  const recorder = makeResponseKeyHealthRecorder(record, requestSeq);

  const creds = { connectionId: "conn" };
  recorder(
    new Response("{}", { status: 401, headers: { "content-type": "application/json" } }),
    creds,
    "http",
    "unauthorized"
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].status, 401);
  assert.equal(calls[0].creds, creds, "the callback must forward the credentials it was given");
  assert.equal(calls[0].transport, "http");
  assert.equal(calls[0].failureDetail, "unauthorized");
  assert.equal(calls[0].retryAfterMs, null);
  assert.equal(
    calls[0].requestSeq,
    requestSeq,
    "the callback must not replace the dispatch sequence when the response arrives"
  );
});

test("rate limiting forwards Retry-After and preserves the dispatch sequence", () => {
  const requestSeq = 1_600_000_000_000;
  const { calls, record } = recorderSpy();
  const recorder = makeResponseKeyHealthRecorder(record, requestSeq);

  recorder(
    new Response("{}", {
      status: 429,
      headers: { "content-type": "application/json", "retry-after": "7" },
    }),
    { connectionId: "conn" },
    "http"
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].retryAfterMs, 7_000);
  assert.equal(calls[0].failureDetail, "");
  assert.equal(calls[0].requestSeq, requestSeq);
});

test("a successful response also carries the dispatch sequence", () => {
  const requestSeq = 1_650_000_000_000;
  const { calls, record } = recorderSpy();
  const recorder = makeResponseKeyHealthRecorder(record, requestSeq);

  recorder(new Response("{}", { status: 200, headers: { "content-type": "application/json" } }), {
    connectionId: "conn",
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].status, 200);
  assert.equal(calls[0].retryAfterMs, null);
  assert.equal(calls[0].failureDetail, "");
  assert.equal(calls[0].requestSeq, requestSeq);
});

for (const stream of [true, false]) {
  for (const status of [403, 402, 429]) {
    test(`the ${stream ? "streaming" : "non-streaming"} ${status} dispatch records its own response and sequence`, async () => {
      const { record, calls } = recorderSpy();
      const body = JSON.stringify({
        error: { message: status === 429 ? "Rate limited" : "Workspace access denied" },
      });
      const response = new Response(body, {
        status,
        headers: {
          "content-type": "application/json",
          ...(status === 429 ? { "retry-after": "2" } : {}),
        },
      });
      const result = await executeProviderRequest(makeRequestDeps(response, record, stream));
      assert.equal(result.response.status, status);
      assert.equal(await result.response.text(), body);
      assert.equal(calls.length, 1);
      assert.equal(calls[0].status, status);
      assert.equal(calls[0].creds?.connectionId, "kh-real-dispatch");
      assert.equal(calls[0].failureDetail, body);
      assert.equal(calls[0].retryAfterMs, status === 429 ? 2_000 : null);
      assert.ok(Number.isSafeInteger(calls[0].requestSeq) && calls[0].requestSeq > 0);
    });
  }
}

test("streaming auth-error classification uses the 64 KiB error cap, not the completion cap", async () => {
  const { record, calls } = recorderSpy();
  const body = JSON.stringify({
    error: { message: "Workspace access denied" },
    padding: "x".repeat(65_536),
  });
  const response = new Response(body, {
    status: 403,
    headers: { "content-type": "application/json" },
  });
  const result = await executeProviderRequest(makeRequestDeps(response, record, true));
  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].failureDetail,
    "",
    "an over-cap error is not fully buffered for classification"
  );
  assert.equal(await result.response.text(), body, "the client error body remains intact");
});

for (const status of [200, 429]) {
  test(`stream redispatch records its ${status} response once without replacing the initial observation`, async () => {
    const { record, calls } = recorderSpy();
    const content = "data: [DONE]\n\n";
    const initial = new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.error(new TypeError("terminated"));
        },
      }),
      { headers: { "content-type": "text/event-stream" } }
    );
    const retry = new Response(status === 200 ? content : "Rate limited", {
      status,
      headers:
        status === 200
          ? { "content-type": "text/event-stream" }
          : { "content-type": "text/plain", "retry-after": "2" },
    });
    const deps = makeRequestDeps(initial, record, true);
    deps.getExecutionCredentials = () => ({ connectionId: "kh-redispatch-fixture" });
    deps.settings = { resilienceSettings: { streamRecovery: { enabled: true } } };
    let dispatches = 0;
    deps.executor.execute = async () => {
      dispatches++;
      assert.ok(dispatches <= 2, "only one redispatch is expected");
      return {
        response: dispatches === 1 ? initial : retry,
        transport: dispatches === 1 ? "initial" : "redispatch",
        url: "",
        headers: {},
        transformedBody: null,
      };
    };

    const result = await executeProviderRequest(deps);
    assert.equal(await result.response.text(), status === 200 ? content : "");
    assert.equal(dispatches, 2);
    assert.deepEqual(
      calls.map(({ status, transport, failureDetail, retryAfterMs }) => ({
        status,
        transport,
        failureDetail,
        retryAfterMs,
      })),
      [
        { status: 200, transport: "initial", failureDetail: "", retryAfterMs: null },
        {
          status,
          transport: "redispatch",
          failureDetail: status === 429 ? "Rate limited" : "",
          retryAfterMs: status === 429 ? 2_000 : null,
        },
      ]
    );
    assert.ok(calls[1].requestSeq > calls[0].requestSeq);
  });
}
