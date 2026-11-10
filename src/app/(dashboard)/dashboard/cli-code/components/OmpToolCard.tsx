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
  ompRolesMatch,
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

interface AvailableModel {
  value: string;
  alias?: string;
}

interface OmpSettingsState {
  installed: boolean;
  /** baseUrl already written to models.yml (kept on apply), when present. */
  providerBaseUrl: string | null;
  /** OmniRoute-owned roles on disk, as `{ role: modelId }`. */
  roles: Partial<Record<OmpRoleId, string>>;
}

export default function OmpToolCard({
  tool,
  isExpanded = false,
  onToggle,
  baseUrl = "",
  availableModels = [],
}: any) {
  const t = useTranslations("cliTools");
  const [state, setState] = useState<OmpSettingsState | null>(null);
  // Pending choices made in this session only: role -> model id or "" (unset).
  const [selections, setSelections] = useState<OmpRoleSelections>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [verifiedRoles, setVerifiedRoles] = useState<Set<string>>(new Set());

  const loadCurrentConfig = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(OMP_SETTINGS_URL);
      const data = await res.json();
      if (res.ok) {
        setState({
          installed: !!data.installed,
          providerBaseUrl: data.config?.providers?.omniroute?.baseUrl || null,
          roles: data.config?.modelRoles || {},
        });
      } else {
        setMessage({ ok: false, text: apiErrorText(data, t("failedToSave")) });
      }
    } catch {
      setMessage({ ok: false, text: t("networkError") });
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!isExpanded) return;
    void (async () => {
      await loadCurrentConfig();
    })();
  }, [isExpanded, loadCurrentConfig]);

  // Active OmniRoute models grouped by prefix (cc/, cx/, gc/, …).
  const modelGroups = useMemo(() => {
    const groups = new Map<string, string[]>();
    for (const m of availableModels as AvailableModel[]) {
      const id = typeof m?.value === "string" ? m.value : "";
      if (!id) continue;
      const slash = id.indexOf("/");
      const group = m.alias || (slash > 0 ? id.slice(0, slash) : "combos");
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group)!.push(id);
    }
    return Array.from(groups.entries());
  }, [availableModels]);
  const knownIds = useMemo(() => new Set(modelGroups.flatMap(([, ids]) => ids)), [modelGroups]);

  const pendingCount = Object.keys(selections).length;

  const setRole = (roleId: OmpRoleId, value: string) => {
    setMessage(null);
    setShowPreview(false);
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

  const handleApply = async () => {
    if (!state || pendingCount === 0) return;
    if (!window.confirm(t("ompConfirmApply", { count: pendingCount, path: OMP_CONFIG_PATH }))) {
      return;
    }
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch(OMP_SETTINGS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildOmpRolesRequest(state.providerBaseUrl || baseUrl, selections)),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const onDisk = data.modelRoles || {};
        const verified = ompRolesMatch(selections, onDisk);
        setVerifiedRoles(verified ? new Set(Object.keys(selections)) : new Set());
        setSelections({});
        setShowPreview(false);
        setState((prev) => (prev ? { ...prev, roles: onDisk } : prev));
        setMessage({
          ok: verified,
          text: verified
            ? t("ompSavedVerified", { path: OMP_CONFIG_PATH, count: pendingCount })
            : t("ompSavedUnverified", { path: OMP_CONFIG_PATH }),
        });
      } else {
        setMessage({ ok: false, text: apiErrorText(data, t("failedToSave")) });
      }
    } catch {
      setMessage({ ok: false, text: t("networkError") });
    } finally {
      setIsSaving(false);
    }
  };

  const configuredCount = OMP_ROLE_IDS.filter((role) => state?.roles[role]).length;
  const busy = isLoading || isSaving;

  return (
    <Card padding="sm" className="overflow-hidden">
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
              {state && (
                <span className="text-[10px] px-1.5 py-px rounded bg-success/10 text-success">
                  {t("hermesConfiguredRoles", {
                    configured: configuredCount,
                    total: OMP_ROLE_IDS.length,
                  })}
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

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={loadCurrentConfig}
              disabled={busy}
              loading={isLoading}
            >
              <Icon name="refresh" size={14} className="mr-1" />
              {t("refreshAll")}
            </Button>
          </div>

          {state && !state.installed && (
            <p className="text-xs text-warning">
              {t("ompNotInstalled", { path: OMP_CONFIG_PATH })}
            </p>
          )}
          {state && modelGroups.length === 0 && (
            <p className="text-xs text-warning">{t("ompNoModels")}</p>
          )}

          <div className="flex flex-col divide-y divide-border">
            {OMP_ROLE_IDS.map((roleId) => {
              const keys = ROLE_LABEL_KEYS[roleId];
              const onDisk = state?.roles[roleId] || "";
              const pending = Object.prototype.hasOwnProperty.call(selections, roleId);
              const value = pending ? selections[roleId] || "" : onDisk;
              const unknownValue = value && !knownIds.has(value);
              return (
                <div
                  key={roleId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-text-main flex items-center gap-2">
                      {t(keys.label)}
                      <code className="text-[10px] text-text-muted">{roleId}</code>
                      {pending && (
                        <span className="text-[10px] px-1.5 py-px rounded bg-warning/10 text-warning">
                          {t("ompPending")}
                        </span>
                      )}
                      {!pending && verifiedRoles.has(roleId) && (
                        <span className="text-[10px] px-1.5 py-px rounded bg-success/10 text-success">
                          {t("ompVerified")}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] leading-tight text-text-muted">
                      {t(keys.description)}
                    </div>
                    <div className="text-[10px] text-text-muted mt-0.5">
                      {t("ompOnDisk")}:{" "}
                      <code className="text-text-main">
                        {onDisk ? `${OMP_ROLE_PREFIX}${onDisk}` : t("ompUnset")}
                      </code>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Select
                      aria-label={roleId}
                      compact
                      nativeSize="sm"
                      selectClassName="max-w-[240px]"
                      value={value}
                      disabled={busy || !state}
                      onChange={(e) => setRole(roleId, e.target.value)}
                    >
                      <option value="">{t("ompUnset")}</option>
                      {unknownValue && <option value={value}>{value}</option>}
                      {modelGroups.map(([group, ids]) => (
                        <optgroup key={group} label={group}>
                          {ids.map((id) => (
                            <option key={id} value={id}>
                              {id}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                    {pending && (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busy}
                        onClick={() => clearRole(roleId)}
                      >
                        {t("clear")}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {message && (
            <div
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded text-xs",
                message.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
              )}
            >
              <Icon name={message.ok ? "check_circle" : "error"} size={14} />
              <span>{message.text}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={handleApply}
              disabled={busy || pendingCount === 0}
              variant="primary"
              size="sm"
              loading={isSaving}
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
                {buildOmpRolesPreview(selections)}
              </code>
            </pre>
          )}

          <p className="text-xs text-text-muted">{t("ompSaveDescription")}</p>
        </div>
      )}
    </Card>
  );
}
