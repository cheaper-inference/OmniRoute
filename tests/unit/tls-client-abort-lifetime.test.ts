import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import test, { type TestContext } from "node:test";

import { TlsClient, type WreqResponse, type WreqSession } from "../../open-sse/utils/tlsClient.ts";

const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

async function promptly<T>(operation: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      operation,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("body operation did not settle")), 500);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

function source(cancel: (reason: unknown) => void | Promise<void> = () => {}) {
  let controller!: ReadableStreamDefaultController<Uint8Array>;
  const reasons: unknown[] = [];
  const body = new ReadableStream<Uint8Array>(
    {
      start(value) {
        controller = value;
      },
      cancel(reason) {
        reasons.push(reason);
        return cancel(reason);
      },
    },
    { highWaterMark: 0 }
  );
  return { body, controller, reasons };
}

function upstream(body: ReadableStream<Uint8Array> | null, native: boolean): WreqResponse {
  const metadata = {
    status: 201,
    statusText: "Created",
    headers: new Headers({ "x-synthetic": "yes", "content-type": "text/plain" }),
    url: "https://synthetic.test/redirected",
    redirected: true,
  };
  if (!native) return { ...metadata, body };
  const response = new Response(body, metadata);
  Object.defineProperty(response, "url", { value: metadata.url });
  Object.defineProperty(response, "redirected", { value: metadata.redirected });
  return response;
}

// Match wreq-js setupAbort's pre-header error contract, including non-Error reasons.
function nativeAbortError(reason: unknown): Error {
  if (reason instanceof DOMException) {
    return reason.name === "AbortError"
      ? reason
      : new DOMException(reason.message || "The operation was aborted", "AbortError");
  }
  if (reason instanceof Error) {
    return Object.assign(new Error(reason.message, { cause: reason }), { name: "AbortError" });
  }
  return new DOMException(
    typeof reason === "string" ? reason : "The operation was aborted",
    "AbortError"
  );
}

function fixture(t: TestContext, respond: () => WreqResponse) {
  let closes = 0;
  const session: WreqSession = {
    async fetch(url, options) {
      const signal = options?.signal as AbortSignal | undefined;
      if (signal?.aborted) throw nativeAbortError(signal.reason);
      return url.endsWith("/next") ? new Response("admitted") : respond();
    },
    close() {
      closes += 1;
    },
    getCookies() {
      return {};
    },
  };
  const client = new TlsClient(async () => session, 1);
  const responses: Response[] = [];
  const readers: ReadableStreamDefaultReader<Uint8Array>[] = [];
  const counts = () => [
    ...(client as unknown as { sessionUseCounts: Map<string, number> }).sessionUseCounts.values(),
  ];
  const fetch = async (signal?: AbortSignal, scope = "account-a") => {
    const response = await client.fetch("https://synthetic.test/body", {
      proxy: null,
      signal,
      sessionScope: scope,
    });
    responses.push(response);
    return response;
  };
  const read = (response: Response) => {
    const reader = response.body!.getReader();
    readers.push(reader);
    return reader;
  };
  t.after(async () => {
    for (const reader of readers) void reader.cancel().catch(() => {});
    for (const response of responses) {
      if (!response.body?.locked) void response.body?.cancel().catch(() => {});
    }
    await client.closeAll();
  });
  return { client, counts, fetch, read, closes: () => closes };
}

