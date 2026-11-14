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
  notes: "dossier tools/omp.md sections 3 and 7; stdin must be closed in print mode",
};

export default expectation;
