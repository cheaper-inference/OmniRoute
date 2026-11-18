export interface ModelListFilter {
  /** Exact ids (contain a slash): they match one row. */
  exact: Set<string>;
  /** Suffixes (no slash): they match the part after the first "/". */
  suffixes: Set<string>;
  /** Claimed branches (from "prefix/*" entries): they match the first segment. */
  branches: Set<string>;
}

/** Branch of an id: the segment before the first "/". Single source of the rule. */
export function branchOf(id: string): string | undefined {
  if (typeof id !== "string") return undefined;
  const slash = id.indexOf("/");
  if (slash <= 0) return undefined;
  const branch = id.slice(0, slash);
  return branch.length > 0 ? branch : undefined;
}

/** Classify one entry against the "prefix/*" claim shape. Single source of the shape. */
export function parseBranchClaim(entry: string): { claimed: boolean; branch: string } {
  if (typeof entry !== "string") return { claimed: false, branch: "" };
  if (!entry.endsWith("/*")) return { claimed: false, branch: "" };
  const name = entry.slice(0, -2);
  if (name.length === 0 || name.includes("*")) return { claimed: false, branch: "" };
  return { claimed: true, branch: name };
}

export function compileModelListFilter(list?: string[]): ModelListFilter | undefined {
  if (!list || list.length === 0) return undefined;
  const exact = new Set<string>();
  const suffixes = new Set<string>();
  const branches = new Set<string>();
  for (const entry of list) {
    if (typeof entry !== "string" || entry.length === 0) continue;
    const claim = parseBranchClaim(entry);
    if (claim.claimed) {
      branches.add(claim.branch);
      continue;
    }
    if (entry.includes("/")) {
      exact.add(entry);
    } else {
      suffixes.add(entry);
    }
  }
  if (exact.size === 0 && suffixes.size === 0 && branches.size === 0) return undefined;
  return { exact, suffixes, branches };
}

export function matchesSuffix(id: string, suffixes: Set<string>): boolean {
  if (suffixes.size === 0) return false;
  const slash = id.indexOf("/");
  const suffix = slash > 0 ? id.slice(slash + 1) : id;
  return suffixes.has(suffix);
}

export function matchesBranch(id: string, branches: Set<string>): boolean {
  if (branches.size === 0) return false;
  const branch = branchOf(id);
  if (branch === undefined) return false;
  return branches.has(branch);
}

export function matchesModelFilter(id: string, filter: ModelListFilter): boolean {
  return (
    filter.exact.has(id) || matchesSuffix(id, filter.suffixes) || matchesBranch(id, filter.branches)
  );
}
