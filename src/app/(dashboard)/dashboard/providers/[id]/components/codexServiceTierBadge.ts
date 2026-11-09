import type { CodexServiceTier } from "@/lib/providers/requestDefaults";
import {
  CODEX_ULTRAFAST_LABEL,
  CODEX_ULTRAFAST_MODEL_LABEL,
} from "@/lib/providers/codexServiceTierModels";
import { providerText, type ProviderMessageTranslator } from "../providerCredentialText";

export function getCodexServiceTierBadge(
  t: ProviderMessageTranslator,
  tier: CodexServiceTier,
  global: boolean
) {
  if (tier === "ultrafast") {
    return {
      label: CODEX_ULTRAFAST_LABEL,
      icon: "bolt",
      className: "bg-info/15 text-info",
      title: CODEX_ULTRAFAST_MODEL_LABEL,
    };
  }
  if (tier === "priority") {
    return {
      label: providerText(t, "codexTierFastLabel", "Fast"),
      icon: "bolt",
      className: "bg-info/15 text-info",
      title: global
        ? providerText(
            t,
            "providerDetailGlobalPriorityActive",
            "Global Codex priority service tier is active"
          )
        : providerText(
            t,
            "providerDetailConnectionPriorityActive",
            "Codex priority service tier is active for this connection"
          ),
    };
  }
  if (tier === "flex") {
    return {
      label: providerText(t, "codexTierFlexLabel", "Flex"),
      icon: "speed",
      className: "bg-chart-2/15 text-chart-2",
      title: global
        ? providerText(
            t,
            "providerDetailGlobalFlexActive",
            "Global Codex flex service tier is active"
          )
        : providerText(
            t,
            "providerDetailConnectionFlexActive",
            "Codex flex service tier is active for this connection"
          ),
    };
  }
  return null;
}
