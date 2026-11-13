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
  knownIssue:
    'omp sends the literal string $OMNIROUTE_API_KEY as the bearer token (extension apiKey "$VAR" is not interpolated by omp), so the gateway sees a non-olx_ credential and the launcher counts 0 requests (bin/cli/launch/adapters/omp.mjs:54).',
  notes: "dossier tools/omp.md sections 3 and 7; stdin must be closed in print mode",
};

export default expectation;
