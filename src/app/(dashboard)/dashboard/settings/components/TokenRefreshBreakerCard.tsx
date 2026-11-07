"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Select } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import type {
  TokenRefreshBreakerScope,
  TokenRefreshBreakerSettings,
} from "@/lib/resilience/settings";
import { NumberField } from "./ResilienceFields";

// Alias of the canonical settings shape so the host re-export stays consumed.
export type TokenRefreshBreakerValue = TokenRefreshBreakerSettings;

function ActionButtons({
  editing,
  saving,
  onEdit,
  onCancel,
  onSave,
}: {
  editing: boolean;
  saving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const tc = useTranslations("common");
  if (editing) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          {tc("cancel")}
        </Button>
        <Button variant="primary" size="sm" onClick={onSave} disabled={saving}>
          {tc("save")}
        </Button>
      </div>
    );
  }
  return (
    <Button variant="outline" size="sm" onClick={onEdit}>
      {tc("edit")}
    </Button>
  );
}

function CardHeader() {
  const t = useTranslations("settings");
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon name="refresh" size={20} className="text-primary" />
        <h2 className="text-lg font-bold">{t("resilienceTokenRefreshTitle")}</h2>
      </div>
      <div className="grid grid-cols-1 gap-2 text-xs text-text-muted sm:grid-cols-3">
        <div>
          <span className="font-semibold text-text-main">{t("scopeLabel")}:</span>{" "}
          {t("resilienceTokenRefreshScope")}
        </div>
        <div>
          <span className="font-semibold text-text-main">{t("triggerLabel")}:</span>{" "}
          {t("resilienceTokenRefreshTrigger")}
        </div>
        <div>
          <span className="font-semibold text-text-main">{t("effectLabel")}:</span>{" "}
          {t("resilienceTokenRefreshEffect")}
        </div>
      </div>
    </div>
  );
}

function EditFields({
  editing,
  onChange,
}: {
  editing: TokenRefreshBreakerValue;
  onChange: (next: TokenRefreshBreakerValue) => void;
}) {
  const t = useTranslations("settings");
  const cooldownMinutes = Math.round(editing.cooldownMs / 60000);
  const handleScopeChange = (raw: string) => {
    const scope: TokenRefreshBreakerScope = raw === "connection" ? "connection" : "provider";
    onChange({ ...editing, scope });
  };
  return (
    <>
      <Select
        label={t("resilienceTokenRefreshScopeLabel")}
        value={editing.scope}
        onChange={(event) => handleScopeChange(event.target.value)}
        options={[
          { value: "provider", label: t("resilienceTokenRefreshScopeProvider") },
          { value: "connection", label: t("resilienceTokenRefreshScopeConnection") },
        ]}
      />
      <NumberField
        label={t("resilienceTokenRefreshThreshold")}
        value={editing.failureThreshold}
        min={1}
        max={100}
        onChange={(failureThreshold) => onChange({ ...editing, failureThreshold })}
      />
      <NumberField
        label={t("resilienceTokenRefreshCooldown")}
        value={cooldownMinutes}
        min={1}
        max={1440}
        suffix="min"
        onChange={(minutes) => onChange({ ...editing, cooldownMs: minutes * 60000 })}
      />
    </>
  );
}

function ReadOnlyFields({ value }: { value: TokenRefreshBreakerValue }) {
  const t = useTranslations("settings");
  return (
    <>
      <div className="rounded-xl border border-border bg-bg-subtle p-4">
        <div className="text-xs text-text-muted">{t("resilienceTokenRefreshScopeLabel")}</div>
        <div className="mt-1 text-sm font-semibold text-text-main">
          {value.scope === "connection"
            ? t("resilienceTokenRefreshScopeConnection")
            : t("resilienceTokenRefreshScopeProvider")}
        </div>
      </div>
      <div className="rounded-xl border border-border bg-bg-subtle p-4">
        <div className="text-xs text-text-muted">{t("resilienceTokenRefreshThreshold")}</div>
        <div className="mt-1 text-sm font-semibold text-text-main">{value.failureThreshold}</div>
      </div>
      <div className="rounded-xl border border-border bg-bg-subtle p-4">
        <div className="text-xs text-text-muted">{t("resilienceTokenRefreshCooldown")}</div>
        <div className="mt-1 text-sm font-semibold text-text-main">
          {Math.round(value.cooldownMs / 60000)} min
        </div>
      </div>
    </>
  );
}

export default function TokenRefreshBreakerCard({
  value,
  onSave,
  saving,
}: {
  value: TokenRefreshBreakerValue;
  onSave: (next: TokenRefreshBreakerValue) => Promise<void>;
  saving: boolean;
}) {
  const t = useTranslations("settings");
  const [editing, setEditing] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [prevValue, setPrevValue] = useState(value);

  if (prevValue !== value) {
    setPrevValue(value);
    setEditing(value);
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <CardHeader />
        <ActionButtons
          editing={isEditing}
          saving={saving}
          onEdit={() => setIsEditing(true)}
          onCancel={() => {
            setEditing(value);
            setIsEditing(false);
          }}
          onSave={async () => {
            await onSave(editing);
            setIsEditing(false);
          }}
        />
      </div>

      <p className="mb-4 text-sm text-text-muted">{t("resilienceTokenRefreshDesc")}</p>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {isEditing ? (
          <EditFields editing={editing} onChange={setEditing} />
        ) : (
          <ReadOnlyFields value={value} />
        )}
      </div>
    </Card>
  );
}
