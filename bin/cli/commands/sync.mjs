import { writeFileSync } from "node:fs";
import { basename } from "node:path";
import { createInterface } from "node:readline";
import { apiFetch, isRouteUnavailableStatus } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";
import { readImportFile, runImportDryRun } from "./sync-import.mjs";

function fmtTs(v) {
  if (!v) return "-";
  return new Date(typeof v === "number" ? v * 1000 : v).toLocaleString();
}

async function confirm(q) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${q} [y/N] `, (a) => {
      rl.close();
      resolve(a.trim().toLowerCase() === "y");
    });
  });
}

const syncTokenSchema = [
  { key: "id", header: "Token ID", width: 16 },
  { key: "name", header: "Name", width: 24 },
  { key: "scope", header: "Scope", width: 22 },
  { key: "createdAt", header: "Created", formatter: fmtTs },
  { key: "expiresAt", header: "Expires", formatter: fmtTs },
  { key: "lastUsed", header: "Last Used", formatter: fmtTs },
];

const EXPORT_ALL_PATH = "/api/db-backups/exportAll";
// Building the archive (SQLite backup + tar of the call-log artifacts) can outlast the
// default 30 s request timeout on a large instance.
const EXPORT_ALL_TIMEOUT_MS = 300_000;
const SAFE_ARCHIVE_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

/** Server-suggested filename (Content-Disposition), reduced to a safe bare file name. */
export function archiveFileName(contentDisposition, now = new Date()) {
  const match = /filename="?([^";]+)"?/i.exec(contentDisposition || "");
  const suggested = match ? basename(match[1].trim()) : "";
  if (SAFE_ARCHIVE_NAME.test(suggested)) return suggested;
  const stamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
  return `omniroute-full-backup-${stamp}.tar.gz`;
}

/** Hint for a status meaning "this server does not mount the route" (older/newer server). */
function routeUnavailableHint(status, route) {
  return isRouteUnavailableStatus(status)
    ? `the server does not serve ${route}; update OmniRoute on the server.`
    : null;
}

/**
 * Print `Error: <label> failed (HTTP <status>): <server message>` plus an optional hint, and
 * return the CLI exit code for the status. The server message goes through `assertOk()`, so a
 * JSON error body is reduced to its message and nothing like a stack trace is echoed.
 */
async function reportFailure(label, res, hint) {
  let message = `HTTP ${res.status}`;
  try {
    await res.assertOk();
  } catch (err) {
    if (err?.message) message = err.message;
  }
  process.stderr.write(
    `Error: ${label} failed (HTTP ${res.status}): ${message}${hint ? `\n  ${hint}` : ""}\n`
  );
  return res.exitCode || 1;
}

/**
 * `apiFetch` with the global connection options (base URL, context, explicit API key), so a
 * loopback server also receives the local CLI credential. Network errors are reported here:
 * the result is either `{ res }` or `{ exitCode }`.
 */
async function sendSyncRequest(label, path, globalOpts, init = {}) {
  try {
    const res = await apiFetch(path, {
      apiKey: globalOpts.apiKey,
      baseUrl: globalOpts.baseUrl,
      context: globalOpts.context,
      ...init,
    });
    return { res };
  } catch (err) {
    process.stderr.write(`Error: ${label} failed: ${err?.message || "network error"}\n`);
    return { exitCode: err?.exitCode || 1 };
  }
}

function pullFailureHint(status) {
  if (status === 401 || status === 403) {
    return (
      "the full backup requires an operator credential: run this on the server host " +
      "(local CLI credential) or sign in to the dashboard; API keys and remote access " +
      "tokens are refused."
    );
  }
  return routeUnavailableHint(status, `GET ${EXPORT_ALL_PATH}`);
}

function writePrivateFile(target, buf) {
  try {
    // `wx`: never clobber an existing file; 0o600: the pull archive and the config bundle both
    // carry the stored credentials.
    writeFileSync(target, buf, { flag: "wx", mode: 0o600 });
    return 0;
  } catch (err) {
    const reason = err?.code === "EEXIST" ? "file already exists" : err?.code || err?.message;
    process.stderr.write(`Error: cannot write ${target}: ${reason}\n`);
    return 1;
  }
}

/**
 * `omniroute sync pull [outPath]` — download the server's full backup archive (`.tar.gz`)
 * from `GET /api/db-backups/exportAll`. The route is operator-only, so against a loopback
 * server `apiFetch` attaches the machine-bound local CLI credential.
 */
export async function runSyncPull(outPath, globalOpts = {}) {
  const { res, exitCode: requestExit } = await sendSyncRequest(
    "sync pull",
    EXPORT_ALL_PATH,
    globalOpts,
    {
      headers: { accept: "application/gzip, application/json" },
      timeout: EXPORT_ALL_TIMEOUT_MS,
    }
  );
  if (!res) return requestExit;
  if (!res.ok) return reportFailure("sync pull", res, pullFailureHint(res.status));

  const target = outPath || archiveFileName(res.headers.get("content-disposition"));
  const buf = Buffer.from(await res.arrayBuffer());
  const exitCode = writePrivateFile(target, buf);
  if (exitCode === 0) process.stdout.write(`Saved ${buf.length} bytes to ${target}\n`);
  return exitCode;
}

const CLOUD_SYNC_PATH = "/api/sync/cloud";

function pushFailureHint(status) {
  if (status === 401 || status === 403) {
    return (
      `POST ${CLOUD_SYNC_PATH} accepts a signed-in dashboard session or an API key with the ` +
      "manage scope (pass it with --api-key)."
    );
  }
  if (status === 502) {
    return (
      "the server could not complete the cloud sync; if cloud sync is disabled, enable cloud " +
      "sync on the dashboard Endpoint page first (enabling uploads your credentials)."
    );
  }
  return routeUnavailableHint(status, `POST ${CLOUD_SYNC_PATH}`);
}

/**
 * `omniroute sync push` — run one cloud sync now: `POST /api/sync/cloud {action: "sync"}`, the
 * same call the dashboard makes. The route has no partial, dry-run or per-target mode, and it
 * refuses to sync (502) while cloud sync is disabled.
 */
export async function runSyncPush(globalOpts = {}) {
  const { res, exitCode } = await sendSyncRequest("sync push", CLOUD_SYNC_PATH, globalOpts, {
    method: "POST",
    body: { action: "sync" },
    // A sync is not idempotent and its "disabled" refusal is a 502: never replay it.
    retry: false,
  });
  if (!res) return exitCode;
  if (!res.ok) return reportFailure("sync push", res, pushFailureHint(res.status));
  emit(await res.json(), globalOpts);
  return 0;
}

const SYNC_BUNDLE_PATH = "/api/sync/bundle";
const SYNC_TOKEN_HINT =
  "create one with `omniroute sync tokens create --name <name>` and pass it with --token " +
  "or OMNIROUTE_SYNC_TOKEN.";

function bundleFailureHint(status) {
  if (status === 401 || status === 403) {
    return `the sync token was refused (unknown, expired or revoked): ${SYNC_TOKEN_HINT}`;
  }
  return routeUnavailableHint(status, `GET ${SYNC_BUNDLE_PATH}`);
}

/**
 * `omniroute sync bundle <outPath>` — download the config-sync bundle (`{version, bundle}` JSON)
 * from `GET /api/sync/bundle`. That route authenticates ONLY with a sync token (API keys and the
 * local CLI credential are not accepted) and always returns the whole bundle.
 */
export async function runSyncBundle(outPath, token, globalOpts = {}) {
  if (!token) {
    process.stderr.write(
      `Error: sync bundle needs a sync token (GET ${SYNC_BUNDLE_PATH} does not accept API keys)` +
        `\n  ${SYNC_TOKEN_HINT}\n`
    );
    return 2;
  }
  const { res, exitCode } = await sendSyncRequest("sync bundle", SYNC_BUNDLE_PATH, globalOpts, {
    // Send the sync token as the bearer too, so the operator's API key is not attached.
    headers: { "x-sync-token": token, authorization: `Bearer ${token}` },
  });
  if (!res) return exitCode;
  if (!res.ok) return reportFailure("sync bundle", res, bundleFailureHint(res.status));

  let envelope;
  try {
    envelope = await res.json();
  } catch {
    process.stderr.write("Error: sync bundle failed: the server did not return a JSON bundle\n");
    return 1;
  }
  const buf = Buffer.from(`${JSON.stringify(envelope, null, 2)}\n`);
  const writeExit = writePrivateFile(outPath, buf);
  if (writeExit === 0) {
    const version = envelope?.version ? ` ${envelope.version}` : "";
    process.stdout.write(`Saved config bundle${version} (${buf.length} bytes) to ${outPath}\n`);
  }
  return writeExit;
}

/** `omniroute sync initialize` — `POST /api/sync/initialize` (starts the sync schedulers). */
export async function runSyncInitialize(globalOpts = {}) {
  const route = "/api/sync/initialize";
  const { res, exitCode } = await sendSyncRequest("sync initialize", route, globalOpts, {
    method: "POST",
  });
  if (!res) return exitCode;
  if (!res.ok) {
    return reportFailure("sync initialize", res, routeUnavailableHint(res.status, `POST ${route}`));
  }
  emit(await res.json(), globalOpts);
  return 0;
}

const IMPORT_PATH = "/api/db-backups/import";
// Uploading + validating + swapping a large database can outlast the 30 s default timeout.
const IMPORT_TIMEOUT_MS = 300_000;

function importFailureHint(status) {
  if (status === 401 || status === 403) {
    return (
      "importing replaces the whole database, so it requires an operator credential: run this " +
      "on the server host (local CLI credential) or sign in to the dashboard; API keys and " +
      "remote access tokens are refused."
    );
  }
  return routeUnavailableHint(status, `POST ${IMPORT_PATH}`);
}

/**
 * `omniroute sync import <file> [--dry-run]` — replace the server's database with a `.sqlite`
 * backup via `POST /api/db-backups/import`. With `--dry-run` the file is only validated
 * locally and the server is never contacted: an older server ignores `dryRun` and would
 * replace the live database.
 */
export async function runSyncImport(filePath, opts = {}, globalOpts = {}) {
  const { buf, exitCode: readExit } = readImportFile(filePath);
  if (!buf) return readExit;
  if (opts.dryRun) return runImportDryRun(filePath, buf, globalOpts);

  const name = basename(filePath);
  const query = name.endsWith(".sqlite") ? `?filename=${encodeURIComponent(name)}` : "";
  const { res, exitCode } = await sendSyncRequest(
    "sync import",
    `${IMPORT_PATH}${query}`,
    globalOpts,
    {
      method: "POST",
      headers: { "content-type": "application/octet-stream" },
      body: buf,
      timeout: IMPORT_TIMEOUT_MS,
      // A replace is not something to replay blindly after a gateway error.
      retry: false,
    }
  );
  if (!res) return exitCode;
  if (!res.ok) return reportFailure("sync import", res, importFailureHint(res.status));
  emit(await res.json(), globalOpts);
  return 0;
}

export function registerSync(program) {
  const sync = program.command("sync").description(t("sync.description"));

  sync
    .command("push")
    .description(t("sync.push.description"))
    .action(async (opts, cmd) => {
      const exitCode = await runSyncPush(cmd.optsWithGlobals());
      if (exitCode !== 0) process.exit(exitCode);
    });

  sync
    .command("pull [outPath]")
    .description(t("sync.pull.description"))
    .action(async (outPath, opts, cmd) => {
      const exitCode = await runSyncPull(outPath, cmd.optsWithGlobals());
      if (exitCode !== 0) process.exit(exitCode);
    });

  sync
    .command("bundle <outPath>")
    .description(t("sync.bundle.description"))
    .option("--token <syncToken>", t("sync.bundle.token"))
    .action(async (outPath, opts, cmd) => {
      const token = opts.token || process.env.OMNIROUTE_SYNC_TOKEN;
      const exitCode = await runSyncBundle(outPath, token, cmd.optsWithGlobals());
      if (exitCode !== 0) process.exit(exitCode);
    });

  sync
    .command("import <bundlePath>")
    .description(t("sync.import.description"))
    .option("--dry-run", t("sync.import.dryRun"))
    .action(async (bundlePath, opts, cmd) => {
      const exitCode = await runSyncImport(
        bundlePath,
        { dryRun: !!opts.dryRun },
        cmd.optsWithGlobals()
      );
      if (exitCode !== 0) process.exit(exitCode);
    });

  sync.command("initialize").action(async (opts, cmd) => {
    const exitCode = await runSyncInitialize(cmd.optsWithGlobals());
    if (exitCode !== 0) process.exit(exitCode);
  });

  const tokens = sync.command("tokens").description(t("sync.tokens.description"));

  tokens.command("list").action(async (opts, cmd) => {
    const res = await apiFetch("/api/sync/tokens");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals(), syncTokenSchema);
  });

  tokens
    .command("create")
    .option("--name <n>", t("sync.tokens.create.name"))
    .option("--scope <s>", t("sync.tokens.create.scope"))
    .option("--ttl <duration>", t("sync.tokens.create.ttl"), "30d")
    .action(async (opts, cmd) => {
      const body = { name: opts.name, scope: opts.scope, ttl: opts.ttl };
      const res = await apiFetch("/api/sync/tokens", { method: "POST", body });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      emit(await res.json(), cmd.optsWithGlobals());
    });

  tokens
    .command("revoke <id>")
    .option("--yes", t("sync.tokens.revoke.yes"))
    .action(async (id, opts, cmd) => {
      if (!opts.yes) {
        const ok = await confirm(`Revoke ${id}?`);
        if (!ok) return;
      }
      const res = await apiFetch(`/api/sync/tokens/${id}`, { method: "DELETE" });
      if (!res.ok) {
        process.stderr.write(`Error: ${res.status}\n`);
        process.exit(1);
      }
      process.stdout.write("Revoked\n");
    });

  sync.command("status").action(async (opts, cmd) => {
    const res = await apiFetch("/api/sync/cloud?op=status");
    if (!res.ok) {
      process.stderr.write(`Error: ${res.status}\n`);
      process.exit(1);
    }
    emit(await res.json(), cmd.optsWithGlobals());
  });
}
