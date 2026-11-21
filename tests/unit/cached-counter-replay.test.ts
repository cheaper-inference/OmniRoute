import assert from "node:assert/strict";
import test from "node:test";
import { synthesizeResponsesSseFromObject as replay } from "../../open-sse/handlers/chatCore/responsesObjectToSse.ts";

for (const value of [undefined, null, 0, 12]) {
  test("terminal tool-call usage, cached_tokens " + String(value), () => {
    const details = { cache_creation_tokens: 17, ...(value === undefined ? {} : { cached_tokens: value }) };
    const input = { id: "resp_test", object: "response", status: "completed", usage: {input_tokens: 19, output_tokens: 2, total_tokens: 21, input_tokens_details: details}, output: [{id: "fc_test", type: "function_call", name: "probe", call_id: "one", arguments: "{}"}] };
    const original = structuredClone(input);
    const events = replay(input).split("\n").filter(l => l.startsWith("data: {")).map(l => JSON.parse(l.slice(6)));
    assert.deepEqual(events.map(e=>e.sequence_number), events.map((_,i)=>i));
    assert.equal(events.filter(e=>e.type==="response.function_call_arguments.done").length,1);
    assert.equal(events.at(-1).type,"response.completed");
    assert.deepEqual(events.at(-1).response,{...original,usage:{...original.usage,input_tokens_details:{...details,cached_tokens:value ?? 0}}});
    assert.deepEqual(input,original);
  });
}
