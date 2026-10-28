"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Toggle from "@/shared/components/Toggle";
import Input from "@/shared/components/Input";

import {
  useMemo,
  useState,
  useCallback,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useTranslations } from "next-intl";
import {
  formatProviderModelPermissionSummary,
  restoreProviderScopeSelection,
} from "@/app/(dashboard)/dashboard/api-manager/apiManagerPageUtils";
import ProviderModelPermissionList, {
  type ProviderGroup,
  type ProviderPermissionModel as Model,
} from "@/app/(dashboard)/dashboard/api-manager/components/ProviderModelPermissionList";
import { ApiKeyCatalogScopeSelect } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCatalogScopeSelect";
import type { CatalogScope } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCatalogScopeSelect";
import {
  CLAUDE_CODE_DEFAULT_MODEL_ID,
  CLAUDE_CODE_DEFAULT_MODEL_NAME,
  CLAUDE_CODE_DEFAULT_FAMILIES,
  type ClaudeCodeBlockableFamilyId,
  type ApiKeyAccessFormState,
} from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

export type { Model, ProviderGroup };

interface ModelsTabProps {
  formState: ApiKeyAccessFormState;
  allModels: Model[];
  modelsByProvider: ProviderGroup[];
  modelsLoaded: boolean;
  searchModel: string;
  onSearchChange: (search: string) => void;
  setAllowAll: (allow: boolean) => void;
  setSelectedModels: (models: string[]) => void;
  toggleModel: (modelId: string) => void;
  selectAllModels: (allModelIds: string[]) => void;
  deselectAllModels: () => void;
  blockClaudeCodeFamily: (familyId: ClaudeCodeBlockableFamilyId) => void;
  setCatalogScope: (scope: CatalogScope) => void;
  setDisableNonPublicModels: (disabled: boolean) => void;
  setForcedModel: (model: string) => void;
  errors?: string[];
}

/** What the key currently allows, split into provider wildcards and exact models. */
interface SelectedScopeSummary {
  selectedProviderCount: number;
  selectedModelCount: number;
  selectedCount: number;
  selectedPermissionSummary: string;
  selectedExactModels: string[];
  orderedSelectedProviderScopes: string[];
}

function getModelDisplayName(modelId: string) {
  return modelId === CLAUDE_CODE_DEFAULT_MODEL_ID ? CLAUDE_CODE_DEFAULT_MODEL_NAME : modelId;
}

function useSelectedScopeSummary(formState: ApiKeyAccessFormState): SelectedScopeSummary {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  const { providerWildcards: selectedProviderScopes, exactModels: selectedExactModels } = useMemo(
    () => restoreProviderScopeSelection(formState.selectedModels),
    [formState.selectedModels]
  );

  const selectedProviderCount = selectedProviderScopes.length;
  const selectedModelCount = selectedExactModels.length;

  const hasClaudeCodeDefaultSelected =
    !formState.allowAll && formState.selectedModels.includes(CLAUDE_CODE_DEFAULT_MODEL_ID);

  const orderedSelectedProviderScopes = useMemo(() => {
    if (!hasClaudeCodeDefaultSelected) return selectedProviderScopes;
    return [
      CLAUDE_CODE_DEFAULT_MODEL_ID,
      ...selectedProviderScopes.filter((scope) => scope !== CLAUDE_CODE_DEFAULT_MODEL_ID),
    ];
  }, [hasClaudeCodeDefaultSelected, selectedProviderScopes]);

  return {
    selectedProviderCount,
    selectedModelCount,
    selectedCount: formState.selectedModels.length,
    selectedPermissionSummary: formatProviderModelPermissionSummary(
      selectedProviderCount,
      selectedModelCount,
      t,
      tc
    ),
    selectedExactModels,
    orderedSelectedProviderScopes,
  };
}

/**
 * Expanded provider groups. The key and the catalog load in parallel, so the provider list may
 * still be empty when this tab mounts. Decide once, on the first non-empty list: a key that
 * already has selections opens with every group expanded (as the old modal did); later collapses
 * are left alone.
 */
