export type ProbeBudgetState = {
  day: string;
  used: number;
};

export function utcDay(now: number): string {
  return new Date(now).toISOString().slice(0, 10);
}

export function consumeProbeBudget(
  state: ProbeBudgetState,
  now: number,
  dailyLimit = 5,
): { allowed: boolean; state: ProbeBudgetState } {
  const day = utcDay(now);
  const current = state.day === day ? state : { day, used: 0 };
  if (current.used >= dailyLimit) return { allowed: false, state: current };
  return { allowed: true, state: { day, used: current.used + 1 } };
}
