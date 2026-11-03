"use client";

import Button from "@/shared/components/Button";

export default function MitmProxyError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px]"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-error">Failed to load MITM proxy</h2>
        <p className="text-text-muted max-w-md">
          We could not load MITM proxy data right now. Check your connection and try again.
        </p>
        {_error?.digest && (
          <p className="text-xs text-text-muted font-mono">Error ID: {_error.digest}</p>
        )}
        {process.env.NODE_ENV === "development" && _error?.message && (
          <p className="text-xs text-error font-mono">{_error.message}</p>
        )}
        <Button variant="primary" onClick={reset}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
