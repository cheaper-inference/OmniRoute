const expectation = {
  id: "claude",
  mode: "headless",
  model: "anthropic/claude-sonnet-4-6",
  args: ["-p", "reply with OK", "--max-turns", "1"],
  stdin: "ignore",
  env: {},
  realHome: [".claude", ".claude.json"],
  protocols: ["messages"],
  keyHeaders: ["authorization", "x-api-key"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "recipe from the tool's own docs and source",
};

export default expectation;
