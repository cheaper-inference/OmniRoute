import { getImageModelEntry, isImageOnlyModel } from "@omniroute/open-sse/config/imageRegistry.ts";
import { isReservedComboName } from "@/lib/combos/autoNames";
import { getComboByName } from "@/lib/db/combos";
import { getRequestedModelEndpointMismatch } from "@/lib/providerModels/modelEndpointGuard";
import type { ReasoningRuleDecision } from "@/lib/reasoningRouting/policy";
import { validateResolvedAutoComboAccess, type ApiKeyMetadata } from "@/shared/utils/apiKeyPolicy";
import { getComboForModel } from "../../services/model";
import { createVirtualAutoCombo, type AutoRoutingState } from "../autoRouting";

/** Exact stored combos take precedence over colliding image aliases (#6457). */
export async function isChatImageOnlyModel(model: string): Promise<boolean> {
  if (isReservedComboName(model) || !getImageModelEntry(model)) return false;
  if (await getComboByName(model)) return false;
  // Dual chat/image models such as Codex GPT-5.5 are valid on the chat endpoint.
  return isImageOnlyModel(model);
}

export function getChatEndpointMismatch(model: string) {
  return isReservedComboName(model) ? null : getRequestedModelEndpointMismatch(model, "chat");
}

export async function resolveChatCombo(
  request: Request,
  apiKeyInfo: ApiKeyMetadata | null,
  autoRouting: AutoRoutingState,
  routing: { modelStr: string; reasoningDecision: ReasoningRuleDecision | null }
) {
  const { modelStr, reasoningDecision } = routing;
  const isVirtualAutoCombo = autoRouting.recognizedBuiltInAuto;
  const routingCombo = autoRouting.isAutoRouting ? null : reasoningDecision?.targetCombo;
  const storedCombo = isVirtualAutoCombo
    ? null
    : (routingCombo ?? (await getComboForModel(modelStr)));

  const combo = await createVirtualAutoCombo(autoRouting, storedCombo, apiKeyInfo?.id);
  if (combo instanceof Response) return combo;
  if (combo) {
    const rejection = validateResolvedAutoComboAccess(request, apiKeyInfo, modelStr, combo.name);
    if (rejection) return rejection;
  }
  // Stored legacy routes use the selected combo name in target authorization.
  const comboPolicyName =
    combo && autoRouting.isAutoRouting && !isVirtualAutoCombo ? combo.name : modelStr;
  return { combo, comboPolicyName, isVirtualAutoCombo };
}

export function getRedirectComboPolicy(
  request: Request,
  apiKeyInfo: ApiKeyMetadata | null,
  model: string,
  resolved: { combo: { name: string }; isVirtualAutoCombo: boolean }
) {
  const { combo, isVirtualAutoCombo } = resolved;
  const isReservedModel = isReservedComboName(model);
  const autoModel = isVirtualAutoCombo && !isReservedModel ? combo.name : model;
  return {
    rejection: validateResolvedAutoComboAccess(request, apiKeyInfo, autoModel, combo.name),
    isStoredAutoCombo: isReservedModel && !isVirtualAutoCombo,
  };
}
