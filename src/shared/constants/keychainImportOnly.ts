/**
 * Providers that have NO browser OAuth flow — credentials are imported from the
 * OS keychain via a dedicated Import button (#6041). Client-safe leaf module so
 * both the OAuth route guard and the dashboard provider page share one source
 * of truth (#20573).
 */
export const KEYCHAIN_IMPORT_ONLY_PROVIDERS: ReadonlySet<string> = new Set(["zed"]);
