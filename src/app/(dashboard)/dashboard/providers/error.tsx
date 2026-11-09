"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";

type ProviderMessageTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) return t(key, values);
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}

export default function ProvidersError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("providers");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px]"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-error">
          {providerText(t, "pageLoadErrorTitle", "Failed to load providers")}
        </h2>
        <p className="text-text-muted max-w-md">
          {providerText(
            t,
            "pageLoadErrorDescription",
            "We could not load provider data right now. Check your connection and try again."
          )}
        </p>
        {_error?.digest && (
          <p className="text-xs text-text-muted font-mono">
            {providerText(t, "pageLoadErrorId", "Error ID: {id}", { id: _error.digest })}
          </p>
        )}
        {process.env.NODE_ENV === "development" && _error?.message && (
          <p className="text-xs text-error font-mono">{_error.message}</p>
        )}
        <Button onClick={reset}>{providerText(t, "pageLoadErrorRetry", "Try Again")}</Button>
      </div>
    </div>
  );
}
