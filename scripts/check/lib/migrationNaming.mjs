// scripts/check/lib/migrationNaming.mjs
// Migration name rules shared by gate (check-migration-numbering.mjs)
// e pelo gerador (scripts/dev/new-migration.mjs). JS puro: roda em node sem tsx.
//
// Dois formatos convivem em src/lib/db/migrations/:
//   - LEGACY  `NNN_description.sql` — exactly 3 digits, from 001 up to LEGACY_MIGRATION_MAX.
// Frozen: no new migration receives a sequence number.
// - NEW `YYYYMMDDHHMMSS_descricao.sql` — 14-digit UTC stamp (time of
// CREATION, not merge) + lowercase snake_case description. Each PR has a
// own identifier, so parallel PRs no longer compete for the same number.
//
// The runner sorts by the numerical value of the prefix: the old ones (≤ 241) always come first
// from date-based ones (≥ 20261113000000), and namespaced extra dirs (`ee-NNN`)
// continue last.

/**
 *Highest old number, FROZEN on format change. The PR for the change was opened with
 * a release/v3.8.54 in 239; before she joined, the merge train 2 merged
 * `240_provider_node_custom_json_config.sql` (#18353) e `241_seen_models.sql` (#16864, que o
 * trem renumerou de 240 para 241).
 * Merged migration is never renamed, so the freeze is at the largest number it already is
 * in the base: if another `NNN_` comes before this PR, increase this value in the same merge. From here on
 * every new migration uses the date and time stamp. An old file above this one
 * value is rejected by the gate, and a hole between the lowest old number and this value (outside
 * KNOWN_GAPS) too — including the top itself disappearing.
 */
export const LEGACY_MIGRATION_MAX = 241;

/**
 * Lowest old number (`001_initial_schema.sql`). Fixed for the same reason as above:
 * deleting the FIRST migration cannot go unnoticed either.
 */
export const LEGACY_MIGRATION_MIN = 1;

/** Old format: exactly 3 digits (all existing 236 have 3). */
export const LEGACY_MIGRATION_RE = /^(\d{3})_(.+)\.sql$/;

/**
 * New format: 14-digit UTC stamp + lowercase snake_case description beginning
 * with a letter. Starting with a letter keeps the invariant of #17186 (the `name` recorded in the ledger
 * never starts with digit) and prevents ambiguous names like `20261113120000_239_x.sql`.
 */
export const TIMESTAMP_MIGRATION_RE = /^(\d{14})_([a-z][a-z0-9]*(?:_[a-z0-9]+)*)\.sql$/;

/** Description of the new format (the same excerpt from the regex above, isolated). */
export const MIGRATION_DESCRIPTION_RE = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;

/** Maximum size of the description in the new format (filename readable on any FS). */
export const MIGRATION_DESCRIPTION_MAX_LENGTH = 80;

/**
 * Lowest stamp accepted: the day of the cut. A migration "by date" prior to the cut only
 * could be error (wrong watch or stamp invented by hand) and would be sorted with
 * migrations that never existed at that time.
 */
export const MIGRATION_TIMESTAMP_MIN = "20261113000000";

/**
 * Clock tolerance for the "non-future stamp" rule: 10 minutes. Cover the
 * normal difference between the clock of the machine that generated the file and that of the CI. One
 * stamp earlier than this indicates wrong clock or stamp typed by hand,
 * and would break the "stamp = creation order" premise.
 */
export const MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS = 10 * 60 * 1000;

/** Dica impressa junto de todo nome recusado. */
export const NEW_MIGRATION_HINT = "npm run db:new-migration -- <description>";

/**
 * Reason for a name that does not end in lowercase `.sql`. The runner only reads files that
 * end exactly in `.sql`: anything else in the directory would be ignored in
 * silence (the migration never runs and the CI turns green), so the gate refuses with the reason.
 *
 * @param {string} filename
 * @returns {string}
 */
