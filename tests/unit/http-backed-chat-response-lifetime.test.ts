import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import test, { type TestContext } from "node:test";

import {
  httpBackedChat,
  tryBackedChat,
  __setBrowserBackedChatOverrideForTesting,
  __resetBrowserBackedChatOverrideForTesting,
} from "../../open-sse/services/browserBackedChat.ts";
import type { BrowserBackedChatRequest } from "../../open-sse/services/browserBackedChat/types.ts";
import tlsClient, {
  TlsClient,
  type TlsFetchOptions,
  type WreqResponse,
  type WreqSession,
} from "../../open-sse/utils/tlsClient.ts";

const MAX_RESPONSE_BYTES = 10 * 1024 * 1024;
const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

function request(signal?: AbortSignal): BrowserBackedChatRequest {
  return {
    poolKey: "account-a",
    chatUrl: "https://synthetic.test/chat",
    chatPageUrl: "https://synthetic.test/",
    chatUrlMatchDomain: "synthetic.test",
    userMessage: "hello",
    inputSelector: "textarea",
    signal,
  };
}

function sourceBody(
  chunks = ["one", "two", "three", "four", "five", "six", "seven", "eight"],
  cancel: () => void | Promise<void> = () => {}
) {
  let reads = 0;
  let cancels = 0;
  let eof = false;
  const body = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (reads === chunks.length) {
          eof = true;
          controller.close();
        } else {
          controller.enqueue(new TextEncoder().encode(chunks[reads++]));
        }
      },
      cancel() {
        cancels += 1;
        return cancel();
      },
    },
    { highWaterMark: 0 }
  );
  return { body, reads: () => reads, cancels: () => cancels, eof: () => eof };
}

function upstream(body: ReadableStream<Uint8Array>, length: number, native = true): WreqResponse {
  const headers = new Headers({
    "content-length": String(length),
    "content-type": "application/json",
  });
  return native
    ? new Response(body, { headers })
    : { status: 200, statusText: "OK", headers, body };
}

function fixture(t: TestContext, respond: (url: string) => WreqResponse) {
  let creates = 0;
  let closes = 0;
  const client = new TlsClient(async () => {
    creates += 1;
    const session: WreqSession = {
      async fetch(url) {
        return respond(url);
      },
      close() {
        closes += 1;
      },
      getCookies() {
        return {};
      },
    };
    return session;
  }, 1);
  const counts = () => [
    ...(client as unknown as { sessionUseCounts: Map<string, number> }).sessionUseCounts.values(),
  ];
  t.mock.getter(tlsClient, "available", () => true);
  t.mock.method(tlsClient, "fetch", (url: string, options?: TlsFetchOptions) =>
    client.fetch(url, { ...options, proxy: null })
  );
  t.after(() => client.closeAll());
  return { client, counts, creates: () => creates, closes: () => closes };
}

function assertOversized(result: Awaited<ReturnType<typeof httpBackedChat>>) {
  assert.equal(result.status, 502);
  assert.equal(result.contentType, "application/json");
  assert.deepEqual(JSON.parse(result.body.toString()), {
    error: { message: "httpBackedChat failed: Response too large", type: "upstream_error" },
  });
}

async function promptly<T>(operation: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([
      operation,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("caller waited for cancellation")), 500);
      }),
    ]);
  } finally {
    clearTimeout(timer!);
  }
}

for (const native of [true, false]) {
  for (const withSignal of [true, false]) {
    test(`oversized ${native ? "native Response" : "WreqResponse"} releases its lease with ${withSignal ? "a live signal" : "no signal"}`, async (t) => {
      const source = sourceBody();
      const abort = new AbortController();
      const { client, counts, creates, closes } = fixture(t, (url) =>
        url.endsWith("/chat")
          ? upstream(source.body, MAX_RESPONSE_BYTES + 1, native)
          : new Response("admitted")
      );

      assertOversized(await httpBackedChat(request(withSignal ? abort.signal : undefined)));
      await tick();
      assert.equal(source.cancels(), 1);
      assert.ok(source.reads() <= 1, "the adapter buffers at most one chunk before cancellation");
      assert.equal(source.eof(), false, "oversized bodies must not be drained");
      assert.deepEqual(counts(), []);
      assert.equal(source.body.locked, false);
      assert.equal(abort.signal.aborted, false);
      assert.equal(getEventListeners(abort.signal, "abort").length, 0);
      assert.equal(closes(), 0, "release happens before session teardown");

      const next = await client.fetch("https://synthetic.test/next", {
        proxy: null,
        sessionScope: "account-b",
      });
      assert.equal(await next.text(), "admitted");
      assert.equal(creates(), 2, "another scope acquires the sole session slot");
      assert.deepEqual(counts(), []);
      assert.equal(source.cancels(), 1);
    });
  }
}

for (const ending of ["rejects", "stalls"] as const) {
  test(`oversized native cancellation that ${ending} preserves a prompt 502`, async (t) => {
    let finishCancellation: (() => void) | undefined;
    const source = sourceBody(undefined, () =>
      ending === "rejects"
        ? Promise.reject(new Error("secret cancellation failure"))
        : new Promise<void>((resolve) => {
            finishCancellation = resolve;
          })
    );
    const abort = new AbortController();
    const { client, counts } = fixture(t, (url) =>
      url.endsWith("/chat")
        ? upstream(source.body, MAX_RESPONSE_BYTES + 1)
        : new Response("admitted")
    );
    try {
      assertOversized(await promptly(httpBackedChat(request(abort.signal))));
      await tick();
      assert.equal(source.cancels(), 1);
      assert.ok(source.reads() <= 1);
      assert.equal(source.eof(), false);
      assert.deepEqual(counts(), []);
      assert.equal(abort.signal.aborted, false);
      assert.equal(getEventListeners(abort.signal, "abort").length, 0);
      const next = await client.fetch("https://synthetic.test/next", {
        proxy: null,
        sessionScope: "account-b",
      });
      assert.equal(await next.text(), "admitted");
      assert.equal(client.getCircuitState(null, "account-a").failureCount, 0);
    } finally {
      finishCancellation?.();
      await tick();
    }
    assert.equal(source.cancels(), 1);
    assert.equal(source.body.locked, false);
  });
}

