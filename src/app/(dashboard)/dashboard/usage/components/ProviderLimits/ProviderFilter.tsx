"use client";

import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";

type Props = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  labels: Record<string, string>;
  allLabel: string;
  ariaLabel: string;
};

export default function ProviderFilter({
  options,
  value,
  onChange,
  labels,
  allLabel,
  ariaLabel,
}: Props) {
  return (
    <details className="relative min-w-48 max-w-full">
      <summary
        aria-label={ariaLabel}
        className="cursor-pointer rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-main"
      >
        {value.length ? value.map((id) => labels[id] || id).join(", ") : allLabel}
      </summary>
      <div
        role="group"
        aria-label={ariaLabel}
        className="absolute left-0 z-30 mt-1 max-h-72 w-72 max-w-[80vw] overflow-y-auto overscroll-contain rounded-lg border border-border bg-surface p-2 shadow-lg"
      >
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          onClick={() => onChange([])}
          className="justify-start"
        >
          {allLabel}
        </Button>
        {options.map((id) => (
          <Checkbox
            key={id}
            className="rounded px-2 py-2 text-sm hover:bg-bg"
            label={labels[id] || id}
            checked={value.includes(id)}
            onChange={(event) =>
              onChange(event.target.checked ? [...value, id] : value.filter((item) => item !== id))
            }
          />
        ))}
      </div>
    </details>
  );
}
