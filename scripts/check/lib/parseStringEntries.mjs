/**
 * Reader for string-literal collections declared in TypeScript source, e.g.
 *
 *   export const LOCAL_ONLY_API_GET_EXEMPTIONS: ReadonlySet<string> = new Set([
 *     "/api/system/version",
 *     "/api/version-manager/status",
 *   ]);
 *
 * Line-oriented on purpose. A regex such as `[\s\S]*?new Set\(\[([\s\S]*?)\]\)`
 * latches onto the NEXT `new Set(` in the file as soon as the declaration is
 * written `new Set<string>([` or wrapped by a formatter, and it truncates at a
 * quoted `])` inside a comment. Both failure modes leave the caller with a
 * plausible-looking set, so the guards around it keep reporting healthy while
 * checking nothing.
 *
 * Contract:
 *   - declaration missing            -> null
 *   - declaration present, unreadable -> throws
 *   - otherwise                      -> string[] (never empty)
 */

export function readStringEntries(srcText, name) {
  const lines = String(srcText).split("\n");
  const decl = lines.findIndex((l) => new RegExp(`(?:export\\s+)?const ${name}\\b`).test(l));
  if (decl === -1) return null;

  let assignmentSeen = false;
  let opened = false;
  const entries = [];
  for (let i = decl; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!opened) {
      // The opener is the first '[' AFTER the '=', which may sit on a later line
      // once a formatter wraps the declaration. Anchoring on '=' also skips a '['
      // that belongs to a type annotation (`const X: string[] = [`).
      const eq = raw.indexOf("=");
      if (eq !== -1) assignmentSeen = true;
      if (!assignmentSeen) continue;
      const open = raw.indexOf("[", eq === -1 ? 0 : eq);
      if (open === -1) continue;

      opened = true;
      const rest = raw.slice(open + 1);
      const close = rest.indexOf("]");
      // Single-line form: stop at the bracket so a trailing comment cannot inject
      // quoted values into the collection.
      const scope = close === -1 ? rest : rest.slice(0, close);
      for (const m of scope.matchAll(/["']([^"']*)["']/g)) entries.push(m[1]);
      if (close !== -1) break;
      continue;
    }

    if (line === "" || line.startsWith("//")) continue;
    if (line.startsWith("]")) break;
    const m = line.match(/^["']([^"']*)["']/);
    if (!m) {
      throw new Error(
        `openapi-security-tiers: unexpected line in ${name} at line ${i + 1}: ${line}`
      );
    }
    entries.push(m[1]);
  }

  if (!opened || entries.length === 0) {
    throw new Error(
      `openapi-security-tiers: ${name} parsed to no entries (declaration present, body unreadable)`
    );
  }
  return entries;
}
