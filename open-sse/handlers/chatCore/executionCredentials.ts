/**
 * chatCore execution-credentials resolver (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure builder extracted from handleChatCore: derives the per-execution credentials object from the
 * resolved request context. Applies the native-Codex passthrough endpoint override, forces
 * apiType=responses (and the responses-upstream marker) for Azure AI Foundry / OCI when the model
 * routes to the OpenAI Responses format, synchronizes AgentRouter's per-request alternate protocol,
 * and threads the Claude Code session id when present. Side-effect-free.
 */

import { getKimiCodeStaticThinkingPolicy } from "../../config/providers/registry/kimi/coding/runtime.ts";
import { FORMATS } from "../../translator/formats.ts";

type CredentialsLike =
  | {
      providerSpecificData?: Record<string, unknown> | null;
      [key: string]: unknown;
    }
  | null
  | undefined;

type ResolvedExecutionCredentials = Record<string, unknown> & {
  providerSpecificData: Record<string, unknown>;
};

function buildKimiThinkingMetadata(
  modelInfo: Record<string, unknown> | null | undefined,
  staticThinkingPolicy: ReturnType<typeof getKimiCodeStaticThinkingPolicy>
): Record<string, unknown> {
  const { supportsThinking, supportedThinkingEfforts, defaultThinkingEffort } =
    resolveKimiThinkingPolicyValues(modelInfo, staticThinkingPolicy);
  const metadata: Record<string, unknown> = {};

  if (typeof supportsThinking === "boolean") metadata.supportsThinking = supportsThinking;
  if (modelInfo?.alwaysThinking === true || staticThinkingPolicy?.alwaysThinking === true) {
    metadata.alwaysThinking = true;
  }
  if (supportedThinkingEfforts) metadata.supportedThinkingEfforts = supportedThinkingEfforts;
  if (defaultThinkingEffort) metadata.defaultThinkingEffort = defaultThinkingEffort;
  return metadata;
}

function resolveKimiThinkingPolicyValues(
  modelInfo: Record<string, unknown> | null | undefined,
  staticThinkingPolicy: ReturnType<typeof getKimiCodeStaticThinkingPolicy>
) {
  const supportsThinking =
    typeof modelInfo?.supportsThinking === "boolean"
      ? modelInfo.supportsThinking
      : staticThinkingPolicy?.supportsThinking;
  const supportedThinkingEfforts = Array.isArray(modelInfo?.supportedThinkingEfforts)
    ? modelInfo.supportedThinkingEfforts
    : staticThinkingPolicy?.supportedThinkingEfforts;
  const defaultThinkingEffort =
    typeof modelInfo?.defaultThinkingEffort === "string"
      ? modelInfo.defaultThinkingEffort
      : staticThinkingPolicy?.defaultThinkingEffort;
  return { supportsThinking, supportedThinkingEfforts, defaultThinkingEffort };
}

function applyKimiExecutionMetadata(
  providerSpecificData: Record<string, unknown>,
  provider: string | null | undefined,
  targetFormat: string,
  modelInfo: Record<string, unknown> | null | undefined
): void {
  if (provider !== "kimi-coding" && provider !== "kimi-coding-apikey") return;

  const staticThinkingPolicy = getKimiCodeStaticThinkingPolicy(modelInfo?.model);
  providerSpecificData._omnirouteKimiTargetFormat = targetFormat;
  providerSpecificData._omnirouteKimiThinking = buildKimiThinkingMetadata(
    modelInfo,
    staticThinkingPolicy
  );
}

/** Claude Messages `output_config.effort`; blank or non-string values do not count. */
function claudeOutputEffort(requestBody: Record<string, unknown> | undefined): string | undefined {
  const outputConfig = requestBody?.output_config;
  if (!outputConfig || typeof outputConfig !== "object") return undefined;
  const effort = (outputConfig as Record<string, unknown>).effort;
  return typeof effort === "string" && effort.trim() ? effort : undefined;
}

/** OpenAI Responses `reasoning.effort`. */
function nestedReasoningEffort(requestBody: Record<string, unknown> | undefined): unknown {
  const reasoning = requestBody?.reasoning;
  if (!reasoning || typeof reasoning !== "object") return undefined;
  return (reasoning as Record<string, unknown>).effort;
}

/** Catalog reasoning metadata for the Codex executor (discovered tiers + the caller's raw effort). */
function buildCodexThinkingMetadata(
  provider: string | null | undefined,
  modelInfo: Record<string, unknown> | null | undefined,
  requestBody: Record<string, unknown> | undefined
): Record<string, unknown> | null {
  if (provider !== "codex") return null;
  const hasCatalog = Array.isArray(modelInfo?.supportedThinkingEfforts);
  const claudeEffort = claudeOutputEffort(requestBody);
  const nestedEffort = nestedReasoningEffort(requestBody);
  const requestedThinkingEffort = claudeEffort ?? nestedEffort ?? requestBody?.reasoning_effort;
  if (!hasCatalog && requestedThinkingEffort === undefined) return null;
  return {
    ...(hasCatalog
      ? {
          model: modelInfo?.model,
          supportedThinkingEfforts: modelInfo?.supportedThinkingEfforts,
          defaultThinkingEffort: modelInfo?.defaultThinkingEffort,
          resolvedThinkingEffort: modelInfo?.resolvedThinkingEffort,
        }
      : {}),
    ...(requestedThinkingEffort !== undefined ? { requestedThinkingEffort } : {}),
  };
}

