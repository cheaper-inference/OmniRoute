const expectation = {
  id: "kilo",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["run", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".config/kilo", ".local/share/kilo", ".kilocode"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "dossier tools/kilo.md sections 3 and 7",
};

export default expectation;
