import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-web-history-"));
process.env.DATA_DIR = directory;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { CodexExecutor } = await import("../../open-sse/executors/codex.ts");
const { sanitizeCodexResponsesInput, sanitizeResponsesInputItems } =
  await import("../../open-sse/services/responsesInputSanitizer.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type JsonRecord = Record<string, unknown>;
const executor = new CodexExecutor();
const actions = [
  { type: "search", query: "synthetic query", sources: ["web"] },
  { type: "open_page", url: "https://example.invalid/page" },
  { type: "find_in_page", url: "https://example.invalid/page", pattern: "needle" },
];
const item = (action?: unknown): JsonRecord => ({
  type: "web_search_call",
  id: "ws_history_fixture",
  status: "completed",
  encrypted_content: "synthetic-encrypted-history-do-not-decode",
  ...(action === undefined ? {} : { action }),
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

for (const native of [true, false]) {
  for (const mode of ["turn", "compact", "compaction-replay"]) {
    function transform(input: JsonRecord[]): JsonRecord[] {
      const body = {
        model: "fixture-codex",
        _nativeCodexPassthrough: native,
        input,
        tools: [],
        tool_choice: "none",
        ...(mode === "compaction-replay"
          ? { client_metadata: { "x-codex-turn-metadata": '{"request_kind":"compaction"}' } }
          : {}),
      };
      const before = structuredClone(body);
      const result = executor.transformRequest("fixture-codex", body, true, {
        requestEndpointPath: mode === "compact" ? "/responses/compact" : "/responses",
        providerSpecificData: {},
      });
      assert.deepEqual(body, before, "combo fallback caller must remain unchanged");
      return JSON.parse(JSON.stringify(result.input)) as JsonRecord[];
    }

    test(`unknown web-search action is omitted, not replaced: native=${native}, ${mode}`, () => {
      for (const action of [
        { type: "other" },
        { type: "future_action" },
        {},
        null,
        [],
        "other",
        1,
      ]) {
        const original = item(action);
        const result = transform([original]);
        assert.equal(result.length, 1, "keep the historical item");
        assert.equal(Object.hasOwn(result[0], "action"), false);
        assert.equal(result[0].type, original.type);
        assert.equal(result[0].status, original.status);
        assert.equal(result[0].encrypted_content, original.encrypted_content);
        if (mode === "compaction-replay") assert.equal(result[0].id, original.id);
      }
    });

    test(`known web-search actions and absent action survive: native=${native}, ${mode}`, () => {
      const input = [...actions.map(item), item()];
      const result = transform(input);
      assert.equal(result.length, 4);
      for (let index = 0; index < 3; index++) {
        assert.deepEqual(result[index].action, actions[index]);
        assert.equal(result[index].encrypted_content, input[index].encrypted_content);
      }
      assert.equal(Object.hasOwn(result[3], "action"), false);
    });

    test(`reasoning and message history are not lost: native=${native}, ${mode}`, () => {
      const reasoning = {
        type: "reasoning",
        id: "rs_history",
        encrypted_content: "synthetic",
        summary: [],
      };
      const message = {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "keep this message" }],
      };
      const result = transform([reasoning, item({ type: "other" }), message]);
      assert.equal(result.length, 3);
      assert.deepEqual(result[0], reasoning);
      assert.deepEqual(result[2], message);
      assert.equal(Object.hasOwn(result[1], "action"), false);
    });
  }
}

test("Codex sanitation clones the modified web item even with shared input objects", () => {
  const original = item({ type: "other" });
  const before = structuredClone(original);
  const body: JsonRecord = { input: [original] };
  sanitizeCodexResponsesInput(body, true);
  assert.deepEqual(original, before);
  assert.equal(Object.hasOwn((body.input as JsonRecord[])[0], "action"), false);
});

test("generic Responses sanitation does not acquire Codex-specific action policy", () => {
  const original = item({ type: "other" });
  const output = sanitizeResponsesInputItems([original], true, { preserveWebSearchCalls: true });
  assert.deepEqual(output, [original]);
});
