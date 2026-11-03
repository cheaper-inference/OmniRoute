// Characterization tests — guardrail pipeline WIRING (plan item V3-1, before the v4 module
// extraction). Companion of tests/unit/guardrail-pipeline-characterization.test.ts, which
// pins the behavior of the pieces; this file pins where they are plugged in.
//
// Approach: STATIC SOURCE ASSERTIONS. Driving handleChat / handleChatCore end to end needs the
// full provider/executor/DB stack, so behavioral coverage of "which routes hit the hooks" and
// "what runs before/after post-call" is impractical and brittle. Instead this file:
//   3. scans every non-test source file under src/, open-sse/, bin/ and electron/ for callers
//      of runPreCallHooks / runPostCallHooks and for importers of the chat handler, and pins
//      the exact sets — so a new caller or a new chat-family route fails here on purpose;
//   4. asserts the textual order of the post-call block in nonStreamingResponse.ts (memory
//      extraction → tool execution → post-call → block exit → semantic-cache store);
//   5. asserts the self-loop plumbing (undici fetch in the vision bridge, the proxyFetch stamp).
// When a refactor legitimately moves a call, update the expected set/order here in the same PR
// and say why — that is the point of a characterization test.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const SOURCE_EXT = /\.(ts|tsx|mts|js|mjs|cjs)$/;
const TEST_FILE = /\.(test|spec)\.[cm]?[jt]sx?$/;

function walk(relDir: string, out: string[] = []): string[] {
  const abs = path.join(ROOT, relDir);
  if (!fs.existsSync(abs)) return out;
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const rel = path.posix.join(relDir, entry.name);
    if (entry.isDirectory()) walk(rel, out);
    else if (SOURCE_EXT.test(entry.name) && !TEST_FILE.test(entry.name)) out.push(rel);
  }
  return out;
}

const SOURCE_FILES = ["src", "open-sse", "bin", "electron"].flatMap((dir) => walk(dir));

function filesMatching(pattern: RegExp) {
  return SOURCE_FILES.filter((file) => pattern.test(read(file))).sort();
}

function indexOrFail(source: string, needle: string, from = 0) {
  const index = source.indexOf(needle, from);
  assert.notEqual(index, -1, `expected to find \`${needle}\``);
  return index;
}

// ─── 3. Coverage: who reaches the hooks ──────────────────────────────────────

