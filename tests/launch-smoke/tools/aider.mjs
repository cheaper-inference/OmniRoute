const expectation = {
  id: "aider",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: [
    "--no-git",
    "--no-analytics",
    "--no-check-update",
    "--no-show-release-notes",
    "--no-show-model-warnings",
    "--no-fancy-input",
    "--no-pretty",
    "--yes-always",
    "--message",
    "reply with OK",
  ],
  stdin: "newline",
  env: {},
  realHome: [".aider", ".aider.conf.yml", ".cache/aider"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 180000,
  notes: "tools.json notes: aider needs stdin to be a pipe/TTY, not /dev/null",
};

export default expectation;
