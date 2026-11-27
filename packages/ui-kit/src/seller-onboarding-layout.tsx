"use client";

import { Check, ChevronsUpDown, Clock3, Menu, Plus } from "lucide-react";
import { useState, type ReactNode, type Ref } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

export interface SellerOnboardingStep {
  id: string;
  label: ReactNode;
  detail: ReactNode;
  state?: "complete" | "pending" | "upcoming";
  optionalLabel?: ReactNode;
  disabled?: boolean;
}

export interface SellerOnboardingLayoutProps {
  /** Slot for a banner or other app-owned chrome above the seller header. */
  topBar?: ReactNode;
  brand: ReactNode;
  brandBadge?: ReactNode;
  /** Trailing header action on desktop and mobile. Replaces the desktop account label. */
  headerAction?: ReactNode;
  stepsLabel?: ReactNode;
  steps: readonly SellerOnboardingStep[];
  currentStep: string;
  onStepSelect?: (id: string) => void;
  progressLabel?: ReactNode;
  railUtility?: ReactNode;
  servingStatus?: {
    label?: ReactNode;
    title: ReactNode;
    detail: ReactNode;
    /** Replaces the default status dot. */
    indicator?: ReactNode;
  };
  account?: {
    initials: ReactNode;
    name: ReactNode;
    detail: ReactNode;
    menu?: ReactNode;
  };
  children: ReactNode;
  contentRef?: Ref<HTMLElement>;
  backAction?: ReactNode;
  actions?: ReactNode;
  actionHint?: ReactNode;
  navigationLabel?: string;
  openNavigationLabel?: string;
  navigationDescription?: ReactNode;
  accountMenuLabel?: string;
}

/** Seller setup frame. Callers provide step state, forms and action handlers. */
export function SellerOnboardingLayout({
  topBar,
  brand,
  brandBadge,
  headerAction,
  stepsLabel = "Seller setup",
  steps,
  currentStep,
  onStepSelect,
  progressLabel,
  railUtility,
  servingStatus,
  account,
  children,
  contentRef,
  backAction,
  actions,
  actionHint,
  navigationLabel = "Navigation",
  openNavigationLabel = "Open navigation",
  navigationDescription = "Seller workspace",
  accountMenuLabel = "Open account menu",
}: SellerOnboardingLayoutProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);

  const accountDetails = account && (
    <>
      <span className="ci-seller-onboarding__avatar" aria-hidden="true">{account.initials}</span>
      <div>
        <strong>{account.name}</strong>
        <small>{account.detail}</small>
      </div>
    </>
  );

  const navigation = (
    <>
      <p className="ci-seller-onboarding__steps-label">{stepsLabel}</p>
      <nav className="ci-seller-onboarding__steps" aria-label={navigationLabel}>
        {steps.map((step, index) => (
          <button
            type="button"
            key={step.id}
            aria-current={step.id === currentStep ? "step" : undefined}
            data-optional={step.optionalLabel != null ? "" : undefined}
            disabled={step.disabled || !onStepSelect}
            onClick={() => {
              onStepSelect?.(step.id);
              setNavigationOpen(false);
            }}
          >
            <span className="ci-seller-onboarding__step-marker" data-state={step.state} aria-hidden="true">
              {step.state === "complete" ? <Check size={15} />
                : step.state === "pending" ? <Clock3 size={15} />
                : step.optionalLabel != null ? <Plus size={15} />
                : index + 1}
            </span>
            <span>
              <strong className="ci-seller-onboarding__step-title">
                {step.label}
                {step.optionalLabel != null && (
                  <Badge className="ci-seller-onboarding__step-badge" tone="neutral">{step.optionalLabel}</Badge>
                )}
              </strong>
              <small>{step.detail}</small>
            </span>
          </button>
        ))}
      </nav>
      {railUtility && <div className="ci-seller-onboarding__rail-utility">{railUtility}</div>}
      {servingStatus && (
        <div className="ci-seller-onboarding__status">
          <span>{servingStatus.label ?? "Serving status"}</span>
          <strong>
            <span className="ci-seller-onboarding__status-indicator" aria-hidden="true">{servingStatus.indicator}</span>
            {servingStatus.title}
          </strong>
          <p>{servingStatus.detail}</p>
        </div>
      )}
      {account && (account.menu ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="ci-seller-onboarding__account" aria-label={accountMenuLabel}>
              {accountDetails}
              <ChevronsUpDown size={16} aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" sideOffset={8} className="ci-seller-onboarding__account-menu">
            {account.menu}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="ci-seller-onboarding__account">{accountDetails}</div>
      ))}
    </>
  );

  return (
    <div className="ci-seller-onboarding" data-ci-seller="">
      {topBar && <div className="ci-seller-onboarding__top-bar">{topBar}</div>}
      <header className="ci-seller-onboarding__brand-header">
        <div>{brand}{brandBadge}</div>
        {headerAction ?? (account && <small>{account.name}</small>)}
      </header>
      <Sheet open={navigationOpen} onOpenChange={setNavigationOpen}>
        <header className="ci-seller-onboarding__mobile-header">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={openNavigationLabel}>
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          {brand}
          {progressLabel && <span className="ci-seller-onboarding__mobile-progress">{progressLabel}</span>}
          {headerAction && <div className="ci-seller-onboarding__mobile-action">{headerAction}</div>}
        </header>
        <SheetContent side="left" className="ci-seller-onboarding__mobile-rail">
          <SheetHeader>
            <SheetTitle className="ci-seller-onboarding__drawer-title">{navigationLabel}</SheetTitle>
            <SheetDescription>{navigationDescription}</SheetDescription>
          </SheetHeader>
          <div className="ci-seller-onboarding__rail-brand">{brand}{brandBadge}</div>
          {navigation}
        </SheetContent>
      </Sheet>
      <div className="ci-seller-onboarding__frame">
        <aside className="ci-seller-onboarding__rail">{navigation}</aside>
        <div className="ci-seller-onboarding__main">
          <main className="ci-seller-onboarding__content" ref={contentRef}>{children}</main>
          {(backAction || actions || actionHint) && (
            <div className="ci-seller-onboarding__dock">
              <footer className="ci-seller-onboarding__footer">
                {backAction}
                <div className="ci-seller-onboarding__actions">
                  {actionHint && <small>{actionHint}</small>}
                  {actions}
                </div>
              </footer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
