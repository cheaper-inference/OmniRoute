import { registerNoAuthReadiness } from "@omniroute/open-sse/services/autoCombo/noAuthReadiness.ts";
import { peekDevinAgenticAuthStatus } from "./devinAgenticAuthStatus";
import { isLocalCliUnavailableOnHost } from "./localCliHostAvailability";

/**
 * Registers the app-layer readiness probes consulted by the auto-combo no-auth pool
 * (#15446). Called once at server boot (`registerNodejs`). The Devin probe is a
 * non-blocking cached read: when the cached status is missing or older than 60 s it
 * starts ONE background `devin auth status` spawn, so `devin-cli-agentic` joins the
 * auto/* pools only after the isolated login has been confirmed. zcode and auggie stay
 * out of every pool (family pools included) while their binary is missing on this host,
 * from the same cached verdict `/v1/models` uses to hide them.
 */
export function registerNoAuthAutoRoutingReadiness(): void {
  registerNoAuthReadiness(
    "devin-cli-agentic",
    () => peekDevinAgenticAuthStatus() === "authenticated"
  );
  for (const providerId of ["zcode", "auggie"]) {
    registerNoAuthReadiness(providerId, () => !isLocalCliUnavailableOnHost(providerId));
  }
}
