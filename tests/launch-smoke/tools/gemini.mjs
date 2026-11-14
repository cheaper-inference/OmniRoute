const expectation = {
  id: "gemini",
  mode: "headless",
  model: "gemini/gemini-2.5-pro",
  args: ["-p", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".gemini"],
  protocols: ["gemini:streamGenerateContent"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes:
    "recipe from the tool's own docs and source; adapter adds --skip-trust for -p (untrusted cwd exits 55 otherwise); observed key header authorization",
};

export default expectation;
