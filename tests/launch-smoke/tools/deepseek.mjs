const expectation = {
  id: "deepseek",
  mode: "pty",
  model: "openai/gpt-5.2",
  args: ["--no-open", "--port", "0"],
  stdin: "ignore",
  env: {},
  realHome: [".dsh"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: null,
  timeoutMs: 60000,
  // One-shot args from tools.json, run once to record the missing headless support.
  headlessProbe: ["headless", "reply with OK"],
  pty: { waitMs: 20000, inputDelayMs: 6000, input: "reply with OK\r" },
  knownIssue:
    "Adapter runs `dsh web --patch <tmp>` (browser UI HTTP server, not a TUI): typed pty input never reaches the model, so no /v1/chat/completions request is expected; `headless ...` after -- fails (too many arguments, exit 1).",
  notes:
    "dossier tools/deepseek.md sections 3 and 5; --no-open avoids launching a browser; the smoke only proves startup, session mint/revoke and temp cleanup.",
};

export default expectation;
