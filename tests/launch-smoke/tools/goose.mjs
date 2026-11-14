const expectation = {
  id: "goose",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["run", "--no-session", "-q", "-t", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".config/goose", ".local/share/goose", ".local/state/goose"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 60000,
  pty: { waitMs: 20000, inputDelayMs: 6000, input: "reply with OK\r" },
  notes:
    "dossier tools/goose.md section 3; GOOSE_PATH_ROOT isolates state into the launcher temp dir. Headless: passthrough `run ...` replaces the default `session` subcommand.",
};

export default expectation;
