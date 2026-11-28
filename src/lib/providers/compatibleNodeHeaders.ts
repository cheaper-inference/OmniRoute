import { applyCustomHeaders } from "@omniroute/open-sse/executors/default/customHeaders.ts";
import {
  isAnthropicCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";

type ProviderData = Record<string, unknown>;

function headersByName(raw: unknown) {
  const headers: Record<string, string> = Object.create(null);
  applyCustomHeaders(headers, raw);
  return new Map(
    Object.entries(headers).map(([name, value]) => [name.toLowerCase(), [name, value] as const])
  );
}

function overrideNames(data: ProviderData): Set<string> {
  const names = data.customHeaderOverrideNames;
  return new Set(Array.isArray(names) ? names : []);
}

export function trackCompatibleHeaderOverrides(
  provider: unknown,
  incoming: ProviderData,
  existing: ProviderData,
  updated: ProviderData
): void {
  if (!Object.hasOwn(incoming, "customHeaders")) return;
  if (!isOpenAICompatibleProvider(provider) && !isAnthropicCompatibleProvider(provider)) return;

  const previous = headersByName(existing.customHeaders);
  const overrides = overrideNames(existing);
  const names = [];
  for (const [key, [, value]] of headersByName(updated.customHeaders)) {
    // Forms can echo stored headers with an unrelated edit. Keep their existing origin.
    if (overrides.has(key) || previous.get(key)?.[1] !== value) names.push(key);
  }
  updated.customHeaderOverrideNames = names.length ? names : undefined;
}

export function syncCompatibleHeaders(
  data: ProviderData,
  previousNodeHeaders: unknown,
  nextNodeHeaders: unknown
): void {
  const previous = headersByName(previousNodeHeaders);
  const effective = headersByName(nextNodeHeaders);
  const overrides = overrideNames(data);
  const names = [];
  for (const [key, header] of headersByName(data.customHeaders)) {
    // Legacy copies matching the old node value are inherited. Connection storage trims values.
    if (!overrides.has(key) && previous.get(key)?.[1].trim() === header[1].trim()) continue;
    effective.set(key, header);
    names.push(key);
  }
  data.customHeaders = effective.size ? Object.fromEntries(effective.values()) : undefined;
  data.customHeaderOverrideNames = names.length ? names : undefined;
}
