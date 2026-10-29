/**
 * chatCore reasoning-continuation input gate (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore: for OpenAI Chat / Responses inbound bodies, apply
 * the reasoning input policy (which may rewrite carried reasoning in place for the selected
 * transport) and report whether the request carries reasoning the target cannot accept under the
 * resolved fallback action. The handler finalizes the pending request and returns the 400 when
 * this reports `true`.
 */

import {
  applyReasoningInputPolicy,
  resolveIncompatibleReasoningAction,
} from "../../services/reasoningInputPolicy.ts";
import { FORMATS } from "../../translator/formats.ts";

export function isReasoningContinuationIncompatible({
  body,
  sourceFormat,
  provider,
  credentials,
  reasoningTransportFallback,
  isCombo,
  comboStepId,
  comboExecutionKey,
  headers,
}: {
  body: unknown;
  sourceFormat: string;
  provider: string;
  credentials:
    { providerSpecificData?: { preserveEncryptedReasoning?: unknown } } | null | undefined;
  reasoningTransportFallback: string | null | undefined;
  isCombo: boolean;
  comboStepId: string | null | undefined;
  comboExecutionKey: string | null | undefined;
  headers: Headers | Record<string, unknown> | null;
}): boolean {
  const reasoningInputFormat =
    sourceFormat === FORMATS.OPENAI_RESPONSES
      ? "responses"
      : sourceFormat === FORMATS.OPENAI
        ? "chat"
        : null;
  if (reasoningInputFormat && body && typeof body === "object") {
    const policy = applyReasoningInputPolicy(
      body as Record<string, unknown>,
      reasoningInputFormat,
      {
        provider,
        preserveEncryptedReasoning:
          credentials?.providerSpecificData?.preserveEncryptedReasoning === true,
        onIncompatibleReasoning: resolveIncompatibleReasoningAction({
          reasoningTransportFallback,
          // #11178 regressed combo steps whose combo record carries no explicit
          // stepId/executionKey (plain model-list combos): their explicit
          // `reasoningTransportFallback: "skip"` config was silently degraded to
          // "drop". `isCombo` is the combo marker; step ids are optional
          // finer-grained metadata that plain combos never set.
          isComboStep: Boolean(isCombo) || Boolean(comboStepId || comboExecutionKey),
          headers,
        }),
      }
    );
    if (policy.incompatibleReasoning) {
      return true;
    }
  }
  return false;
}
