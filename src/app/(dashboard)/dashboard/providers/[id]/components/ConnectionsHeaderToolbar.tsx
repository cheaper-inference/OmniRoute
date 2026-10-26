"use client";

import Icon from "@/shared/components/Icon";

import { ActionBar, Button, DistributeProxiesButton, Select, Toggle } from "@/shared/components";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";
import type { CodexGlobalServiceMode } from "@/lib/providers/codexFastTier";
import AccountProxyResetButton from "./AccountProxyResetButton";

type ConnectionsHeaderToolbarProps = {
  providerId: string;
  providerInfo: any; // resolveDashboardProviderInfo result
  isCompatible: boolean;
  isCommandCode: boolean;
  isOAuth: boolean;
  supportsDualAuth: boolean;
  providerSupportsPat: boolean;
  connections: any[]; // ConnectionRowConnection[]
  batchTesting: boolean;
  batchRetesting: boolean;
  retestingId: string | null;
  distributingProxies?: boolean;
  proxyConfig: any;
  reorderingByAvailability: boolean;
  handleReorderByAvailability: () => void | Promise<void>;
  // from useProviderSettings
  preferClaudeCodeForUnprefixedClaudeModels: boolean;
  claudeRoutingSettingsLoaded: boolean;
  claudeRoutingSettingsLoadError: string | null;
  savingClaudeRoutingPreference: boolean;
  handleToggleClaudeRoutingPreference: () => void;
  loadClaudeRoutingSettings: () => Promise<void>;
  codexGlobalServiceMode: string;
  codexGlobalServiceModeOptions: Array<{ value: string; label: string }>;
  codexSettingsLoaded: boolean;
  codexSettingsLoadError: string | null;
  savingCodexGlobalServiceMode: boolean;
  handleChangeCodexGlobalServiceMode: (mode: any) => void;
  loadCodexSettings: () => Promise<void>;
  // Modal triggers
  onSetProxyTarget: (target: { level: string; id: string; label: string }) => void;
  handleDistributeProxies: () => void;
  onAccountProxiesReset: () => Promise<void>;
  handleBatchTestAll: () => void;
  gateConnectionFlow: (callback: () => void) => void;
  openApiKeyAddFlow: () => void;
  openPrimaryAddFlow: () => void;
  connectVolcengineAccount?: () => void;
  connectingVolcengineAccount?: boolean;
  openExternalLinkFlow: () => void;
  handleOpenCommandCodeConnect: () => void;
  commandCodeAuthState: { phase: string };
  onOpenOAuthModal: () => void;
  onOpenCodexCliGuide: () => void;
  onOpenImportCodex: () => void;
  onOpenImportClaude: () => void;
  onOpenImportGemini: () => void;
  onOpenImportGrokCli: () => void;
  t: ProviderMessageTranslator;
};

