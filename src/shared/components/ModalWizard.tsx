"use client";

import { useTranslations } from "next-intl";
import { Wizard, type WizardProps } from "@omniroute/ui-kit/wizard";
import { cn } from "@/shared/utils/cn";

/** `bodyClassName` for the `Modal` hosting a `ModalWizard`: the body scrolls under the sticky actions. */
export const MODAL_WIZARD_BODY_CLASS = "max-h-[calc(90vh-5rem)] overflow-y-auto";

// The kit Wizard is a page-level Card. Inside a Modal the dialog is already the surface, and
// the step heading sits under the dialog title, so the card chrome goes and the heading shrinks.
const IN_MODAL_CLASS = cn(
  "border-0 shadow-none rounded-none bg-transparent",
  "[&_.ci-wizard__title]:mt-4 [&_.ci-wizard__title]:mb-1 [&_.ci-wizard__title]:text-lg",
  "[&_.ci-wizard__body]:min-h-0 [&_.ci-wizard__body]:py-4",
  "[&_.ci-wizard__steps]:py-3"
);

/** The count is language-neutral on purpose: it needs no catalog entry. */
const stepCount = (step: number, total: number) => `${step} / ${total}`;

/** The kit Wizard for a multi-step flow inside `Modal`, with its chrome text localized. */
export default function ModalWizard({ className, labels, ...props }: WizardProps) {
  const t = useTranslations("common");
  return (
    <Wizard
      {...props}
      className={cn(IN_MODAL_CLASS, className)}
      labels={{
        stepCount,
        back: t("back"),
        next: t("next"),
        saving: t("saving"),
        loading: t("loading"),
        errorTitle: t("error"),
        ...labels,
      }}
    />
  );
}
