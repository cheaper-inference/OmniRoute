"use client";

interface PayloadPreviewProps {
  payload: Record<string, unknown> | null;
  label?: string;
}

export function PayloadPreview({ payload, label }: PayloadPreviewProps) {
  if (!payload) return null;
  return (
    <div className="space-y-1">
      {label && (
        <p className="ci-eyebrow" data-weight="medium">
          {label}
        </p>
      )}
      <pre className="overflow-x-auto rounded-lg bg-bg-subtle p-3 text-xs text-text-main">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
}
