import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

process.env.APP_LOG_TO_FILE = "false";

const flag = "CLAUDE_NONSTREAM_EXTRA_USAGE_BACKGROUND_SYNC_ENABLED";
const h = await createChatPipelineHarness("nonstream-extra-usage-sync");
const providersDb = await import("../../src/lib/db/providers.ts");
const { stopSemanticCachePruneJob } = await import("../../src/lib/jobs/semanticCachePruneJob.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { closeSharedLoggerResource } = await import("../../src/shared/utils/loggerResource.ts");

test.after(async () => {
  stopSemanticCachePruneJob();
  await closeCallLogSaves();
  flushProxyLogsSync();
  await h.cleanup();
  await closeSharedLoggerResource();
});

for (const enabled of [true, false]) {
  test(`flag ${enabled ? "on" : "off"}: order of the Claude reply and extra-usage fetch`, async (t) => {
    t.after(() => {
      delete process.env[flag];
    });
    process.env[flag] = String(enabled);
    await h.resetStorage();
    await providersDb.createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: "extra-usage-sync",
      accessToken: `at-${crypto.randomUUID()}`,
      refreshToken: `rt-${crypto.randomUUID()}`,
      expiresAt: new Date(Date.now() + 3600_000).toISOString(),
      isActive: true,
      testStatus: "active",
      priority: 1,
      providerSpecificData: {},
    });

    const events: string[] = [];
    const usageGate = Promise.withResolvers<void>();
    const fetchFinished = Promise.withResolvers<void>();
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    globalThis.fetch = async (input) => {
      const url = String(input instanceof Request ? input.url : input);
      if (url.includes("anthropic.com/v1/messages")) {
        return Response.json({
          id: "msg_1",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-5-20250929",
          content: [{ type: "text", text: "hello" }],
          stop_reason: "end_turn",
          usage: { input_tokens: 3, output_tokens: 2 },
        });
      }
      if (url.includes("anthropic.com/api/oauth/usage")) {
        events.push("usage started");
        // Release a blocking implementation so the test can compare event order.
        watchdog = setTimeout(usageGate.resolve, 20_000);
        await usageGate.promise;
        events.push("usage completed");
        fetchFinished.resolve();
        return Response.json({});
      }
      return Response.json({}, { status: 404 });
    };

    try {
      const response = await h.handleChat(
        h.buildRequest({
          body: {
            model: "claude/claude-sonnet-4-5-20250929",
            stream: false,
            max_tokens: 16,
            messages: [{ role: "user", content: "hello" }],
          },
        })
      );
      assert.equal(response.status, 200, await response.text());
      events.push("client response");
      assert.ok(events.includes("usage started"), "the extra-usage sync still runs");
    } finally {
      clearTimeout(watchdog);
      usageGate.resolve();
      if (events.includes("usage started")) {
        await fetchFinished.promise;
        await new Promise<void>((resolve) => setImmediate(resolve));
      }
    }
    assert.deepEqual(
      events,
      enabled
        ? ["usage started", "client response", "usage completed"]
        : ["usage started", "usage completed", "client response"]
    );
  });
}
