import { printHeading, printInfo, printSuccess, printError, printWarning } from "../io.mjs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { t } from "../i18n.mjs";
import { npmBin, npmExecInvocation } from "../npm-exec.mjs";
import { readPidFile, isPidRunning } from "../utils/pid.mjs";
import { resolveDataDir } from "../data-dir.mjs";
import {
  createDefaultPreflightContext,
  isExactVersion,
  launchManagedUpdateCoordinator,
  preflightManagedUpdate,
  waitForManagedUpdateOutcome,
} from "../updateTransaction.mjs";

const execFileAsync = promisify(execFile);

// This file lives at <pkgRoot>/bin/cli/commands/update.mjs — resolve package
// paths relative to the script, NOT process.cwd(). On a global npm/brew install
// the user's cwd is not the package root, so cwd-relative lookups break (#3295).
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(SCRIPT_DIR, "..", "..", "..");
const BIN_DIR = path.join(PKG_ROOT, "bin");

export async function getCurrentVersion() {
  try {
    const { readFileSync } = await import("node:fs");
    const pkg = JSON.parse(readFileSync(path.join(PKG_ROOT, "package.json"), "utf-8"));
    return pkg.version;
  } catch {
    return null;
  }
}

// `--prefer-online` forces npm to revalidate its HTTP cache against the registry.
// Without it `npm view` can return a stale cached version (e.g. report 3.8.30 as
// "latest" after 3.8.31 was published), so the updater told users on an old build
// they were already on the latest version (#4376). `execFn` and `platform` are
// injectable for tests.
export async function getLatestVersion(execFn = execFileAsync, platform = process.platform) {
  try {
    // Every token is a literal, so joining them into a command line on win32 cannot
    // splice a runtime value into it (Hard Rule #13) — npmExecInvocation enforces
    // that. It also hands execFile an EMPTY args array there, so the shell is
    // enabled for npm.cmd without tripping DEP0190 (#15327).
    const { stdout } = await execFn(
      ...npmExecInvocation(
        platform,
        npmBin(platform),
        ["view", "omniroute", "version", "--prefer-online"],
        { timeoutMs: 15000 }
      )
    );
    return stdout.trim();
  } catch {
    return null;
  }
}

function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) > (pb[i] || 0)) return 1;
    if ((pa[i] || 0) < (pb[i] || 0)) return -1;
  }
  return 0;
}

export async function createBackup() {
  const binPath = BIN_DIR;
  const backupDir = path.join(homedir(), ".omniroute", "backups", `omniroute-${Date.now()}`);

  try {
    const { mkdirSync, cpSync, existsSync } = await import("node:fs");
    if (!existsSync(binPath)) return null;

    mkdirSync(backupDir, { recursive: true });
    const files = ["omniroute.mjs", "cli", "nodeRuntimeSupport.mjs", "mcp-server.mjs"];
    for (const f of files) {
      const src = path.join(binPath, f);
      if (existsSync(src)) {
        // cpSync handles both files and directories; the old copyFileSync threw
        // EISDIR on the "cli" directory, which was swallowed by the catch (#3295).
        cpSync(src, path.join(backupDir, f), { recursive: true });
      }
    }
    return backupDir;
  } catch {
    return null;
  }
}

// #11885: `--apply` installs the new files (npm install -g) and re-reads
// package.json from disk to confirm it, but a long-lived server process keeps
// serving whatever it loaded at its last start — Node caches a `require()`d
// package.json per resolved path for the life of the process. A later
// `omniroute update` then correctly reports "already up to date" (the files
// ARE current) while the running server is still stale, matching the reported
// symptom. `--apply` never restarted anything and its success message ("Run
// `omniroute --version` to verify.") implied the update was already live.
//
// `restart.mjs`'s `runRestartCommand()` stops then re-spawns the server detached
// (via `serve.mjs::runServe` with `daemon: true`, #17168), which is still a
// materially bigger behavior change than this fix warrants to invoke
// unconditionally and unattended from `--apply`. Instead, detect whether a
// CLI-managed server is currently running (the same PID file `stop.mjs`/
// `restart.mjs` already trust) and print an explicit, prominent instruction —
// honest about what did and didn't happen — rather than silently assuming.
export async function isServerProcessRunning(deps = { readPidFile, isPidRunning }) {
  const pid = deps.readPidFile("server");
  return Boolean(pid && deps.isPidRunning(pid));
}

export async function printPostApplyGuidance(latest, deps = { readPidFile, isPidRunning }) {
  const running = await isServerProcessRunning(deps);
  if (running) {
    printWarning(`Files updated to ${latest}, but the running server is still on the old version.`);
    printInfo("  Run `omniroute restart` now to apply this update.");
  } else {
    printInfo(`No running OmniRoute server was detected via the CLI's PID file.`);
    printInfo(
      `  Start it with \`omniroute serve\` (or restart your existing process) to run ${latest}.`
    );
  }
  printInfo(
    "`omniroute --version` will keep reporting the old version until the process restarts."
  );
}

