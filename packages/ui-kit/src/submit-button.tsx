"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { flushSync, useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./button";

export interface SubmitButtonProps extends ButtonProps {
  /** Opt in for a plain HTML form with a string action. React form actions use useFormStatus. */
  nativeNavigation?: boolean;
}

/** For React form actions and native navigation forms. Client handlers can pass `loading`. */
export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(function SubmitButton(
  { loading, nativeNavigation = false, ...props }, ref,
) {
  const { pending } = useFormStatus();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [navigating, setNavigating] = useState(false);
  const navigatingRef = useRef(false);
  useImperativeHandle(ref, () => buttonRef.current!);
  useEffect(() => {
    if (!nativeNavigation) return;
    const button = buttonRef.current;
    const form = button?.form;
    if (!button || !form) return;
    const submit = (event: SubmitEvent) => {
      if (event.target !== form || event.defaultPrevented) return;
      if (event.submitter && event.submitter !== button) return;
      if (navigatingRef.current) { event.preventDefault(); return; }
      navigatingRef.current = true;
      // The browser can suspend React's scheduled work once navigation starts.
      // Paint feedback before the default action, keeping the named submitter enabled.
      flushSync(() => setNavigating(true));
    };
    const restore = () => { navigatingRef.current = false; setNavigating(false); };
    // Window runs after React's delegated onSubmit, so cancelled submissions stay idle.
    window.addEventListener("submit", submit);
    window.addEventListener("pageshow", restore);
    return () => { window.removeEventListener("submit", submit); window.removeEventListener("pageshow", restore); };
  }, [nativeNavigation]);
  return <Button {...props} ref={buttonRef} type={props.type ?? "submit"} loading={loading ?? (pending || navigating)} disableWhileLoading={nativeNavigation ? false : props.disableWhileLoading} />;
});