for (const native of [false, true]) {
  const variant = native ? "native Response" : "WreqResponse";

  test(`${variant}: a signal aborted before fetching preserves the native rejection`, async (t) => {
    const input = source();
    const f = fixture(t, () => upstream(input.body, native));
    const abort = new AbortController();
    const reason = new DOMException("caller stopped before headers", "AbortError");
    abort.abort(reason);
    await assert.rejects(f.fetch(abort.signal), (error) => error === reason);
    assert.deepEqual(f.counts(), []);
    assert.deepEqual(input.reasons, []);
    assert.equal(getEventListeners(abort.signal, "abort").length, 0);
    assert.equal(f.client.getCircuitState(null, "account-a").failureCount, 0);
  });

  for (const state of ["idle", "pending", "buffered", "already-aborted"] as const) {
    test(`${variant}: caller abort cancels a ${state} body after headers`, async (t) => {
      const input = source();
      if (state === "buffered") input.controller.enqueue(Uint8Array.of(7));
      const abort = new AbortController();
      const reason = new DOMException("caller stopped", "AbortError");
      const f = fixture(t, () => {
        // Match dispatchRequest's signal cleanup before handing headers to the adapter.
        if (state === "already-aborted") abort.abort(reason);
        return upstream(input.body, native);
      });
      const response = await f.fetch(abort.signal);
      assert.equal(response.status, 201);
      assert.equal(response.statusText, "Created");
      assert.equal(response.headers.get("x-synthetic"), "yes");
      assert.equal(response.url, "https://synthetic.test/redirected");
      assert.equal(response.redirected, true);
      const reader = f.read(response);
      const pending = state === "pending" ? reader.read() : undefined;
      // Attach rejection handling before abort dispatches synchronously.
      const rejected = pending && assert.rejects(promptly(pending), (error) => error === reason);
      void rejected?.catch(() => {});
      if (state !== "already-aborted") {
        assert.deepEqual(f.counts(), [1], "headers must not make an active body idle");
        assert.equal(getEventListeners(abort.signal, "abort").length, 1);
        await tick();
        abort.abort(reason);
      }
      await tick();
      assert.deepEqual(input.reasons, [reason]);
      assert.deepEqual(f.counts(), []);
      assert.equal(getEventListeners(abort.signal, "abort").length, 0);
      assert.equal(input.body.locked, false);
      if (rejected) await rejected;
      else await assert.rejects(promptly(reader.read()), (error) => error === reason);
      assert.equal(f.client.getCircuitState(null, "account-a").failureCount, 0);
      assert.equal(f.closes(), 0, "body abort releases the lease without closing the session");
      const next = await f.client.fetch("https://synthetic.test/next", {
        proxy: null,
        sessionScope: "account-b",
      });
      assert.equal(await next.text(), "admitted");
      assert.equal(f.closes(), 1, "another scope can evict the idle session");
    });
  }

  for (const ending of ["eof", "error", "cancel", "cancel-rejects", "no-body"] as const) {
    test(`${variant}: ${ending} finalizes once and removes the abort listener`, async (t) => {
      const input = source(() => {
        if (ending === "cancel-rejects") throw new Error("secret cancellation details");
      });
      const f = fixture(t, () => upstream(ending === "no-body" ? null : input.body, native));
      const abort = new AbortController();
      const response = await f.fetch(abort.signal);
      if (ending === "no-body") assert.equal(response.body, null);
      else {
        assert.deepEqual(f.counts(), [1]);
        const reader = f.read(response);
        const pending = reader.read();
        if (ending === "error") {
          const rejected = assert.rejects(promptly(pending), {
            message: "wreq-js response body failed",
            code: "ECONNRESET",
          });
          input.controller.error(
            Object.assign(new Error("secret upstream details"), { code: "ECONNRESET" })
          );
          await rejected;
        } else if (ending === "eof") {
          input.controller.enqueue(Uint8Array.of(1, 2));
          input.controller.close();
          assert.deepEqual((await promptly(pending)).value, Uint8Array.of(1, 2));
          assert.equal((await promptly(reader.read())).done, true);
        } else {
          const cancel = reader.cancel("consumer stopped");
          if (ending === "cancel-rejects") {
            await assert.rejects(promptly(cancel), (error) => error === "consumer stopped");
          } else await promptly(cancel);
          assert.equal((await promptly(pending)).done, true);
        }
      }
      await tick();
      assert.deepEqual(f.counts(), []);
      assert.equal(getEventListeners(abort.signal, "abort").length, 0);
      assert.equal(input.body.locked, false);
      const expectedCancels = ending.startsWith("cancel") ? ["consumer stopped"] : [];
      assert.deepEqual(input.reasons, expectedCancels);
      abort.abort();
      await tick();
      assert.deepEqual(input.reasons, expectedCancels);
      assert.deepEqual(f.counts(), []);
      assert.equal(
        f.client.getCircuitState(null, "account-a").failureCount,
        ending === "error" ? 1 : 0
      );
    });
  }

  for (const cancellation of ["rejects", "stalls"] as const) {
    test(`${variant}: caller abort releases promptly when native cancellation ${cancellation}`, async (t) => {
      let finish!: () => void;
      const input = source(() =>
        cancellation === "rejects"
          ? Promise.reject(new Error("secret cancellation failure"))
          : new Promise<void>((resolve) => {
              finish = resolve;
            })
      );
      const f = fixture(t, () => upstream(input.body, native));
      const abort = new AbortController();
      const response = await f.fetch(abort.signal);
      const reader = f.read(response);
      const rejected = assert.rejects(promptly(reader.read()), { name: "AbortError" });
      abort.abort();
      try {
        await rejected;
        await tick();
        assert.equal(input.reasons.length, 1);
        assert.deepEqual(f.counts(), []);
        assert.equal(getEventListeners(abort.signal, "abort").length, 0);
        assert.equal(f.client.getCircuitState(null, "account-a").failureCount, 0);
        const next = await f.client.fetch("https://synthetic.test/next", {
          proxy: null,
          sessionScope: "account-b",
        });
        assert.equal(await next.text(), "admitted");
      } finally {
        finish?.();
        await tick();
      }
      assert.equal(input.body.locked, false);
    });
  }

  for (const first of [
    "abort",
    "cancel",
    "eof",
    "error",
    "eof-pending",
    "error-pending",
    "chunk-pending",
  ] as const) {
    test(`${variant}: ${first}/abort race preserves an active sibling lease`, async (t) => {
      const inputs = [source(), source()];
      let next = 0;
      const f = fixture(t, () => upstream(inputs[next++ % 2].body, native));
      const abort = new AbortController();
      const response = await f.fetch(abort.signal);
      const sibling = await f.fetch();
      const siblingReader = f.read(sibling);
      assert.deepEqual(f.counts(), [2]);
      const reader = f.read(response);
      if (first === "abort") {
        abort.abort();
        await assert.rejects(promptly(reader.read()), { name: "AbortError" });
        await reader.cancel().catch(() => {});
      } else if (first === "cancel") {
        const cancellation = reader.cancel("consumer stopped");
        abort.abort();
        await promptly(cancellation);
      } else if (first.endsWith("-pending")) {
        const reason = new DOMException("caller won the read race", "AbortError");
        const rejected = assert.rejects(promptly(reader.read()), (error) => error === reason);
        if (first === "eof-pending") inputs[0].controller.close();
        else if (first === "error-pending") {
          inputs[0].controller.error(new Error("secret upstream details"));
        } else inputs[0].controller.enqueue(Uint8Array.of(5));
        abort.abort(reason);
        await rejected;
        assert.equal(f.client.getCircuitState(null, "account-a").failureCount, 0);
      } else if (first === "eof") {
        const pending = reader.read();
        inputs[0].controller.close();
        assert.equal((await promptly(pending)).done, true);
        abort.abort();
      } else {
        const rejected = assert.rejects(promptly(reader.read()), {
          message: "wreq-js response body failed",
        });
        inputs[0].controller.error(new Error("secret upstream details"));
        await rejected;
        abort.abort();
      }
      await tick();
      assert.deepEqual(f.counts(), [1], "only the terminating body's lease is released");
      assert.equal(
        inputs[0].reasons.length,
        ["abort", "cancel", "chunk-pending"].includes(first) ? 1 : 0
      );
      assert.equal(inputs[1].reasons.length, 0);
      assert.equal(getEventListeners(abort.signal, "abort").length, 0);
      await assert.rejects(
        f.client.fetch("https://synthetic.test/blocked", {
          proxy: null,
          sessionScope: "account-b",
        }),
        { code: "TLS_SESSION_CAPACITY" }
      );
      inputs[1].controller.enqueue(Uint8Array.of(9));
      inputs[1].controller.close();
      assert.deepEqual((await promptly(siblingReader.read())).value, Uint8Array.of(9));
      assert.equal((await promptly(siblingReader.read())).done, true);
      assert.deepEqual(f.counts(), []);
      assert.equal(inputs[1].body.locked, false);
    });
  }
}

