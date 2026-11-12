import type { ReportBreakdownDimension } from "@/lib/usage/agentSessionReports";

import { DIMENSION_INFO, type DimensionInfo } from "./reportViews";
import type { FilterField } from "./reportFilters";

/** What a drill-down panel is about: one member or one project. */
export type DrillKind = "member" | "project";

export interface BreakdownTabConfig {
  nameKey: string;
  fallbackKey: string;
  extraCount: "members" | "projects";
  filterField?: FilterField;
  /** The empty-key row filters by "none" (the dimension has a "No ..." filter option). */
  filterNone?: boolean;
  showDetail?: boolean;
  defaultSort?: "name";
  /** A row's name opens this kind of drill-down panel. */
  drill?: DrillKind;
}

function tab(
  info: DimensionInfo,
  extraCount: BreakdownTabConfig["extraCount"],
  more: Partial<BreakdownTabConfig> = {}
): BreakdownTabConfig {
  return {
    nameKey: info.nameKey,
    fallbackKey: info.fallbackKey,
    extraCount,
    filterField: info.field,
    filterNone: info.filterNone,
    ...more,
  };
}

/** The breakdown tabs, one per summary dimension. */
export const BREAKDOWN_TABS: Record<ReportBreakdownDimension, BreakdownTabConfig> = {
  members: tab(DIMENSION_INFO.members, "projects", { drill: "member" }),
  projects: tab(DIMENSION_INFO.projects, "members", { showDetail: true, drill: "project" }),
  clients: tab(DIMENSION_INFO.clients, "members"),
  providers: tab(DIMENSION_INFO.providers, "members"),
  models: tab(DIMENSION_INFO.models, "members"),
  accounts: tab(DIMENSION_INFO.accounts, "members", { showDetail: true }),
  daily: { nameKey: "colDate", fallbackKey: "unknown", extraCount: "members", defaultSort: "name" },
  branches: tab(DIMENSION_INFO.branches, "members"),
  errorCodes: tab(DIMENSION_INFO.errorCodes, "members"),
  serviceTiers: tab(DIMENSION_INFO.serviceTiers, "members"),
  teams: tab(DIMENSION_INFO.teams, "members"),
};
