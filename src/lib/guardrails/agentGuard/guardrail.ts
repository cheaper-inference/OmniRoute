/**
 * Agent guard: observes which client agents call the `claude` and `anthropic`
 * providers.
 *
 * Governed by the `AGENT_GUARD_MODE` feature flag (`off` | `monitor` | `block`,
 * default `off`), read on every request. In `monitor` mode a request from a
 * client that is not an official agent gets one log line through `context.log`.
 * In `block` mode this pre-call hook is inert: refusing is the job of the
 * dispatch gate, which decides on the provider the request resolved to and
 * cannot be disabled through the guardrail registry. The guardrail never
 * blocks, never modifies the payload and fails open: every path, including an
 * internal error, returns `{ block: false }`.
 */

import { BaseGuardrail, type GuardrailContext, type GuardrailResult } from "../base";
import { classifyClientAgent } from "./classifier";
import { writeAgentGuardLog } from "./logLine";
import { evaluateAgentPolicy, providerFromModelString } from "./policy";
import { resolveAgentGuardMode, type AgentGuardMode } from "./settings";

export class AgentGuardGuardrail extends BaseGuardrail {
  private readonly mode: AgentGuardMode | undefined;

  constructor(options: { mode?: AgentGuardMode } = {}) {
    super("agent-guard", { priority: 1 });
    this.mode = options.mode;
  }

  async preCall(_payload: unknown, context: GuardrailContext): Promise<GuardrailResult<unknown>> {
    try {
      if ((this.mode ?? resolveAgentGuardMode()) !== "monitor") return { block: false };

      const provider = context.provider ?? providerFromModelString(context.model);
      if (!provider || !context.headers) return { block: false };

      const classification = classifyClientAgent(context.headers);
      const decision = evaluateAgentPolicy(classification, provider);
      if (decision.action === "allow") return { block: false };

      writeAgentGuardLog(
        context.log,
        classification.thirdParty ? "warn" : "info",
        decision.reason,
        {
          classification,
          provider,
          model: context.model,
          apiKeyId: context.apiKeyInfo?.id,
        }
      );
    } catch {
      // Observation only: an internal error must never affect the request.
    }
    return { block: false };
  }
}
