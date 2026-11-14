const expectation = {
  id: "hermes",
  mode: "headless",
  model: "openai/gpt-5.2",
  args: ["-z", "reply with OK"],
  stdin: "ignore",
  env: {},
  realHome: [".hermes"],
  protocols: ["chat"],
  keyHeaders: ["authorization"],
  expectStdout: "OMNI-SMOKE-OK",
  timeoutMs: 180000,
  notes:
    "recipe from the tool's own docs and source; teardown check: after exit `pgrep -af hermes` must list no process whose cmdline or /proc/<pid>/environ references the sandbox root (launcher runs `hermes gateway stop`; temp HERMES_HOME is removed)",
};

export default expectation;
