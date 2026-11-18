import test from "node:test";
import assert from "node:assert/strict";

// #17858: the shared chatCore leaf that turns the search-provider chat rejection into the typed
// 400 error result for every handleChatCore entry point, and rethrows everything else.

const { resolveChatExecutor } =
  await import("../../open-sse/handlers/chatCore/searchProviderRejection.ts");
const { SearchProviderChatError } = await import("../../open-sse/utils/searchProviderChatError.ts");
const { getExecutor } = await import("../../open-sse/executors/index.ts");

test("passes the resolved executor through untouched", async () => {
  const executor = { name: "native" };
  const resolution = await resolveChatExecutor(async () => executor, "openai");
  assert.equal(resolution.executor, executor);
  assert.equal(resolution.rejected, null);
});

test("converts SearchProviderChatError into the typed 400 error result", async () => {
  const warnings: unknown[][] = [];
  const resolution = await resolveChatExecutor(
    async (provider: string) => {
      throw new SearchProviderChatError(provider);
    },
    "anysearch-search",
    { warn: (...args: unknown[]) => warnings.push(args) }
  );

  assert.equal(resolution.executor, null);
  const rejected = resolution.rejected!;
  assert.equal(rejected.success, false);
  assert.equal(rejected.status, 400);
  assert.equal(rejected.response.status, 400);
  const body = await rejected.response.json();
  assert.equal(body.error.code, "search_provider_not_chat");
  assert.equal(body.error.type, "invalid_request_error");
  assert.match(body.error.message, /anysearch-search/);
  assert.match(body.error.message, /use POST \/v1\/search instead\./);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0][0], "EXECUTOR");
});

test("converts the real getExecutor guard for a search-only provider", async () => {
  const resolution = await resolveChatExecutor(getExecutor, "anysearch-search");
  assert.equal(resolution.executor, null);
  assert.equal(resolution.rejected?.status, 400);
  const body = await resolution.rejected!.response.json();
  assert.equal(body.error.code, "search_provider_not_chat");
});

test("rethrows any other executor-resolution error unchanged", async () => {
  const boom = Object.assign(new Error("provider retired"), { status: 410 });
  await assert.rejects(
    resolveChatExecutor(async () => {
      throw boom;
    }, "retired-provider"),
    (error: unknown) => error === boom
  );
});