function describeNonSqlName(filename) {
  if (filename.startsWith(".")) {
    return "hidden file: the migrations directory only accepts visible .sql files";
  }
  if (/\s/.test(filename)) {
    return "name with space: the runner only reads names that end exactly in .sql";
  }
  if (/\.sql$/i.test(filename)) {
    return "extension in uppercase (.SQL): the runner only reads files ending in lowercase .sql";
  }
  if (/\.sql\./i.test(filename)) {
    return "extra extension after .sql (e.g. .sql.bak): the runner ignores the file";
  }
  return "does not end in .sql: the migrations directory only accepts .sql files";
}

function pad(n, width) {
  return String(n).padStart(width, "0");
}

/**
 * Converts a `YYYYMMDDHHMMSS` stamp to Date UTC, validating the calendar for real
 * (month 01–12, day valid in month — including 29/02 only in leap years —, hour 00–23,
 * minute and second 00–59). Returns null for anything invalid.
 *
 * @param {string} version
 * @returns {Date | null}
 */
export function parseMigrationTimestamp(version) {
  if (typeof version !== "string" || !/^\d{14}$/.test(version)) return null;
  const year = Number(version.slice(0, 4));
  const month = Number(version.slice(4, 6));
  const day = Number(version.slice(6, 8));
  const hour = Number(version.slice(8, 10));
  const minute = Number(version.slice(10, 12));
  const second = Number(version.slice(12, 14));
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  if (hour > 23 || minute > 59 || second > 59) return null;
  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  // Round trip: Date.UTC normalizes 11/31 → 12/01; If the format doesn't match, the day doesn't exist.
  if (formatMigrationTimestamp(date) !== version) return null;
  return date;
}

/**
 * Formata um Date como `YYYYMMDDHHMMSS` em UTC.
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatMigrationTimestamp(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("formatMigrationTimestamp: invalid date");
  }
  return (
    pad(date.getUTCFullYear(), 4) +
    pad(date.getUTCMonth() + 1, 2) +
    pad(date.getUTCDate(), 2) +
    pad(date.getUTCHours(), 2) +
    pad(date.getUTCMinutes(), 2) +
    pad(date.getUTCSeconds(), 2)
  );
}

/**
 * Normalizes free text to the new format's lowercase snake_case description:
 * accents removed, any non-alphanumeric character becomes `_`, underscores
 * collapsed and trimmed, MIGRATION_DESCRIPTION_MAX_LENGTH limit. Throws error if
 * there is nothing left.
 *
 * @param {string} text
 * @returns {string}
 */
export function normalizeMigrationDescription(text) {
  const normalized = String(text ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, MIGRATION_DESCRIPTION_MAX_LENGTH)
    .replace(/_+$/g, "");
  if (normalized.length === 0) {
    throw new Error("empty migration description: use letters or numbers (e.g. add_usage_index)");
  }
  if (!/^[a-z]/.test(normalized)) {
    throw new Error(
      `description "${normalized}" must start with a letter (e.g. add_2fa_table, not 2fa_table)`
    );
  }
  return normalized;
}

/**
 * Sorts and validates a migration `.sql` file name. Used by the gate and the
 * generator (the generator validates the name it will create).
 *
 * @param {string} filename  basename terminado em `.sql`
 * @param {{ now?: Date | number, legacyMax?: number }} [options]
 * Every `invalid` result brings a stable `code` (the gate chooses the hint by the class):
 * `not-sql`, `legacy-zero`, `legacy-after-cut`, `no-prefix`, `prefix-length`, `separator`,
 * `description`, `description-length`, `bad-date`, `before-cut`, `future`, `format`.
 *
 * @returns {{ kind: "legacy", version: string, value: number, description: string }
 *   | { kind: "timestamp", version: string, value: number, description: string, date: Date }
 *   | { kind: "invalid", code: string, reason: string }}
 */
