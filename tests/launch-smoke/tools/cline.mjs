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
  notes: "recipe from the tool's own docs and source",
};

export default expectation;