// Human wording for the pre-flight reasons that leave an environment on today's flow.
const MANAGED_UNSUPPORTED_REASONS = {
  "unsupported-platform": "automatic rollback is only available on Linux",
  container: "this is a container, update it from the host",
  electron: "the desktop app updates itself",
  "not-global-install": "OmniRoute is not a global npm install",
  "version-mismatch": "the installed package does not match the running version",
  "no-managed-service": "no CLI-managed service (`omniroute serve --daemon`) is running",
  "supervisor-managed": "the service runs under the foreground supervisor",
  "other-supervisor": "the service is managed by another supervisor (systemd, pm2)",
  "environment-unreadable": "the service environment cannot be read",
  "data-dir-mismatch": "the service uses a different data directory than this command",
  "tls-not-supported": "the service terminates TLS itself",
  "host-not-loopback-reachable": "the service is not reachable on the loopback address",
  "port-unknown": "the service port could not be determined",
};

const MANAGED_REFUSED_REASONS = {
  "update-in-progress": "another managed update is already running",
  "insufficient-disk-space":
    "there is not enough free disk space for the data snapshot and the package copy",
};

function describeManagedReason(table, reason) {
  return table[reason] ?? reason;
}

/**
 * `--rollback-on-failure`: hand the update to the detached coordinator and follow it.
 * `handled: false` means the environment is outside the supported cut and the caller
 * continues with the usual update flow. Dependencies are injectable for tests.
 */
export async function runManagedUpdateFromCli({ current, latest, deps = {} }) {
  if (!isExactVersion(latest) || !isExactVersion(current)) {
    printError("Cannot run a managed update: the version is not an exact release number.");
    return { handled: true, exitCode: 1 };
  }
  const { randomUUID } = await import("node:crypto");
  const plan = {
    operationId: randomUUID(),
    previousVersion: current,
    targetVersion: latest,
    readinessTimeoutMs: 180_000,
  };
  const dataDir = resolveDataDir();
  const preflight =
    deps.preflight ??
    (() =>
      preflightManagedUpdate(
        createDefaultPreflightContext({ dataDir, packageRoot: PKG_ROOT }),
        plan
      ));
  const launch = deps.launch ?? ((input) => launchManagedUpdateCoordinator(input));
  const wait =
    deps.wait ??
    ((operationId, options) => waitForManagedUpdateOutcome(dataDir, operationId, options));

  const pre = await preflight(plan);
  if (pre.kind === "unsupported") {
    printWarning(
      `--rollback-on-failure is not available here (${describeManagedReason(MANAGED_UNSUPPORTED_REASONS, pre.reason)}). Continuing with the standard update, without automatic rollback.`
    );
    return { handled: false };
  }
  if (pre.kind === "refused") {
    printError(
      `Update not started: ${describeManagedReason(MANAGED_REFUSED_REASONS, pre.reason)}. Nothing was changed.`
    );
    return { handled: true, exitCode: 1 };
  }

  printInfo(
    `Updating to ${latest} with automatic recovery. The service stops during the swap and a snapshot of your data is taken first.`
  );
  try {
    await launch({ plan, runtime: pre.runtime, environment: pre.environment });
  } catch {
    printError("Could not start the update coordinator. Nothing was changed.");
    return { handled: true, exitCode: 1 };
  }

  let shownPhase = null;
  const state = await wait(plan.operationId, {
    onPhase: (next) => {
      if (next.phase !== shownPhase) {
        shownPhase = next.phase;
        printInfo(`  phase: ${next.phase}`);
      }
    },
  });
  return reportManagedOutcome(state, {
    previous: current,
    target: latest,
    stateFile: `${dataDir}/managed-update/${plan.operationId}/state.json`,
  });
}

function reportManagedOutcome(state, { previous, target, stateFile }) {
  switch (state?.status) {
    case "updated":
      printSuccess(
        `Updated to ${state.runningVersion ?? target}. The service restarted on the new version and answered its readiness check.`
      );
      return { handled: true, exitCode: 0 };
    case "rolled-back":
      printError(
        `The update to ${target} failed${state.reason ? ` (${state.reason})` : ""}. Rolled back: version ${state.runningVersion ?? previous} and its data are restored and running again.`
      );
      return { handled: true, exitCode: 1 };
    case "manual-recovery":
      printError(
        `The update to ${target} failed and automatic recovery did not complete${state.reason ? ` (${state.reason})` : ""}: manual recovery is required.`
      );
      for (const step of state.recovery?.steps ?? []) printInfo(`  - ${step}`);
      if (state.snapshotPath) printInfo(`  Data snapshot preserved at: ${state.snapshotPath}`);
      return { handled: true, exitCode: 1 };
    case "unsupported":
      printError(
        `Update not applied: ${describeManagedReason({ ...MANAGED_UNSUPPORTED_REASONS, ...MANAGED_REFUSED_REASONS }, state.reason)}. Nothing was changed.`
      );
      return { handled: true, exitCode: 1 };
    default:
      printWarning(
        `Still waiting for the update to finish. It keeps running in the background; read its state in ${stateFile} before starting another update.`
      );
      return { handled: true, exitCode: 1 };
  }
}

