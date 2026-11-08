import { resolveProviderId } from "@/shared/constants/providers";

function tariff(provider: string | undefined): "start" | "individual" | null {
  const id = resolveProviderId(provider || "");
  if (["zcode-start", "zcode-cn-start"].includes(id)) return "start";
  if (["zcode-individual", "zcode-cn-individual"].includes(id)) return "individual";
  return null;
}

export function isZcodeQuotaScopeApplicable(
  provider: string,
  authType: string | null | undefined,
  observedProvider: string | undefined
): boolean {
  if (authType !== "oauth" || observedProvider === undefined) return true;
  const target = resolveProviderId(provider);
  const plan = target === "zcode" ? "start" : tariff(target);
  return plan === null || tariff(observedProvider) === plan;
}

export function resolveSnapshotQuotaProvider(provider: string, scopes: Set<string>): string {
  const mixedZcode =
    scopes.size > 1 && [...scopes].some((scope) => scope === "zcode" || tariff(scope) !== null);
  return mixedZcode ? "zcode" : provider;
}
