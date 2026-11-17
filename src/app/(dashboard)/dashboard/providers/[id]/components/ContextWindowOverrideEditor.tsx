"use client";
/**
 * Shared inline context-window override editor for model rows (#14337).
 *
 * Used by PassthroughModelRow (compatible providers) and ModelRow (catalog
 * models of native providers). The two rows lay the controls out in different
 * places — badge/input next to the model id, pencil among the action buttons —
 * so the behavior lives in one hook and the markup in two small components.
 *
 * Opt-in: a row without an `onSave` callback renders nothing from this module.
 */
import React, { useEffect, useRef, useState } from "react";
import { Input as KitInput, type InputProps as KitInputProps } from "@omniroute/ui-kit/input";
import { Button, CapabilityBadge } from "@/shared/components";
import { parseContextWindowOverrideInput, providerText } from "../providerPageHelpers";

type Translator = (key: string, values?: Record<string, unknown>) => string;

export interface UseContextWindowOverrideEditorArgs {
  modelId: string;
  override?: number | null;
  onSave?: (modelId: string, value: number | null) => Promise<void>;
}

export function useContextWindowOverrideEditor({
  modelId,
  override,
  onSave,
}: UseContextWindowOverrideEditorArgs) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const start = () => {
    setValue(typeof override === "number" ? String(override) : "");
    setEditing(true);
  };

  const cancel = () => setEditing(false);

  const submit = async () => {
    if (!onSave) return;
    const parsed = parseContextWindowOverrideInput(value);
    // Invalid input keeps the editor open rather than silently discarding the
    // value or writing a wrong one; the section surfaces the message.
    if (parsed.invalid) {
      await onSave(modelId, Number.NaN);
      return;
    }
    await onSave(modelId, parsed.value);
    setEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void submit();
    }
    if (e.key === "Escape") cancel();
  };

  return { editing, value, setValue, start, cancel, submit, onKeyDown };
}

export type ContextWindowOverrideEditorState = ReturnType<typeof useContextWindowOverrideEditor>;

/** Kit text input that grabs focus (and selects its seed value) when it mounts. */
function FocusedInput(props: KitInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);
  return <KitInput ref={ref} {...props} />;
}

/** The context-window badge (when an override exists) or the inline input + save/cancel. */
export function ContextWindowOverrideField({
  editor,
  override,
  saving,
  t,
}: {
  editor: ContextWindowOverrideEditorState;
  override?: number | null;
  saving?: boolean;
  t: Translator;
}) {
  if (editor.editing) {
    return (
      <span className="flex items-center gap-1">
        <FocusedInput
          type="text"
          size="sm"
          inputMode="numeric"
          value={editor.value}
          onChange={(e) => editor.setValue(e.target.value)}
          onKeyDown={editor.onKeyDown}
          disabled={saving}
          placeholder={t("contextWindowOverridePlaceholder")}
          title={t("contextWindowOverrideHint")}
          aria-label={t("contextWindowOverrideLabel")}
          className="h-6 min-h-0 w-28 px-1.5 text-[11px]"
        />
        <Button
          variant="ghost"
          size="icon-sm"
          icon="check"
          onClick={() => void editor.submit()}
          disabled={saving}
          className="size-6 min-h-6 rounded text-text-muted disabled:opacity-40"
          title={providerText(t, "save", "Save")}
          aria-label={providerText(t, "save", "Save")}
        />
        <Button
          variant="ghost"
          size="icon-sm"
          icon="close"
          onClick={editor.cancel}
          disabled={saving}
          className="size-6 min-h-6 rounded text-text-muted disabled:opacity-40"
          title={providerText(t, "cancel", "Cancel")}
          aria-label={providerText(t, "cancel", "Cancel")}
        />
      </span>
    );
  }
  if (typeof override !== "number") return null;
  return (
    <CapabilityBadge
      icon="width_normal"
      className="shrink-0 bg-warning/15 text-warning"
      title={t("contextWindowOverrideHint")}
    >
      {override.toLocaleString()}
    </CapabilityBadge>
  );
}

/** The pencil that opens the editor. Hidden while editing. */
export function ContextWindowOverrideEditButton({
  editor,
  t,
}: {
  editor: ContextWindowOverrideEditorState;
  t: Translator;
}) {
  if (editor.editing) return null;
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      icon="edit"
      onClick={editor.start}
      className="size-6 min-h-6 rounded text-text-muted"
      title={t("contextWindowOverrideLabel")}
      aria-label={t("contextWindowOverrideLabel")}
    />
  );
}
