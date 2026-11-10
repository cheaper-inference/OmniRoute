"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import TranslateFlowDiagram from "./TranslateFlowDiagram";

export default function TranslatorConceptCard() {
  const t = useTranslations("translator");
  const [open, setOpen] = useState(false);

  const tr = useCallback(
    (key: string, fallback: string) => {
      try {
        const translated = t(key);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  return (
    <Card className="border-primary/10 bg-primary/5">
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <Icon name="info" size={22} className="text-primary mt-0.5" />
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-text-main mb-1">
              {tr(
                "conceptHeadline",
                'Your app speaks one API "language". Translator converts it to use another provider.'
              )}
            </h2>
            <p className="text-xs text-text-muted">
              {tr(
                "friendlySubtitle",
                "Use your existing app with any provider without rewriting code."
              )}
            </p>
          </div>
        </div>

        <TranslateFlowDiagram />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="translator-concept-how-it-works"
          className="w-full justify-start text-xs font-medium text-primary"
        >
          <span>{tr("conceptHowItWorksToggle", "How it works")}</span>
          <Icon name={open ? "expand_less" : "expand_more"} size={16} />
        </Button>

        {open && (
          <div
            id="translator-concept-how-it-works"
            className="text-xs text-text-muted leading-relaxed border-t border-border pt-3"
          >
            {tr(
              "conceptHowItWorksBody",
              "Your app sends a request in its own format. Translator detects that format, converts through OpenAI as an intermediate hub (or directly when a direct translator is available), sends it to the selected provider, and converts the response back to your app's format."
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
