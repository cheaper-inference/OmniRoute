"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Toggle from "@/shared/components/Toggle";
import { formatProviderModelPermissionSummary } from "../apiManagerPageUtils";
import {
  CLAUDE_CODE_DEFAULT_MODEL_ID,
  CLAUDE_CODE_DEFAULT_MODEL_NAME,
} from "../[id]/access/useApiKeyAccessForm";
import ProviderModelPermissionList from "./ProviderModelPermissionList";
import { ApiKeyCatalogScopeSelect } from "./ApiKeyCatalogScopeSelect";

import { useKeyPolicyEditor } from "./KeyPolicyEditorContext";

export default function KeyPolicyModelsTab() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-4">
      {/* Clear separation Section 1: Execution Access Control */}
      <PublicModelRestriction />

      {/* Clear separation Section 2: /v1/models Catalog Listing Only */}
      <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/30">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-text-main">
            {t("templateCatalogListingHeading")}
          </p>
          <span className="px-1.5 py-0.5 rounded bg-surface-2 text-text-muted text-[10px] font-semibold">
            {t("templateListingOnlyBadge")}
          </span>
        </div>
        <p className="text-xs text-text-muted">{t("templateCatalogListingDesc")}</p>
        <ApiKeyCatalogScopeSelect
          value={formState.catalogScope}
          onChange={(scope) => updateState((p) => ({ ...p, catalogScope: scope }))}
        />
      </div>
    </div>
  );
}

function ModelAccessMode() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="text-sm font-semibold text-text-main">
          {t("templateExecutionAccessHeading")}
        </p>
        <p className="text-xs text-text-muted">{t("templateExecutionAccessDesc")}</p>
      </div>
      <div className="flex gap-1 p-0.5 bg-surface rounded-md">
        <Button
          type="button"
          size="sm"
          variant={formState.allowAllModels ? "primary" : "ghost"}
          aria-pressed={formState.allowAllModels}
          onClick={() => updateState((p) => ({ ...p, allowAllModels: true }))}
          className="gap-1.5 text-xs"
        >
          <Icon name="lock_open" size={16} />
          {t("allowAll")}
        </Button>
        <Button
          type="button"
          size="sm"
          variant={!formState.allowAllModels ? "primary" : "ghost"}
          aria-pressed={!formState.allowAllModels}
          onClick={() => updateState((p) => ({ ...p, allowAllModels: false }))}
          className="gap-1.5 text-xs"
        >
          <Icon name="lock" size={16} />
          {t("restrict")}
        </Button>
      </div>
    </div>
  );
}

function ModelAccessSummary() {
  const { t, tc, formState, selectedProviderScopes, selectedExactModels } = useKeyPolicyEditor();
  return (
    <div
      className={`flex items-start gap-2 p-2.5 rounded-lg text-xs ${
        formState.allowAllModels
          ? "bg-success/10 border border-success/30 text-success"
          : formState.selectedModels.length === 0
            ? "bg-error/10 border border-error/30 text-error"
            : "bg-warning/10 border border-warning/30 text-warning"
      }`}
    >
      <Icon
        name={
          formState.allowAllModels
            ? "info"
            : formState.selectedModels.length === 0
              ? "block"
              : "warning"
        }
        size={16}
        className="shrink-0 mt-0.5"
      />
      <span>
        {formState.allowAllModels
          ? t("allowAllDesc")
          : formState.selectedModels.length === 0
            ? t("templateModelsDenyAllBanner")
            : formatProviderModelPermissionSummary(
                selectedProviderScopes.length,
                selectedExactModels.length,
                t,
                tc
              )}
      </span>
    </div>
  );
}

