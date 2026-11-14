// bin/cli/launch/core/pipeline/summary.mjs: the one-line session usage summary on stderr.

import { usageFailureReason } from "../session.mjs";

function tokensPart(summary) {
  if (summary.inputTokens === undefined && summary.outputTokens === undefined) return null;
  return `${summary.inputTokens ?? 0} in / ${summary.outputTokens ?? 0} out tokens`;
}

function costPart(summary) {
  return typeof summary.costUsd === "number" ? `$${summary.costUsd.toFixed(4)}` : null;
}

function modelsPart(summary) {
  if (!Array.isArray(summary.models) || summary.models.length === 0) return null;
  return `models: ${summary.models.map((m) => `${m.id} (${m.requests})`).join(", ")}`;
}

function fallbacksPart(summary) {
  return summary.fallbacks ? `${summary.fallbacks} fallbacks` : null;
}

function summaryText(tool, summary) {
  if (!summary || typeof summary !== "object") return "";
  const parts = [
    `${summary.requests ?? 0} requests`,
    tokensPart(summary),
    costPart(summary),
    modelsPart(summary),
    fallbacksPart(summary),
  ].filter((part) => part !== null);
  return `omnirouter: ${tool} session: ${parts.join(", ")}\n`;
}

/**
 * Read the session usage into `outcome.summary`; emits session.summary and, outside --json,
 * writes the summary line. A failed read is one stderr line (outside --json), never an error.
 */
export async function reportUsage(L, run, outcome) {
  try {
    outcome.summary = await run.client.usage(run.session);
    if (outcome.summary) {
      await L.bus.emit({ type: "session.summary", summary: outcome.summary });
      if (!L.jsonMode) L.stderr.write(summaryText(L.tool, outcome.summary));
    }
  } catch (error) {
    // Cosmetic, but never silently dropped (found in live testing): one stderr line.
    if (!L.jsonMode) {
      L.stderr.write(`omnirouter: usage summary unavailable (${usageFailureReason(error)})\n`);
    }
  }
}