function shouldSurfaceRequestTargetFormat(
  provider: string | null | undefined,
  targetFormat: string
): boolean {
  switch (provider) {
    // #7364: Z.ai and GLM Coding default to Claude Messages. Surface the per-model
    // OpenAI override so DefaultExecutor.buildUrl() can select the compatible endpoint.
    case "zai":
    case "glm-coding-apikey":
      return targetFormat === FORMATS.OPENAI;
    // AgentRouter uses distinct URLs and auth schemes for Claude, OpenAI Chat, and
    // OpenAI Responses. Keep the selected protocol request-local.
    case "agentrouter":
      return targetFormat === FORMATS.OPENAI || targetFormat === FORMATS.OPENAI_RESPONSES;
    // Cheaper Inference uses the request-local format for its URL, headers, and body transform.
    case "cheaperinference":
      return true;
    // GitHub Copilot's executor consults the static model registry, so it needs the
    // per-model override to route custom Codex models to the native /responses endpoint.
    case "github":
    case "ghe-copilot":
      return targetFormat === FORMATS.OPENAI_RESPONSES;
    default:
      return false;
  }
}

export function resolveExecutionCredentials(opts: {
  credentials: CredentialsLike;
  nativeCodexPassthrough: boolean;
  endpointPath: string;
  targetFormat: string;
  provider: string | null | undefined;
  ccSessionId: string | null;
  modelInfo?: Record<string, unknown> | null;
  requestBody?: Record<string, unknown>;
}): ResolvedExecutionCredentials {
  const {
    credentials,
    nativeCodexPassthrough,
    endpointPath,
    targetFormat,
    provider,
    ccSessionId,
    modelInfo,
    requestBody,
  } = opts;

  const nextCredentials = nativeCodexPassthrough
    ? { ...credentials, requestEndpointPath: endpointPath }
    : credentials;

  const providerSpecificData =
    nextCredentials?.providerSpecificData &&
    typeof nextCredentials.providerSpecificData === "object"
      ? { ...nextCredentials.providerSpecificData }
      : {};

  // Some providers (Azure AI Foundry, OCI OpenAI-compatible) choose upstream
  // endpoint path from providerSpecificData.apiType. When a model routes to
  // OpenAI Responses format, force apiType=responses unless explicitly set.
  if (
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    (provider === "azure-ai" || provider === "oci") &&
    providerSpecificData.apiType !== "responses"
  ) {
    providerSpecificData.apiType = "responses";
  }

  if (
    targetFormat === FORMATS.OPENAI_RESPONSES &&
    (provider === "azure-ai" || provider === "oci")
  ) {
    providerSpecificData._omnirouteForceResponsesUpstream = true;
  }

  // #8969: Poe's native /v1/responses surface — DefaultExecutor.buildUrl("poe")
  // reads this marker so Responses requests do not land on chat/completions.
  // Mistral too: a custom model configured for Responses is not in the static
  // registry, so buildUrl("mistral") cannot see that opt-in any other way.
  if (targetFormat === FORMATS.OPENAI_RESPONSES && (provider === "poe" || provider === "mistral")) {
    providerSpecificData._omnirouteForceResponsesUpstream = true;
  }

  // #8969: Claude-tagged Poe models speak Anthropic Messages wire format. Keep
  // DefaultExecutor from injecting OpenAI stream_options onto that body.
  if (targetFormat === FORMATS.CLAUDE && provider === "poe") {
    providerSpecificData.disableStreamOptions = true;
  }

  if (shouldSurfaceRequestTargetFormat(provider, targetFormat)) {
    providerSpecificData.targetFormat = targetFormat;
  }

  applyKimiExecutionMetadata(providerSpecificData, provider, targetFormat, modelInfo);
  // Request-local resolved catalog metadata; never persist this on the connection.
  const codexThinking = buildCodexThinkingMetadata(provider, modelInfo, requestBody);
  if (codexThinking) providerSpecificData._omnirouteCodexThinking = codexThinking;
  const withApiType = {
    ...nextCredentials,
    providerSpecificData,
  };

  if (!ccSessionId) return withApiType;

  return {
    ...withApiType,
    providerSpecificData: {
      ...(withApiType?.providerSpecificData || {}),
      ccSessionId,
    },
  };
}

export function getExecutionConnectionId(credentials: unknown): string | null {
  if (!credentials || typeof credentials !== "object") return null;
  const connectionId = (credentials as Record<string, unknown>).connectionId;
  return typeof connectionId === "string" && connectionId.trim() ? connectionId.trim() : null;
}
