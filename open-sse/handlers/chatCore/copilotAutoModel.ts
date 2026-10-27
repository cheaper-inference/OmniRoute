/**
 * GitHub Copilot `auto` → concrete model, resolved before routing.
 *
 * chatCore picks the target format, translates the body and records usage from the
 * model id, so the Copilot `/auto` decision has to land before any of that: a Claude
 * pick then goes to Copilot's /v1/messages shim with an Anthropic-shaped body, a
 * Responses-only pick goes to /responses, and usage, cost and call logs carry the
 * model that actually served the request (the call log's requestedModel keeps
 * `auto`). The decision's session token rides on a per-request credentials copy and
 * is turned into the `Copilot-Session-Token` header by GithubExecutor.buildHeaders.
 *
 * Only the github.com `github` provider opts in; `ghe-copilot` does not expose `auto`.
 */
import { getExecutor } from "../../executors/index.ts";
import type { CopilotAutoResolution } from "../../executors/github.ts";
import { isCopilotAutoModel } from "../../executors/github/autoModel.ts";
import { createErrorResult } from "../../utils/error.ts";
import { isProbeContext } from "@/shared/utils/probeOrigin";

type Credentials = Record<string, unknown>;

type AutoLog = {
  info?: (tag: string, message: string) => void;
  warn?: (tag: string, message: string) => void;
} | null;

export type CopilotAutoExecutor = {
  needsRefresh: (credentials: Credentials) => boolean;
  refreshCredentials: (credentials: Credentials, log: AutoLog) => Promise<Credentials | null>;
  resolveAutoModel: (input: {
    body: unknown;
    credentials: Credentials;
    sessionKey?: string | null;
    signal?: AbortSignal | null;
    log?: AutoLog;
  }) => Promise<CopilotAutoResolution>;
};

export type CopilotAutoOutcome = {
  model: string;
  credentials: Credentials;
  errorResult?: ReturnType<typeof createErrorResult>;
};

// The /auto call runs before BaseExecutor.execute()'s proactive refresh, so mint a
// fresh Copilot token for it when the stored one is stale. The fresh token is used for
// /auto only: the request credentials stay as they were, so execute() still runs its
// own refresh and persists the new token through onCredentialsRefreshed.
async function credentialsForAutoCall(
  executor: CopilotAutoExecutor,
  credentials: Credentials,
  log: AutoLog | undefined
): Promise<Credentials> {
  if (isProbeContext() || !executor.needsRefresh(credentials)) return credentials;
  try {
    const refreshed = await executor.refreshCredentials(credentials, log ?? null);
    if (!refreshed) return credentials;
    return {
      ...credentials,
      ...refreshed,
      providerSpecificData: {
        ...((credentials.providerSpecificData as Credentials | undefined) || {}),
        ...((refreshed.providerSpecificData as Credentials | undefined) || {}),
      },
    };
  } catch (error) {
    log?.warn?.(
      "GITHUB",
      `Copilot token refresh before auto selection failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return credentials;
  }
}

/**
 * Resolve `github/auto` to Copilot's pick. Returns the request's model and credentials
 * unchanged for every other provider/model; on success the model is the selected id
 * (also written to `body.model`) and the credentials are a copy carrying
 * `copilotSessionToken`; an /auto failure comes back as a sanitized `errorResult`.
 */
export async function resolveCopilotAuto(
  provider: string | null | undefined,
  model: string,
  body: unknown,
  credentials: Credentials,
  sessionKey?: string | null,
  log?: AutoLog,
  /** Test seam; defaults to the registered github executor. */
  executor?: CopilotAutoExecutor
): Promise<CopilotAutoOutcome> {
  if (provider !== "github" || !isCopilotAutoModel(model)) return { model, credentials };

  const github = executor ?? ((await getExecutor("github")) as unknown as CopilotAutoExecutor);
  const resolution = await github.resolveAutoModel({
    body,
    credentials: await credentialsForAutoCall(github, credentials, log),
    sessionKey,
    log,
  });
  if (resolution.ok === false) {
    return {
      model,
      credentials,
      errorResult: createErrorResult(resolution.status, resolution.message),
    };
  }

  const selected = resolution.decision.model;
  log?.info?.("ROUTING", `GitHub Copilot auto → ${selected}`);
  if (body && typeof body === "object") (body as Record<string, unknown>).model = selected;
  return {
    model: selected,
    credentials: { ...credentials, copilotSessionToken: resolution.decision.sessionToken },
  };
}
