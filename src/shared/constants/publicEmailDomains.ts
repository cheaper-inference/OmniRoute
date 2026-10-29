/**
 * Consumer mail providers anyone can sign up with. A social-login allowlist domain entry
 * (`@gmail.com`, `*@outlook.com`) for one of them would admit every account of the provider, so
 * such entries never match and the settings schema refuses them (#15153 security review).
 */
export const PUBLIC_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "ymail.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
  "gmx.com",
  "gmx.net",
  "mail.com",
  "yandex.com",
  "yandex.ru",
  "zoho.com",
  "qq.com",
  "163.com",
  "126.com",
  "github.com",
  "users.noreply.github.com",
]);

/** Returns the lower-cased domain of a `@domain` / `*@domain` entry, or null for other entries. */
export function domainOfAllowlistEntry(entry: string): string | null {
  const normalized = entry.trim().toLowerCase();
  if (normalized.startsWith("*@")) return normalized.slice(2) || null;
  if (normalized.startsWith("@")) return normalized.slice(1) || null;
  return null;
}

/** True when `entry` is a domain entry that names a public mail provider (never honoured). */
export function isPublicEmailDomainEntry(entry: string): boolean {
  const domain = domainOfAllowlistEntry(entry);
  return domain !== null && PUBLIC_EMAIL_DOMAINS.has(domain);
}
