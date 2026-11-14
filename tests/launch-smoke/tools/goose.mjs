const expectation = {
  id: "goose",
  mode: "pty",
  model: "openai/gpt-5.2",
  args: [],
  stdin: "ignore",
  env: {},
  realHome: [".config/goose", ".local/share/goose", ".local/state/goose"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: null,
  timeoutMs: 60000,
  // One-shot args from tools.json, run once to record the missing headless support.
  headlessProbe: ["run", "--no-session", "-q", "-t", "reply with OK"],
  pty: { waitMs: 20000, inputDelayMs: 6000, input: "reply with OK\r" },
  knownIssue:
    "Adapter argv is `goose session` + passthrough, so `run -t ...` becomes `goose session run` (error: unrecognized subcommand 'run', exit 2); headless needs adapter support.",
  notes:
    "dossier tools/goose.md section 3; GOOSE_PATH_ROOT isolates state into the launcher temp dir.",
};

export default expectation;
