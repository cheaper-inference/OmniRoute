export interface ConnectionLocalUsage {
  source: "retained_local_history";
  from: string;
  to: string;
  requests: number;
  tokens: number;
  activeDays: number;
}
