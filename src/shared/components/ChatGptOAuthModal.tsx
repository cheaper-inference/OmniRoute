"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { parseChatGptManualCallback } from "@/shared/utils/chatgptCallback";
import { Alert } from "@omniroute/ui-kit/alert";
import Modal from "./Modal";
import Button from "./Button";
import Textarea from "./Textarea";
import ChatGptSignInButton from "./ChatGptSignInButton";
import { ChatGptPlanWelcome } from "./ChatGptPlanUi";
import { acknowledgeChatGptPlan, shouldWelcomeChatGptPlan } from "@/shared/utils/chatgptPlanUi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reauthConnection?: null | { id?: string };
};
async function session(body: Record<string, unknown>, fallback = "") {
  const response = await fetch("/api/oauth/chatgpt/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error?.message || fallback);
  return result;
}

const redirectUri = "http://127.0.0.1:1455/auth/callback";
export default function ChatGptOAuthModal(props: Props) {
  return props.isOpen ? <ChatGptOAuthDialog {...props} /> : null;
}

type Translator = ReturnType<typeof useTranslations>;
type ChatGptAttemptView = { state: string; authUrl: string };

/** Server-side attempt lifecycle: start (cancelling any previous attempt), and cancel on unmount. */
function useChatGptAttempt(connectionId: string | undefined, t: Translator) {
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState<ChatGptAttemptView | null>(null);
  const stateRef = useRef<string | null>(null);
  const generation = useRef(0);

  const start = useCallback(async () => {
    const current = ++generation.current;
    try {
      if (stateRef.current) await session({ action: "cancel", state: stateRef.current });
      if (current !== generation.current) return;
      stateRef.current = null;
      const result = await session(
        { action: "start", port: 1455, connectionId },
        t("connectionError")
      );
      if (current !== generation.current) {
        void session({ action: "cancel", state: result.state }).catch(() => {});
        return;
      }
      stateRef.current = result.state;
      setAttempt(result);
    } catch (err) {
      if (current === generation.current)
        setError(err instanceof Error && err.message ? err.message : t("startError"));
    } finally {
      if (current === generation.current) setBusy(false);
    }
  }, [connectionId, t]);

  useEffect(() => {
    const lifecycle = generation;
    // Skip abandoned/Strict Mode mounts before creating a server-side OAuth attempt.
    const timer = setTimeout(() => void start(), 0);
    return () => {
      clearTimeout(timer);
      lifecycle.current++;
      const state = stateRef.current;
      stateRef.current = null;
      if (state) void session({ action: "cancel", state }).catch(() => {});
    };
  }, [start]);

  return { busy, setBusy, error, setError, attempt, setAttempt, stateRef, generation, start };
}

function ChatGptSignInDone({
  warning,
  showWelcome,
  onFinish,
  t,
}: {
  warning: string;
  showWelcome: boolean;
  onFinish: () => void;
  t: Translator;
}) {
  return (
    <div className="space-y-4">
      <p role="status">{t("connected")}</p>
      {/* role="note": the connected line above is the dialog's one live status. */}
      {warning && <Alert variant="warning" role="note" dismissible={false} description={warning} />}
      {showWelcome ? (
        <ChatGptPlanWelcome onDismiss={onFinish} />
      ) : (
        <Button onClick={onFinish}>{t("done")}</Button>
      )}
    </div>
  );
}

function ChatGptSignInStep({
  attempt,
  busy,
  isReauth,
  t,
}: {
  attempt: ChatGptAttemptView | null;
  busy: boolean;
  isReauth: boolean;
  t: Translator;
}) {
  const intent = isReauth ? "continue" : "signin";
  return (
    <section className="space-y-3">
      <h3 className="font-semibold">{t("signInStep")}</h3>
      <p className="text-sm text-text-muted">{t("signInHelp")}</p>
      {attempt ? (
        <ChatGptSignInButton intent={intent} href={attempt.authUrl} />
      ) : (
        <ChatGptSignInButton intent={intent} busy={busy} disabled />
      )}
    </section>
  );
}

function ChatGptCallbackStep({
  attempt,
  busy,
  callbackUrl,
  onCallbackUrlChange,
  onSubmit,
  onStartOver,
  t,
}: {
  attempt: ChatGptAttemptView | null;
  busy: boolean;
  callbackUrl: string;
  onCallbackUrlChange: (value: string) => void;
  onSubmit: () => void;
  onStartOver: () => void;
  t: Translator;
}) {
  return (
    <section className="space-y-3">
      <h3 className="font-semibold">{t("callbackStep")}</h3>
      <p id="chatgpt-callback-help" className="text-sm text-text-muted">
        {t("callbackHelp", { redirectUri })}
      </p>
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Textarea
          label={t("callbackLabel")}
          className="w-full font-mono text-sm"
          value={callbackUrl}
          onChange={(event) => onCallbackUrlChange(event.target.value)}
          placeholder={redirectUri + "?code=…&state=…&client_id=…"}
          aria-describedby="chatgpt-callback-help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={16384}
          rows={4}
          disabled={!attempt || busy}
        />
        <Button
          type="submit"
          disabled={!attempt || busy || !callbackUrl.trim()}
          loading={busy && !!attempt}
        >
          {t("complete")}
        </Button>
      </form>
      <p className="text-sm text-text-muted">{t("expires")}</p>
      <Button variant="secondary" disabled={busy} onClick={onStartOver}>
        {t("startOver")}
      </Button>
    </section>
  );
}

/** Validates the pasted callback locally, then completes the attempt server-side. */
function useChatGptCompletion(
  lifecycle: ReturnType<typeof useChatGptAttempt>,
  connectionId: string | undefined,
  t: Translator
) {
  const { busy, setBusy, setError, attempt, stateRef, generation } = lifecycle;
  const [warning, setWarning] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [done, setDone] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  async function complete() {
    if (!attempt || busy) return;
    setError("");
    try {
      parseChatGptManualCallback(callbackUrl, { redirectUri, state: attempt.state });
    } catch {
      setError(t("callbackError"));
      return;
    }
    setBusy(true);
    const current = generation.current;
    const pasted = callbackUrl;
    // Never persist the one-time code in browser storage; clear the form on submission.
    setCallbackUrl("");
    try {
      const result = await session({
        action: "complete-url",
        state: attempt.state,
        callbackUrl: pasted,
      });
      if (current !== generation.current) return;
      stateRef.current = null;
      setShowWelcome(result.planAuthorized === true && shouldWelcomeChatGptPlan(!!connectionId));
      setDone(true);
      setWarning(result.warning || "");
    } catch (err) {
      if (current === generation.current)
        setError(err instanceof Error && err.message ? err.message : t("completeError"));
    } finally {
      if (current === generation.current) setBusy(false);
    }
  }

  return { warning, callbackUrl, setCallbackUrl, done, showWelcome, complete };
}

function ChatGptOAuthDialog({ isOpen, onClose, onSuccess, reauthConnection }: Props) {
  const t = useTranslations("chatgptSignIn");
  const connectionId = reauthConnection?.id;
  const lifecycle = useChatGptAttempt(connectionId, t);
  const { busy, setBusy, error, setError, attempt, setAttempt, start } = lifecycle;
  const { warning, callbackUrl, setCallbackUrl, done, showWelcome, complete } =
    useChatGptCompletion(lifecycle, connectionId, t);

  function finish() {
    if (showWelcome) acknowledgeChatGptPlan();
    onSuccess();
  }

  function startOver() {
    setBusy(true);
    setError("");
    setCallbackUrl("");
    setAttempt(null);
    void start();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={done ? finish : onClose}
      title={t("title")}
      size="full"
      className="max-h-[90vh] overflow-y-auto"
    >
      <div className="space-y-6">
        {done ? (
          <ChatGptSignInDone warning={warning} showWelcome={showWelcome} onFinish={finish} t={t} />
        ) : (
          <>
            <p className="text-text-muted">{t("description")}</p>
            <p className="rounded-lg border border-border p-3 text-sm">{t("eligibility")}</p>
            <ChatGptSignInStep attempt={attempt} busy={busy} isReauth={!!connectionId} t={t} />
            <ChatGptCallbackStep
              attempt={attempt}
              busy={busy}
              callbackUrl={callbackUrl}
              onCallbackUrlChange={setCallbackUrl}
              onSubmit={() => void complete()}
              onStartOver={startOver}
              t={t}
            />
            {error && <Alert variant="critical" dismissible={false} description={error} />}
          </>
        )}
      </div>
    </Modal>
  );
}
