/**
 * One-off abort-path smoke: abort the executor stream mid-flight and confirm
 * it terminates cleanly (no hang, no unhandled rejection, CLI child killed).
 */
import { ClaudeAgentExecutor } from "../../open-sse/executors/claude-agent.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base/validationDispatch.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const executor = new ClaudeAgentExecutor();
const controller = new AbortController();
const input: ExecuteInput = {
  model: "claude-sonnet-5-5",
  body: {
    system: "Answer briefly.",
    messages: [{ role: "user", content: "Count from 1 to 50 out loud." }],
  },
  stream: true,
  credentials: {} as ProviderCredentials,
  signal: controller.signal,
  log: null,
};

const result = await executor.execute(input);
const response = result instanceof Response ? result : result.response;
console.log("status:", response.status);
const reader = response.body!.getReader();
const decoder = new TextDecoder();
let seen = 0;
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  seen += decoder.decode(value).length;
  if (seen > 200) {
    console.log("aborting after", seen, "bytes");
    controller.abort();
    break;
  }
}
try {
  await reader.read();
} catch {
  // stream cancelled
}
console.log("abort smoke done, bytes seen:", seen);
process.exit(0);
