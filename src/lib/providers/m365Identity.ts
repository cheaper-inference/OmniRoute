import { z } from "zod";
import { parseM365PastedCredential } from "@omniroute/open-sse/utils/m365Credentials.ts";
import { providerSpecificSecretKeysIn } from "@/lib/db/providers/providerSpecificDataSecrets";

const guid = z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
const claimsSchema = z.object({ tid: guid, oid: guid });
const dataSchema = z.record(z.string(), z.unknown());

/** Stable account routing identity, not JWT signature verification or authorization. */
export function m365ConnectionIdentity(value: unknown): string | null {
  const parsed = dataSchema.safeParse(value);
  if (!parsed.success) return null;
  const row = parsed.data;
  const metadata = dataSchema.safeParse(row.providerSpecificData);
  const psd = metadata.success ? metadata.data : {};
  const claims = claimsSchema.safeParse(psd);
  if (claims.success) return `${claims.data.oid}@${claims.data.tid}`.toLowerCase();
  const pasted = typeof row.apiKey === "string" ? parseM365PastedCredential(row.apiKey) : {};
  const path = psd.chathubPath ?? pasted.chathubPath;
  if (typeof path !== "string") return null;
  const pieces = path.split("@");
  if (
    pieces.length !== 2 ||
    !guid.safeParse(pieces[0]).success ||
    !guid.safeParse(pieces[1]).success
  )
    return null;
  return path.toLowerCase();
}

/** Never use a shared email address to replace another Microsoft tenant/account. */
export function sameM365Account(existing: unknown, incoming: unknown): boolean {
  const identity = m365ConnectionIdentity(incoming);
  return identity !== null && identity === m365ConnectionIdentity(existing);
}

/** Keep operator metadata, not obsolete credential copies, across native sign-in. */
export function m365MetadataAfterSignIn(
  existing: unknown,
  incoming: unknown
): Record<string, unknown> {
  const before = dataSchema.safeParse(existing);
  const after = dataSchema.safeParse(incoming);
  const merged = {
    ...(before.success ? before.data : {}),
    ...(after.success ? after.data : {}),
  };
  const secrets = new Set(providerSpecificSecretKeysIn(merged));
  return Object.fromEntries(Object.entries(merged).filter(([key]) => !secrets.has(key)));
}
