/**
 * Close DEGRADED breakers after a valid connection test. Lives in `src/` (not next to
 * `connectionCircuitBreakerName` in open-sse) so the engine keeps no import of the app's
 * circuit-breaker registry.
 */
import { resolveProviderId } from "@/shared/constants/providers";
import { getCircuitBreaker } from "@/shared/utils/circuitBreaker";
import { connectionCircuitBreakerName } from "@omniroute/open-sse/services/connectionCircuitBreaker.ts";

/**
 * A valid connection test proves the provider answers: close the provider breaker and the
 * tested connection's breaker when they are DEGRADED, since DEGRADED steers traffic away and
 * the successes that would close it may never come. Everything else stays as it is: a CLOSED
 * partial count still wears down one success at a time, and an auth/models probe does not
 * prove the inference path, so only a request probe may settle OPEN or HALF_OPEN.
 * An operator-disabled connection is only tested on explicit request (the health scheduler
 * tests active connections), so its valid probe also counts.
 */
export function clearTestedBreakers(provider: string, connectionId: string): void {
  if (!provider) return;
  getCircuitBreaker(resolveProviderId(provider)).closeDegraded("connection-test");
  getCircuitBreaker(connectionCircuitBreakerName(provider, connectionId)).closeDegraded(
    "connection-test"
  );
}