test("runPreCallHooks has exactly two production callers: the chat handler and the guardrail test API", () => {
  assert.deepEqual(filesMatching(/\.runPreCallHooks\s*\(/), [
    "src/app/api/guardrails/test/route.ts",
    "src/sse/handlers/chat.ts",
  ]);
  // The chat handler calls it once.
  assert.equal(read("src/sse/handlers/chat.ts").match(/\.runPreCallHooks\s*\(/g)?.length, 1);
});

test("runPostCallHooks has exactly one production caller: the non-streaming response leaf", () => {
  assert.deepEqual(filesMatching(/\.runPostCallHooks\s*\(/), [
    "open-sse/handlers/chatCore/nonStreamingResponse.ts",
  ]);
  for (const streamingLeaf of [
    "open-sse/handlers/chatCore/streamingResponse.ts",
    "open-sse/handlers/chatCore/streamingPipeline.ts",
    "open-sse/handlers/chatCore/streamingTail.ts",
  ]) {
    assert.doesNotMatch(read(streamingLeaf), /guardrailRegistry|runPostCallHooks/);
  }
});

test("the chat handler is imported by exactly these modules (the chat-family routes + Telegram)", () => {
  assert.deepEqual(filesMatching(/from\s+["'](?:@\/|(?:\.\.\/)+)sse\/handlers\/chat["']/), [
    "src/app/api/v1/antigravity/route.ts",
    "src/app/api/v1/api/chat/route.ts",
    "src/app/api/v1/chat/completions/route.ts",
    "src/app/api/v1/completions/route.ts",
    "src/app/api/v1/messages/route.ts",
    "src/app/api/v1/providers/[provider]/chat/completions/route.ts",
    "src/app/api/v1/relay/chat/completions/route.ts",
    "src/app/api/v1/responses/[...path]/route.ts",
    "src/app/api/v1/responses/route.ts",
    "src/app/api/v1beta/models/[...path]/route.ts",
    "src/lib/telegram/chatProxy.ts",
  ]);
});

test("image, embeddings and audio routes never reach the guardrail registry", () => {
  const routes = SOURCE_FILES.filter((file) =>
    /^src\/app\/api\/v1\/(images|embeddings|audio)\/.*route\.ts$/.test(file)
  );
  assert.ok(routes.length >= 6, `expected the image/embeddings/audio routes, got ${routes}`);
  for (const route of routes) {
    const source = read(route);
    assert.ok(!/sse\/handlers\/chat["']/.test(source), `${route} imports the chat handler`);
    assert.ok(!/lib\/guardrails/.test(source), `${route} imports the guardrail registry`);
  }
  // The only injection check those routes get is the legacy middleware facade (prompt
  // injection only; see the disable-channel characterization in the behavioral file).
  for (const route of [
    "src/app/api/v1/embeddings/route.ts",
    "src/app/api/v1/images/generations/route.ts",
    "src/app/api/v1/images/edits/route.ts",
    "src/app/api/v1/audio/speech/route.ts",
  ]) {
    assert.ok(/(?:withInjectionGuard|createInjectionGuard)\(/.test(read(route)), route);
  }
});

test("chat.ts feeds the pre-call pass all disable channels and maps a block to HTTP 400", () => {
  const chat = read("src/sse/handlers/chat.ts");
  const call = indexOrFail(chat, "guardrailRegistry.runPreCallHooks(body, {");
  const window = chat.slice(call, call + 1500);
  assert.match(
    window,
    /resolveDisabledGuardrails\(\{\s*apiKeyInfo:[^}]*body,\s*headers: request\.headers,\s*\}\)/
  );
  assert.match(window, /stream: body\?\.stream === true/);
  assert.match(window, /if \(preCallGuardrails\.blocked\)[\s\S]*HTTP_STATUS\.BAD_REQUEST/);
  // The guarded payload replaces the request body for everything downstream.
  assert.match(window, /body = preCallGuardrails\.payload;/);
});

test("post-call runs only on the non-streaming branch of handleChatCore", () => {
  const core = read("open-sse/handlers/chatCore.ts");
  const streamBranch = indexOrFail(
    core,
    "if (stream) {\n    const streamingOutcome = await runStreamingResponse("
  );
  const nonStreamBranch = indexOrFail(
    core,
    "if (!stream) {\n    const nonStreamingOutcome = await runNonStreamingResponse("
  );
  assert.ok(streamBranch < nonStreamBranch);
  assert.equal(core.match(/runNonStreamingResponse\(/g)?.length, 1);
});

// ─── 4. Ordering inside nonStreamingResponse.ts ──────────────────────────────

test("non-streaming order: memory extraction → tool execution → post-call → block exit → cache store", () => {
  const leaf = read("open-sse/handlers/chatCore/nonStreamingResponse.ts");
  const memory = indexOrFail(leaf, "runMemoryExtractionGate({");
  const tools = indexOrFail(leaf, "translatedResponse = await handleToolCallExecution(", memory);
  const context = indexOrFail(leaf, "buildPostCallGuardrailContext({", tools);
  const postCall = indexOrFail(leaf, "guardrailRegistry.runPostCallHooks(", context);
  const apply = indexOrFail(leaf, "translatedResponse = postCallGuardrails.response;", postCall);
  const blocked = indexOrFail(leaf, "if (postCallGuardrails.blocked) {", apply);
  const blockedExit = indexOrFail(
    leaf,
    "response: createErrorResult(HTTP_STATUS.BAD_REQUEST, guardrailMessage)",
    blocked
  );
  const cacheStore = indexOrFail(leaf, "storeSemanticCacheResponse({", blockedExit);
  const idempotency = indexOrFail(leaf, "await saveIdempotency(", cacheStore);
  assert.ok(memory < tools && tools < postCall && postCall < blocked);
  assert.ok(blocked < blockedExit && blockedExit < cacheStore && cacheStore < idempotency);
  // Each anchor appears once, so the order above is unambiguous.
  for (const anchor of [
    "runMemoryExtractionGate({",
    "guardrailRegistry.runPostCallHooks(",
    "storeSemanticCacheResponse({",
  ]) {
    assert.equal(leaf.split(anchor).length - 1, 1, anchor);
  }
  // characterization: memory extraction and tool execution see the response BEFORE the
  // post-call guardrails, so a response later blocked (or rewritten) by a post-call
  // guardrail has already been offered to memory extraction / built-in tool execution.
});

test("the post-call verdict is applied to what is cached, and the cache write is keyed per API key", () => {
  const leaf = read("open-sse/handlers/chatCore/nonStreamingResponse.ts");
  const store = indexOrFail(leaf, "storeSemanticCacheResponse({");
  const call = leaf.slice(store, indexOrFail(leaf, "});", store));
  assert.match(call, /translatedResponse,/);
  assert.match(call, /apiKeyId: apiKeyInfo\?\.id \?\? undefined,/);
  assert.match(call, /provider,/);
});

// ─── 5. Self-loop plumbing ───────────────────────────────────────────────────

test("proxyFetch stamps the self-hop header before any dispatch decision", () => {
  const proxyFetch = read("open-sse/utils/proxyFetch.ts");
  const fn = indexOrFail(proxyFetch, "async function patchedFetchUnrecorded(");
  const stamp = indexOrFail(proxyFetch, "stampOwnListenerSelfHop(input, options);", fn);
  const direct = indexOrFail(
    proxyFetch,
    "if (proxyContext.getStore() === DIRECT_PROXY_CONTEXT)",
    fn
  );
  assert.ok(stamp < direct);
});

test("characterization: the vision-bridge describe call uses undici fetch, bypassing the self-hop stamp", () => {
  // VisionBridgeGuardrail injects `undiciFetch` as fetchImpl, so the describe self-call never
  // passes through proxyFetch.patchedFetchUnrecorded and carries no x-omniroute-self-hop
  // header; admission instead relies on x-omniroute-admission-bypass + the self-loop bearer
  // (pinned behaviorally in guardrail-pipeline-characterization.test.ts).
  const bridge = read("src/lib/guardrails/visionBridge.ts");
  assert.match(bridge, /import \{ fetch as undiciFetch \} from "undici";/);
  const describe = indexOrFail(bridge, "const describeConfig = {");
  assert.match(
    bridge.slice(describe, describe + 200),
    /fetchImpl: undiciFetch as unknown as typeof fetch,/
  );
  const helpers = read("src/lib/guardrails/visionBridgeHelpers.ts");
  assert.doesNotMatch(helpers, /self-hop|selfHop/);
  assert.match(helpers, /headers\["x-omniroute-disabled-guardrails"\] = routeThroughOmniRoute/);
});