test("bodyless native error responses preserve status zero without a body lease", async (t) => {
  const f = fixture(t, () => Response.error());
  const abort = new AbortController();
  const response = await f.fetch(abort.signal);
  assert.equal(response.status, 0);
  assert.equal(response.statusText, "");
  assert.equal(response.type, "error");
  assert.equal(response.body, null);
  assert.deepEqual(f.counts(), []);
  assert.equal(getEventListeners(abort.signal, "abort").length, 0);
  assert.equal(f.client.getCircuitState(null, "account-a").failureCount, 0);
});

const abortCases = [
  {
    label: "timeout",
    reason: () => new DOMException("deadline expired", "TimeoutError"),
    dom: true,
    message: "deadline expired",
  },
  {
    label: "empty timeout",
    reason: () => new DOMException("", "TimeoutError"),
    dom: true,
    message: "The operation was aborted",
  },
  {
    label: "custom Error",
    reason: () => new TypeError("caller stopped"),
    dom: false,
    message: "caller stopped",
  },
  { label: "string", reason: () => "caller stopped", dom: true, message: "caller stopped" },
  { label: "empty string", reason: () => "", dom: true, message: "" },
  { label: "default", reason: () => undefined, dom: true, preserve: true },
  {
    label: "AbortError",
    reason: () => new DOMException("already normalized", "AbortError"),
    dom: true,
    message: "already normalized",
    preserve: true,
  },
];

