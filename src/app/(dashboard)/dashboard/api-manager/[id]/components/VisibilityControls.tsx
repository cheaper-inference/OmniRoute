"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import { Toggle } from "@/shared/components";
import { safeApiErrorMessage, withVisibilityScopes } from "../apiKeyDetailsData";
import type { KeyConfig } from "../apiKeyDetailsData";
import { sendJson } from "../useApiKeyDetails";
import { DetailsSection, EmptyNote, SaveFeedback } from "./DetailsPrimitives";

type Visibility = { selfUsage: boolean; accountQuota: boolean };

function VisibilitySwitch({
  checked,
  disabled,
  icon,
  label,
  description,
  onToggle,
}: {
  checked: boolean;
  disabled: boolean;
  icon: string;
  label: string;
  description: string;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-2">
        <Icon name={icon} size={16} className="mt-0.5 shrink-0 text-text-muted" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-sm font-medium text-text-main">{label}</p>
          <p className="text-xs text-text-muted">{description}</p>
        </div>
      </div>
      <Toggle
        checked={checked}
        disabled={disabled}
        ariaLabel={label}
        size="sm"
        className="shrink-0"
        onChange={() => onToggle()}
      />
    </div>
  );
}

/** What the key holder may read through /v1/me/status (the self-service scopes). */
export function VisibilityControls({
  keyId,
  keyConfig,
  visibility,
  saved,
  onSaved,
}: {
  keyId: string;
  keyConfig: KeyConfig | null;
  visibility: Visibility;
  saved: boolean;
  onSaved: () => Promise<void>;
}) {
  const t = useTranslations("apiKeyDetails");
  const tm = useTranslations("apiManager");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (next: Visibility) => {
    if (!keyConfig) return;
    setSaving(true);
    setError(null);
    const res = await sendJson(`/api/keys/${encodeURIComponent(keyId)}`, "PATCH", {
      scopes: withVisibilityScopes(keyConfig.scopes, next),
    });
    if (res.ok) await onSaved();
    else setError(safeApiErrorMessage(res.body, t("saveFailed")));
    setSaving(false);
  };

  return (
    <DetailsSection
      title={t("visibilityTitle")}
      description={t("visibilityDesc")}
      icon="visibility"
    >
      {keyConfig ? (
        <div className="flex flex-col gap-3">
          <VisibilitySwitch
            checked={visibility.selfUsage}
            disabled={saving}
            icon="query_stats"
            label={tm("ownUsageVisibility")}
            description={tm("ownUsageVisibilityDesc")}
            onToggle={() =>
              void save({
                selfUsage: !visibility.selfUsage,
                accountQuota: visibility.selfUsage ? false : visibility.accountQuota,
              })
            }
          />
          <VisibilitySwitch
            checked={visibility.accountQuota}
            disabled={saving || !visibility.selfUsage}
            icon="account_balance"
            label={tm("sharedAccountQuotaVisibility")}
            description={t("accountQuotaVisibilityDesc")}
            onToggle={() => void save({ selfUsage: true, accountQuota: !visibility.accountQuota })}
          />
          <SaveFeedback error={error} saved={saved && !error ? t("saved") : null} />
        </div>
      ) : (
        <EmptyNote>{t("keyConfigUnavailable")}</EmptyNote>
      )}
    </DetailsSection>
  );
}
