import {
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import { supportsProviderQuota } from "@/shared/utils/providerQuotaVisibility";
import type { ProviderConnectionLike } from "./credentialRefresh";

/** Why a connection cannot be polled for usage, naming the part the operator can change. */
export function usageUnavailableMessage(connection: ProviderConnectionLike): string {
  const { provider, authType } = connection;
  if (supportsProviderQuota(provider, connection)) {
    return `Usage for ${provider} is available, but ${authType} connections cannot be polled.`;
  }
  if (isOpenAICompatibleProvider(provider) || isAnthropicCompatibleProvider(provider)) {
    return `Usage for ${provider} needs a quotaEndpoint in the connection settings.`;
  }
  return `${provider} has no usage/quota API registered.`;
}
