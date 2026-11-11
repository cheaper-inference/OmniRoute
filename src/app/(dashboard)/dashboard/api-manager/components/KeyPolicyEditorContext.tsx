"use client";

import { createContext, useContext } from "react";
import type { useKeyPolicyEditorModel } from "./useKeyPolicyEditorModel";

export const KeyPolicyEditorContext = createContext<ReturnType<
  typeof useKeyPolicyEditorModel
> | null>(null);

export function useKeyPolicyEditor() {
  const context = useContext(KeyPolicyEditorContext);
  if (!context) throw new Error("Key policy editor context is required");
  return context;
}
