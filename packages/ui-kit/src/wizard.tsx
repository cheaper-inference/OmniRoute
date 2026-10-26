"use client";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, LogOut, X } from "lucide-react";
import { Button } from "./button";
import { BrandLoader, type BrandLoaderVariant } from "./brand-loader";
import { Card, CardContent } from "./card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { cn } from "./lib/utils";
export interface WizardProps {
  steps: readonly { id: string; title: string; mobileTitle?: string; icon?: ReactNode }[];
  activeStep: number;
  title: string;
  description?: string;
  children: ReactNode;
  busy?: boolean;
  /** Show the theme-aware brand loader while moving between steps. Keeps form state mounted. */
  loading?: boolean;
  loadingLabel?: string;
  /** Defaults to pulse for onboarding and axis for the default wizard. */
  loadingVariant?: BrandLoaderVariant;
  /** @deprecated The brand loader starts immediately; assembly intros are no longer shown. */
  loadingIntro?: boolean;
  error?: string;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
  onExit: () => void;
  nextLabel?: string;
  /** Incomplete steps stay focusable so activation can explain what is missing. */
  nextBlocked?: boolean;
  onNextBlocked?: () => void;
  /** Save current work and navigate to an earlier step. */
  onStepSelect?: (index: number) => void;
  /** The onboarding variant uses connected steps and an icon-only exit. */
  variant?: "default" | "onboarding";
  /** Fill a height-constrained parent; only the body scrolls. */
  fill?: boolean;
  completedSteps?: readonly string[];
  /** Callers enabling all steps remain responsible for navigation guards. */
  stepNavigation?: "previous" | "all";
  className?: string;
}
/** Controlled, resumable wizard. Persistence and validation belong to the caller. */
export function Wizard({
  steps,
  activeStep,
  title,
  description,
  children,
  busy,
  loading = false,
  loadingLabel = "Loading your next step",
  loadingVariant,
  loadingIntro = false,
  error,
  onBack,
  onNext,
  onSkip,
  onExit,
  nextLabel,
  nextBlocked,
  onNextBlocked,
  onStepSelect,
  variant = "default",
  fill = false,
  completedSteps = [],
  stepNavigation = "previous",
  className,
}: WizardProps) {
  const id = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const unavailable = busy || loading;
  useEffect(() => {
    if (loading) {
      loader.current?.focus({ preventScroll: true });
      return;
    }
    scrollArea.current?.scrollTo?.({ top: 0 });
    heading.current?.focus({ preventScroll: fill });
  }, [activeStep, fill, loading]);
  return (
    <Card className={cn("ci-wizard", className)} data-variant={variant} data-fill={fill || undefined}>
      <CardContent className="ci-wizard__content">
        <div className="ci-wizard__top">
          <span>
            Step {activeStep + 1} of {steps.length}
          </span>
          {variant === "onboarding" ? <Tooltip><TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" disabled={unavailable} onClick={onExit} aria-label="Save and close"><X aria-hidden /></Button>
          </TooltipTrigger><TooltipContent side="bottom" align="end">Save and close</TooltipContent></Tooltip> : <Button variant="ghost" disabled={unavailable} onClick={onExit}>
            <LogOut aria-hidden />
            Save and exit
          </Button>}
        </div>
        <ol aria-label="Setup progress" className="ci-wizard__steps">
          {steps.map((s, i) => (
            <li key={s.id} aria-current={i === activeStep ? "step" : undefined} data-complete={completedSteps.includes(s.id) || undefined}>
              {(i < activeStep || stepNavigation === "all") && onStepSelect ? (
                <button
                  type="button"
                  className="ci-wizard__step-link"
                  disabled={unavailable}
                  onClick={() => onStepSelect(i)}
                >
                  <span className="ci-sr-only">{i < activeStep ? "Go back to " : "Go to "}</span>
                  <span className="ci-wizard__number" aria-hidden>{completedSteps.includes(s.id) && i !== activeStep ? <Check /> : i + 1}</span> {s.icon} <StepTitle step={s} />
                  {completedSteps.includes(s.id) && <span className="ci-sr-only">, completed</span>}
                </button>
              ) : (
                <>
                  <span className="ci-wizard__number" aria-hidden>{completedSteps.includes(s.id) && i !== activeStep ? <Check /> : i + 1}</span> {s.icon} <StepTitle step={s} />
                </>
              )}
            </li>
          ))}
        </ol>
        <div className="ci-wizard__viewport" data-loading={loading || undefined}>
        <div ref={scrollArea} className="ci-wizard__scroll" inert={loading || undefined} aria-hidden={loading || undefined}>
        <h1 ref={heading} tabIndex={-1} id={id} className="ci-wizard__title">
          {title}
        </h1>
        {description && <p className="ci-wizard__description">{description}</p>}
        <section
          aria-labelledby={id}
          aria-busy={unavailable}
          className="ci-wizard__body"
        >
          {children}
        </section>
        </div>
        {loading && <div ref={loader} tabIndex={-1} className="ci-wizard__loading">
          <BrandLoader variant={loadingVariant ?? (variant === "onboarding" ? "pulse" : "axis")} intro={loadingIntro} size={280} label={loadingLabel} />
        </div>}
        </div>
        <footer className="ci-wizard__footer">
          {error && (
            <p className="ci-wizard__error" role="alert">
              {error}
            </p>
          )}
          <div className="ci-wizard__actions">
            <Button
              variant="outline"
              onClick={onBack}
              disabled={unavailable || activeStep === 0}
            >
              <ArrowLeft aria-hidden />
              Back
            </Button>
            <div>
              <Button variant="ghost" onClick={onSkip} disabled={unavailable}>
                Skip for now
              </Button>
              <Button
                onClick={nextBlocked ? onNextBlocked : onNext}
                disabled={unavailable}
                aria-disabled={nextBlocked || undefined}
                data-wizard-blocked={nextBlocked || undefined}
              >
                {unavailable ? "Saving…" : nextLabel || "Continue"}
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}

function StepTitle({ step }: { step: WizardProps["steps"][number] }) {
  return <span className="ci-wizard__step-title">
    <span className={step.mobileTitle ? "ci-wizard__desktop-title" : undefined}>{step.title}</span>
    {step.mobileTitle && <span className="ci-wizard__mobile-title">{step.mobileTitle}</span>}
  </span>;
}
