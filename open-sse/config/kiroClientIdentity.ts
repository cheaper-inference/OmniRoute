/**
 * Kiro client identity: the one place that decides which Kiro IDE OmniRoute presents itself
 * as. Every Kiro request (inference, model catalog, usage, profile discovery, the API-key
 * import probe) builds its User-Agent here, so a Kiro version-floor bump is a one-line change
 * (or, without a release, `KIRO_IDE_VERSION` in the environment).
 *
 * Shape, copied from Kiro IDE 1.4.178 (agent extension 1.1.939): the AWS SDK User-Agent with
 * `KiroIDE-<version>-<machineId>` appended, the same identity on the runtime (catalog, usage)
 * and streaming (inference) clients. The IDE's machineId is the node-machine-id hash of the
 * host; OmniRoute derives one per connection instead, so accounts on one install do not all
 * share one device.
 *
 * Kiro's version gate (since 2026-11-09, kirodotdev/Kiro#11335; floor 0.12.291 from
 * 2027-01-15, kirodotdev/Kiro#11966) reads the User-Agent only. Live 2026-11-16 (IdC,
 * us-east-1): `KiroIDE-1.4.178` passes with no suffix, a 64-hex suffix or the IDE's own
 * `UNDETERMINED_MACHINE_ID` fallback, so the machineId is for fidelity, not for the gate.
 *
 * No Node built-ins here: the provider registry imports this module through
 * providerHeaderProfiles.ts. The per-connection machineId lives in services/kiroMachineId.ts.
 */

/** Kiro IDE release OmniRoute identifies as. Bump when Kiro raises its floor. */
export const KIRO_IDE_VERSION_PIN = "1.4.178";

/** Message Kiro answers to a client below its version floor (403 until 2026-11-12, then 400). */
export const KIRO_VERSION_GATE_TEXT = "This version of Kiro is no longer supported";

const KIRO_IDE_VERSION_ENV = "KIRO_IDE_VERSION";
const DOTTED_TRIPLE = /^\d+\.\d+\.\d+$/;
const KIRO_IDE_TAG = /KiroIDE-(\d+\.\d+\.\d+)/;

const SDK_PREFIX = "aws-sdk-js/1.0.0 ua/2.1 os/windows#10.0.26200 lang/js md/nodejs#22.21.1";

/** AWS SDK client the request mirrors: `runtime` (catalog, usage) or `streaming` (inference). */
export type KiroSdkClient = "runtime" | "streaming";

const SDK_CLIENT_SUFFIX: Record<KiroSdkClient, string> = {
  runtime: "api/codewhispererruntime#1.0.0 m/N,E",
  streaming: "api/codewhispererstreaming#1.0.0 m/E",
};

function compareTriples(left: string, right: string): number {
  const l = left.split(".").map(Number);
  const r = right.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (l[i] !== r[i]) return l[i] - r[i];
  }
  return 0;
}

/**
 * The Kiro IDE version to advertise. `KIRO_IDE_VERSION` wins only when it is a dotted triple
 * newer than the pin: Kiro only ever raises its floor, so an older value is a stale `.env`
 * entry that would pin a rejected identity. Read on every call, so a restart is enough.
 */
export function getKiroIdeVersion(): string {
  const raw = process.env.KIRO_IDE_VERSION?.trim();
  if (raw && DOTTED_TRIPLE.test(raw) && compareTriples(raw, KIRO_IDE_VERSION_PIN) > 0) {
    return raw;
  }
  return KIRO_IDE_VERSION_PIN;
}

/** `User-Agent` + `X-Amz-User-Agent` for a Kiro request. */
export function buildKiroUserAgentHeaders(
  options: { client?: KiroSdkClient; machineId?: string; version?: string } = {}
): { "User-Agent": string; "X-Amz-User-Agent": string } {
  const { client = "streaming", machineId, version = getKiroIdeVersion() } = options;
  const tag = machineId ? `KiroIDE-${version}-${machineId}` : `KiroIDE-${version}`;
  return {
    "User-Agent": `${SDK_PREFIX} ${SDK_CLIENT_SUFFIX[client]} ${tag}`,
    "X-Amz-User-Agent": `aws-sdk-js/1.0.0 ${tag}`,
  };
}

/** The `KiroIDE-<x.y.z>` version a User-Agent carries, if any. */
export function kiroUserAgentIdeVersion(userAgent: unknown): string | null {
  return String(userAgent ?? "").match(KIRO_IDE_TAG)?.[1] ?? null;
}

/**
 * A `<PROVIDER>_USER_AGENT` override for Kiro, or null when it must not be used. Honored only
 * when it carries a `KiroIDE-<version>` newer than the pin. `.env.example` shipped
 * `KIRO_USER_AGENT` uncommented (`kiro-ide/1.0.0`, later `KiroIDE-1.4.121`), so existing
 * `.env` files carry identities the version gate rejects; a UA without a Kiro IDE tag fails
 * the gate on q.<region> and codewhisperer.us-east-1 as well.
 */
export function resolveKiroUserAgentOverride(envValue: string | undefined): string | null {
  const ua = envValue?.trim();
  if (!ua) return null;
  const version = kiroUserAgentIdeVersion(ua);
  if (!version || compareTriples(version, KIRO_IDE_VERSION_PIN) <= 0) return null;
  return ua;
}

/** Log line for a version-gate rejection: what was sent and how to recover. */
export function kiroVersionGateHint(userAgent: unknown): string {
  const sent = kiroUserAgentIdeVersion(userAgent);
  return (
    `Kiro rejected the client identity ${sent ? `KiroIDE-${sent}` : "(no KiroIDE version)"} ` +
    `("${KIRO_VERSION_GATE_TEXT}"). Set ${KIRO_IDE_VERSION_ENV} to the current Kiro IDE ` +
    "release (https://kiro.dev/changelog/ide) and restart, or upgrade OmniRoute."
  );
}
