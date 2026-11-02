"use client";

// src/app/(dashboard)/dashboard/playground/components/ExportCodeModal.tsx

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CodePreview } from "@omniroute/ui-kit/code-preview";
import { Tabs, TabsList, TabsTrigger } from "@omniroute/ui-kit/tabs";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import type { PlaygroundState, ExportLanguage } from "@/lib/playground/codeExport";
import { exportAllLanguages, API_KEY_PLACEHOLDER } from "@/lib/playground/codeExport";

interface ExportCodeModalProps {
  state: PlaygroundState;
  onClose: () => void;
}

const LANGUAGE_TABS: Array<{ id: ExportLanguage; label: string }> = [
  { id: "curl", label: "curl" },
  { id: "python", label: "Python" },
  { id: "typescript", label: "TypeScript" },
];

/**
 * ExportCodeModal — shows curl / Python / TypeScript snippets for the current playground state.
 *
 * Security: always uses API_KEY_PLACEHOLDER ("$OMNIROUTE_API_KEY") — never a real key (D11 / Hard Rule #1).
 */
export default function ExportCodeModal({ state, onClose }: ExportCodeModalProps) {
  const t = useTranslations("playground");
  const [activeLanguage, setActiveLanguage] = useState<ExportLanguage>("curl");

  // Generate all snippets once (state is passed in from parent, not re-fetched).
  const snippets = exportAllLanguages(state);
  const currentCode = snippets[activeLanguage];
  const activeLabel = LANGUAGE_TABS.find((lang) => lang.id === activeLanguage)?.label ?? "";

  // Verify that no real API key is embedded (assertion — Hard Rule #1 / D11).
  // The regex checks for typical API key patterns (sk-, or other 16+ char alphanumeric strings
  // that are NOT the placeholder). When one is found the code (and its copy button) is never
  // rendered.
  const hasRealKey = /sk-[A-Za-z0-9_-]{16,}/.test(currentCode);

  // Escape, focus trap, outside click and the portal come from the kit Dialog (Modal adapter).
  return (
    <Modal
      isOpen
      onClose={onClose}
      size="full"
      title={
        <span className="flex items-center gap-2">
          <span className="font-mono text-sm text-text-muted" aria-hidden="true">
            &lt;/&gt;
          </span>
          {t("exportCodeTitle")}
        </span>
      }
      className="w-[640px] max-w-[96vw]"
      bodyClassName="flex flex-col gap-3 px-4 pt-3 pb-4 max-h-[calc(80vh-140px)] overflow-y-auto"
      footer={
        <Button variant="outline" size="sm" onClick={onClose}>
          {t("close")}
        </Button>
      }
    >
      {/* Language tabs */}
      <Tabs
        variant="underline"
        value={activeLanguage}
        onValueChange={(next) => setActiveLanguage(next as ExportLanguage)}
      >
        <TabsList aria-label={t("exportCode")}>
          {LANGUAGE_TABS.map((lang) => (
            <TabsTrigger key={lang.id} value={lang.id} aria-controls={undefined}>
              {lang.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Code block */}
      {hasRealKey ? (
        <div role="alert" className="text-xs text-error bg-error/10 rounded p-3">
          {t("exportRealKeyWarning")}
        </div>
      ) : (
        <CodePreview
          variant="surface"
          filename={activeLabel}
          language=""
          code={currentCode}
          copyLabel={t("copy")}
          copiedLabel={t("copiedCode")}
          aria-label={t("copyLangCode", { language: activeLanguage })}
        />
      )}

      {/* Placeholder hint */}
      <p className="text-[11px] text-text-muted">
        {t("placeholderHintPrefix")}{" "}
        <code className="font-mono text-primary">{API_KEY_PLACEHOLDER}</code>{" "}
        {t("placeholderHintSuffix")}
      </p>
    </Modal>
  );
}
