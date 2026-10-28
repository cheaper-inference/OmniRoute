/**
 * RULE — provider removal migrations must purge the key/value store.
 *
 * A migration that removes provider connections must delete the removed connections'
 * entries from the provider-indexed key/value store, in that migration or in a later one.
 *
 * The store namespaces a provider removal must purge are `syncedAvailableModels` (the
 * synced catalog, keys `<providerId>:<connectionId>`) and `discoveryState` (the same key
 * shape; the namespace only exists from the sibling change onwards, so removals recorded
 * before version 217 are exempt from the `discoveryState` namespace only).
 *
 * A purge must keep every store row whose connection still exists. It decides liveness
 * from the connection id — the part of the key after the colon — and never from the
 * provider id. The canonical purge is:
 *
 *   DELETE FROM key_value
 *   WHERE namespace = '<namespace>'
 *     AND instr(key_value.key, ':') > 0
 *     AND NOT EXISTS (
 *       SELECT 1
 *       FROM provider_connections c
 *       WHERE c.id = substr(key_value.key, instr(key_value.key, ':') + 1)
 *     );
 *
 * A purge anchored on a provider id is not a valid purge for a removal recorded from
 * version 217 onwards: it drops the catalog of a connection that was moved to another
 * provider and is still alive.
 *
 * A purge that narrows the rows it deletes is never a valid purge: a sweep narrowed to
 * one connection (`AND substr(key, instr(key, ':') + 1) = '<connection>'`) purges the
 * catalog of that connection only and leaves the catalog of every other removed
 * connection behind. The narrowing is read on the rows the purge selects, not on the
 * spelling of the condition: a pattern on the key (`AND key LIKE '%:only-connection'`),
 * an exclusion of a key (`AND key <> '<connection>'` or `AND key != '<connection>'`),
 * a comparison on the connection part of the key that is not the canonical one, and any
 * other condition that binds a row to a value narrow the sweep the same way.
 *
 * A purge that keeps its liveness condition as one alternative of a disjunction
 * (`... AND NOT EXISTS (...) OR 1=1`) is not a sweep either: it also deletes the catalogs
 * of the live connections. The liveness condition must be required by the statement.
 *
 * The liveness condition is a negative test: it requires that the connection does not
 * exist any more. A purge that requires that the connection exists (`... AND EXISTS
 * (...)`) is the inverse of a sweep: it deletes the catalogs of the live connections.
 * The liveness condition must be the plain connection-keyed test. A condition added
 * inside it — a conjunct in the subquery, or a filtered list in the membership form —
 * that excludes a connection widens the sweep: it deletes at least as many rows as the
 * canonical sweep, and the catalogs of the live connections when it excludes one of
 * them. An alternative inside it that accepts a connection narrows the sweep: it
 * deletes at most as many rows as the canonical sweep, and it leaves the catalogs of
 * the removed connections behind when it accepts one of them. A condition that excludes
 * no connection and accepts none leaves the canonical sweep, row for row: a tautology
 * or the null guard the comparison already implies, added as a conjunct; a
 * contradiction or a condition that requires the comparison itself, added as an
 * alternative.
 *
 * The liveness condition may also be written as a membership test (`... AND
 * substr(key, instr(key, ':') + 1) NOT IN (SELECT id FROM provider_connections)`). It
 * asks the same question only while the list of the connection ids holds no null id: a
 * null id in the list makes the membership test match no row at all, and the sweep
 * then deletes nothing. The membership form is refused unless its list cannot hold a
 * null id (`... WHERE id IS NOT NULL`).
 *
 * A condition that only excludes a value (`AND value != ''`) leaves the liveness test
 * untouched: the purge stays a sweep of the rows it selects, and it deletes fewer rows
 * than the canonical sweep — the rows whose value it excludes are kept.
 *
 * A purge anchored on a bare prefix wildcard is never a valid purge: it would also drop
 * the catalog of a sibling provider that still has connections.
 *
 * Removals recorded before this rule applies (versions below 217) are exempt from the
 * connection-keyed shape requirement only: a purge anchored on the provider id is accepted
 * for them. Every other requirement still applies to them — the purge must exist, it must
 * be about that provider, a purge anchored on a bare prefix wildcard is still refused, and
 * so is a sweep narrowed to a subset of the store rows.
 * The cleanup migration (version 217) purges the store for them.
 *
 * The rule covers every migration that deletes rows from `provider_connections` — one
 * provider, several providers, or every connection. A migration that deletes connections
 * by their id removes no provider and is out of the rule's scope.
 *
 * This file is the single place where the rule is written down; the test below checks the
 * migrations folder against it, and the cleanup migration it names applies it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  BETTER_SQLITE3_SKIP_REASON,
  loadBetterSqlite3,
} from "../_helpers/betterSqlite3Availability.ts";

const MIGRATIONS_DIR = path.resolve(import.meta.dirname, "../../../src/lib/db/migrations");
const CLEANUP_MIGRATION_FILE = "217_purge_orphaned_provider_catalogs.sql";
const RULE_APPLIES_FROM_VERSION = 217;
const RULE_NAMESPACES = ["syncedAvailableModels", "discoveryState"];

type RemovalKind = "mass" | "provider-ids" | "unreadable" | "by-connection-id";

// The file a statement stands in, and the version it carries.
type Source = {
  file: string;
  version: number;
};

type MigrationFile = Source & { sql: string };

type Removal = Source & { statement: string; kind: RemovalKind; ids: string[] };

type Purge = Source & {
  statement: string;
  namespaces: string[];
  connectionKeyed: boolean;
  restricted: boolean;
  overBroad: boolean;
  // Why the purge is not a sweep, when it is not one.
  reason: string | null;
  providerAnchored: boolean;
};

type Finding = Source & {
  id: string | null;
  namespace: string | null;
  kind: string;
  detail: string;
};

const REMOVAL_RE = /\bdelete\s+from\s+provider_connections\b/i;
const STORE_PURGE_RE = /\bdelete\s+from\s+key_value\b/i;
const PROVIDER_COLUMN_RE = /\bprovider\b/i;
const CONNECTION_ID_COLUMN_RE = /\bid\b/i;

// The canonical form: the connection id is the part of the store key after the
// first colon, and it is compared with the id of a live connection.
const KEY_SUFFIX_SOURCE =
  "substr\\s*\\(\\s*(?:key_value\\.)?key\\s*,\\s*instr\\s*\\(\\s*(?:key_value\\.)?key\\s*,\\s*':'\\s*\\)\\s*\\+\\s*1\\s*\\)";
const ID_COLUMN_SOURCE = "(?:[A-Za-z_]\\w*\\.)?id\\b";
const CONNECTION_KEYED_RE = new RegExp(
  `(?:${ID_COLUMN_SOURCE}\\s*=\\s*${KEY_SUFFIX_SOURCE})|(?:${KEY_SUFFIX_SOURCE}\\s*=\\s*${ID_COLUMN_SOURCE})`,
  "i"
);

// The same comparison, and nothing else: the liveness condition of a sweep.
// The groups read the pair it binds: the connection id and the key suffix.
const CONNECTION_COMPARISON_RE = new RegExp(
  `^\\s*(${ID_COLUMN_SOURCE})\\s*=\\s*(${KEY_SUFFIX_SOURCE})\\s*$` +
    `|^\\s*(${KEY_SUFFIX_SOURCE})\\s*=\\s*(${ID_COLUMN_SOURCE})\\s*$`,
  "i"
);

// The same comparison, with a collation: the match is then case-insensitive,
// so the test recognizes a connection whose id differs in case.
const COLLATED_COMPARISON_RE = new RegExp(
  `^\\s*(?:${ID_COLUMN_SOURCE}\\s*=\\s*${KEY_SUFFIX_SOURCE}|${KEY_SUFFIX_SOURCE}\\s*=\\s*${ID_COLUMN_SOURCE})\\s+COLLATE\\s+[A-Za-z_]\\w*\\s*$`,
  "i"
);

// The liveness condition written as a membership test: the connection id is not
// in the list of the live connection ids.
const CONNECTION_MEMBERSHIP_SOURCE = `${KEY_SUFFIX_SOURCE}\\s+(?:NOT\\s+)?IN\\s*\\(\\s*SELECT\\s+(?:[A-Za-z_]\\w*\\.)?id\\s+FROM\\s+provider_connections\\b`;
const CONNECTION_MEMBERSHIP_RE = new RegExp(CONNECTION_MEMBERSHIP_SOURCE, "i");
const MEMBERSHIP_TERM_RE = new RegExp(`^\\s*${KEY_SUFFIX_SOURCE}\\s+(NOT\\s+)?IN\\b`, "i");

// The filter that makes a membership list safe: it cannot hold a null id.
const NULL_GUARD_SOURCE = "(?:[A-Za-z_]\\w*\\.)?id\\s+IS\\s+NOT\\s+NULL";
const NULL_GUARD_RE = new RegExp(`^${NULL_GUARD_SOURCE}$`, "i");

// The conditions that cannot change which connections the test recognizes: a
// tautology, and the null guard the comparison already implies.
const NEUTRAL_CONDITION_RE = new RegExp(`^(?:1\\s*=\\s*1|${NULL_GUARD_SOURCE})$`, "i");

// The conditions that are never true: a comparison of two numbers that differ.
const CONTRADICTION_RE = /^\s*(\d+)\s*=\s*(\d+)\s*$/i;

// A comparison that binds a row to a literal value: the sweep then deletes
// only the rows that value selects, whichever way the value is written
// (between quotes, between double quotes, or a number). `!=` and `<>` are not
// bindings: they exclude a value, they do not name the rows to delete.
const LITERAL_SOURCE = `'(?:[^']|'')*'|"(?:[^"]|"")*"|\\d+(?:\\.\\d+)?`;
const VALUE_BINDING_RE = new RegExp(
  [
    `(?<![!<>=])(?:=|<|>)\\s*(?:${LITERAL_SOURCE})`,
    `(?:<=|>=)\\s*(?:${LITERAL_SOURCE})`,
    `\\b(?:NOT\\s+)?(?:LIKE|GLOB)\\s+(?:${LITERAL_SOURCE})`,
    `\\bIN\\s*\\(\\s*(?:${LITERAL_SOURCE})`,
  ].join("|"),
  "i"
);
// An exclusion on the store key: it keeps one connection's catalog out of the sweep.
const KEY_EXCLUSION_RE = new RegExp(`\\bkey\\b\\s*(?:<>|!=)\\s*(?:${LITERAL_SOURCE})`, "i");

// The key shape: the store key carries a connection id after its colon. It is
// written as a position test, or as a pattern that keeps the same rows.
const KEY_SHAPE_RE = new RegExp(
  `instr\\s*\\(\\s*(?:key_value\\.)?key\\s*,\\s*':'\\s*\\)\\s*(?:>\\s*0|>=\\s*1)` +
    `|\\bkey\\b\\s+(?:LIKE|GLOB)\\s*'(?:%|\\*):(?:%|\\*)'`,
  "i"
);

// The namespace filter of a sweep, whichever way it is written.
const NAMESPACE_FILTER_RE = /\bnamespace\s*=\s*(?:'[^']*'|"[^"]*")|\bnamespace\s+IN\s*\(/i;

// Split a SQL text on a top-level keyword: the keywords inside parentheses or
// inside a string literal do not split it. The scanner walks the text once and
// drops the comments it meets, so the text it returns carries none.
function splitTopLevel(sql: string, keyword: string): string[] {
  const parts: string[] = [];
  let current = "";
  let depth = 0;
  let inString = false;
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i];
    if (inString) {
      current += ch;
      if (ch !== "'") {
        i++;
        continue;
      }
      if (sql[i + 1] === "'") {
        current += sql[i + 1];
        i += 2;
        continue;
      }
      inString = false;
      i++;
      continue;
    }
    if (ch === "'") {
      inString = true;
      current += ch;
      i++;
      continue;
    }
    if (ch === "-" && sql[i + 1] === "-") {
      while (i < sql.length && sql[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && sql[i + 1] === "*") {
      i += 2;
      while (i < sql.length && !(sql[i] === "*" && sql[i + 1] === "/")) i++;
      i += 2;
      continue;
    }
    if (ch === "(" || ch === ")") {
      depth += ch === "(" ? 1 : -1;
      current += ch;
      i++;
      continue;
    }
    const before = i > 0 ? sql[i - 1] : " ";
    const after = i + keyword.length < sql.length ? sql[i + keyword.length] : " ";
    if (
      depth === 0 &&
      sql.slice(i, i + keyword.length).toUpperCase() === keyword &&
      // A one-character keyword is a punctuation: it needs no word boundary.
      (keyword.length === 1 || (!/[\w$]/.test(before) && !/[\w$]/.test(after)))
    ) {
      parts.push(current);
      current = "";
      i += keyword.length;
      continue;
    }
    current += ch;
    i++;
  }
  parts.push(current);
  return parts;
}

// The statements of a migration file, without the comments they carry: the
// scanner cuts on the semicolons that stand outside a string literal.
function splitStatements(sql: string): string[] {
  return splitTopLevel(sql, ";")
    .map((statement) => statement.trim())
    .filter(Boolean);
}

function whereClause(statement: string): string {
  const idx = statement.search(/\bwhere\b/i);
  return idx >= 0 ? statement.slice(idx) : "";
}

// The values a column filter names: the one it equals, and the ones it lists.
function valuesOf(text: string, column: string): string[] {
  const values = new Set<string>();
  const equals = new RegExp(`\\b${column}\\s*=\\s*'([^']+)'`, "gi");
  const list = new RegExp(`\\b${column}\\s+IN\\s*\\(([^)]*)\\)`, "gi");
  for (const match of text.matchAll(equals)) {
    if (match[1]) values.add(match[1]);
  }
  for (const match of text.matchAll(list)) {
    for (const value of match[1].matchAll(/'([^']+)'/g)) {
      if (value[1]) values.add(value[1]);
    }
  }
  return [...values];
}

function isConnectionKeyed(statement: string): boolean {
  return (
    /provider_connections/i.test(statement) &&
    (CONNECTION_KEYED_RE.test(statement) || CONNECTION_MEMBERSHIP_RE.test(statement))
  );
}

// The boolean shape of the WHERE clause of a purge: the conditions it
// requires (`all`) and the alternatives it offers (`any`).
type Condition =
  | { kind: "all"; parts: Condition[] }
  | { kind: "any"; parts: Condition[] }
  | { kind: "term"; text: string };

// The text a parenthesised group holds, or null when the text is not a group.
function unwrapGroup(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed.startsWith("(") || !trimmed.endsWith(")")) return null;
  let depth = 0;
  let inString = false;
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (inString) {
      if (ch === "'") {
        if (trimmed[i + 1] === "'") {
          i++;
          continue;
        }
        inString = false;
      }
      continue;
    }
    if (ch === "'") {
      inString = true;
      continue;
    }
    if (ch === "(") {
      depth++;
    } else if (ch === ")") {
      depth--;
      if (depth === 0) return i === trimmed.length - 1 ? trimmed.slice(1, -1) : null;
    }
  }
  return null;
}

// Read the WHERE clause of a statement as a boolean expression. `AND` binds
// tighter than `OR`, as in SQL.
function parseCondition(sql: string): Condition {
  const alternatives = splitTopLevel(sql, "OR");
  if (alternatives.length > 1) return { kind: "any", parts: alternatives.map(parseCondition) };
  const requirements = splitTopLevel(sql, "AND");
  if (requirements.length > 1) return { kind: "all", parts: requirements.map(parseCondition) };
  const text = sql.trim();
  const group = unwrapGroup(text);
  if (group !== null) return parseCondition(group);
  return { kind: "term", text };
}

// Every condition of the expression, wherever it sits.
function conditionsOf(condition: Condition): string[] {
  if (condition.kind === "term") return [condition.text];
  return condition.parts.flatMap(conditionsOf);
}

// The defect of a purge that is not a sweep: the liveness condition it carries
// — `none` (no liveness condition), `plain` (the plain connection-keyed test),
// `extra-condition` (the test carries a condition of more), `alternative` (the
// test carries an alternative), `membership` (the test is a membership test
// whose list can hold a null id) or `inverted` (the test requires that the
// connection exists) — the reason the statement does not require it, or the
// narrowing of the rows it deletes. The direction of the two is read on the rows
// the sweep deletes, never on the connections the subquery recognizes:
// `extra-condition` deletes at least as many rows as the canonical sweep,
// `alternative` and `membership` delete at most as many.
type Defect =
  | "none"
  | "plain"
  | "extra-condition"
  | "alternative"
  | "membership"
  | "inverted"
  | "not-required"
  | "restricted";

// Why a purge is not a sweep, per defect. Each reason says what the control
// measured, and a purge is refused for one reason at a time.
const DEFECT_REASONS: Record<Exclude<Defect, "none">, string> = {
  inverted:
    "its liveness condition requires that the connection exists: the sweep deletes the catalogs of the live connections",
  "not-required":
    "its liveness condition is one alternative of the statement: the sweep also deletes the catalogs of the live connections",
  alternative:
    "its liveness condition is not the plain connection-keyed test: it carries an alternative",
  "extra-condition":
    "its liveness condition is not the plain connection-keyed test: it carries an extra condition",
  membership:
    "its liveness condition is a membership test whose list can hold a null id: the test is then null, and the sweep deletes no row",
  restricted: "its sweep is narrowed to a subset of the store rows",
};

// Whether the condition binds the connection id of the store key to the id of a
// live connection.
function bindsConnectionId(condition: Condition): boolean {
  if (condition.kind === "term") return CONNECTION_COMPARISON_RE.test(condition.text);
  return condition.parts.some(bindsConnectionId);
}

// Whether the condition cannot change which connections the liveness test
// recognizes: a tautology, or the null guard the comparison already implies.
function isNeutralCondition(condition: Condition): boolean {
  if (condition.kind === "term") return NEUTRAL_CONDITION_RE.test(condition.text.trim());
  return condition.parts.every(isNeutralCondition);
}

// Whether the condition is never true: a comparison of two numbers that differ.
function isNeverTrue(text: string): boolean {
  const match = CONTRADICTION_RE.exec(text);
  return match !== null && Number(match[1]) !== Number(match[2]);
}

// The comparison a term carries, read as the pair it binds: the connection id
// and the key suffix, so that two spellings of the same comparison read as one.
function comparisonOf(text: string): string | null {
  const match = CONNECTION_COMPARISON_RE.exec(text);
  if (!match) return null;
  const read = (part: string) => part.toLowerCase().replace(/[\s]|key_value\./g, "");
  const [id, suffix] = match[1] ? [match[1], match[2]] : [match[4], match[3]];
  return `${read(id)}|${read(suffix)}`;
}

// Whether the condition can be true only for the connections the comparison
// recognizes: it is never true, or it requires the comparison. Such an
// alternative accepts no connection the comparison rejects.
function impliesComparison(condition: Condition, comparison: string): boolean {
  if (condition.kind === "term") {
    return isNeverTrue(condition.text) || comparisonOf(condition.text) === comparison;
  }
  if (condition.kind === "all") {
    return condition.parts.some((part) => impliesComparison(part, comparison));
  }
  return condition.parts.every((part) => impliesComparison(part, comparison));
}

// The text a group holds, when the group is the rest of the text.
function groupAfter(text: string, from: number): string | null {
  const open = text.indexOf("(", from);
  if (open < 0) return null;
  return unwrapGroup(text.slice(open));
}

// The liveness condition written as an existence test on the live connections:
// `NOT EXISTS (SELECT 1 FROM provider_connections c WHERE c.id = <key suffix>)`.
// A test that requires the connection to exist is the inverse of the liveness
// condition: it keeps the removed catalogs and deletes the live ones.
function livenessOfSubquery(subquery: string, polarity: "negative" | "positive"): Defect {
  if (!/\bfrom\s+provider_connections\b/i.test(subquery)) return "none";
  const parts = splitTopLevel(subquery, "WHERE");
  if (parts.length < 2) return "none";
  const condition = parseCondition(parts.slice(1).join(" WHERE "));
  if (condition.kind === "term") {
    const collated = COLLATED_COMPARISON_RE.test(condition.text);
    if (!collated && !CONNECTION_COMPARISON_RE.test(condition.text)) return "none";
    if (polarity === "positive") return "inverted";
    // A comparison with a collation recognizes more connections: the sweep is
    // then narrower, and it can leave the catalog of a removed connection behind.
    return collated ? "restricted" : "plain";
  }
  if (!condition.parts.some(bindsConnectionId)) return "none";
  if (polarity === "positive") return "inverted";
  if (condition.kind === "any") {
    // A disjunction that recognizes the connections of the comparison alone
    // leaves the canonical sweep unchanged: an alternative that is never true, or
    // one that requires the comparison itself, accepts no connection it rejects.
    const comparison = condition.parts
      .map((part) => (part.kind === "term" ? comparisonOf(part.text) : null))
      .find((pair) => pair !== null);
    if (comparison && condition.parts.every((part) => impliesComparison(part, comparison))) {
      return "plain";
    }
    return "alternative";
  }
  // A conjunct that cannot change which connections the test recognizes leaves
  // the canonical sweep unchanged.
  const extra = condition.parts.filter((part) => !bindsConnectionId(part));
  return condition.parts.length === extra.length + 1 && extra.every(isNeutralCondition)
    ? "plain"
    : "extra-condition";
}

// The liveness condition a term carries, read on what it requires.
function livenessOfTerm(term: string): Defect {
  const text = term.trim();
  const membership = MEMBERSHIP_TERM_RE.exec(text);
  if (membership) {
    const list = groupAfter(text, membership.index + membership[0].length);
    if (list === null || !/\bfrom\s+provider_connections\b/i.test(list)) return "none";
    if (!/^\s*select\s+(?:[A-Za-z_]\w*\.)?id\b/i.test(list)) return "none";
    if (!membership[1]) return "inverted";
    // The membership form asks the same question as the existence test only
    // while its list cannot hold a null id: a null id in the list makes the
    // whole test null, and the sweep then deletes no row.
    const filters = splitTopLevel(list, "WHERE");
    if (filters.length < 2) return "membership";
    return NULL_GUARD_RE.test(filters.slice(1).join(" WHERE ").trim())
      ? "plain"
      : "extra-condition";
  }
  // `NOT (EXISTS (...))` is the negative test: the negation is written around
  // the test, not in front of it.
  const negated = /^\s*NOT\s*\(/i.test(text);
  const inner = (negated ? unwrapGroup(text.slice(text.indexOf("("))) : null) ?? text;
  const existence = /\b(NOT\s+)?EXISTS\b/i.exec(inner);
  if (existence) {
    const subquery = groupAfter(inner, existence.index + existence[0].length);
    return subquery === null
      ? "none"
      : livenessOfSubquery(subquery, negated || existence[1] ? "negative" : "positive");
  }
  return "none";
}

// The liveness conditions a statement can require: the plain test, the tests
// that carry a condition of more, an alternative, the membership form, and the
// comparison with a collation.
const LIVENESS_DEFECTS: Defect[] = [
  "plain",
  "extra-condition",
  "alternative",
  "membership",
  "restricted",
];

// Whether the liveness condition is required by the expression: every way of
// satisfying the expression must require the liveness condition too. An
// expression that offers an alternative to the liveness condition also
// accepts the rows of the live connections.
function requiresLiveness(condition: Condition): boolean {
  if (condition.kind === "term") return LIVENESS_DEFECTS.includes(livenessOfTerm(condition.text));
  if (condition.kind === "all") return condition.parts.some(requiresLiveness);
  return condition.parts.every(requiresLiveness);
}

// Whether a condition narrows the rows the sweep deletes to a subset of them.
// The namespace filter, the key shape and the liveness condition keep the rows
// a sweep must delete; any other condition that binds a row to a value keeps
// fewer of them, and the catalogs of the other removed connections stay
// behind.
function narrowsTheSweep(term: string): boolean {
  if (livenessOfTerm(term) !== "none") return false;
  if (NAMESPACE_FILTER_RE.test(term)) return false;
  if (KEY_SHAPE_RE.test(term)) return false;
  if (NEUTRAL_CONDITION_RE.test(term.trim())) return false;
  return VALUE_BINDING_RE.test(term) || KEY_EXCLUSION_RE.test(term);
}

// The verdict of the sweep analysis: whether the purge is a sweep, and why it
// is not one.
type SweepVerdict = { restricted: boolean; overBroad: boolean; reason: string | null };

// What the purge deletes decides whether it is a sweep: the liveness condition
// must be required by the statement, it must be the plain connection-keyed test,
// and the statement must not narrow the rows it deletes. The narrowing is read
// on a purge that claims to be a sweep only — a purge that does not relate the
// key to the connection at all is refused for a stronger reason. A purge is
// refused for one reason at a time, and the reason says what it measured.
function analyzeSweep(statement: string): SweepVerdict {
  if (!isConnectionKeyed(statement)) return { restricted: false, overBroad: false, reason: null };
  const condition = parseCondition(whereClause(statement));
  const terms = conditionsOf(condition);
  const liveness = terms.map(livenessOfTerm);
  const defect: Defect = liveness.includes("inverted")
    ? "inverted"
    : !requiresLiveness(condition)
      ? "not-required"
      : ((["alternative", "extra-condition", "membership", "restricted"] as Defect[]).find(
          (defect) => liveness.includes(defect)
        ) ?? (terms.some(narrowsTheSweep) ? "restricted" : "none"));
  if (defect === "none") return { restricted: false, overBroad: false, reason: null };
  const restricted = defect === "alternative" || defect === "restricted" || defect === "membership";
  return { restricted, overBroad: !restricted, reason: DEFECT_REASONS[defect] };
}

// Why a purge is not a sweep, in the words of the rule.
function sweepReason(purge: Purge): string {
  return purge.reason ?? "it is not a sweep of the store rows";
}

function isProviderAnchored(statement: string): boolean {
  return (
    /length\s*\(\s*'[^']+'\s*\)/i.test(statement) ||
    /'[^']*:'/.test(statement) ||
    /\blike\s+'[^']*%'/i.test(statement)
  );
}

// Removal classification:
//   mass             -> no WHERE clause: every connection goes, the store needs
//                       a connection-keyed sweep
//   provider-ids     -> the WHERE clause names the provider column, ids read
//   unreadable       -> the removal cannot be attributed (provider named but
//                       ids unreadable, or neither provider nor connection id)
//   by-connection-id  -> the WHERE clause names a connection id: it removes no
//                       provider, it is out of the rule
function classifyRemoval(statement: string): { kind: RemovalKind; ids: string[] } {
  const where = whereClause(statement);
  if (!where) return { kind: "mass", ids: [] };
  const ids = valuesOf(where, "provider");
  if (PROVIDER_COLUMN_RE.test(where)) {
    return ids.length > 0 ? { kind: "provider-ids", ids } : { kind: "unreadable", ids: [] };
  }
  if (CONNECTION_ID_COLUMN_RE.test(where)) return { kind: "by-connection-id", ids: [] };
  return { kind: "unreadable", ids: [] };
}

function analyzeFiles(files: MigrationFile[]): {
  files: MigrationFile[];
  removals: Removal[];
  purges: Purge[];
} {
  const removals: Removal[] = [];
  const purges: Purge[] = [];
  for (const { file, version, sql } of files) {
    for (const statement of splitStatements(sql)) {
      if (REMOVAL_RE.test(statement)) {
        removals.push({ file, version, statement, ...classifyRemoval(statement) });
      } else if (STORE_PURGE_RE.test(statement)) {
        purges.push({
          file,
          version,
          statement,
          namespaces: valuesOf(statement, "namespace"),
          connectionKeyed: isConnectionKeyed(statement),
          ...analyzeSweep(statement),
          providerAnchored: isProviderAnchored(statement),
        });
      }
    }
  }
  return { files, removals, purges };
}

function readCorpus(dir: string): MigrationFile[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".sql"))
    .map((file) => ({
      file,
      version: Number.parseInt(file.slice(0, 3), 10),
      sql: fs.readFileSync(path.join(dir, file), "utf8"),
    }))
    .sort((a, b) => a.version - b.version);
}

function requiredNamespaces(removal: Removal): string[] {
  return removal.version >= RULE_APPLIES_FROM_VERSION ? RULE_NAMESPACES : [RULE_NAMESPACES[0]];
}

// A purge covers a removed provider id when it targets the namespace and is
// about that provider: it names the provider id (the historical shape) or it
// is keyed on the connection id (the canonical shape). From the rule version
// on, only the canonical shape is valid. A sweep narrowed to a subset of the
// store rows covers nothing: it leaves the other removed connections behind.
function isAboutProvider(purge: Purge, id: string): boolean {
  if (purge.restricted || purge.overBroad) return false;
  return purge.connectionKeyed || purge.statement.includes(`'${id}:`);
}

function findCovering(
  removal: Removal,
  id: string,
  namespace: string,
  purges: Purge[]
): { candidates: Purge[]; covering: Purge | undefined } {
  const candidates = purges.filter(
    (purge) => purge.version >= removal.version && purge.namespaces.includes(namespace)
  );
  const future = removal.version >= RULE_APPLIES_FROM_VERSION;
  if (future) {
    // From the rule version on, the only valid shape is the connection-keyed
    // sweep: a purge anchored on a provider id is not a valid purge, a sweep
    // narrowed to a subset of the store rows is not a sweep, and a sweep that
    // does not require its liveness condition deletes the live connections.
    const covering = candidates.find(
      (purge) => purge.connectionKeyed && !purge.restricted && !purge.overBroad
    );
    return { candidates, covering };
  }
  // The historical corpus is exempt from the shape requirement, not from the
  // existence requirement: the purge must exist and be about that provider.
  return { candidates, covering: candidates.find((purge) => isAboutProvider(purge, id)) };
}

function coverageReport(analysis: { removals: Removal[]; purges: Purge[] }): Finding[] {
  const findings: Finding[] = [];
  for (const removal of analysis.removals) {
    if (removal.kind === "by-connection-id") continue; // out of the rule
    if (removal.kind === "unreadable") {
      findings.push({
        file: removal.file,
        version: removal.version,
        id: null,
        namespace: null,
        kind: "unreadable-removal",
        detail:
          "the removal cannot be attributed: its WHERE clause names neither the provider column nor a connection id",
      });
      continue;
    }
    const future = removal.version >= RULE_APPLIES_FROM_VERSION;
    const ids = removal.kind === "mass" ? ["*"] : removal.ids;
    for (const id of ids) {
      for (const namespace of requiredNamespaces(removal)) {
        const { candidates, covering } = findCovering(removal, id, namespace, analysis.purges);
        if (!covering) {
          const overBroad = future ? candidates.find((purge) => purge.overBroad) : undefined;
          const restricted = future ? candidates.find((purge) => purge.restricted) : undefined;
          const other = future ? candidates[0] : undefined;
          const kind = overBroad
            ? "over-broad-purge"
            : restricted
              ? "restricted-purge"
              : other
                ? "non-conforming-purge"
                : "uncovered";
          const detail = overBroad
            ? `purge ${overBroad.file} targets namespace '${namespace}' but ${sweepReason(overBroad)}`
            : restricted
              ? `purge ${restricted.file} targets namespace '${namespace}' but ${sweepReason(restricted)}`
              : other
                ? `purge ${other.file} targets namespace '${namespace}' but is ${
                    other.providerAnchored
                      ? "anchored on a provider id"
                      : "not keyed on the connection id"
                  }`
                : `no store purge for '${id}' in namespace '${namespace}'`;
          findings.push({
            file: removal.file,
            version: removal.version,
            id,
            namespace,
            kind,
            detail,
          });
        } else if (future) {
          // A conforming sweep does not excuse a second purge in the same
          // window: a provider-anchored purge still drops the catalog of a
          // moved connection, a sweep narrowed to a subset of the store rows
          // is not a sweep, and a sweep that does not require its liveness
          // condition deletes the live connections.
          for (const purge of candidates) {
            if (purge === covering) continue;
            const kind = purge.overBroad
              ? "over-broad-purge"
              : purge.restricted
                ? "restricted-purge"
                : !purge.connectionKeyed
                  ? "provider-anchored-purge"
                  : null;
            if (kind === null) continue;
            findings.push({
              file: purge.file,
              version: purge.version,
              id,
              namespace,
              kind,
              detail:
                kind === "provider-anchored-purge"
                  ? "purge is anchored on a provider id, not on the connection id"
                  : `the purge is not a sweep: ${sweepReason(purge)}`,
            });
          }
        }
        for (const purge of analysis.purges) {
          if (
            purge.version >= removal.version &&
            purge.namespaces.includes(namespace) &&
            purge.statement.includes(`'${id}%`)
          ) {
            findings.push({
              file: purge.file,
              version: purge.version,
              id,
              namespace,
              kind: "over-broad-wildcard",
              detail: "purge anchored on a bare prefix wildcard",
            });
          }
        }
      }
    }
  }
  return findings;
}

function verdict(findings: Finding[]): string {
  if (findings.length === 0) return "accepted";
  return findings
    .map((finding) => `${finding.kind}(${finding.id ?? "-"},${finding.namespace ?? "-"})`)
    .join(" ");
}

// The verdict of a removal written in the file given, with the SQL given.
function verdictOf(file: string, sql: string): string {
  return verdict(
    coverageReport(analyzeFiles([{ file, version: Number.parseInt(file.slice(0, 3), 10), sql }]))
  );
}

function describe(findings: Finding[]): string {
  if (findings.length === 0) return "accepted";
  const context = (finding: Finding) =>
    `in ${finding.file} (version ${finding.version}, provider ${finding.id ?? "-"}, namespace ${finding.namespace ?? "-"})`;
  return findings
    .map((finding) => `${finding.kind} ${context(finding)}: ${finding.detail}`)
    .join("\n");
}

// The canonical sweep, with the liveness condition the caller writes: the
// plain connection-keyed test, the same test with a condition added inside it,
// the same test with an alternative added inside it, or the test that requires
// that the connection exists. A condition added after the liveness condition
// decides the rows the sweep deletes: a condition that narrows them leaves the
// catalog of every other removed connection behind.
function sweep(namespace: string, liveness: string, extra = ""): string {
  return `DELETE FROM key_value
WHERE namespace = '${namespace}'
  AND instr(key, ':') > 0
  AND ${liveness}${extra ? `\n  ${extra}` : ""};`;
}

// The same sweep, once per namespace the rule covers.
function sweeps(liveness: string, extra = ""): string {
  return RULE_NAMESPACES.map((namespace) => sweep(namespace, liveness, extra)).join("\n") + "\n";
}

// The liveness condition of a sweep: the plain connection-keyed test, the same
// test with a condition or an alternative added inside it, or the test that
// requires that the connection exists.
function livenessCondition(polarity: string, extra = ""): string {
  return `${polarity} (
    SELECT 1
    FROM provider_connections c
    WHERE c.id = substr(key, instr(key, ':') + 1)${extra}
  )`;
}

// The liveness condition of a sweep: the plain connection-keyed test.
const PLAIN_LIVENESS = livenessCondition("NOT EXISTS");

// The liveness condition that requires that the connection exists.
const INVERTED_LIVENESS = livenessCondition("EXISTS");

// The liveness condition that only considers the connections of one provider: the
// sweep then deletes at least as many rows as the canonical sweep.
const NARROWED_LIVENESS = livenessCondition("NOT EXISTS", "\n      AND c.provider = 'otherprov'");

// The liveness condition that also accepts the connections of one provider: the
// sweep then deletes at most as many rows as the canonical sweep.
const WIDENED_LIVENESS = livenessCondition("NOT EXISTS", "\n      OR c.provider = 'otherprov'");

// The liveness condition written as a membership test over a filtered list: the
// sweep then deletes at least as many rows as the canonical sweep.
const FILTERED_MEMBERSHIP_LIVENESS =
  "substr(key, instr(key, ':') + 1) NOT IN (SELECT id FROM provider_connections WHERE provider = 'otherprov')";

// The liveness condition written as a membership test over the ids of the live
// connections: it asks the same question only while no connection id is null.
const MEMBERSHIP_LIVENESS =
  "substr(key, instr(key, ':') + 1) NOT IN (SELECT id FROM provider_connections)";

// The same test over a list that cannot hold a null id: the plain test.
const GUARDED_MEMBERSHIP_LIVENESS =
  "substr(key, instr(key, ':') + 1) NOT IN (SELECT id FROM provider_connections WHERE id IS NOT NULL)";

// The plain test with a condition that changes nothing inside it, and with a
// tautology beside it: both leave the canonical sweep unchanged.
const NEUTRAL_SUBQUERY_LIVENESS = livenessCondition("NOT EXISTS", "\n      AND c.id IS NOT NULL");
const TAUTOLOGY_LIVENESS = `${PLAIN_LIVENESS}\n  AND 1=1`;
const TAUTOLOGY_INSIDE_LIVENESS = livenessCondition("NOT EXISTS", "\n      AND 1=1");

// The plain test with an alternative that accepts no connection: a
// contradiction, and a condition that requires the comparison itself. Both
// leave the canonical sweep unchanged.
const CONTRADICTED_LIVENESS = livenessCondition("NOT EXISTS", "\n      OR 1=0");
const IMPLIED_LIVENESS = livenessCondition(
  "NOT EXISTS",
  "\n      OR c.id = substr(key, instr(key, ':') + 1) AND c.provider = 'qoder'"
);

// The plain test with the negation written around it: `NOT (EXISTS (...))`.
const NEGATED_LIVENESS = `NOT (${livenessCondition("EXISTS")})`;

// The plain test with a collation: the match is case-insensitive, so the test
// recognizes more connections and the sweep deletes fewer rows.
const COLLATED_LIVENESS = livenessCondition("NOT EXISTS", "\n      COLLATE NOCASE");

// The liveness condition kept as one alternative of a disjunction: the sweep
// then deletes the catalogs of the live connections too.
function alternativeLiveness(alternative: string): string {
  return `(\n    ${PLAIN_LIVENESS}\n    OR ${alternative}\n  )`;
}

// A provider-anchored purge, the shape the rule refuses: it drops the catalog
// of every connection of that provider prefix, including a connection that was
// moved to another provider and is still alive.
const PROVIDER_ANCHORED_SWEEP =
  "DELETE FROM key_value\n" +
  "WHERE namespace = 'syncedAvailableModels'\n" +
  "  AND (substr(key, 1, length('opencode:')) = 'opencode:'\n" +
  "    OR substr(key, 1, length('oc:')) = 'oc:');";

// The canonical sweep narrowed to one connection, as the rule refuses it.
const RESTRICTED_SWEEP = sweep(
  "syncedAvailableModels",
  PLAIN_LIVENESS,
  "AND substr(key, instr(key, ':') + 1) = 'only-connection'"
);

type Fixture = { label: string; expect: string; files: MigrationFile[] };

// A synthetic removal: the label that names it, the verdict the control must
// return for it, and the migration file it is written in. The version of the
// file is the one its name carries.
function fixture(label: string, expect: string, file: string, sql: string): Fixture {
  return {
    label,
    expect,
    files: [{ file, version: Number.parseInt(file.slice(0, 3), 10), sql }],
  };
}

// The removals whose liveness condition the control must judge: the ones that
// are not the plain connection-keyed test — the sweep that requires that the
// connection exists, the one that carries a condition of more, the one that
// carries an alternative, the one written as a membership test over a filtered
// list, the one written as a membership test over the list of the connection
// ids — and the ones that change nothing. Each row is the migration file, the
// removed provider, the liveness condition and the verdict the control must
// return.
const LIVENESS_FIXTURES: Fixture[] = (
  [
    ["915_remove_fixture_inverted_liveness.sql", "fixturex", INVERTED_LIVENESS, "over-broad-purge"],
    ["916_remove_fixture_narrowed_liveness.sql", "fixturey", NARROWED_LIVENESS, "over-broad-purge"],
    ["917_remove_fixture_widened_liveness.sql", "fixturez", WIDENED_LIVENESS, "restricted-purge"],
    [
      "918_remove_fixture_filtered_membership.sql",
      "fixturei",
      FILTERED_MEMBERSHIP_LIVENESS,
      "over-broad-purge",
    ],
    ["919_remove_fixture_membership.sql", "fixlive", MEMBERSHIP_LIVENESS, "restricted-purge"],
    ["920_remove_fixture_neutral_subquery.sql", "fixlive", NEUTRAL_SUBQUERY_LIVENESS, "accepted"],
    ["921_remove_fixture_neutral_list.sql", "fixlive", GUARDED_MEMBERSHIP_LIVENESS, "accepted"],
    ["922_remove_fixture_neutral_tautology.sql", "fixlive", TAUTOLOGY_LIVENESS, "accepted"],
    ["923_remove_fixture_tautology_inside.sql", "fixlive", TAUTOLOGY_INSIDE_LIVENESS, "accepted"],
    ["924_remove_fixture_negated_liveness.sql", "fixlive", NEGATED_LIVENESS, "accepted"],
    ["925_remove_fixture_collated_liveness.sql", "fixlive", COLLATED_LIVENESS, "restricted-purge"],
    ["926_remove_fixture_false_alternative.sql", "fixlive", CONTRADICTED_LIVENESS, "accepted"],
    ["927_remove_fixture_required_alternative.sql", "fixlive", IMPLIED_LIVENESS, "accepted"],
  ] as const
).map(([file, provider, liveness, kind]) =>
  fixture(
    `removal whose ${file} is ${kind === "accepted" ? "accepted" : "refused"}`,
    kind === "accepted"
      ? "accepted"
      : `${kind}(${provider},syncedAvailableModels) ${kind}(${provider},discoveryState)`,
    file,
    `DELETE FROM provider_connections\nWHERE provider = '${provider}';\n` + sweeps(liveness)
  )
);

const FIXTURES: Fixture[] = [
  fixture(
    "removal written as provider = '<id>', with no store purge",
    "uncovered(fixtureprov,syncedAvailableModels) uncovered(fixtureprov,discoveryState)",
    "900_remove_fixture_single.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixtureprov';\n"
  ),
  fixture(
    "removal written as provider IN ('<id1>', '<id2>'), with no store purge",
    "uncovered(fixturea,syncedAvailableModels) uncovered(fixturea,discoveryState) " +
      "uncovered(fixtureb,syncedAvailableModels) uncovered(fixtureb,discoveryState)",
    "901_remove_fixture_multi.sql",
    "DELETE FROM provider_connections\nWHERE provider IN ('fixturea', 'fixtureb');\n"
  ),
  fixture(
    "removal whose purge is anchored on a bare prefix wildcard",
    "non-conforming-purge(fixturec,syncedAvailableModels) over-broad-wildcard(fixturec,syncedAvailableModels) " +
      "non-conforming-purge(fixturec,discoveryState) over-broad-wildcard(fixturec,discoveryState)",
    "902_remove_fixture_wildcard.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixturec';\n" +
      "DELETE FROM key_value\nWHERE namespace = 'syncedAvailableModels'\n  AND key LIKE 'fixturec%';\n" +
      "DELETE FROM key_value\nWHERE namespace = 'discoveryState'\n  AND key LIKE 'fixturec%';\n"
  ),
  fixture(
    "removal whose sweep covers only one of the two namespaces",
    "uncovered(fixtured,discoveryState)",
    "903_remove_fixture_partial.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixtured';\n" +
      sweep("syncedAvailableModels", PLAIN_LIVENESS) +
      "\n"
  ),
  fixture(
    "removal whose purge is anchored on the provider id — refused",
    "non-conforming-purge(fixturee,syncedAvailableModels) non-conforming-purge(fixturee,discoveryState)",
    "904_remove_fixture_provider_anchored.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixturee';\n" +
      "DELETE FROM key_value\nWHERE namespace = 'syncedAvailableModels'\n" +
      "  AND (substr(key, 1, length('fixturee:')) = 'fixturee:'\n" +
      "    OR substr(key, 1, length('fixturee')) = 'fixturee');\n" +
      "DELETE FROM key_value\nWHERE namespace = 'discoveryState'\n" +
      "  AND (substr(key, 1, length('fixturee:')) = 'fixturee:'\n" +
      "    OR substr(key, 1, length('fixturee')) = 'fixturee');\n"
  ),
  fixture(
    "conforming removal (connection-keyed sweep on both namespaces)",
    "accepted",
    "905_remove_fixture_sweep.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixturef';\n" + sweeps(PLAIN_LIVENESS)
  ),
  fixture(
    "removal whose provider ids cannot be read",
    "unreadable-removal(-,-)",
    "906_remove_fixture_unreadable.sql",
    "DELETE FROM provider_connections\nWHERE provider LIKE 'fixtureg%';\n"
  ),
  fixture(
    "removal by connection id (out of the rule)",
    "accepted",
    "907_remove_fixture_byid.sql",
    "DELETE FROM provider_connections\nWHERE id = 'fixtureh';\n"
  ),
  fixture(
    "mass removal (no WHERE clause) — not accepted, it needs a connection-keyed sweep",
    "uncovered(*,syncedAvailableModels) uncovered(*,discoveryState)",
    "908_remove_fixture_mass.sql",
    "DELETE FROM provider_connections;\n"
  ),
  fixture(
    "removal whose sweep does not relate the key to the connection — refused",
    "non-conforming-purge(fixturej,syncedAvailableModels) non-conforming-purge(fixturej,discoveryState)",
    "909_remove_fixture_unrelated_sweep.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixturej';\n" +
      "DELETE FROM key_value\nWHERE namespace = 'syncedAvailableModels'\n" +
      "  AND NOT EXISTS (SELECT 1 FROM provider_connections c WHERE c.id = 'fixturej');\n" +
      "DELETE FROM key_value\nWHERE namespace = 'discoveryState'\n" +
      "  AND NOT EXISTS (SELECT 1 FROM provider_connections c WHERE c.id = 'fixturej');\n"
  ),
  fixture(
    "removal that moves a connection to another provider (connection-keyed sweep)",
    "accepted",
    "910_remove_fixture_moved.sql",
    "UPDATE provider_connections\nSET provider = 'fixturetarget'\nWHERE provider = 'fixturemoved';\n" +
      "DELETE FROM provider_connections\nWHERE provider = 'fixturemoved';\n" +
      sweeps(PLAIN_LIVENESS)
  ),
  fixture(
    "removal with a conforming sweep AND a stray provider-anchored purge",
    "provider-anchored-purge(fixturek,syncedAvailableModels)",
    "911_remove_fixture_stray_purge.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixturek';\n" +
      sweeps(PLAIN_LIVENESS) +
      "DELETE FROM key_value\nWHERE namespace = 'syncedAvailableModels'\n" +
      "  AND substr(key, 1, length('fixturek:')) = 'fixturek:';\n"
  ),
  fixture(
    "removal whose sweep is restricted to one connection — refused",
    "restricted-purge(fixturep,syncedAvailableModels) restricted-purge(fixturep,discoveryState)",
    "912_remove_fixture_restricted_sweep.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixturep';\n" +
      sweeps(PLAIN_LIVENESS, "AND substr(key, instr(key, ':') + 1) = 'only-connection'")
  ),
  fixture(
    "removal whose sweep is narrowed to one connection by a key pattern — refused",
    "restricted-purge(fixtureq,syncedAvailableModels) restricted-purge(fixtureq,discoveryState)",
    "913_remove_fixture_pattern_sweep.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixtureq';\n" +
      sweeps(PLAIN_LIVENESS, "AND key LIKE '%:only-connection'")
  ),
  fixture(
    "removal whose sweep carries a condition that only excludes a value",
    "accepted",
    "914_remove_fixture_excluded_value.sql",
    "DELETE FROM provider_connections\nWHERE provider = 'fixturer';\n" +
      sweeps(PLAIN_LIVENESS, "AND value != ''")
  ),
  ...LIVENESS_FIXTURES,
];

test("the cleanup migration of the rule version exists", () => {
  const cleanupPath = path.join(MIGRATIONS_DIR, CLEANUP_MIGRATION_FILE);
  assert.equal(
    fs.existsSync(cleanupPath),
    true,
    `the rule applies from version ${RULE_APPLIES_FROM_VERSION}: it needs the cleanup migration ${CLEANUP_MIGRATION_FILE} in the migrations folder`
  );
});

test("every provider removal migration purges the key/value store", () => {
  const findings = coverageReport(analyzeFiles(readCorpus(MIGRATIONS_DIR)));
  assert.deepEqual(
    findings,
    [],
    `provider removal migrations must purge the key/value store:\n${describe(findings)}`
  );
});

test("the control still reports the historical debt when the cleanup migration is excluded", () => {
  const corpus = readCorpus(MIGRATIONS_DIR).filter(
    (migration) => migration.file !== CLEANUP_MIGRATION_FILE
  );
  const findings = coverageReport(analyzeFiles(corpus));
  const reported = findings.map((finding) => `${finding.kind}:${finding.id}:${finding.namespace}`);
  assert.deepEqual(
    reported.sort(),
    [
      "uncovered:hackclub:syncedAvailableModels",
      "uncovered:mcode:syncedAvailableModels",
      "uncovered:mimocode:syncedAvailableModels",
      "uncovered:puter:syncedAvailableModels",
      "uncovered:qwen:syncedAvailableModels",
    ],
    "the control must report the removals that left their catalog behind"
  );
});

test("the control verdicts match the expected outcomes on synthetic removals", () => {
  const mismatches: string[] = [];
  for (const fixture of FIXTURES) {
    const got = verdict(coverageReport(analyzeFiles(fixture.files)));
    if (got !== fixture.expect) {
      mismatches.push(`${fixture.label}: got "${got}", expected "${fixture.expect}"`);
    }
  }
  assert.deepEqual(mismatches, [], `control verdicts drifted:\n${mismatches.join("\n")}`);
});

// The same narrowing, written every way a migration could write it. Each
// writing keeps fewer rows than a sweep does, so each one is refused: the
// control reads the rows the purge deletes, not the spelling of the condition.
const NARROWED_WRITINGS: [string, string][] = [
  ["a key pattern that starts with a wildcard", "AND key LIKE '%:only-connection'"],
  ["a key glob that starts with a wildcard", "AND key GLOB '*:only-connection'"],
  ["a key excluded from the sweep", "AND key <> 'only-connection'"],
  ["a key excluded from the sweep, with the other operator", "AND key != 'only-connection'"],
  ["a double-quoted literal", "AND substr(key, instr(key, ':') + 1) = \"only-connection\""],
  ["a numeric literal", "AND substr(key, instr(key, ':') + 1) = 42"],
  [
    "a suffix that is not the canonical comparison",
    "AND substr(key, instr(key, ':') + 1) NOT LIKE 'other-%'",
  ],
  ["a bounded suffix length", "AND length(substr(key, instr(key, ':') + 1)) <= 20"],
];

// The liveness condition kept as one alternative of a disjunction: the sweep
// then deletes the catalogs of the live connections too.
const OVER_BROAD_WRITINGS: { label: string; purge: (namespace: string) => string }[] = [
  {
    label: "a tautology beside the liveness condition",
    purge: (namespace) => sweep(namespace, alternativeLiveness("1=1")),
  },
  {
    label: "a key pattern that matches every key beside the liveness condition",
    purge: (namespace) => sweep(namespace, alternativeLiveness("key LIKE '%'")),
  },
  {
    label: "a key that is not one value, at the top level of the WHERE clause",
    purge: (namespace) =>
      `DELETE FROM key_value\nWHERE namespace = '${namespace}'\n  AND NOT EXISTS (\n    SELECT 1\n    FROM provider_connections c\n    WHERE c.id = substr(key_value.key, instr(key_value.key, ':') + 1)\n  )\n  OR key <> 'x';`,
  },
];

// The equivalent spellings of the canonical sweep: the canonical form is an
// example of the rule, not a template, so every spelling of it is accepted.
const EQUIVALENT_SWEEPS: { label: string; purge: string }[] = [
  {
    label: "the canonical sweep",
    purge:
      "DELETE FROM key_value WHERE namespace = '{ns}' AND instr(key_value.key, ':') > 0 AND NOT EXISTS (SELECT 1 FROM provider_connections c WHERE c.id = substr(key_value.key, instr(key_value.key, ':') + 1));",
  },
  {
    label: "the namespace filter as a list",
    purge:
      "DELETE FROM key_value WHERE namespace IN ('{ns}') AND instr(key_value.key, ':') > 0 AND NOT EXISTS (SELECT 1 FROM provider_connections c WHERE c.id = substr(key_value.key, instr(key_value.key, ':') + 1));",
  },
  {
    label: "one statement for the two namespaces",
    purge:
      "DELETE FROM key_value WHERE namespace IN ('syncedAvailableModels', 'discoveryState') AND instr(key_value.key, ':') > 0 AND NOT EXISTS (SELECT 1 FROM provider_connections c WHERE c.id = substr(key_value.key, instr(key_value.key, ':') + 1));",
  },
  {
    label: "the inverted comparison",
    purge:
      "DELETE FROM key_value WHERE namespace = '{ns}' AND instr(key_value.key, ':') > 0 AND NOT EXISTS (SELECT 1 FROM provider_connections c WHERE substr(key_value.key, instr(key_value.key, ':') + 1) = c.id);",
  },
  {
    label: "uppercase functions and no spaces",
    purge:
      "DELETE FROM key_value WHERE namespace = '{ns}' AND INSTR(key_value.key,':')>0 AND NOT EXISTS (SELECT 1 FROM provider_connections c WHERE c.id=SUBSTR(key_value.key,INSTR(key_value.key,':')+1));",
  },
  {
    label: "an unqualified key and a qualified namespace column",
    purge:
      "DELETE FROM key_value WHERE key_value.namespace = '{ns}' AND instr(key, ':') > 0 AND NOT EXISTS (SELECT 1 FROM provider_connections c WHERE c.id = substr(key, instr(key, ':') + 1));",
  },
  {
    label: "the liveness condition written as a membership test over a list that holds no null id",
    purge:
      "DELETE FROM key_value WHERE namespace = '{ns}' AND instr(key_value.key, ':') > 0 AND substr(key_value.key, instr(key_value.key, ':') + 1) NOT IN (SELECT id FROM provider_connections WHERE id IS NOT NULL);",
  },
];

test("the control refuses every writing of a sweep narrowed to a subset of the store rows", () => {
  const mismatches: string[] = [];
  for (const [label, condition] of NARROWED_WRITINGS) {
    const got = verdictOf(
      "920_remove_fixture_narrowed.sql",
      "DELETE FROM provider_connections\nWHERE provider = 'fixturew';\n" +
        sweeps(PLAIN_LIVENESS, condition)
    );
    const expected =
      "restricted-purge(fixturew,syncedAvailableModels) restricted-purge(fixturew,discoveryState)";
    if (got !== expected) {
      mismatches.push(`${label}: got "${got}", expected "${expected}"`);
    }
  }
  assert.deepEqual(
    mismatches,
    [],
    `a sweep narrowed to a subset of the store rows must be refused:\n${mismatches.join("\n")}`
  );
});

test("the control refuses a sweep whose liveness condition is only one alternative", () => {
  const mismatches: string[] = [];
  for (const writing of OVER_BROAD_WRITINGS) {
    const got = verdictOf(
      "921_remove_fixture_over_broad.sql",
      "DELETE FROM provider_connections\nWHERE provider = 'fixturev';\n" +
        writing.purge("syncedAvailableModels") +
        "\n" +
        writing.purge("discoveryState") +
        "\n"
    );
    const expected =
      "over-broad-purge(fixturev,syncedAvailableModels) over-broad-purge(fixturev,discoveryState)";
    if (got !== expected) {
      mismatches.push(`${writing.label}: got "${got}", expected "${expected}"`);
    }
  }
  assert.deepEqual(
    mismatches,
    [],
    `a sweep that does not require its liveness condition must be refused:\n${mismatches.join("\n")}`
  );
});

test("the control accepts every equivalent spelling of the canonical sweep", () => {
  const mismatches: string[] = [];
  for (const form of EQUIVALENT_SWEEPS) {
    const got = verdictOf(
      "922_remove_fixture_equivalent.sql",
      "DELETE FROM provider_connections\nWHERE provider = 'fixtrue';\n" +
        form.purge.replaceAll("{ns}", "syncedAvailableModels") +
        "\n" +
        form.purge.replaceAll("{ns}", "discoveryState") +
        "\n"
    );
    if (got !== "accepted") {
      mismatches.push(`${form.label}: got "${got}", expected "accepted"`);
    }
  }
  assert.deepEqual(
    mismatches,
    [],
    `an equivalent spelling of the canonical sweep must be accepted:\n${mismatches.join("\n")}`
  );
});

const BetterSqlite3 = loadBetterSqlite3();
const skip = BetterSqlite3 ? false : BETTER_SQLITE3_SKIP_REASON;

type StoreRow = { key: string };

function seedStore(otherIds: string[] = [], deadValue = "[]"): import("better-sqlite3").Database {
  if (!BetterSqlite3) throw new Error(BETTER_SQLITE3_SKIP_REASON);
  const db = new BetterSqlite3(":memory:");
  db.exec(fs.readFileSync(path.join(MIGRATIONS_DIR, "001_initial_schema.sql"), "utf8"));
  const insertConnection = db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) " +
      "VALUES (?, ?, 'apikey', ?, 1, datetime('now'), datetime('now'))"
  );
  insertConnection.run("live-1", "qoder", "live");
  // A connection that a removal migration moved to another provider: it is alive,
  // and its catalog is still written under the old provider prefix.
  insertConnection.run("moved-1", "opencode-zen", "moved");
  // The live connections of another provider: the alternative liveness condition
  // accepts them, and the sweep then deletes no row at all.
  for (const id of otherIds) insertConnection.run(id, "otherprov", id);
  const insertCatalog = db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
  );
  insertCatalog.run("qoder:live-1", "[]");
  insertCatalog.run("opencode:moved-1", "[]");
  insertCatalog.run("qoder:dead-1", deadValue); // connection gone
  insertCatalog.run("nocolon", "[]"); // no connection shape
  return db;
}

function remainingKeys(purge: string, otherIds: string[] = [], deadValue = "[]"): string[] {
  const db = seedStore(otherIds, deadValue);
  try {
    db.exec(purge);
    const rows = db
      .prepare("SELECT key FROM key_value WHERE namespace = 'syncedAvailableModels' ORDER BY key")
      .all() as StoreRow[];
    return rows.map((row) => row.key);
  } finally {
    db.close();
  }
}

test("a connection-keyed purge keeps the catalog of a moved connection", { skip }, () => {
  const cleanupSql = fs.readFileSync(path.join(MIGRATIONS_DIR, CLEANUP_MIGRATION_FILE), "utf8");
  assert.deepEqual(remainingKeys(cleanupSql), ["nocolon", "opencode:moved-1", "qoder:live-1"]);
});

test("a provider-anchored purge drops the catalog of a moved connection", { skip }, () => {
  assert.deepEqual(remainingKeys(PROVIDER_ANCHORED_SWEEP), [
    "nocolon",
    "qoder:dead-1",
    "qoder:live-1",
  ]);
});

test(
  "a sweep restricted to one connection leaves the other removed catalogs behind",
  { skip },
  () => {
    assert.deepEqual(remainingKeys(RESTRICTED_SWEEP), [
      "nocolon",
      "opencode:moved-1",
      "qoder:dead-1",
      "qoder:live-1",
    ]);
  }
);

test(
  "a sweep that requires the connection to exist deletes the catalog of a live connection",
  {
    skip,
  },
  () => {
    // The control refuses it: the liveness condition is the inverse of a sweep.
    const fixture = LIVENESS_FIXTURES[0];
    assert.equal(verdict(coverageReport(analyzeFiles(fixture.files))), fixture.expect);
    // The store shows the harm: the catalog of the live connection is gone and
    // the catalog of the removed connection is still there — the inverse of what
    // a purge must do. The sweep a purge must be does the opposite.
    assert.deepEqual(remainingKeys(sweep("syncedAvailableModels", INVERTED_LIVENESS)), [
      "nocolon",
      "qoder:dead-1",
    ]);
    assert.deepEqual(remainingKeys(sweep("syncedAvailableModels", PLAIN_LIVENESS)), [
      "nocolon",
      "opencode:moved-1",
      "qoder:live-1",
    ]);
  }
);

test(
  "a liveness condition with a condition of more deletes the catalog of a live connection",
  { skip },
  () => {
    // The control refuses it (the fixture 916): the sweep deletes at least as many
    // rows as the canonical sweep, so it can delete the catalogs of the live
    // connections.
    const fixture = LIVENESS_FIXTURES[1];
    assert.equal(verdict(coverageReport(analyzeFiles(fixture.files))), fixture.expect);
    // The store shows the harm: the catalog of the live connection is gone, and
    // only the row that carries no connection shape is left.
    assert.deepEqual(remainingKeys(sweep("syncedAvailableModels", NARROWED_LIVENESS)), ["nocolon"]);
  }
);

test(
  "a liveness condition with an alternative leaves the catalog of a removed connection behind",
  { skip },
  () => {
    // The control refuses it (the fixture 917): the sweep deletes at most as many
    // rows as the canonical sweep, so it can leave the catalogs of the removed
    // connections behind.
    const fixture = LIVENESS_FIXTURES[2];
    assert.equal(verdict(coverageReport(analyzeFiles(fixture.files))), fixture.expect);
    // The store shows the harm: as soon as a live connection of the other provider
    // exists, the sweep deletes no row and the catalog of the removed connection
    // stays in the store.
    assert.deepEqual(remainingKeys(sweep("syncedAvailableModels", WIDENED_LIVENESS), ["other-1"]), [
      "nocolon",
      "opencode:moved-1",
      "qoder:dead-1",
      "qoder:live-1",
    ]);
  }
);

test(
  "an alternative that accepts no connection leaves the canonical sweep unchanged",
  { skip },
  () => {
    // The control accepts it: the alternative accepts no connection the plain
    // comparison rejects, so the sweep deletes the same rows as the canonical one.
    const canonical = ["nocolon", "opencode:moved-1", "qoder:live-1"];
    assert.deepEqual(
      remainingKeys(sweep("syncedAvailableModels", CONTRADICTED_LIVENESS)),
      canonical
    );
    assert.deepEqual(remainingKeys(sweep("syncedAvailableModels", IMPLIED_LIVENESS)), canonical);
  }
);

test("a condition that only excludes a value keeps the rows it excludes", { skip }, () => {
  // The control accepts it (the fixture 914): the condition excludes store rows,
  // not connections, so the purge stays a sweep.
  // The store shows the effect: the canonical sweep deletes the orphaned
  // catalog, the sweep that excludes the empty values deletes none of it.
  assert.deepEqual(remainingKeys(sweep("syncedAvailableModels", PLAIN_LIVENESS), [], ""), [
    "nocolon",
    "opencode:moved-1",
    "qoder:live-1",
  ]);
  assert.deepEqual(
    remainingKeys(sweep("syncedAvailableModels", PLAIN_LIVENESS, "AND value != ''"), [], ""),
    ["nocolon", "opencode:moved-1", "qoder:dead-1", "qoder:live-1"]
  );
});
