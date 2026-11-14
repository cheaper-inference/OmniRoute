"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Select from "@/shared/components/Select";
import { Card, Button } from "@/shared/components";
import { cn } from "@/shared/utils/cn";
import { OMP_ROLE_IDS, type OmpRoleId } from "@/shared/constants/ompRoles";
import { CARD_TOGGLE_CLASS, cardToggleProps } from "./cardToggle";
import {
  OMP_ROLE_PREFIX,
  apiErrorText,
  buildOmpRolesPreview,
  buildOmpRolesRequest,
  groupOmpModels,
  ompRolesMatch,
  type OmpAvailableModel,
  type OmpRoleSelections,
} from "./ompRolesCard";

/**
 * Oh My Pi (omp) per-role model picker.
 *
 * Reads and writes through `/api/cli-tools/omp-settings`, the one place that
 * owns `~/.omp/agent/{models,config}.yml`: it refuses to overwrite an
 * unparsable file (409), backs both files up before writing, and only adds or
 * removes `modelRoles` values that point at OmniRoute — roles set to other
 * providers and custom role keys stay untouched.
 */
const OMP_SETTINGS_URL = "/api/cli-tools/omp-settings";
const OMP_CONFIG_PATH = "~/.omp/agent/config.yml";

const ROLE_LABEL_KEYS: Record<OmpRoleId, { label: string; description: string }> = {
  default: { label: "ompRoleDefault", description: "ompRoleDefaultDesc" },
  smol: { label: "ompRoleSmol", description: "ompRoleSmolDesc" },
  slow: { label: "ompRoleSlow", description: "ompRoleSlowDesc" },
  vision: { label: "ompRoleVision", description: "ompRoleVisionDesc" },
  plan: { label: "ompRolePlan", description: "ompRolePlanDesc" },
  designer: { label: "ompRoleDesigner", description: "ompRoleDesignerDesc" },
  commit: { label: "ompRoleCommit", description: "ompRoleCommitDesc" },
  tiny: { label: "ompRoleTiny", description: "ompRoleTinyDesc" },
  task: { label: "ompRoleTask", description: "ompRoleTaskDesc" },
  advisor: { label: "ompRoleAdvisor", description: "ompRoleAdvisorDesc" },
};

type Translate = ReturnType<typeof useTranslations>;
type CardMessage = { ok: boolean; text: string } | null;

interface OmpSettingsState {
  installed: boolean;
  /** baseUrl already written to models.yml (kept on apply), when present. */
  providerBaseUrl: string | null;
  /** OmniRoute-owned roles on disk, as `{ role: modelId }`. */
  roles: Partial<Record<OmpRoleId, string>>;
}

/** GET omp-settings into card state; errors become the card message. */
function useOmpSettings(isExpanded: boolean, t: Translate, setMessage: (m: CardMessage) => void) {
  const [state, setState] = useState<OmpSettingsState | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(OMP_SETTINGS_URL);
      const data = await res.json();
      if (!res.ok) {
        setMessage({ ok: false, text: apiErrorText(data, t("failedToSave")) });
        return;
      }
      setState({
        installed: !!data.installed,
        providerBaseUrl: data.config?.providers?.omniroute?.baseUrl || null,
        roles: data.config?.modelRoles || {},
      });
    } catch {
      setMessage({ ok: false, text: t("networkError") });
    } finally {
      setIsLoading(false);
    }
  }, [t, setMessage]);

  useEffect(() => {
    if (!isExpanded) return;
    void (async () => {
      await load();
    })();
  }, [isExpanded, load]);

  return { state, setState, isLoading, load };
}