export function classifyMigrationFilename(filename, options = {}) {
  const legacyMax = options.legacyMax ?? LEGACY_MIGRATION_MAX;
  const nowMs =
    options.now === undefined
      ? Date.now()
      : options.now instanceof Date
        ? options.now.getTime()
        : Number(options.now);

  if (typeof filename !== "string") {
    return { kind: "invalid", code: "not-sql", reason: "missing name" };
  }
  if (!filename.endsWith(".sql") || filename.startsWith(".") || /\s/.test(filename)) {
    return { kind: "invalid", code: "not-sql", reason: describeNonSqlName(filename) };
  }

  const legacy = filename.match(LEGACY_MIGRATION_RE);
  if (legacy) {
    const value = Number.parseInt(legacy[1], 10);
    if (value < 1) {
      return {
        kind: "invalid",
        code: "legacy-zero",
        reason: "old number 000 does not exist (series starts at 001)",
      };
    }
    if (value > legacyMax) {
      return {
        kind: "invalid",
        code: "legacy-after-cut",
        reason:
          `old number ${legacy[1]} after trimming (LEGACY_MIGRATION_MAX=${legacyMax}): ` +
          `new migrations use YYYYMMDDHHMMSS_descricao.sql`,
      };
    }
    return { kind: "legacy", version: legacy[1], value, description: legacy[2] };
  }

  const prefix = filename.match(/^(\d+)(.*)$/);
  if (!prefix) {
    return {
      kind: "invalid",
      code: "no-prefix",
      reason: "no numeric prefix (expected YYYYMMDDHHMMSS_descricao.sql)",
    };
  }
  const digits = prefix[1];
  const rest = prefix[2];
  if (digits.length !== 14) {
    return {
      kind: "invalid",
      code: "prefix-length",
      reason:
        `prefix with ${digits.length} digit(s): use 14 (YYYYMMDDHHMMSS, UTC) for ` +
        `new migrations — the 3-digit format is only the old ones 001–${pad(legacyMax, 3)}`,
    };
  }
  if (!rest.startsWith("_")) {
    return {
      kind: "invalid",
      code: "separator",
      reason: "invalid separator after stamp (expected `_`, e.g.: 20261113120000_add_x.sql)",
    };
  }
  const description = rest.slice(1, -".sql".length);
  if (!MIGRATION_DESCRIPTION_RE.test(description)) {
    return {
      kind: "invalid",
      code: "description",
      reason:
        `description "${description}" non-standard: lowercase snake_case starting ` +
        `com letra (a-z, 0-9 e _ entre palavras)`,
    };
  }
  if (description.length > MIGRATION_DESCRIPTION_MAX_LENGTH) {
    return {
      kind: "invalid",
      code: "description-length",
      reason: `description with ${description.length} characters (maximum ${MIGRATION_DESCRIPTION_MAX_LENGTH})`,
    };
  }
  const date = parseMigrationTimestamp(digits);
  if (!date) {
    return {
      kind: "invalid",
      code: "bad-date",
      reason: `stamp ${digits} is not a valid UTC timestamp (YYYYMMDDHHMMSS)`,
    };
  }
  if (digits < MIGRATION_TIMESTAMP_MIN) {
    return {
      kind: "invalid",
      code: "before-cut",
      reason: `stamp ${digits} before format cutoff (${MIGRATION_TIMESTAMP_MIN})`,
    };
  }
  if (date.getTime() > nowMs + MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS) {
    return {
      kind: "invalid",
      code: "future",
      reason:
        `stamp ${digits} in the future (now ${formatMigrationTimestamp(new Date(nowMs))} UTC, ` +
        `tolerance ${MIGRATION_TIMESTAMP_FUTURE_TOLERANCE_MS / 60000} min)`,
    };
  }
  if (!TIMESTAMP_MIGRATION_RE.test(filename)) {
    // Defesa em profundidade: as checagens acima devem ser equivalentes ao regex.
    return {
      kind: "invalid",
      code: "format",
      reason: "name not in the format YYYYMMDDHHMMSS_descricao.sql",
    };
  }
  return { kind: "timestamp", version: digits, value: Number(digits), description, date };
}

/**
 * Boolean shortcut + reason for those who just need to know if the name passes.
 *
 * @param {string} filename
 * @param {{ now?: Date | number, legacyMax?: number }} [options]
 * @returns {{ ok: true } | { ok: false, reason: string }}
 */
export function validateMigrationFilename(filename, options = {}) {
  const result = classifyMigrationFilename(filename, options);
  return result.kind === "invalid" ? { ok: false, reason: result.reason } : { ok: true };
}
