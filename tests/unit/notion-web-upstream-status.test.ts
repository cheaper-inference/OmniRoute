import test from "node:test";
import assert from "node:assert/strict";

// A received upstream refusal must publish its status on the capture sink so
// proxy health counts it as upstream instead of a transport failure.
const { NotionWebExecutor, __resetNotionThreadSessionsForTests } =
  await import("../../open-sse/executors/notion-web.ts");
const { runWithAppliedProxyCapture } = await import("../../open-sse/utils/proxyFetch.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/notionTlsClient.ts");
import type { AppliedProxySink } from "../../open-sse/utils/proxyFetch.ts";

// ─── Helpers ────────────────────────────────────────────────────────────────

const COOKIE_WITH_SPACE = "token_v2=xyz; space_id=space-1; notion_user_id=user-1";

function successNdjson(): string {
  return [
    JSON.stringify({ type: "patch-start", data: { s: [] } }),
    JSON.stringify({
      type: "record-map",
      recordMap: {
        thread_message: {
          m1: {
            value: {
              value: {
                step: {
                  type: "agent-inference",
                  value: [{ type: "text", content: "Hello there!" }],
                },
              },
            },
          },
        },
      },
    }),
  ].join("\n");
}

function bandErrorNdjson(): string {
  return JSON.stringify({
    type: "patch-start",
    data: {
      s: [
        {
          type: "error",
          message: "Something went wrong. Please try again later.",
          subType: "temporarily-unavailable",
          isRetryable: false,
        },
      ],
    },
    version: 1,
  });
}

function installTlsMock(
  handler: (url: string, call: number) => Promise<{ status: number; text: string } | never>
): () => void {
  let calls = 0;
  __setTlsFetchOverrideForTesting(async (url) => {
    calls += 1;
    const r = await handler(url, calls);
    return { status: r.status, headers: new Headers(), text: r.text, body: null };
  });
  return () => {
    __setTlsFetchOverrideForTesting(null);
    __resetNotionThreadSessionsForTests();
  };
}

function executeInput() {
  return {
    model: "notion-ai",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: COOKIE_WITH_SPACE },
    signal: null,
  };
}

// ─── Upstream status on refusals ────────────────────────────────────────────

test("rate-limited response records the upstream status on the sink", async () => {
  __resetNotionThreadSessionsForTests();
  const restore = installTlsMock(async () => ({ status: 429, text: "limited" }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new NotionWebExecutor().execute(executeInput() as never)
    );
    assert.equal(sink.upstreamStatus, 429);
    assert.equal(response.status, 429);
  } finally {
    restore();
  }
});

test("expired session records the upstream status on the sink", async () => {
  __resetNotionThreadSessionsForTests();
  const restore = installTlsMock(async () => ({ status: 401, text: "expired" }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new NotionWebExecutor().execute(executeInput() as never)
    );
    assert.equal(sink.upstreamStatus, 401);
    assert.equal(response.status, 401);
    const errBody = (await response.json()) as { error: { message: string } };
    assert.match(errBody.error.message, /session expired or invalid/i);
  } finally {
    restore();
  }
});

test("forbidden response records the upstream status on the sink", async () => {
  __resetNotionThreadSessionsForTests();
  const restore = installTlsMock(async () => ({ status: 403, text: "Forbidden" }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new NotionWebExecutor().execute(executeInput() as never)
    );
    assert.equal(sink.upstreamStatus, 403);
    assert.equal(response.status, 403);
    const errBody = (await response.json()) as { error: { message: string } };
    assert.match(errBody.error.message, /session expired or invalid/i);
  } finally {
    restore();
  }
});

test("other client refusal records the received status on the sink", async () => {
  __resetNotionThreadSessionsForTests();
  const restore = installTlsMock(async () => ({ status: 404, text: "not here" }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new NotionWebExecutor().execute(executeInput() as never)
    );
    assert.equal(sink.upstreamStatus, 404);
    assert.equal(response.status, 404);
    const errBody = (await response.json()) as { error: { message: string } };
    assert.match(errBody.error.message, /Notion error: not here/);
  } finally {
    restore();
  }
});

test("successful response leaves the sink untouched", async () => {
  __resetNotionThreadSessionsForTests();
  const restore = installTlsMock(async () => ({ status: 200, text: successNdjson() }));
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new NotionWebExecutor().execute(executeInput() as never)
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 200);
  } finally {
    restore();
  }
});

test("network failure leaves the sink untouched", async () => {
  __resetNotionThreadSessionsForTests();
  __setTlsFetchOverrideForTesting(async () => {
    throw new Error("connection reset");
  });
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new NotionWebExecutor().execute(executeInput() as never)
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 502);
  } finally {
    __setTlsFetchOverrideForTesting(null);
    __resetNotionThreadSessionsForTests();
  }
});

test("retried refusal followed by an in-band error leaves the sink untouched", async () => {
  __resetNotionThreadSessionsForTests();
  const restore = installTlsMock(async (_url, call) =>
    call === 1 ? { status: 429, text: "limited" } : { status: 200, text: bandErrorNdjson() }
  );
  const sink: AppliedProxySink = { proxy: null };
  try {
    const { response } = await runWithAppliedProxyCapture(sink, () =>
      new NotionWebExecutor().execute(executeInput() as never)
    );
    assert.equal(sink.upstreamStatus, undefined);
    assert.equal(response.status, 503);
  } finally {
    restore();
  }
});
