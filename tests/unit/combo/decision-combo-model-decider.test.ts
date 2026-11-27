/**
 * Decision routing, step 6: the `combo-model` decider — one of the operator's own models,
 * called in process like the fusion judge (handleSingleModel). Combo refs are refused, the
 * call is non-streaming, tool-free, temperature 0 with a small max_tokens, bounded by the
 * timeout, and a depth guard stops a decision call from triggering another one.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  createComboModelDecider,
  isDecisionComboRef,
} from "../../../open-sse/services/decision/comboModelDecider.ts";
import { decisionDepth, runInDecisionScope } from "../../../open-sse/services/decision/scope.ts";
import { DECISION_MAX_OUTPUT_TOKENS } from "../../../open-sse/services/decision/wires.ts";

const request = {
  state: "write a sorting function",
  options: { cheap: "Model cheap", capable: "Model capable" },
};
const answerJson = (choice: string) =>
  JSON.stringify({ answers: { route: { choice, confidence: 0.8 } } });
const openAiResponse = (choice: string) =>
  Response.json({ model: "gpt-mini", choices: [{ message: { content: answerJson(choice) } }] });

type Dispatched = { body: Record<string, unknown>; model: string; target?: unknown };

function dispatcher(respond: () => Response | Promise<Response>) {
  const calls: Dispatched[] = [];
  const dispatch = async (body: Record<string, unknown>, model: string, target?: unknown) => {
    calls.push({ body, model, target });
    return respond();
  };
  return { calls, dispatch };
}

test("combo refs are recognized: auto/*, bare names and the configured combos", () => {
  const combos = [{ name: "my-combo" }, { name: "team/router" }];
  assert.equal(isDecisionComboRef("auto", combos), true);
  assert.equal(isDecisionComboRef("auto/best-coding", combos), true);
  assert.equal(isDecisionComboRef("my-combo", combos), true);
  assert.equal(isDecisionComboRef("team/router", { combos }), true);
  assert.equal(isDecisionComboRef("bare-model-name", null), true, "no provider prefix");
  assert.equal(isDecisionComboRef("openai/gpt-4o-mini", combos), false);
});

test("a combo ref or a missing model/dispatcher never dispatches", async () => {
  const { calls, dispatch } = dispatcher(() => openAiResponse("cheap"));
  const ref = await createComboModelDecider({
    model: "auto/best-coding",
    dispatch,
    allCombos: [],
  })(request);
  assert.equal(!ref.ok && ref.reason, "recursion");
  const noModel = await createComboModelDecider({ dispatch, allCombos: [] })(request);
  assert.equal(!noModel.ok && noModel.reason, "not_configured");
  const noDispatch = await createComboModelDecider({ model: "openai/gpt-4o-mini" })(request);
  assert.equal(!noDispatch.ok && noDispatch.reason, "not_configured");
  assert.equal(calls.length, 0);
});

test("dispatches a non-streaming, tool-free, temperature-0 call with only the state", async () => {
  const { calls, dispatch } = dispatcher(() => openAiResponse("capable"));
  const decide = createComboModelDecider({
    model: "openai/gpt-4o-mini",
    dispatch,
    allCombos: [],
    clientBody: {
      model: "my-combo",
      system: "SECRET CLAUDE SYSTEM",
      tools: [{ name: "run" }],
      stream: true,
      messages: [{ role: "user", content: "write a sorting function" }],
    },
  });
  const result = await decide(request);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].model, "openai/gpt-4o-mini");
  const body = calls[0].body as Record<string, unknown> & {
    messages: Array<{ role: string; content: string }>;
  };
  assert.equal(body.model, "openai/gpt-4o-mini");
  assert.equal(body.stream, false);
  assert.equal(body.temperature, 0);
  assert.equal(body.max_tokens, DECISION_MAX_OUTPUT_TOKENS);
  assert.equal(body.tools, undefined);
  assert.equal(body.system, undefined);
  assert.equal(body.messages.length, 1);
  assert.equal(body.messages[0].role, "user");
  assert.match(body.messages[0].content, /write a sorting function/);
  assert.doesNotMatch(JSON.stringify(body), /SECRET/);
  assert.ok((calls[0].target as { modelAbortSignal?: unknown })?.modelAbortSignal);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.choice, "capable");
  assert.equal(result.confidence, 0.8);
});

test("a Responses client gets an `input` body, a Gemini client a `contents` body", async () => {
  const responses = dispatcher(() => openAiResponse("cheap"));
  await createComboModelDecider({
    model: "openai/gpt-4o-mini",
    dispatch: responses.dispatch,
    allCombos: [],
    clientBody: { input: "hi", instructions: "SECRET" },
  })(request);
  const responsesBody = responses.calls[0].body;
  assert.ok(Array.isArray(responsesBody.input));
  assert.equal(responsesBody.instructions, undefined);
  assert.equal(responsesBody.max_output_tokens, DECISION_MAX_OUTPUT_TOKENS);

  const gemini = dispatcher(() =>
    Response.json({ candidates: [{ content: { parts: [{ text: answerJson("cheap") }] } }] })
  );
  const result = await createComboModelDecider({
    model: "gemini/gemini-2.5-flash",
    dispatch: gemini.dispatch,
    allCombos: [],
    clientBody: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
  })(request);
  assert.ok(Array.isArray(gemini.calls[0].body.contents));
  assert.equal(result.ok && result.choice, "cheap");
});

test("the depth guard refuses a decision started inside another decision", async () => {
  const { calls, dispatch } = dispatcher(() => openAiResponse("cheap"));
  const decide = createComboModelDecider({
    model: "openai/gpt-4o-mini",
    dispatch,
    allCombos: [],
  });
  assert.equal(decisionDepth(), 0);
  const nested = await runInDecisionScope(async () => {
    assert.equal(decisionDepth(), 1);
    return decide(request);
  });
  assert.equal(!nested.ok && nested.reason, "recursion");
  assert.equal(calls.length, 0);
});

test("the in-process call runs inside the decision scope", async () => {
  let depthSeen = -1;
  const decide = createComboModelDecider({
    model: "openai/gpt-4o-mini",
    allCombos: [],
    dispatch: async () => {
      depthSeen = decisionDepth();
      return openAiResponse("cheap");
    },
  });
  await decide(request);
  assert.equal(depthSeen, 1);
});

test("HTTP errors, timeouts and out-of-menu answers are failures", async () => {
  const failed = await createComboModelDecider({
    model: "openai/gpt-4o-mini",
    allCombos: [],
    dispatch: async () => new Response("SECRET upstream body", { status: 502 }),
  })(request);
  assert.equal(!failed.ok && failed.reason, "http_error");
  assert.equal(!failed.ok && failed.status, 502);

  let aborted = false;
  const slow = await createComboModelDecider({
    model: "openai/gpt-4o-mini",
    allCombos: [],
    timeoutMs: 100,
    dispatch: (_body, _model, target) =>
      new Promise((resolve) => {
        const signal = (target as { modelAbortSignal: AbortSignal }).modelAbortSignal;
        signal.addEventListener("abort", () => {
          aborted = true;
          resolve(new Response("late", { status: 499 }));
        });
      }),
  })(request);
  assert.equal(!slow.ok && slow.reason, "timeout");
  assert.equal(aborted, true);

  const outside = await createComboModelDecider({
    model: "openai/gpt-4o-mini",
    allCombos: [],
    dispatch: async () => openAiResponse("not-in-menu"),
  })(request);
  assert.equal(!outside.ok && outside.reason, "out_of_menu");
});
