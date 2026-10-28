import type { Team, TeamMember, TeamKeyOption } from "@/lib/db/teams";
import type { TeamUsageLimitStatus } from "@/lib/usage/teamUsageLimits";
export type { Team, TeamKeyOption };
export type Period = "7d" | "30d" | "all";
export interface Detail {
  team: Team;
  members: TeamMember[];
  budgetStatus: (TeamUsageLimitStatus & { hasPartialRetainedUsage?: boolean }) | null;
}
export interface Report {
  summary: {
    requests: number;
    inputTokens: number;
    outputTokens: number;
    estimatedListCostUsd: number;
    hasUnpricedUsage: boolean;
  };
  byApiKey: Array<{
    apiKeyId: string;
    apiKeyName: string | null;
    requests: number;
    inputTokens: number;
    outputTokens: number;
    estimatedListCostUsd: number;
    hasUnpricedUsage: boolean;
  }>;
}
export function money(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value !== 0 && Math.abs(value) < 0.01 ? 8 : 2,
  }).format(value);
}
export function reportRange(period: Period, now = Date.now()) {
  if (period === "all") return "";
  const end = new Date(now).toISOString().slice(0, 10);
  const days = period === "7d" ? 7 : 30;
  const start = new Date(Date.parse(end) - (days - 1) * 86400000).toISOString().slice(0, 10);
  return new URLSearchParams({ startDate: start, endDate: end }).toString();
}
export class ApiError extends Error {
  constructor(public status: number) {
    super(String(status));
  }
}
export async function readJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) throw new ApiError(response.status);
  return response.json() as Promise<T>;
}
export function errorKey(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401) return "unauthorized";
    if (error.status === 403) return "forbidden";
    if (error.status === 404) return "notFound";
    if (error.status === 409) return "conflict";
  }
  return "failed";
}
