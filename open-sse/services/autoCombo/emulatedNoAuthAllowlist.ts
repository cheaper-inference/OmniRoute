import { NOAUTH_PROVIDERS } from "@/shared/constants/providers";

type NoAuthCatalogEntry = (typeof NOAUTH_PROVIDERS)[keyof typeof NOAUTH_PROVIDERS];

/**
 * Auto-discover the no-auth (keyless) providers permitted to enter the
 * `auto`/`auto-*` candidate pool: every NOAUTH_PROVIDERS entry that opted into
 * prompt-emulated tool calling (`toolCalling: "emulated"` and `noAuth: true`).
 *
 * Those backends answer without any configuration, and their tool calls are
 * executed by the 3rd-party CLI (Claude Code, Codex, Cursor…) — the free
 * provider only emits the call markers, which the CLI parses and runs.
 *
 * Discovered from the catalog, so there is no hardcoded id list to maintain:
 * adding `toolCalling: "emulated"` to a NOAUTH_PROVIDERS entry admits it, and
 * removing the flag takes it back out (the transport gate below can also hold
 * one back). Providers without the flag stay fully usable via direct
 * `<alias>/<model>` calls — they are just not auto-routed to.
 *
 * Transport gate (2026-10-16, log evidence; default-off flag
 * AUTO_COMBO_KEYLESS_TRANSPORT_GATE): a provider must ALSO be able to answer over
 * the network by itself. Two catalog flags mark the transports that cannot:
 * `browserBacked` (its executor drives a local Playwright/Chromium page — always,
 * or whenever the browser pool is enabled) and `isLocalCli` (its executor spawns a
 * locally-installed CLI). Both are read from the catalog, so this file holds no id
 * list. Auto-routing to one of them can stall the combo until the per-target
 * timeout (~120s) fires before the next member is tried. With the flag on they stay
 * out of the keyless auto pool; with it off (default) the pool is unchanged. Direct
 * `<alias>/<model>` calls keep working either way.
 *
 * History (operator decision 2026-07-24, refs #8183/#6453/#7032): the pool used
 * to be a hardcoded `{opencode}` allowlist aimed at public-HTTP-egress
 * reliability for category/tier and flat-variant `auto/*` pools, not
 * `auto/<family>` pools (`bypassAllowlist` in virtualFactory.ts). The owner
 * accepted expanding that pool to every no-auth provider with emulated tool
 * calling; the opt-in 2026-10-16 transport gate above can trim the
 * infra-dependent members back out.
 */
/** Default-off feature flag (#17036) that holds infra-dependent keyless transports out. */
export const AUTO_COMBO_KEYLESS_TRANSPORT_GATE_FLAG = "AUTO_COMBO_KEYLESS_TRANSPORT_GATE";

// The server feature-flag resolver (DB override > env > definition default) is
// published on globalThis by src/shared/utils/featureFlagResolverBridge.ts under
// this process-wide symbol. Reading it here keeps open-sse free of a new src
// import (boundary ratchet), the same way executors/base/redactThinkingBeta.ts does.
const FEATURE_FLAG_RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");

type EnvLike = Record<string, string | undefined>;

/** True only when the operator enabled AUTO_COMBO_KEYLESS_TRANSPORT_GATE; fails closed. */
export function isKeylessTransportGateEnabled(env: EnvLike = process.env): boolean {
  try {
    const resolver = (globalThis as Record<symbol, unknown>)[FEATURE_FLAG_RESOLVER_KEY];
    if (typeof resolver === "function") {
      return (
        (resolver as (key: string) => boolean)(AUTO_COMBO_KEYLESS_TRANSPORT_GATE_FLAG) === true
      );
    }
    const raw = env[AUTO_COMBO_KEYLESS_TRANSPORT_GATE_FLAG];
    return raw === "true" || raw === "1" || raw === "yes";
  } catch {
    return false;
  }
}

function isEmulatedNoAuthProvider(
  providerDef: NoAuthCatalogEntry
): providerDef is NoAuthCatalogEntry & { id: string; toolCalling: "emulated" } {
  return (
    providerDef.noAuth === true &&
    "toolCalling" in providerDef &&
    providerDef.toolCalling === "emulated" &&
    typeof providerDef.id === "string" &&
    providerDef.id.length > 0
  );
}

/**
 * Keyless transports that need a local browser or a local CLI bridge, so they
 * cannot serve a request on their own. Both flags are declared on the catalog
 * entry, so there is no id list here.
 */
function isInfraDependentTransport(providerDef: NoAuthCatalogEntry): boolean {
  if ("isLocalCli" in providerDef && providerDef.isLocalCli === true) return true;
  return "browserBacked" in providerDef && providerDef.browserBacked === true;
}

/**
 * Ids admitted to category/tier and flat-variant `auto/*` pools. `transportGate`
 * additionally drops the browser-backed and local-CLI transports.
 */
export function getEmulatedToolCallingNoAuthProviders({
  transportGate = false,
}: { transportGate?: boolean } = {}): Set<string> {
  const emulated = new Set<string>();
  for (const providerDef of Object.values(NOAUTH_PROVIDERS)) {
    if (!isEmulatedNoAuthProvider(providerDef)) continue;
    if (transportGate && isInfraDependentTransport(providerDef)) continue;
    emulated.add(providerDef.id);
  }
  return emulated;
}

/** Cached at module load; a catalog flag change is visible on the next process start. */
export const EMULATED_TOOL_CALLING_NOAUTH_PROVIDERS: ReadonlySet<string> =
  getEmulatedToolCallingNoAuthProviders();

const TRANSPORT_GATED_NOAUTH_PROVIDERS: ReadonlySet<string> = getEmulatedToolCallingNoAuthProviders(
  { transportGate: true }
);

/**
 * The keyless auto pool for this request. The flag is read per call, so toggling
 * AUTO_COMBO_KEYLESS_TRANSPORT_GATE takes effect without a restart.
 */
export function getAutoRoutableEmulatedNoAuthProviders(): ReadonlySet<string> {
  return isKeylessTransportGateEnabled()
    ? TRANSPORT_GATED_NOAUTH_PROVIDERS
    : EMULATED_TOOL_CALLING_NOAUTH_PROVIDERS;
}
