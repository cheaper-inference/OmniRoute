/** Dashboard-side report view state and its mapping to /api/reports query strings and the page URL. */

import type { ReportDimension } from "@/lib/usage/agentSessionReports";
import type { ReportFacetDimension, ReportFacetEntry } from "@/lib/db/agentSessionReports";

/** Filter value meaning "the field is empty"; mirrors REPORT_FILTER_NONE in the backend. */
export const FILTER_NONE = "__none__";
/** Most values one multi-select filter sends; mirrors MAX_FILTER_VALUES in the API. */
export const MAX_FILTER_VALUES = 50;
/** Longest search text the API accepts. */
export const MAX_SEARCH_LENGTH = 200;

export const FILTER_FIELDS = [
  "apiKeyId",
  "projectName",
  "client",
  "provider",
  "model",
  "connectionId",
  "gitBranch",
  "serviceTier",
  "errorCode",
  "billingTeamId",
] as const;
export type FilterField = (typeof FILTER_FIELDS)[number];

export interface FilterDimension {
  field: FilterField;
  /** Key of this dimension's values in the /api/reports/facets response. */
  facet: ReportFacetDimension;
  /** `reports` message key of the dimension name. */
  labelKey: string;
  /** `reports` message key of the "No ..." entry; absent when the UI does not offer one. */
  noneKey?: string;
}

export const FILTER_DIMENSIONS: readonly FilterDimension[] = [
  { field: "apiKeyId", facet: "members", labelKey: "member", noneKey: "noneMember" },
  { field: "projectName", facet: "projects", labelKey: "project", noneKey: "noneProject" },
  { field: "client", facet: "clients", labelKey: "client", noneKey: "noneClient" },
  { field: "provider", facet: "providers", labelKey: "provider" },
  { field: "model", facet: "models", labelKey: "colModel" },
  { field: "connectionId", facet: "accounts", labelKey: "account" },
  { field: "gitBranch", facet: "branches", labelKey: "colBranch" },
  { field: "serviceTier", facet: "serviceTiers", labelKey: "serviceTier" },
  { field: "errorCode", facet: "errorCodes", labelKey: "errorCode" },
  { field: "billingTeamId", facet: "teams", labelKey: "billingTeam" },
];

export type ReportOutcome = "" | "success" | "error";
const OUTCOMES: readonly ReportOutcome[] = ["success", "error"];

export type ReportFilterState = {
  /** `datetime-local` values in the browser's time zone; empty means unbounded. */
  from: string;
  to: string;
  outcome: ReportOutcome;
  search: string;
} & Record<FilterField, string[]>;

export const TIME_PRESETS = ["24h", "7d", "30d", "90d", "all"] as const;
export type TimePreset = (typeof TIME_PRESETS)[number];
export type PresetChoice = TimePreset | "custom";
const DEFAULT_PRESET: TimePreset = "7d";

export const REPORT_TABS = [
  "members",
  "projects",
  "sessions",
  "daily",
  "clients",
  "providers",
  "models",
  "accounts",
] as const satisfies readonly (ReportDimension | "sessions")[];
export type ReportTab = (typeof REPORT_TABS)[number];
const DEFAULT_TAB: ReportTab = "members";

export const SESSION_SORT_FIELDS = ["lastSeen", "firstSeen", "requests", "tokens", "cost"] as const;
export type SessionSort = (typeof SESSION_SORT_FIELDS)[number];
export interface SessionOrder {
  sort: SessionSort;
  desc: boolean;
}
const DEFAULT_ORDER: SessionOrder = { sort: "lastSeen", desc: true };

const PRESET_HOURS: Record<Exclude<TimePreset, "all">, number> = {
  "24h": 24,
  "7d": 7 * 24,
  "30d": 30 * 24,
  "90d": 90 * 24,
};

/** `datetime-local` wants local wall-clock time without a zone suffix. */
function toLocalInputValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function presetWindow(preset: TimePreset, now = new Date()): { from: string; to: string } {
  if (preset === "all") return { from: "", to: "" };
  const from = new Date(now.getTime() - PRESET_HOURS[preset] * 3_600_000);
  return { from: toLocalInputValue(from), to: "" };
}

export function emptyFilters(preset: TimePreset): ReportFilterState {
  const empty = Object.fromEntries(FILTER_FIELDS.map((field) => [field, []]));
  return { ...presetWindow(preset), outcome: "", search: "", ...empty } as ReportFilterState;
}

/** Display name of a facet value: its label when the API knows one, else the raw value. */
export function facetName(entry: ReportFacetEntry): string {
  return entry.label || entry.value;
}

