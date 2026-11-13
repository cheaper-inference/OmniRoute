const expectation = {
  id: "cline",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["--timeout", "60", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".cline"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "dossier tools/cline.md sections 3 and 7",
};

export default expectation;
