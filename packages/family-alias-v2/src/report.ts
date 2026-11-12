import { stableHash } from "./ownership.ts";

export type RunReport = {
  mode: "plan" | "apply";
  generatedAt: string;
  discoveryHash: string;
  targets: Record<string, { status: string; planHash?: string; reason?: string }>;
  probesUsed: number;
};

export function reportHash(report: RunReport): string {
  return stableHash(report);
}
