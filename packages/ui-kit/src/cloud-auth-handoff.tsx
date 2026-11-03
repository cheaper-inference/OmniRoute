"use client";

import { ArrowLeft, ArrowRight, Check, Cloud, LockKeyhole, ShieldCheck } from "lucide-react";
import { BrandLoader } from "./brand-loader";
import { Button } from "./button";
import { useId } from "react";

export interface CloudAuthHandoffProps {
  hostname?: string;
  state?: "opening" | "delayed" | "error";
  /** Starts a fresh sign-in, never replays a single-use authorization grant. */
  retryHref?: string;
  backHref?: string;
}

/** Status is supplied by the app. Animation never delays the real authentication handoff. */
export function CloudAuthHandoff({ hostname, state = "opening", retryHref, backHref = "/cloud" }: CloudAuthHandoffProps) {
  const opening = state === "opening";
  const failed = state === "error";
  const titleId = useId();
  return <section className="ci-cloud-auth" data-state={state} aria-labelledby={titleId}>
    <div className="ci-cloud-auth__visual" aria-hidden="true">
      <div className="ci-cloud-auth__account"><ShieldCheck size={23} /><span>Cheaper Inference</span><small>{failed ? "Your account" : <><Check size={11} />Account verified</>}</small></div>
      <div className="ci-cloud-auth__wire"><span /><ArrowRight size={15} /></div>
      <div className="ci-cloud-auth__gateway"><BrandLoader variant="orbit" size={130} paused={!opening} /><span><Cloud size={15} />OmniRoute</span></div>
    </div>
    <div className="ci-cloud-auth__body">
      <p className="ci-cloud-auth__eyebrow"><LockKeyhole size={12} />Secure sign-in</p>
      <div role="status" aria-live="polite" aria-atomic="true">
        <h1 id={titleId}>{opening ? "Opening your OmniRoute" : failed ? "We couldn’t open your gateway" : "Taking longer than expected"}</h1>
        <p className="ci-cloud-auth__description">{opening ? "You’re signed in. We’re connecting you to your gateway." : failed ? "Return to Cloud to check your instance and start sign-in again." : "Start a fresh sign-in if your gateway hasn’t opened. Your account and instance are unchanged."}</p>
      </div>
      {hostname && <div className="ci-cloud-auth__destination"><Cloud size={15} /><span>{hostname}</span>{opening && <i />}</div>}
      <div className="ci-cloud-auth__actions">
        {retryHref && <Button asChild variant={opening ? "outline" : "default"} size="sm"><a href={retryHref}>{opening ? "Continue to OmniRoute" : "Try sign-in again"}<ArrowRight size={14} /></a></Button>}
        <Button asChild variant="ghost" size="sm"><a href={backHref}><ArrowLeft size={13} />Back to Cloud</a></Button>
      </div>
      <p className="ci-cloud-auth__security"><ShieldCheck size={13} />Your credentials stay with Cheaper Inference.</p>
    </div>
  </section>;
}
