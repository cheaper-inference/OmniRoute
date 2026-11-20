/**
 * Agent guard: observes which client agents call the `claude` and `anthropic`
 * providers.
 *
 * Governed by the `AGENT_GUARD_MODE` feature flag (`off` | `monitor`, default
 * `off`), read on every request. In `monitor` mode a request from a client
 * that is not an official agent gets one log line through `context.log`. The
 * guardrail never blocks, never modifies the payload and fails open: every
 * path, including an internal error, returns `{ block: false }`.
 */

import { resolveFeatureFlag } from "@/shared/utils/featureFlags";
import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "../base";
import { classifyClientAgent } from "./classifier";
import { evaluateAgentPolicy, providerFromModelString } from "./policy";

type AgentGuardMode = "off" | "monitor";

const LOG_TAG = "AGENT_GUARD";
const MAX_MODEL_LENGTH = 200;

/** DB override > env > default; an unreadable flag store falls back to the env value. */
function readModeFlag(): string {
  try {
    return resolveFeatureFlag("AGENT_GUARD_MODE");
  } catch {
    return process.env.AGENT_GUARD_MODE ?? "";
  }
}

function resolveMode(fixed: AgentGuardMode | undefined): AgentGuardMode {
  if (fixed) return fixed;
  const value = readModeFlag().trim().toLowerCase();
  return value === "monitor" ? "monitor" : "off";
}

export class AgentGuardGuardrail extends BaseGuardrail {
  private readonly mode: AgentGuardMode | undefined;

  constructor(options: { mode?: AgentGuardMode } = {}) {
    super("agent-guard", { priority: 1 });
    this.mode = options.mode;
  }

  async preCall(_payload: unknown, context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    try {
      if (resolveMode(this.mode) !== "monitor") return { block: false };

      const provider = context.provider ?? providerFromModelString(context.model);
      if (!provider || !context.headers) return { block: false };

      const classification = classifyClientAgent(context.headers);
      const decision = evaluateAgentPolicy(classification, provider);
      if (decision.action === "allow") return { block: false };

      const apiKeyId = context.apiKeyInfo?.id;
      const meta = {
        agent: classification.agent,
        thirdParty: classification.thirdParty,
        provider,
        model: (context.model ?? "").slice(0, MAX_MODEL_LENGTH),
        apiKeyId: typeof apiKeyId === "string" ? apiKeyId : null,
        ...classification.signals,
      };
      const write = classification.thirdParty ? context.log?.warn : context.log?.info;
      write?.call(context.log, LOG_TAG, decision.reason, meta);
    } catch {
      // Observation only: an internal error must never affect the request.
    }
    return { block: false };
  }
}
