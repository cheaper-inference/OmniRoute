// Fake `mcode exec` used by the MiniMax Code executor tests.
// It mimics the CLI's `--output-format stream-json` output and answers with
// the prompt it receives on stdin.
import { createInterface } from "node:readline";

const lines = [];
for await (const line of createInterface({ input: process.stdin })) {
  lines.push(line);
}
const prompt = lines.join("\n");

const answer = prompt.includes("stream")
  ? "fake minimax code stream response"
  : "fake minimax code response";

const events = [
  { schemaVersion: 1, type: "exec.started", runId: "exec_fake" },
  {
    schemaVersion: 1,
    type: "item.started",
    item: { id: "msg-1", type: "agent_message", contentDelta: answer.slice(0, 12) },
  },
  {
    schemaVersion: 1,
    type: "item.updated",
    item: { id: "msg-1", type: "agent_message", contentDelta: answer.slice(12) },
  },
  {
    schemaVersion: 1,
    type: "item.completed",
    item: { id: "msg-1", type: "agent_message", content: answer },
  },
  {
    schemaVersion: 1,
    type: "turn.completed",
    usage: { inputTokens: 11, outputTokens: 7, totalTokens: 18 },
  },
  {
    schemaVersion: 1,
    type: "exec.completed",
    result: {
      status: "succeeded",
      output: answer,
      usage: { inputTokens: 11, outputTokens: 7, totalTokens: 18 },
    },
  },
];

process.stdout.write(events.map((event) => JSON.stringify(event)).join("\n") + "\n");
