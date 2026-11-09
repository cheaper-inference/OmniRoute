import type { KeyTemplatePolicy, TemplateReferenceIssue } from "@/shared/types/keyTemplates";
import { isLiteralKeyTemplateComboReference } from "../../../../shared/utils/keyTemplateReferences.ts";
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

type AnchoredIssue = TemplateReferenceIssue & { rowId?: string };
type RowCollection = "reasoningRules" | "autoCandidateOverrides";

function compoundTarget(path: string) {
  const match =
    /^related\.(reasoningRules|autoCandidateOverrides)\.(\d+)\.(connectionId|comboId|targetComboId)$/.exec(
      path.replace(/^policy\./, "")
    );
  return match
    ? { collection: match[1] as RowCollection, index: Number(match[2]), field: match[3] }
    : undefined;
}

/** Anchor server paths once against the exact submitted or freshly loaded form. */
export function anchorReferenceIssues(
  issues: readonly TemplateReferenceIssue[],
  policy: KeyTemplatePolicy,
  form?: PolicyEditorFormState
): TemplateReferenceIssue[] {
  return issues.map((issue): AnchoredIssue => {
    const anchored = issue as AnchoredIssue;
    const value =
      issue.value ??
      issue.path
        .replace(/^policy\./, "")
        .split(".")
        .reduce<unknown>(
          (node, part) =>
            node && typeof node === "object" ? (node as Record<string, unknown>)[part] : undefined,
          policy
        );
    const target = compoundTarget(issue.path);
    if (!target || anchored.rowId !== undefined)
      return typeof value === "string" ? { ...issue, value } : issue;
    const rowId = form
      ? form[target.collection][target.index]?.clientRowId
      : `${target.collection === "reasoningRules" ? "rr" : "aco"}-${target.index}`;
    return {
      ...issue,
      ...(typeof value === "string" ? { value } : {}),
      ...(rowId === undefined ? {} : { rowId }),
    };
  });
}

/** Preserve anchors when an edit did not clear any field-validation issue. */
export function clearFieldValidationIssues(
  issues: TemplateReferenceIssue[]
): TemplateReferenceIssue[] {
  return issues.some((issue) => issue.code === "INVALID_FIELD")
    ? issues.filter((issue) => issue.code !== "INVALID_FIELD")
    : issues;
}

export function canRemoveReferenceIssue(issue: TemplateReferenceIssue): boolean {
  return (
    issue.value !== undefined &&
    (!compoundTarget(issue.path) || (issue as AnchoredIssue).rowId !== undefined)
  );
}

export function referenceIssueKey(issue: TemplateReferenceIssue): string {
  const path = issue.value === undefined ? issue.path : issue.path.replace(/\.\d+(?=\.|$)/g, "");
  return `${path}:${issue.code}:${issue.value ?? ""}:${(issue as AnchoredIssue).rowId ?? ""}`;
}

