import type { KeyTemplatePolicy, TemplateReferenceIssue } from "@/shared/types/keyTemplates";
import {
  isLiteralKeyTemplateComboReference,
} from "../../../../shared/utils/keyTemplateReferences.ts";
import type { PolicyEditorFormState } from "./keyTemplatePolicyUtils";

export interface ReferenceCatalog {
  connectionIds?: ReadonlySet<string>;
  comboNames?: ReadonlySet<string>;
  comboIds?: ReadonlySet<string>;
  quotaPoolIds?: ReadonlySet<string>;
  proxyIds?: ReadonlySet<string>;
  groupIds?: ReadonlySet<string>;
  inactiveGroupIds?: ReadonlySet<string>;
}

export function anchorReferenceIssues(issues: readonly TemplateReferenceIssue[], policy: KeyTemplatePolicy): TemplateReferenceIssue[] {
  return issues.map((issue) => {
    if (issue.value !== undefined) return issue;
    const value = issue.path.replace(/^policy\./, "").split(".").reduce<unknown>(
      (node, part) => node && typeof node === "object" ? (node as Record<string, unknown>)[part] : undefined,
      policy
    );
    return typeof value === "string" ? { ...issue, value } : issue;
  });
}

function issueValues(state: PolicyEditorFormState, path: string): string[] | undefined {
  const clean = path.replace(/^policy\./, "");
  const lists: Record<string, string[]> = {
    "key.allowedConnections": state.allowAllConnections ? [] : state.selectedConnections,
    "key.preferredConnections": state.selectedPreferredConnections,
    "key.allowedCombos": state.allowAllCombos ? [] : state.selectedCombos,
    "key.allowedQuotas": state.allowedQuotas,
    "key.proxyId": state.proxyId ? [state.proxyId] : [],
    "related.groupIds": state.groupIds,
  };
  const entry = Object.entries(lists).find(([prefix]) => clean === prefix || clean.startsWith(`${prefix}.`));
  if (entry) return entry[1];
  if (clean.startsWith("related.autoCandidateOverrides.")) return state.autoCandidateOverrides.map((row) => row.connectionId);
  if (clean.startsWith("related.reasoningRules.")) {
    const field = clean.split(".")[3];
    if (field === "connectionId" || field === "comboId" || field === "targetComboId") return state.reasoningRules.map((row) => row[field] ?? "");
  }
  return undefined;
}

function knownValues(issue: TemplateReferenceIssue, catalog?: ReferenceCatalog) {
  const sets: Record<string, ReadonlySet<string> | undefined> = {
    PROXY_NOT_FOUND: catalog?.proxyIds,
    GROUP_NOT_FOUND: catalog?.groupIds,
    QUOTA_POOL_NOT_FOUND: catalog?.quotaPoolIds,
    CONNECTION_NOT_FOUND: catalog?.connectionIds,
    REASONING_CONNECTION_NOT_FOUND: catalog?.connectionIds,
    COMBO_NOT_FOUND: catalog?.comboNames,
    REASONING_COMBO_NOT_FOUND: catalog?.comboIds,
  };
  return sets[issue.code];
}

function serverIssuePresent(state: PolicyEditorFormState, issue: TemplateReferenceIssue, catalog?: ReferenceCatalog) {
  const values = issueValues(state, issue.path);
  if (!values) return true; // Field validation is cleared on edit by the owning form.
  if (!values.length) return false;
  if (issue.value !== undefined && !values.includes(issue.value)) return false;
  if (issue.code === "COMBO_NOT_FOUND" && issue.value !== undefined && !isLiteralKeyTemplateComboReference(issue.value)) return false;
  if (issue.code === "GROUP_INACTIVE" && catalog?.inactiveGroupIds) {
    return values.some((value) => catalog.inactiveGroupIds!.has(value));
  }
  const known = knownValues(issue, catalog);
  if (!known) return true; // Unknown catalog is not an empty catalog.
  const targets = issue.value === undefined ? values : [issue.value];
  return targets.some((value) => !known.has(value));
}

function missingReferences(values: string[], known: ReadonlySet<string> | undefined, path: string, code: TemplateReferenceIssue["code"], blocking = false, literal = (_value: string) => true): TemplateReferenceIssue[] {
  if (!known) return [];
  return values.flatMap((value, index) => literal(value) && !known.has(value)
    ? [{ path: `${path}.${index}`, code, value, message: `Missing reference: ${value}`, blocking }]
    : []);
}

