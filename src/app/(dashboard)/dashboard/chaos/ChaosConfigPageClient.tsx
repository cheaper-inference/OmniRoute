/**
 * /dashboard/chaos — Chaos Mode Configuration Page
 *
 * Allows users to:
 * - Enable/disable chaos mode globally
 * - Set default mode (parallel/collaborative)
 * - Override provider models for chaos mode
 * - Set custom system prompt and max tokens
 * - Configure timeout
 * - Test chaos mode with a simple task
 *
 * State + handlers live in useChaosConfigPage.ts and the JSX sections are
 * split into ./components/* — this file stays a thin composition/render
 * function under the complexity/size ratchet
 * (config/quality/complexity-baseline.json).
 */
"use client";

import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Spinner } from "@/shared/components/Loading";
import { useChaosConfigPage } from "./useChaosConfigPage";
import { ChaosModeSelector } from "./components/ChaosModeSelector";
import { ChaosTestResultsPanel } from "./components/ChaosTestResultsPanel";
import { ChaosProviderOverridesPanel } from "./components/ChaosProviderOverridesPanel";
import { ChaosBasicSettingsFields } from "./components/ChaosBasicSettingsFields";
import { ChaosConfigActionsBar } from "./components/ChaosConfigActionsBar";
import { ChaosStatusMessage } from "./components/ChaosStatusMessage";

export default function ChaosConfigPage() {
  const {
    t,
    config,
    setConfig,
    availableProviders,
    loading,
    saving,
    testing,
    testResult,
    message,
    saveConfig,
    resetConfig,
    testChaos,
    addOverride,
    updateOverride,
    removeOverride,
  } = useChaosConfigPage();

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 h-64 text-text-muted">
        <Spinner label={t("loadingProviderModels")} />
        <span aria-hidden="true">{t("loadingProviderModels")}</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <PageHeader compact title={t("pageTitle")} description={t("pageSubtitle")} />

      {/* Status Message */}
      <ChaosStatusMessage message={message} />

      {/* Enable toggle + timeout + max tokens + system prompt */}
      <ChaosBasicSettingsFields
        settings={config}
        onChange={(patch) => setConfig((prev) => ({ ...prev, ...patch }))}
      />

      {/* Default Mode Selector */}
      <ChaosModeSelector
        mode={config.defaultMode}
        onChange={(defaultMode) => setConfig((prev) => ({ ...prev, defaultMode }))}
        label={t("mode")}
        parallelLabel={t("modeParallel")}
        parallelDesc={t("modeParallelDesc")}
        collaborativeLabel={t("modeCollaborative")}
        collaborativeDesc={t("modeCollaborativeDesc")}
      />

      <ChaosConfigActionsBar
        saving={saving}
        testing={testing}
        testDisabled={!config.enabled}
        onSave={saveConfig}
        onReset={resetConfig}
        onTest={testChaos}
      />

      {/* Test Results */}
      {testResult && <ChaosTestResultsPanel result={testResult} />}

      {/* Provider Overrides */}
      <ChaosProviderOverridesPanel
        overrides={config.providerOverrides}
        availableProviders={availableProviders}
        title={t("providerOverrides")}
        description={t("providerOverridesDesc")}
        addLabel={t("addProvider")}
        onAdd={addOverride}
        onUpdate={updateOverride}
        onRemove={removeOverride}
      />
    </div>
  );
}
