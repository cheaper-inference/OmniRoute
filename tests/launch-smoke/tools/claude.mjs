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
  notes: "dossier tools/claude.md section 7",
};

export default expectation;
