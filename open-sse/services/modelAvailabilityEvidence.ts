import { z } from "zod";
import { wasProviderResponseRedirected } from "../executors/dispatchPin.ts";
import { readErrorBodyText } from "../utils/error.ts";
import type {
  ModelAvailabilityConnection,
  ModelAvailabilityDispatch,
  ModelAvailabilityObservation,
  ModelAvailabilityScope,
} from "../utils/modelAvailabilityTypes.ts";

const modelErrorEnvelope = z.object({
  error: z.object({
    code: z.literal("model_not_found").nullable().optional(),
    type: z.enum(["invalid_request_error", "model_not_found", "not_found_error"]).optional(),
    resource_type: z.literal("model").optional(),
    param: z.string().nullable().optional(),
    model: z.string().optional(),
    message: z.string().optional(),
  }),
});
const wireBody = z.object({ model: z.string().min(1) });

function isExplicitAbsenceMessage(message: string, modelId: string): boolean {
  const match =
    /^(?:the )?model\s+['"`]([^'"`]+)['"`]\s+(?:does not exist|was not found|not found)\.?$/i.exec(
      message.trim()
    );
  return match?.[1] === modelId;
}

export function classifyModelAbsence(
  status: number,
  body: unknown,
  wireModelId: string
): "explicit_model_not_found" | null {
  if (status !== 404 || !wireModelId) return null;
  const parsed = modelErrorEnvelope.safeParse(body);
  if (!parsed.success) return null;
  const { code, type, param, model, message } = parsed.data.error;
  if (param != null && param !== "model") return null;
  if (model !== undefined && model !== wireModelId) return null;
  if (message)
    return isExplicitAbsenceMessage(message, wireModelId) ? "explicit_model_not_found" : null;
  return model === wireModelId && (code === "model_not_found" || type === "model_not_found")
    ? "explicit_model_not_found"
    : null;
}

export function endpointKindFromPath(
  path: string
): ModelAvailabilityScope["endpointKind"] | undefined {
  if (/\/chat\/completions\/?$/.test(path)) return "chat_completions";
  if (/\/responses\/?$/.test(path)) return "responses";
}

export function endpointKindFromUrl(
  url: string
): ModelAvailabilityScope["endpointKind"] | undefined {
  const parsed = URL.parse(url);
  return parsed ? endpointKindFromPath(parsed.pathname) : undefined;
}

type RecordObservation = (
  scope: ModelAvailabilityScope,
  observation: ModelAvailabilityObservation
) => void;
type AcceptedEvidence = {
  scope: ModelAvailabilityScope;
  startedAtMs: number;
  record: RecordObservation;
};
const acceptedEvidence = new WeakMap<Response, AcceptedEvidence>();

function readWireModel(body: RequestInit["body"]): string | null {
  if (typeof body !== "string") return null;
  try {
    const parsed = wireBody.safeParse(JSON.parse(body));
    return parsed.success ? parsed.data.model : null;
  } catch {
    return null;
  }
}

async function hasExplicitModelAbsence(response: Response, modelId: string): Promise<boolean> {
  try {
    const body: unknown = JSON.parse(await readErrorBodyText(response.clone()));
    return classifyModelAbsence(response.status, body, modelId) !== null;
  } catch {
    return false;
  }
}

async function recordRawModelAbsence({
  response,
  scope,
  requestId,
  startedAtMs,
  signal,
  record,
}: {
  response: Response;
  scope: ModelAvailabilityScope;
  requestId: string;
  startedAtMs: number;
  signal: AbortSignal | null | undefined;
  record: RecordObservation;
}): Promise<void> {
  if (response.status !== 404) return;
  if (!(await hasExplicitModelAbsence(response, scope.modelId)) || signal?.aborted) return;
  record(scope, {
    kind: "explicit_model_not_found",
    requestId,
    startedAtMs,
    observedAtMs: Date.now(),
  });
}

/** Wrap only the real source response, before transport retries or response restatement. */
export function createModelAvailabilityDispatch({
  connection,
  apiKey,
  requestId,
  resolveEndpoint,
  isProbe,
  isEnabled,
  isCurrentConnection,
  record,
}: {
  connection: ModelAvailabilityConnection;
  apiKey: string;
  requestId: string;
  resolveEndpoint: (model: string) => string;
  isProbe: () => boolean;
  isEnabled: () => boolean;
  isCurrentConnection: (connection: ModelAvailabilityConnection) => boolean;
  record: RecordObservation;
}): ModelAvailabilityDispatch {
  return async (url, init, dispatch) => {
    const modelId = readWireModel(init.body);
    const endpointKind = endpointKindFromUrl(url);
    if (
      !modelId ||
      !endpointKind ||
      !isEnabled() ||
      new Headers(init.headers).get("authorization") !== `Bearer ${apiKey}` ||
      !isCurrentConnection(connection) ||
      resolveEndpoint(modelId) !== url
    ) {
      return dispatch();
    }

    const scope = { ...connection, endpointKind, modelId };
    const startedAtMs = Date.now();
    const response = await dispatch();
    if (wasProviderResponseRedirected(response) || init.signal?.aborted) return response;
    if (response.ok) acceptedEvidence.set(response, { scope, startedAtMs, record });
    else if (!isProbe()) {
      await recordRawModelAbsence({
        response,
        scope,
        requestId,
        startedAtMs,
        signal: init.signal,
        record,
      });
    }
    return response;
  };
}

export function inheritModelAvailabilityEvidence(from: Response, to: Response): Response {
  const evidence = acceptedEvidence.get(from);
  if (evidence && from !== to) {
    acceptedEvidence.delete(from);
    acceptedEvidence.set(to, evidence);
  }
  return to;
}

export function acceptModelAvailabilityResponse(response: Response | null | undefined): void {
  if (!response) return;
  const evidence = acceptedEvidence.get(response);
  if (!evidence) return;
  acceptedEvidence.delete(response);
  evidence.record(evidence.scope, {
    kind: "accepted",
    startedAtMs: evidence.startedAtMs,
    observedAtMs: Date.now(),
  });
}
