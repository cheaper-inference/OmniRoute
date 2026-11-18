"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { GuardedAction, Icon } from "@/shared/components";
import { getI18nOrFallback } from "./comboPageHelpers";
import {
  describeComboStepTestResult,
  getComboStepTestKey,
  getComboStepTestSnapshot,
  resolveComboStepTestTarget,
  runComboStepTest,
  subscribeComboStepTests,
} from "./comboStepTest";
import { Spinner } from "@/shared/components/Loading";

const STATE_STYLES = {
  idle: { icon: "science", tone: "text-text-muted border-transparent" },
  running: { icon: "progress_activity", tone: "text-text-muted border-transparent" },
  ok: { icon: "check_circle", tone: "text-success border-success/40" },
  error: { icon: "cancel", tone: "text-error border-error/40" },
} as const;

/** Per-step Test button for the combo modal model list (one probe per click). */
export default function ComboStepTestButton({ entry }: { entry: unknown }) {
  const t = useTranslations("combos");
  const target = useMemo(() => resolveComboStepTestTarget(entry), [entry]);
  const key = target ? getComboStepTestKey(target) : null;
  const snapshot = useSyncExternalStore(
    subscribeComboStepTests,
    () => (key ? getComboStepTestSnapshot(key) : undefined),
    () => undefined
  );

  const state = snapshot?.state ?? "idle";
  const style = STATE_STYLES[state];
  // Wildcard/combo-ref steps cannot be probed: a reason, shown by GuardedAction (a disabled
  // button's title never shows under the kit's `pointer-events: none`).
  const notTestableReason = target
    ? undefined
    : getI18nOrFallback(t, "testStepNotTestable", "Only single-model steps can be tested");
  const title = notTestableReason
    ? notTestableReason
    : snapshot?.state === "running"
      ? getI18nOrFallback(t, "testStepRunning", "Testing…")
      : snapshot
        ? describeComboStepTestResult(snapshot)
        : getI18nOrFallback(t, "testStep", "Test this model");

  return (
    <GuardedAction
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={() => target && void runComboStepTest(target)}
      disabled={state === "running"}
      reason={notTestableReason}
      className={`border ${style.tone}`}
      title={title}
      aria-label={title}
    >
      {state === "running" ? (
        <Spinner decorative size="xs" />
      ) : (
        <Icon name={style.icon} size={12} />
      )}
    </GuardedAction>
  );
}
