"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Icon from "@/shared/components/Icon";
import Select from "@/shared/components/Select";
import { BATCH_SUPPORTED_PROVIDERS, SUPPORTED_BATCH_ENDPOINTS } from "@/lib/batches/types";
import type { WizardDestination } from "@/lib/batches/types";

interface AvailableProvider {
  id: string;
  name: string;
  models: string[];
}

interface DestinationStepProps {
  destination: WizardDestination | null;
  onChange: (destination: WizardDestination | null) => void;
  availableProviders: AvailableProvider[];
}

export default function DestinationStep({
  destination,
  onChange,
  availableProviders,
}: DestinationStepProps) {
  const t = useTranslations("common");

  // Filter providers to only those with batch support (D16)
  const batchProviders = availableProviders.filter((p) =>
    BATCH_SUPPORTED_PROVIDERS.includes(p.id as (typeof BATCH_SUPPORTED_PROVIDERS)[number])
  );

  if (batchProviders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <Icon name="cloud_off" size={36} className="text-text-muted" />
        <p className="text-sm text-text-muted max-w-sm">{t("wizardEmptyProviders")}</p>
        <Link
          href="/dashboard/providers"
          className="text-sm text-accent underline underline-offset-2 hover:opacity-80"
        >
          {t("wizardDestinationConnectProvider")}
        </Link>
      </div>
    );
  }

  const selectedProvider = destination?.provider ?? "";
  const selectedEndpoint = destination?.endpoint ?? "/v1/chat/completions";
  const selectedModel = destination?.model ?? "";

  const providerModels = batchProviders.find((p) => p.id === selectedProvider)?.models ?? [];

  function handleProviderChange(providerId: string) {
    if (!providerId) {
      onChange(null);
      return;
    }
    // Validate provider type
    const validProvider = BATCH_SUPPORTED_PROVIDERS.includes(
      providerId as (typeof BATCH_SUPPORTED_PROVIDERS)[number]
    );
    if (!validProvider) return;
    const provider = providerId as WizardDestination["provider"];
    const models = batchProviders.find((p) => p.id === provider)?.models ?? [];
    onChange({
      provider,
      endpoint: selectedEndpoint,
      model: models[0] ?? "",
    });
  }

  function handleEndpointChange(endpoint: string) {
    if (!selectedProvider) return;
    onChange({
      provider: selectedProvider as WizardDestination["provider"],
      endpoint: endpoint as WizardDestination["endpoint"],
      model: selectedModel,
    });
  }

  function handleModelChange(model: string) {
    if (!selectedProvider) return;
    onChange({
      provider: selectedProvider as WizardDestination["provider"],
      endpoint: selectedEndpoint,
      model,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Provider */}
      <Select
        label={t("wizardProviderLabel")}
        value={selectedProvider}
        onChange={(e) => handleProviderChange(e.target.value)}
      >
        <option value="">{t("wizardDestinationSelectProvider")}</option>
        {batchProviders.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </Select>

      {/* Endpoint */}
      <Select
        label={t("wizardEndpointLabel")}
        value={selectedEndpoint}
        disabled={!selectedProvider}
        onChange={(e) => handleEndpointChange(e.target.value)}
      >
        {SUPPORTED_BATCH_ENDPOINTS.map((ep) => (
          <option key={ep} value={ep}>
            {ep}
          </option>
        ))}
      </Select>

      {/* Model */}
      <Select
        label={t("wizardModelLabel")}
        value={selectedModel}
        disabled={!selectedProvider || providerModels.length === 0}
        onChange={(e) => handleModelChange(e.target.value)}
      >
        <option value="">{t("wizardDestinationSelectModel")}</option>
        {providerModels.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
    </div>
  );
}
