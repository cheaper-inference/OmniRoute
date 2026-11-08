"use client";

import { useTranslations } from "next-intl";

export function getI18nOrFallback(t, key, fallback, values = undefined) {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key, values);
  } catch {}
  return fallback;
}

/** Subtitle naming the kind of target a combo editor step points at. */
export function getComboStepKindLabel(t, entry) {
  if (entry.kind === "combo-ref") {
    return getI18nOrFallback(t, "builderComboRefStep", "Nested combo reference");
  }
  if (entry.kind === "provider-wildcard") {
    return getI18nOrFallback(t, "builderProviderWildcard", "All matching provider models");
  }
  if (entry.connectionId) return getI18nOrFallback(t, "builderPinnedAccount", "Pinned account");
  if (entry.providerId) {
    return getI18nOrFallback(t, "builderDynamicAccountShort", "Dynamic account");
  }
  return getI18nOrFallback(t, "builderLegacyEntry", "Legacy model entry");
}

export function AutoComboTruncatedNote({ results }) {
  const t = useTranslations("combos");
  const tested = Array.isArray(results.results) ? results.results.length : 0;
  const total = results.totalCandidates;
  if (results.comboType !== "auto" || typeof total !== "number" || total <= tested) {
    return null;
  }
  return (
    <p className="text-xs text-text-muted">
      {getI18nOrFallback(
        t,
        "autoComboTestTruncated",
        `Tested ${tested} of ${total} live candidates (highest weights first).`,
        { tested, total }
      )}
    </p>
  );
}

export function ComboTestSummaryNote({ results }) {
  const t = useTranslations("combos");
  if (
    String(results?.strategy || "")
      .trim()
      .toLowerCase() === "jev" &&
    results.jev
  ) {
    const eligible = Array.isArray(results.jev.eligible) ? results.jev.eligible : [];
    const blocked = Array.isArray(results.jev.blocked) ? results.jev.blocked : [];
    const eligibleModels = eligible.map((row) => row.model).join(" → ");
    const blockedModels = blocked.map((row) => `${row.model} (${row.reason})`).join(", ");
    const admittedSentence =
      eligible.length === 0
        ? getI18nOrFallback(
            t,
            "jevAdmittedNone",
            "Admitted: none — every target is blocked before Jev."
          )
        : getI18nOrFallback(
            t,
            "jevAdmitted",
            `Admitted: not yet judged (live Jev needs a user message). Eligible: ${eligibleModels}.`,
            { models: eligibleModels }
          );
    const heldSentence = getI18nOrFallback(
      t,
      "jevHeld",
      "Held: none until Jev runs on a live request (probability floor and dominated)."
    );
    const blockedSentence =
      blocked.length === 0
        ? getI18nOrFallback(t, "jevBlockedNone", "Blocked: none.")
        : getI18nOrFallback(t, "jevBlocked", `Blocked: ${blockedModels}.`, {
            models: blockedModels,
          });
    const configurationNote = results.jev.configurationNote
      ? getI18nOrFallback(t, "jevNotConfigured", String(results.jev.configurationNote))
      : null;
    return (
      <div className="rounded-md border border-indigo-500/20 bg-indigo-500/5 px-2.5 py-2 flex flex-col gap-1.5">
        <p className="text-xs text-indigo-800 dark:text-indigo-200">{admittedSentence}</p>
        <p className="text-xs text-indigo-800 dark:text-indigo-200">{heldSentence}</p>
        <p className="text-xs text-indigo-800 dark:text-indigo-200">{blockedSentence}</p>
        {configurationNote ? (
          <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
            {configurationNote}
          </p>
        ) : null}
        <p className="text-[10px] text-text-muted">
          {getI18nOrFallback(
            t,
            "jevTestSummaryFootnote",
            "Target rows below are independent health probes. Live Jev admission is recorded on the decision trace for a real chat request."
          )}
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-xs text-text-muted">
        Targets are tested independently. This checks model health, not the combo’s routing strategy
        or fallback order.
      </p>
      <AutoComboTruncatedNote results={results} />
    </>
  );
}
