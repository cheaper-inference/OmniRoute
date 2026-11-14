const expectation = {
  id: "openclaw",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["agent", "--message", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".openclaw"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 60000,
  pty: { waitMs: 30000, inputDelayMs: 12000, input: "reply with OK\r" },
  notes:
    "Headless one-shot: `-- agent --message ...`; the adapter swaps tui for agent and adds --local. pty config kept for the interactive TUI probe (no --message so it stays idle until the typed prompt).",
};

export default expectation;
