/**
 * ordering.ts — total, deterministic ordering of migration versions.
 *
 * Two file-name formats share the main migrations directory:
 *
 *   - `NNN_description.sql` — the legacy sequential set, frozen at `239_…`
 *     (exactly three digits, with known gaps).
 *   - `YYYYMMDDHHMMSS_description.sql` — every new migration (UTC timestamp,
 *     14 digits), created with `npm run db:new-migration -- <description>`.
 *
 * Both are recorded in `_omniroute_migrations.version` as the bare digit prefix,
 * a TEXT column. Text order is wrong as soon as the two formats mix:
 * `"20261113120000" < "235"` lexicographically, so a timestamped migration would
 * run BEFORE the legacy tables it depends on. Everything that orders versions
 * (the file list, the applied ledger, the diagnostics) goes through
 * `compareMigrationVersions()` instead, which compares the prefix by NUMERIC
 * value. For the legacy set (all three digits) numeric order and text order are
 * identical, so no existing migration moves.
 *
 * Ledger versions fall into three groups, ordered group by group:
 *
 *   0. main set — digits only (`001`, `239`, `20261113120000`): numeric value,
 *      with arbitrary precision (no `Number`, so nothing past 2^53 can tie).
 *   1. namespaced — `<namespace>-<digits>` (`ee-134`), from the directories in
 *      OMNIROUTE_EXTRA_MIGRATIONS_DIRS: always after the whole main set, then by
 *      namespace and by numeric value inside it.
 *   2. anything else the ledger may hold (`legacy-074-discovery_results`, rows
 *      rehomed by the compatibility layer): last, by plain string comparison.
 *
 * Equal numeric values written differently (`001` vs `1`) tie-break on the raw
 * string, so the order is total and never depends on the input order.
 */

const MAIN_VERSION_PATTERN = /^\d+$/;
const NAMESPACED_VERSION_PATTERN = /^([a-z][a-z0-9]*)-(\d+)$/;

type ParsedVersion =
  { group: 0; digits: string } | { group: 1; namespace: string; digits: string } | { group: 2 };

function parseVersion(version: string): ParsedVersion {
  if (MAIN_VERSION_PATTERN.test(version)) return { group: 0, digits: version };
  const namespaced = NAMESPACED_VERSION_PATTERN.exec(version);
  if (namespaced) return { group: 1, namespace: namespaced[1], digits: namespaced[2] };
  return { group: 2 };
}

function compareStrings(a: string, b: string): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

/**
 * Compare two non-negative decimal integers given as digit strings, by value and
 * with arbitrary precision: strip leading zeros, then the longer one is larger,
 * and same-length strings compare lexicographically.
 */
export function compareDigitStrings(a: string, b: string): number {
  const left = a.replace(/^0+(?=\d)/, "");
  const right = b.replace(/^0+(?=\d)/, "");
  if (left.length !== right.length) return left.length < right.length ? -1 : 1;
  return compareStrings(left, right);
}

/**
 * Total order over ledger versions (see the module header). Suitable for
 * `Array.prototype.sort`.
 */
export function compareMigrationVersions(a: string, b: string): number {
  const left = parseVersion(a);
  const right = parseVersion(b);
  if (left.group !== right.group) return left.group - right.group;

  if (left.group === 0 && right.group === 0) {
    return compareDigitStrings(left.digits, right.digits) || compareStrings(a, b);
  }
  if (left.group === 1 && right.group === 1) {
    return (
      compareStrings(left.namespace, right.namespace) ||
      compareDigitStrings(left.digits, right.digits) ||
      compareStrings(a, b)
    );
  }
  return compareStrings(a, b);
}

function basename(filePath: string): string {
  const parts = filePath.split(/[\\/]/);
  return parts[parts.length - 1] ?? filePath;
}

/**
 * Order migration files by version and, for files sharing a version slot (the
 * superseded duplicates the runner tolerates), by file name — which is exactly
 * the order the previous plain text sort produced for them.
 */
export function compareMigrationFiles(
  a: { version: string; name: string; path: string },
  b: { version: string; name: string; path: string }
): number {
  return (
    compareMigrationVersions(a.version, b.version) ||
    compareStrings(basename(a.path), basename(b.path))
  );
}