/** True when any non-time filter is set. */
export function hasDimensionFilter(filters: ReportFilterState): boolean {
  return (
    Boolean(filters.outcome || filters.search.trim()) ||
    FILTER_FIELDS.some((field) => filters[field].length > 0)
  );
}

/** Adds one value to a multi-value filter, keeping the API's cap. */
export function withFilterValue(
  filters: ReportFilterState,
  field: FilterField,
  value: string
): ReportFilterState {
  if (filters[field].includes(value)) return filters;
  return { ...filters, [field]: [...filters[field], value].slice(0, MAX_FILTER_VALUES) };
}

/**
 * Query string for the report APIs. Multi-value filters are repeated params (`model=a&model=b`),
 * never comma lists: project names may contain commas.
 */
export function toReportQuery(filters: ReportFilterState): URLSearchParams {
  const params = new URLSearchParams();
  // Minutes east of UTC; the API uses it to group `daily` rows by the viewer's calendar days.
  params.set("tzOffset", String(-new Date().getTimezoneOffset() || 0));
  if (filters.from) params.set("from", new Date(filters.from).toISOString());
  if (filters.to) params.set("to", new Date(filters.to).toISOString());
  for (const field of FILTER_FIELDS) {
    for (const value of filters[field].slice(0, MAX_FILTER_VALUES)) params.append(field, value);
  }
  if (filters.outcome) params.set("outcome", filters.outcome);
  const search = filters.search.trim().slice(0, MAX_SEARCH_LENGTH);
  if (search) params.set("search", search);
  return params;
}

/** Everything the page URL carries: the time range, filters, the active tab and the list order. */
export interface ReportView {
  preset: PresetChoice;
  filters: ReportFilterState;
  tab: ReportTab;
  sessionOrder: SessionOrder;
}

function isOneOf<T extends string>(list: readonly T[], value: string | null): value is T {
  return value !== null && (list as readonly string[]).includes(value);
}

function parseTimestamp(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : toLocalInputValue(date);
}

/** Reads a report view from page query params; anything invalid falls back to the default. */
export function parseReportView(params: URLSearchParams, now = new Date()): ReportView {
  const range = params.get("range");
  const preset = isOneOf(TIME_PRESETS, range) ? range : DEFAULT_PRESET;
  const from = parseTimestamp(params.get("from"));
  const to = parseTimestamp(params.get("to"));
  const custom = Boolean(from || to);
  const filters = emptyFilters(preset);
  if (custom) Object.assign(filters, { from, to });
  else Object.assign(filters, presetWindow(preset, now));

  for (const field of FILTER_FIELDS) {
    const values = params
      .getAll(field)
      .map((value) => value.trim())
      .filter(Boolean);
    filters[field] = [...new Set(values)].slice(0, MAX_FILTER_VALUES);
  }
  const outcome = params.get("outcome");
  if (isOneOf(OUTCOMES, outcome)) filters.outcome = outcome;
  filters.search = (params.get("search") ?? "").trim().slice(0, MAX_SEARCH_LENGTH);

  const tab = params.get("tab");
  const sort = params.get("sort");
  return {
    preset: custom ? "custom" : preset,
    filters,
    tab: isOneOf(REPORT_TABS, tab) ? tab : DEFAULT_TAB,
    sessionOrder: {
      sort: isOneOf(SESSION_SORT_FIELDS, sort) ? sort : DEFAULT_ORDER.sort,
      desc: params.get("order") !== "asc",
    },
  };
}

/**
 * Page query params for a view, in a fixed order and without defaults, so one view always has one
 * URL. Presets stay relative ("7d"); a custom range is stored as absolute ISO timestamps.
 */
export function serializeReportView(view: ReportView): URLSearchParams {
  const { preset, filters, tab, sessionOrder } = view;
  const params = new URLSearchParams();
  if (preset === "custom") {
    if (filters.from) params.set("from", new Date(filters.from).toISOString());
    if (filters.to) params.set("to", new Date(filters.to).toISOString());
    // Both ends cleared by hand is the same as "all time".
    if (!filters.from && !filters.to) params.set("range", "all");
  } else if (preset !== DEFAULT_PRESET) {
    params.set("range", preset);
  }
  for (const field of FILTER_FIELDS) {
    for (const value of filters[field]) params.append(field, value);
  }
  if (filters.outcome) params.set("outcome", filters.outcome);
  const search = filters.search.trim().slice(0, MAX_SEARCH_LENGTH);
  if (search) params.set("search", search);
  if (tab !== DEFAULT_TAB) params.set("tab", tab);
  if (sessionOrder.sort !== DEFAULT_ORDER.sort) params.set("sort", sessionOrder.sort);
  if (!sessionOrder.desc) params.set("order", "asc");
  return params;
}
