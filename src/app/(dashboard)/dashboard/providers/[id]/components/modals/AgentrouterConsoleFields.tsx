"use client";

import { Input } from "@/shared/components";
import type { ProviderMessageTranslator } from "../../providerPageHelpers";
import TokenrouterManagementKeyField from "./TokenrouterManagementKeyField";

// #6850 — the AgentRouter quota tracker (open-sse/services/agentrouterQuotaFetcher.ts)
// reads providerSpecificData.consoleApiKey (New-API System Access Token, same generic
// field bailian-coding-plan uses for its console token) and providerSpecificData.newApiUserId
// (the New-Api-User header value) — never the routing apiKey. Persist logic lives in
// connectionProviderSpecificData.ts; this component is the only dashboard UI that lets an
// operator set both for provider "agentrouter". It is also the Add/Edit modals' mount point
// for TokenRouter's optional Management Key (same consoleApiKey field), which keeps the
// size-frozen modals untouched.
export type AgentrouterConsoleFieldValues = {
  consoleApiKey: string;
  newApiUserId: string;
};

type AgentrouterConsoleFieldsProps = {
  provider?: string;
  values: AgentrouterConsoleFieldValues;
  onChange: (patch: Partial<AgentrouterConsoleFieldValues>) => void;
  t: ProviderMessageTranslator;
};

export default function AgentrouterConsoleFields({
  provider,
  values,
  onChange,
  t,
}: AgentrouterConsoleFieldsProps) {
  if (provider === "tokenrouter") {
    return (
      <TokenrouterManagementKeyField
        provider={provider}
        value={values.consoleApiKey}
        onChange={(consoleApiKey) => onChange({ consoleApiKey })}
        t={t}
      />
    );
  }
  if (provider !== "agentrouter") return null;
  return (
    <>
      <Input
        label={t("consoleApiKeyOracleLabel")}
        value={values.consoleApiKey}
        onChange={(e) => onChange({ consoleApiKey: e.target.value })}
        placeholder={t("consoleApiKeyOraclePlaceholder")}
        hint={t("consoleApiKeyOracleHint")}
        type="password"
      />
      <Input
        label={t("newApiUserIdLabel")}
        value={values.newApiUserId}
        onChange={(e) => onChange({ newApiUserId: e.target.value })}
        placeholder={t("newApiUserIdPlaceholder")}
        hint={t("newApiUserIdHint")}
      />
    </>
  );
}
