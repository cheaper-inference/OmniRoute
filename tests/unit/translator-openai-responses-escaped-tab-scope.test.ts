import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function finalArgs(model: string, fragments: string[]): string {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  const events = [];
  const chunk = (delta, finish = null) => ({
    id: "c1",
    model,
    choices: [{ index: 0, delta, finish_reason: finish }],
  });
  fragments.forEach((args, i) => {
    const tc = {
      index: 0,
      ...(i === 0 ? { id: "call_1" } : {}),
      function: { ...(i === 0 ? { name: "f" } : {}), arguments: args },
    };
    events.push(...(openaiToOpenAIResponsesResponse(chunk({ tool_calls: [tc] }), state) || []));
  });
  events.push(...(openaiToOpenAIResponsesResponse(chunk({}, "tool_calls"), state) || []));
  events.push(
    ...(openaiToOpenAIResponsesResponse(
      { choices: [], usage: { prompt_tokens: 1, completion_tokens: 1 } },
      state
    ) || [])
  );
  const done = events.find((e) => e.event === "response.function_call_arguments.done");
  return JSON.parse(done.data.arguments).c;
}

// Every two-way split of the same arguments string.
function splits(raw: string): string[][] {
  const out: string[][] = [[raw]];
  for (let i = 1; i < raw.length; i++) out.push([raw.slice(0, i), raw.slice(i)]);
  return out;
}

test("a valid escaped backslash-t is kept for models that do not over-escape", () => {
  const raw = JSON.stringify({ c: "\\theta C:\\temp" });
  for (const frags of splits(raw)) {
    assert.equal(finalArgs("gpt-4o", frags), "\\theta C:\\temp", JSON.stringify(frags));
  }
});

test("gpt-5.6-luna over-escaped tabs are repaired the same way at every chunk split (#12831)", () => {
  const raw = '{"c":"+\\\\t} catch {\\n+\\\\t\\\\tx \\\\\\\\ y"}';
  for (const frags of splits(raw)) {
    assert.equal(
      finalArgs("gpt-5.6-luna-xhigh", frags),
      "+\t} catch {\n+\t\tx \\\\ y",
      JSON.stringify(frags)
    );
  }
});
