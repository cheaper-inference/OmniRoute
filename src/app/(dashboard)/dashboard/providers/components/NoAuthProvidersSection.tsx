"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@omniroute/ui-kit/page-header";
import { Button, ProviderCardGrid } from "@/shared/components";
import { computeNextBlockedProviders } from "@/shared/utils/noAuthProviders";
import type { ProviderEntry } from "../providerPageUtils";
import ProviderCard from "./ProviderCard";
import { CategoryDot } from "./CategoryDot";
import ProviderCountBadge from "./ProviderCountBadge";

/** Provider shape consumed by {@link ProviderCard} for a no-auth entry. */
interface NoAuthProvider {
  id?: string;
  name: string;
  alias?: string;
  color?: string;
  apiType?: string;
  deprecated?: boolean;
  deprecationReason?: string;
  hasFree?: boolean;
  freeNote?: string;
  subscriptionRisk?: boolean;
  serviceKinds?: string[];
}

type NoAuthEntry = ProviderEntry<NoAuthProvider>;

interface NoAuthProvidersSectionProps {
  /** Visible (non-blocked) entries, already filtered for the active display mode. */
  visibleEntries: NoAuthEntry[];
  /** Count badge props derived from the full visible set (configured/total). */
  count: { configured: number; total: number };
  /** Entries currently in `blockedProviders` — surfaced, never hidden (#5183). */
  blockedEntries: NoAuthEntry[];
  /** Current blocked-provider list (id/alias), used to compute the un-block delta. */
  blockedProviders: string[];
  /** Persist a new blocked-provider list after a block / un-block. */
  onBlockedChange: (next: string[]) => void;
  /** Surface a failure message (block / un-block PATCH failed). */
  onError: (message: string) => void;
  testingMode: string | null;
  onBatchTest: (mode: string) => void;
  onToggleProvider: (providerId: string, toggleAuthType: string, active: boolean) => void;
}

/**
 * The "No Auth" section of the providers page. Disabled (blocked) no-auth
 * providers are surfaced in a dedicated "Disabled" group with an Enable button
 * that un-blocks them in place, instead of vanishing from the page (#5166/#5183).
 *
 * No-auth providers usually have no connection rows, so their card toggle and the
 * Disable all / Enable all actions write `settings.blockedProviders`; each change is
 * also forwarded to `onToggleProvider` so any connection rows follow the same state.
 */
export default function NoAuthProvidersSection({
  visibleEntries,
  count,
  blockedEntries,
  blockedProviders,
  onBlockedChange,
  onError,
  testingMode,
  onBatchTest,
  onToggleProvider,
}: NoAuthProvidersSectionProps) {
  const t = useTranslations("providers");

  const updateBlocked = async (targetIds: string[], enable: boolean) => {
    const previous = blockedProviders;
    const next = computeNextBlockedProviders(previous, targetIds, enable);
    onBlockedChange(next);
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedProviders: next }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error?.message || data?.error || "Failed to update provider");
      }
      onBlockedChange(Array.isArray(data.blockedProviders) ? data.blockedProviders : next);
    } catch (error) {
      onBlockedChange(previous);
      onError(error instanceof Error ? error.message : t("repairEnvFailed"));
    }
  };

  /** Flip the given entries on/off: connection rows via onToggleProvider, plus the block list. */
  const setEntriesActive = (entries: NoAuthEntry[], active: boolean) => {
    for (const { providerId, toggleAuthType } of entries) {
      onToggleProvider(providerId, toggleAuthType, active);
    }
    return updateBlocked(
      entries.map((entry) => entry.providerId),
      active
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionHeader
        title={
          <span className="flex items-center gap-2">
            {t("noAuthProviders")}{" "}
            <CategoryDot category="no-auth" size="md" label={t("noAuthLabel")} />
            <ProviderCountBadge {...count} />
          </span>
        }
        description={t("noAuthProvidersDesc")}
        actions={
          <>
            <Button
              size="sm"
              variant="outline"
              icon="play_arrow"
              loading={testingMode === "no-auth"}
              onClick={() => onBatchTest("no-auth")}
              disabled={!!testingMode}
              title={t("testAll")}
            >
              {testingMode === "no-auth" ? t("testing") : t("testAll")}
            </Button>
            <BulkToggleButtons
              canDisable={visibleEntries.length > 0}
              canEnable={blockedEntries.length > 0}
              onDisableAll={() => setEntriesActive(visibleEntries, false)}
              onEnableAll={() => setEntriesActive(blockedEntries, true)}
            />
          </>
        }
      />
      <ProviderCardGrid>
        {visibleEntries.map((entry) => (
          <ProviderCard
            key={entry.providerId}
            providerId={entry.providerId}
            provider={entry.provider}
            stats={entry.stats}
            authType="no-auth"
            onToggle={(active) => setEntriesActive([entry], active)}
          />
        ))}
      </ProviderCardGrid>
      {blockedEntries.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {t("disabled")}
          </p>
          <ProviderCardGrid>
            {blockedEntries.map((entry) => (
              <div
                key={entry.providerId}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-bg-subtle px-3 py-2.5 opacity-80"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium text-text-main">
                    {entry.provider.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-error">
                    <span className="size-1.5 rounded-full bg-error" />
                    {t("disabled")}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEntriesActive([entry], true)}
                  className="shrink-0"
                  title={t("enableProvider")}
                >
                  {t("enableProvider")}
                </Button>
              </div>
            ))}
          </ProviderCardGrid>
        </div>
      )}
    </div>
  );
}

interface BulkToggleButtonsProps {
  canDisable: boolean;
  canEnable: boolean;
  onDisableAll: () => void;
  onEnableAll: () => void;
}

/** "Disable all" (visible cards) / "Enable all" (disabled cards) section actions. */
function BulkToggleButtons({
  canDisable,
  canEnable,
  onDisableAll,
  onEnableAll,
}: BulkToggleButtonsProps) {
  const tc = useTranslations("common");
  return (
    <>
      {canDisable && (
        <Button
          size="sm"
          variant="outline"
          icon="block"
          onClick={onDisableAll}
          title={`${tc("disable")} ${tc("all")}`}
        >
          {tc("disable")} {tc("all")}
        </Button>
      )}
      {canEnable && (
        <Button
          size="sm"
          variant="outline"
          icon="check_circle"
          onClick={onEnableAll}
          title={`${tc("enable")} ${tc("all")}`}
        >
          {tc("enable")} {tc("all")}
        </Button>
      )}
    </>
  );
}
