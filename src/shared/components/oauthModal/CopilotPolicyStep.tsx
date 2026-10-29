"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";

type CopilotPolicyStepProps = {
  startOAuthFlow: () => void;
  onClose: () => void;
};

/**
 * GitHub Copilot: show the policy-ambiguous / experimental disclosure before
 * starting the device-code flow. The user must click "Connect" to proceed.
 * This satisfies the product requirement that users see the warning before
 * credentials are requested.
 */
export default function CopilotPolicyStep({ startOAuthFlow, onClose }: CopilotPolicyStepProps) {
  const t = useTranslations("oauthModal");

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/20 p-3 flex gap-2">
        <span className="material-symbols-outlined text-amber-600 dark:text-amber-400 text-base leading-5 shrink-0 mt-0.5">
          warning
        </span>
        <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
          {t("copilotPolicyTitle")}
        </p>
      </div>

      <ul className="flex flex-col gap-2 text-sm text-text-muted list-none">
        <li className="flex gap-2">
          <span className="material-symbols-outlined text-sm leading-5 shrink-0 mt-0.5 text-text-secondary">
            info
          </span>
          {t("copilotPolicyLine1")}
        </li>
        <li className="flex gap-2">
          <span className="material-symbols-outlined text-sm leading-5 shrink-0 mt-0.5 text-text-secondary">
            person
          </span>
          {t("copilotPolicyLine2")}
        </li>
        <li className="flex gap-2">
          <span className="material-symbols-outlined text-sm leading-5 shrink-0 mt-0.5 text-text-secondary">
            auto_awesome
          </span>
          {t("copilotPolicyLine3")}
        </li>
      </ul>

      <div className="flex flex-col gap-2">
        <Button onClick={startOAuthFlow} fullWidth>
          {t("copilotPolicyAcknowledge")}
        </Button>
        <Button onClick={onClose} variant="secondary" fullWidth>
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}
