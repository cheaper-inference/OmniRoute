const expectation = {
  id: "pi",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["-p", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".pi"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "dossier tools/pi.md sections 3 and 7; stdin must be closed",
};

export default expectation;
