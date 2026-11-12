import { createHash } from "node:crypto";

export const OWNER = "family-alias-maintainer/v2";

export type OwnedKind = "family" | "version" | "qualified";

export function stableHash(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function ownershipDescription(graphHash: string, kind: OwnedKind): string {
  return `managed-by:${OWNER}; graph:${graphHash}; kind:${kind}`;
}

export function parseOwnership(description: unknown):
  | { owner: string; graphHash: string; kind: OwnedKind }
  | null {
  if (typeof description !== "string") return null;
  const match = /^managed-by:([^;]+); graph:([a-f0-9]{64}); kind:(family|version|qualified)$/.exec(
    description,
  );
  if (!match) return null;
  return { owner: match[1], graphHash: match[2], kind: match[3] as OwnedKind };
}
