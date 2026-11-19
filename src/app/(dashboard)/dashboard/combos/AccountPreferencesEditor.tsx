"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Select from "@/shared/components/Select";
import CollapsibleSection from "@/shared/components/CollapsibleSection";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import {
  readAccountPreferences,
  type AccountPreference,
} from "@omniroute/open-sse/services/combo/accountPreferences";

type Connection = {
  id: string;
  provider: string;
  name?: string;
  email?: string;
  isActive?: boolean;
  /** Synthesised row for a stored preference whose connection no longer exists. */
  missing?: boolean;
};

function useProviderConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/providers", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("provider-list");
        const body = await response.json();
        if (!Array.isArray(body.connections)) throw new Error("provider-list");
        if (!controller.signal.aborted) {
          setConnections(body.connections);
          setState("ready");
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setState("error");
      });
    return () => controller.abort();
  }, []);

  return { connections, state };
}

export default function AccountPreferencesEditor({
  value,
  onChange,
  disabled = false,
  providerIds,
}: {
  value: unknown;
  onChange: (value: Record<string, AccountPreference>) => void;
  disabled?: boolean;
  /** The builder's current candidate pool; an empty scope means no eligible providers. */
  providerIds?: readonly string[];
}) {
  const t = useTranslations("accountPreferences");
  const { connections, state } = useProviderConnections();
  const emailsVisible = useEmailPrivacyStore((store) => store.emailsVisible);
  const preferences = readAccountPreferences(value);

  const ids = new Set(connections.map((connection) => connection.id));
  const rows: Connection[] = [
    ...connections,
    // Only once the list loaded: before that every stored entry would look missing.
    // Missing rows have no provider, so they bypass the pool filter to stay resettable.
    ...(state === "ready" ? Object.keys(preferences) : [])
      .filter((id) => !ids.has(id))
      .map((id) => ({
        id,
        provider: "",
        name: t("missing", { id }),
        missing: true,
      })),
  ].filter(
    (connection) =>
      connection.missing || providerIds === undefined || providerIds.includes(connection.provider)
  );
  return (
    <CollapsibleSection
      title={t("title")}
      defaultOpen={false}
      count={rows.filter((connection) => preferences[connection.id]).length}
    >
      <p className="mb-3 text-xs text-text-muted">{t("description")}</p>
      {state === "loading" && <p role="status">{t("loading")}</p>}
      {state === "error" && <p role="alert">{t("error")}</p>}
      <div
        role="region"
        aria-label={t("title")}
        tabIndex={0}
        className="max-h-[min(50dvh,24rem)] overflow-y-auto overscroll-contain space-y-3 pr-1"
      >
        {rows.map((connection) => {
          const label = [
            connection.provider,
            pickDisplayValue([connection.name, connection.email], emailsVisible, connection.id),
          ]
            .filter(Boolean)
            .join(" · ");
          return (
            <Select
              key={connection.id}
              label={label}
              value={preferences[connection.id] || "normal"}
              disabled={disabled}
              options={["preferred", "normal", "reserve", "excluded"].map((tier) => ({
                value: tier,
                label: t(tier),
              }))}
              onChange={(event) => {
                const next = { ...preferences };
                const tier = event.target.value as AccountPreference;
                if (tier === "normal") delete next[connection.id];
                else next[connection.id] = tier;
                onChange(next);
              }}
            />
          );
        })}
      </div>
    </CollapsibleSection>
  );
}
