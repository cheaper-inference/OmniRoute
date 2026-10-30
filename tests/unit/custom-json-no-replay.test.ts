// Custom JSON API nodes call business endpoints whose request may already have taken
// effect: their response — success, error or empty — must never be replayed on another
// combo target (open-sse/services/combo/noReplayLatch.ts) nor on another account
// (src/sse/handlers/chat.ts). Running the full chat.ts handler is too heavy here, so the
// account-fallback side is covered through its seams plus a source-level wiring guard.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";
import type { HandleComboChatOptions } from "../../open-sse/services/combo/types.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-json-no-replay-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "custom-json-no-replay-offline-test-only";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
mock.method(globalThis, "fetch", async () => {
  throw new Error("Unexpected network call in offline no-replay tests");
});

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { isNoReplayResponse, markNoReplayResponse } =
  await import("../../open-sse/utils/noReplayResponse.ts");
const { inheritResponsePolicies, markCustomJsonNoReplay } =
  await import("../../src/sse/handlers/chat/responsePolicies.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
let invocation = 0;

test.after(() => {
  mock.restoreAll();
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function completion(content: string, status = 200) {
  return Response.json(
    { choices: [{ message: { role: "assistant", content }, finish_reason: "stop" }] },
    { status }
  );
}

function comboOptions(
  handleSingleModel: HandleComboChatOptions["handleSingleModel"],
  strategy = "priority"
): HandleComboChatOptions {
  invocation += 1;
  return {
    invocationId: `custom-json-no-replay-${invocation}`,
    body: { messages: [{ role: "user", content: "offline test" }] },
    combo: {
      name: `custom-json-no-replay-${invocation}`,
      strategy,
      models: ["business/a", "openai/gpt-4o-mini"],
      config: { maxRetries: 2, maxSetRetries: 2, retryDelayMs: 0, setRetryDelayMs: 0 },
    },
    settings: {},
    allCombos: [],
    handleSingleModel,
    log,
  };
}

for (const [label, make] of [
  ["503 error", () => completion("", 503)],
  ["502 error", () => completion("", 502)],
  ["429 error", () => completion("", 429)],
  ["empty 200 reply", () => completion("")],
] as const) {
  test(`combo never replays a custom JSON ${label} on the next target`, async () => {
    const calls: string[] = [];
    const response = await handleComboChat(
      comboOptions(async (_body, model) => {
        calls.push(model);
        return model === "business/a"
          ? markNoReplayResponse(make())
          : completion("from the fallback target");
      })
    );
    assert.deepEqual(calls, ["business/a"], "the second target must not be dispatched");
    const original = make();
    assert.equal(response.status, original.status);
    assert.equal(await response.text(), await original.text());
  });
}

test("a successful custom JSON reply is returned as-is", async () => {
  const calls: string[] = [];
  const response = await handleComboChat(
    comboOptions(async (_body, model) => {
      calls.push(model);
      return markNoReplayResponse(completion("business answer"));
    })
  );
  assert.deepEqual(calls, ["business/a"]);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /business answer/);
});

test("control: an unmarked 503 still falls back to the next combo target", async () => {
  const calls: string[] = [];
  const response = await handleComboChat(
    comboOptions(async (_body, model) => {
      calls.push(model);
      return model === "business/a" ? completion("", 503) : completion("from the fallback target");
    })
  );
  // Without the marker the combo retries the same target, then moves to the next one.
  assert.ok(calls.filter((model) => model === "business/a").length > 1);
  assert.equal(calls.at(-1), "openai/gpt-4o-mini");
  assert.match(await response.text(), /from the fallback target/);
});

test("markCustomJsonNoReplay marks only custom-json connections", () => {
  const custom = completion("x");
  const chat = completion("x");
  markCustomJsonNoReplay(custom, { apiType: "custom-json" });
  markCustomJsonNoReplay(chat, { apiType: "chat" });
  assert.equal(isNoReplayResponse(custom), true);
  assert.equal(isNoReplayResponse(chat), false);
});

test("the marker survives the response wrapping done in chat.ts", () => {
  const source = markNoReplayResponse(completion("x"));
  const wrapped = inheritResponsePolicies(source, new Response(source.body, source));
  assert.equal(isNoReplayResponse(wrapped), true);
  assert.equal(
    isNoReplayResponse(inheritResponsePolicies(completion("y"), completion("z"))),
    false
  );
});

test("chat.ts returns a no-replay failure before any account cooldown / fallback", () => {
  const src = fs.readFileSync(new URL("../../src/sse/handlers/chat.ts", import.meta.url), "utf8");
  const mark = src.indexOf("markCustomJsonNoReplay(result.response");
  const guard = src.indexOf("if (isNoReplayResponse(result.response))");
  const firstCooldown = src.indexOf("await markAccountUnavailable(", guard);
  assert.ok(mark > 0, "chat.ts must mark custom JSON responses right after dispatch");
  assert.ok(guard > mark, "chat.ts must check the no-replay marker after marking");
  assert.ok(firstCooldown > guard, "the no-replay return must precede account fallback");
  assert.equal(
    src.lastIndexOf("await markAccountUnavailable(", guard),
    src.lastIndexOf("await markAccountUnavailable(", mark),
    "no account cooldown may run between dispatch and the no-replay return"
  );
});
