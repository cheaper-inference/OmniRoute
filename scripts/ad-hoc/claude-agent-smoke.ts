/**
 * One-off smoke test for the claude-agent executor: exercises a real
 * sdk.query() against the vendored Claude Code CLI (host login required).
 *
 *   node --import tsx/esm scripts/ad-hoc/claude-agent-smoke.ts
 */
import { ClaudeAgentExecutor } from "../../open-sse/executors/claude-agent.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base/validationDispatch.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const executor = new ClaudeAgentExecutor();

const body = {
  system: "Answer in one short sentence.",
  messages: [
    { role: "user", content: "Call get_weather for Reykjavik." },
  ],
  tools: [
    {
      name: "get_weather",
      description: "Get weather",
      input_schema: {
        type: "object",
        properties: { city: { type: "string" } },
        required: ["city"],
      },
    },
  ],
};

const input: ExecuteInput = {
  model: "claude-sonnet-5-5",
  body,
  stream: false,
  credentials: {} as ProviderCredentials,
  signal: null,
  log: {
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: (tag, message) => console.error(`[${tag}] ${message}`),
  },
};

const result = await executor.execute(input);
const response = result instanceof Response ? result : result.response;
console.log("status:", response.status);
if (!response.ok) {
  console.log(await response.text());
  process.exit(1);
}
const text = await response.text();
console.log(text.length > 600 ? `${text.slice(0, 600)}...` : text);
