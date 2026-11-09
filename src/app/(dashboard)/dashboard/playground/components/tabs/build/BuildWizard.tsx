"use client";

import Textarea from "@/shared/components/Textarea";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";

// src/app/(dashboard)/dashboard/playground/components/tabs/build/BuildWizard.tsx

import { useState } from "react";
import { useTranslations } from "next-intl";
import ToolsBuilder from "../../ToolsBuilder";
import StructuredOutputEditor from "../../StructuredOutputEditor";
import { useToolsBuilder } from "../../../hooks/useToolsBuilder";
import { useStructuredOutput } from "../../../hooks/useStructuredOutput";

type BuildMode = "tools" | "json" | "both";

interface BuildWizardProps {
  toolsBuilder: ReturnType<typeof useToolsBuilder>;
  structuredOutput: ReturnType<typeof useStructuredOutput>;
  running: boolean;
  onRun: () => void;
  prompt: string;
  setPrompt: (value: string) => void;
  result: React.ReactNode;
}

interface StepperProps {
  currentStep: 1 | 2 | 3;
}

function Stepper({ currentStep }: StepperProps) {
  const t = useTranslations("playground.build");

  const steps: Array<{ num: 1 | 2 | 3; label: string }> = [
    { num: 1, label: t("step1Label") },
    { num: 2, label: t("step2Label") },
    { num: 3, label: t("step3Label") },
  ];

  return (
    <div className="flex items-center gap-0 px-4 py-3 border-b border-border bg-bg-alt shrink-0">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex items-center">
          {idx > 0 && (
            <div
              className={`h-px w-8 mx-2 transition-colors ${
                currentStep > step.num ? "bg-primary" : "bg-border"
              }`}
            />
          )}
          <div className="flex items-center gap-1.5">
            <span
              className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-semibold transition-colors ${
                currentStep === step.num
                  ? "bg-primary text-accent-foreground"
                  : currentStep > step.num
                    ? "bg-primary/20 text-primary"
                    : "bg-border text-text-muted"
              }`}
            >
              {currentStep > step.num ? <Icon name="check" size={12} /> : step.num}
            </span>
            <span
              className={`text-xs font-medium transition-colors ${
                currentStep === step.num ? "text-text-main" : "text-text-muted"
              }`}
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

interface ModeCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function ModeCard({ icon, title, description, selected, onClick }: ModeCardProps) {
  return (
    <Button
      variant="outline"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-auto flex-col items-start gap-2 whitespace-normal rounded-xl border-2 p-4 text-left font-normal",
        selected ? "border-primary bg-primary/5" : "bg-surface"
      )}
    >
      <span className="text-2xl" aria-hidden="true">
        {icon}
      </span>
      <span className="text-sm font-semibold text-text-main">{title}</span>
      <span className="text-xs text-text-muted leading-relaxed">{description}</span>
    </Button>
  );
}

export default function BuildWizard({
  toolsBuilder,
  structuredOutput,
  running,
  onRun,
  prompt,
  setPrompt,
  result,
}: BuildWizardProps) {
  const t = useTranslations("playground");
  const tb = useTranslations("playground.build");

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mode, setMode] = useState<BuildMode>("tools");

  const includesTools = mode === "tools" || mode === "both";
  const includesJson = mode === "json" || mode === "both";

  function goToStep2() {
    setStep(2);
  }

  function goToStep3() {
    setStep(3);
  }

  function goBack() {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Stepper currentStep={step} />

      {/* Step 1: Mode picker */}
      {step === 1 && (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-base font-semibold text-text-main mb-1">{tb("step1Title")}</h2>
            <p className="text-xs text-text-muted">{tb("step1Subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <ModeCard
              icon="🔧"
              title={tb("modeToolsTitle")}
              description={tb("modeToolsDesc")}
              selected={mode === "tools"}
              onClick={() => setMode("tools")}
            />
            <ModeCard
              icon="📋"
              title={tb("modeJsonTitle")}
              description={tb("modeJsonDesc")}
              selected={mode === "json"}
              onClick={() => setMode("json")}
            />
            <ModeCard
              icon="🔧"
              title={tb("modeBothTitle")}
              description={tb("modeBothDesc")}
              selected={mode === "both"}
              onClick={() => setMode("both")}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button iconRight="arrow_forward" onClick={goToStep2}>
              {tb("nextButton")}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Configure */}
      {step === 2 && (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-base font-semibold text-text-main mb-1">{tb("step2Title")}</h2>
            <p className="text-xs text-text-muted">{tb("step2Subtitle")}</p>
          </div>

          {includesTools && (
            <div>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                {t("toolsLabel")}
              </h3>
              <ToolsBuilder toolsBuilder={toolsBuilder} />
            </div>
          )}

          {includesJson && (
            <div>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                {t("structuredOutputLabel")}
              </h3>
              <StructuredOutputEditor structuredOutput={structuredOutput} />
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" icon="arrow_back" onClick={goBack}>
              {tb("backButton")}
            </Button>
            <Button iconRight="arrow_forward" onClick={goToStep3}>
              {tb("nextButton")}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Run */}
      {step === 3 && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-bg-alt shrink-0">
            <Button variant="outline" size="sm" icon="arrow_back" onClick={goBack}>
              {tb("backButton")}
            </Button>

            <div className="w-px h-4 bg-border mx-1" />

            <Button
              size="sm"
              icon="play_arrow"
              onClick={onRun}
              disabled={running || !prompt.trim()}
            >
              {running ? t("running") : tb("runButton")}
            </Button>

            <div className="ml-auto flex items-center gap-2 text-[11px] text-text-muted">
              {includesTools && toolsBuilder.tools.length > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  {toolsBuilder.tools.length} tool{toolsBuilder.tools.length !== 1 ? "s" : ""}
                </span>
              )}
              {includesJson && structuredOutput.enabled && (
                <span className="px-1.5 py-0.5 rounded bg-success/10 text-success">JSON mode</span>
              )}
            </div>
          </div>

          {/* Result area (conversation + tool-call UI + validation badge) */}
          <div className="flex-1 overflow-y-auto px-4 py-3">{result}</div>

          {/* Prompt input */}
          <div className="px-4 py-3 border-t border-border shrink-0">
            <div className="flex items-end gap-2">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onRun();
                  }
                }}
                placeholder={tb("promptPlaceholder")}
                rows={2}
                aria-label={tb("promptPlaceholder")}
                className="text-sm resize-none flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
