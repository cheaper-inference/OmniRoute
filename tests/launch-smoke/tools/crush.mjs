const expectation = {
  id: "crush",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["run", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".config/crush", ".local/share/crush"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes:
    "dossier tools/crush.md; crush run. Adapter adds --verbose (crush 0.101.0 flaky empty stdout, 30/30 with it vs 6/10 without)",
};

export default expectation;
