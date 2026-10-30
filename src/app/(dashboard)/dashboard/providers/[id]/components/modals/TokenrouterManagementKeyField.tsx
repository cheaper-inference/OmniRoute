"use client";

import { Input } from "@/shared/components";
import type { ProviderMessageTranslator } from "../../providerPageHelpers";

// TokenRouter's inference key is rejected by its Management API, so the quota tracker
// (open-sse/services/usage/tokenrouter.ts) reads an optional account-level Management Key
// from providerSpecificData.consoleApiKey. Persistence lives in
// connectionProviderSpecificData.ts (CONSOLE_API_KEY_PROVIDERS). The API never returns the
// stored key, so the edit field starts empty and an empty submit keeps the saved key.
type TokenrouterManagementKeyFieldProps = {
  provider?: string;
  value: string;
  onChange: (consoleApiKey: string) => void;
  t: ProviderMessageTranslator;
};

export default function TokenrouterManagementKeyField({
  provider,
  value,
  onChange,
  t,
}: TokenrouterManagementKeyFieldProps) {
  if (provider !== "tokenrouter") return null;
  return (
    <Input
      label={t("tokenrouterManagementKeyLabel")}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="sk-..."
      hint={t("tokenrouterManagementKeyHint")}
      type="password"
      autoComplete="off"
    />
  );
}
