"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Card, Button, Checkbox, Input } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { useNotificationStore } from "@/store/notificationStore";
import {
  AUTO_DISABLE_BANNED_SCOPES,
  normalizeAutoDisableBannedScope,
  type AutoDisableBannedScope,
} from "@/shared/utils/autoDisableBanned";

type AutoDisableForm = {
  enabled: boolean;
  threshold: number;
  scope: AutoDisableBannedScope;
};

function normalizeForm(json: Partial<AutoDisableForm> | null | undefined): AutoDisableForm {
  return {
    enabled: Boolean(json?.enabled),
    threshold: typeof json?.threshold === "number" ? json.threshold : 3,
    scope: normalizeAutoDisableBannedScope(json?.scope),
  };
}

export default function AutoDisableCard() {
  const [data, setData] = useState<AutoDisableForm>({
    enabled: false,
    threshold: 3,
    scope: "all",
  });
  const [draft, setDraft] = useState<AutoDisableForm>({
    enabled: false,
    threshold: 3,
    scope: "all",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const notify = useNotificationStore();

  useEffect(() => {
    fetch("/api/settings/auto-disable-accounts")
      .then((res) => res.json())
      .then((json) => {
        const next = normalizeForm(json);
        setData(next);
        setDraft(next);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/auto-disable-accounts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) throw new Error("Failed to save auto-disable config");
      const savedData = normalizeForm(await res.json());
      setData(savedData);
      setEditMode(false);
      notify.success(t("savedSuccessfully"));
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Error saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  const current = editMode ? draft : data;
  const scopes = AUTO_DISABLE_BANNED_SCOPES;

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="block" size={20} className="text-primary" />
            <h2 className="text-lg font-bold">{t("autoDisableBannedAccounts")}</h2>
          </div>
          {editMode ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setDraft(data);
                  setEditMode(false);
                }}
              >
                {tc("cancel")}
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon="save"
                onClick={handleSave}
                disabled={saving}
              >
                {tc("save")}
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="secondary" icon="edit" onClick={() => setEditMode(true)}>
              {tc("edit")}
            </Button>
          )}
        </div>

        <p className="text-sm text-text-muted mb-4">{t("autoDisableDescription")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg bg-bg-subtle p-4 flex flex-col justify-center">
            <Checkbox
              checked={current.enabled}
              onChange={(e) => setDraft((prev) => ({ ...prev, enabled: e.target.checked }))}
              disabled={!editMode}
              label={t("autoDisableBannedAccounts")}
            />
          </div>

          <div className="rounded-lg bg-bg-subtle p-4">
            {editMode ? (
              <Input
                type="number"
                label={t("autoDisableThreshold")}
                hint={t("autoDisableThresholdDesc")}
                min="1"
                max="10"
                value={draft.threshold}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, threshold: parseInt(e.target.value) || 1 }))
                }
              />
            ) : (
              <>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  {t("autoDisableThreshold")}
                </h3>
                <span className={`text-sm font-mono ${data.enabled ? "" : "text-text-muted"}`}>
                  {t("failures", { count: data.threshold })}
                </span>
                <p className="text-xs text-text-muted mt-2">{t("autoDisableThresholdDesc")}</p>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-bg-subtle p-4">
          <RadioGroup
            name="auto-disable-banned-scope"
            label={t("autoDisableBannedScope")}
            description={t("autoDisableBannedScopeDesc")}
            value={current.scope}
            onValueChange={(next) =>
              setDraft((prev) => ({ ...prev, scope: next as (typeof scopes)[number] }))
            }
            disabled={!editMode || !current.enabled}
            orientation="horizontal"
          >
            {scopes.map((scope) => (
              <RadioGroupItem
                key={scope}
                card
                value={scope}
                label={
                  scope === "all"
                    ? t("autoDisableBannedScopeAll")
                    : t("autoDisableBannedScopeSubscription")
                }
                description={
                  scope === "all"
                    ? t("autoDisableBannedScopeAllDesc")
                    : t("autoDisableBannedScopeSubscriptionDesc")
                }
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}
