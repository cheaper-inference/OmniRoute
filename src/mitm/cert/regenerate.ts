import fs from "fs";
import path from "path";
import { resolveActiveMitmCert } from "./activeCert.ts";
import { generateCert } from "./generate.ts";
import { rotateMitmCa } from "./rootCa.ts";

// Single "regenerate the MITM cert" implementation shared by
// POST /api/tools/agent-bridge/cert/regenerate, the dashboard's
// POST /api/tools/agent-bridge/server {action:"regenerate-cert"} and
// POST /api/settings/mitm {action:"regenerate-cert"}.
//
// All three used to mint the legacy leaf (`server.crt`/`server.key`)
// whatever model was active: a root-CA install never got its `ca.crt`
// rotated, and a fresh install got a legacy pair — which
// `decideCertMigration()` then reads as a legacy install, silently switching
// the cert model. Regeneration must never change the model, so it follows
// the active decision:
//
//   - "use-legacy-leaf": re-mint the leaf (`generateCert({ force: true })`).
//     The running server keeps the old leaf until it restarts.
//   - "use-root-ca": rotate the root CA. The server loads the CA once at
//     start (`server.cjs` → `loadRootCaSslOptions()`), so rotation is refused
//     while it runs. A currently trusted CA is untrusted FIRST — if that
//     cannot be done, the rotation is aborted rather than leaving a CA
//     trusted on the host whose files no longer exist on disk.

/**
 * Trust-store operations, injected so callers pass the
 * `@/mitm/cert/install` import (aliased to a stub in minimal builds) and
 * tests can run without touching the host trust store.
 */
export interface RegenerateTrustDeps {
  checkCertInstalled(certPath: string): Promise<boolean>;
  uninstallCert(sudoPassword: string, certPath: string): Promise<void>;
  isSudoPasswordRequired(sudoPassword: string): boolean;
}

export interface RegenerateOptions {
  sudoPassword: string;
  /** Whether the AgentBridge MITM server is running right now. */
  running: boolean;
}

/** A refused/failed regeneration (nothing was rotated or minted). */
export interface RegenerateFailure {
  ok: false;
  status: 400 | 409 | 500;
  message: string;
}

export type RegenerateResult =
  | {
      ok: true;
      mode: "use-legacy-leaf";
      certPath: string;
      keyPath: string;
      restartRequired: boolean;
    }
  | {
      ok: true;
      mode: "use-root-ca";
      certPath: string;
      keyPath: string;
      restartRequired: false;
      previousCaUntrusted: boolean;
      trustRequired: true;
      message: string;
    }
  | RegenerateFailure;

/**
 * Narrow a {@link RegenerateResult} to its failure branch. The repo compiles
 * with `strict: false`, where `if (!result.ok)` does not narrow the union.
 */
export function isRegenerateFailure(
  result: RegenerateResult | { ok: true; untrusted: boolean }
): result is RegenerateFailure {
  return result.ok === false;
}

const ROTATED_MESSAGE =
  "Root CA rotated. Every client that trusted the previous CA must trust the new one: " +
  "start the AgentBridge server with your sudo password (it trusts the active CA on start) " +
  "or POST /api/tools/agent-bridge/cert, and re-import GET /api/tools/agent-bridge/cert/download " +
  "into any client or device you trusted by hand.";

async function untrustCurrentCa(
  caCertPath: string,
  sudoPassword: string,
  deps: RegenerateTrustDeps
): Promise<{ ok: true; untrusted: boolean } | RegenerateFailure> {
  if (!fs.existsSync(caCertPath) || !(await deps.checkCertInstalled(caCertPath))) {
    return { ok: true, untrusted: false };
  }
  if (deps.isSudoPasswordRequired(sudoPassword)) {
    return {
      ok: false,
      status: 400,
      message:
        "The current root CA is trusted on this host. Supply sudoPassword so it can be untrusted " +
        "before rotation (or untrust it first via DELETE /api/tools/agent-bridge/cert).",
    };
  }
  try {
    await deps.uninstallCert(sudoPassword, caCertPath);
  } catch {
    return {
      ok: false,
      status: 500,
      message:
        "Could not untrust the current root CA, so it was not rotated (rotating would leave the " +
        "old CA trusted). Untrust it via DELETE /api/tools/agent-bridge/cert and retry.",
    };
  }
  if (await deps.checkCertInstalled(caCertPath)) {
    return {
      ok: false,
      status: 500,
      message:
        "The current root CA is still trusted after the untrust attempt, so it was not rotated. " +
        "Remove it from the system trust store manually and retry.",
    };
  }
  return { ok: true, untrusted: true };
}

/** Regenerate the active MITM cert without ever changing the cert model. */
export async function regenerateActiveMitmCert(
  options: RegenerateOptions,
  deps: RegenerateTrustDeps
): Promise<RegenerateResult> {
  const { certPath, mode } = resolveActiveMitmCert();

  if (mode === "use-legacy-leaf") {
    // #10467: force — an existing leaf must actually be replaced.
    const leaf = await generateCert({ force: true });
    return {
      ok: true,
      mode,
      certPath: leaf.cert,
      keyPath: leaf.key,
      restartRequired: options.running,
    };
  }

  if (options.running) {
    return {
      ok: false,
      status: 409,
      message:
        "Stop the AgentBridge server before rotating the root CA — it keeps signing with the CA " +
        "it loaded at start.",
    };
  }

  const untrust = await untrustCurrentCa(certPath, options.sudoPassword, deps);
  if (isRegenerateFailure(untrust)) return untrust;

  const ca = await rotateMitmCa(path.dirname(certPath));
  return {
    ok: true,
    mode,
    certPath: ca.certPath,
    keyPath: ca.keyPath,
    restartRequired: false,
    previousCaUntrusted: untrust.ok && untrust.untrusted,
    trustRequired: true,
    message: ROTATED_MESSAGE,
  };
}