function useProviderGroupExpansion(modelsByProvider: ProviderGroup[], hasSelectedModels: boolean) {
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(() => new Set());
  const [initialExpansionDone, setInitialExpansionDone] = useState(false);
  if (!initialExpansionDone && modelsByProvider.length > 0) {
    setInitialExpansionDone(true);
    if (hasSelectedModels) {
      setExpandedProviders(new Set(modelsByProvider.map(([p]) => p)));
    }
  }

  const expandAllProviders = useCallback(() => {
    setExpandedProviders(new Set(modelsByProvider.map(([p]) => p)));
  }, [modelsByProvider]);

  const handleToggleExpand = useCallback((provider: string) => {
    setExpandedProviders((prev) => {
      const next = new Set(prev);
      if (next.has(provider)) {
        next.delete(provider);
      } else {
        next.add(provider);
      }
      return next;
    });
  }, []);

  return { expandedProviders, expandAllProviders, handleToggleExpand };
}

/** Allow-all / restrict switching, and the disclosure of the Claude Code default families. */
function useModelAccessModeHandlers(
  setAllowAll: ModelsTabProps["setAllowAll"],
  expandAllProviders: () => void
) {
  const [claudeCodeFamiliesExpanded, setClaudeCodeFamiliesExpanded] = useState(false);

  const handleSelectAll = useCallback(() => {
    setAllowAll(true);
    setClaudeCodeFamiliesExpanded(false);
  }, [setAllowAll]);

  const handleRestrictMode = useCallback(() => {
    setAllowAll(false);
    expandAllProviders();
  }, [setAllowAll, expandAllProviders]);

  const handleClaudeCodeDefaultDeselected = useCallback(() => {
    setClaudeCodeFamiliesExpanded(false);
  }, []);

  return {
    claudeCodeFamiliesExpanded,
    setClaudeCodeFamiliesExpanded,
    handleSelectAll,
    handleRestrictMode,
    handleClaudeCodeDefaultDeselected,
  };
}

function ModelAccessModeToggle({
  allowAll,
  onSelectAll,
  onRestrict,
}: {
  allowAll: boolean;
  onSelectAll: () => void;
  onRestrict: () => void;
}) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex gap-2 p-1 bg-surface rounded-lg">
      {/* Access Mode Toggle */}
      <Button
        size="sm"
        variant={allowAll ? "primary" : "ghost"}
        aria-pressed={allowAll}
        onClick={onSelectAll}
        className="gap-1.5 text-xs flex-1 justify-center"
      >
        <Icon name="lock_open" size={18} />
        {t("allowAll")}
      </Button>
      <Button
        size="sm"
        variant={!allowAll ? "primary" : "ghost"}
        aria-pressed={!allowAll}
        onClick={onRestrict}
        className="gap-1.5 text-xs flex-1 justify-center"
      >
        <Icon name="lock" size={18} />
        {t("restrict")}
      </Button>
    </div>
  );
}

function ModelAccessInfoBanner({
  formState,
  modelsLoaded,
  scopeSummary,
  totalModels,
}: {
  formState: ApiKeyAccessFormState;
  modelsLoaded: boolean;
  scopeSummary: SelectedScopeSummary;
  totalModels: number;
}) {
  const t = useTranslations("apiManager");
  const { selectedProviderCount, selectedPermissionSummary, selectedCount } = scopeSummary;

  return (
    <div
      className={`flex items-start gap-2 p-3 rounded-lg ${
        formState.allowAll
          ? "bg-success/10 border border-success/30"
          : "bg-warning/10 border border-warning/30"
      }`}
    >
      {/* Info Banner */}
      <Icon
        name={formState.allowAll ? "info" : "warning"}
        size={18}
        className={formState.allowAll ? "text-success" : "text-warning"}
      />
      <p className={`text-xs ${formState.allowAll ? "text-success" : "text-warning"}`}>
        {formState.allowAll
          ? t("allowAllDesc")
          : !modelsLoaded
            ? t("restrictLoading")
            : selectedProviderCount > 0
              ? selectedPermissionSummary
              : totalModels === 0
                ? t("restrictCatalogUnavailable", { selectedCount })
                : t("restrictDesc", { selectedCount, totalModels })}
      </p>
    </div>
  );
}

