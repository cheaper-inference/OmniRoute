import { registerNoAuthReadiness } from "@omniroute/open-sse/services/autoCombo/noAuthReadiness.ts";
import { BROWSER_BACKED_NOAUTH_PROVIDER_IDS } from "@omniroute/open-sse/services/autoCombo/emulatedNoAuthAllowlist.ts";
import { canSolveDuckDuckGoChallenge } from "@omniroute/open-sse/executors/duckduckgo-web/solverGate.ts";
import {
  hasPlaywrightChromium,
  resolveChromiumOverride,
  resolveCloudflareChromiumOverride,
} from "@omniroute/open-sse/utils/playwrightChromium.ts";
import {
  getBinaryGatedLocalCliProviderIds,
  getUnavailableLocalCliProviderKeys,
} from "@/shared/services/localCliAvailability";
import { peekDevinAgenticAuthStatus } from "./devinAgenticAuthStatus";

/**
 * Registers the app-layer readiness probes consulted by the auto-combo no-auth pool
 * (#15446). Called once at server boot (`registerNodejs`). The Devin probe is a
 * non-blocking cached read: when the cached status is missing or older than 60 s it
 * starts ONE background `devin auth status` spawn, so `devin-cli-agentic` joins the
 * auto/* pools only after the isolated login has been confirmed.
 *
 * The local CLIs that localCliAvailability can check (auggie, zcode) stay out of every
 * pool, family pools included, while their binary is missing on this host: the same
 * cached verdict that hides them from /v1/models (#18753). Providers it does not check
 * (codex-app-server) stay fail-open, because the CLI may run elsewhere. Browser
 * runtime availability (#19385) is checked at boot and read from memory per request.
 * duckduckgo-web also needs a challenge solver it may use: the browser pool, or the
 * in-process one the operator opted into (open-sse/executors/duckduckgo-web/solverGate.ts).
 */
export async function registerNoAuthAutoRoutingReadiness(): Promise<void> {
  registerNoAuthReadiness(
    "devin-cli-agentic",
    () => peekDevinAgenticAuthStatus() === "authenticated"
  );
  for (const providerId of getBinaryGatedLocalCliProviderIds()) {
    registerNoAuthReadiness(
      providerId,
      () => !getUnavailableLocalCliProviderKeys().has(providerId)
    );
  }
  await Promise.all(
    [...BROWSER_BACKED_NOAUTH_PROVIDER_IDS].map(async (providerId) => {
      const executablePath =
        providerId === "cloudflare-playground"
          ? resolveCloudflareChromiumOverride()
          : resolveChromiumOverride();
      const available = await hasPlaywrightChromium(executablePath);
      if (providerId === "duckduckgo-web") {
        registerNoAuthReadiness(providerId, () => available && canSolveDuckDuckGoChallenge());
        return;
      }
      registerNoAuthReadiness(providerId, () => available);
    })
  );
}
