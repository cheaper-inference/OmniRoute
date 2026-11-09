#!/usr/bin/env bash
# bin/restore-policies.sh — restore ONLY the API-key policy tables from a
# snapshot, leaving request/audit/runtime state intact. Used by the auth-layer
# incident-recovery flow when policies_active is empty
# but the rest of the database is healthy (so a full restore-data is overkill).
#
# "Policy" tables = api_key* definition tables (the key + its limits/allowed
# quotas/context sources), EXCLUDING usage counters and reset logs so a restore
# never rewinds live usage accounting.
set -euo pipefail
SCRIPT_NAME="restore-policies"
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ops-common.sh"

usage() {
  cat <<'EOF'
Usage: bin/restore-policies.sh <snapshot-id> [--data-dir <path>] [--yes|-y] [-h|--help]

Replaces the API-key policy tables (api_key*, excluding *counter* / *_log*) in
the live DB with the copies from a snapshot, inside one transaction. The live DB
is snapshotted to $DB_BACKUPS_DIR/pre-policy-restore_<UTC> first. Requires sqlite3.
Refuses a snapshot whose policy table names are not plain identifiers
([A-Za-z0-9_]) or whose policy tables are not ordinary tables.
EOF
}

ID=""
while [ $# -gt 0 ]; do
  case "$1" in
    --yes | -y) ASSUME_YES=1; shift ;;
    --data-dir) ops_set_data_dir "${2:?--data-dir needs a value}"; shift 2 ;;
    -h | --help) usage; exit 0 ;;
    -*) ops_die "unknown argument: $1 (see --help)" ;;
    *) ID="$1"; shift ;;
  esac
done

[ -n "$ID" ] || ops_die "snapshot id required (see --help)"
ops_require_cmd sqlite3
snap="$(ops_find_snapshot "$ID")"
[ -f "$OMNIROUTE_SQLITE" ] || ops_die "no live DB at $OMNIROUTE_SQLITE (use restore-data.sh for a full restore)"

# Check and restore from a private copy of the snapshot DB, so the file the
# checks below look at is the one ATTACH reads. Otherwise someone who can write
# the snapshot directory could swap the file after the checks (the confirmation
# prompt can hold that window open indefinitely). The copy is the whole
# snapshot DB, credentials included, so it is readable by the owner only. The
# EXIT trap removes it; a SIGKILL leaves it behind in $TMPDIR. The umask is
# set and restored here rather than in a ( ) subshell: bash 3.2 (macOS) does
# not stop on a failed subshell under set -e, and a copy that silently lost
# its WAL file would restore stale policies.
work="$(mktemp -d "${TMPDIR:-/tmp}/omniroute-restore-policies.XXXXXX")"
trap 'rm -rf "$work"' EXIT
old_umask="$(umask)"
umask 077
cp "$snap/storage.sqlite" "$work/storage.sqlite" \
  || ops_die "cannot copy $snap/storage.sqlite to $work; nothing was changed"
if [ -f "$snap/storage.sqlite-wal" ]; then
  cp "$snap/storage.sqlite-wal" "$work/storage.sqlite-wal" \
    || ops_die "cannot copy $snap/storage.sqlite-wal to $work; nothing was changed"
fi
umask "$old_umask"
snapdb="$work/storage.sqlite"

# Policy definition tables present in BOTH the snapshot and the live DB. GLOB
# keeps `_` literal; we drop usage counters / logs so accounting isn't rewound.
tables=()
while IFS= read -r t; do tables+=("$t"); done < <(
  ops_sqlite "$snapdb" \
    "SELECT name FROM sqlite_master WHERE type='table' AND name GLOB 'api_key*' \
       AND name NOT GLOB '*counter*' AND name NOT GLOB '*_log*' ORDER BY name;"
)
[ "${#tables[@]}" -gt 0 ] || ops_die "snapshot has no api_key* policy tables"

# Table names come from the snapshot file, which may not be trusted, and are
# spliced into SQL for the sqlite3 CLI below. Accept only plain identifiers
# (the policy tables OmniRoute creates all match) and refuse the whole restore
# otherwise, before anything is written.
for t in "${tables[@]}"; do
  [[ "$t" =~ ^api_key[A-Za-z0-9_]*$ ]] \
    || ops_die "snapshot table name $(printf '%q' "$t") is not a plain identifier; refusing to restore from $snap"
done
# Reading a virtual table runs its module (zipfile() reads and writes files),
# so every selected table must be an ordinary CREATE TABLE.
for t in "${tables[@]}"; do
  [ -n "$(ops_sqlite "$snapdb" \
    "SELECT 1 FROM sqlite_master WHERE type='table' AND name='$t' AND sql LIKE 'CREATE TABLE %';")" ] \
    || ops_die "snapshot table '$t' is not an ordinary table; refusing to restore from $snap"
done

ops_log "policy tables to restore: ${tables[*]}"
ops_confirm "Replace ${#tables[@]} policy table(s) in $OMNIROUTE_SQLITE from $snap?" || ops_die "aborted"

# Safety snapshot of the live DB before mutating it.
safety="$OMNIROUTE_BACKUPS_DIR/pre-policy-restore_$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p "$safety"
ops_sqlite "$OMNIROUTE_SQLITE" "VACUUM INTO $(ops_sql_str "$safety/storage.sqlite")"
ops_log "live DB saved to $safety"

# Replace each policy table inside a single transaction, attaching the snapshot
# (only tables that also exist in the live DB are touched).
sql="ATTACH DATABASE $(ops_sql_str "$snapdb") AS snap;
PRAGMA foreign_keys=OFF;
BEGIN;"
for t in "${tables[@]}"; do
  if [ -n "$(ops_sqlite "$OMNIROUTE_SQLITE" "SELECT 1 FROM sqlite_master WHERE type='table' AND name='$t' LIMIT 1;")" ]; then
    sql="$sql
DELETE FROM main.\"$t\";
INSERT INTO main.\"$t\" SELECT * FROM snap.\"$t\";"
  else
    ops_log "skipping '$t' — not present in live DB"
  fi
done
sql="$sql
COMMIT;
DETACH DATABASE snap;"

# -bail stops at the first failing statement, so the open transaction is rolled
# back instead of COMMIT keeping the DELETEs that ran before the failure.
printf '%s\n' "$sql" | ops_sqlite -bail "$OMNIROUTE_SQLITE"
ops_log "policies restored from $snap — restart OmniRoute to apply"
