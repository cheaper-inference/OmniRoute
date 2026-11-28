"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Notice, Spinner, Toggle } from "@/shared/components";
import { getProviderAlias } from "@/shared/constants/providers";
import { useNotificationStore } from "@/store/notificationStore";
import { providerText } from "../providerPageHelpers";

interface ProviderCombosOnlyCardProps {
  providerId: string;
  /** Initial state, from the `/api/provider-models` payload the page already fetched. */
  initialCombosOnly?: boolean;
}

/**
 * Provider-level "combos only" default (`settings.combosOnlyProviders`).
 *
 * Every model of this provider with no explicit override inherits `combos_only`: hidden from
 * `/v1/models` and rejected on a direct call, but still reachable from a stored combo. The
 * per-model control in the list below is the positive exception (`visible`) or the stronger
 * `hidden`.
 *
 * Self-contained on purpose — the toggle only needs one settings round trip, so it does not
 * widen the provider page's prop surface or the `useModelCompatState` dependency graph.
 */
export default function ProviderCombosOnlyCard({
  providerId,
  initialCombosOnly = false,
}: ProviderCombosOnlyCardProps) {
  const t = useTranslations("providers");
  const notify = useNotificationStore();
  const [enabled, setEnabled] = useState(initialCombosOnly);
  const [saving, setSaving] = useState(false);
  const providerAlias = getProviderAlias(providerId);

  // The server values are authoritative; the prop only seeds the first paint so the switch
  // does not flicker from off to on after a fetch.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { combosOnlyProviders?: unknown };
        if (cancelled || !Array.isArray(data.combosOnlyProviders)) return;
        const keys = new Set<string>([providerId]);
        if (typeof providerAlias === "string" && providerAlias) keys.add(providerAlias);
        setEnabled(data.combosOnlyProviders.some((entry) => keys.has(String(entry))));
      } catch {
        // Keep the seeded value; the switch still works (the PATCH sends the full list).
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [providerAlias, providerId]);

  const handleChange = useCallback(
    async (nextEnabled: boolean) => {
      const keys = new Set<string>([providerId]);
      if (typeof providerAlias === "string" && providerAlias) keys.add(providerAlias);

      setEnabled(nextEnabled);
      setSaving(true);
      try {
        const res = await fetch("/api/settings", { cache: "no-store" });
        const current = res.ok ? await res.json() : {};
        const existing = Array.isArray(current?.combosOnlyProviders)
          ? (current.combosOnlyProviders as unknown[]).map(String)
          : [];
        const others = existing.filter((entry) => !keys.has(entry));
        const next = nextEnabled ? [...others, ...keys] : others;

        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ combosOnlyProviders: next }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(
            data?.error?.message ||
              providerText(
                t,
                "combosOnlyProviderUpdateFailed",
                "Failed to save the provider default"
              )
          );
        }
        setEnabled(
          Array.isArray(data?.combosOnlyProviders)
            ? data.combosOnlyProviders.some((entry: unknown) => keys.has(String(entry)))
            : nextEnabled
        );
        notify.success(
          nextEnabled
            ? providerText(
                t,
                "combosOnlyProviderEnabled",
                "New models from this provider default to combos-only"
              )
            : providerText(
                t,
                "combosOnlyProviderDisabled",
                "This provider's models are callable directly again"
              )
        );
      } catch (error) {
        setEnabled(!nextEnabled);
        notify.error(
          error instanceof Error
            ? error.message
            : providerText(
                t,
                "combosOnlyProviderUpdateFailed",
                "Failed to save the provider default"
              )
        );
      } finally {
        setSaving(false);
      }
    },
    [notify, providerAlias, providerId, t]
  );

  return (
    <Card>
      <h2 className="mb-2 text-lg">{providerText(t, "providerVisibility", "Model visibility")}</h2>
      <p className="mb-4 text-sm text-text-muted">
        {providerText(
          t,
          "providerVisibilityDesc",
          "Choose how this provider's models reach your clients by default. A per-model choice below always wins."
        )}
      </p>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium">
            {providerText(t, "combosOnlyProviderTitle", "Combos only")}
          </p>
          <p className="text-xs text-text-muted">
            {providerText(
              t,
              "combosOnlyProviderDesc",
              "Models stay reachable from combos but are hidden from /v1/models and rejected on a direct call."
            )}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {saving && <Spinner decorative size="xs" />}
          <Toggle
            checked={enabled}
            onChange={(next) => void handleChange(next)}
            disabled={saving}
            size="sm"
            ariaLabel={providerText(t, "combosOnlyProviderTitle", "Combos only")}
          />
        </div>
      </div>
      {enabled && (
        <Notice variant="info" icon="call_split" className="mt-3">
          {providerText(
            t,
            "combosOnlyProviderNotice",
            "Every model here is combos-only unless you mark it Visible in the list below."
          )}
        </Notice>
      )}
    </Card>
  );
}
