const { appendFileSync, copyFileSync, mkdirSync, readFileSync } = require("node:fs");
const { dirname, join } = require("node:path");
const { spawnSync } = require("node:child_process");

const state = JSON.parse(readFileSync(process.env.OMNI_NEXT_RELEASE_FIXTURE, "utf8"));
const args = process.argv.slice(2);
const trace = (event) =>
  appendFileSync(process.env.OMNI_NEXT_RELEASE_TRACE, JSON.stringify(event) + "\n");
const option = (long, short) => {
  const index = args.findIndex((item) => item === long || (short && item === short));
  return index >= 0 ? args[index + 1] : undefined;
};
function emit(value) {
  const query = option("--jq", "-q");
  if (!query) return process.stdout.write(JSON.stringify(value) + "\n");
  // Execute the workflow's real jq expression against the controlled API payload.
  // The double does not duplicate its filtering/ordering logic.
  const result = spawnSync("jq", ["-r", query], {
    input: JSON.stringify(value),
    encoding: "utf8",
    env: process.env,
  });
  if (result.error || result.status !== 0) {
    trace({ operation: "unexpected", kind: "jq", status: result.status });
    process.exit(94);
  }
  process.stdout.write(result.stdout);
}
function reject(message, code = 1) {
  process.stderr.write(message + "\n");
  process.exit(code);
}
function artifactMetadata(artifact) {
  const { zipPath, members, producerAttempt, ...metadata } = artifact;
  // Fixture transport paths are private to the double, not imaginary REST fields.
  void zipPath;
  void members;
  void producerAttempt;
  return metadata;
}
function inventory(values, field, url) {
  const number = Number(url.searchParams.get("page") || "1");
  const size = Number(url.searchParams.get("per_page") || "100");
  let entries = values.slice((number - 1) * size, number * size);
  if (state.truncatedFields?.includes(field)) entries = entries.slice(0, 1);
  const page = { total_count: values.length, [field]: entries };
  emit(args.includes("--slurp") ? [page] : page);
}
if (args[0] === "api") {
  const endpoint = args.find((arg) => arg.startsWith("repos/") || arg.startsWith("/repos/"));
  trace({ operation: "api", endpoint: endpoint || null });
  if (!endpoint) {
    trace({ operation: "unexpected", kind: "api-argument" });
    reject("Fixture API endpoint missing", 94);
  }
  const url = new URL(endpoint.replace(/^\//, ""), "https://api.github.invalid/");
  const path = url.pathname;
  if (state.apiError) reject("Fixture GitHub API 403 rate limit", 1);
  if (path.endsWith("/actions/runs") || path.endsWith("/actions/workflows/ci.yml/runs")) {
    const requested = url.searchParams.get("head_sha");
    const values = state.runs.filter((run) => !requested || run.head_sha === requested);
    inventory(values, "workflow_runs", url);
  } else if (/\/actions\/workflows\/ci\.yml$/.test(path)) {
    emit({ id: state.workflowId, path: ".github/workflows/ci.yml", name: "CI", state: "active" });
  } else if (/\/actions\/artifacts\/\d+\/zip$/.test(path)) {
    const id = Number(path.split("/").at(-2));
    const artifact = state.artifacts.find((item) => item.id === id);
    if (!artifact || artifact.expired) reject("Fixture artifact unavailable");
    trace({
      operation: "artifact-download",
      artifactId: id,
      name: artifact.name,
      runId: artifact.workflow_run.id,
      attempt: artifact.producerAttempt,
    });
    process.stdout.write(readFileSync(artifact.zipPath));
  } else if (/\/actions\/artifacts\/\d+$/.test(path)) {
    const artifact = state.artifacts.find((item) => item.id === Number(path.split("/").at(-1)));
    if (!artifact) reject("Fixture artifact metadata unavailable");
    emit(artifactMetadata(artifact));
  } else if (/\/actions\/runs\/\d+\/artifacts$/.test(path)) {
    const id = Number(path.split("/").at(-2));
    const artifacts = state.artifacts
      .filter((item) => item.workflow_run.id === id)
      .map(artifactMetadata);
    inventory(artifacts, "artifacts", url);
  } else if (/\/actions\/runs\/\d+(?:\/attempts\/\d+)?\/jobs$/.test(path)) {
    const match = path.match(/\/runs\/(\d+)(?:\/attempts\/(\d+))?\/jobs$/);
    const jobs = state.jobs.filter(
      (item) =>
        item.run_id === Number(match[1]) && (!match[2] || item.run_attempt === Number(match[2]))
    );
    inventory(jobs, "jobs", url);
  } else if (/\/actions\/runs\/\d+(?:\/attempts\/\d+)?$/.test(path)) {
    const match = path.match(/\/runs\/(\d+)(?:\/attempts\/(\d+))?$/);
    const runs = match[2] ? state.attemptRuns || state.runs : state.runs;
    const run = runs.find(
      (item) => item.id === Number(match[1]) && (!match[2] || item.run_attempt === Number(match[2]))
    );
    if (!run) reject("Fixture run unavailable");
    emit(run);
  } else if (/\/(?:git\/)?commits\/[0-9a-f]{40}$/.test(path)) {
    const sha = path.split("/").at(-1);
    emit({ sha, tree: { sha: state.treeSha }, commit: { tree: { sha: state.treeSha } } });
  } else if (/\/git\/ref\/tags\//.test(path)) {
    emit({ ref: `refs/tags/${state.releaseTag}`, object: { type: "commit", sha: state.tagSha } });
  } else {
    trace({ operation: "unexpected", kind: "api-route", path });
    reject("Unmodeled fixture API route", 94);
  }
} else if (args[0] === "run" && args[1] === "download") {
  const runId = Number(args[2]);
  const name = option("--name", "-n");
  const destination = option("--dir", "-D");
  trace({ operation: "named-download", runId, name });
  const selected = state.artifacts.filter(
    (item) => item.workflow_run.id === runId && item.name === name
  );
  if (selected.length !== 1 || selected[0].expired) reject("Fixture named artifact unavailable");
  const artifact = selected[0];
  trace({
    operation: "artifact-download",
    artifactId: artifact.id,
    name: artifact.name,
    runId,
    attempt: artifact.producerAttempt,
  });
  mkdirSync(destination, { recursive: true });
  for (const [member, source] of Object.entries(artifact.members)) {
    mkdirSync(dirname(join(destination, member)), { recursive: true });
    copyFileSync(source, join(destination, member));
  }
} else {
  trace({ operation: "unexpected", kind: "gh-command", args });
  reject("Unmodeled fixture gh command", 94);
}
