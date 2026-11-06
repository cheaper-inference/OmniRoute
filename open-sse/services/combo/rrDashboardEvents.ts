/**
 * Dashboard EventBus emitters for the round-robin combo loop (#13089).
 *
 * `roundRobinCombo.ts` is frozen at its file-size cap (#12884), so the
 * `combo.target.attempt` / `combo.target.succeeded` / `combo.target.failed`
 * publishing logic lives here — a factory bound to one target's identity so
 * each call site in the frozen file is a single line.
 *
 * @internal — not part of the public combo.ts barrel.
 */
import { emit } from "../../../src/lib/events/eventBus";

// Single seam from the combo services to the dashboard event bus: other combo modules take `emit`
// from here instead of importing src/ themselves (boundary ratchet, quality-baseline.json).
export { emit };

export interface RRDashboardEvents {
  attempt(): void;
  /** `selected` is the connection that actually served, when the response names one. */
  succeeded(latencyMs: number, selected?: string): void;
  failed(error: string, latencyMs: number, selected?: string): void;
}

/** The connection a target's response names: pooled targets only learn theirs from here. */
export function selectedConnectionIdOf(response: Response): string | undefined {
  return response.headers?.get("X-OmniRoute-Selected-Connection-Id") || undefined;
}

export function createRRDashboardEvents(
  comboName: string,
  targetIndex: number,
  provider: string,
  model: string,
  connectionId?: string | null
): RRDashboardEvents {
  const connectionField = (selected?: string) => {
    const id = selected || connectionId;
    return id ? { connectionId: id } : {};
  };
  return {
    attempt() {
      emit("combo.target.attempt", {
        comboName,
        targetIndex,
        provider,
        model,
        timestamp: Date.now(),
        strategy: "round-robin",
        ...connectionField(),
      });
    },
    succeeded(latencyMs, selected) {
      emit("combo.target.succeeded", {
        comboName,
        targetIndex,
        provider,
        model,
        latencyMs,
        ...connectionField(selected),
      });
    },
    failed(error, latencyMs, selected) {
      emit("combo.target.failed", {
        comboName,
        targetIndex,
        provider,
        model,
        error,
        latencyMs,
        ...connectionField(selected),
      });
    },
  };
}
