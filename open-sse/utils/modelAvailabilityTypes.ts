export type ModelAvailabilityConnection = Readonly<{
  providerId: string;
  connectionId: string;
  connectionRevision: string;
}>;

export type ModelAvailabilityScope = ModelAvailabilityConnection &
  Readonly<{
    endpointKind: "chat_completions" | "responses";
    modelId: string;
  }>;

export type ModelAvailabilityObservation = {
  startedAtMs: number;
  observedAtMs: number;
} & ({ kind: "explicit_model_not_found"; requestId: string } | { kind: "accepted" });

export type ModelAvailabilityDispatch = (
  url: string,
  init: RequestInit,
  dispatch: () => Promise<Response>
) => Promise<Response>;

export type ModelAvailabilityObserver = (
  provider: string,
  requestId: string,
  selected: Record<string, unknown>,
  executed: Record<string, unknown>
) => ModelAvailabilityDispatch | undefined;
