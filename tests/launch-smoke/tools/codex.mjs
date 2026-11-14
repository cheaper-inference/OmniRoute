const expectation = {
  id: "codex",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["exec", "--skip-git-repo-check", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".codex"],
  protocols: ["responses"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 120000,
  notes: "dossier tools/codex.md; openai responses protocol",
};

export default expectation;
