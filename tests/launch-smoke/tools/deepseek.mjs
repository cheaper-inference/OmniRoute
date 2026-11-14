const expectation = {
  id: "deepseek",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["headless", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".dsh"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 60000,
  pty: { waitMs: 20000, inputDelayMs: 6000, input: "reply with OK\r" },
  notes:
    "dossier tools/deepseek.md sections 3 and 5; phase A uses the one-shot `dsh headless --patch <tmp> <task>` path; the pty config is kept for the interactive web probe (--no-open --port 0).",
};

export default expectation;