function narrowingReferenceIssues(state: PolicyEditorFormState, catalog?: ReferenceCatalog) {
  return [
    ...missingReferences(state.allowAllConnections ? [] : state.selectedConnections, catalog?.connectionIds, "key.allowedConnections", "CONNECTION_NOT_FOUND"),
    ...missingReferences(state.selectedPreferredConnections, catalog?.connectionIds, "key.preferredConnections", "CONNECTION_NOT_FOUND"),
    ...missingReferences(state.allowAllCombos ? [] : state.selectedCombos, catalog?.comboNames, "key.allowedCombos", "COMBO_NOT_FOUND", false, isLiteralKeyTemplateComboReference),
    ...missingReferences(state.allowedQuotas, catalog?.quotaPoolIds, "key.allowedQuotas", "QUOTA_POOL_NOT_FOUND"),
  ];
}

function bindingReferenceIssues(state: PolicyEditorFormState, catalog?: ReferenceCatalog) {
  const issues = missingReferences(state.groupIds, catalog?.groupIds, "related.groupIds", "GROUP_NOT_FOUND", true);
  if (state.proxyId && catalog?.proxyIds && !catalog.proxyIds.has(state.proxyId)) {
    issues.push({ path: "key.proxyId", code: "PROXY_NOT_FOUND", value: state.proxyId, message: `Missing proxy: ${state.proxyId}`, blocking: true });
  }
  state.groupIds.forEach((value, index) => {
    if (catalog?.inactiveGroupIds?.has(value)) issues.push({ path: `related.groupIds.${index}`, code: "GROUP_INACTIVE", value, message: `Inactive group: ${value}`, blocking: false });
  });
  return issues;
}

export function resolveActiveReferenceIssues(state: PolicyEditorFormState, serverIssues: readonly TemplateReferenceIssue[], catalog?: ReferenceCatalog): TemplateReferenceIssue[] {
  const issues = [
    ...serverIssues.filter((issue) => serverIssuePresent(state, issue, catalog)),
    ...narrowingReferenceIssues(state, catalog),
    ...bindingReferenceIssues(state, catalog),
  ];
  const unique = new Map<string, TemplateReferenceIssue>();
  for (const issue of issues) {
    const nonblocking = ["CONNECTION_NOT_FOUND", "QUOTA_POOL_NOT_FOUND", "GROUP_INACTIVE"].includes(issue.code);
    unique.set(`${issue.path}:${issue.code}:${issue.value ?? ""}`, nonblocking ? { ...issue, blocking: false } : issue);
  }
  return [...unique.values()];
}

export function removeReferenceTarget(state: PolicyEditorFormState, issue: TemplateReferenceIssue): PolicyEditorFormState {
  if (issue.value === undefined) return state; // Legacy unanchored issues require reload, never index guessing.
  const value = issue.value;
  const path = issue.path.replace(/^policy\./, "");
  const without = (values: string[]) => values.filter((item) => item !== value);
  if (path.startsWith("key.allowedConnections.")) return { ...state, selectedConnections: without(state.selectedConnections), selectedPreferredConnections: without(state.selectedPreferredConnections) };
  if (path.startsWith("key.preferredConnections.")) return { ...state, selectedPreferredConnections: without(state.selectedPreferredConnections) };
  if (path.startsWith("key.allowedCombos.")) return { ...state, selectedCombos: without(state.selectedCombos) };
  if (path.startsWith("key.allowedQuotas.")) return { ...state, allowedQuotas: without(state.allowedQuotas) };
  if (path === "key.proxyId") return state.proxyId === value ? { ...state, proxyId: "" } : state;
  if (path.startsWith("related.groupIds.")) return { ...state, groupIds: without(state.groupIds) };
  if (path.startsWith("related.autoCandidateOverrides.")) return { ...state, autoCandidateOverrides: state.autoCandidateOverrides.filter((row) => row.connectionId !== value) };
  if (path.startsWith("related.reasoningRules.")) {
    const field = path.split(".")[3];
    if (field === "connectionId" || field === "comboId" || field === "targetComboId") return { ...state, reasoningRules: state.reasoningRules.filter((row) => row[field] !== value) };
  }
  return state;
}

export function removesLastQuotaRestriction(previous: PolicyEditorFormState, next: PolicyEditorFormState): boolean {
  return previous.allowedQuotas.length > 0 && next.allowedQuotas.length === 0;
}
