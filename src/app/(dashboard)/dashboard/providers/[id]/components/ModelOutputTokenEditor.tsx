"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input as KitInput } from "@omniroute/ui-kit/input";
import { Button } from "@/shared/components";
import { parseContextWindowOverrideInput, providerText } from "../providerPageHelpers";

type Props = {
  modelId: string;
  value?: number | null;
  saving?: boolean;
  onSave?: (modelId: string, value: number | null) => Promise<boolean>;
  t: (key: string, values?: Record<string, unknown>) => string;
};

function OutputTokenValue({ value, label }: { value?: number | null; label: string }) {
  if (typeof value !== "number") return null;
  return (
    <span className="rounded-full bg-info/15 px-1.5 py-0.5 text-[10px] text-info" title={label}>
      {value.toLocaleString()}
    </span>
  );
}

export default function ModelOutputTokenEditor({ modelId, value, saving, onSave, t }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!editing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [editing]);
  const save = async () => {
    if (!onSave || saving) return;
    const parsed = parseContextWindowOverrideInput(draft);
    const invalid =
      parsed.invalid || (parsed.value !== null && !Number.isSafeInteger(parsed.value));
    const accepted = await onSave(modelId, invalid ? Number.NaN : parsed.value);
    if (!invalid && accepted) setEditing(false);
  };
  if (!editing)
    return (
      <>
        <OutputTokenValue value={value} label={t("maxOutputTokenOverrideLabel")} />
        {onSave && (
          <Button
            variant="ghost"
            size="icon-sm"
            icon="output"
            aria-label={t("maxOutputTokenOverrideLabel")}
            title={t("maxOutputTokenOverrideLabel")}
            className="size-6 min-h-6 rounded text-text-muted"
            onClick={() => {
              setDraft(typeof value === "number" ? String(value) : "");
              setEditing(true);
            }}
          />
        )}
      </>
    );
  return (
    <span className="flex flex-wrap items-center gap-1">
      <KitInput
        ref={inputRef}
        type="text"
        size="sm"
        inputMode="numeric"
        value={draft}
        disabled={saving}
        aria-label={t("maxOutputTokenOverrideLabel")}
        title={t("maxOutputTokenOverrideHint")}
        placeholder="4096"
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            void save();
          }
          if (event.key === "Escape") setEditing(false);
        }}
        className="h-6 min-h-0 w-24 px-1.5 text-[11px]"
      />
      <Button
        variant="ghost"
        size="icon-sm"
        icon="check"
        disabled={saving}
        title={providerText(t, "save", "Save")}
        aria-label={providerText(t, "save", "Save")}
        className="size-6 min-h-6 rounded"
        onClick={() => void save()}
      />
      <Button
        variant="ghost"
        size="icon-sm"
        icon="close"
        disabled={saving}
        title={providerText(t, "cancel", "Cancel")}
        aria-label={providerText(t, "cancel", "Cancel")}
        className="size-6 min-h-6 rounded"
        onClick={() => setEditing(false)}
      />
      <span className="basis-full text-[10px] text-text-muted">
        {t("maxOutputTokenOverrideHint")}
      </span>
    </span>
  );
}