for (const native of [false, true]) {
  for (const scenario of abortCases) {
    for (const timing of ["before fetch", "at headers", "during read"]) {
      test(`${native ? "native Response" : "WreqResponse"}: ${scenario.label} abort ${timing} uses the wreq error shape`, async (t) => {
        const input = source();
        const abort = new AbortController();
        const reason = scenario.reason();
        const f = fixture(t, () => {
          if (timing === "at headers") abort.abort(reason);
          return upstream(input.body, native);
        });
        const verify = (error: unknown) => {
          assert.ok(error instanceof Error);
          assert.equal(error.name, "AbortError");
          assert.equal(error instanceof DOMException, scenario.dom);
          if (scenario.message !== undefined) assert.equal(error.message, scenario.message);
          if (scenario.preserve) assert.equal(error, abort.signal.reason);
          else assert.notEqual(error, reason);
          assert.equal(error.cause, scenario.dom ? undefined : reason);
          return true;
        };
        if (timing === "before fetch") {
          abort.abort(reason);
          await assert.rejects(f.fetch(abort.signal), verify);
          assert.equal(input.reasons.length, 0);
        } else {
          const response = await f.fetch(abort.signal);
          const pending = f.read(response).read();
          const rejected = assert.rejects(promptly(pending), verify);
          if (timing === "during read") abort.abort(reason);
          await rejected;
          await tick();
          assert.equal(input.reasons.length, 1);
          verify(input.reasons[0]);
          assert.equal(input.body.locked, false);
        }
        assert.deepEqual(f.counts(), []);
        assert.equal(getEventListeners(abort.signal, "abort").length, 0);
        assert.equal(f.client.getCircuitState(null, "account-a").failureCount, 0);
      });
    }
  }

  test(`${native ? "native Response" : "WreqResponse"}: timeout during rejected consumer cancellation is normalized`, async (t) => {
    const abort = new AbortController();
    const input = source(() => {
      abort.abort(new DOMException("deadline expired", "TimeoutError"));
      throw new Error("secret cancellation failure");
    });
    const f = fixture(t, () => upstream(input.body, native));
    const response = await f.fetch(abort.signal);
    await assert.rejects(response.body!.cancel("consumer stopped"), (error) => {
      assert.ok(error instanceof DOMException);
      assert.equal(error.name, "AbortError");
      assert.equal(error.message, "deadline expired");
      return true;
    });
    assert.deepEqual(input.reasons, ["consumer stopped"]);
    assert.deepEqual(f.counts(), []);
    assert.equal(input.body.locked, false);
    assert.equal(getEventListeners(abort.signal, "abort").length, 0);
    assert.equal(f.client.getCircuitState(null, "account-a").failureCount, 0);
  });
}
