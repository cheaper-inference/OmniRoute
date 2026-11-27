"use client";

import { useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Alert } from "./alert";
import { Button } from "./button";
import { resolveLabels } from "./lib/labels";
import { cn } from "./lib/utils";

/** Interface text of the reveal control. `label` and `errorMessage` stay separate props. */
export interface SecretValueLabels {
  /** Button text while the value is masked. */
  reveal: string;
  /** Button text while the value is shown. */
  hide: string;
  /** Button text while `getValue` is pending. */
  revealing: string;
  /** Accessible name of the shown value, from `label`. */
  revealed: (label: string) => string;
  /** Accessible name of the masked value, from `label`. */
  masked: (label: string) => string;
}

export const defaultSecretValueLabels: SecretValueLabels = {
  reveal: "Reveal key",
  hide: "Hide key",
  revealing: "Revealing…",
  revealed: (label) => `${label} (revealed)`,
  masked: (label) => `${label} (masked)`,
};

export interface SecretValueProps extends Omit<ComponentProps<"div">, "children"> {
  /** Stable identity of the credential. Changing it clears any revealed value. */
  valueKey: string;
  maskedValue: string;
  /** Called only after an explicit Reveal action. Never pass the secret as a prop. */
  getValue: () => Promise<string>;
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
  /** Existing copy controls can stay independent of reveal state. */
  actions?: ReactNode;
  /** Localized interface text; missing or `undefined` keys fall back to defaultSecretValueLabels. */
  labels?: Partial<SecretValueLabels>;
}

/** Explicit, transient secret display. Fetching and authorization belong to the consumer. */
export function SecretValue({ valueKey, ...props }: SecretValueProps) {
  return <SecretValueContent key={`${valueKey}:${props.disabled ? "disabled" : "enabled"}`} {...props} />;
}

function SecretValueContent({ maskedValue, getValue, label = "API key", disabled = false,
  errorMessage = "Could not reveal this value. Try again, or check your access.", actions, labels: labelOverrides, className, ...props }: Omit<SecretValueProps, "valueKey">) {
  const labels = resolveLabels(defaultSecretValueLabels, labelOverrides);
  const id = useId();
  const [secret, setSecret] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const generation = useRef(0), inFlight = useRef(false);

  useEffect(() => {
    function hide() {
      if (document.visibilityState !== "hidden") return;
      generation.current++; inFlight.current = false;
      setSecret(null); setPending(false); setFailed(false);
    }
    document.addEventListener("visibilitychange", hide);
    return () => { generation.current++; document.removeEventListener("visibilitychange", hide); };
  }, []);

  async function toggle() {
    if (disabled || inFlight.current) return;
    if (secret !== null) { setSecret(null); return; }
    inFlight.current = true;
    const request = ++generation.current;
    setFailed(false); setPending(true);
    try {
      const value = await getValue();
      if (request !== generation.current) return;
      if (!value) throw new Error("Empty value");
      setSecret(value);
    } catch {
      if (request === generation.current) setFailed(true);
    } finally {
      if (request === generation.current) { inFlight.current = false; setPending(false); }
    }
  }

  return <div {...props} className={cn("ci-secret-value", className)} data-slot="secret-value">
    <div className="ci-secret-value__row">
      <code id={id} className="ci-secret-value__value ci-mask ph-no-capture" data-private="true" tabIndex={secret !== null ? 0 : undefined}
        aria-label={secret !== null ? labels.revealed(label) : labels.masked(label)}>{secret ?? maskedValue}</code>
      <div className="ci-secret-value__actions">
        <Button type="button" variant="outline" size="sm" loading={pending} disableWhileLoading={false} disabled={disabled} aria-disabled={disabled || pending} aria-controls={id}
          aria-pressed={secret !== null} onClick={() => void toggle()}>
          {secret !== null ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
          {pending ? labels.revealing : secret !== null ? labels.hide : labels.reveal}
        </Button>
        {actions}
      </div>
    </div>
    {failed && <Alert layout="inline" variant="warning" role="alert" dismissible={false} description={errorMessage} />}
  </div>;
}
