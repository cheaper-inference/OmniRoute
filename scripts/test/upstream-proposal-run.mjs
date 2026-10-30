// Standalone contribution reproducer: no audit runner, fork fixtures or live credentials.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { spawn, execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDirectory, "../..");
const args = process.argv.slice(2);
const allowed = new Set(["--root", "--output"]);
assert.equal(args.length % 2, 0, "Use --root <repository> --output <new evidence directory>");
const options = {};
for (let index = 0; index < args.length; index += 2) {
  assert.ok(allowed.has(args[index]), "Unknown option: " + args[index]);
  assert.equal(options[args[index]], undefined, "Duplicate option");
  options[args[index]] = args[index + 1];
}
const root = path.resolve(options["--root"] || process.cwd());
const destination = path.resolve(
  options["--output"] ||
    path.join(root, ".pi/upstream-proposal", new Date().toISOString().replace(/[:.]/g, "-"))
);
assert.equal(fs.existsSync(destination), false, "Do not overwrite evidence");
const tests = [
  ["post-replay", 2],
  ["codex-overload", 23],
  ["heartbeat", 10],
  ["terminal-framing", 45],
  ["responses-sdk-failure", 7],
  ["messages-error-closure", 7],
  ["response-status-usage", 8],
  ["text-fidelity", 1],
].map(([name, count]) => ({
  file: `tests/unit/upstream-proposal-${name}.test.ts`,
  expectedCases: count,
}));
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
for (const test of tests) {
  const source = fs.readFileSync(path.join(packageRoot, test.file));
  const installed = fs.readFileSync(path.join(root, test.file));
  test.sha256 = hash(source);
  assert.equal(
    hash(installed),
    test.sha256,
    "Installed reproducer differs from package: " + test.file
  );
}
fs.mkdirSync(destination, { recursive: true });
// Keep migrations/logs on the chosen evidence volume, not the operator's system disk.
const scratch = fs.mkdtempSync(path.join(destination, "scratch-"));
const environment = { ...process.env };
for (const key of Object.keys(environment)) {
  if (
    /TOKEN|SECRET|PASSWORD|(?:^|_)API_KEY|STORAGE_ENCRYPTION|DATA_DIR|^OMNIROUTE_|^CODEX_|^CHATGPT_|PROXY$|^NODE_OPTIONS$|^NODE_TEST_CONTEXT$/.test(
      key.toUpperCase()
    )
  )
    delete environment[key];
}
for (const name of ["home", "temp"]) fs.mkdirSync(path.join(scratch, name));
Object.assign(environment, {
  NODE_ENV: "test",
  HOME: path.join(scratch, "home"),
  USERPROFILE: path.join(scratch, "home"),
  TEMP: path.join(scratch, "temp"),
  TMP: path.join(scratch, "temp"),
  API_KEY_SECRET: "synthetic-proposal-only-api-key-secret",
  JWT_SECRET: "synthetic-proposal-only-jwt-secret",
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  OMNIROUTE_DISABLE_BACKGROUND_SERVICES: "true",
  OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
  OMNIROUTE_SKIP_DNS_WRITE: "1",
  ADOBE_FIREFLY_BROWSER_REFRESH: "0",
  NODE_OPTIONS:
    "--import=" + pathToFileURL(path.join(scriptDirectory, "upstream-proposal-safety.mjs")).href,
});
let git = null;
try {
  const top = execFileSync("git", ["-C", root, "rev-parse", "--show-toplevel"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
  // A source snapshot nested inside another git checkout must NOT inherit its HEAD claim.
  if (fs.realpathSync(top).toLowerCase() === fs.realpathSync(root).toLowerCase()) {
    git = {
      commit: execFileSync("git", ["-C", root, "rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    };
  }
} catch {
  /* A detached source snapshot has no own git identity. */
}
const production = [
  "src",
  "open-sse",
  "packages",
  "electron",
  "bin",
  "package.json",
  "package-lock.json",
];
function status() {
  return git
    ? execFileSync("git", ["-C", root, "status", "--porcelain", "--", ...production], {
        encoding: "utf8",
      })
    : null;
}
const initialStatus = status();
const report = {
  kind: "standalone-contribution-reproduction-not-a-release-gate",
  startedAt: new Date().toISOString(),
  runtime: { node: process.version, platform: process.platform },
  source: {
    ownGitIdentity: git,
    productionStatusBefore: initialStatus,
    lockSha256: hash(fs.readFileSync(path.join(root, "package-lock.json"))),
    harnessFiles: ["run", "safety", "json-reporter"].map((name) => {
      const file = "scripts/test/upstream-proposal-" + name + ".mjs";
      return { file, sha256: hash(fs.readFileSync(path.join(packageRoot, file))) };
    }),
  },
  expectedFiles: tests.length,
  expectedCases: tests.reduce((sum, test) => sum + test.expectedCases, 0),
  complete: false,
  results: [],
};
function save() {
  fs.writeFileSync(path.join(destination, "receipt.json"), JSON.stringify(report, null, 2) + "\n");
}
save();
for (let index = 0; index < tests.length; index++) {
  const test = tests[index];
  const prefix = String(index + 1).padStart(2, "0");
  const eventPath = prefix + ".events.jsonl";
  const stderrPath = prefix + ".stderr.log";
  const stdout = fs.createWriteStream(path.join(destination, eventPath));
  const stderr = fs.createWriteStream(path.join(destination, stderrPath));
  const dataDir = path.join(scratch, "data-" + prefix);
  fs.mkdirSync(dataDir);
  const env = {
    ...environment,
    DATA_DIR: dataDir,
    OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  };
  const nodeArgs = [
    "--max-old-space-size=1536",
    "--import",
    "tsx/esm",
    "--import",
    "./open-sse/utils/setupPolyfill.ts",
    "--import",
    "./tests/_setup/isolateDataDir.ts",
    "--test",
    "--test-concurrency=1",
    "--test-timeout=60000",
    "--test-reporter=" +
      pathToFileURL(path.join(scriptDirectory, "upstream-proposal-json-reporter.mjs")).href,
    test.file,
  ];
  const started = Date.now();
  const child = spawn(process.execPath, nodeArgs, {
    cwd: root,
    env,
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
  });
  let raw = "";
  let rawErrors = "";
  let timedOut = false;
  child.stdout.on("data", (bytes) => {
    stdout.write(bytes);
    raw += bytes.toString("utf8");
  });
  child.stderr.on("data", (bytes) => {
    stderr.write(bytes);
    rawErrors += bytes.toString("utf8");
  });
  const timer = setTimeout(() => {
    timedOut = true;
    if (process.platform === "win32") {
      const killer = spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
        stdio: "ignore",
        shell: false,
      });
      killer.on("error", () => child.kill("SIGKILL"));
    } else child.kill("SIGKILL");
  }, 90000);
  const exitCode = await new Promise((resolve) => {
    child.once("error", (error) => {
      rawErrors += String(error);
      resolve(-1);
    });
    child.once("close", resolve);
  });
  clearTimeout(timer);
  await Promise.all([
    new Promise((resolve) => stdout.end(resolve)),
    new Promise((resolve) => stderr.end(resolve)),
  ]);
  const events = [];
  const malformed = [];
  for (const line of raw.split("\n").filter(Boolean)) {
    try {
      events.push(JSON.parse(line));
    } catch {
      malformed.push(line);
    }
  }
  const outcomes = events.filter(
    (event) =>
      ["test:pass", "test:fail"].includes(event.type) && event.data?.details?.type === "test"
  );
  const passed = outcomes.filter(
    (event) => event.type === "test:pass" && !event.data.skip && !event.data.todo
  );
  const failed = outcomes.filter((event) => event.type === "test:fail");
  const skipped = outcomes.filter((event) => event.data.skip || event.data.todo);
  const result = {
    ...test,
    exitCode,
    timedOut,
    durationMs: Date.now() - started,
    eventPath,
    stderrPath,
    registeredCases: outcomes.length,
    passed: passed.length,
    failed: failed.length,
    skipped: skipped.length,
    names: outcomes.map((event) => event.data.name),
    failures: failed.map((event) => ({ name: event.data.name, error: event.data.details.error })),
    registrationComplete:
      outcomes.length === test.expectedCases &&
      skipped.length === 0 &&
      new Set(outcomes.map((event) => event.data.name)).size === outcomes.length,
    hasFinalSummary: events.some((event) => event.type === "test:summary"),
    malformedLines: malformed.length,
    externalNetworkDenied: /UPSTREAM53_NETWORK_FENCE|UPSTREAM_PROPOSAL_NETWORK_FENCE/.test(
      raw + rawErrors
    ),
    nodeTestTimedOut: /"failureType":"testTimeoutFailure"/.test(raw),
    moduleOrHarnessFailure:
      /ERR_MODULE_NOT_FOUND|MODULE_NOT_FOUND|does not provide an export named|ERR_UNKNOWN_FILE_EXTENSION/.test(
        raw + rawErrors
      ) || outcomes.some((event) => event.data.name.replaceAll("\\", "/") === test.file),
    command: ["node", ...nodeArgs],
  };
  report.results.push(result);
  save();
  console.log(
    `${test.file}: ${result.passed} passed / ${result.failed} failed; registered ${result.registeredCases}/${test.expectedCases}; exit ${exitCode}`
  );
}
report.productionStatusAfter = status();
assert.equal(report.productionStatusAfter, initialStatus, "Production changed while reproducing");
report.complete =
  report.results.length === report.expectedFiles &&
  report.results.every(
    (result) =>
      result.registrationComplete &&
      result.hasFinalSummary &&
      !result.timedOut &&
      !result.externalNetworkDenied &&
      !result.nodeTestTimedOut &&
      !result.moduleOrHarnessFailure &&
      result.malformedLines === 0
  );
report.completedAt = new Date().toISOString();
report.totals = report.results.reduce(
  (sum, result) => ({
    passed: sum.passed + result.passed,
    failed: sum.failed + result.failed,
    skipped: sum.skipped + result.skipped,
  }),
  { passed: 0, failed: 0, skipped: 0 }
);
try {
  fs.rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
} catch {
  report.fixtureCleanupIncomplete = true;
}
save();
console.log(
  JSON.stringify(
    {
      complete: report.complete,
      ...report.totals,
      receipt: path.join(destination, "receipt.json"),
      exitCodeMeaning:
        "1 means reproduced test failures, 2 means incomplete or unsafe harness, 0 means every check passed",
    },
    null,
    2
  )
);
process.exitCode = !report.complete
  ? 2
  : report.results.some((result) => result.exitCode !== 0 || result.failed > 0)
    ? 1
    : 0;
