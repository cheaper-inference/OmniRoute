import path from "path";
import { resolveMitmDataDir } from "../dataDir.ts";
import { decideCertMigration, type CertMigrationDecision } from "./migration.ts";

// #14070: single source of truth for "which cert file is actually active
// (installed + trusted) for this run". `decideCertMigration()` only answers
// which MODEL is active; every caller that needs the concrete file path used
// to independently re-derive it, and three of the four call sites (the
// AgentBridge `state`/`diagnose`/`trust-cert` routes) hard-coded the legacy
// `server.crt` path regardless of the decision — so once a install adopted
// the root-CA model (`ca.crt`), those routes kept checking/trusting the
// wrong file forever. `startMitmInternal()` (`../manager.ts`) is the only
// place that got this right; this helper factors that logic out so every
// caller (including `manager.ts` itself) resolves the same path the same
// way.

/** The cert file actually active for this run, plus which model produced it. */
export interface ActiveCertInfo {
  certPath: string;
  mode: CertMigrationDecision;
}

/**
 * Resolve the cert file the active migration decision installs/trusts for
 * `certDir`. Mirrors `rootCa.ts`'s `ca.crt` filename under `"use-root-ca"`
 * and `generate.ts`'s `server.crt` filename under `"use-legacy-leaf"` — pure
 * path arithmetic, no filesystem I/O beyond what `decideCertMigration()`
 * itself performs (existence checks only).
 */
export function resolveActiveCertPath(certDir: string, rootCaEnabled: boolean): ActiveCertInfo {
  const mode = decideCertMigration(certDir, rootCaEnabled);
  const certPath =
    mode === "use-root-ca" ? path.join(certDir, "ca.crt") : path.join(certDir, "server.crt");
  return { certPath, mode };
}

/**
 * {@link resolveActiveCertPath} for this process's MITM cert dir
 * (`<DATA_DIR>/mitm`), honoring the `MITM_ROOT_CA_ENABLED` opt-in exactly as
 * `manager.ts` and the AgentBridge `state`/`diagnose`/`server` routes do.
 */
export function resolveActiveMitmCert(): ActiveCertInfo {
  const certDir = path.join(resolveMitmDataDir(), "mitm");
  return resolveActiveCertPath(certDir, process.env.MITM_ROOT_CA_ENABLED === "true");
}

/** Attachment filename for a downloaded copy of the active cert. */
export function activeCertDownloadName(mode: CertMigrationDecision): string {
  return mode === "use-root-ca" ? "omniroute-mitm-ca.crt" : "omniroute-mitm.crt";
}

/**
 * Operator-facing "cert missing" message for the active model. Under the
 * root-CA model the CA is minted when the bridge starts
 * (`loadOrCreateMitmCa()` in `startMitmInternal()`) — the normal first-run
 * path, which also trusts it. `cert/regenerate` now mints/rotates the CA too
 * (`cert/regenerate.ts`) but does not trust it, so the message keeps pointing
 * at starting the bridge.
 */
export function activeCertMissingMessage(mode: CertMigrationDecision): string {
  return mode === "use-root-ca"
    ? 'Root CA certificate not found. Start the AgentBridge server once to generate it (POST /api/tools/agent-bridge/server with {"action":"start"}).'
    : "Certificate not found. Generate one first via POST /api/tools/agent-bridge/cert/regenerate";
}
