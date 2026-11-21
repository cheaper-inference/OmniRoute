#!/usr/bin/env bash
# bin/restore-data.sh — restore the OmniRoute SQLite data volume from a snapshot
# created by bin/snapshot-data.sh. Used by the data-layer incident-recovery
# flow after stopping writers.
#
# Safety: takes a pre-restore snapshot of the CURRENT data, refuses to run
# unattended without --yes, and verifies the snapshot before overwriting.
set -euo pipefail
SCRIPT_NAME="restore-data"
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_ops-common.sh"

usage() {
  cat <<'EOF'
Usage: bin/restore-data.sh <snapshot-id> [--data-dir <path>] [--yes|-y] [-h|--help]

Restores storage.sqlite (and any sibling *.sqlite) from a snapshot. The current
data is first copied to $DB_BACKUPS_DIR/pre-restore_<UTC> as a safety net.
<snapshot-id> is a timestamp/sha, a snapshot dir name, or a path (see snapshot-data.sh).
Stop OmniRoute before running, and restart it afterwards.
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
snap="$(ops_find_snapshot "$ID")"
ops_log "restore source: $snap → $OMNIROUTE_DATA_DIR"
ops_confirm "Overwrite storage.sqlite at $OMNIROUTE_DATA_DIR from $snap?" || ops_die "aborted"

# Pre-restore safety copy of the live data.
if [ -f "$OMNIROUTE_SQLITE" ]; then
  safety="$OMNIROUTE_BACKUPS_DIR/pre-restore_$(date -u +%Y%m%dT%H%M%SZ)"
  mkdir -p "$safety"
  if command -v sqlite3 >/dev/null 2>&1; then
    ops_sqlite "$OMNIROUTE_SQLITE" "VACUUM INTO $(ops_sql_str "$safety/storage.sqlite")" \
      || ops_cp_db "$OMNIROUTE_SQLITE" "$safety/storage.sqlite"
  else
    ops_cp_db "$OMNIROUTE_SQLITE" "$safety/storage.sqlite"
  fi
  ops_log "current data saved to $safety"
fi

mkdir -p "$OMNIROUTE_DATA_DIR"
# Drop the live WAL/SHM so the restored DB is authoritative, then copy in the snapshot
# with its own WAL (a snapshot made by an older script can carry rows there).
rm -f "$OMNIROUTE_SQLITE" "${OMNIROUTE_SQLITE}-wal" "${OMNIROUTE_SQLITE}-shm"
ops_cp_db "$snap/storage.sqlite" "$OMNIROUTE_SQLITE"

# Restore sibling DBs captured in the snapshot.
for f in "$snap"/*.sqlite; do
  [ -e "$f" ] || continue
  [ "$(basename "$f")" = "storage.sqlite" ] && continue
  cp -a "$f" "$OMNIROUTE_DATA_DIR/"
done

ops_log "restore complete — restart OmniRoute to pick up the restored data"
