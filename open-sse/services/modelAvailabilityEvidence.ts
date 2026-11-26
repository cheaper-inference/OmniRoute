import { z } from "zod";
import {
  isCurrentModelAvailabilityConnection,
  recordModelAvailabilityObservation,
  type ModelAvailabilityObservation,
  type ModelAvailabilityScope,
} from "@/lib/db/modelAvailability";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import { isProbeContext } from "@/shared/utils/probeOrigin";
import { warn } from "@/sse/utils/logger";
import { wasProviderResponseRedirected } from "../executors/dispatchPin.ts";
import { readErrorBodyText } from "../utils/error.ts";

export type {
  ConfirmedModelUnavailability,
  ModelAvailabilityObservation,
  ModelAvailabilityScope,
} from "@/lib/db/modelAvailability";

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

export function modelAvailabilityEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("MODEL_AVAILABILITY_EVIDENCE_ENABLED");
  } catch {
    warn("MODEL_AVAILABILITY", "Could not resolve the model availability flag");
    return false;
  }
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

export type ModelAvailabilityDispatch = (
  url: string,
  init: RequestInit,
  dispatch: () => Promise<Response>
) => Promise<Response>;

export type ModelAvailabilityConnection = Pick<
  ModelAvailabilityScope,
  "providerId" | "connectionId" | "connectionRevision"
>;

type AcceptedEvidence = { scope: ModelAvailabilityScope; startedAtMs: number };
const acceptedEvidence = new WeakMap<Response, AcceptedEvidence>();

function record(scope: ModelAvailabilityScope, observation: ModelAvailabilityObservation) {
  if (!modelAvailabilityEnabled()) return;
  try {
    recordModelAvailabilityObservation(scope, observation);
  } catch {
    warn("MODEL_AVAILABILITY", "Could not write model availability evidence");
  }
}

export function isModelAvailabilityConnectionCurrent(scope: ModelAvailabilityConnection): boolean {
  try {
    return isCurrentModelAvailabilityConnection(scope);
  } catch {
    warn("MODEL_AVAILABILITY", "Could not check the model availability connection revision");
    return false;
  }
}

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
}: {
  response: Response;
  scope: ModelAvailabilityScope;
  requestId: string;
  startedAtMs: number;
  signal: AbortSignal | null | undefined;
}): Promise<void> {
  if (response.status !== 404 || isProbeContext()) return;
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
  probe,
}: {
  connection: ModelAvailabilityConnection;
  apiKey: string;
  requestId: string;
  resolveEndpoint: (model: string) => string;
  probe: boolean;
}): ModelAvailabilityDispatch {
  return async (url, init, dispatch) => {
    const modelId = readWireModel(init.body);
    const endpointKind = endpointKindFromUrl(url);
    if (
      !modelId ||
      !endpointKind ||
      !modelAvailabilityEnabled() ||
      new Headers(init.headers).get("authorization") !== `Bearer ${apiKey}` ||
      !isModelAvailabilityConnectionCurrent(connection) ||
      resolveEndpoint(modelId) !== url
    ) {
      return dispatch();
    }

    const scope = { ...connection, endpointKind, modelId };
    const startedAtMs = Date.now();
    const response = await dispatch();
    if (wasProviderResponseRedirected(response) || init.signal?.aborted) return response;
    if (response.ok) acceptedEvidence.set(response, { scope, startedAtMs });
    else if (!probe) {
      await recordRawModelAbsence({ response, scope, requestId, startedAtMs, signal: init.signal });
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
  record(evidence.scope, {
    kind: "accepted",
    startedAtMs: evidence.startedAtMs,
    observedAtMs: Date.now(),
  });
}
