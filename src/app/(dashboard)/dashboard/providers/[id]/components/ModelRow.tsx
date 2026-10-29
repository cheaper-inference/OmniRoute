"use client";

import Icon from "@/shared/components/Icon";
/**
 * ModelRow — Issue #3501 Phase 1e
 *
 * Extracted from ProviderDetailPageClient.tsx. Contains:
 *   - ModelSourceBadge (tiny utility)
 *   - ModelVisibilityToolbar (filter/test toolbar)
 *   - ModelRow (catalog model row with compat controls)
 *
 * Leaf component: imports from shared, leaf helpers, and sibling components.
 * Never imports from ProviderDetailPageClient.
 */
import React, { useState, useRef, useEffect } from "react";
import {
  getModelCatalogSourceLabel,
  normalizeModelCatalogSource,
} from "@/shared/utils/modelCatalogSearch";
import { providerText } from "../providerPageHelpers";
import { Input as KitInput } from "@omniroute/ui-kit/input";
import { Button, Checkbox, FilterPills } from "@/shared/components";
import ModelCompatPopover from "./ModelCompatPopover";
import ModelEndpointTagsEditor, { type ModelEndpointEditorInfo } from "./ModelEndpointTagsEditor";

// ---------------------------------------------------------------------------
// Shared prop types
// ---------------------------------------------------------------------------

/** PATCH fields for provider model compat (matches API + `ModelCompatPerProtocol` shape). */
export type ModelCompatSavePatch = {
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
  upstreamHeaders?: Record<string, string>;
  compatByProtocol?: Record<
    string,
    {
      normalizeToolCallId?: boolean;
      preserveOpenAIDeveloperRole?: boolean;
      upstreamHeaders?: Record<string, string>;
    }
  >;
  isHidden?: boolean;
};

// ---------------------------------------------------------------------------
// ModelSourceBadge
// ---------------------------------------------------------------------------

function getModelSourceBadgeClass(source?: string): string {
  switch (normalizeModelCatalogSource(source)) {
    case "imported":
      return "border-info/30 bg-info/10 text-info";
    case "custom":
      return "border-success/30 bg-success/10 text-success";
    case "fallback":
      return "border-warning/30 bg-warning/10 text-warning";
    case "alias":
      return "border-chart-3/30 bg-chart-3/10 text-chart-3";
    case "system":
    default:
      return "border-border bg-sidebar/70 text-text-muted";
  }
}

