import { registerNoAuthReadiness } from "@omniroute/open-sse/services/autoCombo/noAuthReadiness.ts";
import { peekDevinAgenticAuthStatus } from "./devinAgenticAuthStatus";

/**
 * Registers the app-layer readiness probes consulted by the auto-combo no-auth pool
 * (#15446). Called once at server boot (`registerNodejs`). The Devin probe is a
 * non-blocking cached read: when the cached status is missing or older than 60 s it
 * starts ONE background `devin auth status` spawn, so `devin-cli-agentic` joins the
 * auto/* pools only after the isolated login has been confirmed.
 */
export function registerNoAuthAutoRoutingReadiness(): void {
  registerNoAuthReadiness(
    "devin-cli-agentic",
    () => peekDevinAgenticAuthStatus() === "authenticated"
  );
}