/** Pending role choices plus the POST that applies them through omp-settings. */
function useOmpRoleEdits(
  t: Translate,
  baseUrl: string,
  settings: ReturnType<typeof useOmpSettings>,
  setMessage: (m: CardMessage) => void
) {
  const { state, setState } = settings;
  const [selections, setSelections] = useState<OmpRoleSelections>({});
  const [isSaving, setIsSaving] = useState(false);
  const [verifiedRoles, setVerifiedRoles] = useState<Set<string>>(new Set());

  const setRole = (roleId: OmpRoleId, value: string) => {
    setMessage(null);
    setSelections((prev) => {
      const next = { ...prev };
      if (value === (state?.roles[roleId] || "")) delete next[roleId];
      else next[roleId] = value;
      return next;
    });
  };

  const clearRole = (roleId: OmpRoleId) =>
    setSelections((prev) => {
      const next = { ...prev };
      delete next[roleId];
      return next;
    });

  const apply = async () => {
    const count = Object.keys(selections).length;
    if (!state || count === 0) return;
    if (!window.confirm(t("ompConfirmApply", { count, path: OMP_CONFIG_PATH }))) return;
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch(OMP_SETTINGS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildOmpRolesRequest(state.providerBaseUrl || baseUrl, selections)),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setMessage({ ok: false, text: apiErrorText(data, t("failedToSave")) });
        return;
      }
      const onDisk = data.modelRoles || {};
      const verified = ompRolesMatch(selections, onDisk);
      setVerifiedRoles(verified ? new Set(Object.keys(selections)) : new Set());
      setSelections({});
      setState((prev) => (prev ? { ...prev, roles: onDisk } : prev));
      setMessage({
        ok: verified,
        text: verified
          ? t("ompSavedVerified", { path: OMP_CONFIG_PATH, count })
          : t("ompSavedUnverified", { path: OMP_CONFIG_PATH }),
      });
    } catch {
      setMessage({ ok: false, text: t("networkError") });
    } finally {
      setIsSaving(false);
    }
  };

  return { selections, setRole, clearRole, apply, isSaving, verifiedRoles };
}

function OmpCardHeader({ t, tool, isExpanded, onToggle, configured }: any) {
  return (
    <div
      className={cn("flex items-center justify-between hover:cursor-pointer", CARD_TOGGLE_CLASS)}
      {...cardToggleProps(isExpanded, onToggle)}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="size-8 flex items-center justify-center shrink-0">
          <Icon name="terminal" size={22} className="text-text-muted" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{tool?.name || "Oh My Pi"}</h3>
            {configured !== null && (
              <span className="text-[10px] px-1.5 py-px rounded bg-success/10 text-success">
                {t("hermesConfiguredRoles", { configured, total: OMP_ROLE_IDS.length })}
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted truncate">{t("toolDescriptions.omp")}</p>
        </div>
      </div>
      <Icon
        name="expand_more"
        size={20}
        className={cn("text-text-muted transition-transform", isExpanded && "rotate-180")}
      />
    </div>
  );
}

function OmpRoleSelect({ t, roleId, value, knownIds, modelGroups, disabled, onChange }: any) {
  return (
    <Select
      aria-label={roleId}
      compact
      nativeSize="sm"
      selectClassName="max-w-[240px]"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(roleId, e.target.value)}
    >
      <option value="">{t("ompUnset")}</option>
      {value && !knownIds.has(value) && <option value={value}>{value}</option>}
      {modelGroups.map(([group, ids]: [string, string[]]) => (
        <optgroup key={group} label={group}>
          {ids.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </optgroup>
      ))}
    </Select>
  );
}

function OmpRoleRow({ t, roleId, onDisk, pending, verified, children }: any) {
  const keys = ROLE_LABEL_KEYS[roleId as OmpRoleId];
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2">
      <div className="min-w-0">
        <div className="font-medium text-sm text-text-main flex items-center gap-2">
          {t(keys.label)}
          <code className="text-[10px] text-text-muted">{roleId}</code>
          {pending && (
            <span className="text-[10px] px-1.5 py-px rounded bg-warning/10 text-warning">
              {t("ompPending")}
            </span>
          )}
          {!pending && verified && (
            <span className="text-[10px] px-1.5 py-px rounded bg-success/10 text-success">
              {t("ompVerified")}
            </span>
          )}
        </div>
        <div className="text-[10px] leading-tight text-text-muted">{t(keys.description)}</div>
        <div className="text-[10px] text-text-muted mt-0.5">
          {t("ompOnDisk")}:{" "}
          <code className="text-text-main">
            {onDisk ? `${OMP_ROLE_PREFIX}${onDisk}` : t("ompUnset")}
          </code>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">{children}</div>
    </div>
  );
}

function OmpCardMessage({ message }: { message: CardMessage }) {
  if (!message) return null;
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded text-xs",
        message.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
      )}
    >
      <Icon name={message.ok ? "check_circle" : "error"} size={14} />
      <span>{message.text}</span>
    </div>
  );
}

