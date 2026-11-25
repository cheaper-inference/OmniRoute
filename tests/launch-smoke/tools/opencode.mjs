const expectation = {
  id: "opencode",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["run", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".config/opencode", ".local/share/opencode", ".local/state/opencode", ".opencode"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "recipe from the tool's own docs and source; inline config via OPENCODE_CONFIG_CONTENT",
};

export default expectation;
