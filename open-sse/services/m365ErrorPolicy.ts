function parsedError(errorText: unknown): Record<string, unknown> {
  try {
    const parsed: unknown = typeof errorText === "string" ? JSON.parse(errorText) : errorText;
    if (parsed && typeof parsed === "object") {
      const record = parsed as Record<string, unknown>;
      const inner = record.error ?? record;
      if (inner && typeof inner === "object") return inner as Record<string, unknown>;
    }
  } catch {
    // A plain native result code is also accepted; arbitrary prose is not a code.
  }
  return {};
}

/** Native M365 errors have mixed scope; this is not a passthrough provider. */
export function getM365FailureScope(
  provider: string | null | undefined,
  status: number,
  errorText: unknown,
  structuredError?: { code?: unknown } | null
): "model" | "connection" | null {
  if (provider !== "copilot-m365-web") return null;
  const error = parsedError(errorText);
  const codes = [
    structuredError?.code,
    error.code,
    error.m365_error_code,
    error.errorCode,
    errorText,
  ];
  if (
    status === 403 &&
    codes.some((code) => code === "m365_account_not_licensed" || code === "InvalidCopilotLicense")
  )
    return "connection";
  if (
    status === 403 &&
    codes.some(
      (code) =>
        code === "m365_model_not_licensed" ||
        code === "PremiumModelUnavailableForLicense" ||
        code === "ClaudeUnavailableForLicense"
    )
  )
    return "model";
  if (status === 429) {
    if (codes.includes("priority_access_exhausted")) return "model";
    // Per-user throttling (including an unclassified native 429) is account-wide.
    return "connection";
  }
  return null;
}
