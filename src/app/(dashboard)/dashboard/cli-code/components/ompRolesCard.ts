import type { OmpRoleId } from "@/shared/constants/ompRoles";

/**
 * Pure helpers for the Oh My Pi role picker card (OmpToolCard). The card writes
 * through `/api/cli-tools/omp-settings`, whose `roles` map takes a bare
 * OmniRoute model id per role (written as `omniroute/<id>`) or null to remove
 * a role OmniRoute owns.
 */
export const OMP_ROLE_PREFIX = "omniroute/";

/** Pending choices: role -> model id, or "" to unset. */
export type OmpRoleSelections = Partial<Record<OmpRoleId, string>>;

export function apiErrorText(data: any, fallback: string): string {
  return (typeof data?.error === "string" ? data.error : data?.error?.message) || fallback;
}

/** The `modelRoles` lines the pending choices produce, for the preview block. */
export function buildOmpRolesPreview(selections: OmpRoleSelections): string {
  const lines = Object.entries(selections).map(([role, model]) =>
    model ? `  ${role}: ${OMP_ROLE_PREFIX}${model}` : `  # ${role}: (removed)`
  );
  return lines.length ? `modelRoles:\n${lines.join("\n")}\n` : "";
}

/** The omp-settings POST body: unchanged provider target plus role assignments. */
export function buildOmpRolesRequest(baseUrl: string, selections: OmpRoleSelections) {
  return {
    baseUrl,
    roles: Object.fromEntries(
      Object.entries(selections).map(([role, model]) => [role, model ? model : null])
    ),
  };
}

/** True when every role in `selections` now reads back as requested. */
export function ompRolesMatch(
  selections: OmpRoleSelections,
  onDisk: Partial<Record<OmpRoleId, string>>
): boolean {
  return Object.entries(selections).every(
    ([role, model]) => (onDisk[role as OmpRoleId] ?? "") === (model ?? "")
  );
}