function UnlistedModelSelections() {
  const { t, updateState, dynamicOrUnlistedModels } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-1.5 p-2.5 rounded border border-info/30 bg-info/5">
      <p className="text-[11px] font-medium text-info">{t("templateDynamicModelPatternsNote")}</p>
      <div className="flex flex-wrap gap-1">
        {dynamicOrUnlistedModels.map((pat) => (
          <span
            key={pat}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
          >
            {pat}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-4 w-4 p-0 text-text-muted hover:text-error"
              onClick={() =>
                updateState((p) => ({
                  ...p,
                  selectedModels: p.selectedModels.filter((m) => m !== pat),
                }))
              }
              aria-label={t("removeSelection", { name: pat })}
            >
              <Icon name="close" size={12} />
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
}

function ModelSelectionControls() {
  const {
    t,
    formState,
    updateState,
    searchModel,
    setSearchModel,
    filteredModelsByProvider,
    expandedProviders,
    handleToggleExpandProvider,
    dynamicOrUnlistedModels,
    customModelPattern,
    setCustomModelPattern,
    permissionModels,
  } = useKeyPolicyEditor();
  return (
    <>
      {/* Dynamic / Custom model pattern entry */}
      <div className="flex gap-2">
        <Input
          value={customModelPattern}
          onChange={(e) => setCustomModelPattern(e.target.value)}
          placeholder={t("templateAddModelPatternPlaceholder")}
          className="flex-1"
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={!customModelPattern.trim()}
          onClick={() => {
            const pat = customModelPattern.trim();
            if (!pat) return;
            updateState((p) => ({
              ...p,
              selectedModels: p.selectedModels.includes(pat)
                ? p.selectedModels
                : [...p.selectedModels, pat],
            }));
            setCustomModelPattern("");
          }}
        >
          {t("templateAddModelPattern")}
        </Button>
      </div>

      {dynamicOrUnlistedModels.length > 0 && <UnlistedModelSelections />}

      <ProviderModelPermissionList
        modelsByProvider={filteredModelsByProvider}
        allModels={permissionModels}
        selectedModels={formState.selectedModels}
        expandedProviders={expandedProviders}
        searchModel={searchModel}
        onSearchChange={setSearchModel}
        onToggleExpand={handleToggleExpandProvider}
        onSelectionChange={(nextModels) =>
          updateState((p) => ({ ...p, selectedModels: nextModels }))
        }
        getModelDisplayName={(id) =>
          id === CLAUDE_CODE_DEFAULT_MODEL_ID ? CLAUDE_CODE_DEFAULT_MODEL_NAME : id
        }
      />
    </>
  );
}

function AddBlockedModelPattern() {
  const { t, updateState, newBlockedPattern, setNewBlockedPattern } = useKeyPolicyEditor();
  return (
    <div className="flex gap-2">
      <Input
        value={newBlockedPattern}
        onChange={(e) => setNewBlockedPattern(e.target.value)}
        placeholder="e.g. anthropic/claude-3-opus*"
        className="flex-1"
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={!newBlockedPattern.trim()}
        onClick={() => {
          const pat = newBlockedPattern.trim();
          if (!pat) return;
          updateState((p) => ({
            ...p,
            blockedModels: p.blockedModels.includes(pat)
              ? p.blockedModels
              : [...p.blockedModels, pat],
          }));
          setNewBlockedPattern("");
        }}
      >
        {t("templateAddBlockedPattern")}
      </Button>
    </div>
  );
}

function BlockedModelPatterns() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 pt-3 border-t border-border/60">
      <p className="text-xs font-semibold text-text-main">{t("templateBlockedModelsTitle")}</p>
      <p className="text-[11px] text-text-muted">{t("templateBlockedModelsDesc")}</p>
      <AddBlockedModelPattern />
      {formState.blockedModels.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {formState.blockedModels.map((pat) => (
            <span
              key={pat}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error/10 border border-error/30 text-error text-xs font-mono"
            >
              {pat}
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="h-4 w-4 p-0 text-error"
                onClick={() =>
                  updateState((p) => ({
                    ...p,
                    blockedModels: p.blockedModels.filter((m) => m !== pat),
                  }))
                }
                aria-label={t("removeSelection", { name: pat })}
              >
                <Icon name="close" size={12} />
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function PublicModelRestriction() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/30">
      <ModelAccessMode />

      <ModelAccessSummary />

      {!formState.allowAllModels && <ModelSelectionControls />}

      {/* Blocked Models (Deny-list always wins) */}
      <BlockedModelPatterns />

      {/* Disable Non-Public Models (Restricts BOTH Execution AND Listing) */}
      <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-warning/30 bg-warning/5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-text-main">{t("disableNonPublicModels")}</p>
            <span className="px-1.5 py-0.5 rounded bg-warning/20 text-warning text-[10px] font-semibold">
              {t("templateExecAndListingBadge")}
            </span>
          </div>
          <p className="text-xs text-text-muted">{t("disableNonPublicModelsDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.disableNonPublicModels}
          onChange={() =>
            updateState((p) => ({
              ...p,
              disableNonPublicModels: !p.disableNonPublicModels,
            }))
          }
          ariaLabel={t("disableNonPublicModels")}
        />
      </div>

      {/* Forced Model */}
      <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
        <Input
          label={t("forcedModel")}
          hint={t("forcedModelDesc")}
          value={formState.forcedModel}
          onChange={(e) => updateState((p) => ({ ...p, forcedModel: e.target.value }))}
          placeholder={t("forcedModelPlaceholder")}
        />
      </div>
    </div>
  );
}
