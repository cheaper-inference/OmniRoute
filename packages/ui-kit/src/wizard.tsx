"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, LogOut, X } from "lucide-react";
import { Button } from "./button";
import { BrandLoader, type BrandLoaderVariant } from "./brand-loader";
import { Card, CardContent } from "./card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { cn } from "./lib/utils";
import { Alert } from "./alert";
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
  /** Show Back. Disable when earlier setup can no longer change, such as after payment. Defaults to true. */
  allowBack?: boolean;
  onNext: () => void;
  onSkip?: () => void;
  /** Show the skip action when a handler is provided. Disable for required steps. Defaults to true. */
  allowSkip?: boolean;
  onExit?: () => void;
  /** Show save-and-exit when a handler is provided. Defaults to true. The app owns route guards. */
  allowExit?: boolean;
  nextLabel?: string;
  /** Native same-tab navigation for a ready exit; avoids popup APIs in webviews. */
  nextHref?: string;
  /** Hide Next while an external action is required; errors remain visible. Defaults to true. */
  showNext?: boolean;
  /** Compact progress keeps the current step/count without the full step list. */
  progressDisplay?: "steps" | "compact";
  /** Incomplete steps stay focusable so activation can explain what is missing. */
  nextBlocked?: boolean;
  onNextBlocked?: () => void;
  /** Save current work and navigate to an earlier step. */
  onStepSelect?: (index: number) => void;
  /** The onboarding variant uses connected steps and an icon-only exit. */
  variant?: "default" | "onboarding";
  /** Fill a height-constrained parent; only the body scrolls. */
  fill?: boolean;
  /** On narrow (up to 760px) or coarse-touch screens, use the host document scroll with an in-flow footer. The host must also permit document scrolling. Desktop and the default layout are unchanged. */
  mobileLayout?: "default" | "document";
  /** Reserve 6rem plus the device safe area below footer or inline body actions on small/touch screens for browser overlays. Desktop and the default safe-area spacing are unchanged. */
  mobileBottomClearance?: "safe-area" | "browser";
  /** Content-sized onboarding with a progress rail; compact progress on small screens. */
  layout?: "stacked" | "sidebar";
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
  allowBack = true,
  onNext,
  onSkip,
  allowSkip = true,
  onExit,
  allowExit = true,
  nextLabel,
  nextHref,
  showNext = true,
  progressDisplay = "steps",
  nextBlocked,
  onNextBlocked,
  onStepSelect,
  variant = "default",
  fill = false,
  mobileLayout = "default",
  mobileBottomClearance = "safe-area",
  layout = "stacked",
  completedSteps = [],
  stepNavigation = "previous",
  className,
}: WizardProps) {
  const id = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const presentedStep = useRef(activeStep);
  const unavailable = busy || loading;
  const [showBusy, setShowBusy] = useState(false);
  useEffect(() => {
    if (!unavailable) { setShowBusy(false); return; }
    const timer = setTimeout(() => setShowBusy(true), 150);
    return () => clearTimeout(timer);
  }, [unavailable]);
  useEffect(() => {
    if (mobileLayout !== "document" || mobileBottomClearance !== "browser") return;
    const root = viewport.current?.closest<HTMLElement>(".ci-wizard");
    const visual = window.visualViewport;
    const update = () => {
      if (!window.matchMedia("(max-width:760px), (hover:none) and (pointer:coarse)").matches) {
        root?.style.removeProperty("--ci-wizard-viewport-occlusion");
        return;
      }
      // Native browser controls and keyboards may reduce only the visual
      // viewport. Pinch zoom is not browser occlusion and must not add runway.
      const occlusion = visual && visual.scale === 1
        ? Math.max(0, window.innerHeight - visual.height - visual.offsetTop) : 0;
      root?.style.setProperty("--ci-wizard-viewport-occlusion", `${occlusion}px`);
    };
    update();
    window.addEventListener("resize", update);
    visual?.addEventListener("resize", update);
    visual?.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      visual?.removeEventListener("resize", update);
      visual?.removeEventListener("scroll", update);
      root?.style.removeProperty("--ci-wizard-viewport-occlusion");
    };
  }, [mobileLayout, mobileBottomClearance]);
  useEffect(() => {
    const documentLayout = mobileLayout === "document" && window.matchMedia("(max-width:760px), (hover:none) and (pointer:coarse)").matches;
    if (loading) {
      loader.current?.focus({ preventScroll: true });
      if (documentLayout) loader.current?.scrollIntoView?.({ block: "start", inline: "nearest", behavior: "instant" });
      return;
    }
    const stepChanged = presentedStep.current !== activeStep;
    presentedStep.current = activeStep;
    if (documentLayout) {
      // Preserve the initial page position; reveal only a newly selected step.
      // Focusing without scrolling avoids browser centering behind host chrome.
      heading.current?.focus({ preventScroll: true });
      if (stepChanged) heading.current?.scrollIntoView?.({ block: "start", inline: "nearest", behavior: "instant" });
      return;
    }
    scrollArea.current?.scrollTo?.({ top: 0 });
    // Short mobile screens scroll the surrounding content, including progress.
    const content = viewport.current?.parentElement;
    content?.scrollTo?.({ top: 0 });
    heading.current?.focus({ preventScroll: fill });
    if (fill && mobileBottomClearance === "browser" && content && heading.current && getComputedStyle(content).overflowY === "auto") {
      // Present the new step immediately; its progress links remain above it
      // in the same scroll region. CSS alone determines when this layout applies.
      const inset = parseFloat(getComputedStyle(content).paddingTop) || 0;
      content.scrollTo?.({ top: Math.max(0, content.scrollTop + heading.current.getBoundingClientRect().top - content.getBoundingClientRect().top - inset) });
    }
  }, [activeStep, fill, loading, mobileBottomClearance, mobileLayout]);
  return (
    <Card className={cn("ci-wizard", className)} data-variant={variant} data-layout={layout} data-fill={fill || undefined} data-mobile-layout={mobileLayout === "document" ? "document" : undefined} data-mobile-bottom-clearance={mobileBottomClearance === "browser" ? "browser" : undefined}>
      <CardContent className="ci-wizard__content">
        <div className="ci-wizard__top">
          <span>
            Step {activeStep + 1} of {steps.length}{progressDisplay === "compact" && <> · {steps[activeStep]?.title}</>}
          </span>
          {allowExit && onExit && (variant === "onboarding" ? <Tooltip><TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" disabled={unavailable} onClick={onExit} aria-label="Save and close"><X aria-hidden /></Button>
          </TooltipTrigger><TooltipContent side="bottom" align="end">Save and close</TooltipContent></Tooltip> : <Button variant="ghost" disabled={unavailable} onClick={onExit}>
            <LogOut aria-hidden />
            Save and exit
          </Button>)}
        </div>
        {progressDisplay === "steps" && <ol aria-label="Setup progress" className="ci-wizard__steps">
          {steps.map((s, i) => (
            <li key={s.id} aria-current={i === activeStep ? "step" : undefined} data-complete={completedSteps.includes(s.id) || undefined}>
              {(i < activeStep || stepNavigation === "all") && onStepSelect ? (
                <button
                  type="button"
                  className="ci-wizard__step-link ci-wizard__step-content"
                  disabled={unavailable}
                  onClick={() => onStepSelect(i)}
                >
                  <span className="ci-sr-only">{i < activeStep ? "Go back to " : "Go to "}</span>
                  <span className="ci-wizard__number" aria-hidden>{completedSteps.includes(s.id) && i !== activeStep ? <Check /> : i + 1}</span> {s.icon} <StepTitle step={s} />
                  {completedSteps.includes(s.id) && <span className="ci-sr-only">, completed</span>}
                </button>
              ) : (
                <span className="ci-wizard__step-content">
                  <span className="ci-wizard__number" aria-hidden>{completedSteps.includes(s.id) && i !== activeStep ? <Check /> : i + 1}</span> {s.icon} <StepTitle step={s} />
                </span>
              )}
            </li>
          ))}
        </ol>}
        <div ref={viewport} className="ci-wizard__viewport" data-loading={loading || undefined}>
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
        {(showNext || allowBack || (allowSkip && onSkip) || error) && <footer className="ci-wizard__footer">
          {error && (
            <Alert role="alert" dismissible={false} variant="warning" title="One more thing before continuing" description={error} />
          )}
          {(showNext || allowBack || (allowSkip && onSkip)) && <div className="ci-wizard__actions">
            {allowBack && <Button
              variant="outline"
              onClick={onBack}
              disabled={unavailable || activeStep === 0}
            >
              <ArrowLeft aria-hidden />
              Back
            </Button>}
            <div>
              {allowSkip && onSkip && <Button variant="ghost" onClick={onSkip} disabled={unavailable}>
                Skip for now
              </Button>}
              {showNext && (nextHref ? <Button asChild disabled={unavailable || nextBlocked} data-wizard-blocked={(nextBlocked && !unavailable) || undefined}>
                <a href={nextHref} tabIndex={unavailable ? -1 : undefined} onClick={event => {
                  if (unavailable || nextBlocked) { event.preventDefault(); if (!unavailable) onNextBlocked?.(); }
                }}>{nextLabel || "Continue"}<ArrowRight aria-hidden /></a>
              </Button> : <Button
                loading={showBusy}
                onClick={nextBlocked ? onNextBlocked : onNext}
                disabled={unavailable}
                aria-disabled={nextBlocked || undefined}
                data-wizard-blocked={nextBlocked || undefined}
              >
                {showBusy ? "Saving…" : nextLabel || "Continue"}
                <ArrowRight aria-hidden />
              </Button>)}
            </div>
          </div>}
        </footer>}
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
