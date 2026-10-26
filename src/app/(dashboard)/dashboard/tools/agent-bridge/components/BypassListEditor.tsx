"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Textarea from "@/shared/components/Textarea";

const DEFAULT_BYPASS_PATTERNS = ["*.bank.*", "*.gov.*", "*.okta.com", "*.auth0.com"];

interface BypassListEditorProps {
  patterns: string[];
  onSave: (patterns: string[]) => Promise<void>;
}

/**
 * Textarea / chip editor for user-defined bypass patterns.
 * Shows read-only defaults + editable user list.
 */
export function BypassListEditor({ patterns, onSave }: BypassListEditorProps) {
  const t = useTranslations("agentBridge");
  const [userInput, setUserInput] = useState(patterns.join("\n"));
  const [saving, setSaving] = useState(false);
  const textareaId = useId();

  const handleSave = async () => {
    setSaving(true);
    try {
      const parsed = userInput
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      await onSave(parsed);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-xs font-medium text-text-muted mb-1.5">
          {t("bypassDefaultsLabel") || "Default bypass patterns (read-only)"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {DEFAULT_BYPASS_PATTERNS.map((p) => (
            <Badge key={p} size="sm" className="font-mono">
              {p}
            </Badge>
          ))}
        </div>
      </div>

      <Field
        htmlFor={textareaId}
        label={t("bypassUserLabel") || "Custom bypass patterns (one per line, glob or regex)"}
      >
        <Textarea
          id={textareaId}
          className="min-h-[80px] font-mono text-sm"
          placeholder="*.internal.corp&#10;sso.example.com"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </Field>

      <div className="flex justify-end">
        <Button variant="secondary" icon="save" onClick={handleSave} disabled={saving}>
          {saving ? t("saving") || "Saving…" : t("saveBypassList") || "Save bypass list"}
        </Button>
      </div>
    </div>
  );
}