export default function ConnectionsHeaderToolbar({
  providerId,
  providerInfo,
  isCompatible,
  isCommandCode,
  isOAuth,
  supportsDualAuth,
  providerSupportsPat,
  connections,
  batchTesting,
  batchRetesting,
  retestingId,
  distributingProxies = false,
  proxyConfig,
  reorderingByAvailability,
  handleReorderByAvailability,
  preferClaudeCodeForUnprefixedClaudeModels,
  claudeRoutingSettingsLoaded,
  claudeRoutingSettingsLoadError,
  savingClaudeRoutingPreference,
  handleToggleClaudeRoutingPreference,
  loadClaudeRoutingSettings,
  codexGlobalServiceMode,
  codexGlobalServiceModeOptions,
  codexSettingsLoaded,
  codexSettingsLoadError,
  savingCodexGlobalServiceMode,
  handleChangeCodexGlobalServiceMode,
  loadCodexSettings,
  onSetProxyTarget,
  handleDistributeProxies,
  onAccountProxiesReset,
  handleBatchTestAll,
  gateConnectionFlow,
  openApiKeyAddFlow,
  openPrimaryAddFlow,
  connectVolcengineAccount,
  connectingVolcengineAccount,
  openExternalLinkFlow,
  handleOpenCommandCodeConnect,
  commandCodeAuthState,
  onOpenOAuthModal,
  onOpenCodexCliGuide,
  onOpenImportCodex,
  onOpenImportClaude,
  onOpenImportGemini,
  onOpenImportGrokCli,
  t,
}: ConnectionsHeaderToolbarProps) {
  return (
    <div
      className={`mb-4 flex flex-col gap-3 ${providerId === "codex" ? "" : "sm:flex-row sm:items-center sm:justify-between"}`}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold">{t("connections")}</h2>
        {providerId === "claude" && (
          <div
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-subtle px-2 py-1 text-xs font-medium text-text-muted"
            title={providerText(
              t,
              "preferClaudeCodeForUnprefixedClaudeModelsTooltip",
              "Route bare claude-* model IDs from Claude Code clients through the Claude Code account instead of asking for a provider prefix."
            )}
          >
            <Icon name="alt_route" size={14} className="text-primary" />
            <span>
              {providerText(
                t,
                "preferClaudeCodeForUnprefixedClaudeModelsLabel",
                "Claude Code default"
              )}
            </span>
            <Toggle
              size="sm"
              checked={preferClaudeCodeForUnprefixedClaudeModels}
              onChange={handleToggleClaudeRoutingPreference}
              disabled={savingClaudeRoutingPreference || !claudeRoutingSettingsLoaded}
              ariaLabel={providerText(
                t,
                "preferClaudeCodeForUnprefixedClaudeModelsAria",
                "Prefer Claude Code for unprefixed Claude models"
              )}
              title={
                preferClaudeCodeForUnprefixedClaudeModels
                  ? providerText(
                      t,
                      "preferClaudeCodeForUnprefixedClaudeModelsDisable",
                      "Disable Claude Code preference for bare claude-* model IDs"
                    )
                  : providerText(
                      t,
                      "preferClaudeCodeForUnprefixedClaudeModelsEnable",
                      "Enable Claude Code preference for bare claude-* model IDs"
                    )
              }
            />
            <span className="text-[11px] text-text-muted/70">
              {preferClaudeCodeForUnprefixedClaudeModels
                ? providerText(t, "toggleOnShort", "On")
                : providerText(t, "toggleOffShort", "Off")}
            </span>
            {claudeRoutingSettingsLoadError ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => void loadClaudeRoutingSettings()}
                className="h-6 min-h-0 px-2 text-[11px]"
                title={claudeRoutingSettingsLoadError}
              >
                {providerText(t, "retry", "Retry")}
              </Button>
            ) : null}
          </div>
        )}
        {providerId === "codex" && (
          <div
            className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-lg border border-border bg-bg-subtle px-2 py-1 text-xs font-medium text-text-muted"
            title={providerText(
              t,
              "providerDetailServiceModeTooltip",
              "Set a global Codex service mode, or leave accounts on their individual service-tier setting."
            )}
          >
            <span>{providerText(t, "providerDetailServiceModeLabel", "Global service mode:")}</span>
            <Select
              compact
              value={codexGlobalServiceMode}
              onChange={(event) =>
                handleChangeCodexGlobalServiceMode(event.target.value as CodexGlobalServiceMode)
              }
              disabled={savingCodexGlobalServiceMode || !codexSettingsLoaded}
              aria-label={providerText(t, "globalCodexServiceMode", "Global Codex service mode")}
              className="min-w-0 max-w-full"
              selectClassName="text-xs"
            >
              {codexGlobalServiceModeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {codexSettingsLoadError ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => void loadCodexSettings()}
                className="h-6 min-h-0 px-2 text-[11px]"
                title={codexSettingsLoadError}
              >
                {providerText(t, "retry", "Retry")}
              </Button>
            ) : null}
          </div>
        )}
        {/* Provider-level proxy indicator/button */}
        <Button
          variant="ghost"
          size="sm"
          icon="vpn_lock"
          onClick={() =>
            onSetProxyTarget({
              level: "provider",
              id: providerId,
              label: providerInfo?.name || providerId,
            })
          }
          className={`h-auto min-h-0 gap-1 rounded px-2 py-1 text-xs font-medium ${
            proxyConfig?.providers?.[providerId]
              ? "bg-warning/15 text-warning hover:bg-warning/25"
              : "bg-bg-subtle text-text-muted/50 hover:text-text-muted hover:bg-bg-subtle"
          }`}
          title={
            proxyConfig?.providers?.[providerId]
              ? t("providerProxyTitleConfigured", {
                  host: proxyConfig.providers[providerId].host || t("configured"),
                })
              : t("providerProxyConfigureHint")
          }
        >
          {proxyConfig?.providers?.[providerId]
            ? proxyConfig.providers[providerId].host || t("providerProxy")
            : t("providerProxy")}
        </Button>
      </div>
      <ActionBar align={providerId === "codex" ? "start" : "end"}>
        {connections.length > 0 && (
          <DistributeProxiesButton
            onDistribute={async () => {
              await handleDistributeProxies();
            }}
            disabled={batchTesting || batchRetesting || distributingProxies || !!retestingId}
          />
        )}
        {connections.length > 0 && (
          <AccountProxyResetButton
            connectionIds={connections.map((connection) => connection.id)}
            disabled={batchTesting || batchRetesting || distributingProxies || !!retestingId}
            onReset={onAccountProxiesReset}
          />
        )}
        {connections.length > 1 && (
          <Button
            size="sm"
            variant="outline"
            icon="play_arrow"
            loading={batchTesting}
            onClick={handleBatchTestAll}
            disabled={batchTesting || batchRetesting || !!retestingId}
            title={t("testAll")}
            aria-label={t("testAll")}
          >
            {batchTesting ? t("testing") : t("testAll")}
          </Button>
        )}
        {connections.length > 1 && (
          <Button
            size="sm"
            variant="secondary"
            icon="swap_vert"
            loading={reorderingByAvailability}
            disabled={batchTesting || !!retestingId}
            onClick={() => void handleReorderByAvailability()}
            title={providerText(
              t,
              "reorderByAvailabilityTitle",
              "Reorder connections by availability"
            )}
          >
            {providerText(t, "reorderByAvailability", "Reorder")}
          </Button>
        )}
        {!isCompatible ? (
          <>
            {isCommandCode || supportsDualAuth ? (
              <>
                <Button
                  size="sm"
                  icon="open_in_new"
                  loading={
                    isCommandCode &&
                    (commandCodeAuthState.phase === "starting" ||
                      commandCodeAuthState.phase === "polling" ||
                      commandCodeAuthState.phase === "applying")
                  }
                  onClick={() =>
                    gateConnectionFlow(
                      isCommandCode ? handleOpenCommandCodeConnect : openPrimaryAddFlow
                    )
                  }
                >
                  {providerText(t, "connect", "Connect")}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  icon="add"
                  onClick={() => gateConnectionFlow(openApiKeyAddFlow)}
                >
                  {providerText(t, "manualApiKey", "Manual API key")}
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" icon="add" onClick={() => gateConnectionFlow(openPrimaryAddFlow)}>
                  {providerSupportsPat ? providerText(t, "addPat", "Add PAT") : t("add")}
                </Button>
                {(providerId === "volcengine-agent-plan" ||
                  providerId === "volcengine-coding-plan") &&
                  connectVolcengineAccount && (
                    <Button
                      size="sm"
                      variant="secondary"
                      icon="login"
                      loading={connectingVolcengineAccount}
                      onClick={() => gateConnectionFlow(connectVolcengineAccount)}
                    >
                      {providerText(t, "connectVolcengineAccount", "Connect Volcano Account")}
                    </Button>
                  )}
                {providerId === "qoder" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => gateConnectionFlow(onOpenOAuthModal)}
                  >
                    {providerText(t, "experimentalOauth", "Experimental OAuth")}
                  </Button>
                )}
                {providerId === "codex" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="menu_book"
                    onClick={() => onOpenCodexCliGuide()}
                  >
                    {providerText(t, "codexCliGuideButton", "Codex CLI Guide")}
                  </Button>
                )}
                {providerId === "codex" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="share"
                    onClick={() => gateConnectionFlow(openExternalLinkFlow)}
                  >
                    {providerText(t, "codexExternalLinkButton", "External Codex link")}
                  </Button>
                )}
                {providerId === "codex" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="upload_file"
                    onClick={() => gateConnectionFlow(onOpenImportCodex)}
                  >
                    {providerText(t, "importCodexAuth", "Import auth")}
                  </Button>
                )}
                {providerId === "claude" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="upload_file"
                    onClick={() => gateConnectionFlow(onOpenImportClaude)}
                  >
                    {providerText(t, "importClaudeAuth", "Import auth")}
                  </Button>
                )}
                {providerId === "grok-cli" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="upload_file"
                    onClick={() => gateConnectionFlow(onOpenImportGrokCli)}
                  >
                    {providerText(t, "importGrokAuth", "Import auth")}
                  </Button>
                )}
              </>
            )}
          </>
        ) : (
          connections.length === 0 && (
            <Button size="sm" icon="add" onClick={() => gateConnectionFlow(openApiKeyAddFlow)}>
              {t("add")}
            </Button>
          )
        )}
      </ActionBar>
    </div>
  );
}
