"use client";

import { useState } from "react";
// Direct adapter import (not the barrel): some settings tests stub the barrel.
import NumberInput, { type NumberInputProps } from "@/shared/components/NumberInput";

interface SavedNumberInputProps extends Omit<
  NumberInputProps,
  "value" | "defaultValue" | "onValueChange" | "onValueCommit"
> {
  /** The saved number the field shows while nobody is typing in it. */
  value: number;
  /** Runs once when an edit ends (blur or Enter) with a number other than the saved one. */
  onSave: (value: number) => void | Promise<unknown>;
}

/**
 * A `NumberInput` for a setting that is saved as soon as it is edited: it follows the typing
 * locally and calls `onSave` once when the edit ends, with the value already inside
 * `min`/`max`, instead of saving on every keystroke. An emptied field saves nothing. When the
 * save settles the field shows the saved value again, which also undoes a failed save.
 */
export default function SavedNumberInput({ value, onSave, ...props }: SavedNumberInputProps) {
  // `undefined` follows the saved value; `null` is an empty field.
  const [draft, setDraft] = useState<number | null | undefined>(undefined);

  const commit = async (final: number | null) => {
    try {
      if (final !== null && final !== value) await onSave(final);
    } finally {
      setDraft(undefined);
    }
  };

  return (
    <NumberInput
      {...props}
      value={draft === undefined ? value : draft}
      onValueChange={setDraft}
      onValueCommit={(final) => void commit(final)}
    />
  );
}