function OmpCardActions({ t, edits, busy, pendingCount }: any) {
  const [showPreview, setShowPreview] = useState(false);
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={edits.apply}
          disabled={busy || pendingCount === 0}
          variant="primary"
          size="sm"
          loading={edits.isSaving}
        >
          <Icon name="save" size={14} className="mr-1" />
          {t("ompApply")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview((open) => !open)}
          disabled={busy || pendingCount === 0}
        >
          <Icon name="visibility" size={14} className="mr-1" />
          {t("preview")}
        </Button>
        {pendingCount > 0 && (
          <span className="text-xs text-text-muted">
            {t("ompRolesWillUpdate", { count: pendingCount })}
          </span>
        )}
      </div>
      {showPreview && pendingCount > 0 && (
        <pre className="p-4 bg-bg-subtle rounded-lg border border-border overflow-auto max-h-80 text-xs">
          <code className="font-mono whitespace-pre text-text-main">
            {buildOmpRolesPreview(edits.selections)}
          </code>
        </pre>
      )}
    </>
  );
}

function OmpCardBody({ t, settings, edits, modelGroups, message }: any) {
  const { state, isLoading, load } = settings;
  const busy = isLoading || edits.isSaving;
  const knownIds = new Set(modelGroups.flatMap(([, ids]: [string, string[]]) => ids));
  return (
    <div className="mt-4 pt-4 border-t border-border flex flex-col gap-4">
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={load} disabled={busy} loading={isLoading}>
          <Icon name="refresh" size={14} className="mr-1" />
          {t("refreshAll")}
        </Button>
      </div>
      {state && !state.installed && (
        <p className="text-xs text-warning">{t("ompNotInstalled", { path: OMP_CONFIG_PATH })}</p>
      )}
      {state && modelGroups.length === 0 && (
        <p className="text-xs text-warning">{t("ompNoModels")}</p>
      )}
      <div className="flex flex-col divide-y divide-border">
        {OMP_ROLE_IDS.map((roleId) => {
          const onDisk = state?.roles[roleId] || "";
          const pending = Object.prototype.hasOwnProperty.call(edits.selections, roleId);
          return (
            <OmpRoleRow
              key={roleId}
              t={t}
              roleId={roleId}
              onDisk={onDisk}
              pending={pending}
              verified={edits.verifiedRoles.has(roleId)}
            >
              <OmpRoleSelect
                t={t}
                roleId={roleId}
                value={pending ? edits.selections[roleId] || "" : onDisk}
                knownIds={knownIds}
                modelGroups={modelGroups}
                disabled={busy || !state}
                onChange={edits.setRole}
              />
              {pending && (
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={busy}
                  onClick={() => edits.clearRole(roleId)}
                >
                  {t("clear")}
                </Button>
              )}
            </OmpRoleRow>
          );
        })}
      </div>
      <OmpCardMessage message={message} />
      <OmpCardActions
        t={t}
        edits={edits}
        busy={busy}
        pendingCount={Object.keys(edits.selections).length}
      />
      <p className="text-xs text-text-muted">{t("ompSaveDescription")}</p>
    </div>
  );
}

export default function OmpToolCard({
  tool,
  isExpanded = false,
  onToggle,
  baseUrl = "",
  availableModels = [],
}: any) {
  const t = useTranslations("cliTools");
  const [message, setMessage] = useState<CardMessage>(null);
  const settings = useOmpSettings(isExpanded, t, setMessage);
  const edits = useOmpRoleEdits(t, baseUrl, settings, setMessage);
  const modelGroups = useMemo(
    () => groupOmpModels(availableModels as OmpAvailableModel[]),
    [availableModels]
  );
  const configured = settings.state
    ? OMP_ROLE_IDS.filter((role) => settings.state?.roles[role]).length
    : null;

  return (
    <Card padding="sm" className="overflow-hidden">
      <OmpCardHeader
        t={t}
        tool={tool}
        isExpanded={isExpanded}
        onToggle={onToggle}
        configured={configured}
      />
      {isExpanded && (
        <OmpCardBody
          t={t}
          settings={settings}
          edits={edits}
          modelGroups={modelGroups}
          message={message}
        />
      )}
    </Card>
  );
}
