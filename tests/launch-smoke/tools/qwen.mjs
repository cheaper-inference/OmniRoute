const expectation = {
  id: "qwen",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["-p", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".qwen"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "dossier tools/qwen.md section 7; openai chat route",
};

export default expectation;
