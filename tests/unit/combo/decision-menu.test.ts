/**
 * Decision routing, step 1: shared types, the choice menu and the user-text extractor.
 * Only the last user message travels to a decider: never the system prompt, tools,
 * assistant turns or Responses `instructions`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  DECIDER_KINDS,
  DECISION_FAILURE_REASONS,
  DECISION_MODEL_REQUEST_HEADER,
  isDecisionModelRequest,
} from "../../../open-sse/services/decision/types.ts";
import {
  MAX_DECISION_MENU_ITEMS,
  MAX_DECISION_STATE_CHARS,
  buildDecisionMenu,
  describeDecisionMenu,
  extractDecisionUserText,
} from "../../../open-sse/services/decision/menu.ts";

test("decider kinds and failure reasons are the documented closed sets", () => {
  assert.deepEqual([...DECIDER_KINDS], ["systemone", "http", "combo-model"]);
  for (const reason of [
    "disabled",
    "not_configured",
    "missing_credential",
    "timeout",
    "http_error",
    "invalid_response",
    "out_of_menu",
    "refused",
    "cooldown",
    "network_error",
  ]) {
    assert.ok(DECISION_FAILURE_REASONS.includes(reason as never), `missing reason ${reason}`);
  }
});

test("extracts the last user message from chat messages (string and text parts)", () => {
  assert.equal(
    extractDecisionUserText({
      messages: [
        { role: "system", content: "SECRET SYSTEM PROMPT" },
        { role: "user", content: "first question" },
        { role: "assistant", content: "assistant answer" },
        {
          role: "user",
          content: [
            { type: "text", text: "explain" },
            { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
            { type: "input_text", text: "this code" },
          ],
        },
      ],
    }),
    "explain\nthis code"
  );
});

test("never sends the Claude top-level system prompt or tool results", () => {
  const text = extractDecisionUserText({
    system: [{ type: "text", text: "SECRET CLAUDE SYSTEM" }],
    tools: [{ name: "run_shell" }],
    messages: [
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "t1", content: "SECRET TOOL OUTPUT" },
          { type: "text", text: "summarize the diff" },
        ],
      },
    ],
  });
  assert.equal(text, "summarize the diff");
});

test("reads Responses `input` (string or message items) and ignores `instructions`", () => {
  assert.equal(
    extractDecisionUserText({ instructions: "SECRET", input: "  route me  " }),
    "route me"
  );
  assert.equal(
    extractDecisionUserText({
      instructions: "SECRET",
      input: [
        { role: "user", content: [{ type: "input_text", text: "old" }] },
        { type: "message", role: "assistant", content: [{ type: "output_text", text: "x" }] },
        { type: "message", role: "user", content: [{ type: "input_text", text: "newest" }] },
        { type: "function_call_output", call_id: "c", output: "SECRET OUTPUT" },
      ],
    }),
    "newest"
  );
});

test("caps the extracted text and returns null when no user text exists", () => {
  const long = "x".repeat(MAX_DECISION_STATE_CHARS + 100);
  assert.equal(
    extractDecisionUserText({ messages: [{ role: "user", content: long }] })?.length,
    MAX_DECISION_STATE_CHARS
  );
  assert.equal(extractDecisionUserText({ messages: [{ role: "system", content: "s" }] }), null);
  assert.equal(extractDecisionUserText({ messages: [{ role: "user", content: "   " }] }), null);
  assert.equal(extractDecisionUserText(null), null);
  assert.equal(extractDecisionUserText({ input: [] }), null);
});

test("menu keeps unique pool models in pool order, capped at the menu size", () => {
  const pool = [
    { model: "cheap" },
    { model: "capable" },
    { model: "cheap" },
    ...Array.from({ length: MAX_DECISION_MENU_ITEMS + 5 }, (_, i) => ({ model: `m${i}` })),
  ];
  const menu = buildDecisionMenu(pool);
  assert.equal(menu.length, MAX_DECISION_MENU_ITEMS);
  assert.deepEqual(menu.slice(0, 3), ["cheap", "capable", "m0"]);
});

test("menu descriptions: operator text wins (by id, then provider/model), else cost rank", () => {
  const candidates = [
    { provider: "p", model: "cheap", costPer1MTokens: 1 },
    { provider: "q", model: "capable", costPer1MTokens: 10 },
    { provider: "r", model: "free", costPer1MTokens: Number.NaN },
  ];
  const described = describeDecisionMenu(["cheap", "capable", "free"], candidates, {
    "q/capable": "Best for hard reasoning",
  });
  assert.equal(described.capable, "Best for hard reasoning");
  assert.match(described.cheap, /cost rank 1 of 2/);
  assert.equal(described.free, "Model free");
  const flat = describeDecisionMenu(["cheap"], [candidates[0]], undefined);
  assert.equal(flat.cheap, "Model cheap");
});

test("the anti-recursion header is read from Headers and plain records", () => {
  assert.equal(DECISION_MODEL_REQUEST_HEADER, "x-omniroute-decision-model");
  assert.equal(isDecisionModelRequest(new Headers({ "x-omniroute-decision-model": "1" })), true);
  assert.equal(isDecisionModelRequest(new Headers({ "x-omniroute-decision-model": "0" })), false);
  assert.equal(isDecisionModelRequest({ "X-OmniRoute-Decision-Model": "1" }), true);
  assert.equal(isDecisionModelRequest({ "content-type": "application/json" }), false);
  assert.equal(isDecisionModelRequest(null), false);
});

test("an upstream model name only reaches the log when it looks like a model id", async () => {
  const { toLoggableModelName } = await import("../../../open-sse/services/decision/types.ts");
  assert.equal(toLoggableModelName("jev-1.13.0"), "jev-1.13.0");
  assert.equal(toLoggableModelName("openai/gpt-4o-mini:latest"), "openai/gpt-4o-mini:latest");
  assert.equal(toLoggableModelName("ignore this: the user's prompt was"), undefined);
  assert.equal(toLoggableModelName("x".repeat(101)), undefined);
  assert.equal(toLoggableModelName(42), undefined);
});
