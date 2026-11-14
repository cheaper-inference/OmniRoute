const expectation = {
  id: "openclaw",
  mode: "pty",
  model: "openai/gpt-5.2",
  args: [],
  stdin: "ignore",
  env: {},
  realHome: [".openclaw"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: null,
  timeoutMs: 60000,
  // One-shot args from tools.json, run once to record the missing headless support.
  headlessProbe: ["--message", "reply with OK"],
  pty: { waitMs: 30000, inputDelayMs: 12000, input: "reply with OK\r" },
  knownIssue:
    "Adapter runs `openclaw tui --local` (needs a TTY, no one-shot); true headless `agent exec` is not reachable through the adapter.",
  notes:
    "dossier tools/openclaw.md sections 3 and 7; no --message so the TUI stays idle until the typed prompt.",
};

export default expectation;