export function registerUpdate(program) {
  program
    .command("update")
    .description(t("update.checking"))
    .option("--check", "Check for available update — exit 0 if up-to-date, exit 1 if outdated")
    .option("--apply", "Install latest version automatically (npm install -g)")
    .option("--changelog", "Show changelog for the latest release")
    .option("--dry-run", "Show what would be updated without applying")
    .option("--no-backup", "Skip backup creation")
    .option("--yes", "Skip confirmation prompt")
    .option(
      "--rollback-on-failure",
      "Restore the previous version and data if the new one fails to start (global npm install on Linux, daemon service)"
    )
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runUpdateCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runUpdateCommand(opts = {}) {
  const checkOnly = opts.check ?? false;
  const applyNow = opts.apply ?? false;
  const showChangelog = opts.changelog ?? false;
  const dryRun = opts.dryRun ?? false;
  const skipBackup = !(opts.backup ?? true);
  const skipConfirm = opts.yes ?? applyNow;
  const rollbackOnFailure = opts.rollbackOnFailure ?? false;

  const current = await getCurrentVersion();
  const latest = await getLatestVersion();

  if (!current) {
    printError("Could not determine current version");
    return 1;
  }

  if (!latest) {
    printError("Could not check latest version. Is npm available?");
    return 1;
  }

  if (showChangelog) {
    try {
      const { stdout } = await execFileAsync(
        ...npmExecInvocation(process.platform, npmBin(), ["view", "omniroute", "changelog"], {
          timeoutMs: 15000,
        })
      );
      if (stdout.trim()) {
        console.log(stdout.trim());
      } else {
        console.log(`Changelog: https://github.com/your-org/omniroute/releases/tag/v${latest}`);
      }
    } catch {
      console.log(`Changelog: https://github.com/your-org/omniroute/releases/tag/v${latest}`);
    }
    return 0;
  }

  printHeading("OmniRoute Update");
  console.log(`  Current version: ${current}`);
  console.log(`  Latest version:  ${latest}`);

  const cmp = compareVersions(current, latest);
  if (cmp >= 0) {
    printSuccess("You are running the latest version!");
    return 0;
  }

  console.log(`\n  Update available: ${current} → ${latest}`);

  if (checkOnly) {
    console.log("\n  Run `omniroute update --apply` to install automatically.");
    return 1; // exit 1 = outdated (useful for scripts)
  }

  if (dryRun) {
    console.log(
      "\n  [DRY RUN] Would run: npm install -g omniroute@latest --include=optional --legacy-peer-deps"
    );
    if (!skipBackup) console.log("  [DRY RUN] Would create backup in ~/.omniroute/backups/");
    if (rollbackOnFailure) {
      console.log(
        "  [DRY RUN] --rollback-on-failure: would snapshot the data and the package and restore them if the new version fails to start."
      );
    }
    return 0;
  }

  if (!skipBackup) {
    printInfo("Creating backup...");
    const backupPath = await createBackup();
    if (backupPath) {
      printSuccess(`Backup created: ${backupPath}`);
    } else {
      printError("Failed to create backup. Aborting update.");
      return 1;
    }
  }

  if (!skipConfirm) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(`Proceed with update to ${latest}? [y/N] `, resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      printInfo("Update aborted.");
      return 0;
    }
  }

  if (rollbackOnFailure) {
    const managed = await runManagedUpdateFromCli({ current, latest });
    if (managed.handled) return managed.exitCode;
  }

  printInfo("Updating OmniRoute...");
  try {
    const { execSync } = await import("child_process");
    // --include=optional keeps the optionalDependencies (better-sqlite3, keytar,
    // tls-client, llmlingua SLM stack) on update so an omit=optional config can't drop them.
    execSync("npm install -g omniroute@latest --include=optional --legacy-peer-deps", {
      stdio: "inherit",
    });
    // Trust-but-verify: `npm install -g` exits 0 even when a shadowing local install
    // (e.g. ~/node_modules/omniroute ahead of the global prefix on PATH) means the
    // binary the user actually runs was not touched. Re-read the running binary's
    // version and warn instead of lying about success (#9475).
    const afterVersion = await getCurrentVersion();
    if (afterVersion && compareVersions(afterVersion, latest) < 0) {
      printError(
        `Global install updated to ${latest}, but the running binary still reports ${afterVersion}.`
      );
      console.log(
        "  A local `node_modules/omniroute` is likely shadowing the global install on PATH."
      );
      console.log("  Diagnose with:");
      console.log("    which -a omniroute");
      console.log("    command -v omniroute");
      console.log("    npm prefix -g");
      console.log(
        "  Then remove the shadowing local copy (e.g. `npm uninstall omniroute` from its directory)"
      );
      console.log("  or reorder PATH so the global bin comes first.");
      return 1;
    }
    printSuccess(`Installed omniroute@${latest} to disk.`);
    await printPostApplyGuidance(latest);
    return 0;
  } catch (err) {
    printError(`Update failed: ${err.message}`);
    printInfo("Restore from backup:");
    const backupDir = path.join(homedir(), ".omniroute", "backups");
    printInfo(`  ls ${backupDir}`);
    return 1;
  }
}
