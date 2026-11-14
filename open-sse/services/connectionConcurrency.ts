export function resolveConnectionConcurrencyCeiling(
  provider: string | null | undefined
): number | null {
  return provider === "copilot-m365-web" ? 1 : null;
}

export function resolveAccountConcurrencyLimit(
  configured: number | null,
  override: number | null,
  protectionEnabled: boolean
): number | null {
  return protectionEnabled && override != null && override > 0 ? override : configured;
}