/** Per-key enforced model: every chat request with this key is routed to it. */
function ForcedModelSetting({
  formState,
  allModels,
  setForcedModel,
}: Pick<ModelsTabProps, "formState" | "allModels" | "setForcedModel">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-surface/40">
      <Input
        id="api-key-forced-model"
        label={t("forcedModel")}
        hint={t("forcedModelDesc")}
        type="text"
        list="api-key-forced-model-options"
        value={formState.forcedModel}
        maxLength={300}
        onChange={(e) => setForcedModel(e.target.value)}
        placeholder={t("forcedModelPlaceholder")}
      />
      <datalist id="api-key-forced-model-options">
        {allModels.map((model) => (
          <option key={model.id} value={model.id} />
        ))}
      </datalist>
    </div>
  );
}

function CatalogVisibilitySettings({
  formState,
  setCatalogScope,
  setDisableNonPublicModels,
}: Pick<ModelsTabProps, "formState" | "setCatalogScope" | "setDisableNonPublicModels">) {
  const t = useTranslations("apiManager");

  return (
    <>
      {/* Catalog Scope */}
      <ApiKeyCatalogScopeSelect value={formState.catalogScope} onChange={setCatalogScope} />

      {/* Disable Non-Public Models Toggle */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("disableNonPublicModels")}</p>
          <p className="text-xs text-text-muted">{t("disableNonPublicModelsDesc")}</p>
        </div>
        <Toggle
          size="sm"
          className="shrink-0"
          checked={formState.disableNonPublicModels}
          onChange={() => setDisableNonPublicModels(!formState.disableNonPublicModels)}
          ariaLabel={t("disableNonPublicModels")}
        />
      </div>
    </>
  );
}

interface ClaudeCodeFamilyState {
  claudeCodeFamiliesExpanded: boolean;
  setClaudeCodeFamiliesExpanded: Dispatch<SetStateAction<boolean>>;
}

type SelectedModelsSummaryProps = ClaudeCodeFamilyState &
  Pick<
    ModelsTabProps,
    "formState" | "allModels" | "toggleModel" | "selectAllModels" | "deselectAllModels"
  > &
  Pick<ModelsTabProps, "blockClaudeCodeFamily"> & { scopeSummary: SelectedScopeSummary };

