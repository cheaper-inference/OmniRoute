/**
 * Pure settings predicates for the dashboard credential surface. Kept free of imports so
 * modules bundled outside Next.js (the compression worker reaches `src/lib/db/apiKeys.ts`)
 * can use them without pulling `next/headers` or `jose` in through `apiAuth.ts`.
 */
export function hasConfiguredPassword(settings: Record<string, unknown>): boolean {
  return typeof settings.password === "string" && settings.password.length > 0;
}

export function hasConfiguredOidc(settings: Record<string, unknown>): boolean {
  return (
    settings.oidcEnabled === true &&
    typeof settings.oidcIssuer === "string" &&
    settings.oidcIssuer.trim().length > 0 &&
    typeof settings.oidcClientId === "string" &&
    settings.oidcClientId.trim().length > 0 &&
    typeof settings.oidcClientSecret === "string" &&
    settings.oidcClientSecret.trim().length > 0
  );
}
