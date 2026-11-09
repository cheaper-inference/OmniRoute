"use client";

import { useState, type ReactNode } from "react";
import { Input, Toggle } from "@/shared/components";
import { clampBankedResetNumber } from "./bankedResetAutoApplyClient";

export function BankedResetSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-border pt-4 first:border-t-0 first:pt-0">
      <div>
        <h4 className="text-sm font-semibold text-text-main">{title}</h4>
        {description ? <p className="mt-0.5 text-xs text-text-muted">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

/** A labelled switch row: title + optional help on the left, the switch on the right. */
export function BankedResetToggleRow({
  label,
  help,
  note,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  help?: string;
  note?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-text-main">{label}</p>
          {help ? <p className="text-xs text-text-muted">{help}</p> : null}
        </div>
        <Toggle checked={checked} onChange={onChange} disabled={disabled} ariaLabel={label} />
      </div>
      {note ? <p className="text-xs text-text-muted">{note}</p> : null}
    </div>
  );
}

/**
 * Integer input that keeps a local draft and commits (clamped to [0, max]) on blur or Enter,
 * never per keystroke. A commit that changes nothing does not save.
 */
export function BankedResetNumberField({
  label,
  hint,
  value,
  max,
  disabled,
  onCommit,
}: {
  label: string;
  hint?: string;
  value: number;
  max: number;
  disabled?: boolean;
  onCommit: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  // Follows the stored value: after a save, and when a failed save restores the old one.
  const [syncedValue, setSyncedValue] = useState(value);
  if (syncedValue !== value) {
    setSyncedValue(value);
    setDraft(String(value));
  }

  const commit = () => {
    const next = clampBankedResetNumber(draft, max, value);
    setDraft(String(next));
    if (next !== value) onCommit(next);
  };

  return (
    <Input
      type="number"
      inputMode="numeric"
      label={label}
      hint={hint}
      min={0}
      max={max}
      step={1}
      value={draft}
      disabled={disabled}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
      }}
    />
  );
}