function SelectedModelsSummary({
  formState,
  allModels,
  scopeSummary,
  toggleModel,
  selectAllModels,
  deselectAllModels,
  blockClaudeCodeFamily,
  claudeCodeFamiliesExpanded,
  setClaudeCodeFamiliesExpanded,
}: SelectedModelsSummaryProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const {
    selectedPermissionSummary,
    selectedProviderCount,
    selectedModelCount,
    orderedSelectedProviderScopes,
    selectedExactModels,
  } = scopeSummary;

  return (
    <div className="flex flex-col gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20">
      {/* Selected Models Summary (only in restrict mode) */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-primary">{selectedPermissionSummary}</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectAllModels(allModels.map((m) => m.id))}
            className="h-auto min-h-0 px-1.5 py-0.5 text-[10px]"
          >
            {tc("all")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={deselectAllModels}
            className="h-auto min-h-0 px-1.5 py-0.5 text-[10px] text-error"
          >
            {t("clear")}
          </Button>
        </div>
      </div>

      {selectedProviderCount > 0 && (
        <SelectedChipGroup label={tc("providers")} listClassName="flex flex-wrap gap-1">
          {orderedSelectedProviderScopes.map((scope) =>
            scope === CLAUDE_CODE_DEFAULT_MODEL_ID ? (
              <ClaudeCodeDefaultScopeChip
                key={scope}
                scope={scope}
                blockedClaudeCodeFamilies={formState.blockedClaudeCodeFamilies}
                toggleModel={toggleModel}
                blockClaudeCodeFamily={blockClaudeCodeFamily}
                claudeCodeFamiliesExpanded={claudeCodeFamiliesExpanded}
                setClaudeCodeFamiliesExpanded={setClaudeCodeFamiliesExpanded}
              />
            ) : (
              <ProviderScopeChip key={scope} scope={scope} toggleModel={toggleModel} />
            )
          )}
        </SelectedChipGroup>
      )}

      {selectedModelCount > 0 && (
        <SelectedChipGroup
          label={tc("models")}
          listClassName="flex flex-wrap gap-1 max-h-36 overflow-y-auto content-start"
        >
          {selectedExactModels.map((modelId) => (
            <SelectedModelChip key={modelId} modelId={modelId} toggleModel={toggleModel} />
          ))}
        </SelectedChipGroup>
      )}
    </div>
  );
}

function SelectedChipGroup({
  label,
  listClassName,
  children,
}: {
  label: string;
  listClassName: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
        {label}
      </span>
      <div className={listClassName}>{children}</div>
    </div>
  );
}

function ClaudeCodeDefaultScopeChip({
  scope,
  blockedClaudeCodeFamilies,
  toggleModel,
  blockClaudeCodeFamily,
  claudeCodeFamiliesExpanded,
  setClaudeCodeFamiliesExpanded,
}: ClaudeCodeFamilyState &
  Pick<ModelsTabProps, "toggleModel" | "blockClaudeCodeFamily"> & {
    scope: string;
    blockedClaudeCodeFamilies: ClaudeCodeBlockableFamilyId[];
  }) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-1 basis-full">
      <span className="inline-flex w-fit items-center gap-0.5 px-1.5 py-0.5 bg-primary/10 text-text-main text-[10px] rounded border border-primary/35">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setClaudeCodeFamiliesExpanded((prev) => !prev)}
          className="h-auto min-h-0 gap-1 p-0 font-mono text-[10px] text-text-main"
          title={t("expandClaudeCodeFamilies")}
          aria-expanded={claudeCodeFamiliesExpanded}
        >
          <span className="truncate max-w-[140px]" title={scope}>
            {CLAUDE_CODE_DEFAULT_MODEL_NAME}
          </span>
          <Icon
            name={claudeCodeFamiliesExpanded ? "expand_less" : "expand_more"}
            size={12}
            className="text-primary"
          />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => toggleModel(scope)}
          className="h-4 w-4 min-h-0 min-w-0 p-0 text-text-muted hover:text-error"
          title={t("removeClaudeCodeDefault")}
          aria-label={t("removeClaudeCodeDefault")}
        >
          <Icon name="close" size={12} />
        </Button>
      </span>

      {claudeCodeFamiliesExpanded && (
        <ClaudeCodeFamilyChips
          blockedClaudeCodeFamilies={blockedClaudeCodeFamilies}
          blockClaudeCodeFamily={blockClaudeCodeFamily}
        />
      )}
    </div>
  );
}

