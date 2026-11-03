/**
 * Cert resolution for the standalone Antigravity bridge (`bin/antigravity-bridge.mjs`).
 *
 * The bridge is a published CLI script run with plain `node`, so it cannot load the
 * TypeScript sources it has to agree with (Node refuses to strip types under
 * `node_modules`). This file is their CommonJS twin, like the sibling `_internal/*.cjs`
 * shims `server.cjs` uses:
 *
 *   - `resolveMitmDataDir()` mirrors `src/mitm/dataDir.ts` (where `manager.ts` writes the
 *     MITM certs: `<DATA_DIR>/mitm`).
 *   - `decideCertMigration()` mirrors `src/mitm/cert/migration.ts`, the gate `manager.ts`
 *     (via `cert/activeCert.ts`) uses to pick the legacy leaf or the root CA, honoring
 *     `MITM_ROOT_CA_ENABLED === "true"` exactly like the server and the AgentBridge routes.
 *
 * `tests/unit/antigravity-bridge-active-cert.test.ts` checks both against the TS sources,
 * so keep them byte-for-byte in behavior. Per-host leaf issuance is not reimplemented
 * here: the root-CA path reuses `DynamicCertStore` from `./rootCaShim.cjs`, the same
 * issuer `server.cjs` feeds its SNICallback with.
 */

"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const tls = require("tls");

const APP_NAME = "omniroute";

function normalizeConfiguredPath(dir) {
  if (typeof dir !== "string") return null;
  const trimmed = dir.trim();
  return trimmed ? path.resolve(trimmed) : null;
}

function defaultHomeDir(env) {
  try {
    return os.homedir();
  } catch {
    const envHome = env.HOME || env.USERPROFILE;
    return typeof envHome === "string" && envHome.trim() ? path.resolve(envHome) : os.tmpdir();
  }
}

/** Twin of `resolveMitmDataDir()` in `src/mitm/dataDir.ts`. */
function resolveMitmDataDir(env = process.env, platform = process.platform, homeDir) {
  const configured = normalizeConfiguredPath(env.DATA_DIR);
  if (configured) return configured;

  const home = typeof homeDir === "function" ? homeDir() : defaultHomeDir(env);
  if (platform === "win32") {
    const appData = env.APPDATA || path.join(home, "AppData", "Roaming");
    return path.join(appData, APP_NAME);
  }

  const xdgConfigHome = normalizeConfiguredPath(env.XDG_CONFIG_HOME);
  if (xdgConfigHome) return path.join(xdgConfigHome, APP_NAME);

  return path.join(home, `.${APP_NAME}`);
}

/** Twin of `decideCertMigration()` in `src/mitm/cert/migration.ts`. */
function decideCertMigration(certDir, rootCaEnabled) {
  if (rootCaEnabled) return "use-root-ca";

  const hasLegacyLeaf =
    fs.existsSync(path.join(certDir, "server.crt")) &&
    fs.existsSync(path.join(certDir, "server.key"));
  const hasCaPair =
    fs.existsSync(path.join(certDir, "ca.crt")) && fs.existsSync(path.join(certDir, "ca.key"));

  if (hasLegacyLeaf && !hasCaPair) return "use-legacy-leaf";

  return "use-root-ca";
}

/**
 * Where the bridge reads its TLS material from and which model it serves.
 * `CERT_DIR` is an explicit override of `<DATA_DIR>/mitm`; the model is decided the
 * same way for either directory.
 */
function resolveBridgeCert(env = process.env, platform = process.platform, homeDir) {
  const override = normalizeConfiguredPath(env.CERT_DIR);
  const certDir = override || path.join(resolveMitmDataDir(env, platform, homeDir), "mitm");
  const mode = decideCertMigration(certDir, env.MITM_ROOT_CA_ENABLED === "true");
  const base = mode === "use-root-ca" ? "ca" : "server";
  const certPath = path.join(certDir, `${base}.crt`);
  const keyPath = path.join(certDir, `${base}.key`);
  const missing = [certPath, keyPath].filter((p) => !fs.existsSync(p));
  return { certDir, source: override ? "CERT_DIR" : "DATA_DIR", mode, certPath, keyPath, missing };
}

/** Operator-facing "cert missing" message for the resolved model. */
function bridgeCertMissingMessage(info) {
  const files = info.missing.map((p) => path.basename(p)).join(", ");
  if (info.mode === "use-root-ca") {
    return (
      `Root CA certificate files not found in ${info.certDir} (missing: ${files}). ` +
      "Start the AgentBridge server once to generate it " +
      '(POST /api/tools/agent-bridge/server with {"action":"start"}), ' +
      "or point CERT_DIR at a directory holding server.crt/server.key."
    );
  }
  return (
    `Certificate files not found in ${info.certDir} (missing: ${files}). ` +
    "Generate one first via POST /api/tools/agent-bridge/cert/regenerate, " +
    "or point CERT_DIR at a directory holding server.crt/server.key."
  );
}

/**
 * Load the TLS material for the resolved model. Throws with
 * {@link bridgeCertMissingMessage} when it is absent — the bridge never mints a CA of
 * its own, since one the OS does not trust would only break every handshake.
 *
 * Returns `getSecureContext(host)`: the legacy leaf for every host, or a per-host leaf
 * signed by the persisted root CA (cached per host).
 */
function createBridgeTlsProvider(env = process.env, platform = process.platform, homeDir) {
  const info = resolveBridgeCert(env, platform, homeDir);
  if (info.missing.length > 0) throw new Error(bridgeCertMissingMessage(info));

  const key = fs.readFileSync(info.keyPath, "utf-8");
  const cert = fs.readFileSync(info.certPath, "utf-8");

  if (info.mode === "use-legacy-leaf") {
    const context = tls.createSecureContext({ key, cert });
    return { ...info, getSecureContext: () => Promise.resolve(context) };
  }

  const { DynamicCertStore } = require("./rootCaShim.cjs");
  const store = new DynamicCertStore({ key, cert });
  return { ...info, getSecureContext: (host) => store.getSecureContext(host) };
}

module.exports = {
  resolveMitmDataDir,
  decideCertMigration,
  resolveBridgeCert,
  bridgeCertMissingMessage,
  createBridgeTlsProvider,
};
