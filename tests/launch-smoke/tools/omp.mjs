const expectation = {
  id: "omp",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["-p", "--no-session", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".omp"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "recipe from the tool's own docs and source; stdin must be closed in print mode",
};

export default expectation;
