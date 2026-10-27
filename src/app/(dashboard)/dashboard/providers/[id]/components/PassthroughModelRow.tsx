"use client";

import Icon from "@/shared/components/Icon";
/**
 * PassthroughModelRow — Issue #3501 Phase 1e
 *
 * Extracted from ProviderDetailPageClient.tsx. Renders one row in the
 * passthrough / compatible models list.
 *
 * Leaf component: imports from shared, leaf helpers, and sibling components.
 * Never imports from ProviderDetailPageClient.
 */
import React, { useState, useRef, useEffect } from "react";
import { Input as KitInput } from "@omniroute/ui-kit/input";
import { Badge, Button, CapabilityBadge } from "@/shared/components";
import { parseContextWindowOverrideInput, providerText } from "../providerPageHelpers";
import ModelCompatPopover from "./ModelCompatPopover";
import ModelEndpointTagsEditor, { type ModelEndpointEditorInfo } from "./ModelEndpointTagsEditor";
import ModelOutputTokenEditor from "./ModelOutputTokenEditor";
import { ModelSourceBadge, type ModelCompatSavePatch } from "./ModelRow";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface PassthroughModelRowProps {
  modelId: string;
  fullModel: string;
  provider: string;
  alias?: string | null;
  // Upstream-provided friendly name (`name` in the /models payload). Gateways that
  // expose opaque model ids (GUID-style presets) still send a readable name — show it
  // instead of "Click to set alias" so the list is not a wall of hex.
  displayName?: string | null;
  source?: string;
  isFree?: boolean;
  isHidden?: boolean;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onDeleteAlias?: () => void;
  onSetAlias?: (alias: string) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
  showDeveloperToggle?: boolean;
  effectiveModelNormalize: (modelId: string, protocol?: string) => boolean;
  effectiveModelPreserveDeveloper: (modelId: string, protocol?: string) => boolean;
  saveModelCompatFlags: (modelId: string, patch: ModelCompatSavePatch) => void;
  getUpstreamHeadersRecord: (protocol: string) => Record<string, string>;
  compatDisabled?: boolean;
  onToggleHidden?: (modelId: string, hidden: boolean) => Promise<void>;
  togglingHidden?: boolean;
  onTestModel?: (modelId: string, fullModel: string) => Promise<void>;
  testStatus?: "ok" | "error" | "quota" | null;
  testingModel?: boolean;
  // #14337: synced/imported rows had no edit affordance at all, so the manual
  // context-window override that #4125 added for custom models — and that the
  // PUT compatOnly branch has always accepted for these rows — was unreachable
  // from the UI. Absent handler keeps the row exactly as it was.
  supportsVision?: boolean;
  maxOutputTokenOverride?: number | null;
  onSaveMaxOutputTokenOverride?: (modelId: string, value: number | null) => Promise<boolean>;
  savingOutputOverride?: boolean;
  contextWindowOverride?: number | null;
  onSaveContextWindowOverride?: (modelId: string, value: number | null) => Promise<void>;
  savingContextOverride?: boolean;
  endpointInfo?: ModelEndpointEditorInfo;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PassthroughModelRow({
  modelId,
  fullModel,
  alias,
  displayName,
  source,
  isFree,
  isHidden,
  copied,
  onCopy,
  onDeleteAlias,
  onSetAlias,
  t,
  showDeveloperToggle = true,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  provider,
  compatDisabled,
  onToggleHidden,
  togglingHidden,
  onTestModel,
  testStatus,
  testingModel,
  supportsVision,
  maxOutputTokenOverride,
  onSaveMaxOutputTokenOverride,
  savingOutputOverride,
  contextWindowOverride,
  onSaveContextWindowOverride,
  savingContextOverride,
  endpointInfo,
}: PassthroughModelRowProps) {
  const [editing, setEditing] = useState(false);
  const [aliasValue, setAliasValue] = useState(alias || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const [editingContext, setEditingContext] = useState(false);
  const [contextValue, setContextValue] = useState("");
  const contextInputRef = useRef<HTMLInputElement>(null);

  // Only useful when it actually differs from the id — otherwise we would just print
  // the opaque id twice.
  const upstreamName =
    displayName && displayName !== modelId && displayName !== fullModel ? displayName : null;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    if (editingContext && contextInputRef.current) {
      contextInputRef.current.focus();
      contextInputRef.current.select();
    }
  }, [editingContext]);

  const startEditing = () => {
    setAliasValue(alias || "");
    setEditing(true);
  };

  const startEditingContext = () => {
    setContextValue(typeof contextWindowOverride === "number" ? String(contextWindowOverride) : "");
    setEditingContext(true);
  };

  const submitContextOverride = async () => {
    if (!onSaveContextWindowOverride) return;
    const parsed = parseContextWindowOverrideInput(contextValue);
    // Invalid input keeps the editor open rather than silently discarding the
    // value or writing a wrong one; the section surfaces the message.
    if (parsed.invalid) {
      await onSaveContextWindowOverride(modelId, Number.NaN);
      return;
    }
    await onSaveContextWindowOverride(modelId, parsed.value);
    setEditingContext(false);
  };

  const handleContextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void submitContextOverride();
    }
    if (e.key === "Escape") {
      setEditingContext(false);
    }
  };

  const handleAliasSubmit = () => {
    const trimmed = aliasValue.trim();
    if (trimmed && trimmed !== alias) {
      onSetAlias?.(trimmed);
    } else if (!trimmed && alias) {
      onDeleteAlias?.();
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAliasSubmit();
    }
    if (e.key === "Escape") {
      setAliasValue(alias || "");
      setEditing(false);
    }
  };

  return (
    <div
      className={`flex min-w-0 flex-col gap-2 rounded-lg border border-border px-3.5 py-3 transition-opacity hover:bg-sidebar/50 ${
        isHidden ? "opacity-50" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Icon name="smart_toy" size={16} className="text-text-muted" />
        <code
          className="min-w-0 truncate rounded bg-sidebar px-1.5 py-0.5 font-mono text-xs text-text-muted"
          title={fullModel}
        >
          {fullModel}
        </code>
        {onSetAlias && (
          <span className="flex min-w-0 items-center text-[9px] gap-1">
            {editing ? (
              <KitInput
                ref={inputRef}
                type="text"
                size="sm"
                value={aliasValue}
                onChange={(e) => setAliasValue(e.target.value)}
                onBlur={handleAliasSubmit}
                onKeyDown={handleKeyDown}
                placeholder={providerText(t, "aliasInputPlaceholder", "alias name")}
                aria-label={providerText(t, "aliasInputPlaceholder", "alias name")}
                className="h-5 min-h-0 w-24 px-1 text-[9px]"
              />
            ) : (
              <span
                className={`truncate text-[9px] italic cursor-pointer hover:text-primary transition-colors ${alias ? "text-primary/80" : "text-text-muted/70"}`}
                onClick={startEditing}
                title={
                  alias
                    ? providerText(t, "clickToEditAlias", "Alias: {alias} (click to edit)", {
                        alias,
                      })
                    : upstreamName
                      ? `${upstreamName} — ${providerText(t, "clickToSetAlias", "Click to set alias")}`
                      : providerText(t, "clickToSetAlias", "Click to set alias")
                }
              >
                {alias || upstreamName || providerText(t, "clickToSetAlias", "Click to set alias")}
              </span>
            )}
          </span>
        )}
      </div>
      <div className="flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <ModelSourceBadge source={source} />
          {endpointInfo && (
            <ModelEndpointTagsEditor
              provider={provider}
              modelId={modelId}
              t={t}
              {...endpointInfo}
            />
          )}
          {supportsVision === true && (
            <Badge variant="success" className="shrink-0 px-1.5 py-0 text-[10px]">
              {t("visionCapableLabel")}
            </Badge>
          )}
          <ModelOutputTokenEditor
            modelId={modelId}
            value={maxOutputTokenOverride}
            onSave={onSaveMaxOutputTokenOverride}
            saving={savingOutputOverride}
            t={t}
          />
          {isFree && (
            <Badge variant="success" className="shrink-0 px-1.5 py-0 text-[10px]">
              {providerText(t, "freeBadge", "Free")}
            </Badge>
          )}
          {/* #14337: the same context-window badge custom rows carry, so an override set
              here is visible after reload instead of being write-only. */}
          {typeof contextWindowOverride === "number" && !editingContext && (
            <CapabilityBadge
              icon="width_normal"
              className="shrink-0 bg-warning/15 text-warning"
              title={t("contextWindowOverrideHint")}
            >
              {contextWindowOverride.toLocaleString()}
            </CapabilityBadge>
          )}
          {editingContext && (
            <span className="flex items-center gap-1">
              <KitInput
                ref={contextInputRef}
                type="text"
                size="sm"
                inputMode="numeric"
                value={contextValue}
                onChange={(e) => setContextValue(e.target.value)}
                onKeyDown={handleContextKeyDown}
                disabled={savingContextOverride}
                placeholder={t("contextWindowOverridePlaceholder")}
                title={t("contextWindowOverrideHint")}
                aria-label={t("contextWindowOverrideLabel")}
                className="h-6 min-h-0 w-28 px-1.5 text-[11px]"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                icon="check"
                onClick={() => void submitContextOverride()}
                disabled={savingContextOverride}
                className="size-6 min-h-6 rounded text-text-muted disabled:opacity-40"
                title={providerText(t, "save", "Save")}
                aria-label={providerText(t, "save", "Save")}
              />
              <Button
                variant="ghost"
                size="icon-sm"
                icon="close"
                onClick={() => setEditingContext(false)}
                disabled={savingContextOverride}
                className="size-6 min-h-6 rounded text-text-muted disabled:opacity-40"
                title={providerText(t, "cancel", "Cancel")}
                aria-label={providerText(t, "cancel", "Cancel")}
              />
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {onToggleHidden && testStatus === "error" && (
            <Button
              variant="ghost"
              size="sm"
              icon="block"
              loading={!!togglingHidden}
              onClick={() => onToggleHidden(modelId, true)}
              disabled={togglingHidden}
              className="h-6 min-h-0 gap-1 rounded px-1 text-[11px] text-error"
              title={providerText(
                t,
                "blacklistModelTooltip",
                "Blacklist this model — hide it from the catalog"
              )}
            >
              <span>{providerText(t, "blacklistModel", "Blacklist")}</span>
            </Button>
          )}
          {/* #14337: the affordance itself. Rendered only when the section
              supplies a handler, so rows that cannot take an override are
              unchanged. */}
          {onSaveContextWindowOverride && !editingContext && (
            <Button
              variant="ghost"
              size="icon-sm"
              icon="edit"
              onClick={startEditingContext}
              className="size-6 min-h-6 rounded text-text-muted"
              title={t("contextWindowOverrideLabel")}
              aria-label={t("contextWindowOverrideLabel")}
            />
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onCopy(fullModel, `model-${modelId}`)}
            className="size-6 min-h-6 rounded text-text-muted"
            title={t("copyModel")}
            aria-label={t("copyModel")}
          >
            <Icon name={copied === `model-${modelId}` ? "check" : "content_copy"} size={14} />
          </Button>
          {onTestModel && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onTestModel(modelId, fullModel)}
              disabled={testingModel}
              className={`size-6 min-h-6 rounded ${testStatus === "ok" ? "text-success" : testStatus === "quota" ? "text-warning" : testStatus === "error" ? "text-error" : "text-text-muted"}`}
              title={
                testingModel
                  ? t("testingModel")
                  : testStatus === "ok"
                    ? "OK"
                    : testStatus === "quota"
                      ? t("modelTestQuotaTooltip")
                      : testStatus === "error"
                        ? providerText(t, "errorShort", "Error")
                        : t("testModel")
              }
              aria-label={
                testingModel
                  ? t("testingModel")
                  : testStatus === "ok"
                    ? "OK"
                    : testStatus === "quota"
                      ? t("modelTestQuotaTooltip")
                      : testStatus === "error"
                        ? providerText(t, "errorShort", "Error")
                        : t("testModel")
              }
            >
              {testingModel ? (
                <Icon name="progress_activity" size={14} className="animate-spin" />
              ) : testStatus === "ok" ? (
                <Icon name="check_circle" size={14} />
              ) : testStatus === "quota" ? (
                <Icon name="warning" size={14} />
              ) : testStatus === "error" ? (
                <Icon name="error" size={14} />
              ) : (
                <Icon name="play_circle" size={14} />
              )}
            </Button>
          )}
          {onToggleHidden && (
            <Button
              variant="ghost"
              size="icon-sm"
              icon={isHidden ? "visibility_off" : "visibility"}
              onClick={() => onToggleHidden(modelId, !isHidden)}
              disabled={togglingHidden}
              className="size-6 min-h-6 rounded text-text-muted disabled:cursor-not-allowed disabled:opacity-40"
              title={
                isHidden
                  ? providerText(t, "showModel", "Show model")
                  : providerText(t, "hideModel", "Hide model")
              }
              aria-label={
                isHidden
                  ? providerText(t, "showModel", "Show model")
                  : providerText(t, "hideModel", "Hide model")
              }
            />
          )}
          <ModelCompatPopover
            t={t}
            providerId={provider}
            modelId={modelId}
            effectiveModelNormalize={(p) => effectiveModelNormalize(modelId, p)}
            effectiveModelPreserveDeveloper={(p) => effectiveModelPreserveDeveloper(modelId, p)}
            getUpstreamHeadersRecord={getUpstreamHeadersRecord}
            onCompatPatch={(protocol, payload) =>
              saveModelCompatFlags(modelId, { compatByProtocol: { [protocol]: payload } })
            }
            showDeveloperToggle={showDeveloperToggle}
            compact
            disabled={compatDisabled}
          />
          {onDeleteAlias && (
            <Button
              variant="ghost"
              size="icon-sm"
              icon="delete"
              onClick={onDeleteAlias}
              className="size-6 min-h-6 rounded text-error hover:bg-error-bg"
              title={t("removeModel")}
              aria-label={t("removeModel")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
