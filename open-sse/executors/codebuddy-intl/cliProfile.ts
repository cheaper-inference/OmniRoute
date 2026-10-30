import {
  getRuntimeArch,
  getRuntimePlatform,
  getRuntimeVersion,
  normalizeStainlessArch,
  normalizeStainlessPlatform,
} from "../../config/providerHeaderProfiles.ts";
import { PURPOSE_POLICY, type AgentPurpose } from "./context.ts";

/**
 * CodeBuddy International CLI client profile (CLI/2.175.0).
 *
 * Every constant here is a captured value from the official CLI's wire traffic.
 * Keep the profile in ONE place: the executor, the report envelope and the OTLP
 * resource all derive their identity from this module, so a version bump cannot
 * leave half the surfaces advertising the old client.
 */

export const CODEBUDDY_INTL_CLI = {
  /** `CLI/2.175.0 CodeBuddy/2.175.0` */
  userAgent: "CLI/2.175.0 CodeBuddy/2.175.0",
  version: "2.175.0",
  product: "CodeBuddy",
  domain: "www.codebuddy.ai",
  ideName: "CLI",
  ideType: "CLI",
} as const;

export const CODEBUDDY_INTL_CLI_USER_AGENT = CODEBUDDY_INTL_CLI.userAgent;

/** OTLP `service.name` captured on `/v1/traces`. */
export const CODEBUDDY_INTL_SERVICE_NAME = `CodeBuddy-CLI-${CODEBUDDY_INTL_CLI.version}`;

/**
 * Stainless SDK fingerprint sent by the CLI.
 *
 * `x-stainless-retry-count` is the HTTP attempt counter, derived from the
 * operation context so a retried turn reports the attempt that is really on the
 * wire (`0` on the first try, `1` on the first retry, …).
 *
 * The os/arch/runtime values are the ONLY ones the gateway does not require to
 * be a fixed literal: the captured CLI happens to be a Windows x64 node build,
 * but hardcoding that here would make every OmniRoute deployment claim to be
 * that host. They are derived from the running process instead, which is both
 * truthful and keeps the shape the gateway expects. `x-stainless-lang` and
 * `x-stainless-package-version` stay pinned: they identify the SDK, not the host.
 */
export function buildCodeBuddySdkHeaders(
  options: { attempt?: number } = {}
): Record<string, string> {
  const attempt = Math.max(1, options.attempt ?? 1);
  return {
    "x-stainless-lang": "js",
    "x-stainless-os": normalizeStainlessPlatform(),
    "x-stainless-arch": normalizeStainlessArch(),
    "x-stainless-runtime": "node",
    "x-stainless-runtime-version": getRuntimeVersion(),
    "x-stainless-package-version": "6.25.0",
    "x-stainless-retry-count": String(attempt - 1),
  };
}

/** Raw runtime triple, exported for tests and diagnostics. */
export function codeBuddyRuntimeFingerprint(): { platform: string; arch: string; version: string } {
  return {
    platform: getRuntimePlatform(),
    arch: getRuntimeArch(),
    version: getRuntimeVersion(),
  };
}

function assertPurpose(purpose: string): asserts purpose is AgentPurpose {
  if (!Object.prototype.hasOwnProperty.call(PURPOSE_POLICY, purpose)) {
    throw new Error(`unknown CodeBuddy agent purpose: ${purpose}`);
  }
}

/**
 * Chat/inference headers. Correlation headers are layered on top by the
 * executor from the request context — this function only owns the static
 * client identity and the agent classification.
 */
export function buildCodeBuddyCliHeaders(
  options: { purpose: AgentPurpose; attempt?: number } = { purpose: "conversation" }
): Record<string, string> {
  const { purpose } = options;
  assertPurpose(purpose);
  const policy = PURPOSE_POLICY[purpose];

  return {
    "User-Agent": CODEBUDDY_INTL_CLI_USER_AGENT,
    Accept: "application/json",
    "Accept-Encoding": "gzip",
    "Content-Type": "application/json",
    "X-Agent-Intent": "craft",
    "X-Agent-Runtime": "other",
    "X-Agent-Type": policy.agentType,
    "X-Agent-Purpose": purpose,
    "X-IDE-Name": CODEBUDDY_INTL_CLI.ideName,
    "X-IDE-Type": CODEBUDDY_INTL_CLI.ideType,
    "X-IDE-Version": CODEBUDDY_INTL_CLI.version,
    "X-Private-Data": "false",
    "X-Domain": CODEBUDDY_INTL_CLI.domain,
    "X-Product": "SaaS",
    "x-requested-with": "XMLHttpRequest",
    ...buildCodeBuddySdkHeaders({ attempt: options.attempt }),
  };
}

/**
 * Auth/login headers. The captured auth requests carry NO conversation family
 * and NO IDE identity — only the CLI user-agent and the no-auth flags.
 */
export function buildCodeBuddyAuthHeaders(): Record<string, string> {
  return {
    "User-Agent": CODEBUDDY_INTL_CLI_USER_AGENT,
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "X-Domain": CODEBUDDY_INTL_CLI.domain,
    "X-No-Authorization": "true",
    "X-No-User-Id": "true",
    "X-Product": "SaaS",
  };
}

/** `/v2/report` batch headers: authenticated CLI JSON, no conversation family. */
export function buildCodeBuddyTelemetryHeaders(): Record<string, string> {
  return {
    "User-Agent": CODEBUDDY_INTL_CLI_USER_AGENT,
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-IDE-Name": CODEBUDDY_INTL_CLI.ideName,
    "X-IDE-Type": CODEBUDDY_INTL_CLI.ideType,
    "X-IDE-Version": CODEBUDDY_INTL_CLI.version,
    "X-Domain": CODEBUDDY_INTL_CLI.domain,
    "X-Product": "SaaS",
  };
}
