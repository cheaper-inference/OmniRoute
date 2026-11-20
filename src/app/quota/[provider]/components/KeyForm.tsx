"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Checkbox from "@/shared/components/Checkbox";
import Input from "@/shared/components/Input";

import { parseApiKeyInput } from "../lib/apiKeyInput";
import type { KeyPersistence } from "../lib/keyStore";

type KeyProblem = "empty" | "malformed";

interface KeyFormProps {
  /** `enter` asks for a key; `active` shows the key in use. */
  mode: "enter" | "active";
  /** The key in use, already masked. The raw key never reaches this component. */
  maskedKey: string | null;
  persistence: KeyPersistence | null;
  /** The key was accepted but the browser refused to save it. */
  storageBlocked: boolean;
  /** Receives a key that passed `parseApiKeyInput`. */
  onSubmit: (key: string, remember: boolean) => void;
  onForget: () => void;
}

const PROBLEM_TEXT = { empty: "keyEmpty", malformed: "keyMalformed" } as const;

function persistenceNote(persistence: KeyPersistence | null) {
  if (persistence === "session") return "keySessionNote";
  if (persistence === "device") return "keyDeviceNote";
  return null;
}

/** The API key form, or the key in use with a way to forget it. */
export default function KeyForm({
  mode,
  maskedKey,
  persistence,
  storageBlocked,
  onSubmit,
  onForget,
}: KeyFormProps) {
  const t = useTranslations("quotaSelf");
  const rememberHintId = useId();
  // The field is uncontrolled: a controlled value would be mirrored into its `value` attribute,
  // and the typed key must never sit in the DOM or in React state. It is read only on submit.
  const fieldRef = useRef<HTMLInputElement>(null);
  const [remember, setRemember] = useState(false);
  const [problem, setProblem] = useState<KeyProblem | null>(null);

  if (mode === "active") {
    const note = persistenceNote(persistence);
    return (
      <Card padding="md">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <p className="break-words font-medium">{t("keyInUse", { key: maskedKey ?? "" })}</p>
            {note && <p className="text-sm text-text-muted">{t(note)}</p>}
            {storageBlocked && <p className="text-sm text-warning">{t("keyNotSaved")}</p>}
          </div>
          <Button variant="ghost" onClick={onForget}>
            {t("keyForget")}
          </Button>
        </div>
      </Card>
    );
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const field = fieldRef.current;
    const parsed = parseApiKeyInput(field?.value ?? "");
    // `in` narrows the union with or without strictNullChecks.
    if ("problem" in parsed) {
      setProblem(parsed.problem);
      return;
    }
    setProblem(null);
    if (field) field.value = "";
    onSubmit(parsed.key, remember);
  };

  return (
    <Card padding="md">
      <form className="min-w-0 space-y-4" noValidate onSubmit={submit}>
        <Input
          type="password"
          label={t("keyLabel")}
          placeholder={t("keyPlaceholder")}
          hint={t("keyHint")}
          error={problem ? t(PROBLEM_TEXT[problem]) : undefined}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="none"
          ref={fieldRef}
          // Editing clears the local error; the text itself is never stored.
          onChange={() => setProblem(null)}
        />
        <div className="space-y-1">
          <Checkbox
            label={t("keyRemember")}
            checked={remember}
            aria-describedby={rememberHintId}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <p id={rememberHintId} className="text-xs text-text-muted">
            {t("keyRememberHint")}
          </p>
        </div>
        <Button type="submit">{t("keySubmit")}</Button>
      </form>
    </Card>
  );
}