for (const length of [17, MAX_RESPONSE_BYTES]) {
  test(`JSON with declared length ${length} is consumed to EOF without cancellation`, async (t) => {
    const chunks = ['{"answer":', '"hello"}'];
    const source = sourceBody(chunks);
    const abort = new AbortController();
    const { counts } = fixture(t, () => upstream(source.body, length));

    const result = await httpBackedChat(request(abort.signal));
    assert.equal(result.status, 200);
    assert.equal(result.contentType, "application/json");
    assert.equal(result.body.toString(), chunks.join(""));
    assert.equal(source.reads(), chunks.length);
    assert.equal(source.eof(), true);
    assert.equal(source.cancels(), 0);
    assert.deepEqual(counts(), []);
    assert.equal(source.body.locked, false);
    assert.equal(abort.signal.aborted, false);
    assert.equal(getEventListeners(abort.signal, "abort").length, 0);
  });
}

test("oversized rejection preserves a slow active body on the same session", async (t) => {
  const oversized = sourceBody();
  const active = sourceBody(["first", "second", "third"]);
  const abort = new AbortController();
  const { client, counts, creates, closes } = fixture(t, (url) =>
    url.endsWith("/chat")
      ? upstream(oversized.body, MAX_RESPONSE_BYTES + 1)
      : upstream(active.body, 16)
  );
  const response = await client.fetch("https://synthetic.test/active", {
    proxy: null,
    sessionScope: "account-a",
    signal: abort.signal,
  });
  const reader = response.body!.getReader();
  assert.deepEqual(counts(), [1]);

  assertOversized(await httpBackedChat(request(abort.signal)));
  await tick();
  assert.equal(oversized.cancels(), 1);
  assert.deepEqual(counts(), [1], "only the rejected response releases a lease");
  assert.equal(creates(), 1);
  assert.equal(closes(), 0);
  assert.equal(active.cancels(), 0);
  assert.ok(active.reads() <= 1, "the slow consumer controls its own read demand");
  await assert.rejects(
    client.fetch("https://synthetic.test/blocked", { proxy: null, sessionScope: "account-b" }),
    { code: "TLS_SESSION_CAPACITY" }
  );
  let body = "";
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    body += new TextDecoder().decode(chunk.value);
    await tick();
  }
  reader.releaseLock();
  assert.equal(body, "firstsecondthird");
  assert.equal(active.eof(), true);
  assert.equal(active.cancels(), 0);
  assert.deepEqual(counts(), []);
  assert.equal(abort.signal.aborted, false);
  assert.equal(getEventListeners(abort.signal, "abort").length, 0);
  assert.equal(oversized.cancels(), 1);
});

for (const native of [false, true]) {
  for (const combined of [false, true]) {
    test(`${combined ? "tryBackedChat" : "httpBackedChat"}: ${native ? "native Response" : "WreqResponse"} post-header timeout follows the AbortError path`, async (t) => {
      const reading = Promise.withResolvers<void>();
      const reasons: unknown[] = [];
      let controller!: ReadableStreamDefaultController<Uint8Array>;
      const body = new ReadableStream<Uint8Array>(
        {
          start(value) {
            controller = value;
          },
          pull() {
            reading.resolve();
          },
          cancel(reason) {
            reasons.push(reason);
          },
        },
        { highWaterMark: 0 }
      );
      const { client, counts } = fixture(t, () => upstream(body, 17, native));
      let browserCalls = 0;
      __setBrowserBackedChatOverrideForTesting(async () => {
        browserCalls += 1;
        throw new Error("unexpected browser fallback after timeout");
      });
      t.after(__resetBrowserBackedChatOverrideForTesting);
      const abort = new AbortController();
      const pending = (combined ? tryBackedChat : httpBackedChat)(request(abort.signal));
      const checked = combined
        ? promptly(pending)
        : assert.rejects(promptly(pending), (error) => {
            assert.ok(error instanceof DOMException);
            assert.equal(error.name, "AbortError");
            assert.equal(error.message, "deadline expired");
            return true;
          });
      void checked.catch(() => {});
      try {
        await promptly(reading.promise);
        assert.deepEqual(counts(), [1]);
        abort.abort(new DOMException("deadline expired", "TimeoutError"));
        const result = await checked;
        if (combined) {
          assert.ok(result);
          assert.equal(result.status, 504);
          assert.deepEqual(JSON.parse(result.body.toString()), {
            error: { message: "tryBackedChat timed out", type: "timeout_error" },
          });
        }
        assert.equal(browserCalls, 0);
        assert.equal(reasons.length, 1);
        assert.ok(reasons[0] instanceof DOMException);
        assert.equal(reasons[0].name, "AbortError");
        assert.equal(reasons[0].message, "deadline expired");
        assert.deepEqual(counts(), []);
        assert.equal(body.locked, false);
        assert.equal(getEventListeners(abort.signal, "abort").length, 0);
        assert.equal(client.getCircuitState(null, "account-a").failureCount, 0);
      } finally {
        controller.error(new DOMException("test body cleanup", "AbortError"));
        await pending.catch(() => {});
      }
    });
  }
}
