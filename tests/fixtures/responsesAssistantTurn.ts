/** Fresh input per run: the translator may normalize its request object. */
export function createResponsesAssistantTurnInput() {
  return {
    input: [
      {
        type: "reasoning",
        content: [{ type: "reasoning_text", text: "Inspect first" }],
      },
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "I will inspect" }],
      },
      { type: "function_call", call_id: "call_1", name: "read_file", arguments: "{}" },
      { type: "function_call", call_id: "call_2", name: "search", arguments: "{}" },
      { type: "function_call_output", call_id: "call_1", output: "contents" },
    ],
  };
}