function rowReferencePresent(
  state: PolicyEditorFormState,
  issue: TemplateReferenceIssue,
  catalog?: ReferenceCatalog
): boolean | undefined {
  const target = compoundTarget(issue.path);
  if (!target) return undefined;
  const rowId = (issue as AnchoredIssue).rowId;
  if (rowId === undefined || issue.value === undefined) return true;
  const row = state[target.collection].find((item) => item.clientRowId === rowId);
  if (!row || (row as unknown as Record<string, unknown>)[target.field] !== issue.value)
    return false;
  const known = knownValues(issue, catalog);
  return known ? !known.has(issue.value) : true;
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
  const entry = Object.entries(lists).find(
    ([prefix]) => clean === prefix || clean.startsWith(`${prefix}.`)
  );
  if (entry) return entry[1];
  if (clean.startsWith("related.autoCandidateOverrides."))
    return state.autoCandidateOverrides.map((row) => row.connectionId);
  if (clean.startsWith("related.reasoningRules.")) {
    const field = clean.split(".")[3];
    if (field === "connectionId" || field === "comboId" || field === "targetComboId")
      return state.reasoningRules.map((row) => row[field] ?? "");
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

function serverIssuePresent(
  state: PolicyEditorFormState,
  issue: TemplateReferenceIssue,
  catalog?: ReferenceCatalog
) {
  const compound = rowReferencePresent(state, issue, catalog);
  if (compound !== undefined) return compound;
  const values = issueValues(state, issue.path);
  if (!values) return true; // Field validation is cleared on edit by the owning form.
  if (!values.length) return false;
  if (issue.value !== undefined && !values.includes(issue.value)) return false;
  if (
    issue.code === "COMBO_NOT_FOUND" &&
    issue.value !== undefined &&
    !isLiteralKeyTemplateComboReference(issue.value)
  )
    return false;
  if (issue.code === "GROUP_INACTIVE" && catalog?.inactiveGroupIds) {
    const targets = issue.value === undefined ? values : [issue.value];
    return targets.some((value) => catalog.inactiveGroupIds!.has(value));
  }
  const known = knownValues(issue, catalog);
  if (!known) return true; // Unknown catalog is not an empty catalog.
  const targets = issue.value === undefined ? values : [issue.value];
  return targets.some((value) => !known.has(value));
}

function missingReferences(
  values: string[],
  known: ReadonlySet<string> | undefined,
  path: string,
  code: TemplateReferenceIssue["code"],
  blocking = false,
  literal = (_value: string) => true
): TemplateReferenceIssue[] {
  if (!known) return [];
  return values.flatMap((value, index) =>
    literal(value) && !known.has(value)
      ? [
          {
            path: `${path}.${index}`,
            code,
            value,
            message: `Missing reference: ${value}`,
            blocking,
          },
        ]
      : []
  );
}

function narrowingReferenceIssues(state: PolicyEditorFormState, catalog?: ReferenceCatalog) {
  return [
    ...missingReferences(
      state.allowAllConnections ? [] : state.selectedConnections,
      catalog?.connectionIds,
      "key.allowedConnections",
      "CONNECTION_NOT_FOUND"
    ),
    ...missingReferences(
      state.selectedPreferredConnections,
      catalog?.connectionIds,
      "key.preferredConnections",
      "CONNECTION_NOT_FOUND"
    ),
    ...missingReferences(
      state.allowAllCombos ? [] : state.selectedCombos,
      catalog?.comboNames,
      "key.allowedCombos",
      "COMBO_NOT_FOUND",
      false,
      isLiteralKeyTemplateComboReference
    ),
    ...missingReferences(
      state.allowedQuotas,
      catalog?.quotaPoolIds,
      "key.allowedQuotas",
      "QUOTA_POOL_NOT_FOUND"
    ),
  ];
}

function bindingReferenceIssues(state: PolicyEditorFormState, catalog?: ReferenceCatalog) {
  const issues = missingReferences(
    state.groupIds,
    catalog?.groupIds,
    "related.groupIds",
    "GROUP_NOT_FOUND",
    true
  );
  if (state.proxyId && catalog?.proxyIds && !catalog.proxyIds.has(state.proxyId)) {
    issues.push({
      path: "key.proxyId",
      code: "PROXY_NOT_FOUND",
      value: state.proxyId,
      message: `Missing proxy: ${state.proxyId}`,
      blocking: true,
    });
  }
  state.groupIds.forEach((value, index) => {
    if (catalog?.inactiveGroupIds?.has(value))
      issues.push({
        path: `related.groupIds.${index}`,
        code: "GROUP_INACTIVE",
        value,
        message: `Inactive group: ${value}`,
        blocking: false,
      });
  });
  return issues;
}

export function resolveActiveReferenceIssues(
  state: PolicyEditorFormState,
  serverIssues: readonly TemplateReferenceIssue[],
  catalog?: ReferenceCatalog
): TemplateReferenceIssue[] {
  const issues = [
    ...serverIssues
      .filter((issue) => serverIssuePresent(state, issue, catalog))
      .map((issue) => refreshIssuePath(state, issue)),
    ...narrowingReferenceIssues(state, catalog),
    ...bindingReferenceIssues(state, catalog),
  ];
  const unique = new Map<string, TemplateReferenceIssue>();
  for (const issue of issues) {
    const nonblocking = ["CONNECTION_NOT_FOUND", "QUOTA_POOL_NOT_FOUND", "GROUP_INACTIVE"].includes(
      issue.code
    );
    unique.set(referenceIssueKey(issue), nonblocking ? { ...issue, blocking: false } : issue);
  }
  return [...unique.values()];
}

export function removeReferenceTarget(
  state: PolicyEditorFormState,
  issue: TemplateReferenceIssue
): PolicyEditorFormState {
  if (issue.value === undefined) return state; // Legacy unanchored issues require reload, never index guessing.
  const value = issue.value;
  const path = issue.path.replace(/^policy\./, "");
  const without = (values: string[]) => values.filter((item) => item !== value);
  if (path.startsWith("key.allowedConnections."))
    return {
      ...state,
      selectedConnections: without(state.selectedConnections),
      selectedPreferredConnections: without(state.selectedPreferredConnections),
    };
  if (path.startsWith("key.preferredConnections."))
    return { ...state, selectedPreferredConnections: without(state.selectedPreferredConnections) };
  if (path.startsWith("key.allowedCombos."))
    return { ...state, selectedCombos: without(state.selectedCombos) };
  if (path.startsWith("key.allowedQuotas."))
    return { ...state, allowedQuotas: without(state.allowedQuotas) };
  if (path === "key.proxyId") return state.proxyId === value ? { ...state, proxyId: "" } : state;
  if (path.startsWith("related.groupIds.")) return { ...state, groupIds: without(state.groupIds) };
  const target = compoundTarget(path);
  const rowId = (issue as AnchoredIssue).rowId;
  if (target && rowId !== undefined) {
    const rows = state[target.collection];
    const index = rows.findIndex(
      (row) =>
        row.clientRowId === rowId &&
        (row as unknown as Record<string, unknown>)[target.field] === value
    );
    if (index >= 0)
      return { ...state, [target.collection]: rows.filter((_, current) => current !== index) };
  }

  return state;
}

export function removesLastQuotaRestriction(
  previous: PolicyEditorFormState,
  next: PolicyEditorFormState
): boolean {
  return previous.allowedQuotas.length > 0 && next.allowedQuotas.length === 0;
}

/** Display current indices without changing the snapshot identity used for removal. */
function refreshIssuePath(
  state: PolicyEditorFormState,
  issue: TemplateReferenceIssue
): TemplateReferenceIssue {
  if (issue.value === undefined) return issue;
  const target = compoundTarget(issue.path);
  if (target) {
    const index = state[target.collection].findIndex(
      (row) => row.clientRowId === (issue as AnchoredIssue).rowId
    );
    return index < 0
      ? issue
      : { ...issue, path: `related.${target.collection}.${index}.${target.field}` };
  }
  const flat =
    /^(key\.(allowedConnections|preferredConnections|allowedCombos|allowedQuotas)|related\.groupIds)\.\d+$/.exec(
      issue.path.replace(/^policy\./, "")
    );
  if (!flat) return issue;
  const index = issueValues(state, issue.path)?.indexOf(issue.value) ?? -1;
  return index < 0 ? issue : { ...issue, path: `${flat[1]}.${index}` };
}