function ClaudeCodeFamilyChips({
  blockedClaudeCodeFamilies,
  blockClaudeCodeFamily,
}: Pick<ModelsTabProps, "blockClaudeCodeFamily"> & {
  blockedClaudeCodeFamilies: ClaudeCodeBlockableFamilyId[];
}) {
  const visibleClaudeCodeFamilies = useMemo(
    () =>
      CLAUDE_CODE_DEFAULT_FAMILIES.filter(
        (family) =>
          family.id === "other" ||
          !blockedClaudeCodeFamilies.includes(family.id as ClaudeCodeBlockableFamilyId)
      ),
    [blockedClaudeCodeFamilies]
  );

  return (
    <div className="relative ml-2 flex flex-wrap gap-1 pl-5 animate-in fade-in slide-in-from-top-1 duration-150">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1.5 top-0 bottom-1 w-px bg-primary/25"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1.5 top-3 h-px w-3 bg-primary/25"
      />
      {visibleClaudeCodeFamilies.map((family) => {
        const canBlock = family.id !== "other";
        return (
          <span
            key={family.id}
            className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] rounded border ${
              canBlock
                ? "bg-surface text-text-main border-border"
                : "bg-surface-2 text-text-muted border-border"
            }`}
            title={
              canBlock
                ? `Allow ${family.label} family through Claude Code default`
                : "Catch-all for other Claude Code models"
            }
          >
            <span className="font-mono">{family.label}</span>
            {canBlock && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => blockClaudeCodeFamily(family.id as ClaudeCodeBlockableFamilyId)}
                className="h-4 w-4 min-h-0 min-w-0 p-0 text-text-muted hover:text-error"
                title={`Block ${family.label} family`}
                aria-label={`Block ${family.label} family`}
              >
                <Icon name="close" size={12} />
              </Button>
            )}
          </span>
        );
      })}
    </div>
  );
}

function ProviderScopeChip({
  scope,
  toggleModel,
}: Pick<ModelsTabProps, "toggleModel"> & { scope: string }) {
  const t = useTranslations("apiManager");
  const provider = scope.slice(0, -2);
  return (
    <span
      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/10 text-text-main text-[10px] rounded border border-primary/35"
      title={scope}
    >
      <span className="font-mono truncate max-w-[120px]">{provider}</span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => toggleModel(scope)}
        className="h-4 w-4 min-h-0 min-w-0 p-0 text-text-muted hover:text-error"
        aria-label={t("removeSelection", { name: provider })}
      >
        <Icon name="close" size={12} />
      </Button>
    </span>
  );
}

function SelectedModelChip({
  modelId,
  toggleModel,
}: Pick<ModelsTabProps, "toggleModel"> & { modelId: string }) {
  const t = useTranslations("apiManager");
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-surface text-text-main text-[10px] rounded border border-border">
      <span className="font-mono truncate max-w-[120px]" title={modelId}>
        {getModelDisplayName(modelId)}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => toggleModel(modelId)}
        className="h-4 w-4 min-h-0 min-w-0 p-0 text-text-muted hover:text-error"
        aria-label={t("removeSelection", { name: getModelDisplayName(modelId) })}
      >
        <Icon name="close" size={12} />
      </Button>
    </span>
  );
}

export default function ModelsTab({
  formState,
  allModels,
  modelsByProvider,
  modelsLoaded,
  searchModel,
  onSearchChange,
  setAllowAll,
  setSelectedModels,
  toggleModel,
  selectAllModels,
  deselectAllModels,
  blockClaudeCodeFamily,
  setCatalogScope,
  setDisableNonPublicModels,
  setForcedModel,
  errors,
}: ModelsTabProps) {
  const { expandedProviders, expandAllProviders, handleToggleExpand } = useProviderGroupExpansion(
    modelsByProvider,
    formState.selectedModels.length > 0
  );
  const accessMode = useModelAccessModeHandlers(setAllowAll, expandAllProviders);
  const scopeSummary = useSelectedScopeSummary(formState);

  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors} />
      <ModelAccessModeToggle
        allowAll={formState.allowAll}
        onSelectAll={accessMode.handleSelectAll}
        onRestrict={accessMode.handleRestrictMode}
      />
      <ModelAccessInfoBanner
        formState={formState}
        modelsLoaded={modelsLoaded}
        scopeSummary={scopeSummary}
        totalModels={allModels.length}
      />
      <CatalogVisibilitySettings
        formState={formState}
        setCatalogScope={setCatalogScope}
        setDisableNonPublicModels={setDisableNonPublicModels}
      />
      <ForcedModelSetting
        formState={formState}
        allModels={allModels}
        setForcedModel={setForcedModel}
      />
      {!formState.allowAll && scopeSummary.selectedCount > 0 && (
        <SelectedModelsSummary
          formState={formState}
          allModels={allModels}
          scopeSummary={scopeSummary}
          toggleModel={toggleModel}
          selectAllModels={selectAllModels}
          deselectAllModels={deselectAllModels}
          blockClaudeCodeFamily={blockClaudeCodeFamily}
          claudeCodeFamiliesExpanded={accessMode.claudeCodeFamiliesExpanded}
          setClaudeCodeFamiliesExpanded={accessMode.setClaudeCodeFamiliesExpanded}
        />
      )}

      {/* Model Selection List (only in restrict mode) */}
      {!formState.allowAll && (
        <ProviderModelPermissionList
          modelsByProvider={modelsByProvider}
          allModels={allModels}
          selectedModels={formState.selectedModels}
          expandedProviders={expandedProviders}
          searchModel={searchModel}
          onSearchChange={onSearchChange}
          onToggleExpand={handleToggleExpand}
          onSelectionChange={setSelectedModels}
          getModelDisplayName={getModelDisplayName}
          onClaudeCodeDefaultDeselected={accessMode.handleClaudeCodeDefaultDeselected}
        />
      )}
    </div>
  );
}
