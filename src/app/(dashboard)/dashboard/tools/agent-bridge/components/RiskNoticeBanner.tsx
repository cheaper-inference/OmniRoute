"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Icon from "@/shared/components/Icon";

const STORAGE_KEY = "omniroute-agentbridge-risk-dismissed";
// Same-tab signal for the dismiss button, since writing localStorage doesn't
// fire a "storage" event in the tab that wrote it.
const DISMISS_EVENT = "omniroute:agentbridge-risk-dismissed";

function isNotDismissed(): boolean {
  try {
    return !localStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(DISMISS_EVENT, callback);
  return () => window.removeEventListener(DISMISS_EVENT, callback);
}

// SSR has no localStorage, so the server always renders the banner visible;
// useSyncExternalStore reconciles that against the real client-side value
// right after hydration, with no hydration mismatch and no setState-in-effect.
function getServerSnapshot() {
  return true;
}

/**
 * Amber dismissable banner shown at the top of the AgentBridge page.
 * Persisted via localStorage so it only shows once per user.
 */
export function RiskNoticeBanner() {
  const t = useTranslations("agentBridge");
  const visible = useSyncExternalStore(subscribe, isNotDismissed, getServerSnapshot);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  if (!visible) return null;

  return (
    <Alert
      variant="warning"
      icon={<Icon name="warning" size={18} />}
      title={t("riskBannerTitle") || "Use at your own risk"}
      description={
        t("riskBannerBody") ||
        "AgentBridge intercepts HTTPS traffic from IDE agents. By activating it you accept responsibility for compliance with the terms of service of each agent. Never use on devices or networks where TLS inspection is prohibited."
      }
      dismissLabel={t("riskBannerDismiss") || "Dismiss"}
      onDismiss={dismiss}
    />
  );
}
