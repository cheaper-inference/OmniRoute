const expectation = {
  id: "gemini",
  mode: "headless",
  model: "gemini/gemini-2.5-pro",
  args: ["--skip-trust", "-p", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".gemini"],
  protocols: ["gemini:streamGenerateContent"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes:
    "dossier tools/gemini.md section 7; --skip-trust needed headless in an untrusted sandbox cwd (else exit 55); observed key header authorization",
};

export default expectation;