export function ModelSourceBadge({ source }: { source?: string }) {
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${getModelSourceBadgeClass(
        source
      )}`}
    >
      {getModelCatalogSourceLabel(source)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ModelVisibilityToolbar
// ---------------------------------------------------------------------------

export interface ModelVisibilityToolbarProps {
  t: ((key: string, values?: Record<string, unknown>) => string) & {
    has?: (key: string) => boolean;
  };
  filterValue: string;
  onFilterChange: (value: string) => void;
  activeCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectAllDisabled?: boolean;
  deselectAllDisabled?: boolean;
  onTestAll?: () => void;
  testingAll?: boolean;
  testProgress?: { done: number; total: number } | null;
  visibilityFilter?: "all" | "visible" | "hidden";
  onVisibilityFilterChange?: (filter: "all" | "visible" | "hidden") => void;
  autoHideFailed?: boolean;
  onAutoHideFailedChange?: (v: boolean) => void;
  freeFilter?: "all" | "free" | "paid";
  onFreeFilterChange?: (filter: "all" | "free" | "paid") => void;
  sortFreeFirst?: boolean;
  onSortFreeFirstChange?: (v: boolean) => void;
}

export function ModelVisibilityToolbar({
  t,
  filterValue,
  onFilterChange,
  activeCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  selectAllDisabled,
  deselectAllDisabled,
  onTestAll,
  testingAll,
  testProgress,
  visibilityFilter,
  onVisibilityFilterChange,
  autoHideFailed,
  onAutoHideFailedChange,
  freeFilter,
  onFreeFilterChange,
  sortFreeFirst,
  onSortFreeFirstChange,
}: ModelVisibilityToolbarProps) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <div className="w-full min-w-0 flex-1 sm:w-auto sm:min-w-[220px]">
        <KitInput
          type="text"
          size="sm"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder={providerText(t, "filterModels", "Filter models…")}
          aria-label={providerText(t, "filterModels", "Filter models…")}
          leadingIcon={<Icon name="search" size={15} />}
          className="text-xs"
        />
      </div>
      {visibilityFilter !== undefined && onVisibilityFilterChange && (
        <FilterPills
          options={[
            { value: "all", label: providerText(t, "showAllModels", "All") },
            { value: "visible", label: providerText(t, "showVisibleOnly", "Visible") },
            { value: "hidden", label: providerText(t, "showHiddenOnly", "Hidden") },
          ]}
          value={visibilityFilter}
          onChange={(v) => onVisibilityFilterChange(v as "all" | "visible" | "hidden")}
        />
      )}
      {freeFilter !== undefined && onFreeFilterChange && (
        <FilterPills
          options={[
            { value: "all", label: providerText(t, "freeFilterAll", "All") },
            { value: "free", label: providerText(t, "freeFilterFreeOnly", "Free only") },
            { value: "paid", label: providerText(t, "freeFilterPaidOnly", "Paid only") },
          ]}
          value={freeFilter}
          onChange={(v) => onFreeFilterChange(v as "all" | "free" | "paid")}
        />
      )}
      {onSortFreeFirstChange && (
        <Button
          size="sm"
          variant={sortFreeFirst ? "secondary" : "outline"}
          icon="sort"
          onClick={() => onSortFreeFirstChange(!sortFreeFirst)}
          aria-pressed={!!sortFreeFirst}
          title={providerText(t, "sortFreeFirst", "Free first")}
        >
          <span>{providerText(t, "sortFreeFirst", "Free first")}</span>
        </Button>
      )}
      {onAutoHideFailedChange && (
        <span
          className="inline-flex"
          title={providerText(
            t,
            "autoHideFailedHint",
            "When enabled, Test all hides non-transient failures from public catalogs such as /v1/models. Single-model tests never auto-hide."
          )}
        >
          <Checkbox
            checked={autoHideFailed ?? false}
            onChange={(e) => onAutoHideFailedChange(e.target.checked)}
            label={
              <span className="text-xs text-text-muted">
                {providerText(t, "hideFailedAuto", "Auto-hide failed")}
              </span>
            }
          />
        </span>
      )}
      {onTestAll && (
        <Button
          size="sm"
          variant="outline"
          icon="science"
          loading={!!testingAll}
          onClick={onTestAll}
          disabled={testingAll}
          title={providerText(t, "testAllModels", "Test all")}
        >
          <span>
            {testingAll && testProgress
              ? providerText(t, "testingAllModels", "Testing {done}/{total}", testProgress)
              : providerText(t, "testAllModels", "Test all")}
          </span>
        </Button>
      )}
      <Button
        size="sm"
        variant="outline"
        icon="visibility"
        onClick={onSelectAll}
        disabled={selectAllDisabled}
        title={providerText(t, "showAllModels", "Show all")}
      >
        <span>{providerText(t, "showAllModels", "Show all")}</span>
      </Button>
      <Button
        size="sm"
        variant="outline"
        icon="visibility_off"
        onClick={onDeselectAll}
        disabled={deselectAllDisabled}
        title={providerText(t, "hideAllModels", "Hide all")}
      >
        <span>{providerText(t, "hideAllModels", "Hide all")}</span>
      </Button>
      <span className="whitespace-nowrap text-xs text-text-muted">
        {providerText(t, "modelsActiveCount", "{active}/{total} active", {
          active: activeCount,
          total: totalCount,
        })}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ModelRow
// ---------------------------------------------------------------------------

export interface ModelRowProps {
  model: { id: string; name?: string; source?: string; isHidden?: boolean };
  fullModel: string;
  provider: string;
  alias?: string;
  copied?: string;
  onCopy: (text: string, key: string) => void;
  onSetAlias?: (alias: string) => void;
  onDeleteAlias?: () => void;
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
  endpointInfo?: ModelEndpointEditorInfo;
}

export default function ModelRow({
  model,
  fullModel,
  provider,
  alias,
  copied,
  onCopy,
  onSetAlias,
  onDeleteAlias,
  t,
  showDeveloperToggle = true,
  effectiveModelNormalize,
  effectiveModelPreserveDeveloper,
  getUpstreamHeadersRecord,
  saveModelCompatFlags,
  compatDisabled,
  onToggleHidden,
  togglingHidden,
  onTestModel,
  testStatus,
  testingModel,
  endpointInfo,
}: ModelRowProps) {
  const isHidden = Boolean(model.isHidden);
  const [editing, setEditing] = useState(false);
  const [aliasValue, setAliasValue] = useState(alias || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEditing = () => {
    setAliasValue(alias || "");
    setEditing(true);
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
      className={`relative flex h-full w-full min-w-0 flex-col gap-1.5 rounded-lg border border-border px-3 py-2 hover:bg-sidebar/50 transition-opacity ${
        isHidden ? "opacity-50" : ""
      }`}
    >
      {/* Line 1: icon + full model name (wraps, never cut); copy pinned to the top-right corner. */}
      <div className="flex min-w-0 items-start gap-2 pr-7">
        <Icon
          name="smart_toy"
          size={16}
          className={isHidden ? "mt-0.5 text-text-muted" : "mt-0.5"}
        />
        <code className="min-w-0 break-all pt-px font-mono text-xs leading-5 text-text-main">
          {fullModel}
        </code>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        icon={copied === `model-${model.id}` ? "check" : "content_copy"}
        onClick={() => onCopy(fullModel, `model-${model.id}`)}
        className="absolute right-2 top-2 rounded p-0.5 size-6 min-h-6 text-text-muted"
        title={t("copyModel")}
        aria-label={t("copyModel")}
      />
      {/* Line 2 (never wraps): source, alias (truncates) and the actions, in the name's column. */}
      <div className="flex min-w-0 items-center gap-2 pl-6">
        <ModelSourceBadge source={model.source} />
        {onSetAlias && (
          <span className="flex min-w-0 flex-1 items-center text-[10px] gap-1">
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
                className={`min-w-0 truncate text-[10px] italic cursor-pointer hover:text-primary transition-colors ${alias ? "text-primary/80" : "text-text-muted/70"}`}
                onClick={startEditing}
                title={
                  alias
                    ? providerText(t, "clickToEditAlias", "Alias: {alias} (click to edit)", {
                        alias,
                      })
                    : providerText(t, "clickToSetAlias", "Click to set alias")
                }
              >
                {alias || model.name || providerText(t, "clickToSetAlias", "Click to set alias")}
              </span>
            )}
          </span>
        )}
        <div className="ml-auto flex shrink-0 items-center gap-1">
          {onToggleHidden && testStatus === "error" && (
            <Button
              variant="ghost"
              size="sm"
              icon="block"
              loading={!!togglingHidden}
              onClick={() => onToggleHidden(model.id, true)}
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
          {onTestModel && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onTestModel(model.id, fullModel)}
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
              onClick={() => onToggleHidden(model.id, !isHidden)}
              disabled={togglingHidden}
              className="size-6 min-h-6 rounded text-text-muted"
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
            ></Button>
          )}
          <ModelCompatPopover
            t={t}
            providerId={provider}
            modelId={model.id}
            effectiveModelNormalize={(p) => effectiveModelNormalize(model.id, p)}
            effectiveModelPreserveDeveloper={(p) => effectiveModelPreserveDeveloper(model.id, p)}
            getUpstreamHeadersRecord={getUpstreamHeadersRecord}
            onCompatPatch={(protocol, payload) =>
              saveModelCompatFlags(model.id, { compatByProtocol: { [protocol]: payload } })
            }
            showDeveloperToggle={showDeveloperToggle}
            disabled={compatDisabled}
          />
        </div>
      </div>
      {/* Line 3: endpoint capability tags (#16929) wrap freely, so line 2 stays one row. */}
      {endpointInfo && (
        <div className="min-w-0 pl-6">
          <ModelEndpointTagsEditor provider={provider} modelId={model.id} t={t} {...endpointInfo} />
        </div>
      )}
    </div>
  );
}
