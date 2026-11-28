export type LastResortBudgetInput = {
  ceiling: number;
  calibratedTokens: number;
  messages: number;
  tools: number;
  system: number;
  instructions: number;
  total: number;
};

/**
 * Message budget for one last-resort pass, from this request's own gate numbers.
 * compressContext only shrinks messages. The gate rejects the calibrated full body,
 * so `ceiling - tools` no-ops while system, instructions, or a learned factor still
 * leave the request over the ceiling. Null means the non-message part already fills
 * the ceiling and shrinking messages cannot make this request fit.
 */
export function resolveLastResortMessageBudget(input: LastResortBudgetInput): number | null {
  const ceiling = input.ceiling;
  if (!Number.isFinite(ceiling) || ceiling <= 1) return null;
  const total = input.total;
  const calibrated = input.calibratedTokens;
  if (!Number.isFinite(total) || total <= 0 || !Number.isFinite(calibrated) || calibrated <= 0) {
    return null;
  }
  const factor = calibrated / total;
  const fixed =
    Math.max(0, input.tools) + Math.max(0, input.system) + Math.max(0, input.instructions);
  const budget = Math.floor(ceiling / factor - fixed) - 1;
  if (!Number.isFinite(budget) || budget < 1) return null;
  const messages = Math.max(0, input.messages);
  if (messages > 0 && budget > messages) return messages;
  return budget;
}
