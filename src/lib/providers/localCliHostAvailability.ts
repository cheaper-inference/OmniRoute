import { resolveAppServerConfig } from "@omniroute/open-sse/executors/codex/appServerConfig.ts";
import { buildDevinChildEnv } from "@omniroute/open-sse/executors/devin-cli-agentic";
import { detectLocalCliProvider } from "../../../bin/cli/utils/localCliAvailability.mjs";

/**
 * Server-side verdict on whether an `isLocalCli` no-auth provider can run on THIS host.
 * Binary discovery for zcode/auggie reuses the CLI's detector (the one `setup-claude`
 * uses, #14363); the Codex app-server and Devin bridge verdicts reuse the executors' own
 * config resolvers, so the catalog and the request path cannot disagree.
 *
 * Conservative by design: only a definitive "unavailable" hides anything. A provider
 * without a check here is never reported unavailable.
 */
export type LocalCliHostVerdict = { available: boolean; reason?: string };

const VERDICT_TTL_MS = 15_000;

function checkBinary(providerId: string): LocalCliHostVerdict {
  return detectLocalCliProvider(providerId);
}

// No connection row exists when this runs (callers skip providers that have one), so
// the Codex config can only come from the environment.
function checkCodexAppServer(): LocalCliHostVerdict {
  return resolveAppServerConfig({})
    ? { available: true }
    : { available: false, reason: "app-server transport is not configured (missing url or token)" };
}

function checkDevinBridge(): LocalCliHostVerdict {
  try {
    buildDevinChildEnv(undefined as never);
    return { available: true };
  } catch (error) {
    return {
      available: false,
      reason: error instanceof Error ? error.message : "bridge is not configured",
    };
  }
}

const CHECKS: Record<string, () => LocalCliHostVerdict> = {
  zcode: () => checkBinary("zcode"),
  auggie: () => checkBinary("auggie"),
  "codex-app-server": checkCodexAppServer,
  "devin-cli-agentic": checkDevinBridge,
};

const verdictCache = new Map<string, { at: number; verdict: LocalCliHostVerdict }>();

/**
 * Cached verdict (filesystem stats and env reads only, never a process spawn), or null
 * when the provider has no host check.
 */
export function getLocalCliHostVerdict(providerId: string): LocalCliHostVerdict | null {
  const check = CHECKS[providerId];
  if (!check) return null;
  const now = Date.now();
  const cached = verdictCache.get(providerId);
  if (cached && now - cached.at < VERDICT_TTL_MS) return cached.verdict;
  const verdict = check();
  verdictCache.set(providerId, { at: now, verdict });
  return verdict;
}

/** True only when a check exists and definitively reports the provider unusable here. */
export function isLocalCliUnavailableOnHost(providerId: string): boolean {
  return getLocalCliHostVerdict(providerId)?.available === false;
}

/** Test-only: forget cached verdicts so env changes are re-read. */
export function __resetLocalCliHostVerdictsForTests(): void {
  verdictCache.clear();
}
