const expectation = {
  id: "copilot",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["-p", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".copilot"],
  protocols: ["chat"],
  keyHeaders: ["authorization", "x-api-key"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "dossier tools/copilot.md; BYOK via env, openai chat",
};

export default expectation;
