"use client";

import { ArrowLeft, ArrowRight, Check, Cloud, LockKeyhole, ShieldCheck } from "lucide-react";
import { BrandLoader } from "./brand-loader";
import { Button } from "./button";
import { resolveLabels } from "./lib/labels";
import { useId } from "react";

/** Interface text for CloudAuthHandoff. Product names and the hostname stay as given. */
export interface CloudAuthHandoffLabels {
  /** Account caption in the illustration after verification. */
  accountVerified: string;
  /** Account caption in the illustration in the `error` state. */
  account: string;
  eyebrow: string;
  openingTitle: string;
  delayedTitle: string;
  errorTitle: string;
  openingDescription: string;
  delayedDescription: string;
  errorDescription: string;
  /** Retry link text in the `opening` state. */
  continue: string;
  /** Retry link text in the `delayed` and `error` states. */
  retry: string;
  back: string;
  security: string;
}
export const defaultCloudAuthHandoffLabels: CloudAuthHandoffLabels = {
  accountVerified: "Account verified",
  account: "Your account",
  eyebrow: "Secure sign-in",
  openingTitle: "Opening your OmniRoute",
  delayedTitle: "Taking longer than expected",
  errorTitle: "We couldn’t open your gateway",
  openingDescription: "You’re signed in. We’re connecting you to your gateway.",
  delayedDescription: "Start a fresh sign-in if your gateway hasn’t opened. Your account and instance are unchanged.",
  errorDescription: "Return to Cloud to check your instance and start sign-in again.",
  continue: "Continue to OmniRoute",
  retry: "Try sign-in again",
  back: "Back to Cloud",
  security: "Your credentials stay with Cheaper Inference.",
};

export interface CloudAuthHandoffProps {
  hostname?: string;
  state?: "opening" | "delayed" | "error";
  /** Starts a fresh sign-in, never replays a single-use authorization grant. */
  retryHref?: string;
  backHref?: string;
  /** Localized interface text; omitted or `undefined` keys fall back to defaultCloudAuthHandoffLabels. */
  labels?: Partial<CloudAuthHandoffLabels>;
}

/** Status is supplied by the app. Animation never delays the real authentication handoff. */
export function CloudAuthHandoff({ hostname, state = "opening", retryHref, backHref = "/cloud", labels: labelOverrides }: CloudAuthHandoffProps) {
  const labels = resolveLabels(defaultCloudAuthHandoffLabels, labelOverrides);
  const opening = state === "opening";
  const failed = state === "error";
  const titleId = useId();
  return <section className="ci-cloud-auth" data-state={state} aria-labelledby={titleId}>
    <div className="ci-cloud-auth__visual" aria-hidden="true">
      <div className="ci-cloud-auth__account"><ShieldCheck size={23} /><span>Cheaper Inference</span><small>{failed ? labels.account : <><Check size={11} />{labels.accountVerified}</>}</small></div>
      <div className="ci-cloud-auth__wire"><span /><ArrowRight size={15} /></div>
      <div className="ci-cloud-auth__gateway"><BrandLoader variant="orbit" size={130} paused={!opening} /><span><Cloud size={15} />OmniRoute</span></div>
    </div>
    <div className="ci-cloud-auth__body">
      <p className="ci-cloud-auth__eyebrow"><LockKeyhole size={12} />{labels.eyebrow}</p>
      <div role="status" aria-live="polite" aria-atomic="true">
        <h1 id={titleId}>{opening ? labels.openingTitle : failed ? labels.errorTitle : labels.delayedTitle}</h1>
        <p className="ci-cloud-auth__description">{opening ? labels.openingDescription : failed ? labels.errorDescription : labels.delayedDescription}</p>
      </div>
      {hostname && <div className="ci-cloud-auth__destination"><Cloud size={15} /><span>{hostname}</span>{opening && <i />}</div>}
      <div className="ci-cloud-auth__actions">
        {retryHref && <Button asChild variant={opening ? "outline" : "default"} size="sm"><a href={retryHref}>{opening ? labels.continue : labels.retry}<ArrowRight size={14} /></a></Button>}
        <Button asChild variant="ghost" size="sm"><a href={backHref}><ArrowLeft size={13} />{labels.back}</a></Button>
      </div>
      <p className="ci-cloud-auth__security"><ShieldCheck size={13} />{labels.security}</p>
    </div>
  </section>;
}
